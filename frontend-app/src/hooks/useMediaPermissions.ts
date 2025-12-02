import { useEffect, useState, useCallback } from 'react';

export type PermissionState = 'prompt' | 'granted' | 'denied' | 'checking';

export interface MediaPermissionStatus {
  camera: PermissionState;
  microphone: PermissionState;
}

export interface UseMediaPermissionsResult {
  permissionStatus: MediaPermissionStatus;
  showPermissionModal: boolean;
  mediaError: string | null;
  requestMediaAccess: (requestVideo?: boolean, requestAudio?: boolean) => Promise<MediaStream | null>;
  setShowPermissionModal: (show: boolean) => void;
  skipPermissions: () => void;
}

export interface UseMediaPermissionsProps {
  localStream: MediaStream | null;
  setLocalStream: (stream: MediaStream | null) => void;
  pcRef: React.MutableRefObject<RTCPeerConnection | null>;
  setAudioEnabled: (enabled: boolean) => void;
  setVideoEnabled: (enabled: boolean) => void;
}

export function useMediaPermissions({
  localStream,
  setLocalStream,
  pcRef,
  setAudioEnabled,
  setVideoEnabled,
}: UseMediaPermissionsProps): UseMediaPermissionsResult {
  const [permissionStatus, setPermissionStatus] = useState<MediaPermissionStatus>({
    camera: 'prompt',
    microphone: 'prompt',
  });
  const [showPermissionModal, setShowPermissionModal] = useState(true);
  const [mediaError, setMediaError] = useState<string | null>(null);

  // Check current permissions on mount
  useEffect(() => {
    const checkPermissions = async () => {
      try {
        const cameraStatus = await navigator.permissions.query({ name: 'camera' as PermissionName });
        const microphoneStatus = await navigator.permissions.query({ name: 'microphone' as PermissionName });

        const newStatus: MediaPermissionStatus = {
          camera: cameraStatus.state === 'granted' ? 'granted' : cameraStatus.state === 'denied' ? 'denied' : 'prompt',
          microphone: microphoneStatus.state === 'granted' ? 'granted' : microphoneStatus.state === 'denied' ? 'denied' : 'prompt',
        };
        setPermissionStatus(newStatus);

        // If both are granted, auto-request media
        if (cameraStatus.state === 'granted' && microphoneStatus.state === 'granted') {
          // Will be called by the component
        }
      } catch (err) {
        console.warn('Permissions API not supported:', err);
      }
    };

    checkPermissions();
  }, []);

  const requestMediaAccess = useCallback(async (
    requestVideo: boolean = true,
    requestAudio: boolean = true
  ): Promise<MediaStream | null> => {
    if (!requestVideo && !requestAudio) return null;

    setPermissionStatus(prev => ({
      camera: requestVideo ? 'checking' : prev.camera,
      microphone: requestAudio ? 'checking' : prev.microphone,
    }));
    setMediaError(null);

    try {
      const constraints: MediaStreamConstraints = {
        video: requestVideo ? { width: 1280, height: 720 } : false,
        audio: requestAudio,
      };

      const stream = await navigator.mediaDevices.getUserMedia(constraints);

      // If we already have a stream, merge tracks
      if (localStream) {
        stream.getAudioTracks().forEach(track => {
          const existingTrack = localStream.getAudioTracks().find(t => t.id === track.id);
          if (!existingTrack) {
            localStream.addTrack(track);
          }
        });
        stream.getVideoTracks().forEach(track => {
          const existingTrack = localStream.getVideoTracks().find(t => t.id === track.id);
          if (!existingTrack) {
            localStream.addTrack(track);
          }
        });
        stream.getTracks().forEach(t => t.stop());
      } else {
        setLocalStream(stream);
      }

      // Add tracks to peer connection if it exists
      if (pcRef.current) {
        if (requestAudio) {
          const audioTrack = (localStream || stream).getAudioTracks()[0];
          if (audioTrack) {
            const sender = pcRef.current.getSenders().find(s => s.track?.kind === 'audio');
            if (sender) {
              sender.replaceTrack(audioTrack);
            } else {
              pcRef.current.addTrack(audioTrack, localStream || stream);
            }
          }
        }

        if (requestVideo) {
          const videoTrack = (localStream || stream).getVideoTracks()[0];
          if (videoTrack) {
            const sender = pcRef.current.getSenders().find(s => s.track?.kind === 'video');
            if (sender) {
              sender.replaceTrack(videoTrack);
            } else {
              pcRef.current.addTrack(videoTrack, localStream || stream);
            }
          }
        }
      }

      setPermissionStatus(prev => ({
        camera: requestVideo ? 'granted' : prev.camera,
        microphone: requestAudio ? 'granted' : prev.microphone,
      }));
      setShowPermissionModal(false);
      setMediaError(null);
      return localStream || stream;
    } catch (err: any) {
      console.error('Failed to get user media:', err);

      let errorMessage = 'Failed to access camera or microphone.';
      if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
        errorMessage = 'Camera and microphone access was denied. Please allow access in your browser settings.';
      } else if (err.name === 'NotFoundError' || err.name === 'DevicesNotFoundError') {
        errorMessage = 'No camera or microphone found. Please connect a device.';
      } else if (err.name === 'NotReadableError' || err.name === 'TrackStartError') {
        errorMessage = 'Camera or microphone is already in use by another application.';
      }

      setMediaError(errorMessage);
      setPermissionStatus(prev => ({
        camera: requestVideo ? 'denied' : prev.camera,
        microphone: requestAudio ? 'denied' : prev.microphone,
      }));
      return null;
    }
  }, [localStream, setLocalStream, pcRef]);

  const skipPermissions = useCallback(() => {
    setShowPermissionModal(false);
    setAudioEnabled(false);
    setVideoEnabled(false);
  }, [setAudioEnabled, setVideoEnabled]);

  return {
    permissionStatus,
    showPermissionModal,
    mediaError,
    requestMediaAccess,
    setShowPermissionModal,
    skipPermissions,
  };
}

