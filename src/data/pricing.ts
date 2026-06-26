/* ===================================================================
   CommerceOS Pricing — Single Source of Truth

   Used by: Pricing page, Checkout page, Landing Pricing component
   =================================================================== */

export interface PricingPlan {
  key: string;
  name: string;
  zh: string;
  price: number; // monthly, 0 = free
  unit: string;
  desc: string;
  descZh: string;
  features: string[];
  featuresZh: string[];
  cta: string;
  ctaZh: string;
  href: string;
  popular?: boolean;
}

/**
 * Canonical pricing plans.
 * Yearly discount: 33% off (multiply monthly by 0.67).
 */
export const pricingPlans: PricingPlan[] = [
  {
    key: 'starter',
    name: 'Starter',
    zh: '入门',
    price: 0,
    unit: '',
    desc: 'Try it free',
    descZh: '免费体验',
    features: [
      '5 images / mo',
      '1 video / mo',
      'Unlimited copywriting',
      '1 platform connection',
      'Community support',
    ],
    featuresZh: [
      '每月 5 张图',
      '每月 1 条视频',
      '无限文案',
      '1 个平台连接',
      '社区支持',
    ],
    cta: 'Get Started Free',
    ctaZh: '免费开始',
    href: '/auth/register',
  },
  {
    key: 'creator',
    name: 'Creator',
    zh: '创作者',
    price: 59,
    unit: '/月',
    desc: 'For individual sellers',
    descZh: '个人卖家',
    features: [
      '200 images / mo',
      '15 videos / mo',
      'Unlimited copy + SEO',
      '3 platform connections',
      'Brand Center',
      'HD quality, no watermark',
    ],
    featuresZh: [
      '每月 200 张图',
      '每月 15 条视频',
      '无限文案+SEO',
      '3 个平台连接',
      '品牌中心',
      '高清无水印',
    ],
    cta: 'Start Free Trial',
    ctaZh: '免费试用',
    href: '/checkout?plan=creator',
    popular: true,
  },
  {
    key: 'business',
    name: 'Business',
    zh: '商业',
    price: 199,
    unit: '/月',
    desc: 'For growing businesses',
    descZh: '成长商家',
    features: [
      '500 images / mo',
      '60 videos / mo',
      'AI Agents included',
      'Commerce Memory',
      '10 platform connections',
      'A/B Testing',
      'Analytics + Prediction',
      'Priority rendering',
    ],
    featuresZh: [
      '每月 500 张图',
      '每月 60 条视频',
      'AI 代理',
      'Commerce Memory',
      '10 个平台连接',
      'A/B 测试',
      '数据分析+预测',
      '优先渲染',
    ],
    cta: 'Start Free Trial',
    ctaZh: '免费试用',
    href: '/checkout?plan=business',
  },
  {
    key: 'enterprise',
    name: 'Enterprise',
    zh: '企业',
    price: 999,
    unit: '/月起',
    desc: 'For organizations',
    descZh: '企业组织',
    features: [
      'Unlimited everything',
      'Custom AI models',
      'API + SDK access',
      'White label',
      'SLA guarantee',
      'Dedicated support',
      'SSO & Team management',
    ],
    featuresZh: [
      '无限额度',
      '定制 AI 模型',
      'API+SDK 接入',
      '白标方案',
      'SLA 保障',
      '专属支持',
      'SSO 团队管理',
    ],
    cta: 'Contact Sales',
    ctaZh: '联系销售',
    href: 'mailto:hello@commerceos.ai',
  },
];

/** Feature comparison table rows (for /pricing page) */
export interface FeatureRow {
  category?: string;
  categoryZh?: string;
  label: string;
  labelZh: string;
  values: Record<string, string | boolean>;
  valuesZh?: Record<string, string>;
}

export const featureRows: FeatureRow[] = [
  { category: 'AI Generation', categoryZh: 'AI 生成', label: '', labelZh: '', values: {} },
  { label: 'Images per month', labelZh: '每月图片', values: { starter: '5', creator: '200', business: '500', enterprise: 'Unlimited' }, valuesZh: { enterprise: '无限' } },
  { label: 'Videos per month', labelZh: '每月视频', values: { starter: '1', creator: '15', business: '60', enterprise: 'Unlimited' }, valuesZh: { enterprise: '无限' } },
  { label: 'Copywriting', labelZh: '文案生成', values: { starter: 'Unlimited', creator: 'Unlimited', business: 'Unlimited', enterprise: 'Unlimited' }, valuesZh: { starter: '无限', creator: '无限', business: '无限', enterprise: '无限' } },
  { label: 'SEO optimization', labelZh: 'SEO 优化', values: { starter: false, creator: true, business: true, enterprise: true } },
  { category: 'Skills & Workflow', categoryZh: '能力与工作流', label: '', labelZh: '', values: {} },
  { label: '130+ Skills', labelZh: '130+ Skill', values: { starter: true, creator: true, business: true, enterprise: true } },
  { label: 'Workflow Orchestrator', labelZh: '工作流编排器', values: { starter: false, creator: true, business: true, enterprise: true } },
  { label: 'AI Agents', labelZh: 'AI 代理', values: { starter: false, creator: false, business: true, enterprise: true } },
  { label: 'Commerce Memory', labelZh: 'Commerce Memory', values: { starter: false, creator: false, business: true, enterprise: true } },
  { category: 'Platforms & Publishing', categoryZh: '平台与发布', label: '', labelZh: '', values: {} },
  { label: 'Platform connections', labelZh: '平台连接', values: { starter: '1', creator: '3', business: '10', enterprise: 'Unlimited' }, valuesZh: { enterprise: '无限' } },
  { label: 'Brand Center', labelZh: '品牌中心', values: { starter: false, creator: true, business: true, enterprise: true } },
  { label: 'Publish Center', labelZh: '发布中心', values: { starter: false, creator: true, business: true, enterprise: true } },
  { label: 'A/B Testing', labelZh: 'A/B 测试', values: { starter: false, creator: false, business: true, enterprise: true } },
  { category: 'Analytics & Support', categoryZh: '分析与支持', label: '', labelZh: '', values: {} },
  { label: 'Commerce Intelligence', labelZh: '商业智能', values: { starter: false, creator: false, business: true, enterprise: true } },
  { label: 'Priority rendering', labelZh: '优先渲染', values: { starter: false, creator: false, business: true, enterprise: true } },
  { label: 'Watermark-free', labelZh: '无水印', values: { starter: false, creator: true, business: true, enterprise: true } },
  { label: 'Support tier', labelZh: '支持等级', values: { starter: 'Community', creator: 'Email', business: 'Priority', enterprise: 'Dedicated' }, valuesZh: { starter: '社区', creator: '邮件', business: '优先', enterprise: '专属' } },
  { category: 'Advanced', categoryZh: '高级功能', label: '', labelZh: '', values: {} },
  { label: 'API + SDK access', labelZh: 'API + SDK', values: { starter: false, creator: false, business: false, enterprise: true } },
  { label: 'White label', labelZh: '白标方案', values: { starter: false, creator: false, business: false, enterprise: true } },
  { label: 'SSO', labelZh: '单点登录', values: { starter: false, creator: false, business: false, enterprise: true } },
  { label: 'Custom AI models', labelZh: '定制模型', values: { starter: false, creator: false, business: false, enterprise: true } },
  { label: 'SLA guarantee', labelZh: 'SLA 保障', values: { starter: false, creator: false, business: false, enterprise: true } },
];

/** Helper: get a plan by key */
export function getPlan(key: string): PricingPlan | undefined {
  return pricingPlans.find(p => p.key === key);
}

/** Helper: yearly price (33% discount) */
export function yearlyPrice(monthlyPrice: number): number {
  return Math.round(monthlyPrice * 0.67);
}
