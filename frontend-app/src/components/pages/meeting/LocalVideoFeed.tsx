"use client";
import React, { useEffect, useRef, useState } from 'react';

// Simple SVG icons for microphone and video
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

interface LocalVideoFeedProps {
  stream?: MediaStream | null;
  label?: string;
  audioEnabled: boolean;
  videoEnabled: boolean;
  isSpeaking?: boolean;
  pinned?: boolean;
  reaction?: string | null;
  heightClass?: string;
}

/**
 * LocalVideoFeed - For the current user's video stream (send video)
 * Always mutes audio playback to prevent feedback
 */
const LocalVideoFeed: React.FC<LocalVideoFeedProps> = ({
  stream,
  label = 'You',
  audioEnabled,
  videoEnabled,
  isSpeaking = false,
  pinned = false,
  reaction = null,
  heightClass = 'h-64',
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [hasVideo, setHasVideo] = useState(false);
  const [hasAudio, setHasAudio] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Handle fullscreen toggle
  const toggleFullscreen = () => {
    if (!containerRef.current) return;

    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch(err => {
        console.error('[LocalVideoFeed] Error attempting to enable fullscreen:', err);
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

        if (hasVideoTrack) {
          console.log(`[LocalVideoFeed] Video track detected. Video should appear now.`);
        }
        if (hasAudioTrack) {
          console.log(`[LocalVideoFeed] Audio track detected (muted for feedback prevention).`);
        }
      };

      // Initial state check
      updateTrackState();

      // Play the video
      video.play().catch((err) => {
        console.error('[LocalVideoFeed] Error playing video:', err);
      });

      // Handle track additions
      const handleAddTrack = (event: MediaStreamTrackEvent) => {
        console.log(`[LocalVideoFeed] Track added: kind=${event.track.kind}, id=${event.track.id}`);
        if (video.srcObject !== stream) {
          video.srcObject = stream;
        }
        updateTrackState();
        video.play().catch((err) => {
          console.error('[LocalVideoFeed] Error playing video after track addition:', err);
        });
      };

      // Handle track removals
      const handleRemoveTrack = (event: MediaStreamTrackEvent) => {
        console.log(`[LocalVideoFeed] Track removed: kind=${event.track.kind}, id=${event.track.id}`);
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
    }
  }, [stream]);

  const borderClass = pinned
    ? 'ring-4 ring-blue-500'
    : isSpeaking
    ? 'ring-2 ring-green-400'
    : 'ring-0';

  const showVideoOff = !videoEnabled || !hasVideo;
  const showAudioMuted = !audioEnabled || !hasAudio;

  return (
    <div ref={containerRef} className={`w-full ${heightClass} bg-black rounded-lg overflow-hidden relative ${borderClass} group`}>
      <video
        ref={videoRef}
        className="w-full h-full object-cover"
        autoPlay
        playsInline
        muted={true} // Always mute local audio to prevent feedback
      />
      {!hasVideo && stream && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-900">
          <div className="text-center text-white">
            <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-2">
              <span className="text-2xl font-semibold">
                {label.charAt(0).toUpperCase()}
              </span>
            </div>
            <p className="text-sm font-medium">{label}</p>
            <p className="text-xs text-gray-400 mt-1">Camera off</p>
          </div>
        </div>
      )}
      {label && hasVideo && (
        <div className="absolute bottom-2 left-2 bg-blue-600/80 text-white px-2 py-1 rounded text-sm font-medium">
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
      {/* Fullscreen button - appears on hover */}
      <button
        onClick={toggleFullscreen}
        className="absolute bottom-2 right-2 bg-black/60 hover:bg-black/80 text-white p-2 rounded opacity-0 group-hover:opacity-100 transition-opacity"
        title={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
      >
        <FullscreenIcon className="w-4 h-4" />
      </button>
      {reaction && (
        <div className="absolute top-2 right-2 text-3xl select-none animate-bounce">
          {reaction}
        </div>
      )}
    </div>
  );
};

export default LocalVideoFeed;
