import React, { useState } from 'react';
import { LockClosedIcon, UpdateIcon } from '@radix-ui/react-icons';

interface SealValidationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onValidate: () => Promise<boolean>;
  roomTitle: string;
}

/**
 * Modal prompting approved guest to sign Seal SessionKey for room validation
 * This creates the SessionKey that validates their access to the room
 */
export default function SealValidationModal({
  isOpen,
  onClose,
  onValidate,
  roomTitle,
}: SealValidationModalProps) {
  const [isValidating, setIsValidating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleValidate = async () => {
    setIsValidating(true);
    setError(null);

    try {
      const success = await onValidate();

      if (success) {
        // Success - modal will close and page will reload/proceed
        console.log('[SealValidation] Validation successful');
      } else {
        setError('Validation failed. Please try again.');
      }
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Validation failed';
      setError(errorMsg);
    } finally {
      setIsValidating(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-green-500 to-emerald-500 p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-white/20 rounded-lg">
              <LockClosedIcon className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-xl font-bold text-white">Access Approved!</h2>
          </div>
          <p className="text-white/90 text-sm">
            You've been approved to join <strong>{roomTitle}</strong>
          </p>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="mb-6">
            <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg border border-blue-200 mb-4">
              <div className="text-blue-600 mt-0.5">ℹ️</div>
              <div className="flex-1 text-sm text-gray-700">
                <p className="font-semibold text-gray-900 mb-1">One more step required</p>
                <p>
                  To validate your access to this room, you need to sign a message with your wallet.
                  This creates a secure session key for the meeting.
                </p>
              </div>
            </div>

            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex items-start gap-2">
                <span className="text-green-600">✓</span>
                <span>You've been approved by the host</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-green-600">✓</span>
                <span>You're authorized on the blockchain</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-orange-500">→</span>
                <span className="font-medium">Sign to validate and create session key</span>
              </div>
            </div>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-3">
            <button
              onClick={onClose}
              disabled={isValidating}
              className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
            >
              Cancel
            </button>
            <button
              onClick={handleValidate}
              disabled={isValidating}
              className="flex-1 px-4 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg hover:from-green-600 hover:to-emerald-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed font-medium flex items-center justify-center gap-2"
            >
              {isValidating ? (
                <>
                  <UpdateIcon className="w-4 h-4 animate-spin" />
                  <span>Validating...</span>
                </>
              ) : (
                <span>Sign & Validate Access</span>
              )}
            </button>
          </div>

          <p className="text-xs text-gray-500 text-center mt-4">
            This will open your wallet for signature
          </p>
        </div>
      </div>
    </div>
  );
}
