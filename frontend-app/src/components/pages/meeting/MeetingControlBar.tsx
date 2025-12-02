"use client";
import React from 'react';
import ReactionsBar from './ReactionsBar';
import { Participant } from './ParticipantsPanel';

export interface MeetingControlBarProps {
  // Media controls
  audioEnabled: boolean;
  videoEnabled: boolean;
  onToggleAudio: () => void;
  onToggleVideo: () => void;
  
  // Screen share
  onOpenShareModal: () => void;
  
  // Panels
  onShowParticipants: () => void;
  onShowChat: () => void;
  
  // View
  speakerView: boolean;
  onToggleSpeakerView: () => void;
  
  // Host controls
  role: 'host' | 'guest';
  hostCapId: string | null;
  chainBusy: boolean;
  chainStatus: string | null;
  onStartRoomOnChain: () => void;
  
  // End call
  onEndCall: () => void;
  
  // Reactions
  onReact: (emoji: string) => void;
  onRaiseHand: () => void;
}

export default function MeetingControlBar({
  audioEnabled,
  videoEnabled,
  onToggleAudio,
  onToggleVideo,
  onOpenShareModal,
  onShowParticipants,
  onShowChat,
  speakerView,
  onToggleSpeakerView,
  role,
  hostCapId,
  chainBusy,
  chainStatus,
  onStartRoomOnChain,
  onEndCall,
  onReact,
  onRaiseHand,
}: MeetingControlBarProps) {
  return (
    <div className="fixed bottom-4 left-0 right-0 flex flex-col items-center gap-3">
      <ReactionsBar onReact={onReact} onRaiseHand={onRaiseHand} />
      
      <div className="flex items-center gap-3 bg-gray-900/90 text-white px-4 py-3 rounded-full border border-gray-800">
        <button
          onClick={onToggleAudio}
          className={`px-3 py-2 rounded ${audioEnabled ? 'bg-gray-700' : 'bg-red-700'}`}
        >
          {audioEnabled ? 'Mute' : 'Unmute'}
        </button>
        
        <button
          onClick={onToggleVideo}
          className={`px-3 py-2 rounded ${videoEnabled ? 'bg-gray-700' : 'bg-red-700'}`}
        >
          {videoEnabled ? 'Stop Video' : 'Start Video'}
        </button>
        
        <button
          onClick={onOpenShareModal}
          className="px-3 py-2 rounded bg-gray-700"
        >
          Share Screen
        </button>
        
        <button
          onClick={onShowParticipants}
          className="px-3 py-2 rounded bg-gray-700"
        >
          Participants
        </button>
        
        <button
          onClick={onShowChat}
          className="px-3 py-2 rounded bg-gray-700"
        >
          Chat
        </button>
        
        <button
          onClick={onToggleSpeakerView}
          className="px-3 py-2 rounded bg-gray-700"
        >
          {speakerView ? 'Speaker View' : 'Gallery View'}
        </button>
        
        {role === 'host' && (
          <button
            onClick={onStartRoomOnChain}
            disabled={chainBusy || !hostCapId}
            className="px-3 py-2 rounded bg-green-700 disabled:opacity-50"
          >
            Start On-Chain
          </button>
        )}
        
        <button
          onClick={onEndCall}
          className="px-3 py-2 rounded bg-red-700"
        >
          {role === 'host' ? 'End Meeting for All' : 'Leave'}
        </button>
      </div>
      
      {role === 'host' && chainStatus && (
        <div className="text-xs text-gray-300 bg-gray-800/70 px-3 py-1 rounded">
          {chainStatus}
        </div>
      )}
    </div>
  );
}

