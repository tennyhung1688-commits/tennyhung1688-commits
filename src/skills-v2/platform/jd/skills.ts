import { defineSkill } from '../../helpers';
import { registry } from '../../registry';

const jdMainImage = defineSkill({
  id: 'jd-main-image',
  name: '京东主图',
  category: 'image',
  description: '800x800纯白背景主图，无文字水印，满足京东5图最低要求。',
  supportedPlatforms: ['jd'],
  supportedModels: ['flux'],
  icon: 'Image',
  tags: ['official'],
  estimatedTime: '~3min',
  requiresConnection: true,
  input: { required: ['productImage', 'productName'], properties: { productImage: { type: 'string', description: '商品图片URL或base64' }, productName: { type: 'string', description: '商品名称' } } },
  output: { type: 'image', description: '800x800px京东主图，纯白背景', format: 'url' },
  steps: [
    { id: 'bg-removal', name: '去背景', description: '去除商品原有背景', estimatedTime: '30s' },
    { id: 'pure-white', name: '纯白背景', description: '替换为#FFFFFF纯白背景', estimatedTime: '15s', dependencies: ['bg-removal'] },
    { id: 'resize', name: '800x800尺寸', description: '裁剪为800x800像素', estimatedTime: '15s', dependencies: ['pure-white'] },
    { id: 'export', name: '导出', description: '导出京东合规主图', estimatedTime: '10s', dependencies: ['resize'] },
  ],
  prompt: { systemPrompt: '你是京东商品摄影专家，创建符合京东规范的商品主图。', userPromptTemplate: '为{{productName}}生成京东主图。800x800像素，纯白#FFFFFF背景，无文字水印。', variables: ['productImage', 'productName'] },
});

const jdTitle = defineSkill({
  id: 'jd-title',
  name: '京东标题',
  category: 'copywriting',
  description: '最多50个中文字符，格式：品牌 + 商品名称 + 规格参数。',
  supportedPlatforms: ['jd'],
  supportedModels: ['gpt-4'],
  icon: 'Type',
  tags: ['official'],
  estimatedTime: '~2min',
  requiresConnection: true,
  input: { required: ['brand', 'productName', 'specs'], properties: { brand: { type: 'string', description: '品牌名称' }, productName: { type: 'string', description: '商品名称' }, specs: { type: 'string', description: '关键规格参数' } } },
  output: { type: 'text', description: '京东商品标题（最多50个中文字符）', format: 'text' },
  steps: [
    { id: 'brand', name: '品牌前缀', description: '标题以品牌名称开头', estimatedTime: '10s' },
    { id: 'product', name: '商品名称', description: '添加核心商品名称', estimatedTime: '15s', dependencies: ['brand'] },
    { id: 'specs', name: '规格参数', description: '补充关键规格信息', estimatedTime: '15s', dependencies: ['product'] },
    { id: 'char-limit', name: '50字限制', description: '控制在50个中文字符以内', estimatedTime: '10s', dependencies: ['specs'] },
    { id: 'compose', name: '组合输出', description: '最终组合并输出标题', estimatedTime: '10s', dependencies: ['char-limit'] },
  ],
  prompt: { systemPrompt: '你是京东商品标题优化专家。品牌+商品名称+规格参数格式，最多50个中文字符。', userPromptTemplate: '为京东编写商品标题：品牌{{brand}}，商品{{productName}}，规格{{specs}}。最多50个中文字符。', variables: ['brand', 'productName', 'specs'] },
});

const jdDetailImages = defineSkill({
  id: 'jd-detail-images',
  name: '京东详情图',
  category: 'image',
  description: '详情页图片（750px宽，纵向排版），移动端优化。',
  supportedPlatforms: ['jd'],
  supportedModels: ['recraft'],
  icon: 'Layout',
  tags: ['official'],
  estimatedTime: '~5min',
  requiresConnection: true,
  input: { required: ['productName', 'sections'], properties: { productName: { type: 'string', description: '商品名称' }, sections: { type: 'array', description: '详情板块内容（卖点、参数、场景等）' } } },
  output: { type: 'image', description: '京东详情页纵向图片（750px宽）', format: 'url' },
  steps: [
    { id: 'sections', name: '详情板块', description: '定义详情页各板块内容和顺序', estimatedTime: '60s' },
    { id: 'per-section', name: '逐板块生成', description: '按板块逐一生成详情图片', estimatedTime: '120s', dependencies: ['sections'] },
    { id: 'mobile-opt', name: '移动端优化', description: '优化移动端阅读体验和加载速度', estimatedTime: '30s', dependencies: ['per-section'] },
    { id: 'export', name: '导出', description: '导出全部详情图片', estimatedTime: '15s', dependencies: ['mobile-opt'] },
  ],
  prompt: { systemPrompt: '你是京东详情页设计师，创建移动端优化的纵向详情图片。', userPromptTemplate: '为{{productName}}生成详情页图片。板块内容：{{sections}}。750px宽，纵向排版，移动端优先。', variables: ['productName', 'sections'] },
});

const jdDescription = defineSkill({
  id: 'jd-description',
  name: '京东详情描述',
  category: 'copywriting',
  description: '移动端优先的详情页描述，HTML格式，包含卖点展示和规格说明。',
  supportedPlatforms: ['jd'],
  supportedModels: ['gpt-4'],
  icon: 'FileText',
  tags: ['official'],
  estimatedTime: '~4min',
  requiresConnection: true,
  input: { required: ['productName', 'features'], properties: { productName: { type: 'string', description: '商品名称' }, features: { type: 'array', description: '核心卖点' }, specs: { type: 'object', description: '规格参数' }, afterSales: { type: 'string', description: '售后服务说明' } } },
  output: { type: 'text', description: '京东移动端详情页HTML描述', format: 'html' },
  steps: [
    { id: 'structure', name: '详情结构', description: '规划详情页内容结构和板块顺序', estimatedTime: '45s' },
    { id: 'feature-blocks', name: '卖点模块', description: '编写各卖点模块内容', estimatedTime: '90s', dependencies: ['structure'] },
    { id: 'html-format', name: 'HTML格式化', description: '转换为移动端优化HTML格式', estimatedTime: '45s', dependencies: ['feature-blocks'] },
    { id: 'export', name: '导出', description: '导出最终详情描述', estimatedTime: '15s', dependencies: ['html-format'] },
  ],
  prompt: { systemPrompt: '你是京东商品详情页文案专家。移动端优先，HTML格式，卖点清晰。', userPromptTemplate: '为{{productName}}编写京东详情页描述。卖点：{{features}}。规格：{{specs}}。售后：{{afterSales}}。移动端HTML格式。', variables: ['productName', 'features', 'specs', 'afterSales'] },
});

registry.register(jdMainImage);
registry.register(jdTitle);
registry.register(jdDetailImages);
registry.register(jdDescription);

export const skills = [jdMainImage, jdTitle, jdDetailImages, jdDescription];
