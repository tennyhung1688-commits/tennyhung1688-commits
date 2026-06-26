import { defineSkill } from '../../helpers';
import { registry } from '../../registry';

const lazadaMainImage = defineSkill({
  id: 'lazada-main-image',
  name: 'Lazada Main Image',
  category: 'platform',
  description: '1000x1000 white bg product image.',
  supportedPlatforms: ['lazada'],
  supportedModels: ['flux'],
  icon: 'Image',
  tags: ['official'],
  estimatedTime: '~2 min',
  requiresConnection: true,
  input: {
    required: ['productImage'],
    properties: {
      productImage: { type: 'string', description: 'Product image URL or base64' },
    },
  },
  output: { type: 'image', description: '1000x1000 white background product image', format: 'png' },
  steps: [
    { id: 'bg-removal', name: 'BG Removal', description: 'Remove existing background', estimatedTime: '20s' },
    { id: '1000x1000', name: '1000x1000', description: 'Resize and center at 1000x1000', estimatedTime: '30s', dependencies: ['bg-removal'] },
    { id: 'export', name: 'Export', description: 'Export final image', estimatedTime: '10s', dependencies: ['1000x1000'] },
  ],
  prompt: {
    systemPrompt: 'You generate Lazada-compliant main images: 1000x1000, white background.',
    userPromptTemplate: 'Create Lazada main image for {{productImage}} at 1000x1000 with white background.',
    variables: ['productImage'],
  },
});

const lazadaTitle = defineSkill({
  id: 'lazada-title',
  name: 'Lazada Title',
  category: 'platform',
  description: 'Lazada title format: Brand + Model + Key Spec + Category (max 120 chars).',
  supportedPlatforms: ['lazada'],
  supportedModels: ['gpt-4'],
  icon: 'Type',
  tags: ['official'],
  estimatedTime: '~30s',
  requiresConnection: true,
  input: {
    required: ['productData'],
    properties: {
      productData: { type: 'object', description: 'Product: brand, model, specs, category' },
    },
  },
  output: { type: 'string', description: 'Lazada-formatted title under 120 chars', format: 'text', example: 'Brand X ModelY 64MP Camera Smartphone' },
  steps: [
    { id: 'brand', name: 'Brand', description: 'Extract brand name', estimatedTime: '3s' },
    { id: 'model', name: 'Model', description: 'Extract model identifier', estimatedTime: '3s', dependencies: ['brand'] },
    { id: 'specs', name: 'Specs', description: 'Select key specs for title', estimatedTime: '5s', dependencies: ['model'] },
    { id: 'category', name: 'Category', description: 'Append category keyword', estimatedTime: '3s', dependencies: ['specs'] },
    { id: 'compose', name: 'Compose', description: 'Compose and validate char limit', estimatedTime: '5s', dependencies: ['category'] },
  ],
  prompt: {
    systemPrompt: 'You create Lazada titles: Brand + Model + Key Spec + Category, max 120 characters.',
    userPromptTemplate: 'Create Lazada title for {{productData}}.',
    variables: ['productData'],
  },
});

const lazadaDescription = defineSkill({
  id: 'lazada-description',
  name: 'Lazada Description',
  category: 'platform',
  description: 'Lazada product description with warranty/shipping.',
  supportedPlatforms: ['lazada'],
  supportedModels: ['gpt-4'],
  icon: 'FileText',
  tags: ['official'],
  estimatedTime: '~1 min',
  requiresConnection: true,
  input: {
    required: ['productData'],
    properties: {
      productData: { type: 'object', description: 'Product features, specs, warranty, shipping info' },
    },
  },
  output: { type: 'string', description: 'Formatted Lazada product description', format: 'text' },
  steps: [
    { id: 'features', name: 'Features', description: 'Write feature highlights section', estimatedTime: '15s' },
    { id: 'shipping', name: 'Shipping', description: 'Add shipping and delivery info', estimatedTime: '10s', dependencies: ['features'] },
    { id: 'warranty', name: 'Warranty', description: 'Add warranty information', estimatedTime: '10s', dependencies: ['features'] },
    { id: 'format', name: 'Format', description: 'Format with Lazada text styling', estimatedTime: '10s', dependencies: ['shipping', 'warranty'] },
    { id: 'export', name: 'Export', description: 'Export final description', estimatedTime: '5s', dependencies: ['format'] },
  ],
  prompt: {
    systemPrompt: 'You create Lazada product descriptions with warranty and shipping info.',
    userPromptTemplate: 'Create Lazada product description for {{productData}}.',
    variables: ['productData'],
  },
});

const lazadaMultilang = defineSkill({
  id: 'lazada-multilang',
  name: 'Lazada Multi-Language',
  category: 'platform',
  description: 'Multi-language listing for 6 marketplaces.',
  supportedPlatforms: ['lazada'],
  supportedModels: ['gpt-4'],
  icon: 'Globe',
  tags: ['official'],
  estimatedTime: '~2 min',
  requiresConnection: true,
  input: {
    required: ['sourceContent'],
    properties: {
      sourceContent: { type: 'object', description: 'Source listing content in English' },
      targetMarkets: { type: 'string[]', description: 'Target markets', enum: ['my', 'sg', 'ph', 'th', 'id', 'vn'] },
    },
  },
  output: { type: 'object', description: 'Per-marketplace translated listing', format: 'json', example: '{ my: {...}, th: {...}, ... }' },
  steps: [
    { id: 'source', name: 'Source', description: 'Parse source content structure', estimatedTime: '10s' },
    { id: 'per-marketplace-translation', name: 'Per-Marketplace Translation', description: 'Translate title and description per market', estimatedTime: '45s', dependencies: ['source'] },
    { id: 'localization', name: 'Localization', description: 'Apply local cultural and pricing adaptation', estimatedTime: '20s', dependencies: ['per-marketplace-translation'] },
    { id: 'package', name: 'Package', description: 'Package all localized listings', estimatedTime: '10s', dependencies: ['localization'] },
  ],
  prompt: {
    systemPrompt: 'You translate and localize Lazada listings across 6 Southeast Asian marketplaces.',
    userPromptTemplate: 'Localize {{sourceContent}} for Lazada markets {{targetMarkets}}.',
    variables: ['sourceContent', 'targetMarkets'],
  },
});

const lazadaSponsored = defineSkill({
  id: 'lazada-sponsored',
  name: 'Lazada Sponsored Discovery',
  category: 'platform',
  description: 'Lazada Sponsored Discovery ad creative.',
  supportedPlatforms: ['lazada'],
  supportedModels: ['gpt-4', 'gpt-image'],
  icon: 'Megaphone',
  tags: ['official'],
  estimatedTime: '~3 min',
  requiresConnection: true,
  input: {
    required: ['productData', 'budget'],
    properties: {
      productData: { type: 'object', description: 'Product info and images' },
      budget: { type: 'string', description: 'Daily ad budget', enum: ['low', 'medium', 'high'] },
    },
  },
  output: { type: 'object', description: 'Sponsored Discovery ad setup', format: 'json', example: '{ creative, bidStrategy, campaignId }' },
  steps: [
    { id: 'product-selection', name: 'Product Selection', description: 'Select best product for sponsored promotion', estimatedTime: '15s' },
    { id: 'ad-creative', name: 'Ad Creative', description: 'Generate ad creative and copy', estimatedTime: '45s', dependencies: ['product-selection'] },
    { id: 'bid-strategy', name: 'Bid Strategy', description: 'Configure bidding strategy', estimatedTime: '20s', dependencies: ['ad-creative'] },
    { id: 'launch', name: 'Launch', description: 'Launch sponsored campaign', estimatedTime: '30s', dependencies: ['bid-strategy'] },
  ],
  prompt: {
    systemPrompt: 'You create Lazada Sponsored Discovery ad campaigns.',
    userPromptTemplate: 'Create Lazada Sponsored Discovery campaign for {{productData}} with {{budget}} budget.',
    variables: ['productData', 'budget'],
  },
});

const lazadaPublish = defineSkill({
  id: 'lazada-publish',
  name: 'Lazada Publish',
  category: 'platform',
  description: 'Auto-fill Lazada seller center listing.',
  supportedPlatforms: ['lazada'],
  supportedModels: ['gpt-4'],
  icon: 'Send',
  tags: ['official'],
  estimatedTime: '~3 min',
  requiresConnection: true,
  input: {
    required: ['listingData'],
    properties: {
      listingData: { type: 'object', description: 'Complete listing: title, description, images, price' },
      market: { type: 'string', description: 'Target marketplace', enum: ['my', 'sg', 'ph', 'th', 'id', 'vn'] },
    },
  },
  output: { type: 'object', description: 'Publishing confirmation with listing ID', format: 'json', example: '{ listingId, status, url }' },
  steps: [
    { id: 'field-map', name: 'Field Map', description: 'Map listing data to Lazada fields', estimatedTime: '15s' },
    { id: 'category', name: 'Category', description: 'Assign correct Lazada category', estimatedTime: '20s', dependencies: ['field-map'] },
    { id: 'media-upload', name: 'Media Upload', description: 'Upload images to Lazada media library', estimatedTime: '60s', dependencies: ['category'] },
    { id: 'submit', name: 'Submit', description: 'Submit listing and confirm', estimatedTime: '20s', dependencies: ['media-upload'] },
  ],
  prompt: {
    systemPrompt: 'You publish listings to Lazada seller center via API.',
    userPromptTemplate: 'Publish Lazada listing {{listingData}} to {{market}} marketplace.',
    variables: ['listingData', 'market'],
  },
});

registry.register(lazadaMainImage);
registry.register(lazadaTitle);
registry.register(lazadaDescription);
registry.register(lazadaMultilang);
registry.register(lazadaSponsored);
registry.register(lazadaPublish);

export const skills = [
  lazadaMainImage,
  lazadaTitle,
  lazadaDescription,
  lazadaMultilang,
  lazadaSponsored,
  lazadaPublish,
];
