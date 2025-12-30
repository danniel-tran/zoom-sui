-- Migration: setup_backend_sessionkey_refresh
-- Remove scope system, update DelegatedSignature for audit logging
-- Deprecate EphemeralKey table (keep for backwards compatibility)

-- Step 1: Drop column Session.lastPolicyUpdateAt (no longer needed)
ALTER TABLE "Session" DROP COLUMN IF EXISTS "lastPolicyUpdateAt";

-- Step 2: Alter DelegatedSignature table - Remove old columns
ALTER TABLE "DelegatedSignature" DROP COLUMN IF EXISTS "txTemplateHash";
ALTER TABLE "DelegatedSignature" DROP COLUMN IF EXISTS "scope";
ALTER TABLE "DelegatedSignature" DROP COLUMN IF EXISTS "expiresAt";

-- Step 3: Add new columns to DelegatedSignature for audit logging
ALTER TABLE "DelegatedSignature" ADD COLUMN IF NOT EXISTS "action" VARCHAR(128) NOT NULL DEFAULT 'unknown';
ALTER TABLE "DelegatedSignature" ADD COLUMN IF NOT EXISTS "roomId" VARCHAR(66);
ALTER TABLE "DelegatedSignature" ADD COLUMN IF NOT EXISTS "txDigest" VARCHAR(128);

-- Step 4: Drop old DelegatedSignature indexes
DROP INDEX IF EXISTS "DelegatedSignature_expiresAt_idx";

-- Step 5: Create new indexes for DelegatedSignature audit queries
CREATE INDEX IF NOT EXISTS "DelegatedSignature_action_idx" ON "DelegatedSignature"("action" ASC);
CREATE INDEX IF NOT EXISTS "DelegatedSignature_roomId_idx" ON "DelegatedSignature"("roomId" ASC);
CREATE INDEX IF NOT EXISTS "DelegatedSignature_createdAt_idx" ON "DelegatedSignature"("createdAt" ASC);

-- Step 6: Remove EphemeralKey scope column (deprecated)
ALTER TABLE "EphemeralKey" DROP COLUMN IF EXISTS "scope";

-- Step 7: Drop old EphemeralKey foreign key constraint
ALTER TABLE "EphemeralKey" DROP CONSTRAINT IF EXISTS "EphemeralKey_sessionId_fkey";

-- Note: EphemeralKey table is now deprecated but kept for backwards compatibility
-- The table will be ignored by Prisma (@@ignore directive in schema)
-- New implementations should use Session.encryptedPrivateKey directly

-- Step 8: Ensure Session.encryptedPrivateKey is TEXT type (should already be TEXT from 0_init)
-- This is a safety check in case the column type needs updating
-- ALTER TABLE "Session" ALTER COLUMN "encryptedPrivateKey" TYPE TEXT;
