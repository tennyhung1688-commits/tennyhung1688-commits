import { defineSkill } from '../../helpers';
import { registry } from '../../registry';

const tiktokViralVideo = defineSkill({
  id: 'tiktok-viral-video',
  name: 'TikTok Viral Video',
  category: 'platform',
  description: 'Viral product video with hook (first 1s), trending sound, text overlay.',
  supportedPlatforms: ['tiktok'],
  supportedModels: ['kling', 'pika'],
  icon: 'Video',
  tags: ['official'],
  estimatedTime: '~5 min',
  requiresConnection: true,
  input: {
    required: ['productData', 'trendingSound'],
    properties: {
      productData: { type: 'object', description: 'Product info and media' },
      trendingSound: { type: 'string', description: 'Trending sound ID or name' },
      hookStyle: { type: 'string', description: 'Hook style', enum: ['curiosity', 'shock', 'relatable', 'question'] },
    },
  },
  output: { type: 'video', description: '9:16 viral product video with overlays', format: 'mp4' },
  steps: [
    { id: 'trend-scan', name: 'Trend Scan', description: 'Scan trending sounds and formats', estimatedTime: '30s' },
    { id: 'hook-design', name: 'Hook Design', description: 'Design attention-grabbing first second', estimatedTime: '20s', dependencies: ['trend-scan'] },
    { id: 'generate', name: 'Generate', description: 'Generate video with AI model', estimatedTime: '180s', dependencies: ['hook-design'] },
    { id: 'caption-overlay', name: 'Caption Overlay', description: 'Add text overlays and captions', estimatedTime: '30s', dependencies: ['generate'] },
  ],
  prompt: {
    systemPrompt: 'You are a TikTok viral video creator. Optimize for 9:16 vertical, first-second hook, and trending sounds.',
    userPromptTemplate: 'Create a viral TikTok video for {{productData}} using trending sound {{trendingSound}} with {{hookStyle}} hook.',
    variables: ['productData', 'trendingSound', 'hookStyle'],
  },
});

const tiktokLiveScript = defineSkill({
  id: 'tiktok-live-script',
  name: 'TikTok Live Script',
  category: 'platform',
  description: 'TikTok Live selling script with product lineup.',
  supportedPlatforms: ['tiktok'],
  supportedModels: ['gpt-4'],
  icon: 'Radio',
  tags: ['official'],
  estimatedTime: '~2 min',
  requiresConnection: true,
  input: {
    required: ['productLineup'],
    properties: {
      productLineup: { type: 'object[]', description: 'Ordered product list with prices and highlights' },
      liveDuration: { type: 'string', description: 'Live stream duration', enum: ['30min', '1hr', '2hr'] },
    },
  },
  output: { type: 'object', description: 'Timed live selling script', format: 'json' },
  steps: [
    { id: 'opening-hook', name: 'Opening Hook', description: 'Generate opening engagement script', estimatedTime: '15s' },
    { id: 'product-1', name: 'Product 1', description: 'First product demo and selling points', estimatedTime: '20s', dependencies: ['opening-hook'] },
    { id: 'demo', name: 'Demo', description: 'Product demonstration sequence', estimatedTime: '20s', dependencies: ['product-1'] },
    { id: 'flash-sale', name: 'Flash Sale', description: 'Flash sale urgency script', estimatedTime: '15s', dependencies: ['demo'] },
    { id: 'close', name: 'Close', description: 'Closing script with follow-up', estimatedTime: '10s', dependencies: ['flash-sale'] },
  ],
  prompt: {
    systemPrompt: 'You are a TikTok Live shopping host expert.',
    userPromptTemplate: 'Create a {{liveDuration}} TikTok Live script for product lineup {{productLineup}}.',
    variables: ['productLineup', 'liveDuration'],
  },
});

const tiktokCaptionViral = defineSkill({
  id: 'tiktok-caption-viral',
  name: 'TikTok Viral Caption',
  category: 'platform',
  description: 'Viral caption with trending hashtags (max 150 chars).',
  supportedPlatforms: ['tiktok'],
  supportedModels: ['gpt-4'],
  icon: 'Hash',
  tags: ['official'],
  estimatedTime: '~30s',
  requiresConnection: true,
  input: {
    required: ['productName', 'videoType'],
    properties: {
      productName: { type: 'string', description: 'Product name' },
      videoType: { type: 'string', description: 'Video content type', enum: ['unboxing', 'review', 'tutorial', 'haul'] },
    },
  },
  output: { type: 'string', description: 'Viral caption under 150 characters', format: 'text', example: 'This changed everything 🔥 #viral #musthave' },
  steps: [
    { id: 'trend-words', name: 'Trend Words', description: 'Identify trending keywords and phrases', estimatedTime: '5s' },
    { id: 'hook', name: 'Hook', description: 'Generate attention hook line', estimatedTime: '5s', dependencies: ['trend-words'] },
    { id: 'emoji', name: 'Emoji', description: 'Add relevant emojis for engagement', estimatedTime: '3s', dependencies: ['hook'] },
    { id: 'hashtags', name: 'Hashtags', description: 'Select trending hashtags within char limit', estimatedTime: '5s', dependencies: ['emoji'] },
  ],
  prompt: {
    systemPrompt: 'You are a viral TikTok caption writer. Captions must be under 150 characters.',
    userPromptTemplate: 'Write a viral caption for {{productName}} {{videoType}} video under 150 chars.',
    variables: ['productName', 'videoType'],
  },
});

const tiktokCarousel = defineSkill({
  id: 'tiktok-carousel',
  name: 'TikTok Photo Carousel',
  category: 'platform',
  description: 'Photo carousel (up to 35 images) with music.',
  supportedPlatforms: ['tiktok'],
  supportedModels: ['recraft', 'gpt-image'],
  icon: 'Images',
  tags: ['official'],
  estimatedTime: '~3 min',
  requiresConnection: true,
  input: {
    required: ['productImages'],
    properties: {
      productImages: { type: 'string[]', description: 'Product image URLs (up to 35)' },
      musicTrack: { type: 'string', description: 'Background music selection' },
    },
  },
  output: { type: 'object', description: 'Photo carousel post ready for TikTok', format: 'json' },
  steps: [
    { id: 'image-sequence', name: 'Image Sequence', description: 'Order images for storytelling flow', estimatedTime: '15s' },
    { id: 'transition', name: 'Transition', description: 'Add transitions between images', estimatedTime: '30s', dependencies: ['image-sequence'] },
    { id: 'music', name: 'Music', description: 'Sync trending music track', estimatedTime: '15s', dependencies: ['transition'] },
    { id: 'export', name: 'Export', description: 'Export carousel for TikTok upload', estimatedTime: '10s', dependencies: ['music'] },
  ],
  prompt: {
    systemPrompt: 'You are a TikTok carousel content creator.',
    userPromptTemplate: 'Create a TikTok photo carousel from {{productImages}} with music {{musicTrack}}.',
    variables: ['productImages', 'musicTrack'],
  },
});

const tiktokShowcase = defineSkill({
  id: 'tiktok-showcase',
  name: 'TikTok Product Showcase',
  category: 'platform',
  description: 'Product showcase video: unboxing style, problem → solution.',
  supportedPlatforms: ['tiktok'],
  supportedModels: ['kling'],
  icon: 'PackageOpen',
  tags: ['official'],
  estimatedTime: '~4 min',
  requiresConnection: true,
  input: {
    required: ['productData'],
    properties: {
      productData: { type: 'object', description: 'Product info and packaging images' },
      style: { type: 'string', description: 'Showcase style', enum: ['unboxing', 'problem-solution', 'before-after'] },
    },
  },
  output: { type: 'video', description: 'Product showcase video', format: 'mp4' },
  steps: [
    { id: 'scenario', name: 'Scenario', description: 'Set up problem scenario', estimatedTime: '20s' },
    { id: 'unboxing-action', name: 'Unboxing Action', description: 'Generate unboxing action sequence', estimatedTime: '90s', dependencies: ['scenario'] },
    { id: 'result', name: 'Result', description: 'Show result with product benefits', estimatedTime: '60s', dependencies: ['unboxing-action'] },
    { id: 'cta', name: 'CTA', description: 'Add call-to-action overlay', estimatedTime: '15s', dependencies: ['result'] },
  ],
  prompt: {
    systemPrompt: 'You are a TikTok product showcase creator. Focus on unboxing and transformation content.',
    userPromptTemplate: 'Create a {{style}} TikTok showcase video for {{productData}}.',
    variables: ['productData', 'style'],
  },
});

const tiktokShopSetup = defineSkill({
  id: 'tiktok-shop-setup',
  name: 'TikTok Shop Setup',
  category: 'platform',
  description: 'TikTok Shop product listing setup guide.',
  supportedPlatforms: ['tiktok'],
  supportedModels: ['gpt-4'],
  icon: 'Store',
  tags: ['official'],
  estimatedTime: '~3 min',
  requiresConnection: true,
  input: {
    required: ['productData'],
    properties: {
      productData: { type: 'object', description: 'Complete product information' },
    },
  },
  output: { type: 'object', description: 'TikTok Shop listing configuration', format: 'json' },
  steps: [
    { id: 'category-match', name: 'Category Match', description: 'Match product to TikTok Shop category', estimatedTime: '20s' },
    { id: 'attribute-fill', name: 'Attribute Fill', description: 'Populate required product attributes', estimatedTime: '30s', dependencies: ['category-match'] },
    { id: 'price-strategy', name: 'Price Strategy', description: 'Set competitive pricing strategy', estimatedTime: '20s', dependencies: ['attribute-fill'] },
    { id: 'submit', name: 'Submit', description: 'Validate and prepare for submission', estimatedTime: '15s', dependencies: ['price-strategy'] },
  ],
  prompt: {
    systemPrompt: 'You are a TikTok Shop listing expert.',
    userPromptTemplate: 'Set up TikTok Shop product listing for {{productData}}.',
    variables: ['productData'],
  },
});

const tiktokAffiliateScript = defineSkill({
  id: 'tiktok-affiliate-script',
  name: 'TikTok Affiliate Script',
  category: 'platform',
  description: 'Script for affiliate creators promoting products.',
  supportedPlatforms: ['tiktok'],
  supportedModels: ['gpt-4'],
  icon: 'Users',
  tags: ['official'],
  estimatedTime: '~1 min',
  requiresConnection: true,
  input: {
    required: ['productName', 'commissionRate'],
    properties: {
      productName: { type: 'string', description: 'Product being promoted' },
      commissionRate: { type: 'string', description: 'Commission rate for transparency' },
      creatorStyle: { type: 'string', description: 'Affiliate creator persona', enum: ['honest-review', 'enthusiast', 'lifestyle', 'bargain-hunter'] },
    },
  },
  output: { type: 'object', description: 'Affiliate script with talking points', format: 'json' },
  steps: [
    { id: 'product-highlight', name: 'Product Highlight', description: 'Craft key product selling points', estimatedTime: '10s' },
    { id: 'personal-experience', name: 'Personal Experience', description: 'Write authentic personal experience angle', estimatedTime: '15s', dependencies: ['product-highlight'] },
    { id: 'link-drop', name: 'Link Drop', description: 'Script the shoppable link moment', estimatedTime: '10s', dependencies: ['personal-experience'] },
    { id: 'cta', name: 'CTA', description: 'Create compelling call-to-action', estimatedTime: '5s', dependencies: ['link-drop'] },
  ],
  prompt: {
    systemPrompt: 'You are a TikTok affiliate marketing script writer.',
    userPromptTemplate: 'Write a {{creatorStyle}} affiliate script for {{productName}} with {{commissionRate}} commission.',
    variables: ['productName', 'commissionRate', 'creatorStyle'],
  },
});

const tiktokTrendOptimizer = defineSkill({
  id: 'tiktok-trend-optimizer',
  name: 'TikTok Trend Optimizer',
  category: 'platform',
  description: 'Daily trend analysis for content optimization.',
  supportedPlatforms: ['tiktok'],
  supportedModels: ['gpt-4'],
  icon: 'TrendingUp',
  tags: ['official'],
  estimatedTime: '~2 min',
  requiresConnection: true,
  input: {
    required: ['niche'],
    properties: {
      niche: { type: 'string', description: 'Product niche or category' },
      region: { type: 'string', description: 'Target region', enum: ['us', 'uk', 'sea', 'global'] },
    },
  },
  output: { type: 'object', description: 'Trend optimization report', format: 'json', example: '{ trendingSounds, hashtags, contentGap, bestPublishTime }' },
  steps: [
    { id: 'trending-scan', name: 'Trending Scan', description: 'Scan current trending content in niche', estimatedTime: '20s' },
    { id: 'sound-match', name: 'Sound Match', description: 'Match trending sounds to product', estimatedTime: '15s', dependencies: ['trending-scan'] },
    { id: 'content-gap', name: 'Content Gap', description: 'Identify content gaps for opportunity', estimatedTime: '15s', dependencies: ['trending-scan'] },
    { id: 'publish-time', name: 'Publish Time', description: 'Determine optimal publish times', estimatedTime: '10s', dependencies: ['sound-match', 'content-gap'] },
  ],
  prompt: {
    systemPrompt: 'You are a TikTok trend analyst for e-commerce.',
    userPromptTemplate: 'Analyze TikTok trends for niche {{niche}} in region {{region}}.',
    variables: ['niche', 'region'],
  },
});

registry.register(tiktokViralVideo);
registry.register(tiktokLiveScript);
registry.register(tiktokCaptionViral);
registry.register(tiktokCarousel);
registry.register(tiktokShowcase);
registry.register(tiktokShopSetup);
registry.register(tiktokAffiliateScript);
registry.register(tiktokTrendOptimizer);

export const skills = [
  tiktokViralVideo,
  tiktokLiveScript,
  tiktokCaptionViral,
  tiktokCarousel,
  tiktokShowcase,
  tiktokShopSetup,
  tiktokAffiliateScript,
  tiktokTrendOptimizer,
];
