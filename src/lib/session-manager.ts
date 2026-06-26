/* ===================================================================
   CommerceOS Session Manager — Single Session Enforcement

   Only ONE active session per user. New login invalidates old one.
   Uses in-memory store (production: replace with Redis/DB).

   Token generation uses crypto.randomUUID() (RFC 9562) —
   cryptographically secure, no Math.random().
   =================================================================== */

import crypto from 'crypto';

export interface ActiveSession {
  userId: string;
  sessionToken: string;
  createdAt: number;
  userAgent?: string;
}

class SessionManager {
  /** user_id → session_token — only one entry per user */
  private sessions = new Map<string, ActiveSession>();

  /** Register a new session (invalidates old session for this user) */
  register(userId: string, userAgent?: string): string {
    const sessionToken = this.generateToken();
    const session: ActiveSession = {
      userId,
      sessionToken,
      createdAt: Date.now(),
      userAgent: userAgent?.slice(0, 200),
    };
    this.sessions.set(userId, session);
    return sessionToken;
  }

  /** Validate a session — uses timing-safe comparison */
  validate(userId: string, sessionToken: string): boolean {
    const active = this.sessions.get(userId);
    if (!active) return false;
    return crypto.timingSafeEqual(
      Buffer.from(active.sessionToken),
      Buffer.from(sessionToken)
    );
  }

  /** Invalidate a user's session (e.g., on sign out) */
  invalidate(userId: string): void {
    this.sessions.delete(userId);
  }

  /** Get the active session for a user (for debugging) */
  get(userId: string): ActiveSession | undefined {
    return this.sessions.get(userId);
  }

  /** Total active sessions count */
  get count(): number {
    return this.sessions.size;
  }

  private generateToken(): string {
    return crypto.randomUUID();
  }
}

/** Global singleton */
export const sessionManager = new SessionManager();
