'use client'
import { PlatformLogo } from "@/components/PlatformLogo";

import { useState } from 'react';
import Link from 'next/link';
import { Globe, Check, Store, Building2, ShoppingBag, Smartphone, Briefcase } from 'lucide-react';
import { useLang } from '@/lib/i18n';

const marketplaces: Record<string, { name: string; color: string; features: string[]; icon: any }> = {
  amazon: { name: 'Amazon', color: '#EF9F27', icon: ShoppingBag, features: ['White Background', '白底图', 'Listing', 'Listing', 'A+ Content', 'A+ 页面', 'SEO Keywords', 'SEO 关键词', 'Product Video', '商品视频'] },
  shopee: { name: 'Shopee', color: '#EF5320', icon: Store, features: ['Campaign Banner', '活动横幅', 'Voucher Poster', '优惠券海报', 'Product Cover', '商品封面', 'Flash Sale', '闪购素材', 'Product Video', '商品视频'] },
  lazada: { name: 'Lazada', color: '#0F146A', icon: Globe, features: ['Hero Image', '主图', 'Gallery', '图集', 'Description', '描述', 'Keywords', '关键词', 'Export', '导出'] },
  tiktok: { name: 'TikTok Shop', color: '#000000', icon: Smartphone, features: ['Viral Video', '爆款视频', 'Product Hooks', '产品钩子', 'Captions', '字幕', 'Hashtags', '标签优化', 'UGC Script', 'UGC 脚本'] },
  taobao: { name: 'Taobao', color: '#F97316', icon: ShoppingBag, features: ['商品主图', '商品主图', '详情页', '详情页', '短视频', '短视频', '标题优化', '标题优化', '营销海报', '营销海报'] },
  temu: { name: 'Temu', color: '#F15A24', icon: Briefcase, features: ['Hero Image', '主图', 'Title', '标题优化', 'Gallery', '图集', 'Rule Monitor', '规则监控', 'Export', '导出'] },
  aliexpress: { name: 'AliExpress', color: '#E62E04', icon: Globe, features: ['Main Image', '主图', 'Detail Images', '详情图', 'Title EN/RU', '多语言标题', 'Keywords', '关键词', 'Export', '导出'] },
  etsy: { name: 'Etsy', color: '#F1641E', icon: Store, features: ['Listing Photos', 'Listing 图片', 'Tags', '标签', 'Description', '描述', 'Video', '视频', 'Shop Banner', '店铺横幅'] },
  ebay: { name: 'eBay', color: '#0064D2', icon: Briefcase, features: ['Gallery Images', '图库', 'Description', '描述', 'Title', '标题', 'Keywords', '关键词', 'Export', '导出'] },
  shopify: { name: 'Shopify', color: '#96BF48', icon: ShoppingBag, features: ['Product Images', '商品图片', 'SEO Meta', 'SEO', 'Collection Banner', '合集横幅', 'Video', '视频', 'Email Assets', '邮件素材'] },
  woocommerce: { name: 'WooCommerce', color: '#96588A', icon: Store, features: ['Product Gallery', '商品图集', 'Alt Text', 'Alt 文案', 'Descriptions', '描述', 'Category Banner', '分类横幅', 'Export CSV', '导出 CSV'] },
};

const cols = 2; // pairs of [en, zh]

function getFeatures(mp: typeof marketplaces['amazon'], lang: string) {
  return lang === 'zh'
    ? mp.features.filter((_, i) => i % cols === 1)
    : mp.features.filter((_, i) => i % cols === 0);
}

export function Marketplaces() {
  const { t, lang } = useLang();

  return (
    <section id="marketplaces" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#F5F3FF] border border-[#EDE9FE] text-[#7C3AED] text-xs font-semibold mb-6">
            <Globe className="w-3.5 h-3.5" />
            {t('Choose Your Marketplace', '选择你的销售平台')}
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#111827] mb-4">
            {t('One Platform. Every Marketplace.', '一个平台，全平台覆盖。')}
          </h2>
          <p className="text-[#6B7280] text-lg max-w-xl mx-auto">
            {t('Every marketplace has unique requirements. CommerceOS auto-adapts AI tools for each one.', '每个平台都有独特的能力。CommerceOS 为每个平台自动适配 AI 工具。')}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Object.entries(marketplaces).map(([id, mp]) => {
            const features = getFeatures(mp, lang);
            return (
              <Link
                key={id}
                href={`/workspace/${id}`}
                className="group bg-white rounded-2xl border border-[#E5E7EB] p-5 hover:border-[#D1D5DB] hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
              >
                <div className="flex items-center gap-3 mb-4">
                  <PlatformLogo platform={id} size={40} />
                  <div>
                    <h3 className="text-sm font-bold text-[#111827] group-hover:text-[#7C3AED] transition-colors">{mp.name}</h3>
                    <p className="text-[10px] text-[#9CA3AF]">{t('AI Workspace', 'AI 工作空间')}</p>
                  </div>
                </div>

                <div className="space-y-1.5">
                  {features.map((f, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-[#6B7280]">
                      <Check className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" /> {f}
                    </div>
                  ))}
                </div>

                <div className="mt-4 text-xs font-semibold text-[#7C3AED] group-hover:gap-2 transition-all inline-flex items-center gap-1">
                  {t('Open Workspace', '打开工作空间')} →
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
