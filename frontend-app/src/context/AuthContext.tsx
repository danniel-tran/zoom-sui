'use client';

import React, { createContext, useContext, useState, ReactNode, useEffect, useMemo, useCallback } from 'react';
import { useCurrentAccount, useDisconnectWallet, useSuiClientQuery } from '@mysten/dapp-kit';
import { initiateZkLogin, DecodedJwt } from '@/lib/zkLogin';
import { useAuth as useWalletAuth } from '@/hooks/useAuth';

export type AuthMethod = 'wallet' | 'zklogin' | null;

interface AuthContextType {
    // Common properties
    isWalletConnected: boolean;
    isConnecting: boolean;  // Loading state for auto-connect
    address: string | null;
    balance: string | null;
    authMethod: AuthMethod;

    // User info (for zkLogin)
    user: DecodedJwt | null;

    // Wallet authentication
    accessToken: string | null;
    isAuthenticating: boolean;
    authError: string | null;
    authenticateWallet: () => Promise<boolean>;

    // Actions
    loginWithZkLogin: () => void;
    disconnect: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const walletAccount = useCurrentAccount();
    const { mutate: disconnectWallet } = useDisconnectWallet();
    const [zkUser, setZkUser] = useState<DecodedJwt | null>(null);
    const [zkAddress, setZkAddress] = useState<string | null>(null);
    const [isConnecting, setIsConnecting] = useState(true);

    // Debug logging for wallet account
    useEffect(() => {
        console.log('[AuthContext] Wallet account state:', {
            hasAccount: !!walletAccount,
            address: walletAccount?.address,
            isConnecting,
        });
    }, [walletAccount, isConnecting]);

    // Use the wallet authentication hook
    const {
        accessToken,
        loading: isAuthenticating,
        error: authError,
        isAuthenticated: isWalletAuthenticated,
        authenticate,
        logout: logoutWallet,
    } = useWalletAuth();

    // Determine which auth method is active (memoized)
    const authMethod: AuthMethod = useMemo(() => {
        if (walletAccount) return 'wallet';
        if (zkUser) return 'zklogin';
        return null;
    }, [walletAccount, zkUser]);

    // Get the active address (memoized to ensure stable reference)
    const address = useMemo(() => {
        return walletAccount?.address || zkAddress || null;
    }, [walletAccount?.address, zkAddress]);

    // Get balance for the active address
    const { data: balanceData } = useSuiClientQuery(
        'getBalance',
        { owner: address || '' },
        { enabled: !!address }
    );

    const balance = useMemo(() => {
        return balanceData?.totalBalance
            ? (Number(balanceData.totalBalance) / 1_000_000_000).toFixed(4)
            : null;
    }, [balanceData?.totalBalance]);

    // Handle initial loading state for auto-connect
    useEffect(() => {
        // Check if there's a stored wallet connection
        const storedWallet = localStorage.getItem('sui-meet-wallet');

        if (!storedWallet) {
            // No stored wallet, stop loading immediately
            setIsConnecting(false);
            return;
        }

        // Give auto-connect a moment to complete
        const timer = setTimeout(() => {
            setIsConnecting(false);
        }, 1000);

        return () => clearTimeout(timer);
    }, []);

    // Update loading state when wallet connects
    useEffect(() => {
        if (walletAccount) {
            setIsConnecting(false);
        }
    }, [walletAccount]);

    // Load zkLogin user from localStorage on mount
    useEffect(() => {
        const storedUser = localStorage.getItem('zkLoginUser');
        const storedAddress = localStorage.getItem('zkLoginAddress');

        if (storedUser && storedAddress) {
            try {
                setZkUser(JSON.parse(storedUser));
                setZkAddress(storedAddress);
            } catch (error) {
                console.error('Failed to parse stored zkLogin user:', error);
                localStorage.removeItem('zkLoginUser');
                localStorage.removeItem('zkLoginAddress');
            }
        }
    }, []);

    // Clear wallet authentication when wallet is disconnected
    // But ONLY after auto-connect has finished (to avoid clearing on page load)
    useEffect(() => {
        // Wait for auto-connect to complete before checking logout
        if (!isConnecting && !walletAccount && isWalletAuthenticated) {
            // Wallet was disconnected, clear the auth tokens
            console.log('Wallet disconnected, clearing authentication');
            logoutWallet();
        }
    }, [isConnecting, walletAccount, isWalletAuthenticated, logoutWallet]);

    // Actions (memoized with useCallback)
    const loginWithZkLogin = useCallback(() => {
        initiateZkLogin();
    }, []);

    const authenticateWallet = useCallback(async (): Promise<boolean> => {
        return await authenticate();
    }, [authenticate]);

    const disconnect = useCallback(() => {
        // Disconnect wallet if connected
        if (walletAccount) {
            disconnectWallet();
        }

        // Logout wallet authentication
        logoutWallet();

        // Clear zkLogin data
        setZkUser(null);
        setZkAddress(null);
        localStorage.removeItem('zkLoginUser');
        localStorage.removeItem('zkLoginAddress');
    }, [walletAccount, disconnectWallet, logoutWallet]);

    // isWalletConnected should ensure authentication is complete
    // For wallet: must have address AND be authenticated (have JWT token)
    // For zkLogin: just needs zkUser to exist (memoized)
    const isWalletConnected = useMemo(() => {
        if (walletAccount) {
            return !!walletAccount.address && isWalletAuthenticated;
        }
        return !!zkUser;
    }, [walletAccount, isWalletAuthenticated, zkUser]);

    // Memoize the context value to prevent unnecessary re-renders
    const contextValue = useMemo(() => ({
        isWalletConnected,
        isConnecting,
        address,
        balance,
        authMethod,
        user: zkUser,
        accessToken,
        isAuthenticating,
        authError,
        authenticateWallet,
        loginWithZkLogin,
        disconnect,
    }), [
        isWalletConnected,
        isConnecting,
        address,
        balance,
        authMethod,
        zkUser,
        accessToken,
        isAuthenticating,
        authError,
        authenticateWallet,
        loginWithZkLogin,
        disconnect,
    ]);

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}

// Helper function to save zkLogin user (called from callback page)
export function saveZkLoginUser(user: DecodedJwt, address: string): void {
    localStorage.setItem('zkLoginUser', JSON.stringify(user));
    localStorage.setItem('zkLoginAddress', address);
}
