import { create } from 'zustand';
import { apiClient } from '@/lib/api';
import { getAccessToken } from '@/lib/auth-storage';

/**
 * Room metadata interface
 */
export interface RoomMetadata {
  id: string;
  onchainObjectId: string;
  title: string;
  description?: string;
  requireApproval: boolean;
  sealPolicyId: string | null;
  startTime: string | null;
  endTime: string | null;
  attendanceCount: number;
  createdAt: string;
  maxParticipants?: number;
  language?: string;
  timezone?: string;
  recordingBlobId?: string;
  owner: {
    walletAddress: string;
  };
  memberships: number;
  pendingApprovals: number;
  // Blockchain data
  hosts?: string[];
  status?: 'scheduled' | 'active' | 'ended';
}

interface MeetingState {
  // Room data
  room: RoomMetadata | null;
  loading: boolean;
  error: string | null;
  
  // Actions
  fetchRoom: (roomId: string) => Promise<void>;
  setRoom: (room: RoomMetadata | null) => void;
  clearRoom: () => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

export const useMeetingStore = create<MeetingState>((set) => ({
  // Initial state
  room: null,
  loading: false,
  error: null,

  // Actions
  fetchRoom: async (roomId: string) => {
    set({ loading: true, error: null });
    
    try {
      // Try to get access token for authenticated requests
      const token = getAccessToken();
      
      // Fetch room details from backend
      let roomData: RoomMetadata | null = null;
      
      if (token) {
        try {
          const response = await apiClient.getRoomDetails(roomId, token);
          roomData = {
            id: response.room.id,
            onchainObjectId: response.room.onchainObjectId,
            title: response.room.title,
            requireApproval: response.room.requireApproval,
            sealPolicyId: response.room.sealPolicyId,
            startTime: response.room.startTime,
            endTime: response.room.endTime,
            attendanceCount: response.room.attendanceCount,
            createdAt: response.room.createdAt,
            owner: response.owner,
            memberships: response.memberships,
            pendingApprovals: response.pendingApprovals,
          };
        } catch (err) {
          console.warn('Failed to fetch room from backend, falling back to blockchain:', err);
        }
      }
      
      // If backend fetch failed or no token, try blockchain
      if (!roomData) {
        // This will be handled by the component that has access to SuiClient
        // For now, we'll set a placeholder
        roomData = {
          id: roomId,
          onchainObjectId: roomId,
          title: `Room ${roomId.slice(0, 8)}...`,
          requireApproval: false,
          sealPolicyId: null,
          startTime: null,
          endTime: null,
          attendanceCount: 0,
          createdAt: new Date().toISOString(),
          owner: { walletAddress: '' },
          memberships: 0,
          pendingApprovals: 0,
        };
      }
      
      set({ room: roomData, loading: false, error: null });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch room';
      console.error('Error fetching room:', err);
      set({ error: errorMessage, loading: false, room: null });
    }
  },

  setRoom: (room: RoomMetadata | null) => {
    set({ room, error: null });
  },

  clearRoom: () => {
    set({ room: null, error: null, loading: false });
  },

  setLoading: (loading: boolean) => {
    set({ loading });
  },

  setError: (error: string | null) => {
    set({ error });
  },
}));

