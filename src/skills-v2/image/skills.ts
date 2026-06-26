import { defineSkill } from '../helpers';
import { registry } from '../registry';

const productPhotography = defineSkill({
  id: 'product-photography',
  name: 'Product Photography',
  category: 'image',
  description: 'Generates studio-quality white background & lifestyle product photos.',
  supportedPlatforms: ['amazon', 'shopify', 'ebay', 'etsy', 'shopee', 'lazada', 'generic'],
  supportedModels: ['flux', 'gpt-image', 'imagen'],
  icon: 'Camera',
  tags: ['official'],
  estimatedTime: '~3 min',
  input: {
    required: ['productImage'],
    properties: {
      productImage: { type: 'string', description: 'Product image URL or base64' },
      style: { type: 'string', description: 'Photo style', enum: ['white-bg', 'lifestyle', 'both'] },
    },
  },
  output: { type: 'image[]', description: 'Generated product photos', format: 'png/jpg' },
  steps: [
    { id: 'load', name: 'Load Context', description: 'Analyze product image for dimensions and category', estimatedTime: '5s' },
    { id: 'white-bg', name: 'Generate White BG', description: 'Remove background and generate studio white-background shot', estimatedTime: '60s', dependencies: ['load'] },
    { id: 'lifestyle', name: 'Generate Lifestyle', description: 'Place product in contextual lifestyle scene', estimatedTime: '60s', dependencies: ['load'] },
    { id: 'package', name: 'Package', description: 'Compile all variants and return', estimatedTime: '10s', dependencies: ['white-bg', 'lifestyle'] },
  ],
  prompt: {
    systemPrompt: 'You are a professional product photographer using {{model}}.',
    userPromptTemplate: 'Generate a {{style}} product photo for {{productImage}}.',
    variables: ['productImage', 'style', 'model'],
  },
});

const infographicGenerator = defineSkill({
  id: 'infographic-generator',
  name: 'Infographic Generator',
  category: 'image',
  description: 'Generates product infographics with size charts, feature highlights.',
  supportedPlatforms: ['amazon', 'shopify', 'shopee', 'lazada', 'generic'],
  supportedModels: ['recraft', 'gpt-image'],
  icon: 'BarChart3',
  tags: ['official'],
  estimatedTime: '~2 min',
  input: {
    required: ['productData'],
    properties: {
      productData: { type: 'object', description: 'Product specs, dimensions, features' },
      chartType: { type: 'string', description: 'Infographic type', enum: ['size-chart', 'feature-highlights', 'comparison'] },
    },
  },
  output: { type: 'image', description: 'Generated infographic', format: 'png' },
  steps: [
    { id: 'parse', name: 'Parse Data', description: 'Extract structured data from product input', estimatedTime: '5s' },
    { id: 'layout', name: 'Layout Design', description: 'Design infographic layout based on chart type', estimatedTime: '20s', dependencies: ['parse'] },
    { id: 'generate', name: 'Generate', description: 'Render infographic with AI', estimatedTime: '60s', dependencies: ['layout'] },
    { id: 'export', name: 'Export', description: 'Export final infographic', estimatedTime: '5s', dependencies: ['generate'] },
  ],
  prompt: {
    systemPrompt: 'You are an infographic designer specializing in e-commerce.',
    userPromptTemplate: 'Create a {{chartType}} infographic for: {{productData}}.',
    variables: ['productData', 'chartType'],
  },
});

const seasonalTemplate = defineSkill({
  id: 'seasonal-template',
  name: 'Seasonal Template',
  category: 'image',
  description: 'Generates holiday/seasonal themed product images.',
  supportedPlatforms: ['amazon', 'shopify', 'instagram-shop', 'tiktok', 'generic'],
  supportedModels: ['flux', 'ideogram'],
  icon: 'Palette',
  tags: ['official'],
  estimatedTime: '~2 min',
  input: {
    required: ['productImage', 'theme'],
    properties: {
      productImage: { type: 'string', description: 'Product image URL or base64' },
      theme: { type: 'string', description: 'Seasonal theme', enum: ['christmas', 'halloween', 'valentine', 'spring', 'summer', 'black-friday'] },
    },
  },
  output: { type: 'image[]', description: 'Seasonal themed product images', format: 'png' },
  steps: [
    { id: 'load-theme', name: 'Load Theme', description: 'Load seasonal theme style guide', estimatedTime: '5s' },
    { id: 'style-transfer', name: 'Style Transfer', description: 'Apply seasonal styling to product image', estimatedTime: '60s', dependencies: ['load-theme'] },
    { id: 'variations', name: 'Generate Variations', description: 'Generate multiple themed variations', estimatedTime: '45s', dependencies: ['style-transfer'] },
  ],
  prompt: {
    systemPrompt: 'You are a seasonal marketing designer.',
    userPromptTemplate: 'Apply {{theme}} theme to product image {{productImage}}.',
    variables: ['productImage', 'theme'],
  },
});

registry.register(productPhotography);
registry.register(infographicGenerator);
registry.register(seasonalTemplate);

export const skills = [productPhotography, infographicGenerator, seasonalTemplate];
