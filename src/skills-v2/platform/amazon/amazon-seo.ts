import { defineSkill } from '../../helpers';
import { registry } from '../../registry';

const amazonKeywordResearch = defineSkill({
  id: 'amazon-keyword-research',
  name: 'Amazon Keyword Research',
  category: 'seo',
  description: 'Find high-volume, low-competition keywords for Amazon listing optimization.',
  supportedPlatforms: ['amazon'],
  supportedModels: ['gpt-4'],
  icon: 'Search',
  tags: ['official'],
  estimatedTime: '~4min',
  requiresConnection: true,
  input: { required: ['productName', 'category'], properties: { productName: { type: 'string', description: 'Product name' }, category: { type: 'string', description: 'Product category' }, seedKeywords: { type: 'array', description: 'Initial seed keywords' } } },
  output: { type: 'object', description: 'Keyword research report with volume and competition', format: 'json' },
  steps: [
    { id: 'seed', name: 'Seed Keywords', description: 'Expand from seed keywords into related terms', estimatedTime: '45s' },
    { id: 'volume-analysis', name: 'Volume Analysis', description: 'Estimate search volume per keyword', estimatedTime: '60s', dependencies: ['seed'] },
    { id: 'competition-check', name: 'Competition Check', description: 'Assess competition level per keyword', estimatedTime: '45s', dependencies: ['volume-analysis'] },
    { id: 'long-tail', name: 'Long-tail Discovery', description: 'Discover long-tail keyword opportunities', estimatedTime: '45s', dependencies: ['competition-check'] },
  ],
  prompt: { systemPrompt: 'You are an Amazon SEO keyword research specialist. Find high-volume, low-competition keywords.', userPromptTemplate: 'Research keywords for {{productName}} in {{category}}. Seed keywords: {{seedKeywords}}. Focus on high volume, low competition long-tail.', variables: ['productName', 'category', 'seedKeywords'] },
});

const amazonListingAudit = defineSkill({
  id: 'amazon-listing-audit',
  name: 'Amazon Listing SEO Audit',
  category: 'seo',
  description: 'Complete listing SEO audit with scoring across all listing elements.',
  supportedPlatforms: ['amazon'],
  supportedModels: ['gpt-4'],
  icon: 'FileSearch',
  tags: ['official'],
  estimatedTime: '~5min',
  requiresConnection: true,
  input: { required: ['asin'], properties: { asin: { type: 'string', description: 'Amazon ASIN to audit' }, marketplace: { type: 'string', description: 'Marketplace', enum: ['us', 'uk', 'de', 'jp', 'ca'] } } },
  output: { type: 'object', description: 'SEO audit report with scores and recommendations', format: 'json' },
  steps: [
    { id: 'title-analysis', name: 'Title Analysis', description: 'Analyze title for keyword coverage and length', estimatedTime: '60s' },
    { id: 'bullet-check', name: 'Bullet Check', description: 'Evaluate bullet points for SEO effectiveness', estimatedTime: '45s', dependencies: ['title-analysis'] },
    { id: 'description-review', name: 'Description Review', description: 'Review product description for keyword density', estimatedTime: '45s', dependencies: ['bullet-check'] },
    { id: 'backend-terms', name: 'Backend Terms', description: 'Audit backend search terms utilization', estimatedTime: '30s', dependencies: ['description-review'] },
    { id: 'score', name: 'Score', description: 'Calculate overall SEO completeness score', estimatedTime: '30s', dependencies: ['backend-terms'] },
  ],
  prompt: { systemPrompt: 'You audit Amazon listings for SEO completeness and provide actionable recommendations.', userPromptTemplate: 'Audit Amazon listing {{asin}} in {{marketplace}} marketplace. Score all listing elements and provide improvement recommendations.', variables: ['asin', 'marketplace'] },
});

const amazonCompetitiveGap = defineSkill({
  id: 'amazon-competitive-gap',
  name: 'Amazon Competitive Gap Analysis',
  category: 'seo',
  description: 'Compare listing against top 10 competitors to identify keyword and feature gaps.',
  supportedPlatforms: ['amazon'],
  supportedModels: ['gpt-4', 'claude'],
  icon: 'GanttChart',
  tags: ['official'],
  estimatedTime: '~6min',
  requiresConnection: true,
  input: { required: ['asin', 'keywords'], properties: { asin: { type: 'string', description: 'Your product ASIN' }, keywords: { type: 'array', description: 'Target keywords' }, competitorAsins: { type: 'array', description: 'Competitor ASINs (optional, auto-detected)' } } },
  output: { type: 'object', description: 'Competitive gap analysis report', format: 'json' },
  steps: [
    { id: 'competitor-scan', name: 'Competitor Scan', description: 'Scan top 10 competitors for target keywords', estimatedTime: '90s' },
    { id: 'feature-comparison', name: 'Feature Comparison', description: 'Compare product features and attributes', estimatedTime: '90s', dependencies: ['competitor-scan'] },
    { id: 'keyword-gap', name: 'Keyword Gap', description: 'Identify missing keyword opportunities', estimatedTime: '60s', dependencies: ['feature-comparison'] },
    { id: 'recommendations', name: 'Recommendations', description: 'Generate actionable recommendations', estimatedTime: '45s', dependencies: ['keyword-gap'] },
  ],
  prompt: { systemPrompt: 'You analyze Amazon competitive landscape to find listing gaps and opportunities.', userPromptTemplate: 'Analyze competitive gap for ASIN {{asin}}. Keywords: {{keywords}}. Compare against top 10 competitors. Find feature and keyword gaps.', variables: ['asin', 'keywords', 'competitorAsins'] },
});

const amazonCategoryOptimizer = defineSkill({
  id: 'amazon-category-optimizer',
  name: 'Amazon Category Optimizer',
  category: 'seo',
  description: 'Find optimal browse node and subcategory for maximum product visibility.',
  supportedPlatforms: ['amazon'],
  supportedModels: ['gpt-4'],
  icon: 'FolderTree',
  tags: ['official'],
  estimatedTime: '~3min',
  requiresConnection: true,
  input: { required: ['productName', 'category'], properties: { productName: { type: 'string', description: 'Product name' }, category: { type: 'string', description: 'Current category' }, features: { type: 'array', description: 'Product features' } } },
  output: { type: 'object', description: 'Optimal browse node recommendation', format: 'json' },
  steps: [
    { id: 'product-analysis', name: 'Product Analysis', description: 'Analyze product type and attributes', estimatedTime: '30s' },
    { id: 'category-tree', name: 'Category Tree', description: 'Navigate Amazon category tree', estimatedTime: '45s', dependencies: ['product-analysis'] },
    { id: 'node-matching', name: 'Node Matching', description: 'Match product to optimal browse nodes', estimatedTime: '45s', dependencies: ['category-tree'] },
    { id: 'recommendation', name: 'Recommendation', description: 'Provide best-fit category recommendation', estimatedTime: '20s', dependencies: ['node-matching'] },
  ],
  prompt: { systemPrompt: 'You are an Amazon category taxonomy expert. Find optimal browse nodes for maximum visibility.', userPromptTemplate: 'Find optimal browse node for {{productName}} currently in {{category}}. Features: {{features}}. Recommend best category path.', variables: ['productName', 'category', 'features'] },
});

registry.register(amazonKeywordResearch);
registry.register(amazonListingAudit);
registry.register(amazonCompetitiveGap);
registry.register(amazonCategoryOptimizer);

export const skills = [amazonKeywordResearch, amazonListingAudit, amazonCompetitiveGap, amazonCategoryOptimizer];
