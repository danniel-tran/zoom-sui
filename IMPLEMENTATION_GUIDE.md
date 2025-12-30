# Implementation Guide: Frontend Approval Flow with Seal Validation

## Overview

This guide shows how to implement the new approval flow where:
1. **Host signs on frontend** (wallet popup) → Backend updates status only
2. **Guest receives notification** → Guest signs Seal SessionKey for validation
3. **Meeting page checks** user is in room participants before entry

## 🎯 Flow Diagram

```
┌──────────────────────────────────────────────────────────────┐
│ 1. HOST APPROVES GUEST (Frontend Signing)                   │
├──────────────────────────────────────────────────────────────┤
│  Host clicks "Approve" → useHostApprove hook                 │
│  ├─ Builds approve_guest transaction                         │
│  ├─ Host signs with wallet (POPUP)                           │
│  ├─ Executes on blockchain                                   │
│  └─ Calls backend to update ApprovalRequest status           │
└──────────────────────────────────────────────────────────────┘
                          │
                          ▼
┌──────────────────────────────────────────────────────────────┐
│ 2. BACKEND UPDATES STATUS & NOTIFIES                         │
├──────────────────────────────────────────────────────────────┤
│  POST /api/rooms/:roomId/approve-status/:guestAddress        │
│  ├─ Verifies host status on blockchain                       │
│  ├─ Updates ApprovalRequest to 'approved'                    │
│  └─ WebSocket notifies guest: "join-request-approved"        │
└──────────────────────────────────────────────────────────────┘
                          │
                          ▼
┌──────────────────────────────────────────────────────────────┐
│ 3. GUEST RECEIVES NOTIFICATION                               │
├──────────────────────────────────────────────────────────────┤
│  Guest's useJoinRequest hook receives WebSocket event        │
│  └─ Triggers onApproved() callback                           │
└──────────────────────────────────────────────────────────────┘
                          │
                          ▼
┌──────────────────────────────────────────────────────────────┐
│ 4. MEETING PAGE: CHECK PARTICIPANTS                          │
├──────────────────────────────────────────────────────────────┤
│  Before entering meeting:                                    │
│  ├─ Call /api/seal/check-access                             │
│  ├─ Query blockchain: Is user in room.participants?         │
│  │   ├─ NO → Show "Not a Participant" error                 │
│  │   └─ YES → Proceed to Seal validation                    │
│  └─                                                          │
└──────────────────────────────────────────────────────────────┘
                          │
                          ▼
┌──────────────────────────────────────────────────────────────┐
│ 5. SEAL VALIDATION (Guest Signs SessionKey)                  │
├──────────────────────────────────────────────────────────────┤
│  Show SealValidationModal                                    │
│  ├─ Guest clicks "Sign & Validate Access"                    │
│  ├─ useSealAuth.validateAccess() is called                   │
│  ├─ Creates SessionKey via Seal SDK                          │
│  ├─ Guest signs personal message (WALLET POPUP)              │
│  └─ Seal SDK validates access to room                        │
└──────────────────────────────────────────────────────────────┘
                          │
                          ▼
┌──────────────────────────────────────────────────────────────┐
│ 6. ENTER MEETING                                             │
├──────────────────────────────────────────────────────────────┘
│  ✓ User is in blockchain participants                        │
│  ✓ Seal SessionKey validated                                 │
│  → Page reloads → User enters meeting successfully           │
└──────────────────────────────────────────────────────────────┘
```

## 📝 Implementation Steps

### Step 1: Update Imports in Meeting Page

```typescript
// Add these imports to meeting/[roomId]/page.tsx
import SealValidationModal from '@/components/modals/SealValidationModal';
import { useHostApprove } from '@/hooks/useHostApprove';
import { useSealAuth } from '@/hooks/useSealAuth';
```

### Step 2: Add State Variables

```typescript
function MeetingPageContent() {
  // ... existing code ...

  // Room participant check state
  const [isCheckingParticipants, setIsCheckingParticipants] = useState(false);
  const [isInParticipants, setIsInParticipants] = useState<boolean | null>(null);
  const [needsSealValidation, setNeedsSealValidation] = useState(false);

  // Seal authentication for validation
  const sealAuth = useSealAuth();

  // Host approve functionality (frontend signing)
  const hostApprove = useHostApprove({
    roomId,
    hostCapId: hostCapability.hostCapId,
    walletAddress: currentAccount?.address,
  });

  // ... existing code ...
}
```

### Step 3: Add Room Participant Check Effect

```typescript
/**
 * Check if user is in room participants (on-chain)
 * This happens BEFORE Seal validation
 */
useEffect(() => {
  const checkRoomParticipants = async () => {
    if (!isAuthenticated || !roomId || !currentAccount?.address) return;

    setIsCheckingParticipants(true);

    try {
      const accessToken = localStorage.getItem('accessToken');
      if (!accessToken) {
        throw new Error('Not authenticated');
      }

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api'}/seal/check-access`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
          },
          body: JSON.stringify({ roomId }),
        }
      );

      if (!response.ok) {
        throw new Error('Failed to check room access');
      }

      const data = await response.json();
      console.log('[Meeting] Room participant check:', data);

      setIsInParticipants(data.hasAccess);

      // If user is in participants but hasn't done Seal validation yet
      if (data.hasAccess && !sessionKeyManager.sessionKey) {
        console.log('[Meeting] User is in participants but needs Seal validation');
        setNeedsSealValidation(true);
      }
    } catch (error) {
      console.error('[Meeting] Error checking room participants:', error);
      setIsInParticipants(false);
    } finally {
      setIsCheckingParticipants(false);
    }
  };

  checkRoomParticipants();
}, [isAuthenticated, roomId, currentAccount?.address, sessionKeyManager.sessionKey]);
```

### Step 4: Add Seal Validation Handler

```typescript
/**
 * Handle Seal validation
 * Called when approved guest needs to sign SessionKey
 */
const handleSealValidation = useCallback(async (): Promise<boolean> => {
  if (!roomId || !currentAccount?.address) {
    return false;
  }

  try {
    console.log('[Meeting] Starting Seal validation...');

    const packageId = process.env.NEXT_PUBLIC_PACKAGE_ID || '';
    if (!packageId) {
      throw new Error('Package ID not configured');
    }

    // Validate access using Seal SDK
    // This will prompt user to sign a message with their wallet
    const hasAccess = await sealAuth.validateAccess(
      roomId,
      packageId,
      'testnet',
      30 // 30 minute TTL
    );

    if (hasAccess) {
      console.log('[Meeting] Seal validation successful!');
      setNeedsSealValidation(false);

      // Refresh the page to re-enter meeting with validated session
      window.location.reload();
      return true;
    } else {
      console.error('[Meeting] Seal validation failed - access denied');
      return false;
    }
  } catch (error) {
    console.error('[Meeting] Seal validation error:', error);
    return false;
  }
}, [roomId, currentAccount?.address, sealAuth]);
```

### Step 5: Add Conditional Renders BEFORE Main Meeting UI

```typescript
// Update loading states
const isLoading = authState === 'validating-seal' || roomLoading || isCheckingParticipants;

// ... existing loading check ...

// ADD THIS: User not in room participants (checked on-chain)
if (isInParticipants === false && !isCheckingParticipants) {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="text-center max-w-md">
        <div className="text-yellow-500 text-6xl mb-4">🚫</div>
        <h2 className="text-white text-2xl font-bold mb-2">Not a Participant</h2>
        <p className="text-gray-400 mb-6">
          You are not in the participants list for this room.
          {room?.requireApproval && ' You may need to request approval from the host.'}
        </p>
        {room?.requireApproval && (
          <button
            onClick={() => setShowAccessDeniedModal(true)}
            className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition mb-3"
          >
            Request to Join
          </button>
        )}
        <button
          onClick={() => router.push('/room')}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition block w-full"
        >
          Back to Rooms
        </button>
      </div>

      <AccessDeniedModal
        isOpen={showAccessDeniedModal}
        onClose={() => {
          setShowAccessDeniedModal(false);
          router.push('/room');
        }}
        roomTitle={room?.title || `Room ${roomId.slice(0, 10)}...`}
        roomId={roomId}
        onRequestJoin={async () => {
          const success = await joinRequestManager.requestJoin();
          if (success) {
            console.log('[Meeting] Join request sent, waiting for approval...');
          }
        }}
        requesting={joinRequestManager.isRequesting}
      />
    </div>
  );
}

// ADD THIS: User in participants but needs Seal validation
if (needsSealValidation && isInParticipants === true) {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <SealValidationModal
        isOpen={needsSealValidation}
        onClose={() => router.push('/room')}
        onValidate={handleSealValidation}
        roomTitle={room?.title || `Room ${roomId.slice(0, 10)}...`}
      />
    </div>
  );
}

// ... continue with existing checks (removed, auth error, etc.) ...
```

### Step 6: Update JoinRequestNotification to Use Frontend Signing

```typescript
{/* Join Request Notification for Hosts */}
{role === 'host' && (
  <JoinRequestNotification
    requests={joinRequestManager.pendingRequests}
    onApprove={async (requestId: string, guestAddress: string) => {
      // Use frontend signing instead of backend ephemeral key
      const result = await hostApprove.approveGuest(guestAddress);
      return result.success;
    }}
    onDeny={joinRequestManager.denyRequest}
  />
)}
```

## ✅ Files Created/Modified

### New Files:
1. ✅ `frontend-app/src/hooks/useHostApprove.ts` - Frontend signing for host approval
2. ✅ `frontend-app/src/components/modals/SealValidationModal.tsx` - Seal validation UI

### Modified Files:
1. ✅ `backend/src/routes/rooms.ts` - Changed to `/approve-status/` endpoint (status update only)
2. 🔄 `frontend-app/src/app/meeting/[roomId]/page.tsx` - Add participant check and Seal validation

## 🔑 Key Differences from Old Flow

| Aspect | Old Flow | New Flow |
|--------|----------|----------|
| **Host Signing** | Backend with ephemeral key | Frontend with wallet |
| **Transaction** | Backend executes | Frontend executes |
| **Backend Role** | Execute + Update status | Update status only |
| **Guest Validation** | Automatic | Manual Seal signing |
| **Wallet Popups** | None | 2 (host approve + guest validate) |
| **Security Model** | Ephemeral key delegation | User signs everything |

## 🧪 Testing Flow

1. **As Host:**
   - Create room with `requireApproval: true`
   - Guest requests to join
   - Click "Approve" in notification
   - **Sign transaction in wallet**
   - Verify guest receives notification

2. **As Guest:**
   - Request to join room
   - Wait for approval notification
   - See "Access Approved!" modal
   - Click "Sign & Validate Access"
   - **Sign Seal message in wallet**
   - Page reloads → Enter meeting successfully

## 📋 Environment Variables Needed

```env
NEXT_PUBLIC_PACKAGE_ID=0x...
NEXT_PUBLIC_API_URL=http://localhost:4000/api
NEXT_PUBLIC_WS_URL=ws://localhost:4000
```

## 🐛 Debugging Tips

1. **Check participant status:**
   ```
   POST /api/seal/check-access
   { "roomId": "0x..." }
   ```

2. **Monitor WebSocket messages:**
   ```javascript
   // In browser console
   localStorage.getItem('walletAddress')
   localStorage.getItem('accessToken')
   ```

3. **Verify on-chain:**
   ```javascript
   const room = await suiClient.getObject({ id: roomId });
   console.log(room.data.content.fields.participants);
   ```

## 🎯 Implementation Complete!

All components are now ready. Apply the changes to `meeting/[roomId]/page.tsx` following the code snippets above.
