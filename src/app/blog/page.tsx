'use client';

import Link from 'next/link';
import { ArrowRight, Calendar, Clock, Tag } from 'lucide-react';
import { useLang } from '@/lib/i18n';
import Navbar from '@/components/Navbar';

const posts = [
  {
    slug: 'introducing-commerceos',
    title: 'Introducing CommerceOS — The Global AI Commerce Operating System',
    zh: 'CommerceOS 发布 — 全球 AI 电商操作系统',
    date: '2026-06-26',
    readTime: '5 min',
    tag: 'Product',
    excerpt: 'Why we built CommerceOS and how it helps sellers create, optimize, and publish across 20+ marketplaces with AI.',
    zhExcerpt: '为什么我们要打造 CommerceOS，以及它如何帮助卖家在 20+ 平台上用 AI 创作、优化和发布。',
  },
  {
    slug: 'ai-agents-for-ecommerce',
    title: 'AI Agents for E-commerce — Why Every Marketplace Needs Its Own',
    zh: '电商 AI Agent — 为什么每个平台都需要自己的智能体',
    date: '2026-06-25',
    readTime: '8 min',
    tag: 'AI',
    excerpt: 'How CommerceOS AI Agents understand platform-specific rules and auto-generate optimized content for Amazon, TikTok, Shopee and more.',
    zhExcerpt: 'CommerceOS AI Agent 如何理解平台规则，为 Amazon、TikTok、Shopee 等自动生成优化内容。',
  },
  {
    slug: 'amazon-listing-optimization',
    title: 'The Ultimate Guide to Amazon Listing Optimization with AI',
    zh: 'AI Amazon Listing 优化终极指南',
    date: '2026-06-24',
    readTime: '10 min',
    tag: 'Guide',
    excerpt: 'Step-by-step guide to creating high-converting Amazon listings with AI — from images to A+ content to backend keywords.',
    zhExcerpt: '用 AI 创建高转化 Amazon Listing 的完整指南 — 从图片到 A+ 内容到后端关键词。',
  },
  {
    slug: 'tiktok-shop-video-strategy',
    title: 'TikTok Shop Video Strategy — How AI Makes Viral Product Videos',
    zh: 'TikTok Shop 视频策略 — AI 如何制作爆款商品视频',
    date: '2026-06-23',
    readTime: '7 min',
    tag: 'Guide',
    excerpt: 'Learn how AI-generated hooks, captions, and UGC-style videos can boost your TikTok Shop conversion rates.',
    zhExcerpt: '了解 AI 生成的钩子、字幕和 UGC 风格视频如何提升 TikTok Shop 转化率。',
  },
  {
    slug: 'cross-border-ecommerce-2026',
    title: 'Cross-Border E-commerce in 2026 — Trends, Challenges, and AI Solutions',
    zh: '2026 跨境电商 — 趋势、挑战与 AI 解决方案',
    date: '2026-06-22',
    readTime: '12 min',
    tag: 'Industry',
    excerpt: 'A look at the global cross-border e-commerce landscape and how AI is transforming the way sellers operate.',
    zhExcerpt: '全球跨境电商格局分析，以及 AI 如何改变卖家的运营方式。',
  },
  {
    slug: 'from-photo-to-publish',
    title: 'From Product Photo to Published Listing — The Complete AI Workflow',
    zh: '从产品照片到发布 Listing — 完整 AI 工作流',
    date: '2026-06-20',
    readTime: '6 min',
    tag: 'Tutorial',
    excerpt: 'Walk through the end-to-end CommerceOS workflow — upload a product photo and get marketplace-ready content in minutes.',
    zhExcerpt: '演示完整的 CommerceOS 工作流 — 上传产品照片，几分钟内获得平台就绪的内容。',
  },
];

export default function BlogPage() {
  const { t } = useLang();

  return (
    <>
      <Navbar />
      <div className="pt-24 pb-20">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-16">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#F5F3FF] border border-[#EDE9FE] text-[#7C3AED] text-xs font-semibold mb-6">
              <Tag className="w-3.5 h-3.5" />
              {t('Blog', '博客')}
            </span>
            <h1 className="text-4xl font-extrabold text-[#111827] mb-4">
              {t('CommerceOS Blog', 'CommerceOS 博客')}
            </h1>
            <p className="text-[#6B7280] text-lg max-w-xl mx-auto">
              {t('Insights, guides, and updates on AI-powered global commerce.', 'AI 驱动全球电商的洞察、指南和更新。')}
            </p>
          </div>

          {/* Featured Post */}
          <Link href={`/blog/${posts[0].slug}`} className="group block bg-gradient-to-br from-[#7C3AED] to-[#6D28D9] rounded-3xl p-8 sm:p-10 mb-8 hover:shadow-2xl transition-all">
            <span className="text-xs font-semibold text-white/60 bg-white/10 px-3 py-1 rounded-full mb-4 inline-block">{posts[0].tag}</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3 group-hover:underline">{t(posts[0].title, posts[0].zh)}</h2>
            <p className="text-[#C4B5FD] mb-4 max-w-2xl">{t(posts[0].excerpt, posts[0].zhExcerpt)}</p>
            <div className="flex items-center gap-4 text-white/60 text-xs">
              <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{posts[0].date}</span>
              <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{posts[0].readTime}</span>
              <span className="flex items-center gap-1 text-white/80 font-medium">{t('Read More', '阅读更多')} <ArrowRight className="w-3 h-3" /></span>
            </div>
          </Link>

          {/* Post Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.slice(1).map(post => (
              <Link key={post.slug} href={`/blog/${post.slug}`} className="group bg-white rounded-2xl border border-[#E5E7EB] p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                <span className="text-[10px] font-semibold text-[#7C3AED] bg-[#F5F3FF] px-2.5 py-1 rounded-full mb-3 inline-block">{post.tag}</span>
                <h3 className="text-sm font-bold text-[#111827] mb-2 group-hover:text-[#7C3AED] transition-colors leading-snug">
                  {t(post.title, post.zh)}
                </h3>
                <p className="text-xs text-[#6B7280] leading-relaxed mb-4">{t(post.excerpt, post.zhExcerpt)}</p>
                <div className="flex items-center gap-3 text-[10px] text-[#9CA3AF]">
                  <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{post.date}</span>
                  <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{post.readTime}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
