import { useCallback, useState } from 'react';
import { useSignAndExecuteTransaction, useSuiClient } from '@mysten/dapp-kit';
import { Transaction } from '@mysten/sui/transactions';
import { SUI_CLOCK_OBJECT_ID } from '@mysten/sui/utils';

const PACKAGE_ID = process.env.NEXT_PUBLIC_PACKAGE_ID || '';
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';

interface UseHostApproveOptions {
  roomId: string;
  hostCapId: string | null;
  walletAddress: string | undefined;
}

interface UseHostApproveResult {
  approveGuest: (guestAddress: string) => Promise<{ success: boolean; txDigest?: string }>;
  isApproving: boolean;
  error: string | null;
}

/**
 * Hook for host to approve guests using frontend wallet signing
 *
 * Flow:
 * 1. Build approve_guest transaction
 * 2. Host signs with wallet (popup)
 * 3. Execute transaction on-chain
 * 4. Update ApprovalRequest status in backend
 * 5. Backend notifies guest via WebSocket
 */
export function useHostApprove({
  roomId,
  hostCapId,
  walletAddress,
}: UseHostApproveOptions): UseHostApproveResult {
  const suiClient = useSuiClient();
  const { mutateAsync: signAndExecute } = useSignAndExecuteTransaction();

  const [isApproving, setIsApproving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Approve a guest to join the room
   * Signs transaction on frontend with wallet
   */
  const approveGuest = useCallback(async (
    guestAddress: string
  ): Promise<{ success: boolean; txDigest?: string }> => {
    if (!walletAddress) {
      setError('Wallet not connected');
      return { success: false };
    }

    if (!hostCapId) {
      setError('HostCap not found');
      return { success: false };
    }

    if (!PACKAGE_ID) {
      setError('Package ID not configured');
      return { success: false };
    }

    setIsApproving(true);
    setError(null);

    try {
      // Build transaction
      const tx = new Transaction();
      tx.moveCall({
        target: `${PACKAGE_ID}::sealmeet::approve_guest`,
        arguments: [
          tx.object(hostCapId),
          tx.object(roomId),
          tx.pure.address(guestAddress),
          tx.object(SUI_CLOCK_OBJECT_ID),
        ],
      });

      // Sign and execute with wallet (popup)
      console.log('[HostApprove] Signing approve_guest transaction...');
      const result = await signAndExecute(
        {
          transaction: tx,
        },
        {
          onSuccess: (data) => {
            console.log('[HostApprove] Transaction successful:', data.digest);
          },
        }
      );

      const txDigest = result.digest;
      console.log('[HostApprove] Transaction executed:', txDigest);

      // Update ApprovalRequest status in backend
      try {
        const accessToken = localStorage.getItem('accessToken');
        if (!accessToken) {
          throw new Error('Not authenticated');
        }

        const response = await fetch(
          `${API_BASE_URL}/rooms/${roomId}/approve-status/${guestAddress}`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${accessToken}`,
            },
            body: JSON.stringify({ txDigest }),
          }
        );

        if (!response.ok) {
          const errorData = await response.json();
          console.warn('[HostApprove] Failed to update backend status:', errorData);
          // Don't fail the whole operation - the on-chain approval succeeded
        } else {
          console.log('[HostApprove] Backend status updated successfully');
        }
      } catch (backendError) {
        console.warn('[HostApprove] Backend update failed:', backendError);
        // Don't fail - on-chain approval is what matters
      }

      setIsApproving(false);
      return { success: true, txDigest };
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Failed to approve guest';
      setError(errorMsg);
      console.error('[HostApprove] Error:', err);
      setIsApproving(false);
      return { success: false };
    }
  }, [walletAddress, hostCapId, roomId, signAndExecute]);

  return {
    approveGuest,
    isApproving,
    error,
  };
}
