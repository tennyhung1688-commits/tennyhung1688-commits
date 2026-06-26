import { defineSkill } from '../../helpers';
import { registry } from '../../registry';

const shopeeMainImage = defineSkill({
  id: 'shopee-main-image',
  name: 'Shopee Main Image',
  category: 'platform',
  description: '800x800 white bg with no text overlay on main image.',
  supportedPlatforms: ['shopee'],
  supportedModels: ['flux', 'gpt-image'],
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
  output: { type: 'image', description: '800x800 clean white background product image', format: 'png' },
  steps: [
    { id: 'bg-removal', name: 'BG Removal', description: 'Remove existing background', estimatedTime: '20s' },
    { id: 'pure-white', name: 'Pure White', description: 'Apply pure white (#FFFFFF) background', estimatedTime: '30s', dependencies: ['bg-removal'] },
    { id: 'center', name: 'Center', description: 'Center product in 800x800 canvas', estimatedTime: '15s', dependencies: ['pure-white'] },
    { id: '800x800', name: '800x800 Export', description: 'Export at exactly 800x800 resolution', estimatedTime: '10s', dependencies: ['center'] },
  ],
  prompt: {
    systemPrompt: 'You generate Shopee-compliant main images: 800x800, pure white background, no text overlay.',
    userPromptTemplate: 'Create Shopee main image for {{productImage}} at 800x800 with pure white background.',
    variables: ['productImage'],
  },
});

const shopeeMultilangTitle = defineSkill({
  id: 'shopee-multilang-title',
  name: 'Shopee Multi-Language Title',
  category: 'platform',
  description: 'Title in EN + local language (max 120 chars).',
  supportedPlatforms: ['shopee'],
  supportedModels: ['gpt-4'],
  icon: 'Languages',
  tags: ['official'],
  estimatedTime: '~1 min',
  requiresConnection: true,
  input: {
    required: ['productName', 'market'],
    properties: {
      productName: { type: 'string', description: 'English product name' },
      market: { type: 'string', description: 'Target market', enum: ['my', 'th', 'ph', 'id', 'sg', 'vn'] },
    },
  },
  output: { type: 'object', description: 'Multi-language title under 120 chars', format: 'json', example: '{ en, local }' },
  steps: [
    { id: 'en-title', name: 'EN Title', description: 'Generate English title base', estimatedTime: '10s' },
    { id: 'language-detect', name: 'Language Detect', description: 'Detect and prepare local language mapping', estimatedTime: '5s', dependencies: ['en-title'] },
    { id: 'per-language', name: 'Per-Language', description: 'Generate localized title per market', estimatedTime: '15s', dependencies: ['language-detect'] },
    { id: 'validate', name: 'Validate', description: 'Validate character count and readability', estimatedTime: '5s', dependencies: ['per-language'] },
  ],
  prompt: {
    systemPrompt: 'You generate Shopee product titles in EN + local language, max 120 characters each.',
    userPromptTemplate: 'Create EN + local-language title for {{productName}} targeting {{market}} market.',
    variables: ['productName', 'market'],
  },
});

const shopeeDescription = defineSkill({
  id: 'shopee-description',
  name: 'Shopee Description',
  category: 'platform',
  description: 'Rich description with HTML support.',
  supportedPlatforms: ['shopee'],
  supportedModels: ['gpt-4'],
  icon: 'FileText',
  tags: ['official'],
  estimatedTime: '~1 min',
  requiresConnection: true,
  input: {
    required: ['productData'],
    properties: {
      productData: { type: 'object', description: 'Product info: specs, features, warranty' },
      market: { type: 'string', description: 'Target market', enum: ['my', 'th', 'ph', 'id', 'sg', 'vn'] },
    },
  },
  output: { type: 'string', description: 'HTML-formatted product description', format: 'html' },
  steps: [
    { id: 'structure', name: 'Structure', description: 'Build description structure outline', estimatedTime: '10s' },
    { id: 'local-language-draft', name: 'Local-Language Draft', description: 'Draft description in local language', estimatedTime: '20s', dependencies: ['structure'] },
    { id: 'html-format', name: 'HTML Format', description: 'Format with Shopee-supported HTML tags', estimatedTime: '10s', dependencies: ['local-language-draft'] },
    { id: 'export', name: 'Export', description: 'Export final HTML description', estimatedTime: '5s', dependencies: ['html-format'] },
  ],
  prompt: {
    systemPrompt: 'You generate rich Shopee product descriptions with HTML formatting.',
    userPromptTemplate: 'Create Shopee product description for {{productData}} targeting {{market}} market.',
    variables: ['productData', 'market'],
  },
});

const shopeeVariationImages = defineSkill({
  id: 'shopee-variation-images',
  name: 'Shopee Variation Images',
  category: 'platform',
  description: 'Per-variation images (9 image slots max).',
  supportedPlatforms: ['shopee'],
  supportedModels: ['flux'],
  icon: 'LayoutGrid',
  tags: ['official'],
  estimatedTime: '~3 min',
  requiresConnection: true,
  input: {
    required: ['variants'],
    properties: {
      variants: { type: 'object[]', description: 'Product variants (color, size, etc.)' },
      baseProductImage: { type: 'string', description: 'Base product image URL' },
    },
  },
  output: { type: 'image[]', description: 'Variation images in grid format', format: 'png' },
  steps: [
    { id: 'variant-list', name: 'Variant List', description: 'Parse and organize variant list', estimatedTime: '10s' },
    { id: 'per-variant-shoot', name: 'Per-Variant Shoot', description: 'Generate image for each variant', estimatedTime: '120s', dependencies: ['variant-list'] },
    { id: 'grid', name: 'Grid', description: 'Arrange in 9-slot grid layout', estimatedTime: '20s', dependencies: ['per-variant-shoot'] },
    { id: 'export', name: 'Export', description: 'Export final variation grid', estimatedTime: '10s', dependencies: ['grid'] },
  ],
  prompt: {
    systemPrompt: 'You generate Shopee variation images. Max 9 slots per listing.',
    userPromptTemplate: 'Generate variation images for variants {{variants}} based on {{baseProductImage}}.',
    variables: ['variants', 'baseProductImage'],
  },
});

const shopeeLiveScript = defineSkill({
  id: 'shopee-live-script',
  name: 'Shopee Live Script',
  category: 'platform',
  description: 'Shopee Live selling script.',
  supportedPlatforms: ['shopee'],
  supportedModels: ['gpt-4'],
  icon: 'Radio',
  tags: ['official'],
  estimatedTime: '~2 min',
  requiresConnection: true,
  input: {
    required: ['productLineup'],
    properties: {
      productLineup: { type: 'object[]', description: 'Ordered product list with pricing' },
      market: { type: 'string', description: 'Target market', enum: ['my', 'th', 'ph', 'id', 'sg', 'vn'] },
    },
  },
  output: { type: 'object', description: 'Timed Shopee Live script in local language', format: 'json' },
  steps: [
    { id: 'product-lineup', name: 'Product Lineup', description: 'Organize product presentation order', estimatedTime: '10s' },
    { id: 'demo', name: 'Demo', description: 'Script product demonstration moments', estimatedTime: '20s', dependencies: ['product-lineup'] },
    { id: 'voucher-push', name: 'Voucher Push', description: 'Insert voucher and promotion moments', estimatedTime: '15s', dependencies: ['demo'] },
    { id: 'interaction-prompts', name: 'Interaction Prompts', description: 'Add chat interaction and engagement prompts', estimatedTime: '10s', dependencies: ['voucher-push'] },
  ],
  prompt: {
    systemPrompt: 'You are a Shopee Live selling host. Generate scripts in local market language.',
    userPromptTemplate: 'Create a Shopee Live script for product lineup {{productLineup}} in {{market}} market.',
    variables: ['productLineup', 'market'],
  },
});

const shopeeCategoryOptimizer = defineSkill({
  id: 'shopee-category-optimizer',
  name: 'Shopee Category Optimizer',
  category: 'platform',
  description: 'Find optimal Shopee category for maximum visibility.',
  supportedPlatforms: ['shopee'],
  supportedModels: ['gpt-4'],
  icon: 'FolderSearch',
  tags: ['official'],
  estimatedTime: '~1 min',
  requiresConnection: true,
  input: {
    required: ['productData'],
    properties: {
      productData: { type: 'object', description: 'Product name, description, specs' },
      market: { type: 'string', description: 'Target market', enum: ['my', 'th', 'ph', 'id', 'sg', 'vn'] },
    },
  },
  output: { type: 'object', description: 'Optimal category path with confidence score', format: 'json', example: '{ categoryPath, confidence, alternatives }' },
  steps: [
    { id: 'product-analysis', name: 'Product Analysis', description: 'Analyze product attributes for categorization', estimatedTime: '10s' },
    { id: 'category-tree', name: 'Category Tree', description: 'Traverse Shopee category tree', estimatedTime: '15s', dependencies: ['product-analysis'] },
    { id: 'best-match', name: 'Best Match', description: 'Identify best category match', estimatedTime: '10s', dependencies: ['category-tree'] },
    { id: 'recommend', name: 'Recommend', description: 'Provide category recommendation with rationale', estimatedTime: '5s', dependencies: ['best-match'] },
  ],
  prompt: {
    systemPrompt: 'You are a Shopee category taxonomy expert.',
    userPromptTemplate: 'Find optimal Shopee category for {{productData}} in {{market}} market.',
    variables: ['productData', 'market'],
  },
});

const shopeePublish = defineSkill({
  id: 'shopee-publish',
  name: 'Shopee Publish',
  category: 'platform',
  description: 'Auto-fill and publish to Shopee.',
  supportedPlatforms: ['shopee'],
  supportedModels: ['gpt-4'],
  icon: 'Send',
  tags: ['official'],
  estimatedTime: '~3 min',
  requiresConnection: true,
  input: {
    required: ['listingData'],
    properties: {
      listingData: { type: 'object', description: 'Complete listing: title, description, images, variants' },
      market: { type: 'string', description: 'Target market', enum: ['my', 'th', 'ph', 'id', 'sg', 'vn'] },
    },
  },
  output: { type: 'object', description: 'Publishing confirmation with listing ID', format: 'json', example: '{ listingId, status, url }' },
  steps: [
    { id: 'field-validation', name: 'Field Validation', description: 'Validate all required fields are complete', estimatedTime: '15s' },
    { id: 'multi-lang-check', name: 'Multi-Lang Check', description: 'Verify language compliance per market', estimatedTime: '15s', dependencies: ['field-validation'] },
    { id: 'upload', name: 'Upload', description: 'Upload listing to Shopee seller center', estimatedTime: '60s', dependencies: ['multi-lang-check'] },
    { id: 'confirm', name: 'Confirm', description: 'Confirm listing is live and return ID', estimatedTime: '15s', dependencies: ['upload'] },
  ],
  prompt: {
    systemPrompt: 'You validate and publish Shopee listings via Shopee API.',
    userPromptTemplate: 'Publish Shopee listing {{listingData}} to {{market}} market.',
    variables: ['listingData', 'market'],
  },
});

registry.register(shopeeMainImage);
registry.register(shopeeMultilangTitle);
registry.register(shopeeDescription);
registry.register(shopeeVariationImages);
registry.register(shopeeLiveScript);
registry.register(shopeeCategoryOptimizer);
registry.register(shopeePublish);

export const skills = [
  shopeeMainImage,
  shopeeMultilangTitle,
  shopeeDescription,
  shopeeVariationImages,
  shopeeLiveScript,
  shopeeCategoryOptimizer,
  shopeePublish,
];
