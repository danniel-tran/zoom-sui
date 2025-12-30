# SuiMeet Backend - Product Requirements Document (PRD)

## 1. Executive Summary

The SuiMeet Backend is a RESTful API service built with Express.js and TypeScript that provides authentication, session management, room management, and WebRTC signaling for a decentralized video conferencing application on the Sui blockchain. The backend serves as the off-chain infrastructure that complements on-chain smart contracts, handling user sessions, ephemeral key management for auto-signing, and guest approval workflows.

## 2. Product Overview

### 2.1 Purpose
The backend enables:
- **Wallet-based authentication** using Sui wallet signatures
- **JWT session management** with refresh tokens
- **Ephemeral key management** for seamless auto-signing of blockchain transactions
- **Room management** that acknowledges on-chain room creation and manages approval workflows
- **WebRTC signaling** for peer-to-peer video connections
- **Guest approval system** for rooms requiring host approval

### 2.2 Key Differentiators
- **Hybrid Architecture**: Combines on-chain (Sui blockchain) and off-chain (PostgreSQL) data
- **Auto-Sign Capability**: Ephemeral keys allow transactions without repeated wallet prompts
- **Indexer Integration**: Reads blockchain data from indexer tables (read-only)
- **Encrypted Key Storage**: AES-256-GCM encryption for sensitive ephemeral keys

## 3. System Architecture

### 3.1 Technology Stack
- **Runtime**: Node.js with TypeScript
- **Framework**: Express.js
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: JWT (JSON Web Tokens)
- **Encryption**: AES-256-GCM for private key storage
- **Blockchain**: Sui SDK (@mysten/sui)

### 3.2 Data Flow

```
Frontend → Backend API → PostgreSQL Database
                ↓
         Sui Blockchain (via Indexer)
```

### 3.3 Database Architecture

**Indexed Tables (Read-Only from Backend)**:
- `meeting_rooms` - Room data indexed from blockchain
- `room_participants` - Participant data indexed from blockchain
- `room_metadata` - Metadata (language, timezone, recordings) indexed from blockchain

**Backend-Managed Tables**:
- `User` - User accounts
- `Wallet` - Wallet addresses linked to users
- `Session` - Active user sessions
- `AuthNonce` - Nonces for wallet authentication
- `RefreshToken` - Refresh token hashes
- `EphemeralKey` - Ephemeral keys for auto-signing
- `DelegatedSignature` - Audit trail of auto-signed transactions
- `ApprovalRequest` - Guest approval requests for rooms

## 4. API Endpoints

### 4.1 Authentication (`/api/auth`)

#### POST `/api/auth/nonce`
**Purpose**: Generate a nonce for wallet signature authentication

**Request**:
```json
{
  "walletAddress": "0x..."
}
```

**Response**:
```json
{
  "nonce": "hex-string",
  "expiresAt": "2024-01-01T00:00:00Z"
}
```

**Behavior**:
- Generates a secure 32-byte random nonce
- Stores nonce in database with 10-minute expiration
- Returns nonce for frontend to sign

#### POST `/api/auth/verify`
**Purpose**: Verify wallet signature and create JWT session

**Request**:
```json
{
  "walletAddress": "0x...",
  "signature": "base64-signature",
  "walletType": "sui" | "zklogin"
}
```

**Response**:
```json
{
  "accessToken": "jwt-token",
  "refreshToken": "jwt-refresh-token",
  "session": {
    "id": "session-id",
    "expiresAt": "2024-01-01T00:00:00Z"
  },
  "user": {
    "id": "user-id",
    "walletAddress": "0x..."
  }
}
```

**Behavior**:
- Validates nonce exists and not consumed
- TODO: Verifies signature using Sui SDK (currently placeholder)
- Creates or finds User and Wallet records
- Creates Session with JWT ID
- Generates access token (15min) and refresh token (7 days)
- Returns tokens and session info

#### POST `/api/auth/refresh`
**Purpose**: Refresh access token using refresh token

**Request**:
```json
{
  "refreshToken": "jwt-refresh-token"
}
```

**Response**:
```json
{
  "accessToken": "new-jwt-token"
}
```

**Behavior**:
- Validates refresh token hash in database
- Checks session is still active
- Generates new access token
- Updates session lastUsedAt

### 4.2 Sessions (`/api/sessions`)

**Authentication**: Required (JWT token)

#### POST `/api/sessions/ephemeral-key`
**Purpose**: Create ephemeral keypair for auto-signing transactions

**Request**:
```json
{
  "scope": ["room:create", "room:approve"]
}
```

**Response**:
```json
{
  "ephemeralKeyId": "key-id",
  "publicKey": "pem-public-key",
  "expiresAt": "2024-01-01T00:00:00Z",
  "scope": ["room:create", "room:approve"]
}
```

**Behavior**:
- Generates Ed25519 keypair
- Encrypts private key with AES-256-GCM
- Stores encrypted key in Session
- Creates EphemeralKey record with scope
- Returns public key and expiration

#### POST `/api/sessions/auto-sign`
**Purpose**: Auto-sign transaction using ephemeral key

**Request**:
```json
{
  "txPayload": "base64-transaction",
  "scope": ["room:create"]
}
```

**Response**:
```json
{
  "signature": "base64-signature",
  "publicKey": "pem-public-key",
  "ephemeralKeyId": "key-id"
}
```

**Behavior**:
- Retrieves active ephemeral key from session
- Validates scope permissions
- Decrypts private key
- Signs transaction (TODO: Implement Sui SDK signing)
- Logs signature in DelegatedSignature table
- Returns signature and public key

#### GET `/api/sessions/me`
**Purpose**: Get current session information

**Response**:
```json
{
  "session": {
    "id": "session-id",
    "status": "active",
    "expiresAt": "2024-01-01T00:00:00Z",
    "lastUsedAt": "2024-01-01T00:00:00Z"
  },
  "user": {
    "id": "user-id",
    "walletAddress": "0x..."
  },
  "ephemeralKeys": [
    {
      "id": "key-id",
      "scope": ["room:create"],
      "expiresAt": "2024-01-01T00:00:00Z"
    }
  ]
}
```

### 4.3 Child Wallets (`/api/child-wallet`)

**Authentication**: Required (JWT token)

#### POST `/api/child-wallet/create`
**Purpose**: Create a child wallet (ephemeral keypair) for auto-signing

**Request**:
```json
{
  "scope": ["room:create", "room:join"],
  "expiresInHours": 24
}
```

**Response**:
```json
{
  "childWallet": {
    "id": "key-id",
    "address": "0x...",
    "scope": ["room:create", "room:join"],
    "expiresAt": "2024-01-01T00:00:00Z",
    "issuedAt": "2024-01-01T00:00:00Z"
  }
}
```

**Behavior**:
- Validates scope values
- Generates Ed25519 keypair
- Encrypts private key
- Stores in EphemeralKey table
- Returns child wallet address

#### GET `/api/child-wallet/list`
**Purpose**: List active child wallets for current session

**Response**:
```json
{
  "childWallets": [
    {
      "id": "key-id",
      "address": "0x...",
      "scope": ["room:create"],
      "issuedAt": "2024-01-01T00:00:00Z",
      "expiresAt": "2024-01-01T00:00:00Z"
    }
  ]
}
```

#### POST `/api/child-wallet/sign`
**Purpose**: Sign transaction using child wallet

**Request**:
```json
{
  "ephemeralKeyId": "key-id",
  "txPayload": "base64-transaction",
  "requestedScope": "room:create"
}
```

**Response**:
```json
{
  "signature": "base64-signature",
  "publicKey": "0x...",
  "signedAt": "2024-01-01T00:00:00Z"
}
```

**Behavior**:
- Validates ephemeral key exists and not expired
- Checks scope permissions
- Decrypts private key
- Signs transaction using Sui SDK
- Logs in DelegatedSignature table

#### DELETE `/api/child-wallet/:id`
**Purpose**: Revoke a child wallet

**Response**:
```json
{
  "message": "Child wallet revoked successfully"
}
```

### 4.4 Rooms (`/api/rooms`)

#### GET `/api/rooms`
**Purpose**: Get all meeting rooms (with optional filters)

**Query Parameters**:
- `walletAddress` (optional): Filter rooms where user is host or participant
- `status` (optional): Filter by status (`scheduled`, `active`, `ended`)

**Response**:
```json
{
  "rooms": [
    {
      "roomId": "0x...",
      "title": "Team Meeting",
      "hosts": ["0x..."],
      "status": "scheduled",
      "maxParticipants": 10,
      "requireApproval": true,
      "participantCount": 2,
      "sealPolicyId": "0x...",
      "createdAt": "2024-01-01T00:00:00Z",
      "startedAt": null,
      "endedAt": null,
      "transactionDigest": "0x...",
      "language": "en",
      "timezone": "UTC",
      "recordingBlobId": null,
      "pendingApprovals": 1,
      "userRole": "HOST" | "PARTICIPANT" | null
    }
  ]
}
```

**Behavior**:
- Fetches from indexed `meeting_rooms` table
- Filters by wallet address (host or participant)
- Filters by status code (1=scheduled, 2=active, 3=ended)
- Includes related participants and metadata
- Determines user's role in each room

#### POST `/api/rooms`
**Purpose**: Acknowledge room creation (room already created on-chain)

**Request**:
```json
{
  "title": "Team Meeting",
  "description": "Optional description",
  "maxParticipants": 10,
  "initialParticipants": ["0x..."],
  "requireApproval": true,
  "walletAddress": "0x...",
  "onchainObjectId": "0x...",
  "hostCapId": "0x..."
}
```

**Response**:
```json
{
  "room": {
    "id": "0x...",
    "onchainObjectId": "0x...",
    "title": "Team Meeting",
    "requireApproval": true,
    "createdAt": "2024-01-01T00:00:00Z"
  },
  "memberships": 2,
  "indexed": true | false,
  "message": "Room creation acknowledged. Waiting for indexer to sync..."
}
```

**Behavior**:
- Validates required fields (title, onchainObjectId, walletAddress)
- Validates onchainObjectId format (Sui object ID)
- Checks if room already indexed
- If indexed: returns room data
- If not indexed: returns acknowledgment (indexer will sync later)

#### GET `/api/rooms/:roomId`
**Purpose**: Get room details by room ID

**Response**:
```json
{
  "room": {
    "roomId": "0x...",
    "title": "Team Meeting",
    "status": "scheduled",
    "maxParticipants": 10,
    "requireApproval": true,
    "participantCount": 2,
    "sealPolicyId": "0x...",
    "createdAt": "2024-01-01T00:00:00Z",
    "startedAt": null,
    "endedAt": null,
    "transactionDigest": "0x...",
    "checkpointSequenceNumber": 12345
  },
  "hosts": [
    {
      "address": "0x...",
      "adminCapId": "0x...",
      "joinedAt": "2024-01-01T00:00:00Z"
    }
  ],
  "participants": [
    {
      "address": "0x...",
      "joinedAt": "2024-01-01T00:00:00Z"
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
      "createdAt": "2024-01-01T00:00:00Z"
    }
  ]
}
```

**Authentication**: Not required (public endpoint)

#### POST `/api/rooms/:roomId/approval-request`
**Purpose**: Create an approval request for a room

**Authentication**: Required (JWT token)

**Response**:
```json
{
  "approvalRequest": {
    "id": "request-id",
    "roomId": "0x...",
    "requesterAddress": "0x...",
    "status": "pending",
    "createdAt": "2024-01-01T00:00:00Z"
  }
}
```

**Behavior**:
- Validates room exists and requires approval
- Checks user is not already a participant
- Checks no pending approval exists
- Creates ApprovalRequest record

#### POST `/api/rooms/:roomId/approve/:requestId`
**Purpose**: Approve a guest approval request

**Authentication**: Required (JWT token)

**Request**:
```json
{
  "txDigest": "0x..." // Optional: transaction digest from on-chain approval
}
```

**Response**:
```json
{
  "message": "Approval request approved",
  "txDigest": "0x..."
}
```

**Behavior**:
- Validates user is a host of the room
- Updates ApprovalRequest status to "approved"
- Records resolver address and transaction digest

#### POST `/api/rooms/:roomId/deny/:requestId`
**Purpose**: Deny a guest approval request

**Authentication**: Required (JWT token)

**Response**:
```json
{
  "message": "Approval request denied"
}
```

**Behavior**:
- Validates user is a host of the room
- Updates ApprovalRequest status to "denied"
- Records resolver address

### 4.5 Signaling (`/api/signaling`)

**Purpose**: WebRTC signaling for peer-to-peer video connections

**Note**: Currently in-memory implementation (development only)

#### POST `/api/signaling/:roomId/offer`
**Purpose**: Store WebRTC offer

**Request**:
```json
{
  "sdp": "offer-sdp-string"
}
```

#### GET `/api/signaling/:roomId/offer`
**Purpose**: Retrieve WebRTC offer

#### POST `/api/signaling/:roomId/answer`
**Purpose**: Store WebRTC answer

**Request**:
```json
{
  "sdp": "answer-sdp-string"
}
```

#### GET `/api/signaling/:roomId/answer`
**Purpose**: Retrieve WebRTC answer

#### POST `/api/signaling/:roomId/candidates`
**Purpose**: Store ICE candidate

**Request**:
```json
{
  "candidate": { /* ICE candidate object */ },
  "from": "host" | "guest"
}
```

#### GET `/api/signaling/:roomId/candidates`
**Purpose**: Retrieve ICE candidates

**Query Parameters**:
- `role`: "host" | "guest" (returns opposite role's candidates)

#### POST `/api/signaling/:roomId/end`
**Purpose**: End call and cleanup signaling data

**Request**:
```json
{
  "role": "host" | "guest"
}
```

**Behavior**:
- If host: deletes all room signaling data
- If guest: acknowledges (room data remains)

## 5. Authentication & Authorization

### 5.1 Authentication Flow

1. **Nonce Generation**: Frontend requests nonce for wallet address
2. **Signature**: User signs nonce with wallet
3. **Verification**: Backend verifies signature (TODO: Implement Sui SDK verification)
4. **Session Creation**: Backend creates User, Wallet, Session records
5. **Token Generation**: Backend generates JWT access token and refresh token
6. **Token Usage**: Frontend includes access token in `Authorization: Bearer <token>` header

### 5.2 JWT Token Structure

```typescript
{
  sub: string;      // User ID
  wal: string;       // Wallet address
  sid: string;       // Session ID
  ekey?: string;     // Ephemeral key ID (optional)
  scope?: string;    // Comma-separated scopes (optional)
  iat: number;      // Issued at
  exp: number;       // Expiration
}
```

### 5.3 Authorization

- **Public Endpoints**: `/api/rooms` (GET), `/api/rooms/:roomId` (GET)
- **Authenticated Endpoints**: All other endpoints require JWT token
- **Role-Based**: Room approval endpoints require user to be a host

### 5.4 Ephemeral Key Scopes

Valid scopes for ephemeral keys:
- `room:create` - Create meeting rooms
- `room:approve` - Approve guest requests
- `room:revoke` - Revoke guest access
- `room:join` - Join rooms
- `room:leave` - Leave rooms

## 6. Security Considerations

### 6.1 Encryption
- **Private Keys**: Encrypted with AES-256-GCM before storage
- **Encryption Key**: Must be 32-byte hex string (from environment variable)
- **IV**: Random 16-byte IV per encryption
- **Auth Tag**: GCM authentication tag for integrity

### 6.2 Token Security
- **Access Tokens**: Short-lived (15 minutes default)
- **Refresh Tokens**: Longer-lived (7 days default), hashed before storage
- **Token Rotation**: Refresh tokens can be rotated on use
- **Revocation**: Sessions can be revoked, invalidating all tokens

### 6.3 Nonce Security
- **Expiration**: Nonces expire after 10 minutes
- **Single Use**: Nonces are marked as consumed after verification
- **Random Generation**: 32-byte cryptographically secure random nonces

### 6.4 CORS
- **Development**: Allows all origins
- **Production**: Restricted to configured origins
- **Credentials**: CORS configured to allow credentials

### 6.5 TODO: Signature Verification
- Currently placeholder - needs Sui SDK implementation
- Should verify wallet signature matches nonce and wallet address

## 7. Database Schema

### 7.1 Indexed Tables (Read-Only)

**MeetingRoom**:
- `roomId` (PK): Sui object ID
- `title`: Room title
- `hosts`: Array of host addresses
- `sealPolicyId`: Seal access control policy ID
- `status`: 1=scheduled, 2=active, 3=ended
- `maxParticipants`: Maximum participants
- `requireApproval`: Boolean
- `participantCount`: Current participant count
- `createdAt`, `startedAt`, `endedAt`: Unix timestamps
- `checkpointSequenceNumber`: Sui checkpoint
- `transactionDigest`: Sui transaction digest

**RoomParticipant**:
- Composite key: `roomId` + `participantAddress`
- `role`: "HOST" | "PARTICIPANT"
- `adminCapId`: Admin capability ID (for hosts)
- `joinedAt`: Timestamp

**RoomMetadata**:
- `roomId` (PK): Links to MeetingRoom
- `dynamicFieldId`: Sui dynamic field ID
- `language`: Language code
- `timezone`: Timezone string
- `recordingBlobId`: Walrus blob ID for recordings

### 7.2 Backend-Managed Tables

**User**:
- `id` (PK): CUID
- `primaryWalletAddress`: Primary wallet address
- `createdAt`, `updatedAt`: Timestamps

**Wallet**:
- `id` (PK): CUID
- `userId`: Foreign key to User
- `address` (Unique): Wallet address
- `type`: "sui" | "zklogin"
- `status`: "active" | "inactive"

**Session**:
- `id` (PK): CUID
- `userId`, `walletId`: Foreign keys
- `jwtId`: Unique JWT identifier
- `status`: "active" | "expired" | "revoked"
- `expiresAt`: Session expiration
- `encryptedPrivateKey`: Encrypted ephemeral private key
- `lastUsedAt`: Last activity timestamp

**EphemeralKey**:
- `id` (PK): CUID
- `sessionId`: Foreign key to Session
- `publicKey`: Ed25519 public key
- `encryptedPublicKey`: Optional encrypted public key
- `alg`: "ed25519"
- `scope`: Comma-separated scopes
- `issuedAt`, `expiresAt`, `revokedAt`: Timestamps

**ApprovalRequest**:
- `id` (PK): CUID
- `roomId`: Foreign key to MeetingRoom
- `requesterAddress`: Wallet address requesting access
- `status`: "pending" | "approved" | "denied"
- `createdAt`, `resolvedAt`: Timestamps
- `resolverAddress`: Host address that resolved request
- `resolutionTxDigest`: On-chain transaction digest (if applicable)

## 8. Configuration

### 8.1 Environment Variables

```env
# Database
DATABASE_URL=postgresql://user:pass@host:5432/db

# JWT
JWT_SECRET=your-secret-key
JWT_EXPIRES_IN=15m
REFRESH_TOKEN_EXPIRES_IN=7d

# Session
SESSION_MAX_AGE=86400000  # 24 hours in ms
EPHEMERAL_KEY_EXPIRES_IN=1800000  # 30 minutes in ms

# Sui
SUI_NETWORK=testnet
SUI_PACKAGE_ID=0x...
SUI_CLOCK_OBJECT_ID=0x6

# Server
PORT=3001
NODE_ENV=development
CORS_ORIGIN=http://localhost:3000

# Encryption
ENCRYPTION_KEY=32-byte-hex-key  # Generate with: openssl rand -hex 32
```

## 9. Error Handling

### 9.1 Error Response Format

```json
{
  "error": "Error message"
}
```

### 9.2 HTTP Status Codes

- `200`: Success
- `400`: Bad Request (validation errors)
- `401`: Unauthorized (missing or invalid token)
- `403`: Forbidden (insufficient permissions)
- `404`: Not Found
- `500`: Internal Server Error

## 10. Future Enhancements

### 10.1 Planned Features
- [ ] Implement Sui signature verification in `/api/auth/verify`
- [ ] Implement Sui transaction signing in auto-sign endpoints
- [ ] Persistent signaling server (replace in-memory implementation)
- [ ] Rate limiting for API endpoints
- [ ] WebSocket support for real-time updates
- [ ] Room recording management
- [ ] Analytics and metrics endpoints

### 10.2 Technical Debt
- [ ] Align Prisma schema timestamp precision with Rust indexer migrations
- [ ] Add missing indexes to match Rust indexer schema
- [ ] Implement proper Sui SDK integration for all blockchain operations
- [ ] Add comprehensive error logging and monitoring
- [ ] Add API documentation (OpenAPI/Swagger)
- [ ] Add integration tests
- [ ] Add database migration strategy for production

## 11. Dependencies

### 11.1 Production Dependencies
- `@mysten/sui`: Sui blockchain SDK
- `@mysten/sui.js`: Legacy Sui SDK (for compatibility)
- `@prisma/client`: Prisma ORM client
- `express`: Web framework
- `jsonwebtoken`: JWT token generation/verification
- `cors`: CORS middleware
- `dotenv`: Environment variable management

### 11.2 Development Dependencies
- `typescript`: TypeScript compiler
- `tsx`: TypeScript execution
- `prisma`: Prisma CLI
- `@types/*`: TypeScript type definitions

## 12. API Versioning

Currently no versioning strategy implemented. All endpoints are under `/api/*` prefix.

**Recommendation**: Implement versioning (e.g., `/api/v1/*`) before production release.

## 13. Performance Considerations

### 13.1 Database Indexes
- MeetingRoom: Indexed on `checkpointSequenceNumber`, `createdAt`, `hosts`, `status`
- RoomParticipant: Indexed on `participantAddress`, `roomId`, `role`
- Session: Indexed on `userId`, `walletId`, `status`, `expiresAt`
- EphemeralKey: Indexed on `sessionId`, `expiresAt`

### 13.2 Query Optimization
- Room listing limited to 100 results
- Includes related data (participants, metadata) in single query
- Uses Prisma's relation includes for efficient joins

### 13.3 Caching
Currently no caching implemented. Consider:
- Redis for session token caching
- Query result caching for room listings
- Nonce caching to prevent duplicate generation

## 14. Monitoring & Logging

### 14.1 Current State
- Console logging for errors and important events
- No structured logging framework
- No metrics collection

### 14.2 Recommendations
- Implement structured logging (e.g., Winston, Pino)
- Add request/response logging middleware
- Integrate error tracking (e.g., Sentry)
- Add performance monitoring (e.g., New Relic, Datadog)
- Add health check endpoint with detailed status

## 15. Testing Strategy

### 15.1 Current State
- No automated tests implemented

### 15.2 Recommendations
- Unit tests for utility functions (crypto, JWT)
- Integration tests for API endpoints
- End-to-end tests for authentication flow
- Database migration tests
- Load testing for high-traffic endpoints

---

**Document Version**: 1.0  
**Last Updated**: 2024-01-01  
**Maintained By**: SuiMeet Development Team

