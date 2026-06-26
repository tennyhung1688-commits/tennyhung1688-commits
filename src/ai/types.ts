/* ===================================================================
   CommerceOS AI Architecture — Core Types V1

   Agent + Skill + Workflow + Memory Architecture
   =================================================================== */

import type { Skill, SkillCategory, SupportedPlatform, SupportedModel } from '@/skills-v2/types';

/* ── AI Request/Response ── */
export interface CommerceRequest {
  /** Natural language intent from user */
  intent: string;
  /** Target platform(s) */
  platforms: SupportedPlatform[];
  /** Product context */
  productId?: string;
  productData?: ProductContext;
  /** Brand context */
  brandId?: string;
  brandData?: BrandContext;
  /** User preferences */
  preferences?: UserPreferences;
  /** Workspace context */
  workspaceId?: string;
}

export interface CommerceResponse {
  status: 'success' | 'partial' | 'error';
  /** Natural language summary */
  summary: string;
  /** Generated assets */
  assets: GeneratedAsset[];
  /** Steps executed */
  steps: ExecutionStep[];
  /** Total duration */
  totalDuration: number;
  /** Skills used */
  skillsUsed: string[];
}

/* ── Context Types ── */
export interface ProductContext {
  name: string;
  sku?: string;
  category?: string;
  attributes: Record<string, string>;
  sellingPoints: string[];
  targetAudience?: string;
  images: string[]; // URLs
}

export interface BrandContext {
  name: string;
  logo?: string;
  colors: string[];
  fonts: { heading: string; body: string };
  tone: string;
  style: string;
  guidelines?: string[];
}

export interface UserPreferences {
  language: string;
  preferredModels?: SupportedModel[];
  savedStyles?: string[];
  history?: string[]; // recent skill IDs
}

/* ── Execution ── */
export interface ExecutionStep {
  id: string;
  skillId: string;
  name: string;
  status: 'pending' | 'running' | 'completed' | 'failed' | 'skipped';
  modelUsed?: SupportedModel;
  duration: number; // ms
  input?: Record<string, unknown>;
  output?: Record<string, unknown>;
  error?: string;
}

export interface GeneratedAsset {
  type: 'image' | 'video' | 'text' | 'document';
  skillId: string;
  name: string;
  url?: string;
  content?: string; // for text assets
  metadata?: Record<string, unknown>;
}

/* ── Decision Engine ── */
export interface DecisionResult {
  /** Selected skills in execution order */
  skills: Skill[];
  /** Selected workflow ID (if applicable) */
  workflowId?: string;
  /** Selected models per skill */
  modelAssignments: Map<string, string>; // skillId → model
  /** Reasoning chain */
  reasoning: string[];
}

/* ── Model Router ── */
export interface ModelRoutingConfig {
  taskType: SkillCategory;
  platform?: SupportedPlatform;
  preferences?: SupportedModel[];
  fallbackOrder: SupportedModel[];
}

export interface ModelSelection {
  model: SupportedModel;
  confidence: number; // 0-1
  alternatives: SupportedModel[];
  reason: string;
}

/* ── Prompt Builder ── */
export interface PromptContext {
  product: ProductContext;
  brand?: BrandContext;
  skill: Skill;
  platform: SupportedPlatform;
  platformRules?: Record<string, unknown>;
  userPreferences?: UserPreferences;
  commerceMemory?: MemoryRecord[];
}

export interface RenderedPrompt {
  systemPrompt: string;
  userPrompt: string;
  variables: Record<string, string>;
  tokenEstimate: number;
}

/* ── Commerce Memory ── */
export interface MemoryRecord {
  type: 'product' | 'brand' | 'campaign' | 'preference' | 'success';
  key: string;
  data: Record<string, unknown>;
  importance: number; // 0-1
  lastAccessed: Date;
}

/* ── Platform Intelligence ── */
export interface PlatformSpec {
  platform: SupportedPlatform;
  imageRules: ImageRules;
  videoRules: VideoRules;
  titleRules: TextRules;
  descriptionRules: TextRules;
  seoRules: SeoRules;
  categoryRules?: Record<string, unknown>;
}

export interface ImageRules {
  maxResolution: number;
  aspectRatio: string;
  bgColor: string;
  maxFileSize: number;
  minImages: number;
  maxImages: number;
  prohibited: string[];
  required: string[];
}

export interface VideoRules {
  maxDuration: number;
  minDuration: number;
  aspectRatio: string;
  maxFileSize: number;
  formats: string[];
  prohibited: string[];
}

export interface TextRules {
  maxChars: number;
  prohibitedWords: string[];
  requiredWords?: string[];
  format: string;
}

export interface SeoRules {
  maxKeywords: number;
  maxBackendTerms: number;
  prohibitedFields: string[];
  rankingFactors: string[];
}
