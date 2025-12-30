import React from 'react';
import { Cross2Icon, ExclamationTriangleIcon, CheckCircledIcon, ClockIcon } from '@radix-ui/react-icons';

interface AccessDeniedModalProps {
  isOpen: boolean;
  onClose: () => void;
  roomTitle: string;
  roomId: string;
  onRequestJoin: () => void;
  requesting: boolean;
  requestStatus: 'idle' | 'pending' | 'approved' | 'rejected';
}

/**
 * Modal displayed when user tries to join a room they don't have access to
 */
export default function AccessDeniedModal({
  isOpen,
  onClose,
  roomTitle,
  roomId,
  onRequestJoin,
  requesting,
  requestStatus
}: AccessDeniedModalProps) {
  if (!isOpen) return null;

  // Determine header based on status
  const getHeaderConfig = () => {
    switch (requestStatus) {
      case 'pending':
        return {
          icon: <ClockIcon className="w-6 h-6 text-blue-600" />,
          bgColor: 'bg-blue-100',
          title: 'Waiting for Approval'
        };
      case 'approved':
        return {
          icon: <CheckCircledIcon className="w-6 h-6 text-green-600" />,
          bgColor: 'bg-green-100',
          title: 'Request Approved'
        };
      case 'rejected':
        return {
          icon: <ExclamationTriangleIcon className="w-6 h-6 text-red-600" />,
          bgColor: 'bg-red-100',
          title: 'Request Denied'
        };
      default:
        return {
          icon: <ExclamationTriangleIcon className="w-6 h-6 text-red-600" />,
          bgColor: 'bg-red-100',
          title: 'Access Denied'
        };
    }
  };

  const headerConfig = getHeaderConfig();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-xl shadow-2xl max-w-md w-full mx-4 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className={`p-2 ${headerConfig.bgColor} rounded-lg`}>
              {headerConfig.icon}
            </div>
            <h2 className="text-xl font-bold text-gray-900">{headerConfig.title}</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <Cross2Icon className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          {requestStatus === 'pending' ? (
            <>
              <div className="space-y-2">
                <h3 className="font-semibold text-gray-900">
                  Your request is pending
                </h3>
                <p className="text-sm text-gray-600">
                  Your request to join <span className="font-semibold">"{roomTitle}"</span> has been sent to the host.
                  Please wait for approval.
                </p>
              </div>

              <div className="bg-blue-50 rounded-lg p-4 space-y-2 border border-blue-200">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
                  <p className="text-sm font-medium text-blue-900">Waiting for host approval...</p>
                </div>
                <p className="text-xs text-blue-700">
                  The host will be notified of your request. You can close this window and check back later.
                </p>
              </div>
            </>
          ) : requestStatus === 'approved' ? (
            <>
              <div className="space-y-2">
                <h3 className="font-semibold text-gray-900">
                  Request approved!
                </h3>
                <p className="text-sm text-gray-600">
                  The host has approved your request. The page will reload automatically.
                </p>
              </div>
            </>
          ) : requestStatus === 'rejected' ? (
            <>
              <div className="space-y-2">
                <h3 className="font-semibold text-gray-900">
                  Request denied
                </h3>
                <p className="text-sm text-gray-600">
                  Your request to join <span className="font-semibold">"{roomTitle}"</span> was denied by the host.
                  You can try requesting again or contact the host directly.
                </p>
              </div>
            </>
          ) : (
            <>
              <div className="space-y-2">
                <h3 className="font-semibold text-gray-900">
                  You are not in this room
                </h3>
                <p className="text-sm text-gray-600">
                  You don't have permission to join <span className="font-semibold">"{roomTitle}"</span>.
                  You need to be approved by the host to access this room.
                </p>
              </div>

              <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                <p className="text-xs font-medium text-gray-700">Room ID</p>
                <p className="text-xs font-mono text-gray-600 break-all">
                  {roomId}
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="text-sm font-semibold text-gray-900">What you can do:</h4>
                <ul className="text-sm text-gray-600 space-y-1 list-disc list-inside">
                  <li>Request to join the room (host will be notified)</li>
                  <li>Contact the host directly for approval</li>
                  <li>Wait for the host to add you to the participants list</li>
                </ul>
              </div>
            </>
          )}
        </div>

        {/* Actions */}
        <div className="flex gap-3 p-6 bg-gray-50 border-t border-gray-200">
          {requestStatus === 'pending' ? (
            <>
              <button
                onClick={onClose}
                className="flex-1 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Close
              </button>
              <button
                onClick={onRequestJoin}
                disabled={requesting}
                className="flex-1 px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {requesting ? (
                  <span className="flex items-center justify-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Re-requesting...
                  </span>
                ) : (
                  'Request Again'
                )}
              </button>
            </>
          ) : requestStatus === 'rejected' ? (
            <>
              <button
                onClick={onClose}
                className="flex-1 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Close
              </button>
              <button
                onClick={onRequestJoin}
                disabled={requesting}
                className="flex-1 px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {requesting ? (
                  <span className="flex items-center justify-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Requesting...
                  </span>
                ) : (
                  'Request Again'
                )}
              </button>
            </>
          ) : (
            <>
              <button
                onClick={onClose}
                className="flex-1 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={onRequestJoin}
                disabled={requesting}
                className="flex-1 px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {requesting ? (
                  <span className="flex items-center justify-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Requesting...
                  </span>
                ) : (
                  'Request to Join'
                )}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
