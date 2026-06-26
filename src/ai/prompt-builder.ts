/* ===================================================================
   CommerceOS Prompt Builder V1

   Dynamically composes prompts from:
   Brand Style + Platform Rules + Skill Prompt + Product Info
   + User Language + Image Style + Historical Preferences
   =================================================================== */

import type { Skill } from '@/skills-v2/types';
import type { ProductContext, BrandContext, UserPreferences, MemoryRecord, RenderedPrompt } from './types';

/* ── Platform-specific prompt additions ── */
const platformStyleGuides: Record<string, string> = {
  amazon:     'Professional, clean, compliance-first. No competitor mentions. No pricing in images. No watermarks.',
  shopify:    'Brand-focused, lifestyle-driven. Warm lighting, storytelling. Optimized for mobile.',
  tiktok:     'Viral-first, trending sounds, authentic UGC style. Hook in first second. Vertical 9:16.',
  taobao:     'Chinese marketplace style. 800x800 minimum. White background preferred. 30-char titles.',
  douyin:     'Entertaining, native content style. Vertical 9:16. Trend-driven. Interactive elements.',
  shopee:     'SEA marketplace. Multi-language ready. Clean product focus. Voucher/promo aware.',
  lazada:     '6-marketplace style (MY/SG/PH/TH/ID/VN). Multi-language. Clean professional.',
  temu:       'Ultra-competitive pricing focus. Simple clean images. Direct benefit-driven copy.',
  jd:         'JD.com style. Premium, quality-first. 800x800 white bg. Detailed specs required.',
  xiaohongshu: 'Lifestyle sharing style. Natural lighting, warm tones. Personal narrative. 3:4 ratio.',
  pinduoduo:  'Group-buy focused. Value-driven. Price overlay allowed. Social proof emphasis.',
  '1688':     'Wholesale B2B style. Bulk pricing visible. MOQ displayed. Supplier direct tone.',
};

/* ── Brand tone → prompt modifiers ── */
const toneModifiers: Record<string, string> = {
  inspirational: 'Use inspiring, motivational language. Focus on achievement and potential.',
  luxurious:     'Use elegant, sophisticated language. Emphasize quality, exclusivity, craftsmanship.',
  professional:  'Use precise, authoritative language. Focus on specs, performance, reliability.',
  authentic:     'Use genuine, honest language. Focus on heritage, craftsmanship, real stories.',
  technical:     'Use precise, data-driven language. Focus on innovation, engineering, specifications.',
  playful:       'Use fun, energetic language. Focus on enjoyment, creativity, personality.',
};

export class PromptBuilder {
  /** Build the complete prompt for a skill execution */
  build(params: {
    product: ProductContext;
    brand?: BrandContext;
    skill: Skill;
    platform: string;
    platformRules?: Record<string, unknown>;
    userPreferences?: UserPreferences;
    commerceMemory?: MemoryRecord[];
  }): RenderedPrompt {
    const { product, brand, skill, platform } = params;
    const variables: Record<string, string> = {};

    // 1. Start with skill's template
    let systemPrompt = skill.promptTemplate.systemPrompt;
    let userPrompt = this.resolveTemplate(skill.promptTemplate.userPromptTemplate, product, brand, variables);

    // 2. Add brand context
    if (brand) {
      systemPrompt += `\n\nBRAND CONTEXT:\n` +
        `Brand: ${brand.name}\n` +
        `Tone: ${brand.tone}\n` +
        `Style: ${brand.style}\n` +
        `Colors: ${brand.colors.join(', ')}\n` +
        `Fonts: Heading "${brand.fonts.heading}", Body "${brand.fonts.body}"`;

      if (brand.tone && toneModifiers[brand.tone.toLowerCase()]) {
        systemPrompt += `\n` + toneModifiers[brand.tone.toLowerCase()];
      }

      if (brand.guidelines) {
        systemPrompt += `\n\nBrand Guidelines:\n${brand.guidelines.map(g => `- ${g}`).join('\n')}`;
      }
    }

    // 3. Add platform rules
    if (platformStyleGuides[platform]) {
      systemPrompt += `\n\nPLATFORM RULES (${platform.toUpperCase()}):\n${platformStyleGuides[platform]}`;
    }

    // 4. Add product details in structured format
    systemPrompt += `\n\nPRODUCT DETAILS:\n` +
      `Name: ${product.name}\n` +
      `Category: ${product.category || 'General'}\n` +
      `Selling Points: ${product.sellingPoints.join('; ')}\n` +
      `Target Audience: ${product.targetAudience || product.attributes['target_audience'] || 'General consumers'}`;

    if (Object.keys(product.attributes).length > 0) {
      systemPrompt += `\nAttributes: ${Object.entries(product.attributes).map(([k, v]) => `${k}: ${v}`).join(', ')}`;
    }

    // 5. Add commerce memory context
    if (params.commerceMemory && params.commerceMemory.length > 0) {
      const relevantMemories = params.commerceMemory
        .filter(m => m.type === 'preference' || m.type === 'success' || m.type === 'brand')
        .slice(0, 3);

      if (relevantMemories.length > 0) {
        systemPrompt += `\n\nHISTORICAL CONTEXT (from Commerce Memory):`;
        for (const mem of relevantMemories) {
          systemPrompt += `\n- ${mem.key}: ${JSON.stringify(mem.data)}`;
        }
      }
    }

    // 6. Add language preference
    if (params.userPreferences?.language) {
      systemPrompt += `\n\nLANGUAGE: Generate in ${params.userPreferences.language}.`;
    }

    return {
      systemPrompt,
      userPrompt,
      variables,
      tokenEstimate: Math.ceil((systemPrompt.length + userPrompt.length) / 4),
    };
  }

  /** Replace template variables with product/brand data */
  private resolveTemplate(
    template: string,
    product: ProductContext,
    brand?: BrandContext,
    variables: Record<string, string> = {}
  ): string {
    const allVars: Record<string, string> = {
      productName: product.name,
      productSku: product.sku || 'N/A',
      productCategory: product.category || 'General',
      sellingPoints: product.sellingPoints.join('\n• '),
      targetAudience: product.targetAudience || 'General consumers',
      brandName: brand?.name || '',
      brandTone: brand?.tone || 'Professional',
      brandStyle: brand?.style || 'Clean',
      primaryColor: brand?.colors[0] || '#000000',
      ...Object.fromEntries(
        Object.entries(product.attributes).map(([k, v]) => [`attr_${k}`, v])
      ),
      ...variables,
    };

    let result = template;
    for (const [key, value] of Object.entries(allVars)) {
      result = result.replace(new RegExp(`\\{\\{${key}\\}\\}`, 'gi'), value);
    }
    return result;
  }
}

export const promptBuilder = new PromptBuilder();
