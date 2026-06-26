'use client';

import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { createClient } from '@/lib/supabase/client';
import type { User, Session } from '@supabase/supabase-js';

/* ── Session keys (localStorage) ── */
const KEY_SESSION_TOKEN = 'commerceos_session_token';
const KEY_USER_ID = 'commerceos_user_id';
const KEY_KICKED = 'commerceos_kicked';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  kicked: boolean;
  kickedMessage: string;
  signIn: (email: string, password: string) => Promise<{ error?: string }>;
  signUp: (email: string, password: string) => Promise<{ error?: string }>;
  signOut: () => Promise<void>;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  session: null,
  loading: true,
  kicked: false,
  kickedMessage: '',
  signIn: async () => ({ error: 'not initialized' }),
  signUp: async () => ({ error: 'not initialized' }),
  signOut: async () => {},
  refreshProfile: async () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [kicked, setKicked] = useState(false);
  const [kickedMessage, setKickedMessage] = useState('');
  const supabase = createClient();

  /* ── Validate session token on mount ── */
  useEffect(() => {
    const checkSession = async () => {
      const token = localStorage.getItem(KEY_SESSION_TOKEN);
      const userId = localStorage.getItem(KEY_USER_ID);
      const wasKicked = localStorage.getItem(KEY_KICKED);

      if (wasKicked) {
        setKicked(true);
        setKickedMessage('您的账号已在其他设备登录，当前会话已失效。');
        localStorage.removeItem(KEY_KICKED);
        setLoading(false);
        return;
      }

      if (token && userId) {
        try {
          const res = await fetch('/api/auth/session', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ action: 'validate', userId, sessionToken: token }),
          });
          const data = await res.json();
          if (!data.valid) {
            // Session invalid — user was kicked
            localStorage.removeItem(KEY_SESSION_TOKEN);
            localStorage.removeItem(KEY_USER_ID);
            setKicked(true);
            setKickedMessage(data.messageZh || '您的账号已在其他设备登录');
            setLoading(false);
            return;
          }
        } catch {
          // API unavailable — allow (graceful degradation)
        }
      }
      setLoading(false);
    };

    checkSession();
  }, []);

  /* ── Supabase auth listener ── */
  useEffect(() => {
    if (!supabase) return;
    try {
      const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
      });
      supabase.auth.getSession().then(({ data: { session } }) => {
        setSession(session);
        setUser(session?.user ?? null);
      });
      return () => subscription.unsubscribe();
    } catch {
      // Supabase not configured — demo mode
    }
  }, []);

  /* ── Register session after Supabase auth success ── */
  const registerSession = useCallback(async (userId: string) => {
    try {
      const res = await fetch('/api/auth/session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'register', userId }),
      });
      const data = await res.json();
      if (data.sessionToken) {
        localStorage.setItem(KEY_SESSION_TOKEN, data.sessionToken);
        localStorage.setItem(KEY_USER_ID, userId);
      }
    } catch {
      // Session registration failed — still allow login (graceful)
    }
  }, []);

  const signIn = useCallback(async (email: string, password: string) => {
    // Demo mode: use our auth API (no Supabase required)
    try {
      const res = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'login', email, password }),
      });
      const data = await res.json();
      if (data.error) return { error: data.error };
      if (data.sessionToken) {
        localStorage.setItem(KEY_SESSION_TOKEN, data.sessionToken);
        localStorage.setItem(KEY_USER_ID, data.userId);
        setUser(data.user as any);
        return {};
      }
    } catch (e: any) {
      return { error: e.message || 'Login failed' };
    }

    // Supabase fallback (if configured)
    if (supabase) {
      try {
        const { error, data: supData } = await supabase.auth.signInWithPassword({ email, password });
        if (error) return { error: error.message };
        if (supData.user) await registerSession(supData.user.id);
        return {};
      } catch {
        return { error: 'Auth service unavailable' };
      }
    }
    return { error: 'Auth service unavailable' };
  }, [registerSession, supabase]);

  const signUp = useCallback(async (email: string, password: string) => {
    // Demo mode: use our auth API
    try {
      const res = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'register', email, password }),
      });
      const data = await res.json();
      if (data.error) return { error: data.error };
      if (data.sessionToken) {
        localStorage.setItem(KEY_SESSION_TOKEN, data.sessionToken);
        localStorage.setItem(KEY_USER_ID, data.userId);
        setUser(data.user as any);
        return {};
      }
    } catch (e: any) {
      return { error: e.message || 'Registration failed' };
    }

    // Supabase fallback
    if (supabase) {
      try {
        const { error, data: supData } = await supabase.auth.signUp({ email, password });
        if (error) return { error: error.message };
        if (supData.user) await registerSession(supData.user.id);
        return {};
      } catch {
        return { error: 'Auth service unavailable' };
      }
    }
    return { error: 'Auth service unavailable' };
  }, [registerSession, supabase]);

  const signOut = useCallback(async () => {
    const userId = localStorage.getItem(KEY_USER_ID);
    if (userId) {
      try {
        await fetch('/api/auth/session', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ action: 'logout', userId }),
        });
      } catch { /* ignore */ }
    }

    localStorage.removeItem(KEY_SESSION_TOKEN);
    localStorage.removeItem(KEY_USER_ID);

    if (supabase) await supabase.auth.signOut();
    setUser(null);
    setSession(null);
    setKicked(false);
  }, []);

  const refreshProfile = useCallback(async () => {
    if (!user || !supabase) return;
    await supabase.auth.refreshSession();
  }, [user, supabase]);

  return (
    <AuthContext.Provider value={{
      user, session, loading, kicked, kickedMessage,
      signIn, signUp, signOut, refreshProfile
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
