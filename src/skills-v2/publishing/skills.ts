import { defineSkill } from '../helpers';
import { registry } from '../registry';

const amazonPublish = defineSkill({
  id: 'amazon-publish',
  name: 'Amazon Publish',
  category: 'publishing',
  description: 'Auto-fills and publishes listing to Amazon Seller Central.',
  supportedPlatforms: ['amazon'],
  supportedModels: ['gpt-4'],
  icon: 'Upload',
  tags: ['premium'],
  estimatedTime: '~5 min',
  requiresConnection: true,
  input: {
    required: ['listingData', 'images'],
    properties: {
      listingData: { type: 'object', description: 'Full listing content: title, bullets, desc, price, sku' },
      images: { type: 'string[]', description: 'Product image URLs' },
      video: { type: 'string', description: 'Optional product video URL' },
    },
  },
  output: { type: 'object', description: 'Publish confirmation with ASIN', format: 'json', example: '{ asin, status, url }' },
  steps: [
    { id: 'validate', name: 'Validate Data', description: 'Validate listing against Amazon requirements', estimatedTime: '30s' },
    { id: 'fill', name: 'Fill Form', description: 'Auto-fill Amazon Seller Central form', estimatedTime: '120s', dependencies: ['validate'] },
    { id: 'upload', name: 'Upload Media', description: 'Upload images and video', estimatedTime: '90s', dependencies: ['fill'] },
    { id: 'submit', name: 'Submit', description: 'Submit listing for review', estimatedTime: '30s', dependencies: ['upload'] },
    { id: 'confirm', name: 'Confirm', description: 'Confirm submission and return ASIN', estimatedTime: '15s', dependencies: ['submit'] },
  ],
  prompt: {
    systemPrompt: 'You are an Amazon Seller Central automation agent.',
    userPromptTemplate: 'Publish listing {{listingData}} with images {{images}} to Amazon.',
    variables: ['listingData', 'images', 'video'],
  },
});

const multiPlatformSync = defineSkill({
  id: 'multi-platform-sync',
  name: 'Multi-platform Sync',
  category: 'publishing',
  description: 'Publishes to multiple platforms simultaneously with auto-fill.',
  supportedPlatforms: ['amazon', 'shopify', 'shopee', 'lazada', 'ebay', 'etsy'],
  supportedModels: ['gpt-4'],
  icon: 'RefreshCw',
  tags: ['premium'],
  estimatedTime: '~10 min',
  requiresConnection: true,
  input: {
    required: ['listingData', 'targetPlatforms'],
    properties: {
      listingData: { type: 'object', description: 'Universal listing data' },
      targetPlatforms: { type: 'string[]', description: 'Platforms to publish to' },
    },
  },
  output: { type: 'object', description: 'Per-platform publish status', format: 'json', example: '{ amazon: {status}, shopify: {status} }' },
  steps: [
    { id: 'transform', name: 'Transform per Platform', description: 'Adapt listing format for each platform', estimatedTime: '60s' },
    { id: 'fill', name: 'Fill per Platform', description: 'Auto-fill each platform form', estimatedTime: '300s', dependencies: ['transform'] },
    { id: 'upload', name: 'Upload', description: 'Upload media to all platforms', estimatedTime: '180s', dependencies: ['fill'] },
    { id: 'confirm', name: 'Confirm All', description: 'Confirm all submissions', estimatedTime: '60s', dependencies: ['upload'] },
  ],
  prompt: {
    systemPrompt: 'You are a multi-platform e-commerce publishing agent.',
    userPromptTemplate: 'Publish {{listingData}} to platforms {{targetPlatforms}}.',
    variables: ['listingData', 'targetPlatforms'],
  },
});

registry.register(amazonPublish);
registry.register(multiPlatformSync);

export const skills = [amazonPublish, multiPlatformSync];
