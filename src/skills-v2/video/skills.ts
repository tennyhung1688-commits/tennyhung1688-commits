import { defineSkill } from '../helpers';
import { registry } from '../registry';

const ugcShortVideo = defineSkill({
  id: 'ugc-short-video',
  name: 'UGC Short Video',
  category: 'video',
  description: 'Generates user-generated-content style product videos for TikTok/Reels.',
  supportedPlatforms: ['tiktok', 'instagram-shop', 'douyin'],
  supportedModels: ['kling', 'pika'],
  icon: 'Smartphone',
  tags: ['official'],
  estimatedTime: '~5 min',
  input: {
    required: ['productImages', 'script'],
    properties: {
      productImages: { type: 'string[]', description: 'Product image URLs' },
      script: { type: 'string', description: 'Video script or talking points' },
      style: { type: 'string', description: 'Video style', enum: ['unboxing', 'review', 'tutorial'] },
    },
  },
  output: { type: 'video', description: 'Generated short video', format: 'mp4', example: 'vertical 9:16' },
  steps: [
    { id: 'script', name: 'Script', description: 'Parse and time-mark the script', estimatedTime: '10s' },
    { id: 'scene-plan', name: 'Scene Planning', description: 'Plan scene transitions and product highlights', estimatedTime: '20s', dependencies: ['script'] },
    { id: 'clips', name: 'Generate Clips', description: 'Generate AI video clips per scene', estimatedTime: '180s', dependencies: ['scene-plan'] },
    { id: 'caption', name: 'Add Caption', description: 'Overlay captions with trending style', estimatedTime: '30s', dependencies: ['clips'] },
    { id: 'export', name: 'Export', description: 'Compile final video', estimatedTime: '20s', dependencies: ['caption'] },
  ],
  prompt: {
    systemPrompt: 'You are a viral short-video creator for e-commerce.',
    userPromptTemplate: 'Create a {{style}} UGC video for products {{productImages}} using script: {{script}}.',
    variables: ['productImages', 'script', 'style'],
  },
});

const productDemo = defineSkill({
  id: 'product-demo',
  name: 'Product Demo',
  category: 'video',
  description: 'Professional product demonstration video.',
  supportedPlatforms: ['amazon', 'shopify', 'generic'],
  supportedModels: ['veo', 'runway'],
  icon: 'Clapperboard',
  tags: ['official'],
  estimatedTime: '~8 min',
  input: {
    required: ['productImages', 'features'],
    properties: {
      productImages: { type: 'string[]', description: 'Product image URLs' },
      features: { type: 'string[]', description: 'Key product features to demonstrate' },
      voiceStyle: { type: 'string', description: 'Voiceover style', enum: ['professional', 'friendly', 'energetic'] },
    },
  },
  output: { type: 'video', description: 'Generated demo video', format: 'mp4' },
  steps: [
    { id: 'storyboard', name: 'Storyboard', description: 'Create visual storyboard from features', estimatedTime: '30s' },
    { id: 'shots', name: 'Generate Shots', description: 'Generate AI video shots per storyboard frame', estimatedTime: '240s', dependencies: ['storyboard'] },
    { id: 'voiceover', name: 'Voiceover', description: 'Generate AI voiceover narration', estimatedTime: '60s', dependencies: ['shots'] },
    { id: 'export', name: 'Export', description: 'Compile final demo video', estimatedTime: '30s', dependencies: ['voiceover'] },
  ],
  prompt: {
    systemPrompt: 'You are a product demo video producer.',
    userPromptTemplate: 'Create a product demo video for {{features}} using images {{productImages}} with {{voiceStyle}} voiceover.',
    variables: ['productImages', 'features', 'voiceStyle'],
  },
});

registry.register(ugcShortVideo);
registry.register(productDemo);

export const skills = [ugcShortVideo, productDemo];
