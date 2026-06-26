'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Check, Sparkles } from 'lucide-react';
import { useLang } from '@/lib/i18n';
import { Card } from '@/components/common/Card';

const plans = [
  {
    name: 'Free', zh: '免费', price: 0, unit: '',
    desc: 'Try it out', descZh: '免费体验',
    features: ['5 images / mo', '1 video / mo', 'Unlimited copywriting', '130+ Skills', '1 platform connection', 'Community support'],
    featuresZh: ['每月 5 张图', '每月 1 条视频', '无限文案', '130+ Skills', '1 个平台连接', '社区支持'],
  },
  {
    name: 'Starter', zh: '入门', price: 59, unit: '/月',
    desc: 'For sellers', descZh: '个人卖家',
    features: ['200 images / mo', '15 videos / mo', 'Unlimited copy + SEO', '130+ Skills + Workflow', '3 platform connections', 'Brand Center', 'HD quality, no watermark'],
    featuresZh: ['每月 200 张图', '每月 15 条视频', '无限文案+SEO', '130+ Skills+Workflow', '3 个平台连接', '品牌中心', '高清无水印'],
    popular: true,
  },
  {
    name: 'Pro', zh: '专业', price: 199, unit: '/月',
    desc: 'For teams', descZh: '专业团队',
    features: ['500 images / mo', '60 videos / mo', 'AI Agents included', 'Commerce Memory', '10 platform connections', 'A/B Testing', 'Analytics + Prediction', 'Priority rendering'],
    featuresZh: ['每月 500 张图', '每月 60 条视频', 'AI 代理', 'Commerce Memory', '10 个平台连接', 'A/B 测试', '数据分析+预测', '优先渲染'],
  },
  {
    name: 'Enterprise', zh: '企业', price: 999, unit: '/月起',
    desc: 'For orgs', descZh: '企业定制',
    features: ['Unlimited everything', 'Custom AI models', 'API + SDK access', 'White label', 'SLA guarantee', 'Dedicated support', 'SSO & Team management'],
    featuresZh: ['无限额度', '定制 AI 模型', 'API+SDK 接入', '白标方案', 'SLA 保障', '专属支持', 'SSO 团队管理'],
  },
];

export function Pricing() {
  const { t } = useLang();
  const [yearly, setYearly] = useState(false);

  return (
    <section className="py-28 bg-warm-white relative overflow-hidden">
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-brand-50/50 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2" />

      <div className="max-w-6xl mx-auto px-4 relative">
        <div className="text-center mb-8">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/70 backdrop-blur-md border border-brand-100 text-brand-700 text-xs font-semibold mb-6 shadow-sm">
            {t('Pricing', '定价方案')}
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-warm-800 mb-3 tracking-tight">
            {t('Simple, Transparent Pricing', '简单透明的定价')}
          </h2>
          <p className="text-warm-400 text-lg max-w-lg mx-auto">
            {t('Start free, upgrade when you grow. No hidden fees.', '免费开始，按需升级。无隐藏费用。')}
          </p>
        </div>

        <div className="flex justify-center mb-12">
          <div className="inline-flex items-center gap-1 bg-warm-100/60 rounded-full p-1 backdrop-blur-sm">
            <button
              onClick={() => setYearly(false)}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                !yearly ? 'bg-white text-warm-800 shadow-sm' : 'text-warm-400'
              }`}
            >
              {t('Monthly', '月付')}
            </button>
            <button
              onClick={() => setYearly(true)}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 flex items-center gap-2 ${
                yearly ? 'bg-white text-warm-800 shadow-sm' : 'text-warm-400'
              }`}
            >
              {t('Yearly', '年付')}
              <span className="text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                {t('Save 33%', '省 33%')}
              </span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {plans.map((plan) => {
            const displayPrice = plan.price === 0
              ? '0'
              : yearly
              ? Math.round(plan.price * 0.67)
              : plan.price;

            return (
              <Card
                key={plan.name}
                hover
                variant={plan.popular ? 'glass' : 'default'}
                className={`p-6 flex flex-col relative ${plan.popular ? 'ring-1 ring-brand-200 shadow-lg shadow-brand-100/30' : ''}`}
              >
                {plan.popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 inline-flex items-center gap-1 px-3 py-1 bg-gradient-to-r from-brand-600 to-brand-700 text-white text-[11px] font-bold rounded-full shadow-md shadow-brand-500/25">
                    <Sparkles className="w-3 h-3" />
                    {t('Most Popular', '最受欢迎')}
                  </span>
                )}

                <h3 className="text-base font-bold text-warm-800 mb-1">{t(plan.name, plan.zh)}</h3>
                <p className="text-sm text-warm-400 mb-5">{t(plan.desc, plan.descZh)}</p>

                <div className="mb-6">
                  {plan.price === 0 ? (
                    <span className="text-3xl font-bold text-warm-800">¥0</span>
                  ) : (
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl font-bold text-warm-800">
                        ¥{displayPrice.toLocaleString()}
                      </span>
                      <span className="text-warm-400 text-sm font-medium">{t(plan.unit, plan.unit)}</span>
                    </div>
                  )}
                  {yearly && plan.price > 0 && (
                    <p className="text-xs text-warm-400 mt-1">
                      原价 ¥{plan.price}/月 · 年付省 {Math.round((1 - 0.67) * 100)}%
                    </p>
                  )}
                </div>

                <ul className="space-y-2.5 mb-8 flex-1">
                  {plan.featuresZh.map((f, j) => (
                    <li key={j} className="flex items-start gap-2.5 text-sm text-warm-600">
                      <Check className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                      {t(plan.features[j], f)}
                    </li>
                  ))}
                </ul>

                <Link
                  href={
                    plan.name === 'Enterprise' ? '/workspace' :
                    plan.name === 'Free' ? '/auth/register' :
                    `/checkout?plan=${plan.name.toLowerCase()}`
                  }
                  className={`block text-center py-3 rounded-xl text-sm font-semibold transition-all duration-300 ${
                    plan.popular
                      ? 'bg-gradient-to-br from-brand-600 to-brand-700 text-white shadow-md shadow-brand-500/25 hover:shadow-lg hover:shadow-brand-500/35 hover:-translate-y-0.5'
                      : plan.name === 'Free'
                      ? 'bg-warm-100 text-warm-700 hover:bg-warm-200'
                      : 'bg-white border border-warm-200 text-warm-700 hover:border-brand-200 hover:text-brand-700'
                  }`}
                >
                  {plan.name === 'Enterprise'
                    ? t('Contact Sales', '联系销售')
                    : plan.name === 'Free'
                    ? t('Get Started Free', '免费开始')
                    : t('Subscribe', '立即订阅')}
                </Link>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
