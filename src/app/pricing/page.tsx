'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Check, X, Minus, Sparkles, Zap, Crown, Building2,
  Shield, CreditCard, RefreshCw, HelpCircle, ChevronDown, ChevronUp,
  Globe, Mail, ArrowRight
} from 'lucide-react';
import { useLang } from '@/lib/i18n';

const plans = [
  {
    key: 'free', name: 'Free', zh: '免费', price: 0, unit: '/月',
    desc: 'Try it out', descZh: '免费体验',
    cta: 'Get Started Free', ctaZh: '免费开始', href: '/auth/register',
    popular: false,
  },
  {
    key: 'starter', name: 'Starter', zh: '入门', price: 59, unit: '/月',
    desc: 'For individual sellers', descZh: '个人卖家',
    cta: 'Start Free Trial', ctaZh: '免费试用', href: '/checkout?plan=starter',
    popular: true,
  },
  {
    key: 'pro', name: 'Pro', zh: '专业', price: 199, unit: '/月',
    desc: 'For growing teams', descZh: '成长团队',
    cta: 'Start Free Trial', ctaZh: '免费试用', href: '/checkout?plan=pro',
    popular: false,
  },
  {
    key: 'enterprise', name: 'Enterprise', zh: '企业', price: 999, unit: '/月起',
    desc: 'For organizations', descZh: '企业组织',
    cta: 'Contact Sales', ctaZh: '联系销售', href: '/workspace',
    popular: false,
  },
];

/* Feature comparison rows */
const featureRows = [
  { category: 'AI Generation', zh: 'AI 生成' },
  { label: 'Images per month', zh: '每月图片', free: '5', starter: '200', pro: '500', enterprise: 'Unlimited', enterpriseZh: '无限' },
  { label: 'Videos per month', zh: '每月视频', free: '1', starter: '15', pro: '60', enterprise: 'Unlimited', enterpriseZh: '无限' },
  { label: 'Copywriting', zh: '文案生成', free: 'Unlimited', freeZh: '无限', starter: 'Unlimited', starterZh: '无限', pro: 'Unlimited', proZh: '无限', enterprise: 'Unlimited', enterpriseZh: '无限' },
  { label: 'SEO optimization', zh: 'SEO 优化', free: false, starter: true, pro: true, enterprise: true },
  { category: 'Skills & Workflow', zh: '能力与工作流' },
  { label: '130+ Skills', zh: '130+ Skill', free: true, starter: true, pro: true, enterprise: true },
  { label: 'Workflow Orchestrator', zh: '工作流编排器', free: false, starter: true, pro: true, enterprise: true },
  { label: 'AI Agents', zh: 'AI 代理', free: false, starter: false, pro: true, enterprise: true },
  { label: 'Commerce Memory', zh: 'Commerce Memory', free: false, starter: false, pro: true, enterprise: true },
  { category: 'Platforms & Publishing', zh: '平台与发布' },
  { label: 'Platform connections', zh: '平台连接', free: '1', starter: '3', pro: '10', enterprise: 'Unlimited', enterpriseZh: '无限' },
  { label: 'Brand Center', zh: '品牌中心', free: false, starter: true, pro: true, enterprise: true },
  { label: 'Publish Center', zh: '发布中心', free: false, starter: true, pro: true, enterprise: true },
  { label: 'A/B Testing', zh: 'A/B 测试', free: false, starter: false, pro: true, enterprise: true },
  { category: 'Analytics & Support', zh: '分析与支持' },
  { label: 'Commerce Intelligence', zh: '商业智能', free: false, starter: false, pro: true, enterprise: true },
  { label: 'Priority rendering', zh: '优先渲染', free: false, starter: false, pro: true, enterprise: true },
  { label: 'Watermark-free', zh: '无水印', free: false, starter: true, pro: true, enterprise: true },
  { label: 'Support', zh: '支持', free: 'Community', freeZh: '社区', starter: 'Email', starterZh: '邮件', pro: 'Priority', proZh: '优先', enterprise: 'Dedicated', enterpriseZh: '专属' },
  { category: 'Advanced', zh: '高级功能' },
  { label: 'API + SDK access', zh: 'API + SDK', free: false, starter: false, pro: false, enterprise: true },
  { label: 'White label', zh: '白标方案', free: false, starter: false, pro: false, enterprise: true },
  { label: 'SSO', zh: '单点登录', free: false, starter: false, pro: false, enterprise: true },
  { label: 'Custom AI models', zh: '定制模型', free: false, starter: false, pro: false, enterprise: true },
  { label: 'SLA guarantee', zh: 'SLA 保障', free: false, starter: false, pro: false, enterprise: true },
];

const faqs = [
  { q: 'Can I switch plans anytime?', zhQ: '可以随时切换套餐吗？', a: 'Yes, you can upgrade or downgrade at any time. Upgrades take effect immediately; downgrades apply at the end of your billing cycle.', zhA: '可以。升级即时生效，降级在当前计费周期结束后生效。' },
  { q: 'What payment methods are accepted?', zhQ: '支持哪些支付方式？', a: 'We accept credit/debit cards, Alipay, WeChat Pay, and bank transfers for Enterprise plans.', zhA: '支持信用卡/借记卡、支付宝、微信支付，企业套餐支持银行转账。' },
  { q: 'Is there a free trial?', zhQ: '有免费试用吗？', a: 'Starter and Pro plans come with a 7-day free trial. No credit card required to try the Free plan.', zhA: '入门和专业套餐提供 7 天免费试用。免费套餐无需信用卡。' },
  { q: 'Can I cancel my subscription?', zhQ: '可以取消订阅吗？', a: 'Absolutely. Cancel anytime with one click. No long-term contracts. You\'ll retain access until the end of your billing period.', zhA: '可以随时一键取消，无长期合约。取消后当前计费周期内仍可正常使用。' },
  { q: 'Do unused quotas roll over?', zhQ: '未用完的额度会累积吗？', a: 'Monthly quotas reset each billing cycle. Enterprise plans can negotiate roll-over policies.', zhA: '月度额度在每期重置。企业套餐可协商额度累积方案。' },
  { q: 'How does pricing work for large teams?', zhQ: '大团队如何计费？', a: 'Enterprise plan is priced per seat. Contact our sales team for a custom quote based on your team size and requirements.', zhA: '企业套餐按席位计费。联系销售团队获取基于团队规模的定制报价。' },
];

export default function PricingPage() {
  const { t } = useLang();
  const [yearly, setYearly] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      {/* Hero */}
      <section className="pt-24 pb-12 text-center px-4">
        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-[#E5E7EB] text-[#6B7280] text-xs font-semibold mb-6">
          <CreditCard className="w-3.5 h-3.5" />
          {t('Pricing', '定价方案')}
        </span>
        <h1 className="text-4xl font-bold text-[#111827] mb-3 tracking-tight">
          {t('Simple, Transparent Pricing', '简单透明的定价')}
        </h1>
        <p className="text-[#6B7280] text-lg max-w-lg mx-auto">
          {t('Start free, upgrade when you grow. No hidden fees, no surprises.', '免费开始，按需升级。无隐藏费用，无意外收费。')}
        </p>
      </section>

      {/* Plan cards */}
      <section className="max-w-6xl mx-auto px-4 pb-16">
        {/* Toggle */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex items-center gap-1 bg-white rounded-full p-1 border border-[#E5E7EB] shadow-sm">
            <button onClick={() => setYearly(false)} className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${!yearly ? 'bg-[#7C3AED] text-white shadow-sm' : 'text-[#6B7280]'}`}>{t('Monthly', '月付')}</button>
            <button onClick={() => setYearly(true)} className={`px-5 py-2 rounded-full text-sm font-semibold transition-all flex items-center gap-2 ${yearly ? 'bg-[#7C3AED] text-white shadow-sm' : 'text-[#6B7280]'}`}>
              {t('Yearly', '年付')}
              <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded-full">{t('Save 33%', '省33%')}</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {plans.map(plan => {
            const displayPrice = yearly && plan.price > 0 ? Math.round(plan.price * 0.67) : plan.price;
            return (
              <div key={plan.key} className={`relative bg-white rounded-2xl border-2 p-6 flex flex-col transition-all ${plan.popular ? 'border-[#7C3AED] shadow-lg shadow-[#7C3AED]/10' : 'border-[#E5E7EB] hover:border-[#D1D5DB]'}`}>
                {plan.popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 inline-flex items-center gap-1 px-3 py-1 bg-gradient-to-r from-[#7C3AED] to-[#6D28D9] text-white text-[10px] font-bold rounded-full shadow-md">
                    <Sparkles className="w-3 h-3" /> {t('Most Popular', '最受欢迎')}
                  </span>
                )}
                <div className="flex items-center gap-2 mb-1">
                  {plan.key === 'pro' ? <Crown className="w-4 h-4 text-amber-500" /> :
                   plan.key === 'enterprise' ? <Building2 className="w-4 h-4 text-blue-500" /> :
                   plan.key === 'starter' ? <Zap className="w-4 h-4 text-[#7C3AED]" /> : null}
                  <h3 className="text-base font-bold text-[#111827]">{t(plan.name, plan.zh)}</h3>
                </div>
                <p className="text-xs text-[#9CA3AF] mb-4">{t(plan.desc, plan.descZh)}</p>
                <div className="mb-6">
                  {plan.price === 0 ? (
                    <span className="text-3xl font-bold text-[#111827]">¥0</span>
                  ) : (
                    <div className="flex items-baseline gap-0.5">
                      <span className="text-3xl font-bold text-[#111827]">¥{displayPrice.toLocaleString()}</span>
                      <span className="text-sm text-[#9CA3AF]">{t(plan.unit, plan.unit)}</span>
                    </div>
                  )}
                  {yearly && plan.price > 0 && (
                    <p className="text-[10px] text-[#9CA3AF] mt-0.5">¥{displayPrice * 12}/年 · {t('Save', '省')} ¥{(plan.price * 12 - displayPrice * 12).toLocaleString()}</p>
                  )}
                </div>
                <Link href={plan.href} className={`block text-center py-2.5 rounded-xl text-sm font-semibold transition-all mb-6 ${plan.popular ? 'bg-[#7C3AED] text-white hover:bg-[#6D28D9]' : plan.key === 'free' ? 'bg-[#F5F5F5] text-[#374151] hover:bg-[#E5E7EB]' : 'bg-white border border-[#E5E7EB] text-[#374151] hover:border-[#D1D5DB]'}`}>
                  {t(plan.cta, plan.ctaZh)}
                </Link>
                {/* Key highlights */}
                <div className="space-y-2 flex-1">
                  {featureRows.filter(r => !r.category && r[plan.key as keyof typeof r] !== undefined).slice(0, 6).map((row, i) => {
                    const val = row[plan.key as keyof typeof row];
                    const zhKey = `${plan.key}Zh` as keyof typeof row;
                    const zhVal = (row as any)[zhKey];
                    return (
                      <div key={i} className="flex items-center gap-2 text-xs">
                        <Check className="w-3 h-3 text-emerald-500 flex-shrink-0" />
                        <span className="text-[#6B7280]">{row.label}: <strong className="text-[#111827]">{zhVal || val}</strong></span>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Feature comparison table */}
      <section className="max-w-5xl mx-auto px-4 pb-20">
        <h2 className="text-2xl font-bold text-[#111827] text-center mb-2">{t('Feature Comparison', '功能对比')}</h2>
        <p className="text-sm text-[#6B7280] text-center mb-10">{t('Detailed breakdown of what each plan includes', '每个套餐包含内容的详细对比')}</p>

        <div className="bg-white rounded-2xl border border-[#E5E7EB] overflow-hidden">
          {/* Header row */}
          <div className="grid grid-cols-[1.5fr_1fr_1fr_1fr_1fr] bg-[#FAFAFA] border-b border-[#E5E7EB]">
            <div className="px-4 py-3" />
            {['Free', 'Starter', 'Pro', 'Enterprise'].map((name, i) => (
              <div key={i} className="px-4 py-3 text-center text-xs font-bold text-[#111827]">{name}</div>
            ))}
          </div>

          {/* Rows */}
          {featureRows.map((row, i) => {
            if (row.category) {
              return (
                <div key={i} className="grid grid-cols-[1.5fr_1fr_1fr_1fr_1fr] bg-[#F5F3FF] border-b border-[#E5E7EB]">
                  <div className="px-4 py-2.5 text-xs font-bold text-[#7C3AED]">{t(row.category, row.zh)}</div>
                  <div className="px-4 py-2.5" /><div className="px-4 py-2.5" /><div className="px-4 py-2.5" /><div className="px-4 py-2.5" />
                </div>
              );
            }
            return (
              <div key={i} className="grid grid-cols-[1.5fr_1fr_1fr_1fr_1fr] border-b border-[#E5E7EB] last:border-0 hover:bg-[#FAFAFA] transition-colors">
                <div className="px-4 py-3 text-xs text-[#374151]">{t(row.label!, row.zh!)}</div>
                {(['free', 'starter', 'pro', 'enterprise'] as const).map(col => {
                  const val = row[col];
                  const zhKey = `${col}Zh` as keyof typeof row;
                  const displayVal = (row as any)[zhKey] || val;
                  return (
                    <div key={col} className="px-4 py-3 text-center text-xs font-medium">
                      {val === true ? <Check className="w-4 h-4 text-emerald-500 mx-auto" /> :
                       val === false ? <Minus className="w-4 h-4 text-[#D1D5DB] mx-auto" /> :
                       <span className="text-[#111827]">{displayVal}</span>}
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </section>

      {/* Trust badges */}
      <section className="max-w-3xl mx-auto px-4 pb-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: Shield, label: 'SSL Encrypted', zh: 'SSL 加密' },
            { icon: RefreshCw, label: 'Cancel Anytime', zh: '随时取消' },
            { icon: CreditCard, label: 'Secure Payment', zh: '安全支付' },
            { icon: Mail, label: 'Email Support', zh: '邮件支持' },
          ].map((item, i) => (
            <div key={i} className="flex flex-col items-center gap-2 p-4 rounded-xl bg-white border border-[#E5E7EB]">
              <item.icon className="w-5 h-5 text-[#7C3AED]" />
              <span className="text-xs font-medium text-[#111827] text-center">{t(item.label, item.zh)}</span>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-2xl mx-auto px-4 pb-24">
        <h2 className="text-2xl font-bold text-[#111827] text-center mb-2">{t('Frequently Asked Questions', '常见问题')}</h2>
        <p className="text-sm text-[#6B7280] text-center mb-10">{t('Everything you need to know about pricing', '关于定价你需要知道的一切')}</p>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div key={i} className="bg-white rounded-xl border border-[#E5E7EB] overflow-hidden">
              <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full flex items-center justify-between px-5 py-4 text-left">
                <span className="text-sm font-semibold text-[#111827]">{t(faq.q, faq.zhQ)}</span>
                {openFaq === i ? <ChevronUp className="w-4 h-4 text-[#9CA3AF] flex-shrink-0" /> : <ChevronDown className="w-4 h-4 text-[#9CA3AF] flex-shrink-0" />}
              </button>
              {openFaq === i && (
                <div className="px-5 pb-4">
                  <p className="text-sm text-[#6B7280] leading-relaxed">{t(faq.a, faq.zhA)}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-[#111827] text-center px-4">
        <h2 className="text-3xl font-bold text-white mb-3">{t('Ready to scale your commerce?', '准备好扩展你的电商业务了吗？')}</h2>
        <p className="text-[#9CA3AF] mb-8">{t('Join thousands of sellers using AI to grow globally.', '加入数千卖家，用 AI 实现全球增长。')}</p>
        <div className="flex items-center justify-center gap-3 flex-wrap">
          <Link href="/auth/register" className="inline-flex items-center gap-2 px-8 py-3.5 bg-white text-[#111827] rounded-xl text-base font-bold hover:bg-[#F5F5F5] transition-all">
            {t('Get Started Free', '免费开始')} <ArrowRight className="w-4 h-4" />
          </Link>
          <Link href="/checkout?plan=starter" className="inline-flex items-center gap-2 px-8 py-3.5 bg-white/10 text-white border border-white/20 rounded-xl text-base font-semibold hover:bg-white/15 transition-all">
            {t('View Plans', '查看方案')}
          </Link>
        </div>
        <p className="text-[#6B7280] text-sm mt-6">✓ {t('No credit card required for Free plan', '免费套餐无需信用卡')} · ✓ {t('7-day free trial on paid plans', '付费套餐 7 天免费试用')} · ✓ {t('Cancel anytime', '随时取消')}</p>
      </section>
    </div>
  );
}
