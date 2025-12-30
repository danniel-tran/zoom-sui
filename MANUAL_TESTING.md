# SuiMeet Manual Testing Guide

This guide provides step-by-step instructions for manually testing the SessionKey auto-refresh system and all related features.

## Prerequisites

### Required Tools
- ✅ Sui Wallet Extension (Chrome/Firefox/Edge)
- ✅ PostgreSQL database running
- ✅ Node.js 18+ and npm
- ✅ Terminal/Command Prompt
- ✅ Browser Developer Tools (F12)
- ✅ Postman or curl (optional)

### Environment Setup
1. Clone repository
2. Setup `.env` file (see .env.example)
3. Run migrations: `npx prisma migrate deploy`
4. Generate Prisma client: `npx prisma generate`
5. Start backend: `npm run dev` (port 4000)
6. Start frontend: `npm run dev` (port 3000)

---

## Test Suite 1: Authentication Flow

### Test 1.1: First-Time Authentication

**Objective**: Verify user can authenticate and receive ephemeral key

**Steps**:
1. Open browser to `http://localhost:3000`
2. Click "Connect Wallet"
3. Select Sui Wallet in the prompt
4. Approve connection in wallet extension

**Expected Result**:
- ✅ Wallet connects successfully
- ✅ Browser console shows: "✅ Encryption key validated successfully"
- ✅ No errors in console

**Debugging**:
```bash
# Check backend logs
tail -f backend/logs/app.log

# Check if session created
psql -d suimeet_indexer -c "SELECT * FROM \"Session\" ORDER BY \"createdAt\" DESC LIMIT 1;"
```

---

### Test 1.2: Nonce Generation and Signing

**Objective**: Verify nonce flow and ephemeral key generation

**Steps**:
1. Open DevTools Console (F12)
2. Click authentication button
3. Watch for wallet popup with authorization message
4. Read the authorization message carefully
5. Approve signature in wallet

**Expected Authorization Message**:
```
By signing this message, you authorize:
- Account access to SuiMeet
- Automatic transaction signing for approved room operations
- Session creation with ephemeral keypair for seamless experience

Nonce: [random-string]
Expires: [timestamp]
```

**Expected Result**:
- ✅ User sees clear explanation of what they're authorizing
- ✅ No wallet popups after initial sign
- ✅ Console shows: `[SessionKey] Loaded from localStorage`

**Debugging**:
```javascript
// Check localStorage in DevTools Console
localStorage.getItem('accessToken')
localStorage.getItem('refreshToken')
```

---

### Test 1.3: Ephemeral Key Storage

**Objective**: Verify ephemeral key is encrypted and stored

**Steps**:
1. After authentication, check database
```sql
SELECT
  "id",
  "userId",
  LENGTH("encryptedPrivateKey") as key_length,
  "expiresAt"
FROM "Session"
WHERE "status" = 'active'
ORDER BY "createdAt" DESC
LIMIT 1;
```

**Expected Result**:
- ✅ `encryptedPrivateKey` is NOT NULL
- ✅ `key_length` > 100 (encrypted JSON is large)
- ✅ `expiresAt` is ~24 hours from now

**Expected Format** (encrypted key):
```json
{
  "ciphertext": "base64...",
  "iv": "base64...",
  "authTag": "base64...",
  "publicKey": "0x...",
  "algorithm": "aes-256-gcm",
  "version": 1
}
```

---

## Test Suite 2: Join Room & SessionKey Refresh

### Test 2.1: First Join (SessionKey Creation)

**Objective**: Join a room for the first time

**Steps**:
1. Navigate to Rooms page
2. Click on an existing room or create new room
3. Click "Join Meeting"
4. Watch browser console for logs

**Expected Console Logs**:
```
[Meeting] SessionKey expired, refreshing...
[SessionKey] Refreshed successfully, expires at: 2025-12-11T12:30:00.000Z
[Meeting] Online participants: 1
```

**Expected Result**:
- ✅ Meeting page loads
- ✅ No errors in console
- ✅ Video/audio initialized
- ✅ Blue overlay briefly shows "Validating access..."

**Check localStorage**:
```javascript
// In DevTools Console
const roomId = window.location.pathname.split('/').pop();
const key = localStorage.getItem(`seal_session_${roomId}`);
console.log(JSON.parse(key));
```

Expected structure:
```json
{
  "serialized": "{...}",
  "expiresAt": "2025-12-11T12:30:00.000Z"
}
```

---

### Test 2.2: Automatic SessionKey Refresh (60-second interval)

**Objective**: Verify SessionKey refreshes every 60 seconds

**Steps**:
1. Join a meeting
2. Stay in meeting for 2+ minutes
3. Watch browser console for refresh logs
4. Watch Network tab (F12 → Network)

**Expected Console Logs (every 60s)**:
```
[Meeting] SessionKey expired, attempting refresh
POST /api/seal/validate-and-refresh
[SessionKey] Refreshed successfully, expires at: ...
```

**Expected Network Requests**:
- Request to `/api/seal/validate-and-refresh` every 60 seconds
- Status: 200
- Response includes `sessionKey.serialized`

**Timing Test**:
```javascript
// Run in DevTools Console
let refreshCount = 0;
setInterval(() => {
  console.log(`Minute ${++refreshCount}: Check network tab for refresh request`);
}, 60000);
```

---

### Test 2.3: SessionKey Expiry Handling

**Objective**: Verify system handles expired SessionKey

**Steps**:
1. Join a meeting
2. In DevTools Console, manually expire SessionKey:
```javascript
const roomId = window.location.pathname.split('/').pop();
const key = JSON.parse(localStorage.getItem(`seal_session_${roomId}`));
key.expiresAt = new Date(Date.now() - 1000).toISOString(); // Expired 1s ago
localStorage.setItem(`seal_session_${roomId}`, JSON.stringify(key));
```
3. Wait 5-10 seconds
4. Watch for automatic refresh

**Expected Result**:
- ✅ Blue overlay shows "Validating access..."
- ✅ Console logs refresh attempt
- ✅ New SessionKey stored in localStorage
- ✅ Meeting continues without interruption

---

## Test Suite 3: User Removal Detection

### Test 3.1: Host Removes User

**Objective**: Verify removed user is kicked from meeting

**Setup**:
- Requires 2 browsers/devices
- Browser A: Host
- Browser B: Guest

**Steps**:

**Browser A (Host)**:
1. Create a room with approval required
2. Approve Browser B's join request
3. Verify Browser B is in meeting
4. Click "Remove User" (or use API)
```bash
# Using curl
curl -X POST http://localhost:4000/api/rooms/$ROOM_ID/revoke/$GUEST_ADDRESS \
  -H "Authorization: Bearer $HOST_TOKEN"
```

**Browser B (Guest)**:
1. Stay in meeting
2. Wait up to 60 seconds (next refresh interval)
3. Watch for removal detection

**Expected Result (Browser B)**:
- ✅ Within 60 seconds, sees 🚫 "Removed from Room" screen
- ✅ Console shows: `[Meeting] User has been removed from room`
- ✅ Redirects to rooms list after 3 seconds
- ✅ Red overlay briefly shows error message

**Check Backend Logs**:
```bash
# Backend should log
[SessionKey] User has been removed from room
```

---

### Test 3.2: Removal During Video Call

**Objective**: Verify graceful handling during active call

**Steps**:
1. Join meeting with video/audio enabled
2. Start screen share
3. Have host remove you
4. Wait for next refresh (up to 60s)

**Expected Result**:
- ✅ Video/audio stops gracefully
- ✅ Screen share stops
- ✅ Removal message appears
- ✅ No JavaScript errors in console
- ✅ Media tracks properly cleaned up

**Verify Cleanup**:
```javascript
// In DevTools Console (before removal)
console.log('Local tracks:', localStream.getTracks().length);

// After removal
console.log('Local tracks after removal:', localStream?.getTracks().length || 0);
// Should be 0 or undefined
```

---

## Test Suite 4: Host Actions (No Wallet Popup!)

### Test 4.1: Approve Guest (Auto-Sign)

**Objective**: Verify host can approve without wallet popup

**Setup**:
- Browser A: Host (authenticated)
- Browser B: Guest (requesting approval)

**Steps (Host)**:
1. See pending approval notification
2. Click "Approve" button
3. Watch console - NO WALLET POPUP should appear!

**Expected Result**:
- ✅ **NO wallet popup**
- ✅ Guest approved within 2-3 seconds
- ✅ Success message appears
- ✅ Console shows transaction digest:
```
[Host Action] Transaction successful: 0x...
```

**Check Database**:
```sql
SELECT * FROM "DelegatedSignature"
WHERE "action" = 'approve_guest'
ORDER BY "createdAt" DESC
LIMIT 1;
```

Expected:
- ✅ `action`: "approve_guest"
- ✅ `txDigest`: "0x..."
- ✅ `roomId`: correct room ID

---

### Test 4.2: Revoke User (Auto-Sign)

**Objective**: Verify host can revoke without wallet popup

**Steps**:
1. As host, click user in participants list
2. Click "Remove" button
3. Confirm action
4. **NO wallet popup should appear**

**Expected Result**:
- ✅ No wallet popup
- ✅ User removed within 2-3 seconds
- ✅ Transaction logged in DelegatedSignature
- ✅ Guest sees removal screen within 60s

---

### Test 4.3: End Room (Auto-Sign)

**Objective**: Verify host can end room without wallet popup

**Steps**:
1. As host in meeting
2. Click "End Meeting" button
3. Confirm action
4. **NO wallet popup should appear**

**Expected Result**:
- ✅ No wallet popup
- ✅ Room ends within 2-3 seconds
- ✅ All participants disconnected
- ✅ Room status changes to "ended"
- ✅ Console shows:
```
[Host Action] Room ended successfully: 0x...
```

**Verify on Blockchain**:
```bash
# Query room status (should be 3 = ended)
sui client object $ROOM_ID --json | jq '.content.fields.status'
# Expected: 3
```

---

## Test Suite 5: Error Scenarios

### Test 5.1: Network Disconnection During Refresh

**Objective**: Verify graceful handling of network errors

**Steps**:
1. Join meeting
2. Open DevTools Network tab
3. Enable "Offline" mode in Network tab
4. Wait for next refresh (60s)
5. Re-enable network

**Expected Result**:
- ✅ Red overlay shows "Validation failed"
- ✅ Console shows: `[Meeting] Validation check failed: ...`
- ✅ System retries on next interval
- ✅ No page crash

---

### Test 5.2: Session Expiry (24 hours)

**Objective**: Verify behavior when session expires

**Steps**:
1. Manually expire session in database:
```sql
UPDATE "Session"
SET "expiresAt" = NOW() - INTERVAL '1 second'
WHERE "id" = 'your-session-id';
```
2. Trigger refresh in frontend
3. Observe behavior

**Expected Result**:
- ✅ Returns 401 "Session expired"
- ✅ Frontend redirects to authentication
- ✅ User must re-authenticate

---

### Test 5.3: Invalid Encryption Key

**Objective**: Verify server fails to start with wrong key

**Steps**:
1. Stop backend
2. Change `ENCRYPTION_KEY` in `.env` to invalid value
3. Try to start backend
```bash
npm run dev
```

**Expected Result**:
- ✅ Server refuses to start
- ✅ Error message:
```
❌ ENCRYPTION_KEY validation failed: ...
Please set a valid ENCRYPTION_KEY in your .env file
Generate one with: openssl rand -hex 32
```

---

## Test Suite 6: Concurrent Users

### Test 6.1: Multiple Users in Same Room

**Objective**: Verify multiple users can refresh SessionKeys concurrently

**Setup**: 3 browsers/devices in same room

**Steps**:
1. All join same room
2. Wait 60+ seconds
3. All should refresh automatically

**Expected Result**:
- ✅ All users refresh successfully
- ✅ No conflicts or errors
- ✅ Each has unique SessionKey in localStorage

**Check Backend Load**:
```bash
# Count DelegatedSignature entries in last minute
psql -d suimeet_indexer -c "
  SELECT COUNT(*)
  FROM \"DelegatedSignature\"
  WHERE \"action\" = 'sessionkey_refresh'
    AND \"createdAt\" > NOW() - INTERVAL '1 minute';
"
```

---

## Debugging Tips

### Console Logging

**Enable Verbose Logging**:
```javascript
// In DevTools Console
localStorage.setItem('debug', 'suimeet:*');
location.reload();
```

**Key Logs to Watch For**:
```
✅ [SessionKey] Loaded from localStorage
✅ [SessionKey] Refreshed successfully
❌ [SessionKey] User has been removed from room
⚠️ [SessionKey] Error loading from localStorage
```

---

### Database Queries

**Check Active Sessions**:
```sql
SELECT
  "id",
  "userId",
  "status",
  "createdAt",
  "expiresAt",
  LENGTH("encryptedPrivateKey") > 0 as "has_key"
FROM "Session"
WHERE "status" = 'active'
  AND "expiresAt" > NOW()
ORDER BY "createdAt" DESC;
```

**Check Recent Refresh Actions**:
```sql
SELECT
  "action",
  "roomId",
  "createdAt",
  "txDigest"
FROM "DelegatedSignature"
WHERE "action" IN ('sessionkey_refresh', 'approve_guest', 'revoke_guest')
ORDER BY "createdAt" DESC
LIMIT 20;
```

**Check User Removal Events**:
```sql
SELECT * FROM "DelegatedSignature"
WHERE "action" = 'revoke_guest'
ORDER BY "createdAt" DESC
LIMIT 10;
```

---

### Network Inspection

**Monitor Refresh Requests**:
1. F12 → Network tab
2. Filter: `validate-and-refresh`
3. Watch for:
   - Request every 60s
   - Status 200 or 403
   - Response body includes `sessionKey` or `removed: true`

**Check Request Headers**:
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIs...
Content-Type: application/json
```

**Check Response Headers**:
```
Content-Type: application/json
X-Powered-By: Express
```

---

### LocalStorage Inspection

**View All SealSession Keys**:
```javascript
// In DevTools Console
Object.keys(localStorage)
  .filter(k => k.startsWith('seal_session_'))
  .forEach(k => {
    console.log(k, JSON.parse(localStorage.getItem(k)));
  });
```

**Clear All Sessions**:
```javascript
// In DevTools Console
Object.keys(localStorage)
  .filter(k => k.startsWith('seal_session_'))
  .forEach(k => localStorage.removeItem(k));

console.log('Cleared all SessionKeys');
```

---

## Performance Testing

### Test Load: 100 Concurrent Refreshes

**Setup**: Simulate 100 users refreshing simultaneously

**Steps**:
```bash
# Install Apache Bench
sudo apt-get install apache2-utils

# Run load test
ab -n 100 -c 100 \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -p refresh_payload.json \
  http://localhost:4000/api/seal/validate-and-refresh
```

**Expected Result**:
- ✅ All requests complete successfully
- ✅ Average response time < 500ms
- ✅ No 500 errors
- ✅ Database handles concurrent writes

---

## Security Testing

### Test: Cannot Decrypt Without Key

**Steps**:
1. Export encrypted key from database
2. Try to decrypt with wrong key:
```bash
# Wrong key
node -e "
  const crypto = require('crypto');
  const encrypted = 'your-encrypted-key-json';
  const wrongKey = Buffer.from('a'.repeat(64), 'hex');
  // ... try to decrypt
"
```

**Expected Result**:
- ✅ Decryption fails
- ✅ Error: "Decryption failed: ..."

---

### Test: JWT Expiry

**Steps**:
1. Get access token
2. Wait for expiry (1 hour)
3. Try to use expired token

**Expected Result**:
- ✅ Returns 403 "Invalid or expired token"
- ✅ Must refresh token or re-authenticate

---

## Test Checklist

Copy this checklist for each testing session:

```
Date: ___________
Tester: ___________

## Authentication
- [ ] First-time authentication
- [ ] Nonce generation
- [ ] Ephemeral key storage

## SessionKey Refresh
- [ ] First join creates SessionKey
- [ ] Automatic 60s refresh works
- [ ] Expired SessionKey handled

## User Removal
- [ ] Removal detected within 60s
- [ ] Graceful disconnect
- [ ] Redirect to rooms list

## Host Actions (No Popups!)
- [ ] Approve guest (no popup)
- [ ] Revoke user (no popup)
- [ ] End room (no popup)

## Error Scenarios
- [ ] Network disconnection
- [ ] Session expiry
- [ ] Invalid encryption key

## Concurrent Users
- [ ] Multiple users refresh successfully

## Database
- [ ] Sessions created correctly
- [ ] DelegatedSignature logs all actions
- [ ] Encrypted keys stored properly

## Security
- [ ] Cannot decrypt without key
- [ ] JWT expiry enforced
```

---

## Known Issues & Workarounds

### Issue: SessionKey Not Refreshing

**Symptoms**: No refresh requests in Network tab

**Possible Causes**:
1. JWT token expired
2. Browser tab inactive (browser throttling)
3. Network offline

**Workaround**:
1. Check `localStorage.getItem('accessToken')`
2. Re-authenticate if expired
3. Keep browser tab active during testing

---

### Issue: "HostCap not found"

**Symptoms**: Host actions fail with 404

**Possible Causes**:
1. User wallet doesn't own HostCap
2. HostCap for wrong room
3. Blockchain not synced

**Workaround**:
1. Verify HostCap ownership on blockchain
2. Check roomId matches
3. Wait for blockchain sync

---

## Need Help?

- Check backend logs: `tail -f backend/logs/app.log`
- Check browser console (F12)
- Query database for session state
- Review API documentation (API.md)
- Check architecture diagrams (ARCHITECTURE.md)
