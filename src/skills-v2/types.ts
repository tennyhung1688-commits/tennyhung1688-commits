/* ===================================================================
   CommerceOS Skill Architecture — Capability-centric Design

   Every capability is a Skill. The platform is Skill-driven.
   New skills can be added without modifying the core application.

   Categories:
     image · video · copywriting · seo · translation
     publishing · analytics · automation · platform
   =================================================================== */

/* ── Skill Categories ── */
export type SkillCategory =
  | 'image'
  | 'video'
  | 'copywriting'
  | 'seo'
  | 'translation'
  | 'publishing'
  | 'analytics'
  | 'automation'
  | 'platform';

/* ── Supported Platforms ── */
export type SupportedPlatform =
  | 'amazon' | 'shopify' | 'shopee' | 'lazada' | 'temu' | 'tiktok'
  | 'taobao' | 'douyin' | 'jd' | 'pinduoduo' | '1688' | 'aliexpress'
  | 'ebay' | 'etsy' | 'walmart' | 'mercadolibre' | 'ozon' | 'rakuten'
  | 'coupang' | 'flipkart' | 'facebook-shop' | 'instagram-shop' | 'pinterest'
  | 'xiaohongshu' | 'wechat-channels' | 'generic';

/* ── Supported AI Models ── */
export type SupportedModel =
  | 'flux' | 'gpt-image' | 'imagen' | 'seedream' | 'recraft' | 'ideogram'
  | 'veo' | 'kling' | 'runway' | 'pixverse' | 'pika' | 'luma'
  | 'gpt-4' | 'claude' | 'gemini' | 'deepseek';

/* ── Skill Tag ── */
export type SkillTag = 'official' | 'community' | 'premium' | 'beta';

/* ── Input/Output Schemas ── */
export interface SkillInputSchema {
  type: 'object';
  required: string[];
  properties: Record<string, {
    type: string;
    description: string;
    enum?: string[];
  }>;
}

export interface SkillOutputSchema {
  type: string;
  description: string;
  format?: string;
  example?: string;
}

/* ── Workflow Step ── */
export interface SkillWorkflowStep {
  id: string;
  name: string;
  description: string;
  estimatedTime: string;
  dependencies?: string[];
}

/* ── Prompt Template ── */
export interface SkillPromptTemplate {
  systemPrompt: string;
  userPromptTemplate: string;
  variables: string[];
  examples?: { input: string; output: string }[];
}

/* ── Skill Interface ── */
export interface Skill {
  /** Unique skill identifier */
  id: string;

  /** Human-readable name */
  name: string;

  /** Skill category */
  category: SkillCategory;

  /** Brief description */
  description: string;

  /** Platforms this skill supports (empty = platform-agnostic) */
  supportedPlatforms: SupportedPlatform[];

  /** AI models this skill can use */
  supportedModels: SupportedModel[];

  /** JSON Schema for skill input validation */
  inputSchema: SkillInputSchema;

  /** JSON Schema for skill output shape */
  outputSchema: SkillOutputSchema;

  /** Ordered workflow steps */
  workflow: SkillWorkflowStep[];

  /** Prompt template with variables */
  promptTemplate: SkillPromptTemplate;

  /** Lucide icon name */
  icon: string;

  /** Tags for discovery/filtering */
  tags: SkillTag[];

  /** Estimated total execution time */
  estimatedTime: string;

  /** Whether skill requires platform connection */
  requiresConnection: boolean;
}

/* ── Skill Registry Interface ── */
export interface SkillRegistry {
  register(skill: Skill): void;
  get(id: string): Skill | undefined;
  getByCategory(category: SkillCategory): Skill[];
  getByPlatform(platform: SupportedPlatform): Skill[];
  search(query: string): Skill[];
  getAll(): Skill[];
  getCategories(): SkillCategory[];
}

/* ── Skill Execution Context ── */
export interface SkillExecutionContext {
  skillId: string;
  input: Record<string, unknown>;
  platform?: SupportedPlatform;
  model?: SupportedModel;
  metadata?: Record<string, unknown>;
}

/* ── Skill Execution Result ── */
export interface SkillExecutionResult {
  skillId: string;
  status: 'success' | 'error' | 'partial';
  output: Record<string, unknown>;
  steps: { id: string; status: 'completed' | 'failed' | 'skipped'; duration: number }[];
  assets?: { type: string; url: string; metadata?: Record<string, unknown> }[];
  error?: string;
}
