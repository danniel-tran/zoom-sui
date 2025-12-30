import { Router, Request, Response } from 'express';
import { SessionKey } from '@mysten/seal';
import { prisma } from '../db/prisma';
import { authenticateToken } from '../index';
import { checkUserInRoomParticipants, getSuiClient, getEphemeralKeypair } from '../utils/blockchain';
import { config } from '../config';

const router = Router();

// All routes require JWT authentication
router.use(authenticateToken);

/**
 * POST /api/seal/validate-and-refresh
 * Validate user access to room and refresh SessionKey
 *
 * Flow:
 * 1. Get authenticated user from JWT
 * 2. Find active session with encryptedPrivateKey
 * 3. Query blockchain: Is user in room.participants?
 * 4. If not → return 403 with { error: "You have been removed", removed: true }
 * 5. If yes → decrypt ephemeral key, create new SessionKey using ephemeral key as signer
 * 6. Log action in DelegatedSignature (action: "sessionkey_refresh")
 * 7. Return serialized SessionKey to frontend
 */
router.post('/validate-and-refresh', async (req: Request, res: Response) => {
  try {
    const { roomId } = req.body;
    const walletAddress = req.user!.wal; // JWT payload contains 'wal' property
    const sessionId = req.user!.sid; // JWT payload contains 'sid' property (session ID)

    // Validate required fields
    if (!roomId || typeof roomId !== 'string') {
      return res.status(400).json({ error: 'roomId is required' });
    }

    // Validate roomId format (Sui object ID)
    if (!roomId.startsWith('0x') || roomId.length !== 66) {
      return res.status(400).json({ error: 'Invalid roomId format' });
    }

    // Find active session with encrypted private key
    const session = await prisma.session.findFirst({
      where: {
        id: sessionId,
        status: 'active',
        expiresAt: { gt: new Date() },
      },
    });

    if (!session) {
      return res.status(401).json({ error: 'Session not found or expired' });
    }

    if (!session.encryptedPrivateKey) {
      return res.status(500).json({ error: 'Session does not have ephemeral key' });
    }

    // Query blockchain: Is user in room.participants?
    let isParticipant: boolean;
    try {
      isParticipant = await checkUserInRoomParticipants(roomId, walletAddress);
    } catch (error) {
      console.error('Error checking blockchain participants:', error);
      return res.status(500).json({
        error: 'Failed to verify room access on blockchain',
        details: error instanceof Error ? error.message : 'Unknown error'
      });
    }

    // If user has been removed from room participants
    if (!isParticipant) {
      return res.status(403).json({
        error: 'You have been removed from this room',
        removed: true,
      });
    }

    // User is still a participant - create new SessionKey
    try {
      // Decrypt ephemeral keypair
      const ephemeralKeypair = getEphemeralKeypair(session.encryptedPrivateKey);
      const ephemeralAddress = ephemeralKeypair.getPublicKey().toSuiAddress();

      // Create SessionKey using ephemeral keypair as signer
      const suiClient = getSuiClient();
      const sessionKey = await SessionKey.create({
        address: ephemeralAddress,
        packageId: config.suiPackageId,
        ttlMin: 30, // 30 minutes TTL
        suiClient: suiClient as any,
      });

      // Sign the personal message with ephemeral keypair
      const personalMessage = sessionKey.getPersonalMessage();
      // personalMessage is already a Uint8Array, no need to encode
      const signatureBytes = await ephemeralKeypair.sign(personalMessage);

      // Convert Uint8Array signature to base64 string
      const signatureBase64 = Buffer.from(signatureBytes).toString('base64');

      // Set the signature on the SessionKey (expects string)
      await sessionKey.setPersonalMessageSignature(signatureBase64);

      // Serialize SessionKey for frontend (using toJSON instead of serialize)
      const serialized = JSON.stringify(sessionKey);

      // Get SessionKey metadata
      const createdAt = new Date();
      const expiresAt = new Date(createdAt.getTime() + 30 * 60 * 1000); // 30 minutes from now

      // Log action in DelegatedSignature for audit trail
      await prisma.delegatedSignature.create({
        data: {
          sessionId: session.id,
          action: 'sessionkey_refresh',
          roomId: roomId,
          txDigest: null, // No transaction for SessionKey creation
          signature: signatureBase64,
        },
      });

      // Update session last used
      await prisma.session.update({
        where: { id: session.id },
        data: { lastUsedAt: new Date() },
      });

      res.json({
        success: true,
        sessionKey: {
          serialized,
          expiresAt: expiresAt.toISOString(),
          createdAt: createdAt.toISOString(),
          ephemeralAddress,
        },
      });
    } catch (error) {
      console.error('Error creating SessionKey:', error);
      return res.status(500).json({
        error: 'Failed to create SessionKey',
        details: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  } catch (error) {
    console.error('Error in validate-and-refresh:', error);
    res.status(500).json({
      error: 'Failed to validate and refresh SessionKey',
      details: error instanceof Error ? error.message : 'Unknown error',
    });
  }
});

/**
 * POST /api/seal/check-access
 * Check if user has access to a room by querying database
 * Returns: { hasAccess: boolean, removed?: boolean }
 */
router.post('/check-access', async (req: Request, res: Response) => {
  try {
    const { roomId } = req.body;
    console.log(req.user);
    const walletAddress = req.user!.wal;

    if (!roomId || typeof roomId !== 'string') {
      return res.status(400).json({ error: 'roomId is required' });
    }

    if (!roomId.startsWith('0x') || roomId.length !== 66) {
      return res.status(400).json({ error: 'Invalid roomId format' });
    }

    // Query database for participant record
    let isParticipant: boolean;
    try {
      const participant = await prisma.room_participants.findFirst({
        where: {
          room_id: roomId,
          participant_address: walletAddress,
        },
      });

      isParticipant = !!participant;

      console.log('[check-access] Database check:', {
        roomId,
        walletAddress,
        isParticipant,
      });
    } catch (error) {
      console.error('Error checking database participants:', error);
      return res.status(500).json({
        error: 'Failed to verify room access in database',
        details: error instanceof Error ? error.message : 'Unknown error',
      });
    }

    res.json({
      hasAccess: isParticipant,
      removed: !isParticipant,
    });
  } catch (error) {
    console.error('Error in check-access:', error);
    res.status(500).json({
      error: 'Failed to check access',
      details: error instanceof Error ? error.message : 'Unknown error',
    });
  }
});

export default router;
