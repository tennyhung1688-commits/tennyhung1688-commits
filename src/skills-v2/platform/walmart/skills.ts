import { defineSkill } from '../../helpers';
import { registry } from '../../registry';

const walmartMainImage = defineSkill({
  id: 'walmart-main-image',
  name: 'Walmart Main Image',
  category: 'image',
  description: '2000x2000px pure white background, no text overlays, 4-image minimum ready.',
  supportedPlatforms: ['walmart'],
  supportedModels: ['flux'],
  icon: 'Image',
  tags: ['official'],
  estimatedTime: '~3min',
  requiresConnection: true,
  input: { required: ['productImage', 'productName'], properties: { productImage: { type: 'string', description: 'Product image URL or base64' }, productName: { type: 'string', description: 'Product name' } } },
  output: { type: 'image', description: '2000x2000px main image with pure white background', format: 'url' },
  steps: [
    { id: 'bg-removal', name: 'Background Removal', description: 'Remove existing background from product image', estimatedTime: '30s' },
    { id: 'pure-white', name: 'Pure White BG', description: 'Apply #FFFFFF pure white background per Walmart spec', estimatedTime: '15s', dependencies: ['bg-removal'] },
    { id: 'resize', name: 'Resize 2000x2000', description: 'Resize and crop to exact 2000x2000px', estimatedTime: '15s', dependencies: ['pure-white'] },
    { id: 'export', name: 'Export', description: 'Export final Walmart-compliant main image', estimatedTime: '10s', dependencies: ['resize'] },
  ],
  prompt: { systemPrompt: 'You are a Walmart product photography expert. Create compliant main images per Walmart spec.', userPromptTemplate: 'Generate a Walmart main image for {{productName}}. 2000x2000px, pure white #FFFFFF background, no text overlays.', variables: ['productImage', 'productName'] },
});

const walmartTitle = defineSkill({
  id: 'walmart-title',
  name: 'Walmart Title',
  category: 'copywriting',
  description: 'Max 50-75 characters, format: Brand + Item Name + Model + Key Attribute.',
  supportedPlatforms: ['walmart'],
  supportedModels: ['gpt-4'],
  icon: 'Type',
  tags: ['official'],
  estimatedTime: '~2min',
  requiresConnection: true,
  input: { required: ['brand', 'productName', 'model'], properties: { brand: { type: 'string', description: 'Brand name' }, productName: { type: 'string', description: 'Product/item name' }, model: { type: 'string', description: 'Model number' }, keyAttribute: { type: 'string', description: 'Key distinguishing attribute' } } },
  output: { type: 'text', description: 'Walmart listing title (50-75 chars)', format: 'text' },
  steps: [
    { id: 'brand', name: 'Brand Prefix', description: 'Start title with brand name', estimatedTime: '10s' },
    { id: 'model', name: 'Model Number', description: 'Insert model number after product name', estimatedTime: '10s', dependencies: ['brand'] },
    { id: 'key-attr', name: 'Key Attribute', description: 'Add key differentiating attribute', estimatedTime: '15s', dependencies: ['model'] },
    { id: 'compose', name: 'Compose', description: 'Compose final title with proper format', estimatedTime: '15s', dependencies: ['key-attr'] },
    { id: 'char-check', name: 'Char Check', description: 'Validate title is 50-75 characters', estimatedTime: '10s', dependencies: ['compose'] },
  ],
  prompt: { systemPrompt: 'You write Walmart listing titles. Brand + Item Name + Model + Key Attribute format, 50-75 chars.', userPromptTemplate: 'Write a Walmart title: Brand {{brand}}, Product {{productName}}, Model {{model}}, Key Attr {{keyAttribute}}. 50-75 chars.', variables: ['brand', 'productName', 'model', 'keyAttribute'] },
});

const walmartDescription = defineSkill({
  id: 'walmart-description',
  name: 'Walmart Description',
  category: 'copywriting',
  description: 'Rich product description (max 4000 chars) with key features, specs, and benefits.',
  supportedPlatforms: ['walmart'],
  supportedModels: ['gpt-4'],
  icon: 'FileText',
  tags: ['official'],
  estimatedTime: '~4min',
  requiresConnection: true,
  input: { required: ['productName', 'features', 'specs'], properties: { productName: { type: 'string', description: 'Product name' }, features: { type: 'array', description: 'Key product features' }, specs: { type: 'object', description: 'Technical specifications' }, benefits: { type: 'array', description: 'Customer benefits' } } },
  output: { type: 'text', description: 'Walmart product description (max 4000 chars)', format: 'text' },
  steps: [
    { id: 'overview', name: 'Overview', description: 'Write compelling product overview paragraph', estimatedTime: '60s' },
    { id: 'features', name: 'Features', description: 'Write key features section with benefits', estimatedTime: '60s', dependencies: ['overview'] },
    { id: 'specs', name: 'Specifications', description: 'Format technical specifications clearly', estimatedTime: '45s', dependencies: ['features'] },
    { id: 'format', name: 'Format', description: 'Final format and length check (max 4000 chars)', estimatedTime: '20s', dependencies: ['specs'] },
  ],
  prompt: { systemPrompt: 'You write Walmart product descriptions that are clear, rich, and conversion-focused. Max 4000 characters.', userPromptTemplate: 'Write a Walmart description for {{productName}}. Features: {{features}}. Specs: {{specs}}. Benefits: {{benefits}}. Max 4000 chars.', variables: ['productName', 'features', 'specs', 'benefits'] },
});

const walmartAttributes = defineSkill({
  id: 'walmart-attributes',
  name: 'Walmart Attributes',
  category: 'copywriting',
  description: 'Auto-fill required Walmart attributes including variant group, WFS eligibility, shipping weight.',
  supportedPlatforms: ['walmart'],
  supportedModels: ['gpt-4'],
  icon: 'ListChecks',
  tags: ['official'],
  estimatedTime: '~2min',
  requiresConnection: true,
  input: { required: ['productData', 'category'], properties: { productData: { type: 'object', description: 'Complete product info' }, category: { type: 'string', description: 'Walmart category path' } } },
  output: { type: 'object', description: 'Filled Walmart required attributes', format: 'json' },
  steps: [
    { id: 'category-scan', name: 'Category Scan', description: 'Identify category and required attribute fields', estimatedTime: '20s' },
    { id: 'required-fields', name: 'Required Fields', description: 'Extract all mandatory attribute fields', estimatedTime: '25s', dependencies: ['category-scan'] },
    { id: 'auto-fill', name: 'Auto-Fill', description: 'Populate attributes from product data', estimatedTime: '30s', dependencies: ['required-fields'] },
    { id: 'validate', name: 'Validate', description: 'Check variant group, WFS eligibility, shipping weight', estimatedTime: '15s', dependencies: ['auto-fill'] },
  ],
  prompt: { systemPrompt: 'You are a Walmart catalog expert. Auto-fill required attributes for Walmart Marketplace.', userPromptTemplate: 'Fill Walmart attributes for category {{category}} using product data: {{productData}}. Include variant group, WFS fields, shipping weight.', variables: ['productData', 'category'] },
});

registry.register(walmartMainImage);
registry.register(walmartTitle);
registry.register(walmartDescription);
registry.register(walmartAttributes);

export const skills = [walmartMainImage, walmartTitle, walmartDescription, walmartAttributes];
