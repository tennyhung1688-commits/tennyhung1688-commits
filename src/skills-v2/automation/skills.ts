import { defineSkill } from '../helpers';
import { registry } from '../registry';

const autoRestockAlert = defineSkill({
  id: 'auto-restock-alert',
  name: 'Auto Restock Alert',
  category: 'automation',
  description: 'Monitors inventory and generates restock alerts with optimized reorder quantities.',
  supportedPlatforms: ['amazon', 'shopify', 'shopee', 'generic'],
  supportedModels: ['gpt-4'],
  icon: 'Bell',
  tags: ['official'],
  estimatedTime: '~30s',
  input: {
    required: ['productSKU', 'threshold'],
    properties: {
      productSKU: { type: 'string', description: 'Product SKU to monitor' },
      threshold: { type: 'number', description: 'Low stock threshold' },
      warehouseLocation: { type: 'string', description: 'Warehouse or FBA location' },
    },
  },
  output: { type: 'object', description: 'Restock alert with recommended quantity', format: 'json', example: '{ sku, currentStock, reorderQty, urgency }' },
  steps: [
    { id: 'monitor', name: 'Monitor Stock', description: 'Check current inventory level', estimatedTime: '5s' },
    { id: 'forecast', name: 'Check Demand Forecast', description: 'Analyze demand and lead time', estimatedTime: '10s', dependencies: ['monitor'] },
    { id: 'calculate', name: 'Calculate Reorder', description: 'Calculate optimal reorder quantity', estimatedTime: '5s', dependencies: ['forecast'] },
    { id: 'alert', name: 'Generate Alert', description: 'Create alert with urgency level', estimatedTime: '5s', dependencies: ['calculate'] },
  ],
  prompt: {
    systemPrompt: 'You are an inventory management automation agent.',
    userPromptTemplate: 'Check stock for {{productSKU}}, alert if below {{threshold}}.',
    variables: ['productSKU', 'threshold', 'warehouseLocation'],
  },
});

const priceOptimizer = defineSkill({
  id: 'price-optimizer',
  name: 'Price Optimizer',
  category: 'automation',
  description: 'AI-driven dynamic pricing based on competitor analysis and demand forecasting.',
  supportedPlatforms: ['amazon', 'shopify', 'ebay', 'walmart', 'generic'],
  supportedModels: ['gpt-4', 'claude'],
  icon: 'DollarSign',
  tags: ['premium'],
  estimatedTime: '~1 min',
  input: {
    required: ['productSKU', 'marginTarget'],
    properties: {
      productSKU: { type: 'string', description: 'Product SKU' },
      marginTarget: { type: 'number', description: 'Target profit margin percentage' },
      pricingStrategy: { type: 'string', description: 'Pricing strategy', enum: ['competitive', 'premium', 'value', 'penetration'] },
    },
  },
  output: { type: 'object', description: 'Optimal price recommendation', format: 'json', example: '{ currentPrice, recommendedPrice, expectedImpact }' },
  steps: [
    { id: 'scan', name: 'Scan Competitors', description: 'Scan competitor pricing for same product', estimatedTime: '20s' },
    { id: 'demand', name: 'Analyze Demand', description: 'Analyze demand elasticity and trends', estimatedTime: '15s', dependencies: ['scan'] },
    { id: 'calculate', name: 'Calculate Optimal', description: 'Compute optimal price point', estimatedTime: '10s', dependencies: ['demand'] },
    { id: 'recommend', name: 'Recommend', description: 'Generate price recommendation with rationale', estimatedTime: '5s', dependencies: ['calculate'] },
  ],
  prompt: {
    systemPrompt: 'You are a dynamic pricing optimization agent.',
    userPromptTemplate: 'Optimize price for {{productSKU}} with {{marginTarget}}% margin using {{pricingStrategy}} strategy.',
    variables: ['productSKU', 'marginTarget', 'pricingStrategy'],
  },
});

registry.register(autoRestockAlert);
registry.register(priceOptimizer);

export const skills = [autoRestockAlert, priceOptimizer];
