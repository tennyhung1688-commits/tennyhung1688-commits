-- AIHub Generator 用量系统 - 数据库 Schema
-- 在 Supabase SQL Editor 中执行此文件

-- 1. Profiles 表（扩展 Supabase Auth 的 users）
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT,
  trial_claimed BOOLEAN DEFAULT FALSE,
  plan TEXT CHECK (plan IN ('basic', 'pro', 'enterprise')) DEFAULT NULL,
  membership_expiry TIMESTAMPTZ DEFAULT NULL,
  images_used INTEGER DEFAULT 0,
  videos_used INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. 自动创建 Profile（用户注册时触发）
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email)
  VALUES (NEW.id, NEW.email);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- 3. RLS 策略：用户只能读写自己的 Profile
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own profile"
  ON profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- 4. 支付记录表
CREATE TABLE payments (
  id SERIAL PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  plan TEXT NOT NULL,
  amount INTEGER NOT NULL, -- 单位：分（人民币）
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'failed', 'refunded')),
  payment_method TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE payments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own payments"
  ON payments FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own payments"
  ON payments FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- 5. 生成记录表（用于审计和统计）
CREATE TABLE generation_logs (
  id SERIAL PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('image', 'video')),
  platform TEXT,
  style TEXT,
  product_name TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE generation_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own generation logs"
  ON generation_logs FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own generation logs"
  ON generation_logs FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- 6. 更新时间触发器
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
