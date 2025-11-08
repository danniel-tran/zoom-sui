# Child Wallet & Token Refresh Guide

This guide explains how to use the **token refresh** and **child wallet** system to enable seamless authentication without requiring users to repeatedly sign with their main wallet.

## Overview

### Problem
In traditional blockchain apps, every transaction requires the user to manually sign with their wallet, which creates friction and poor UX.

### Solution
We implement a **child wallet** (ephemeral keypair) system that:
1. Users sign **once** with their main wallet to authenticate
2. Backend generates a **refresh token** for long-term sessions
3. Backend creates **child wallets** (ephemeral keypairs) with scoped permissions
4. Transactions are **auto-signed** using the child wallet within allowed scopes
5. No repeated wallet prompts needed!

## Architecture

```
┌──────────────┐
│  Main Wallet │ ──(sign once)──> Authentication
└──────────────┘
       │
       ├─> Access Token (short-lived, 15min)
       ├─> Refresh Token (long-lived, 30 days)
       │
       v
┌──────────────┐
│Child Wallet  │ ──(auto-sign)──> Transactions
│(Ephemeral)   │   - room:create
└──────────────┘   - room:join
                   - room:leave
                   - poap:mint
```

## Backend Implementation

### 1. Token Refresh System

Already implemented in `backend/src/routes/auth.ts`:

```typescript
// POST /api/auth/verify
// Returns: { accessToken, refreshToken, session }

// POST /api/auth/refresh
// Input: { refreshToken }
// Returns: { accessToken }
```

**Token Lifetimes:**
- Access Token: 15 minutes (configurable via `JWT_EXPIRES_IN`)
- Refresh Token: 30 days (configurable via `REFRESH_TOKEN_EXPIRES_IN`)
- Session: 30 days (configurable via `SESSION_MAX_AGE`)

### 2. Child Wallet System

New endpoints in `backend/src/routes/childWallet.ts`:

#### Create Child Wallet
```http
POST /api/child-wallet/create
Authorization: Bearer <accessToken>
Content-Type: application/json

{
  "scope": ["room:create", "room:join", "room:leave"],
  "expiresInHours": 24
}
```

**Response:**
```json
{
  "childWallet": {
    "id": "clxxx...",
    "address": "0x123abc...",
    "scope": ["room:create", "room:join", "room:leave"],
    "expiresAt": "2025-11-07T16:00:00Z",
    "issuedAt": "2025-11-06T16:00:00Z"
  }
}
```

#### List Child Wallets
```http
GET /api/child-wallet/list
Authorization: Bearer <accessToken>
```

#### Auto-Sign Transaction
```http
POST /api/child-wallet/sign
Authorization: Bearer <accessToken>
Content-Type: application/json

{
  "ephemeralKeyId": "clxxx...",
  "txPayload": "base64_encoded_transaction",
  "requestedScope": "room:join"
}
```

**Response:**
```json
{
  "signature": "base64_signature",
  "publicKey": "0x123abc...",
  "signedAt": "2025-11-06T16:30:00Z"
}
```

#### Revoke Child Wallet
```http
DELETE /api/child-wallet/:id
Authorization: Bearer <accessToken>
```

### 3. Scope System

Valid scopes:
- `room:create` - Create new rooms
- `room:join` - Join existing rooms
- `room:leave` - Leave rooms
- `room:approve` - Approve guests
- `room:revoke` - Revoke memberships
- `poap:mint` - Mint POAP NFTs

Each child wallet is restricted to its assigned scopes for security.

## Frontend Implementation

### 1. Authentication Hook (`useAuth`)

```typescript
import { useAuth } from '@/hooks/useAuth';

function MyComponent() {
  const {
    isAuthenticated,
    authenticate,      // Sign with main wallet once
    refreshAccessToken, // Manually refresh
    refreshTokenIfNeeded, // Auto-refresh if needed
    logout,
  } = useAuth();

  // Authenticate once
  await authenticate();
  
  // Token auto-refreshes before expiry
}
```

**Features:**
- Stores tokens in `localStorage` for persistence
- Auto-refreshes access token 5 minutes before expiry
- Checks every minute for refresh needs
- Handles refresh token expiration gracefully

### 2. Child Wallet Hook (`useChildWallet`)

```typescript
import { useChildWallet } from '@/hooks/useChildWallet';

function MyComponent() {
  const {
    childWallets,
    createChildWallet,
    autoSign,
    revokeChildWallet,
  } = useChildWallet();

  // Create child wallet
  const wallet = await createChildWallet(
    ['room:join', 'room:leave'],
    24 // expires in 24 hours
  );

  // Auto-sign transaction (no user prompt!)
  const result = await autoSign(
    wallet.id,
    txPayloadBase64,
    'room:join'
  );
}
```

### 3. Example Usage

See `frontend-app/src/components/ChildWalletManager.tsx` for a complete example.

```typescript
'use client';

import { ChildWalletManager } from '@/components/ChildWalletManager';

export default function Dashboard() {
  return <ChildWalletManager />;
}
```

## Security Considerations

### 1. Private Key Storage
- Child wallet private keys are **encrypted** using AES-256-GCM
- Encryption key stored in `ENCRYPTION_KEY` env variable
- Never exposed to frontend

### 2. Scope Restrictions
- Each child wallet has limited permissions
- Backend validates scope before signing
- Prevents unauthorized actions

### 3. Expiration
- Child wallets auto-expire (default 24 hours)
- Can be revoked manually anytime
- Access tokens expire after 15 minutes
- Refresh tokens expire after 30 days

### 4. Audit Trail
- All auto-signed transactions logged in `DelegatedSignature` table
- Includes: transaction hash, scope, timestamp
- Full traceability

## Database Schema

### EphemeralKey
```prisma
model EphemeralKey {
  id                 String    @id @default(cuid())
  sessionId          String
  publicKey          String    // Sui address
  encryptedPublicKey String?
  alg                String    // "ed25519"
  scope              String    // "room:create,room:join"
  issuedAt           DateTime  @default(now())
  expiresAt          DateTime
  revokedAt          DateTime?
}
```

### Session
```prisma
model Session {
  id                  String
  encryptedPrivateKey String? // Encrypted child wallet private key
  // ... other fields
}
```

### DelegatedSignature
```prisma
model DelegatedSignature {
  id             String
  sessionId      String
  txTemplateHash String
  signature      String
  scope          String
  expiresAt      DateTime
  createdAt      DateTime
}
```

## Configuration

### Backend (.env)
```bash
# JWT Settings
JWT_SECRET=your-secret-key
JWT_EXPIRES_IN=15m
REFRESH_TOKEN_EXPIRES_IN=2592000  # 30 days in seconds
SESSION_MAX_AGE=2592000000        # 30 days in milliseconds

# Encryption
ENCRYPTION_KEY=your-64-char-hex-key
```

### Frontend (.env.local)
```bash
NEXT_PUBLIC_API_URL=http://localhost:8080/api
```

## Usage Flow

### Initial Setup (First Time)
```typescript
// 1. User connects wallet
const currentAccount = useCurrentAccount();

// 2. User signs once to authenticate
const { authenticate } = useAuth();
await authenticate(); // Prompts wallet signature

// 3. Create child wallet
const { createChildWallet } = useChildWallet();
const childWallet = await createChildWallet(['room:join', 'room:leave'], 24);
```

### Subsequent Usage (No More Signing!)
```typescript
// 4. Use child wallet to auto-sign transactions
const { autoSign } = useChildWallet();

// Build transaction
const tx = buildJoinRoomTransaction(roomId, childWallet.address);
const txBytes = await tx.build();
const txPayload = Buffer.from(txBytes).toString('base64');

// Auto-sign (no user prompt!)
const signature = await autoSign(childWallet.id, txPayload, 'room:join');

// Submit transaction
await submitTransaction(txBytes, signature);
```

### Token Refresh (Automatic)
```typescript
// Access token automatically refreshes before expiry
// No action needed - handled by useAuth hook

// Manual refresh if needed:
const { refreshAccessToken } = useAuth();
await refreshAccessToken();
```

## Best Practices

1. **Scope Principle of Least Privilege**
   - Only grant necessary scopes to child wallets
   - Create separate child wallets for different features if needed

2. **Expiration Times**
   - Use shorter expiration for sensitive operations
   - Default 24 hours is good for most use cases

3. **Revocation**
   - Revoke child wallets when session ends
   - Implement logout to clear all tokens

4. **Error Handling**
   - Handle refresh token expiration gracefully
   - Re-authenticate user if refresh token invalid

5. **Security**
   - Rotate `JWT_SECRET` and `ENCRYPTION_KEY` regularly
   - Use HTTPS in production
   - Never log private keys or tokens

## Testing

### Test Authentication Flow
```bash
# 1. Get nonce
curl -X POST http://localhost:8080/api/auth/nonce \
  -H "Content-Type: application/json" \
  -d '{"walletAddress":"0x123..."}'

# 2. Verify signature (returns tokens)
curl -X POST http://localhost:8080/api/auth/verify \
  -H "Content-Type: application/json" \
  -d '{"walletAddress":"0x123...","signature":"..."}'

# 3. Refresh token
curl -X POST http://localhost:8080/api/auth/refresh \
  -H "Content-Type: application/json" \
  -d '{"refreshToken":"..."}'
```

### Test Child Wallet
```bash
# 1. Create child wallet
curl -X POST http://localhost:8080/api/child-wallet/create \
  -H "Authorization: Bearer <accessToken>" \
  -H "Content-Type: application/json" \
  -d '{"scope":["room:join"],"expiresInHours":24}'

# 2. List child wallets
curl http://localhost:8080/api/child-wallet/list \
  -H "Authorization: Bearer <accessToken>"

# 3. Auto-sign transaction
curl -X POST http://localhost:8080/api/child-wallet/sign \
  -H "Authorization: Bearer <accessToken>" \
  -H "Content-Type: application/json" \
  -d '{"ephemeralKeyId":"...","txPayload":"base64...","requestedScope":"room:join"}'

# 4. Revoke child wallet
curl -X DELETE http://localhost:8080/api/child-wallet/<id> \
  -H "Authorization: Bearer <accessToken>"
```

## Troubleshooting

### "Invalid or expired token"
- Access token expired - refresh automatically handled by `useAuth`
- If refresh token expired, user must re-authenticate

### "Child wallet not found"
- Child wallet expired or revoked
- Create a new child wallet

### "Insufficient permissions"
- Requested scope not in child wallet's allowed scopes
- Create child wallet with required scope

### "Encryption key not configured"
- Set `ENCRYPTION_KEY` in backend `.env`
- Generate: `openssl rand -hex 32`

## Migration Guide

If you have existing authentication:

1. Update backend with new routes (already added)
2. Add middleware to `index.ts` (already added)
3. Update frontend to use `useAuth` hook
4. Replace manual signing with `useChildWallet` hook
5. Test thoroughly in development

## Next Steps

- [ ] Implement scope-based transaction templates
- [ ] Add child wallet usage analytics
- [ ] Implement automatic child wallet rotation
- [ ] Add biometric re-authentication for sensitive scopes
- [ ] Multi-device session management
