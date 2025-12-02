import { useState, useCallback } from 'react';
import { useCurrentAccount, useSuiClient, useSignPersonalMessage } from '@mysten/dapp-kit';
import { SessionKey } from '@mysten/seal';
import { validateSealAccessWithSessionKey } from '@/lib/seal';
import { useNetworkVariable } from '@/config/networkConfig';
import { Ed25519Keypair } from '@mysten/sui/keypairs/ed25519';

/**
 * Hook for managing Seal authentication
 * Creates SessionKey via signMessage and validates access using Seal SDK fetchKeys
 */
export function useSealAuth() {
  const currentAccount = useCurrentAccount();
  const suiClient = useSuiClient();
  const mvrName = useNetworkVariable('mvrName');
  const { mutateAsync: signPersonalMessage } = useSignPersonalMessage();

  const [isValidating, setIsValidating] = useState(false);
  const [hasAccess, setHasAccess] = useState<boolean | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [sessionKey, setSessionKey] = useState<SessionKey | null>(null);

  /**
   * Fetch seal_policy_id from room object using Sui query
   * @param roomId - The room object ID
   * @returns The seal_policy_id if found, or null if not found
   */
  const getSealPolicyIdFromRoom = useCallback(async (
    roomId: string
  ): Promise<string | null> => {
    try {
      const roomObject = await suiClient.getObject({
        id: roomId,
        options: { showContent: true, showType: true }
      });

      if (!roomObject.data) {
        console.error(`Room object ${roomId} does not exist`);
        return null;
      }

      if (roomObject.data.content && 'fields' in roomObject.data.content) {
        const fields = roomObject.data.content.fields as any;

        // Try to get seal_policy_id from room fields
        if (fields.seal_policy_id) {
          console.log(`Found seal_policy_id from room: ${fields.seal_policy_id}`);
          return fields.seal_policy_id;
        }

        // If seal_policy_id is not directly available, try to get it from embedded seal_policy
        if (fields.seal_policy) {
          if (typeof fields.seal_policy === 'object') {
            // If seal_policy is an embedded object, try to get its ID
            if (fields.seal_policy.fields?.id) {
              console.log(`Found seal_policy ID from embedded object: ${fields.seal_policy.fields.id}`);
              return fields.seal_policy.fields.id;
            } else if (fields.seal_policy.id) {
              console.log(`Found seal_policy ID from object: ${fields.seal_policy.id}`);
              return fields.seal_policy.id;
            }
          } else if (typeof fields.seal_policy === 'string') {
            console.log(`Found seal_policy as string reference: ${fields.seal_policy}`);
            return fields.seal_policy;
          }
        }

        console.warn('Could not find seal_policy_id in room fields. Available fields:', Object.keys(fields));
        return null;
      }

      console.warn('Room object does not have content fields');
      return null;
    } catch (err) {
      console.error('Error fetching room to get seal_policy_id:', err);
      return null;
    }
  }, [suiClient]);

  /**
   * Create a SessionKey by signing a message
   * Manually signs the personal message and sets the signature
   */
  const createSessionKey = useCallback(async (
    packageId: string,
    ttlMin: number = 10
  ): Promise<SessionKey | null> => {
    if (!currentAccount) {
      setError('Wallet not connected');
      return null;
    }

    try {
      // Create SessionKey instance - we'll manually sign the personal message
      // First create it with a temporary signer, then we'll override with the actual signature
      // Type assertion needed due to version mismatch between @mysten/sui and @mysten/seal
      const key = await SessionKey.create({
        address: currentAccount.address,
        packageId: packageId,
        ttlMin: ttlMin,
        suiClient: suiClient as any,
        mvrName
      });

      // Get the personal message from the SessionKey
      const personalMessage = key.getPersonalMessage();

      // // Sign the personal message using the wallet
      const result = await signPersonalMessage({
        message: personalMessage,
      });

      // Set the signature on the SessionKey
      await key.setPersonalMessageSignature(result.signature);

      // const ephemeralKeypair = new Ed25519Keypair();

      // const signature = await ephemeralKeypair.sign(personalMessage);
      // const messageSign = (new TextDecoder()).decode(signature);
      // await key.setPersonalMessageSignature(messageSign);
      //

      setSessionKey(key);
      return key;
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Failed to create session key';
      setError(errorMsg);
      console.error('Error creating SessionKey:', err);
      return null;
    }
  }, [currentAccount, suiClient, signPersonalMessage, mvrName]);

  /**
   * Validate access to a Seal policy
   * Creates SessionKey if needed, then validates access using fetchKeys
   * Note: sealPolicyId parameter is the roomId, we'll fetch the actual policy ID from the room
   */
  const validateAccess = useCallback(async (
    sealPolicyId: string, // This is actually the roomId
    packageId: string,
    network: 'testnet' | 'mainnet' = 'testnet',
    ttlMin: number = 10
  ): Promise<boolean> => {
    if (!currentAccount) {
      setError('Wallet not connected');
      setHasAccess(false);
      return false;
    }

    setIsValidating(true);
    setError(null);

    try {
      // Fetch the actual seal_policy_id from the room object
      // const actualPolicyId = await getSealPolicyIdFromRoom(sealPolicyId);


      // if (!actualPolicyId) {
      //   const errorMsg = `Could not find seal_policy_id in room ${sealPolicyId}`;
      //   setError(errorMsg);
      //   setHasAccess(false);
      //   setIsValidating(false);
      //   return false;
      // }

      const actualPolicyId = sealPolicyId;

      // Create or reuse SessionKey
      let key = sessionKey;
      if (!key) {
        key = await createSessionKey(packageId, ttlMin);
        if (!key) {
          console.error('Failed to create SessionKey');
          setHasAccess(false);
          setIsValidating(false);
          return false;
        }
      }
      else {
        console.error('SessionKey not exists');
      }

      // Validate access using Seal SDK with the actual policy ID
      const hasAccessResult = await validateSealAccessWithSessionKey(
        currentAccount.address,
        actualPolicyId, // Use the actual policy ID from the room
        packageId,
        suiClient,
        key,
        network
      );

      setHasAccess(hasAccessResult);
      setIsValidating(false);
      return hasAccessResult;
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Failed to validate Seal access';
      setError(errorMsg);
      console.error('Error validating Seal access:', err);
      setHasAccess(false);
      setIsValidating(false);
      return false;
    }
  }, [currentAccount, suiClient, sessionKey, createSessionKey, getSealPolicyIdFromRoom]);

  /**
   * Clear validation state
   */
  const clearValidation = useCallback(() => {
    setHasAccess(null);
    setError(null);
    setIsValidating(false);
  }, []);

  /**
   * Clear session key (forces new SessionKey creation on next validation)
   */
  const clearSessionKey = useCallback(() => {
    setSessionKey(null);
  }, []);

  return {
    validateAccess,
    isValidating,
    hasAccess,
    error,
    sessionKey,
    clearValidation,
    clearSessionKey,
  };
}

