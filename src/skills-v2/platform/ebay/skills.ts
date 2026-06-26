import { defineSkill } from '../../helpers';
import { registry } from '../../registry';

const ebayMainImage = defineSkill({
  id: 'ebay-main-image',
  name: 'eBay Main Image',
  category: 'image',
  description: '1600px longest side, white background preferred, Gallery Plus ready (12 images).',
  supportedPlatforms: ['ebay'],
  supportedModels: ['flux'],
  icon: 'Image',
  tags: ['official'],
  estimatedTime: '~3min',
  requiresConnection: true,
  input: { required: ['productImage', 'productName'], properties: { productImage: { type: 'string', description: 'Product image URL or base64' }, productName: { type: 'string', description: 'Product name' } } },
  output: { type: 'image', description: 'eBay-compliant main image at 1600px longest side', format: 'url' },
  steps: [
    { id: 'bg-removal', name: 'Background Removal', description: 'Remove existing background from product image', estimatedTime: '30s' },
    { id: 'resize', name: 'Resize to 1600px', description: 'Scale image to 1600px on longest side', estimatedTime: '15s', dependencies: ['bg-removal'] },
    { id: 'compliance', name: 'eBay Compliance', description: 'Verify white background, no watermarks, no borders', estimatedTime: '15s', dependencies: ['resize'] },
    { id: 'export', name: 'Export', description: 'Export final eBay-compliant main image', estimatedTime: '10s', dependencies: ['compliance'] },
  ],
  prompt: { systemPrompt: 'You are an eBay product photography expert. Create images that meet eBay Gallery Plus requirements.', userPromptTemplate: 'Generate an eBay main image for {{productName}}. 1600px longest side, white background, no watermarks or borders.', variables: ['productImage', 'productName'] },
});

const ebayTitle = defineSkill({
  id: 'ebay-title',
  name: 'eBay Title',
  category: 'copywriting',
  description: 'Max 80 characters, keyword-rich, no ALL CAPS. Optimized for eBay search visibility.',
  supportedPlatforms: ['ebay'],
  supportedModels: ['gpt-4'],
  icon: 'Type',
  tags: ['official'],
  estimatedTime: '~2min',
  requiresConnection: true,
  input: { required: ['productName', 'coreKeywords'], properties: { productName: { type: 'string', description: 'Product name' }, coreKeywords: { type: 'array', description: 'Core search keywords' }, brand: { type: 'string', description: 'Brand name' }, condition: { type: 'string', description: 'Item condition' } } },
  output: { type: 'text', description: 'eBay listing title (max 80 chars)', format: 'text' },
  steps: [
    { id: 'core-keyword', name: 'Core Keyword', description: 'Identify strongest primary keyword', estimatedTime: '15s' },
    { id: 'descriptive', name: 'Descriptive Build', description: 'Build descriptive title with all keywords', estimatedTime: '30s', dependencies: ['core-keyword'] },
    { id: 'char-limit', name: '80-Char Limit', description: 'Trim and optimize to fit 80 characters', estimatedTime: '15s', dependencies: ['descriptive'] },
    { id: 'validate', name: 'Validate', description: 'Check no ALL CAPS, no special characters, keyword-rich', estimatedTime: '10s', dependencies: ['char-limit'] },
  ],
  prompt: { systemPrompt: 'You are an eBay listing title specialist. Create keyword-rich titles under 80 characters.', userPromptTemplate: 'Create an eBay title for {{productName}}. Brand: {{brand}}. Condition: {{condition}}. Core keywords: {{coreKeywords}}. Max 80 chars, no ALL CAPS.', variables: ['productName', 'coreKeywords', 'brand', 'condition'] },
});

const ebayItemSpecifics = defineSkill({
  id: 'ebay-item-specifics',
  name: 'eBay Item Specifics',
  category: 'copywriting',
  description: 'Auto-fill eBay required item specifics (Brand, MPN, UPC, size, color, etc.).',
  supportedPlatforms: ['ebay'],
  supportedModels: ['gpt-4'],
  icon: 'ListChecks',
  tags: ['official'],
  estimatedTime: '~2min',
  requiresConnection: true,
  input: { required: ['productData', 'category'], properties: { productData: { type: 'object', description: 'Complete product info' }, category: { type: 'string', description: 'eBay category ID or name' } } },
  output: { type: 'object', description: 'Filled item specifics for eBay listing', format: 'json' },
  steps: [
    { id: 'category-scan', name: 'Category Scan', description: 'Identify category and required specifics', estimatedTime: '20s' },
    { id: 'required-fields', name: 'Required Fields', description: 'Extract all required item specifics fields', estimatedTime: '25s', dependencies: ['category-scan'] },
    { id: 'auto-populate', name: 'Auto-Populate', description: 'Fill each field with product data', estimatedTime: '30s', dependencies: ['required-fields'] },
    { id: 'review', name: 'Review', description: 'Review and flag missing required fields', estimatedTime: '15s', dependencies: ['auto-populate'] },
  ],
  prompt: { systemPrompt: 'You are an eBay item specifics expert. Auto-fill required fields for listings.', userPromptTemplate: 'Fill eBay item specifics for category {{category}} using product data: {{productData}}. Include all required fields.', variables: ['productData', 'category'] },
});

const ebayDescription = defineSkill({
  id: 'ebay-description',
  name: 'eBay Description',
  category: 'copywriting',
  description: 'Mobile-optimized HTML description with feature bullets, policies, and shipping info.',
  supportedPlatforms: ['ebay'],
  supportedModels: ['gpt-4'],
  icon: 'FileText',
  tags: ['official'],
  estimatedTime: '~4min',
  requiresConnection: true,
  input: { required: ['productName', 'features', 'policy'], properties: { productName: { type: 'string', description: 'Product name' }, features: { type: 'array', description: 'Key product features' }, policy: { type: 'object', description: 'Shipping, returns, payment policies' } } },
  output: { type: 'text', description: 'Mobile-optimized HTML description for eBay listing', format: 'html' },
  steps: [
    { id: 'mobile-layout', name: 'Mobile-First Layout', description: 'Structure responsive HTML for mobile rendering', estimatedTime: '45s' },
    { id: 'feature-bullets', name: 'Feature Bullets', description: 'Write feature bullets with icons and highlights', estimatedTime: '60s', dependencies: ['mobile-layout'] },
    { id: 'policy-section', name: 'Policy Section', description: 'Format shipping, returns, and payment policies', estimatedTime: '30s', dependencies: ['feature-bullets'] },
    { id: 'html-export', name: 'HTML Export', description: 'Export final mobile-optimized HTML description', estimatedTime: '15s', dependencies: ['policy-section'] },
  ],
  prompt: { systemPrompt: 'You write eBay listing descriptions optimized for mobile viewing with clean HTML.', userPromptTemplate: 'Write an eBay description for {{productName}}. Features: {{features}}. Policies: {{policy}}. Mobile-optimized HTML with feature bullets and policy sections.', variables: ['productName', 'features', 'policy'] },
});

registry.register(ebayMainImage);
registry.register(ebayTitle);
registry.register(ebayItemSpecifics);
registry.register(ebayDescription);

export const skills = [ebayMainImage, ebayTitle, ebayItemSpecifics, ebayDescription];
