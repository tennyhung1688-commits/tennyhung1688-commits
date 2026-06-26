'use client';

import Link from 'next/link';
import { ArrowRight, Sparkles, Globe, Zap, Puzzle, Cpu, Layers, TrendingUp } from 'lucide-react';
import { useLang } from '@/lib/i18n';

const stats = [
  { value: '100+', label: 'AI Models', zh: 'AI 模型', icon: Cpu },
  { value: '20+', label: 'Marketplaces', zh: '电商平台', icon: Globe },
  { value: '1-Click', label: 'Commerce Creation', zh: '一键商品创作', icon: Zap },
  { value: 'Millions', label: 'Assets Generated', zh: '素材已生成', icon: TrendingUp },
];

export function Hero() {
  const { t } = useLang();

  return (
    <section className="relative pt-32 pb-20 overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[900px] bg-gradient-to-b from-[#7C3AED]/10 via-[#7C3AED]/5 to-transparent rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-60 -right-40 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl" />
      <div className="absolute top-40 -left-40 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl" />

      <div className="max-w-4xl mx-auto px-4 text-center relative">
        <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#7C3AED] text-white text-sm font-bold mb-8 shadow-lg shadow-[#7C3AED]/20">
          <Sparkles className="w-4 h-4" />
          {t('Global AI Commerce Operating System', '全球 AI 电商操作系统')}
        </span>

        <p className="text-xl sm:text-2xl text-[#374151] max-w-2xl mx-auto mb-6 leading-relaxed font-semibold">
          {t('Create · Optimize · Publish · Scale', '创作 · 优化 · 发布 · 增长')}
        </p>

        <p className="text-base sm:text-lg text-[#6B7280] max-w-2xl mx-auto mb-10 leading-relaxed">
          {t(
            'Everything global sellers need in one AI platform.',
            '跨境卖家所需的一切，一个平台完成。'
          )}
        </p>

        <div className="flex items-center justify-center gap-4 flex-wrap mb-12">
          <Link href="#marketplaces" className="inline-flex items-center gap-2 px-8 py-4 bg-[#7C3AED] text-white rounded-2xl text-base font-bold shadow-lg shadow-[#7C3AED]/25 hover:bg-[#6D28D9] hover:shadow-xl hover:-translate-y-0.5 transition-all">
            {t('Get Started', '开始使用')}
            <ArrowRight className="w-5 h-5" />
          </Link>
          <Link href="/pricing" className="inline-flex items-center gap-2 px-8 py-4 bg-white border border-[#E5E7EB] text-[#374151] rounded-2xl text-base font-bold hover:border-[#D1D5DB] hover:shadow-sm transition-all">
            {t('View Pricing', '查看定价')}
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto mb-8">
          {stats.map((stat, i) => (
            <div key={i} className="bg-white/60 backdrop-blur-md rounded-2xl border border-[#E5E7EB] p-5 hover:shadow-sm hover:-translate-y-0.5 transition-all duration-200">
              <stat.icon className="w-5 h-5 text-[#7C3AED] mb-2 opacity-60" />
              <p className="text-2xl font-extrabold text-[#111827] tracking-tight">{stat.value}</p>
              <p className="text-xs text-[#6B7280] mt-0.5">{t(stat.label, stat.zh)}</p>
            </div>
          ))}
        </div>

        {/* Trusted by */}
        <p className="text-xs text-[#9CA3AF]">{t('Trusted by sellers in 100+ countries', '全球 100+ 国家卖家信赖')}</p>
      </div>
    </section>
  );
}
