import { defineSkill } from '../../helpers';
import { registry } from '../../registry';

const shopifyProductImages = defineSkill({
  id: 'shopify-product-images',
  name: 'Shopify Product Images',
  category: 'image',
  description: 'Generate Shopify product photos at 2000×2000px (1:1 ratio) with professional lighting and clean background.',
  supportedPlatforms: ['shopify'],
  supportedModels: ['flux', 'gpt-image'],
  icon: 'Image',
  tags: ['official'],
  estimatedTime: '~4min',
  requiresConnection: true,
  input: { required: ['productName', 'stylePreference'], properties: { productName: { type: 'string', description: 'Product name' }, stylePreference: { type: 'string', description: 'Visual style preference' }, angleChoice: { type: 'string', description: 'Product angle (front, 45°, lifestyle)' } } },
  output: { type: 'image', description: '2000×2000px product image with transparent background', format: 'url' },
  steps: [
    { id: 'format-check', name: 'Format Check', description: 'Verify image dimensions and ratio requirements', estimatedTime: '30s' },
    { id: 'generate', name: 'Generate', description: 'Generate product image with studio lighting and white background', estimatedTime: '120s', dependencies: ['format-check'] },
    { id: 'export', name: 'Export', description: 'Export as PNG with transparent background', estimatedTime: '30s', dependencies: ['generate'] },
  ],
  prompt: { systemPrompt: 'You are a Shopify product photographer. Create professional product images at 2000×2000px with clean e-commerce styling.', userPromptTemplate: 'Generate 2000×2000px product image for {{productName}}. Style: {{stylePreference}}. Angle: {{angleChoice}}. Studio lighting, transparent background.', variables: ['productName', 'stylePreference', 'angleChoice'] },
});

const shopifyCollectionBanner = defineSkill({
  id: 'shopify-collection-banner',
  name: 'Shopify Collection Banner',
  category: 'image',
  description: 'Create collection page banners (1200×400) with themed visuals and optional text overlay.',
  supportedPlatforms: ['shopify'],
  supportedModels: ['recraft', 'flux'],
  icon: 'Layout',
  tags: ['official'],
  estimatedTime: '~3min',
  requiresConnection: true,
  input: { required: ['collectionName', 'collectionTheme'], properties: { collectionName: { type: 'string', description: 'Collection name' }, collectionTheme: { type: 'string', description: 'Visual theme for the collection' }, headlineText: { type: 'string', description: 'Optional text overlay on banner' } } },
  output: { type: 'image', description: '1200×400px collection banner', format: 'url' },
  steps: [
    { id: 'theme-research', name: 'Collection Theme', description: 'Research and define collection visual theme', estimatedTime: '45s' },
    { id: 'banner-design', name: 'Banner Design', description: 'Design banner with themed visuals and text overlay', estimatedTime: '90s', dependencies: ['theme-research'] },
    { id: 'export', name: 'Export', description: 'Export as WebP optimized for web', estimatedTime: '15s', dependencies: ['banner-design'] },
  ],
  prompt: { systemPrompt: 'You design Shopify collection banners that drive engagement and showcase product themes.', userPromptTemplate: 'Design a 1200×400px collection banner for {{collectionName}}. Theme: {{collectionTheme}}. Text overlay: {{headlineText}}.', variables: ['collectionName', 'collectionTheme', 'headlineText'] },
});

const shopifySeoTitle = defineSkill({
  id: 'shopify-seo-title',
  name: 'Shopify SEO Title & Meta',
  category: 'seo',
  description: 'Generate SEO title (max 70 chars) and meta description (max 160 chars) for Shopify products.',
  supportedPlatforms: ['shopify'],
  supportedModels: ['gpt-4'],
  icon: 'Search',
  tags: ['official'],
  estimatedTime: '~2min',
  requiresConnection: true,
  input: { required: ['productName', 'primaryKeyword'], properties: { productName: { type: 'string', description: 'Product name' }, primaryKeyword: { type: 'string', description: 'Primary SEO keyword' }, secondaryKeywords: { type: 'array', description: 'Secondary keywords' } } },
  output: { type: 'object', description: 'SEO title (max 70 chars) and meta description (max 160 chars)', format: 'json' },
  steps: [
    { id: 'keyword-analysis', name: 'Keyword Analysis', description: 'Analyze and prioritize keywords for maximum impact', estimatedTime: '30s' },
    { id: 'title-draft', name: 'Title Draft', description: 'Draft SEO title under 70 characters with primary keyword', estimatedTime: '30s', dependencies: ['keyword-analysis'] },
    { id: 'meta-draft', name: 'Meta Description', description: 'Draft meta description under 160 characters with CTA', estimatedTime: '30s', dependencies: ['title-draft'] },
    { id: 'validate', name: 'Validate', description: 'Validate character counts and keyword placement', estimatedTime: '15s', dependencies: ['meta-draft'] },
  ],
  prompt: { systemPrompt: 'You are a Shopify SEO specialist. Create optimized titles and meta descriptions that drive click-through.', userPromptTemplate: 'Create SEO title (max 70 chars) and meta description (max 160 chars) for {{productName}}. Primary keyword: {{primaryKeyword}}. Secondary: {{secondaryKeywords}}.', variables: ['productName', 'primaryKeyword', 'secondaryKeywords'] },
});

const shopifyProductDescription = defineSkill({
  id: 'shopify-product-description',
  name: 'Shopify Product Description',
  category: 'copywriting',
  description: 'Generate a rich, HTML-formatted Shopify product description with features, benefits, and specifications.',
  supportedPlatforms: ['shopify'],
  supportedModels: ['gpt-4'],
  icon: 'FileText',
  tags: ['official'],
  estimatedTime: '~4min',
  requiresConnection: true,
  input: { required: ['productName', 'keyFeatures'], properties: { productName: { type: 'string', description: 'Product name' }, keyFeatures: { type: 'array', description: 'Key product features' }, painPoints: { type: 'array', description: 'Customer pain points addressed' }, brandTone: { type: 'string', description: 'Brand voice and tone' } } },
  output: { type: 'text', description: 'HTML-formatted product description', format: 'html' },
  steps: [
    { id: 'structure', name: 'Structure', description: 'Outline description sections (headline, features, benefits, specs)', estimatedTime: '45s' },
    { id: 'draft', name: 'Draft', description: 'Write full description copy in brand tone', estimatedTime: '90s', dependencies: ['structure'] },
    { id: 'html-format', name: 'HTML Format', description: 'Apply HTML formatting with <p>, <ul>, <strong>, <table>', estimatedTime: '45s', dependencies: ['draft'] },
    { id: 'review', name: 'Review', description: 'Final review for clarity, SEO, and conversion optimization', estimatedTime: '30s', dependencies: ['html-format'] },
  ],
  prompt: { systemPrompt: 'You write conversion-optimized Shopify product descriptions with clean HTML formatting.', userPromptTemplate: 'Write a product description for {{productName}}. Features: {{keyFeatures}}. Pain points: {{painPoints}}. Brand tone: {{brandTone}}. Use HTML formatting.', variables: ['productName', 'keyFeatures', 'painPoints', 'brandTone'] },
});

const shopifyAltText = defineSkill({
  id: 'shopify-alt-text',
  name: 'Shopify Alt Text',
  category: 'seo',
  description: 'Generate SEO-optimized alt text for all Shopify product images with descriptive, keyword-rich copy.',
  supportedPlatforms: ['shopify'],
  supportedModels: ['gpt-4'],
  icon: 'Eye',
  tags: ['official'],
  estimatedTime: '~2min',
  requiresConnection: true,
  input: { required: ['productName', 'imageDescriptions'], properties: { productName: { type: 'string', description: 'Product name' }, imageDescriptions: { type: 'array', description: 'Description of each product image' }, primaryKeyword: { type: 'string', description: 'Primary SEO keyword' } } },
  output: { type: 'object', description: 'Alt text entries per image (max 125 chars each)', format: 'json' },
  steps: [
    { id: 'image-scan', name: 'Image Scan', description: 'Analyze each image context and content', estimatedTime: '30s' },
    { id: 'descriptive-text', name: 'Descriptive Text', description: 'Write accurate, descriptive alt text per image', estimatedTime: '45s', dependencies: ['image-scan'] },
    { id: 'seo-keywords', name: 'SEO Keywords', description: 'Infuse relevant keywords naturally', estimatedTime: '20s', dependencies: ['descriptive-text'] },
    { id: 'export', name: 'Export', description: 'Export alt text as CSV for bulk upload', estimatedTime: '10s', dependencies: ['seo-keywords'] },
  ],
  prompt: { systemPrompt: 'You write SEO-optimized alt text for Shopify product images. Descriptive, keyword-rich, under 125 characters.', userPromptTemplate: 'Generate alt text for {{imageDescriptions.length}} images of {{productName}}. Descriptions: {{imageDescriptions}}. Keyword: {{primaryKeyword}}.', variables: ['productName', 'imageDescriptions', 'primaryKeyword'] },
});

const shopifyBlogPost = defineSkill({
  id: 'shopify-blog-post',
  name: 'Shopify Blog Post',
  category: 'copywriting',
  description: 'Generate an SEO-optimized blog post for Shopify content marketing and product promotion.',
  supportedPlatforms: ['shopify'],
  supportedModels: ['gpt-4'],
  icon: 'PenTool',
  tags: ['official'],
  estimatedTime: '~6min',
  requiresConnection: true,
  input: { required: ['blogTopic', 'targetKeywords'], properties: { blogTopic: { type: 'string', description: 'Blog post topic' }, targetKeywords: { type: 'array', description: 'Target SEO keywords' }, wordCount: { type: 'number', description: 'Target word count' }, contentGoal: { type: 'string', description: 'Content goal (educate, sell, awareness)' } } },
  output: { type: 'text', description: 'SEO-optimized blog post with metadata', format: 'markdown' },
  steps: [
    { id: 'topic-research', name: 'Topic Research', description: 'Research topic and keyword opportunities', estimatedTime: '60s' },
    { id: 'outline', name: 'Outline', description: 'Create blog post outline with H2 sections', estimatedTime: '60s', dependencies: ['topic-research'] },
    { id: 'draft', name: 'Draft', description: 'Write full blog post draft', estimatedTime: '120s', dependencies: ['outline'] },
    { id: 'seo-optimize', name: 'SEO Optimize', description: 'Optimize meta, headers, and internal links for SEO', estimatedTime: '45s', dependencies: ['draft'] },
  ],
  prompt: { systemPrompt: 'You are a Shopify content marketing writer. Create SEO blog posts that drive organic traffic and conversions.', userPromptTemplate: 'Write a {{wordCount}}-word blog post about {{blogTopic}}. Keywords: {{targetKeywords}}. Goal: {{contentGoal}}. Include product mentions naturally.', variables: ['blogTopic', 'targetKeywords', 'wordCount', 'contentGoal'] },
});

const shopifyEmailTemplate = defineSkill({
  id: 'shopify-email-template',
  name: 'Shopify Email Template',
  category: 'copywriting',
  description: 'Generate abandoned cart recovery and product launch email templates with brand styling.',
  supportedPlatforms: ['shopify'],
  supportedModels: ['gpt-4'],
  icon: 'Mail',
  tags: ['official'],
  estimatedTime: '~3min',
  requiresConnection: true,
  input: { required: ['emailType', 'storeName'], properties: { emailType: { type: 'string', description: 'Email type', enum: ['abandoned-cart', 'product-launch', 'welcome'] }, storeName: { type: 'string', description: 'Store name' }, heroOffer: { type: 'string', description: 'Hero section offer text' }, brandColors: { type: 'array', description: 'Brand hex colors' } } },
  output: { type: 'text', description: 'HTML email template with brand styling', format: 'html' },
  steps: [
    { id: 'template-selection', name: 'Template Selection', description: 'Select email template structure based on type', estimatedTime: '30s' },
    { id: 'content-fill', name: 'Content Fill', description: 'Fill template with branded copy and product content', estimatedTime: '90s', dependencies: ['template-selection'] },
    { id: 'brand-styling', name: 'Brand Styling', description: 'Apply brand colors, logo, and styling to template', estimatedTime: '45s', dependencies: ['content-fill'] },
  ],
  prompt: { systemPrompt: 'You create branded Shopify email templates for abandoned cart recovery and product launches.', userPromptTemplate: 'Create a {{emailType}} email template for {{storeName}}. Hero offer: {{heroOffer}}. Brand colors: {{brandColors}}. Include product grid and CTA.', variables: ['emailType', 'storeName', 'heroOffer', 'brandColors'] },
});

const shopifyPublish = defineSkill({
  id: 'shopify-publish',
  name: 'Shopify Publish',
  category: 'publishing',
  description: 'Auto-publish a complete product listing to the Shopify store via Admin API.',
  supportedPlatforms: ['shopify'],
  supportedModels: ['gpt-4'],
  icon: 'Upload',
  tags: ['official'],
  estimatedTime: '~3min',
  requiresConnection: true,
  input: { required: ['productData', 'storeDomain'], properties: { productData: { type: 'object', description: 'Complete product data JSON' }, storeDomain: { type: 'string', description: 'Shopify store domain' }, collectionHandle: { type: 'string', description: 'Target collection handle' }, publishStatus: { type: 'string', description: 'Publish status', enum: ['draft', 'active'] } } },
  output: { type: 'object', description: 'Published product confirmation with admin URL', format: 'json' },
  steps: [
    { id: 'data-map', name: 'Data Map', description: 'Map product fields to Shopify Admin API schema', estimatedTime: '45s' },
    { id: 'api-upload', name: 'API Upload', description: 'Upload images and create product via REST API', estimatedTime: '90s', dependencies: ['data-map'] },
    { id: 'verify', name: 'Verify', description: 'Verify published listing at admin URL', estimatedTime: '30s', dependencies: ['api-upload'] },
  ],
  prompt: { systemPrompt: 'You publish products to Shopify stores via the Admin API with full data mapping and validation.', userPromptTemplate: 'Publish {{productData.name}} to {{storeDomain}}. Collection: {{collectionHandle}}. Status: {{publishStatus}}. Map all fields to Shopify schema.', variables: ['productData', 'storeDomain', 'collectionHandle', 'publishStatus'] },
});

registry.register(shopifyProductImages);
registry.register(shopifyCollectionBanner);
registry.register(shopifySeoTitle);
registry.register(shopifyProductDescription);
registry.register(shopifyAltText);
registry.register(shopifyBlogPost);
registry.register(shopifyEmailTemplate);
registry.register(shopifyPublish);

export const skills = [shopifyProductImages, shopifyCollectionBanner, shopifySeoTitle, shopifyProductDescription, shopifyAltText, shopifyBlogPost, shopifyEmailTemplate, shopifyPublish];
