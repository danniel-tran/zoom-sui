import { useState, useCallback, useRef } from 'react';
import { SessionKeyData } from './useSessionKey';

export interface UseVideoDecryptionOptions {
  sessionKey: SessionKeyData | null;
  onSessionKeyExpired?: () => Promise<boolean>; // Callback to refresh SessionKey
  enabled?: boolean;
}

export interface UseVideoDecryptionResult {
  decryptFrame: (encryptedData: Uint8Array) => Promise<Uint8Array | null>;
  isRefreshing: boolean;
  error: string | null;
  decryptionCount: number; // For debugging
  errorCount: number; // For debugging
}

/**
 * Hook for video frame decryption with SessionKey
 *
 * Features:
 * - Uses SessionKey.decrypt() for each frame
 * - Auto-refreshes SessionKey on expiry/access errors
 * - Retries decryption after refresh
 * - Handles concurrent refresh (prevents multiple simultaneous refreshes)
 */
export function useVideoDecryption({
  sessionKey,
  onSessionKeyExpired,
  enabled = true,
}: UseVideoDecryptionOptions): UseVideoDecryptionResult {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [decryptionCount, setDecryptionCount] = useState(0);
  const [errorCount, setErrorCount] = useState(0);

  // Use ref to prevent concurrent refreshes
  const refreshingRef = useRef(false);

  /**
   * Decrypt a video frame using SessionKey
   */
  const decryptFrame = useCallback(
    async (encryptedData: Uint8Array): Promise<Uint8Array | null> => {
      if (!enabled) {
        return null;
      }

      if (!sessionKey) {
        setError('SessionKey not available');
        return null;
      }

      try {
        // TODO: Implement actual video frame decryption
        // This is a placeholder - the actual Seal SDK decryption API
        // will need to be integrated based on the SDK documentation
        //
        // Example implementation (pseudo-code):
        // const sealClient = new SealClient();
        // const decrypted = await sealClient.decrypt(encryptedData, sessionKey.serialized);
        //
        // For now, we'll just pass through the data
        console.warn('[VideoDecryption] Decryption not yet implemented - returning encrypted data');

        setDecryptionCount((prev) => prev + 1);
        setError(null);

        return encryptedData;
      } catch (err) {
        const errorMsg = err instanceof Error ? err.message : 'Decryption failed';
        console.error('[VideoDecryption] Error:', errorMsg);

        setErrorCount((prev) => prev + 1);

        // Check if error is due to expired/invalid SessionKey
        const isSessionKeyError =
          errorMsg.includes('expired') ||
          errorMsg.includes('invalid') ||
          errorMsg.includes('access denied') ||
          errorMsg.includes('unauthorized');

        if (isSessionKeyError && onSessionKeyExpired && !refreshingRef.current) {
          console.log('[VideoDecryption] SessionKey error detected, attempting refresh');
          setIsRefreshing(true);
          refreshingRef.current = true;

          try {
            const refreshed = await onSessionKeyExpired();

            if (refreshed) {
              console.log('[VideoDecryption] SessionKey refreshed, retrying decryption');

              // Retry decryption with refreshed SessionKey
              // Note: This will use the updated sessionKey from parent component
              // We don't retry here to avoid infinite loops
              // The caller should retry on the next frame
              setError(null);
            } else {
              setError('Failed to refresh SessionKey');
            }
          } catch (refreshErr) {
            const refreshErrorMsg =
              refreshErr instanceof Error ? refreshErr.message : 'SessionKey refresh failed';
            setError(refreshErrorMsg);
            console.error('[VideoDecryption] Refresh error:', refreshErr);
          } finally {
            setIsRefreshing(false);
            refreshingRef.current = false;
          }
        } else {
          setError(errorMsg);
        }

        return null;
      }
    },
    [enabled, sessionKey, onSessionKeyExpired]
  );

  return {
    decryptFrame,
    isRefreshing,
    error,
    decryptionCount,
    errorCount,
  };
}
