# Quick Setup: Enable Room Creation in Frontend

## 3-Minute Setup

### Step 1: Configure Frontend Environment
```bash
cd frontend-app
cp .env.example .env.local
```

Edit `.env.local`:
```env
NEXT_PUBLIC_API_URL=http://localhost:3001/api
NEXT_PUBLIC_SUI_NETWORK=testnet
```

### Step 2: Start Backend
```bash
cd backend
npm install
npm run dev
```
Should print: `🚀 Server running on port 3001`

### Step 3: Start Frontend
```bash
cd frontend-app
npm install
npm run dev
```
Should print: `▲ Next.js on http://localhost:3000`

## Test It

1. Visit `http://localhost:3000`
2. Click **"Create Your First Room"** (if wallet connected) or **"Get Started"**
3. Connect your Sui wallet
4. Navigate to `/room`
5. Fill in form:
   - Title: "Test Meeting"
   - Date & Time: Any future date/time
   - Duration: 60 min
   - Add 2-3 test wallet addresses
6. Click **"Create & Seal Invite"**
7. See success message with room ID and invite link

## What Changed

| Before | After |
|--------|-------|
| Direct blockchain transactions | Backend API integration |
| Room ID from on-chain events | Room ID from backend response |
| No persistent storage | Rooms saved in database |
| Manual Sui transaction handling | Automatic API calls |

## API Endpoints Used

```
POST /api/rooms
  Create a new meeting room

GET /api/rooms/:roomId
  Get room details

POST /api/rooms/:roomId/approve
  Approve a guest
```

## Troubleshooting

### "Failed to create room"
- Check backend is running on http://localhost:3001
- Verify `NEXT_PUBLIC_API_URL` in `.env.local`
- Check browser console for error details

### "Cannot GET /api/rooms"
- Backend not started or crashed
- Run `npm run dev` in backend directory

### CORS errors
- Backend CORS is configured for localhost:3000
- Check `.env` file `CORS_ORIGIN=http://localhost:3000`

## Files Modified
- `frontend-app/src/app/room/page.tsx` - Added API integration
- `frontend-app/src/lib/api.ts` - NEW API client
- `frontend-app/src/hooks/useToken.ts` - NEW token management
- `frontend-app/.env.example` - Updated with API URL

## Next Steps
- See `frontend-app/ROOM_CREATION_GUIDE.md` for detailed documentation
- Review `src/lib/api.ts` for API client implementation
- Test the guest approval workflow

---

**That's it!** Your frontend can now create rooms with backend persistence.
