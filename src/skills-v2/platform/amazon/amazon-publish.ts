import { defineSkill } from '../../helpers';
import { registry } from '../../registry';

const amazonListingCreator = defineSkill({
  id: 'amazon-listing-creator',
  name: 'Amazon Listing Creator',
  category: 'publishing',
  description: 'Auto-fill entire Amazon listing form with validated product data.',
  supportedPlatforms: ['amazon'],
  supportedModels: ['gpt-4'],
  icon: 'FilePlus',
  tags: ['official'],
  estimatedTime: '~5min',
  requiresConnection: true,
  input: { required: ['productData', 'marketplace'], properties: { productData: { type: 'object', description: 'Complete product listing data' }, marketplace: { type: 'string', description: 'Target marketplace' }, category: { type: 'string', description: 'Product category path' } } },
  output: { type: 'object', description: 'Completed Amazon listing form data', format: 'json' },
  steps: [
    { id: 'validation', name: 'Data Validation', description: 'Validate all required listing fields', estimatedTime: '60s' },
    { id: 'field-mapping', name: 'Field Mapping', description: 'Map product data to Amazon field structure', estimatedTime: '60s', dependencies: ['validation'] },
    { id: 'auto-fill', name: 'Auto-fill', description: 'Auto-fill all listing form fields', estimatedTime: '120s', dependencies: ['field-mapping'] },
    { id: 'pre-submit', name: 'Pre-submission Check', description: 'Final pre-submission compliance check', estimatedTime: '60s', dependencies: ['auto-fill'] },
  ],
  prompt: { systemPrompt: 'You auto-fill Amazon listing forms with complete, validated product data.', userPromptTemplate: 'Create Amazon listing for {{productData}} in {{marketplace}} marketplace, category {{category}}. Fill all required fields.', variables: ['productData', 'marketplace', 'category'] },
});

const amazonBulkUpload = defineSkill({
  id: 'amazon-bulk-upload',
  name: 'Amazon Bulk Upload',
  category: 'publishing',
  description: 'Generate Amazon flat file (inventory template) for bulk product upload.',
  supportedPlatforms: ['amazon'],
  supportedModels: ['gpt-4'],
  icon: 'Upload',
  tags: ['official'],
  estimatedTime: '~4min',
  requiresConnection: true,
  input: { required: ['products', 'templateType'], properties: { products: { type: 'array', description: 'Products to upload in bulk' }, templateType: { type: 'string', description: 'Inventory template type' }, marketplace: { type: 'string', description: 'Target marketplace' } } },
  output: { type: 'file', description: 'Amazon flat file CSV', format: 'csv' },
  steps: [
    { id: 'template-select', name: 'Template Selection', description: 'Select correct inventory template type', estimatedTime: '30s' },
    { id: 'data-mapping', name: 'Data Mapping', description: 'Map product data to flat file columns', estimatedTime: '60s', dependencies: ['template-select'] },
    { id: 'csv-generation', name: 'CSV Generation', description: 'Generate Amazon flat file CSV', estimatedTime: '30s', dependencies: ['data-mapping'] },
    { id: 'validation', name: 'Validation', description: 'Validate CSV against Amazon template spec', estimatedTime: '45s', dependencies: ['csv-generation'] },
  ],
  prompt: { systemPrompt: 'You generate Amazon flat file inventory templates for bulk uploads.', userPromptTemplate: 'Generate Amazon flat file ({{templateType}}) for {{products.length}} products in {{marketplace}} marketplace.', variables: ['products', 'templateType', 'marketplace'] },
});

const amazonVariations = defineSkill({
  id: 'amazon-variations',
  name: 'Amazon Variations',
  category: 'publishing',
  description: 'Create parent-child variation relationships for Amazon listings.',
  supportedPlatforms: ['amazon'],
  supportedModels: ['gpt-4'],
  icon: 'GitBranch',
  tags: ['official'],
  estimatedTime: '~4min',
  requiresConnection: true,
  input: { required: ['parentProduct', 'children'], properties: { parentProduct: { type: 'object', description: 'Parent product data' }, children: { type: 'array', description: 'Child variation products' }, variationTheme: { type: 'string', description: 'Variation theme (e.g., Size, Color, Size-Color)' } } },
  output: { type: 'object', description: 'Variation relationship data with ASIN mappings', format: 'json' },
  steps: [
    { id: 'analysis', name: 'Variation Analysis', description: 'Analyze product variations and differences', estimatedTime: '45s' },
    { id: 'theme-selection', name: 'Theme Selection', description: 'Select appropriate variation theme', estimatedTime: '30s', dependencies: ['analysis'] },
    { id: 'asin-mapping', name: 'ASIN Mapping', description: 'Map parent-child ASIN relationships', estimatedTime: '60s', dependencies: ['theme-selection'] },
    { id: 'upload', name: 'Upload', description: 'Generate variation upload file', estimatedTime: '30s', dependencies: ['asin-mapping'] },
  ],
  prompt: { systemPrompt: 'You create Amazon variation relationships with proper parent-child structure.', userPromptTemplate: 'Create variations for {{parentProduct.name}}. Theme: {{variationTheme}}. Children: {{children}}. Map ASIN relationships.', variables: ['parentProduct', 'children', 'variationTheme'] },
});

const amazonInventorySync = defineSkill({
  id: 'amazon-inventory-sync',
  name: 'Amazon Inventory Sync',
  category: 'publishing',
  description: 'Sync inventory quantities and status across all Amazon marketplaces.',
  supportedPlatforms: ['amazon'],
  supportedModels: ['gpt-4'],
  icon: 'RefreshCw',
  tags: ['official'],
  estimatedTime: '~3min',
  requiresConnection: true,
  input: { required: ['skus', 'marketplaces'], properties: { skus: { type: 'array', description: 'SKUs to sync' }, marketplaces: { type: 'array', description: 'Target marketplaces' }, quantities: { type: 'object', description: 'Quantity data per SKU' } } },
  output: { type: 'object', description: 'Inventory sync status report', format: 'json' },
  steps: [
    { id: 'fetch-stock', name: 'Fetch Stock', description: 'Fetch current inventory across marketplaces', estimatedTime: '45s' },
    { id: 'update-quantities', name: 'Update Quantities', description: 'Update inventory quantities', estimatedTime: '60s', dependencies: ['fetch-stock'] },
    { id: 'verify-sync', name: 'Verify Sync', description: 'Verify sync consistency across marketplaces', estimatedTime: '45s', dependencies: ['update-quantities'] },
  ],
  prompt: { systemPrompt: 'You sync Amazon inventory across multiple marketplaces.', userPromptTemplate: 'Sync inventory for SKUs {{skus}} across {{marketplaces}}. Quantities: {{quantities}}.', variables: ['skus', 'marketplaces', 'quantities'] },
});

registry.register(amazonListingCreator);
registry.register(amazonBulkUpload);
registry.register(amazonVariations);
registry.register(amazonInventorySync);

export const skills = [amazonListingCreator, amazonBulkUpload, amazonVariations, amazonInventorySync];
