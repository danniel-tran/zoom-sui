# Room Creation Integration Guide

## Overview

The frontend has been updated to support room creation both through the Sui blockchain and the backend API. This guide explains the implementation and how to set it up.

## Features

- ✅ Create secure meeting rooms with wallet authentication
- ✅ Whitelist management (add/remove participants)
- ✅ Backend API integration for persistent room storage
- ✅ Real-time room status management
- ✅ Guest approval workflow
- ✅ Invite link generation and sharing

## Architecture

### Components

1. **API Client** (`src/lib/api.ts`)
   - Communicates with backend REST API
   - Handles authentication tokens
   - Type-safe request/response interfaces

2. **Room Page** (`src/app/room/page.tsx`)
   - Two-view system: Create and Manage
   - Form validation and error handling
   - Real-time whitelist updates

3. **Auth Context** (`src/context/AuthContext.tsx`)
   - Manages wallet connection state
   - Provides user address and balance

4. **Token Hook** (`src/hooks/useToken.ts`)
   - Manages JWT token acquisition
   - Signs messages for backend authentication

## Setup

### 1. Environment Configuration

Create a `.env.local` file in the frontend-app directory:

```bash
cp .env.example .env.local
```

Update the values:

```env
# Backend API endpoint
NEXT_PUBLIC_API_URL=http://localhost:3001/api

# Sui configuration
NEXT_PUBLIC_SUI_NETWORK=testnet

# Your deployed package ID
NEXT_PUBLIC_PACKAGE_ID=0x...
```

### 2. Start Backend Server

```bash
cd backend
npm install
npm run dev
```

Backend will run on `http://localhost:3001`

### 3. Start Frontend

```bash
cd frontend-app
npm install
npm run dev
```

Frontend will run on `http://localhost:3000`

## API Endpoints Used

### Create Room

**Endpoint:** `POST /api/rooms`

**Request:**
```json
{
  "title": "Team Sync Meeting",
  "initialParticipants": ["0x123...", "0x456..."],
  "requireApproval": true,
  "walletAddress": "0xuser..."
}
```

**Response:**
```json
{
  "room": {
    "id": "room_123",
    "onchainObjectId": "0x...",
    "title": "Team Sync Meeting",
    "requireApproval": true,
    "createdAt": "2025-11-05T..."
  },
  "memberships": 2
}
```

### Get Room Details

**Endpoint:** `GET /api/rooms/:roomId`

Returns room information including whitelist and approval status.

### Approve Guest

**Endpoint:** `POST /api/rooms/:roomId/approve`

**Request:**
```json
{
  "guestAddress": "0xguest..."
}
```

## Flow

### Creating a Room

1. User connects wallet (via Sui wallet kit)
2. Fills in room details (title, date, time, duration)
3. Adds participant addresses to whitelist
4. Submits form → **API call to backend**
5. Backend creates room in database
6. Backend returns room ID
7. Frontend generates invite link and displays management view

### Managing a Room

1. Host can approve/revoke guest access
2. Guest addresses are managed in the whitelist
3. Changes are persisted via API calls

## Error Handling

The implementation includes:
- Form validation (Sui address format)
- API error messages
- User-friendly error display
- Loading states for async operations

## Future Enhancements

### Authentication

The current implementation doesn't include JWT token validation. To implement:

1. Backend should issue JWT tokens via `/api/auth/verify`
2. Frontend signs a message with wallet
3. Backend validates signature and returns JWT
4. Frontend includes JWT in API requests

Example implementation in `src/hooks/useToken.ts` (currently stubbed out).

### On-Chain Integration

The room creation currently only uses the backend API. To add on-chain Sui transactions:

1. Generate Sui transaction in frontend
2. User signs transaction with wallet
3. Execute on-chain
4. Backend verifies on-chain creation via Sui RPC
5. Link on-chain object ID with database record

### Calendar Integration

- Google Calendar invite generation
- Outlook calendar sync
- Automated meeting reminders

## Database Schema

The backend uses Prisma with the following models:

- **Room** - Meeting room metadata
- **Wallet** - User wallet information
- **RoomMembership** - Room participant relationships
- **ApprovalRequest** - Guest approval workflow

## Testing

### Create a Test Room

1. Connect wallet at `http://localhost:3000/login`
2. Navigate to `/room`
3. Fill in room details
4. Add 2-3 test addresses
5. Click "Create & Seal Invite"

### Test Room Management

1. After creation, you'll see the "Manage Room" view
2. Test adding new guests
3. Test revoking guest access
4. Share invite link with others

## Troubleshooting

### Backend Connection Issues

- Verify backend is running on `http://localhost:3001`
- Check `NEXT_PUBLIC_API_URL` environment variable
- Look for CORS errors in browser console

### Missing Room ID

- Check browser console for API response
- Verify backend database is initialized
- Run `npm run prisma:migrate` in backend

### Whitelist Validation

- Sui addresses must start with `0x`
- Must be 3-66 characters long
- Must be hexadecimal

## Support

For issues or questions:
1. Check browser console for errors
2. Review backend logs
3. Verify environment configuration
4. Check Sui network connectivity
