import { defineSkill } from '../helpers';
import { registry } from '../registry';

const performanceAnalyzer = defineSkill({
  id: 'performance-analyzer',
  name: 'Performance Analyzer',
  category: 'analytics',
  description: 'Analyzes listing performance across CTR, CVR, orders, revenue.',
  supportedPlatforms: ['amazon', 'shopify', 'shopee', 'lazada', 'ebay', 'generic'],
  supportedModels: ['gpt-4', 'claude'],
  icon: 'TrendingUp',
  tags: ['official'],
  estimatedTime: '~1 min',
  input: {
    required: ['listingData', 'dateRange'],
    properties: {
      listingData: { type: 'object', description: 'Listing performance data' },
      dateRange: { type: 'object', description: 'Analysis date range' },
      metrics: { type: 'string[]', description: 'Metrics to analyze', enum: ['ctr', 'cvr', 'orders', 'revenue', 'acos', 'roas'] },
    },
  },
  output: { type: 'object', description: 'Performance analysis report', format: 'json', example: '{ summary, trends, recommendations }' },
  steps: [
    { id: 'fetch', name: 'Fetch Data', description: 'Retrieve performance data', estimatedTime: '10s' },
    { id: 'calculate', name: 'Calculate Metrics', description: 'Compute key performance indicators', estimatedTime: '15s', dependencies: ['fetch'] },
    { id: 'trends', name: 'Identify Trends', description: 'Detect patterns and anomalies', estimatedTime: '15s', dependencies: ['calculate'] },
    { id: 'report', name: 'Generate Report', description: 'Compile analysis report with recommendations', estimatedTime: '10s', dependencies: ['trends'] },
  ],
  prompt: {
    systemPrompt: 'You are an e-commerce performance analyst.',
    userPromptTemplate: 'Analyze performance for {{listingData}} over {{dateRange}} focusing on {{metrics}}.',
    variables: ['listingData', 'dateRange', 'metrics'],
  },
});

const competitorAnalyzer = defineSkill({
  id: 'competitor-analyzer',
  name: 'Competitor Analyzer',
  category: 'analytics',
  description: 'Analyzes competitor listings and identifies improvement opportunities.',
  supportedPlatforms: ['amazon', 'shopify', 'shopee', 'lazada', 'generic'],
  supportedModels: ['gpt-4', 'gemini'],
  icon: 'Target',
  tags: ['premium'],
  estimatedTime: '~2 min',
  input: {
    required: ['targetMarket', 'productCategory'],
    properties: {
      targetMarket: { type: 'string', description: 'Target market', enum: ['us', 'uk', 'de', 'jp', 'fr', 'ca'] },
      productCategory: { type: 'string', description: 'Product category' },
      asins: { type: 'string[]', description: 'Specific competitor ASINs to analyze' },
    },
  },
  output: { type: 'object', description: 'Competitive analysis report', format: 'json', example: '{ competitors, gaps, recommendations }' },
  steps: [
    { id: 'identify', name: 'Identify Competitors', description: 'Find top competitors in category', estimatedTime: '30s' },
    { id: 'compare', name: 'Compare Listings', description: 'Analyze competitor titles, images, pricing', estimatedTime: '45s', dependencies: ['identify'] },
    { id: 'gaps', name: 'Find Gaps', description: 'Identify content and keyword gaps', estimatedTime: '15s', dependencies: ['compare'] },
    { id: 'recommend', name: 'Recommend', description: 'Generate actionable optimization recommendations', estimatedTime: '15s', dependencies: ['gaps'] },
  ],
  prompt: {
    systemPrompt: 'You are a competitive intelligence analyst for e-commerce.',
    userPromptTemplate: 'Analyze competitors for {{productCategory}} in {{targetMarket}} market.',
    variables: ['targetMarket', 'productCategory', 'asins'],
  },
});

registry.register(performanceAnalyzer);
registry.register(competitorAnalyzer);

export const skills = [performanceAnalyzer, competitorAnalyzer];
