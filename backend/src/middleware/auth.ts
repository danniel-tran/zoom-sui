import { Request, Response, NextFunction } from 'express';
import { verifyToken, extractTokenFromHeader } from '../lib/jwt';
import { JWTPayload } from '../types';

/**
 * Authentication middleware
 * Verifies JWT token and attaches user info to request
 */
export function authenticate(req: Request, res: Response, next: NextFunction) {
  try {
    const authHeader = req.headers.authorization;
    const token = extractTokenFromHeader(authHeader);

    if (!token) {
      return res.status(401).json({ error: 'No token provided' });
    }

    const payload = verifyToken(token);
    (req as any).user = payload;
    
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
}

/**
 * Optional authentication middleware
 * Attaches user if token is present, but doesn't fail if missing
 */
export function optionalAuth(req: Request, res: Response, next: NextFunction) {
  try {
    const authHeader = req.headers.authorization;
    const token = extractTokenFromHeader(authHeader);

    if (token) {
      const payload = verifyToken(token);
      (req as any).user = payload;
    }
    
    next();
  } catch (error) {
    // Token invalid but we continue anyway
    next();
  }
}
