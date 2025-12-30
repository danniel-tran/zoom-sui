// Types for JWT payload
export interface JWTPayload {
  sub: string; // user ID
  wal: string; // wallet address
  sid: string; // session ID
  ekey?: string; // ephemeral key ID (optional)
  scope?: string; // comma-separated scopes
  iat: number;
  exp: number;
}

// Types for session management
export interface SessionData {
  userId: string;
  walletId: string;
  walletAddress: string;
  walletType: 'sui' | 'zklogin';
}

// Types for ephemeral key scopes
export type EphemeralKeyScope =
  | 'room:create'
  | 'room:approve'
  | 'room:revoke'
  | 'room:join'
  | 'room:leave';

// Scope metadata for validation and documentation
export interface ScopeMetadata {
  scope: EphemeralKeyScope;
  description: string;
  category: 'room' | 'admin';
  riskLevel: 'low' | 'medium' | 'high';
  requiresHostRole?: boolean;
}

// Predefined valid scopes with metadata
export const VALID_SCOPES: readonly ScopeMetadata[] = [
  {
    scope: 'room:create',
    description: 'Create new meeting rooms',
    category: 'room',
    riskLevel: 'medium',
    requiresHostRole: false,
  },
  {
    scope: 'room:approve',
    description: 'Approve guest join requests',
    category: 'room',
    riskLevel: 'high',
    requiresHostRole: true,
  },
  {
    scope: 'room:revoke',
    description: 'Revoke participant access',
    category: 'room',
    riskLevel: 'high',
    requiresHostRole: true,
  },
  {
    scope: 'room:join',
    description: 'Join meeting rooms',
    category: 'room',
    riskLevel: 'low',
    requiresHostRole: false,
  },
  {
    scope: 'room:leave',
    description: 'Leave meeting rooms',
    category: 'room',
    riskLevel: 'low',
    requiresHostRole: false,
  },
] as const;

// Helper to get all valid scope strings
export const VALID_SCOPE_STRINGS: readonly EphemeralKeyScope[] = VALID_SCOPES.map(s => s.scope);

// Helper to validate a scope
export function isValidScope(scope: string): scope is EphemeralKeyScope {
  return VALID_SCOPE_STRINGS.includes(scope as EphemeralKeyScope);
}

// Helper to get scope metadata
export function getScopeMetadata(scope: EphemeralKeyScope): ScopeMetadata | undefined {
  return VALID_SCOPES.find(s => s.scope === scope);
}

// Helper to validate multiple scopes
export function validateScopes(scopes: string[]): { valid: EphemeralKeyScope[]; invalid: string[] } {
  const valid: EphemeralKeyScope[] = [];
  const invalid: string[] = [];

  for (const scope of scopes) {
    if (isValidScope(scope)) {
      valid.push(scope);
    } else {
      invalid.push(scope);
    }
  }

  return { valid, invalid };
}

// Helper to get scopes by category
export function getScopesByCategory(category: 'room' | 'admin'): ScopeMetadata[] {
  return VALID_SCOPES.filter(s => s.category === category);
}

// Helper to get scopes by risk level
export function getScopesByRiskLevel(riskLevel: 'low' | 'medium' | 'high'): ScopeMetadata[] {
  return VALID_SCOPES.filter(s => s.riskLevel === riskLevel);
}

// Types for auto-signing requests
export interface AutoSignRequest {
  sessionId: string;
  txPayload: string; // Base64 encoded transaction
  scope: EphemeralKeyScope[];
}

export interface AutoSignResponse {
  signature: string;
  publicKey: string;
  txDigest?: string;
}

// Types for room operations
export interface CreateRoomRequest {
  title: string;
  description?: string;
  maxParticipants?: number;
  initialParticipants: string[];
  requireApproval: boolean;
  walletAddress: string;
  onchainObjectId: string;
  hostCapId?: string;
}

export interface ApproveGuestRequest {
  roomId: string;
  guestAddress: string;
}

export interface SealApproveRequest {
  roomId: string;
  guestAddress: string; // BCS encoded address
}

