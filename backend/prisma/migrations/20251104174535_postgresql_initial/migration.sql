-- CreateEnum
CREATE TYPE "WalletType" AS ENUM ('sui', 'zklogin');

-- CreateEnum
CREATE TYPE "SessionStatus" AS ENUM ('active', 'revoked', 'expired');

-- CreateEnum
CREATE TYPE "MembershipRole" AS ENUM ('host', 'guest');

-- CreateEnum
CREATE TYPE "MembershipStatus" AS ENUM ('active', 'revoked');

-- CreateEnum
CREATE TYPE "ApprovalStatus" AS ENUM ('pending', 'approved', 'denied');

-- CreateEnum
CREATE TYPE "PoapMintStatus" AS ENUM ('pending', 'minted', 'failed');

-- CreateEnum
CREATE TYPE "P2PEventType" AS ENUM ('join', 'leave', 'mute', 'share');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "primaryWalletAddress" VARCHAR(100),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Wallet" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "address" VARCHAR(100) NOT NULL,
    "type" "WalletType" NOT NULL DEFAULT 'sui',
    "status" VARCHAR(32) NOT NULL DEFAULT 'active',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Wallet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AuthNonce" (
    "id" TEXT NOT NULL,
    "walletAddress" VARCHAR(100) NOT NULL,
    "nonce" VARCHAR(255) NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "consumedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AuthNonce_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "walletId" TEXT NOT NULL,
    "jwtId" VARCHAR(255) NOT NULL,
    "status" "SessionStatus" NOT NULL DEFAULT 'active',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "lastUsedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "ip" VARCHAR(64),
    "ua" VARCHAR(512),
    "encryptedPrivateKey" TEXT,
    "lastPolicyUpdateAt" TIMESTAMP(3),

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RefreshToken" (
    "id" TEXT NOT NULL,
    "sessionId" TEXT NOT NULL,
    "tokenHash" VARCHAR(255) NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "revokedAt" TIMESTAMP(3),
    "rotationCounter" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "RefreshToken_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EphemeralKey" (
    "id" TEXT NOT NULL,
    "sessionId" TEXT NOT NULL,
    "publicKey" VARCHAR(256) NOT NULL,
    "encryptedPublicKey" VARCHAR(512),
    "alg" VARCHAR(64) NOT NULL,
    "scope" VARCHAR(512) NOT NULL,
    "issuedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "revokedAt" TIMESTAMP(3),

    CONSTRAINT "EphemeralKey_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DelegatedSignature" (
    "id" TEXT NOT NULL,
    "sessionId" TEXT NOT NULL,
    "txTemplateHash" VARCHAR(128) NOT NULL,
    "signature" VARCHAR(1024) NOT NULL,
    "scope" VARCHAR(512) NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "DelegatedSignature_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Room" (
    "id" TEXT NOT NULL,
    "onchainObjectId" VARCHAR(128) NOT NULL,
    "ownerUserId" TEXT NOT NULL,
    "ownerWalletId" TEXT NOT NULL,
    "title" VARCHAR(256) NOT NULL,
    "requireApproval" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "sealPolicyId" VARCHAR(128),
    "encryptedInvite" TEXT,
    "startTime" TIMESTAMP(3),
    "endTime" TIMESTAMP(3),
    "attendanceCount" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Room_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RoomMembership" (
    "id" TEXT NOT NULL,
    "roomId" TEXT NOT NULL,
    "walletAddress" VARCHAR(100) NOT NULL,
    "role" "MembershipRole" NOT NULL DEFAULT 'guest',
    "status" "MembershipStatus" NOT NULL DEFAULT 'active',
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "joinTime" TIMESTAMP(3),
    "leaveTime" TIMESTAMP(3),
    "poapMinted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "RoomMembership_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ApprovalRequest" (
    "id" TEXT NOT NULL,
    "roomId" TEXT NOT NULL,
    "requesterAddress" VARCHAR(100) NOT NULL,
    "status" "ApprovalStatus" NOT NULL DEFAULT 'pending',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "resolvedAt" TIMESTAMP(3),
    "resolverAddress" VARCHAR(100),
    "resolutionTxDigest" VARCHAR(128),

    CONSTRAINT "ApprovalRequest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PoapMint" (
    "id" TEXT NOT NULL,
    "roomId" TEXT NOT NULL,
    "attendeeAddress" VARCHAR(100) NOT NULL,
    "mintTxDigest" VARCHAR(128),
    "mintStatus" "PoapMintStatus" NOT NULL DEFAULT 'pending',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PoapMint_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "P2PSessionLog" (
    "id" TEXT NOT NULL,
    "roomId" TEXT NOT NULL,
    "participantAddress" VARCHAR(100) NOT NULL,
    "eventType" "P2PEventType" NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "details" JSONB,

    CONSTRAINT "P2PSessionLog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Invite" (
    "id" TEXT NOT NULL,
    "roomId" TEXT NOT NULL,
    "inviteCode" VARCHAR(64) NOT NULL,
    "encryptedData" TEXT NOT NULL,
    "uses" INTEGER NOT NULL DEFAULT 0,
    "expiresAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Invite_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "User_primaryWalletAddress_idx" ON "User"("primaryWalletAddress");

-- CreateIndex
CREATE INDEX "Wallet_userId_idx" ON "Wallet"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Wallet_address_key" ON "Wallet"("address");

-- CreateIndex
CREATE INDEX "AuthNonce_walletAddress_idx" ON "AuthNonce"("walletAddress");

-- CreateIndex
CREATE INDEX "AuthNonce_expiresAt_idx" ON "AuthNonce"("expiresAt");

-- CreateIndex
CREATE INDEX "Session_userId_idx" ON "Session"("userId");

-- CreateIndex
CREATE INDEX "Session_walletId_idx" ON "Session"("walletId");

-- CreateIndex
CREATE INDEX "Session_status_idx" ON "Session"("status");

-- CreateIndex
CREATE INDEX "Session_expiresAt_idx" ON "Session"("expiresAt");

-- CreateIndex
CREATE UNIQUE INDEX "RefreshToken_sessionId_key" ON "RefreshToken"("sessionId");

-- CreateIndex
CREATE INDEX "RefreshToken_expiresAt_idx" ON "RefreshToken"("expiresAt");

-- CreateIndex
CREATE INDEX "EphemeralKey_sessionId_idx" ON "EphemeralKey"("sessionId");

-- CreateIndex
CREATE INDEX "EphemeralKey_expiresAt_idx" ON "EphemeralKey"("expiresAt");

-- CreateIndex
CREATE INDEX "DelegatedSignature_sessionId_idx" ON "DelegatedSignature"("sessionId");

-- CreateIndex
CREATE INDEX "DelegatedSignature_expiresAt_idx" ON "DelegatedSignature"("expiresAt");

-- CreateIndex
CREATE UNIQUE INDEX "Room_onchainObjectId_key" ON "Room"("onchainObjectId");

-- CreateIndex
CREATE INDEX "Room_ownerUserId_idx" ON "Room"("ownerUserId");

-- CreateIndex
CREATE INDEX "Room_ownerWalletId_idx" ON "Room"("ownerWalletId");

-- CreateIndex
CREATE INDEX "Room_sealPolicyId_idx" ON "Room"("sealPolicyId");

-- CreateIndex
CREATE INDEX "Room_startTime_idx" ON "Room"("startTime");

-- CreateIndex
CREATE INDEX "Room_endTime_idx" ON "Room"("endTime");

-- CreateIndex
CREATE INDEX "RoomMembership_walletAddress_idx" ON "RoomMembership"("walletAddress");

-- CreateIndex
CREATE INDEX "RoomMembership_joinTime_idx" ON "RoomMembership"("joinTime");

-- CreateIndex
CREATE UNIQUE INDEX "RoomMembership_roomId_walletAddress_key" ON "RoomMembership"("roomId", "walletAddress");

-- CreateIndex
CREATE INDEX "ApprovalRequest_roomId_idx" ON "ApprovalRequest"("roomId");

-- CreateIndex
CREATE INDEX "ApprovalRequest_status_idx" ON "ApprovalRequest"("status");

-- CreateIndex
CREATE INDEX "ApprovalRequest_requesterAddress_idx" ON "ApprovalRequest"("requesterAddress");

-- CreateIndex
CREATE INDEX "PoapMint_roomId_idx" ON "PoapMint"("roomId");

-- CreateIndex
CREATE INDEX "PoapMint_attendeeAddress_idx" ON "PoapMint"("attendeeAddress");

-- CreateIndex
CREATE INDEX "PoapMint_mintStatus_idx" ON "PoapMint"("mintStatus");

-- CreateIndex
CREATE UNIQUE INDEX "PoapMint_roomId_attendeeAddress_key" ON "PoapMint"("roomId", "attendeeAddress");

-- CreateIndex
CREATE INDEX "P2PSessionLog_roomId_timestamp_idx" ON "P2PSessionLog"("roomId", "timestamp");

-- CreateIndex
CREATE INDEX "P2PSessionLog_participantAddress_idx" ON "P2PSessionLog"("participantAddress");

-- CreateIndex
CREATE INDEX "P2PSessionLog_eventType_idx" ON "P2PSessionLog"("eventType");

-- CreateIndex
CREATE UNIQUE INDEX "Invite_inviteCode_key" ON "Invite"("inviteCode");

-- CreateIndex
CREATE INDEX "Invite_inviteCode_idx" ON "Invite"("inviteCode");

-- CreateIndex
CREATE INDEX "Invite_roomId_idx" ON "Invite"("roomId");

-- CreateIndex
CREATE INDEX "Invite_expiresAt_idx" ON "Invite"("expiresAt");

-- AddForeignKey
ALTER TABLE "Wallet" ADD CONSTRAINT "Wallet_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_walletId_fkey" FOREIGN KEY ("walletId") REFERENCES "Wallet"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RefreshToken" ADD CONSTRAINT "RefreshToken_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "Session"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EphemeralKey" ADD CONSTRAINT "EphemeralKey_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "Session"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DelegatedSignature" ADD CONSTRAINT "DelegatedSignature_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "Session"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Room" ADD CONSTRAINT "Room_ownerUserId_fkey" FOREIGN KEY ("ownerUserId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Room" ADD CONSTRAINT "Room_ownerWalletId_fkey" FOREIGN KEY ("ownerWalletId") REFERENCES "Wallet"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RoomMembership" ADD CONSTRAINT "RoomMembership_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "Room"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ApprovalRequest" ADD CONSTRAINT "ApprovalRequest_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "Room"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PoapMint" ADD CONSTRAINT "PoapMint_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "Room"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "P2PSessionLog" ADD CONSTRAINT "P2PSessionLog_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "Room"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Invite" ADD CONSTRAINT "Invite_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "Room"("id") ON DELETE CASCADE ON UPDATE CASCADE;
