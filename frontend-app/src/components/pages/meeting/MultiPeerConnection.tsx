"use client";
import React, { useEffect, useRef, useState } from "react";
import { SignalingWebSocket, ParticipantMetadata, ParticipantWithMetadata } from "@/services/signaling-websocket";

export interface PeerInfo {
  id: string;
  stream: MediaStream | null;
  connectionState: RTCPeerConnectionState;
  iceConnectionState: RTCIceConnectionState;
  metadata?: ParticipantMetadata;
}

export interface OnlineParticipant {
  participantId: string;
  metadata: ParticipantMetadata;
  connectionState: 'connecting' | 'connected' | 'disconnected';
  joinedAt: number;
}

export interface MultiPeerConnectionProps {
  roomId: string;
  participantId: string;
  audioEnabled: boolean;
  videoEnabled: boolean;
  onLocalStream: (stream: MediaStream | null) => void;
  onPeersChanged: (peers: Map<string, PeerInfo>) => void;
  onParticipantsChanged?: (participants: OnlineParticipant[]) => void;
  onSignalingReady?: (signaling: SignalingWebSocket) => void;
  token?: string | null;
  participantName?: string;
  participantRole?: 'host' | 'co-host' | 'guest';
}

const ICE_SERVERS: RTCIceServer[] = [
  { urls: "stun:stun.l.google.com:19302" },
  { urls: "stun:stun1.l.google.com:19302" },
  { urls: "stun:stun2.l.google.com:19302" }
];

/**
 * MultiPeerConnection manages WebRTC connections to multiple peers in a room
 * Uses WebSocket for real-time signaling instead of polling
 */
export default function MultiPeerConnection({
  roomId,
  participantId,
  audioEnabled,
  videoEnabled,
  onLocalStream,
  onPeersChanged,
  onParticipantsChanged,
  onSignalingReady,
  token,
  participantName,
  participantRole
}: MultiPeerConnectionProps) {
  const signalingRef = useRef<SignalingWebSocket | null>(null);
  const localStreamRef = useRef<MediaStream | null>(null);
  const peersRef = useRef<Map<string, RTCPeerConnection>>(new Map());
  const peerStreamsRef = useRef<Map<string, MediaStream>>(new Map());
  const peerInfoRef = useRef<Map<string, PeerInfo>>(new Map());
  const participantMetadataRef = useRef<Map<string, ParticipantMetadata>>(new Map());
  const onlineParticipantsRef = useRef<Map<string, OnlineParticipant>>(new Map());
  const [isInitialized, setIsInitialized] = useState(false);

  // Initialize local media
  useEffect(() => {
    const initLocalMedia = async () => {
      try {
        const constraints: MediaStreamConstraints = {
          audio: audioEnabled,
          video: videoEnabled ? { width: 1280, height: 720 } : false,
        };

        if (constraints.audio || constraints.video) {
          const stream = await navigator.mediaDevices.getUserMedia(constraints);
          localStreamRef.current = stream;
          onLocalStream(stream);
          console.log(`[MultiPeer] Local media initialized: audio=${audioEnabled}, video=${videoEnabled}`);
        } else {
          console.log(`[MultiPeer] No local media requested`);
        }
      } catch (err) {
        console.error('[MultiPeer] Failed to get user media:', err);
      }
    };

    initLocalMedia();

    return () => {
      // Cleanup local stream on unmount
      localStreamRef.current?.getTracks().forEach(track => track.stop());
      localStreamRef.current = null;
    };
  }, []); // Only run once on mount

  // Update local media when audio/video settings change
  useEffect(() => {
    const updateLocalMedia = async () => {
      console.log(`[MultiPeer] updateLocalMedia triggered: audioEnabled=${audioEnabled}, videoEnabled=${videoEnabled}, hasStream=${!!localStreamRef.current}`);

      // If no stream exists yet, create one when media is requested
      if (!localStreamRef.current && (audioEnabled || videoEnabled)) {
        try {
          console.log('[MultiPeer] Creating initial media stream (late initialization)');
          const constraints: MediaStreamConstraints = {
            audio: audioEnabled,
            video: videoEnabled ? { width: 1280, height: 720 } : false,
          };

          const stream = await navigator.mediaDevices.getUserMedia(constraints);
          localStreamRef.current = stream;
          onLocalStream(stream);

          // Add tracks to all existing peer connections and renegotiate
          peersRef.current.forEach(async (pc, remotePeerId) => {
            stream.getTracks().forEach(track => {
              console.log(`[MultiPeer] Adding ${track.kind} track to peer connection with ${remotePeerId.slice(0, 10)}...`);
              pc.addTrack(track, stream);
            });

            // Renegotiate: create and send new offer
            console.log(`[MultiPeer] Renegotiating with ${remotePeerId.slice(0, 10)}... after adding tracks`);
            try {
              const offer = await pc.createOffer();
              await pc.setLocalDescription(offer);
              signalingRef.current?.sendOffer(remotePeerId, offer);
              console.log(`[MultiPeer] Sent renegotiation offer to ${remotePeerId.slice(0, 10)}...`);
            } catch (err) {
              console.error(`[MultiPeer] Failed to renegotiate with ${remotePeerId.slice(0, 10)}...:`, err);
            }
          });

          console.log(`[MultiPeer] Late media initialization complete: audio=${audioEnabled}, video=${videoEnabled}`);
          return;
        } catch (err) {
          console.error('[MultiPeer] Failed to initialize media:', err);
          return;
        }
      }

      if (!localStreamRef.current) return;

      const audioTracks = localStreamRef.current.getAudioTracks();
      const videoTracks = localStreamRef.current.getVideoTracks();

      // Handle audio
      audioTracks.forEach(track => {
        track.enabled = audioEnabled;
      });

      // Handle video
      const hasLiveVideoTrack = videoTracks.some(t => t.readyState === 'live');

      if (videoEnabled && !hasLiveVideoTrack) {
        // Need to add video track (either no tracks or all tracks are ended)
        try {
          // Remove any ended/stopped tracks first
          videoTracks.forEach(track => {
            if (track.readyState === 'ended') {
              localStreamRef.current!.removeTrack(track);
              console.log(`[MultiPeer] Removed ended video track`);
            }
          });

          const videoStream = await navigator.mediaDevices.getUserMedia({
            video: { width: 1280, height: 720 }
          });
          const newVideoTrack = videoStream.getVideoTracks()[0];
          localStreamRef.current!.addTrack(newVideoTrack);
          console.log(`[MultiPeer] Created new video track`);

          // Add to all peer connections and renegotiate
          // Use for...of instead of forEach to properly await async operations
          for (const [remotePeerId, pc] of peersRef.current.entries()) {
            try {
              console.log(`[MultiPeer] Adding new video track to peer connection with ${remotePeerId.slice(0, 10)}...`);

              // Check current senders
              const currentSenders = pc.getSenders();
              const videoSender = currentSenders.find(s => s.track?.kind === 'video');

              console.log(`[MultiPeer] Current senders for ${remotePeerId.slice(0, 10)}: ${currentSenders.length}, video sender: ${!!videoSender}`);

              if (videoSender && videoSender.track) {
                // Replace existing sender's track
                await videoSender.replaceTrack(newVideoTrack);
                console.log(`[MultiPeer] Replaced video track for ${remotePeerId.slice(0, 10)}...`);
              } else {
                // Add new track
                pc.addTrack(newVideoTrack, localStreamRef.current!);
                console.log(`[MultiPeer] Added new video track for ${remotePeerId.slice(0, 10)}...`);
              }

              // Renegotiate: create and send new offer
              console.log(`[MultiPeer] Creating offer for ${remotePeerId.slice(0, 10)}...`);
              const offer = await pc.createOffer();
              await pc.setLocalDescription(offer);

              console.log(`[MultiPeer] Sending offer to ${remotePeerId.slice(0, 10)}...`);
              signalingRef.current?.sendOffer(remotePeerId, offer);
              console.log(`[MultiPeer] ✅ Successfully sent renegotiation offer to ${remotePeerId.slice(0, 10)}...`);
            } catch (err) {
              console.error(`[MultiPeer] ❌ Failed to add track/renegotiate with ${remotePeerId.slice(0, 10)}...:`, err);
            }
          }

          onLocalStream(localStreamRef.current);
        } catch (err) {
          console.error('[MultiPeer] Failed to add video track:', err);
        }
      } else if (!videoEnabled && videoTracks.length > 0) {
        // Stop and remove video tracks
        videoTracks.forEach(track => {
          track.stop();
          localStreamRef.current!.removeTrack(track);
        });
        console.log(`[MultiPeer] Stopped and removed ${videoTracks.length} video track(s)`);

        // Remove video senders from all peer connections
        // Use for...of instead of forEach to properly await async operations
        for (const [remotePeerId, pc] of peersRef.current.entries()) {
          try {
            const videoSenders = pc.getSenders().filter(s => s.track?.kind === 'video');
            for (const sender of videoSenders) {
              pc.removeTrack(sender);
            }
            console.log(`[MultiPeer] Removed ${videoSenders.length} video sender(s) from ${remotePeerId.slice(0, 10)}...`);

            // Renegotiate after removing tracks
            const offer = await pc.createOffer();
            await pc.setLocalDescription(offer);
            signalingRef.current?.sendOffer(remotePeerId, offer);
            console.log(`[MultiPeer] ✅ Sent renegotiation offer after removing video to ${remotePeerId.slice(0, 10)}...`);
          } catch (err) {
            console.error(`[MultiPeer] ❌ Failed to renegotiate with ${remotePeerId.slice(0, 10)}...:`, err);
          }
        }

        onLocalStream(localStreamRef.current);
      } else if (videoEnabled && hasLiveVideoTrack) {
        // Enable existing live video tracks
        videoTracks.forEach(track => {
          if (track.readyState === 'live') {
            track.enabled = true;
          }
        });
        console.log(`[MultiPeer] Enabled existing video track(s)`);
      }
    };

    updateLocalMedia();
  }, [audioEnabled, videoEnabled]);

  // Initialize WebSocket signaling and join room
  useEffect(() => {
    if (!roomId || !participantId) return;

    let isActive = true;

    const initializeSignaling = async () => {
      try {
        // Create signaling connection
        const signaling = new SignalingWebSocket(roomId, participantId, token || null);
        signalingRef.current = signaling;

        // Set up event listeners
        signaling.on('participants-list', handleParticipantsList);
        signaling.on('participant-joined', handleParticipantJoined);
        signaling.on('participant-left', handleParticipantLeft);
        signaling.on('participant-metadata-updated', handleParticipantMetadataUpdated);
        signaling.on('offer', handleRemoteOffer);
        signaling.on('answer', handleRemoteAnswer);
        signaling.on('candidate', handleRemoteCandidate);

        // Connect to signaling server
        await signaling.connect();

        // Only proceed if component is still mounted
        if (!isActive) {
          console.log('[MultiPeer] Component unmounted during connection, cleaning up');
          signaling.close(false); // Don't send leave message (React Strict Mode)
          return;
        }

        console.log(`[MultiPeer] Signaling connected`);

        // Notify parent that signaling is ready
        if (onSignalingReady) {
          onSignalingReady(signaling);
        }

        // Send local participant metadata
        signaling.sendMetadata({
          name: participantName || `User ${participantId.slice(0, 8)}`,
          walletAddress: participantId,
          role: participantRole || 'guest'
        });

        setIsInitialized(true);
      } catch (err) {
        console.error('[MultiPeer] Failed to initialize signaling:', err);
      }
    };

    initializeSignaling();

    return () => {
      // Mark as inactive to prevent state updates after unmount
      isActive = false;

      // Capture the current signaling connection to clean up later
      const signalingToClose = signalingRef.current;

      // Add delay to avoid premature cleanup during React Strict Mode and page reloads
      // React Strict Mode remounts within 1-2ms, so 500ms delay allows the new mount
      // to establish before the old connection is cleaned up
      setTimeout(() => {
        // Only clean up if this is still the current connection
        // (if a new mount happened, signalingRef.current will be different)
        if (signalingToClose && signalingToClose === signalingRef.current) {
          cleanup();
        } else if (signalingToClose) {
          // This is a stale connection, just close it without full cleanup
          console.log('[MultiPeer] Closing stale connection from previous mount');
          signalingToClose.close(false);
        }
      }, 500);
    };
  }, [roomId, participantId, token]);

  const cleanup = () => {
    console.log('[MultiPeer] Cleaning up connections');

    // Close all peer connections
    peersRef.current.forEach((pc, peerId) => {
      pc.close();
    });
    peersRef.current.clear();
    peerStreamsRef.current.clear();
    peerInfoRef.current.clear();

    // Close signaling without sending leave message (React Strict Mode cleanup)
    // The backend will remove the participant when the WebSocket closes
    signalingRef.current?.close(false);
    signalingRef.current = null;

    setIsInitialized(false);
    notifyPeersChanged();
  };

  const handleParticipantsList = (message: any) => {
    const { participants } = message;
    console.log(`[MultiPeer] 🎬 Received participants list on join/reload: ${participants.length} existing participants`);
    console.log(`[MultiPeer] 📜 Full list:`, participants);

    // Create connections to all existing participants
    // Use lexicographic order to determine who initiates
    participants.forEach((p: ParticipantWithMetadata | string) => {
      const peerId = typeof p === 'string' ? p : p.participantId;
      const metadata = typeof p !== 'string' && p.metadata ? p.metadata : { walletAddress: peerId };

      console.log(`[MultiPeer] ➕ Adding existing participant: ${peerId.slice(0, 10)}... (${metadata.name || 'no name'})`);

      // Store metadata
      participantMetadataRef.current.set(peerId, metadata);

      // Add to online participants list
      onlineParticipantsRef.current.set(peerId, {
        participantId: peerId,
        metadata,
        connectionState: 'connecting',
        joinedAt: Date.now()
      });

      // Create peer connection
      if (!peersRef.current.has(peerId)) {
        const shouldInitiate = participantId < peerId;
        createPeerConnection(peerId, shouldInitiate);
      }
    });

    console.log(`[MultiPeer] ✨ After processing list - Total online: ${onlineParticipantsRef.current.size}`);
    notifyParticipantsChanged();
  };

  const handleParticipantJoined = (message: any) => {
    const { participantId: newPeerId } = message;
    console.log(`[MultiPeer] ✅ Participant joined: ${newPeerId.slice(0, 10)}...`);

    // Add to online participants list
    const metadata = participantMetadataRef.current.get(newPeerId) || { walletAddress: newPeerId };
    onlineParticipantsRef.current.set(newPeerId, {
      participantId: newPeerId,
      metadata,
      connectionState: 'connecting',
      joinedAt: Date.now()
    });

    console.log(`[MultiPeer] 📊 Total online participants: ${onlineParticipantsRef.current.size}`);
    console.log(`[MultiPeer] 📋 Participants list:`, Array.from(onlineParticipantsRef.current.keys()).map(id => id.slice(0, 10)));

    // Create connection if not already exists
    if (!peersRef.current.has(newPeerId)) {
      const shouldInitiate = participantId < newPeerId;
      createPeerConnection(newPeerId, shouldInitiate);
    }

    notifyParticipantsChanged();
  };

  const handleParticipantLeft = (message: any) => {
    const { participantId: leftPeerId } = message;
    console.log(`[MultiPeer] Participant left: ${leftPeerId.slice(0, 10)}...`);

    // Remove from online participants list
    onlineParticipantsRef.current.delete(leftPeerId);

    // Remove peer connection
    const pc = peersRef.current.get(leftPeerId);
    if (pc) {
      pc.close();
      peersRef.current.delete(leftPeerId);
      peerStreamsRef.current.delete(leftPeerId);
      peerInfoRef.current.delete(leftPeerId);
      participantMetadataRef.current.delete(leftPeerId);
      notifyPeersChanged();
    }

    notifyParticipantsChanged();
  };

  const handleParticipantMetadataUpdated = (message: any) => {
    const { participantId: peerId, metadata } = message;
    console.log(`[MultiPeer] Metadata updated for ${peerId.slice(0, 10)}...`);

    if (metadata) {
      participantMetadataRef.current.set(peerId, metadata);

      // Update online participant metadata
      const onlineParticipant = onlineParticipantsRef.current.get(peerId);
      if (onlineParticipant) {
        onlineParticipant.metadata = metadata;
      }

      // Update peer info
      const peerInfo = peerInfoRef.current.get(peerId);
      if (peerInfo) {
        peerInfo.metadata = metadata;
        notifyPeersChanged();
      }

      notifyParticipantsChanged();
    }
  };

  const handleRemoteOffer = async (message: any) => {
    const { from, data: offer } = message;
    console.log(`[MultiPeer] Received offer from ${from.slice(0, 10)}...`);

    let pc = peersRef.current.get(from);

    // If peer connection doesn't exist, create it (shouldn't happen normally)
    if (!pc) {
      console.log(`[MultiPeer] Creating peer connection for incoming offer from ${from.slice(0, 10)}...`);
      pc = createPeerConnection(from, false);
    }

    try {
      await pc.setRemoteDescription(new RTCSessionDescription(offer));
      const answer = await pc.createAnswer();
      await pc.setLocalDescription(answer);

      // Send answer via signaling
      signalingRef.current?.sendAnswer(from, answer);
      console.log(`[MultiPeer] Sent answer to ${from.slice(0, 10)}...`);
    } catch (err) {
      console.error(`[MultiPeer] Failed to handle offer from ${from.slice(0, 10)}...:`, err);
    }
  };

  const handleRemoteAnswer = async (message: any) => {
    const { from, data: answer } = message;
    console.log(`[MultiPeer] Received answer from ${from.slice(0, 10)}...`);

    const pc = peersRef.current.get(from);
    if (!pc) {
      console.warn(`[MultiPeer] No peer connection for ${from.slice(0, 10)}...`);
      return;
    }

    try {
      await pc.setRemoteDescription(new RTCSessionDescription(answer));
      console.log(`[MultiPeer] Set remote description (answer) for ${from.slice(0, 10)}...`);
    } catch (err) {
      console.error(`[MultiPeer] Failed to set remote description for ${from.slice(0, 10)}...:`, err);
    }
  };

  const handleRemoteCandidate = async (message: any) => {
    const { from, data: candidate } = message;

    const pc = peersRef.current.get(from);
    if (!pc) {
      console.warn(`[MultiPeer] No peer connection for candidate from ${from.slice(0, 10)}...`);
      return;
    }

    try {
      await pc.addIceCandidate(new RTCIceCandidate(candidate));
    } catch (err) {
      console.warn(`[MultiPeer] Failed to add ICE candidate from ${from.slice(0, 10)}...:`, err);
    }
  };

  const createPeerConnection = (remotePeerId: string, shouldInitiate: boolean): RTCPeerConnection => {
    console.log(`[MultiPeer] Creating peer connection to ${remotePeerId.slice(0, 10)}... (initiate: ${shouldInitiate})`);

    const pc = new RTCPeerConnection({ iceServers: ICE_SERVERS });
    peersRef.current.set(remotePeerId, pc);

    // Initialize peer info
    peerInfoRef.current.set(remotePeerId, {
      id: remotePeerId,
      stream: null,
      connectionState: pc.connectionState,
      iceConnectionState: pc.iceConnectionState
    });

    // Add local tracks to peer connection
    if (localStreamRef.current) {
      localStreamRef.current.getTracks().forEach(track => {
        pc.addTrack(track, localStreamRef.current!);
      });
    }

    // Handle remote tracks
    pc.ontrack = (event) => {
      console.log(`[MultiPeer] Received track from ${remotePeerId.slice(0, 10)}...: ${event.track.kind}`);

      let stream = peerStreamsRef.current.get(remotePeerId);
      if (!stream) {
        stream = new MediaStream();
        peerStreamsRef.current.set(remotePeerId, stream);
      }

      // Add track to stream
      if (!stream.getTracks().find(t => t.id === event.track.id)) {
        stream.addTrack(event.track);
      }

      // Update peer info
      const peerInfo = peerInfoRef.current.get(remotePeerId);
      if (peerInfo) {
        peerInfo.stream = stream;
      }

      notifyPeersChanged();
    };

    // Handle ICE candidates
    pc.onicecandidate = (event) => {
      if (event.candidate) {
        signalingRef.current?.sendCandidate(remotePeerId, event.candidate.toJSON());
      }
    };

    // Handle connection state changes
    pc.onconnectionstatechange = () => {
      console.log(`[MultiPeer] Connection to ${remotePeerId.slice(0, 10)}...: ${pc.connectionState}`);

      const peerInfo = peerInfoRef.current.get(remotePeerId);
      if (peerInfo) {
        peerInfo.connectionState = pc.connectionState;
        notifyPeersChanged();
      }

      // Update online participant connection state
      const onlineParticipant = onlineParticipantsRef.current.get(remotePeerId);
      if (onlineParticipant) {
        if (pc.connectionState === 'connected') {
          onlineParticipant.connectionState = 'connected';
        } else if (pc.connectionState === 'connecting' || pc.connectionState === 'new') {
          onlineParticipant.connectionState = 'connecting';
        } else if (pc.connectionState === 'failed' || pc.connectionState === 'closed' || pc.connectionState === 'disconnected') {
          onlineParticipant.connectionState = 'disconnected';
        }
        notifyParticipantsChanged();
      }

      if (pc.connectionState === 'failed' || pc.connectionState === 'closed') {
        // Clean up failed connection
        peersRef.current.delete(remotePeerId);
        peerStreamsRef.current.delete(remotePeerId);
        peerInfoRef.current.delete(remotePeerId);
        notifyPeersChanged();
      }
    };

    pc.oniceconnectionstatechange = () => {
      console.log(`[MultiPeer] ICE connection to ${remotePeerId.slice(0, 10)}...: ${pc.iceConnectionState}`);

      const peerInfo = peerInfoRef.current.get(remotePeerId);
      if (peerInfo) {
        peerInfo.iceConnectionState = pc.iceConnectionState;
        notifyPeersChanged();
      }
    };

    // If we should initiate, create and send offer
    if (shouldInitiate) {
      createAndSendOffer(remotePeerId, pc);
    }

    notifyPeersChanged();
    return pc;
  };

  const createAndSendOffer = async (remotePeerId: string, pc: RTCPeerConnection) => {
    try {
      const offer = await pc.createOffer();
      await pc.setLocalDescription(offer);
      signalingRef.current?.sendOffer(remotePeerId, offer);
      console.log(`[MultiPeer] Sent offer to ${remotePeerId.slice(0, 10)}...`);
    } catch (err) {
      console.error(`[MultiPeer] Failed to create/send offer to ${remotePeerId.slice(0, 10)}...:`, err);
    }
  };

  const notifyPeersChanged = () => {
    const peersMap = new Map<string, PeerInfo>();
    peerInfoRef.current.forEach((info, peerId) => {
      peersMap.set(peerId, {
        ...info,
        metadata: participantMetadataRef.current.get(peerId)
      });
    });
    onPeersChanged(peersMap);
  };

  const notifyParticipantsChanged = () => {
    if (onParticipantsChanged) {
      const participantsList = Array.from(onlineParticipantsRef.current.values());
      onParticipantsChanged(participantsList);
    }
  };

  return null; // This is a headless component
}