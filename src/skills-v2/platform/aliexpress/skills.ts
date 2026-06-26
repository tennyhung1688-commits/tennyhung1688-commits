import { defineSkill } from '../../helpers';
import { registry } from '../../registry';

const aliexpressMainImage = defineSkill({
  id: 'aliexpress-main-image',
  name: 'AliExpress Main Image',
  category: 'image',
  description: '800x800px white background, 6-image minimum ready, optimized for global buyers.',
  supportedPlatforms: ['aliexpress'],
  supportedModels: ['flux'],
  icon: 'Image',
  tags: ['official'],
  estimatedTime: '~3min',
  requiresConnection: true,
  input: { required: ['productImage', 'productName'], properties: { productImage: { type: 'string', description: 'Product image URL or base64' }, productName: { type: 'string', description: 'Product name' } } },
  output: { type: 'image', description: '800x800px AliExpress main image with white background', format: 'url' },
  steps: [
    { id: 'bg-removal', name: 'Background Removal', description: 'Remove existing background from product image', estimatedTime: '30s' },
    { id: 'resize', name: 'Resize 800x800', description: 'Resize and crop to 800x800px square', estimatedTime: '15s', dependencies: ['bg-removal'] },
    { id: 'export', name: 'Export', description: 'Export final AliExpress main image', estimatedTime: '10s', dependencies: ['resize'] },
  ],
  prompt: { systemPrompt: 'You are an AliExpress product photography expert. Create compliant main images for global e-commerce.', userPromptTemplate: 'Generate an AliExpress main image for {{productName}}. 800x800px, white background, product centered.', variables: ['productImage', 'productName'] },
});

const aliexpressTitle = defineSkill({
  id: 'aliexpress-title',
  name: 'AliExpress Title',
  category: 'copywriting',
  description: 'Max 128 characters, keyword-rich, multi-language capable for global markets.',
  supportedPlatforms: ['aliexpress'],
  supportedModels: ['gpt-4'],
  icon: 'Type',
  tags: ['official'],
  estimatedTime: '~2min',
  requiresConnection: true,
  input: { required: ['productName', 'keywords'], properties: { productName: { type: 'string', description: 'Product name' }, keywords: { type: 'array', description: 'Search keywords in English' }, targetMarkets: { type: 'array', description: 'Target country markets' } } },
  output: { type: 'text', description: 'AliExpress listing title (max 128 chars)', format: 'text' },
  steps: [
    { id: 'en-title', name: 'EN Title Draft', description: 'Draft English title with target keywords', estimatedTime: '30s' },
    { id: 'keyword-optimize', name: 'Keyword Optimize', description: 'Optimize search keyword density and placement', estimatedTime: '20s', dependencies: ['en-title'] },
    { id: '128-char', name: '128-Char Limit', description: 'Finalize within 128 character limit', estimatedTime: '15s', dependencies: ['keyword-optimize'] },
    { id: 'multi-lang', name: 'Multi-Lang Ready', description: 'Ensure title structure works for auto-translation', estimatedTime: '10s', dependencies: ['128-char'] },
  ],
  prompt: { systemPrompt: 'You write AliExpress titles optimized for global search. Max 128 chars, keyword-rich, multi-language ready.', userPromptTemplate: 'Write an AliExpress title for {{productName}}. Keywords: {{keywords}}. Target markets: {{targetMarkets}}. Max 128 chars.', variables: ['productName', 'keywords', 'targetMarkets'] },
});

const aliexpressDescription = defineSkill({
  id: 'aliexpress-description',
  name: 'AliExpress Description',
  category: 'copywriting',
  description: 'Mobile-optimized product description with price/value focus, features, and shipping info.',
  supportedPlatforms: ['aliexpress'],
  supportedModels: ['gpt-4'],
  icon: 'FileText',
  tags: ['official'],
  estimatedTime: '~4min',
  requiresConnection: true,
  input: { required: ['productName', 'features'], properties: { productName: { type: 'string', description: 'Product name' }, features: { type: 'array', description: 'Key product features' }, priceRange: { type: 'string', description: 'Price range for context' }, shippingInfo: { type: 'string', description: 'Shipping details' } } },
  output: { type: 'text', description: 'Mobile-optimized AliExpress product description', format: 'text' },
  steps: [
    { id: 'value-first', name: 'Value First', description: 'Lead with value proposition and price benefit', estimatedTime: '45s' },
    { id: 'features', name: 'Features', description: 'Write feature highlights with benefits', estimatedTime: '60s', dependencies: ['value-first'] },
    { id: 'shipping', name: 'Shipping', description: 'Add clear shipping and delivery information', estimatedTime: '30s', dependencies: ['features'] },
    { id: 'mobile-format', name: 'Mobile Format', description: 'Format for mobile readability with short paragraphs', estimatedTime: '20s', dependencies: ['shipping'] },
  ],
  prompt: { systemPrompt: 'You write AliExpress product descriptions with value focus for mobile buyers.', userPromptTemplate: 'Write an AliExpress description for {{productName}}. Features: {{features}}. Price: {{priceRange}}. Shipping: {{shippingInfo}}. Mobile-optimized.', variables: ['productName', 'features', 'priceRange', 'shippingInfo'] },
});

const aliexpressVariationImages = defineSkill({
  id: 'aliexpress-variation-images',
  name: 'AliExpress Variation Images',
  category: 'image',
  description: 'Per-variation product images with color/size text label overlay.',
  supportedPlatforms: ['aliexpress'],
  supportedModels: ['flux', 'recraft'],
  icon: 'Grid3X3',
  tags: ['official'],
  estimatedTime: '~5min',
  requiresConnection: true,
  input: { required: ['productImage', 'variants'], properties: { productImage: { type: 'string', description: 'Base product image' }, variants: { type: 'array', description: 'List of variant labels (color, size)' }, labelStyle: { type: 'string', description: 'Label style: text overlay or swatch' } } },
  output: { type: 'image', description: 'Per-variant product images with labels', format: 'url' },
  steps: [
    { id: 'variant-list', name: 'Variant List', description: 'Parse all product variations and labels', estimatedTime: '30s' },
    { id: 'per-variant', name: 'Per-Variant Generate', description: 'Generate image for each variant', estimatedTime: '120s', dependencies: ['variant-list'] },
    { id: 'label-overlay', name: 'Label Overlay', description: 'Apply color/size text labels to each image', estimatedTime: '45s', dependencies: ['per-variant'] },
    { id: 'export', name: 'Export', description: 'Export all variation images at 800x800', estimatedTime: '15s', dependencies: ['label-overlay'] },
  ],
  prompt: { systemPrompt: 'You generate AliExpress variation images with clear color/size labels for each variant.', userPromptTemplate: 'Generate variation images for {{productImage}} with variants: {{variants}}. Label style: {{labelStyle}}. 800x800px each.', variables: ['productImage', 'variants', 'labelStyle'] },
});

registry.register(aliexpressMainImage);
registry.register(aliexpressTitle);
registry.register(aliexpressDescription);
registry.register(aliexpressVariationImages);

export const skills = [aliexpressMainImage, aliexpressTitle, aliexpressDescription, aliexpressVariationImages];
