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

interface Props {
  stream?: MediaStream | null;
  label?: string;
  audioMuted?: boolean;
  videoMuted?: boolean;
  isSpeaking?: boolean;
  pinned?: boolean;
  reaction?: string | null;
  heightClass?: string;
  isLocal?: boolean; // Whether this is the local user's video (mute audio to prevent feedback)
}

const VideoFeed: React.FC<Props> = ({
  stream,
  label,
  audioMuted = false,
  videoMuted = false,
  isSpeaking = false,
  pinned = false,
  reaction = null,
  heightClass = 'h-64',
  isLocal = false,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hasVideo, setHasVideo] = useState(false);
  const [hasAudio, setHasAudio] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (stream) {
      // Set the stream
      video.srcObject = stream;
      
      // Check if stream has video/audio tracks
      const videoTracks = stream.getVideoTracks();
      const audioTracks = stream.getAudioTracks();
      setHasVideo(videoTracks.length > 0 && videoTracks[0].enabled);
      setHasAudio(audioTracks.length > 0 && audioTracks[0].enabled);

      // Play the video
      video.play().catch((err) => {
        console.error('Error playing video:', err);
      });

      // Handle track updates
      const handleTrackEnded = () => {
        setHasVideo(stream.getVideoTracks().some(t => t.enabled));
        setHasAudio(stream.getAudioTracks().some(t => t.enabled));
      };

      stream.getTracks().forEach(track => {
        track.addEventListener('ended', handleTrackEnded);
        track.addEventListener('mute', handleTrackEnded);
        track.addEventListener('unmute', handleTrackEnded);
      });

      // Cleanup
      return () => {
        stream.getTracks().forEach(track => {
          track.removeEventListener('ended', handleTrackEnded);
          track.removeEventListener('mute', handleTrackEnded);
          track.removeEventListener('unmute', handleTrackEnded);
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

  const showVideoMuted = videoMuted || !hasVideo;
  const showAudioMuted = audioMuted || !hasAudio;

  return (
    <div className={`w-full ${heightClass} bg-black rounded-lg overflow-hidden relative ${borderClass}`}>
      <video
        ref={videoRef}
        className="w-full h-full object-cover"
        autoPlay
        playsInline
        muted={isLocal}
      />
      {!hasVideo && stream && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-900">
          <div className="text-center text-white">
            <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-2">
              <span className="text-2xl">
                {label?.charAt(0).toUpperCase() || '?'}
              </span>
            </div>
            <p className="text-sm">{label || 'No video'}</p>
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
          <span className="inline-flex items-center gap-1 bg-black/60 text-white text-xs px-2 py-1 rounded">
            <MicrophoneIcon className="w-3 h-3" />
            Muted
          </span>
        )}
        {showVideoMuted && (
          <span className="inline-flex items-center gap-1 bg-black/60 text-white text-xs px-2 py-1 rounded">
            <VideoIcon className="w-3 h-3" />
            Video Off
          </span>
        )}
      </div>
      {reaction && (
        <div className="absolute top-2 right-2 text-2xl select-none">
          {reaction}
        </div>
      )}
    </div>
  );
};

export default VideoFeed;