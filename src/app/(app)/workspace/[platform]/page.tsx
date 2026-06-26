'use client'
import { PlatformLogo } from "@/components/PlatformLogo";
import Link from 'next/link';
import { ArrowLeft, Image, Video, FileText, Search, Zap, Send, Upload, Sparkles } from 'lucide-react';

const platformConfig: Record<string, {
  name: string; zh: string; color: string;
  tools: { icon: any; label: string; zh: string; href: string }[];
}> = {
  amazon: {
    name: 'Amazon', zh: 'Amazon', color: '#EF9F27',
    tools: [
      { icon: Image, label: 'Hero Image', zh: '主图', href: '/workspace/new' },
      { icon: Image, label: 'Lifestyle Image', zh: '场景图', href: '/workspace/new' },
      { icon: Video, label: 'Product Video', zh: '商品视频', href: '/workspace/new' },
      { icon: FileText, label: 'Listing Creator', zh: 'Listing 生成', href: '/workspace/new' },
      { icon: FileText, label: 'A+ Content', zh: 'A+ 内容', href: '/workspace/new' },
      { icon: Search, label: 'SEO Keywords', zh: 'SEO 关键词', href: '/workspace/new' },
      { icon: Zap, label: 'Review Reply', zh: '评论回复', href: '/workspace/new' },
      { icon: Upload, label: 'Export Listing', zh: '导出 Listing', href: '/workspace/new' },
    ],
  },
  shopee: {
    name: 'Shopee', zh: 'Shopee', color: '#EF5320',
    tools: [
      { icon: Image, label: 'Product Cover', zh: '商品封面', href: '/workspace/new' },
      { icon: Image, label: 'Campaign Banner', zh: '活动横幅', href: '/workspace/new' },
      { icon: Image, label: 'Voucher Poster', zh: '优惠券海报', href: '/workspace/new' },
      { icon: Image, label: 'Flash Sale Assets', zh: '闪购素材', href: '/workspace/new' },
      { icon: FileText, label: 'Description', zh: '商品描述', href: '/workspace/new' },
      { icon: Video, label: 'Product Video', zh: '商品视频', href: '/workspace/new' },
      { icon: Upload, label: 'Export', zh: '导出', href: '/workspace/new' },
    ],
  },
  tiktok: {
    name: 'TikTok Shop', zh: 'TikTok Shop', color: '#000000',
    tools: [
      { icon: Video, label: 'Viral Video', zh: '爆款视频', href: '/workspace/new' },
      { icon: FileText, label: 'Hook Generator', zh: '钩子生成器', href: '/workspace/new' },
      { icon: FileText, label: 'Caption', zh: '字幕', href: '/workspace/new' },
      { icon: Search, label: 'Hashtag', zh: '标签优化', href: '/workspace/new' },
      { icon: FileText, label: 'UGC Script', zh: 'UGC 脚本', href: '/workspace/new' },
      { icon: Video, label: 'Product Video', zh: '商品视频', href: '/workspace/new' },
      { icon: Upload, label: 'Export', zh: '导出', href: '/workspace/new' },
    ],
  },
  taobao: {
    name: 'Taobao', zh: '淘宝', color: '#F97316',
    tools: [
      { icon: Image, label: 'Product Main Image', zh: '商品主图', href: '/workspace/new' },
      { icon: Image, label: 'Detail Page', zh: '详情页', href: '/workspace/new' },
      { icon: Image, label: 'SKU Images', zh: 'SKU 图片', href: '/workspace/new' },
      { icon: Video, label: 'Short Video', zh: '短视频', href: '/workspace/new' },
      { icon: FileText, label: 'Product Title', zh: '商品标题', href: '/workspace/new' },
      { icon: Search, label: 'Search Keywords', zh: '搜索关键词', href: '/workspace/new' },
      { icon: Image, label: 'Marketing Poster', zh: '营销海报', href: '/workspace/new' },
      { icon: Upload, label: 'Export', zh: '导出', href: '/workspace/new' },
    ],
  },
  temu: {
    name: 'Temu', zh: 'Temu', color: '#F15A24',
    tools: [
      { icon: Image, label: 'Hero Image', zh: '主图', href: '/workspace/new' },
      { icon: FileText, label: 'Title Optimize', zh: '标题优化', href: '/workspace/new' },
      { icon: Search, label: 'Rule Monitor', zh: '规则监控', href: '/workspace/new' },
      { icon: Image, label: 'Gallery Images', zh: '图集', href: '/workspace/new' },
      { icon: Upload, label: 'Export', zh: '导出', href: '/workspace/new' },
    ],
  },
  lazada: {
    name: 'Lazada', zh: 'Lazada', color: '#0F146A',
    tools: [
      { icon: Image, label: 'Hero Image', zh: '主图', href: '/workspace/new' },
      { icon: Image, label: 'Gallery', zh: '图集', href: '/workspace/new' },
      { icon: FileText, label: 'Description', zh: '描述', href: '/workspace/new' },
      { icon: Video, label: 'Video', zh: '视频', href: '/workspace/new' },
      { icon: Search, label: 'Keywords', zh: '关键词', href: '/workspace/new' },
      { icon: Upload, label: 'Export', zh: '导出', href: '/workspace/new' },
    ],
  },
  aliexpress: {
    name: 'AliExpress', zh: 'AliExpress', color: '#E62E04',
    tools: [
      { icon: Image, label: 'Main Image', zh: '主图', href: '/workspace/new' },
      { icon: Image, label: 'Detail Images', zh: '详情图', href: '/workspace/new' },
      { icon: FileText, label: 'Title EN/RU', zh: '英文/俄文标题', href: '/workspace/new' },
      { icon: Search, label: 'Keywords', zh: '关键词', href: '/workspace/new' },
      { icon: Upload, label: 'Export', zh: '导出', href: '/workspace/new' },
    ],
  },
  etsy: {
    name: 'Etsy', zh: 'Etsy', color: '#F1641E',
    tools: [
      { icon: Image, label: 'Listing Photos', zh: 'Listing 图片', href: '/workspace/new' },
      { icon: Search, label: 'Tags', zh: '标签', href: '/workspace/new' },
      { icon: FileText, label: 'Description', zh: '描述', href: '/workspace/new' },
      { icon: Video, label: 'Video', zh: '视频', href: '/workspace/new' },
      { icon: Image, label: 'Shop Banner', zh: '店铺横幅', href: '/workspace/new' },
    ],
  },
  ebay: {
    name: 'eBay', zh: 'eBay', color: '#0064D2',
    tools: [
      { icon: Image, label: 'Gallery Images', zh: '图库', href: '/workspace/new' },
      { icon: FileText, label: 'Item Description', zh: '商品描述', href: '/workspace/new' },
      { icon: FileText, label: 'Title', zh: '标题', href: '/workspace/new' },
      { icon: Search, label: 'Keywords', zh: '关键词', href: '/workspace/new' },
      { icon: Upload, label: 'Export', zh: '导出', href: '/workspace/new' },
    ],
  },
  shopify: {
    name: 'Shopify', zh: 'Shopify', color: '#96BF48',
    tools: [
      { icon: Image, label: 'Product Images', zh: '商品图片', href: '/workspace/new' },
      { icon: Search, label: 'SEO Meta', zh: 'SEO Meta', href: '/workspace/new' },
      { icon: Image, label: 'Collection Banner', zh: '合集横幅', href: '/workspace/new' },
      { icon: Video, label: 'Video', zh: '视频', href: '/workspace/new' },
      { icon: FileText, label: 'Email Assets', zh: '邮件素材', href: '/workspace/new' },
    ],
  },
  woocommerce: {
    name: 'WooCommerce', zh: 'WooCommerce', color: '#96588A',
    tools: [
      { icon: Image, label: 'Product Gallery', zh: '商品图集', href: '/workspace/new' },
      { icon: FileText, label: 'Alt Text', zh: 'Alt 文案', href: '/workspace/new' },
      { icon: FileText, label: 'Descriptions', zh: '描述', href: '/workspace/new' },
      { icon: Image, label: 'Category Banner', zh: '分类横幅', href: '/workspace/new' },
      { icon: Upload, label: 'Export CSV', zh: '导出 CSV', href: '/workspace/new' },
    ],
  },
};

const platforms = [
  { id: 'amazon', name: 'Amazon', color: '#EF9F27' },
  { id: 'shopee', name: 'Shopee', color: '#EF5320' },
  { id: 'lazada', name: 'Lazada', color: '#0F146A' },
  { id: 'tiktok', name: 'TikTok Shop', color: '#000000' },
  { id: 'taobao', name: 'Taobao', color: '#F97316' },
  { id: 'temu', name: 'Temu', color: '#F15A24' },
  { id: 'aliexpress', name: 'AliExpress', color: '#E62E04' },
  { id: 'etsy', name: 'Etsy', color: '#F1641E' },
  { id: 'ebay', name: 'eBay', color: '#0064D2' },
  { id: 'shopify', name: 'Shopify', color: '#96BF48' },
  { id: 'woocommerce', name: 'WooCommerce', color: '#96588A' },
];

export default function PlatformWorkspace({ params }: { params: { platform: string } }) {
  const config = platformConfig[params.platform];
  if (!config) return <div className="p-8 text-center">Platform not found</div>;

  return (
    <div className="px-8 py-8 max-w-5xl">
      <Link href="/" className="inline-flex items-center gap-1.5 text-sm text-[#6B7280] hover:text-[#111827] mb-6 transition-colors">
        <ArrowLeft className="w-4 h-4" /> Choose Marketplace
      </Link>

      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <PlatformLogo platform={params.platform} size={56} />
        <div>
          <h1 className="text-2xl font-bold text-[#111827]">{config.name} Workspace</h1>
          <p className="text-sm text-[#6B7280] mt-0.5">AI-powered tools optimized for {config.name}</p>
        </div>
      </div>

      {/* Tools Grid */}
      <h2 className="text-sm font-bold text-[#111827] mb-4">Generate &amp; Optimize</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mb-10">
        {config.tools.map((tool, i) => (
          <Link
            key={i}
            href={tool.href}
            className="group flex flex-col items-center gap-3 p-5 rounded-2xl bg-white border border-[#E5E7EB] hover:border-[#D1D5DB] hover:shadow-lg hover:-translate-y-1 transition-all duration-300 text-center"
          >
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: config.color + '14' }}>
              <tool.icon className="w-5 h-5" style={{ color: config.color }} />
            </div>
            <span className="text-xs font-medium text-[#374151] leading-tight">{tool.zh || tool.label}</span>
          </Link>
        ))}
      </div>

      {/* Platform switcher */}
      <h2 className="text-sm font-bold text-[#111827] mb-4">Switch Marketplace</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
        {platforms.map(p => (
          <Link
            key={p.id}
            href={`/workspace/${p.id}`}
            className={`flex items-center gap-2 px-3 py-2.5 rounded-xl text-xs font-medium transition-all ${
              params.platform === p.id
                ? 'bg-[#F5F3FF] border border-[#CECBF6] text-[#7C3AED]'
                : 'bg-white border border-[#E5E7EB] text-[#374151] hover:border-[#D1D5DB]'
            }`}
          >
            <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: p.color }} />
            {p.name}
          </Link>
        ))}
      </div>
    </div>
  );
}
