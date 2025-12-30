// WebSocket-based signaling client for multi-peer WebRTC connections

export interface ParticipantMetadata {
  name?: string;
  walletAddress: string;
  avatar?: string;
  role?: 'host' | 'co-host' | 'guest';
}

export interface ParticipantWithMetadata {
  participantId: string;
  metadata: ParticipantMetadata;
}

export interface SignalingMessage {
  type: 'offer' | 'answer' | 'candidate' | 'participant-joined' | 'participant-left' | 'participants-list' | 'participant-metadata' | 'participant-metadata-updated' | 'join-request' | 'join-request-approved' | 'join-request-rejected';
  from?: string;
  to?: string;
  data?: any;
  participantId?: string;
  participants?: string[] | ParticipantWithMetadata[];
  metadata?: ParticipantMetadata;
  // Join request specific fields
  roomId?: string;
  requestId?: string;
  requesterAddress?: string;
  createdAt?: string;
}

export type SignalingEventCallback = (message: SignalingMessage) => void;

export class SignalingWebSocket {
  private ws: WebSocket | null = null;
  private roomId: string;
  private participantId: string;
  private token: string | null;
  private listeners: Map<string, Set<SignalingEventCallback>> = new Map();
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;
  private reconnectDelay = 2000;
  private isIntentionallyClosed = false;

  constructor(roomId: string, participantId: string, token: string | null = null) {
    this.roomId = roomId;
    this.participantId = participantId;
    this.token = token;
  }

  public connect(): Promise<void> {
    return new Promise((resolve, reject) => {
      try {
        const wsUrl = this.buildWebSocketUrl();
        console.log(`[SignalingWS] Connecting to ${wsUrl}`);

        this.ws = new WebSocket(wsUrl);

        this.ws.onopen = () => {
          console.log(`[SignalingWS] Connected to room ${this.roomId.slice(0, 10)}...`);
          this.reconnectAttempts = 0;
          resolve();
        };

        this.ws.onmessage = (event) => {
          try {
            const message: SignalingMessage = JSON.parse(event.data);
            this.handleMessage(message);
          } catch (err) {
            console.error('[SignalingWS] Failed to parse message:', err);
          }
        };

        this.ws.onclose = (event) => {
          console.log(`[SignalingWS] Connection closed: code=${event.code}, reason=${event.reason}`);

          if (!this.isIntentionallyClosed && this.reconnectAttempts < this.maxReconnectAttempts) {
            this.reconnectAttempts++;
            console.log(`[SignalingWS] Attempting reconnect ${this.reconnectAttempts}/${this.maxReconnectAttempts}...`);
            setTimeout(() => {
              this.connect().catch(err => {
                console.error('[SignalingWS] Reconnect failed:', err);
              });
            }, this.reconnectDelay * this.reconnectAttempts);
          }
        };

        this.ws.onerror = (error) => {
          console.error('[SignalingWS] WebSocket error:', error);
          reject(error);
        };

      } catch (err) {
        reject(err);
      }
    });
  }

  private buildWebSocketUrl(): string {
    // Determine WebSocket protocol based on current page protocol
    const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';

    // Use environment variable or default to localhost
    // Remove both protocol (http://) and path (/api) from NEXT_PUBLIC_API_URL
    const host = process.env.NEXT_PUBLIC_API_URL?.replace(/^https?:\/\//, '').replace(/\/api$/, '') || 'localhost:3001';

    // Build URL with query params
    const params = new URLSearchParams({
      roomId: this.roomId,
      participantId: this.participantId,
    });

    if (this.token) {
      params.append('token', this.token);
    }

    return `${protocol}//${host}/ws/signaling?${params.toString()}`;
  }

  private handleMessage(message: SignalingMessage) {
    const { type } = message;
    console.log(`[SignalingWS] Received: ${type}`, message.from ? `from ${message.from.slice(0, 10)}...` : '');

    // Notify all listeners for this message type
    const listeners = this.listeners.get(type);
    if (listeners) {
      listeners.forEach(callback => {
        try {
          callback(message);
        } catch (err) {
          console.error(`[SignalingWS] Listener error for ${type}:`, err);
        }
      });
    }

    // Also notify wildcard listeners
    const wildcardListeners = this.listeners.get('*');
    if (wildcardListeners) {
      wildcardListeners.forEach(callback => {
        try {
          callback(message);
        } catch (err) {
          console.error('[SignalingWS] Wildcard listener error:', err);
        }
      });
    }
  }

  public on(eventType: string, callback: SignalingEventCallback) {
    if (!this.listeners.has(eventType)) {
      this.listeners.set(eventType, new Set());
    }
    this.listeners.get(eventType)!.add(callback);
  }

  public off(eventType: string, callback: SignalingEventCallback) {
    const listeners = this.listeners.get(eventType);
    if (listeners) {
      listeners.delete(callback);
    }
  }

  public sendOffer(to: string, offer: RTCSessionDescriptionInit) {
    this.send({
      type: 'offer',
      roomId: this.roomId,
      from: this.participantId,
      to,
      data: offer
    });
  }

  public sendAnswer(to: string, answer: RTCSessionDescriptionInit) {
    this.send({
      type: 'answer',
      roomId: this.roomId,
      from: this.participantId,
      to,
      data: answer
    });
  }

  public sendCandidate(to: string, candidate: RTCIceCandidateInit) {
    this.send({
      type: 'candidate',
      roomId: this.roomId,
      from: this.participantId,
      to,
      data: candidate
    });
  }

  public requestParticipants() {
    this.send({
      type: 'participants-request',
      roomId: this.roomId,
      from: this.participantId
    });
  }

  public sendMetadata(metadata: ParticipantMetadata) {
    this.send({
      type: 'participant-metadata',
      roomId: this.roomId,
      from: this.participantId,
      metadata
    });
  }

  private send(message: any) {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify(message));
    } else {
      console.warn('[SignalingWS] Cannot send message, WebSocket not open:', message.type);
    }
  }

  public close(sendLeaveMessage: boolean = true) {
    this.isIntentionallyClosed = true;
    if (this.ws) {
      if (sendLeaveMessage) {
        this.send({
          type: 'leave',
          roomId: this.roomId,
          from: this.participantId
        });
      }
      this.ws.close();
      this.ws = null;
    }
    this.listeners.clear();
  }

  public isConnected(): boolean {
    return this.ws !== null && this.ws.readyState === WebSocket.OPEN;
  }
}