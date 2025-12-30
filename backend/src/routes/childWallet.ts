import { Router, Request, Response } from 'express';
import { Ed25519Keypair } from '@mysten/sui/keypairs/ed25519';
import { prisma } from '../db/prisma';
import { serializeEncryptedKey, deserializeEncryptedKey } from '../utils/encryption';
import { verifyToken } from '../lib/jwt';
import { authenticate } from '../middleware/auth';

const router = Router();

/**
 * POST /api/child-wallet/create
 * Create a child wallet (ephemeral keypair) for auto-signing
 * Requires: active session with valid access token
 */
router.post('/create', authenticate, async (req: Request, res: Response) => {
  try {
    const { expiresInHours = 24 } = req.body;
    const userId = (req as any).user.sub;
    const sessionId = (req as any).user.sid;

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

    // Encrypt and serialize private key
    const encryptedPrivateKey = serializeEncryptedKey(privateKeyBytes, publicKey);

    // Calculate expiration
    const expiresAt = new Date(Date.now() + expiresInHours * 60 * 60 * 1000);

    // Update session with encrypted private key (no more EphemeralKey table)
    await prisma.session.update({
      where: { id: session.id },
      data: {
        encryptedPrivateKey,
        lastUsedAt: new Date(),
      },
    });

    res.json({
      childWallet: {
        id: session.id, // Use session ID as identifier
        address: publicKey,
        expiresAt,
        issuedAt: new Date(),
      },
      message: 'Child wallet created successfully. Use this address for auto-signing.',
    });
  } catch (error) {
    console.error('Error creating child wallet:', error);
    res.status(500).json({ error: 'Failed to create child wallet' });
  }
});

/**
 * GET /api/child-wallet/list
 * List all active child wallets for current session
 * Note: Now returns session-based child wallet info
 */
router.get('/list', authenticate, async (req: Request, res: Response) => {
  try {
    const sessionId = (req as any).user.sid;

    const session = await prisma.session.findUnique({
      where: {
        id: sessionId,
        status: 'active',
        expiresAt: { gt: new Date() },
      },
    });

    if (!session || !session.encryptedPrivateKey) {
      return res.json({ childWallets: [] });
    }

    // Deserialize and decrypt to get public key
    const { publicKey } = deserializeEncryptedKey(session.encryptedPrivateKey);

    res.json({
      childWallets: [{
        id: session.id,
        address: publicKey,
        issuedAt: session.createdAt,
        expiresAt: session.expiresAt,
      }],
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
    const { txPayload, action = 'auto_sign', roomId, txDigest } = req.body;
    const sessionId = (req as any).user.sid;

    if (!txPayload) {
      return res.status(400).json({
        error: 'txPayload is required'
      });
    }

    // Retrieve and decrypt private key from session
    const session = await prisma.session.findUnique({
      where: { id: sessionId },
    });

    if (!session?.encryptedPrivateKey) {
      return res.status(500).json({ error: 'Child wallet private key not found' });
    }

    if (session.status !== 'active' || session.expiresAt < new Date()) {
      return res.status(401).json({ error: 'Session expired' });
    }

    // Deserialize and decrypt private key
    const { privateKey: privateKeyBytes } = deserializeEncryptedKey(session.encryptedPrivateKey);

    // Reconstruct keypair
    const ephemeralKeypair = Ed25519Keypair.fromSecretKey(privateKeyBytes);

    // Sign transaction
    const txBytes = Buffer.from(txPayload, 'base64');
    const signature = await ephemeralKeypair.sign(txBytes);
    const signatureBase64 = Buffer.from(signature).toString('base64');

    // Log the delegated signature for audit trail (new schema)
    await prisma.delegatedSignature.create({
      data: {
        sessionId,
        action: action as string, // e.g., "approve_guest", "start_room", "auto_sign"
        roomId: roomId || null, // Room ID if this is a room operation
        txDigest: txDigest || null, // Transaction digest (after broadcast)
        signature: signatureBase64,
      },
    });

    const publicKey = ephemeralKeypair.getPublicKey().toSuiAddress();

    res.json({
      signature: signatureBase64,
      publicKey,
      signedAt: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Error signing with child wallet:', error);
    res.status(500).json({ error: 'Failed to sign transaction' });
  }
});

/**
 * DELETE /api/child-wallet/:id
 * Revoke a child wallet (now clears session's encryptedPrivateKey)
 */
router.delete('/:id', authenticate, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const sessionId = (req as any).user.sid;

    if (id !== sessionId) {
      return res.status(403).json({ error: 'Cannot revoke another session\'s child wallet' });
    }

    const session = await prisma.session.findUnique({
      where: { id: sessionId },
    });

    if (!session) {
      return res.status(404).json({ error: 'Session not found' });
    }

    // Clear encrypted private key to revoke child wallet
    await prisma.session.update({
      where: { id: sessionId },
      data: { encryptedPrivateKey: null },
    });

    res.json({ message: 'Child wallet revoked successfully' });
  } catch (error) {
    console.error('Error revoking child wallet:', error);
    res.status(500).json({ error: 'Failed to revoke child wallet' });
  }
});

export default router;
