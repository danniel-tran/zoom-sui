# SuiMeet Backend

Backend API for SuiMeet - JWT session management with auto-sign support for Sui blockchain transactions.

## Features

- 🔐 JWT-based authentication with wallet signatures
- 🔑 Ephemeral key management for auto-signing
- 🏠 Room creation and management
- ✅ Guest approval system
- 🔒 Encrypted private key storage
- 📊 PostgreSQL database with Prisma Accelerate

## Setup

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables (create `.env` file):
```env
DATABASE_URL="prisma+postgres://accelerate.prisma-data.net/?api_key=YOUR_API_KEY"
JWT_SECRET=your-super-secret-jwt-key-change-in-production
ENCRYPTION_KEY=your-32-byte-hex-key  # Generate with: openssl rand -hex 32
```

3. Generate Prisma Client:
```bash
npm run prisma:generate
```

4. Run migrations:
```bash
npm run prisma:migrate
```

5. Start development server:
```bash
npm run dev
```

## API Endpoints

### Authentication

- `POST /api/auth/nonce` - Generate nonce for wallet authentication
- `POST /api/auth/verify` - Verify signature and create session
- `POST /api/auth/refresh` - Refresh access token

### Sessions

- `POST /api/sessions/ephemeral-key` - Create ephemeral key for auto-signing
- `POST /api/sessions/auto-sign` - Auto-sign transaction
- `GET /api/sessions/me` - Get current session info

### Rooms

- `POST /api/rooms` - Create a new meeting room
- `GET /api/rooms/:roomId` - Get room details
- `POST /api/rooms/:roomId/approve` - Approve a guest

## Architecture

- **Authentication Flow**: Wallet → Nonce → Signature → JWT Session
- **Auto-Sign Flow**: Ephemeral Key → Encrypted Storage → Auto-Sign API
- **Room Management**: On-chain Sui objects + Off-chain Prisma records

## Database Schema

See `prisma/schema.prisma` for full schema with:
- User & Wallet management
- Session & JWT tokens
- Ephemeral keys for auto-signing
- Room & Membership tracking
- POAP minting records
- P2P session logs

