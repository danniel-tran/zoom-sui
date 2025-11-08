// Environment variables configuration
export const config = {
  // Database
  databaseUrl: process.env.DATABASE_URL || '',
  
  // JWT Configuration
  jwtSecret: process.env.JWT_SECRET || 'your-secret-key-change-in-production',
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '15m',
  refreshTokenExpiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN || '7d',
  
  // Session Configuration
  sessionMaxAge: parseInt(process.env.SESSION_MAX_AGE || '86400000', 10), // 24 hours
  ephemeralKeyExpiresIn: parseInt(process.env.EPHEMERAL_KEY_EXPIRES_IN || '1800000', 10), // 30 minutes
  
  // Sui Configuration
  suiNetwork: process.env.SUI_NETWORK || 'testnet',
  suiPackageId: process.env.SUI_PACKAGE_ID || '',
  suiClockObjectId: process.env.SUI_CLOCK_OBJECT_ID || '0x6',
  
  // Server Configuration
  port: parseInt(process.env.PORT || '3001', 10),
  nodeEnv: process.env.NODE_ENV || 'development',
  corsOrigin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  
  // Encryption
  encryptionKey: process.env.ENCRYPTION_KEY || '', // AES-256 key for encrypting private keys
  
  // Prisma Accelerate (if using)
  prismaAccelerateUrl: process.env.DATABASE_URL || '',
};

// Validate required environment variables

