import { SuiClient, getFullnodeUrl } from '@mysten/sui/client';
import { Ed25519Keypair } from '@mysten/sui/keypairs/ed25519';
import { Transaction } from '@mysten/sui/transactions';
import { deserializeEncryptedKey } from './encryption';
import { config } from '../config';

/**
 * Get Sui client instance
 */
export function getSuiClient(): SuiClient {
  const network = config.suiNetwork as 'mainnet' | 'testnet' | 'devnet' | 'localnet';
  return new SuiClient({ url: getFullnodeUrl(network) });
}

/**
 * Decrypt and reconstruct Ed25519 keypair from session
 * @param encryptedPrivateKey - Encrypted private key from Session.encryptedPrivateKey
 * @returns Ed25519Keypair instance
 */
export function getEphemeralKeypair(encryptedPrivateKey: string): Ed25519Keypair {
  const { privateKey } = deserializeEncryptedKey(encryptedPrivateKey);
  return Ed25519Keypair.fromSecretKey(privateKey);
}

/**
 * Check if user is a participant in a room by querying blockchain
 * @param roomId - Room object ID (0x...)
 * @param walletAddress - User's wallet address
 * @returns Promise<boolean> - true if user is in room.participants
 */
export async function checkUserInRoomParticipants(
  roomId: string,
  walletAddress: string
): Promise<boolean> {
  try {
    const client = getSuiClient();

    // Get room object from blockchain
    const roomObject = await client.getObject({
      id: roomId,
      options: {
        showContent: true,
        showType: true,
      },
    });

    if (!roomObject.data || !roomObject.data.content) {
      throw new Error('Room not found on blockchain');
    }

    // Parse room content
    if (roomObject.data.content.dataType !== 'moveObject') {
      throw new Error('Invalid room object type');
    }

    const roomFields = roomObject.data.content.fields as any;

    // Check if walletAddress is in participants array
    // Room structure: { participants: string[], hosts: string[], ... }
    const participants = roomFields.participants || [];

    return participants.includes(walletAddress);
  } catch (error) {
    console.error('Error checking room participants on blockchain:', error);
    throw error;
  }
}

/**
 * Check if user is a host in a room by querying blockchain
 * @param roomId - Room object ID (0x...)
 * @param walletAddress - User's wallet address
 * @returns Promise<boolean> - true if user is in room.hosts
 */
export async function checkUserIsHost(
  roomId: string,
  walletAddress: string
): Promise<boolean> {
  try {
    const client = getSuiClient();

    // Get room object from blockchain
    const roomObject = await client.getObject({
      id: roomId,
      options: {
        showContent: true,
        showType: true,
      },
    });

    if (!roomObject.data || !roomObject.data.content) {
      throw new Error('Room not found on blockchain');
    }

    // Parse room content
    if (roomObject.data.content.dataType !== 'moveObject') {
      throw new Error('Invalid room object type');
    }

    const roomFields = roomObject.data.content.fields as any;

    // Check if walletAddress is in hosts array
    const hosts = roomFields.hosts || [];

    return hosts.includes(walletAddress);
  } catch (error) {
    console.error('Error checking room hosts on blockchain:', error);
    throw error;
  }
}

/**
 * Get room details from blockchain
 * @param roomId - Room object ID (0x...)
 * @returns Promise<RoomDetails> - Room details including participants, hosts, status, etc.
 */
export async function getRoomFromBlockchain(roomId: string): Promise<{
  participants: string[];
  hosts: string[];
  status: number;
  maxParticipants: number;
  requireApproval: boolean;
}> {
  try {
    const client = getSuiClient();

    const roomObject = await client.getObject({
      id: roomId,
      options: {
        showContent: true,
        showType: true,
      },
    });

    if (!roomObject.data || !roomObject.data.content) {
      throw new Error('Room not found on blockchain');
    }

    if (roomObject.data.content.dataType !== 'moveObject') {
      throw new Error('Invalid room object type');
    }

    const roomFields = roomObject.data.content.fields as any;

    return {
      participants: roomFields.participants || [],
      hosts: roomFields.hosts || [],
      status: roomFields.status || 0,
      maxParticipants: roomFields.max_participants || 0,
      requireApproval: roomFields.require_approval || false,
    };
  } catch (error) {
    console.error('Error getting room from blockchain:', error);
    throw error;
  }
}

/**
 * Add a participant to a room on-chain
 * @param roomId - Room object ID
 * @param guestAddress - Guest wallet address to add
 * @param hostKeypair - Host's keypair for signing the transaction
 * @param packageId - Sui package ID containing the room module
 * @returns Promise<string> - Transaction digest
 */
export async function addParticipantToRoom(
  roomId: string,
  guestAddress: string,
  hostKeypair: Ed25519Keypair,
  packageId: string
): Promise<string> {
  try {
    const client = getSuiClient();
    const hostAddress = hostKeypair.getPublicKey().toSuiAddress();

    console.log('[Blockchain] Adding participant to room:', {
      roomId: roomId.slice(0, 10) + '...',
      guest: guestAddress.slice(0, 10) + '...',
      host: hostAddress.slice(0, 10) + '...',
    });

    // Build the transaction
    const tx = new Transaction();
    tx.moveCall({
      target: `${packageId}::meeting_room::add_participant`,
      arguments: [
        tx.object(roomId),
        tx.pure.address(guestAddress),
      ],
    });

    // Set sender
    tx.setSender(hostAddress);

    // Execute the transaction
    const result = await client.signAndExecuteTransaction({
      transaction: tx,
      signer: hostKeypair,
      options: {
        showEffects: true,
        showObjectChanges: true,
      },
    });

    if (result.effects?.status?.status !== 'success') {
      throw new Error('Transaction failed: ' + result.effects?.status?.error);
    }

    const txDigest = result.digest;
    console.log('[Blockchain] Participant added successfully, tx:', txDigest);

    return txDigest;
  } catch (error) {
    console.error('[Blockchain] Error adding participant to room:', error);
    throw error;
  }
}
