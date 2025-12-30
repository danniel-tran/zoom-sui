import React, { useState } from 'react';
import { PersonIcon, CheckIcon, Cross2Icon } from '@radix-ui/react-icons';

interface JoinRequest {
  id: string;
  requesterAddress: string;
  createdAt: string;
}

interface JoinRequestNotificationProps {
  requests: JoinRequest[];
  onApprove: (requestId: string, guestAddress: string) => Promise<boolean>;
  onDeny: (requestId: string) => Promise<boolean>;
}

/**
 * Floating notification panel for hosts to see and manage join requests
 * Appears in bottom-right corner when there are pending requests
 */
export default function JoinRequestNotification({
  requests,
  onApprove,
  onDeny,
}: JoinRequestNotificationProps) {
  const [processing, setProcessing] = useState<string | null>(null);
  const [collapsed, setCollapsed] = useState(false);

  if (requests.length === 0) return null;

  const handleApprove = async (requestId: string, guestAddress: string) => {
    setProcessing(requestId);
    try {
      await onApprove(requestId, guestAddress);
    } finally {
      setProcessing(null);
    }
  };

  const handleDeny = async (requestId: string) => {
    setProcessing(requestId);
    try {
      await onDeny(requestId);
    } finally {
      setProcessing(null);
    }
  };

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const formatTime = (createdAt: string) => {
    const date = new Date(createdAt);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);

    if (diffMins < 1) return 'just now';
    if (diffMins === 1) return '1 min ago';
    if (diffMins < 60) return `${diffMins} mins ago`;

    const diffHours = Math.floor(diffMins / 60);
    if (diffHours === 1) return '1 hour ago';
    return `${diffHours} hours ago`;
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 max-w-sm">
      <div className="bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden">
        {/* Header */}
        <div
          className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-500 to-cyan-500 cursor-pointer"
          onClick={() => setCollapsed(!collapsed)}
        >
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-white/20 rounded-lg">
              <PersonIcon className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white">
                Join Requests
              </h3>
              <p className="text-xs text-white/80">
                {requests.length} {requests.length === 1 ? 'person' : 'people'} waiting
              </p>
            </div>
          </div>
          <button
            className="p-1 hover:bg-white/20 rounded-lg transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              setCollapsed(!collapsed);
            }}
          >
            {collapsed ? (
              <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            ) : (
              <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
              </svg>
            )}
          </button>
        </div>

        {/* Requests List */}
        {!collapsed && (
          <div className="max-h-96 overflow-y-auto">
            {requests.map((request) => (
              <div
                key={request.id}
                className="p-4 border-b border-gray-100 last:border-b-0 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center flex-shrink-0">
                        <PersonIcon className="w-4 h-4 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {formatAddress(request.requesterAddress)}
                        </p>
                        <p className="text-xs text-gray-500">
                          {formatTime(request.createdAt)}
                        </p>
                      </div>
                    </div>
                    <p className="text-xs text-gray-600 mt-1">
                      wants to join the meeting
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 flex-shrink-0">
                    <button
                      onClick={() => handleApprove(request.id, request.requesterAddress)}
                      disabled={processing === request.id}
                      className="p-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      title="Approve"
                    >
                      {processing === request.id ? (
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <CheckIcon className="w-4 h-4" />
                      )}
                    </button>
                    <button
                      onClick={() => handleDeny(request.id)}
                      disabled={processing === request.id}
                      className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      title="Deny"
                    >
                      <Cross2Icon className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
