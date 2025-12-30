import { useReducer, useCallback } from 'react';

interface MeetingUIState {
  showParticipants: boolean;
  showChat: boolean;
  showShareModal: boolean;
  captionsEnabled: boolean;
  pinnedId: string | null;
  speakerView: boolean;
}

type MeetingUIAction =
  | { type: 'TOGGLE_PARTICIPANTS' }
  | { type: 'TOGGLE_CHAT' }
  | { type: 'TOGGLE_SHARE_MODAL' }
  | { type: 'TOGGLE_CAPTIONS' }
  | { type: 'TOGGLE_SPEAKER_VIEW' }
  | { type: 'SET_PINNED_ID'; payload: string | null }
  | { type: 'CLOSE_ALL_PANELS' };

const initialState: MeetingUIState = {
  showParticipants: false,
  showChat: false,
  showShareModal: false,
  captionsEnabled: false,
  pinnedId: null,
  speakerView: false,
};

function meetingUIReducer(state: MeetingUIState, action: MeetingUIAction): MeetingUIState {
  switch (action.type) {
    case 'TOGGLE_PARTICIPANTS':
      return { ...state, showParticipants: !state.showParticipants };
    case 'TOGGLE_CHAT':
      return { ...state, showChat: !state.showChat };
    case 'TOGGLE_SHARE_MODAL':
      return { ...state, showShareModal: !state.showShareModal };
    case 'TOGGLE_CAPTIONS':
      return { ...state, captionsEnabled: !state.captionsEnabled };
    case 'TOGGLE_SPEAKER_VIEW':
      return { ...state, speakerView: !state.speakerView };
    case 'SET_PINNED_ID':
      return { ...state, pinnedId: action.payload };
    case 'CLOSE_ALL_PANELS':
      return { ...state, showParticipants: false, showChat: false, showShareModal: false };
    default:
      return state;
  }
}

/**
 * Custom hook to manage meeting UI state (panels, modals, view modes)
 */
export function useMeetingUI() {
  const [state, dispatch] = useReducer(meetingUIReducer, initialState);

  const toggleParticipants = useCallback(() => {
    dispatch({ type: 'TOGGLE_PARTICIPANTS' });
  }, []);

  const toggleChat = useCallback(() => {
    dispatch({ type: 'TOGGLE_CHAT' });
  }, []);

  const toggleShareModal = useCallback(() => {
    dispatch({ type: 'TOGGLE_SHARE_MODAL' });
  }, []);

  const toggleCaptions = useCallback(() => {
    dispatch({ type: 'TOGGLE_CAPTIONS' });
  }, []);

  const toggleSpeakerView = useCallback(() => {
    dispatch({ type: 'TOGGLE_SPEAKER_VIEW' });
  }, []);

  const setPinnedId = useCallback((id: string | null) => {
    dispatch({ type: 'SET_PINNED_ID', payload: id });
  }, []);

  const togglePin = useCallback((id: string) => {
    dispatch({ type: 'SET_PINNED_ID', payload: state.pinnedId === id ? null : id });
  }, [state.pinnedId]);

  const closeAllPanels = useCallback(() => {
    dispatch({ type: 'CLOSE_ALL_PANELS' });
  }, []);

  return {
    ...state,
    toggleParticipants,
    toggleChat,
    toggleShareModal,
    toggleCaptions,
    toggleSpeakerView,
    setPinnedId,
    togglePin,
    closeAllPanels,
  };
}
