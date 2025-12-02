import { useEffect, useState, useCallback } from 'react';
import { useSuiClient, useSignAndExecuteTransaction } from '@mysten/dapp-kit';
import { Transaction } from '@mysten/sui/transactions';
import { SUI_CLOCK_OBJECT_ID } from '@mysten/sui/utils';

const PACKAGE_ID = process.env.NEXT_PUBLIC_PACKAGE_ID || '';
const REGISTRY_OBJECT_ID = process.env.NEXT_PUBLIC_REGISTRY_ID || '';
const CLOCK_OBJECT_ID = SUI_CLOCK_OBJECT_ID;

export interface UseHostCapabilityProps {
  roomId: string;
  role: 'host' | 'guest';
  walletAddress: string | undefined;
}

export interface UseHostCapabilityResult {
  hostCapId: string | null;
  chainBusy: boolean;
  chainStatus: string | null;
  startRoomOnChain: () => Promise<void>;
}

export function useHostCapability({
  roomId,
  role,
  walletAddress,
}: UseHostCapabilityProps): UseHostCapabilityResult {
  const client = useSuiClient();
  const { mutate: signAndExecuteTransaction } = useSignAndExecuteTransaction();

  const [hostCapId, setHostCapId] = useState<string | null>(null);
  const [chainBusy, setChainBusy] = useState(false);
  const [chainStatus, setChainStatus] = useState<string | null>(null);

  // Locate HostCap owned by current account for this room
  useEffect(() => {
    const fetchHostCap = async () => {
      try {
        setChainStatus(null);
        if (role !== 'host') return;
        if (!walletAddress) {
          setChainStatus('Connect your wallet to manage meeting on-chain.');
          return;
        }
        if (!PACKAGE_ID || !REGISTRY_OBJECT_ID) {
          setChainStatus('Missing PACKAGE_ID or REGISTRY_OBJECT_ID. Configure env vars.');
          return;
        }

        const caps = await client.getOwnedObjects({
          owner: walletAddress,
          filter: { StructType: `${PACKAGE_ID}::sealmeet::HostCap` },
          options: { showType: true },
        });

        if (!caps.data.length) {
          setChainStatus('No HostCap found. Create/join room as host first.');
          return;
        }

        for (const o of caps.data) {
          const id = (o.data as any)?.objectId || (o as any)?.objectId;
          if (!id) continue;
          const full = await client.getObject({ id, options: { showContent: true } });
          const fields = (full.data as any)?.content?.fields;
          const capRoomId = fields?.room_id;
          if (typeof capRoomId === 'string' && capRoomId.toLowerCase() === roomId.toLowerCase()) {
            setHostCapId(id);
            setChainStatus(null);
            return;
          }
        }
        setChainStatus('HostCap not found for this room.');
      } catch (err) {
        console.error('Error fetching HostCap:', err);
        setChainStatus('Error fetching HostCap.');
      }
    };

    if (role === 'host' && walletAddress && roomId) {
      fetchHostCap();
    }
  }, [role, walletAddress, roomId, client]);

  const startRoomOnChain = useCallback(async () => {
    if (chainBusy || !hostCapId || !roomId) return;
    try {
      setChainBusy(true);
      setChainStatus('Starting room on-chain...');

      const tx = new Transaction();
      tx.moveCall({
        target: `${PACKAGE_ID}::sealmeet::start_room`,
        arguments: [
          tx.object(hostCapId),
          tx.object(roomId),
          tx.object(CLOCK_OBJECT_ID),
        ],
      });

      signAndExecuteTransaction(
        { transaction: tx },
        {
          onSuccess: (result) => {
            console.log('Room started on-chain:', result);
            setChainStatus('Room started successfully!');
            setTimeout(() => setChainStatus(null), 3000);
            setChainBusy(false);
          },
          onError: (err) => {
            console.error('Failed to start room:', err);
            setChainStatus('Failed to start room on-chain.');
            setChainBusy(false);
          },
        },
      );
    } catch (err) {
      console.error('Error starting room:', err);
      setChainStatus('Error starting room.');
      setChainBusy(false);
    }
  }, [chainBusy, hostCapId, roomId, signAndExecuteTransaction]);

  return {
    hostCapId,
    chainBusy,
    chainStatus,
    startRoomOnChain,
  };
}

