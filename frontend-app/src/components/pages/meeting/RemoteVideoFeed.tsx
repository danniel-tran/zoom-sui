"use client";
import React, { useEffect, useRef, useState } from 'react';

// Simple SVG icons
const MicrophoneIcon = ({ className }: { className?: string }) => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor" className={className}>
    <path d="M6 1a2 2 0 0 0-2 2v3a2 2 0 0 0 4 0V3a2 2 0 0 0-2-2z" />
    <path d="M3 5.5a3 3 0 0 0 6 0V5h1v.5a4 4 0 0 1-3.5 3.97V10h1.5v1h-5v-1H5V9.47A4 4 0 0 1 2 5.5V5h1v.5z" />
  </svg>
);

const VideoIcon = ({ className }: { className?: string }) => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor" className={className}>
    <path d="M1 2a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1H1zm8 1.5l2.5 2.5L9 8.5V3.5z" />
  </svg>
);

const FullscreenIcon = ({ className }: { className?: string }) => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" className={className}>
    <path d="M1.5 1a.5.5 0 0 0-.5.5v4a.5.5 0 0 1-1 0v-4A1.5 1.5 0 0 1 1.5 0h4a.5.5 0 0 1 0 1h-4zM10 .5a.5.5 0 0 1 .5-.5h4A1.5 1.5 0 0 1 16 1.5v4a.5.5 0 0 1-1 0v-4a.5.5 0 0 0-.5-.5h-4a.5.5 0 0 1-.5-.5zM.5 10a.5.5 0 0 1 .5.5v4a.5.5 0 0 0 .5.5h4a.5.5 0 0 1 0 1h-4A1.5 1.5 0 0 1 0 14.5v-4a.5.5 0 0 1 .5-.5zm15 0a.5.5 0 0 1 .5.5v4a1.5 1.5 0 0 1-1.5 1.5h-4a.5.5 0 0 1 0-1h4a.5.5 0 0 0 .5-.5v-4a.5.5 0 0 1 .5-.5z"/>
  </svg>
);

interface RemoteVideoFeedProps {
  stream?: MediaStream | null;
  participantId: string;
  label?: string;
  audioMuted?: boolean;
  videoMuted?: boolean;
  isSpeaking?: boolean;
  pinned?: boolean;
  reaction?: string | null;
  heightClass?: string;
  connectionState?: RTCPeerConnectionState;
}

/**
 * RemoteVideoFeed - For remote users' video streams (receive video)
 * Plays audio from remote participants
 */
const RemoteVideoFeed: React.FC<RemoteVideoFeedProps> = ({
  stream,
  participantId,
  label,
  audioMuted = false,
  videoMuted = false,
  isSpeaking = false,
  pinned = false,
  reaction = null,
  heightClass = 'h-64',
  connectionState,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [hasVideo, setHasVideo] = useState(false);
  const [hasAudio, setHasAudio] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Handle fullscreen toggle
  const toggleFullscreen = () => {
    if (!containerRef.current) return;

    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch(err => {
        console.error('[RemoteVideoFeed] Error attempting to enable fullscreen:', err);
      });
    } else {
      document.exitFullscreen();
    }
  };

  // Listen for fullscreen changes
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (stream) {
      // Set the stream
      video.srcObject = stream;

      // Function to update video/audio state
      const updateTrackState = () => {
        const videoTracks = stream.getVideoTracks();
        const audioTracks = stream.getAudioTracks();
        const hasVideoTrack = videoTracks.length > 0 && videoTracks.some(t => t.enabled);
        const hasAudioTrack = audioTracks.length > 0 && audioTracks.some(t => t.enabled);

        setHasVideo(hasVideoTrack);
        setHasAudio(hasAudioTrack);
        setIsConnected(videoTracks.length > 0 || audioTracks.length > 0);

        if (hasVideoTrack) {
          console.log(`[RemoteVideoFeed] Video track received from ${label || participantId.slice(0, 10)}`);
        }
        if (hasAudioTrack) {
          console.log(`[RemoteVideoFeed] Audio track received from ${label || participantId.slice(0, 10)}`);
        }
      };

      // Initial state check
      updateTrackState();

      // Play the video (with audio for remote participants)
      video.play().catch((err) => {
        console.error('[RemoteVideoFeed] Error playing video:', err);
      });

      // Handle track additions
      const handleAddTrack = (event: MediaStreamTrackEvent) => {
        console.log(`[RemoteVideoFeed] Track added from ${label || participantId.slice(0, 10)}: kind=${event.track.kind}`);
        if (video.srcObject !== stream) {
          video.srcObject = stream;
        }
        updateTrackState();
        video.play().catch((err) => {
          console.error('[RemoteVideoFeed] Error playing video after track addition:', err);
        });
      };

      // Handle track removals
      const handleRemoveTrack = (event: MediaStreamTrackEvent) => {
        console.log(`[RemoteVideoFeed] Track removed from ${label || participantId.slice(0, 10)}: kind=${event.track.kind}`);
        updateTrackState();
      };

      // Handle track state changes
      const handleTrackStateChange = () => {
        updateTrackState();
      };

      // Add event listeners
      stream.addEventListener('addtrack', handleAddTrack);
      stream.addEventListener('removetrack', handleRemoveTrack);

      stream.getTracks().forEach(track => {
        track.addEventListener('ended', handleTrackStateChange);
        track.addEventListener('mute', handleTrackStateChange);
        track.addEventListener('unmute', handleTrackStateChange);
      });

      // Cleanup
      return () => {
        stream.removeEventListener('addtrack', handleAddTrack);
        stream.removeEventListener('removetrack', handleRemoveTrack);
        stream.getTracks().forEach(track => {
          track.removeEventListener('ended', handleTrackStateChange);
          track.removeEventListener('mute', handleTrackStateChange);
          track.removeEventListener('unmute', handleTrackStateChange);
        });
      };
    } else {
      video.srcObject = null;
      setHasVideo(false);
      setHasAudio(false);
      setIsConnected(false);
    }
  }, [stream, label, participantId]);

  const borderClass = pinned
    ? 'ring-4 ring-blue-500'
    : isSpeaking
    ? 'ring-2 ring-green-400'
    : 'ring-0';

  const showVideoOff = videoMuted || !hasVideo;
  const showAudioMuted = audioMuted || !hasAudio;

  // Connection status indicator
  const connectionColor =
    connectionState === 'connected' ? 'bg-green-500' :
    connectionState === 'connecting' || connectionState === 'new' ? 'bg-yellow-500' :
    connectionState === 'failed' || connectionState === 'closed' ? 'bg-red-500' :
    'bg-gray-500';

  return (
    <div ref={containerRef} className={`w-full ${heightClass} bg-black rounded-lg overflow-hidden relative ${borderClass} group`}>
      <video
        ref={videoRef}
        className="w-full h-full object-cover"
        autoPlay
        playsInline
        muted={false} // Play audio from remote participants
      />
      {(!hasVideo || !isConnected) && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-900">
          <div className="text-center text-white">
            <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-2">
              <span className="text-2xl font-semibold">
                {label?.charAt(0).toUpperCase() || participantId.slice(0, 1).toUpperCase()}
              </span>
            </div>
            <p className="text-sm font-medium">{label || `User ${participantId.slice(0, 8)}`}</p>
            {!isConnected && (
              <p className="text-xs text-yellow-400 mt-1">Connecting...</p>
            )}
            {isConnected && !hasVideo && (
              <p className="text-xs text-gray-400 mt-1">Camera off</p>
            )}
          </div>
        </div>
      )}
      {label && hasVideo && (
        <div className="absolute bottom-2 left-2 bg-black/60 text-white px-2 py-1 rounded text-sm">
          {label}
        </div>
      )}
      <div className="absolute top-2 left-2 flex items-center gap-2">
        {showAudioMuted && (
          <span className="inline-flex items-center gap-1 bg-red-600/80 text-white text-xs px-2 py-1 rounded">
            <MicrophoneIcon className="w-3 h-3" />
            Muted
          </span>
        )}
        {showVideoOff && (
          <span className="inline-flex items-center gap-1 bg-gray-700/80 text-white text-xs px-2 py-1 rounded">
            <VideoIcon className="w-3 h-3" />
            Camera Off
          </span>
        )}
      </div>
      <div className="absolute top-2 right-2 flex items-center gap-2">
        {/* Connection status indicator */}
        <div className={`w-2 h-2 rounded-full ${connectionColor}`} title={connectionState || 'unknown'}></div>
        {reaction && (
          <span className="text-2xl select-none animate-bounce">
            {reaction}
          </span>
        )}
      </div>
      {/* Fullscreen button - appears on hover */}
      <button
        onClick={toggleFullscreen}
        className="absolute bottom-2 right-2 bg-black/60 hover:bg-black/80 text-white p-2 rounded opacity-0 group-hover:opacity-100 transition-opacity"
        title={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
      >
        <FullscreenIcon className="w-4 h-4" />
      </button>
    </div>
  );
};

export default RemoteVideoFeed;
