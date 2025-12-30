import { useState, useCallback, useEffect, useRef } from 'react';
import { apiClient } from '@/lib/api';
import { SignalingWebSocket } from '@/services/signaling-websocket';
import { useCurrentAccount, useSignAndExecuteTransaction, useSuiClient } from '@mysten/dapp-kit';
import { Transaction } from '@mysten/sui/transactions';
import { SUI_CLOCK_OBJECT_ID } from '@mysten/sui/utils';

const WS_BASE_URL = process.env.NEXT_PUBLIC_WS_URL || 'ws://localhost:3001';

interface JoinRequest {
  id: string;
  requesterAddress: string;
  createdAt: string;
}

interface UseJoinRequestOptions {
  roomId: string;
  hostCapId?: string | null;
  enabled?: boolean;
  onApproved?: () => void;
  onRejected?: () => void;
  signalingInstance?: SignalingWebSocket | null;
}

interface UseJoinRequestResult {
  // For guests requesting to join
  requestJoin: () => Promise<boolean>;
  isRequesting: boolean;
  requestError: string | null;
  requestStatus: 'idle' | 'pending' | 'approved' | 'rejected';

  // For hosts seeing join requests
  pendingRequests: JoinRequest[];
  approveRequest: (requestId: string, guestAddress: string) => Promise<boolean>;
  denyRequest: (requestId: string) => Promise<boolean>;
}

/**
 * Custom hook to handle join requests and WebSocket notifications
 *
 * For Guests:
 * - Call requestJoin() to send a join request to the host
 * - Listen for approval/rejection via WebSocket
 *
 * For Hosts:
 * - See pendingRequests array populated via WebSocket
 * - Call approveRequest() or denyRequest() to handle requests
 */
export function useJoinRequest({
  roomId,
  hostCapId = null,
  enabled = true,
  onApproved,
  onRejected,
  signalingInstance = null,
}: UseJoinRequestOptions): UseJoinRequestResult {
  const [isRequesting, setIsRequesting] = useState(false);
  const [requestError, setRequestError] = useState<string | null>(null);
  const [requestStatus, setRequestStatus] = useState<'idle' | 'pending' | 'approved' | 'rejected'>('idle');
  const [pendingRequests, setPendingRequests] = useState<JoinRequest[]>([]);

  const wsRef = useRef<WebSocket | null>(null);
  const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Sui hooks for signing transactions and querying chain
  const currentAccount = useCurrentAccount();
  const { mutateAsync: signAndExecuteTransaction } = useSignAndExecuteTransaction();
  const suiClient = useSuiClient();

  /**
   * Request to join the room
   * Creates an approval request and waits for host approval
   */
  const requestJoin = useCallback(async (): Promise<boolean> => {
    if (!roomId) {
      setRequestError('Room ID is required');
      return false;
    }

    setIsRequesting(true);
    setRequestError(null);

    try {
      const accessToken = localStorage.getItem('accessToken');
      if (!accessToken) {
        throw new Error('Not authenticated');
      }

      const data = await apiClient.createJoinRequest(roomId, accessToken);
      console.log('[JoinRequest] Request created:', data);

      setRequestStatus('pending');
      setIsRequesting(false);
      return true;
    } catch (error) {
      console.error('[JoinRequest] Error requesting join:', error);
      setRequestError(error instanceof Error ? error.message : 'Failed to request join');
      setIsRequesting(false);
      return false;
    }
  }, [roomId]);

  /**
   * Approve a join request (host only)
   * Executes on-chain transaction first, then updates backend
   */
  const approveRequest = useCallback(async (requestId: string, guestAddress: string): Promise<boolean> => {
    try {
      const accessToken = localStorage.getItem('accessToken');
      if (!accessToken) {
        throw new Error('Not authenticated');
      }

      if (!currentAccount) {
        throw new Error('Wallet not connected');
      }

      if (!hostCapId) {
        throw new Error('HostCap not found - only hosts can approve guests');
      }

      console.log('[JoinRequest] Starting approval process...');
      console.log('[JoinRequest] Room:', roomId);
      console.log('[JoinRequest] Guest:', guestAddress);
      console.log('[JoinRequest] HostCap:', hostCapId);

      // Step 1: Check if guest is already a participant on-chain
      console.log('[JoinRequest] Checking on-chain participant status...');
      let txDigest: string | undefined;
      let alreadyParticipant = false;

      try {
        const roomObject = await suiClient.getObject({
          id: roomId,
          options: { showContent: true },
        });

        if (roomObject.data?.content && 'fields' in roomObject.data.content) {
          const fields = roomObject.data.content.fields as any;
          const participants = fields.participants || [];
          alreadyParticipant = participants.includes(guestAddress);

          if (alreadyParticipant) {
            console.log('[JoinRequest] Guest is already a participant on-chain, skipping transaction');
          }
        }
      } catch (error) {
        console.warn('[JoinRequest] Failed to check on-chain status:', error);
        // Continue with approval attempt
      }

      // Step 2: Execute on-chain transaction (if not already a participant)
      if (!alreadyParticipant) {
        console.log('[JoinRequest] Executing on-chain transaction...');
        const packageId = process.env.NEXT_PUBLIC_PACKAGE_ID;
        if (!packageId) {
          throw new Error('Package ID not configured');
        }

        const tx = new Transaction();
        tx.moveCall({
          target: `${packageId}::sealmeet::approve_guest`,
          arguments: [
            tx.object(hostCapId),
            tx.object(roomId),
            tx.pure.address(guestAddress),
            tx.object(SUI_CLOCK_OBJECT_ID),
          ],
        });

        const result = await signAndExecuteTransaction(
          {
            transaction: tx,
          },
          {
            onSuccess: (data) => {
              console.log('[JoinRequest] Transaction successful:', data.digest);
            },
          }
        );

        // Check transaction status
        if (!result.digest) {
          throw new Error('Transaction failed: No digest returned');
        }

        txDigest = result.digest;
        console.log('[JoinRequest] On-chain transaction successful:', txDigest);
      } else {
        console.log('[JoinRequest] Skipped on-chain transaction - guest already approved');
      }

      // Step 3: Update backend with transaction digest
      console.log('[JoinRequest] Updating backend...');
      const data = await apiClient.approveJoinRequest(roomId, guestAddress, requestId, accessToken, txDigest);
      console.log('[JoinRequest] Backend updated:', data);

      // Remove from pending requests
      setPendingRequests(prev => prev.filter(req => req.id !== requestId));

      return true;
    } catch (error) {
      console.error('[JoinRequest] Error approving request:', error);
      return false;
    }
  }, [roomId, hostCapId, currentAccount, signAndExecuteTransaction, suiClient]);

  /**
   * Deny a join request (host only)
   */
  const denyRequest = useCallback(async (requestId: string): Promise<boolean> => {
    try {
      const accessToken = localStorage.getItem('accessToken');
      if (!accessToken) {
        throw new Error('Not authenticated');
      }

      await apiClient.denyJoinRequest(roomId, requestId, accessToken);
      console.log('[JoinRequest] Request denied');

      // Remove from pending requests
      setPendingRequests(prev => prev.filter(req => req.id !== requestId));

      return true;
    } catch (error) {
      console.error('[JoinRequest] Error denying request:', error);
      return false;
    }
  }, [roomId]);

  /**
   * Fetch existing pending requests on mount (for hosts)
   */
  useEffect(() => {
    if (!enabled || !roomId) return;

    const fetchPendingRequests = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api'}/rooms/${roomId}`);
        if (!response.ok) {
          console.error('[JoinRequest] Failed to fetch room details');
          return;
        }

        const data = await response.json();
        if (data.pendingApprovals && Array.isArray(data.pendingApprovals)) {
          console.log('[JoinRequest] Loaded existing pending requests:', data.pendingApprovals);
          setPendingRequests(data.pendingApprovals.map((approval: any) => ({
            id: approval.id,
            requesterAddress: approval.requesterAddress,
            createdAt: approval.createdAt,
          })));
        }
      } catch (error) {
        console.error('[JoinRequest] Error fetching pending requests:', error);
      }
    };

    fetchPendingRequests();
  }, [enabled, roomId]);

  /**
   * Setup WebSocket connection to receive real-time notifications
   * Uses SignalingWebSocket instance if provided, otherwise creates own connection
   */
  useEffect(() => {
    if (!enabled || !roomId) return;

    // Message handler for join request notifications
    const handleJoinRequestMessage = (message: any) => {
      console.log('[JoinRequest] WebSocket message received:', message);

      switch (message.type) {
        case 'join-request':
          // Host receives this when someone requests to join
          setPendingRequests(prev => {
            // Avoid duplicates
            if (prev.some(req => req.id === message.requestId)) {
              console.log('[JoinRequest] Duplicate request, ignoring:', message.requestId);
              return prev;
            }
            console.log('[JoinRequest] New join request from:', message.requesterAddress);
            return [...prev, {
              id: message.requestId,
              requesterAddress: message.requesterAddress,
              createdAt: message.createdAt,
            }];
          });
          break;

        case 'join-request-approved':
          // Guest receives this when their request is approved
          console.log('[JoinRequest] Your join request was approved!');
          setRequestStatus('approved');
          if (onApproved) {
            onApproved();
          }
          break;

        case 'join-request-rejected':
          // Guest receives this when their request is rejected
          console.log('[JoinRequest] Your join request was rejected');
          setRequestStatus('rejected');
          if (onRejected) {
            onRejected();
          }
          break;
      }
    };

    // If signalingInstance is provided, use it instead of creating a new WebSocket
    if (signalingInstance) {
      console.log('[JoinRequest] Using provided SignalingWebSocket instance');

      // Register listeners for join request messages
      signalingInstance.on('join-request', handleJoinRequestMessage);
      signalingInstance.on('join-request-approved', handleJoinRequestMessage);
      signalingInstance.on('join-request-rejected', handleJoinRequestMessage);

      // Cleanup
      return () => {
        signalingInstance.off('join-request', handleJoinRequestMessage);
        signalingInstance.off('join-request-approved', handleJoinRequestMessage);
        signalingInstance.off('join-request-rejected', handleJoinRequestMessage);
      };
    }

    // Otherwise, create own WebSocket connection (fallback for backward compatibility)
    const walletAddress = localStorage.getItem('walletAddress');
    const accessToken = localStorage.getItem('accessToken');

    if (!walletAddress || !accessToken) {
      console.log('[JoinRequest] Missing wallet address or token, skipping WebSocket setup');
      return;
    }

    const connectWebSocket = () => {
      const wsUrl = `${WS_BASE_URL}/ws/signaling?roomId=${roomId}&participantId=${walletAddress}&token=${accessToken}`;

      console.log('[JoinRequest] Connecting to separate WebSocket for join request notifications');
      const ws = new WebSocket(wsUrl);

      ws.onopen = () => {
        console.log('[JoinRequest] WebSocket connected');
      };

      ws.onmessage = (event) => {
        try {
          const message = JSON.parse(event.data);
          handleJoinRequestMessage(message);
        } catch (error) {
          console.error('[JoinRequest] Error parsing WebSocket message:', error);
        }
      };

      ws.onerror = (error) => {
        console.error('[JoinRequest] WebSocket error:', error);
      };

      ws.onclose = () => {
        console.log('[JoinRequest] WebSocket disconnected');
        wsRef.current = null;

        // Reconnect after 5 seconds if still enabled
        if (enabled) {
          reconnectTimeoutRef.current = setTimeout(() => {
            console.log('[JoinRequest] Reconnecting WebSocket...');
            connectWebSocket();
          }, 5000);
        }
      };

      wsRef.current = ws;
    };

    connectWebSocket();

    // Cleanup
    return () => {
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
      }
      if (wsRef.current) {
        wsRef.current.close();
        wsRef.current = null;
      }
    };
  }, [enabled, roomId, onApproved, onRejected, signalingInstance]);
  return {
    requestJoin,
    isRequesting,
    requestError,
    requestStatus,
    pendingRequests,
    approveRequest,
    denyRequest,
  };
}
