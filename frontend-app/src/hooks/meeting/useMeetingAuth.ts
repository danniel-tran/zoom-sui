import { useState, useCallback, useEffect } from 'react';
import { useCurrentAccount } from '@mysten/dapp-kit';
import { useSealAuth } from '../useSealAuth';

const PACKAGE_ID = process.env.NEXT_PUBLIC_PACKAGE_ID || '';
const NETWORK = (process.env.NEXT_PUBLIC_NETWORK || 'testnet') as 'testnet' | 'mainnet';

type AuthState = 'idle' | 'validating-seal' | 'authenticated' | 'error';

interface UseMeetingAuthResult {
  authState: AuthState;
  authToken: string | null;
  authError: string | null;
  isAuthenticated: boolean;
  isAuthenticating: boolean;
  clearAuth: () => void;
}

interface UseMeetingAuthOptions {
  roomId: string;
  /** Only run seal validation when enabled (default: true) */
  enabled?: boolean;
}

/**
 * Custom hook to manage meeting authentication flow
 * Handles Seal-based access validation only (no backend session)
 */
export function useMeetingAuth(options: UseMeetingAuthOptions): UseMeetingAuthResult {
  const { roomId, enabled = true } = typeof options === 'string' ? { roomId: options, enabled: true } : options;
  const currentAccount = useCurrentAccount();
  const { validateAccess, isValidating, hasAccess, error: sealError, sessionKey } = useSealAuth();

  const [authState, setAuthState] = useState<AuthState>('idle');
  const [authError, setAuthError] = useState<string | null>(null);

  /**
   * Main authentication flow - Seal validation only
   */
  useEffect(() => {
    // Skip if not enabled (e.g., waiting for backend participant check)
    if (!enabled) {
      console.log('[Auth] Seal validation disabled - waiting for backend participant check');
      return;
    }

    console.log('[Auth] ✅ Seal validation enabled - user confirmed as participant');

    // Prerequisites check
    if (!currentAccount || !roomId || !PACKAGE_ID) {
      return;
    }

    // Skip if already authenticated
    if (authState === 'authenticated') {
      return;
    }

    // State machine transitions
    const runAuthFlow = async () => {
      try {
        // State: idle -> validating-seal
        if (authState === 'idle' && !isValidating && hasAccess === null) {
          console.log('[Auth] 🔐 Starting Seal validation');
          setAuthState('validating-seal');

          const sealAccessGranted = await validateAccess(
            roomId,
            PACKAGE_ID,
            NETWORK
          );

          if (!sealAccessGranted) {
            setAuthError('Seal access denied. You are not authorized to join this room.');
            setAuthState('error');
            return;
          }

          // Seal validation successful - mark as authenticated
          console.log('[Auth] Seal access granted');
          setAuthState('authenticated');
        }

        // Handle Seal validation failure
        if (hasAccess === false && authState !== 'error') {
          setAuthError('Access denied. You are not authorized to join this room.');
          setAuthState('error');
        }
      } catch (err) {
        console.error('[Auth] Authentication flow error:', err);
        setAuthError(err instanceof Error ? err.message : 'Authentication failed');
        setAuthState('error');
      }
    };

    runAuthFlow();
  }, [
    currentAccount,
    roomId,
    PACKAGE_ID,
    authState,
    hasAccess,
    isValidating,
    enabled,
    validateAccess,
  ]);

  // Update error from Seal hook
  useEffect(() => {
    if (sealError && authState !== 'error') {
      setAuthError(sealError);
      setAuthState('error');
    }
  }, [sealError, authState]);

  const clearAuth = useCallback(() => {
    setAuthState('idle');
    setAuthError(null);
  }, []);

  return {
    authState,
    authToken: null, // No backend token needed anymore
    authError,
    isAuthenticated: authState === 'authenticated',
    isAuthenticating: authState === 'validating-seal',
    clearAuth
  };
}
