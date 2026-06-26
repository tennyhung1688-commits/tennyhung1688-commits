/* ===================================================================
   CommerceOS Session Manager — Single Session Enforcement

   Only ONE active session per user. New login invalidates old one.
   Uses in-memory store (production: replace with Redis/DB).
   =================================================================== */

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

  /** Validate a session — returns true if this is the active session */
  validate(userId: string, sessionToken: string): boolean {
    const active = this.sessions.get(userId);
    if (!active) return false;
    return active.sessionToken === sessionToken;
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
    const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
    const segments = [8, 4, 4, 4, 12];
    return segments.map(len => {
      let s = '';
      for (let i = 0; i < len; i++) s += chars[Math.floor(Math.random() * chars.length)];
      return s;
    }).join('-');
  }
}

/** Global singleton */
export const sessionManager = new SessionManager();
