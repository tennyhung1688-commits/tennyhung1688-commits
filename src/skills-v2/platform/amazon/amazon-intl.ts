import { defineSkill } from '../../helpers';
import { registry } from '../../registry';

const amazonEuTranslate = defineSkill({
  id: 'amazon-eu-translate',
  name: 'Amazon EU Translation',
  category: 'translation',
  description: 'Translate Amazon listing for DE, FR, IT, ES marketplaces with localization.',
  supportedPlatforms: ['amazon'],
  supportedModels: ['gpt-4', 'claude'],
  icon: 'Languages',
  tags: ['official'],
  estimatedTime: '~6min',
  requiresConnection: true,
  input: { required: ['sourceListing', 'targetLanguages'], properties: { sourceListing: { type: 'object', description: 'Source listing content' }, targetLanguages: { type: 'array', description: 'Target languages (de, fr, it, es)' }, sourceLanguage: { type: 'string', description: 'Source language', enum: ['en'] } } },
  output: { type: 'object', description: 'Translated listings per language', format: 'json' },
  steps: [
    { id: 'source-extract', name: 'Source Extraction', description: 'Extract translatable content from source listing', estimatedTime: '30s' },
    { id: 'translate', name: 'Per-language Translation', description: 'Translate to each target language', estimatedTime: '120s', dependencies: ['source-extract'] },
    { id: 'localization', name: 'Localization', description: 'Localize measurements, currency, cultural references', estimatedTime: '60s', dependencies: ['translate'] },
    { id: 'validation', name: 'Validation', description: 'Validate translations for Amazon compliance', estimatedTime: '45s', dependencies: ['localization'] },
  ],
  prompt: { systemPrompt: 'You translate Amazon listings into European languages with proper localization.', userPromptTemplate: 'Translate listing {{sourceListing.name}} from {{sourceLanguage}} to {{targetLanguages}}. Localize measurements, currency, and cultural references.', variables: ['sourceListing', 'sourceLanguage', 'targetLanguages'] },
});

const amazonJpListing = defineSkill({
  id: 'amazon-jp-listing',
  name: 'Amazon JP Listing',
  category: 'translation',
  description: 'Full Amazon.co.jp listing with Japanese localization and cultural adaptation.',
  supportedPlatforms: ['amazon'],
  supportedModels: ['gpt-4'],
  icon: 'Globe',
  tags: ['official'],
  estimatedTime: '~5min',
  requiresConnection: true,
  input: { required: ['sourceListing'], properties: { sourceListing: { type: 'object', description: 'Source listing in English' }, culturalNotes: { type: 'string', description: 'Japan-specific cultural notes' } } },
  output: { type: 'object', description: 'Complete Japanese listing', format: 'json' },
  steps: [
    { id: 'translation', name: 'Translation', description: 'Translate listing to Japanese', estimatedTime: '90s' },
    { id: 'cultural-adapt', name: 'Cultural Adaptation', description: 'Adapt for Japanese consumer expectations', estimatedTime: '60s', dependencies: ['translation'] },
    { id: 'format-check', name: 'Format Check', description: 'Verify Japanese character limits and formats', estimatedTime: '45s', dependencies: ['cultural-adapt'] },
    { id: 'export', name: 'Export', description: 'Export complete JP listing', estimatedTime: '30s', dependencies: ['format-check'] },
  ],
  prompt: { systemPrompt: 'You are an Amazon Japan localization specialist. Adapt listings for Japanese market with cultural sensitivity.', userPromptTemplate: 'Create Japanese listing for {{sourceListing.name}}. Cultural notes: {{culturalNotes}}. Include proper keigo and measurement conversions.', variables: ['sourceListing', 'culturalNotes'] },
});

const amazonCaListing = defineSkill({
  id: 'amazon-ca-listing',
  name: 'Amazon CA Listing',
  category: 'translation',
  description: 'Amazon.ca listing with bilingual English-French content (Quebec compliant).',
  supportedPlatforms: ['amazon'],
  supportedModels: ['gpt-4'],
  icon: 'MapPin',
  tags: ['official'],
  estimatedTime: '~4min',
  requiresConnection: true,
  input: { required: ['sourceListing'], properties: { sourceListing: { type: 'object', description: 'Source listing in English' }, frenchRequired: { type: 'boolean', description: 'Whether French is required' } } },
  output: { type: 'object', description: 'Bilingual Canadian listing', format: 'json' },
  steps: [
    { id: 'english-base', name: 'English Base', description: 'Prepare English base listing for Canada', estimatedTime: '45s' },
    { id: 'french-translate', name: 'French Translation', description: 'Translate to Canadian French', estimatedTime: '60s', dependencies: ['english-base'] },
    { id: 'quebec-compliance', name: 'Quebec Compliance', description: 'Ensure Quebec language law compliance', estimatedTime: '30s', dependencies: ['french-translate'] },
    { id: 'dual-language', name: 'Dual Language', description: 'Format bilingual listing', estimatedTime: '30s', dependencies: ['quebec-compliance'] },
  ],
  prompt: { systemPrompt: 'You create bilingual Amazon.ca listings. English and Canadian French, Quebec Bill 96 compliant.', userPromptTemplate: 'Create Amazon.ca listing for {{sourceListing.name}}. French required: {{frenchRequired}}. Bilingual EN/FR format.', variables: ['sourceListing', 'frenchRequired'] },
});

const amazonGlobalSync = defineSkill({
  id: 'amazon-global-sync',
  name: 'Amazon Global Sync',
  category: 'translation',
  description: 'Sync Amazon listing across all marketplaces with translation, pricing, and tax compliance.',
  supportedPlatforms: ['amazon'],
  supportedModels: ['gpt-4'],
  icon: 'Globe',
  tags: ['official'],
  estimatedTime: '~8min',
  requiresConnection: true,
  input: { required: ['sourceListing', 'targetMarketplaces'], properties: { sourceListing: { type: 'object', description: 'Source listing data' }, targetMarketplaces: { type: 'array', description: 'Target marketplaces', enum: ['us', 'uk', 'de', 'fr', 'it', 'es', 'jp', 'ca', 'mx', 'au'] }, sourcePrice: { type: 'number', description: 'Source marketplace price' }, currency: { type: 'string', description: 'Source currency', enum: ['USD'] } } },
  output: { type: 'object', description: 'Synced listings across all marketplaces', format: 'json' },
  steps: [
    { id: 'source', name: 'Source Marketplace', description: 'Prepare source listing as template', estimatedTime: '30s' },
    { id: 'translation', name: 'Translation', description: 'Translate listing per target marketplace', estimatedTime: '120s', dependencies: ['source'] },
    { id: 'price-conversion', name: 'Price Conversion', description: 'Convert pricing with market adjustments', estimatedTime: '45s', dependencies: ['translation'] },
    { id: 'tax-compliance', name: 'Tax Compliance', description: 'Apply marketplace-specific tax rules', estimatedTime: '45s', dependencies: ['price-conversion'] },
    { id: 'upload', name: 'Upload', description: 'Upload synced listings to all marketplaces', estimatedTime: '60s', dependencies: ['tax-compliance'] },
  ],
  prompt: { systemPrompt: 'You sync Amazon listings globally with translation, pricing, and tax compliance.', userPromptTemplate: 'Sync listing {{sourceListing.name}} from USD to {{targetMarketplaces}}. Source price: {{sourcePrice}} {{currency}}. Handle translation, pricing, and tax.', variables: ['sourceListing', 'targetMarketplaces', 'sourcePrice', 'currency'] },
});

registry.register(amazonEuTranslate);
registry.register(amazonJpListing);
registry.register(amazonCaListing);
registry.register(amazonGlobalSync);

export const skills = [amazonEuTranslate, amazonJpListing, amazonCaListing, amazonGlobalSync];
