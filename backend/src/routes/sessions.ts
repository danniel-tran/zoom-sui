import { Router, Request, Response } from 'express';
import { prisma } from '../lib/prisma';
import { authenticateToken } from '../index';
import { encrypt, decrypt } from '../lib/crypto';
import { config } from '../config';
import * as crypto from 'crypto';

const router = Router();

// All routes require authentication
router.use(authenticateToken);

/**
 * POST /api/sessions/ephemeral-key
 * Create ephemeral key for auto-signing
 */
router.post('/ephemeral-key', async (req: Request, res: Response) => {
  try {
    const { scope = ['room:create', 'room:approve'] } = req.body;
    const sessionId = req.user!.sid;

    // Generate ephemeral key pair (Ed25519)
    const keyPair = crypto.generateKeyPairSync('ed25519', {
      publicKeyEncoding: { type: 'spki', format: 'pem' },
      privateKeyEncoding: { type: 'pkcs8', format: 'pem' },
    });

    const publicKey = keyPair.publicKey;
    const privateKey = keyPair.privateKey;

    // Encrypt private key
    const encryptedPrivateKey = encrypt(privateKey);

    // Store ephemeral key
    const expiresAt = new Date(Date.now() + config.ephemeralKeyExpiresIn);
    const ephemeralKey = await prisma.ephemeralKey.create({
      data: {
        sessionId,
        publicKey,
        alg: 'ed25519',
        scope: scope.join(','),
        expiresAt,
      },
    });

    // Update session with encrypted private key
    await prisma.session.update({
      where: { id: sessionId },
      data: {
        encryptedPrivateKey,
        lastUsedAt: new Date(),
      },
    });

    res.json({
      ephemeralKeyId: ephemeralKey.id,
      publicKey,
      expiresAt: ephemeralKey.expiresAt,
      scope: ephemeralKey.scope.split(','),
    });
  } catch (error) {
    console.error('Error creating ephemeral key:', error);
    res.status(500).json({ error: 'Failed to create ephemeral key' });
  }
});

/**
 * POST /api/sessions/auto-sign
 * Auto-sign transaction using ephemeral key
 */
router.post('/auto-sign', async (req: Request, res: Response) => {
  try {
    const { txPayload, scope } = req.body;
    const sessionId = req.user!.sid;

    if (!txPayload || !scope) {
      return res.status(400).json({ error: 'Transaction payload and scope are required' });
    }

    // Get session with ephemeral key
    const session = await prisma.session.findUnique({
      where: { id: sessionId },
      include: {
        ekeys: {
          where: {
            expiresAt: { gt: new Date() },
            revokedAt: null,
          },
          orderBy: { expiresAt: 'desc' },
          take: 1,
        },
      },
    });

    if (!session || !session.encryptedPrivateKey) {
      return res.status(404).json({ error: 'No active ephemeral key found' });
    }

    const ephemeralKey = session.ekeys[0];
    if (!ephemeralKey) {
      return res.status(404).json({ error: 'No valid ephemeral key' });
    }

    // Check scope
    const requiredScopes = Array.isArray(scope) ? scope : [scope];
    const keyScopes = ephemeralKey.scope.split(',');
    const hasScope = requiredScopes.every((s) => keyScopes.includes(s));

    if (!hasScope) {
      return res.status(403).json({ error: 'Insufficient scope' });
    }

    // Decrypt private key
    const privateKey = decrypt(session.encryptedPrivateKey);

    // TODO: Sign transaction using Sui SDK
    // const signature = signTransaction(txPayload, privateKey);

    // For now, return mock signature
    const signature = crypto.sign(null, Buffer.from(txPayload), privateKey).toString('base64');

    res.json({
      signature,
      publicKey: ephemeralKey.publicKey,
      ephemeralKeyId: ephemeralKey.id,
    });
  } catch (error) {
    console.error('Error auto-signing:', error);
    res.status(500).json({ error: 'Failed to auto-sign transaction' });
  }
});

/**
 * GET /api/sessions/me
 * Get current session info
 */
router.get('/me', async (req: Request, res: Response) => {
  try {
    const sessionId = req.user!.sid;

    const session = await prisma.session.findUnique({
      where: { id: sessionId },
      include: {
        user: true,
        wallet: true,
        ekeys: {
          where: {
            expiresAt: { gt: new Date() },
            revokedAt: null,
          },
        },
      },
    });

    if (!session) {
      return res.status(404).json({ error: 'Session not found' });
    }

    res.json({
      session: {
        id: session.id,
        status: session.status,
        expiresAt: session.expiresAt,
        lastUsedAt: session.lastUsedAt,
      },
      user: {
        id: session.user.id,
        walletAddress: session.wallet.address,
      },
      ephemeralKeys: session.ekeys.map((ek) => ({
        id: ek.id,
        scope: ek.scope.split(','),
        expiresAt: ek.expiresAt,
      })),
    });
  } catch (error) {
    console.error('Error fetching session:', error);
    res.status(500).json({ error: 'Failed to fetch session' });
  }
});

export default router;

