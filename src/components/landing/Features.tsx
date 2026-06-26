'use client';

import Link from 'next/link';
import {
  Camera, Palette, Video, Globe, Megaphone, Building2,
  BarChart3, Bot, FolderOpen, ArrowRight, Sparkles
} from 'lucide-react';
import { useLang } from '@/lib/i18n';

const studios = [
  {
    icon: Camera,
    label: 'Product Studio',
    zh: '商品工作室',
    desc: 'White bg, lifestyle, infographic, size chart — every product image format you need.',
    descZh: '白底图、场景图、信息图、尺码表 — 你需要的每一种商品图片格式。',
    color: '#7C3AED',
    count: '25+ tools',
    countZh: '25+ 工具',
  },
  {
    icon: Palette,
    label: 'Creative Studio',
    zh: '创意工作室',
    desc: 'Campaign banners, posters, social media creatives. Brand-consistent designs.',
    descZh: '活动横幅、海报、社交媒体创意。保持品牌一致的设计。',
    color: '#EC4899',
    count: '18+ tools',
    countZh: '18+ 工具',
  },
  {
    icon: Video,
    label: 'Video Studio',
    zh: '视频工作室',
    desc: 'Product demos, UGC, short videos, live streaming covers for every platform.',
    descZh: '产品展示、UGC、短视频、直播封面，适配每个平台。',
    color: '#EF4444',
    count: '15+ tools',
    countZh: '15+ 工具',
  },
  {
    icon: Globe,
    label: 'Marketplace Studio',
    zh: '平台工作室',
    desc: 'Amazon A+, Shopee banners, Taobao details. Platform-specific content in one click.',
    descZh: 'Amazon A+、Shopee 横幅、淘宝详情页。一键生成平台专属内容。',
    color: '#3B82F6',
    count: '12+ platforms',
    countZh: '12+ 平台',
  },
  {
    icon: Megaphone,
    label: 'Marketing Studio',
    zh: '营销工作室',
    desc: 'Ad creatives, email campaigns, social posts. AI-powered marketing assets.',
    descZh: '广告创意、邮件营销、社交帖子。AI 驱动的营销素材。',
    color: '#F59E0B',
    count: '20+ tools',
    countZh: '20+ 工具',
  },
  {
    icon: Building2,
    label: 'Brand Studio',
    zh: '品牌工作室',
    desc: 'Brand profiles, visual guidelines, tone of voice. Consistent branding across all channels.',
    descZh: '品牌档案、视觉指南、语调风格。全渠道统一的品牌形象。',
    color: '#10B981',
    count: '8+ tools',
    countZh: '8+ 工具',
  },
  {
    icon: Bot,
    label: 'Automation Studio',
    zh: '自动化工作室',
    desc: 'Auto-generate, auto-publish, auto-sync. Let AI run your commerce on autopilot.',
    descZh: '自动生成、自动发布、自动同步。让 AI 自动驾驶你的电商业务。',
    color: '#14B8A6',
    count: '10+ workflows',
    countZh: '10+ 工作流',
  },
  {
    icon: BarChart3,
    label: 'Analytics Studio',
    zh: '分析工作室',
    desc: 'A/B testing, CTR analysis, conversion tracking. Data-driven commerce optimization.',
    descZh: 'A/B 测试、CTR 分析、转化追踪。数据驱动的电商优化。',
    color: '#6366F1',
    count: '12+ reports',
    countZh: '12+ 报告',
  },
  {
    icon: FolderOpen,
    label: 'Asset Library',
    zh: '素材库',
    desc: 'Organize, tag, version, and share all your commerce assets in one place.',
    descZh: '统一管理、标签分类、版本控制和共享你的全部电商素材。',
    color: '#8B5CF6',
    count: 'Unlimited',
    countZh: '无限存储',
  },
];

export function Features() {
  const { t } = useLang();

  return (
    <section className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-14">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-[#E5E7EB] text-[#7C3AED] text-xs font-semibold mb-6">
            <Sparkles className="w-3.5 h-3.5" />
            {t('Commerce Workspace', 'Commerce 工作空间')}
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#111827] mb-4">
            {t('Studios Built for Commerce', '为电商而建的工作室')}
          </h2>
          <p className="text-[#6B7280] text-lg max-w-xl mx-auto">
            {t('Purpose-built studios for every stage of commerce — from product to publishing.', '为电商每个环节量身打造的工作室 — 从商品到发布。')}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {studios.map(studio => (
            <Link
              key={studio.label}
              href="/workspace"
              className="group bg-white rounded-2xl border border-[#E5E7EB] p-6 hover:border-[#D1D5DB] hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
            >
              <div className="flex items-start gap-4">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: studio.color + '12' }}
                >
                  <studio.icon className="w-6 h-6" style={{ color: studio.color }} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-sm font-bold text-[#111827]">{t(studio.label, studio.zh)}</h3>
                    <span className="text-[10px] text-[#9CA3AF] bg-[#F5F5F5] px-1.5 py-0.5 rounded-full font-medium">
                      {t(studio.count, studio.countZh)}
                    </span>
                  </div>
                  <p className="text-xs text-[#6B7280] leading-relaxed">{t(studio.desc, studio.descZh)}</p>
                </div>
                <ArrowRight className="w-4 h-4 text-[#D1D5DB] group-hover:text-[#7C3AED] group-hover:translate-x-1 transition-all flex-shrink-0 mt-1" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
