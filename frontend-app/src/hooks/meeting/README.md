# Meeting Hooks

Custom React hooks for managing meeting-related functionality.

## 📁 Structure

```
hooks/meeting/
├── index.ts                # Barrel export for all hooks
├── useMeetingAuth.ts       # Authentication state machine
├── useMeetingRoom.ts       # Room data and role management
├── useMeetingUI.ts         # UI state (panels, modals, view modes)
└── useMeetingTimer.ts      # Optimized meeting timer
```

## 🎯 Hooks Overview

### `useMeetingAuth(roomId: string)`

Manages the complete authentication flow for joining a meeting.

**Features:**
- State machine with clear transitions: `idle` → `validating-seal` → `creating-session` → `authenticated`
- Seal-based access control validation
- Backend JWT session creation
- Automatic token management
- Comprehensive error handling

**Usage:**
```typescript
const {
  authState,        // Current auth state
  authToken,        // JWT access token
  authError,        // Error message if any
  isAuthenticated,  // Boolean helper
  isAuthenticating, // Loading state
  clearAuth         // Logout function
} = useMeetingAuth(roomId);
```

**States:**
- `idle` - Initial state, waiting to start
- `validating-seal` - Checking Seal access control
- `creating-session` - Creating backend session with wallet signature
- `authenticated` - Successfully authenticated
- `error` - Authentication failed

---

### `useMeetingRoom(roomId: string)`

Loads and manages room data from both backend (indexed) and blockchain (authoritative).

**Features:**
- Fetches room data from backend API (fast)
- Fetches fresh hosts list from blockchain
- Merges both data sources
- Determines user role (host vs guest)
- Automatic refetching on roomId change

**Usage:**
```typescript
const {
  room,      // Room data (merged backend + blockchain)
  role,      // User's role: 'host' | 'guest'
  loading,   // Loading state
  error,     // Error message if any
  refetch    // Manual refetch function
} = useMeetingRoom(roomId);
```

**Role Determination:**
1. Checks blockchain `hosts` array (authoritative)
2. Fallback to `owner` field from backend
3. Defaults to `'guest'` if neither matches

---

### `useMeetingUI()`

Manages all UI state for panels, modals, and view modes using a reducer pattern.

**Features:**
- Centralized UI state management
- Action-based state updates
- No prop drilling
- Easy to extend

**Usage:**
```typescript
const {
  // State
  showParticipants,
  showChat,
  showShareModal,
  captionsEnabled,
  pinnedId,
  speakerView,

  // Actions
  toggleParticipants,
  toggleChat,
  toggleShareModal,
  toggleCaptions,
  toggleSpeakerView,
  setPinnedId,
  togglePin,
  closeAllPanels
} = useMeetingUI();
```

**Example:**
```typescript
<button onClick={ui.toggleParticipants}>
  Show Participants
</button>

<ParticipantsPanel
  isOpen={ui.showParticipants}
  onClose={ui.toggleParticipants}
/>
```

---

### `useMeetingTimer()`

Optimized timer for tracking meeting duration.

**Features:**
- Minimal re-renders (only updates once per second)
- Automatic cleanup
- Reset capability
- Uses refs internally for performance

**Usage:**
```typescript
const {
  elapsedSeconds,  // Seconds since meeting started
  reset            // Reset timer to 0
} = useMeetingTimer();

// Format for display
const formatTime = (seconds: number) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};

<div>Duration: {formatTime(elapsedSeconds)}</div>
```

---

## 🔄 Import Patterns

### Recommended (Barrel Import)
```typescript
import {
  useMeetingAuth,
  useMeetingRoom,
  useMeetingUI,
  useMeetingTimer
} from '@/hooks/meeting';
```

### Also Valid (Direct Import)
```typescript
import { useMeetingAuth } from '@/hooks/meeting/useMeetingAuth';
```

---

## 🏗️ Architecture Patterns

### 1. **State Machine** (`useMeetingAuth`)
Clear, unidirectional state flow prevents race conditions:
```
idle → validating-seal → creating-session → authenticated
  ↓
error (from any state)
```

### 2. **Reducer Pattern** (`useMeetingUI`)
Complex UI state managed through actions:
```typescript
dispatch({ type: 'TOGGLE_PARTICIPANTS' });
dispatch({ type: 'SET_PINNED_ID', payload: 'peer-123' });
```

### 3. **Data Merging** (`useMeetingRoom`)
Combines fast indexed data with authoritative blockchain data:
```
Backend API (fast) → Room details, memberships, approvals
     +
Blockchain (fresh) → Hosts array, on-chain state
     =
Complete room data
```

### 4. **Memoization** (All Hooks)
All callbacks properly memoized with `useCallback` to prevent unnecessary re-renders.

---

## 🧪 Testing

Each hook can be tested independently:

```typescript
// Example: Testing useMeetingAuth
import { renderHook, waitFor } from '@testing-library/react';
import { useMeetingAuth } from '@/hooks/meeting';

describe('useMeetingAuth', () => {
  it('should transition from idle to validating-seal', async () => {
    const { result } = renderHook(() => useMeetingAuth('room-123'));

    expect(result.current.authState).toBe('idle');

    await waitFor(() => {
      expect(result.current.authState).toBe('validating-seal');
    });
  });

  it('should handle authentication errors', async () => {
    // Mock Seal validation failure
    mockSealAuth.mockResolvedValue(false);

    const { result } = renderHook(() => useMeetingAuth('room-123'));

    await waitFor(() => {
      expect(result.current.authState).toBe('error');
      expect(result.current.authError).toBeTruthy();
    });
  });
});
```

---

## 📚 Related Hooks

These meeting hooks work together with other hooks in the parent `/hooks` directory:

- `useSealAuth` - Seal SDK integration (parent directory)
- `useMeetingControls` - Media controls (audio/video/screen share)
- `useMediaPermissions` - Browser media permissions
- `useHostCapability` - On-chain host operations

---

## 🔧 Extending

To add a new meeting hook:

1. Create the hook file: `useMyFeature.ts`
2. Export from `index.ts`:
   ```typescript
   export { useMyFeature } from './useMyFeature';
   ```
3. Use in meeting page:
   ```typescript
   import { useMyFeature } from '@/hooks/meeting';
   ```

---

## 🎓 Best Practices

1. **Keep hooks focused** - One hook, one responsibility
2. **Use TypeScript** - All hooks are fully typed
3. **Memoize callbacks** - Use `useCallback` for all functions
4. **Document state transitions** - Comment complex state flows
5. **Handle errors** - Always provide error states and messages
6. **Avoid prop drilling** - Use hooks to share state
7. **Test independently** - Each hook should be unit testable

---

## 📊 Performance

These hooks are optimized for minimal re-renders:

- **useMeetingAuth**: Only updates on state transitions
- **useMeetingRoom**: Only updates on data changes
- **useMeetingUI**: Reducer prevents unnecessary updates
- **useMeetingTimer**: Uses refs, only header re-renders

---

## 🔍 Debugging

Enable debug logging:
```typescript
// Each hook has console.log statements with prefixes:
// [Auth] - useMeetingAuth
// [Room] - useMeetingRoom

// Watch in console:
// [Auth] Starting Seal validation
// [Auth] Seal access granted, creating backend session
// [Auth] Backend session created successfully
```

---

## 📝 Changelog

### v1.0.0 (Current)
- ✅ Initial implementation with 4 core hooks
- ✅ State machine authentication flow
- ✅ Blockchain + backend data merging
- ✅ Reducer-based UI management
- ✅ Optimized timer with minimal re-renders
