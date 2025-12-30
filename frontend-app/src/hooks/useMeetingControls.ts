import { useRef, useState, useCallback } from 'react';
import { apiClient } from '@/lib/api';
import { uploadToWalrus } from '@/lib/walrus';

export interface UseMeetingControlsProps {
  roomId: string;
  participantId: string | undefined;
  pcRef: React.MutableRefObject<RTCPeerConnection | null> | null;
  localStream: MediaStream | null;
  setLocalStream: (stream: MediaStream | null) => void;
  remoteStream: MediaStream | null;
  shareStream: MediaStream | null;
  setShareStream: (stream: MediaStream | null) => void;
  requestMediaAccess: (video: boolean, audio: boolean) => Promise<MediaStream | null>;
}

export interface MeetingControlsState {
  audioEnabled: boolean;
  videoEnabled: boolean;
  isRecording: boolean;
  isSharing: boolean;
}

export interface MeetingControlsActions {
  toggleAudio: () => Promise<void>;
  toggleVideo: () => Promise<void>;
  startShare: (opts: { audio: boolean; optimizeVideo: boolean }) => Promise<void>;
  pauseShare: () => void;
  stopShare: () => void;
  startRecording: () => void;
  stopRecording: () => void;
  setAudioEnabled: (enabled: boolean) => void;
  setVideoEnabled: (enabled: boolean) => void;
}

export function useMeetingControls({
  roomId,
  participantId,
  pcRef,
  localStream,
  setLocalStream,
  remoteStream,
  shareStream,
  setShareStream,
  requestMediaAccess,
}: UseMeetingControlsProps): MeetingControlsState & MeetingControlsActions {
  const [audioEnabled, setAudioEnabled] = useState(false); // Default muted
  const [videoEnabled, setVideoEnabled] = useState(false); // Default OFF - request media when turning on
  const [isRecording, setIsRecording] = useState(false);

  const recorderRef = useRef<MediaRecorder | null>(null);
  const recordedChunksRef = useRef<BlobPart[]>([]);

  const isSharing = !!shareStream;

  // Helper to renegotiate connection
  const renegotiateConnection = useCallback(async () => {
    const pc = pcRef?.current;
    if (!pc || !participantId) return;
    if (pc.signalingState === 'closed' || pc.connectionState === 'closed') return;

    try {
      const offer = await pc.createOffer();
      await pc.setLocalDescription(offer);
      if (pc.localDescription) {
        await apiClient.postOffer(roomId, JSON.stringify(pc.localDescription), participantId);
      }
    } catch (err) {
      console.error('Error renegotiating connection:', err);
    }
  }, [roomId, participantId, pcRef]);

  const toggleAudio = useCallback(async () => {
    const enabled = !audioEnabled;

    // Confirm before enabling microphone for the first time
    if (enabled && !localStream?.getAudioTracks().length) {
      const confirmed = window.confirm('Allow access to your microphone?');
      if (!confirmed) {
        return;
      }
      const stream = await requestMediaAccess(videoEnabled, true);
      if (stream) {
        setAudioEnabled(true);
      }
      return;
    }

    setAudioEnabled(enabled);
    localStream?.getAudioTracks().forEach((t) => (t.enabled = enabled));
  }, [audioEnabled, localStream, videoEnabled, requestMediaAccess]);

  const toggleVideo = useCallback(async () => {
    const enabled = !videoEnabled;
    const pc = pcRef?.current;

    // Confirm before enabling camera
    if (enabled) {
      const confirmed = window.confirm('Allow access to your camera?');
      if (!confirmed) {
        return;
      }
    }

    if (enabled && !localStream?.getVideoTracks().length) {
      const stream = await requestMediaAccess(true, audioEnabled);
      if (stream) {
        setVideoEnabled(true);
        if (pc && stream.getVideoTracks().length > 0) {
          const videoTrack = stream.getVideoTracks()[0];
          const sender = pc.getSenders().find(s => s.track?.kind === 'video');
          if (sender) {
            await sender.replaceTrack(videoTrack);
          } else {
            pc.addTrack(videoTrack, stream);
          }
        }
      }
      return;
    }

    setVideoEnabled(enabled);

    if (localStream) {
      const videoTracks = localStream.getVideoTracks();

      if (enabled) {
        // Re-enable video tracks
        if (videoTracks.length === 0 || videoTracks.every(t => t.readyState === 'ended')) {
          try {
            const newStream = await navigator.mediaDevices.getUserMedia({ video: { width: 1280, height: 720 } });
            const newVideoTrack = newStream.getVideoTracks()[0];
            if (newVideoTrack) {
              localStream.addTrack(newVideoTrack);
              const updatedStream = new MediaStream([
                ...localStream.getAudioTracks(),
                ...localStream.getVideoTracks(),
              ]);
              setLocalStream(updatedStream);

              if (pc) {
                const sender = pc.getSenders().find(s => s.track?.kind === 'video');
                if (sender) {
                  await sender.replaceTrack(newVideoTrack);
                } else {
                  pc.addTrack(newVideoTrack, updatedStream);
                }
                await renegotiateConnection();
              }
            }
            newStream.getTracks().forEach(t => {
              if (t !== newVideoTrack) t.stop();
            });
          } catch (err: any) {
            console.error('Failed to get video track:', err);
            setVideoEnabled(false);

            // Provide user-friendly error messages
            let errorMessage = 'Failed to access camera.';
            if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
              errorMessage = 'Camera access denied. Please:\n\n1. Click the camera icon in your browser address bar\n2. Allow camera access for this site\n3. Reload the page and try again';
            } else if (err.name === 'NotFoundError' || err.name === 'DevicesNotFoundError') {
              errorMessage = 'No camera found. Please connect a camera and try again.';
            } else if (err.name === 'NotReadableError' || err.name === 'TrackStartError') {
              errorMessage = 'Camera is already in use by another application. Please close other apps using the camera and try again.';
            }

            alert(errorMessage);
            return;
          }
        } else {
          videoTracks.forEach((t) => {
            if (t.readyState !== 'ended') {
              t.enabled = true;
            }
          });

          if (pc) {
            const activeVideoTrack = videoTracks.find(t => t.readyState !== 'ended');
            if (activeVideoTrack) {
              const sender = pc.getSenders().find(s => s.track?.kind === 'video');
              if (!sender || sender.track !== activeVideoTrack) {
                if (sender) {
                  await sender.replaceTrack(activeVideoTrack);
                } else {
                  pc.addTrack(activeVideoTrack, localStream);
                }
                await renegotiateConnection();
              }
            }
          }
        }
      } else {
        // Stop video tracks completely to release camera
        videoTracks.forEach((t) => {
          t.stop(); // Fully stop and release camera
        });

        // Remove video tracks from peer connection
        if (pc) {
          const videoSenders = pc.getSenders().filter(s => s.track?.kind === 'video');
          videoSenders.forEach(sender => {
            pc.removeTrack(sender);
          });
          await renegotiateConnection();
        }

        // Update localStream to remove stopped video tracks
        if (localStream) {
          const audioTracks = localStream.getAudioTracks();
          if (audioTracks.length > 0) {
            // Keep audio-only stream
            const audioOnlyStream = new MediaStream(audioTracks);
            setLocalStream(audioOnlyStream);
          } else {
            // No audio either, clear stream
            setLocalStream(null);
          }
        }
      }
    }
  }, [videoEnabled, audioEnabled, localStream, pcRef, requestMediaAccess, setLocalStream, renegotiateConnection]);

  const startShare = useCallback(async ({ audio, optimizeVideo }: { audio: boolean; optimizeVideo: boolean }) => {
    try {
      const displayStream = await navigator.mediaDevices.getDisplayMedia({ video: true, audio });
      const vTrack = displayStream.getVideoTracks()[0];
      if (vTrack && optimizeVideo) {
        try {
          // @ts-ignore
          vTrack.contentHint = 'motion';
        } catch { }
      }
      setShareStream(displayStream);
      const pc = pcRef?.current;
      if (pc) {
        displayStream.getTracks().forEach((t) => pc.addTrack(t, displayStream));
      }
    } catch (e) {
      console.error('Screen share failed', e);
    }
  }, [pcRef, setShareStream]);

  const pauseShare = useCallback(() => {
    shareStream?.getTracks().forEach((t) => (t.enabled = false));
  }, [shareStream]);

  const stopShare = useCallback(() => {
    shareStream?.getTracks().forEach((t) => t.stop());
    setShareStream(null);
  }, [shareStream, setShareStream]);

  const getRecordingTargetStream = useCallback((): MediaStream | null => {
    return shareStream || remoteStream || localStream;
  }, [shareStream, remoteStream, localStream]);

  const startRecording = useCallback(() => {
    if (isRecording) return;
    const target = getRecordingTargetStream();
    if (!target) {
      alert('No stream available to record yet.');
      return;
    }
    try {
      recordedChunksRef.current = [];
      const mimeCandidates = [
        'video/webm;codecs=vp9',
        'video/webm;codecs=vp8',
        'video/webm',
      ];
      const mimeType = mimeCandidates.find((m) => MediaRecorder.isTypeSupported(m)) || '';
      const rec = new MediaRecorder(target, mimeType ? { mimeType } : undefined);
      rec.ondataavailable = (e) => {
        if (e.data && e.data.size > 0) recordedChunksRef.current.push(e.data);
      };
      rec.onstop = async () => {
        try {
          const blob = new Blob(recordedChunksRef.current, { type: mimeType || 'video/webm' });
          const filename = `meeting-${roomId}-${Date.now()}.webm`;
          const result = await uploadToWalrus(blob, filename);
          console.log('Walrus upload result:', result);
          alert('Recording uploaded to Walrus.' + (result?.id ? ` Blob ID: ${result.id}` : ''));
        } catch (err) {
          console.error('Upload failed', err);
          alert('Upload to Walrus failed. Check console for details.');
        }
      };
      recorderRef.current = rec;
      rec.start(1000);
      setIsRecording(true);
    } catch (e) {
      console.error('Recording start failed', e);
      alert('Unable to start recording.');
    }
  }, [isRecording, roomId, getRecordingTargetStream]);

  const stopRecording = useCallback(() => {
    try {
      const rec = recorderRef.current;
      if (rec && rec.state !== 'inactive') {
        rec.stop();
      }
    } finally {
      setIsRecording(false);
    }
  }, []);

  return {
    audioEnabled,
    videoEnabled,
    isRecording,
    isSharing,
    toggleAudio,
    toggleVideo,
    startShare,
    pauseShare,
    stopShare,
    startRecording,
    stopRecording,
    setAudioEnabled,
    setVideoEnabled,
  };
}

