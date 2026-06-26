// 用量管理（localStorage）
// 核心策略：
//   1. 免费试用仅一次（终身3图+1视频），用完后必须付费
//   2. 会员过期后降级为「已用完免费额度」状态，不再重置
//   3. 续费会员：已用额度清零，重新计算
const USAGE_KEY = 'commerceos_generator_usage';

interface Usage {
  // 免费试用是否已被领过（终身一次）
  freeTrialClaimed: boolean;
  // 当前会员类型（null 表示无会员/免费试用已用完）
  membership: string | null; // 'free' | 'basic' | 'pro' | 'enterprise'
  membershipExpiry: number | null; // timestamp
  // 当前周期内已用量（续费时清零）
  imagesUsed: number;
  videosUsed: number;
}

function getUsage(): Usage {
  if (typeof window === 'undefined') {
    return { freeTrialClaimed: false, membership: null, membershipExpiry: null, imagesUsed: 0, videosUsed: 0 };
  }
  const raw = localStorage.getItem(USAGE_KEY);
  if (raw) {
    try {
      const u = JSON.parse(raw);
      if (u.freeTrialClaimed === undefined) {
        u.freeTrialClaimed = u.membership === 'free' && (u.imagesUsed > 0 || u.videosUsed > 0);
      }
      return u;
    } catch {
      // fall through to default
    }
  }
  return { freeTrialClaimed: false, membership: null, membershipExpiry: null, imagesUsed: 0, videosUsed: 0 };
}

function saveUsage(u: Usage) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(USAGE_KEY, JSON.stringify(u));
}

/** 当前有效会员类型，过期返回 null */
export function getMembership(): string | null {
  const u = getUsage();
  if (u.membership && u.membership !== 'free' && u.membershipExpiry && Date.now() < u.membershipExpiry) {
    return u.membership;
  }
  if (u.membership && u.membership !== 'free' && u.membershipExpiry && Date.now() >= u.membershipExpiry) {
    u.membership = null;
    u.membershipExpiry = null;
    saveUsage(u);
  }
  return null;
}

/** 开通/续费会员 */
export function activateMembership(plan: string, days: number = 30) {
  const u = getUsage();
  u.membership = plan;
  u.membershipExpiry = Date.now() + days * 24 * 60 * 60 * 1000;
  u.imagesUsed = 0;
  u.videosUsed = 0;
  if (plan !== 'free') {
    u.freeTrialClaimed = true;
  }
  saveUsage(u);
}

/** 领取免费试用（仅一次） */
export function claimFreeTrial(): boolean {
  const u = getUsage();
  if (u.freeTrialClaimed) return false;
  u.freeTrialClaimed = true;
  u.membership = 'free';
  u.membershipExpiry = null;
  u.imagesUsed = 0;
  u.videosUsed = 0;
  saveUsage(u);
  return true;
}

/** 免费试用是否可用 */
export function canClaimFreeTrial(): boolean {
  const u = getUsage();
  return !u.freeTrialClaimed;
}

export function getQuota(): { imagesLeft: number; videosLeft: number; total: boolean } {
  const u = getUsage();
  const plan = getMembership() || (u.freeTrialClaimed ? null : 'free_pending');
  
  const quotas: Record<string, { images: number; videos: number }> = {
    free_pending: { images: 3, videos: 1 },
    free: { images: 3, videos: 1 },
    basic: { images: 50, videos: 10 },
    pro: { images: 200, videos: 50 },
    enterprise: { images: 3000, videos: 600 },
  };

  if (plan === 'free_pending' && u.freeTrialClaimed) {
    return { imagesLeft: 0, videosLeft: 0, total: true };
  }

  const q = quotas[plan as string] || { images: 0, videos: 0 };
  return {
    imagesLeft: Math.max(0, q.images - u.imagesUsed),
    videosLeft: Math.max(0, q.videos - u.videosUsed),
    total: true,
  };
}

export function useImageCredit(): boolean {
  const u = getUsage();
  
  if (!u.freeTrialClaimed) {
    claimFreeTrial();
    u.imagesUsed = 1;
    saveUsage(u);
    return true;
  }

  const plan = getMembership();
  if (!plan) return false;

  const quotas: Record<string, number> = { free: 3, basic: 50, pro: 200, enterprise: 3000 };
  const limit = quotas[plan] || 0;
  
  if (u.imagesUsed >= limit) return false;
  u.imagesUsed++;
  saveUsage(u);
  return true;
}

export function useVideoCredit(): boolean {
  const u = getUsage();
  
  if (!u.freeTrialClaimed) {
    claimFreeTrial();
    u.videosUsed = 1;
    saveUsage(u);
    return true;
  }

  const plan = getMembership();
  if (!plan) return false;

  const quotas: Record<string, number> = { free: 1, basic: 10, pro: 50, enterprise: 600 };
  const limit = quotas[plan] || 0;
  
  if (u.videosUsed >= limit) return false;
  u.videosUsed++;
  saveUsage(u);
  return true;
}

export function getUsageStats() {
  const u = getUsage();
  const plan = getMembership();
  
  const quotas: Record<string, { images: number; videos: number }> = {
    free: { images: 3, videos: 1 },
    basic: { images: 50, videos: 10 },
    pro: { images: 200, videos: 50 },
    enterprise: { images: 3000, videos: 600 },
  };

  if (!plan) {
    if (!u.freeTrialClaimed) {
      return {
        imagesUsed: 0,
        imagesTotal: 3,
        videosUsed: 0,
        videosTotal: 1,
        membership: 'free_trial_available',
        membershipExpiry: null,
        freeTrialAvailable: true,
      };
    }
    return {
      imagesUsed: u.imagesUsed,
      imagesTotal: 0,
      videosUsed: u.videosUsed,
      videosTotal: 0,
      membership: 'expired',
      membershipExpiry: null,
      freeTrialAvailable: false,
    };
  }

  const q = quotas[plan] || quotas.free;
  return {
    imagesUsed: u.imagesUsed,
    imagesTotal: q.images,
    videosUsed: u.videosUsed,
    videosTotal: q.videos,
    membership: plan,
    membershipExpiry: u.membershipExpiry,
    freeTrialAvailable: false,
  };
}

// ========================
// 平台专属 Prompt 生成逻辑
// ========================

/** 淘宝专属图片 prompt 生成 */
function buildTaobaoImagePrompt(product: string, templateType: string, style: string, extras: string): string {
  const styleMap: Record<string, string> = {
    studio: '专业影棚打光，高饱和度，红色/金色点缀，淘宝爆款风格',
    lifestyle: '生活场景，温馨家居背景，真实使用效果，亲和力',
    minimal: '纯白背景，产品居中，无多余元素，淘宝白底图规范',
    festive: '大红大吉，春节/双11促销氛围，金色描边，限时标签',
    tech: '赛博朋克光效，霓虹灯管，科技感爆棚',
    nature: '原木/植物背景，自然光，有机健康感',
    luxury: '黑金配色，丝绸/大理石纹理，高端轻奢',
    cartoon: '3D卡通渲染，Q版可爱，马卡龙色系',
  };
  const typeHint: Record<string, string> = {
    'main': '主图，正方形1:1，核心卖点视觉化，第一张主图必须有点击欲',
    'detail': '详情页长图，多卖点排版，图文结合，信息密度高',
    'banner': '横幅广告图，促销信息突出，行动号召按钮',
    'carousel': '轮播图，多角度展示，一致性色调',
  };
  const styleP = styleMap[style] || '';
  const typeP = typeHint[templateType] || '';
  return `为「${product}」生成淘宝电商主图。${typeP}。${styleP}。${extras}。淘宝风格：高饱和度、红色促销元素、卖点文字可后期添加。8K高清，无文字无水印，方形构图。`;
}

/** 京东专属图片 prompt 生成 */
function buildJdImagePrompt(product: string, templateType: string, style: string, extras: string): string {
  const styleMap: Record<string, string> = {
    studio: '京东标准影棚光，干净专业，品质感强',
    lifestyle: '中产家庭场景，温馨大气，品质生活感',
    minimal: '纯白/浅灰背景，京东标准白底图，产品棱角清晰',
    festive: '京东红（#E1251B）为主色调，年中购物节/618促销氛围',
    tech: '深空黑背景，蓝色光效，京东科技品类风格',
    nature: '简约自然光，绿色植物点缀，健康环保感',
    luxury: '深蓝色/黑色，金色线条，高端商务感',
    cartoon: '3D渲染，圆润造型，亲和力强',
  };
  const typeHint: Record<string, string> = {
    'main': '主图，京东标准1:1，品质感优先， LOGO留白',
    'detail': '详情页，参数表格风格，专业测评感',
    'banner': '京东站内广告，红色系为主，信任感强',
    'carousel': '轮播图，多角度，品质一致',
  };
  const styleP = styleMap[style] || '';
  const typeP = typeHint[templateType] || '';
  return `Generate a JD.com product image for "${product}". ${typeP}. ${styleP}. ${extras}. JD.com style: premium quality feel, clean white/light gray background, trustworthy and professional. 8K, no text, no watermark.`;
}

/** 拼多多专属图片 prompt 生成 */
function buildPddImagePrompt(product: string, templateType: string, style: string, extras: string): string {
  const styleMap: Record<string, string> = {
    studio: '高对比度，鲜艳色彩，拼多多爆款风格',
    lifestyle: '接地气的生活场景，真实感，邻家感',
    minimal: '纯白背景，价格优势突出，简洁明了',
    festive: '大红大促，拼单氛围，限时秒杀感',
    tech: '炫酷光效，性价比科技感',
    nature: '田园风格，绿色健康，农产品风格',
    luxury: '轻奢感，但突出性价比，不是真奢侈',
    cartoon: '萌趣可爱，表情包风格，社交传播感',
  };
  const typeHint: Record<string, string> = {
    'main': '主图，拼多多风格，高饱和度，第一眼抓眼球，价格感',
    'detail': '详情页，大字号卖点，对比图，说服力强',
    'banner': '活动横幅，拼单提醒，倒计时元素',
    'carousel': '轮播图，多角度，一致高饱和色调',
  };
  const styleP = styleMap[style] || '';
  const typeP = typeHint[templateType] || '';
  return `为「${product}」生成拼多多电商图。${typeP}。${styleP}。${extras}。拼多多风格：高饱和度、接地气、真实感、性价比突出。8K高清，无文字，方形构图。`;
}

/** 抖音专属图片 prompt 生成 */
function buildDouyinImagePrompt(product: string, templateType: string, style: string, extras: string): string {
  const styleMap: Record<string, string> = {
    studio: '时尚影棚，潮流打光，网红同款感',
    lifestyle: '年轻生活场景，vlog风格，自然真实',
    minimal: '极简ins风，留白多，高级感',
    festive: '节日热点，红色/金色，直播带货氛围',
    tech: '赛博朋克，霓虹，潮流科技感',
    nature: '森系/田园，自然光，治愈感',
    luxury: '轻奢，黑金，网红打卡感',
    cartoon: '二次元/盲盒风格，Q版3D，年轻化',
  };
  const typeHint: Record<string, string> = {
    'main': '竖版主图9:16，前3秒抓眼球，视觉冲击力强',
    'detail': '详情长图，短视频截图风格，真实感',
    'banner': '直播封面/短视频封面，大字标题感',
    'carousel': '轮播，竖版，风格统一',
  };
  const styleP = styleMap[style] || '';
  const typeP = typeHint[templateType] || '';
  return `为「${product}」生成抖音电商图。${typeP}。${styleP}。${extras}。抖音风格：年轻潮流、视觉冲击、前3秒抓眼球、竖版优先。8K，无文字，适合短视频封面。`;
}

/** 快手专属图片 prompt 生成 */
function buildKuaishouImagePrompt(product: string, templateType: string, style: string, extras: string): string {
  const styleMap: Record<string, string> = {
    studio: '朴实专业，不花哨，真实感',
    lifestyle: '普通人生活场景，接地气，老铁认可感',
    minimal: '简洁干净，突出产品本身',
    festive: '大红大吉，年货/节庆氛围，热闹',
    tech: '实用科技感，不炫技，强调好用',
    nature: '田园/农村场景，自然真实',
    luxury: '低调实用，不炫富',
    cartoon: '趣味表情包风格，传播感强',
  };
  const typeHint: Record<string, string> = {
    'main': '主图，真实感优先，不浮夸，老铁信任感',
    'detail': '详情页，真实测评感，对比图',
    'banner': '直播封面，接地气，亲民感',
    'carousel': '轮播，真实场景为主',
  };
  const styleP = styleMap[style] || '';
  const typeP = typeHint[templateType] || '';
  return `为「${product}」生成快手电商图。${typeP}。${styleP}。${extras}。快手风格：接地气、真实感、老铁信任、不浮夸。8K，无文字，方形或竖版。`;
}

/** Amazon 专属图片 prompt 生成 */
function buildAmazonImagePrompt(product: string, templateType: string, style: string, extras: string): string {
  const styleMap: Record<string, string> = {
    studio: 'Amazon standard studio lighting, pure white background (#FFFFFF), professional commercial photography',
    lifestyle: 'Lifestyle scene, natural lighting, real-world usage context, premium feel',
    minimal: 'Pure white or off-white background, Amazon main image compliant, no text, no badges',
    festive: 'Seasonal theme (Prime Day/Black Friday/Christmas), subtle festive elements, compliant with Amazon guidelines',
    tech: 'Dark background with blue/cyan lighting, high-tech product photography, premium electronics style',
    nature: 'Natural wood/stone textures, organic and eco-friendly vibe',
    luxury: 'Premium dark background, gold/silver accents, luxury product photography',
    cartoon: '3D cartoon render, cute and playful, family-friendly',
  };
  const typeHint: Record<string, string> = {
    'main': 'Main image, 1:1 square, pure white background (#FFFFFF), Amazon compliant: no text, no borders, no badges, product fills 85% of frame',
    'detail': 'Infographic image, feature highlights, comparison chart, Amazon A+ content style',
    'banner': 'Amazon Sponsored Brands banner, brand logo area, product showcase',
    'carousel': 'Secondary images, multiple angles, lifestyle contexts, consistent lighting',
  };
  const styleP = styleMap[style] || '';
  const typeP = typeHint[templateType] || '';
  return `Create Amazon product image for "${product}". ${typeP}. ${styleP}. ${extras}. Amazon compliance: pure white BG for main image, no text overlay, no watermark, high-resolution 8K.`;
}

/** Shopee 专属图片 prompt 生成 */
function buildShopeeImagePrompt(product: string, templateType: string, style: string, extras: string): string {
  const styleMap: Record<string, string> = {
    studio: 'Shopee风格，明亮打光，东南亚热情色调，橙色点缀',
    lifestyle: '生活场景，热带风情，自然光，亲近感',
    minimal: '纯白背景，Shopee标准，简洁干净',
    festive: 'Shopee 9.9/11.11大促风格，橙色主调，促销标签感',
    tech: '科技感，蓝色光效，现代感',
    nature: '自然元素，绿色植物，健康感',
    luxury: '金色/紫色，节日礼盒感',
    cartoon: '可爱卡通风，东南亚流行元素，萌趣',
  };
  const typeHint: Record<string, string> = {
    'main': '主图，Shopee风格，正方形1:1，高饱和度，促销感，第一张要有9.9/11.11标签感',
    'detail': '详情页，图文结合，卖点清晰，东南亚多语言适配',
    'banner': 'Shopee Mall广告横幅，橙色主调，品牌感',
    'carousel': '轮播图，多角度，颜色鲜艳统一',
  };
  const styleP = styleMap[style] || '';
  const typeP = typeHint[templateType] || '';
  return `Create Shopee product image for "${product}". ${typeP}. ${styleP}. ${extras}. Shopee style: vibrant orange accents, Southeast Asian e-commerce aesthetic, high saturation, festival sale vibe. 8K, no text, no watermark.`;
}

/** Lazada 专属图片 prompt 生成 */
function buildLazadaImagePrompt(product: string, templateType: string, style: string, extras: string): string {
  const styleMap: Record<string, string> = {
    studio: 'Lazada标准，专业影棚，橙色/深蓝品牌色',
    lifestyle: '东南亚生活场景，多元文化感，亲和力',
    minimal: '纯白背景，Lazada标准白底图',
    festive: 'Lazada 11.11/12.12大促，橙色主调，狂欢氛围',
    tech: '深色背景，科技蓝，LazMall科技品类',
    nature: '自然清新，绿色健康，有机感',
    luxury: '深蓝/紫色，金色，LazMall高端',
    cartoon: '趣味卡通，年轻化，东南亚流行',
  };
  const typeHint: Record<string, string> = {
    'main': '主图，Lazada风格，1:1，橙色品牌元素，专业感',
    'detail': '详情页，LazMall风格，高端感',
    'banner': 'Lazada广告横幅，橙色深蓝，大促氛围',
    'carousel': '轮播，多角度，Lazada品牌色统一',
  };
  const styleP = styleMap[style] || '';
  const typeP = typeHint[templateType] || '';
  return `Create Lazada product image for "${product}". ${typeP}. ${styleP}. ${extras}. Lazada style: orange and dark blue brand colors, Southeast Asian e-commerce, premium marketplace aesthetic. 8K, no text, no watermark.`;
}

/** TikTok Shop 专属图片 prompt 生成 */
function buildTiktokshopImagePrompt(product: string, templateType: string, style: string, extras: string): string {
  const styleMap: Record<string, string> = {
    studio: 'TikTok潮流打光，网红同款，年轻时尚',
    lifestyle: 'vlog第一视角，真实使用，UGC风格',
    minimal: '极简ins风，适合短视频封面',
    festive: 'TikTok热点，流行元素，病毒传播感',
    tech: '霓虹/赛博，潮科技感，Gen Z风格',
    nature: '自然光，治愈系，TikTok热门自然风',
    luxury: '轻奢网红风，打卡感，分享欲强',
    cartoon: '表情包/贴纸风格，TikTok流行元素',
  };
  const typeHint: Record<string, string> = {
    'main': '竖版9:16，TikTok短视频封面风格，第一眼爆点，适合手机浏览',
    'detail': '详情图，UGC截图风格，真实测评感',
    'banner': 'TikTok直播封面，大字标题感，热门BGM视觉化',
    'carousel': '轮播，竖版，风格潮酷统一',
  };
  const styleP = styleMap[style] || '';
  const typeP = typeHint[templateType] || '';
  return `Create TikTok Shop product image for "${product}". ${typeP}. ${styleP}. ${extras}. TikTok style: Gen Z aesthetic, viral trendy, vertical 9:16 format, eye-catching for mobile-first shopping. 8K, no text, no watermark.`;
}

/** 1688 专属图片 prompt 生成 */
function build1688ImagePrompt(product: string, templateType: string, style: string, extras: string): string {
  const styleMap: Record<string, string> = {
    studio: '批发档口风格，简约专业，工厂实拍感',
    lifestyle: '店铺陈列场景，批发市集感，真实',
    minimal: '白底或灰底，简洁专业，B2B风格',
    festive: '大促批发节，量大优惠感，红色促销',
    tech: '工业风，蓝色科技感，工厂实力展示',
    nature: '原材料自然感，农产品批发风格',
    luxury: '高端批发，礼盒定制感',
    cartoon: '可爱包装展示，小商品批发风格',
  };
  const typeHint: Record<string, string> = {
    'main': '主图，B2B批发风格，突出批量优势，工厂直供感',
    'detail': '详情页，参数规格，起订量，工厂实力展示',
    'banner': '1688站点广告，批发促销，量大优惠',
    'carousel': '轮播，多角度，批发档口风格',
  };
  const styleP = styleMap[style] || '';
  const typeP = typeHint[templateType] || '';
  return `为「${product}」生成1688批发电商图。${typeP}。${styleP}。${extras}。1688风格：B2B批发、工厂直供、量大优惠、专业简约。8K，无文字，方形构图。`;
}

// ========================
// 导出：统一入口
// ========================

export function buildImagePrompt(
  platform: string,
  templateType: string,
  product: string,
  style: string,
  extras: string
): string {
  const builders: Record<string, (p: string, t: string, s: string, e: string) => string> = {
    taobao: buildTaobaoImagePrompt,
    jd: buildJdImagePrompt,
    pinduoduo: buildPddImagePrompt,
    douyin: buildDouyinImagePrompt,
    kuaishou: buildKuaishouImagePrompt,
    amazon: buildAmazonImagePrompt,
    shopee: buildShopeeImagePrompt,
    lazada: buildLazadaImagePrompt,
    tiktokshop: buildTiktokshopImagePrompt,
    '1688': build1688ImagePrompt,
  };
  const builder = builders[platform];
  if (builder) {
    return builder(product, templateType, style, extras);
  }
  // fallback
  return `Generate a high-quality e-commerce ${templateType} image for ${product}. Professional commercial photography, 8K resolution, no text, no watermark.`;
}

export function buildVideoPrompt(
  platform: string,
  product: string,
  style: string,
  duration: number,
  extras: string
): string {
  const platformVideoStyle: Record<string, string> = {
    taobao: '淘宝短视频：节奏快，卖点密集，前3秒必出爆点，红色促销标签视觉',
    jd: '京东短视频：品质感强，可信赖，测评风格，稳重不浮夸',
    pinduoduo: '拼多多短视频：接地气，真实测评，老铁推荐感，价格优势突出',
    douyin: '抖音短视频：前3秒抓眼球，节奏快，BGM卡点，转场炫酷，适合种草',
    kuaishou: '快手短视频：真实感，不摆拍，老铁实测，接地气推荐',
    amazon: 'Amazon product video: clean white background intro, professional voiceover style, premium feel, 9:16 or 16:9',
    shopee: 'Shopee video: vibrant, Southeast Asian pop music vibe, festival sale promotions, energetic',
    lazada: 'Lazada video: orange brand theme, premium marketplace feel, Southeast Asian audience',
    tiktokshop: 'TikTok Shop video: Gen Z trendy, UGC style, viral hooks in first 3 seconds, vertical 9:16, trending audio',
    '1688': '1688批发视频：工厂实拍，批量优势，B2B专业感，实力展示',
  };
  
  const stylePrompts: Record<string, string> = {
    showcase: '产品360度展示，慢镜头细节特写，质感突出',
    unboxing: '开箱体验，从包装到产品的完整展示，拆箱仪式感',
    tutorial: '使用教程，功能演示，步骤清晰',
    promo: '促销广告，快节奏剪辑，文字弹出，限时感',
    lifestyle: '生活场景，真人出镜感，自然光线，种草风格',
    comparison: '对比展示，before/after，竞品对比，说服力',
  };

  const platP = platformVideoStyle[platform] || '';
  const styleP = stylePrompts[style] || '';
  const aspectHint = (platform === 'douyin' || platform === 'tiktokshop' || platform === 'kuaishou') 
    ? '竖版9:16，适合手机全屏观看' 
    : '横版16:9或正方形1:1';

  return `生成${duration}秒电商短视频：「${product}」。${platP}。${styleP}。${aspectHint}。${extras}。高质量4K，运镜流畅，商业级产品视频。`;
}
