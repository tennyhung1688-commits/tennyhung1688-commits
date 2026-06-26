'use client';

import { FileText, Languages, Search, Layers, Image, Video, Globe, Wand2, Bot, Upload, Rocket } from 'lucide-react';
import { useLang } from '@/lib/i18n';
import { Card } from '@/components/common/Card';
import { images } from '@/lib/images';

const features = [
  { icon: Image, en: 'AI Images', zh: 'AI 图片', desc: 'Studio-quality product photos, lifestyle scenes, white background — one click generation', descZh: '影棚级产品图、场景图、白底图 — 一键生成', gradient: 'from-[#7C3AED] to-[#6D28D9]' },
  { icon: Video, en: 'AI Videos', zh: 'AI 视频', desc: 'UGC short videos, unboxing, product demos — TikTok to Amazon ready', descZh: '种草短视频、开箱、产品展示 — 全平台适配', gradient: 'from-[#8B5CF6] to-[#7C3AED]' },
  { icon: FileText, en: 'AI Copywriting', zh: 'AI 文案', desc: 'Titles, bullets, descriptions, ads — 76K combinations, your brand voice', descZh: '标题、卖点、描述、广告文案 — 76K 种组合，品牌语调', gradient: 'from-[#F59E0B] to-[#D97706]' },
  { icon: Search, en: 'SEO Engine', zh: 'SEO 引擎', desc: 'Auto-optimized keywords, backend search terms, ranking boost built-in', descZh: '自动优化搜索关键词，内建排名提升', gradient: 'from-[#3B82F6] to-[#2563EB]' },
  { icon: Languages, en: 'Translation', zh: '多语言翻译', desc: 'Auto-translate listings to 11 languages for Amazon EU, Shopee, Lazada, and more', descZh: '自动翻译到 11 种语言，覆盖 Amazon 欧洲、Shopee、Lazada', gradient: 'from-[#10B981] to-[#059669]' },
  { icon: Bot, en: 'AI Agent', zh: 'AI Agent', desc: 'Market analysis, competitor research, auto-optimization — your AI e-commerce assistant', descZh: '市场分析、竞品调研、自动优化 — 你的 AI 电商助手', gradient: 'from-[#EC4899] to-[#DB2777]' },
  { icon: Upload, en: 'Publish', zh: '一键发布', desc: 'Publish directly to Amazon, Taobao, TikTok, Shopify, JD, Shopee and more', descZh: '直发 Amazon、淘宝、TikTok、Shopify、京东、Shopee 等', gradient: 'from-[#6366F1] to-[#4F46E5]' },
  { icon: Rocket, en: 'One Workflow', zh: '一站式工作流', desc: 'Upload once → AI does everything → Publish everywhere. No prompt needed.', descZh: '上传一次 → AI 自动完成一切 → 全球发布。无需 Prompt。', gradient: 'from-[#7C3AED] to-[#4C1D95]' },
];

export function Features() {
  const { t } = useLang();
  return (
    <section className="py-28 bg-[#FAFAFA] relative overflow-hidden">
      {/* Subtle gradient accent */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-50/40 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

      <div className="max-w-6xl mx-auto px-4 relative">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 backdrop-blur-md border border-purple-100 text-[#7C3AED] text-xs font-semibold mb-6 shadow-sm">
            <Wand2 className="w-3.5 h-3.5" />
            {t('Not Just a Tool — An Operating System', '不是工具，是操作系统')}
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#111827] mb-3 tracking-tight">
            {t('Upload Once. AI Does Everything.', '上传一次，AI 完成一切。')}
          </h2>
          <p className="text-[#6B7280] text-lg max-w-xl mx-auto">
            {t('No design team. No freelancers. No prompt engineering. One unified workflow from product photo to global publishing.', '无需设计团队、无需外包、无需学习 Prompt。从商品照片到全球发布，一条全自动工作流。')}
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {features.map((item, i) => (
            <Card key={i} hover className="p-6 group">
              {/* Icon with gradient background */}
              <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${item.gradient} flex items-center justify-center mb-5 shadow-md group-hover:shadow-lg group-hover:scale-105 transition-all duration-300`}>
                <item.icon className="w-5 h-5 text-white" />
              </div>

              <h3 className="text-base font-bold text-[#111827] mb-2">{t(item.en, item.zh)}</h3>
              <p className="text-sm text-[#6B7280] leading-relaxed">{t(item.desc, item.descZh)}</p>
            </Card>
          ))}
        </div>

        {/* Visual Showcase — Image-based cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-5">
          <Card hover className="overflow-hidden group">
            <div className="aspect-[16/9] relative bg-gray-50 overflow-hidden">
              <img src={images.showcase[0]} alt="Product Photography" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#111827]/60 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="text-white font-bold text-xl">{t('Studio Quality Photos', '影棚级图片')}</h3>
                <p className="text-white/70 text-sm mt-1">{t('White background, lifestyle, infographic — AI generates all types.', '白底图、场景图、信息图 — AI 全类型生成。')}</p>
              </div>
            </div>
          </Card>
          <Card hover className="overflow-hidden group">
            <div className="aspect-[16/9] relative bg-gray-50 overflow-hidden">
              <img src={images.showcase[2]} alt="AI Videos" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#111827]/60 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="text-white font-bold text-xl">{t('Engaging Short Videos', '高转化短视频')}</h3>
                <p className="text-white/70 text-sm mt-1">{t('UGC style, unboxing, product demos — optimized for every platform.', '种草、开箱、演示 — 各平台自动优化。')}</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}
