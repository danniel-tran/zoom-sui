"use client";
import React, { useEffect, useRef, useState } from "react";
import { apiClient } from "@/lib/api";

export interface P2PConnectionProps {
  roomId: string;
  participantId: string; // Wallet address or unique participant identifier
  audioEnabled: boolean;
  videoEnabled: boolean;
  onLocalStream: (stream: MediaStream | null) => void;
  onRemoteStream: (stream: MediaStream | null) => void;
  onParticipants: (participants: Array<{ id: string; name: string; role: string; audioMuted: boolean; videoMuted: boolean }>) => void;
  onConnectionState?: (state: string) => void;
  onIceConnectionState?: (state: string) => void;
  onPeerReady?: (pc: RTCPeerConnection) => void;
}

const ICE_SERVERS: RTCIceServer[] = [
  { urls: "stun:stun.l.google.com:19302" },
  { urls: "stun:stun1.l.google.com:19302" },
  { urls: "stun:stun2.l.google.com:19302" }
];

/**
 * Establishes a symmetric peer-to-peer connection between users in a room.
 * Any participant can initiate or respond to offers/answers.
 * Handles polling for offers and answers, adding ice candidates, and setting up local and remote streams.
 *
 * @param {P2PConnectionProps} props - the props for the component
 * @param {string} props.roomId - the id of the room
 * @param {string} props.participantId - unique identifier for this participant (wallet address)
 * @param {boolean} props.audioEnabled - whether the user has audio enabled
 * @param {boolean} props.videoEnabled - whether the user has video enabled
 * @param {(stream: MediaStream | null) => void} props.onLocalStream - the callback for when the local stream is changed
 * @param {(stream: MediaStream | null) => void} props.onRemoteStream - the callback for when the remote stream is changed
 * @param {(participants: Array<{ id: string; name: string; role: string; audioMuted: boolean; videoMuted: boolean }>) => void} props.onParticipants - the callback for when the participants in the room change
 * @param {(state: string) => void} props.onConnectionState - the callback for when the connection state of the peer connection changes
 * @param {(state: string) => void} props.onIceConnectionState - the callback for when the ice connection state of the peer connection changes
 * @param {(pc: RTCPeerConnection) => void} props.onPeerReady - the callback for when the peer connection is ready
 */
export default function P2PConnection({
  roomId,
  participantId,
  audioEnabled,
  videoEnabled,
  onLocalStream,
  onRemoteStream,
  onParticipants,
  onConnectionState,
  onIceConnectionState,
  onPeerReady,
}: P2PConnectionProps) {
  const pcRef = useRef<RTCPeerConnection | null>(null);
  const [pcReady, setPcReady] = useState(false);
  const pollingRef = useRef<NodeJS.Timeout | null>(null);
  const candidatePollingRef = useRef<NodeJS.Timeout | null>(null);
  const audioEnabledRef = useRef<boolean>(audioEnabled);
  const videoEnabledRef = useRef<boolean>(videoEnabled);
  const remoteStreamRef = useRef<MediaStream | null>(null);
  const hasCreatedOfferRef = useRef<boolean>(false);
  const hasReceivedOfferRef = useRef<boolean>(false);
  const connectionEstablishedRef = useRef<boolean>(false);
  const queuedCandidatesRef = useRef<RTCIceCandidate[]>([]);

  // Function to process queued ICE candidates
  const processQueuedCandidates = async (pc: RTCPeerConnection) => {
    if (!pc || queuedCandidatesRef.current.length === 0) return;
    
    // Only process if we have a remote description set
    if (!pc.remoteDescription) return;
    
    console.log(`[P2PConnection] Processing ${queuedCandidatesRef.current.length} queued candidates`);
    const candidates = [...queuedCandidatesRef.current];
    queuedCandidatesRef.current = [];
    
    for (const candidate of candidates) {
      try {
        await pc.addIceCandidate(candidate);
        console.log(`[P2PConnection] Added queued candidate:`, candidate);
      } catch (err) {
        console.warn('[P2PConnection] Failed to add queued candidate:', err);
      }
    }
  };

  useEffect(() => {
    if (typeof window === "undefined") return;
    // Reset remote stream when creating new peer connection
    remoteStreamRef.current = null;
    onRemoteStream(null);
    // Reset connection state
    hasCreatedOfferRef.current = false;
    hasReceivedOfferRef.current = false;
    connectionEstablishedRef.current = false;
    queuedCandidatesRef.current = [];

    const pc = new RTCPeerConnection({ iceServers: ICE_SERVERS });

    const dataChannel = pc.createDataChannel("debugging channel");

    pc.addEventListener('datachannel', (event) => {
      const dataChannel = event.channel;
      console.log(`[P2PConnection] Data channel '${dataChannel.label}' received`);
    });


    pc.onconnectionstatechange = () => {
      console.log(`[P2PConnection] connectionState changed: ${pc.connectionState}`);
      onConnectionState?.(pc.connectionState);
    };

    pc.oniceconnectionstatechange = () => {
      console.log(`[P2PConnection] ICE connection state changed: ${pc.iceConnectionState}`);
      onIceConnectionState?.(pc.iceConnectionState);
    };

    pc.onsignalingstatechange = () => {
      console.log(`[P2PConnection] Signaling state changed: ${pc.signalingState}`);
      // Process queued candidates when signaling state becomes stable
      if (pc.signalingState === 'stable' && pc.remoteDescription) {
        processQueuedCandidates(pc);
      }
    };

    pc.ontrack = (event) => {
      console.log(`[P2PConnection] Received remote track: kind=${event.track.kind}, id=${event.track.id}, streams=${event.streams?.length || 0}`);

      // Initialize remote stream if it doesn't exist
      if (!remoteStreamRef.current) {
        remoteStreamRef.current = new MediaStream();
        console.log(`[P2PConnection] Created new remote stream`);
      }

      // Add the track to the existing remote stream
      const track = event.track;
      if (remoteStreamRef.current.getTracks().find(t => t.id === track.id)) {
        console.log(`[P2PConnection] Track ${track.id} already exists in remote stream, skipping`);
      } else {
        remoteStreamRef.current.addTrack(track);
        console.log(`[P2PConnection] Added ${track.kind} track to remote stream. Total tracks: ${remoteStreamRef.current.getTracks().length}`);
      }

      // Notify parent component of the updated stream
      onRemoteStream(remoteStreamRef.current);

      const you = { id: "you", name: "You", role: "participant", audioMuted: !audioEnabledRef.current, videoMuted: !videoEnabledRef.current };
      const peer = { id: "peer", name: "Peer", role: "participant", audioMuted: false, videoMuted: false };
      onParticipants([you, peer]);
    };

    pc.onicecandidate = async (event) => {
      if (event.candidate) {
        console.log(`[P2PConnection] Generated ICE candidate:`, event.candidate);
        try {
          await apiClient.postCandidate(roomId, event.candidate, participantId);
        } catch (err) {
          console.error('[P2PConnection] Failed to post candidate:', err);
        }
      } else {
        console.log(`[P2PConnection] ICE candidate gathering complete`);
      }
    };

    pc.addTransceiver("video", { direction: "recvonly" });
    pc.addTransceiver("audio", { direction: "recvonly" });

    pcRef.current = pc;
    setPcReady(true);
    onPeerReady?.(pc);
    return () => {
      try { pc.close(); } catch { }
      pcRef.current = null;
      setPcReady(false);
      // Clean up remote stream reference
      remoteStreamRef.current = null;
      onRemoteStream(null);
    };
  }, [roomId, participantId]);

  useEffect(() => { audioEnabledRef.current = audioEnabled; }, [audioEnabled]);
  useEffect(() => { videoEnabledRef.current = videoEnabled; }, [videoEnabled]);

  useEffect(() => {
    const setup = async () => {
      try {
        // Only request audio by default, video is OFF by default
        // Video will be requested when user turns it on
        const constraints: MediaStreamConstraints = {
          audio: audioEnabledRef.current,
          video: videoEnabledRef.current ? { width: 1280, height: 720 } : false,
        };

        // Only request media if at least one is enabled
        if (constraints.audio || constraints.video) {
          const stream = await navigator.mediaDevices.getUserMedia(constraints);
          onLocalStream(stream);
          const pc = pcRef.current;
          if (pc) {
            stream.getTracks().forEach((t) => pc.addTrack(t, stream));
          }
          stream.getTracks().forEach((t) => {
            t.onended = () => {
              const ms = new MediaStream(stream.getTracks().filter((tr) => tr.readyState !== "ended"));
              onLocalStream(ms);
            };
            t.onmute = () => onLocalStream(stream);
            t.onunmute = () => onLocalStream(stream);
          });
        }

        onParticipants([
          { id: "you", name: "You", role: "participant", audioMuted: !audioEnabledRef.current, videoMuted: !videoEnabledRef.current },
        ]);

        // Symmetric signaling: check for existing offer, or create one
        await initiateConnection();
      } catch (err) {
        console.error('[P2PConnection] Failed to get user media:', err);
        // Still try to initiate connection even without local media
        await initiateConnection();
      }
    };
    if (pcReady) {
      setup();
    }
    return () => {
      stopPolling();
    };
  }, [pcReady]);

  const initiateConnection = async () => {
    if (connectionEstablishedRef.current) return;
    
    const pc = pcRef.current;
    if (!pc) return;

    try {
      // Check for existing offer from another participant
      const existingOffer = await apiClient.getOffer(roomId, participantId);
      
      if (existingOffer && existingOffer.from !== participantId) {
        // Another participant created an offer, respond with answer
        console.log(`[P2PConnection] Found offer from ${existingOffer.from}, creating answer`);
        hasReceivedOfferRef.current = true;
        
        if (pc.signalingState === "stable") {
          const offerDesc = JSON.parse(existingOffer.sdp);
          console.log(`[P2PConnection] Setting remote description (offer)`);
          await pc.setRemoteDescription(offerDesc);
          
          // Process any queued candidates
          await processQueuedCandidates(pc);
          
          console.log(`[P2PConnection] Creating answer`);
          const answer = await pc.createAnswer();
          console.log(`[P2PConnection] Setting local description (answer)`);
          await pc.setLocalDescription(answer);
          await apiClient.postAnswer(roomId, JSON.stringify(answer), participantId);
          startCandidatePolling();
          connectionEstablishedRef.current = true;
        }
      } else if (!hasCreatedOfferRef.current) {
        // No offer exists yet, create one
        console.log(`[P2PConnection] No existing offer, creating offer`);
        hasCreatedOfferRef.current = true;
        const offer = await pc.createOffer();
        console.log(`[P2PConnection] Setting local description (offer)`);
        await pc.setLocalDescription(offer);
        await apiClient.postOffer(roomId, JSON.stringify(offer), participantId);
        // Start polling for answer and candidates
        startPollingForAnswer();
        startCandidatePolling(); // Start collecting candidates immediately
      }
    } catch (err) {
      console.error('[P2PConnection] Error initiating connection:', err);
    }
  };

  const startPollingForAnswer = () => {
    stopPolling();
    pollingRef.current = setInterval(async () => {
      try {
        if (connectionEstablishedRef.current) {
          stopPolling();
          return;
        }

        const ans = await apiClient.getAnswer(roomId, participantId);
        if (ans?.sdp && ans.from !== participantId) {
          const pc = pcRef.current;
          if (!pc) return;
          if (pc.signalingState !== "have-local-offer") {
            console.log(`[P2PConnection] Signaling state is ${pc.signalingState}, waiting for have-local-offer`);
            return;
          }
          
          console.log(`[P2PConnection] Received answer from ${ans.from}`);
          const answerDesc = JSON.parse(ans.sdp);
          console.log(`[P2PConnection] Setting remote description (answer)`);
          await pc.setRemoteDescription(answerDesc);
          
          // Process any queued candidates
          await processQueuedCandidates(pc);
          
          startCandidatePolling();
          stopPolling();
          connectionEstablishedRef.current = true;
        }
      } catch (err) {
        console.error('[P2PConnection] Error polling for answer:', err);
        // Continue polling
      }
    }, 1500);
  };

  const startCandidatePolling = () => {
    if (candidatePollingRef.current) {
      clearInterval(candidatePollingRef.current);
    }
    const intv = setInterval(async () => {
      try {
        const { candidates } = await apiClient.getCandidates(roomId, participantId);
        if (candidates.length > 0) {
          console.log(`[P2PConnection] Fetched ${candidates.length} candidates from other participants`);
        }
        const pc = pcRef.current;
        if (!pc) return;
        
        for (const c of candidates) {
          try {
            // If remote description is not set yet, queue the candidate
            if (!pc.remoteDescription) {
              console.log(`[P2PConnection] Queuing candidate (no remote description yet)`);
              queuedCandidatesRef.current.push(c);
              continue;
            }
            
            await pc.addIceCandidate(c);
            console.log(`[P2PConnection] Added ICE candidate:`, c.candidate);
          } catch (ex) {
            // If error is about remote description not set, queue it
            if (ex instanceof Error && ex.message.includes('remote description')) {
              console.log(`[P2PConnection] Queuing candidate (remote description not ready)`);
              queuedCandidatesRef.current.push(c);
            } else {
              console.warn('[P2PConnection] Failed to add candidate:', ex);
            }
          }
        }
      } catch (err) {
        console.error('[P2PConnection] Error fetching candidates:', err);
      }
    }, 1500);
    candidatePollingRef.current = intv as unknown as NodeJS.Timeout;
  };

  const stopPolling = () => {
    if (pollingRef.current) {
      clearInterval(pollingRef.current);
      pollingRef.current = null;
    }
  };

  return null;
}