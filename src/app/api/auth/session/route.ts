/* ===================================================================
   Session API — Single Session Enforcement

   POST /api/auth/session/register  — create/overwrite session (login)
   POST /api/auth/session/validate  — check if session is still valid
   POST /api/auth/session/logout    — destroy session
   =================================================================== */

import { NextRequest, NextResponse } from 'next/server';
import { sessionManager } from '@/lib/session-manager';

/* ── Register session (called after login) ── */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, userId } = body;

    if (!userId) {
      return NextResponse.json({ error: 'userId required' }, { status: 400 });
    }

    switch (action) {
      case 'register': {
        const userAgent = request.headers.get('user-agent') || undefined;
        const sessionToken = sessionManager.register(userId, userAgent);
        return NextResponse.json({ sessionToken });
      }

      case 'validate': {
        const { sessionToken } = body;
        if (!sessionToken) {
          return NextResponse.json({ valid: false, reason: 'no_token' });
        }
        const valid = sessionManager.validate(userId, sessionToken);
        if (!valid) {
          return NextResponse.json({
            valid: false,
            reason: 'kicked',
            message: 'Your account was logged in from another device.',
            messageZh: '您的账号已在其他设备登录，当前会话已失效。',
          });
        }
        return NextResponse.json({ valid: true });
      }

      case 'logout': {
        sessionManager.invalidate(userId);
        return NextResponse.json({ success: true });
      }

      default:
        return NextResponse.json({ error: 'Unknown action' }, { status: 400 });
    }
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Internal error' },
      { status: 500 }
    );
  }
}
