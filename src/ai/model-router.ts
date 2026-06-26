/* ===================================================================
   CommerceOS Model Router V1

   Auto-selects the best AI model for each task.
   Users never need to choose models.
   =================================================================== */

import type { SkillCategory, SupportedModel } from '@/skills-v2/types';
import type { ModelSelection } from './types';

interface ModelCapability {
  id: string;
  provider: string;
  strengths: string[];
  resolution: string;
  avgSpeed: string;
  cost: 'low' | 'medium' | 'high';
}

const modelRegistry: Record<string, ModelCapability> = {
  // Image models
  flux:      { id: 'flux',      provider: 'Black Forest Labs', strengths: ['product-photography', 'white-bg', 'lifestyle', 'textures'], resolution: '4K', avgSpeed: '30s', cost: 'medium' },
  'gpt-image': { id: 'gpt-image', provider: 'OpenAI', strengths: ['creative', 'ads', 'illustrations', 'text-rendering'], resolution: '4K', avgSpeed: '15s', cost: 'high' },
  imagen:    { id: 'imagen',    provider: 'Google DeepMind',   strengths: ['realistic-people', 'textures', 'detail', 'lighting'], resolution: '4K', avgSpeed: '20s', cost: 'high' },
  seedream:  { id: 'seedream',  provider: 'ByteDance',        strengths: ['asian-lifestyle', 'beauty', 'fashion', 'e-commerce'], resolution: '2K', avgSpeed: '12s', cost: 'low' },
  recraft:   { id: 'recraft',   provider: 'Recraft AI',       strengths: ['infographic', 'chart', 'diagram', 'text-overlay'], resolution: '4K', avgSpeed: '25s', cost: 'medium' },
  ideogram:  { id: 'ideogram',  provider: 'Ideogram',          strengths: ['typography', 'branding', 'logo', 'text-in-image'], resolution: '2K', avgSpeed: '18s', cost: 'low' },
  // Video models
  veo:       { id: 'veo',       provider: 'Google DeepMind',   strengths: ['professional', 'cinematic', 'product-demo'], resolution: '1080p', avgSpeed: '120s', cost: 'high' },
  kling:     { id: 'kling',     provider: 'Kuaishou',          strengths: ['ugc', 'short-video', 'social-media', 'tiktok-style'], resolution: '1080p', avgSpeed: '90s', cost: 'medium' },
  runway:    { id: 'runway',    provider: 'Runway',            strengths: ['cinematic', 'creative', 'slow-motion'], resolution: '4K', avgSpeed: '150s', cost: 'high' },
  pika:      { id: 'pika',      provider: 'Pika Labs',         strengths: ['quick', 'animation', 'effects', 'short-clip'], resolution: '1080p', avgSpeed: '45s', cost: 'low' },
  pixverse:  { id: 'pixverse',  provider: 'PixVerse',          strengths: ['social-media', 'fast-turnaround', 'trending'], resolution: '1080p', avgSpeed: '60s', cost: 'low' },
  luma:      { id: 'luma',      provider: 'Luma AI',           strengths: ['3d-render', 'product-spin', 'ar-ready'], resolution: '1080p', avgSpeed: '100s', cost: 'medium' },
  // Text models
  'gpt-4':    { id: 'gpt-4',    provider: 'OpenAI',            strengths: ['copywriting', 'seo', 'translation', 'analysis', 'creative'], resolution: 'N/A', avgSpeed: '10s', cost: 'high' },
  claude:    { id: 'claude',    provider: 'Anthropic',          strengths: ['long-form', 'creative-writing', 'nuance', 'safety'], resolution: 'N/A', avgSpeed: '12s', cost: 'high' },
  gemini:    { id: 'gemini',    provider: 'Google DeepMind',    strengths: ['multilingual', 'analysis', 'reasoning', 'research'], resolution: 'N/A', avgSpeed: '8s', cost: 'medium' },
};

/* ── Routing Rules ── */
const routingRules: Record<SkillCategory, { primary: string; fallback: string[] }> = {
  image:       { primary: 'flux',       fallback: ['gpt-image', 'imagen', 'recraft'] },
  video:       { primary: 'kling',      fallback: ['veo', 'pika', 'pixverse'] },
  copywriting: { primary: 'gpt-4',      fallback: ['claude', 'gemini'] },
  seo:         { primary: 'gpt-4',      fallback: ['claude'] },
  translation: { primary: 'gpt-4',      fallback: ['claude', 'gemini'] },
  publishing:  { primary: 'gpt-4',      fallback: ['claude'] },
  analytics:   { primary: 'gpt-4',      fallback: ['claude', 'gemini'] },
  automation:  { primary: 'gpt-4',      fallback: ['claude'] },
  platform:    { primary: 'gpt-4',      fallback: ['claude'] },
};

/* ── Model Router ── */
export class ModelRouter {
  /** Select the best model for a task */
  route(category: SkillCategory, preferredModel?: string, context?: { platform?: string; task?: string }): ModelSelection {
    const rule = routingRules[category] ?? { primary: 'gpt-4', fallback: ['claude'] };
    
    // If user has a preferred model and it's valid for this category
    if (preferredModel && modelRegistry[preferredModel]) {
      return {
        model: preferredModel as SupportedModel,
        confidence: 0.95,
        alternatives: rule.fallback as SupportedModel[],
        reason: `User preferred model: ${preferredModel}`,
      };
    }

    // Task-specific optimization
    if (context?.task) {
      const optimized = this.optimizeForTask(category, context.task);
      if (optimized) return optimized;
    }

    // Default routing
    return {
      model: rule.primary as SupportedModel,
      confidence: 0.9,
      alternatives: rule.fallback as SupportedModel[],
      reason: `Default ${category} model: ${rule.primary} (${modelRegistry[rule.primary]?.provider})`,
    };
  }

  /** Optimize model selection for specific tasks */
  private optimizeForTask(category: SkillCategory, task: string): ModelSelection | null {
    const taskLower = task.toLowerCase();

    if (category === 'image') {
      if (/infographic|chart|diagram|size chart/.test(taskLower)) {
        return { model: 'recraft', confidence: 0.85, alternatives: ['gpt-image', 'flux'], reason: 'Recraft optimized for infographics and charts' };
      }
      if (/lifestyle|scene|in use|wearing/.test(taskLower)) {
        return { model: 'imagen', confidence: 0.85, alternatives: ['flux', 'gpt-image'], reason: 'Imagen excels at realistic lifestyle scenes' };
      }
      if (/asian|chinese|japanese|korean|beauty|fashion/.test(taskLower)) {
        return { model: 'seedream', confidence: 0.8, alternatives: ['flux', 'gpt-image'], reason: 'Seedream optimized for Asian lifestyle and beauty' };
      }
    }

    if (category === 'video') {
      if (/ugc|tiktok|douyin|social|viral/.test(taskLower)) {
        return { model: 'kling', confidence: 0.9, alternatives: ['pika', 'pixverse'], reason: 'Kling optimized for UGC short videos' };
      }
      if (/professional|product demo|studio/.test(taskLower)) {
        return { model: 'veo', confidence: 0.85, alternatives: ['runway', 'kling'], reason: 'Veo best for professional product videos' };
      }
    }

    if (category === 'copywriting') {
      if (/long|story|brand|creative/.test(taskLower)) {
        return { model: 'claude', confidence: 0.85, alternatives: ['gpt-4', 'gemini'], reason: 'Claude excels at creative and long-form writing' };
      }
      if (/multi.*lang|translate|japanese|chinese|spanish/.test(taskLower)) {
        return { model: 'gemini', confidence: 0.85, alternatives: ['gpt-4', 'claude'], reason: 'Gemini optimized for multilingual tasks' };
      }
    }

    return null;
  }

  /** Get model info for display */
  getModelInfo(modelId: string): ModelCapability | undefined {
    return modelRegistry[modelId];
  }
}

export const modelRouter = new ModelRouter();
