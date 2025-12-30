import { WebSocketServer, WebSocket } from 'ws';
import { Server } from 'http';
import { verifyToken } from '../lib/jwt';

// Types
interface SignalingMessage {
  type: 'join' | 'leave' | 'offer' | 'answer' | 'candidate' | 'participants-request' | 'participant-metadata';
  roomId: string;
  from: string;
  to?: string;
  data?: any;
  metadata?: ParticipantMetadata;
}

interface ParticipantMetadata {
  name?: string;
  walletAddress: string;
  avatar?: string;
  role?: 'host' | 'co-host' | 'guest';
}

interface ParticipantConnection {
  ws: WebSocket;
  participantId: string;
  roomId: string;
  metadata?: ParticipantMetadata;
}

interface RoomState {
  participants: Map<string, WebSocket>; // participantId -> WebSocket
  participantMetadata: Map<string, ParticipantMetadata>; // participantId -> metadata
  connections: Map<string, PeerConnection>; // "fromId:toId" -> connection state
}

interface PeerConnection {
  offer?: any;
  answer?: any;
  candidates: any[];
}

export class WebSocketSignalingServer {
  private wss: WebSocketServer;
  private rooms: Map<string, RoomState> = new Map();
  private connections: Map<WebSocket, ParticipantConnection> = new Map();

  constructor(server: Server) {
    this.wss = new WebSocketServer({
      server,
      path: '/ws/signaling'
    });

    this.wss.on('connection', this.handleConnection.bind(this));
    console.log('🔌 WebSocket signaling server initialized at /ws/signaling');
  }

  private handleConnection(ws: WebSocket, req: any) {
    console.log('[WS] New connection attempt');

    // Extract token from query params
    const url = new URL(req.url!, `http://${req.headers.host}`);
    const token = url.searchParams.get('token');
    const roomId = url.searchParams.get('roomId');
    const participantId = url.searchParams.get('participantId');

    // Validate required parameters
    if (!roomId || !participantId) {
      console.log('[WS] Missing roomId or participantId');
      ws.close(1008, 'Missing roomId or participantId');
      return;
    }

    // Optional: Verify JWT token
    if (token) {
      try {
        verifyToken(token);
      } catch (err) {
        console.log('[WS] Invalid token');
        ws.close(1008, 'Invalid token');
        return;
      }
    }

    // Store connection info
    this.connections.set(ws, { ws, participantId, roomId });

    // Add participant to room
    this.addParticipantToRoom(roomId, participantId, ws);

    // Send current participants list
    this.sendParticipantsList(roomId, participantId);

    // Notify others about new participant
    this.broadcastToRoom(roomId, {
      type: 'participant-joined',
      participantId,
      roomId
    }, participantId);

    console.log(`[WS] Participant ${participantId.slice(0, 10)}... joined room ${roomId.slice(0, 10)}...`);

    // Handle messages
    ws.on('message', (data: Buffer) => {
      try {
        const message: SignalingMessage = JSON.parse(data.toString());
        this.handleMessage(ws, message);
      } catch (err) {
        console.error('[WS] Failed to parse message:', err);
      }
    });

    // Handle disconnection
    ws.on('close', () => {
      const conn = this.connections.get(ws);
      if (conn) {
        const room = this.rooms.get(conn.roomId);

        // Only remove participant if THIS WebSocket is the current one for this participant
        // This prevents React Strict Mode double-mounting from removing active connections
        if (room && room.participants.get(conn.participantId) === ws) {
          this.removeParticipantFromRoom(conn.roomId, conn.participantId);

          // Notify others about participant leaving
          this.broadcastToRoom(conn.roomId, {
            type: 'participant-left',
            participantId: conn.participantId,
            roomId: conn.roomId
          }, conn.participantId);

          console.log(`[WS] Participant ${conn.participantId.slice(0, 10)}... left room ${conn.roomId.slice(0, 10)}...`);
        } else {
          console.log(`[WS] Stale connection closed for ${conn.participantId.slice(0, 10)}... (newer connection exists)`);
        }

        this.connections.delete(ws);
      }
    });

    // Handle errors
    ws.on('error', (err) => {
      console.error('[WS] WebSocket error:', err);
    });
  }

  private handleMessage(ws: WebSocket, message: SignalingMessage) {
    const conn = this.connections.get(ws);
    if (!conn) return;

    const { type, roomId, from, to, data } = message;

    console.log(`[WS] Message: ${type} from ${from.slice(0, 10)}... ${to ? `to ${to.slice(0, 10)}...` : ''} in room ${roomId.slice(0, 10)}...`);

    switch (type) {
      case 'offer':
        if (to) {
          this.handleOffer(roomId, from, to, data);
        }
        break;

      case 'answer':
        if (to) {
          this.handleAnswer(roomId, from, to, data);
        }
        break;

      case 'candidate':
        if (to) {
          this.handleCandidate(roomId, from, to, data);
        }
        break;

      case 'participant-metadata':
        this.handleParticipantMetadata(roomId, from, message.metadata);
        break;

      case 'participants-request':
        this.sendParticipantsList(roomId, from);
        break;

      case 'leave':
        // Only remove if this WebSocket is the current one for the participant
        const room = this.rooms.get(roomId);
        if (room && room.participants.get(from) === ws) {
          this.removeParticipantFromRoom(roomId, from);

          // Notify others about participant leaving
          this.broadcastToRoom(roomId, {
            type: 'participant-left',
            participantId: from,
            roomId
          }, from);

          console.log(`[WS] Participant ${from.slice(0, 10)}... left room via leave message`);
        } else {
          console.log(`[WS] Ignoring leave message from stale connection ${from.slice(0, 10)}...`);
        }
        break;

      default:
        console.log(`[WS] Unknown message type: ${type}`);
    }
  }

  private handleOffer(roomId: string, from: string, to: string, offer: any) {
    const room = this.rooms.get(roomId);
    if (!room) return;

    // Store offer for connection recovery
    const connectionKey = `${from}:${to}`;
    if (!room.connections.has(connectionKey)) {
      room.connections.set(connectionKey, { candidates: [] });
    }
    const connection = room.connections.get(connectionKey)!;
    connection.offer = offer;

    // Forward offer to target participant
    const targetWs = room.participants.get(to);
    if (targetWs && targetWs.readyState === WebSocket.OPEN) {
      targetWs.send(JSON.stringify({
        type: 'offer',
        from,
        data: offer
      }));
      console.log(`[WS] Forwarded offer: ${from.slice(0, 10)}... → ${to.slice(0, 10)}...`);
    } else {
      console.log(`[WS] Target participant ${to.slice(0, 10)}... not connected`);
    }
  }

  private handleAnswer(roomId: string, from: string, to: string, answer: any) {
    const room = this.rooms.get(roomId);
    if (!room) return;

    // Store answer for connection recovery
    const connectionKey = `${from}:${to}`;
    if (!room.connections.has(connectionKey)) {
      room.connections.set(connectionKey, { candidates: [] });
    }
    const connection = room.connections.get(connectionKey)!;
    connection.answer = answer;

    // Forward answer to target participant
    const targetWs = room.participants.get(to);
    if (targetWs && targetWs.readyState === WebSocket.OPEN) {
      targetWs.send(JSON.stringify({
        type: 'answer',
        from,
        data: answer
      }));
      console.log(`[WS] Forwarded answer: ${from.slice(0, 10)}... → ${to.slice(0, 10)}...`);
    } else {
      console.log(`[WS] Target participant ${to.slice(0, 10)}... not connected`);
    }
  }

  private handleCandidate(roomId: string, from: string, to: string, candidate: any) {
    const room = this.rooms.get(roomId);
    if (!room) return;

    // Store candidate for connection recovery
    const connectionKey = `${from}:${to}`;
    if (!room.connections.has(connectionKey)) {
      room.connections.set(connectionKey, { candidates: [] });
    }
    const connection = room.connections.get(connectionKey)!;
    connection.candidates.push(candidate);

    // Forward candidate to target participant
    const targetWs = room.participants.get(to);
    if (targetWs && targetWs.readyState === WebSocket.OPEN) {
      targetWs.send(JSON.stringify({
        type: 'candidate',
        from,
        data: candidate
      }));
    }
  }

  private addParticipantToRoom(roomId: string, participantId: string, ws: WebSocket, metadata?: ParticipantMetadata) {
    if (!this.rooms.has(roomId)) {
      this.rooms.set(roomId, {
        participants: new Map(),
        participantMetadata: new Map(),
        connections: new Map()
      });
    }

    const room = this.rooms.get(roomId)!;
    room.participants.set(participantId, ws);

    // Store metadata if provided
    if (metadata) {
      room.participantMetadata.set(participantId, metadata);
    }
  }

  private handleParticipantMetadata(roomId: string, participantId: string, metadata?: ParticipantMetadata) {
    const room = this.rooms.get(roomId);
    if (!room || !metadata) return;

    // Store metadata
    room.participantMetadata.set(participantId, metadata);
    console.log(`[WS] Stored metadata for ${participantId.slice(0, 10)}...: ${metadata.name || 'No name'}`);

    // Broadcast metadata to all other participants
    this.broadcastToRoom(roomId, {
      type: 'participant-metadata-updated',
      participantId,
      metadata
    }, participantId);
  }

  private removeParticipantFromRoom(roomId: string, participantId: string) {
    const room = this.rooms.get(roomId);
    if (!room) return;

    room.participants.delete(participantId);
    room.participantMetadata.delete(participantId);

    // Clean up connections involving this participant
    const keysToDelete: string[] = [];
    room.connections.forEach((_, key) => {
      const [from, to] = key.split(':');
      if (from === participantId || to === participantId) {
        keysToDelete.push(key);
      }
    });
    keysToDelete.forEach(key => room.connections.delete(key));

    // Remove room if empty
    if (room.participants.size === 0) {
      this.rooms.delete(roomId);
      console.log(`[WS] Room ${roomId.slice(0, 10)}... deleted (no participants)`);
    }
  }

  private sendParticipantsList(roomId: string, targetParticipantId: string) {
    const room = this.rooms.get(roomId);
    if (!room) return;

    // Build participants list with metadata
    const participantsWithMetadata = Array.from(room.participants.keys())
      .filter(id => id !== targetParticipantId)
      .map(id => ({
        participantId: id,
        metadata: room.participantMetadata.get(id) || { walletAddress: id }
      }));

    const targetWs = room.participants.get(targetParticipantId);
    if (targetWs && targetWs.readyState === WebSocket.OPEN) {
      targetWs.send(JSON.stringify({
        type: 'participants-list',
        participants: participantsWithMetadata
      }));
      console.log(`[WS] Sent participants list to ${targetParticipantId.slice(0, 10)}...: ${participantsWithMetadata.length} peers`);
    }
  }

  private broadcastToRoom(roomId: string, message: any, excludeParticipantId?: string) {
    const room = this.rooms.get(roomId);
    if (!room) return;

    const messageStr = JSON.stringify(message);
    room.participants.forEach((ws, participantId) => {
      if (participantId !== excludeParticipantId && ws.readyState === WebSocket.OPEN) {
        ws.send(messageStr);
      }
    });
  }

  public getRoomStats(roomId: string) {
    const room = this.rooms.get(roomId);
    if (!room) return null;

    return {
      participantCount: room.participants.size,
      connectionCount: room.connections.size,
      participants: Array.from(room.participants.keys())
    };
  }

  /**
   * Notify all hosts in a room about a new join request
   * Used when a guest requests to join and needs approval
   */
  public notifyHostsOfJoinRequest(roomId: string, hostAddresses: string[], joinRequest: {
    id: string;
    requesterAddress: string;
    createdAt: Date;
  }) {
    const room = this.rooms.get(roomId);
    if (!room) {
      console.log(`[WS] Cannot notify hosts - room ${roomId.slice(0, 10)}... not found`);
      return;
    }

    const message = JSON.stringify({
      type: 'join-request',
      roomId,
      requestId: joinRequest.id,
      requesterAddress: joinRequest.requesterAddress,
      createdAt: joinRequest.createdAt.toISOString()
    });

    // Send to all connected hosts
    let notifiedCount = 0;
    hostAddresses.forEach(hostAddress => {
      const hostWs = room.participants.get(hostAddress);
      if (hostWs && hostWs.readyState === WebSocket.OPEN) {
        hostWs.send(message);
        notifiedCount++;
      }
    });

    console.log(`[WS] Notified ${notifiedCount} hosts about join request from ${joinRequest.requesterAddress.slice(0, 10)}... in room ${roomId.slice(0, 10)}...`);
  }

  /**
   * Notify a specific guest that their join request was approved
   */
  public notifyGuestApproved(roomId: string, guestAddress: string, approverAddress: string) {
    const room = this.rooms.get(roomId);
    if (!room) return;

    const guestWs = room.participants.get(guestAddress);
    if (guestWs && guestWs.readyState === WebSocket.OPEN) {
      guestWs.send(JSON.stringify({
        type: 'join-request-approved',
        roomId,
        approverAddress
      }));
      console.log(`[WS] Notified ${guestAddress.slice(0, 10)}... of approval in room ${roomId.slice(0, 10)}...`);
    }
  }

  /**
   * Notify a specific guest that their join request was rejected
   */
  public notifyGuestRejected(roomId: string, guestAddress: string, rejecterAddress: string) {
    const room = this.rooms.get(roomId);
    if (!room) return;

    const guestWs = room.participants.get(guestAddress);
    if (guestWs && guestWs.readyState === WebSocket.OPEN) {
      guestWs.send(JSON.stringify({
        type: 'join-request-rejected',
        roomId,
        rejecterAddress
      }));
      console.log(`[WS] Notified ${guestAddress.slice(0, 10)}... of rejection in room ${roomId.slice(0, 10)}...`);
    }
  }
}