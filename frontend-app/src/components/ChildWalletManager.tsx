'use client';

import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useChildWallet } from '@/hooks/useChildWallet';

/**
 * Example component showing how to use child wallets for auto-signing
 */
export function ChildWalletManager() {
  const { isAuthenticated, authenticate, logout } = useAuth();
  const {
    childWallets,
    loading,
    error,
    createChildWallet,
    autoSign,
    revokeChildWallet,
  } = useChildWallet();

  const [selectedScopes, setSelectedScopes] = useState<string[]>(['room:join', 'room:leave']);

  const handleCreateWallet = async () => {
    const wallet = await createChildWallet(selectedScopes, 24);
    if (wallet) {
      alert(`Child wallet created: ${wallet.address}`);
    }
  };

  const handleAutoSign = async (walletId: string) => {
    // Example: Sign a dummy transaction
    const dummyTx = Buffer.from('example_transaction_bytes').toString('base64');
    const result = await autoSign(walletId, dummyTx, 'room:join');
    
    if (result) {
      alert(`Transaction signed! Signature: ${result.signature.slice(0, 20)}...`);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="p-6 border rounded-lg">
        <h2 className="text-xl font-bold mb-4">Child Wallet Manager</h2>
        <p className="mb-4">Connect your wallet and authenticate to use child wallets.</p>
        <button
          onClick={authenticate}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Authenticate
        </button>
      </div>
    );
  }

  return (
    <div className="p-6 border rounded-lg space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Child Wallet Manager</h2>
        <button
          onClick={logout}
          className="px-3 py-1 text-sm bg-gray-200 rounded hover:bg-gray-300"
        >
          Logout
        </button>
      </div>

      {error && (
        <div className="p-3 bg-red-100 text-red-800 rounded">
          {error}
        </div>
      )}

      {/* Create new child wallet */}
      <div className="border-t pt-4">
        <h3 className="font-semibold mb-3">Create Child Wallet</h3>
        <div className="space-y-2">
          <div className="flex flex-wrap gap-2">
            {['room:create', 'room:join', 'room:leave', 'room:approve', 'poap:mint'].map(scope => (
              <label key={scope} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={selectedScopes.includes(scope)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedScopes([...selectedScopes, scope]);
                    } else {
                      setSelectedScopes(selectedScopes.filter(s => s !== scope));
                    }
                  }}
                />
                <span className="text-sm">{scope}</span>
              </label>
            ))}
          </div>
          <button
            onClick={handleCreateWallet}
            disabled={loading || selectedScopes.length === 0}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:bg-gray-400"
          >
            {loading ? 'Creating...' : 'Create Child Wallet'}
          </button>
        </div>
      </div>

      {/* List existing child wallets */}
      <div className="border-t pt-4">
        <h3 className="font-semibold mb-3">Active Child Wallets ({childWallets.length})</h3>
        {childWallets.length === 0 ? (
          <p className="text-gray-500 text-sm">No child wallets created yet.</p>
        ) : (
          <div className="space-y-3">
            {childWallets.map(wallet => (
              <div key={wallet.id} className="p-3 bg-gray-50 rounded space-y-2">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-mono text-xs text-gray-600">{wallet.address}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      Expires: {new Date(wallet.expiresAt).toLocaleString()}
                    </p>
                  </div>
                  <button
                    onClick={() => revokeChildWallet(wallet.id)}
                    className="px-2 py-1 text-xs bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    Revoke
                  </button>
                </div>
                <div className="flex flex-wrap gap-1">
                  {wallet.scope.map(scope => (
                    <span key={scope} className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded">
                      {scope}
                    </span>
                  ))}
                </div>
                <button
                  onClick={() => handleAutoSign(wallet.id)}
                  className="px-3 py-1 text-xs bg-purple-600 text-white rounded hover:bg-purple-700"
                >
                  Test Auto-Sign
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
