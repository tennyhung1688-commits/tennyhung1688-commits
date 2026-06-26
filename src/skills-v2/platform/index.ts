import { defineSkill } from '../helpers';
import { registry } from '../registry';

const amazonPlatform = defineSkill({
  id: 'amazon-platform',
  name: 'Amazon Platform Skill',
  category: 'platform',
  description: 'Complete Amazon selling workflow: listing, A+ content, ads, analytics.',
  supportedPlatforms: ['amazon'],
  supportedModels: ['gpt-4', 'claude'],
  icon: 'ShoppingBag',
  tags: ['official'],
  estimatedTime: '~15 min',
  requiresConnection: true,
  input: {
    required: ['productData'],
    properties: {
      productData: { type: 'object', description: 'Complete product data' },
      market: { type: 'string', description: 'Amazon marketplace', enum: ['us', 'uk', 'de', 'jp', 'ca'] },
    },
  },
  output: { type: 'object', description: 'Published Amazon listing with analytics setup', format: 'json' },
  steps: [
    { id: 'listing-setup', name: 'Listing Setup', description: 'Prepare listing structure per category', estimatedTime: '120s' },
    { id: 'image-reqs', name: 'Image Requirements', description: 'Verify images meet Amazon specs', estimatedTime: '60s', dependencies: ['listing-setup'] },
    { id: 'copy-standards', name: 'Copy Standards', description: 'Generate compliant listing copy', estimatedTime: '180s', dependencies: ['listing-setup'] },
    { id: 'seo-rules', name: 'SEO Rules', description: 'Apply Amazon search optimization', estimatedTime: '120s', dependencies: ['copy-standards'] },
    { id: 'publishing-flow', name: 'Publishing Flow', description: 'Execute publishing workflow', estimatedTime: '300s', dependencies: ['image-reqs', 'seo-rules'] },
  ],
  prompt: {
    systemPrompt: 'You are an Amazon platform expert orchestrating full selling workflows.',
    userPromptTemplate: 'Set up complete Amazon listing for {{productData}} in {{market}} marketplace.',
    variables: ['productData', 'market'],
  },
});

const tiktokShopPlatform = defineSkill({
  id: 'tiktok-shop-platform',
  name: 'TikTok Shop Platform Skill',
  category: 'platform',
  description: 'Complete TikTok Shop workflow: video, caption, trending sounds, shop integration.',
  supportedPlatforms: ['tiktok'],
  supportedModels: ['gpt-4', 'kling'],
  icon: 'Music',
  tags: ['official'],
  estimatedTime: '~10 min',
  requiresConnection: true,
  input: {
    required: ['productData', 'contentStyle'],
    properties: {
      productData: { type: 'object', description: 'Product info and media' },
      contentStyle: { type: 'string', description: 'Content style', enum: ['viral', 'educational', 'behind-scenes', 'trending'] },
    },
  },
  output: { type: 'object', description: 'Published TikTok Shop listing with content', format: 'json' },
  steps: [
    { id: 'video-specs', name: 'Video Specs', description: 'Generate video requirements and script', estimatedTime: '120s' },
    { id: 'caption-rules', name: 'Caption Rules', description: 'Create platform-compliant captions', estimatedTime: '60s', dependencies: ['video-specs'] },
    { id: 'hashtag-strategy', name: 'Hashtag Strategy', description: 'Research trending hashtags and sounds', estimatedTime: '60s', dependencies: ['caption-rules'] },
    { id: 'publishing', name: 'Publishing', description: 'Publish to TikTok Shop', estimatedTime: '180s', dependencies: ['hashtag-strategy'] },
  ],
  prompt: {
    systemPrompt: 'You are a TikTok Shop platform expert.',
    userPromptTemplate: 'Create complete TikTok Shop setup for {{productData}} with {{contentStyle}} style.',
    variables: ['productData', 'contentStyle'],
  },
});

const shopeePlatform = defineSkill({
  id: 'shopee-platform',
  name: 'Shopee Platform Skill',
  category: 'platform',
  description: 'Complete Shopee workflow with multi-language support.',
  supportedPlatforms: ['shopee'],
  supportedModels: ['gpt-4', 'claude'],
  icon: 'Store',
  tags: ['official'],
  estimatedTime: '~12 min',
  requiresConnection: true,
  input: {
    required: ['productData'],
    properties: {
      productData: { type: 'object', description: 'Complete product data' },
      markets: { type: 'string[]', description: 'Shopee markets', enum: ['my', 'th', 'ph', 'id', 'sg', 'vn', 'tw', 'br', 'mx'] },
    },
  },
  output: { type: 'object', description: 'Published Shopee listings per market', format: 'json' },
  steps: [
    { id: 'language-setup', name: 'Language Setup', description: 'Detect and configure market languages', estimatedTime: '60s' },
    { id: 'category-mapping', name: 'Category Mapping', description: 'Map product to Shopee categories', estimatedTime: '120s', dependencies: ['language-setup'] },
    { id: 'image-specs', name: 'Image Specs', description: 'Prepare images per market spec', estimatedTime: '90s', dependencies: ['language-setup'] },
    { id: 'copy-rules', name: 'Copy Rules', description: 'Generate localized listing copy', estimatedTime: '120s', dependencies: ['category-mapping'] },
    { id: 'publishing', name: 'Publishing', description: 'Publish to Shopee markets', estimatedTime: '180s', dependencies: ['image-specs', 'copy-rules'] },
  ],
  prompt: {
    systemPrompt: 'You are a Shopee platform expert with multi-market expertise.',
    userPromptTemplate: 'Set up Shopee listing for {{productData}} across markets {{markets}}.',
    variables: ['productData', 'markets'],
  },
});

import './ebay/skills';
import './etsy/skills';
import './walmart/skills';
import './jd/skills';
import './aliexpress/skills';
import './xiaohongshu/skills';
import './pinduoduo/skills';
import './1688/skills';

registry.register(amazonPlatform);
registry.register(tiktokShopPlatform);
registry.register(shopeePlatform);

export const skills = [amazonPlatform, tiktokShopPlatform, shopeePlatform];
