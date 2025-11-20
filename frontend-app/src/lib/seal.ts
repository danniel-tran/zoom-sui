/**
 * Seal client utility for access control validation
 * Uses Seal SDK to validate that users have access to encrypted room data
 * Based on: https://seal-docs.wal.app/UsingSeal/#on-chain-decryption
 */

import { SealClient, SessionKey } from '@mysten/seal';
import { SuiClient } from '@mysten/sui/client';
import { SUI_CLOCK_OBJECT_ID, fromHEX } from '@mysten/sui/utils';
import { Transaction } from '@mysten/sui/transactions';
import { fromHex } from '@mysten/sui/utils';
import { fromHEX as fromHexBcs } from '@mysten/bcs';

// export type MoveCallConstructor = (tx: Transaction, id: string) => void;
// function constructMoveCall(packageId: string, allowlistId: string): MoveCallConstructor {
//   return (tx: Transaction, id: string) => {
//     tx.moveCall({
//       target: `${packageId}::allowlist::seal_approve`,
//       arguments: [tx.pure.vector('u8', fromHex(id)), tx.object(allowlistId)],
//     });
//   };
// }


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
    suiClient: suiClient,
    serverConfigs: servers.map((id) => ({
      objectId: id,
      weight: 1,
    })),
    verifyKeyServers: false, // Set to true in production for security
  });
}

/**
 * Validate that a user has access to a room's Seal policy using dry-run transaction
 * This is more efficient as it doesn't require encryption/decryption
 * 
 * @param userAddress - The user's wallet address
 * @param sealPolicyId - The Seal policy ID (object ID of SealApproveWhitelist)
 * @param packageId - The package ID containing the seal_approve function (e.g., your app's package ID)
 * @param suiClient - Sui client instance
 * @param network - Network (testnet or mainnet)
 * @returns Promise<boolean> - true if user has access, false otherwise
 */
export async function validateSealAccessDryRun(
  userAddress: string,
  sealPolicyId: string,
  packageId: string,
  suiClient: SuiClient,
  network: 'testnet' | 'mainnet' = 'testnet'
): Promise<boolean> {
  try {
    // Create a transaction that calls seal_approve
    const tx = new Transaction();

    // Set the sender address (required for building the transaction)
    tx.setSender(userAddress);

    // Get the Clock object (required by seal_approve function)
    const clock = tx.object('0x6'); // Sui Clock object ID

    // Get the SealApproveWhitelist policy object
    const policy = tx.object(sealPolicyId);

    // Call seal_approve function
    // Function signature: seal_approve(id: vector<u8>, policy: &SealApproveWhitelist, _clock: &Clock): bool
    // The function is in: {packageId}::seal_approve_whitelist::seal_approve
    // tx.moveCall({
    //   target: `${packageId}::seal_approve_whitelist::seal_approve`,
    //   arguments: [
    //     tx.pure.vector('u8', fromHexBcs(userAddress)),
    //     policy,
    //     clock,
    //   ],
    // });
    tx.moveCall({
      target: `${packageId}::sealmeet::seal_approve_for_room`,
      arguments: [
        tx.pure.vector('u8', fromHex(userAddress)),
        policy,
        clock,
      ],
    });

    // Build the transaction
    const txBytes = await tx.build({ client: suiClient });

    // Dry-run the transaction to check if seal_approve returns true
    // If seal_approve returns false, it will abort the transaction
    const dryRunResult = await suiClient.dryRunTransactionBlock({
      transactionBlock: txBytes,
    });

    // Check if the transaction succeeded
    // If seal_approve returns true, the transaction will succeed
    // If seal_approve returns false or aborts, the transaction will fail
    if (dryRunResult.effects.status.status === 'success') {
      // Transaction succeeded, meaning seal_approve returned true
      return true;
    } else {
      // Transaction failed, meaning seal_approve returned false or aborted
      console.log('Seal access validation failed:', dryRunResult.effects.status);
      return false;
    }
  } catch (error) {
    console.error('Error validating Seal access (dry-run):', error);
    // If dry-run fails, assume no access
    return false;
  }
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
// export async function validateSealAccessWithSessionKey(
//   userAddress: string,
//   sealPolicyId: string,
//   packageId: string,
//   suiClient: SuiClient,
//   sessionKey: SessionKey,
//   network: 'testnet' | 'mainnet' = 'testnet'
// ): Promise<boolean> {
//   try {
//     // Create Seal client
//     const sealClient = createSealClient(
//       {
//         packageId: getSealPackageId(network),
//         network,
//       },
//       suiClient
//     );

//     // Fetch the room to get the seal_policy_id (the actual SealApproveWhitelist object ID)
//     // sealPolicyId parameter is the roomId, but we need the policy object ID
//     // Note: The policy is embedded in the room, so we need to extract its ID from the room
//     let actualPolicyId = sealPolicyId;

//     const tx = new Transaction();

//     // Set the sender address (required for building the transaction)
//     tx.setSender(userAddress);

//     // Set gas budget (required for dry-run transactions)
//     tx.setGasBudget(100_000_000);

//     const clock = tx.object('0x6'); // Sui Clock object
//     const policy = tx.object(actualPolicyId); // SealApproveWhitelist policy object

//     // Convert address to bytes for BCS encoding
//     // The Move function uses bcs::new(id) and peel_address(), which expects BCS-encoded address bytes
//     // Sui addresses are 32 bytes. We need to convert the hex address string to bytes
//     // Remove '0x' prefix if present
//     const addressHex = userAddress.startsWith('0x') ? userAddress.slice(2) : userAddress;
//     // Pad to 64 hex characters (32 bytes) and take first 64 chars
//     const paddedHex = addressHex.padStart(64, '0').slice(0, 64);
//     // Call seal_approve function
//     tx.moveCall({
//       target: `${packageId}::seal_approve_whitelist::seal_approve`,
//       arguments: [
//         tx.pure.vector('u8', fromHex(paddedHex)), // id parameter (BCS-encoded address bytes)
//         policy, // policy parameter (shared object reference)
//         tx.object(SUI_CLOCK_OBJECT_ID), // clock parameter
//       ],
//     });

//     // Build the transaction bytes
//     const txBytes = await tx.build({ client: suiClient });

//     // Use fetchKeys to trigger seal_approve evaluation
//     // This will perform a dry-run transaction on key servers
//     // The key servers will evaluate seal_approve to determine if access should be granted
//     try {
//       await sealClient.fetchKeys({
//         ids: [userAddress], // The identity to check
//         txBytes: txBytes, // Transaction with seal_approve call
//         sessionKey: sessionKey,
//         threshold: 2, // Threshold for key servers (adjust based on your setup)
//       });

//       // If fetchKeys succeeds without throwing, the user has access (seal_approve returned true)
//       // fetchKeys will throw an error if seal_approve returns false or aborts
//       return true;
//     } catch (error) {
//       // If fetchKeys fails, seal_approve likely returned false or aborted
//       console.error('Seal access validation failed (fetchKeys):', error);
//       return false;
//     }
//   } catch (error) {
//     console.error('Error validating Seal access with SessionKey:', error);
//     return false;
//   }
// }

export async function validateSealAccessWithSessionKey(
  userAddress: string,
  sealPolicyId: string,
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
    const policy = tx.object(sealPolicyId); // This should be the actual policy object ID

    // Properly encode address for BCS
    // The Move function uses bcs::new(id) and peel_address()
    // We need to BCS-encode the address as a Sui address type
    // Use the address directly - Sui SDK will handle BCS encoding
    // const addressBytes = fromHEX(userAddress);
    // Call seal_approve function
    // tx.moveCall({
    //   target: `${packageId}::seal_approve_whitelist::seal_approve`,
    //   arguments: [
    //     tx.pure.vector('u8', Array.from(addressBytes)), // Convert Uint8Array to array
    //     policy,
    //     clock,
    //   ],
    // });


    tx.moveCall({
      target: `${packageId}::sealmeet::seal_approve_for_room`,
      arguments: [
        tx.pure.vector('u8', fromHex(userAddress)), // Convert Uint8Array to array
        policy,
        clock,
      ],
    });

    // Build the transaction bytes
    const txBytes = await tx.build({ client: suiClient });

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

