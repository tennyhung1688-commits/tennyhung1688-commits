-- ============================================================================
-- CommerceOS V1 — Complete Database Schema
-- 
-- The AI Operating System for Modern Commerce
-- PostgreSQL + Supabase (auth, RLS, realtime)
-- 
-- Architecture:  https://commerceos.ai
-- ============================================================================

-- ============================================================================
-- 0. Extensions & Helpers
-- ============================================================================
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- ============================================================================
-- 1. Users & Authentication (extends Supabase auth.users)
-- ============================================================================
CREATE TABLE profiles (
  id              UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email           TEXT,
  display_name    TEXT,
  avatar_url      TEXT,
  locale          TEXT DEFAULT 'en',
  trial_claimed   BOOLEAN DEFAULT FALSE,
  plan            TEXT CHECK (plan IN ('free', 'starter', 'pro', 'enterprise')) DEFAULT 'free',
  membership_expiry TIMESTAMPTZ,
  created_at      TIMESTAMPTZ DEFAULT NOW(),
  updated_at      TIMESTAMPTZ DEFAULT NOW()
);

-- Trigger: auto-create profile on signup
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, display_name)
  VALUES (NEW.id, NEW.email, COALESCE(NEW.raw_user_meta_data->>'name', split_part(NEW.email, '@', 1)));
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

CREATE TRIGGER profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ============================================================================
-- 2. Organizations & Workspaces
-- ============================================================================
CREATE TABLE organizations (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name            TEXT NOT NULL,
  slug            TEXT UNIQUE NOT NULL,
  logo_url        TEXT,
  owner_id        UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  created_at      TIMESTAMPTZ DEFAULT NOW(),
  updated_at      TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE organization_members (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE NOT NULL,
  user_id         UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  role            TEXT DEFAULT 'member' CHECK (role IN ('owner', 'admin', 'member', 'viewer')),
  joined_at       TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(organization_id, user_id)
);

CREATE TABLE workspaces (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE NOT NULL,
  name            TEXT NOT NULL,
  description     TEXT,
  settings        JSONB DEFAULT '{}',
  created_at      TIMESTAMPTZ DEFAULT NOW(),
  updated_at      TIMESTAMPTZ DEFAULT NOW()
);

CREATE TRIGGER workspaces_updated_at
  BEFORE UPDATE ON workspaces
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ============================================================================
-- 3. Commerce Memory (persistent AI memory)
-- ============================================================================
CREATE TABLE commerce_memories (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  workspace_id    UUID REFERENCES workspaces(id) ON DELETE CASCADE NOT NULL,
  user_id         UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  memory_type     TEXT NOT NULL CHECK (memory_type IN ('product', 'brand', 'project', 'customer', 'style', 'preference')),
  key             TEXT NOT NULL,
  value           JSONB NOT NULL,
  embedding_id    TEXT,        -- vector embedding reference for semantic search
  importance      REAL DEFAULT 0.5,
  access_count    INTEGER DEFAULT 0,
  last_accessed   TIMESTAMPTZ,
  created_at      TIMESTAMPTZ DEFAULT NOW(),
  updated_at      TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(workspace_id, memory_type, key)
);

CREATE INDEX idx_commerce_memories_workspace ON commerce_memories(workspace_id);
CREATE INDEX idx_commerce_memories_type ON commerce_memories(memory_type);

CREATE TRIGGER commerce_memories_updated_at
  BEFORE UPDATE ON commerce_memories
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ============================================================================
-- 4. Products
-- ============================================================================
CREATE TABLE products (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  workspace_id    UUID REFERENCES workspaces(id) ON DELETE CASCADE NOT NULL,
  user_id         UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  name            TEXT NOT NULL,
  sku             TEXT,
  category        TEXT,
  status          TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'active', 'archived')),
  primary_image_url TEXT,
  created_at      TIMESTAMPTZ DEFAULT NOW(),
  updated_at      TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_products_workspace ON products(workspace_id);
CREATE INDEX idx_products_sku ON products(sku);

CREATE TRIGGER products_updated_at
  BEFORE UPDATE ON products
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- AI Product Profile (auto-detected attributes)
CREATE TABLE product_profiles (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  product_id      UUID REFERENCES products(id) ON DELETE CASCADE NOT NULL UNIQUE,
  attributes      JSONB NOT NULL DEFAULT '{}',
  -- { color: [...], material: [...], style: [...], size_range: [...], 
  --   selling_points: [...], target_audience: [...], use_scenes: [...] }
  detected_by     TEXT,         -- which AI model detected
  confidence      REAL,         -- detection confidence
  created_at      TIMESTAMPTZ DEFAULT NOW(),
  updated_at      TIMESTAMPTZ DEFAULT NOW()
);

CREATE TRIGGER product_profiles_updated_at
  BEFORE UPDATE ON product_profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- Product images (uploaded + AI-generated)
CREATE TABLE product_images (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  product_id      UUID REFERENCES products(id) ON DELETE CASCADE NOT NULL,
  image_type      TEXT NOT NULL CHECK (image_type IN ('original', 'main', 'white_bg', 'lifestyle', 'infographic', 'detail', 'scene')),
  url             TEXT NOT NULL,
  width           INTEGER,
  height          INTEGER,
  file_size       BIGINT,
  is_ai_generated BOOLEAN DEFAULT FALSE,
  model_used      TEXT,
  sort_order      INTEGER DEFAULT 0,
  created_at      TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_product_images_product ON product_images(product_id);

-- ============================================================================
-- 5. Brands
-- ============================================================================
CREATE TABLE brands (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  workspace_id    UUID REFERENCES workspaces(id) ON DELETE CASCADE NOT NULL,
  user_id         UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  name            TEXT NOT NULL,
  logo_url        TEXT,
  website         TEXT,
  status          TEXT DEFAULT 'active' CHECK (status IN ('active', 'archived')),
  created_at      TIMESTAMPTZ DEFAULT NOW(),
  updated_at      TIMESTAMPTZ DEFAULT NOW()
);

CREATE TRIGGER brands_updated_at
  BEFORE UPDATE ON brands
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- AI Brand Profile
CREATE TABLE brand_profiles (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  brand_id        UUID REFERENCES brands(id) ON DELETE CASCADE NOT NULL UNIQUE,
  colors          JSONB DEFAULT '[]',     -- ["#FF6B00", "#000000", ...]
  fonts           JSONB DEFAULT '{}',     -- { heading: "...", body: "..." }
  tone            TEXT,                    -- Inspirational, Luxurious, Professional, etc.
  style           TEXT,                    -- Athletic, Minimalist, etc.
  story           TEXT,                    -- Brand story narrative
  audience        TEXT,                    -- Target audience description
  guidelines      JSONB DEFAULT '{}',     -- Auto-generated brand guidelines
  created_at      TIMESTAMPTZ DEFAULT NOW(),
  updated_at      TIMESTAMPTZ DEFAULT NOW()
);

CREATE TRIGGER brand_profiles_updated_at
  BEFORE UPDATE ON brand_profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ============================================================================
-- 6. Skills & Knowledge Engine
-- ============================================================================
CREATE TABLE skill_categories (
  id              TEXT PRIMARY KEY,         -- image, video, copywriting, seo, translation, publishing, analytics, automation, platform
  name            TEXT NOT NULL,
  description     TEXT,
  icon            TEXT,
  sort_order      INTEGER DEFAULT 0
);

CREATE TABLE skills (
  id              TEXT PRIMARY KEY,         -- e.g. 'amazon-main-image', 'tiktok-viral-video'
  category        TEXT REFERENCES skill_categories(id) NOT NULL,
  name            TEXT NOT NULL,
  description     TEXT,
  supported_platforms TEXT[] DEFAULT '{}',
  supported_models   TEXT[] DEFAULT '{}',
  input_schema    JSONB NOT NULL DEFAULT '{}',
  output_schema   JSONB NOT NULL DEFAULT '{}',
  prompt_template JSONB NOT NULL DEFAULT '{}',
  -- { system_prompt: "...", user_prompt_template: "...", variables: [...] }
  workflow_steps  JSONB NOT NULL DEFAULT '[]',
  -- [{ id, name, description, estimated_time, dependencies }]
  icon            TEXT,
  tags            TEXT[] DEFAULT '{official}',
  estimated_time  TEXT,
  requires_connection BOOLEAN DEFAULT FALSE,
  is_active       BOOLEAN DEFAULT TRUE,
  created_at      TIMESTAMPTZ DEFAULT NOW(),
  updated_at      TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_skills_category ON skills(category);
CREATE INDEX idx_skills_platform ON skills USING GIN(supported_platforms);
CREATE INDEX idx_skills_tags ON skills USING GIN(tags);

CREATE TRIGGER skills_updated_at
  BEFORE UPDATE ON skills
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- Platform-specific rules (Commerce Knowledge Engine)
CREATE TABLE platform_rules (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  platform        TEXT NOT NULL,           -- amazon, shopify, tiktok, taobao, etc.
  rule_type       TEXT NOT NULL CHECK (rule_type IN ('image', 'video', 'title', 'description', 'seo', 'pricing', 'category', 'compliance')),
  rule_content    JSONB NOT NULL,
  -- { max_chars: 200, format: "...", requirements: [...], prohibited: [...] }
  version         INTEGER DEFAULT 1,
  is_active       BOOLEAN DEFAULT TRUE,
  created_at      TIMESTAMPTZ DEFAULT NOW(),
  updated_at      TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_platform_rules_platform ON platform_rules(platform);

-- Skill execution history
CREATE TABLE skill_executions (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  skill_id        TEXT REFERENCES skills(id) ON DELETE SET NULL,
  user_id         UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  workspace_id    UUID REFERENCES workspaces(id) ON DELETE CASCADE,
  input           JSONB NOT NULL DEFAULT '{}',
  output          JSONB,
  model_used      TEXT,
  platform        TEXT,
  status          TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'running', 'completed', 'failed')),
  steps           JSONB DEFAULT '[]',     -- per-step timing and status
  duration_ms     INTEGER,
  tokens_used     INTEGER,
  cost_estimate   NUMERIC(10,6),
  error_message   TEXT,
  created_at      TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_skill_executions_user ON skill_executions(user_id);
CREATE INDEX idx_skill_executions_created ON skill_executions(created_at DESC);

-- ============================================================================
-- 7. AI Models
-- ============================================================================
CREATE TABLE ai_models (
  id              TEXT PRIMARY KEY,         -- e.g. 'flux', 'gpt-image', 'veo', 'kling'
  name            TEXT NOT NULL,
  provider        TEXT NOT NULL,            -- OpenAI, Google, Black Forest Labs, etc.
  category        TEXT NOT NULL CHECK (category IN ('image', 'video', 'text', 'audio')),
  capabilities    TEXT[] DEFAULT '{}',      -- ['product-photography', 'lifestyle', 'ugc-video', ...]
  max_resolution  TEXT,                     -- '4K', '1080p', '2K'
  avg_speed       TEXT,                     -- '30s', '120s', etc.
  is_default      BOOLEAN DEFAULT FALSE,
  is_active       BOOLEAN DEFAULT TRUE,
  config          JSONB DEFAULT '{}',
  created_at      TIMESTAMPTZ DEFAULT NOW(),
  updated_at      TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================================
-- 8. Workflows & Orchestrator
-- ============================================================================
CREATE TABLE workflows (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  workspace_id    UUID REFERENCES workspaces(id) ON DELETE CASCADE NOT NULL,
  user_id         UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  name            TEXT NOT NULL,
  description     TEXT,
  template_id     TEXT,          -- reference to a template if forked
  platform        TEXT,
  product_id      UUID REFERENCES products(id) ON DELETE SET NULL,
  brand_id        UUID REFERENCES brands(id) ON DELETE SET NULL,
  status          TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'ready', 'running', 'completed', 'failed')),
  created_at      TIMESTAMPTZ DEFAULT NOW(),
  updated_at      TIMESTAMPTZ DEFAULT NOW()
);

CREATE TRIGGER workflows_updated_at
  BEFORE UPDATE ON workflows
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- Individual steps within a workflow
CREATE TABLE workflow_steps (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  workflow_id     UUID REFERENCES workflows(id) ON DELETE CASCADE NOT NULL,
  skill_id        TEXT REFERENCES skills(id) ON DELETE SET NULL,
  step_order      INTEGER NOT NULL,
  name            TEXT NOT NULL,
  description     TEXT,
  config          JSONB DEFAULT '{}',
  dependencies    UUID[] DEFAULT '{}',     -- step ids that must complete first
  status          TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'running', 'completed', 'failed', 'skipped')),
  started_at      TIMESTAMPTZ,
  completed_at    TIMESTAMPTZ,
  duration_ms     INTEGER,
  error_message   TEXT,
  UNIQUE(workflow_id, step_order)
);

-- Workflow execution history (each RUN)
CREATE TABLE workflow_executions (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  workflow_id     UUID REFERENCES workflows(id) ON DELETE CASCADE NOT NULL,
  user_id         UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  status          TEXT DEFAULT 'running' CHECK (status IN ('running', 'completed', 'failed', 'cancelled')),
  started_at      TIMESTAMPTZ DEFAULT NOW(),
  completed_at    TIMESTAMPTZ,
  total_duration_ms INTEGER,
  steps_completed INTEGER DEFAULT 0,
  steps_total     INTEGER,
  created_at      TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_workflow_executions_workflow ON workflow_executions(workflow_id);

-- ============================================================================
-- 9. Assets & Content Hub
-- ============================================================================
CREATE TABLE assets (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  workspace_id    UUID REFERENCES workspaces(id) ON DELETE CASCADE NOT NULL,
  user_id         UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  asset_type      TEXT NOT NULL CHECK (asset_type IN ('image', 'video', 'copywriting', 'document', 'other')),
  name            TEXT NOT NULL,
  description     TEXT,
  url             TEXT,
  thumbnail_url   TEXT,
  file_size       BIGINT,
  mime_type       TEXT,
  width           INTEGER,
  height          INTEGER,
  duration_ms     INTEGER,       -- for videos
  content_text    TEXT,          -- for copywriting
  tags            TEXT[] DEFAULT '{}',
  project_id      UUID,
  product_id      UUID REFERENCES products(id) ON DELETE SET NULL,
  brand_id        UUID REFERENCES brands(id) ON DELETE SET NULL,
  workflow_execution_id UUID REFERENCES workflow_executions(id) ON DELETE SET NULL,
  is_favorite     BOOLEAN DEFAULT FALSE,
  download_count  INTEGER DEFAULT 0,
  created_at      TIMESTAMPTZ DEFAULT NOW(),
  updated_at      TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_assets_workspace ON assets(workspace_id);
CREATE INDEX idx_assets_type ON assets(asset_type);
CREATE INDEX idx_assets_tags ON assets USING GIN(tags);
CREATE INDEX idx_assets_created ON assets(created_at DESC);

CREATE TRIGGER assets_updated_at
  BEFORE UPDATE ON assets
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- Asset collections
CREATE TABLE asset_collections (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  workspace_id    UUID REFERENCES workspaces(id) ON DELETE CASCADE NOT NULL,
  name            TEXT NOT NULL,
  description     TEXT,
  created_at      TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE asset_collection_items (
  collection_id   UUID REFERENCES asset_collections(id) ON DELETE CASCADE,
  asset_id        UUID REFERENCES assets(id) ON DELETE CASCADE,
  sort_order      INTEGER DEFAULT 0,
  PRIMARY KEY (collection_id, asset_id)
);

-- ============================================================================
-- 10. Projects
-- ============================================================================
CREATE TABLE projects (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  workspace_id    UUID REFERENCES workspaces(id) ON DELETE CASCADE NOT NULL,
  user_id         UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  name            TEXT NOT NULL,
  description     TEXT,
  product_id      UUID REFERENCES products(id) ON DELETE SET NULL,
  brand_id        UUID REFERENCES brands(id) ON DELETE SET NULL,
  target_platforms TEXT[] DEFAULT '{}',
  status          TEXT DEFAULT 'active' CHECK (status IN ('draft', 'active', 'completed', 'archived')),
  settings        JSONB DEFAULT '{}',
  created_at      TIMESTAMPTZ DEFAULT NOW(),
  updated_at      TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_projects_workspace ON projects(workspace_id);

CREATE TRIGGER projects_updated_at
  BEFORE UPDATE ON projects
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ============================================================================
-- 11. Publishing
-- ============================================================================
CREATE TABLE platform_connections (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  workspace_id    UUID REFERENCES workspaces(id) ON DELETE CASCADE NOT NULL,
  platform        TEXT NOT NULL,           -- amazon, shopify, tiktok, etc.
  credentials     JSONB DEFAULT '{}',       -- encrypted tokens
  store_name      TEXT,
  store_url       TEXT,
  is_connected    BOOLEAN DEFAULT FALSE,
  last_synced_at  TIMESTAMPTZ,
  created_at      TIMESTAMPTZ DEFAULT NOW(),
  updated_at      TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(workspace_id, platform)
);

CREATE TABLE publish_tasks (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  workspace_id    UUID REFERENCES workspaces(id) ON DELETE CASCADE NOT NULL,
  user_id         UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  product_id      UUID REFERENCES products(id) ON DELETE SET NULL,
  platform        TEXT NOT NULL,
  publish_mode    TEXT DEFAULT 'manual' CHECK (publish_mode IN ('manual', 'scheduled', 'auto')),
  scheduled_at    TIMESTAMPTZ,
  status          TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'pending', 'publishing', 'published', 'failed')),
  listing_data    JSONB DEFAULT '{}',     -- auto-filled listing content
  platform_listing_id TEXT,               -- the resulting platform listing ID
  platform_listing_url TEXT,
  error_message   TEXT,
  published_at    TIMESTAMPTZ,
  created_at      TIMESTAMPTZ DEFAULT NOW(),
  updated_at      TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_publish_tasks_workspace ON publish_tasks(workspace_id);
CREATE INDEX idx_publish_tasks_platform ON publish_tasks(platform);
CREATE INDEX idx_publish_tasks_status ON publish_tasks(status);

CREATE TRIGGER publish_tasks_updated_at
  BEFORE UPDATE ON publish_tasks
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ============================================================================
-- 12. Analytics & Commerce Intelligence
-- ============================================================================
CREATE TABLE analytics_metrics (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  workspace_id    UUID REFERENCES workspaces(id) ON DELETE CASCADE NOT NULL,
  product_id      UUID REFERENCES products(id) ON DELETE SET NULL,
  platform        TEXT,
  metric_type     TEXT NOT NULL CHECK (metric_type IN ('impressions', 'clicks', 'ctr', 'cvr', 'orders', 'revenue', 'roi', 'acos', 'roas')),
  metric_value    NUMERIC NOT NULL,
  period_start     DATE NOT NULL,
  period_end       DATE NOT NULL,
  source          TEXT,           -- where the data came from
  raw_data        JSONB,
  created_at      TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_analytics_product ON analytics_metrics(product_id);
CREATE INDEX idx_analytics_workspace_period ON analytics_metrics(workspace_id, period_start DESC);

-- A/B Tests
CREATE TABLE ab_tests (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  workspace_id    UUID REFERENCES workspaces(id) ON DELETE CASCADE NOT NULL,
  name            TEXT NOT NULL,
  description     TEXT,
  test_type       TEXT NOT NULL CHECK (test_type IN ('image', 'video', 'title', 'bullet', 'description')),
  variant_a       JSONB NOT NULL,
  variant_b       JSONB NOT NULL,
  product_id      UUID REFERENCES products(id) ON DELETE SET NULL,
  platform        TEXT,
  status          TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'running', 'completed')),
  winner          TEXT CHECK (winner IN ('a', 'b', 'tie')),
  uplift          NUMERIC,        -- percentage improvement
  started_at      TIMESTAMPTZ,
  completed_at    TIMESTAMPTZ,
  created_at      TIMESTAMPTZ DEFAULT NOW()
);

-- AI Insights & Predictions
CREATE TABLE commerce_insights (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  workspace_id    UUID REFERENCES workspaces(id) ON DELETE CASCADE NOT NULL,
  insight_type    TEXT NOT NULL CHECK (insight_type IN ('recommendation', 'prediction', 'alert', 'trend', 'optimization')),
  title           TEXT NOT NULL,
  description     TEXT,
  severity        TEXT DEFAULT 'info' CHECK (severity IN ('info', 'warning', 'critical', 'opportunity')),
  related_product_id UUID REFERENCES products(id) ON DELETE SET NULL,
  related_platform TEXT,
  action          TEXT,           -- recommended action
  action_url      TEXT,
  is_read         BOOLEAN DEFAULT FALSE,
  is_acted        BOOLEAN DEFAULT FALSE,
  created_at      TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_insights_workspace ON commerce_insights(workspace_id, created_at DESC);

-- ============================================================================
-- 13. Learning Engine
-- ============================================================================
CREATE TABLE learning_records (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  workspace_id    UUID REFERENCES workspaces(id) ON DELETE CASCADE NOT NULL,
  source          TEXT NOT NULL,         -- 'skill_execution', 'analytics', 'ab_test', 'publish', 'user_feedback'
  source_id       UUID,
  observation     JSONB NOT NULL,
  -- { what_worked: [...], what_didnt: [...], metrics: {...} }
  learning_embedding JSONB,               -- structured learnings for knowledge update
  confidence      REAL DEFAULT 0.5,
  applied_to      TEXT[],                 -- which skill_ids or workflow_ids were updated
  created_at      TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_learning_workspace ON learning_records(workspace_id, created_at DESC);

-- Optimization suggestions generated from learning
CREATE TABLE optimization_suggestions (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  workspace_id    UUID REFERENCES workspaces(id) ON DELETE CASCADE NOT NULL,
  learning_id     UUID REFERENCES learning_records(id) ON DELETE CASCADE,
  suggestion_type TEXT NOT NULL CHECK (suggestion_type IN ('skill', 'workflow', 'product', 'brand', 'pricing', 'content')),
  target_id       TEXT,                   -- skill_id, workflow_id, product_id, etc.
  suggestion      JSONB NOT NULL,
  -- { before: {...}, after: {...}, expected_improvement: "..." }
  status          TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'applied', 'rejected', 'testing')),
  applied_at      TIMESTAMPTZ,
  created_at      TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================================
-- 14. Commerce Ecosystem (Marketplace)
-- ============================================================================
CREATE TABLE ecosystem_items (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  item_type       TEXT NOT NULL CHECK (item_type IN ('skill', 'workflow', 'plugin', 'agent', 'template', 'api', 'sdk')),
  name            TEXT NOT NULL,
  description     TEXT,
  author          TEXT NOT NULL,
  author_id       UUID REFERENCES profiles(id) ON DELETE SET NULL,
  version         TEXT DEFAULT '1.0.0',
  category        TEXT,
  price           NUMERIC DEFAULT 0,        -- 0 = free
  rating          REAL DEFAULT 0,
  download_count  INTEGER DEFAULT 0,
  is_verified     BOOLEAN DEFAULT FALSE,
  is_active       BOOLEAN DEFAULT TRUE,
  config          JSONB DEFAULT '{}',
  created_at      TIMESTAMPTZ DEFAULT NOW(),
  updated_at      TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_ecosystem_type ON ecosystem_items(item_type);

CREATE TABLE ecosystem_installs (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  workspace_id    UUID REFERENCES workspaces(id) ON DELETE CASCADE NOT NULL,
  item_id         UUID REFERENCES ecosystem_items(id) ON DELETE CASCADE,
  installed_version TEXT,
  is_active       BOOLEAN DEFAULT TRUE,
  installed_at    TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(workspace_id, item_id)
);

-- ============================================================================
-- 15. Billing & Subscriptions
-- ============================================================================
CREATE TABLE subscriptions (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id         UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  organization_id UUID REFERENCES organizations(id) ON DELETE SET NULL,
  plan            TEXT NOT NULL CHECK (plan IN ('free', 'starter', 'pro', 'enterprise')),
  billing_cycle    TEXT DEFAULT 'monthly' CHECK (billing_cycle IN ('monthly', 'annual')),
  status          TEXT DEFAULT 'active' CHECK (status IN ('active', 'past_due', 'canceled', 'expired')),
  current_period_start TIMESTAMPTZ,
  current_period_end   TIMESTAMPTZ,
  canceled_at     TIMESTAMPTZ,
  created_at      TIMESTAMPTZ DEFAULT NOW(),
  updated_at      TIMESTAMPTZ DEFAULT NOW()
);

CREATE TRIGGER subscriptions_updated_at
  BEFORE UPDATE ON subscriptions
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- Usage tracking
CREATE TABLE usage_records (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  subscription_id UUID REFERENCES subscriptions(id) ON DELETE CASCADE NOT NULL,
  user_id         UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  resource_type   TEXT NOT NULL CHECK (resource_type IN ('image', 'video', 'copywriting', 'api_call')),
  quantity        INTEGER NOT NULL DEFAULT 1,
  period_start    DATE NOT NULL,
  period_end      DATE NOT NULL,
  created_at      TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_usage_subscription_period ON usage_records(subscription_id, period_start);

CREATE TABLE payments (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id         UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  subscription_id UUID REFERENCES subscriptions(id) ON DELETE SET NULL,
  amount          INTEGER NOT NULL,        -- in cents
  currency        TEXT DEFAULT 'cny',
  status          TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'failed', 'refunded')),
  payment_method   TEXT,
  payment_provider TEXT,                    -- stripe, alipay, wechat
  provider_ref    TEXT,
  invoice_url     TEXT,
  created_at      TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE api_keys (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  workspace_id    UUID REFERENCES workspaces(id) ON DELETE CASCADE,
  user_id         UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  key_name        TEXT NOT NULL,
  key_hash        TEXT NOT NULL,            -- hashed, never store plain text
  key_prefix      TEXT NOT NULL,            -- first 8 chars for display: 'cos_sk_...'
  permissions     TEXT[] DEFAULT '{}',
  last_used_at    TIMESTAMPTZ,
  expires_at      TIMESTAMPTZ,
  is_active       BOOLEAN DEFAULT TRUE,
  created_at      TIMESTAMPTZ DEFAULT NOW()
);

CREATE UNIQUE INDEX idx_api_keys_hash ON API_keys(key_hash);

-- ============================================================================
-- 16. Row Level Security (RLS)
-- ============================================================================
-- Enable RLS on all user-scoped tables
DO $$
DECLARE
  tbl TEXT;
BEGIN
  FOR tbl IN
    SELECT tablename FROM pg_tables
    WHERE schemaname = 'public'
      AND tablename NOT IN ('skill_categories', 'skills', 'ai_models', 'platform_rules', 'ecosystem_items')
  LOOP
    EXECUTE format('ALTER TABLE %I ENABLE ROW LEVEL SECURITY', tbl);
  END LOOP;
END $$;

-- Helper: Create standard ownership policy
CREATE OR REPLACE FUNCTION create_ownership_policy(table_name TEXT)
RETURNS VOID AS $$
BEGIN
  -- SELECT: owner can read
  EXECUTE format('
    CREATE POLICY "%1$s_select" ON %1$I
      FOR SELECT USING (auth.uid() = user_id);
  ', table_name);
  -- INSERT: owner can insert
  EXECUTE format('
    CREATE POLICY "%1$s_insert" ON %1$I
      FOR INSERT WITH CHECK (auth.uid() = user_id);
  ', table_name);
  -- UPDATE: owner can update
  EXECUTE format('
    CREATE POLICY "%1$s_update" ON %1$I
      FOR UPDATE USING (auth.uid() = user_id)
      WITH CHECK (auth.uid() = user_id);
  ', table_name);
  -- DELETE: owner can delete
  EXECUTE format('
    CREATE POLICY "%1$s_delete" ON %1$I
      FOR DELETE USING (auth.uid() = user_id);
  ', table_name);
END;
$$ LANGUAGE plpgsql;

-- Apply to core tables
SELECT create_ownership_policy('profiles');
SELECT create_ownership_policy('products');
SELECT create_ownership_policy('product_images');
SELECT create_ownership_policy('brands');
SELECT create_ownership_policy('projects');
SELECT create_ownership_policy('assets');
SELECT create_ownership_policy('workflows');
SELECT create_ownership_policy('skill_executions');
SELECT create_ownership_policy('publish_tasks');
SELECT create_ownership_policy('payments');

-- Workspace-scoped policies (members can read)
CREATE POLICY "workspace_member_select" ON workspaces
  FOR SELECT USING (
    auth.uid() IN (
      SELECT om.user_id FROM organization_members om
      WHERE om.organization_id = workspaces.organization_id
    )
  );

-- Public read-only tables
CREATE POLICY "public_read_skills" ON skills FOR SELECT USING (is_active = TRUE);
CREATE POLICY "public_read_models" ON ai_models FOR SELECT USING (is_active = TRUE);
CREATE POLICY "public_read_categories" ON skill_categories FOR SELECT USING (TRUE);
CREATE POLICY "public_read_ecosystem" ON ecosystem_items FOR SELECT USING (is_active = TRUE);

-- ============================================================================
-- 17. Functions
-- ============================================================================

-- Get workspace usage summary
CREATE OR REPLACE FUNCTION get_workspace_usage(ws_id UUID, period_start DATE, period_end DATE)
RETURNS TABLE (
  resource_type TEXT,
  total_used BIGINT,
  total_limit BIGINT
) AS $$
BEGIN
  RETURN QUERY
  SELECT ur.resource_type, SUM(ur.quantity)::BIGINT, 100::BIGINT
  FROM usage_records ur
  JOIN subscriptions s ON s.id = ur.subscription_id
  WHERE ur.period_start >= period_start
    AND ur.period_end <= period_end
    AND s.user_id IN (
      SELECT om.user_id FROM organization_members om
      JOIN workspaces w ON w.organization_id = om.organization_id
      WHERE w.id = ws_id
    )
  GROUP BY ur.resource_type;
END;
$$ LANGUAGE plpgsql;

-- Get commerce memory by semantic search (requires pgvector)
-- CREATE OR REPLACE FUNCTION search_commerce_memory(
--   ws_id UUID, query_text TEXT, memory_type TEXT, top_k INTEGER DEFAULT 10
-- ) RETURNS TABLE (...) ...

-- ============================================================================
-- 18. Seed Data — Skill Categories
-- ============================================================================
INSERT INTO skill_categories (id, name, description, icon, sort_order) VALUES
  ('image',       'Image Generation',     'Product photography, lifestyle, infographics', 'Image', 1),
  ('video',       'Video Generation',     'UGC, product demos, live scripts', 'Video', 2),
  ('copywriting', 'Copywriting',          'Titles, bullets, descriptions, ads', 'FileText', 3),
  ('seo',         'SEO Optimization',     'Keyword research, listing audit, ranking', 'Search', 4),
  ('translation', 'Translation',          'Multi-language listing localization', 'Languages', 5),
  ('publishing',  'Publishing',           'Auto-fill, schedule, multi-platform sync', 'Upload', 6),
  ('analytics',   'Analytics',            'Performance analysis, competitor insights', 'BarChart3', 7),
  ('automation',  'Automation',           'Price optimization, inventory alerts', 'Bot', 8),
  ('platform',    'Platform Skills',      'Complete platform-specific workflows', 'Globe', 9);

-- Seed AI Models
INSERT INTO ai_models (id, name, provider, category, capabilities, max_resolution, avg_speed, is_default) VALUES
  ('flux',        'FLUX 1.1 Pro',     'Black Forest Labs', 'image', '{product-photography,lifestyle,white-bg}', '4K', '30s', TRUE),
  ('gpt-image',   'GPT Image',        'OpenAI',            'image', '{creative,illustrations,ads}', '4K', '15s', FALSE),
  ('imagen',      'Imagen 3',         'Google DeepMind',   'image', '{realistic-people,textures,detail}', '4K', '20s', FALSE),
  ('recraft',     'Recraft V3',       'Recraft AI',        'image', '{graphic-design,infographics,charts}', '4K', '25s', FALSE),
  ('ideogram',    'Ideogram 3',       'Ideogram',          'image', '{text-in-image,typography,branding}', '2K', '18s', FALSE),
  ('seedream',    'Seedream 4',       'ByteDance',         'image', '{asian-lifestyle,beauty,fashion}', '2K', '12s', FALSE),
  ('veo',         'Veo 3',            'Google DeepMind',   'video', '{professional,product-demo,cinematic}', '1080p', '120s', TRUE),
  ('kling',       'Kling 2',          'Kuaishou',          'video', '{ugc,short-video,social-media}', '1080p', '90s', FALSE),
  ('runway',      'Runway Gen-4',     'Runway',            'video', '{cinematic,creative,editing}', '4K', '150s', FALSE),
  ('pika',        'Pika 2',           'Pika Labs',         'video', '{quick,animation,effects}', '1080p', '45s', FALSE),
  ('pixverse',    'PixVerse 3',       'PixVerse',         'video', '{social,fast-turnaround}', '1080p', '60s', FALSE),
  ('luma',        'Luma Ray 2',       'Luma AI',           'video', '{3d,product-renders,effects}', '1080p', '100s', FALSE),
  ('gpt-4',       'GPT-4o',           'OpenAI',            'text',  '{copywriting,seo,translation,analysis}', NULL, '10s', TRUE),
  ('claude',      'Claude 3.5 Sonnet','Anthropic',         'text',  '{copywriting,creative,long-form}', NULL, '12s', FALSE),
  ('gemini',      'Gemini 2.0',       'Google DeepMind',   'text',  '{multilingual,analysis,reasoning}', NULL, '8s', FALSE);
