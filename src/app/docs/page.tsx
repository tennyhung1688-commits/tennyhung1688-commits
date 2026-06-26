'use client';

import Link from 'next/link';
import {
  Book, Zap, Globe, Code, Image, Video, FileText,
  ArrowRight, Terminal, Puzzle, Cpu, Search
} from 'lucide-react';
import { useLang } from '@/lib/i18n';
import Navbar from '@/components/Navbar';

const docSections = [
  {
    title: 'Getting Started',
    zh: '快速开始',
    icon: Zap,
    items: [
      { label: 'Quick Start Guide', zh: '快速入门指南', href: '/workspace/new' },
      { label: 'Create Your First Project', zh: '创建第一个项目', href: '/workspace/new' },
      { label: 'Connect a Marketplace', zh: '连接电商平台', href: '/marketplaces' },
      { label: 'Generate Your First Image', zh: '生成第一张图片', href: '/workspace/new' },
    ],
  },
  {
    title: 'AI Generation',
    zh: 'AI 生成',
    icon: Image,
    items: [
      { label: 'Image Generation API', zh: '图片生成 API', href: '/developers' },
      { label: 'Video Generation API', zh: '视频生成 API', href: '/developers' },
      { label: 'Copywriting API', zh: '文案生成 API', href: '/developers' },
      { label: 'SEO Optimization API', zh: 'SEO 优化 API', href: '/developers' },
      { label: 'Translation API', zh: '翻译 API', href: '/developers' },
    ],
  },
  {
    title: 'Platforms',
    zh: '平台指南',
    icon: Globe,
    items: [
      { label: 'Amazon Integration', zh: 'Amazon 集成', href: '/workspace/amazon' },
      { label: 'Shopee Integration', zh: 'Shopee 集成', href: '/workspace/shopee' },
      { label: 'TikTok Shop Integration', zh: 'TikTok Shop 集成', href: '/workspace/tiktok' },
      { label: 'Taobao Integration', zh: '淘宝集成', href: '/workspace/taobao' },
      { label: 'Shopify Integration', zh: 'Shopify 集成', href: '/workspace/shopify' },
    ],
  },
  {
    title: 'API Reference',
    zh: 'API 参考',
    icon: Code,
    items: [
      { label: 'Authentication', zh: '身份验证', href: '/developers' },
      { label: 'Rate Limits', zh: '速率限制', href: '/developers' },
      { label: 'Error Codes', zh: '错误代码', href: '/developers' },
      { label: 'Webhook Events', zh: 'Webhook 事件', href: '/developers' },
      { label: 'Pagination', zh: '分页', href: '/developers' },
    ],
  },
  {
    title: 'Workflows',
    zh: '工作流',
    icon: Puzzle,
    items: [
      { label: 'Workflow Orchestrator', zh: '工作流编排器', href: '/workflow' },
      { label: 'Custom Pipelines', zh: '自定义管线', href: '/workflow/new' },
      { label: 'Automation Rules', zh: '自动化规则', href: '/workflow/new' },
      { label: 'Batch Processing', zh: '批量处理', href: '/workspace/new' },
    ],
  },
  {
    title: 'Enterprise',
    zh: '企业版',
    icon: Cpu,
    items: [
      { label: 'White Label Setup', zh: '白标设置', href: '/pricing' },
      { label: 'SSO Configuration', zh: 'SSO 配置', href: '/pricing' },
      { label: 'Custom AI Models', zh: '定制 AI 模型', href: '/pricing' },
      { label: 'SLA & Support', zh: 'SLA 与支持', href: '/pricing' },
    ],
  },
];

export default function DocsPage() {
  const { t } = useLang();

  return (
    <>
      <Navbar />
      <div className="pt-24 pb-20">
        <div className="max-w-6xl mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-16">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#F5F3FF] border border-[#EDE9FE] text-[#7C3AED] text-xs font-semibold mb-6">
              <Book className="w-3.5 h-3.5" />
              {t('Documentation', '文档')}
            </span>
            <h1 className="text-4xl font-extrabold text-[#111827] mb-4">
              {t('CommerceOS Documentation', 'CommerceOS 文档')}
            </h1>
            <p className="text-[#6B7280] text-lg max-w-2xl mx-auto">
              {t('Everything you need to know about building with CommerceOS — from getting started to advanced workflows.', '关于使用 CommerceOS 构建的一切 — 从入门到高级工作流。')}
            </p>

            {/* Search */}
            <div className="relative max-w-md mx-auto mt-8">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9CA3AF]" />
              <input
                placeholder={t('Search docs...', '搜索文档...')}
                className="w-full pl-10 pr-4 py-3 border border-[#E5E7EB] rounded-xl text-sm bg-white focus:ring-2 focus:ring-[#7C3AED]/20 outline-none transition-all"
              />
            </div>
          </div>

          {/* Doc sections */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {docSections.map(section => (
              <div key={section.title} className="bg-white rounded-2xl border border-[#E5E7EB] p-6 hover:border-[#D1D5DB] hover:shadow-sm transition-all">
                <div className="flex items-center gap-2.5 mb-4">
                  <div className="w-8 h-8 rounded-lg bg-[#F5F3FF] flex items-center justify-center">
                    <section.icon className="w-4 h-4 text-[#7C3AED]" />
                  </div>
                  <h2 className="text-sm font-bold text-[#111827]">{t(section.title, section.zh)}</h2>
                </div>
                <div className="space-y-2">
                  {section.items.map((item, i) => (
                    <Link
                      key={i}
                      href={item.href}
                      className="flex items-center justify-between px-3 py-2 rounded-lg text-xs text-[#6B7280] hover:text-[#7C3AED] hover:bg-[#F5F3FF] transition-all group"
                    >
                      {t(item.label, item.zh)}
                      <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Quick start CTA */}
          <section className="mt-16 bg-gradient-to-r from-[#7C3AED] to-[#6D28D9] rounded-3xl p-10 text-center">
            <h2 className="text-2xl font-bold text-white mb-3">
              {t('New to CommerceOS?', '刚接触 CommerceOS？')}
            </h2>
            <p className="text-[#C4B5FD] mb-6 max-w-md mx-auto">
              {t('Follow our 5-minute quick start guide and generate your first AI-powered product image.', '跟随 5 分钟快速入门指南，生成你的第一张 AI 商品图。')}
            </p>
            <Link
              href="/workspace/new"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-white text-[#7C3AED] rounded-xl text-sm font-bold hover:bg-[#F5F5F5] shadow-lg transition-all"
            >
              {t('Start Building', '开始构建')}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </section>
        </div>
      </div>
    </>
  );
}
