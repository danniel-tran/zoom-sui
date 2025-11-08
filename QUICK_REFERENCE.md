# Child Wallet Quick Reference

## Installation Complete ✅

Your project now has:
- ✅ Token refresh system
- ✅ Child wallet (ephemeral keypair) system
- ✅ Auto-signing capability
- ✅ Scope-based permissions

## Quick Start

### 1. Backend Setup

Add to `backend/.env`:
```bash
JWT_SECRET=your-secret-key-here
JWT_EXPIRES_IN=15m
REFRESH_TOKEN_EXPIRES_IN=2592000
SESSION_MAX_AGE=2592000000
ENCRYPTION_KEY=$(openssl rand -hex 32)
```

### 2. Frontend Usage

#### Simple Authentication
```typescript
import { useAuth } from '@/hooks/useAuth';

function App() {
  const { authenticate, isAuthenticated } = useAuth();
  
  // User signs ONCE
  await authenticate();
}
```

#### Create Child Wallet
```typescript
import { useChildWallet } from '@/hooks/useChildWallet';

function MyComponent() {
  const { createChildWallet, autoSign } = useChildWallet();
  
  // Create child wallet (one-time setup)
  const wallet = await createChildWallet(
    ['room:join', 'room:leave'],  // scopes
    24  // expires in 24 hours
  );
  
  // Now use for auto-signing (no user prompt!)
  const signature = await autoSign(
    wallet.id,
    transactionPayload,
    'room:join'
  );
}
```

## API Endpoints

### Authentication
```bash
POST /api/auth/nonce          # Get nonce
POST /api/auth/verify         # Sign in (returns tokens)
POST /api/auth/refresh        # Refresh access token
```

### Child Wallet
```bash
POST   /api/child-wallet/create    # Create child wallet
GET    /api/child-wallet/list      # List child wallets
POST   /api/child-wallet/sign      # Auto-sign transaction
DELETE /api/child-wallet/:id       # Revoke child wallet
```

## Complete Example

```typescript
'use client';

import { useAuth } from '@/hooks/useAuth';
import { useChildWallet } from '@/hooks/useChildWallet';
import { useEffect, useState } from 'react';

export function MyApp() {
  const { isAuthenticated, authenticate } = useAuth();
  const { createChildWallet, autoSign } = useChildWallet();
  const [childWallet, setChildWallet] = useState(null);

  // Step 1: Authenticate (user signs ONCE)
  useEffect(() => {
    if (!isAuthenticated) {
      authenticate();
    }
  }, [isAuthenticated]);

  // Step 2: Create child wallet
  useEffect(() => {
    if (isAuthenticated && !childWallet) {
      createChildWallet(['room:join', 'room:leave'], 24)
        .then(setChildWallet);
    }
  }, [isAuthenticated]);

  // Step 3: Use child wallet for transactions
  const handleJoinRoom = async (roomId: string) => {
    if (!childWallet) return;

    // Build transaction
    const tx = buildJoinRoomTx(roomId, childWallet.address);
    const txBytes = await tx.build();
    const txPayload = Buffer.from(txBytes).toString('base64');

    // Auto-sign (NO USER PROMPT!)
    const result = await autoSign(
      childWallet.id,
      txPayload,
      'room:join'
    );

    // Submit to blockchain
    await submitTransaction(txBytes, result.signature);
  };

  return (
    <button onClick={() => handleJoinRoom('room123')}>
      Join Room (Auto-signed!)
    </button>
  );
}
```

## Available Scopes

- `room:create` - Create rooms
- `room:join` - Join rooms
- `room:leave` - Leave rooms
- `room:approve` - Approve guests
- `room:revoke` - Revoke memberships
- `poap:mint` - Mint POAP NFTs

## Key Benefits

✨ **User signs once** - No repeated wallet prompts
🔒 **Secure** - Private keys encrypted, scoped permissions
⚡ **Fast** - Transactions auto-signed instantly
🔄 **Auto-refresh** - Tokens refresh automatically
📝 **Auditable** - All signatures logged

## Files Created

### Backend
- `backend/src/routes/childWallet.ts` - Child wallet endpoints
- `backend/src/middleware/auth.ts` - Authentication middleware

### Frontend
- `frontend-app/src/hooks/useAuth.ts` - Authentication hook
- `frontend-app/src/hooks/useChildWallet.ts` - Child wallet hook
- `frontend-app/src/components/ChildWalletManager.tsx` - Example component

### Documentation
- `CHILD_WALLET_GUIDE.md` - Full documentation
- `QUICK_REFERENCE.md` - This file

## Next Steps

1. Add `ENCRYPTION_KEY` to backend `.env`
2. Update existing code to use `useAuth` and `useChildWallet`
3. Test authentication flow
4. Test child wallet creation and auto-signing
5. Deploy and enjoy seamless UX!

## Need Help?

See `CHILD_WALLET_GUIDE.md` for:
- Detailed API documentation
- Security considerations
- Troubleshooting guide
- Best practices
