"use client";
import React from "react";
import { LockClosedIcon, ReaderIcon } from "@radix-ui/react-icons";

type Props = {
  meetingTitle: string;
  elapsedSeconds: number;
  isSecure?: boolean;
  isRecording?: boolean;
  onToggleRecording?: () => void;
  captionsEnabled?: boolean;
  onToggleCaptions?: () => void;
};

export default function ConferenceHeader({
  meetingTitle,
  elapsedSeconds,
  isSecure = true,
  isRecording = false,
  onToggleRecording,
  captionsEnabled = false,
  onToggleCaptions,
}: Props) {
  const mins = Math.floor(elapsedSeconds / 60)
    .toString()
    .padStart(2, "0");
  const secs = (elapsedSeconds % 60).toString().padStart(2, "0");

  return (
    <div className="flex items-center justify-between px-4 py-2 bg-gray-900 text-white border-b border-gray-800">
      <div className="flex items-center gap-3">
        <span className="font-semibold">{meetingTitle}</span>
        <span className="text-sm text-gray-300">{mins}:{secs}</span>
        {isSecure && (
          <span title="Secure and encrypted" className="inline-flex items-center gap-1 text-green-400 text-sm">
            <LockClosedIcon /> Secure
          </span>
        )}
        {isRecording && (
          <span className="ml-2 inline-flex items-center gap-2 text-red-400 text-sm">
            <span className="inline-block w-2 h-2 rounded-full bg-red-500" /> Recording
          </span>
        )}
      </div>
      <div className="flex items-center gap-2">
        <button
          onClick={onToggleRecording}
          className={`px-3 py-1 rounded text-sm ${isRecording ? "bg-red-600" : "bg-gray-700"}`}
        >
          {isRecording ? "Stop Recording" : "Start Recording"}
        </button>
        <button
          onClick={onToggleCaptions}
          className={`px-3 py-1 rounded text-sm inline-flex items-center gap-2 ${captionsEnabled ? "bg-blue-700" : "bg-gray-700"}`}
        >
          <ReaderIcon /> {captionsEnabled ? "Captions On" : "Captions Off"}
        </button>
      </div>
    </div>
  );
}