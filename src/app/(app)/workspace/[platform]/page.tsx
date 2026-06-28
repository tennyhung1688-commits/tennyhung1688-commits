'use client'
import { useParams, useRouter } from 'next/navigation';
import { PlatformLogo } from "@/components/PlatformLogo";
import Link from 'next/link';
import { ArrowLeft, Image, Video, FileText, Search, Zap, Send, Upload, Sparkles } from 'lucide-react';
import { useEffect } from 'react';

const platformConfig: Record<string, {
  name: string; zh: string; color: string;
  tools: { icon: any; label: string; zh: string; href: string }[];
}> = {
  amazon: {
    name: 'Amazon', zh: 'Amazon', color: '#EF9F27',
    tools: [
      { icon: Image, label: 'White Background', zh: '白底主图', href: '/workspace/new?platform=amazon&mode=white-bg' },
      { icon: Image, label: 'Lifestyle Scene', zh: '场景图', href: '/workspace/new?platform=amazon&mode=lifestyle' },
      { icon: Video, label: 'Product Video', zh: '商品视频', href: '/workspace/new?platform=amazon&mode=video' },
      { icon: Image, label: 'Infographic', zh: '信息图', href: '/workspace/new?platform=amazon&mode=infographic' },
      { icon: FileText, label: 'Listing Creator', zh: 'Listing 生成', href: '/workspace/new?platform=amazon&mode=listing' },
      { icon: FileText, label: 'A+ Content', zh: 'A+ 内容', href: '/workspace/new?platform=amazon&mode=aplus' },
      { icon: Search, label: 'SEO Keywords', zh: 'SEO 关键词', href: '/workspace/new?platform=amazon&mode=seo' },
    ],
  },
  shopee: {
    name: 'Shopee', zh: 'Shopee', color: '#EF5320',
    tools: [
      { icon: Image, label: 'Product Cover', zh: '商品封面', href: '/workspace/new?platform=shopee&mode=white-bg' },
      { icon: Image, label: 'Lifestyle Scene', zh: '场景图', href: '/workspace/new?platform=shopee&mode=lifestyle' },
      { icon: Video, label: 'Product Video', zh: '商品视频', href: '/workspace/new?platform=shopee&mode=video' },
      { icon: FileText, label: 'Description', zh: '商品描述', href: '/workspace/new?platform=shopee&mode=listing' },
    ],
  },
  tiktok: {
    name: 'TikTok Shop', zh: 'TikTok Shop', color: '#000000',
    tools: [
      { icon: Video, label: 'Viral Video', zh: '爆款视频', href: '/workspace/new?platform=tiktok&mode=video' },
      { icon: Image, label: 'Product Cover', zh: '商品封面', href: '/workspace/new?platform=tiktok&mode=white-bg' },
      { icon: Image, label: 'Lifestyle Scene', zh: '场景图', href: '/workspace/new?platform=tiktok&mode=lifestyle' },
      { icon: FileText, label: 'Caption', zh: '字幕/文案', href: '/workspace/new?platform=tiktok&mode=listing' },
    ],
  },
  taobao: {
    name: 'Taobao', zh: '淘宝', color: '#F97316',
    tools: [
      { icon: Image, label: 'Product Main Image', zh: '商品主图', href: '/workspace/new?platform=taobao&mode=white-bg' },
      { icon: Image, label: 'Lifestyle Scene', zh: '场景图', href: '/workspace/new?platform=taobao&mode=lifestyle' },
      { icon: Video, label: 'Short Video', zh: '短视频', href: '/workspace/new?platform=taobao&mode=video' },
      { icon: FileText, label: 'Product Title', zh: '商品标题', href: '/workspace/new?platform=taobao&mode=listing' },
    ],
  },
  shopify: {
    name: 'Shopify', zh: 'Shopify', color: '#96BF48',
    tools: [
      { icon: Image, label: 'Product Photo', zh: '商品照片', href: '/workspace/new?platform=shopify&mode=white-bg' },
      { icon: Image, label: 'Lifestyle Scene', zh: '场景图', href: '/workspace/new?platform=shopify&mode=lifestyle' },
      { icon: FileText, label: 'Description', zh: '商品描述', href: '/workspace/new?platform=shopify&mode=listing' },
    ],
  },
  lazada: {
    name: 'Lazada', zh: 'Lazada', color: '#0F1470',
    tools: [
      { icon: Image, label: 'Product Cover', zh: '商品封面', href: '/workspace/new?platform=lazada&mode=white-bg' },
      { icon: Image, label: 'Lifestyle Scene', zh: '场景图', href: '/workspace/new?platform=lazada&mode=lifestyle' },
      { icon: FileText, label: 'Description', zh: '商品描述', href: '/workspace/new?platform=lazada&mode=listing' },
    ],
  },
  aliexpress: {
    name: 'AliExpress', zh: 'AliExpress', color: '#E62E04',
    tools: [
      { icon: Image, label: 'Product Photo', zh: '商品照片', href: '/workspace/new?platform=aliexpress&mode=white-bg' },
      { icon: Image, label: 'Lifestyle Scene', zh: '场景图', href: '/workspace/new?platform=aliexpress&mode=lifestyle' },
      { icon: FileText, label: 'Description', zh: '商品描述', href: '/workspace/new?platform=aliexpress&mode=listing' },
    ],
  },
  temu: {
    name: 'Temu', zh: 'Temu', color: '#F15A24',
    tools: [
      { icon: Image, label: 'Product Photo', zh: '商品照片', href: '/workspace/new?platform=temu&mode=white-bg' },
      { icon: Image, label: 'Lifestyle Scene', zh: '场景图', href: '/workspace/new?platform=temu&mode=lifestyle' },
      { icon: FileText, label: 'Description', zh: '商品描述', href: '/workspace/new?platform=temu&mode=listing' },
    ],
  },
  ebay: {
    name: 'eBay', zh: 'eBay', color: '#0064D2',
    tools: [
      { icon: Image, label: 'Product Photo', zh: '商品照片', href: '/workspace/new?platform=ebay&mode=white-bg' },
      { icon: Image, label: 'Lifestyle Scene', zh: '场景图', href: '/workspace/new?platform=ebay&mode=lifestyle' },
      { icon: FileText, label: 'Description', zh: '商品描述', href: '/workspace/new?platform=ebay&mode=listing' },
    ],
  },
  etsy: {
    name: 'Etsy', zh: 'Etsy', color: '#F1641E',
    tools: [
      { icon: Image, label: 'Product Photo', zh: '商品照片', href: '/workspace/new?platform=etsy&mode=white-bg' },
      { icon: Image, label: 'Lifestyle Scene', zh: '场景图', href: '/workspace/new?platform=etsy&mode=lifestyle' },
      { icon: FileText, label: 'Description', zh: '商品描述', href: '/workspace/new?platform=etsy&mode=listing' },
    ],
  },
  woocommerce: {
    name: 'WooCommerce', zh: 'WooCommerce', color: '#96588A',
    tools: [
      { icon: Image, label: 'Product Photo', zh: '商品照片', href: '/workspace/new?platform=woocommerce&mode=white-bg' },
      { icon: Image, label: 'Lifestyle Scene', zh: '场景图', href: '/workspace/new?platform=woocommerce&mode=lifestyle' },
      { icon: FileText, label: 'Description', zh: '商品描述', href: '/workspace/new?platform=woocommerce&mode=listing' },
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

export default function PlatformWorkspace() {
  const params = useParams();
  const router = useRouter();
  const platform = params?.platform as string || '';
  const config = platformConfig[platform];

  // Redirect known non-platform paths
  useEffect(() => {
    const redirects: Record<string, string> = {
      models: '/models',
      skills: '/skills',
      products: '/products',
      workflow: '/workflow',
      analytics: '/analytics',
      settings: '/settings',
      assets: '/assets',
      publish: '/publish',
      brands: '/brands',
    };
    if (redirects[platform]) {
      router.replace(redirects[platform]);
    }
  }, [platform, router]);

  if (!config) return <div className="p-8 text-center text-[#6B7280] pt-24">Platform not found: {platform}</div>;

  return (
    <div className="px-8 py-8 max-w-5xl">
      <Link href="/" className="inline-flex items-center gap-1.5 text-sm text-[#6B7280] hover:text-[#111827] mb-6 transition-colors">
        <ArrowLeft className="w-4 h-4" /> Choose Marketplace
      </Link>

      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <PlatformLogo platform={platform} size={56} />
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
              platform === p.id
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
