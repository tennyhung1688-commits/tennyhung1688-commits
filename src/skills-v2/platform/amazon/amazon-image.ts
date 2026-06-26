import { defineSkill } from '../../helpers';
import { registry } from '../../registry';

const amazonMainImage = defineSkill({
  id: 'amazon-main-image',
  name: 'Amazon Main Image',
  category: 'image',
  description: 'White background product shot at 2000x2000px, pure white #FFFFFF background.',
  supportedPlatforms: ['amazon'],
  supportedModels: ['flux', 'gpt-image'],
  icon: 'Image',
  tags: ['official'],
  estimatedTime: '~3min',
  requiresConnection: true,
  input: { required: ['productImage', 'productName'], properties: { productImage: { type: 'string', description: 'Product image URL or base64' }, productName: { type: 'string', description: 'Product name' } } },
  output: { type: 'image', description: '2000x2000px main image with pure white background', format: 'url' },
  steps: [
    { id: 'remove-bg', name: 'Remove Background', description: 'Remove existing background from product image', estimatedTime: '30s' },
    { id: 'white-fill', name: 'Pure White Fill', description: 'Apply #FFFFFF pure white background', estimatedTime: '15s', dependencies: ['remove-bg'] },
    { id: 'center-product', name: 'Center Product', description: 'Center product with 85% fill ratio', estimatedTime: '15s', dependencies: ['white-fill'] },
    { id: 'export', name: 'Export 2000x2000', description: 'Export final image at 2000x2000px', estimatedTime: '10s', dependencies: ['center-product'] },
  ],
  prompt: { systemPrompt: 'You are an Amazon product photography expert. Create main images that comply with Amazon image requirements.', userPromptTemplate: 'Generate a pure white (#FFFFFF) background product shot at 2000x2000px for {{productName}}. Product should fill 85% of frame, centered.', variables: ['productImage', 'productName'] },
});

const amazonLifestyleImage = defineSkill({
  id: 'amazon-lifestyle-image',
  name: 'Amazon Lifestyle Image',
  category: 'image',
  description: 'Product in-use lifestyle scene showing real-world application.',
  supportedPlatforms: ['amazon'],
  supportedModels: ['flux', 'imagen'],
  icon: 'Camera',
  tags: ['official'],
  estimatedTime: '~4min',
  requiresConnection: true,
  input: { required: ['productImage', 'sceneDescription'], properties: { productImage: { type: 'string', description: 'Product image' }, sceneDescription: { type: 'string', description: 'Lifestyle scene description' } } },
  output: { type: 'image', description: 'Lifestyle image with product in real-world scene', format: 'url' },
  steps: [
    { id: 'scene-select', name: 'Scene Selection', description: 'Select appropriate lifestyle scene context', estimatedTime: '45s' },
    { id: 'product-place', name: 'Product Placement', description: 'Place product naturally in the scene', estimatedTime: '30s', dependencies: ['scene-select'] },
    { id: 'lighting', name: 'Lighting', description: 'Apply natural lighting and shadows', estimatedTime: '20s', dependencies: ['product-place'] },
    { id: 'export', name: 'Export', description: 'Export final lifestyle image', estimatedTime: '10s', dependencies: ['lighting'] },
  ],
  prompt: { systemPrompt: 'You are a lifestyle product photography expert for Amazon listings.', userPromptTemplate: 'Create a lifestyle image showing {{productName}} in use: {{sceneDescription}}. Natural lighting, authentic setting.', variables: ['productImage', 'productName', 'sceneDescription'] },
});

const amazonInfographic = defineSkill({
  id: 'amazon-infographic',
  name: 'Amazon Infographic',
  category: 'image',
  description: 'Feature highlights with text overlays and icon annotations.',
  supportedPlatforms: ['amazon'],
  supportedModels: ['recraft', 'gpt-image'],
  icon: 'Layout',
  tags: ['official'],
  estimatedTime: '~5min',
  requiresConnection: true,
  input: { required: ['productImage', 'features'], properties: { productImage: { type: 'string', description: 'Product image' }, features: { type: 'array', description: 'Key features to highlight' } } },
  output: { type: 'image', description: 'Infographic image with feature callouts', format: 'url' },
  steps: [
    { id: 'layout-design', name: 'Layout Design', description: 'Design infographic layout and grid', estimatedTime: '60s' },
    { id: 'icon-placement', name: 'Icon Placement', description: 'Place feature icons and callouts', estimatedTime: '45s', dependencies: ['layout-design'] },
    { id: 'text-overlay', name: 'Text Overlay', description: 'Add feature text overlays', estimatedTime: '30s', dependencies: ['icon-placement'] },
    { id: 'export', name: 'Export', description: 'Export final infographic', estimatedTime: '10s', dependencies: ['text-overlay'] },
  ],
  prompt: { systemPrompt: 'You are an Amazon infographic designer specializing in product feature visualization.', userPromptTemplate: 'Create an infographic for {{productName}} highlighting these features: {{features}}. Clean, readable text overlays with icons.', variables: ['productImage', 'productName', 'features'] },
});

const amazonAplusModule1 = defineSkill({
  id: 'amazon-aplus-module1',
  name: 'A+ Content: Company Logo',
  category: 'image',
  description: 'Standard Company Logo module for A+ Content (970x600).',
  supportedPlatforms: ['amazon'],
  supportedModels: ['recraft'],
  icon: 'Badge',
  tags: ['official'],
  estimatedTime: '~2min',
  requiresConnection: true,
  input: { required: ['brandLogo', 'brandName'], properties: { brandLogo: { type: 'string', description: 'Brand logo image' }, brandName: { type: 'string', description: 'Brand name' }, tagline: { type: 'string', description: 'Brand tagline' } } },
  output: { type: 'image', description: 'A+ Company Logo module 970x600px', format: 'url' },
  steps: [
    { id: 'resize', name: 'Resize', description: 'Resize logo to 970x600 proportions', estimatedTime: '30s' },
    { id: 'brand-overlay', name: 'Brand Overlay', description: 'Apply brand styling and overlay', estimatedTime: '20s', dependencies: ['resize'] },
    { id: 'export', name: 'Export 970x600', description: 'Export final A+ module at 970x600px', estimatedTime: '10s', dependencies: ['brand-overlay'] },
  ],
  prompt: { systemPrompt: 'You are an Amazon A+ Content designer. Create brand-standard Company Logo modules.', userPromptTemplate: 'Create A+ Company Logo module (970x600px) for {{brandName}} with tagline: {{tagline}}.', variables: ['brandLogo', 'brandName', 'tagline'] },
});

const amazonAplusModule2 = defineSkill({
  id: 'amazon-aplus-module2',
  name: 'A+ Content: Three Images and Text',
  category: 'image',
  description: 'Standard Three Images and Text module for A+ Content (970x300).',
  supportedPlatforms: ['amazon'],
  supportedModels: ['recraft', 'gpt-image'],
  icon: 'Grid3X3',
  tags: ['official'],
  estimatedTime: '~5min',
  requiresConnection: true,
  input: { required: ['images', 'captions'], properties: { images: { type: 'array', description: 'Three product images' }, captions: { type: 'array', description: 'Three text captions' } } },
  output: { type: 'image', description: 'A+ Three Images and Text module 970x300px', format: 'url' },
  steps: [
    { id: 'layout', name: '3-Image Layout', description: 'Arrange three images in row layout', estimatedTime: '60s' },
    { id: 'annotations', name: 'Text Annotations', description: 'Add text captions below each image', estimatedTime: '45s', dependencies: ['layout'] },
    { id: 'export', name: 'Export', description: 'Export final A+ module', estimatedTime: '10s', dependencies: ['annotations'] },
  ],
  prompt: { systemPrompt: 'You are an Amazon A+ Content designer for product modules.', userPromptTemplate: 'Create A+ Three Images and Text module (970x300px) for {{productName}} with captions: {{captions}}.', variables: ['images', 'captions', 'productName'] },
});

const amazonSizeChart = defineSkill({
  id: 'amazon-size-chart',
  name: 'Amazon Size Chart',
  category: 'image',
  description: 'Product size chart with measurements and brand styling.',
  supportedPlatforms: ['amazon'],
  supportedModels: ['recraft'],
  icon: 'Ruler',
  tags: ['official'],
  estimatedTime: '~3min',
  requiresConnection: true,
  input: { required: ['sizeData', 'brandColors'], properties: { sizeData: { type: 'array', description: 'Size measurement data' }, brandColors: { type: 'array', description: 'Brand color hex codes' }, productType: { type: 'string', description: 'Product type for sizing context' } } },
  output: { type: 'image', description: 'Branded size chart image', format: 'url' },
  steps: [
    { id: 'data-input', name: 'Data Input', description: 'Parse and structure size measurement data', estimatedTime: '30s' },
    { id: 'table-design', name: 'Table Design', description: 'Design measurement table layout', estimatedTime: '45s', dependencies: ['data-input'] },
    { id: 'brand-colors', name: 'Brand Colors', description: 'Apply brand color scheme to chart', estimatedTime: '20s', dependencies: ['table-design'] },
    { id: 'export', name: 'Export', description: 'Export final size chart', estimatedTime: '10s', dependencies: ['brand-colors'] },
  ],
  prompt: { systemPrompt: 'You are an Amazon size chart designer. Create clear, accurate measurement charts.', userPromptTemplate: 'Create a size chart for {{productType}} with data: {{sizeData}}. Brand colors: {{brandColors}}.', variables: ['sizeData', 'brandColors', 'productType'] },
});

registry.register(amazonMainImage);
registry.register(amazonLifestyleImage);
registry.register(amazonInfographic);
registry.register(amazonAplusModule1);
registry.register(amazonAplusModule2);
registry.register(amazonSizeChart);

export const skills = [amazonMainImage, amazonLifestyleImage, amazonInfographic, amazonAplusModule1, amazonAplusModule2, amazonSizeChart];
