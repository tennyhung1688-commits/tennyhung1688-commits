import { defineSkill } from '../../helpers';
import { registry } from '../../registry';

const taobaoMainImage = defineSkill({
  id: 'taobao-main-image',
  name: '淘宝主图',
  category: 'image',
  description: '生成淘宝主图：800×800纯白背景（#FFFFFF），无文字水印，主体居中，画面占比85%。',
  supportedPlatforms: ['taobao'],
  supportedModels: ['flux', 'gpt-image'],
  icon: 'Image',
  tags: ['official'],
  estimatedTime: '~3min',
  requiresConnection: true,
  input: { required: ['productName', 'productSubject'], properties: { productName: { type: 'string', description: '商品名称' }, productSubject: { type: 'string', description: '画面主体描述' }, subjectRatio: { type: 'string', description: '主体画面占比（默认85%）' } } },
  output: { type: 'image', description: '800×800px JPG，纯白背景，无文字水印', format: 'url' },
  steps: [
    { id: 'bg-removal', name: '背景去除', description: '去除原始图片背景', estimatedTime: '30s' },
    { id: 'pure-white', name: '纯白背景', description: '填充纯白背景 #FFFFFF，居中主体', estimatedTime: '30s', dependencies: ['bg-removal'] },
    { id: 'center', name: '居中裁剪', description: '居中并调整主体占比至 {{subjectRatio}}', estimatedTime: '30s', dependencies: ['pure-white'] },
    { id: 'export', name: '导出800×800', description: '导出为800×800 JPG格式', estimatedTime: '15s', dependencies: ['center'] },
  ],
  prompt: { systemPrompt: '你是淘宝商品摄影专家。生成符合淘宝主图规范的商品图：800×800px，纯白背景，无文字水印。', userPromptTemplate: '为商品 {{productName}} 生成淘宝主图。主体：{{productSubject}}。占比：{{subjectRatio}}。800×800px纯白背景无文字。', variables: ['productName', 'productSubject', 'subjectRatio'] },
});

const taobaoDetailImages = defineSkill({
  id: 'taobao-detail-images',
  name: '淘宝详情图',
  category: 'image',
  description: '生成淘宝详情页竖版长图：宽度750px，包含场景图、细节特写、卖点信息卡。',
  supportedPlatforms: ['taobao'],
  supportedModels: ['recraft', 'gpt-image'],
  icon: 'Layout',
  tags: ['official'],
  estimatedTime: '~6min',
  requiresConnection: true,
  input: { required: ['productName', 'sectionList'], properties: { productName: { type: 'string', description: '商品名称' }, sectionList: { type: 'array', description: '展示板块列表' }, visualStyle: { type: 'string', description: '视觉风格' }, category: { type: 'string', description: '商品类目' } } },
  output: { type: 'object', description: '多张详情页图片（750px宽，竖版）', format: 'url[]' },
  steps: [
    { id: 'sections', name: '板块划分', description: '根据卖点划分详情页展示板块', estimatedTime: '60s' },
    { id: 'detail-shots', name: '细节生成', description: '逐张生成场景图和细节特写', estimatedTime: '180s', dependencies: ['sections'] },
    { id: 'info-cards', name: '信息卡叠加', description: '叠加卖点文字和信息卡', estimatedTime: '60s', dependencies: ['detail-shots'] },
    { id: 'export', name: '批量导出', description: '导出全部详情页图片', estimatedTime: '30s', dependencies: ['info-cards'] },
  ],
  prompt: { systemPrompt: '你是淘宝详情页设计师。生成750px宽的竖版详情长图，包含场景图、细节特写和信息卡。', userPromptTemplate: '为 {{productName}} 生成详情页图片。板块：{{sectionList}}。风格：{{visualStyle}}。类目：{{category}}。宽度750px竖版。', variables: ['productName', 'sectionList', 'visualStyle', 'category'] },
});

const taobaoSkuImages = defineSkill({
  id: 'taobao-sku-images',
  name: '淘宝SKU规格图',
  category: 'image',
  description: '为每个SKU变体生成独立规格图，展示颜色/尺码/款式的实际效果对比。',
  supportedPlatforms: ['taobao'],
  supportedModels: ['flux'],
  icon: 'Grid3X3',
  tags: ['official'],
  estimatedTime: '~4min',
  requiresConnection: true,
  input: { required: ['productName', 'variantType', 'variantList'], properties: { productName: { type: 'string', description: '商品名称' }, variantType: { type: 'string', description: '变体类型（颜色/尺码/款式）' }, variantList: { type: 'array', description: 'SKU变体列表' } } },
  output: { type: 'object', description: '各SKU独立规格图，800×800px', format: 'url[]' },
  steps: [
    { id: 'variant-list', name: '变体解析', description: '解析SKU变体列表及属性差异', estimatedTime: '30s' },
    { id: 'per-sku-render', name: '逐SKU渲染', description: '为每个变体独立生成800×800规格图', estimatedTime: '120s', dependencies: ['variant-list'] },
    { id: 'package', name: '打包导出', description: '保持构图一致，打包导出ZIP', estimatedTime: '30s', dependencies: ['per-sku-render'] },
  ],
  prompt: { systemPrompt: '你是淘宝SKU规格图设计师。为每个变体生成统一的800×800规格图。', userPromptTemplate: '为 {{productName}} 生成SKU规格图。变体类型：{{variantType}}。变体列表：{{variantList}}。保持构图一致。', variables: ['productName', 'variantType', 'variantList'] },
});

const taobaoTitle = defineSkill({
  id: 'taobao-title',
  name: '淘宝标题',
  category: 'copywriting',
  description: '生成淘宝商品标题：最多30个汉字，关键词密集排列，符合搜索排名规则。',
  supportedPlatforms: ['taobao'],
  supportedModels: ['gpt-4'],
  icon: 'Type',
  tags: ['official'],
  estimatedTime: '~2min',
  requiresConnection: true,
  input: { required: ['productName', 'coreKeyword'], properties: { productName: { type: 'string', description: '商品名称' }, coreKeyword: { type: 'string', description: '核心关键词' }, longTailKeywords: { type: 'array', description: '长尾关键词' }, attributeWords: { type: 'array', description: '属性词' } } },
  output: { type: 'text', description: '淘宝商品标题（≤30汉字）', format: 'text' },
  steps: [
    { id: 'core-keyword', name: '核心词确定', description: '确定搜索量最高的核心关键词', estimatedTime: '20s' },
    { id: 'long-tail', name: '长尾词组合', description: '组合长尾词和属性词，紧密排列', estimatedTime: '30s', dependencies: ['core-keyword'] },
    { id: '30-char-limit', name: '30字限制', description: '控制在30个汉字以内并复核', estimatedTime: '15s', dependencies: ['long-tail'] },
    { id: 'generate', name: '生成输出', description: '输出最终标题，确认无违禁词', estimatedTime: '15s', dependencies: ['30-char-limit'] },
  ],
  prompt: { systemPrompt: '你是淘宝SEO标题专家。生成符合搜索排序规则的商品标题，最多30个汉字。', userPromptTemplate: '为 {{productName}} 生成淘宝标题。核心词：{{coreKeyword}}。长尾词：{{longTailKeywords}}。属性词：{{attributeWords}}。最多30汉字。', variables: ['productName', 'coreKeyword', 'longTailKeywords', 'attributeWords'] },
});

const taobaoDetailCopy = defineSkill({
  id: 'taobao-detail-copy',
  name: '淘宝详情文案',
  category: 'copywriting',
  description: '生成淘宝详情页文案：HTML格式化，包含卖点解析、使用场景、规格参数等板块。',
  supportedPlatforms: ['taobao'],
  supportedModels: ['gpt-4'],
  icon: 'FileText',
  tags: ['official'],
  estimatedTime: '~4min',
  requiresConnection: true,
  input: { required: ['productName', 'sellingPoints'], properties: { productName: { type: 'string', description: '商品名称' }, sellingPoints: { type: 'array', description: '核心卖点' }, sectionSpec: { type: 'string', description: '板块结构说明' }, category: { type: 'string', description: '商品类目' } } },
  output: { type: 'text', description: 'HTML格式的详情页文案', format: 'html' },
  steps: [
    { id: 'structure', name: '结构规划', description: '规划详情页板块结构与信息层级', estimatedTime: '45s' },
    { id: 'sections', name: '板块撰写', description: '逐板块撰写卖点文案与场景描述', estimatedTime: '90s', dependencies: ['structure'] },
    { id: 'format', name: 'HTML格式化', description: '应用HTML标签（p、img、table）格式化', estimatedTime: '45s', dependencies: ['sections'] },
    { id: 'review', name: '整体复审', description: '复审文案逻辑、合规与转化率', estimatedTime: '30s', dependencies: ['format'] },
  ],
  prompt: { systemPrompt: '你是淘宝详情页文案专家。撰写转化率导向的详情文案，HTML格式化输出。', userPromptTemplate: '为 {{productName}} 撰写详情页文案。卖点：{{sellingPoints}}。板块：{{sectionSpec}}。类目：{{category}}。HTML格式。', variables: ['productName', 'sellingPoints', 'sectionSpec', 'category'] },
});

const taobaoVideo = defineSkill({
  id: 'taobao-video',
  name: '淘宝商品视频',
  category: 'video',
  description: '生成淘宝商品视频：9-60秒，无外部链接和第三方Logo，展示产品使用场景。',
  supportedPlatforms: ['taobao'],
  supportedModels: ['kling', 'veo'],
  icon: 'Video',
  tags: ['official'],
  estimatedTime: '~8min',
  requiresConnection: true,
  input: { required: ['productName', 'duration'], properties: { productName: { type: 'string', description: '商品名称' }, duration: { type: 'number', description: '视频时长（9-60秒）' }, videoStyle: { type: 'string', description: '视频风格' }, keyScenes: { type: 'array', description: '关键展示场景' } } },
  output: { type: 'video', description: '淘宝合规商品视频（9-60s）', format: 'url' },
  steps: [
    { id: 'script', name: '分镜脚本', description: '编写分镜脚本与时间线', estimatedTime: '90s' },
    { id: 'shoot-plan', name: '拍摄计划', description: '制定拍摄/生成计划与场景安排', estimatedTime: '60s', dependencies: ['script'] },
    { id: 'generate', name: '素材生成', description: 'AI生成视频素材', estimatedTime: '180s', dependencies: ['shoot-plan'] },
    { id: 'review', name: '审核导出', description: '合规审核（无外链/Logo），导出视频', estimatedTime: '60s', dependencies: ['generate'] },
  ],
  prompt: { systemPrompt: '你是淘宝商品视频制作专家。生成9-60秒商品展示视频，无外部链接，符合平台规范。', userPromptTemplate: '为 {{productName}} 生成{{duration}}秒商品视频。风格：{{videoStyle}}。场景：{{keyScenes}}。无外链无水印。', variables: ['productName', 'duration', 'videoStyle', 'keyScenes'] },
});

const taobaoLiveScript = defineSkill({
  id: 'taobao-live-script',
  name: '淘宝直播脚本',
  category: 'copywriting',
  description: '生成淘宝直播脚本：含开场暖场、产品讲解、实物演示、促销逼单、下播预告。',
  supportedPlatforms: ['taobao'],
  supportedModels: ['gpt-4'],
  icon: 'Radio',
  tags: ['official'],
  estimatedTime: '~5min',
  requiresConnection: true,
  input: { required: ['productName', 'duration'], properties: { productName: { type: 'string', description: '商品名称' }, duration: { type: 'number', description: '直播预计时长（分钟）' }, liveTheme: { type: 'string', description: '直播主题' }, discountInfo: { type: 'string', description: '优惠信息' } } },
  output: { type: 'text', description: '完整直播脚本（含时间分配）', format: 'text' },
  steps: [
    { id: 'opening', name: '开场暖场', description: '撰写欢迎语与福利预告', estimatedTime: '30s' },
    { id: 'product-intro', name: '产品介绍', description: '产品深度讲解与卖点展示', estimatedTime: '90s', dependencies: ['opening'] },
    { id: 'demo', name: '实物演示', description: '现场演示场景与互动话术', estimatedTime: '60s', dependencies: ['product-intro'] },
    { id: 'promotion', name: '促销逼单', description: '限时优惠释放与下单引导', estimatedTime: '60s', dependencies: ['demo'] },
    { id: 'cta', name: '结尾预告', description: '引导下单CTA与下播预告', estimatedTime: '30s', dependencies: ['promotion'] },
  ],
  prompt: { systemPrompt: '你是淘宝直播策划专家。撰写高转化直播脚本，含完整流程和逼单话术。', userPromptTemplate: '为 {{productName}} 写{{duration}}分钟直播脚本。主题：{{liveTheme}}。优惠：{{discountInfo}}。含开场/介绍/演示/逼单/CTA。', variables: ['productName', 'duration', 'liveTheme', 'discountInfo'] },
});

const taobaoPublish = defineSkill({
  id: 'taobao-publish',
  name: '淘宝发布',
  category: 'publishing',
  description: '自动填充淘宝商品发布表单：类目映射、字段填写、发布前合规检查。',
  supportedPlatforms: ['taobao'],
  supportedModels: ['gpt-4'],
  icon: 'Upload',
  tags: ['official'],
  estimatedTime: '~3min',
  requiresConnection: true,
  input: { required: ['productData', 'categoryPath'], properties: { productData: { type: 'object', description: '完整商品数据' }, categoryPath: { type: 'string', description: '目标类目路径' }, shippingTemplate: { type: 'string', description: '运费模板' }, listingTime: { type: 'string', description: '上架时间' } } },
  output: { type: 'object', description: '发布结果与商品ID', format: 'json' },
  steps: [
    { id: 'field-map', name: '字段映射', description: '将商品字段映射到淘宝发布表单', estimatedTime: '45s' },
    { id: 'data-fill', name: '数据填充', description: '自动填充所有表单字段', estimatedTime: '60s', dependencies: ['field-map'] },
    { id: 'pre-flight-check', name: '发布前检查', description: '合规检查（主图纯白、标题字数、无外链）', estimatedTime: '45s', dependencies: ['data-fill'] },
    { id: 'submit', name: '提交上架', description: '提交并确认上架', estimatedTime: '30s', dependencies: ['pre-flight-check'] },
  ],
  prompt: { systemPrompt: '你是淘宝商品发布专家。自动填充发布表单，完成合规检查并上架。', userPromptTemplate: '将 {{productData.name}} 发布到淘宝。类目：{{categoryPath}}。运费模板：{{shippingTemplate}}。上架时间：{{listingTime}}。', variables: ['productData', 'categoryPath', 'shippingTemplate', 'listingTime'] },
});

registry.register(taobaoMainImage);
registry.register(taobaoDetailImages);
registry.register(taobaoSkuImages);
registry.register(taobaoTitle);
registry.register(taobaoDetailCopy);
registry.register(taobaoVideo);
registry.register(taobaoLiveScript);
registry.register(taobaoPublish);

export const skills = [taobaoMainImage, taobaoDetailImages, taobaoSkuImages, taobaoTitle, taobaoDetailCopy, taobaoVideo, taobaoLiveScript, taobaoPublish];
