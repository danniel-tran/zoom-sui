"use client";
import React, { useState } from "react";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onStartShare: (opts: { audio: boolean; optimizeVideo: boolean }) => void;
  isSharing: boolean;
  onPause: () => void;
  onStop: () => void;
};

export default function ScreenShareModal({ isOpen, onClose, onStartShare, isSharing, onPause, onStop }: Props) {
  const [audio, setAudio] = useState(true);
  const [optimizeVideo, setOptimizeVideo] = useState(true);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />
      <div className="relative bg-gray-900 text-white rounded-lg border border-gray-700 w-[480px] p-4">
        <div className="text-lg font-semibold mb-2">Share Screen</div>
        <div className="text-sm text-gray-300 mb-4">
          The browser will prompt you to choose your entire screen, a window, or a tab.
        </div>
        <div className="space-y-3">
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" checked={audio} onChange={(e) => setAudio(e.target.checked)} /> Share system audio
          </label>
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" checked={optimizeVideo} onChange={(e) => setOptimizeVideo(e.target.checked)} /> Optimize for video clip
          </label>
        </div>
        <div className="mt-4 flex items-center justify-end gap-2">
          {!isSharing ? (
            <button
              onClick={() => onStartShare({ audio, optimizeVideo })}
              className="px-3 py-2 bg-blue-700 rounded"
            >
              Start Sharing
            </button>
          ) : (
            <>
              <button onClick={onPause} className="px-3 py-2 bg-gray-700 rounded">Pause Share</button>
              <button onClick={onStop} className="px-3 py-2 bg-red-700 rounded">Stop Share</button>
            </>
          )}
          <button onClick={onClose} className="px-3 py-2 bg-gray-800 rounded">Close</button>
        </div>
      </div>
    </div>
  );
}