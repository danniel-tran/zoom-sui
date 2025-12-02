"use client";
import React from 'react';
import { MediaPermissionStatus } from '@/hooks/useMediaPermissions';

export interface PermissionModalProps {
  permissionStatus: MediaPermissionStatus;
  mediaError: string | null;
  onRequestAccess: () => void;
  onSkip: () => void;
  requestingVideo?: boolean; // Whether we're requesting video access
}

export default function PermissionModal({
  permissionStatus,
  mediaError,
  onRequestAccess,
  onSkip,
  requestingVideo = false,
}: PermissionModalProps) {
  const isChecking = permissionStatus.microphone === 'checking' || 
    (requestingVideo && permissionStatus.camera === 'checking');
  const isDenied = permissionStatus.microphone === 'denied' || 
    (requestingVideo && permissionStatus.camera === 'denied');

  const title = requestingVideo ? 'Camera & Microphone Access' : 'Microphone Access';
  const description = requestingVideo
    ? 'To join this meeting, we need access to your camera and microphone.'
    : 'To join this meeting, we need access to your microphone. You can turn on your camera later.';
  const buttonText = requestingVideo ? 'Allow Camera & Microphone' : 'Allow Microphone';
  const skipText = requestingVideo ? 'Join without camera/microphone' : 'Join without microphone';

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="bg-gray-800 rounded-lg border border-gray-700 p-8 max-w-md w-full mx-4">
        <h2 className="text-2xl font-bold text-white mb-4">{title}</h2>
        <p className="text-gray-300 mb-6">
          {description} Please click the button below to allow access.
        </p>

        {mediaError && (
          <div className="mb-4 p-3 bg-red-900/50 border border-red-700 rounded text-red-200 text-sm">
            {mediaError}
          </div>
        )}

        <div className="space-y-3">
          <button
            onClick={onRequestAccess}
            disabled={isChecking}
            className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
          >
            {isChecking ? 'Requesting access...' : buttonText}
          </button>

          {isDenied && (
            <div className="text-sm text-gray-400 space-y-2">
              <p className="font-semibold text-yellow-400">Permission was denied. To fix this:</p>
              <ol className="list-decimal list-inside space-y-1 ml-2">
                <li>Click the lock/camera icon in your browser's address bar</li>
                <li>Set {requestingVideo ? 'Camera and Microphone' : 'Microphone'} to "Allow"</li>
                <li>Refresh this page</li>
              </ol>
              <button
                onClick={onRequestAccess}
                className="mt-3 w-full px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-600 text-sm"
              >
                Try Again
              </button>
            </div>
          )}

          <button
            onClick={onSkip}
            className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 text-sm"
          >
            {skipText}
          </button>
        </div>
      </div>
    </div>
  );
}
