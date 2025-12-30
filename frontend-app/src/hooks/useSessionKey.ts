import { useState, useCallback, useEffect, useRef } from 'react';
import { SessionKey } from '@mysten/seal';
import { getAccessToken } from '@/lib/auth-storage';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';

/**
 * Get localStorage key for SessionKey
 */
const getStorageKey = (roomId: string) => `seal_session_${roomId}`;

/**
 * Load SessionKey data from localStorage
 * Note: SessionKey cannot be fully serialized/deserialized as a class instance
 * We store the serialized JSON string from backend
 */
const loadSessionKeyData = (roomId: string): any | null => {
  if (typeof window === 'undefined') return null;

  try {
    const key = getStorageKey(roomId);
    const stored = localStorage.getItem(key);
    if (!stored) return null;

    const data = JSON.parse(stored);

    // Check if expired
    if (data.expiresAt && new Date(data.expiresAt) < new Date()) {
      console.log('[SessionKey] Stored SessionKey expired, removing');
      localStorage.removeItem(key);
      return null;
    }

    // Return the stored data (serialized SessionKey from backend)
    return data;
  } catch (error) {
    console.error('[SessionKey] Error loading from localStorage:', error);
    return null;
  }
};

/**
 * Store SessionKey in localStorage
 */
const storeSessionKey = (roomId: string, serialized: string, expiresAt: string): void => {
  if (typeof window === 'undefined') return;

  try {
    const key = getStorageKey(roomId);
    localStorage.setItem(key, JSON.stringify({ serialized, expiresAt }));
  } catch (error) {
    console.error('[SessionKey] Error storing to localStorage:', error);
  }
};

/**
 * Clear SessionKey from localStorage
 */
const clearSessionKey = (roomId: string): void => {
  if (typeof window === 'undefined') return;

  try {
    const key = getStorageKey(roomId);
    localStorage.removeItem(key);
  } catch (error) {
    console.error('[SessionKey] Error clearing from localStorage:', error);
  }
};

/**
 * Check if SessionKey is expired or about to expire
 */
const isSessionKeyExpired = (sessionKey: SessionKey | null, bufferMinutes: number = 5): boolean => {
  if (!sessionKey) return true;

  try {
    // SessionKey has an expiry method or property
    // For now, we rely on the stored expiresAt from backend
    return false; // Will be handled by stored expiresAt check
  } catch (error) {
    console.error('[SessionKey] Error checking expiry:', error);
    return true;
  }
};

export interface SessionKeyData {
  serialized: string; // JSON string from backend
  expiresAt: string;
  createdAt: string;
  ephemeralAddress: string;
}

export interface UseSessionKeyResult {
  sessionKey: SessionKeyData | null;
  isExpired: boolean;
  isRefreshing: boolean;
  isRemoved: boolean; // User has been removed from room
  error: string | null;
  refresh: () => Promise<boolean>;
  createNew: () => void;
  clearSession: () => void;
}

export interface UseSessionKeyOptions {
  roomId: string;
  enabled?: boolean; // Whether to auto-load and manage SessionKey
}

/**
 * Hook for managing SessionKey lifecycle for a room
 *
 * Features:
 * - Loads from localStorage on mount
 * - Detects expiry
 * - Calls backend validate-and-refresh when needed
 * - Updates localStorage with new SessionKey
 * - Handles removal from room (403 + removed: true)
 */
export function useSessionKey({ roomId, enabled = true }: UseSessionKeyOptions): UseSessionKeyResult {
  const [sessionKey, setSessionKey] = useState<SessionKeyData | null>(null);
  const [isExpired, setIsExpired] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isRemoved, setIsRemoved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Use ref to prevent concurrent refreshes
  const refreshingRef = useRef(false);

  /**
   * Load SessionKey data from localStorage on mount
   */
  useEffect(() => {
    if (!enabled || !roomId) return;

    const loaded = loadSessionKeyData(roomId);
    if (loaded) {
      console.log('[SessionKey] Loaded from localStorage for room:', roomId);
      setSessionKey(loaded);
      setIsExpired(false);
    } else {
      console.log('[SessionKey] No valid SessionKey found in localStorage');
      setIsExpired(true);
    }
  }, [roomId, enabled]);

  /**
   * Check expiry periodically
   */
  useEffect(() => {
    if (!enabled || !sessionKey) return;

    const interval = setInterval(() => {
      if (typeof window === 'undefined') return;

      try {
        const key = getStorageKey(roomId);
        const stored = localStorage.getItem(key);
        if (!stored) {
          setIsExpired(true);
          return;
        }

        const data = JSON.parse(stored);
        if (data.expiresAt && new Date(data.expiresAt) < new Date()) {
          console.log('[SessionKey] SessionKey expired');
          setIsExpired(true);
          clearSessionKey(roomId);
        }
      } catch (error) {
        console.error('[SessionKey] Error checking expiry:', error);
      }
    }, 30 * 1000); // Check every 30 seconds

    return () => clearInterval(interval);
  }, [enabled, sessionKey, roomId]);

  /**
   * Refresh SessionKey via backend
   */
  const refresh = useCallback(async (): Promise<boolean> => {
    if (refreshingRef.current) {
      console.log('[SessionKey] Refresh already in progress, skipping');
      return false;
    }

    setIsRefreshing(true);
    setError(null);
    refreshingRef.current = true;

    try {
      const accessToken = getAccessToken();
      if (!accessToken) {
        throw new Error('No access token available');
      }

      const response = await fetch(`${API_BASE_URL}/seal/validate-and-refresh`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ roomId }),
      });

      if (!response.ok) {
        const data = await response.json();

        // User has been removed from room
        if (response.status === 403 && data.removed) {
          console.error('[SessionKey] User has been removed from room');
          setIsRemoved(true);
          clearSessionKey(roomId);
          throw new Error(data.error || 'You have been removed from this room');
        }

        throw new Error(data.error || 'Failed to refresh SessionKey');
      }

      const data = await response.json();

      // Store SessionKey data
      const sessionKeyData: SessionKeyData = {
        serialized: data.sessionKey.serialized,
        expiresAt: data.sessionKey.expiresAt,
        createdAt: data.sessionKey.createdAt,
        ephemeralAddress: data.sessionKey.ephemeralAddress,
      };

      setSessionKey(sessionKeyData);
      setIsExpired(false);
      setIsRemoved(false);

      // Store in localStorage
      storeSessionKey(roomId, data.sessionKey.serialized, data.sessionKey.expiresAt);

      console.log('[SessionKey] Refreshed successfully, expires at:', data.sessionKey.expiresAt);
      return true;
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Failed to refresh SessionKey';
      setError(errorMsg);
      console.error('[SessionKey] Refresh error:', err);
      return false;
    } finally {
      setIsRefreshing(false);
      refreshingRef.current = false;
    }
  }, [roomId]);

  /**
   * Trigger creation of new SessionKey (user needs to sign)
   */
  const createNew = useCallback(() => {
    console.log('[SessionKey] Clearing existing SessionKey, user needs to create new one');
    clearSessionKey(roomId);
    setSessionKey(null);
    setIsExpired(true);
    setIsRemoved(false);
    setError(null);
  }, [roomId]);

  /**
   * Clear session manually
   */
  const clearSession = useCallback(() => {
    clearSessionKey(roomId);
    setSessionKey(null);
    setIsExpired(true);
    setIsRemoved(false);
    setError(null);
  }, [roomId]);

  return {
    sessionKey,
    isExpired,
    isRefreshing,
    isRemoved,
    error,
    refresh,
    createNew,
    clearSession,
  };
}
