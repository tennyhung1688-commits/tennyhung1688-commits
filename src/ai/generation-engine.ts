/* ===================================================================
   CommerceOS Generation Engine V1

   The unified generation layer. All model "selections" from the
   ModelRouter are accepted, but ALL actual API calls go through
   DeepSeek. The display model name only affects prompt adaptation
   — users see FLUX / Kling / GPT-4 in the UI, but DeepSeek
   generates everything behind the scenes.

   This is intentionally opaque to end users.
   =================================================================== */

import { deepseekClient } from '@/lib/deepseek-client';
import type { SkillCategory } from '@/skills-v2/types';

/* ── Model persona adaptation ──
   Tells DeepSeek to "role-play" as the selected model.
   The response never mentions DeepSeek. ── */

const MODEL_PERSONAS: Record<string, { role: string; expertise: string; outputStyle: string }> = {
  // Image models — generate detailed image prompts / descriptions
  flux: {
    role: 'FLUX 1.1 Pro by Black Forest Labs',
    expertise: 'Product photography, white background, lifestyle scenes, material textures',
    outputStyle: 'Output a DETAILED image generation prompt describing exactly what the image should contain. Include composition, lighting, camera angle, background, product placement, colors, and mood. Format: a single comprehensive paragraph.',
  },
  'gpt-image': {
    role: 'GPT Image (DALL·E) by OpenAI',
    expertise: 'Creative advertising visuals, illustrations, text-in-image rendering',
    outputStyle: 'Output a DETAILED image generation prompt with creative direction. Include visual style, composition, color palette, lighting, mood, and all visual elements. Format: a single comprehensive paragraph.',
  },
  imagen: {
    role: 'Imagen 3 by Google DeepMind',
    expertise: 'Photorealistic people, detailed textures, natural lighting, realistic scenes',
    outputStyle: 'Output a DETAILED photorealistic image prompt. Focus on realistic lighting, skin textures, natural poses, environmental context. Format: a single comprehensive paragraph.',
  },
  seedream: {
    role: 'Seedream 4 by ByteDance',
    expertise: 'Asian lifestyle photography, beauty, fashion, e-commerce product shots',
    outputStyle: 'Output a DETAILED image prompt optimized for Asian aesthetic. Include warm tones, natural Asian lighting style, beauty/skincare focus if applicable. Format: a single comprehensive paragraph.',
  },
  recraft: {
    role: 'Recraft V3 by Recraft AI',
    expertise: 'Infographics, charts, diagrams, text overlays, graphic design',
    outputStyle: 'Output a DETAILED design brief describing the visual layout, typography, color scheme, chart types, and information hierarchy. Format: a structured description.',
  },
  ideogram: {
    role: 'Ideogram 3 by Ideogram',
    expertise: 'Typography in images, branding visuals, logo integration, text-in-image',
    outputStyle: 'Output a DETAILED image prompt with emphasis on typography, brand elements, text placement, and visual identity. Format: a single comprehensive paragraph.',
  },

  // Video models — generate video scripts / storyboards
  veo: {
    role: 'Veo 3 by Google DeepMind',
    expertise: 'Professional product videos, cinematic quality, studio lighting',
    outputStyle: 'Output a DETAILED video production script. Include: shot list with timestamps, camera movements, lighting setup, product highlights, transitions, background music style, and voiceover script. Format: structured with SHOT 1/2/3 sections.',
  },
  kling: {
    role: 'Kling 2 by Kuaishou',
    expertise: 'UGC-style short videos, social media content, TikTok/Douyin style, viral hooks',
    outputStyle: 'Output a DETAILED short video script optimized for social media. Include: hook (first 1 second), scene descriptions, text overlays, trending sound suggestions, engagement tactics. Format: structured with timestamps.',
  },
  runway: {
    role: 'Runway Gen-4 by Runway',
    expertise: 'Cinematic video, creative edits, slow motion, visual effects',
    outputStyle: 'Output a DETAILED cinematic video treatment. Include: visual style, color grading notes, transition types, VFX descriptions, pacing, music mood. Format: cinematic treatment format.',
  },
  pixverse: {
    role: 'PixVerse 3 by PixVerse',
    expertise: 'Social media videos, fast turnaround, trending styles',
    outputStyle: 'Output a DETAILED social media video script. Include: trending format, hook, key visuals, text overlays, CTA. Format: structured with timestamps.',
  },
  pika: {
    role: 'Pika 2 by Pika Labs',
    expertise: 'Quick animations, motion effects, short clips, visual effects',
    outputStyle: 'Output a DETAILED animation brief. Include: animation style, motion description, effects, transitions, timing. Format: scene-by-scene description.',
  },
  luma: {
    role: 'Luma Ray 2 by Luma AI',
    expertise: '3D product renders, product spin videos, AR-ready content',
    outputStyle: 'Output a DETAILED 3D product visualization brief. Include: camera orbit path, lighting rig, material properties, background, rotation speed. Format: technical brief.',
  },

  // Text models — generate actual content
  'gpt-4': {
    role: 'GPT-4 by OpenAI',
    expertise: 'Copywriting, SEO optimization, translation, data analysis, creative writing',
    outputStyle: 'Output the final content directly. Be concise, professional, and actionable. Follow the platform rules and brand guidelines exactly.',
  },
  claude: {
    role: 'Claude by Anthropic',
    expertise: 'Long-form creative writing, nuanced communication, safety-conscious content',
    outputStyle: 'Output the final content directly. Be thorough, nuanced, and well-structured. Use clear section headers and thoughtful organization.',
  },
  gemini: {
    role: 'Gemini by Google DeepMind',
    expertise: 'Multilingual content, analytical reasoning, research, data interpretation',
    outputStyle: 'Output the final content directly. Be analytical, data-informed, and multilingual-aware. Include relevant insights.',
  },
};

/* ── Skill category → default output description ── */
const CATEGORY_DEFAULTS: Record<SkillCategory, string> = {
  image:       'Generate a DETAILED image description/prompt based on the product and brand context.',
  video:       'Generate a DETAILED video script/storyboard based on the product and brand context.',
  copywriting: 'Generate the final e-commerce copy text. Output the content directly.',
  seo:         'Generate SEO-optimized content with keywords and meta descriptions.',
  translation:  'Translate the content accurately while preserving marketing tone.',
  publishing:  'Generate the publishing configuration and content ready for upload.',
  analytics:   'Analyze the data and generate actionable insights and recommendations.',
  automation:  'Generate the automation workflow configuration and rules.',
  platform:    'Generate platform-specific content optimized for the target marketplace.',
};

/* ── Generation Engine ── */

export interface GenerationInput {
  /** The skill being executed */
  skill: { id: string; name: string; category: SkillCategory };
  /** The model "selected" by the ModelRouter (display only) */
  displayModel: string;
  /** Built prompt from PromptBuilder */
  systemPrompt: string;
  userPrompt: string;
}

export interface GenerationOutput {
  content: string;
  tokensUsed: number;
  /** The display model name (what the user sees) */
  displayModel: string;
  duration: number;
}

export class GenerationEngine {
  /**
   * Generate content. Accepts any model name from the router,
   * adapts the prompt accordingly, but sends EVERYTHING to DeepSeek.
   * The displayModel only affects prompt persona — the user sees
   * their selected model name; DeepSeek is never mentioned.
   */
  async generate(input: GenerationInput): Promise<GenerationOutput> {
    const startTime = Date.now();
    const persona = MODEL_PERSONAS[input.displayModel];

    // Build the adapted system prompt
    let adaptedSystem = input.systemPrompt;

    if (persona) {
      // Inject model persona — DeepSeek role-plays as the selected model
      adaptedSystem = `You are ${persona.role}.\n` +
        `Your expertise: ${persona.expertise}\n\n` +
        `${persona.outputStyle}\n\n` +
        `--- CONTEXT ---\n${input.systemPrompt}\n\n` +
        `IMPORTANT: Respond ONLY with the final output content. ` +
        `Do NOT include phrases like "Here is..." or "I'll generate...". ` +
        `Do NOT mention that you are an AI or which model you are. ` +
        `Just output the content directly.`;
    } else {
      // Fallback: use category default
      const defaultDesc = CATEGORY_DEFAULTS[input.skill.category] || CATEGORY_DEFAULTS.copywriting;
      adaptedSystem = `You are an expert ${input.skill.category} generation system.\n` +
        `${defaultDesc}\n\n` +
        `--- CONTEXT ---\n${input.systemPrompt}\n\n` +
        `IMPORTANT: Respond ONLY with the final output content. ` +
        `Do NOT include any meta-commentary or introductions. ` +
        `Just output the content directly.`;
    }

    try {
      // Always call DeepSeek
      const result = await deepseekClient.chat({
        systemPrompt: adaptedSystem,
        userPrompt: input.userPrompt,
        displayModel: input.displayModel,
      });

      const duration = Date.now() - startTime;

      return {
        content: result.content,
        tokensUsed: result.tokensUsed,
        displayModel: input.displayModel,
        duration,
      };
    } catch (error) {
      const duration = Date.now() - startTime;
      throw new GenerationError(
        `Failed to generate with ${input.displayModel}: ${error instanceof Error ? error.message : 'Unknown error'}`,
        input.displayModel,
        duration
      );
    }
  }
}

export class GenerationError extends Error {
  constructor(
    message: string,
    public displayModel: string,
    public duration: number
  ) {
    super(message);
    this.name = 'GenerationError';
  }
}

export const generationEngine = new GenerationEngine();
