"use client";
import React, { useEffect, useRef } from 'react';
import { MicrophoneOffIcon, VideoOffIcon } from '@radix-ui/react-icons';

interface Props {
  stream?: MediaStream | null;
  label?: string;
  audioMuted?: boolean;
  videoMuted?: boolean;
  isSpeaking?: boolean;
  pinned?: boolean;
  reaction?: string | null;
  heightClass?: string;
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
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      if (stream) {
        videoRef.current.srcObject = stream;
      } else {
        videoRef.current.srcObject = null;
      }
    }
  }, [stream]);

  const borderClass = pinned
    ? 'ring-4 ring-blue-500'
    : isSpeaking
    ? 'ring-2 ring-green-400'
    : 'ring-0';

  return (
    <div className={`w-full ${heightClass} bg-black rounded-lg overflow-hidden relative ${borderClass}`}>
      <video
        ref={videoRef}
        className="w-full h-full object-cover"
        autoPlay
        playsInline
        muted={audioMuted}
      />
      {label && (
        <div className="absolute bottom-2 left-2 bg-black/60 text-white px-2 py-1 rounded text-sm">
          {label}
        </div>
      )}
      <div className="absolute top-2 left-2 flex items-center gap-2">
        {audioMuted && (
          <span className="inline-flex items-center gap-1 bg-black/60 text-white text-xs px-2 py-1 rounded">
            <MicrophoneOffIcon />
            Muted
          </span>
        )}
        {videoMuted && (
          <span className="inline-flex items-center gap-1 bg-black/60 text-white text-xs px-2 py-1 rounded">
            <VideoOffIcon />
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