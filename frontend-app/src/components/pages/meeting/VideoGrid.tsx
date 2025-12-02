"use client";
import React from 'react';
import LocalVideoFeed from './LocalVideoFeed';
import RemoteVideoFeed from './RemoteVideoFeed';
import { PeerInfo } from './MultiPeerConnection';

export interface VideoGridProps {
  localStream: MediaStream | null;
  remoteStream?: MediaStream | null; // Deprecated: kept for backward compatibility
  remotePeers?: Map<string, PeerInfo>; // New: multiple remote peers
  shareStream: MediaStream | null;
  audioEnabled: boolean;
  videoEnabled: boolean;
  pinnedId: string | null;
  onTogglePin: (id: string) => void;
  isSharing: boolean;
}

export default function VideoGrid({
  localStream,
  remoteStream,
  remotePeers,
  shareStream,
  audioEnabled,
  videoEnabled,
  pinnedId,
  onTogglePin,
  isSharing,
}: VideoGridProps) {
  // Convert remotePeers Map to array for rendering
  const remotePeersList = remotePeers ? Array.from(remotePeers.entries()) : [];

  if (isSharing) {
    return (
      <div className="grid grid-cols-12 gap-4">
        {/* Screen share - large view */}
        <div className="col-span-9">
          <div className="border border-gray-800 rounded-lg p-1 bg-black">
            <LocalVideoFeed
              stream={shareStream}
              label="Your Screen"
              audioEnabled={audioEnabled}
              videoEnabled={true}
              heightClass="h-[460px]"
            />
          </div>
        </div>

        {/* Participants - sidebar */}
        <div className="col-span-3 flex flex-col gap-3 overflow-y-auto max-h-[500px]">
          {/* Local participant */}
          <div onDoubleClick={() => onTogglePin('you')} className="cursor-pointer">
            <div className="border border-gray-800 rounded-lg p-1 bg-black">
              <LocalVideoFeed
                stream={localStream}
                label="You"
                audioEnabled={audioEnabled}
                videoEnabled={videoEnabled}
                pinned={pinnedId === 'you'}
                heightClass="h-32"
              />
            </div>
          </div>

          {/* Remote participants */}
          {remotePeersList.map(([peerId, peerInfo]) => (
            <div
              key={peerId}
              onDoubleClick={() => onTogglePin(peerId)}
              className="cursor-pointer"
            >
              <div className="border border-gray-800 rounded-lg p-1 bg-black">
                <RemoteVideoFeed
                  stream={peerInfo.stream}
                  participantId={peerId}
                  label={peerInfo.metadata?.name || `Peer ${peerId.slice(0, 8)}...`}
                  audioMuted={false}
                  videoMuted={false}
                  pinned={pinnedId === peerId}
                  heightClass="h-32"
                  connectionState={peerInfo.connectionState}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Grid view for all participants
  const totalParticipants = 1 + remotePeersList.length; // 1 (local) + remote peers

  // Determine grid layout based on number of participants
  let gridCols = 'grid-cols-1';
  if (totalParticipants === 2) {
    gridCols = 'grid-cols-1 sm:grid-cols-2';
  } else if (totalParticipants === 3) {
    gridCols = 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3';
  } else if (totalParticipants === 4) {
    gridCols = 'grid-cols-1 sm:grid-cols-2';
  } else if (totalParticipants >= 5) {
    gridCols = 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4';
  }

  return (
    <div className={`grid gap-4 ${gridCols}`}>
      {/* Local participant */}
      <div onDoubleClick={() => onTogglePin('you')} className="cursor-pointer">
        <div className="border border-gray-800 rounded-lg p-1 bg-black">
          <LocalVideoFeed
            stream={localStream}
            label="You"
            audioEnabled={audioEnabled}
            videoEnabled={videoEnabled}
            pinned={pinnedId === 'you'}
            heightClass="h-64"
          />
        </div>
      </div>

      {/* Remote participants */}
      {remotePeersList.map(([peerId, peerInfo]) => (
        <div
          key={peerId}
          onDoubleClick={() => onTogglePin(peerId)}
          className="cursor-pointer"
        >
          <div className="border border-gray-800 rounded-lg p-1 bg-black">
            <RemoteVideoFeed
              stream={peerInfo.stream}
              participantId={peerId}
              label={peerInfo.metadata?.name || `Peer ${peerId.slice(0, 8)}...`}
              audioMuted={false}
              videoMuted={false}
              pinned={pinnedId === peerId}
              heightClass="h-64"
              connectionState={peerInfo.connectionState}
            />
          </div>
        </div>
      ))}

      {/* Backward compatibility: show single remoteStream if no remotePeers provided */}
      {!remotePeers && remoteStream && (
        <div onDoubleClick={() => onTogglePin('peer')} className="cursor-pointer">
          <div className="border border-gray-800 rounded-lg p-1 bg-black">
            <RemoteVideoFeed
              stream={remoteStream}
              participantId="peer"
              label="Peer"
              audioMuted={false}
              videoMuted={false}
              pinned={pinnedId === 'peer'}
              heightClass="h-64"
            />
          </div>
        </div>
      )}
    </div>
  );
}