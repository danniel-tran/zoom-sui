/**
 * Seal client utility for access control validation
 * Uses Seal SDK to validate that users have access to encrypted room data
 * Based on: https://seal-docs.wal.app/UsingSeal/#on-chain-decryption
 */

import { SealClient, SessionKey } from '@mysten/seal';
import { SuiClient } from '@mysten/sui/client';
import { SUI_CLOCK_OBJECT_ID, fromHex } from '@mysten/sui/utils';
import { Transaction } from '@mysten/sui/transactions';
import { bcs } from '@mysten/sui/bcs';


// Seal Package IDs (from Seal documentation)
const SEAL_PACKAGE_ID_TESTNET = '0x927a54e9ae803f82ebf480136a9bcff45101ccbe28b13f433c89f5181069d682';
const SEAL_PACKAGE_ID_MAINNET = '0xa212c4c6c7183b911d0be8768f4cb1df7a383025b5d0ba0c014009f0f30f5f8d';

// Default testnet key servers (from Seal documentation examples)
// In production, these should be configured via environment variables
const DEFAULT_TESTNET_KEY_SERVERS = [
  '0x73d05d62c18d9374e3ea529e8e0ed6161da1a141a94d3f76ae3fe4e99356db75',
  '0xf5d14a81a982144ae441cd7d64b09027f116a468bd36e7eca494f750591623c8',
];

interface SealConfig {
  packageId: string;
  keyServers?: string[];
  network?: 'testnet' | 'mainnet';
}

/**
 * Get Seal package ID for the network
 */
export function getSealPackageId(network: 'testnet' | 'mainnet' = 'testnet'): string {
  return network === 'testnet' ? SEAL_PACKAGE_ID_TESTNET : SEAL_PACKAGE_ID_MAINNET;
}

/**
 * Get default key servers for the network
 */
export function getDefaultKeyServers(network: 'testnet' | 'mainnet' = 'testnet'): string[] {
  // In production, load from environment variables
  if (network === 'testnet') {
    return DEFAULT_TESTNET_KEY_SERVERS;
  }
  // For mainnet, you should configure your own key servers
  return [];
}

/**
 * Create a Seal client instance
 */
export function createSealClient(
  config: SealConfig,
  suiClient: SuiClient
): SealClient {
  const { keyServers, network = 'testnet' } = config;

  const servers = keyServers || getDefaultKeyServers(network);

  if (servers.length === 0) {
    throw new Error('No key servers configured');
  }

  return new SealClient({
    suiClient: suiClient as any,
    serverConfigs: servers.map((id) => ({
      objectId: id,
      weight: 1,
    })),
    verifyKeyServers: false, // Set to true in production for security
  });
}

/**
 * Validate Seal access using Seal SDK with SessionKey and fetchKeys
 * This method uses fetchKeys which triggers seal_approve evaluation via dry-run
 * 
 * @param userAddress - The user's wallet address
 * @param sealPolicyId - The Seal policy ID (object ID of SealApproveWhitelist)
 * @param packageId - The package ID containing the seal_approve function
 * @param suiClient - Sui client instance
 * @param sessionKey - SessionKey instance (created via signMessage)
 * @param network - Network (testnet or mainnet)
 * @returns Promise<boolean> - true if user has access, false otherwise
 */
export async function validateSealAccessWithSessionKey(
  userAddress: string,
  roomId: string,
  packageId: string,
  suiClient: SuiClient,
  sessionKey: SessionKey,
  network: 'testnet' | 'mainnet' = 'testnet'
): Promise<boolean> {
  try {
    // Create Seal client
    const sealClient = createSealClient(
      {
        packageId: getSealPackageId(network),
        network,
      },
      suiClient
    );

    // Note: sealPolicyId parameter should be the actual SealApproveWhitelist object ID
    // The room fetching is now handled in useSealAuth.ts before calling this function
    const tx = new Transaction();
    tx.setSender(userAddress);
    tx.setGasBudget(100_000_000);

    const clock = tx.object(SUI_CLOCK_OBJECT_ID);
    const room = tx.object(roomId); // This should be the room object ID (not policy ID)

    // The Move function expects BCS-encoded address in vector<u8>
    // The seal_approve function does: bcs::new(id).peel_address()
    // We need to pass BCS-encoded address bytes
    // Try using the BCS serializer - SerializedBcs should have the bytes
    let addressBytesArray: number[];
    try {
      const addressBytesSerialized = bcs.Address.serialize(userAddress);
      // SerializedBcs is a Uint8Array-like object, try to extract bytes
      const serialized = addressBytesSerialized as any;

      // Check various ways to get bytes
      let addressBytes: Uint8Array;
      if (serialized instanceof Uint8Array) {
        addressBytes = serialized;
      } else if (Array.isArray(serialized)) {
        addressBytes = new Uint8Array(serialized);
      } else if (serialized.bytes) {
        addressBytes = serialized.bytes instanceof Uint8Array ? serialized.bytes : new Uint8Array(serialized.bytes);
      } else {
        // Fallback: use raw address bytes (Move will BCS-decode)
        addressBytes = fromHex(userAddress);
      }

      addressBytesArray = Array.from(addressBytes) as number[];
    } catch (bcsError) {
      console.error('BCS encoding error, using raw bytes:', bcsError);
      // Fallback: use raw address bytes (Move's bcs::new will handle it)
      const addressBytes = fromHex(userAddress);
      addressBytesArray = Array.from(addressBytes) as number[];
    }

    tx.moveCall({
      target: `${packageId}::sealmeet::seal_approve_for_room`,
      arguments: [
        tx.pure.vector('u8', addressBytesArray), // BCS-encoded address bytes
        room,
        clock,
      ],
    });

    // Build the transaction bytes
    const txBytes = await tx.build({ client: suiClient, onlyTransactionKind: true });

    // Use fetchKeys to trigger seal_approve evaluation
    try {
      await sealClient.fetchKeys({
        ids: [userAddress],
        txBytes: txBytes,
        sessionKey: sessionKey,
        threshold: 2,
      });

      return true;
    } catch (error) {
      console.error('Seal access validation failed (fetchKeys):', error);
      return false;
    }
  } catch (error) {
    console.error('Error validating Seal access with SessionKey:', error);
    return false;
  }
}
