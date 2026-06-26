import { defineSkill } from '../helpers';
import { registry } from '../registry';

const amazonSeoOptimizer = defineSkill({
  id: 'amazon-seo-optimizer',
  name: 'Amazon SEO Optimizer',
  category: 'seo',
  description: 'Optimizes backend search terms and listing content for Amazon ranking.',
  supportedPlatforms: ['amazon'],
  supportedModels: ['gpt-4'],
  icon: 'Search',
  tags: ['official'],
  estimatedTime: '~1 min',
  input: {
    required: ['listingContent', 'targetKeywords'],
    properties: {
      listingContent: { type: 'object', description: 'Current listing title, bullets, description' },
      targetKeywords: { type: 'string[]', description: 'Target keywords to rank for' },
    },
  },
  output: { type: 'object', description: 'Optimized listing content and search terms', format: 'json' },
  steps: [
    { id: 'research', name: 'Keyword Research', description: 'Analyze keyword relevance and search volume', estimatedTime: '15s' },
    { id: 'gap', name: 'Competitive Gap', description: 'Identify keyword gaps vs top competitors', estimatedTime: '15s', dependencies: ['research'] },
    { id: 'optimize', name: 'Term Optimization', description: 'Optimize title, bullets, and backend terms', estimatedTime: '20s', dependencies: ['gap'] },
    { id: 'validate', name: 'Validation', description: 'Validate optimized content against Amazon guidelines', estimatedTime: '10s', dependencies: ['optimize'] },
  ],
  prompt: {
    systemPrompt: 'You are an Amazon SEO specialist.',
    userPromptTemplate: 'Optimize Amazon listing {{listingContent}} for keywords {{targetKeywords}}.',
    variables: ['listingContent', 'targetKeywords'],
  },
});

const multiPlatformSeo = defineSkill({
  id: 'multi-platform-seo',
  name: 'Multi-platform SEO',
  category: 'seo',
  description: 'Generates SEO metadata for all platforms simultaneously.',
  supportedPlatforms: ['amazon', 'shopify', 'etsy', 'ebay', 'shopee', 'lazada'],
  supportedModels: ['gpt-4', 'gemini'],
  icon: 'Globe',
  tags: ['premium'],
  estimatedTime: '~2 min',
  input: {
    required: ['productData', 'targetMarkets'],
    properties: {
      productData: { type: 'object', description: 'Product info: name, category, features' },
      targetMarkets: { type: 'string[]', description: 'Target market countries', enum: ['us', 'uk', 'de', 'jp', 'fr', 'it', 'es', 'ca', 'mx', 'br'] },
    },
  },
  output: { type: 'object', description: 'Per-platform SEO metadata', format: 'json', example: '{ amazon: {...}, shopify: {...} }' },
  steps: [
    { id: 'research', name: 'Research per Platform', description: 'Research platform-specific keyword requirements', estimatedTime: '30s' },
    { id: 'generate', name: 'Generate per Platform', description: 'Generate SEO content for each platform', estimatedTime: '60s', dependencies: ['research'] },
    { id: 'validate', name: 'Validate', description: 'Cross-check against platform rules', estimatedTime: '15s', dependencies: ['generate'] },
    { id: 'package', name: 'Package', description: 'Package all platform SEO data', estimatedTime: '10s', dependencies: ['validate'] },
  ],
  prompt: {
    systemPrompt: 'You are a multi-platform e-commerce SEO expert.',
    userPromptTemplate: 'Generate SEO metadata for {{productData}} across markets {{targetMarkets}}.',
    variables: ['productData', 'targetMarkets'],
  },
});

registry.register(amazonSeoOptimizer);
registry.register(multiPlatformSeo);

export const skills = [amazonSeoOptimizer, multiPlatformSeo];
