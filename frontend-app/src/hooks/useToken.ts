import { useEffect, useState } from 'react';
import { useCurrentAccount, useSignPersonalMessage } from '@mysten/dapp-kit';

/**
 * Hook to manage JWT token acquisition and refresh
 * Signs a message with user's wallet to authenticate with backend
 */
export function useToken() {
  const currentAccount = useCurrentAccount();
  const { mutate: signMessage } = useSignPersonalMessage();
  const [token, setToken] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');

  // Attempt to get a token by signing a message
  const getToken = async () => {
    if (!currentAccount) {
      setError('Wallet not connected');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // Create a message to sign (timestamp-based nonce)
      // useSignPersonalMessage expects a string, not bytes
      const message = `Authenticate to SuiMeet: ${Date.now()}`;

      // In a real implementation, you'd call signMessage and send the signed message
      // to the backend to get a JWT token
      // For now, we're returning empty token - the backend will need authentication implemented
      
      // TODO: Implement proper JWT token acquisition
      // const signedMessage = await signMessage(message);
      // const response = await fetch(`${API_BASE_URL}/auth/verify`, {
      //   method: 'POST',
      //   body: JSON.stringify({
      //     address: currentAccount.address,
      //     message: message,
      //     signature: signedMessage
      //   })
      // });
      // const data = await response.json();
      // setToken(data.token);

      setToken('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to get token');
    } finally {
      setLoading(false);
    }
  };

  // Attempt to get token when wallet connects
  useEffect(() => {
    if (currentAccount && !token) {
      getToken();
    }
  }, [currentAccount?.address]);

  return { token, loading, error, getToken };
}
