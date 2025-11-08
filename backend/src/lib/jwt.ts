import jwt from 'jsonwebtoken';
import { config } from '../config';
import { JWTPayload, SessionData } from '../types';

/**
 * Generate JWT access token
 */
export function generateAccessToken(payload: Omit<JWTPayload, 'iat' | 'exp'>): string {
  return jwt.sign(payload, config.jwtSecret, {
    expiresIn: config.jwtExpiresIn,
  });
}

/**
 * Generate refresh token
 */
export function generateRefreshToken(sessionId: string): string {
  return jwt.sign(
    { sessionId, type: 'refresh' },
    config.jwtSecret,
    {
      expiresIn: config.refreshTokenExpiresIn,
    }
  );
}

/**
 * Verify and decode JWT token
 */
export function verifyToken(token: string): JWTPayload {
  try {
    return jwt.verify(token, config.jwtSecret) as JWTPayload;
  } catch (error) {
    throw new Error('Invalid or expired token');
  }
}

/**
 * Extract token from Authorization header
 */
export function extractTokenFromHeader(authHeader?: string): string | null {
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null;
  }
  return authHeader.substring(7);
}

/**
 * Create JWT payload from session data
 */
export function createJWTPayload(
  sessionData: SessionData,
  sessionId: string,
  ephemeralKeyId?: string,
  scope?: string[]
): Omit<JWTPayload, 'iat' | 'exp'> {
  return {
    sub: sessionData.userId,
    wal: sessionData.walletAddress,
    sid: sessionId,
    ekey: ephemeralKeyId,
    scope: scope?.join(','),
  };
}

