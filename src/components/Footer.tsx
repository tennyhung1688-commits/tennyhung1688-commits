'use client';

import Link from 'next/link';
import { useLang } from '@/lib/i18n';
import { Globe } from 'lucide-react';

const footerColumns = [
  {
    title: 'Products',
    zh: '产品',
    links: [
      { label: 'AI Images', zh: 'AI 图片', href: '/workspace/new' },
      { label: 'AI Video', zh: 'AI 视频', href: '/workspace/new' },
      { label: 'AI Listing', zh: 'AI Listing', href: '/workspace/new' },
      { label: 'AI SEO', zh: 'AI SEO', href: '/workspace/new' },
      { label: 'AI Translation', zh: 'AI 翻译', href: '/workspace/new' },
    ],
  },
  {
    title: 'Solutions',
    zh: '解决方案',
    links: [
      { label: 'Amazon Sellers', zh: 'Amazon 卖家', href: '/workspace/amazon' },
      { label: 'Shopee Sellers', zh: 'Shopee 卖家', href: '/workspace/shopee' },
      { label: 'TikTok Sellers', zh: 'TikTok 卖家', href: '/workspace/tiktok' },
      { label: 'Taobao Sellers', zh: '淘宝卖家', href: '/workspace/taobao' },
      { label: 'Shopify Sellers', zh: 'Shopify 卖家', href: '/workspace/shopify' },
    ],
  },
  {
    title: 'Developers',
    zh: '开发者',
    links: [
      { label: 'API Reference', zh: 'API 参考', href: '/developers' },
      { label: 'Webhooks', zh: 'Webhooks', href: '/developers' },
      { label: 'SDK', zh: 'SDK', href: '/developers' },
      { label: 'Documentation', zh: '文档', href: '/docs' },
      { label: 'Status', zh: '服务状态', href: '/status' },
    ],
  },
  {
    title: 'Resources',
    zh: '资源',
    links: [
      { label: 'Pricing', zh: '定价', href: '/pricing' },
      { label: 'Templates', zh: '模板', href: '/templates' },
      { label: 'Blog', zh: '博客', href: '/blog' },
      { label: 'Help Center', zh: '帮助中心', href: '/docs' },
    ],
  },
  {
    title: 'Company',
    zh: '公司',
    links: [
      { label: 'About', zh: '关于', href: '/' },
      { label: 'Contact', zh: '联系', href: 'mailto:hello@commerceos.ai' },
      { label: 'Privacy', zh: '隐私', href: '/legal/privacy' },
      { label: 'Terms', zh: '条款', href: '/legal/terms' },
    ],
  },
];

export default function Footer() {
  const { t, lang, setLang } = useLang();
  return (
    <footer className="bg-[#111827] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 pt-16 pb-10">
        {/* Columns */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-8 mb-12">
          {/* Brand column */}
          <div className="col-span-2 sm:col-span-3 lg:col-span-1">
            <Link href="/" className="flex items-center gap-2.5 mb-3">
              <div className="w-8 h-8 rounded-lg bg-[#7C3AED] flex items-center justify-center">
                <span className="text-white text-[10px] font-bold">COS</span>
              </div>
              <span className="text-lg font-bold text-white">CommerceOS</span>
            </Link>
            <p className="text-xs text-[#9CA3AF] leading-relaxed mb-4">
              {t('Global AI Commerce Operating System — one platform for product images, videos, listings, translation, marketing and publishing.', '全球 AI 电商操作系统 — 一个平台完成商品图片、视频、Listing、翻译、营销与发布。')}
            </p>
            <button
              onClick={() => setLang(lang === 'en' ? 'zh' : 'en')}
              className="inline-flex items-center gap-1.5 text-xs text-[#9CA3AF] hover:text-white transition-colors"
            >
              <Globe className="w-3.5 h-3.5" />
              {lang === 'en' ? '中文' : 'English'}
            </button>
          </div>

          {/* Link columns */}
          {footerColumns.map(col => (
            <div key={col.title}>
              <h3 className="text-xs font-bold text-white mb-4 tracking-wide uppercase">{t(col.title, col.zh)}</h3>
              <ul className="space-y-2.5">
                {col.links.map(link => (
                  <li key={link.label}>
                    <Link href={link.href} className="text-xs text-[#9CA3AF] hover:text-white transition-colors">
                      {t(link.label, link.zh)}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-white/5">
          <p className="text-xs text-[#6B7280]">&copy; 2026 CommerceOS. {t('All rights reserved.', '保留所有权利。')}</p>
          <div className="flex items-center gap-4 text-xs">
            <Link href="/legal/privacy" className="text-[#6B7280] hover:text-white transition-colors">{t('Privacy', '隐私')}</Link>
            <Link href="/legal/terms" className="text-[#6B7280] hover:text-white transition-colors">{t('Terms', '条款')}</Link>
            <span className="text-[#6B7280]">{t('100+ countries', '100+ 国家')}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
