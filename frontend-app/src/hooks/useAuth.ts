import { useState, useCallback, useEffect } from 'react';
import { useCurrentAccount, useSignPersonalMessage } from '@mysten/dapp-kit';
import {
  getAccessToken,
  getRefreshToken,
  storeTokens,
  updateAccessToken,
  clearTokens,
  isTokenExpired,
} from '@/lib/auth-storage';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

interface AuthTokens {
  accessToken: string;
  refreshToken: string;
  expiresAt: string;
}

/**
 * Enhanced authentication hook with token refresh
 */
export function useAuth() {
  const currentAccount = useCurrentAccount();
  const { mutate: signMessage } = useSignPersonalMessage();
  
  const [accessToken, setAccessToken] = useState<string>('');
  const [refreshToken, setRefreshToken] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');

  /**
   * Step 1: Request nonce from backend
   */
  const requestNonce = useCallback(async (walletAddress: string): Promise<string> => {
    const response = await fetch(`${API_BASE_URL}/auth/nonce`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ walletAddress }),
    });

    if (!response.ok) {
      throw new Error('Failed to request nonce');
    }

    const data = await response.json();
    return data.nonce;
  }, []);

  /**
   * Step 2: Authenticate with wallet signature
   */
  const authenticate = useCallback(async (): Promise<boolean> => {
    if (!currentAccount) {
      setError('Wallet not connected');
      return false;
    }

    setLoading(true);
    setError('');

    try {
      // Get nonce
      const nonce = await requestNonce(currentAccount.address);

      // Sign nonce (useSignPersonalMessage expects Uint8Array)
      const messageText = `Authenticate to SuiMeet\nNonce: ${nonce}`;
      const message = new TextEncoder().encode(messageText);
      
      // Wrap mutate in a Promise since it uses callback pattern
      const signature = await new Promise<string>((resolve, reject) => {
        signMessage(
          { message },
          {
            onSuccess: (result) => resolve(result.signature),
            onError: (error) => reject(error),
          }
        );
      });

      // Verify signature and get tokens
      const response = await fetch(`${API_BASE_URL}/auth/verify`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          walletAddress: currentAccount.address,
          signature: signature,
          walletType: 'sui',
        }),
      });

      if (!response.ok) {
        throw new Error('Authentication failed');
      }

      const data = await response.json();

      setAccessToken(data.accessToken);
      setRefreshToken(data.refreshToken);

      // Store tokens using centralized storage utility
      storeTokens({
        accessToken: data.accessToken,
        refreshToken: data.refreshToken,
        expiresAt: data.session.expiresAt,
      });

      return true;
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Authentication failed';
      setError(errorMsg);
      return false;
    } finally {
      setLoading(false);
    }
  }, [currentAccount, requestNonce, signMessage]);

  /**
   * Logout and clear tokens
   */
  const logout = useCallback(() => {
    setAccessToken('');
    setRefreshToken('');
    clearTokens();
  }, []);

  /**
   * Refresh access token using refresh token
   */
  const refreshAccessToken = useCallback(async (): Promise<boolean> => {
    const storedRefreshToken = refreshToken || getRefreshToken();

    if (!storedRefreshToken) {
      setError('No refresh token available');
      return false;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/auth/refresh`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refreshToken: storedRefreshToken }),
      });

      if (!response.ok) {
        // Refresh token expired or invalid - need to re-authenticate
        logout();
        throw new Error('Refresh token expired. Please sign in again.');
      }

      const data = await response.json();

      setAccessToken(data.accessToken);
      updateAccessToken(data.accessToken);

      return true;
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Token refresh failed';
      setError(errorMsg);
      return false;
    }
  }, [refreshToken, logout]);

  /**
   * Check if token needs refresh and refresh if necessary
   */
  const refreshTokenIfNeeded = useCallback(async () => {
    if (isTokenExpired(5)) {
      await refreshAccessToken();
    }
  }, [refreshAccessToken]);

  /**
   * Check if user is authenticated
   */
  const isAuthenticated = !!accessToken;

  // Restore tokens from localStorage on mount
  useEffect(() => {
    const storedAccessToken = getAccessToken();
    const storedRefreshToken = getRefreshToken();

    if (storedAccessToken) setAccessToken(storedAccessToken);
    if (storedRefreshToken) setRefreshToken(storedRefreshToken);
  }, []);

  // Auto-refresh token periodically
  useEffect(() => {
    if (!isAuthenticated) return;

    const interval = setInterval(() => {
      refreshTokenIfNeeded();
    }, 60 * 1000); // Check every minute

    return () => clearInterval(interval);
  }, [isAuthenticated, refreshTokenIfNeeded]);

  return {
    accessToken,
    refreshToken,
    loading,
    error,
    isAuthenticated,
    authenticate,
    refreshAccessToken,
    refreshTokenIfNeeded,
    logout,
  };
}
