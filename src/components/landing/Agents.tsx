'use client';

import { PlatformLogo } from "@/components/PlatformLogo";

import Link from 'next/link';
import { ArrowRight, Zap, Bot, Globe, Image, FileText, Video, Layout, MessageSquare, Send } from 'lucide-react';
import { useLang } from '@/lib/i18n';

const agents = [
  {
    id: 'amazon',
    name: 'Amazon Agent',
    zh: 'Amazon 代理',
    color: '#EF9F27',
    features: ['Listing Generator', 'A+ Content', 'White Background', 'SEO Keywords', 'Review Reply', 'Export Listing'],
    featuresZh: ['Listing 生成', 'A+ 内容', '白底图', 'SEO 关键词', '评论回复', '导出 Listing'],
    href: '/agents',
  },
  {
    id: 'shopee',
    name: 'Shopee Agent',
    zh: 'Shopee 代理',
    color: '#EF5320',
    features: ['Product Cover', 'Campaign Banner', 'Voucher Poster', 'Flash Sale Assets', 'Product Description'],
    featuresZh: ['商品封面', '活动横幅', '优惠券海报', '闪购素材', '商品描述'],
    href: '/agents',
  },
  {
    id: 'tiktok',
    name: 'TikTok Shop Agent',
    zh: 'TikTok Shop 代理',
    color: '#000000',
    features: ['Viral Video', 'Product Hooks', 'Captions', 'Hashtags', 'UGC Script'],
    featuresZh: ['爆款视频', '产品钩子', '字幕', '标签优化', 'UGC 脚本'],
    href: '/agents',
  },
  {
    id: 'taobao',
    name: 'Taobao Agent',
    zh: '淘宝代理',
    color: '#F97316',
    features: ['主图设计', '详情页', 'SKU 图', '短视频', '标题优化', '搜索关键词'],
    featuresZh: ['主图设计', '详情页', 'SKU 图', '短视频', '标题优化', '搜索关键词'],
    href: '/agents',
  },
  {
    id: 'lazada',
    name: 'Lazada Agent',
    zh: 'Lazada 代理',
    color: '#0F146A',
    features: ['Hero Image', 'Gallery', 'Description', 'Video', 'Keywords', 'Export'],
    featuresZh: ['主图', '图集', '描述', '视频', '关键词', '导出'],
    href: '/agents',
  },
  {
    id: 'temu',
    name: 'Temu Agent',
    zh: 'Temu 代理',
    color: '#F15A24',
    features: ['Hero Image', 'Title Optimize', 'Price Track', 'Rule Monitor', 'Export'],
    featuresZh: ['主图', '标题优化', '价格追踪', '规则监控', '导出'],
    href: '/agents',
  },
  {
    id: 'aliexpress',
    name: 'AliExpress Agent',
    zh: 'AliExpress 代理',
    color: '#E62E04',
    features: ['Main Image', 'Detail Images', 'Title EN/RU', 'Keywords', 'Export'],
    featuresZh: ['主图', '详情图', '英文/俄文标题', '关键词', '导出'],
    href: '/agents',
  },
  {
    id: 'etsy',
    name: 'Etsy Agent',
    zh: 'Etsy 代理',
    color: '#F1641E',
    features: ['Listing Photos', 'Tags', 'Description', 'Video', 'Shop Banner'],
    featuresZh: ['Listing 图片', '标签', '描述', '视频', '店铺横幅'],
    href: '/agents',
  },
  {
    id: 'ebay',
    name: 'eBay Agent',
    zh: 'eBay 代理',
    color: '#0064D2',
    features: ['Gallery Images', 'Item Description', 'Title', 'Keywords', 'Export'],
    featuresZh: ['图库', '商品描述', '标题', '关键词', '导出'],
    href: '/agents',
  },
  {
    id: 'shopify',
    name: 'Shopify Agent',
    zh: 'Shopify 代理',
    color: '#96BF48',
    features: ['Product Images', 'SEO Meta', 'Collection Banner', 'Video', 'Email Assets'],
    featuresZh: ['商品图片', 'SEO Meta', '合集横幅', '视频', '邮件素材'],
    href: '/agents',
  },
  {
    id: 'woocommerce',
    name: 'WooCommerce Agent',
    zh: 'WooCommerce 代理',
    color: '#96588A',
    features: ['Product Gallery', 'Alt Text', 'Descriptions', 'Category Banner', 'Export CSV'],
    featuresZh: ['商品图集', 'Alt 文案', '描述', '分类横幅', '导出 CSV'],
    href: '/agents',
  },
];

export function Agents() {
  const { t } = useLang();

  return (
    <section id="agents" className="py-24 bg-[#FAFAFA]">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-14">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-[#E5E7EB] text-[#7C3AED] text-xs font-semibold mb-6">
            <Bot className="w-3.5 h-3.5" />
            {t('Marketplace AI Agents', 'Marketplace AI 代理')}
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#111827] mb-4">
            {t('Every Marketplace Has Its Own AI Agent', '每个平台都有自己的 AI Agent')}
          </h2>
          <p className="text-[#6B7280] text-lg max-w-xl mx-auto">
            {t('AI Agents that deeply understand each platform — generating images, videos, copywriting, SEO, and listings optimized for every marketplace.', '深入理解每个平台规则的 AI 代理 — 为每个电商平台生成优化的图片、视频、文案、SEO 和 Listing。')}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {agents.map(agent => (
            <Link
              key={agent.id}
              href={agent.href}
              className="group bg-white rounded-2xl border border-[#E5E7EB] p-5 hover:border-[#D1D5DB] hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
            >
              {/* Header */}
              <div className="flex items-center gap-3 mb-4">
                <PlatformLogo platform={agent.id} size={40} />
                <h3 className="text-sm font-bold text-[#111827]">{t(agent.name, agent.zh)}</h3>
              </div>

              {/* Features */}
              <div className="space-y-1.5 mb-4">
                {agent.id === 'taobao'
                  ? agent.featuresZh.map((f, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-[#6B7280]">
                        <Zap className="w-3 h-3 text-[#9CA3AF]" />
                        {f}
                      </div>
                    ))
                  : agent.featuresZh.map((f, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-[#6B7280]">
                        <Zap className="w-3 h-3 text-[#9CA3AF]" />
                        {t(agent.features[i], f)}
                      </div>
                    ))}
              </div>

              {/* CTA */}
              <div className="flex items-center gap-1 text-xs font-semibold text-[#7C3AED] group-hover:gap-2 transition-all">
                {t('Open Agent', '打开代理')}
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
