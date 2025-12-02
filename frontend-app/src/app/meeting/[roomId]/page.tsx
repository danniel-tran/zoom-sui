"use client";
import React, { useEffect, useRef, useState, Suspense } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useSuiClient, useCurrentAccount } from '@mysten/dapp-kit';
import ConferenceHeader from '@/components/pages/meeting/ConferenceHeader';
import ParticipantsPanel, { Participant } from '@/components/pages/meeting/ParticipantsPanel';
import ChatPanel, { ChatMessage } from '@/components/pages/meeting/ChatPanel';
import ScreenShareModal from '@/components/pages/meeting/ScreenShareModal';
import MultiPeerConnection, { PeerInfo, OnlineParticipant } from '@/components/pages/meeting/MultiPeerConnection';
import MeetingControlBar from '@/components/pages/meeting/MeetingControlBar';
import VideoGrid from '@/components/pages/meeting/VideoGrid';
import { useMeetingStore } from '@/state/meeting';
import { useMeetingControls } from '@/hooks/useMeetingControls';
import { useMediaPermissions } from '@/hooks/useMediaPermissions';
import { useHostCapability } from '@/hooks/useHostCapability';
import { apiClient } from '@/lib/api';

function MeetingPageContent() {
    const params = useParams();
    const router = useRouter();
    const roomId = (params.roomId as string) || '';

    const client = useSuiClient();
    const currentAccount = useCurrentAccount();

    // Core state
    const [role, setRole] = useState<'host' | 'guest'>('guest');
    const [participantName, setParticipantName] = useState<string>('');
    const [localStream, setLocalStream] = useState<MediaStream | null>(null);
    const [remotePeers, setRemotePeers] = useState<Map<string, PeerInfo>>(new Map());
    const [shareStream, setShareStream] = useState<MediaStream | null>(null);
    const [participants, setParticipants] = useState<Participant[]>([]);
    const [onlineParticipants, setOnlineParticipants] = useState<OnlineParticipant[]>([]);
    const [messages, setMessages] = useState<ChatMessage[]>([]);

    // UI state
    const [showParticipants, setShowParticipants] = useState(false);
    const [showChat, setShowChat] = useState(false);
    const [showShareModal, setShowShareModal] = useState(false);
    const [captionsEnabled, setCaptionsEnabled] = useState(false);
    const [elapsedSeconds, setElapsedSeconds] = useState(0);
    const [pinnedId, setPinnedId] = useState<string | null>(null);
    const [speakerView, setSpeakerView] = useState(false);

    // Zustand store
    const { room: roomData, loading, error: roomError, fetchRoom, setRoom } = useMeetingStore();

    // Refs for media controls (not used by MultiPeerConnection)
    const pcRef = useRef<RTCPeerConnection | null>(null);

    // Custom hooks
    const mediaPermissions = useMediaPermissions({
        localStream,
        setLocalStream,
        pcRef,
        setAudioEnabled: (enabled) => controls.setAudioEnabled(enabled),
        setVideoEnabled: (enabled) => controls.setVideoEnabled(enabled),
    });

    const controls = useMeetingControls({
        roomId,
        participantId: currentAccount?.address,
        pcRef,
        localStream,
        setLocalStream,
        remoteStream: null, // Not used in multi-peer
        shareStream,
        setShareStream,
        requestMediaAccess: mediaPermissions.requestMediaAccess,
    });

    const hostCapability = useHostCapability({
        roomId,
        role,
        walletAddress: currentAccount?.address,
    });

    // Load room data and determine role
    useEffect(() => {
        if (roomId) {
            loadRoomData();
        }
    }, [roomId, currentAccount]);

    const loadRoomData = async () => {
        if (!roomId) return;

        try {
            await fetchRoom(roomId);

            try {
                const object = await client.getObject({
                    id: roomId,
                    options: { showContent: true }
                });

                if (object.data?.content && 'fields' in object.data.content) {
                    const fields = object.data.content.fields as any;
                    const currentRoom = useMeetingStore.getState().room;
                    if (currentRoom) {
                        setRoom({
                            ...currentRoom,
                            hosts: Array.isArray(fields.hosts) ? fields.hosts : [],
                        });
                    } else {
                        setRoom({
                            id: roomId,
                            onchainObjectId: roomId,
                            title: fields.title || `Room ${roomId.slice(0, 8)}...`,
                            description: fields.description,
                            requireApproval: fields.require_approval || false,
                            sealPolicyId: null,
                            startTime: null,
                            endTime: null,
                            attendanceCount: 0,
                            createdAt: new Date().toISOString(),
                            owner: { walletAddress: fields.owner || '' },
                            memberships: 0,
                            pendingApprovals: 0,
                            hosts: Array.isArray(fields.hosts) ? fields.hosts : [],
                        });
                    }
                }
            } catch (blockchainErr) {
                console.warn('Failed to load room data from blockchain:', blockchainErr);
            }
        } catch (err) {
            console.error('Failed to load room data:', err);
        }
    };

    // Derive role from room model
    useEffect(() => {
        if (!roomData || !currentAccount?.address) {
            setRole('guest');
            return;
        }
        const isHost = roomData.owner.walletAddress.toLowerCase() === currentAccount.address.toLowerCase();
        setRole(isHost ? 'host' : 'guest');
    }, [roomData, currentAccount?.address]);

    // Derive participant name from wallet address
    useEffect(() => {
        if (currentAccount?.address) {
            const name = `User ${currentAccount.address.slice(0, 8)}`;
            setParticipantName(name);
        }
    }, [currentAccount]);

    // Meeting timer
    useEffect(() => {
        const intv = setInterval(() => setElapsedSeconds((s) => s + 1), 1000);
        return () => clearInterval(intv);
    }, []);

    // Note: Participants list is now managed by handleParticipantsChanged callback
    // which receives real-time updates from WebSocket signaling

    // Handle peers changed from MultiPeerConnection
    const handlePeersChanged = (peers: Map<string, PeerInfo>) => {
        console.log(`[MeetingPage] Peers changed: ${peers.size} remote peers`);
        setRemotePeers(new Map(peers));
    };

    // Handle online participants changed
    const handleParticipantsChanged = (participantsList: OnlineParticipant[]) => {
        console.log(`[MeetingPage] 🔔 Online participants changed: ${participantsList.length} participants`);
        console.log(`[MeetingPage] 📝 Participants details:`, participantsList.map(p => ({
            id: p.participantId.slice(0, 10),
            name: p.metadata.name,
            role: p.metadata.role
        })));

        setOnlineParticipants(participantsList);

        // Update participants UI list
        const newParticipants: Participant[] = [];

        // Add self
        newParticipants.push({
            id: 'you',
            name: participantName || 'You',
            role: role === 'host' ? 'host' : 'guest',
            audioMuted: !controls.audioEnabled,
            videoMuted: !controls.videoEnabled,
        });

        // Add online participants from WebSocket
        participantsList.forEach((onlineP) => {
            newParticipants.push({
                id: onlineP.participantId,
                name: onlineP.metadata.name || `User ${onlineP.participantId.slice(0, 8)}...`,
                role: onlineP.metadata.role || 'guest',
                audioMuted: false, // TODO: Track remote peer mute state
                videoMuted: false,
            });
        });

        console.log(`[MeetingPage] 🎯 Setting ${newParticipants.length} participants to state (1 self + ${participantsList.length} remote)`);
        setParticipants(newParticipants);
    };

    const endCall = async () => {
        try {
            console.log('[EndCall] Ending call as', role, 'for room', roomId);

            if (controls.isRecording) {
                controls.stopRecording();
            }

            localStream?.getTracks().forEach((t) => t.stop());
            shareStream?.getTracks().forEach((t) => t.stop());

            // Stop all remote peer streams
            remotePeers.forEach((peerInfo) => {
                peerInfo.stream?.getTracks().forEach((t) => t.stop());
            });

            try {
                await apiClient.endCall(roomId, role);
            } catch (err) {
                console.warn('[EndCall] Failed to notify backend (non-critical):', err);
            }

            setLocalStream(null);
            setRemotePeers(new Map());
            setShareStream(null);
            setParticipants([]);
            setMessages([]);

            if (role === 'host' && roomId) {
                router.push(`/room/${roomId}`);
            } else {
                router.push('/room');
            }
        } catch (e) {
            console.error('[EndCall] Error ending call:', e);
            router.push(role === 'host' && roomId ? `/room/${roomId}` : '/room');
        }
    };

    const handleSendChat = (msg: Omit<ChatMessage, 'id' | 'time'>) => {
        const newMsg: ChatMessage = { id: Math.random().toString(36).slice(2), time: Date.now(), ...msg };
        setMessages((prev) => [...prev, newMsg]);
    };

    const togglePin = (id: string) => setPinnedId((p) => (p === id ? null : id));

    // Loading state
    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-900">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-white">Loading meeting...</p>
                    {roomError && <p className="text-yellow-400 text-sm mt-2">Warning: {roomError}</p>}
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
            <ConferenceHeader
                meetingTitle={roomData?.title || `Room ${roomId.slice(0, 8)}...`}
                elapsedSeconds={elapsedSeconds}
                isSecure
                isRecording={controls.isRecording}
                onToggleRecording={() => {
                    if (!controls.isRecording) {
                        const ok = window.confirm('Allow recording this meeting?');
                        if (ok) controls.startRecording();
                    } else {
                        controls.stopRecording();
                    }
                }}
                captionsEnabled={captionsEnabled}
                onToggleCaptions={() => setCaptionsEnabled((v) => !v)}
                participantCount={1 + remotePeers.size}
            />

            <div className="flex-1 flex overflow-hidden">
                <div className="flex-1 relative">
                    {currentAccount?.address && (
                        <MultiPeerConnection
                            roomId={roomId}
                            participantId={currentAccount.address}
                            audioEnabled={controls.audioEnabled}
                            videoEnabled={controls.videoEnabled}
                            onLocalStream={setLocalStream}
                            onPeersChanged={handlePeersChanged}
                            onParticipantsChanged={handleParticipantsChanged}
                            token={null} // TODO: Pass JWT token if needed
                            participantName={participantName}
                            participantRole={role}
                        />
                    )}

                    {/* Main stage */}
                    <div className="max-w-7xl mx-auto px-4 py-4">
                        <VideoGrid
                            localStream={localStream}
                            remoteStream={null} // Not used in multi-peer
                            remotePeers={remotePeers} // Pass all remote peers
                            shareStream={shareStream}
                            audioEnabled={controls.audioEnabled}
                            videoEnabled={controls.videoEnabled}
                            pinnedId={pinnedId}
                            onTogglePin={togglePin}
                            isSharing={controls.isSharing}
                        />
                    </div>

                    {/* Connection status */}
                    {remotePeers.size > 0 && (
                        <div className="absolute top-4 left-4 bg-black/50 px-3 py-1 rounded text-sm">
                            Connected: {remotePeers.size} {remotePeers.size === 1 ? 'peer' : 'peers'}
                        </div>
                    )}

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
                        onOpenShareModal={() => setShowShareModal(true)}
                        onShowParticipants={() => setShowParticipants(true)}
                        onShowChat={() => setShowChat(true)}
                        speakerView={speakerView}
                        onToggleSpeakerView={() => setSpeakerView((v) => !v)}
                        role={role}
                        hostCapId={hostCapability.hostCapId}
                        chainBusy={hostCapability.chainBusy}
                        chainStatus={hostCapability.chainStatus}
                        onStartRoomOnChain={hostCapability.startRoomOnChain}
                        onEndCall={endCall}
                        onReact={() => setParticipants((prev) => prev.map((p) => (p.id === 'you' ? { ...p, raisedHand: false } : p)))}
                        onRaiseHand={() => setParticipants((prev) => prev.map((p) => (p.id === 'you' ? { ...p, raisedHand: true } : p)))}
                    />
                </div>

                {/* Side panels */}
                <ParticipantsPanel
                    isOpen={showParticipants}
                    onClose={() => setShowParticipants(false)}
                    participants={participants}
                    onToggleMute={(id) => setParticipants((prev) => prev.map((p) => (p.id === id ? { ...p, audioMuted: !p.audioMuted } : p)))}
                    onToggleVideo={(id) => setParticipants((prev) => prev.map((p) => (p.id === id ? { ...p, videoMuted: !p.videoMuted } : p)))}
                    onRemove={(id) => setParticipants((prev) => prev.filter((p) => p.id !== id))}
                    onMakeCoHost={(id) => setParticipants((prev) => prev.map((p) => (p.id === id ? { ...p, role: 'co-host' } : p)))}
                    onAdmit={(id) => setParticipants((prev) => prev.map((p) => (p.id === id ? { ...p, inLobby: false } : p)))}
                    canManage={role === 'host'}
                    onAdd={(nameOrAddress) =>
                        setParticipants((prev) => [
                            ...prev,
                            {
                                id: `member-${Math.random().toString(36).slice(2)}`,
                                name: nameOrAddress,
                                role: 'guest',
                                audioMuted: false,
                                videoMuted: false,
                            },
                        ])
                    }
                />
                <ChatPanel
                    isOpen={showChat}
                    onClose={() => setShowChat(false)}
                    messages={messages}
                    onSend={handleSendChat}
                    participants={participants.map((p) => ({ id: p.id, name: p.name, role: p.role }))}
                />

                {/* Screen share modal */}
                <ScreenShareModal
                    isOpen={showShareModal}
                    onClose={() => setShowShareModal(false)}
                    onStartShare={(opts) => { setShowShareModal(false); controls.startShare(opts); }}
                    isSharing={controls.isSharing}
                    onPause={controls.pauseShare}
                    onStop={controls.stopShare}
                />
            </div>
        </div>
    );
}

export default function MeetingPage() {
    return (
        <Suspense fallback={
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading...</p>
                </div>
            </div>
        }>
            <MeetingPageContent />
        </Suspense>
    );
}