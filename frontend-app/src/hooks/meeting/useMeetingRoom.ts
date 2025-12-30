import { useState, useCallback, useEffect } from 'react';
import { useSuiClient, useCurrentAccount } from '@mysten/dapp-kit';
import { useMeetingStore } from '@/state/meeting';

interface UseMeetingRoomResult {
  room: any;
  role: 'host' | 'guest';
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

/**
 * Custom hook to manage meeting room data and user role
 */
export function useMeetingRoom(roomId: string): UseMeetingRoomResult {
  const client = useSuiClient();
  const currentAccount = useCurrentAccount();
  const { room: roomData, loading: storeLoading, error: storeError, fetchRoom, setRoom } = useMeetingStore();

  const [localLoading, setLocalLoading] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);
  const [role, setRole] = useState<'host' | 'guest'>('guest');

  /**
   * Load room data from both backend (indexed) and blockchain (fresh hosts list)
   */
  const loadRoomData = useCallback(async () => {
    if (!roomId) return;

    setLocalLoading(true);
    setLocalError(null);

    try {
      // Fetch from backend (indexed data) - fast
      await fetchRoom(roomId);

      // Fetch from blockchain for up-to-date hosts list
      const object = await client.getObject({
        id: roomId,
        options: { showContent: true }
      });

      if (object.data?.content && 'fields' in object.data.content) {
        const fields = object.data.content.fields as any;
        const currentRoom = useMeetingStore.getState().room;

        if (currentRoom) {
          // Merge backend data with blockchain hosts
          setRoom({
            ...currentRoom,
            hosts: Array.isArray(fields.hosts) ? fields.hosts : [],
          });
        } else {
          // Create room from blockchain data
          setRoom({
            id: roomId,
            onchainObjectId: roomId,
            title: fields.title || `Room ${roomId.slice(0, 8)}...`,
            description: fields.description?.value || fields.description || null,
            requireApproval: fields.require_approval || false,
            sealPolicyId: fields.seal_policy_id || null,
            startTime: null,
            endTime: null,
            attendanceCount: 0,
            createdAt: new Date().toISOString(),
            owner: { walletAddress: fields.hosts?.[0] || '' },
            memberships: 0,
            pendingApprovals: 0,
            hosts: Array.isArray(fields.hosts) ? fields.hosts : [],
          });
        }
      }
    } catch (err) {
      console.error('[Room] Failed to load room data:', err);
      setLocalError(err instanceof Error ? err.message : 'Failed to load room');
    } finally {
      setLocalLoading(false);
    }
  }, [roomId, client, fetchRoom, setRoom]);

  // Load room data on mount and when roomId changes
  useEffect(() => {
    if (roomId) {
      loadRoomData();
    }
  }, [roomId, loadRoomData]);

  // Determine user role based on hosts array (blockchain) or owner (backend)
  useEffect(() => {
    if (!roomData || !currentAccount?.address) {
      setRole('guest');
      return;
    }

    const userAddress = currentAccount.address.toLowerCase();

    // Check if user is in hosts array (blockchain data - authoritative)
    const isInHostsArray = roomData.hosts?.some(
      (host: string) => host.toLowerCase() === userAddress
    );

    // Fallback to owner check (backend data)
    const isOwner = roomData.owner?.walletAddress?.toLowerCase() === userAddress;

    setRole(isInHostsArray || isOwner ? 'host' : 'guest');
  }, [roomData, currentAccount?.address]);

  return {
    room: roomData,
    role,
    loading: storeLoading || localLoading,
    error: storeError || localError,
    refetch: loadRoomData
  };
}
