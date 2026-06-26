import { defineSkill } from '../../helpers';
import { registry } from '../../registry';

const aibaba1688MainImage = defineSkill({
  id: '1688-main-image',
  name: '1688主图',
  category: 'image',
  description: '750x750纯白背景，仅展示商品，适合批发/B2B场景。',
  supportedPlatforms: ['1688'],
  supportedModels: ['flux'],
  icon: 'Image',
  tags: ['official'],
  estimatedTime: '~3min',
  requiresConnection: true,
  input: { required: ['productImage', 'productName'], properties: { productImage: { type: 'string', description: '商品图片URL或base64' }, productName: { type: 'string', description: '商品名称' } } },
  output: { type: 'image', description: '750x750px 1688主图，纯白背景', format: 'url' },
  steps: [
    { id: 'bg-removal', name: '去背景', description: '去除商品原有背景', estimatedTime: '30s' },
    { id: 'resize', name: '750x750尺寸', description: '裁剪为750x750像素', estimatedTime: '15s', dependencies: ['bg-removal'] },
    { id: 'export', name: '导出', description: '导出1688批发主图', estimatedTime: '10s', dependencies: ['resize'] },
  ],
  prompt: { systemPrompt: '你是1688批发商品摄影专家，创建符合B2B批发场景的商品主图。', userPromptTemplate: '为{{productName}}生成1688主图。750x750像素，纯白背景，仅展示商品。', variables: ['productImage', 'productName'] },
});

const aibaba1688Title = defineSkill({
  id: '1688-title',
  name: '1688标题',
  category: 'copywriting',
  description: '最多30个中文字符，供应商风格直接标题，强调品类和规格。',
  supportedPlatforms: ['1688'],
  supportedModels: ['gpt-4'],
  icon: 'Type',
  tags: ['official'],
  estimatedTime: '~2min',
  requiresConnection: true,
  input: { required: ['productType', 'keySpec'], properties: { productType: { type: 'string', description: '商品品类' }, keySpec: { type: 'string', description: '核心规格（材质/尺寸/型号）' }, supply: { type: 'string', description: '供应特点（源头工厂/一件代发等）' } } },
  output: { type: 'text', description: '1688商品标题（最多30个中文字符）', format: 'text' },
  steps: [
    { id: 'product-type', name: '品类词', description: '确定精准商品品类词', estimatedTime: '10s' },
    { id: 'key-spec', name: '核心规格', description: '添加关键规格参数', estimatedTime: '15s', dependencies: ['product-type'] },
    { id: 'supply-phrase', name: '供应话术', description: '融入批发供应关键词', estimatedTime: '10s', dependencies: ['key-spec'] },
    { id: 'char-limit', name: '30字限制', description: '控制在30个中文字符以内', estimatedTime: '10s', dependencies: ['supply-phrase'] },
  ],
  prompt: { systemPrompt: '你是1688批发标题专家。直接供应商风格，品类+规格+供应话术，最多30个中文字符。', userPromptTemplate: '为1688编写{{productType}}标题。规格：{{keySpec}}。供应：{{supply}}。最多30个中文字符。', variables: ['productType', 'keySpec', 'supply'] },
});

const aibaba1688BulkDetail = defineSkill({
  id: '1688-bulk-detail',
  name: '1688批发详情',
  category: 'copywriting',
  description: '批发详情页含起订量（MOQ）、阶梯价格、规格表，适配B2B采购场景。',
  supportedPlatforms: ['1688'],
  supportedModels: ['gpt-4'],
  icon: 'FileText',
  tags: ['official'],
  estimatedTime: '~4min',
  requiresConnection: true,
  input: { required: ['productName', 'pricingTiers', 'specs'], properties: { productName: { type: 'string', description: '商品名称' }, pricingTiers: { type: 'array', description: '阶梯价格（量+单价）' }, specs: { type: 'object', description: '规格参数表' }, moq: { type: 'string', description: '最小起订量' }, leadTime: { type: 'string', description: '交货周期' } } },
  output: { type: 'text', description: '1688批发详情页内容', format: 'text' },
  steps: [
    { id: 'pricing-tiers', name: '阶梯价格', description: '格式化阶梯价格展示', estimatedTime: '45s' },
    { id: 'moq', name: '起订量MOQ', description: '明确标注最小起订量和起批条件', estimatedTime: '20s', dependencies: ['pricing-tiers'] },
    { id: 'specs-table', name: '规格参数表', description: '制作详细规格参数表格', estimatedTime: '45s', dependencies: ['moq'] },
    { id: 'export', name: '导出', description: '导出批发详情页内容', estimatedTime: '15s', dependencies: ['specs-table'] },
  ],
  prompt: { systemPrompt: '你是1688批发详情页专家。清晰展示MOQ、阶梯价格、规格表，适合B2B采购。', userPromptTemplate: '为1688编写{{productName}}批发详情。阶梯价格：{{pricingTiers}}。规格：{{specs}}。MOQ：{{moq}}。交期：{{leadTime}}。', variables: ['productName', 'pricingTiers', 'specs', 'moq', 'leadTime'] },
});

registry.register(aibaba1688MainImage);
registry.register(aibaba1688Title);
registry.register(aibaba1688BulkDetail);

export const skills = [aibaba1688MainImage, aibaba1688Title, aibaba1688BulkDetail];
