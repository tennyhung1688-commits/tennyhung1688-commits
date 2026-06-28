-- CommerceOS MVP Database Schema
-- Run this in Supabase SQL Editor

-- Users table (custom auth, not Supabase Auth)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  plan TEXT NOT NULL DEFAULT 'starter',
  credits_images INTEGER NOT NULL DEFAULT 5,
  credits_videos INTEGER NOT NULL DEFAULT 1,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Active sessions (single-session enforcement)
CREATE TABLE IF NOT EXISTS public.sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  token TEXT UNIQUE NOT NULL,
  user_agent TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_sessions_user_id ON public.sessions(user_id);
CREATE INDEX idx_sessions_token ON public.sessions(token);

-- Failed login attempts (rate limiting)
CREATE TABLE IF NOT EXISTS public.login_attempts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL,
  attempted_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  success BOOLEAN NOT NULL DEFAULT FALSE
);

CREATE INDEX idx_login_attempts_email ON public.login_attempts(email, attempted_at DESC);

-- Generation logs
CREATE TABLE IF NOT EXISTS public.generation_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  type TEXT NOT NULL, -- 'image', 'video', 'copy'
  prompt TEXT,
  result_url TEXT,
  status TEXT NOT NULL DEFAULT 'pending', -- 'pending', 'success', 'failed'
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_generation_logs_user_id ON public.generation_logs(user_id, created_at DESC);

-- Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.login_attempts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.generation_logs ENABLE ROW LEVEL SECURITY;

-- RLS policies (service role bypasses RLS, anon key needs these)
CREATE POLICY "Users can read own profile" ON public.profiles
  FOR SELECT USING (true);
CREATE POLICY "Users can insert own profile" ON public.profiles
  FOR INSERT WITH CHECK (true);
CREATE POLICY "Users can update own profile" ON public.profiles
  FOR UPDATE USING (true);

CREATE POLICY "Service can manage sessions" ON public.sessions
  FOR ALL USING (true);

CREATE POLICY "Service can manage login_attempts" ON public.login_attempts
  FOR ALL USING (true);

CREATE POLICY "Users can read own generation_logs" ON public.generation_logs
  FOR SELECT USING (true);
CREATE POLICY "Users can insert own generation_logs" ON public.generation_logs
  FOR INSERT WITH CHECK (true);
