import { Router, Request, Response } from 'express';
import * as crypto from 'crypto';
import { Ed25519Keypair } from '@mysten/sui/keypairs/ed25519';
import { prisma } from '../db/prisma';
import { generateNonce, verifySignature } from '../lib/crypto';
import { generateAccessToken, generateRefreshToken, createJWTPayload } from '../lib/jwt';
import { hashToken } from '../lib/crypto';
import { config } from '../config';
import { serializeEncryptedKey } from '../utils/encryption';

const router = Router();

/**
 * POST /api/auth/nonce
 * Generate a nonce for wallet authentication
 */
router.post('/nonce', async (req: Request, res: Response) => {
  try {
    const { walletAddress } = req.body;

    if (!walletAddress || typeof walletAddress !== 'string') {
      return res.status(400).json({ error: 'Wallet address is required' });
    }

    // Generate nonce
    const nonce = generateNonce();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    // Store nonce in database
    await prisma.authNonce.create({
      data: {
        walletAddress,
        nonce,
        expiresAt,
      },
    });

    // Authorization message explaining what user authorizes
    const authorizationMessage = `By signing this message, you authorize:
- Account access to SuiMeet
- Automatic transaction signing for approved room operations
- Session creation with ephemeral keypair for seamless experience

Nonce: ${nonce}
Expires: ${expiresAt.toISOString()}`;

    res.json({
      nonce,
      expiresAt,
      authorizationMessage,
      message: 'Sign this nonce with your wallet to authenticate'
    });
  } catch (error) {
    console.error('Error generating nonce:', error);
    res.status(500).json({ error: 'Failed to generate nonce' });
  }
});

/**
 * POST /api/auth/verify
 * Verify wallet signature and create session
 */
router.post('/verify', async (req: Request, res: Response) => {
  try {
    const { walletAddress, signature, walletType = 'sui' } = req.body;

    if (!walletAddress || !signature) {
      return res.status(400).json({ error: 'Wallet address and signature are required' });
    }

    // Find and consume nonce
    const nonceRecord = await prisma.authNonce.findFirst({
      where: {
        walletAddress,
        consumedAt: null,
        expiresAt: { gt: new Date() },
      },
      orderBy: { createdAt: 'desc' },
    });


    if (!nonceRecord) {
      return res.status(400).json({ error: 'Invalid or expired nonce' });
    }

    // TODO: Verify signature using Sui SDK
    // const isValid = verifySignature(nonceRecord.nonce, signature, walletAddress);
    // if (!isValid) {
    //   return res.status(401).json({ error: 'Invalid signature' });
    // }

    // Mark nonce as consumed
    await prisma.authNonce.update({
      where: { id: nonceRecord.id },
      data: { consumedAt: new Date() },
    });

    // Find or create user
    let user = await prisma.user.findFirst({
      where: { primaryWalletAddress: walletAddress },
    });

    if (!user) {
      user = await prisma.user.create({
        data: { primaryWalletAddress: walletAddress },
      });
    }

    // Find or create wallet
    let wallet = await prisma.wallet.findUnique({
      where: { address: walletAddress },
    });

    if (!wallet) {
      wallet = await prisma.wallet.create({
        data: {
          userId: user.id,
          address: walletAddress,
          type: walletType,
        },
      });
    }

    // Generate ephemeral Ed25519 keypair for auto-signing
    const ephemeralKeypair = new Ed25519Keypair();
    const publicKey = ephemeralKeypair.getPublicKey().toSuiAddress();
    const privateKeyBytes = ephemeralKeypair.getSecretKey();

    // Encrypt and serialize the private key
    const encryptedPrivateKey = serializeEncryptedKey(privateKeyBytes, publicKey);

    // Create session with encrypted ephemeral key
    const expiresAt = new Date(Date.now() + config.sessionMaxAge);
    const session = await prisma.session.create({
      data: {
        userId: user.id,
        walletId: wallet.id,
        jwtId: crypto.randomUUID(),
        expiresAt,
        status: 'active',
        encryptedPrivateKey, // Store encrypted ephemeral key
      },
    });

    // Create refresh token
    const refreshToken = generateRefreshToken(session.id);
    const refreshTokenHash = hashToken(refreshToken);

    await prisma.refreshToken.create({
      data: {
        sessionId: session.id,
        tokenHash: refreshTokenHash,
        expiresAt: new Date(Date.now() + parseInt(config.refreshTokenExpiresIn) * 1000),
      },
    });

    // Generate access token
    const jwtPayload = createJWTPayload(
      {
        userId: user.id,
        walletId: wallet.id,
        walletAddress: wallet.address,
        walletType: wallet.type as 'sui' | 'zklogin',
      },
      session.id
    );

    const accessToken = generateAccessToken(jwtPayload);

    res.json({
      accessToken,
      refreshToken,
      session: {
        id: session.id,
        expiresAt: session.expiresAt,
        hasEphemeralKey: true, // Indicates auto-signing is enabled
      },
      user: {
        id: user.id,
        walletAddress: wallet.address,
      },
      ephemeralWallet: {
        address: publicKey,
        expiresAt: session.expiresAt,
      },
    });
  } catch (error) {
    console.error('Error verifying signature:', error);
    res.status(500).json({ error: 'Failed to verify signature' });
  }
});

/**
 * POST /api/auth/refresh
 * Refresh access token using refresh token
 */
router.post('/refresh', async (req: Request, res: Response) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return res.status(400).json({ error: 'Refresh token is required' });
    }

    const refreshTokenHash = hashToken(refreshToken);

    // Find refresh token record (tokenHash is not unique, so use findFirst)
    const tokenRecord = await prisma.refreshToken.findFirst({
      where: { tokenHash: refreshTokenHash },
      include: {
        Session: {
          include: {
            User: true,
            Wallet: true,
          },
        },
      },
    });

    if (!tokenRecord || tokenRecord.revokedAt || tokenRecord.expiresAt < new Date()) {
      return res.status(401).json({ error: 'Invalid or expired refresh token' });
    }

    // Check if session is still active
    if (tokenRecord.Session.status !== 'active' || tokenRecord.Session.expiresAt < new Date()) {
      return res.status(401).json({ error: 'Session expired' });
    }

    // Generate new access token
    const jwtPayload = createJWTPayload(
      {
        userId: tokenRecord.Session.userId,
        walletId: tokenRecord.Session.walletId,
        walletAddress: tokenRecord.Session.Wallet.address,
        walletType: tokenRecord.Session.Wallet.type as 'sui' | 'zklogin',
      },
      tokenRecord.Session.id
    );

    const accessToken = generateAccessToken(jwtPayload);

    // Update session last used
    await prisma.session.update({
      where: { id: tokenRecord.sessionId },
      data: { lastUsedAt: new Date() },
    });

    res.json({ accessToken });
  } catch (error) {
    console.error('Error refreshing token:', error);
    res.status(500).json({ error: 'Failed to refresh token' });
  }
});

export default router;

