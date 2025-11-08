import { Router, Request, Response } from 'express';
import { prisma } from '../lib/prisma';
import { authenticateToken } from '../index';
import { config } from '../config';

const router = Router();

// Room creation doesn't require JWT - wallet address is provided directly
// Other routes still require authentication
router.post('/', async (req: Request, res: Response) => {
  try {
    const { title, initialParticipants, requireApproval = true, walletAddress } = req.body;
    
    if (!walletAddress) {
      return res.status(400).json({ error: 'Wallet address is required' });
    }

    if (!title || !Array.isArray(initialParticipants)) {
      return res.status(400).json({ error: 'Title and initial participants are required' });
    }

    // Find or create user and wallet (no JWT required - wallet address is proof)
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
          type: 'sui',
        },
      });
    }

    // TODO: Create room on-chain via Sui transaction
    // For now, create room record (onchainObjectId will be set after on-chain creation)
    const room = await prisma.room.create({
      data: {
        onchainObjectId: `temp_${Date.now()}`, // Temporary, will be updated after on-chain creation
        ownerUserId: user.id,
        ownerWalletId: wallet.id,
        title,
        requireApproval,
        sealPolicyId: null, // Will be set after Seal policy creation
        attendanceCount: initialParticipants.length,
      },
    });

    // Create memberships
    const memberships = await Promise.all(
      initialParticipants.map((address: string) =>
        prisma.roomMembership.create({
          data: {
            roomId: room.id,
            walletAddress: address,
            role: address === walletAddress ? 'host' : 'guest',
            status: 'active',
          },
        })
      )
    );

    res.json({
      room: {
        id: room.id,
        onchainObjectId: room.onchainObjectId,
        title: room.title,
        requireApproval: room.requireApproval,
        createdAt: room.createdAt,
      },
      memberships: memberships.length,
    });
  } catch (error) {
    console.error('Error creating room:', error);
    res.status(500).json({ error: 'Failed to create room' });
  }
});

// Other routes require authentication
router.use(authenticateToken);

/**
 * GET /api/rooms/:roomId
 * Get room details
 */
router.get('/:roomId', async (req: Request, res: Response) => {
  try {
    const { roomId } = req.params;

    const room = await prisma.room.findUnique({
      where: { id: roomId },
      include: {
        ownerUser: true,
        ownerWallet: true,
        memberships: true,
        approvals: {
          where: { status: 'pending' },
        },
      },
    });

    if (!room) {
      return res.status(404).json({ error: 'Room not found' });
    }

    res.json({
      room: {
        id: room.id,
        onchainObjectId: room.onchainObjectId,
        title: room.title,
        requireApproval: room.requireApproval,
        sealPolicyId: room.sealPolicyId,
        startTime: room.startTime,
        endTime: room.endTime,
        attendanceCount: room.attendanceCount,
        createdAt: room.createdAt,
      },
      owner: {
        walletAddress: room.ownerWallet.address,
      },
      memberships: room.memberships.length,
      pendingApprovals: room.approvals.length,
    });
  } catch (error) {
    console.error('Error fetching room:', error);
    res.status(500).json({ error: 'Failed to fetch room' });
  }
});

/**
 * POST /api/rooms/:roomId/approve
 * Approve a guest to join the room
 */
router.post('/:roomId/approve', async (req: Request, res: Response) => {
  try {
    const { roomId } = req.params;
    const { guestAddress } = req.body;
    const walletAddress = req.user!.wal;

    if (!guestAddress) {
      return res.status(400).json({ error: 'Guest address is required' });
    }

    // Verify user is the room owner
    const room = await prisma.room.findUnique({
      where: { id: roomId },
      include: { ownerWallet: true },
    });

    if (!room) {
      return res.status(404).json({ error: 'Room not found' });
    }

    if (room.ownerWallet.address !== walletAddress) {
      return res.status(403).json({ error: 'Only room owner can approve guests' });
    }

    // Create or update membership
    const membership = await prisma.roomMembership.upsert({
      where: {
        roomId_walletAddress: {
          roomId,
          walletAddress: guestAddress,
        },
      },
      update: {
        status: 'active',
        updatedAt: new Date(),
      },
      create: {
        roomId,
        walletAddress: guestAddress,
        role: 'guest',
        status: 'active',
      },
    });

    // Update approval request if exists
    await prisma.approvalRequest.updateMany({
      where: {
        roomId,
        requesterAddress: guestAddress,
        status: 'pending',
      },
      data: {
        status: 'approved',
        resolvedAt: new Date(),
        resolverAddress: walletAddress,
      },
    });

    // TODO: Update on-chain Seal policy via Sui transaction

    res.json({
      membership: {
        id: membership.id,
        walletAddress: membership.walletAddress,
        status: membership.status,
      },
    });
  } catch (error) {
    console.error('Error approving guest:', error);
    res.status(500).json({ error: 'Failed to approve guest' });
  }
});

export default router;

