import { Router, Request, Response } from 'express';
import { Ed25519Keypair } from '@mysten/sui/keypairs/ed25519';
import { prisma } from '../lib/prisma';
import { encrypt, decrypt } from '../lib/crypto';
import { verifyToken } from '../lib/jwt';
import { authenticate } from '../middleware/auth';
import { EphemeralKeyScope } from '../types';

const router = Router();

/**
 * POST /api/child-wallet/create
 * Create a child wallet (ephemeral keypair) for auto-signing
 * Requires: active session with valid access token
 */
router.post('/create', authenticate, async (req: Request, res: Response) => {
  try {
    const { scope, expiresInHours = 24 } = req.body;
    const userId = (req as any).user.sub;
    const sessionId = (req as any).user.sid;

    if (!scope || !Array.isArray(scope)) {
      return res.status(400).json({ 
        error: 'Scope array is required (e.g., ["room:create", "room:join"])' 
      });
    }

    // Validate scope values
    const validScopes: EphemeralKeyScope[] = [
      'room:create', 'room:approve', 'room:revoke',
      'room:join', 'room:leave', 'poap:mint'
    ];
    
    const invalidScopes = scope.filter((s: string) => !validScopes.includes(s as EphemeralKeyScope));
    if (invalidScopes.length > 0) {
      return res.status(400).json({ 
        error: `Invalid scopes: ${invalidScopes.join(', ')}` 
      });
    }

    // Check session is active
    const session = await prisma.session.findUnique({
      where: { id: sessionId },
    });

    if (!session || session.status !== 'active' || session.expiresAt < new Date()) {
      return res.status(401).json({ error: 'Invalid or expired session' });
    }

    // Generate ephemeral keypair (child wallet)
    const ephemeralKeypair = new Ed25519Keypair();
    const publicKey = ephemeralKeypair.getPublicKey().toSuiAddress();
    const privateKeyBytes = ephemeralKeypair.getSecretKey();
    const privateKeyBase64 = Buffer.from(privateKeyBytes).toString('base64');

    // Encrypt private key for storage
    const encryptedPrivateKey = encrypt(privateKeyBase64);

    // Calculate expiration
    const expiresAt = new Date(Date.now() + expiresInHours * 60 * 60 * 1000);

    // Store ephemeral key
    const ephemeralKey = await prisma.ephemeralKey.create({
      data: {
        sessionId: session.id,
        publicKey,
        encryptedPublicKey: encrypt(publicKey), // Optional encrypted version
        alg: 'ed25519',
        scope: scope.join(','),
        expiresAt,
      },
    });

    // Also update session with encrypted private key for convenience
    await prisma.session.update({
      where: { id: session.id },
      data: { 
        encryptedPrivateKey,
        lastUsedAt: new Date(),
      },
    });

    res.json({
      childWallet: {
        id: ephemeralKey.id,
        address: publicKey,
        scope,
        expiresAt,
        issuedAt: ephemeralKey.issuedAt,
      },
      message: 'Child wallet created successfully. Use this address for auto-signing within allowed scopes.',
    });
  } catch (error) {
    console.error('Error creating child wallet:', error);
    res.status(500).json({ error: 'Failed to create child wallet' });
  }
});

/**
 * GET /api/child-wallet/list
 * List all active child wallets for current session
 */
router.get('/list', authenticate, async (req: Request, res: Response) => {
  try {
    const sessionId = (req as any).user.sid;

    const ephemeralKeys = await prisma.ephemeralKey.findMany({
      where: {
        sessionId,
        revokedAt: null,
        expiresAt: { gt: new Date() },
      },
      orderBy: { issuedAt: 'desc' },
    });

    res.json({
      childWallets: ephemeralKeys.map(key => ({
        id: key.id,
        address: key.publicKey,
        scope: key.scope.split(','),
        issuedAt: key.issuedAt,
        expiresAt: key.expiresAt,
      })),
    });
  } catch (error) {
    console.error('Error listing child wallets:', error);
    res.status(500).json({ error: 'Failed to list child wallets' });
  }
});

/**
 * POST /api/child-wallet/sign
 * Sign a transaction using child wallet (auto-sign)
 * This allows transactions without prompting user's main wallet
 */
router.post('/sign', authenticate, async (req: Request, res: Response) => {
  try {
    const { ephemeralKeyId, txPayload, requestedScope } = req.body;
    const sessionId = (req as any).user.sid;

    if (!ephemeralKeyId || !txPayload) {
      return res.status(400).json({ 
        error: 'ephemeralKeyId and txPayload are required' 
      });
    }

    // Find ephemeral key
    const ephemeralKey = await prisma.ephemeralKey.findFirst({
      where: {
        id: ephemeralKeyId,
        sessionId,
        revokedAt: null,
        expiresAt: { gt: new Date() },
      },
    });

    if (!ephemeralKey) {
      return res.status(404).json({ error: 'Child wallet not found or expired' });
    }

    // Verify scope permission
    const allowedScopes = ephemeralKey.scope.split(',');
    if (requestedScope && !allowedScopes.includes(requestedScope)) {
      return res.status(403).json({ 
        error: `Insufficient permissions. Required: ${requestedScope}, Allowed: ${allowedScopes.join(', ')}` 
      });
    }

    // Retrieve and decrypt private key from session
    const session = await prisma.session.findUnique({
      where: { id: sessionId },
    });

    if (!session?.encryptedPrivateKey) {
      return res.status(500).json({ error: 'Child wallet private key not found' });
    }

    const privateKeyBase64 = decrypt(session.encryptedPrivateKey);
    const privateKeyBytes = Buffer.from(privateKeyBase64, 'base64');
    
    // Reconstruct keypair
    const ephemeralKeypair = Ed25519Keypair.fromSecretKey(privateKeyBytes);

    // Sign transaction
    const txBytes = Buffer.from(txPayload, 'base64');
    const signature = await ephemeralKeypair.sign(txBytes);

    // Log the delegated signature for audit trail
    await prisma.delegatedSignature.create({
      data: {
        sessionId,
        txTemplateHash: Buffer.from(txBytes.slice(0, 32)).toString('hex'),
        signature: Buffer.from(signature).toString('base64'),
        scope: requestedScope || 'auto-sign',
        expiresAt: ephemeralKey.expiresAt,
      },
    });

    res.json({
      signature: Buffer.from(signature).toString('base64'),
      publicKey: ephemeralKey.publicKey,
      signedAt: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Error signing with child wallet:', error);
    res.status(500).json({ error: 'Failed to sign transaction' });
  }
});

/**
 * DELETE /api/child-wallet/:id
 * Revoke a child wallet
 */
router.delete('/:id', authenticate, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const sessionId = (req as any).user.sid;

    const ephemeralKey = await prisma.ephemeralKey.findFirst({
      where: {
        id,
        sessionId,
      },
    });

    if (!ephemeralKey) {
      return res.status(404).json({ error: 'Child wallet not found' });
    }

    await prisma.ephemeralKey.update({
      where: { id },
      data: { revokedAt: new Date() },
    });

    res.json({ message: 'Child wallet revoked successfully' });
  } catch (error) {
    console.error('Error revoking child wallet:', error);
    res.status(500).json({ error: 'Failed to revoke child wallet' });
  }
});

export default router;
