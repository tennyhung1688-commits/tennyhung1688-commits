/* ===================================================================
   CommerceOS Amazon Listing Agent V1

   Complete autonomous Amazon listing workflow:
   Upload → Analyze → Hero → Lifestyle → Infographic → Title
   → Bullets → Description → Search Terms → Download ZIP

   This is the reference implementation for all platform agents.
   =================================================================== */

import { commerceAssistant } from '../assistant';
import { commerceMemory } from '../memory';
import { promptBuilder } from '../prompt-builder';
import { registry } from '@/skills-v2';
import type {
  CommerceResponse, ExecutionStep, GeneratedAsset,
  ProductContext, BrandContext,
} from '../types';

/* ── Amazon Listing Result ── */
export interface AmazonListingResult {
  success: boolean;
  product: ProductContext;
  assets: {
    heroImage?: GeneratedAsset;
    lifestyleImages: GeneratedAsset[];
    infographic?: GeneratedAsset;
    title?: string;
    bullets?: string[];
    description?: string;
    searchTerms?: string[];
    aPlusContent?: string;
  };
  steps: ExecutionStep[];
  downloadUrl?: string;
  totalDuration: number;
}

/* ── Amazon Listing Agent ── */
export class AmazonListingAgent {
  private workspaceId: string;

  constructor(workspaceId: string = 'default') {
    this.workspaceId = workspaceId;
  }

  /** Generate a complete Amazon listing from a product */
  async generateListing(options: {
    product: ProductContext;
    brand?: BrandContext;
    market?: 'US' | 'UK' | 'DE' | 'FR' | 'IT' | 'ES' | 'JP' | 'CA';
  }): Promise<AmazonListingResult> {
    const { product, brand, market = 'US' } = options;
    const startTime = Date.now();
    const allSteps: ExecutionStep[] = [];
    const result: AmazonListingResult = {
      success: false,
      product,
      assets: { lifestyleImages: [] },
      steps: [],
      totalDuration: 0,
    };

    // 1. Remember the product
    commerceMemory.rememberProduct(this.workspaceId, product);
    if (brand) commerceMemory.rememberBrand(this.workspaceId, brand);

    // 2. Step 1: Hero Image
    const heroResult = await this.runSkill('amazon-main-image', product, brand, market);
    allSteps.push(...heroResult.steps);
    result.assets.heroImage = heroResult.assets.find(a => a.type === 'image') || 
      { type: 'image', skillId: 'amazon-main-image', name: 'Main Image', metadata: {} };

    // 3. Step 2: Lifestyle Images
    const lifestyleResult = await this.runSkill('amazon-lifestyle-image', product, brand, market);
    allSteps.push(...lifestyleResult.steps);
    result.assets.lifestyleImages = lifestyleResult.assets.filter(a => a.type === 'image');

    // 4. Step 3: Infographic
    const infoResult = await this.runSkill('amazon-infographic', product, brand, market);
    allSteps.push(...infoResult.steps);
    result.assets.infographic = infoResult.assets.find(a => a.type === 'image') ||
      { type: 'image', skillId: 'amazon-infographic', name: 'Infographic', metadata: {} };

    // 5. Step 4: Title
    const titleResult = await this.runSkill('amazon-title', product, brand, market);
    allSteps.push(...titleResult.steps);
    result.assets.title = titleResult.assets.find(a => a.type === 'text')?.content ||
      `${brand?.name || ''} ${product.name} - ${product.sellingPoints[0] || ''}`;

    // 6. Step 5: Bullet Points
    const bulletsResult = await this.runSkill('amazon-bullets', product, brand, market);
    allSteps.push(...bulletsResult.steps);
    const bulletContent = bulletsResult.assets.find(a => a.type === 'text')?.content;
    result.assets.bullets = bulletContent
      ? bulletContent.split('\n').filter(b => b.trim())
      : product.sellingPoints.slice(0, 5);

    // 7. Step 6: Description
    const descResult = await this.runSkill('amazon-description', product, brand, market);
    allSteps.push(...descResult.steps);
    result.assets.description = descResult.assets.find(a => a.type === 'text')?.content ||
      `${product.name} - ${product.sellingPoints.join('. ')}`;

    // 8. Step 7: Search Terms (backend)
    const stResult = await this.runSkill('amazon-backend-terms', product, brand, market);
    allSteps.push(...stResult.steps);
    result.assets.searchTerms = (stResult.assets.find(a => a.type === 'text')?.content || '')
      .split(/[\s,]+/).filter(t => t.length > 2);

    // 9. Remember the success
    commerceMemory.rememberSuccess(this.workspaceId, 'amazon-full-listing', {
      product: product.name,
      market,
      steps: allSteps.length,
      duration: Date.now() - startTime,
    });

    result.success = allSteps.every(s => s.status === 'completed');
    result.steps = allSteps;
    result.totalDuration = Date.now() - startTime;

    return result;
  }

  /** Generate A+ Content for an existing listing */
  async generateAPlusContent(product: ProductContext, brand?: BrandContext): Promise<{
    modules: GeneratedAsset[];
    steps: ExecutionStep[];
  }> {
    const modules: GeneratedAsset[] = [];
    const allSteps: ExecutionStep[] = [];

    // A+ Module 1: Company Logo
    const logoResult = await this.runSkill('amazon-aplus-module1', product, brand, 'US');
    allSteps.push(...logoResult.steps);
    modules.push(...logoResult.assets.filter(a => a.type === 'image'));

    // A+ Module 2: Three Images + Text
    const imgResult = await this.runSkill('amazon-aplus-module2', product, brand, 'US');
    allSteps.push(...imgResult.steps);
    modules.push(...imgResult.assets.filter(a => a.type === 'image'));

    // A+ Text
    const textResult = await this.runSkill('amazon-brand-story', product, brand, 'US');
    allSteps.push(...textResult.steps);
    modules.push(...textResult.assets);

    return { modules, steps: allSteps };
  }

  /** Run a single skill via the Commerce Assistant */
  private async runSkill(
    skillId: string,
    product: ProductContext,
    brand?: BrandContext,
    platform?: string
  ): Promise<CommerceResponse> {
    return commerceAssistant.process({
      intent: skillId,
      platforms: ['amazon'],
      productData: product,
      brandData: brand,
      workspaceId: this.workspaceId,
      preferences: { language: platform === 'JP' ? 'ja' : 'en' },
    });
  }

  /** Get listing quality score */
  getQualityScore(listing: AmazonListingResult): { score: number; maxScore: number; suggestions: string[] } {
    let score = 0;
    const maxScore = 100;
    const suggestions: string[] = [];

    if (listing.assets.heroImage) score += 15;
    else suggestions.push('Missing hero image');

    if (listing.assets.lifestyleImages.length >= 2) score += 15;
    else if (listing.assets.lifestyleImages.length === 1) { score += 10; suggestions.push('Add more lifestyle images'); }
    else suggestions.push('Missing lifestyle images');

    if (listing.assets.infographic) score += 10;
    else suggestions.push('Add infographic for better conversion');

    const title = listing.assets.title || '';
    if (title.length >= 60 && title.length <= 200) score += 15;
    else if (title.length > 0) { score += 8; suggestions.push('Optimize title length (60-200 chars)'); }
    else suggestions.push('Missing title');

    if ((listing.assets.bullets || []).length === 5) score += 15;
    else if ((listing.assets.bullets || []).length > 0) { score += 8; suggestions.push('Need exactly 5 bullet points'); }
    else suggestions.push('Missing bullet points');

    if ((listing.assets.description || '').length >= 500) score += 15;
    else if ((listing.assets.description || '').length > 0) { score += 8; suggestions.push('Description too short (min 500 chars)'); }
    else suggestions.push('Missing description');

    if ((listing.assets.searchTerms || []).length >= 5) score += 15;
    else if ((listing.assets.searchTerms || []).length > 0) { score += 8; suggestions.push('Need more backend search terms'); }
    else suggestions.push('Missing search terms');

    return { score, maxScore, suggestions };
  }
}

/** Export agent instances */
export function createAmazonAgent(workspaceId?: string): AmazonListingAgent {
  return new AmazonListingAgent(workspaceId);
}
