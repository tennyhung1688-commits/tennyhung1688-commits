/* ===================================================================
   Auth API — Demo Mode (no Supabase required)

   POST /api/auth  { action: 'register' | 'login' | 'validate' | 'logout' }

   Security:
   - Passwords hashed with scrypt (128-bit salt, 64-byte key, N=16384)
   - Tokens generated with crypto.randomUUID()
   - Timing-safe session validation
   - Account lockout after 5 failed attempts (5-min cooldown)
   =================================================================== */

import crypto from 'crypto';
import { NextRequest, NextResponse } from 'next/server';
import { sessionManager } from '@/lib/session-manager';

/* In-memory demo user store */
interface StoredUser {
  email: string;
  passwordHash: string;
  passwordSalt: string;
  createdAt: string;
}

const demoUsers: Map<string, StoredUser> = new Map();

/* Rate limit: max 5 failed attempts per email, 5-min cooldown */
const loginAttempts: Map<string, { count: number; lockedUntil: number }> = new Map();

/* ---- scrypt password helpers ---- */

const SCRYPT_KEYLEN = 64;
const SCRYPT_OPTIONS: crypto.ScryptOptions = { N: 16384, r: 8, p: 1 };

function hashPassword(password: string): { hash: string; salt: string } {
  const salt = crypto.randomBytes(16).toString('base64');
  const hash = crypto.scryptSync(password, salt, SCRYPT_KEYLEN, SCRYPT_OPTIONS);
  return { hash: hash.toString('base64'), salt };
}

function verifyPassword(password: string, storedHash: string, storedSalt: string): boolean {
  const hash = crypto.scryptSync(password, storedSalt, SCRYPT_KEYLEN, SCRYPT_OPTIONS);
  return crypto.timingSafeEqual(hash, Buffer.from(storedHash, 'base64'));
}

/* ---- rate limit helper ---- */

function isLockedOut(email: string): boolean {
  const record = loginAttempts.get(email);
  if (!record) return false;
  if (record.lockedUntil > Date.now()) return true;
  loginAttempts.delete(email);
  return false;
}

function recordFailedAttempt(email: string): void {
  const record = loginAttempts.get(email) || { count: 0, lockedUntil: 0 };
  record.count += 1;
  if (record.count >= 5) {
    record.lockedUntil = Date.now() + 5 * 60 * 1000;
  }
  loginAttempts.set(email, record);
}

function clearAttempts(email: string): void {
  loginAttempts.delete(email);
}

/* ---- main handler ---- */

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, email, password } = body;

    if (!action) {
      return NextResponse.json({ error: 'action required' }, { status: 400 });
    }

    /* Register */
    if (action === 'register') {
      if (!email || !password) {
        return NextResponse.json({ error: 'Email and password required' }, { status: 400 });
      }
      if (password.length < 8) {
        return NextResponse.json({ error: 'Password must be at least 8 characters' }, { status: 400 });
      }
      if (demoUsers.has(email)) {
        return NextResponse.json({ error: 'This email is already registered' }, { status: 409 });
      }

      const { hash: passwordHash, salt: passwordSalt } = hashPassword(password);
      demoUsers.set(email, {
        email,
        passwordHash,
        passwordSalt,
        createdAt: new Date().toISOString(),
      });

      const userId = `user_${email.replace(/[^a-zA-Z0-9]/g, '_')}`;
      const userAgent = request.headers.get('user-agent') || undefined;
      const sessionToken = sessionManager.register(userId, userAgent);

      return NextResponse.json({
        success: true,
        userId,
        sessionToken,
        user: { email, createdAt: new Date().toISOString() },
      });
    }

    /* Login */
    if (action === 'login') {
      if (!email || !password) {
        return NextResponse.json({ error: 'Email and password required' }, { status: 400 });
      }

      if (isLockedOut(email)) {
        return NextResponse.json(
          { error: 'Too many login attempts. Please wait 5 minutes and try again.' },
          { status: 429 }
        );
      }

      const stored = demoUsers.get(email);
      if (!stored || !verifyPassword(password, stored.passwordHash, stored.passwordSalt)) {
        recordFailedAttempt(email);
        return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
      }

      clearAttempts(email);

      const userId = `user_${email.replace(/[^a-zA-Z0-9]/g, '_')}`;
      const userAgent = request.headers.get('user-agent') || undefined;
      const sessionToken = sessionManager.register(userId, userAgent);

      return NextResponse.json({
        success: true,
        userId,
        sessionToken,
        user: { email: stored.email, createdAt: stored.createdAt },
      });
    }

    /* Session management (delegate) */
    if (['validate', 'logout'].includes(action)) {
      const { userId } = body;
      if (!userId) return NextResponse.json({ error: 'userId required' }, { status: 400 });

      if (action === 'validate') {
        const { sessionToken } = body;
        if (!sessionToken) return NextResponse.json({ valid: false, reason: 'no_token' });
        const valid = sessionManager.validate(userId, sessionToken);
        return NextResponse.json(valid ? { valid: true } : { valid: false, reason: 'kicked', messageZh: '您的账号已在其他设备登录' });
      }

      if (action === 'logout') {
        sessionManager.invalidate(userId);
        return NextResponse.json({ success: true });
      }
    }

    return NextResponse.json({ error: 'Unknown action' }, { status: 400 });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Internal error' },
      { status: 500 }
    );
  }
}
