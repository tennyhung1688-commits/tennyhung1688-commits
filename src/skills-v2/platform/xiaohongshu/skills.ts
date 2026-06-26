import { defineSkill } from '../../helpers';
import { registry } from '../../registry';

const xhsNoteImage = defineSkill({
  id: 'xhs-note-image',
  name: '小红书笔记图片',
  category: 'image',
  description: '生活方式/产品摆拍图片，自然光线，暖色滤镜，3:4比例，最多9张。',
  supportedPlatforms: ['xiaohongshu'],
  supportedModels: ['flux', 'imagen'],
  icon: 'Image',
  tags: ['official'],
  estimatedTime: '~4min',
  requiresConnection: true,
  input: { required: ['productName', 'sceneDescription'], properties: { productName: { type: 'string', description: '商品名称' }, sceneDescription: { type: 'string', description: '场景描述（家居、户外、办公等）' }, mood: { type: 'string', description: '氛围（温馨、清新、高级感等）' } } },
  output: { type: 'image', description: '小红书笔记图片，3:4比例', format: 'url' },
  steps: [
    { id: 'scene-setup', name: '场景设定', description: '根据商品类型设置生活方式场景', estimatedTime: '45s' },
    { id: 'natural-light', name: '自然光线', description: '应用自然柔和光线效果', estimatedTime: '30s', dependencies: ['scene-setup'] },
    { id: 'warm-filter', name: '暖色滤镜', description: '添加温暖色调滤镜', estimatedTime: '20s', dependencies: ['natural-light'] },
    { id: 'ratio', name: '3:4比例', description: '裁剪为3:4竖版比例并导出', estimatedTime: '15s', dependencies: ['warm-filter'] },
  ],
  prompt: { systemPrompt: '你是小红书风格摄影师，擅长生活方式产品摆拍，自然光线、暖色调。', userPromptTemplate: '为{{productName}}生成小红书笔记图片。场景：{{sceneDescription}}。氛围：{{mood}}。3:4比例，自然光，暖色滤镜。', variables: ['productName', 'sceneDescription', 'mood'] },
});

const xhsNoteTitle = defineSkill({
  id: 'xhs-note-title',
  name: '小红书笔记标题',
  category: 'copywriting',
  description: '最多20个中文字符，好奇心驱动，搭配emoji增强吸引力。',
  supportedPlatforms: ['xiaohongshu'],
  supportedModels: ['gpt-4'],
  icon: 'Type',
  tags: ['official'],
  estimatedTime: '~2min',
  requiresConnection: true,
  input: { required: ['productName', 'highlight'], properties: { productName: { type: 'string', description: '商品名称' }, highlight: { type: 'string', description: '核心卖点或亮点' }, targetAudience: { type: 'string', description: '目标人群（学生党、上班族、宝妈等）' } } },
  output: { type: 'text', description: '小红书笔记标题（最多20个中文字符+emoji）', format: 'text' },
  steps: [
    { id: 'hook', name: '好奇心钩子', description: '设计引起好奇心的开头', estimatedTime: '20s' },
    { id: 'product-mention', name: '商品提及', description: '自然融入商品名称或品类', estimatedTime: '15s', dependencies: ['hook'] },
    { id: 'char-limit', name: '20字限制', description: '控制标题在20个中文字符以内', estimatedTime: '10s', dependencies: ['product-mention'] },
    { id: 'emoji', name: '添加Emoji', description: '搭配相关emoji增强视觉吸引力', estimatedTime: '10s', dependencies: ['char-limit'] },
  ],
  prompt: { systemPrompt: '你是小红书爆款标题创作者。好奇心驱动，20个中文字符以内，搭配emoji。', userPromptTemplate: '为{{productName}}写小红书标题。亮点：{{highlight}}。受众：{{targetAudience}}。最多20个中文字符，加emoji。', variables: ['productName', 'highlight', 'targetAudience'] },
});

const xhsNoteBody = defineSkill({
  id: 'xhs-note-body',
  name: '小红书笔记正文',
  category: 'copywriting',
  description: '最多1000字符，个人叙事风格，emoji丰富，带话题标签。',
  supportedPlatforms: ['xiaohongshu'],
  supportedModels: ['gpt-4'],
  icon: 'FileText',
  tags: ['official'],
  estimatedTime: '~4min',
  requiresConnection: true,
  input: { required: ['productName', 'experience'], properties: { productName: { type: 'string', description: '商品名称' }, experience: { type: 'string', description: '使用体验和感受' }, features: { type: 'array', description: '商品特点' }, price: { type: 'string', description: '价格参考' } } },
  output: { type: 'text', description: '小红书笔记正文（最多1000字符）', format: 'text' },
  steps: [
    { id: 'story', name: '个人故事', description: '以第一人称分享真实体验故事', estimatedTime: '60s' },
    { id: 'experience', name: '产品体验', description: '详细描述产品使用感受和效果', estimatedTime: '60s', dependencies: ['story'] },
    { id: 'value', name: '价值总结', description: '总结性价比和推荐理由', estimatedTime: '30s', dependencies: ['experience'] },
    { id: 'hashtags', name: '话题标签', description: '添加相关话题标签', estimatedTime: '20s', dependencies: ['value'] },
  ],
  prompt: { systemPrompt: '你是小红书笔记文案专家。个人叙事风格，emoji丰富，1000字符以内，自带话题标签。', userPromptTemplate: '为{{productName}}写小红书正文。体验：{{experience}}。特点：{{features}}。价格：{{price}}。个人叙事风格，最多1000字符。', variables: ['productName', 'experience', 'features', 'price'] },
});

const xhsTags = defineSkill({
  id: 'xhs-tags',
  name: '小红书话题标签',
  category: 'seo',
  description: '小红书话题标签（最多10个），混合热门话题和垂直领域标签。',
  supportedPlatforms: ['xiaohongshu'],
  supportedModels: ['gpt-4'],
  icon: 'Hash',
  tags: ['official'],
  estimatedTime: '~2min',
  requiresConnection: true,
  input: { required: ['productName', 'category'], properties: { productName: { type: 'string', description: '商品名称' }, category: { type: 'string', description: '商品品类' }, style: { type: 'string', description: '内容风格（测评、开箱、穿搭等）' } } },
  output: { type: 'object', description: '最多10个小红书话题标签', format: 'json' },
  steps: [
    { id: 'topic-research', name: '话题研究', description: '研究品类相关热门话题标签', estimatedTime: '30s' },
    { id: 'relevance', name: '相关性筛选', description: '筛选与商品相关度最高的标签', estimatedTime: '20s', dependencies: ['topic-research'] },
    { id: 'mix', name: '广泛+垂直', description: '混合热门广泛标签和垂直精准标签', estimatedTime: '20s', dependencies: ['relevance'] },
    { id: 'top-10', name: '最终10个', description: '精选最终10个话题标签', estimatedTime: '15s', dependencies: ['mix'] },
  ],
  prompt: { systemPrompt: '你是小红书SEO专家，为笔记选择最精准的话题标签。最多10个，混合热门与垂直。', userPromptTemplate: '为{{productName}}（品类{{category}}）选话题标签。风格：{{style}}。最多10个，混合热门和垂直标签。', variables: ['productName', 'category', 'style'] },
});

registry.register(xhsNoteImage);
registry.register(xhsNoteTitle);
registry.register(xhsNoteBody);
registry.register(xhsTags);

export const skills = [xhsNoteImage, xhsNoteTitle, xhsNoteBody, xhsTags];
