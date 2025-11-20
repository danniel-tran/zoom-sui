'use client';

import { useState, Suspense } from 'react';
import { useRouter } from 'next/navigation';
import { useSuiClient, useSignAndExecuteTransaction, useCurrentAccount } from '@mysten/dapp-kit';
import { Transaction } from '@mysten/sui/transactions';
import {
    CheckIcon,
    ExclamationTriangleIcon,
    UpdateIcon,
} from '@radix-ui/react-icons';
import { apiClient } from '@/lib/api';
import { useAuth as useAuthContext } from '@/context/AuthContext';
import { RoomForm, type RoomFormData, type WhitelistAddress } from '@/components/rooms/form';

// Package ID from environment variable
const PACKAGE_ID = process.env.NEXT_PUBLIC_PACKAGE_ID || '';
const CLOCK_OBJECT_ID = '0x6'; // Sui Clock object (shared)
const REGISTRY_OBJECT_ID = process.env.NEXT_PUBLIC_REGISTRY_ID || ''; // RoomRegistry shared object ID

if (!PACKAGE_ID || PACKAGE_ID === 'YOUR_PACKAGE_ID') {
    console.error('NEXT_PUBLIC_PACKAGE_ID is not set. Please set it in .env.local');
}

function RoomPageContent() {
    const router = useRouter();
    const { mutate: signAndExecuteTransaction } = useSignAndExecuteTransaction();
    const currentAccount = useCurrentAccount();
    const suiClient = useSuiClient();
    const { isWalletConnected: isWalletApprove } = useAuthContext();

    // UI state
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleCreateRoom = async (formData: RoomFormData, whitelist: WhitelistAddress[]) => {
        if (!currentAccount || !isWalletApprove) {
            setError('Please connect your wallet first');
            return;
        }

        if (whitelist.length === 0) {
            setError('Add at least one participant to the whitelist');
            return;
        }

        // Validate registry ID
        if (!REGISTRY_OBJECT_ID) {
            setError('Registry object ID is not configured. Please set NEXT_PUBLIC_REGISTRY_ID in .env.local');
            setLoading(false);
            return;
        }

        // Validate max participants
        const maxParticipants = parseInt(formData.maxParticipants);
        if (isNaN(maxParticipants) || maxParticipants < 1 || maxParticipants > 20) {
            setError('Max participants must be between 1 and 20');
            setLoading(false);
            return;
        }

        setLoading(true);
        setError('');

        // Validate package ID
        if (!PACKAGE_ID || PACKAGE_ID.includes('YOUR_PACKAGE_ID')) {
            setError('Package ID is not configured. Please set NEXT_PUBLIC_PACKAGE_ID in .env.local and restart the dev server.');
            setLoading(false);
            return;
        }

        // Validate package ID format
        if (!PACKAGE_ID.startsWith('0x') || PACKAGE_ID.length < 10) {
            setError(`Invalid package ID format: ${PACKAGE_ID}. Please check your .env.local file.`);
            setLoading(false);
            return;
        }

        try {
            console.log('Creating room with package ID:', PACKAGE_ID);

            // Check user's SUI balance first
            try {
                const balance = await suiClient.getBalance({
                    owner: currentAccount.address,
                });
                const balanceInSui = Number(balance.totalBalance) / 1_000_000_000;
                console.log('User balance:', balanceInSui, 'SUI');

                if (balanceInSui < 0.01) {
                    setError('Insufficient SUI balance. You need at least 0.01 SUI to create a room. Please fund your wallet.');
                    setLoading(false);
                    return;
                }
            } catch (balanceError) {
                console.warn('Could not check balance:', balanceError);
                // Continue anyway - the transaction will fail with a clearer error if no gas
            }

            // Step 1: Create room on-chain via Sui transaction
            const txb = new Transaction();
            const titleBytes = new TextEncoder().encode(formData.title);
            const descriptionBytes = formData.description
                ? new TextEncoder().encode(formData.description)
                : null;
            const participants = whitelist.map(item => item.address);
            const maxParticipants = parseInt(formData.maxParticipants);

            // Set gas budget (100M MIST = 0.1 SUI) - wallet will auto-select gas coins
            txb.setGasBudget(100_000_000);

            // New contract signature: create_room(registry, title, description, max_participants, require_approval, initial_participants, clock)
            // For Option<vector<u8>>, pass empty vector for None, or the actual vector for Some
            const descriptionArg = descriptionBytes
                ? Array.from(descriptionBytes)
                : []; // Empty array for None option

            txb.moveCall({
                target: `${PACKAGE_ID}::sealmeet::create_room`,
                arguments: [
                    txb.object(REGISTRY_OBJECT_ID), // Registry shared object
                    txb.pure.vector('u8', Array.from(titleBytes)), // title
                    txb.pure.option('vector<u8>', descriptionArg), // description (empty vector = None, non-empty = Some)
                    txb.pure.u64(maxParticipants), // max_participants
                    txb.pure.bool(formData.requireApproval), // require_approval
                    txb.pure.vector('address', participants), // initial_participants
                    txb.object(CLOCK_OBJECT_ID), // Clock object
                ],
            });

            console.log('Execute transaction and get the created object ID');
            //0x0916bc412e3eff2e50db6abe02f56ab9fd39ef02d89a6cf501624caa35a311fc
            console.log(REGISTRY_OBJECT_ID);
            // Execute transaction and get the created object ID
            signAndExecuteTransaction(
                { transaction: txb },
                {
                    onSuccess: async (result) => {
                        try {
                            // result is a transaction digest string
                            const txDigest = typeof result === 'string' ? result : (result as any)?.digest || result;

                            if (!txDigest) {
                                throw new Error('Transaction digest not found in result');
                            }

                            console.log('Transaction digest:', txDigest);

                            // Wait for transaction to be confirmed and indexed (with retry)
                            console.log('Waiting for transaction to be confirmed...');
                            let txDetails: any = null;
                            let retries = 10;
                            let delay = 2000; // Start with 2 seconds

                            while (retries > 0 && !txDetails) {
                                try {
                                    await new Promise(resolve => setTimeout(resolve, delay));

                                    txDetails = await suiClient.getTransactionBlock({
                                        digest: txDigest,
                                        options: {
                                            showEffects: true,
                                            showObjectChanges: true,
                                        },
                                    });

                                    console.log('Transaction found!');
                                    break;
                                } catch (fetchError: any) {
                                    if (fetchError?.message?.includes('Could not find') ||
                                        fetchError?.message?.includes('not found')) {
                                        console.log(`Transaction not yet indexed, waiting ${delay}ms... (${retries} retries left)`);
                                        retries--;
                                        delay = Math.min(delay + 500, 5000); // Gradually increase delay
                                    } else {
                                        throw fetchError;
                                    }
                                }
                            }

                            if (!txDetails) {
                                throw new Error(`Transaction not found after retries. Digest: ${txDigest}`);
                            }

                            console.log('Transaction confirmed, extracting object ID...');

                            // Extract the created room object ID and HostCap from object changes
                            let roomObjectId: string | null = null;
                            let hostCapObjectId: string | null = null;

                            // Try objectChanges first (most reliable)
                            const objectChanges = txDetails.objectChanges || [];

                            // Find MeetingRoom object (shared object)
                            const createdRoom = objectChanges.find(
                                (change: any) =>
                                    change.type === 'created' &&
                                    (change.objectType?.includes('MeetingRoom') ||
                                        change.objectType?.includes('sealmeet::MeetingRoom') ||
                                        change.objectType?.includes('sealmeet::sealmeet::MeetingRoom'))
                            );

                            // Find HostCap object (owned by sender)
                            const createdHostCap = objectChanges.find(
                                (change: any) =>
                                    change.type === 'created' &&
                                    (change.objectType?.includes('HostCap') ||
                                        change.objectType?.includes('sealmeet::HostCap') ||
                                        change.objectType?.includes('sealmeet::sealmeet::HostCap'))
                            );

                            if (createdRoom && createdRoom.type === 'created' && createdRoom.objectId) {
                                roomObjectId = createdRoom.objectId;
                                console.log('Found room object ID from objectChanges:', roomObjectId);
                            }

                            if (createdHostCap && createdHostCap.type === 'created' && createdHostCap.objectId) {
                                hostCapObjectId = createdHostCap.objectId;
                                if (hostCapObjectId) {
                                    console.log('Found HostCap object ID:', hostCapObjectId);
                                }
                            }

                            // If not found, try effects
                            if (!roomObjectId && txDetails.effects) {
                                const effects = txDetails.effects as any;
                                if (effects?.created && Array.isArray(effects.created)) {
                                    // Look for shared objects (MeetingRoom is shared)
                                    const sharedObject = effects.created.find((obj: any) =>
                                        obj.owner?.Shared !== undefined
                                    );
                                    if (sharedObject?.reference?.objectId) {
                                        roomObjectId = sharedObject.reference.objectId;
                                        console.log('Found room object ID from effects:', roomObjectId);
                                    }
                                }
                            }

                            if (!roomObjectId) {
                                // Transaction succeeded but we can't find the object ID
                                // Show transaction digest so user can check on explorer
                                const explorerUrl = `https://suiexplorer.com/txblock/${txDigest}?network=testnet`;
                                throw new Error(
                                    `Room created on-chain but object ID not found. ` +
                                    `Transaction: ${txDigest}. ` +
                                    `Check explorer: ${explorerUrl}. ` +
                                    `Please refresh and try again in a few seconds.`
                                );
                            }

                            console.log('Room object ID extracted:', roomObjectId);

                            // Step 2: Create room record in backend with on-chain object ID and HostCap
                            try {
                                const response = await apiClient.createRoom({
                                    title: formData.title,
                                    description: formData.description || undefined,
                                    maxParticipants: parseInt(formData.maxParticipants),
                                    initialParticipants: whitelist.map(item => item.address),
                                    requireApproval: formData.requireApproval,
                                    walletAddress: currentAccount.address,
                                    onchainObjectId: roomObjectId,
                                    hostCapId: hostCapObjectId || undefined,
                                });
                                console.log('Room created in backend:', response);
                            } catch (backendError) {
                                console.warn('Backend room creation failed (room is still created on-chain):', backendError);
                                // Continue anyway - room is already created on-chain
                                // The indexer will pick it up and sync it to the backend
                            }

                            // Redirect to edit page after successful creation
                            setSuccessMessage('Meeting room created successfully on-chain! Redirecting...');

                            // Redirect to edit page after a short delay
                            setTimeout(() => {
                                router.push(`/room/edit/${roomObjectId}`);
                            }, 1500);
                        } catch (err) {
                            console.error('Failed to create room in backend:', err);
                            setError(err instanceof Error ? err.message : 'Failed to create room record. On-chain room was created but backend sync failed.');
                        } finally {
                            setLoading(false);
                        }
                    },
                    onError: (err: any) => {
                        console.error('Failed to create room on-chain:', err);
                        let errorMessage = 'Failed to create room on-chain. ';

                        // Provide helpful error messages
                        if (err?.message?.includes('gas') || err?.message?.includes('No valid gas coins')) {
                            errorMessage += 'Your wallet does not have enough SUI tokens for gas fees. Please add SUI to your wallet and try again.';
                        } else if (err?.message) {
                            errorMessage += err.message;
                        } else {
                            errorMessage += 'Please try again.';
                        }

                        setError(errorMessage);
                        setLoading(false);
                    }
                }
            );
        } catch (err) {
            console.error('Failed to create room:', err);
            setError(err instanceof Error ? err.message : 'Failed to create room. Please try again.');
            setLoading(false);
        }
    };

    // Create Meeting View
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 py-8 px-4">
                <div className="max-w-4xl mx-auto">
                    {/* Header */}
                    <div className="mb-8">
                        <div className="flex justify-between items-start mb-2">
                            <div>
                                <h1 className="text-4xl font-bold text-gray-900 mb-2">
                                    Create Secure Meeting
                                </h1>
                                <p className="text-gray-600">
                                    Set up your meeting with blockchain-secured access control
                                </p>
                            </div>
                            {currentAccount && (
                                <button
                                    onClick={() => router.push('/rooms')}
                                    className="px-4 py-2 text-sm text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg font-medium transition-all"
                                >
                                    View My Rooms
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Error/Success Messages */}
                    {error && (
                        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3">
                            <ExclamationTriangleIcon className="w-5 h-5 text-red-500 mt-0.5" />
                            <p className="text-sm text-red-600">{error}</p>
                        </div>
                    )}

                    {successMessage && (
                        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl">
                            <div className="flex items-start gap-3">
                                <CheckIcon className="w-5 h-5 text-green-500 mt-0.5" />
                                <p className="text-sm text-green-600 flex-1">{successMessage}</p>
                            </div>
                        </div>
                    )}

                    <RoomForm
                        onSubmit={handleCreateRoom}
                        loading={loading}
                        isWalletConnected={isWalletApprove}
                    />
                </div>
            </div>
        );
}

// Wrap component in Suspense for Next.js 15 useSearchParams requirement
export default function RoomPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 flex items-center justify-center">
                <div className="text-center">
                    <UpdateIcon className="w-12 h-12 animate-spin text-blue-500 mx-auto mb-4" />
                    <p className="text-gray-600">Loading...</p>
                </div>
            </div>
        }>
            <RoomPageContent />
        </Suspense>
    );
}
