"use client";
import React from "react";
import {
  PersonIcon,
  MicrophoneIcon,
  MicrophoneOffIcon,
  VideoIcon,
  VideoOffIcon,
  TrashIcon,
  StarIcon,
} from "@radix-ui/react-icons";

export type Participant = {
  id: string;
  name: string;
  role: "host" | "co-host" | "guest";
  audioMuted: boolean;
  videoMuted: boolean;
  raisedHand?: boolean;
  inLobby?: boolean;
};

type Props = {
  isOpen: boolean;
  onClose: () => void;
  participants: Participant[];
  onToggleMute: (id: string) => void;
  onToggleVideo: (id: string) => void;
  onRemove: (id: string) => void;
  onMakeCoHost: (id: string) => void;
  onAdmit: (id: string) => void;
};

export default function ParticipantsPanel({
  isOpen,
  onClose,
  participants,
  onToggleMute,
  onToggleVideo,
  onRemove,
  onMakeCoHost,
  onAdmit,
}: Props) {
  if (!isOpen) return null;
  const lobby = participants.filter((p) => p.inLobby);
  const inRoom = participants.filter((p) => !p.inLobby);

  return (
    <aside className="fixed right-0 top-0 bottom-0 w-80 bg-gray-900 text-white border-l border-gray-800 z-40">
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-800">
        <div className="flex items-center gap-2">
          <PersonIcon /> Participants ({inRoom.length})
        </div>
        <button onClick={onClose} className="text-sm px-2 py-1 bg-gray-700 rounded">Close</button>
      </div>

      {lobby.length > 0 && (
        <div className="px-4 py-3 border-b border-gray-800">
          <div className="text-sm text-gray-300 mb-2">Waiting Room</div>
          <ul className="space-y-2">
            {lobby.map((p) => (
              <li key={p.id} className="flex items-center justify-between">
                <span>{p.name}</span>
                <div className="flex items-center gap-2">
                  <button onClick={() => onAdmit(p.id)} className="px-2 py-1 bg-blue-700 rounded text-sm">Admit</button>
                  <button onClick={() => onRemove(p.id)} className="px-2 py-1 bg-gray-700 rounded text-sm">Remove</button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="px-4 py-3">
        <ul className="space-y-3">
          {inRoom.map((p) => (
            <li key={p.id} className="flex items-center justify-between">
              <div>
                <div className="font-medium">
                  {p.name} <span className="text-xs text-gray-400">({p.role})</span> {p.raisedHand && <span title="Raised hand">✋</span>}
                </div>
                <div className="text-xs text-gray-400 flex items-center gap-2">
                  {p.audioMuted ? <MicrophoneOffIcon /> : <MicrophoneIcon />}
                  {p.videoMuted ? <VideoOffIcon /> : <VideoIcon />}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => onToggleMute(p.id)} className="px-2 py-1 bg-gray-700 rounded text-sm">
                  {p.audioMuted ? "Unmute" : "Mute"}
                </button>
                <button onClick={() => onToggleVideo(p.id)} className="px-2 py-1 bg-gray-700 rounded text-sm">
                  {p.videoMuted ? "Start Video" : "Stop Video"}
                </button>
                <button onClick={() => onMakeCoHost(p.id)} className="px-2 py-1 bg-gray-700 rounded text-sm inline-flex items-center gap-1">
                  <StarIcon /> Co-host
                </button>
                <button onClick={() => onRemove(p.id)} className="px-2 py-1 bg-gray-700 rounded text-sm inline-flex items-center gap-1">
                  <TrashIcon /> Remove
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}