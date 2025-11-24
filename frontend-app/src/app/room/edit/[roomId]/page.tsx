'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useSuiClient, useSignAndExecuteTransaction, useCurrentAccount } from '@mysten/dapp-kit';
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

// Package ID from environment variable
const PACKAGE_ID = process.env.NEXT_PUBLIC_PACKAGE_ID || '';
const CLOCK_OBJECT_ID = '0x6'; // Sui Clock object (shared)

interface WhitelistAddress {
    address: string;
    addedAt?: number;
}

function EditRoomPageContent() {
    const router = useRouter();
    const params = useParams();
    const { mutate: signAndExecuteTransaction } = useSignAndExecuteTransaction();
    const currentAccount = useCurrentAccount();
    const suiClient = useSuiClient();
    const { isWalletConnected: isWalletApprove } = useAuthContext();

    const roomId = params.roomId as string;

    // HostCap state - stores the HostCap object ID for managing the room
    const [hostCapId, setHostCapId] = useState<string>('');

    // Whitelist management
    const [whitelist, setWhitelist] = useState<WhitelistAddress[]>([]);
    const [newAddress, setNewAddress] = useState('');
    const [addressError, setAddressError] = useState('');

    // Room state
    const [inviteLink, setInviteLink] = useState('');
    const [roomData, setRoomData] = useState<any>(null);

    // UI state
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [copied, setCopied] = useState(false);

    // Redirect if wallet disconnected
    useEffect(() => {
        if (!currentAccount) {
            router.push('/');
        }
    }, [currentAccount, router]);

    // Load room data on mount
    useEffect(() => {
        if (roomId) {
            loadRoomData(roomId);
            // Try to find HostCap for this room
            findHostCap();
        }
    }, [roomId, currentAccount]);

    const findHostCap = async () => {
        if (!currentAccount?.address || !PACKAGE_ID) return;

        try {
            // List HostCap objects owned by the host
            const caps = await suiClient.getOwnedObjects({
                owner: currentAccount.address,
                filter: { StructType: `${PACKAGE_ID}::sealmeet::HostCap` },
                options: { showType: true },
            });

            if (!caps.data.length) {
                console.log('No HostCap found for current account');
                return;
            }

            // Find the cap linked to this room by reading its fields
            for (const o of caps.data) {
                const id = (o.data as any)?.objectId || (o as any)?.objectId;
                if (!id) continue;
                const full = await suiClient.getObject({ id, options: { showContent: true } });
                const fields = (full.data as any)?.content?.fields;
                const capRoomId = fields?.room_id;
                if (typeof capRoomId === 'string' && capRoomId.toLowerCase() === roomId.toLowerCase()) {
                    setHostCapId(id);
                    console.log('Found HostCap:', id);
                    return;
                }
            }
        } catch (err) {
            console.error('HostCap lookup failed:', err);
        }
    };

    const loadRoomData = async (id: string) => {
        try {
            setLoading(true);
            const object = await suiClient.getObject({
                id,
                options: { showContent: true }
            });

            if (object.data?.content && 'fields' in object.data.content) {
                const fields = object.data.content.fields as any;
                setRoomData(fields);

                // Load whitelist from seal_policy
                if (fields.seal_policy?.fields?.whitelist) {
                    const addresses = fields.seal_policy.fields.whitelist.map((addr: string) => ({
                        address: addr,
                        addedAt: Date.now()
                    }));
                    setWhitelist(addresses);
                }

                // Generate invite link
                const link = `${window.location.origin}/room/join?roomId=${id}`;
                setInviteLink(link);
            }
        } catch (err) {
            console.error('Failed to load room:', err);
            setError('Failed to load room data');
        } finally {
            setLoading(false);
        }
    };

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

    if (loading && !roomData) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 flex items-center justify-center p-4">
                <div className="text-center">
                    <UpdateIcon className="w-12 h-12 animate-spin text-blue-500 mx-auto mb-4" />
                    <p className="text-gray-600">Loading room data...</p>
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
                                {roomData?.title ? new TextDecoder().decode(new Uint8Array(roomData.title)) : 'Meeting Room'}
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
                                    onClick={() => router.push(`/calling?roomId=${roomId}`)}
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
                            Manage Access ({whitelist.length})
                        </h2>

                        {/* Add New Guest */}
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Approve New Guest
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
                                {roomData?.require_approval ? 'Yes' : 'No'}
                            </span>
                        </div>
                        <div>
                            <span className="text-gray-500">Participants:</span>
                            <span className="ml-2 font-medium">{whitelist.length}</span>
                        </div>
                        <div className="md:col-span-2">
                            <span className="text-gray-500">Policy Updated:</span>
                            <span className="ml-2 font-medium">
                                {roomData?.seal_policy?.fields?.updated_at
                                    ? new Date(Number(roomData.seal_policy.fields.updated_at)).toLocaleString()
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

