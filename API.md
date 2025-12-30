# SuiMeet API Documentation

Base URL: `http://localhost:4000/api` (development)

All requests must include appropriate headers. Protected endpoints require JWT authentication.

---

## Table of Contents

1. [Authentication](#authentication)
2. [SessionKey Management](#sessionkey-management)
3. [Room Management](#room-management)
4. [Host Actions](#host-actions)
5. [Error Codes](#error-codes)

---

## Authentication

### POST /api/auth/nonce

Generate a nonce for wallet authentication.

**Request**:
```json
{
  "walletAddress": "0x..."
}
```

**Response** (200):
```json
{
  "nonce": "random-nonce-string",
  "expiresAt": "2025-12-11T12:00:00.000Z",
  "authorizationMessage": "By signing this message, you authorize:\n- Account access to SuiMeet\n- Automatic transaction signing...",
  "message": "Sign this nonce with your wallet to authenticate"
}
```

**curl Example**:
```bash
curl -X POST http://localhost:4000/api/auth/nonce \
  -H "Content-Type: application/json" \
  -d '{"walletAddress":"0x1234..."}'
```

---

### POST /api/auth/verify

Verify wallet signature and create session with ephemeral key.

**Request**:
```json
{
  "walletAddress": "0x...",
  "signature": "base64-encoded-signature",
  "walletType": "sui"
}
```

**Response** (200):
```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refreshToken": "refresh-token-string",
  "session": {
    "id": "session-id",
    "expiresAt": "2025-12-12T12:00:00.000Z",
    "hasEphemeralKey": true
  },
  "user": {
    "id": "user-id",
    "walletAddress": "0x..."
  },
  "ephemeralWallet": {
    "address": "0x...",
    "expiresAt": "2025-12-12T12:00:00.000Z"
  }
}
```

**Errors**:
- `400`: Missing wallet address or signature
- `401`: Invalid signature
- `500`: Server error

**curl Example**:
```bash
curl -X POST http://localhost:4000/api/auth/verify \
  -H "Content-Type: application/json" \
  -d '{
    "walletAddress":"0x1234...",
    "signature":"abc123...",
    "walletType":"sui"
  }'
```

---

### POST /api/auth/refresh

Refresh access token using refresh token.

**Request**:
```json
{
  "refreshToken": "refresh-token-string"
}
```

**Response** (200):
```json
{
  "accessToken": "new-jwt-token"
}
```

**Errors**:
- `400`: Missing refresh token
- `401`: Invalid or expired refresh token
- `500`: Server error

**curl Example**:
```bash
curl -X POST http://localhost:4000/api/auth/refresh \
  -H "Content-Type: application/json" \
  -d '{"refreshToken":"your-refresh-token"}'
```

---

## SessionKey Management

### POST /api/seal/validate-and-refresh

Validate user access to room and refresh SessionKey (auto-signing).

**Authentication**: Required (JWT Bearer token)

**Request**:
```json
{
  "roomId": "0x..."
}
```

**Response** (200):
```json
{
  "success": true,
  "sessionKey": {
    "serialized": "{...json...}",
    "expiresAt": "2025-12-11T12:30:00.000Z",
    "createdAt": "2025-12-11T12:00:00.000Z",
    "ephemeralAddress": "0x..."
  }
}
```

**Response** (403 - User Removed):
```json
{
  "error": "You have been removed from this room",
  "removed": true
}
```

**Errors**:
- `400`: Invalid roomId format
- `401`: No access token or session not found
- `403`: User removed from room (`removed: true`)
- `500`: Blockchain query failed or server error

**curl Example**:
```bash
curl -X POST http://localhost:4000/api/seal/validate-and-refresh \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{"roomId":"0x1234..."}'
```

**Notes**:
- Frontend calls this every 60 seconds
- Backend queries blockchain to verify user in room.participants
- If user removed, returns 403 with `removed: true`
- Logs action in DelegatedSignature table

---

### POST /api/seal/check-access

Check if user still has access to room (lightweight, no SessionKey creation).

**Authentication**: Required (JWT Bearer token)

**Request**:
```json
{
  "roomId": "0x..."
}
```

**Response** (200):
```json
{
  "hasAccess": true,
  "removed": false
}
```

**curl Example**:
```bash
curl -X POST http://localhost:4000/api/seal/check-access \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{"roomId":"0x1234..."}'
```

---

## Room Management

### GET /api/rooms

Get all meeting rooms (indexed from blockchain).

**Query Parameters**:
- `walletAddress` (optional): Filter rooms by participant/host
- `status` (optional): `scheduled`, `active`, or `ended`

**Response** (200):
```json
{
  "rooms": [
    {
      "roomId": "0x...",
      "title": "Team Meeting",
      "hosts": ["0x..."],
      "status": "active",
      "maxParticipants": 20,
      "requireApproval": true,
      "participantCount": 5,
      "sealPolicyId": "0x...",
      "createdAt": "2025-12-11T10:00:00.000Z",
      "startedAt": "2025-12-11T10:05:00.000Z",
      "endedAt": null,
      "transactionDigest": "0x...",
      "pendingApprovals": 2,
      "userRole": "HOST"
    }
  ]
}
```

**curl Example**:
```bash
# Get all rooms
curl http://localhost:4000/api/rooms

# Get rooms for specific wallet
curl "http://localhost:4000/api/rooms?walletAddress=0x1234..."

# Get active rooms
curl "http://localhost:4000/api/rooms?status=active"
```

---

### GET /api/rooms/:roomId

Get detailed room information.

**Response** (200):
```json
{
  "room": {
    "roomId": "0x...",
    "title": "Team Meeting",
    "status": "active",
    "maxParticipants": 20,
    "requireApproval": true,
    "participantCount": 5,
    "sealPolicyId": "0x...",
    "createdAt": "2025-12-11T10:00:00.000Z",
    "startedAt": "2025-12-11T10:05:00.000Z",
    "endedAt": null
  },
  "hosts": [
    {
      "address": "0x...",
      "adminCapId": "0x...",
      "joinedAt": "2025-12-11T10:00:00.000Z"
    }
  ],
  "participants": [
    {
      "address": "0x...",
      "joinedAt": "2025-12-11T10:02:00.000Z"
    }
  ],
  "metadata": {
    "language": "en",
    "timezone": "UTC",
    "recordingBlobId": null,
    "dynamicFieldId": "0x..."
  },
  "pendingApprovals": [
    {
      "id": "approval-id",
      "requesterAddress": "0x...",
      "createdAt": "2025-12-11T10:10:00.000Z"
    }
  ]
}
```

**curl Example**:
```bash
curl http://localhost:4000/api/rooms/0x1234...
```

---

## Host Actions

All host actions require JWT authentication and verify host status via blockchain.

### POST /api/rooms/:roomId/approve/:guestAddress

Approve a guest to join room (auto-signed, no wallet popup).

**Authentication**: Required (must be host)

**Response** (200):
```json
{
  "success": true,
  "txDigest": "0x...",
  "guestAddress": "0x...",
  "message": "Guest approved successfully"
}
```

**Errors**:
- `400`: Invalid address format
- `403`: Only hosts can approve guests
- `404`: HostCap not found
- `500`: Transaction failed

**curl Example**:
```bash
curl -X POST http://localhost:4000/api/rooms/0x1234.../approve/0x5678... \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

**Flow**:
1. Verify user is host (blockchain query)
2. Decrypt ephemeral private key
3. Find HostCap object
4. Build transaction: `sealmeet::approve_guest(hostCap, roomId, guestAddress, clock)`
5. Sign with ephemeral key (NO WALLET POPUP!)
6. Execute transaction
7. Log in DelegatedSignature

---

### POST /api/rooms/:roomId/revoke/:userAddress

Revoke user access from room (auto-signed).

**Authentication**: Required (must be host)

**Response** (200):
```json
{
  "success": true,
  "txDigest": "0x...",
  "userAddress": "0x...",
  "message": "User access revoked successfully"
}
```

**curl Example**:
```bash
curl -X POST http://localhost:4000/api/rooms/0x1234.../revoke/0x5678... \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

---

### POST /api/rooms/:roomId/recording/start

Start recording (placeholder, no blockchain tx yet).

**Authentication**: Required (must be host)

**Response** (200):
```json
{
  "success": true,
  "message": "Recording started (placeholder)",
  "roomId": "0x..."
}
```

**curl Example**:
```bash
curl -X POST http://localhost:4000/api/rooms/0x1234.../recording/start \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

---

### POST /api/rooms/:roomId/recording/stop

Stop recording (placeholder).

**Authentication**: Required (must be host)

**Request**:
```json
{
  "blobId": "optional-walrus-blob-id"
}
```

**Response** (200):
```json
{
  "success": true,
  "message": "Recording stopped (placeholder)",
  "roomId": "0x...",
  "blobId": "blob-id-or-null"
}
```

**curl Example**:
```bash
curl -X POST http://localhost:4000/api/rooms/0x1234.../recording/stop \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{"blobId":"optional-blob-id"}'
```

---

### POST /api/rooms/:roomId/end

End the room (auto-signed).

**Authentication**: Required (must be host)

**Response** (200):
```json
{
  "success": true,
  "txDigest": "0x...",
  "message": "Room ended successfully"
}
```

**curl Example**:
```bash
curl -X POST http://localhost:4000/api/rooms/0x1234.../end \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

**Note**: Requires `REGISTRY_OBJECT_ID` environment variable.

---

## Error Codes

### HTTP Status Codes

| Code | Meaning | Description |
|------|---------|-------------|
| 200 | Success | Request succeeded |
| 400 | Bad Request | Invalid request parameters |
| 401 | Unauthorized | Missing or invalid authentication |
| 403 | Forbidden | Insufficient permissions |
| 404 | Not Found | Resource not found |
| 500 | Internal Server Error | Server error |

### Common Error Responses

**Invalid Authentication**:
```json
{
  "error": "Authentication required"
}
```

**User Removed from Room**:
```json
{
  "error": "You have been removed from this room",
  "removed": true
}
```

**Not a Host**:
```json
{
  "error": "Only room hosts can approve guests"
}
```

**Blockchain Error**:
```json
{
  "error": "Failed to verify host status on blockchain",
  "details": "Network timeout"
}
```

---

## Rate Limiting

### Default Limits

| Endpoint | Limit | Window |
|----------|-------|--------|
| `/api/auth/nonce` | 10 requests | 1 minute |
| `/api/auth/verify` | 5 requests | 1 minute |
| `/api/seal/*` | 120 requests | 1 minute |
| `/api/rooms/*` | 60 requests | 1 minute |

**Rate Limit Headers**:
```
X-RateLimit-Limit: 60
X-RateLimit-Remaining: 45
X-RateLimit-Reset: 1639478400
```

---

## Webhooks (Future)

Planned webhook events:

- `room.created`
- `room.started`
- `room.ended`
- `user.approved`
- `user.revoked`
- `sessionkey.expired`

Webhook payload format:
```json
{
  "event": "user.approved",
  "timestamp": "2025-12-11T12:00:00.000Z",
  "data": {
    "roomId": "0x...",
    "userAddress": "0x...",
    "approvedBy": "0x..."
  }
}
```

---

## SDK Examples

### JavaScript/TypeScript

```typescript
import axios from 'axios';

const API_BASE = 'http://localhost:4000/api';

// Authenticate
const auth = await axios.post(`${API_BASE}/auth/nonce`, {
  walletAddress: '0x...'
});

// Sign nonce with wallet...

const session = await axios.post(`${API_BASE}/auth/verify`, {
  walletAddress: '0x...',
  signature: signedNonce,
  walletType: 'sui'
});

const accessToken = session.data.accessToken;

// Validate and refresh SessionKey
const sessionKey = await axios.post(
  `${API_BASE}/seal/validate-and-refresh`,
  { roomId: '0x...' },
  { headers: { Authorization: `Bearer ${accessToken}` } }
);

// Host action: Approve guest
const result = await axios.post(
  `${API_BASE}/rooms/${roomId}/approve/${guestAddress}`,
  {},
  { headers: { Authorization: `Bearer ${accessToken}` } }
);

console.log('Transaction:', result.data.txDigest);
```

---

## Testing

### Health Check
```bash
curl http://localhost:4000/health
```

Expected response:
```json
{
  "status": "ok",
  "timestamp": "2025-12-11T12:00:00.000Z"
}
```

### Authentication Flow Test
```bash
# 1. Request nonce
NONCE=$(curl -s -X POST http://localhost:4000/api/auth/nonce \
  -H "Content-Type: application/json" \
  -d '{"walletAddress":"0x1234..."}' | jq -r '.nonce')

echo "Nonce: $NONCE"

# 2. Sign nonce with wallet (manual step)

# 3. Verify signature
ACCESS_TOKEN=$(curl -s -X POST http://localhost:4000/api/auth/verify \
  -H "Content-Type: application/json" \
  -d '{
    "walletAddress":"0x1234...",
    "signature":"'$SIGNATURE'",
    "walletType":"sui"
  }' | jq -r '.accessToken')

echo "Access Token: $ACCESS_TOKEN"

# 4. Test protected endpoint
curl http://localhost:4000/api/seal/validate-and-refresh \
  -H "Authorization: Bearer $ACCESS_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"roomId":"0x5678..."}'
```

---

## Troubleshooting

### Common Issues

**"Invalid roomId format"**
- Ensure roomId starts with `0x` and is 66 characters long

**"Session not found or missing ephemeral key"**
- Re-authenticate to create new session with ephemeral key

**"Failed to verify host status on blockchain"**
- Check `SUI_NETWORK` and `SUI_PACKAGE_ID` environment variables
- Ensure blockchain node is accessible

**"REGISTRY_OBJECT_ID not configured"**
- Required for `end_room` endpoint
- Add to `.env` file

### Debug Mode

Enable debug logging:
```bash
DEBUG=suimeet:* npm run dev
```

View audit logs:
```sql
SELECT * FROM "DelegatedSignature"
WHERE "sessionId" = 'your-session-id'
ORDER BY "createdAt" DESC
LIMIT 10;
```

---

## Changelog

### v1.0.0 (2025-12-11)
- Initial API release
- Authentication with ephemeral keys
- SessionKey auto-refresh
- Host actions (approve, revoke, end room)
- Audit logging

---

## Support

For issues or questions:
- GitHub Issues: https://github.com/yourusername/suimeet/issues
- Documentation: https://github.com/yourusername/suimeet/wiki
- Discord: https://discord.gg/suimeet
