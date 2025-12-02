"use client";
import React, { useState } from "react";
import { ChatBubbleIcon, PaperPlaneIcon } from "@radix-ui/react-icons";

export type ChatMessage = {
  id: string;
  from: string;
  to: "Everyone" | "Hosts" | string;
  text: string;
  time: number;
};

type Props = {
  isOpen: boolean;
  onClose: () => void;
  messages: ChatMessage[];
  onSend: (msg: Omit<ChatMessage, "id" | "time">) => void;
  participants: { id: string; name: string; role: string }[];
};

export default function ChatPanel({ isOpen, onClose, messages, onSend, participants }: Props) {
  const [text, setText] = useState("");
  const [to, setTo] = useState<string>("Everyone");

  if (!isOpen) return null;

  const handleSend = () => {
    const trimmed = text.trim();
    if (!trimmed) return;
    onSend({ from: "You", to, text: trimmed });
    setText("");
  };

  return (
    <aside className="fixed left-0 top-0 bottom-0 w-80 bg-gray-900 text-white border-r border-gray-800 z-40">
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-800">
        <div className="flex items-center gap-2"><ChatBubbleIcon /> Chat</div>
        <button onClick={onClose} className="text-sm px-2 py-1 bg-gray-700 rounded">Close</button>
      </div>
      <div className="flex flex-col h-full">
        <div className="flex-1 overflow-y-auto p-3 space-y-2">
          {messages.map((m) => (
            <div key={m.id} className="text-sm">
              <span className="text-gray-400">[{new Date(m.time).toLocaleTimeString()}]</span> <strong>{m.from}</strong> ➜ <em>{m.to}</em>: {m.text}
            </div>
          ))}
        </div>
        <div className="border-t border-gray-800 p-3 space-y-2">
          <div className="flex items-center gap-2">
            <label className="text-xs text-gray-300">To</label>
            <select
              value={to}
              onChange={(e) => setTo(e.target.value)}
              className="flex-1 bg-gray-800 text-white text-sm px-2 py-1 rounded"
            >
              <option value="Everyone">Everyone</option>
              <option value="Hosts">Hosts</option>
              {participants.map((p) => (
                <option key={p.id} value={p.name}>{p.name}</option>
              ))}
            </select>
          </div>
          <div className="flex items-center gap-2">
            <input
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Type a message..."
              className="flex-1 bg-gray-800 text-white text-sm px-2 py-2 rounded"
            />
            <button onClick={handleSend} className="px-3 py-2 bg-blue-700 rounded inline-flex items-center gap-2">
              <PaperPlaneIcon /> Send
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
}