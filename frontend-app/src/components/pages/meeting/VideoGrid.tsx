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
  // Layout Rules:
  // 1-2 participants: 2-column layout (large tiles)
  // 3-4 participants: 2x2 grid
  // 5-6 participants: 2x3 grid
  // 7-9 participants: 3x3 grid
  // 10+ participants: 3x4 grid (or paginated)
  let gridCols = 'grid-cols-1';
  let heightClass = 'h-64';

  if (totalParticipants === 1) {
    gridCols = 'grid-cols-1';
    heightClass = 'h-[500px]'; // Large single view
  } else if (totalParticipants === 2) {
    gridCols = 'grid-cols-1 md:grid-cols-2'; // 2-column layout
    heightClass = 'h-[400px]'; // Large tiles
  } else if (totalParticipants >= 3 && totalParticipants <= 4) {
    gridCols = 'grid-cols-2'; // 2x2 grid
    heightClass = 'h-64';
  } else if (totalParticipants >= 5 && totalParticipants <= 6) {
    gridCols = 'grid-cols-2 md:grid-cols-3'; // 2x3 grid
    heightClass = 'h-56';
  } else if (totalParticipants >= 7 && totalParticipants <= 9) {
    gridCols = 'grid-cols-3'; // 3x3 grid
    heightClass = 'h-48';
  } else {
    gridCols = 'grid-cols-3 md:grid-cols-4'; // 3x4 grid for 10+
    heightClass = 'h-40';
  }

  // Separate local and remote participants for ordering
  // Remote participants first, local "You" at the end (bottom-right)
  const remoteParticipants = remotePeersList.map(([peerId, peerInfo]) => ({
    id: peerId,
    isLocal: false as const,
    peerInfo,
  }));

  const localParticipant = {
    id: 'you',
    isLocal: true as const,
  };

  // Combine: remote first, then local (appears bottom-right in grid)
  const allParticipants: Array<
    | { id: string; isLocal: true }
    | { id: string; isLocal: false; peerInfo: PeerInfo }
  > = [...remoteParticipants, localParticipant];

  return (
    <div className={`grid gap-4 ${gridCols}`}>
      {allParticipants.map((participant) => {
        if (participant.isLocal) {
          // Local participant - always last (bottom-right position)
          return (
            <div key="you" onDoubleClick={() => onTogglePin('you')} className="cursor-pointer group relative">
              <div className="border border-gray-800 rounded-lg p-1 bg-black hover:border-blue-500 transition-colors">
                <LocalVideoFeed
                  stream={localStream}
                  label="You"
                  audioEnabled={audioEnabled}
                  videoEnabled={videoEnabled}
                  pinned={pinnedId === 'you'}
                  heightClass={heightClass}
                />
              </div>
            </div>
          );
        } else {
          // Remote participants
          const peerId = participant.id;
          const peerInfo = participant.peerInfo!;
          return (
            <div
              key={peerId}
              onDoubleClick={() => onTogglePin(peerId)}
              className="cursor-pointer group relative"
            >
              <div className="border border-gray-800 rounded-lg p-1 bg-black hover:border-gray-600 transition-colors">
                <RemoteVideoFeed
                  stream={peerInfo.stream}
                  participantId={peerId}
                  label={peerInfo.metadata?.name || `Peer ${peerId.slice(0, 8)}...`}
                  audioMuted={false}
                  videoMuted={false}
                  pinned={pinnedId === peerId}
                  heightClass={heightClass}
                  connectionState={peerInfo.connectionState}
                />
              </div>
            </div>
          );
        }
      })}

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