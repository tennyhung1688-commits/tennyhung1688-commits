import { defineSkill } from '../../helpers';
import { registry } from '../../registry';

const temuMainImage = defineSkill({
  id: 'temu-main-image',
  name: 'Temu Main Image',
  category: 'platform',
  description: '800x800 clean product shot, no fancy backgrounds.',
  supportedPlatforms: ['temu'],
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
  output: { type: 'image', description: '800x800 clean white product-only image', format: 'png' },
  steps: [
    { id: 'bg-removal', name: 'BG Removal', description: 'Remove existing background', estimatedTime: '20s' },
    { id: 'clean-white', name: 'Clean White', description: 'Apply clean white background', estimatedTime: '20s', dependencies: ['bg-removal'] },
    { id: 'product-only', name: 'Product Only', description: 'Ensure product-only shot, no props', estimatedTime: '15s', dependencies: ['clean-white'] },
    { id: '800x800', name: '800x800', description: 'Export at 800x800 resolution', estimatedTime: '10s', dependencies: ['product-only'] },
  ],
  prompt: {
    systemPrompt: 'You generate Temu-compliant main images: 800x800, clean white, product only, no backgrounds.',
    userPromptTemplate: 'Create Temu main image for {{productImage}} at 800x800 clean product shot.',
    variables: ['productImage'],
  },
});

const temuTitle = defineSkill({
  id: 'temu-title',
  name: 'Temu Title',
  category: 'platform',
  description: 'Max 100 chars, keyword-heavy direct title.',
  supportedPlatforms: ['temu'],
  supportedModels: ['gpt-4'],
  icon: 'Type',
  tags: ['official'],
  estimatedTime: '~30s',
  requiresConnection: true,
  input: {
    required: ['productData'],
    properties: {
      productData: { type: 'object', description: 'Product name, keywords, key specs' },
    },
  },
  output: { type: 'string', description: 'Temu-optimized title under 100 chars', format: 'text' },
  steps: [
    { id: 'keywords', name: 'Keywords', description: 'Extract high-volume search keywords', estimatedTime: '10s' },
    { id: 'compose', name: 'Compose', description: 'Compose keyword-heavy title', estimatedTime: '10s', dependencies: ['keywords'] },
    { id: 'direct-style', name: 'Direct Style', description: 'Apply Temu direct communication style', estimatedTime: '5s', dependencies: ['compose'] },
    { id: 'char-check', name: 'Char Check', description: 'Validate under 100 character limit', estimatedTime: '3s', dependencies: ['direct-style'] },
  ],
  prompt: {
    systemPrompt: 'You create Temu titles: keyword-heavy, direct, max 100 characters.',
    userPromptTemplate: 'Create Temu title for {{productData}} under 100 chars.',
    variables: ['productData'],
  },
});

const temuPriceCard = defineSkill({
  id: 'temu-price-card',
  name: 'Temu Price Card',
  category: 'platform',
  description: 'Price comparison card for Temu listings.',
  supportedPlatforms: ['temu'],
  supportedModels: ['recraft'],
  icon: 'Tags',
  tags: ['official'],
  estimatedTime: '~2 min',
  requiresConnection: true,
  input: {
    required: ['price', 'comparePrice'],
    properties: {
      price: { type: 'string', description: 'Temu selling price' },
      comparePrice: { type: 'string', description: 'Original/competitor comparison price' },
      productName: { type: 'string', description: 'Product name highlight' },
    },
  },
  output: { type: 'image', description: 'Price comparison card graphic', format: 'png' },
  steps: [
    { id: 'price-highlight', name: 'Price Highlight', description: 'Design price highlight layout', estimatedTime: '15s' },
    { id: 'comparison', name: 'Comparison', description: 'Build price comparison visual', estimatedTime: '20s', dependencies: ['price-highlight'] },
    { id: 'feature-icons', name: 'Feature Icons', description: 'Add key feature icons', estimatedTime: '15s', dependencies: ['comparison'] },
    { id: 'export', name: 'Export', description: 'Export price card image', estimatedTime: '10s', dependencies: ['feature-icons'] },
  ],
  prompt: {
    systemPrompt: 'You create Temu-style price comparison cards.',
    userPromptTemplate: 'Create price card for {{productName}}: Temu {{price}} vs regular {{comparePrice}}.',
    variables: ['price', 'comparePrice', 'productName'],
  },
});

const temuBulkImages = defineSkill({
  id: 'temu-bulk-images',
  name: 'Temu Bulk Images',
  category: 'platform',
  description: 'Bulk product images for multi-SKU listings.',
  supportedPlatforms: ['temu'],
  supportedModels: ['flux'],
  icon: 'Layers',
  tags: ['official'],
  estimatedTime: '~4 min',
  requiresConnection: true,
  input: {
    required: ['skus'],
    properties: {
      skus: { type: 'object[]', description: 'List of SKUs with variant details' },
      baseStyle: { type: 'string', description: 'Base image style', enum: ['clean-white', 'lifestyle', 'both'] },
    },
  },
  output: { type: 'image[]', description: 'Batch of product images per SKU', format: 'png' },
  steps: [
    { id: 'sku-list', name: 'SKU List', description: 'Parse and organize SKU list', estimatedTime: '10s' },
    { id: 'per-sku-shoot', name: 'Per-SKU Shoot', description: 'Generate image per SKU variant', estimatedTime: '150s', dependencies: ['sku-list'] },
    { id: 'batch-export', name: 'Batch Export', description: 'Export all images in batch', estimatedTime: '15s', dependencies: ['per-sku-shoot'] },
  ],
  prompt: {
    systemPrompt: 'You generate bulk Temu product images per SKU variant.',
    userPromptTemplate: 'Generate {{baseStyle}} product images for SKUs {{skus}}.',
    variables: ['skus', 'baseStyle'],
  },
});

const temuDescription = defineSkill({
  id: 'temu-description',
  name: 'Temu Description',
  category: 'platform',
  description: 'Short, bullet-point description (max 500 chars).',
  supportedPlatforms: ['temu'],
  supportedModels: ['gpt-4'],
  icon: 'List',
  tags: ['official'],
  estimatedTime: '~30s',
  requiresConnection: true,
  input: {
    required: ['productData'],
    properties: {
      productData: { type: 'object', description: 'Product key specs and features' },
    },
  },
  output: { type: 'string', description: 'Bullet-point description under 500 chars', format: 'text' },
  steps: [
    { id: 'key-specs', name: 'Key Specs', description: 'Extract essential product specs', estimatedTime: '10s' },
    { id: 'bullet-format', name: 'Bullet Format', description: 'Format as concise bullet points', estimatedTime: '10s', dependencies: ['key-specs'] },
    { id: 'char-limit', name: 'Char Limit', description: 'Validate under 500 character limit', estimatedTime: '5s', dependencies: ['bullet-format'] },
    { id: 'export', name: 'Export', description: 'Export final description', estimatedTime: '3s', dependencies: ['char-limit'] },
  ],
  prompt: {
    systemPrompt: 'You write Temu bullet-point product descriptions, max 500 characters.',
    userPromptTemplate: 'Create Temu bullet-point description for {{productData}} under 500 chars.',
    variables: ['productData'],
  },
});

registry.register(temuMainImage);
registry.register(temuTitle);
registry.register(temuPriceCard);
registry.register(temuBulkImages);
registry.register(temuDescription);

export const skills = [
  temuMainImage,
  temuTitle,
  temuPriceCard,
  temuBulkImages,
  temuDescription,
];
