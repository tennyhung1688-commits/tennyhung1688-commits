import { defineSkill } from '../helpers';
import { registry } from '../registry';

const multiLanguageListing = defineSkill({
  id: 'multi-language-listing',
  name: 'Multi-language Listing',
  category: 'translation',
  description: 'Translates product listing to 11 languages with localization.',
  supportedPlatforms: ['amazon', 'shopify', 'shopee', 'lazada', 'ebay', 'generic'],
  supportedModels: ['gpt-4', 'claude'],
  icon: 'Languages',
  tags: ['premium'],
  estimatedTime: '~3 min',
  input: {
    required: ['sourceContent', 'targetLanguages'],
    properties: {
      sourceContent: { type: 'object', description: 'Source listing content (title, bullets, desc)' },
      targetLanguages: { type: 'string[]', description: 'Target language codes', enum: ['en', 'es', 'de', 'fr', 'it', 'ja', 'ko', 'zh', 'pt', 'ar', 'th'] },
    },
  },
  output: { type: 'object', description: 'Translated listings per language', format: 'json' },
  steps: [
    { id: 'detect', name: 'Detect Source', description: 'Detect source language and content structure', estimatedTime: '5s' },
    { id: 'translate', name: 'Translate', description: 'Translate content to target languages', estimatedTime: '90s', dependencies: ['detect'] },
    { id: 'localize', name: 'Localize Cultural Refs', description: 'Adapt cultural references, units, currencies', estimatedTime: '30s', dependencies: ['translate'] },
    { id: 'validate', name: 'Validate', description: 'Validate character limits and platform constraints', estimatedTime: '20s', dependencies: ['localize'] },
    { id: 'package', name: 'Package', description: 'Compile all translations', estimatedTime: '10s', dependencies: ['validate'] },
  ],
  prompt: {
    systemPrompt: 'You are a professional e-commerce translator and localization expert.',
    userPromptTemplate: 'Translate listing {{sourceContent}} to {{targetLanguages}} with full localization.',
    variables: ['sourceContent', 'targetLanguages'],
  },
});

const chatTranslation = defineSkill({
  id: 'chat-translation',
  name: 'Real-time Chat Translation',
  category: 'translation',
  description: 'Enables real-time customer service translation.',
  supportedPlatforms: ['generic'],
  supportedModels: ['gpt-4'],
  icon: 'MessageCircle',
  tags: ['beta'],
  estimatedTime: '~2s',
  input: {
    required: ['message', 'sourceLang', 'targetLang'],
    properties: {
      message: { type: 'string', description: 'Customer message to translate' },
      sourceLang: { type: 'string', description: 'Source language code' },
      targetLang: { type: 'string', description: 'Target language code' },
    },
  },
  output: { type: 'object', description: 'Translated message preserving tone', format: 'json', example: '{ translated, detectedTone }' },
  steps: [
    { id: 'detect', name: 'Detect Language', description: 'Detect source language and tone', estimatedTime: '0.5s' },
    { id: 'translate', name: 'Translate', description: 'Translate message preserving intent', estimatedTime: '1s', dependencies: ['detect'] },
    { id: 'respond', name: 'Respond', description: 'Return translated message', estimatedTime: '0.5s', dependencies: ['translate'] },
  ],
  prompt: {
    systemPrompt: 'You are a real-time customer service translator. Preserve tone and urgency.',
    userPromptTemplate: 'Translate from {{sourceLang}} to {{targetLang}}: {{message}}.',
    variables: ['message', 'sourceLang', 'targetLang'],
  },
});

registry.register(multiLanguageListing);
registry.register(chatTranslation);

export const skills = [multiLanguageListing, chatTranslation];
