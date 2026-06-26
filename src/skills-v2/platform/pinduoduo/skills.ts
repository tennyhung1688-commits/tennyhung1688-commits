import { defineSkill } from '../../helpers';
import { registry } from '../../registry';

const pddMainImage = defineSkill({
  id: 'pdd-main-image',
  name: '拼多多主图',
  category: 'image',
  description: '800x800主图，可叠加价格标签，5图最低要求。',
  supportedPlatforms: ['pinduoduo'],
  supportedModels: ['flux', 'gpt-image'],
  icon: 'Image',
  tags: ['official'],
  estimatedTime: '~3min',
  requiresConnection: true,
  input: { required: ['productImage', 'productName'], properties: { productImage: { type: 'string', description: '商品图片URL或base64' }, productName: { type: 'string', description: '商品名称' }, priceTag: { type: 'string', description: '价格标签文字（可选）' } } },
  output: { type: 'image', description: '800x800px拼多多主图', format: 'url' },
  steps: [
    { id: 'product-only', name: '纯商品图', description: '确保商品主体清晰突出', estimatedTime: '30s' },
    { id: 'resize', name: '800x800尺寸', description: '裁剪为800x800像素', estimatedTime: '15s', dependencies: ['product-only'] },
    { id: 'price-tag', name: '价格标签（可选）', description: '叠加价格促销标签', estimatedTime: '20s', dependencies: ['resize'] },
    { id: 'export', name: '导出', description: '导出拼多多主图', estimatedTime: '10s', dependencies: ['price-tag'] },
  ],
  prompt: { systemPrompt: '你是拼多多商品主图设计师，擅长制作吸引点击的价格驱动主图。', userPromptTemplate: '为{{productName}}生成拼多多主图。800x800像素。价格标签：{{priceTag}}。突出性价比。', variables: ['productImage', 'productName', 'priceTag'] },
});

const pddTitle = defineSkill({
  id: 'pdd-title',
  name: '拼多多标题',
  category: 'copywriting',
  description: '最多60个中文字符，价值导向，强调优惠和拼团。',
  supportedPlatforms: ['pinduoduo'],
  supportedModels: ['gpt-4'],
  icon: 'Type',
  tags: ['official'],
  estimatedTime: '~2min',
  requiresConnection: true,
  input: { required: ['productName', 'valuePoint'], properties: { productName: { type: 'string', description: '商品名称' }, valuePoint: { type: 'string', description: '核心价值卖点（低价、量大、包邮等）' }, specs: { type: 'string', description: '关键规格' } } },
  output: { type: 'text', description: '拼多多商品标题（最多60个中文字符）', format: 'text' },
  steps: [
    { id: 'value-words', name: '价值词', description: '选取价值导向关键词（超值/爆款/包邮等）', estimatedTime: '15s' },
    { id: 'product-name', name: '商品名称', description: '添加商品核心名称', estimatedTime: '15s', dependencies: ['value-words'] },
    { id: 'group-buy', name: '拼团话术', description: '融入拼团/秒杀相关话术', estimatedTime: '15s', dependencies: ['product-name'] },
    { id: 'char-limit', name: '60字限制', description: '控制在60个中文字符以内', estimatedTime: '10s', dependencies: ['group-buy'] },
  ],
  prompt: { systemPrompt: '你是拼多多标题优化专家。价值导向，强调优惠和拼团，最多60个中文字符。', userPromptTemplate: '为拼多多编写{{productName}}标题。价值点：{{valuePoint}}。规格：{{specs}}。最多60个中文字符。', variables: ['productName', 'valuePoint', 'specs'] },
});

const pddDescription = defineSkill({
  id: 'pdd-description',
  name: '拼多多描述',
  category: 'copywriting',
  description: '简洁价值驱动描述，强调拼团优惠和数量优势。',
  supportedPlatforms: ['pinduoduo'],
  supportedModels: ['gpt-4'],
  icon: 'FileText',
  tags: ['official'],
  estimatedTime: '~3min',
  requiresConnection: true,
  input: { required: ['productName', 'features'], properties: { productName: { type: 'string', description: '商品名称' }, features: { type: 'array', description: '核心卖点' }, price: { type: 'string', description: '价格信息' }, groupSize: { type: 'string', description: '拼团人数' } } },
  output: { type: 'text', description: '拼多多商品描述，含拼团号召语', format: 'text' },
  steps: [
    { id: 'value-prop', name: '价值主张', description: '突出性价比和超值卖点', estimatedTime: '30s' },
    { id: 'key-features', name: '核心卖点', description: '简洁列出关键产品特点', estimatedTime: '45s', dependencies: ['value-prop'] },
    { id: 'group-cta', name: '拼团号召', description: '添加拼团购买行动号召', estimatedTime: '20s', dependencies: ['key-features'] },
    { id: 'export', name: '导出', description: '导出最终描述文案', estimatedTime: '10s', dependencies: ['group-cta'] },
  ],
  prompt: { systemPrompt: '你是拼多多商品描述专家。价值驱动，简洁有力，强调拼团优惠。', userPromptTemplate: '为{{productName}}写拼多多描述。卖点：{{features}}。价格：{{price}}。拼团人数：{{groupSize}}。突出性价比和拼团号召。', variables: ['productName', 'features', 'price', 'groupSize'] },
});

registry.register(pddMainImage);
registry.register(pddTitle);
registry.register(pddDescription);

export const skills = [pddMainImage, pddTitle, pddDescription];
