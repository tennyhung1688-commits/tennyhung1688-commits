import { defineSkill } from '../../helpers';
import { registry } from '../../registry';

const amazonTitle = defineSkill({
  id: 'amazon-title',
  name: 'Amazon Title Generator',
  category: 'copywriting',
  description: 'Generate optimized product title, max 200 characters. Format: [Brand] + [Model] + [Key Feature] + [Size/Color].',
  supportedPlatforms: ['amazon'],
  supportedModels: ['gpt-4', 'claude'],
  icon: 'Type',
  tags: ['official'],
  estimatedTime: '~2min',
  requiresConnection: true,
  input: { required: ['productName', 'brand', 'keywords'], properties: { productName: { type: 'string', description: 'Product name' }, brand: { type: 'string', description: 'Brand name' }, keywords: { type: 'array', description: 'Target keywords' }, model: { type: 'string', description: 'Model number' }, sizeColor: { type: 'string', description: 'Size or color variant' } } },
  output: { type: 'string', description: 'Optimized Amazon product title', format: 'text' },
  steps: [
    { id: 'keyword-research', name: 'Keyword Research', description: 'Research and prioritize target keywords', estimatedTime: '30s' },
    { id: 'structure', name: 'Structure', description: 'Structure title by Amazon best practices', estimatedTime: '20s', dependencies: ['keyword-research'] },
    { id: 'generate', name: 'Generate', description: 'Generate title with all components', estimatedTime: '20s', dependencies: ['structure'] },
    { id: 'length-check', name: 'Length Check', description: 'Verify title is under 200 characters', estimatedTime: '10s', dependencies: ['generate'] },
  ],
  prompt: { systemPrompt: 'You are an Amazon listing copywriter specializing in SEO-optimized titles.', userPromptTemplate: 'Generate Amazon title (max 200 chars) for {{productName}}. Brand: {{brand}}. Keywords: {{keywords}}. Model: {{model}}. Size/Color: {{sizeColor}}.', variables: ['productName', 'brand', 'keywords', 'model', 'sizeColor'] },
});

const amazonBullets = defineSkill({
  id: 'amazon-bullets',
  name: 'Amazon Bullet Points',
  category: 'copywriting',
  description: 'Generate 5 bullet points, max 500 chars each. Focus on benefits not features.',
  supportedPlatforms: ['amazon'],
  supportedModels: ['gpt-4'],
  icon: 'List',
  tags: ['official'],
  estimatedTime: '~3min',
  requiresConnection: true,
  input: { required: ['productName', 'features'], properties: { productName: { type: 'string', description: 'Product name' }, features: { type: 'array', description: 'Product features' }, targetAudience: { type: 'string', description: 'Target audience' } } },
  output: { type: 'array', description: '5 optimized bullet points', format: 'json' },
  steps: [
    { id: 'feature-extract', name: 'Feature Extraction', description: 'Extract key features from product data', estimatedTime: '30s' },
    { id: 'benefit-translate', name: 'Benefit Translation', description: 'Translate features into customer benefits', estimatedTime: '60s', dependencies: ['feature-extract'] },
    { id: 'priority', name: 'Priority Ordering', description: 'Order bullets by conversion impact', estimatedTime: '30s', dependencies: ['benefit-translate'] },
    { id: 'compliance', name: 'Compliance Check', description: 'Check for Amazon policy compliance', estimatedTime: '20s', dependencies: ['priority'] },
  ],
  prompt: { systemPrompt: 'You are an Amazon copywriter. Write benefit-focused bullet points. No promotional language, no pricing, no shipping claims.', userPromptTemplate: 'Write 5 bullet points (max 500 chars each) for {{productName}}. Features: {{features}}. Target: {{targetAudience}}.', variables: ['productName', 'features', 'targetAudience'] },
});

const amazonDescription = defineSkill({
  id: 'amazon-description',
  name: 'Amazon Product Description',
  category: 'copywriting',
  description: 'Product description (max 2000 chars). HTML tags allowed: br, b, i only.',
  supportedPlatforms: ['amazon'],
  supportedModels: ['gpt-4'],
  icon: 'FileText',
  tags: ['official'],
  estimatedTime: '~3min',
  requiresConnection: true,
  input: { required: ['productName', 'features'], properties: { productName: { type: 'string', description: 'Product name' }, features: { type: 'array', description: 'Key features and benefits' }, brandStory: { type: 'string', description: 'Brand background' } } },
  output: { type: 'string', description: 'HTML-formatted product description', format: 'html' },
  steps: [
    { id: 'outline', name: 'Outline', description: 'Create description outline structure', estimatedTime: '30s' },
    { id: 'draft', name: 'Draft', description: 'Write full product description draft', estimatedTime: '60s', dependencies: ['outline'] },
    { id: 'html-format', name: 'HTML Format', description: 'Format with allowed HTML tags (br, b, i)', estimatedTime: '15s', dependencies: ['draft'] },
    { id: 'review', name: 'Review', description: 'Review for length and compliance', estimatedTime: '20s', dependencies: ['html-format'] },
  ],
  prompt: { systemPrompt: 'You write Amazon product descriptions. Use only br, b, i HTML tags. Max 2000 characters.', userPromptTemplate: 'Write product description (max 2000 chars) for {{productName}}. Features: {{features}}. Brand story: {{brandStory}}. Use only br, b, i HTML tags.', variables: ['productName', 'features', 'brandStory'] },
});

const amazonAplusComparison = defineSkill({
  id: 'amazon-aplus-comparison',
  name: 'A+ Content: Comparison Module',
  category: 'copywriting',
  description: 'A+ Content Comparison Chart module (up to 16 products).',
  supportedPlatforms: ['amazon'],
  supportedModels: ['gpt-4'],
  icon: 'Table2',
  tags: ['official'],
  estimatedTime: '~5min',
  requiresConnection: true,
  input: { required: ['products', 'attributes'], properties: { products: { type: 'array', description: 'Products to compare (max 16)' }, attributes: { type: 'array', description: 'Comparison attributes' } } },
  output: { type: 'object', description: 'Comparison chart data for A+ Content', format: 'json' },
  steps: [
    { id: 'competitor-data', name: 'Competitor Data', description: 'Gather comparison product data', estimatedTime: '60s' },
    { id: 'feature-matrix', name: 'Feature Matrix', description: 'Build comparison feature matrix', estimatedTime: '90s', dependencies: ['competitor-data'] },
    { id: 'table-design', name: 'Table Design', description: 'Design comparison table structure', estimatedTime: '45s', dependencies: ['feature-matrix'] },
    { id: 'export', name: 'Export', description: 'Export A+ comparison module data', estimatedTime: '15s', dependencies: ['table-design'] },
  ],
  prompt: { systemPrompt: 'You create Amazon A+ Content comparison charts.', userPromptTemplate: 'Create A+ comparison module for products: {{products}}. Compare attributes: {{attributes}}. Max 16 products.', variables: ['products', 'attributes'] },
});

const amazonAplusText = defineSkill({
  id: 'amazon-aplus-text',
  name: 'A+ Content: Standard Text',
  category: 'copywriting',
  description: 'A+ Content Standard Text modules with headlines and body copy.',
  supportedPlatforms: ['amazon'],
  supportedModels: ['gpt-4'],
  icon: 'AlignLeft',
  tags: ['official'],
  estimatedTime: '~4min',
  requiresConnection: true,
  input: { required: ['productName', 'sections'], properties: { productName: { type: 'string', description: 'Product name' }, sections: { type: 'array', description: 'Content sections with image pairings' } } },
  output: { type: 'object', description: 'A+ Text module content', format: 'json' },
  steps: [
    { id: 'content-structure', name: 'Content Structure', description: 'Structure A+ text content flow', estimatedTime: '60s' },
    { id: 'headline', name: 'Headline', description: 'Write compelling module headlines', estimatedTime: '30s', dependencies: ['content-structure'] },
    { id: 'body', name: 'Body', description: 'Write body copy per module section', estimatedTime: '60s', dependencies: ['headline'] },
    { id: 'image-pairing', name: 'Image Pairing', description: 'Pair text modules with appropriate images', estimatedTime: '30s', dependencies: ['body'] },
  ],
  prompt: { systemPrompt: 'You write Amazon A+ Content text modules with compelling copy.', userPromptTemplate: 'Create A+ text modules for {{productName}}. Sections: {{sections}}. Headline + body per module.', variables: ['productName', 'sections'] },
});

const amazonBrandStory = defineSkill({
  id: 'amazon-brand-story',
  name: 'Amazon Brand Story',
  category: 'copywriting',
  description: 'Amazon Brand Story module (up to 19 modules) for Brand Store.',
  supportedPlatforms: ['amazon'],
  supportedModels: ['gpt-4', 'claude'],
  icon: 'BookOpen',
  tags: ['official'],
  estimatedTime: '~6min',
  requiresConnection: true,
  input: { required: ['brandName', 'foundingStory'], properties: { brandName: { type: 'string', description: 'Brand name' }, foundingStory: { type: 'string', description: 'Brand founding background' }, productFocus: { type: 'string', description: 'Product focus area' }, values: { type: 'array', description: 'Brand values' } } },
  output: { type: 'object', description: 'Brand Story module content (up to 19 modules)', format: 'json' },
  steps: [
    { id: 'brand-background', name: 'Brand Background', description: 'Research and structure brand background', estimatedTime: '60s' },
    { id: 'founder-story', name: 'Founder Story', description: 'Craft compelling founder narrative', estimatedTime: '60s', dependencies: ['brand-background'] },
    { id: 'product-focus', name: 'Product Focus', description: 'Link product line to brand story', estimatedTime: '45s', dependencies: ['founder-story'] },
    { id: 'module-assembly', name: 'Module Assembly', description: 'Assemble up to 19 brand story modules', estimatedTime: '60s', dependencies: ['product-focus'] },
  ],
  prompt: { systemPrompt: 'You are an Amazon Brand Story writer. Create authentic, compelling brand narratives.', userPromptTemplate: 'Create Brand Story for {{brandName}}. Founding story: {{foundingStory}}. Product focus: {{productFocus}}. Values: {{values}}. Up to 19 modules.', variables: ['brandName', 'foundingStory', 'productFocus', 'values'] },
});

const amazonBackendTerms = defineSkill({
  id: 'amazon-backend-terms',
  name: 'Amazon Backend Search Terms',
  category: 'copywriting',
  description: 'Generate 250 bytes of backend search terms. No brand names, ASINs, or subjective claims.',
  supportedPlatforms: ['amazon'],
  supportedModels: ['gpt-4'],
  icon: 'SearchCode',
  tags: ['official'],
  estimatedTime: '~2min',
  requiresConnection: true,
  input: { required: ['productName', 'category'], properties: { productName: { type: 'string', description: 'Product name' }, category: { type: 'string', description: 'Product category' }, seedKeywords: { type: 'array', description: 'Seed keywords' } } },
  output: { type: 'string', description: 'Backend search terms under 250 bytes', format: 'text' },
  steps: [
    { id: 'keyword-mining', name: 'Keyword Mining', description: 'Mine relevant search terms from seed keywords', estimatedTime: '30s' },
    { id: 'deduplication', name: 'Deduplication', description: 'Remove duplicate and redundant terms', estimatedTime: '20s', dependencies: ['keyword-mining'] },
    { id: 'volume-sorting', name: 'Volume Sorting', description: 'Sort terms by search volume priority', estimatedTime: '15s', dependencies: ['deduplication'] },
    { id: 'byte-check', name: 'Byte Check', description: 'Verify under 250 bytes, no brand names or ASINs', estimatedTime: '15s', dependencies: ['volume-sorting'] },
  ],
  prompt: { systemPrompt: 'You generate Amazon backend search terms. No brand names, no ASINs, no subjective claims (best, amazing). Space-separated, max 250 bytes.', userPromptTemplate: 'Generate backend search terms for {{productName}} in {{category}}. Seed keywords: {{seedKeywords}}. Max 250 bytes.', variables: ['productName', 'category', 'seedKeywords'] },
});

const amazonSubjectMatter = defineSkill({
  id: 'amazon-subject-matter',
  name: 'Amazon Subject Matter',
  category: 'copywriting',
  description: 'Auto-fill Subject Matter fields: country of origin, hazmat warnings, compliance data.',
  supportedPlatforms: ['amazon'],
  supportedModels: ['gpt-4'],
  icon: 'ClipboardCheck',
  tags: ['official'],
  estimatedTime: '~1min',
  requiresConnection: true,
  input: { required: ['productData'], properties: { productData: { type: 'object', description: 'Product compliance and origin data' } } },
  output: { type: 'object', description: 'Completed subject matter fields', format: 'json' },
  steps: [
    { id: 'field-mapping', name: 'Field Mapping', description: 'Map product data to subject matter fields', estimatedTime: '20s' },
    { id: 'validation', name: 'Data Validation', description: 'Validate required compliance data', estimatedTime: '15s', dependencies: ['field-mapping'] },
    { id: 'auto-fill', name: 'Auto-fill', description: 'Auto-fill subject matter fields', estimatedTime: '10s', dependencies: ['validation'] },
  ],
  prompt: { systemPrompt: 'You auto-fill Amazon Subject Matter fields with compliance data.', userPromptTemplate: 'Fill Subject Matter fields for: {{productData}}. Country of origin, hazmat, compliance.', variables: ['productData'] },
});

registry.register(amazonTitle);
registry.register(amazonBullets);
registry.register(amazonDescription);
registry.register(amazonAplusComparison);
registry.register(amazonAplusText);
registry.register(amazonBrandStory);
registry.register(amazonBackendTerms);
registry.register(amazonSubjectMatter);

export const skills = [amazonTitle, amazonBullets, amazonDescription, amazonAplusComparison, amazonAplusText, amazonBrandStory, amazonBackendTerms, amazonSubjectMatter];
