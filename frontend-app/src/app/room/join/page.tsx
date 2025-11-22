'use client';

import { useState, useEffect, useCallback, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useCurrentAccount } from '@mysten/dapp-kit';
import {
    LockClosedIcon,
    CheckCircledIcon,
    CrossCircledIcon,
    UpdateIcon,
    ExclamationTriangleIcon,
    ChevronRightIcon
} from '@radix-ui/react-icons';
import { useSealAuth } from '@/hooks/useSealAuth';

// Package ID from environment variable
const PACKAGE_ID = process.env.NEXT_PUBLIC_PACKAGE_ID || '';
const NETWORK = (process.env.NEXT_PUBLIC_NETWORK || 'testnet') as 'testnet' | 'mainnet';

function JoinRoomPageContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const currentAccount = useCurrentAccount();
    const {
        validateAccess,
        isValidating,
        hasAccess,
        error: sealError,
    } = useSealAuth();

    const roomId = searchParams.get('roomId');

    const [accessStatus, setAccessStatus] = useState<'checking' | 'approved' | 'denied'>('checking');
    const [error, setError] = useState('');

    const verifySealAccess = useCallback(async () => {
        if (!roomId || !currentAccount || !PACKAGE_ID) {
            if (!currentAccount) {
                setAccessStatus('denied');
                setError('Please connect your wallet to verify access');
            } else if (!roomId) {
                setError('No room ID provided');
                setAccessStatus('denied');
            }
            return;
        }

        setAccessStatus('checking');
        setError('');

        try {
            // Use Seal authentication: sealPolicyId is the roomId
            await validateAccess(
                roomId, // sealPolicyId is the same as roomId
                PACKAGE_ID,
                NETWORK
            );
            // Access status will be updated via useEffect based on hasAccess
        } catch (err) {
            console.error('Failed to verify Seal access:', err);
            setError(err instanceof Error ? err.message : 'Failed to verify access');
            setAccessStatus('denied');
        }
    }, [roomId, currentAccount, PACKAGE_ID, validateAccess]);

    // Verify access using Seal when account is available
    useEffect(() => {
        if (roomId && currentAccount && PACKAGE_ID && !isValidating && hasAccess === null) {
            console.log('verifySealAccess');
            verifySealAccess();
        } else if (!roomId) {
            setError('No room ID provided');
            setAccessStatus('denied');
        }
    }, [roomId, currentAccount, PACKAGE_ID, isValidating, hasAccess, verifySealAccess]);

    // Update access status based on Seal validation result
    useEffect(() => {
        if (hasAccess === true) {
            setAccessStatus('approved');
            setError('');
        } else if (hasAccess === false && !isValidating) {
            setAccessStatus('denied');
            setError('Your address is not on the allow list');
        }
    }, [hasAccess, isValidating]);

    // Update error from Seal validation
    useEffect(() => {
        if (sealError) {
            setError(sealError);
        }
    }, [sealError]);

    const handleRetryVerification = useCallback(async () => {
        if (!roomId || !currentAccount) {
            setError('Please connect your wallet first');
            return;
        }
        await verifySealAccess();
    }, [roomId, currentAccount, verifySealAccess]);

    const handleJoinMeeting = () => {
        // Navigate to calling page for video/audio meeting
        router.push(`/calling?roomId=${roomId}`);
    };

    if (accessStatus === 'checking' || isValidating) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 flex items-center justify-center p-4">
                <div className="text-center">
                    <UpdateIcon className="w-12 h-12 animate-spin text-blue-500 mx-auto mb-4" />
                    <h2 className="text-xl font-semibold text-gray-900 mb-2">
                        {isValidating ? 'Signing Message for Seal Verification' : 'Verifying Access'}
                    </h2>
                    <p className="text-gray-600">
                        {isValidating
                            ? 'Please sign the message in your wallet to verify access...'
                            : 'Checking your credentials against the blockchain...'
                        }
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 py-8 px-4">
            <div className="max-w-2xl mx-auto">
                {/* Access Approved */}
                {accessStatus === 'approved' && (
                    <div className="bg-white rounded-2xl shadow-xl p-8">
                        <div className="text-center mb-6">
                            <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-4">
                                <CheckCircledIcon className="w-12 h-12 text-green-600" />
                            </div>
                            <h1 className="text-3xl font-bold text-gray-900 mb-2">
                                Access Approved
                            </h1>
                            <p className="text-gray-600">
                                You're on the allow list for this meeting
                            </p>
                        </div>

                        {/* Meeting Details */}
                        <div className="bg-gray-50 rounded-xl p-6 mb-6">
                            <div className="space-y-3 text-sm">
                                <div className="flex items-center justify-between">
                                    <span className="text-gray-600">Room ID:</span>
                                    <span className="font-mono text-xs text-gray-900 truncate ml-2 max-w-xs">
                                        {roomId}
                                    </span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-gray-600">Your Address:</span>
                                    <span className="font-mono text-xs text-gray-900 truncate ml-2 max-w-xs">
                                        {currentAccount?.address}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Security Info */}
                        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
                            <div className="flex items-start gap-3">
                                <LockClosedIcon className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                                <div>
                                    <h3 className="text-sm font-semibold text-blue-900 mb-1">
                                        Sealed Meeting
                                    </h3>
                                    <p className="text-xs text-blue-700">
                                        This meeting is secured with Sui's Seal protocol. Your identity has been
                                        verified against the on-chain whitelist policy.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Join Button */}
                        <button
                            onClick={handleJoinMeeting}
                            className="w-full px-6 py-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2"
                        >
                            Join Meeting Now
                            <ChevronRightIcon className="w-5 h-5" />
                        </button>
                    </div>
                )}

                {/* Access Denied */}
                {accessStatus === 'denied' && (
                    <div className="bg-white rounded-2xl shadow-xl p-8">
                        <div className="text-center mb-6">
                            <div className="inline-flex items-center justify-center w-20 h-20 bg-red-100 rounded-full mb-4">
                                <CrossCircledIcon className="w-12 h-12 text-red-600" />
                            </div>
                            <h1 className="text-3xl font-bold text-gray-900 mb-2">
                                Access Denied
                            </h1>
                            <p className="text-gray-600">
                                You don't have permission to join this meeting
                            </p>
                        </div>

                        {/* Error Message */}
                        {error && (
                            <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6">
                                <div className="flex items-start gap-3">
                                    <ExclamationTriangleIcon className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                                    <div>
                                        <h3 className="text-sm font-semibold text-red-900 mb-1">
                                            Verification Failed
                                        </h3>
                                        <p className="text-xs text-red-700">{error}</p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Details */}
                        {currentAccount && (
                            <div className="bg-gray-50 rounded-xl p-6 mb-6">
                                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                                    Your Details
                                </h2>
                                <div className="space-y-3 text-sm">
                                    <div className="flex items-center justify-between">
                                        <span className="text-gray-600">Your Address:</span>
                                        <span className="font-mono text-xs text-gray-900 truncate ml-2 max-w-xs">
                                            {currentAccount.address}
                                        </span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-gray-600">Room ID:</span>
                                        <span className="font-mono text-xs text-gray-900 truncate ml-2 max-w-xs">
                                            {roomId}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Help Text */}
                        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
                            <h3 className="text-sm font-semibold text-blue-900 mb-2">
                                What can I do?
                            </h3>
                            <ul className="text-xs text-blue-700 space-y-1 list-disc list-inside">
                                <li>Contact the meeting host to add your address to the whitelist</li>
                                <li>Make sure you're connected with the correct wallet</li>
                                <li>Verify the room ID is correct</li>
                            </ul>
                        </div>

                        {/* Actions */}
                        <div className="space-y-3">
                            {!currentAccount && (
                                <button
                                    onClick={() => router.push('/login')}
                                    className="w-full px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-xl font-medium hover:shadow-lg transition-all duration-200"
                                >
                                    Connect Wallet
                                </button>
                            )}
                            <button
                                onClick={handleRetryVerification}
                                disabled={isValidating}
                                className="w-full px-6 py-3 bg-blue-500 text-white rounded-xl font-medium hover:bg-blue-600 transition-colors disabled:opacity-50"
                            >
                                {isValidating ? 'Verifying...' : 'Try Again'}
                            </button>
                            <button
                                onClick={() => router.push('/')}
                                className="w-full px-6 py-3 bg-white border-2 border-gray-300 text-gray-700 rounded-xl font-medium hover:border-gray-400 transition-colors"
                            >
                                Back to Home
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

// Wrap component in Suspense for Next.js 15 useSearchParams requirement
export default function JoinRoomPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 flex items-center justify-center p-4">
                <div className="text-center">
                    <UpdateIcon className="w-12 h-12 animate-spin text-blue-500 mx-auto mb-4" />
                    <h2 className="text-xl font-semibold text-gray-900 mb-2">
                        Loading
                    </h2>
                    <p className="text-gray-600">
                        Please wait...
                    </p>
                </div>
            </div>
        }>
            <JoinRoomPageContent />
        </Suspense>
    );
}
