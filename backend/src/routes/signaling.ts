import { Router, Request, Response } from 'express';

// In-memory signaling store (development only)
type Candidate = any;
interface PeerSignals {
  offer?: { sdp: string; timestamp: number; from: string };
  answer?: { sdp: string; timestamp: number; from: string };
  candidates: Candidate[];
}

interface RoomSignals {
  peers: Record<string, PeerSignals>; // keyed by participant address
  // Track which candidates each peer has received (peerId -> Set of candidate identifiers)
  receivedCandidates: Map<string, Set<string>>;
}

const rooms: Record<string, RoomSignals> = {};

// Generate a unique identifier for a candidate (using candidate string as key)
function getCandidateId(candidate: Candidate): string {
  // Use the candidate string itself as the unique identifier
  // RTCIceCandidate objects have a 'candidate' property that uniquely identifies them
  return candidate.candidate || JSON.stringify(candidate);
}

const router = Router();

function ensureRoom(roomId: string): RoomSignals {
  if (!rooms[roomId]) {
    rooms[roomId] = { 
      peers: {},
      receivedCandidates: new Map<string, Set<string>>()
    };
  }
  return rooms[roomId];
}

function ensurePeer(roomId: string, participantId: string): PeerSignals {
  const room = ensureRoom(roomId);
  if (!room.peers[participantId]) {
    room.peers[participantId] = { 
      candidates: []
    };
  }
  return room.peers[participantId];
}

// Offer - peer-based
router.post('/:roomId/offer', (req: Request, res: Response) => {
  const { roomId } = req.params;
  const { sdp, from } = req.body;
  if (!sdp || !from) return res.status(400).json({ error: 'Missing sdp or from' });
  const peer = ensurePeer(roomId, from);
  peer.offer = { sdp, timestamp: Date.now(), from };
  console.log(`[Signaling] POST offer for room ${roomId} from ${from.slice(0, 10)}...`);
  res.json({ ok: true });
});

router.get('/:roomId/offer', (req: Request, res: Response) => {
  const { roomId } = req.params;
  const { exclude } = req.query as { exclude?: string }; // exclude current participant
  const r = ensureRoom(roomId); // Ensure room exists for polling
  
  // Find offer from any peer except the excluded one
  for (const [participantId, peer] of Object.entries(r.peers)) {
    if (participantId !== exclude && peer.offer) {
      console.log(`[Signaling] GET offer for room ${roomId.slice(0, 10)}... - found from ${participantId.slice(0, 10)}...`);
      return res.json(peer.offer);
    }
  }
  // No offer yet - this is normal during polling
  return res.status(200).json({ error: 'No offer' });
});

// Answer - peer-based
router.post('/:roomId/answer', (req: Request, res: Response) => {
  const { roomId } = req.params;
  const { sdp, from } = req.body;
  if (!sdp || !from) return res.status(400).json({ error: 'Missing sdp or from' });
  const peer = ensurePeer(roomId, from);
  peer.answer = { sdp, timestamp: Date.now(), from };
  console.log(`[Signaling] POST answer for room ${roomId} from ${from.slice(0, 10)}...`);
  res.json({ ok: true });
});

router.get('/:roomId/answer', (req: Request, res: Response) => {
  const { roomId } = req.params;
  const { exclude } = req.query as { exclude?: string }; // exclude current participant
  const r = ensureRoom(roomId); // Ensure room exists for polling
  
  // Find answer from any peer except the excluded one
  for (const [participantId, peer] of Object.entries(r.peers)) {
    if (participantId !== exclude && peer.answer) {
      console.log(`[Signaling] GET answer for room ${roomId.slice(0, 10)}... - found from ${participantId.slice(0, 10)}...`);
      return res.json(peer.answer);
    }
  }
  // No answer yet - this is normal during polling
  return res.status(200).json({ error: 'No answer' });
});

// ICE candidates - peer-based
router.post('/:roomId/candidates', (req: Request, res: Response) => {
  const { roomId } = req.params;
  const { candidate, from } = req.body as { candidate: Candidate; from: string };
  if (!candidate || !from) return res.status(400).json({ error: 'Missing candidate or from' });
  const peer = ensurePeer(roomId, from);
  peer.candidates.push(candidate);
  const candidateType = candidate.candidate?.includes('typ host') ? 'host' : 
                        candidate.candidate?.includes('typ srflx') ? 'srflx' : 
                        candidate.candidate?.includes('typ relay') ? 'relay' : 'unknown';
  console.log(`[Signaling] POST candidate for room ${roomId} from ${from.slice(0, 10)}... (type: ${candidateType}, total: ${peer.candidates.length})`);
  res.json({ ok: true });
});

router.get('/:roomId/candidates', (req: Request, res: Response) => {
  const { roomId } = req.params;
  const { exclude } = req.query as { exclude?: string }; // exclude current participant (requesting peer)
  
  if (!exclude) {
    console.log(`[Signaling] GET candidates for room ${roomId} - exclude param missing`);
    return res.status(400).json({ error: 'Exclude param required' });
  }
  
  // Ensure room exists (creates if first peer to poll)
  const r = ensureRoom(roomId);
  
  // Initialize tracking for this requesting peer if it doesn't exist
  if (!r.receivedCandidates.has(exclude)) {
    r.receivedCandidates.set(exclude, new Set<string>());
  }
  const receivedCandidateIds = r.receivedCandidates.get(exclude)!;
  
  // Collect NEW candidates from all peers except the excluded one
  const newCandidates: Candidate[] = [];
  const peerCount = Object.keys(r.peers).length;
  
  for (const [participantId, peer] of Object.entries(r.peers)) {
    if (participantId !== exclude && peer.candidates.length > 0) {
      for (const candidate of peer.candidates) {
        const candidateId = getCandidateId(candidate);
        // Only include candidates that this peer hasn't received yet
        if (!receivedCandidateIds.has(candidateId)) {
          newCandidates.push(candidate);
          receivedCandidateIds.add(candidateId);
        }
      }
    }
  }
  
  // Log polling activity
  const excludeShort = exclude.slice(0, 10);
  if (newCandidates.length > 0) {
    console.log(`[Signaling] GET candidates room=${roomId.slice(0, 10)}... peer=${excludeShort}... → ${newCandidates.length} new (tracked: ${receivedCandidateIds.size}, peers: ${peerCount})`);
  } else {
    // Only log every 10th poll to reduce noise
    const pollCount = (global as any).__pollCount || 0;
    (global as any).__pollCount = pollCount + 1;
    if (pollCount % 10 === 0) {
      console.log(`[Signaling] GET candidates room=${roomId.slice(0, 10)}... peer=${excludeShort}... → 0 new (tracked: ${receivedCandidateIds.size}, peers: ${peerCount}) [poll #${pollCount}]`);
    }
  }
  
  res.json({ candidates: newCandidates });
});

// Debug endpoint to inspect room state
router.get('/:roomId/debug', (req: Request, res: Response) => {
  const { roomId } = req.params;
  const existed = !!rooms[roomId];
  // Use ensureRoom to create if it doesn't exist (for debugging empty rooms)
  const r = ensureRoom(roomId);
  
  const peersInfo = Object.entries(r.peers).map(([id, peer]) => ({
    participantId: id,
    hasOffer: !!peer.offer,
    hasAnswer: !!peer.answer,
    candidatesCount: peer.candidates.length,
    offer: peer.offer,
    answer: peer.answer,
  }));
  
  // Convert Map to object for JSON serialization
  const receivedCandidatesInfo: Record<string, number> = {};
  for (const [peerId, candidateSet] of r.receivedCandidates.entries()) {
    receivedCandidatesInfo[peerId] = candidateSet.size;
  }
  
  res.json({
    roomId,
    existed, // Whether room existed before this call
    peers: peersInfo,
    totalPeers: Object.keys(r.peers).length,
    receivedCandidatesTracking: receivedCandidatesInfo,
    totalTrackedCandidates: Array.from(r.receivedCandidates.values()).reduce((sum, set) => sum + set.size, 0),
  });
});

// Debug endpoint to list all rooms
router.get('/debug/rooms', (req: Request, res: Response) => {
  const roomsList = Object.keys(rooms).map(roomId => {
    const room = rooms[roomId];
    return {
      roomId,
      totalPeers: Object.keys(room.peers).length,
      peerIds: Object.keys(room.peers),
      totalCandidates: Object.values(room.peers).reduce((sum, peer) => sum + peer.candidates.length, 0),
      totalTrackedCandidates: Array.from(room.receivedCandidates.values()).reduce((sum, set) => sum + set.size, 0),
    };
  });
  
  res.json({
    totalRooms: roomsList.length,
    rooms: roomsList,
  });
});

// End call / cleanup room signaling data
router.post('/:roomId/end', (req: Request, res: Response) => {
  const { roomId } = req.params;
  const { participantId } = req.body as { participantId?: string };
  
  if (!rooms[roomId]) {
    return res.json({ ok: true, message: 'Room already cleaned up' });
  }

  if (participantId) {
    // Remove specific participant's data
    delete rooms[roomId].peers[participantId];
    
    // Clean up tracking for this participant
    rooms[roomId].receivedCandidates.delete(participantId);
    
    console.log(`[Signaling] Participant ${participantId} left room ${roomId}`);
    
    // If no peers left, clean up entire room
    if (Object.keys(rooms[roomId].peers).length === 0) {
      delete rooms[roomId];
      console.log(`[Signaling] Room ${roomId} cleaned up (no participants left)`);
      return res.json({ ok: true, message: 'Room cleaned up' });
    }
    
    res.json({ ok: true, message: 'Participant left' });
  } else {
    // No participant ID - clean up entire room
    delete rooms[roomId];
    console.log(`[Signaling] Room ${roomId} cleaned up`);
    res.json({ ok: true, message: 'Room cleaned up' });
  }
});

export default router;