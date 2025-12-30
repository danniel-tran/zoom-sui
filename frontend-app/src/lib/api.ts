/**
 * API client for SuiMeet backend
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

interface CreateRoomRequest {
  title: string;
  description?: string;
  maxParticipants?: number;
  initialParticipants: string[];
  requireApproval: boolean;
  walletAddress: string;
  onchainObjectId: string;
  hostCapId?: string;
  sealPolicyId: string; // REQUIRED - seal policy object ID for access control
}

interface CreateRoomResponse {
  room: {
    id: string;
    onchainObjectId: string;
    title: string;
    requireApproval: boolean;
    createdAt: string;
  };
  memberships: number;
}

interface RoomDetailsResponse {
  room: {
    id: string;
    onchainObjectId: string;
    title: string;
    requireApproval: boolean;
    sealPolicyId: string | null;
    startTime: string | null;
    endTime: string | null;
    attendanceCount: number;
    createdAt: string;
  };
  owner: {
    walletAddress: string;
  };
  memberships: number;
  pendingApprovals: number;
}

interface ApproveGuestRequest {
  guestAddress: string;
}

interface ApproveGuestResponse {
  membership: {
    id: string;
    walletAddress: string;
    status: string;
  };
}

interface RoomListItem {
  roomId: string;
  title: string;
  hosts: string[];
  status: 'scheduled' | 'active' | 'ended';
  maxParticipants: number;
  requireApproval: boolean;
  participantCount: number;
  sealPolicyId: string;
  createdAt: string | null;
  startedAt: string | null;
  endedAt: string | null;
  transactionDigest: string;
  // Metadata
  language?: string;
  timezone?: string;
  recordingBlobId?: string;
  // Backend data
  pendingApprovals: number;
  // User's role in this room
  userRole: 'HOST' | 'PARTICIPANT' | null;
}

interface GetMyRoomsResponse {
  rooms: RoomListItem[];
}

interface NonceResponse {
  nonce: string;
  expiresAt: string;
}

interface VerifyResponse {
  accessToken: string;
  refreshToken: string;
  session: {
    id: string;
    expiresAt: string;
  };
  user: {
    id: string;
    walletAddress: string;
  };
}

class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  private async request<T>(
    endpoint: string,
    method: string = 'GET',
    body?: any,
    token?: string
  ): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const options: RequestInit = {
      method,
      headers,
    };

    if (body) {
      options.body = JSON.stringify(body);
    }

    const response = await fetch(url, options);

    if (!response.ok) {
      // Handle token expiration/invalid token (401 Unauthorized or 403 Forbidden)
      if (response.status === 401 || response.status === 403) {
        console.log('[API] Token expired or invalid - clearing auth and redirecting to login');

        // Clear tokens from localStorage
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');

        // Redirect to login page
        if (typeof window !== 'undefined') {
          window.location.href = '/login';
        }

        throw new Error('Session expired. Please login again.');
      }

      const error = await response.json().catch(() => ({ error: 'Unknown error' }));
      throw new Error(error.error || `API error: ${response.status}`);
    }

    return response.json();
  }

  async createRoom(
    data: CreateRoomRequest
  ): Promise<CreateRoomResponse> {
    // No token required - wallet address in body is sufficient
    return this.request<CreateRoomResponse>(
      '/rooms',
      'POST',
      data
    );
  }

  async getMyRooms(walletAddress: string): Promise<GetMyRoomsResponse> {
    // No token required - wallet address in query is sufficient
    return this.request<GetMyRoomsResponse>(
      `/rooms?walletAddress=${encodeURIComponent(walletAddress)}`,
      'GET'
    );
  }

  async getRoomDetails(roomId: string, token: string): Promise<RoomDetailsResponse> {
    return this.request<RoomDetailsResponse>(`/rooms/${roomId}`, 'GET', undefined, token);
  }

  async approveGuest(
    roomId: string,
    data: ApproveGuestRequest,
    token: string
  ): Promise<ApproveGuestResponse> {
    return this.request<ApproveGuestResponse>(
      `/rooms/${roomId}/approve`,
      'POST',
      data,
      token
    );
  }

  async healthCheck(): Promise<{ status: string; timestamp: string }> {
    return this.request('/health');
  }

  // Authentication API
  async getNonce(walletAddress: string): Promise<NonceResponse> {
    return this.request<NonceResponse>('/auth/nonce', 'POST', { walletAddress });
  }

  async verifySignature(
    walletAddress: string,
    signature: string,
    walletType?: string
  ): Promise<VerifyResponse> {
    return this.request<VerifyResponse>('/auth/verify', 'POST', {
      walletAddress,
      signature,
      walletType,
    });
  }

  async refreshToken(refreshToken: string): Promise<{ accessToken: string }> {
    return this.request<{ accessToken: string }>('/auth/refresh', 'POST', { refreshToken });
  }

  // Signaling API (peer-based, symmetric)
  async postOffer(roomId: string, sdp: string, participantId: string) {
    return this.request(`/signaling/${roomId}/offer`, 'POST', { sdp, from: participantId });
  }

  async getOffer(roomId: string, excludeParticipantId: string): Promise<{ sdp: string; timestamp: number; from: string } | null> {
    const url = `${API_BASE_URL}/signaling/${roomId}/offer?exclude=${excludeParticipantId}`;
    const res = await fetch(url);
    if (!res.ok) return null;
    const data = await res.json();
    if (data.error) return null;
    return data;
  }

  async postAnswer(roomId: string, sdp: string, participantId: string) {
    return this.request(`/signaling/${roomId}/answer`, 'POST', { sdp, from: participantId });
  }

  async getAnswer(roomId: string, excludeParticipantId: string): Promise<{ sdp: string; timestamp: number; from: string } | null> {
    const url = `${API_BASE_URL}/signaling/${roomId}/answer?exclude=${excludeParticipantId}`;
    const res = await fetch(url);
    if (!res.ok) return null;
    const data = await res.json();
    if (data.error) return null;
    return data;
  }

  async postCandidate(roomId: string, candidate: any, participantId: string) {
    return this.request(`/signaling/${roomId}/candidates`, 'POST', { candidate, from: participantId });
  }

  async getCandidates(roomId: string, excludeParticipantId: string): Promise<{ candidates: any[] }> {
    const url = `${API_BASE_URL}/signaling/${roomId}/candidates?exclude=${excludeParticipantId}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error(`API ${res.status}`);
    return res.json();
  }

  async endCall(roomId: string, participantId: string) {
    return this.request(`/signaling/${roomId}/end`, 'POST', { participantId });
  }

  // Seal - Check room access
  async checkRoomAccess(roomId: string, token: string): Promise<{ hasAccess: boolean; removed?: boolean }> {
    return this.request<{ hasAccess: boolean; removed?: boolean }>(
      '/seal/check-access',
      'POST',
      { roomId },
      token
    );
  }

  // Join Request API
  async createJoinRequest(roomId: string, token: string): Promise<{ approvalRequest: any }> {
    return this.request<{ approvalRequest: any }>(
      `/rooms/${roomId}/approval-request`,
      'POST',
      {},
      token
    );
  }

  async approveJoinRequest(roomId: string, guestAddress: string, requestId: string, token: string, txDigest?: string): Promise<any> {
    return this.request(
      `/rooms/${roomId}/approve/${requestId}`,
      'POST',
      {
        guestAddress,
        txDigest
      },
      token
    );
  }

  async denyJoinRequest(roomId: string, requestId: string, token: string): Promise<any> {
    return this.request(
      `/rooms/${roomId}/deny/${requestId}`,
      'POST',
      {},
      token
    );
  }
}

export const apiClient = new ApiClient(API_BASE_URL);
