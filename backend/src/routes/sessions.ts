import { Router, Request, Response } from 'express';
import { prisma } from '../db/prisma';
import { authenticateToken } from '../index';
import { serializeEncryptedKey, deserializeEncryptedKey } from '../utils/encryption';
import { config } from '../config';
import * as crypto from 'crypto';

const router = Router();

// All routes require authentication
router.use(authenticateToken);

/**
 * POST /api/sessions/ephemeral-key
 * Create ephemeral key for auto-signing (using Sui Ed25519)
 * Stores encrypted private key directly in Session table
 */
router.post('/ephemeral-key', async (req: Request, res: Response) => {
  try {
    const sessionId = req.user!.sid;
    const { Ed25519Keypair } = await import('@mysten/sui/keypairs/ed25519');

    // Generate Sui Ed25519 keypair for blockchain signing
    const ephemeralKeypair = new Ed25519Keypair();
    const publicKey = ephemeralKeypair.getPublicKey().toSuiAddress();
    const privateKeyBytes = ephemeralKeypair.getSecretKey();

    // Encrypt and serialize private key
    const encryptedPrivateKey = serializeEncryptedKey(privateKeyBytes, publicKey);

    // Get session to determine expiration
    const session = await prisma.session.findUnique({
      where: { id: sessionId },
    });

    if (!session) {
      return res.status(404).json({ error: 'Session not found' });
    }

    // Update session with encrypted private key
    await prisma.session.update({
      where: { id: sessionId },
      data: {
        encryptedPrivateKey,
        lastUsedAt: new Date(),
      },
    });

    res.json({
      ephemeralKeyId: sessionId, // Use session ID as key identifier
      publicKey,
      expiresAt: session.expiresAt,
    });
  } catch (error) {
    console.error('Error creating ephemeral key:', error);
    res.status(500).json({ error: 'Failed to create ephemeral key' });
  }
});

/**
 * POST /api/sessions/auto-sign
 * Auto-sign transaction using ephemeral key stored in session
 */
router.post('/auto-sign', async (req: Request, res: Response) => {
  try {
    const { txPayload, action = 'auto_sign', roomId, txDigest } = req.body;
    const sessionId = req.user!.sid;

    if (!txPayload) {
      return res.status(400).json({ error: 'Transaction payload is required' });
    }

    // Get session with encrypted private key
    const session = await prisma.session.findUnique({
      where: { id: sessionId },
    });

    if (!session || !session.encryptedPrivateKey) {
      return res.status(404).json({ error: 'No active ephemeral key found' });
    }

    if (session.status !== 'active' || session.expiresAt < new Date()) {
      return res.status(401).json({ error: 'Session expired' });
    }

    // Deserialize and decrypt private key, then sign using Sui SDK
    const { Ed25519Keypair } = await import('@mysten/sui/keypairs/ed25519');
    const { privateKey: privateKeyBytes } = deserializeEncryptedKey(session.encryptedPrivateKey);
    const ephemeralKeypair = Ed25519Keypair.fromSecretKey(privateKeyBytes);

    // Sign transaction
    const txBytes = Buffer.from(txPayload, 'base64');
    const signature = await ephemeralKeypair.sign(txBytes);
    const signatureBase64 = Buffer.from(signature).toString('base64');
    const publicKey = ephemeralKeypair.getPublicKey().toSuiAddress();

    // Log delegated signature for audit trail (new schema)
    await prisma.delegatedSignature.create({
      data: {
        sessionId,
        action: action as string, // e.g., "approve_guest", "start_room", "auto_sign"
        roomId: roomId || null,
        txDigest: txDigest || null,
        signature: signatureBase64,
      },
    });

    res.json({
      signature: signatureBase64,
      publicKey,
      ephemeralKeyId: sessionId,
    });
  } catch (error) {
    console.error('Error auto-signing:', error);
    res.status(500).json({ error: 'Failed to auto-sign transaction' });
  }
});

/**
 * GET /api/sessions/me
 * Get current session info (no more EphemeralKey table)
 */
router.get('/me', async (req: Request, res: Response) => {
  try {
    const sessionId = req.user!.sid;

    const session = await prisma.session.findUnique({
      where: { id: sessionId },
      include: {
        User: true,
        Wallet: true,
      },
    });

    if (!session) {
      return res.status(404).json({ error: 'Session not found' });
    }

    // Check if session has an ephemeral key
    const hasEphemeralKey = !!session.encryptedPrivateKey;

    res.json({
      session: {
        id: session.id,
        status: session.status,
        expiresAt: session.expiresAt,
        lastUsedAt: session.lastUsedAt,
        hasEphemeralKey, // Indicates if auto-signing is available
      },
      user: {
        id: session.userId,
        walletAddress: session.Wallet.address,
      },
    });
  } catch (error) {
    console.error('Error fetching session:', error);
    res.status(500).json({ error: 'Failed to fetch session' });
  }
});

export default router;

