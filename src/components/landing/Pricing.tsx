'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Check, Sparkles, Crown, Building2 } from 'lucide-react';
import { useLang } from '@/lib/i18n';

import { pricingPlans, yearlyPrice } from '@/data/pricing';

export function Pricing() {
  const { t } = useLang();
  const [yearly, setYearly] = useState(false);

  return (
    <section className="py-24 bg-[#FAFAFA]">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-10">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-[#E5E7EB] text-[#7C3AED] text-xs font-semibold mb-6">
            {t('Pricing', '定价方案')}
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#111827] mb-4">
            {t('Simple, Transparent Pricing', '简单透明的定价')}
          </h2>
          <p className="text-[#6B7280] text-lg max-w-lg mx-auto">
            {t('Start free, upgrade when you grow. No hidden fees.', '免费开始，按需升级。无隐藏费用。')}
          </p>
        </div>

        <div className="flex justify-center mb-12">
          <div className="inline-flex items-center gap-1 bg-white rounded-full p-1 border border-[#E5E7EB] shadow-sm">
            <button onClick={() => setYearly(false)} className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${!yearly ? 'bg-[#7C3AED] text-white shadow-sm' : 'text-[#6B7280]'}`}>{t('Monthly', '月付')}</button>
            <button onClick={() => setYearly(true)} className={`px-5 py-2 rounded-full text-sm font-semibold transition-all flex items-center gap-2 ${yearly ? 'bg-[#7C3AED] text-white shadow-sm' : 'text-[#6B7280]'}`}>
              {t('Yearly', '年付')}
              <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded-full">{t('Save 33%', '省 33%')}</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {pricingPlans.map(plan => {
            const displayPrice = yearly && plan.price > 0 ? yearlyPrice(plan.price) : plan.price;
            return (
              <div key={plan.key} className={`relative bg-white rounded-2xl border-2 p-6 flex flex-col transition-all ${plan.popular ? 'border-[#7C3AED] shadow-xl shadow-[#7C3AED]/10' : 'border-[#E5E7EB] hover:border-[#D1D5DB]'}`}>
                {plan.popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 inline-flex items-center gap-1 px-3 py-1 bg-gradient-to-r from-[#7C3AED] to-[#6D28D9] text-white text-[10px] font-bold rounded-full shadow-md">
                    <Sparkles className="w-3 h-3" /> {t('Most Popular', '最受欢迎')}
                  </span>
                )}
                <div className="flex items-center gap-2 mb-1">
                  {plan.key === "business" && <Crown className="w-4 h-4 text-amber-500" />}
                  {plan.key === 'enterprise' && <Building2 className="w-4 h-4 text-blue-500" />}
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
                <ul className="space-y-2 mb-8 flex-1">
                  {plan.featuresZh.map((f, j) => (
                    <li key={j} className="flex items-start gap-2 text-xs text-[#6B7280]">
                      <Check className="w-3.5 h-3.5 text-emerald-500 mt-0.5 shrink-0" />
                      {t(plan.features[j], f)}
                    </li>
                  ))}
                </ul>
                <Link href={plan.href} className={`block text-center py-2.5 rounded-xl text-sm font-semibold transition-all ${plan.popular ? 'bg-[#7C3AED] text-white hover:bg-[#6D28D9]' : plan.key === 'starter' ? 'bg-[#F5F5F5] text-[#374151] hover:bg-[#E5E7EB]' : 'bg-white border border-[#E5E7EB] text-[#374151] hover:border-[#D1D5DB]'}`}>
                  {t(plan.cta, plan.ctaZh)}
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
