"use client";
import React from 'react';

interface Props {
  onEnd?: () => void;
  onToggleAudio?: () => void;
  onToggleVideo?: () => void;
  audioEnabled?: boolean;
  videoEnabled?: boolean;
}

const CallControls: React.FC<Props> = ({ onEnd, onToggleAudio, onToggleVideo, audioEnabled = true, videoEnabled = true }) => {
  return (
    <div className="flex justify-center space-x-4 mt-4">
      <button className="bg-red-500 text-white px-4 py-2 rounded-lg" onClick={onEnd}>End Call</button>
      <button className="bg-blue-500 text-white px-4 py-2 rounded-lg" onClick={onToggleAudio}>{audioEnabled ? 'Mute' : 'Unmute'}</button>
      <button className="bg-blue-500 text-white px-4 py-2 rounded-lg" onClick={onToggleVideo}>{videoEnabled ? 'Video Off' : 'Video On'}</button>
    </div>
  );
};

export default CallControls;