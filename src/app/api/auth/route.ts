/* ===================================================================
   Auth API — Supabase-backed registration & login
   
   POST /api/auth { action: 'register', email, password }
   POST /api/auth { action: 'login', email, password }
   POST /api/auth { action: 'validate', userId, sessionToken }
   POST /api/auth { action: 'logout', userId }
   =================================================================== */

import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import crypto from 'crypto';

/* Supabase service client (bypasses RLS) */
function getSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key || url.includes('your-project') || key.includes('your-anon')) {
    return null;
  }
  return createClient(url, key);
}

/* Password hashing: scrypt with N=16384 */
function hashPassword(password: string): string {
  const salt = crypto.randomBytes(16).toString('hex');
  const hash = crypto.scryptSync(password, salt, 64, { N: 16384, r: 8, p: 1 });
  return `${salt}:${hash.toString('hex')}`;
}

function verifyPassword(password: string, stored: string): boolean {
  const [salt, hash] = stored.split(':');
  const computed = crypto.scryptSync(password, salt, 64, { N: 16384, r: 8, p: 1 });
  return crypto.timingSafeEqual(computed, Buffer.from(hash, 'hex'));
}

export async function POST(request: NextRequest) {
  const supabase = getSupabase();

  try {
    const body = await request.json();
    const { action, email, password, userId, sessionToken } = body;

    /* ── Register ── */
    if (action === 'register') {
      if (!email || !password) {
        return NextResponse.json({ error: 'Email and password required' }, { status: 400 });
      }
      if (password.length < 6) {
        return NextResponse.json({ error: 'Password must be at least 6 characters' }, { status: 400 });
      }

      const passwordHash = hashPassword(password);

      if (supabase) {
        /* Supabase mode */
        const { data: existing } = await supabase.from('profiles').select('id').eq('email', email).single();
        if (existing) {
          return NextResponse.json({ error: 'This email is already registered' }, { status: 409 });
        }

        const { data: profile, error } = await supabase.from('profiles')
          .insert({ email, password_hash: passwordHash, plan: 'starter', credits_images: 5, credits_videos: 1 })
          .select('id, email, plan, credits_images, credits_videos, created_at')
          .single();

        if (error) throw error;

        const token = crypto.randomUUID();
        await supabase.from('sessions').insert({ user_id: profile.id, token, user_agent: request.headers.get('user-agent') || undefined });

        return NextResponse.json({
          success: true,
          userId: profile.id,
          sessionToken: token,
          user: { email: profile.email, plan: profile.plan, createdAt: profile.created_at },
        });
      } else {
        /* Fallback: in-memory demo (for dev without Supabase) */
        const { getDemoStore } = await import('@/lib/demo-store');
        const store = getDemoStore();
        if (store.users.has(email)) {
          return NextResponse.json({ error: 'This email is already registered' }, { status: 409 });
        }
        store.users.set(email, { email, password_hash: passwordHash, plan: 'starter', credits_images: 5, credits_videos: 1, created_at: new Date().toISOString() });
        const uid = `user_${email.replace(/[^a-zA-Z0-9]/g, '_')}`;
        const token = crypto.randomUUID();
        store.sessions.set(uid, token);
        return NextResponse.json({
          success: true, userId: uid, sessionToken: token,
          user: { email, plan: 'starter', createdAt: new Date().toISOString() },
        });
      }
    }

    /* ── Login ── */
    if (action === 'login') {
      if (!email || !password) {
        return NextResponse.json({ error: 'Email and password required' }, { status: 400 });
      }

      if (supabase) {
        /* Rate limit check */
        const fiveMinAgo = new Date(Date.now() - 5 * 60 * 1000).toISOString();
        const { data: attempts } = await supabase.from('login_attempts')
          .select('id').eq('email', email).eq('success', false).gte('attempted_at', fiveMinAgo);
        if (attempts && attempts.length >= 5) {
          return NextResponse.json({ error: 'Too many attempts. Try again in 5 minutes.' }, { status: 429 });
        }

        const { data: profile } = await supabase.from('profiles').select('*').eq('email', email).single();
        if (!profile || !verifyPassword(password, profile.password_hash)) {
          await supabase.from('login_attempts').insert({ email, success: false });
          return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
        }

        await supabase.from('login_attempts').insert({ email, success: true });

        /* Single session enforcement: invalidate old sessions */
        await supabase.from('sessions').delete().eq('user_id', profile.id);

        const token = crypto.randomUUID();
        await supabase.from('sessions').insert({ user_id: profile.id, token, user_agent: request.headers.get('user-agent') || undefined });

        return NextResponse.json({
          success: true, userId: profile.id, sessionToken: token,
          user: { email: profile.email, plan: profile.plan, credits_images: profile.credits_images, createdAt: profile.created_at },
        });
      } else {
        /* Demo mode */
        const { getDemoStore } = await import('@/lib/demo-store');
        const store = getDemoStore();
        const stored = store.users.get(email);
        if (!stored || !verifyPassword(password, stored.password_hash)) {
          return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
        }
        const uid = `user_${email.replace(/[^a-zA-Z0-9]/g, '_')}`;
        const token = crypto.randomUUID();
        store.sessions.set(uid, token);
        return NextResponse.json({
          success: true, userId: uid, sessionToken: token,
          user: { email, plan: stored.plan, createdAt: stored.created_at },
        });
      }
    }

    /* ── Validate Session ── */
    if (action === 'validate') {
      if (!userId || !sessionToken) {
        return NextResponse.json({ valid: false, reason: 'missing_params' });
      }

      if (supabase) {
        const { data: session } = await supabase.from('sessions')
          .select('token').eq('user_id', userId).eq('token', sessionToken).single();
        if (!session) {
          return NextResponse.json({ valid: false, reason: 'kicked', messageZh: '您的账号已在其他设备登录' });
        }
        return NextResponse.json({ valid: true });
      } else {
        const { getDemoStore } = await import('@/lib/demo-store');
        const store = getDemoStore();
        const valid = store.sessions.get(userId) === sessionToken;
        return NextResponse.json(valid ? { valid: true } : { valid: false, reason: 'kicked', messageZh: '您的账号已在其他设备登录' });
      }
    }

    /* ── Logout ── */
    if (action === 'logout') {
      if (!userId) return NextResponse.json({ error: 'userId required' }, { status: 400 });
      if (supabase) {
        await supabase.from('sessions').delete().eq('user_id', userId);
      } else {
        const { getDemoStore } = await import('@/lib/demo-store');
        getDemoStore().sessions.delete(userId);
      }
      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ error: 'Unknown action' }, { status: 400 });
  } catch (error) {
    console.error('[Auth API] Error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Internal error' },
      { status: 500 }
    );
  }
}
