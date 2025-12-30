import { useState, useCallback } from 'react';
import { useSuiClient, useCurrentAccount } from '@mysten/dapp-kit';

interface RoomAccessResult {
  hasAccess: boolean;
  isHost: boolean;
  isParticipant: boolean;
  checking: boolean;
  error: string | null;
  checkAccess: (roomId: string) => Promise<boolean>;
}

/**
 * Custom hook to check if user has access to a room
 * Checks both hosts array and participants array from blockchain
 */
export function useRoomAccess(): RoomAccessResult {
  const client = useSuiClient();
  const currentAccount = useCurrentAccount();
  const [checking, setChecking] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasAccess, setHasAccess] = useState(false);
  const [isHost, setIsHost] = useState(false);
  const [isParticipant, setIsParticipant] = useState(false);

  const checkAccess = useCallback(async (roomId: string): Promise<boolean> => {
    if (!currentAccount?.address || !roomId) {
      setError('Wallet not connected');
      return false;
    }

    setChecking(true);
    setError(null);

    try {
      // Fetch room object from blockchain
      const roomObject = await client.getObject({
        id: roomId,
        options: { showContent: true, showType: true }
      });

      if (!roomObject.data) {
        setError('Room not found on blockchain');
        setHasAccess(false);
        return false;
      }

      if (roomObject.data.content && 'fields' in roomObject.data.content) {
        const fields = roomObject.data.content.fields as any;
        const userAddress = currentAccount.address.toLowerCase();

        // Check if user is in hosts array
        const hosts = Array.isArray(fields.hosts) ? fields.hosts : [];
        const isUserHost = hosts.some(
          (host: string) => host.toLowerCase() === userAddress
        );

        // Check if user is in participants array
        const participants = Array.isArray(fields.participants) ? fields.participants : [];
        const isUserParticipant = participants.some(
          (participant: string) => participant.toLowerCase() === userAddress
        );

        const userHasAccess = isUserHost || isUserParticipant;

        console.log('[RoomAccess] Check results:', {
          roomId: roomId.slice(0, 10),
          userAddress: userAddress.slice(0, 10),
          isHost: isUserHost,
          isParticipant: isUserParticipant,
          hasAccess: userHasAccess,
          hostsCount: hosts.length,
          participantsCount: participants.length
        });

        setIsHost(isUserHost);
        setIsParticipant(isUserParticipant);
        setHasAccess(userHasAccess);
        setChecking(false);

        return userHasAccess;
      }

      setError('Invalid room data structure');
      setHasAccess(false);
      return false;
    } catch (err) {
      console.error('[RoomAccess] Error checking access:', err);
      const errorMsg = err instanceof Error ? err.message : 'Failed to check room access';
      setError(errorMsg);
      setHasAccess(false);
      return false;
    } finally {
      setChecking(false);
    }
  }, [client, currentAccount]);

  return {
    hasAccess,
    isHost,
    isParticipant,
    checking,
    error,
    checkAccess
  };
}
