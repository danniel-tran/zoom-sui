'use client';

import { useState, useEffect, useCallback, Suspense } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useSignAndExecuteTransaction } from '@mysten/dapp-kit';
import { Transaction } from '@mysten/sui/transactions';
import {
    CheckIcon,
    CopyIcon,
    Share1Icon,
    PersonIcon,
    UpdateIcon,
    ExclamationTriangleIcon,
    ChevronRightIcon
} from '@radix-ui/react-icons';
import { useAuth as useAuthContext } from '@/context/AuthContext';
import { useAuthGuard } from '@/hooks/useAuthGuard';

// Package ID from environment variable
const PACKAGE_ID = process.env.NEXT_PUBLIC_PACKAGE_ID || '';
const CLOCK_OBJECT_ID = '0x6'; // Sui Clock object (shared)

interface WhitelistAddress {
    address: string;
    addedAt?: number;
}

interface RoomData {
    room: {
        roomId: string;
        title: string;
        status: string;
        maxParticipants: number;
        requireApproval: boolean;
        participantCount: number;
        sealPolicyId: string;
        createdAt: string | null;
        startedAt: string | null;
        endedAt: string | null;
    };
    hosts: Array<{ address: string; adminCapId?: string; joinedAt?: string }>;
    participants: Array<{ address: string; joinedAt?: string }>;
    metadata?: any;
    pendingApprovals?: any[];
}

function EditRoomPageContent() {
    const router = useRouter();
    const params = useParams();
    const { mutate: signAndExecuteTransaction } = useSignAndExecuteTransaction();
    const { isWalletConnected: isWalletApprove, address: walletAddress, isConnecting } = useAuthContext();

    // Auth guard - check for access token
    const { isAuthorized, isChecking: isCheckingAuth } = useAuthGuard();

    // Create a currentAccount-like object for compatibility with existing code
    const currentAccount = walletAddress ? { address: walletAddress } : null;
    console.log('EditRoomPageContent - currentAccount:', currentAccount);

    const roomId = params.roomId as string;

    // HostCap state - stores the HostCap object ID for managing the room
    const [hostCapId, setHostCapId] = useState<string>('');

    // Whitelist management - only participants (not hosts)
    const [whitelist, setWhitelist] = useState<WhitelistAddress[]>([]);
    const [newAddress, setNewAddress] = useState('');
    const [addressError, setAddressError] = useState('');

    // Room state
    const [inviteLink, setInviteLink] = useState('');
    const [roomData, setRoomData] = useState<RoomData | null>(null);
    const [isHost, setIsHost] = useState<boolean>(false);
    const [isCheckingAccess, setIsCheckingAccess] = useState(true);

    // UI state
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [copied, setCopied] = useState(false);

    // Redirect if wallet disconnected (but wait for initial connection check)
    useEffect(() => {
        if (!isConnecting && !currentAccount) {
            router.push('/');
        }
    }, [currentAccount, isConnecting, router]);

    // Load room data on mount (only when roomId changes)
    useEffect(() => {
        if (roomId) {
            loadRoomData(roomId);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [roomId, walletAddress]); // Only re-run when roomId changes

    // Find HostCap from room data after it's loaded
    useEffect(() => {
        if (roomData && walletAddress) {
            findHostCap();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [roomData, walletAddress]);

    const findHostCap = useCallback(() => {
        if (!roomData || !walletAddress) return;

        console.log('[EditRoom] Finding HostCap from room data...');

        // Find the current user's host entry
        const currentUserHost = roomData.hosts.find(
            h => h.address?.toLowerCase() === walletAddress?.toLowerCase()
        );

        if (currentUserHost?.adminCapId) {
            setHostCapId(currentUserHost.adminCapId);
            console.log('[EditRoom] Found HostCap:', currentUserHost.adminCapId);
        } else {
            console.log('[EditRoom] HostCap not found for current user');
        }
    }, [roomData, walletAddress]);

    const loadRoomData = useCallback(async (id: string) => {
        console.log('[EditRoom] Loading room data from backend for:', id);
        try {
            setLoading(true);
            setIsCheckingAccess(true);

            const apiUrl = process.env.NEXT_PUBLIC_API_URL;
            if (!apiUrl) throw new Error('API URL not configured');
            const response = await fetch(`${apiUrl}/rooms/${id}`);

            if (!response.ok) {
                throw new Error('Failed to fetch room data');
            }

            const data: RoomData = await response.json();
            console.log('[EditRoom] Room data loaded:', data);
            setRoomData(data);

            // Check if current user is a host
            const userIsHost = walletAddress
                ? data.hosts.some(h => h.address?.toLowerCase() === walletAddress?.toLowerCase())
                : false;

            setIsHost(userIsHost);
            console.log('[EditRoom] User is host:', userIsHost, walletAddress, data);

            if (!userIsHost) {
                console.log('[EditRoom] User is not a host, redirecting...');
                setError('Only hosts can access the edit page');
                return;
            }
            else {
                setError("")
            }

            // Show only participants (not hosts) in the revoke list
            const participantAddresses = data.participants.map(p => ({
                address: p.address,
                addedAt: p.joinedAt ? new Date(p.joinedAt).getTime() : Date.now()
            }));

            setWhitelist(participantAddresses);
            console.log('[EditRoom] Loaded', participantAddresses.length, 'participants (hosts excluded)');

            // Generate invite link - direct to meeting page
            const link = `${window.location.origin}/meeting/${id}`;
            setInviteLink(link);
        } catch (err) {
            console.error('[EditRoom] Failed to load room:', err);
            setError('Failed to load room data');
        } finally {
            setLoading(false);
            setIsCheckingAccess(false);
        }
    }, [walletAddress, router]);

    const validateSuiAddress = (address: string): boolean => {
        const cleanAddr = address.trim();
        if (!cleanAddr.startsWith('0x')) {
            setAddressError('Address must start with 0x');
            return false;
        }
        if (cleanAddr.length < 3 || cleanAddr.length > 66) {
            setAddressError('Invalid address length');
            return false;
        }
        if (!/^0x[a-fA-F0-9]+$/.test(cleanAddr)) {
            setAddressError('Address must be hexadecimal');
            return false;
        }
        setAddressError('');
        return true;
    };

    const handleApproveGuest = async (guestAddress: string) => {
        if (!currentAccount || !roomId || !hostCapId) {
            setError('HostCap not found. Please reload the page or create a new room.');
            return;
        }

        setLoading(true);
        setError('');
        try {
            const txb = new Transaction();
            txb.setGasBudget(100_000_000); // Set gas budget
            // New signature: approve_guest(host_cap, room, guest, clock)
            txb.moveCall({
                target: `${PACKAGE_ID}::sealmeet::approve_guest`,
                arguments: [
                    txb.object(hostCapId), // HostCap (owned object)
                    txb.object(roomId), // MeetingRoom (shared object)
                    txb.pure.address(guestAddress), // guest address
                    txb.object(CLOCK_OBJECT_ID), // Clock object
                ],
            });

            signAndExecuteTransaction(
                { transaction: txb },
                {
                    onSuccess: async (result) => {
                        // Optimistically update UI immediately
                        const normalizedAddress = guestAddress.toLowerCase();
                        if (!whitelist.some(item => item.address.toLowerCase() === normalizedAddress)) {
                            setWhitelist([...whitelist, { address: guestAddress, addedAt: Date.now() }]);
                        }
                        setSuccessMessage(`Guest ${guestAddress.slice(0, 8)}... approved`);
                        setNewAddress(''); // Clear input field
                        setAddressError(''); // Clear any errors

                        // Wait a bit for transaction to be indexed, then reload from blockchain
                        setTimeout(async () => {
                            await loadRoomData(roomId);
                        }, 2000);
                    },
                    onError: (err) => {
                        console.error('Failed to approve guest:', err);
                        setError('Failed to approve guest');
                        setLoading(false);
                    }
                }
            );
        } catch (err) {
            console.error('Transaction error:', err);
            setError('Failed to approve guest');
            setLoading(false);
        }
    };

    const handleRevokeGuest = async (guestAddress: string) => {
        if (!currentAccount || !roomId || !hostCapId) {
            setError('HostCap not found. Please reload the page or create a new room.');
            return;
        }

        setLoading(true);
        setError('');
        try {
            const txb = new Transaction();
            txb.setGasBudget(100_000_000); // Set gas budget
            // New signature: revoke_guest(host_cap, room, guest, clock)
            txb.moveCall({
                target: `${PACKAGE_ID}::sealmeet::revoke_guest`,
                arguments: [
                    txb.object(hostCapId), // HostCap (owned object)
                    txb.object(roomId), // MeetingRoom (shared object)
                    txb.pure.address(guestAddress), // guest address
                    txb.object(CLOCK_OBJECT_ID), // Clock object
                ],
            });

            signAndExecuteTransaction(
                { transaction: txb },
                {
                    onSuccess: async () => {
                        // Optimistically update UI immediately
                        setWhitelist(whitelist.filter(item => item.address.toLowerCase() !== guestAddress.toLowerCase()));
                        setSuccessMessage(`Guest ${guestAddress.slice(0, 8)}... revoked`);

                        // Wait a bit for transaction to be indexed, then reload from blockchain
                        setTimeout(async () => {
                            await loadRoomData(roomId);
                        }, 2000);
                    },
                    onError: (err) => {
                        console.error('Failed to revoke guest:', err);
                        setError('Failed to revoke guest');
                        setLoading(false);
                    }
                }
            );
        } catch (err) {
            console.error('Transaction error:', err);
            setError('Failed to revoke guest');
            setLoading(false);
        }
    };

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    // Auth guard check - show loading while checking
    if (isCheckingAuth) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 flex items-center justify-center p-4">
                <div className="text-center">
                    <UpdateIcon className="w-12 h-12 animate-spin text-blue-500 mx-auto mb-4" />
                    <p className="text-gray-600">Checking authentication...</p>
                </div>
            </div>
        );
    }

    // Not authorized - will redirect to login (return null to prevent flash)
    if (!isAuthorized) {
        return null;
    }

    // Show loading while wallet is connecting or checking access
    if (isConnecting || isCheckingAccess || (loading && !roomData)) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 flex items-center justify-center p-4">
                <div className="text-center">
                    <UpdateIcon className="w-12 h-12 animate-spin text-blue-500 mx-auto mb-4" />
                    <p className="text-gray-600">
                        {isConnecting ? 'Connecting wallet...' : isCheckingAccess ? 'Checking access...' : 'Loading room data...'}
                    </p>
                </div>
            </div>
        );
    }

    // Redirect non-hosts
    if (!isHost && !isCheckingAccess) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 flex items-center justify-center p-4">
                <div className="text-center max-w-md">
                    <ExclamationTriangleIcon className="w-16 h-16 text-red-500 mx-auto mb-4" />
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Access Denied</h2>
                    <p className="text-gray-600 mb-6">Only hosts can access the edit page.</p>
                    <button
                        onClick={() => router.push('/room')}
                        className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                    >
                        Back to Rooms
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 py-8 px-4">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <div className="flex justify-between items-start mb-2">
                        <div>
                            <h1 className="text-4xl font-bold text-gray-900 mb-2">
                                {roomData?.room.title || 'Meeting Room'}
                            </h1>
                            <p className="text-gray-600 flex items-center gap-2">
                                <CheckIcon className="w-4 h-4 text-green-500" />
                                Sealed and secured on Sui blockchain
                            </p>
                        </div>
                        {roomId && (
                            <button
                                onClick={() => router.push(`/room/${roomId}`)}
                                className="px-4 py-2 text-sm text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg font-medium transition-all"
                            >
                                View Details
                            </button>
                        )}
                    </div>
                </div>

                {/* Success/Error Messages */}
                {successMessage && (
                    <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl">
                        <div className="flex items-start gap-3 mb-3">
                            <CheckIcon className="w-5 h-5 text-green-500 mt-0.5" />
                            <p className="text-sm text-green-600 flex-1">{successMessage}</p>
                        </div>
                        {roomId && (
                            <div className="ml-8">
                                <button
                                    onClick={() => router.push(`/room/${roomId}`)}
                                    className="text-sm text-green-700 hover:text-green-900 font-medium underline"
                                >
                                    View Room Details →
                                </button>
                            </div>
                        )}
                    </div>
                )}

                {error && (
                    <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3">
                        <ExclamationTriangleIcon className="w-5 h-5 text-red-500 mt-0.5" />
                        <p className="text-sm text-red-600">{error}</p>
                    </div>
                )}

                {!hostCapId && currentAccount && (
                    <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-xl flex items-start gap-3">
                        <ExclamationTriangleIcon className="w-5 h-5 text-yellow-500 mt-0.5" />
                        <div className="flex-1">
                            <p className="text-sm text-yellow-600 font-medium mb-1">HostCap Not Found</p>
                            <p className="text-xs text-yellow-700">You may not have permission to manage this room. Only the room host can approve or revoke guests.</p>
                        </div>
                    </div>
                )}

                <div className="grid md:grid-cols-2 gap-6">
                    {/* Invite Sharing */}
                    <div className="bg-white rounded-2xl shadow-lg p-6">
                        <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                            <Share1Icon className="w-5 h-5 text-blue-500" />
                            Share Invite
                        </h2>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Room ID
                                </label>
                                <div className="flex gap-2">
                                    <input
                                        type="text"
                                        value={roomId}
                                        readOnly
                                        className="flex-1 px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg font-mono text-sm text-gray-900"
                                    />
                                    <button
                                        onClick={() => copyToClipboard(roomId)}
                                        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                                    >
                                        {copied ? <CheckIcon className="w-4 h-4" /> : <CopyIcon className="w-4 h-4" />}
                                    </button>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Invite Link
                                </label>
                                <div className="flex gap-2">
                                    <input
                                        type="text"
                                        value={inviteLink}
                                        readOnly
                                        className="flex-1 px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg text-sm text-gray-900"
                                    />
                                    <button
                                        onClick={() => copyToClipboard(inviteLink)}
                                        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                                    >
                                        {copied ? <CheckIcon className="w-4 h-4" /> : <CopyIcon className="w-4 h-4" />}
                                    </button>
                                </div>
                            </div>

                            <div className="pt-4 border-t border-gray-200">
                                <p className="text-xs text-gray-500 mb-3">
                                    Only whitelisted addresses can access this meeting
                                </p>
                                <button
                                    onClick={() => router.push(`/meeting/${roomId}`)}
                                    className="w-full px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg font-medium hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2"
                                >
                                    Start Meeting
                                    <ChevronRightIcon className="w-4 h-4" />
                                </button>
                                <p className="text-xs text-gray-500 mt-2 text-center">
                                    Share the invite link above for guests to join
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Whitelist Management */}
                    <div className="bg-white rounded-2xl shadow-lg p-6">
                        <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                            <PersonIcon className="w-5 h-5 text-cyan-500" />
                            Manage Participants ({whitelist.length})
                        </h2>
                        <p className="text-xs text-gray-500 mb-4">
                            Hosts are not shown in this list and cannot be revoked.
                        </p>

                        {/* Add New Guest */}
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Approve New Participant
                            </label>
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    value={newAddress}
                                    onChange={(e) => {
                                        setNewAddress(e.target.value);
                                        setAddressError(''); // Clear error when user types
                                    }}
                                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-gray-900"
                                    placeholder="0x123abc..."
                                    disabled={!hostCapId || loading}
                                />
                                <button
                                    onClick={() => {
                                        const address = newAddress.trim();
                                        if (validateSuiAddress(address)) {
                                            // Check if already in whitelist
                                            if (whitelist.some(item => item.address.toLowerCase() === address.toLowerCase())) {
                                                setAddressError('Address already in whitelist');
                                                return;
                                            }
                                            handleApproveGuest(address);
                                        }
                                    }}
                                    disabled={loading || !hostCapId}
                                    className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <CheckIcon className="w-5 h-5" />
                                </button>
                            </div>
                            {addressError && (
                                <p className="text-xs text-red-500 mt-1">{addressError}</p>
                            )}
                        </div>

                        {/* Current Whitelist */}
                        <div className="space-y-2 max-h-96 overflow-y-auto">
                            {whitelist.length === 0 ? (
                                <div className="text-center py-8 text-gray-400">
                                    <PersonIcon className="w-12 h-12 mx-auto mb-2 opacity-50" />
                                    <p className="text-sm">No participants</p>
                                </div>
                            ) : (
                                whitelist.map((item, index) => (
                                    <div
                                        key={index}
                                        className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200"
                                    >
                                        <div className="flex items-center gap-3 flex-1 min-w-0">
                                            <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-cyan-500 rounded-full flex items-center justify-center flex-shrink-0">
                                                <CheckIcon className="w-4 h-4 text-white" />
                                            </div>
                                            <span className="text-sm font-mono text-gray-700 truncate">
                                                {item.address}
                                            </span>
                                        </div>
                                        <button
                                            onClick={() => handleRevokeGuest(item.address)}
                                            disabled={loading || !hostCapId}
                                            className="px-3 py-1 text-xs text-red-600 hover:bg-red-50 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            Revoke
                                        </button>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>

                {/* Room Info */}
                <div className="mt-6 bg-white rounded-2xl shadow-lg p-6">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">Room Information</h2>
                    <div className="grid md:grid-cols-2 gap-4 text-sm">
                        <div>
                            <span className="text-gray-500">Require Approval:</span>
                            <span className="ml-2 font-medium">
                                {roomData?.room.requireApproval ? 'Yes' : 'No'}
                            </span>
                        </div>
                        <div>
                            <span className="text-gray-500">Status:</span>
                            <span className="ml-2 font-medium capitalize">
                                {roomData?.room.status || 'N/A'}
                            </span>
                        </div>
                        <div>
                            <span className="text-gray-500">Participants (excluding hosts):</span>
                            <span className="ml-2 font-medium">{whitelist.length}</span>
                        </div>
                        <div>
                            <span className="text-gray-500">Hosts:</span>
                            <span className="ml-2 font-medium">{roomData?.hosts.length || 0}</span>
                        </div>
                        <div className="md:col-span-2">
                            <span className="text-gray-500">Created At:</span>
                            <span className="ml-2 font-medium">
                                {roomData?.room.createdAt
                                    ? new Date(roomData.room.createdAt).toLocaleString()
                                    : 'N/A'
                                }
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

// Wrap component in Suspense for Next.js 15 useParams requirement
export default function EditRoomPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 flex items-center justify-center">
                <div className="text-center">
                    <UpdateIcon className="w-12 h-12 animate-spin text-blue-500 mx-auto mb-4" />
                    <p className="text-gray-600">Loading...</p>
                </div>
            </div>
        }>
            <EditRoomPageContent />
        </Suspense>
    );
}

