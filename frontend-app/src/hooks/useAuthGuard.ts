import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useDisconnectWallet } from '@mysten/dapp-kit';
import { useAuth } from '@/context/AuthContext';

interface UseAuthGuardOptions {
  /** Redirect path when not authenticated (default: '/login') */
  redirectTo?: string;
  /** Allow access without authentication (default: false) */
  allowUnauthenticated?: boolean;
}

/**
 * Auth guard hook that checks for access token
 * If no token found, disconnects wallet and redirects to login
 *
 * Usage:
 * ```tsx
 * function ProtectedPage() {
 *   const { isAuthorized, isChecking } = useAuthGuard();
 *
 *   if (isChecking) return <div>Loading...</div>;
 *   if (!isAuthorized) return null; // Will redirect
 *
 *   return <div>Protected content</div>;
 * }
 * ```
 */
export function useAuthGuard(options: UseAuthGuardOptions = {}) {
  const {
    redirectTo = '/login',
    allowUnauthenticated = false,
  } = options;

  const router = useRouter();
  const { mutate: disconnectWallet } = useDisconnectWallet();
  const { disconnect: disconnectAuth } = useAuth();

  const [isAuthorized, setIsAuthorized] = useState<boolean>(allowUnauthenticated);
  const [isChecking, setIsChecking] = useState<boolean>(!allowUnauthenticated);

  useEffect(() => {
    // Skip check if authentication not required
    if (allowUnauthenticated) {
      setIsAuthorized(true);
      setIsChecking(false);
      return;
    }

    const checkAuth = () => {
      try {
        setIsChecking(true);

        // Check for access token in localStorage
        const accessToken = localStorage.getItem('accessToken');
        const refreshToken = localStorage.getItem('refreshToken');

        console.log('[AuthGuard] Checking authentication:', {
          hasAccessToken: !!accessToken,
          hasRefreshToken: !!refreshToken,
        });

        // If no tokens, user is not authenticated
        if (!accessToken && !refreshToken) {
          console.log('[AuthGuard] No tokens found, disconnecting and redirecting to login');

          // Disconnect wallet
          disconnectWallet();

          // Clear auth state
          disconnectAuth();

          // Redirect to login
          router.push(redirectTo);

          setIsAuthorized(false);
          return;
        }

        // Tokens exist, user is authorized
        console.log('[AuthGuard] Authentication valid');
        setIsAuthorized(true);
      } catch (error) {
        console.error('[AuthGuard] Error checking authentication:', error);
        setIsAuthorized(false);
      } finally {
        setIsChecking(false);
      }
    };

    checkAuth();

    // Re-check on storage changes (e.g., logout in another tab)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'accessToken' || e.key === 'refreshToken') {
        console.log('[AuthGuard] Storage changed, re-checking auth');
        checkAuth();
      }
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [allowUnauthenticated, redirectTo, router, disconnectWallet, disconnectAuth]);

  return {
    /** Whether the user is authorized */
    isAuthorized,
    /** Whether the auth check is in progress */
    isChecking,
  };
}
