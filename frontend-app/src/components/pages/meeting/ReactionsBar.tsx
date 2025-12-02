"use client";
import React from "react";

type Props = {
  onReact: (emoji: string) => void;
  onRaiseHand: () => void;
};

export default function ReactionsBar({ onReact, onRaiseHand }: Props) {
  const emojis = ["👍", "👏", "😂", "❤️", "🎉", "😮"];
  return (
    <div className="flex items-center gap-2 bg-gray-900/80 text-white px-3 py-2 rounded-full">
      {emojis.map((e) => (
        <button key={e} onClick={() => onReact(e)} className="px-2 py-1 hover:bg-gray-800 rounded">
          {e}
        </button>
      ))}
      <button onClick={onRaiseHand} className="ml-2 px-3 py-1 bg-blue-700 rounded">Raise Hand ✋</button>
    </div>
  );
}