import { defineSkill } from '../../helpers';
import { registry } from '../../registry';

const etsyMainImage = defineSkill({
  id: 'etsy-main-image',
  name: 'Etsy Main Image',
  category: 'image',
  description: '2000px along shortest side, natural lighting style, warm tones for handmade/vintage aesthetic.',
  supportedPlatforms: ['etsy'],
  supportedModels: ['flux'],
  icon: 'Image',
  tags: ['official'],
  estimatedTime: '~3min',
  requiresConnection: true,
  input: { required: ['productImage', 'productName'], properties: { productImage: { type: 'string', description: 'Product image URL or base64' }, productName: { type: 'string', description: 'Product name' }, sceneStyle: { type: 'string', description: 'Lifestyle scene style, e.g. rustic, minimalist, cozy' } } },
  output: { type: 'image', description: 'Etsy-optimized main image at 2000px shortest side', format: 'url' },
  steps: [
    { id: 'natural-lighting', name: 'Natural Lighting', description: 'Apply natural, soft lighting treatment', estimatedTime: '30s' },
    { id: 'warm-tones', name: 'Warm Tones', description: 'Apply warm color grading for handmade feel', estimatedTime: '20s', dependencies: ['natural-lighting'] },
    { id: 'resize', name: 'Resize to 2000px', description: 'Scale image to 2000px on shortest side', estimatedTime: '15s', dependencies: ['warm-tones'] },
    { id: 'export', name: 'Export', description: 'Export final Etsy main image', estimatedTime: '10s', dependencies: ['resize'] },
  ],
  prompt: { systemPrompt: 'You are an Etsy product photographer specializing in handmade and vintage aesthetics.', userPromptTemplate: 'Create an Etsy main image for {{productName}}. Scene style: {{sceneStyle}}. 2000px shortest side, natural lighting, warm tones.', variables: ['productImage', 'productName', 'sceneStyle'] },
});

const etsyTitle = defineSkill({
  id: 'etsy-title',
  name: 'Etsy Title',
  category: 'copywriting',
  description: 'Short descriptive title (max 140 chars), crafted for Etsy search discovery.',
  supportedPlatforms: ['etsy'],
  supportedModels: ['gpt-4'],
  icon: 'Type',
  tags: ['official'],
  estimatedTime: '~2min',
  requiresConnection: true,
  input: { required: ['productName', 'mainKeyword'], properties: { productName: { type: 'string', description: 'Product name' }, mainKeyword: { type: 'string', description: 'Main search keyword' }, descriptors: { type: 'array', description: 'Descriptive adjectives' }, occasion: { type: 'string', description: 'Gift occasion if applicable' } } },
  output: { type: 'text', description: 'Etsy listing title (max 140 chars)', format: 'text' },
  steps: [
    { id: 'main-keyword', name: 'Main Keyword', description: 'Anchor title with primary search keyword', estimatedTime: '15s' },
    { id: 'descriptive-words', name: 'Descriptive Words', description: 'Layer descriptive adjectives and occasion words', estimatedTime: '30s', dependencies: ['main-keyword'] },
    { id: 'char-limit', name: '140-Char Limit', description: 'Compose final title within 140 character limit', estimatedTime: '15s', dependencies: ['descriptive-words'] },
    { id: 'compose', name: 'Compose', description: 'Final polish for readability and search optimization', estimatedTime: '10s', dependencies: ['char-limit'] },
  ],
  prompt: { systemPrompt: 'You write Etsy listing titles that balance charm with search visibility. Max 140 characters.', userPromptTemplate: 'Write an Etsy title for {{productName}}. Main keyword: {{mainKeyword}}. Descriptors: {{descriptors}}. Occasion: {{occasion}}. Max 140 chars.', variables: ['productName', 'mainKeyword', 'descriptors', 'occasion'] },
});

const etsyTags = defineSkill({
  id: 'etsy-tags',
  name: 'Etsy Tags',
  category: 'seo',
  description: '13 search tags optimized for Etsy discovery, mixing broad and niche terms.',
  supportedPlatforms: ['etsy'],
  supportedModels: ['gpt-4'],
  icon: 'Tags',
  tags: ['official'],
  estimatedTime: '~3min',
  requiresConnection: true,
  input: { required: ['productName', 'category'], properties: { productName: { type: 'string', description: 'Product name' }, category: { type: 'string', description: 'Etsy category' }, materials: { type: 'array', description: 'Product materials' }, style: { type: 'string', description: 'Product style or aesthetic' } } },
  output: { type: 'object', description: '13 optimized Etsy search tags', format: 'json' },
  steps: [
    { id: 'category-research', name: 'Category Research', description: 'Research top-performing tags in the category', estimatedTime: '45s' },
    { id: 'keyword-extraction', name: 'Keyword Extraction', description: 'Extract relevant keywords from product attributes', estimatedTime: '30s', dependencies: ['category-research'] },
    { id: 'best-tags', name: '13 Best Tags', description: 'Select 13 best tags mixing broad and niche', estimatedTime: '30s', dependencies: ['keyword-extraction'] },
    { id: 'validate', name: 'Validate', description: 'Validate tag relevance and search volume potential', estimatedTime: '20s', dependencies: ['best-tags'] },
  ],
  prompt: { systemPrompt: 'You optimize Etsy search tags for maximum discovery. Select 13 tags per listing.', userPromptTemplate: 'Generate 13 Etsy tags for {{productName}} in category {{category}}. Materials: {{materials}}. Style: {{style}}. Mix broad and niche terms.', variables: ['productName', 'category', 'materials', 'style'] },
});

const etsyDescription = defineSkill({
  id: 'etsy-description',
  name: 'Etsy Description',
  category: 'copywriting',
  description: 'Story-driven product description with materials, dimensions, and care instructions.',
  supportedPlatforms: ['etsy'],
  supportedModels: ['gpt-4'],
  icon: 'FileText',
  tags: ['official'],
  estimatedTime: '~4min',
  requiresConnection: true,
  input: { required: ['productName', 'features', 'materials'], properties: { productName: { type: 'string', description: 'Product name' }, features: { type: 'array', description: 'Key product features' }, materials: { type: 'array', description: 'Materials used' }, dimensions: { type: 'string', description: 'Product dimensions' }, story: { type: 'string', description: 'Product story or inspiration' } } },
  output: { type: 'text', description: 'Etsy story-driven product description', format: 'text' },
  steps: [
    { id: 'story', name: 'Product Story', description: 'Craft compelling product story and inspiration', estimatedTime: '60s' },
    { id: 'features', name: 'Features', description: 'List key features and dimensions clearly', estimatedTime: '45s', dependencies: ['story'] },
    { id: 'materials', name: 'Materials', description: 'Detail all materials with sourcing notes', estimatedTime: '30s', dependencies: ['story'] },
    { id: 'care', name: 'Care Instructions', description: 'Write care and maintenance instructions', estimatedTime: '30s', dependencies: ['features', 'materials'] },
  ],
  prompt: { systemPrompt: 'You write story-driven Etsy product descriptions that connect emotionally with buyers.', userPromptTemplate: 'Write an Etsy description for {{productName}}. Story: {{story}}. Features: {{features}}. Materials: {{materials}}. Dimensions: {{dimensions}}. Include care instructions.', variables: ['productName', 'features', 'materials', 'dimensions', 'story'] },
});

registry.register(etsyMainImage);
registry.register(etsyTitle);
registry.register(etsyTags);
registry.register(etsyDescription);

export const skills = [etsyMainImage, etsyTitle, etsyTags, etsyDescription];
