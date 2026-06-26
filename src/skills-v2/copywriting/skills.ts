import { defineSkill } from '../helpers';
import { registry } from '../registry';

const amazonListingCopy = defineSkill({
  id: 'amazon-listing-copy',
  name: 'Amazon Listing Copy',
  category: 'copywriting',
  description: 'Generates full Amazon listing: title, bullets, description, A+ content, backend search terms.',
  supportedPlatforms: ['amazon'],
  supportedModels: ['gpt-4', 'claude'],
  icon: 'FileText',
  tags: ['official'],
  estimatedTime: '~2 min',
  input: {
    required: ['productName', 'features', 'keywords'],
    properties: {
      productName: { type: 'string', description: 'Product name' },
      features: { type: 'string[]', description: 'Key product features' },
      keywords: { type: 'string[]', description: 'Target keywords' },
      tone: { type: 'string', description: 'Copy tone', enum: ['professional', 'casual', 'luxury'] },
    },
  },
  output: { type: 'object', description: 'Amazon listing content', format: 'json', example: '{ title, bullets, description, aPlus, searchTerms }' },
  steps: [
    { id: 'research', name: 'Research Keywords', description: 'Analyze and prioritize target keywords', estimatedTime: '15s' },
    { id: 'title', name: 'Title', description: 'Generate SEO-optimized product title', estimatedTime: '15s', dependencies: ['research'] },
    { id: 'bullets', name: 'Bullet Points', description: 'Generate 5 benefit-driven bullet points', estimatedTime: '20s', dependencies: ['title'] },
    { id: 'description', name: 'Description', description: 'Generate product description', estimatedTime: '15s', dependencies: ['bullets'] },
    { id: 'a-plus', name: 'A+ Content', description: 'Generate A+ content modules', estimatedTime: '25s', dependencies: ['description'] },
    { id: 'seo', name: 'SEO Terms', description: 'Generate backend search terms', estimatedTime: '10s', dependencies: ['research'] },
  ],
  prompt: {
    systemPrompt: 'You are an Amazon listing optimization expert.',
    userPromptTemplate: 'Create an Amazon listing for {{productName}}. Features: {{features}}. Keywords: {{keywords}}. Tone: {{tone}}.',
    variables: ['productName', 'features', 'keywords', 'tone'],
  },
});

const tiktokCaption = defineSkill({
  id: 'tiktok-caption',
  name: 'TikTok Caption',
  category: 'copywriting',
  description: 'Generates viral TikTok video captions with trending hashtags.',
  supportedPlatforms: ['tiktok', 'douyin'],
  supportedModels: ['gpt-4'],
  icon: 'Hash',
  tags: ['official'],
  estimatedTime: '~30s',
  input: {
    required: ['productName', 'videoType'],
    properties: {
      productName: { type: 'string', description: 'Product name' },
      videoType: { type: 'string', description: 'Video content type', enum: ['unboxing', 'review', 'tutorial', 'haul', 'comparison'] },
      targetAudience: { type: 'string', description: 'Target audience description' },
    },
  },
  output: { type: 'object', description: 'TikTok caption', format: 'json', example: '{ hook, body, cta, hashtags }' },
  steps: [
    { id: 'hook', name: 'Hook Line', description: 'Generate attention-grabbing first line', estimatedTime: '5s' },
    { id: 'body', name: 'Body', description: 'Write engaging caption body', estimatedTime: '10s', dependencies: ['hook'] },
    { id: 'cta', name: 'CTA', description: 'Add call-to-action', estimatedTime: '5s', dependencies: ['body'] },
    { id: 'hashtags', name: 'Hashtags', description: 'Research and add trending hashtags', estimatedTime: '5s', dependencies: ['body'] },
  ],
  prompt: {
    systemPrompt: 'You are a viral TikTok copywriter.',
    userPromptTemplate: 'Write a viral TikTok caption for {{productName}} {{videoType}} video targeting {{targetAudience}}.',
    variables: ['productName', 'videoType', 'targetAudience'],
  },
});

registry.register(amazonListingCopy);
registry.register(tiktokCaption);

export const skills = [amazonListingCopy, tiktokCaption];
