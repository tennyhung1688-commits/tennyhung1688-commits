'use client'
import { PlatformLogo } from "@/components/PlatformLogo";

import Link from 'next/link';
import { ArrowRight, Globe, Check, Building2 } from 'lucide-react';
import { useLang } from '@/lib/i18n';
import Navbar from '@/components/Navbar';

const platforms = [
  {
    id: 'amazon', name: 'Amazon', color: '#EF9F27', region: 'Global',
    users: '300M+', features: ['Listing Generator', 'A+ Content', 'White Background', 'SEO Keywords', 'Review Reply', 'Product Video', 'Brand Registry', 'FBA Ready'],
    featuresZh: ['Listing 生成', 'A+ 内容', '白底图', 'SEO 关键词', '评论回复', '商品视频', '品牌注册', 'FBA 就绪'],
    desc: 'The world\'s largest e-commerce marketplace. CommerceOS auto-generates Amazon-compliant listings, A+ content, and brand assets.',
    descZh: '全球最大的电商平台。CommerceOS 自动生成符合 Amazon 规范的 Listing、A+ 内容和品牌素材。',
  },
  {
    id: 'shopee', name: 'Shopee', color: '#EF5320', region: 'Southeast Asia',
    users: '200M+', features: ['Product Cover', 'Campaign Banner', 'Voucher Poster', 'Flash Sale', 'Description', 'Video', 'Live Stream', 'Multi-Language'],
    featuresZh: ['商品封面', '活动横幅', '优惠券海报', '闪购素材', '描述', '视频', '直播素材', '多语言'],
    desc: 'Southeast Asia\'s leading marketplace. Generate localized content for TH, VN, ID, PH, MY, SG markets.',
    descZh: '东南亚领先的电商平台。为泰国、越南、印尼、菲律宾、马来西亚、新加坡市场生成本地化内容。',
  },
  {
    id: 'tiktok', name: 'TikTok Shop', color: '#000000', region: 'Global',
    users: '150M+', features: ['Viral Video', 'Product Hooks', 'Captions', 'Hashtags', 'UGC Script', 'Live Cover', 'Ad Creative', 'Trend Analysis'],
    featuresZh: ['爆款视频', '产品钩子', '字幕', '标签优化', 'UGC 脚本', '直播封面', '广告创意', '趋势分析'],
    desc: 'Social commerce powerhouse. Generate short-form video content optimized for the TikTok algorithm.',
    descZh: '社交电商的领导者。生成针对 TikTok 算法优化的短视频内容。',
  },
  {
    id: 'taobao', name: 'Taobao / Tmall', color: '#F97316', region: 'China',
    users: '500M+', features: ['商品主图', '详情页', 'SKU 图', '短视频', '标题优化', '搜索关键词', '营销海报', '天猫素材'],
    featuresZh: ['商品主图', '详情页', 'SKU 图', '短视频', '标题优化', '搜索关键词', '营销海报', '天猫素材'],
    desc: 'China\'s largest e-commerce ecosystem. Full suite of Taobao/Tmall content generation tools.',
    descZh: '中国最大的电商生态。完整的淘宝/天猫内容生成工具链。',
  },
  {
    id: 'temu', name: 'Temu', color: '#F15A24', region: 'Global',
    users: '100M+', features: ['Hero Image', 'Title Optimize', 'Price Track', 'Rule Monitor', 'Gallery', 'Export'],
    featuresZh: ['主图', '标题优化', '价格追踪', '规则监控', '图集', '导出'],
    desc: 'Fast-growing cross-border marketplace. Stay compliant with Temu\'s evolving platform rules.',
    descZh: '快速增长的跨境平台。自动适配 Temu 不断更新的平台规则。',
  },
  {
    id: 'lazada', name: 'Lazada', color: '#0F146A', region: 'Southeast Asia',
    users: '100M+', features: ['Hero Image', 'Gallery', 'Description', 'Video', 'Keywords', 'Multi-Language', 'Export'],
    featuresZh: ['主图', '图集', '描述', '视频', '关键词', '多语言', '导出'],
    desc: 'Alibaba\'s Southeast Asia flagship. Multi-language content for 6 countries.',
    descZh: '阿里巴巴东南亚旗舰。6 国多语言内容生成。',
  },
  {
    id: 'shopify', name: 'Shopify', color: '#96BF48', region: 'Global',
    users: '2M+ stores', features: ['Product Images', 'SEO Meta', 'Collection Banner', 'Email Assets', 'Alt Text', 'Theme Compatible', 'App Ready'],
    featuresZh: ['商品图片', 'SEO Meta', '合集横幅', '邮件素材', 'Alt 文案', '主题兼容', 'App 就绪'],
    desc: 'The leading e-commerce platform for DTC brands. Generate assets for any Shopify theme.',
    descZh: '领先的 DTC 品牌电商平台。生成适配任何 Shopify 主题的素材。',
  },
  {
    id: 'etsy', name: 'Etsy', color: '#F1641E', region: 'Global',
    users: '90M+', features: ['Listing Photos', 'Tags', 'Description', 'Video', 'Shop Banner', 'SEO', 'Handmade Style'],
    featuresZh: ['Listing 图片', '标签', '描述', '视频', '店铺横幅', 'SEO', '手作风格'],
    desc: 'The marketplace for handmade, vintage, and unique goods. Craft-optimized image generation.',
    descZh: '手作、复古和独特商品的市场。针对手作风格优化的图片生成。',
  },
  {
    id: 'ebay', name: 'eBay', color: '#0064D2', region: 'Global',
    users: '130M+', features: ['Gallery Images', 'Description', 'Title', 'Keywords', 'Export', 'Auction Ready'],
    featuresZh: ['图库', '描述', '标题', '关键词', '导出', '拍卖就绪'],
    desc: 'Global auction and marketplace pioneer. Optimized for both fixed-price and auction listings.',
    descZh: '全球拍卖和电商先驱。针对一口价和拍卖两种模式优化。',
  },
];

export default function MarketplacesPage() {
  const { t, lang } = useLang();

  return (
    <>
      <Navbar />
      <div className="pt-24 pb-20">
        <div className="max-w-6xl mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-16">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#F5F3FF] border border-[#EDE9FE] text-[#7C3AED] text-xs font-semibold mb-6">
              <Globe className="w-3.5 h-3.5" />
              {t('Supported Marketplaces', '支持的电商平台')}
            </span>
            <h1 className="text-4xl font-extrabold text-[#111827] mb-4">
              {t('Sell Everywhere with One Platform', '一个平台，全球销售')}
            </h1>
            <p className="text-[#6B7280] text-lg max-w-2xl mx-auto">
              {t('CommerceOS supports all major global e-commerce marketplaces. Each marketplace has its own AI Agent, tools, and workflow — optimized for that platform\'s unique requirements.', 'CommerceOS 支持所有主流全球电商平台。每个平台都有自己的 AI Agent、工具和工作流 — 针对该平台的独特要求优化。')}
            </p>
          </div>

          {/* Platform cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {platforms.map(plat => (
              <Link
                key={plat.id}
                href={`/workspace/${plat.id}`}
                className="group bg-white rounded-2xl border border-[#E5E7EB] p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                {/* Header */}
                <div className="flex items-center gap-3 mb-4">
                  <PlatformLogo platform={plat.id} size={48} />
                  <div>
                    <h2 className="text-base font-bold text-[#111827]">{plat.name}</h2>
                    <p className="text-xs text-[#9CA3AF]">{plat.region} · {plat.users} {t('users', '用户')}</p>
                  </div>
                </div>

                {/* Description */}
                <p className="text-xs text-[#6B7280] leading-relaxed mb-4">
                  {t(plat.desc, plat.descZh)}
                </p>

                {/* Features */}
                <div className="space-y-1.5 mb-4">
                  {(lang === 'zh' ? plat.featuresZh : plat.features).map((f, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-[#6B7280]">
                      <Check className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" /> {f}
                    </div>
                  ))}
                </div>

                <div className="flex items-center gap-1 text-xs font-semibold text-[#7C3AED] group-hover:gap-2 transition-all">
                  {t('Open Workspace', '打开工作空间')} <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
