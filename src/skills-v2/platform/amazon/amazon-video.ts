import { defineSkill } from '../../helpers';
import { registry } from '../../registry';

const amazonProductVideo = defineSkill({
  id: 'amazon-product-video',
  name: 'Amazon Product Video',
  category: 'video',
  description: '15-60s product demo video. No competitor logos, URLs, or customer reviews.',
  supportedPlatforms: ['amazon'],
  supportedModels: ['veo', 'kling'],
  icon: 'Video',
  tags: ['official'],
  estimatedTime: '~8min',
  requiresConnection: true,
  input: { required: ['productName', 'keyFeatures'], properties: { productName: { type: 'string', description: 'Product name' }, keyFeatures: { type: 'array', description: 'Key product features to showcase' }, duration: { type: 'number', description: 'Target duration in seconds (15-60)' } } },
  output: { type: 'video', description: 'Amazon-compliant product demo video', format: 'url' },
  steps: [
    { id: 'storyboard', name: 'Storyboard', description: 'Create visual storyboard for product demo', estimatedTime: '120s' },
    { id: 'shoot-guide', name: 'Shoot Guide', description: 'Generate shooting guide with angles and lighting', estimatedTime: '60s', dependencies: ['storyboard'] },
    { id: 'generate', name: 'Generate', description: 'Generate video using AI model', estimatedTime: '180s', dependencies: ['shoot-guide'] },
    { id: 'review', name: 'Review Compliance', description: 'Review for Amazon policy compliance', estimatedTime: '60s', dependencies: ['generate'] },
  ],
  prompt: { systemPrompt: 'You are an Amazon product video producer. Ensure compliance: no competitor logos, no URLs, no customer reviews, no pricing claims.', userPromptTemplate: 'Create a {{duration}}s product demo video for {{productName}} showcasing: {{keyFeatures}}. Amazon compliant.', variables: ['productName', 'keyFeatures', 'duration'] },
});

const amazonLivePrep = defineSkill({
  id: 'amazon-live-prep',
  name: 'Amazon Live Preparation',
  category: 'video',
  description: 'Amazon Live streaming preparation pack with script and talking points.',
  supportedPlatforms: ['amazon'],
  supportedModels: ['gpt-4'],
  icon: 'Radio',
  tags: ['official'],
  estimatedTime: '~10min',
  requiresConnection: true,
  input: { required: ['productName', 'products'], properties: { productName: { type: 'string', description: 'Main product name' }, products: { type: 'array', description: 'Product lineup details' }, targetAudience: { type: 'string', description: 'Target audience description' } } },
  output: { type: 'object', description: 'Complete Amazon Live preparation pack', format: 'json' },
  steps: [
    { id: 'script', name: 'Script Writing', description: 'Write live streaming script with hook and CTA', estimatedTime: '180s' },
    { id: 'product-lineup', name: 'Product Lineup', description: 'Organize product showcase sequence', estimatedTime: '90s', dependencies: ['script'] },
    { id: 'key-moments', name: 'Key Moments', description: 'Identify key demo moments and transitions', estimatedTime: '60s', dependencies: ['product-lineup'] },
    { id: 'talking-points', name: 'Talking Points', description: 'Generate detailed talking points per product', estimatedTime: '90s', dependencies: ['key-moments'] },
  ],
  prompt: { systemPrompt: 'You are an Amazon Live streaming strategist. Create engaging, conversion-focused live content.', userPromptTemplate: 'Prepare Amazon Live stream for {{productName}}. Products: {{products}}. Target audience: {{targetAudience}}.', variables: ['productName', 'products', 'targetAudience'] },
});

const amazonBrandVideo = defineSkill({
  id: 'amazon-brand-video',
  name: 'Amazon Brand Video',
  category: 'video',
  description: 'Brand story video (max 60s) for Amazon Brand Store.',
  supportedPlatforms: ['amazon'],
  supportedModels: ['veo', 'runway'],
  icon: 'Film',
  tags: ['official'],
  estimatedTime: '~10min',
  requiresConnection: true,
  input: { required: ['brandName', 'brandStory'], properties: { brandName: { type: 'string', description: 'Brand name' }, brandStory: { type: 'string', description: 'Brand story narrative' }, visualStyle: { type: 'string', description: 'Visual style preference' } } },
  output: { type: 'video', description: 'Brand story video max 60 seconds', format: 'url' },
  steps: [
    { id: 'narrative', name: 'Brand Narrative', description: 'Structure brand story into compelling narrative', estimatedTime: '120s' },
    { id: 'visual-style', name: 'Visual Style', description: 'Define visual style and color palette', estimatedTime: '60s', dependencies: ['narrative'] },
    { id: 'generate', name: 'Generate', description: 'Generate brand video', estimatedTime: '240s', dependencies: ['visual-style'] },
    { id: 'export', name: 'Export', description: 'Export final brand video', estimatedTime: '30s', dependencies: ['generate'] },
  ],
  prompt: { systemPrompt: 'You are a brand video director for Amazon Brand Stores.', userPromptTemplate: 'Create a brand story video (max 60s) for {{brandName}}: {{brandStory}}. Visual style: {{visualStyle}}.', variables: ['brandName', 'brandStory', 'visualStyle'] },
});

const amazonVideoShorts = defineSkill({
  id: 'amazon-video-shorts',
  name: 'Amazon Video Shorts',
  category: 'video',
  description: '6-15s short clips optimized for Amazon Posts.',
  supportedPlatforms: ['amazon'],
  supportedModels: ['pika', 'kling'],
  icon: 'Clapperboard',
  tags: ['official'],
  estimatedTime: '~4min',
  requiresConnection: true,
  input: { required: ['productName', 'feature'], properties: { productName: { type: 'string', description: 'Product name' }, feature: { type: 'string', description: 'Key feature to highlight' } } },
  output: { type: 'video', description: 'Short video clip for Amazon Posts', format: 'url' },
  steps: [
    { id: 'feature-extract', name: 'Key Feature Extraction', description: 'Extract most compelling feature for short clip', estimatedTime: '30s' },
    { id: 'clip-plan', name: 'Clip Planning', description: 'Plan 6-15s clip sequence and framing', estimatedTime: '45s', dependencies: ['feature-extract'] },
    { id: 'generate', name: 'Generate', description: 'Generate short video clip', estimatedTime: '90s', dependencies: ['clip-plan'] },
  ],
  prompt: { systemPrompt: 'You create short, engaging video clips optimized for Amazon Posts feed.', userPromptTemplate: 'Create a 6-15s short clip for {{productName}} highlighting: {{feature}}. Optimized for Amazon Posts.', variables: ['productName', 'feature'] },
});

registry.register(amazonProductVideo);
registry.register(amazonLivePrep);
registry.register(amazonBrandVideo);
registry.register(amazonVideoShorts);

export const skills = [amazonProductVideo, amazonLivePrep, amazonBrandVideo, amazonVideoShorts];
