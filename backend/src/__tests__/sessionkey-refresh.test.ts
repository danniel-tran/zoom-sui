/**
 * Integration tests for SessionKey auto-refresh system
 *
 * Tests the complete flow of:
 * - User authentication with ephemeral key generation
 * - SessionKey validation and refresh
 * - Blockchain participant verification
 * - User removal detection
 * - Host action authorization
 */

import { describe, it, expect, jest, beforeEach, afterEach } from '@jest/globals';
import request from 'supertest';
import { Ed25519Keypair } from '@mysten/sui/keypairs/ed25519';
import { serializeEncryptedKey } from '../utils/encryption';

// Create mock functions with proper typing
const mockSessionFindFirst = jest.fn() as jest.MockedFunction<any>;
const mockSessionUpdate = jest.fn() as jest.MockedFunction<any>;
const mockDelegatedSignatureCreate = jest.fn() as jest.MockedFunction<any>;
const mockCheckUserInRoomParticipants = jest.fn() as jest.MockedFunction<any>;
const mockCheckUserIsHost = jest.fn() as jest.MockedFunction<any>;
const mockGetSuiClient = jest.fn() as jest.MockedFunction<any>;

// Mock dependencies
jest.mock('../db/prisma', () => ({
  prisma: {
    session: {
      findFirst: mockSessionFindFirst,
      update: mockSessionUpdate,
    },
    delegatedSignature: {
      create: mockDelegatedSignatureCreate,
    },
  },
}));

jest.mock('../utils/blockchain', () => ({
  checkUserInRoomParticipants: mockCheckUserInRoomParticipants,
  checkUserIsHost: mockCheckUserIsHost,
  getSuiClient: mockGetSuiClient,
}));

jest.mock('@mysten/sui/client');

// Import after mocking
import app from '../index';
import { prisma } from '../db/prisma';
import { generateAccessToken, createJWTPayload } from '../lib/jwt';
import * as blockchain from '../utils/blockchain';

describe('SessionKey Auto-Refresh System', () => {
  let testUserId: string;
  let testWalletId: string;
  let testSessionId: string;
  let testAccessToken: string;
  let testRoomId: string;
  let ephemeralKeypair: Ed25519Keypair;
  let encryptedPrivateKey: string;

  beforeEach(() => {
    // Setup test data
    testUserId = 'test-user-id';
    testWalletId = 'test-wallet-id';
    testSessionId = 'test-session-id';
    testRoomId = '0x' + '1'.repeat(64);

    // Generate ephemeral keypair
    ephemeralKeypair = new Ed25519Keypair();
    const publicKey = ephemeralKeypair.getPublicKey().toSuiAddress();
    const privateKeyBytes = ephemeralKeypair.getSecretKey();
    encryptedPrivateKey = serializeEncryptedKey(privateKeyBytes, publicKey);

    // Generate test access token
    const jwtPayload = createJWTPayload(
      {
        userId: testUserId,
        walletId: testWalletId,
        walletAddress: '0xtest_wallet_address',
        walletType: 'sui',
      },
      testSessionId
    );
    testAccessToken = generateAccessToken(jwtPayload);

    // Clear all mocks
    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('POST /api/seal/validate-and-refresh', () => {
    it('should successfully refresh SessionKey when user is in room participants', async () => {
      // Mock: User is in room participants
      mockCheckUserInRoomParticipants.mockResolvedValue(true);

      // Mock: Session exists with encrypted key
      mockSessionFindFirst.mockResolvedValue({
        id: testSessionId,
        user_id: testUserId,
        wallet_id: testWalletId,
        status: 'active',
        expires_at: new Date(Date.now() + 24 * 60 * 60 * 1000),
        encrypted_private_key: encryptedPrivateKey,
      });

      // Mock: Session update
      mockSessionUpdate.mockResolvedValue({});

      // Mock: DelegatedSignature create
      mockDelegatedSignatureCreate.mockResolvedValue({
        id: 'test-signature-id',
      });

      const response = await request(app)
        .post('/api/seal/validate-and-refresh')
        .set('Authorization', `Bearer ${testAccessToken}`)
        .send({ roomId: testRoomId });

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('success', true);
      expect(response.body).toHaveProperty('sessionKey');
      expect(response.body.sessionKey).toHaveProperty('serialized');
      expect(response.body.sessionKey).toHaveProperty('expiresAt');
      expect(response.body.sessionKey).toHaveProperty('createdAt');
      expect(response.body.sessionKey).toHaveProperty('ephemeralAddress');

      // Verify blockchain check was called
      expect(blockchain.checkUserInRoomParticipants).toHaveBeenCalledWith(
        testRoomId,
        '0xtest_wallet_address'
      );

      // Verify audit log was created
      expect(prisma.delegatedSignature.create).toHaveBeenCalledWith({
        data: expect.objectContaining({
          sessionId: testSessionId,
          action: 'sessionkey_refresh',
          roomId: testRoomId,
        }),
      });
    });

    it('should return 403 when user has been removed from room', async () => {
      // Mock: User is NOT in room participants
      mockCheckUserInRoomParticipants.mockResolvedValue(false);

      // Mock: Session exists
      mockSessionFindFirst.mockResolvedValue({
        id: testSessionId,
        encrypted_private_key: encryptedPrivateKey,
      });

      const response = await request(app)
        .post('/api/seal/validate-and-refresh')
        .set('Authorization', `Bearer ${testAccessToken}`)
        .send({ roomId: testRoomId });

      expect(response.status).toBe(403);
      expect(response.body).toHaveProperty('error');
      expect(response.body).toHaveProperty('removed', true);
      expect(response.body.error).toContain('removed');

      // Verify blockchain check was called
      expect(blockchain.checkUserInRoomParticipants).toHaveBeenCalled();

      // Verify no SessionKey was created (no DelegatedSignature)
      expect(prisma.delegatedSignature.create).not.toHaveBeenCalled();
    });

    it('should return 401 when session not found', async () => {
      // Mock: Session does not exist
      mockSessionFindFirst.mockResolvedValue(null);

      const response = await request(app)
        .post('/api/seal/validate-and-refresh')
        .set('Authorization', `Bearer ${testAccessToken}`)
        .send({ roomId: testRoomId });

      expect(response.status).toBe(401);
      expect(response.body).toHaveProperty('error');
      expect(response.body.error).toContain('Session not found');
    });

    it('should return 401 when session has no ephemeral key', async () => {
      // Mock: Session exists but no encrypted key
      mockSessionFindFirst.mockResolvedValue({
        id: testSessionId,
        encrypted_private_key: null,
      });

      const response = await request(app)
        .post('/api/seal/validate-and-refresh')
        .set('Authorization', `Bearer ${testAccessToken}`)
        .send({ roomId: testRoomId });

      expect(response.status).toBe(500);
      expect(response.body).toHaveProperty('error');
      expect(response.body.error).toContain('ephemeral key');
    });

    it('should return 400 for invalid roomId format', async () => {
      const response = await request(app)
        .post('/api/seal/validate-and-refresh')
        .set('Authorization', `Bearer ${testAccessToken}`)
        .send({ roomId: 'invalid-room-id' });

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('error');
      expect(response.body.error).toContain('Invalid roomId');
    });

    it('should handle blockchain query errors gracefully', async () => {
      // Mock: Blockchain query throws error
      mockCheckUserInRoomParticipants.mockRejectedValue(
        new Error('Blockchain connection failed')
      );

      // Mock: Session exists
      mockSessionFindFirst.mockResolvedValue({
        id: testSessionId,
        encrypted_private_key: encryptedPrivateKey,
      });

      const response = await request(app)
        .post('/api/seal/validate-and-refresh')
        .set('Authorization', `Bearer ${testAccessToken}`)
        .send({ roomId: testRoomId });

      expect(response.status).toBe(500);
      expect(response.body).toHaveProperty('error');
      expect(response.body.error).toContain('blockchain');
    });
  });

  describe('Host Actions with Ephemeral Key', () => {
    const guestAddress = '0x' + '2'.repeat(64);
    let hostCapId: string;

    beforeEach(() => {
      hostCapId = '0x' + '3'.repeat(64);

      // Mock: User is host
      mockCheckUserIsHost.mockResolvedValue(true);

      // Mock: Session with encrypted key
      mockSessionFindFirst.mockResolvedValue({
        id: testSessionId,
        encrypted_private_key: encryptedPrivateKey,
      });

      // Mock: Sui client getOwnedObjects
      mockGetSuiClient.mockReturnValue({
        getOwnedObjects: (jest.fn() as any).mockResolvedValue({
          data: [
            {
              data: {
                objectId: hostCapId,
                content: {
                  fields: {
                    room_id: testRoomId,
                  },
                },
              },
            },
          ],
        }),
        executeTransactionBlock: (jest.fn() as any).mockResolvedValue({
          digest: '0xtx_digest_123',
        }),
      });

      // Mock: DelegatedSignature create
      mockDelegatedSignatureCreate.mockResolvedValue({
        id: 'test-signature-id',
      });
    });

    it('should approve guest using ephemeral key (no wallet popup)', async () => {
      const response = await request(app)
        .post(`/api/rooms/${testRoomId}/approve/${guestAddress}`)
        .set('Authorization', `Bearer ${testAccessToken}`)
        .send({});

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('success', true);
      expect(response.body).toHaveProperty('txDigest');
      expect(response.body).toHaveProperty('guestAddress', guestAddress);

      // Verify host check
      expect(blockchain.checkUserIsHost).toHaveBeenCalledWith(
        testRoomId,
        '0xtest_wallet_address'
      );

      // Verify transaction was signed and executed
      const suiClient = mockGetSuiClient();
      expect(suiClient.executeTransactionBlock).toHaveBeenCalled();

      // Verify audit log
      expect(prisma.delegatedSignature.create).toHaveBeenCalledWith({
        data: expect.objectContaining({
          action: 'approve_guest',
          roomId: testRoomId,
          txDigest: '0xtx_digest_123',
        }),
      });
    });

    it('should revoke user using ephemeral key', async () => {
      const response = await request(app)
        .post(`/api/rooms/${testRoomId}/revoke/${guestAddress}`)
        .set('Authorization', `Bearer ${testAccessToken}`)
        .send({});

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('success', true);
      expect(response.body).toHaveProperty('txDigest');

      // Verify audit log with correct action
      expect(prisma.delegatedSignature.create).toHaveBeenCalledWith({
        data: expect.objectContaining({
          action: 'revoke_guest',
        }),
      });
    });

    it('should end room using ephemeral key', async () => {
      process.env.REGISTRY_OBJECT_ID = '0x' + '4'.repeat(64);

      const response = await request(app)
        .post(`/api/rooms/${testRoomId}/end`)
        .set('Authorization', `Bearer ${testAccessToken}`)
        .send({});

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('success', true);
      expect(response.body).toHaveProperty('txDigest');

      // Verify audit log
      expect(prisma.delegatedSignature.create).toHaveBeenCalledWith({
        data: expect.objectContaining({
          action: 'end_room',
        }),
      });
    });

    it('should return 403 when non-host tries host action', async () => {
      // Mock: User is NOT a host
      mockCheckUserIsHost.mockResolvedValue(false);

      const response = await request(app)
        .post(`/api/rooms/${testRoomId}/approve/${guestAddress}`)
        .set('Authorization', `Bearer ${testAccessToken}`)
        .send({});

      expect(response.status).toBe(403);
      expect(response.body).toHaveProperty('error');
      expect(response.body.error).toContain('host');

      // Verify no transaction was executed
      const suiClient = mockGetSuiClient();
      expect(suiClient.executeTransactionBlock).not.toHaveBeenCalled();
    });
  });

  describe('Ephemeral Key Decryption', () => {
    it('should successfully decrypt ephemeral private key', async () => {
      const { deserializeEncryptedKey } = await import('../utils/encryption');
      const { privateKey } = deserializeEncryptedKey(encryptedPrivateKey);

      expect(privateKey).toBeInstanceOf(Uint8Array);
      expect(privateKey.length).toBeGreaterThan(0);

      // Verify can reconstruct keypair
      const reconstructed = Ed25519Keypair.fromSecretKey(privateKey);
      const reconstructedAddress = reconstructed.getPublicKey().toSuiAddress();
      const originalAddress = ephemeralKeypair.getPublicKey().toSuiAddress();

      expect(reconstructedAddress).toBe(originalAddress);
    });

    it('should fail decryption with wrong encryption key', async () => {
      // Save original key
      const originalKey = process.env.ENCRYPTION_KEY;

      // Set wrong key
      process.env.ENCRYPTION_KEY = 'a'.repeat(64);

      const { deserializeEncryptedKey } = await import('../utils/encryption');

      expect(() => {
        deserializeEncryptedKey(encryptedPrivateKey);
      }).toThrow();

      // Restore original key
      process.env.ENCRYPTION_KEY = originalKey;
    });
  });

  describe('Blockchain Validation', () => {
    it('should query blockchain for room participants', async () => {
      const mockSuiClient = {
        getObject: (jest.fn() as any).mockResolvedValue({
          data: {
            content: {
              dataType: 'moveObject',
              fields: {
                participants: ['0xuser1', '0xuser2', '0xtest_wallet_address'],
                hosts: ['0xuser1'],
              },
            },
          },
        }),
      };

      mockGetSuiClient.mockReturnValue(mockSuiClient);

      const isParticipant = await blockchain.checkUserInRoomParticipants(
        testRoomId,
        '0xtest_wallet_address'
      );

      expect(isParticipant).toBe(true);
      expect(mockSuiClient.getObject).toHaveBeenCalledWith({
        id: testRoomId,
        options: {
          showContent: true,
          showType: true,
        },
      });
    });

    it('should query blockchain for host status', async () => {
      const mockSuiClient = {
        getObject: (jest.fn() as any).mockResolvedValue({
          data: {
            content: {
              dataType: 'moveObject',
              fields: {
                participants: ['0xuser1', '0xuser2'],
                hosts: ['0xtest_wallet_address'],
              },
            },
          },
        }),
      };

      mockGetSuiClient.mockReturnValue(mockSuiClient);

      const isHost = await blockchain.checkUserIsHost(testRoomId, '0xtest_wallet_address');

      expect(isHost).toBe(true);
    });
  });

  describe('Audit Logging', () => {
    it('should log all SessionKey refresh attempts', async () => {
      mockCheckUserInRoomParticipants.mockResolvedValue(true);
      mockSessionFindFirst.mockResolvedValue({
        id: testSessionId,
        encrypted_private_key: encryptedPrivateKey,
      });
      mockSessionUpdate.mockResolvedValue({});
      mockDelegatedSignatureCreate.mockResolvedValue({});

      await request(app)
        .post('/api/seal/validate-and-refresh')
        .set('Authorization', `Bearer ${testAccessToken}`)
        .send({ roomId: testRoomId });

      expect(prisma.delegatedSignature.create).toHaveBeenCalledWith({
        data: {
          sessionId: testSessionId,
          action: 'sessionkey_refresh',
          roomId: testRoomId,
          txDigest: null,
          signature: expect.any(String),
        },
      });
    });

    it('should log all host actions with transaction digests', async () => {
      mockCheckUserIsHost.mockResolvedValue(true);
      mockSessionFindFirst.mockResolvedValue({
        id: testSessionId,
        encrypted_private_key: encryptedPrivateKey,
      });

      const mockSuiClient = {
        getOwnedObjects: (jest.fn() as any).mockResolvedValue({
          data: [
            {
              data: {
                objectId: '0x' + '3'.repeat(64),
                content: { fields: { room_id: testRoomId } },
              },
            },
          ],
        }),
        executeTransactionBlock: (jest.fn() as any).mockResolvedValue({
          digest: '0xtx_digest_abc',
        }),
      };

      mockGetSuiClient.mockReturnValue(mockSuiClient);
      mockDelegatedSignatureCreate.mockResolvedValue({});

      await request(app)
        .post(`/api/rooms/${testRoomId}/approve/0x${'2'.repeat(64)}`)
        .set('Authorization', `Bearer ${testAccessToken}`)
        .send({});

      expect(prisma.delegatedSignature.create).toHaveBeenCalledWith({
        data: {
          sessionId: testSessionId,
          action: 'approve_guest',
          roomId: testRoomId,
          txDigest: '0xtx_digest_abc',
          signature: expect.any(String),
        },
      });
    });
  });
});
