import { useEffect, useRef, useState } from 'react';

const WS_BASE_URL = process.env.NEXT_PUBLIC_WS_URL || 'ws://localhost:3001';

interface EarlyWebSocketOptions {
  roomId: string;
  participantId: string | undefined;
  enabled: boolean;
  onMessage?: (message: any) => void;
}

/**
 * Establishes an early WebSocket connection for receiving real-time notifications
 * even before the user is fully authenticated or MultiPeerConnection is established.
 *
 * This is necessary for guests to receive join request approval notifications
 * while they're still viewing the access denied modal.
 */
export function useEarlyWebSocket({
  roomId,
  participantId,
  enabled,
  onMessage,
}: EarlyWebSocketOptions) {
  const wsRef = useRef<WebSocket | null>(null);
  const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const onMessageRef = useRef(onMessage);
  const [isConnected, setIsConnected] = useState(false);

  // Update the onMessage ref when it changes
  useEffect(() => {
    onMessageRef.current = onMessage;
  }, [onMessage]);

  useEffect(() => {
    if (!enabled || !roomId || !participantId) {
      return;
    }

    const connectWebSocket = () => {
      const accessToken = localStorage.getItem('accessToken');

      if (!accessToken) {
        console.log('[EarlyWebSocket] No access token, skipping WebSocket setup');
        return;
      }

      const wsUrl = `${WS_BASE_URL}/ws/signaling?roomId=${roomId}&participantId=${participantId}&token=${accessToken}`;

      console.log('[EarlyWebSocket] Connecting for real-time notifications...');
      const ws = new WebSocket(wsUrl);

      ws.onopen = () => {
        console.log('[EarlyWebSocket] ✅ Connected and ready to receive notifications');
        setIsConnected(true);
      };

      ws.onmessage = (event) => {
        try {
          const message = JSON.parse(event.data);
          console.log('[EarlyWebSocket] Received message:', message.type);

          if (onMessageRef.current) {
            onMessageRef.current(message);
          }
        } catch (error) {
          console.error('[EarlyWebSocket] Error parsing message:', error);
        }
      };

      ws.onerror = (error) => {
        console.error('[EarlyWebSocket] WebSocket error:', error);
        setIsConnected(false);
      };

      ws.onclose = () => {
        console.log('[EarlyWebSocket] WebSocket disconnected');
        setIsConnected(false);
        wsRef.current = null;

        // Reconnect after 3 seconds if still enabled
        if (enabled) {
          reconnectTimeoutRef.current = setTimeout(() => {
            console.log('[EarlyWebSocket] Reconnecting...');
            connectWebSocket();
          }, 3000);
        }
      };

      wsRef.current = ws;
    };

    connectWebSocket();

    // Cleanup
    return () => {
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
        reconnectTimeoutRef.current = null;
      }
      if (wsRef.current) {
        console.log('[EarlyWebSocket] Closing connection');
        wsRef.current.close();
        wsRef.current = null;
      }
      setIsConnected(false);
    };
  }, [enabled, roomId, participantId]); // Removed onMessage from dependencies to prevent reconnection loop

  return {
    isConnected,
    ws: wsRef.current,
  };
}
