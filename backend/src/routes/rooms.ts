import { Router, Request, Response } from "express";
import { Transaction } from '@mysten/sui/transactions';
import { SUI_CLOCK_OBJECT_ID } from '@mysten/sui/utils';
import { prisma } from "../db/prisma";
import { authenticateToken, wsSignalingServer } from "../index";
import { checkUserIsHost, getSuiClient, getEphemeralKeypair } from "../utils/blockchain";
import { config } from "../config";

const router = Router();

// Helper to convert room status code to string
function getRoomStatus(statusCode: number): "scheduled" | "active" | "ended" {
  switch (statusCode) {
    case 1:
      return "scheduled";
    case 2:
      return "active";
    case 3:
      return "ended";
    default:
      return "scheduled";
  }
}

// Helper to convert Unix timestamp to Date
function unixToDate(timestamp: bigint | null): Date | null {
  if (!timestamp) return null;
  return new Date(Number(timestamp) * 1000);
}

// GET /api/rooms - Get all meeting rooms (indexed from blockchain)
router.get("/", async (req: Request, res: Response) => {
  try {
    const { walletAddress, status } = req.query;

    // Build filter
    const where: any = {};

    // Filter by host OR participant (if walletAddress provided)
    if (walletAddress && typeof walletAddress === "string") {
      // Get rooms where user is either:
      // 1. A host (in the hosts array), OR
      // 2. A participant (in the participants relation)
      where.OR = [
        {
          hosts: {
            has: walletAddress, // Check if walletAddress is in hosts array
          },
        },
        {
          room_participants: {
            some: {
              participant_address: walletAddress,
            },
          },
        },
      ];
    }

    // Filter by status (1=scheduled, 2=active, 3=ended)
    try {
      if (status && typeof status === "string") {
        const statusMap: Record<string, number> = {
          scheduled: 1,
          active: 2,
          ended: 3,
        };
        if (statusMap[status] !== undefined) {
          where.status = statusMap[status];
        }
      }
    } catch (error) {
      throw new Error(error as string);
    }

    // Fetch meeting rooms from indexed data
    const meetingRooms = await prisma.meeting_rooms.findMany({
      where,
      include: {
        room_participants: true,
        room_metadata: true,
        ApprovalRequest: {
          where: { status: "pending" },
        },
      },
      orderBy: {
        created_at: "desc",
      },
      take: 100, // Limit for performance
    });

    res.json({
      rooms: meetingRooms.map((room) => {
        // Determine user's role in this room
        let userRole: "HOST" | "PARTICIPANT" | null = null;
        if (walletAddress && typeof walletAddress === "string") {
          // Check if user is in hosts array
          if (room.hosts.includes(walletAddress)) {
            userRole = "HOST";
          } else {
            // Check if user is in participants
            const participant = room.room_participants.find(
              (p) => p.participant_address === walletAddress
            );
            if (participant) {
              userRole = participant.role as "HOST" | "PARTICIPANT";
            }
          }
        }

        return {
          roomId: room.room_id,
          title: room.title,
          hosts: room.hosts,
          status: getRoomStatus(room.status),
          maxParticipants: Number(room.max_participants),
          requireApproval: room.require_approval,
          participantCount: room.participant_count,
          sealPolicyId: room.seal_policy_id,
          createdAt: unixToDate(room.created_at),
          startedAt: unixToDate(room.started_at),
          endedAt: unixToDate(room.ended_at),
          transactionDigest: room.transaction_digest,
          // Metadata
          language: room.room_metadata?.language,
          timezone: room.room_metadata?.timezone,
          recordingBlobId: room.room_metadata?.recording_blob_id?.toString(),
          // Backend data
          pendingApprovals: room.ApprovalRequest.length,
          // User's role in this room
          userRole,
        };
      }),
    });
  } catch (error) {
    console.error("Error fetching rooms:", error);
    res.status(500).json({ error: "Failed to fetch rooms" });
  }
});

/**
 * POST /api/rooms
 * Create room record in backend (room is already created on-chain)
 * This endpoint acknowledges the on-chain creation and waits for indexer to sync
 */
router.post("/", async (req: Request, res: Response) => {
  try {
    const {
      title,
      description,
      maxParticipants,
      initialParticipants,
      requireApproval,
      walletAddress,
      onchainObjectId,
      hostCapId,
      sealPolicyId,
    } = req.body;

    // Validate required fields
    if (!title || !onchainObjectId || !walletAddress || !sealPolicyId) {
      return res.status(400).json({
        error: "Missing required fields: title, onchainObjectId, walletAddress, sealPolicyId",
      });
    }

    // Validate onchainObjectId format (should be a Sui object ID)
    if (!onchainObjectId.startsWith("0x") || onchainObjectId.length !== 66) {
      return res.status(400).json({
        error: "Invalid onchainObjectId format",
      });
    }

    // Validate sealPolicyId format (CRITICAL for access control)
    if (!sealPolicyId.startsWith("0x") || sealPolicyId.length !== 66) {
      return res.status(400).json({
        error: "Invalid sealPolicyId format - seal policy is required for access control",
      });
    }

    // Check if room already exists
    const existingRoom = await prisma.meeting_rooms.findUnique({
      where: { room_id: onchainObjectId },
    });

    if (existingRoom) {
      // Room already exists, return it
      return res.json({
        room: {
          id: existingRoom.room_id,
          onchainObjectId: existingRoom.room_id,
          title: existingRoom.title,
          requireApproval: existingRoom.require_approval,
          createdAt: unixToDate(existingRoom.created_at),
        },
        memberships: existingRoom.participant_count,
        indexed: true,
      });
    }

    // Create room record in database
    // Note: Some fields will be populated by the indexer later (checkpoint, tx digest, etc.)
    const currentTimestamp = BigInt(Math.floor(Date.now() / 1000));

    const newRoom = await prisma.meeting_rooms.create({
      data: {
        room_id: onchainObjectId,
        title: title,
        hosts: [walletAddress], // Creator is the initial host
        status: 1, // scheduled
        max_participants: BigInt(maxParticipants || 20),
        require_approval: requireApproval || false,
        participant_count: initialParticipants?.length || 1,
        seal_policy_id: sealPolicyId, // REQUIRED - seal policy for access control
        created_at: currentTimestamp,
        started_at: BigInt(0),
        ended_at: BigInt(0),
        transaction_digest: '', // Will be updated by indexer
        checkpoint_sequence_number: BigInt(0), // Will be updated by indexer
      },
    });

    // Create host participant record (always create, even if hostCapId not provided yet)
    await prisma.room_participants.create({
      data: {
        room_id: onchainObjectId,
        participant_address: walletAddress,
        role: 'HOST',
        admin_cap_id: hostCapId || null, // Can be null initially, will be updated by indexer
        joined_at: new Date(),
      },
    });

    // Create initial participant records if provided
    if (initialParticipants && Array.isArray(initialParticipants)) {
      const participantRecords = initialParticipants
        .filter((addr: string) => addr.toLowerCase() !== walletAddress.toLowerCase()) // Don't duplicate host
        .map((addr: string) => ({
          room_id: onchainObjectId,
          participant_address: addr,
          role: 'PARTICIPANT',
          admin_cap_id: null,
          joined_at: new Date(),
        }));

      if (participantRecords.length > 0) {
        await prisma.room_participants.createMany({
          data: participantRecords,
        });
      }
    }

    res.json({
      room: {
        id: newRoom.room_id,
        onchainObjectId: newRoom.room_id,
        title: newRoom.title,
        requireApproval: newRoom.require_approval,
        createdAt: unixToDate(newRoom.created_at),
      },
      memberships: newRoom.participant_count,
      indexed: false,
      message: "Room created successfully. Indexer will sync additional data.",
    });
  } catch (error) {
    console.error("Error creating room:", error);
    res.status(500).json({ error: "Failed to create room record" });
  }
});

/**
 * GET /api/rooms/:roomId
 * Get room details by roomId (blockchain object ID)
 */
router.get("/:roomId", async (req: Request, res: Response) => {
  try {
    const { roomId } = req.params;

    const meetingRoom = await prisma.meeting_rooms.findUnique({
      where: { room_id: roomId },
      include: {
        room_participants: {
          orderBy: {
            joined_at: "desc",
          },
        },
        room_metadata: true,
        ApprovalRequest: {
          where: { status: "pending" },
          orderBy: {
            created_at: "desc",
          },
        },
      },
    });

    if (!meetingRoom) {
      return res.status(404).json({ error: "Room not found" });
    }

    // Separate hosts and participants
    const hosts = meetingRoom.room_participants.filter((p: any) => p.role === "HOST");
    const participants = meetingRoom.room_participants.filter(
      (p: any) => p.role === "PARTICIPANT"
    );

    res.json({
      room: {
        roomId: meetingRoom.room_id,
        title: meetingRoom.title,
        status: getRoomStatus(meetingRoom.status),
        maxParticipants: Number(meetingRoom.max_participants),
        requireApproval: meetingRoom.require_approval,
        participantCount: meetingRoom.participant_count,
        sealPolicyId: meetingRoom.seal_policy_id,
        createdAt: unixToDate(meetingRoom.created_at),
        startedAt: unixToDate(meetingRoom.started_at),
        endedAt: unixToDate(meetingRoom.ended_at),
        transactionDigest: meetingRoom.transaction_digest,
        checkpointSequenceNumber: Number(meetingRoom.checkpoint_sequence_number),
      },
      hosts: hosts.map((h: any) => ({
        address: h.participant_address || h.participantAddress, // Try both field names
        adminCapId: h.admin_cap_id || h.adminCapId,
        joinedAt: h.joined_at || h.joinedAt,
      })),
      participants: participants.map((p: any) => ({
        address: p.participant_address || p.participantAddress,
        joinedAt: p.joined_at || p.joinedAt,
      })),
      metadata: meetingRoom.room_metadata
        ? {
          language: meetingRoom.room_metadata.language,
          timezone: meetingRoom.room_metadata.timezone,
          recordingBlobId: meetingRoom.room_metadata.recording_blob_id?.toString(),
          dynamicFieldId: meetingRoom.room_metadata.dynamic_field_id,
        }
        : null,
      pendingApprovals: meetingRoom.ApprovalRequest.map((a) => ({
        id: a.id,
        requesterAddress: a.requester_address,
        createdAt: a.created_at,
      })),
    });
  } catch (error) {
    console.error("Error fetching room:", error);
    res.status(500).json({ error: "Failed to fetch room" });
  }
});

// Other routes require authentication
router.use(authenticateToken);

/**
 * POST /api/rooms/:roomId/approval-request
 * Create an approval request for a room
 * User must be authenticated
 */
router.post(
  "/:roomId/approval-request",
  async (req: Request, res: Response) => {
    try {
      const { roomId } = req.params;
      const walletAddress = req.user!.wal; // JWT payload contains 'wal' property (wallet address)

      console.log('[Approval] ===== JOIN REQUEST RECEIVED =====');
      console.log('[Approval] Room ID:', roomId.slice(0, 10) + '...');
      console.log('[Approval] Requester:', walletAddress.slice(0, 10) + '...');

      // Check if room exists
      const meetingRoom = await prisma.meeting_rooms.findUnique({
        where: { room_id: roomId },
      });

      if (!meetingRoom) {
        return res.status(404).json({ error: "Room not found" });
      }

      // Check if room requires approval
      if (!meetingRoom.require_approval) {
        return res
          .status(400)
          .json({ error: "Room does not require approval" });
      }

      // Check if already a participant
      const existingParticipant = await prisma.room_participants.findUnique({
        where: {
          room_id_participant_address: {
            room_id: roomId,
            participant_address: walletAddress,
          },
        },
      });

      if (existingParticipant) {
        return res.status(400).json({ error: "Already a participant" });
      }

      // Check for existing pending approval
      const existingApproval = await prisma.approvalRequest.findFirst({
        where: {
          room_id: roomId,
          requester_address: walletAddress,
          status: "pending",
        },
      });

      let approvalRequest;

      if (existingApproval) {
        // Update existing request's timestamp to bump it up (user is re-requesting)
        console.log('[Approval] Re-request detected, updating timestamp for:', walletAddress);
        approvalRequest = await prisma.approvalRequest.update({
          where: { id: existingApproval.id },
          data: {
            created_at: new Date(), // Update timestamp to current time
          },
        });
      } else {
        // Create new approval request
        console.log('[Approval] Creating new request for:', walletAddress);
        approvalRequest = await prisma.approvalRequest.create({
          data: {
            room_id: roomId,
            requester_address: walletAddress,
            status: "pending",
          },
        });
      }

      // Notify all hosts via WebSocket
      console.log('[Approval] Approval request created/updated successfully');
      console.log('[Approval] Notifying hosts:', meetingRoom.hosts.map(h => h.slice(0, 10) + '...'));
      console.log('[Approval] Request ID:', approvalRequest.id);

      wsSignalingServer.notifyHostsOfJoinRequest(
        roomId,
        meetingRoom.hosts,
        {
          id: approvalRequest.id,
          requesterAddress: approvalRequest.requester_address,
          createdAt: approvalRequest.created_at,
        }
      );

      console.log('[Approval] WebSocket notification sent');

      res.json({
        approvalRequest: {
          id: approvalRequest.id,
          roomId: approvalRequest.room_id,
          requesterAddress: approvalRequest.requester_address,
          status: approvalRequest.status,
          createdAt: approvalRequest.created_at,
        },
        isRetry: !!existingApproval, // Indicate if this was a retry
      });
    } catch (error) {
      console.error("Error creating approval request:", error);
      res.status(500).json({ error: "Failed to create approval request" });
    }
  }
);

/**
 * POST /api/rooms/:roomId/approve/:requestId
 * Approve a guest approval request
 * Flow: Frontend executes on-chain tx -> Calls this endpoint with txDigest -> Database update -> WebSocket notification
 * Only room hosts can approve
 */
router.post(
  "/:roomId/approve/:requestId",
  async (req: Request, res: Response) => {
    try {
      const { roomId, requestId } = req.params;
      const { txDigest } = req.body; // Transaction digest from frontend (after on-chain approval)
      const walletAddress = req.user!.wal;

      console.log('[Approve] ===== APPROVAL REQUEST STARTED =====');
      console.log('[Approve] Request ID:', requestId);
      console.log('[Approve] Room ID:', roomId.slice(0, 10) + '...');
      console.log('[Approve] Host:', walletAddress.slice(0, 10) + '...');
      console.log('[Approve] TX Digest:', txDigest || 'none provided');

      // Get the approval request to find the guest address
      const approvalRequest = await prisma.approvalRequest.findFirst({
        where: {
          id: requestId,
          room_id: roomId,
          status: "pending",
        },
      });

      if (!approvalRequest) {
        return res.status(404).json({
          error: "Approval request not found or already processed"
        });
      }

      const guestAddress = approvalRequest.requester_address;
      console.log('[Approve] Guest to approve:', guestAddress.slice(0, 10) + '...');

      // Verify room exists and user is a host
      const meetingRoom = await prisma.meeting_rooms.findUnique({
        where: { room_id: roomId },
        include: {
          room_participants: {
            where: {
              participant_address: walletAddress,
              role: "HOST",
            },
          },
        },
      });

      if (!meetingRoom) {
        return res.status(404).json({ error: "Room not found" });
      }

      if (meetingRoom.room_participants.length === 0) {
        return res
          .status(403)
          .json({ error: "Only room hosts can approve guests" });
      }

      // Add participant to database
      console.log('[Approve] Adding participant to database...');
      try {
        await prisma.room_participants.create({
          data: {
            room_id: roomId,
            participant_address: guestAddress,
            role: 'PARTICIPANT',
          },
        });
        console.log('[Approve] Participant added to database');
      } catch (dbError: any) {
        // Ignore duplicate key errors (participant already exists)
        if (dbError.code !== 'P2002') {
          throw dbError;
        }
        console.log('[Approve] Participant already in database, skipping');
      }

      // Update approval request status
      console.log('[Approve] Updating approval request status...');
      await prisma.approvalRequest.updateMany({
        where: {
          id: requestId,
          room_id: roomId,
        },
        data: {
          status: "approved",
          resolved_at: new Date(),
          resolver_address: walletAddress,
        },
      });

      // Send WebSocket notification to guest
      console.log('[Approve] Sending WebSocket notification to guest...');
      wsSignalingServer.notifyGuestApproved(roomId, guestAddress, walletAddress);

      console.log('[Approve] ===== APPROVAL COMPLETED SUCCESSFULLY =====');
      res.json({
        message: "Guest approved and added to room",
        txDigest: txDigest || null,
        guestAddress,
      });
    } catch (error) {
      console.error("[Approve] Error approving guest:", error);
      res.status(500).json({
        error: "Failed to approve guest",
        details: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  }
);

/**
 * POST /api/rooms/:roomId/deny/:requestId
 * Deny a guest approval request
 * Updates database and sends real-time notification
 * Only room hosts can deny
 */
router.post("/:roomId/deny/:requestId", async (req: Request, res: Response) => {
  try {
    const { roomId, requestId } = req.params;
    const walletAddress = req.user!.wal;

    console.log('[Deny] ===== DENIAL REQUEST STARTED =====');
    console.log('[Deny] Request ID:', requestId);
    console.log('[Deny] Room ID:', roomId.slice(0, 10) + '...');
    console.log('[Deny] Host:', walletAddress.slice(0, 10) + '...');

    // Get the approval request to find the guest address
    const approvalRequest = await prisma.approvalRequest.findFirst({
      where: {
        id: requestId,
        room_id: roomId,
        status: "pending",
      },
    });

    if (!approvalRequest) {
      return res.status(404).json({
        error: "Approval request not found or already processed"
      });
    }

    const guestAddress = approvalRequest.requester_address;
    console.log('[Deny] Guest to deny:', guestAddress.slice(0, 10) + '...');

    // Verify room exists and user is a host
    const meetingRoom = await prisma.meeting_rooms.findUnique({
      where: { room_id: roomId },
      include: {
        room_participants: {
          where: {
            participant_address: walletAddress,
            role: "HOST",
          },
        },
      },
    });

    if (!meetingRoom) {
      return res.status(404).json({ error: "Room not found" });
    }

    if (meetingRoom.room_participants.length === 0) {
      return res.status(403).json({ error: "Only room hosts can deny guests" });
    }

    // Update approval request status
    console.log('[Deny] Updating approval request status...');
    await prisma.approvalRequest.updateMany({
      where: {
        id: requestId,
        room_id: roomId,
      },
      data: {
        status: "denied",
        resolved_at: new Date(),
        resolver_address: walletAddress,
      },
    });

    // Send WebSocket notification to guest
    console.log('[Deny] Sending WebSocket notification to guest...');
    wsSignalingServer.notifyGuestRejected(roomId, guestAddress, walletAddress);

    console.log('[Deny] ===== DENIAL COMPLETED SUCCESSFULLY =====');
    res.json({
      message: "Approval request denied",
      guestAddress,
    });
  } catch (error) {
    console.error("[Deny] Error denying guest:", error);
    res.status(500).json({
      error: "Failed to deny guest",
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

/**
 * POST /api/rooms/:roomId/approve-status/:guestAddress
 * Update approval request status after frontend signing
 * Called after host approves guest on frontend
 */
router.post("/:roomId/approve-status/:guestAddress", async (req: Request, res: Response) => {
  try {
    const { roomId, guestAddress } = req.params;
    const { txDigest } = req.body; // Transaction digest from frontend signing
    const walletAddress = req.user!.wal;

    // Validate addresses
    if (!guestAddress.startsWith('0x') || guestAddress.length !== 66) {
      return res.status(400).json({ error: 'Invalid guest address format' });
    }
    if (!roomId.startsWith('0x') || roomId.length !== 66) {
      return res.status(400).json({ error: 'Invalid room ID format' });
    }

    // Verify user is host on blockchain
    let isHost: boolean;
    try {
      isHost = await checkUserIsHost(roomId, walletAddress);
    } catch (error) {
      console.error('Error checking host status:', error);
      return res.status(500).json({
        error: 'Failed to verify host status on blockchain',
        details: error instanceof Error ? error.message : 'Unknown error'
      });
    }

    if (!isHost) {
      return res.status(403).json({ error: 'Only room hosts can approve guests' });
    }

    // Update approval request status
    const updateResult = await prisma.approvalRequest.updateMany({
      where: {
        room_id: roomId,
        requester_address: guestAddress,
        status: 'pending',
      },
      data: {
        status: 'approved',
        resolved_at: new Date(),
        resolver_address: walletAddress,
      },
    });

    if (updateResult.count === 0) {
      return res.status(404).json({
        error: 'Approval request not found or already processed',
      });
    }

    // Notify guest via WebSocket that they've been approved
    wsSignalingServer.notifyGuestApproved(roomId, guestAddress, walletAddress);

    res.json({
      success: true,
      txDigest: txDigest || null,
      guestAddress,
      message: 'Approval request updated successfully',
    });
  } catch (error) {
    console.error('Error updating approval status:', error);
    res.status(500).json({
      error: 'Failed to update approval status',
      details: error instanceof Error ? error.message : 'Unknown error',
    });
  }
});
/**
 * POST /api/rooms/:roomId/revoke/:userAddress
 * Revoke user access from room using ephemeral key (auto-sign)
 * Only room hosts can revoke
 */
router.post("/:roomId/revoke/:userAddress", async (req: Request, res: Response) => {
  try {
    const { roomId, userAddress } = req.params;
    const walletAddress = req.user!.wal;
    const sessionId = req.user!.sid;

    // Validate addresses
    if (!userAddress.startsWith('0x') || userAddress.length !== 66) {
      return res.status(400).json({ error: 'Invalid user address format' });
    }
    if (!roomId.startsWith('0x') || roomId.length !== 66) {
      return res.status(400).json({ error: 'Invalid room ID format' });
    }

    // Verify user is host on blockchain
    let isHost: boolean;
    try {
      isHost = await checkUserIsHost(roomId, walletAddress);
    } catch (error) {
      console.error('Error checking host status:', error);
      return res.status(500).json({
        error: 'Failed to verify host status on blockchain',
        details: error instanceof Error ? error.message : 'Unknown error'
      });
    }

    if (!isHost) {
      return res.status(403).json({ error: 'Only room hosts can revoke users' });
    }

    // Get active session with ephemeral key
    const session = await prisma.session.findFirst({
      where: {
        id: sessionId,
        status: 'active',
        expiresAt: { gt: new Date() },
      },
    });

    if (!session || !session.encryptedPrivateKey) {
      return res.status(401).json({ error: 'Session not found or missing ephemeral key' });
    }

    // Get HostCap owned by user for this room
    const suiClient = getSuiClient();
    const hostCaps = await suiClient.getOwnedObjects({
      owner: walletAddress,
      filter: { StructType: `${config.suiPackageId}::sealmeet::HostCap` },
      options: { showContent: true },
    });

    let hostCapId: string | null = null;
    for (const cap of hostCaps.data) {
      const fields = (cap.data?.content as any)?.fields;
      if (fields?.room_id === roomId) {
        hostCapId = cap.data!.objectId;
        break;
      }
    }

    if (!hostCapId) {
      return res.status(404).json({ error: 'HostCap not found for this room' });
    }

    // Decrypt ephemeral keypair and build transaction
    const ephemeralKeypair = getEphemeralKeypair(session.encryptedPrivateKey);

    const tx = new Transaction();
    tx.moveCall({
      target: `${config.suiPackageId}::sealmeet::revoke_guest`,
      arguments: [
        tx.object(hostCapId),
        tx.object(roomId),
        tx.pure.address(userAddress),
        tx.object(SUI_CLOCK_OBJECT_ID),
      ],
    });

    // Sign and execute transaction with ephemeral key (no wallet popup!)
    const signedTx = await tx.sign({ client: suiClient, signer: ephemeralKeypair });
    const result = await suiClient.executeTransactionBlock({
      transactionBlock: signedTx.bytes,
      signature: signedTx.signature,
      options: {
        showEffects: true,
        showObjectChanges: true,
      },
    });

    const txDigest = result.digest;

    // Log in DelegatedSignature for audit trail
    await prisma.delegatedSignature.create({
      data: {
        sessionId: session.id,
        action: 'revoke_guest',
        roomId: roomId,
        txDigest: txDigest,
        signature: signedTx.signature,
      },
    });

    res.json({
      success: true,
      txDigest,
      userAddress,
      message: 'User access revoked successfully',
    });
  } catch (error) {
    console.error('Error revoking user:', error);
    res.status(500).json({
      error: 'Failed to revoke user access',
      details: error instanceof Error ? error.message : 'Unknown error',
    });
  }
});

/**
 * POST /api/rooms/:roomId/recording/start
 * Start recording for room (placeholder - updates metadata)
 * Only room hosts can start recording
 */
router.post("/:roomId/recording/start", async (req: Request, res: Response) => {
  try {
    const { roomId } = req.params;
    const walletAddress = req.user!.wal;
    const sessionId = req.user!.sid;

    // Validate room ID
    if (!roomId.startsWith('0x') || roomId.length !== 66) {
      return res.status(400).json({ error: 'Invalid room ID format' });
    }

    // Verify user is host on blockchain
    let isHost: boolean;
    try {
      isHost = await checkUserIsHost(roomId, walletAddress);
    } catch (error) {
      console.error('Error checking host status:', error);
      return res.status(500).json({
        error: 'Failed to verify host status on blockchain',
        details: error instanceof Error ? error.message : 'Unknown error'
      });
    }

    if (!isHost) {
      return res.status(403).json({ error: 'Only room hosts can start recording' });
    }

    // Get active session
    const session = await prisma.session.findFirst({
      where: {
        id: sessionId,
        status: 'active',
        expiresAt: { gt: new Date() },
      },
    });

    if (!session) {
      return res.status(401).json({ error: 'Session not found' });
    }

    // Log action in DelegatedSignature (no tx for now - this is placeholder)
    await prisma.delegatedSignature.create({
      data: {
        sessionId: session.id,
        action: 'recording_start',
        roomId: roomId,
        txDigest: null,
        signature: '',
      },
    });

    res.json({
      success: true,
      message: 'Recording started (placeholder)',
      roomId,
    });
  } catch (error) {
    console.error('Error starting recording:', error);
    res.status(500).json({
      error: 'Failed to start recording',
      details: error instanceof Error ? error.message : 'Unknown error',
    });
  }
});

/**
 * POST /api/rooms/:roomId/recording/stop
 * Stop recording for room (placeholder - updates metadata with blob ID)
 * Only room hosts can stop recording
 */
router.post("/:roomId/recording/stop", async (req: Request, res: Response) => {
  try {
    const { roomId } = req.params;
    const { blobId } = req.body; // Optional Walrus blob ID
    const walletAddress = req.user!.wal;
    const sessionId = req.user!.sid;

    // Validate room ID
    if (!roomId.startsWith('0x') || roomId.length !== 66) {
      return res.status(400).json({ error: 'Invalid room ID format' });
    }

    // Verify user is host on blockchain
    let isHost: boolean;
    try {
      isHost = await checkUserIsHost(roomId, walletAddress);
    } catch (error) {
      console.error('Error checking host status:', error);
      return res.status(500).json({
        error: 'Failed to verify host status on blockchain',
        details: error instanceof Error ? error.message : 'Unknown error'
      });
    }

    if (!isHost) {
      return res.status(403).json({ error: 'Only room hosts can stop recording' });
    }

    // Get active session
    const session = await prisma.session.findFirst({
      where: {
        id: sessionId,
        status: 'active',
        expiresAt: { gt: new Date() },
      },
    });

    if (!session) {
      return res.status(401).json({ error: 'Session not found' });
    }

    // Log action in DelegatedSignature (no tx for now - this is placeholder)
    await prisma.delegatedSignature.create({
      data: {
        sessionId: session.id,
        action: 'recording_stop',
        roomId: roomId,
        txDigest: null,
        signature: '',
      },
    });

    res.json({
      success: true,
      message: 'Recording stopped (placeholder)',
      roomId,
      blobId: blobId || null,
    });
  } catch (error) {
    console.error('Error stopping recording:', error);
    res.status(500).json({
      error: 'Failed to stop recording',
      details: error instanceof Error ? error.message : 'Unknown error',
    });
  }
});

/**
 * POST /api/rooms/:roomId/end
 * End room using ephemeral key (auto-sign)
 * Only room hosts can end room
 */
router.post("/:roomId/end", async (req: Request, res: Response) => {
  try {
    const { roomId } = req.params;
    const walletAddress = req.user!.wal;
    const sessionId = req.user!.sid;

    // Validate room ID
    if (!roomId.startsWith('0x') || roomId.length !== 66) {
      return res.status(400).json({ error: 'Invalid room ID format' });
    }

    // Verify user is host on blockchain
    let isHost: boolean;
    try {
      isHost = await checkUserIsHost(roomId, walletAddress);
    } catch (error) {
      console.error('Error checking host status:', error);
      return res.status(500).json({
        error: 'Failed to verify host status on blockchain',
        details: error instanceof Error ? error.message : 'Unknown error'
      });
    }

    if (!isHost) {
      return res.status(403).json({ error: 'Only room hosts can end room' });
    }

    // Get active session with ephemeral key
    const session = await prisma.session.findFirst({
      where: {
        id: sessionId,
        status: 'active',
        expiresAt: { gt: new Date() },
      },
    });

    if (!session || !session.encryptedPrivateKey) {
      return res.status(401).json({ error: 'Session not found or missing ephemeral key' });
    }

    // Get HostCap owned by user for this room
    const suiClient = getSuiClient();
    const hostCaps = await suiClient.getOwnedObjects({
      owner: walletAddress,
      filter: { StructType: `${config.suiPackageId}::sealmeet::HostCap` },
      options: { showContent: true },
    });

    let hostCapId: string | null = null;
    for (const cap of hostCaps.data) {
      const fields = (cap.data?.content as any)?.fields;
      if (fields?.room_id === roomId) {
        hostCapId = cap.data!.objectId;
        break;
      }
    }

    if (!hostCapId) {
      return res.status(404).json({ error: 'HostCap not found for this room' });
    }

    // Get registry object ID from environment
    const registryId = process.env.REGISTRY_OBJECT_ID;
    if (!registryId) {
      return res.status(500).json({ error: 'REGISTRY_OBJECT_ID not configured' });
    }

    // Decrypt ephemeral keypair and build transaction
    const ephemeralKeypair = getEphemeralKeypair(session.encryptedPrivateKey);

    const tx = new Transaction();
    tx.moveCall({
      target: `${config.suiPackageId}::sealmeet::end_room`,
      arguments: [
        tx.object(hostCapId),
        tx.object(registryId),
        tx.object(roomId),
        tx.object(SUI_CLOCK_OBJECT_ID),
      ],
    });

    // Sign and execute transaction with ephemeral key (no wallet popup!)
    const signedTx = await tx.sign({ client: suiClient, signer: ephemeralKeypair });
    const result = await suiClient.executeTransactionBlock({
      transactionBlock: signedTx.bytes,
      signature: signedTx.signature,
      options: {
        showEffects: true,
        showObjectChanges: true,
      },
    });

    const txDigest = result.digest;

    // Log in DelegatedSignature for audit trail
    await prisma.delegatedSignature.create({
      data: {
        sessionId: session.id,
        action: 'end_room',
        roomId: roomId,
        txDigest: txDigest,
        signature: signedTx.signature,
      },
    });

    res.json({
      success: true,
      txDigest,
      message: 'Room ended successfully',
    });
  } catch (error) {
    console.error('Error ending room:', error);
    res.status(500).json({
      error: 'Failed to end room',
      details: error instanceof Error ? error.message : 'Unknown error',
    });
  }
});

export default router;
