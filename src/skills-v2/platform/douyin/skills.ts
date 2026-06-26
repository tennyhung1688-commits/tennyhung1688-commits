import { defineSkill } from '../../helpers';
import { registry } from '../../registry';

const douyinProductVideo = defineSkill({
  id: 'douyin-product-video',
  name: '抖音带货短视频',
  category: 'video',
  description: '生成抖音带货短视频：15-60秒竖版（9:16），热门音乐卡点，3秒黄金钩子开场。',
  supportedPlatforms: ['douyin'],
  supportedModels: ['kling', 'pika'],
  icon: 'Video',
  tags: ['official'],
  estimatedTime: '~6min',
  requiresConnection: true,
  input: { required: ['productName', 'duration'], properties: { productName: { type: 'string', description: '商品名称' }, duration: { type: 'number', description: '视频时长（15-60秒）' }, musicStyle: { type: 'string', description: '音乐风格/热门BGM' }, pacing: { type: 'string', description: '节奏（快节奏/沉浸式）' } } },
  output: { type: 'video', description: '9:16竖版带货短视频（1080×1920）', format: 'url' },
  steps: [
    { id: 'trend-check', name: '趋势检测', description: '检测当前热门音乐与内容趋势', estimatedTime: '45s' },
    { id: 'hook', name: '3秒钩子', description: '设计3秒黄金钩子吸引停留', estimatedTime: '60s', dependencies: ['trend-check'] },
    { id: 'product', name: '产品展示', description: '产品痛点-解决方案展示片段', estimatedTime: '120s', dependencies: ['hook'] },
    { id: 'cta-export', name: 'CTA导出', description: '添加引导CTA并合成导出', estimatedTime: '60s', dependencies: ['product'] },
  ],
  prompt: { systemPrompt: '你是抖音带货短视频专家。生成15-60秒竖版视频，热门音乐卡点，3秒黄金钩子。', userPromptTemplate: '为 {{productName}} 生成{{duration}}秒抖音带货视频。音乐：{{musicStyle}}。节奏：{{pacing}}。9:16竖版1080×1920。', variables: ['productName', 'duration', 'musicStyle', 'pacing'] },
});

const douyinLiveCover = defineSkill({
  id: 'douyin-live-cover',
  name: '抖音直播封面',
  category: 'image',
  description: '生成抖音直播间封面图：1:1比例，突出产品/主播，叠加促销文字，符合类目风格。',
  supportedPlatforms: ['douyin'],
  supportedModels: ['flux', 'gpt-image'],
  icon: 'Camera',
  tags: ['official'],
  estimatedTime: '~2min',
  requiresConnection: true,
  input: { required: ['liveTitle', 'coverSubject'], properties: { liveTitle: { type: 'string', description: '直播标题' }, coverSubject: { type: 'string', description: '封面主体（产品/主播）' }, textOverlay: { type: 'string', description: '促销文字覆盖' }, colorScheme: { type: 'string', description: '配色方案' } } },
  output: { type: 'image', description: '1:1直播封面图（800×800或1080×1080）', format: 'url' },
  steps: [
    { id: 'product-focus', name: '主体确定', description: '确定封面主体（产品特写/主播形象）', estimatedTime: '30s' },
    { id: 'text-overlay', name: '文字叠加', description: '设计促销文字排版与叠加位置', estimatedTime: '30s', dependencies: ['product-focus'] },
    { id: 'brand', name: '品牌融入', description: '融入品牌标识与配色', estimatedTime: '20s', dependencies: ['text-overlay'] },
    { id: 'export', name: '导出', description: '导出JPG封面图', estimatedTime: '10s', dependencies: ['brand'] },
  ],
  prompt: { systemPrompt: '你是抖音直播封面设计师。生成1:1封面图，突出产品/主播，促销文字醒目。', userPromptTemplate: '为直播 {{liveTitle}} 生成封面。主体：{{coverSubject}}。文字：{{textOverlay}}。配色：{{colorScheme}}。', variables: ['liveTitle', 'coverSubject', 'textOverlay', 'colorScheme'] },
});

const douyinCaption = defineSkill({
  id: 'douyin-caption',
  name: '抖音视频文案',
  category: 'copywriting',
  description: '生成抖音视频发布文案：含吸引钩子、产品描述、热门话题标签，最多150字。',
  supportedPlatforms: ['douyin'],
  supportedModels: ['gpt-4'],
  icon: 'Type',
  tags: ['official'],
  estimatedTime: '~1min',
  requiresConnection: true,
  input: { required: ['videoTopic', 'productHighlights'], properties: { videoTopic: { type: 'string', description: '视频主题' }, productHighlights: { type: 'array', description: '产品卖点' }, trendingHashtags: { type: 'array', description: '热门标签参考' }, captionStyle: { type: 'string', description: '文案风格（口语化/种草/专业）' } } },
  output: { type: 'text', description: '视频发布文案（≤150字，含标签）', format: 'text' },
  steps: [
    { id: 'hook-line', name: '钩子文案', description: '撰写吸引停留的钩子开头', estimatedTime: '15s' },
    { id: 'description', name: '内容描述', description: '展开产品卖点与场景描述', estimatedTime: '20s', dependencies: ['hook-line'] },
    { id: 'tags', name: '标签添加', description: '关联3-5个热门话题标签', estimatedTime: '10s', dependencies: ['description'] },
    { id: 'emoji', name: 'Emoji优化', description: '添加Emoji增强表现力', estimatedTime: '10s', dependencies: ['tags'] },
  ],
  prompt: { systemPrompt: '你是抖音文案专家。生成有钩子、有标签、有Emoji的带货文案，最多150字。', userPromptTemplate: '为视频 {{videoTopic}} 写发布文案。卖点：{{productHighlights}}。标签：{{trendingHashtags}}。风格：{{captionStyle}}。最多150字。', variables: ['videoTopic', 'productHighlights', 'trendingHashtags', 'captionStyle'] },
});

const douyinScript = defineSkill({
  id: 'douyin-script',
  name: '抖音短视频脚本',
  category: 'copywriting',
  description: '生成抖音短视频脚本：钩子-痛点-解决方案-CTA 完整结构，分镜格式化输出。',
  supportedPlatforms: ['douyin'],
  supportedModels: ['gpt-4'],
  icon: 'Clapperboard',
  tags: ['official'],
  estimatedTime: '~3min',
  requiresConnection: true,
  input: { required: ['productName', 'duration'], properties: { productName: { type: 'string', description: '商品名称' }, duration: { type: 'number', description: '预计时长（秒）' }, hookAngle: { type: 'string', description: '钩子角度（悬念/痛点/惊人效果）' }, scriptStyle: { type: 'string', description: '脚本风格' } } },
  output: { type: 'text', description: '分镜格式短视频脚本', format: 'text' },
  steps: [
    { id: 'hook', name: '钩子设计', description: '设计0-3秒黄金钩子（悬念/痛点共鸣）', estimatedTime: '30s' },
    { id: 'pain-point', name: '痛点场景', description: '放大用户痛点场景', estimatedTime: '30s', dependencies: ['hook'] },
    { id: 'solution', name: '解决方案', description: '引入产品作为解决方案并展示效果', estimatedTime: '45s', dependencies: ['pain-point'] },
    { id: 'cta', name: 'CTA引导', description: '设计结尾引导动作', estimatedTime: '20s', dependencies: ['solution'] },
    { id: 'format', name: '分镜输出', description: '格式化为分镜脚本输出', estimatedTime: '20s', dependencies: ['cta'] },
  ],
  prompt: { systemPrompt: '你是抖音短视频编导。撰写钩子-痛点-解决-CTA结构的带货脚本。', userPromptTemplate: '为 {{productName}} 写{{duration}}秒抖音脚本。钩子：{{hookAngle}}。风格：{{scriptStyle}}。分镜格式输出。', variables: ['productName', 'duration', 'hookAngle', 'scriptStyle'] },
});

const douyinProductCard = defineSkill({
  id: 'douyin-product-card',
  name: '抖音商品卡片',
  category: 'image',
  description: '生成抖音商品展示卡片：含产品图、价格、核心卖点、品牌区，适配橱窗展示。',
  supportedPlatforms: ['douyin'],
  supportedModels: ['recraft'],
  icon: 'Layout',
  tags: ['official'],
  estimatedTime: '~2min',
  requiresConnection: true,
  input: { required: ['productName', 'priceDisplay', 'keyFeatures'], properties: { productName: { type: 'string', description: '商品名称' }, priceDisplay: { type: 'string', description: '价格展示' }, keyFeatures: { type: 'array', description: '核心卖点' }, visualStyle: { type: 'string', description: '视觉风格' } } },
  output: { type: 'image', description: '商品展示卡片（PNG）', format: 'url' },
  steps: [
    { id: 'layout', name: '版式确定', description: '确定上图下文/左图右文布局', estimatedTime: '15s' },
    { id: 'price', name: '价格排版', description: '设计价格与卖点信息排版', estimatedTime: '30s', dependencies: ['layout'] },
    { id: 'features', name: '卖点展示', description: '核心卖点视觉化展示', estimatedTime: '30s', dependencies: ['price'] },
    { id: 'brand', name: '品牌标识', description: '融入品牌标识与配色', estimatedTime: '15s', dependencies: ['features'] },
    { id: 'export', name: '导出PNG', description: '导出最终卡片', estimatedTime: '10s', dependencies: ['brand'] },
  ],
  prompt: { systemPrompt: '你是抖音商品卡片设计师。生成带价格、卖点和品牌标识的商品展示卡片。', userPromptTemplate: '为 {{productName}} 生成商品卡片。价格：{{priceDisplay}}。卖点：{{keyFeatures}}。风格：{{visualStyle}}。', variables: ['productName', 'priceDisplay', 'keyFeatures', 'visualStyle'] },
});

const douyinWindowSetup = defineSkill({
  id: 'douyin-window-setup',
  name: '抖音橱窗上架',
  category: 'publishing',
  description: '抖音商品橱窗上架配置：类目映射、属性填写、商品数据提交审核。',
  supportedPlatforms: ['douyin'],
  supportedModels: ['gpt-4'],
  icon: 'Store',
  tags: ['official'],
  estimatedTime: '~3min',
  requiresConnection: true,
  input: { required: ['productData', 'douyinCategory'], properties: { productData: { type: 'object', description: '完整商品数据' }, douyinCategory: { type: 'string', description: '抖音商品类目' }, priceInfo: { type: 'object', description: '价格信息' }, stockCount: { type: 'number', description: '库存数量' } } },
  output: { type: 'object', description: '橱窗上架结果与商品ID', format: 'json' },
  steps: [
    { id: 'product-data', name: '商品数据提取', description: '提取并结构化商品数据', estimatedTime: '30s' },
    { id: 'category-map', name: '类目映射', description: '匹配抖音商品类目与属性要求', estimatedTime: '45s', dependencies: ['product-data'] },
    { id: 'attribute-fill', name: '属性填写', description: '自动填充类目属性与参数', estimatedTime: '45s', dependencies: ['category-map'] },
    { id: 'submit', name: '提交审核', description: '提交商品上架审核', estimatedTime: '30s', dependencies: ['attribute-fill'] },
  ],
  prompt: { systemPrompt: '你是抖音橱窗运营专家。配置商品类目映射、属性填写并提交上架审核。', userPromptTemplate: '将 {{productData.name}} 上架抖音橱窗。类目：{{douyinCategory}}。价格：{{priceInfo}}。库存：{{stockCount}}。', variables: ['productData', 'douyinCategory', 'priceInfo', 'stockCount'] },
});

const douyinTrendAnalysis = defineSkill({
  id: 'douyin-trend-analysis',
  name: '抖音趋势分析',
  category: 'seo',
  description: '分析抖音热门品类趋势与内容模式，输出选品建议与内容策略。',
  supportedPlatforms: ['douyin'],
  supportedModels: ['gpt-4'],
  icon: 'TrendingUp',
  tags: ['official'],
  estimatedTime: '~5min',
  requiresConnection: true,
  input: { required: ['productCategory', 'timeRange'], properties: { productCategory: { type: 'string', description: '目标商品类目' }, timeRange: { type: 'string', description: '分析时间范围（近7天/30天/90天）' }, targetAudience: { type: 'string', description: '目标人群' }, budgetRange: { type: 'string', description: '预算区间' } } },
  output: { type: 'object', description: '趋势分析报告与选品建议', format: 'json' },
  steps: [
    { id: 'trend-scan', name: '趋势扫描', description: '扫描类目上升趋势与热门品类', estimatedTime: '60s' },
    { id: 'category-match', name: '类目匹配', description: '匹配目标类目的内容趋势', estimatedTime: '45s', dependencies: ['trend-scan'] },
    { id: 'content-gap', name: '内容缺口', description: '分析未被充分覆盖的内容角度', estimatedTime: '60s', dependencies: ['category-match'] },
    { id: 'recommend', name: '选品建议', description: '输出选品方向与内容策略建议', estimatedTime: '45s', dependencies: ['content-gap'] },
  ],
  prompt: { systemPrompt: '你是抖音趋势分析专家。分析类目趋势、内容缺口并输出选品与内容策略。', userPromptTemplate: '分析抖音 {{productCategory}} 类目趋势（{{timeRange}}）。人群：{{targetAudience}}。预算：{{budgetRange}}。输出选品建议。', variables: ['productCategory', 'timeRange', 'targetAudience', 'budgetRange'] },
});

const douyinUgcTemplate = defineSkill({
  id: 'douyin-ugc-template',
  name: '抖音UGC模板',
  category: 'video',
  description: '生成抖音UGC风格带货视频模板：含创作者人设、场景搭建、脚本与画面生成。',
  supportedPlatforms: ['douyin'],
  supportedModels: ['gpt-4', 'kling'],
  icon: 'Film',
  tags: ['official'],
  estimatedTime: '~5min',
  requiresConnection: true,
  input: { required: ['productName', 'creatorPersona'], properties: { productName: { type: 'string', description: '商品名称' }, creatorPersona: { type: 'string', description: '创作者人设（宝妈/数码达人/学生党）' }, sceneSetting: { type: 'string', description: '场景设定' }, ugcStyle: { type: 'string', description: 'UGC风格（手持拍摄/生活化）' }, duration: { type: 'number', description: '视频时长（秒）' } } },
  output: { type: 'object', description: 'UGC视频模板（脚本+画面）', format: 'json' },
  steps: [
    { id: 'creator-style', name: '创作者设定', description: '设定创作者人设与表达风格', estimatedTime: '30s' },
    { id: 'scene-setup', name: '场景搭建', description: '搭建符合人设的使用场景', estimatedTime: '45s', dependencies: ['creator-style'] },
    { id: 'script', name: '脚本撰写', description: '撰写真实感UGC口播脚本', estimatedTime: '60s', dependencies: ['scene-setup'] },
    { id: 'generate', name: '画面生成', description: '生成UGC风格视频画面', estimatedTime: '90s', dependencies: ['script'] },
  ],
  prompt: { systemPrompt: '你是抖音UGC内容专家。生成真实感带货视频模板，含人设、场景、脚本、画面。', userPromptTemplate: '为 {{productName}} 生成UGC视频模板。人设：{{creatorPersona}}。场景：{{sceneSetting}}。风格：{{ugcStyle}}。{{duration}}秒。', variables: ['productName', 'creatorPersona', 'sceneSetting', 'ugcStyle', 'duration'] },
});

registry.register(douyinProductVideo);
registry.register(douyinLiveCover);
registry.register(douyinCaption);
registry.register(douyinScript);
registry.register(douyinProductCard);
registry.register(douyinWindowSetup);
registry.register(douyinTrendAnalysis);
registry.register(douyinUgcTemplate);

export const skills = [douyinProductVideo, douyinLiveCover, douyinCaption, douyinScript, douyinProductCard, douyinWindowSetup, douyinTrendAnalysis, douyinUgcTemplate];
