"use client";
import React, { useEffect, useState, useCallback, useMemo, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useCurrentAccount } from '@mysten/dapp-kit';
import { UpdateIcon } from '@radix-ui/react-icons';

// Components
import ConferenceHeader from '@/components/pages/meeting/ConferenceHeader';
import ParticipantsPanel, { Participant } from '@/components/pages/meeting/ParticipantsPanel';
import ChatPanel, { ChatMessage } from '@/components/pages/meeting/ChatPanel';
import ScreenShareModal from '@/components/pages/meeting/ScreenShareModal';
import MultiPeerConnection, { PeerInfo, OnlineParticipant } from '@/components/pages/meeting/MultiPeerConnection';
import MeetingControlBar from '@/components/pages/meeting/MeetingControlBar';
import VideoGrid from '@/components/pages/meeting/VideoGrid';
import AccessDeniedModal from '@/components/modals/AccessDeniedModal';
import JoinRequestNotification from '@/components/pages/meeting/JoinRequestNotification';

// Custom Hooks
import {
  useMeetingAuth,
  useMeetingRoom,
  useMeetingUI,
  useMeetingTimer
} from '@/hooks/meeting';
import { useMeetingControls } from '@/hooks/useMeetingControls';
import { useMediaPermissions } from '@/hooks/useMediaPermissions';
import { useHostCapability } from '@/hooks/useHostCapability';
import { useSessionKey } from '@/hooks/useSessionKey';
import { useVideoDecryption } from '@/hooks/useVideoDecryption';
import { useJoinRequest } from '@/hooks/useJoinRequest';
import { useAuthGuard } from '@/hooks/useAuthGuard';
import { useEarlyWebSocket } from '@/hooks/useEarlyWebSocket';

// Utils
import { apiClient } from '@/lib/api';
import { SignalingWebSocket } from '@/services/signaling-websocket';

// Constants
const WALLET_ADDRESS_DISPLAY_LENGTH = 8;

/**
 * Format wallet address for display
 */
const formatWalletAddress = (address: string): string =>
  `${address.slice(0, WALLET_ADDRESS_DISPLAY_LENGTH)}...`;

/**
 * Get participant name from wallet address
 */
const getParticipantName = (address: string | undefined): string => {
  if (!address) return 'Guest';
  return `User ${formatWalletAddress(address)}`;
};

/**
 * Main Meeting Page Component
 * Handles authentication, room loading, and WebRTC video conferencing
 */
function MeetingPageContent() {
  const params = useParams();
  const router = useRouter();
  const roomId = (params.roomId as string) || '';
  const currentAccount = useCurrentAccount();

  // Ref to prevent multiple reloads
  const isReloadingRef = useRef(false);

  // Auth guard - check for access token
  const { isAuthorized, isChecking: isCheckingAuth } = useAuthGuard();
  
  // Check if user is participant via backend API (checks blockchain)
  const [isParticipant, setIsParticipant] = useState<boolean | null>(null);
  const [checkingAccess, setCheckingAccess] = useState(false);

  // WebSocket signaling instance from MultiPeerConnection
  const [signalingInstance, setSignalingInstance] = useState<SignalingWebSocket | null>(null);

  // Authentication (Seal-based only, no backend session)
  // Only run seal validation after backend confirms user is participant
  const { authState, authError, isAuthenticated, isAuthenticating } = useMeetingAuth({
    roomId,
    enabled: isParticipant === true, // Only validate seal if backend confirmed user is in room
  });

  // Room data and user role
  const { room, role, loading: roomLoading, error: roomError } = useMeetingRoom(roomId);

  // SessionKey management for backend validation
  const sessionKeyManager = useSessionKey({
    roomId,
    enabled: isAuthenticated,
  });

  // Video decryption (if needed)
  const videoDecryption = useVideoDecryption({
    sessionKey: sessionKeyManager.sessionKey,
    onSessionKeyExpired: sessionKeyManager.refresh,
    enabled: isAuthenticated,
  });

  // UI state management
  const ui = useMeetingUI();

  // Meeting timer
  const { elapsedSeconds } = useMeetingTimer();

  // Media and peer state
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const [remotePeers, setRemotePeers] = useState<Map<string, PeerInfo>>(new Map());
  const [shareStream, setShareStream] = useState<MediaStream | null>(null);
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  

  // Media controls
  const mediaPermissions = useMediaPermissions({
    localStream,
    setLocalStream,
    pcRef: null, // Not used with MultiPeerConnection
    setAudioEnabled: () => {},
    setVideoEnabled: () => {},
  });

  const controls = useMeetingControls({
    roomId,
    participantId: currentAccount?.address,
    pcRef: null,
    localStream,
    setLocalStream,
    remoteStream: null,
    shareStream,
    setShareStream,
    requestMediaAccess: mediaPermissions.requestMediaAccess,
  });

  const hostCapability = useHostCapability({
    roomId,
    role,
    walletAddress: currentAccount?.address,
  });

  useEffect(() => {
    if (!roomId || !currentAccount?.address) {
      setIsParticipant(null);
      return;
    }

    const checkAccess = async () => {
      try {
        setCheckingAccess(true);
        const accessToken = localStorage.getItem('accessToken');

        if (!accessToken) {
          console.log('[Meeting] No access token, skipping participant check');
          setIsParticipant(null);
          return;
        }

        const result = await apiClient.checkRoomAccess(roomId, accessToken);
        console.log('[Meeting] Backend access check:', result);
        setIsParticipant(result.hasAccess);

        if (result.hasAccess) {
          console.log('[Meeting] ✅ User is participant - enabling Seal validation');
        } else {
          console.log('[Meeting] ❌ User is NOT participant - showing access denied modal');
        }
      } catch (error) {
        console.error('[Meeting] Error checking room access:', error);
        // On error, assume not participant and show request modal
        setIsParticipant(false);
      } finally {
        setCheckingAccess(false);
      }
    };

    checkAccess();
  }, [roomId, currentAccount?.address]);

  // Early WebSocket connection for receiving real-time notifications
  // This establishes a WebSocket connection even before authentication/MultiPeerConnection
  // so guests can receive approval notifications while viewing the access denied modal
  const earlyWebSocket = useEarlyWebSocket({
    roomId,
    participantId: currentAccount?.address,
    enabled: isParticipant === false, // Only use early WebSocket when not a participant yet
    onMessage: (message) => {
      console.log('[Meeting] Early WebSocket message:', message.type);
      // Handle approval notification
      if (message.type === 'join-request-approved') {
        // Prevent multiple reloads
        if (isReloadingRef.current) {
          console.log('[Meeting] ⚠️ Already reloading, ignoring duplicate approval notification');
          return;
        }
        isReloadingRef.current = true;
        console.log('[Meeting] ✅ Join request approved! Reloading to complete validation...');
        setShowAccessDeniedModal(false);
        window.location.reload();
      } else if (message.type === 'join-request-rejected') {
        console.log('[Meeting] ❌ Join request rejected');
        alert('Your request to join was denied by the host.');
      }
    },
  });

  // Join request management
  const [showAccessDeniedModal, setShowAccessDeniedModal] = useState(false);
  const joinRequestManager = useJoinRequest({
    roomId,
    hostCapId: hostCapability.hostCapId,  // Pass HostCap for approving guests
    enabled: true,
    signalingInstance,  // Pass the signaling instance from MultiPeerConnection
    onApproved: () => {
      // Guest was approved - reload the page to retry authentication
      // Prevent multiple reloads (in case both early WebSocket and this receive the message)
      if (isReloadingRef.current) {
        console.log('[Meeting] ⚠️ Already reloading, ignoring duplicate approval from useJoinRequest');
        return;
      }
      isReloadingRef.current = true;
      console.log('[Meeting] Join request approved (via useJoinRequest), reloading...');
      setShowAccessDeniedModal(false);
      window.location.reload();
    },
    onRejected: () => {
      // Guest was rejected
      console.log('[Meeting] Join request rejected');
      alert('Your request to join was denied by the host.');
    },
  });

  // Show access denied modal when user is not a participant
  // Note: Modal is shown in the render logic above (Step 2)
  useEffect(() => {
    if (isParticipant === false) {
      console.log('[Meeting] User not in participants list, showing access denied modal');
      setShowAccessDeniedModal(true);
    }
  }, [isParticipant]);

  // Participant name
  const participantName = useMemo(
    () => getParticipantName(currentAccount?.address),
    [currentAccount?.address]
  );

  /**
   * Interval validation: Check if user is still in room
   * Validates SessionKey with backend every 60 seconds
   */
  useEffect(() => {
    if (!isAuthenticated || !roomId) return;

    // Initial check after 5 seconds
    const initialTimeout = setTimeout(() => {
      if (sessionKeyManager.isExpired && !sessionKeyManager.isRefreshing) {
        console.log('[Meeting] SessionKey expired, refreshing...');
        sessionKeyManager.refresh();
      }
    }, 5000);

    // Periodic validation every 60 seconds
    const interval = setInterval(async () => {
      // If SessionKey is expired, try to refresh
      if (sessionKeyManager.isExpired && !sessionKeyManager.isRefreshing) {
        console.log('[Meeting] SessionKey expired, attempting refresh');
        const refreshed = await sessionKeyManager.refresh();

        if (!refreshed) {
          console.error('[Meeting] Failed to refresh SessionKey');
        }
      }

      // If SessionKey exists and not expired, validate with backend
      if (sessionKeyManager.sessionKey && !sessionKeyManager.isExpired && !sessionKeyManager.isRefreshing) {
        try {
          // Refresh SessionKey to validate user is still in room
          await sessionKeyManager.refresh();
        } catch (error) {
          console.error('[Meeting] Validation check failed:', error);
        }
      }
    }, 60 * 1000); // Every 60 seconds

    return () => {
      clearTimeout(initialTimeout);
      clearInterval(interval);
    };
  }, [isAuthenticated, roomId, sessionKeyManager]);

  /**
   * Handle user removal from room
   */
  useEffect(() => {
    if (sessionKeyManager.isRemoved) {
      console.error('[Meeting] User has been removed from room');
      // Show error and redirect
      setTimeout(() => {
        router.push('/room');
      }, 3000);
    }
  }, [sessionKeyManager.isRemoved, router]);

  /**
   * Handle peers changed from MultiPeerConnection
   */
  const handlePeersChanged = useCallback((peers: Map<string, PeerInfo>) => {
    console.log(`[MeetingPage] Peers changed: ${peers.size} remote peers`);
    setRemotePeers(new Map(peers));
  }, []);

  /**
   * Handle online participants changed
   * Updates the participants list for UI display
   */
  const handleParticipantsChanged = useCallback((participantsList: OnlineParticipant[]) => {
    console.log(`[MeetingPage] Online participants: ${participantsList.length}`);

    setParticipants(prev => {
      const newParticipants: Participant[] = [
        // Self
        {
          id: 'you',
          name: participantName,
          role: role === 'host' ? 'host' : 'guest',
          audioMuted: !controls.audioEnabled,
          videoMuted: !controls.videoEnabled,
        },
        // Remote participants
        ...participantsList.map((onlineP) => ({
          id: onlineP.participantId,
          name: onlineP.metadata.name || getParticipantName(onlineP.participantId),
          role: onlineP.metadata.role || 'guest',
          audioMuted: false, // TODO: Track remote peer mute state
          videoMuted: false,
        }))
      ];

      // Only update if participant IDs changed (avoid unnecessary re-renders)
      const prevIds = prev.map(p => p.id).sort().join(',');
      const newIds = newParticipants.map(p => p.id).sort().join(',');

      if (prevIds !== newIds) {
        console.log(`[MeetingPage] Participants list updated: ${newParticipants.length} total`);
        return newParticipants;
      }

      return prev;
    });
  }, [participantName, role, controls.audioEnabled, controls.videoEnabled]);

  /**
   * End call and cleanup
   */
  const handleEndCall = useCallback(async () => {
    try {
      console.log('[EndCall] Ending call as', role, 'for room', roomId);

      // Stop recording if active
      if (controls.isRecording) {
        controls.stopRecording();
      }

      // Stop all media tracks
      localStream?.getTracks().forEach((t) => t.stop());
      shareStream?.getTracks().forEach((t) => t.stop());
      remotePeers.forEach((peerInfo) => {
        peerInfo.stream?.getTracks().forEach((t) => t.stop());
      });

      // Notify backend (non-critical)
      try {
        await apiClient.endCall(roomId, currentAccount?.address || '');
      } catch (err) {
        console.warn('[EndCall] Failed to notify backend:', err);
      }

      // Clear state
      setLocalStream(null);
      setRemotePeers(new Map());
      setShareStream(null);
      setParticipants([]);
      setMessages([]);

      // Navigate back
      if (role === 'host' && roomId) {
        router.push(`/room/${roomId}`);
      } else {
        router.push('/room');
      }
    } catch (e) {
      console.error('[EndCall] Error ending call:', e);
      router.push(role === 'host' && roomId ? `/room/${roomId}` : '/room');
    }
  }, [role, roomId, controls, localStream, shareStream, remotePeers, currentAccount, router]);

  /**
   * Handle chat message send
   */
  const handleSendChat = useCallback((msg: Omit<ChatMessage, 'id' | 'time'>) => {
    const newMsg: ChatMessage = {
      id: Math.random().toString(36).slice(2),
      time: Date.now(),
      ...msg
    };
    setMessages((prev) => [...prev, newMsg]);
  }, []);

  /**
   * Handle recording toggle
   */
  const handleToggleRecording = useCallback(() => {
    if (!controls.isRecording) {
      const ok = window.confirm('Allow recording this meeting?');
      if (ok) controls.startRecording();
    } else {
      controls.stopRecording();
    }
  }, [controls]);

  /**
   * Handle screen share
   */
  const handleStartShare = useCallback((opts: any) => {
    ui.toggleShareModal();
    controls.startShare(opts);
  }, [ui, controls]);

  // Loading states
  const isLoading = authState === 'validating-seal' || roomLoading;

  // Auth guard check - show loading while checking
  if (isCheckingAuth) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900">
        <div className="text-center">
          <UpdateIcon className="w-12 h-12 animate-spin text-blue-500 mx-auto mb-4" />
          <p className="text-white text-xl font-semibold mb-2">Checking Authentication...</p>
          <p className="text-gray-400 text-sm">Please wait</p>
        </div>
      </div>
    );
  }

  // Not authorized - will redirect to login (return null to prevent flash)
  if (!isAuthorized) {
    return null;
  }

  // Step 1: Backend participant check - show loading while checking
  if (checkingAccess) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900">
        <div className="text-center">
          <UpdateIcon className="w-12 h-12 animate-spin text-blue-500 mx-auto mb-4" />
          <p className="text-white text-xl font-semibold mb-2">Validating Room Access...</p>
          <p className="text-gray-400 text-sm">Checking if you are a participant in this room</p>
        </div>
      </div>
    );
  }

  // Step 2: If not a participant, show access denied modal (BEFORE seal validation)
  // This prevents unnecessary seal validation for non-participants
  if (isParticipant === false) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900">
        <div className="text-center max-w-md">
          <div className="text-red-500 text-6xl mb-4">⛔</div>
          <h2 className="text-white text-2xl font-bold mb-2">Access Denied</h2>
          <p className="text-gray-400 mb-6">
            You are not a participant in this room. Request approval from the host to join.
          </p>

          {/* WebSocket connection status */}
          {earlyWebSocket.isConnected && (
            <div className="mb-4 inline-flex items-center gap-2 bg-green-600/20 text-green-400 px-3 py-2 rounded-lg text-sm">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span>Connected - You'll be notified instantly when approved</span>
            </div>
          )}

          <button
            onClick={() => router.push('/room')}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Back to Rooms
          </button>
        </div>

        {/* Access Denied Modal with Request to Join option */}
        <AccessDeniedModal
          isOpen={showAccessDeniedModal}
          onClose={() => {
            setShowAccessDeniedModal(false);
            router.push('/room');
          }}
          roomTitle={room?.title || `Room ${roomId.slice(0, 10)}...`}
          roomId={roomId}
          onRequestJoin={async () => {
            const success = await joinRequestManager.requestJoin();
            if (success) {
              console.log('[Meeting] Join request sent, waiting for approval...');
            }
          }}
          requesting={joinRequestManager.isRequesting}
          requestStatus={joinRequestManager.requestStatus}
        />
      </div>
    );
  }

  // Step 3: User is a participant - proceed with seal validation
  // Authentication/Loading state (seal validation)
  if (isLoading && !isAuthenticated) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900">
        <div className="text-center">
          <UpdateIcon className="w-12 h-12 animate-spin text-blue-500 mx-auto mb-4" />
          <p className="text-white text-xl font-semibold mb-2">
            {authState === 'validating-seal' ? 'Verifying Access...' : 'Loading Meeting...'}
          </p>
          <p className="text-gray-400 text-sm">
            {authState === 'validating-seal'
              ? 'Please sign the message in your wallet to verify access'
              : 'Preparing your meeting room'}
          </p>
        </div>
      </div>
    );
  }

  // User removed from room
  if (sessionKeyManager.isRemoved) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900">
        <div className="text-center max-w-md">
          <div className="text-red-500 text-6xl mb-4">🚫</div>
          <h2 className="text-white text-2xl font-bold mb-2">Removed from Room</h2>
          <p className="text-gray-400 mb-6">
            You have been removed from this room by the host.
          </p>
          <p className="text-gray-500 text-sm mb-6">
            Redirecting to rooms list...
          </p>
          <button
            onClick={() => router.push('/room')}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Back to Rooms
          </button>
        </div>
      </div>
    );
  }

  // Step 4: Seal validation failed (user IS a participant but seal validation failed)
  // This should rarely happen if participant check passed
  if (authError || authState === 'error') {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900">
        <div className="text-center max-w-md">
          <div className="text-red-500 text-6xl mb-4">⛔</div>
          <h2 className="text-white text-2xl font-bold mb-2">Seal Validation Failed</h2>
          <p className="text-gray-400 mb-6">
            {authError || 'Failed to validate your access with Seal. Please try again.'}
          </p>
          <div className="flex gap-3 justify-center">
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Retry
            </button>
            <button
              onClick={() => router.push('/room')}
              className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition"
            >
              Back to Rooms
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Room error
  if (roomError) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900">
        <div className="text-center max-w-md">
          <div className="text-yellow-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-white text-2xl font-bold mb-2">Room Not Found</h2>
          <p className="text-gray-400 mb-6">{roomError}</p>
          <button
            onClick={() => router.push('/room')}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Back to Rooms
          </button>
        </div>
      </div>
    );
  }

  // No room ID
  if (!roomId) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900">
        <div className="text-center">
          <p className="text-red-400 mb-4">Room ID is required</p>
          <button
            onClick={() => router.push('/room')}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Go to Rooms
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-gray-900 text-white">
      {/* Header */}
      <ConferenceHeader
        meetingTitle={room?.title || `Room ${formatWalletAddress(roomId)}`}
        elapsedSeconds={elapsedSeconds}
        isSecure
        isRecording={controls.isRecording}
        onToggleRecording={handleToggleRecording}
        captionsEnabled={ui.captionsEnabled}
        onToggleCaptions={ui.toggleCaptions}
        participantCount={1 + remotePeers.size}
      />

      <div className="flex-1 flex overflow-hidden">
        <div className="flex-1 relative">
          {/* Multi-peer WebRTC connection */}
          {currentAccount?.address && isAuthenticated && (
            <MultiPeerConnection
              roomId={roomId}
              participantId={currentAccount.address}
              audioEnabled={controls.audioEnabled}
              videoEnabled={controls.videoEnabled}
              onLocalStream={setLocalStream}
              onPeersChanged={handlePeersChanged}
              onParticipantsChanged={handleParticipantsChanged}
              onSignalingReady={setSignalingInstance}  // Capture signaling instance for join requests
              token={null}
              participantName={participantName}
              participantRole={role}
            />
          )}

          {/* Main video stage */}
          <div className="max-w-7xl mx-auto px-4 py-4">
            <VideoGrid
              localStream={localStream}
              remoteStream={null}
              remotePeers={remotePeers}
              shareStream={shareStream}
              audioEnabled={controls.audioEnabled}
              videoEnabled={controls.videoEnabled}
              pinnedId={ui.pinnedId}
              onTogglePin={ui.togglePin}
              isSharing={controls.isSharing}
            />
          </div>

          {/* Connection status overlay */}
          {remotePeers.size > 0 && (
            <div className="absolute top-4 left-4 bg-black/50 px-3 py-1 rounded text-sm">
              Connected: {remotePeers.size} {remotePeers.size === 1 ? 'peer' : 'peers'}
            </div>
          )}

          {/* SessionKey status overlay */}
          {sessionKeyManager.isRefreshing && (
            <div className="absolute top-4 left-4 bg-blue-500/80 px-3 py-1 rounded text-sm flex items-center gap-2">
              <UpdateIcon className="w-4 h-4 animate-spin" />
              <span>Validating access...</span>
            </div>
          )}

          {sessionKeyManager.error && !sessionKeyManager.isRemoved && (
            <div className="absolute top-4 left-4 bg-red-500/80 px-3 py-1 rounded text-sm flex items-center gap-2">
              <span>⚠️ {sessionKeyManager.error}</span>
            </div>
          )}

          {/* Host capability status */}
          {hostCapability.chainStatus && (
            <div className="absolute top-4 right-4 bg-black/50 px-3 py-1 rounded text-sm">
              {hostCapability.chainStatus}
            </div>
          )}

          {/* Control bar */}
          <MeetingControlBar
            audioEnabled={controls.audioEnabled}
            videoEnabled={controls.videoEnabled}
            onToggleAudio={controls.toggleAudio}
            onToggleVideo={controls.toggleVideo}
            onOpenShareModal={ui.toggleShareModal}
            onShowParticipants={ui.toggleParticipants}
            onShowChat={ui.toggleChat}
            speakerView={ui.speakerView}
            onToggleSpeakerView={ui.toggleSpeakerView}
            role={role}
            hostCapId={hostCapability.hostCapId}
            chainBusy={hostCapability.chainBusy}
            chainStatus={hostCapability.chainStatus}
            onStartRoomOnChain={hostCapability.startRoomOnChain}
            onEndCall={handleEndCall}
            onReact={() => {}}
            onRaiseHand={() => {}}
          />
        </div>

        {/* Side panels */}
        <ParticipantsPanel
          isOpen={ui.showParticipants}
          onClose={ui.toggleParticipants}
          participants={participants}
          onToggleMute={() => {}}
          onToggleVideo={() => {}}
          onRemove={() => {}}
          onMakeCoHost={() => {}}
          onAdmit={() => {}}
          canManage={role === 'host'}
          onAdd={() => {}}
        />

        <ChatPanel
          isOpen={ui.showChat}
          onClose={ui.toggleChat}
          messages={messages}
          onSend={handleSendChat}
          participants={participants.map((p) => ({ id: p.id, name: p.name, role: p.role }))}
        />

        {/* Screen share modal */}
        <ScreenShareModal
          isOpen={ui.showShareModal}
          onClose={ui.toggleShareModal}
          onStartShare={handleStartShare}
          isSharing={controls.isSharing}
          onPause={controls.pauseShare}
          onStop={controls.stopShare}
        />

        {/* Join Request Notification for Hosts */}
        {role === 'host' && (
          <JoinRequestNotification
            requests={joinRequestManager.pendingRequests}
            onApprove={joinRequestManager.approveRequest}
            onDeny={joinRequestManager.denyRequest}
          />
        )}
      </div>
    </div>
  );
}

/**
 * Meeting Page with Suspense boundary
 */
export default function MeetingPage() {
  return (
    <React.Suspense fallback={
      <div className="flex items-center justify-center min-h-screen bg-gray-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-white">Loading...</p>
        </div>
      </div>
    }>
      <MeetingPageContent />
    </React.Suspense>
  );
}
