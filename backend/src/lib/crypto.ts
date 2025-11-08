import crypto from 'crypto';
import { config } from '../config';

/**
 * Encrypt sensitive data (e.g., ephemeral private keys)
 * Uses AES-256-GCM for authenticated encryption
 */
export function encrypt(plaintext: string): string {
  if (!config.encryptionKey) {
    throw new Error('ENCRYPTION_KEY not configured');
  }

  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv(
    'aes-256-gcm',
    Buffer.from(config.encryptionKey, 'hex').slice(0, 32),
    iv
  );

  let encrypted = cipher.update(plaintext, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  const authTag = cipher.getAuthTag();

  // Combine IV + authTag + encrypted data
  return `${iv.toString('hex')}:${authTag.toString('hex')}:${encrypted}`;
}

/**
 * Decrypt sensitive data
 */
export function decrypt(encryptedData: string): string {
  if (!config.encryptionKey) {
    throw new Error('ENCRYPTION_KEY not configured');
  }

  const [ivHex, authTagHex, encrypted] = encryptedData.split(':');
  if (!ivHex || !authTagHex || !encrypted) {
    throw new Error('Invalid encrypted data format');
  }

  const decipher = crypto.createDecipheriv(
    'aes-256-gcm',
    Buffer.from(config.encryptionKey, 'hex').slice(0, 32),
    Buffer.from(ivHex, 'hex')
  );

  decipher.setAuthTag(Buffer.from(authTagHex, 'hex'));

  let decrypted = decipher.update(encrypted, 'hex', 'utf8');
  decrypted += decipher.final('utf8');

  return decrypted;
}

/**
 * Hash refresh token for storage
 */
export function hashToken(token: string): string {
  return crypto.createHash('sha256').update(token).digest('hex');
}

/**
 * Generate secure random nonce for wallet authentication
 */
export function generateNonce(): string {
  return crypto.randomBytes(32).toString('hex');
}

/**
 * Verify signature (for Sui wallet signatures)
 * This is a placeholder - implement actual Sui signature verification
 */
export function verifySignature(
  message: string,
  signature: string,
  publicKey: string
): boolean {
  // TODO: Implement Sui signature verification
  // This should use @mysten/sui.js or similar
  throw new Error('Signature verification not implemented');
}

