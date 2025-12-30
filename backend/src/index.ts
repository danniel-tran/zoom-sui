import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { createServer } from 'http';
import { config } from './config';
import { extractTokenFromHeader, verifyToken } from './lib/jwt';
import { JWTPayload } from './types';
import { WebSocketSignalingServer } from './services/websocket-signaling';
import { validateEncryptionKey } from './utils/encryption';

// Load environment variables
dotenv.config();

// Validate encryption key on startup
try {
  validateEncryptionKey(process.env.ENCRYPTION_KEY || '');
  console.log('✅ Encryption key validated successfully');
} catch (error) {
  console.error('❌ ENCRYPTION_KEY validation failed:', error instanceof Error ? error.message : error);
  console.error('');
  console.error('Please set a valid ENCRYPTION_KEY in your .env file');
  console.error('Generate one with: openssl rand -hex 32');
  console.error('');
  process.exit(1);
}

const app = express();
const httpServer = createServer(app);

// Middleware
app.use(cors({
  origin: (origin, callback) => {
    const allowedOrigins = [
      'http://localhost:3000',
      'http://localhost:3001',
      'http://127.0.0.1:3000',
      'http://127.0.0.1:3001',
    ];
    
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else if (process.env.NODE_ENV === 'development') {
      // In development, allow all origins
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check
app.get('/health', (req: Request, res: Response) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Authentication middleware
export function authenticateToken(req: Request, res: Response, next: NextFunction) {
  const token = extractTokenFromHeader(req.headers.authorization);
  
  if (!token) {
    return res.status(401).json({ error: 'Authentication required' });
  }

  try {
    const payload = verifyToken(token);
    req.user = payload; // Attach user payload to request
    next();
  } catch (error) {
    return res.status(403).json({ error: 'Invalid or expired token' });
  }
}

// Extend Express Request type to include user
declare global {
  namespace Express {
    interface Request {
      user?: JWTPayload;
    }
  }
}

// Import routes
import authRoutes from './routes/auth';
import sessionRoutes from './routes/sessions';
import roomRoutes from './routes/rooms';
import childWalletRoutes from './routes/childWallet';
import signalingRoutes from './routes/signaling';
import sealRoutes from './routes/seal';

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/sessions', sessionRoutes);
app.use('/api/rooms', roomRoutes);
app.use('/api/child-wallet', childWalletRoutes);
app.use('/api/signaling', signalingRoutes);
app.use('/api/seal', sealRoutes);

// Dummy API endpoint for testing
app.get('/api/dummy', (req: Request, res: Response) => {
  res.json({ message: 'This is a dummy API endpoint' });
});

// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error('Error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

// Initialize WebSocket signaling server
const wsSignalingServer = new WebSocketSignalingServer(httpServer);

// Start server
const PORT = config.port;
httpServer.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📊 Environment: ${config.nodeEnv}`);
  console.log(`🔗 CORS Origin: ${config.corsOrigin}`);
});

export default app;
export { wsSignalingServer };

