import * as crypto from 'crypto';

const ALGORITHM = 'aes-256-gcm';
const IV_LENGTH = 16; // 128 bits
const AUTH_TAG_LENGTH = 16; // 128 bits
const KEY_LENGTH = 32; // 256 bits

/**
 * Validate encryption key format and length
 * @param key - Hex string (64 characters for 32 bytes)
 * @throws Error if key is invalid
 */
export function validateEncryptionKey(key: string): void {
  if (!key) {
    throw new Error('ENCRYPTION_KEY environment variable is not set');
  }

  if (typeof key !== 'string') {
    throw new Error('ENCRYPTION_KEY must be a string');
  }

  // Remove any whitespace
  const cleanKey = key.trim();

  // Check if it's a valid hex string
  if (!/^[0-9a-fA-F]+$/.test(cleanKey)) {
    throw new Error('ENCRYPTION_KEY must be a valid hexadecimal string');
  }

  // Check length (64 hex chars = 32 bytes = 256 bits)
  if (cleanKey.length !== 64) {
    throw new Error(
      `ENCRYPTION_KEY must be 64 hexadecimal characters (32 bytes). Current length: ${cleanKey.length}. Generate with: openssl rand -hex 32`
    );
  }
}

/**
 * Get encryption key from environment variable
 * @returns Buffer containing the encryption key
 * @throws Error if key is invalid
 */
function getEncryptionKey(): Buffer {
  const key = process.env.ENCRYPTION_KEY;

  if (!key) {
    throw new Error('ENCRYPTION_KEY environment variable is not set');
  }

  validateEncryptionKey(key);
  return Buffer.from(key, 'hex');
}

/**
 * Encrypt private key using AES-256-GCM
 * @param privateKey - Private key bytes to encrypt (Uint8Array or string)
 * @param key - Optional encryption key (uses env var if not provided)
 * @returns Object containing ciphertext, iv, and authTag as base64 strings
 */
export function encryptPrivateKey(
  privateKey: Uint8Array | string,
  key?: Buffer
): { ciphertext: string; iv: string; authTag: string } {
  const encryptionKey = key || getEncryptionKey();

  // Generate random IV (Initialization Vector)
  const iv = crypto.randomBytes(IV_LENGTH);

  // Create cipher
  const cipher = crypto.createCipheriv(ALGORITHM, encryptionKey, iv);

  // Convert to Buffer if needed
  const privateKeyBuffer = typeof privateKey === 'string'
    ? Buffer.from(privateKey, 'base64')
    : Buffer.from(privateKey);

  // Encrypt the private key
  const ciphertext = Buffer.concat([
    cipher.update(privateKeyBuffer),
    cipher.final(),
  ]);

  // Get authentication tag
  const authTag = cipher.getAuthTag();

  return {
    ciphertext: ciphertext.toString('base64'),
    iv: iv.toString('base64'),
    authTag: authTag.toString('base64'),
  };
}

/**
 * Decrypt private key using AES-256-GCM
 * @param ciphertext - Base64 encoded encrypted data
 * @param iv - Base64 encoded initialization vector
 * @param authTag - Base64 encoded authentication tag
 * @param key - Optional encryption key (uses env var if not provided)
 * @returns Decrypted private key as Uint8Array
 * @throws Error if decryption fails or authentication fails
 */
export function decryptPrivateKey(
  ciphertext: string,
  iv: string,
  authTag: string,
  key?: Buffer
): Uint8Array {
  const encryptionKey = key || getEncryptionKey();

  // Decode from base64
  const ciphertextBuffer = Buffer.from(ciphertext, 'base64');
  const ivBuffer = Buffer.from(iv, 'base64');
  const authTagBuffer = Buffer.from(authTag, 'base64');

  // Validate lengths
  if (ivBuffer.length !== IV_LENGTH) {
    throw new Error(`Invalid IV length: expected ${IV_LENGTH}, got ${ivBuffer.length}`);
  }

  if (authTagBuffer.length !== AUTH_TAG_LENGTH) {
    throw new Error(
      `Invalid auth tag length: expected ${AUTH_TAG_LENGTH}, got ${authTagBuffer.length}`
    );
  }

  // Create decipher
  const decipher = crypto.createDecipheriv(ALGORITHM, encryptionKey, ivBuffer);
  decipher.setAuthTag(authTagBuffer);

  try {
    // Decrypt
    const decrypted = Buffer.concat([
      decipher.update(ciphertextBuffer),
      decipher.final(),
    ]);

    return new Uint8Array(decrypted);
  } catch (error) {
    throw new Error(
      `Decryption failed: ${error instanceof Error ? error.message : 'Unknown error'}`
    );
  }
}

/**
 * Encrypt and serialize private key to JSON string
 * @param privateKey - Private key bytes (Uint8Array or string)
 * @param publicKey - Public key string (Sui address)
 * @returns JSON string with encrypted data
 */
export function serializeEncryptedKey(
  privateKey: Uint8Array | string,
  publicKey: string
): string {
  const encrypted = encryptPrivateKey(privateKey);

  return JSON.stringify({
    ciphertext: encrypted.ciphertext,
    iv: encrypted.iv,
    authTag: encrypted.authTag,
    publicKey,
    algorithm: ALGORITHM,
    version: 1,
  });
}

/**
 * Deserialize and decrypt private key from JSON string
 * @param encryptedData - JSON string with encrypted data
 * @returns Object containing decrypted private key and public key
 */
export function deserializeEncryptedKey(encryptedData: string): {
  privateKey: Uint8Array;
  publicKey: string;
} {
  try {
    const data = JSON.parse(encryptedData);

    if (!data.ciphertext || !data.iv || !data.authTag) {
      throw new Error('Invalid encrypted key format: missing required fields');
    }

    if (data.algorithm !== ALGORITHM) {
      throw new Error(
        `Unsupported encryption algorithm: ${data.algorithm}. Expected: ${ALGORITHM}`
      );
    }

    const privateKey = decryptPrivateKey(data.ciphertext, data.iv, data.authTag);

    return {
      privateKey,
      publicKey: data.publicKey,
    };
  } catch (error) {
    if (error instanceof SyntaxError) {
      throw new Error('Invalid encrypted key format: not valid JSON');
    }
    throw error;
  }
}
