'use client';

import Link from 'next/link';
import { ArrowRight, Puzzle, Camera, Palette, Film, Image, PenTool, Search, FileText, MessageCircle, Wand, Globe, BarChart3, Package, Sparkles } from 'lucide-react';
import { useLang } from '@/lib/i18n';

const apps = [
  { icon: Package, name: 'Amazon Listing Generator', zh: 'Amazon Listing 生成器', href: '/skills' },
  { icon: Palette, name: 'Shopee Banner Creator', zh: 'Shopee 横幅创建器', href: '/skills' },
  { icon: Film, name: 'TikTok Video Creator', zh: 'TikTok 视频创建器', href: '/skills' },
  { icon: Image, name: 'Temu Hero Image Creator', zh: 'Temu 主图创建器', href: '/skills' },
  { icon: PenTool, name: 'Lazada Description Generator', zh: 'Lazada 描述生成器', href: '/skills' },
  { icon: Search, name: 'Etsy SEO Optimizer', zh: 'Etsy SEO 优化器', href: '/skills' },
  { icon: FileText, name: 'Amazon A+ Generator', zh: 'Amazon A+ 生成器', href: '/skills' },
  { icon: MessageCircle, name: 'Review Reply Assistant', zh: '评论回复助手', href: '/skills' },
  { icon: Wand, name: 'AI Background Remover', zh: 'AI 背景去除', href: '/workspace/new' },
  { icon: Camera, name: 'AI Product Photography', zh: 'AI 商品摄影', href: '/workspace/new' },
  { icon: Globe, name: 'Multi-Language Translator', zh: '多语言翻译', href: '/skills' },
  { icon: BarChart3, name: 'Analytics Reporter', zh: '数据分析报告', href: '/analytics' },
];

export function CommerceApps() {
  const { t } = useLang();

  return (
    <section id="apps" className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-14">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-[#E5E7EB] text-[#7C3AED] text-xs font-semibold mb-6">
            <Puzzle className="w-3.5 h-3.5" />
            {t('Commerce Apps', 'Commerce 应用')}
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#111827] mb-4">
            {t('100+ Commerce AI Apps', '100+ Commerce AI 应用')}
          </h2>
          <p className="text-[#6B7280] text-lg max-w-xl mx-auto">
            {t('Purpose-built apps for every marketplace task. Pick, run, publish — no learning curve.', '为每个平台任务定制的应用。选择、运行、发布 — 零学习成本。')}
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {apps.map(app => (
            <Link
              key={app.name}
              href={app.href}
              className="group flex flex-col items-center gap-3 p-5 rounded-2xl border border-[#E5E7EB] hover:border-[#7C3AED]/30 hover:shadow-lg hover:shadow-[#7C3AED]/5 hover:-translate-y-1 transition-all duration-300 bg-white text-center"
            >
              <app.icon className="w-6 h-6 text-[#7C3AED] group-hover:scale-110 transition-transform duration-300" />
              <span className="text-xs font-medium text-[#374151] group-hover:text-[#7C3AED] transition-colors leading-tight">
                {t(app.name, app.zh)}
              </span>
            </Link>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link
            href="/skills"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white border border-[#E5E7EB] rounded-xl text-sm font-semibold text-[#374151] hover:border-[#D1D5DB] hover:shadow-sm transition-all"
          >
            <Sparkles className="w-4 h-4" />
            {t('Explore All 100+ Apps', '探索全部 100+ 应用')}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
