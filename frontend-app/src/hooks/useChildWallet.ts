import { useState, useCallback, useEffect } from 'react';
import { useAuth } from './useAuth';

export interface ChildWallet {
  id: string;
  address: string;
  scope: string[];
  issuedAt: string;
  expiresAt: string;
}

export interface AutoSignResult {
  signature: string;
  publicKey: string;
  signedAt: string;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api';

/**
 * Hook for managing child wallets (ephemeral keypairs for auto-signing)
 * Child wallets allow transactions without prompting the user's main wallet
 */
export function useChildWallet() {
  const { accessToken, refreshTokenIfNeeded } = useAuth();
  const [childWallets, setChildWallets] = useState<ChildWallet[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');

  /**
   * Create a new child wallet with specified scopes
   */
  const createChildWallet = useCallback(async (
    scope: string[],
    expiresInHours = 24
  ): Promise<ChildWallet | null> => {
    setLoading(true);
    setError('');

    try {
      await refreshTokenIfNeeded();

      const response = await fetch(`${API_BASE_URL}/child-wallet/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ scope, expiresInHours }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create child wallet');
      }

      const data = await response.json();
      const newWallet = data.childWallet;
      
      setChildWallets(prev => [newWallet, ...prev]);
      return newWallet;
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Failed to create child wallet';
      setError(errorMsg);
      return null;
    } finally {
      setLoading(false);
    }
  }, [accessToken, refreshTokenIfNeeded]);

  /**
   * List all active child wallets
   */
  const listChildWallets = useCallback(async (): Promise<ChildWallet[]> => {
    setLoading(true);
    setError('');

    try {
      await refreshTokenIfNeeded();

      const response = await fetch(`${API_BASE_URL}/child-wallet/list`, {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to list child wallets');
      }

      const data = await response.json();
      setChildWallets(data.childWallets);
      return data.childWallets;
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Failed to list child wallets';
      setError(errorMsg);
      return [];
    } finally {
      setLoading(false);
    }
  }, [accessToken, refreshTokenIfNeeded]);

  /**
   * Auto-sign a transaction using child wallet
   * No user interaction required!
   */
  const autoSign = useCallback(async (
    ephemeralKeyId: string,
    txPayload: string,
    requestedScope?: string
  ): Promise<AutoSignResult | null> => {
    setLoading(true);
    setError('');

    try {
      await refreshTokenIfNeeded();

      const response = await fetch(`${API_BASE_URL}/child-wallet/sign`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          ephemeralKeyId,
          txPayload,
          requestedScope,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to sign transaction');
      }

      return await response.json();
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Failed to sign transaction';
      setError(errorMsg);
      return null;
    } finally {
      setLoading(false);
    }
  }, [accessToken, refreshTokenIfNeeded]);

  /**
   * Revoke a child wallet
   */
  const revokeChildWallet = useCallback(async (id: string): Promise<boolean> => {
    setLoading(true);
    setError('');

    try {
      await refreshTokenIfNeeded();

      const response = await fetch(`${API_BASE_URL}/child-wallet/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to revoke child wallet');
      }

      setChildWallets(prev => prev.filter(w => w.id !== id));
      return true;
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Failed to revoke child wallet';
      setError(errorMsg);
      return false;
    } finally {
      setLoading(false);
    }
  }, [accessToken, refreshTokenIfNeeded]);

  // Auto-load child wallets when token is available
  useEffect(() => {
    if (accessToken) {
      listChildWallets();
    }
  }, [accessToken]);

  return {
    childWallets,
    loading,
    error,
    createChildWallet,
    listChildWallets,
    autoSign,
    revokeChildWallet,
  };
}
