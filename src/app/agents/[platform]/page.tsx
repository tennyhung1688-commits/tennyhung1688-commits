'use client'
import { PlatformLogo } from "@/components/PlatformLogo";
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Check, Sparkles, Image, Video, FileText, Search, Send, Upload } from 'lucide-react';
import Navbar from '@/components/Navbar';

const agents: Record<string, any> = {
  amazon: { name: 'Amazon Agent', zh: 'Amazon', color: '#EF9F27', desc: 'The world\'s largest marketplace. Generates listings, A+ content, and brand assets that meet Amazon\'s strict requirements.', zhDesc: '全球最大的电商平台。生成符合 Amazon 严格要求的 Listing、A+ 内容和品牌素材。', steps: ['Upload product photos', '上��产品照片', 'Agent analyzes product category and requirements', 'Agent 分析产品品类和要求', 'Auto-generates White BG, Lifestyle, Infographic images', '自动生成白底图、场景图、信息图', 'Generates listing: title, bullets, description, keywords', '生成 Listing：标题、要点、描述、关键词', 'Creates A+ Content with brand story and comparison', '创建 A+ 内容（品牌故事和对比模块）', 'Optimizes SEO with backend search terms', '通过后端搜索词优化 SEO', 'Packages for export or direct publish', '打包导出或直接发布'], capabilities: ['White Background Images', '白底图', 'Lifestyle Images', '场景图', 'Infographic Images', '信息图', 'Listing Generator', 'Listing 生成', 'A+ Content Creator', 'A+ 内容', 'SEO Keywords', 'SEO 关键词', 'Review Reply', '评论回复', 'Brand Registry Support', '品牌注册支持'] },

  shopee: { name: 'Shopee Agent', zh: 'Shopee', color: '#EF5320', desc: 'Southeast Asia\'s leading marketplace. Creates localized content for TH, VN, ID, PH, MY, SG with campaign-ready assets.', zhDesc: '东南亚领先平台。为泰国、越南、印尼、菲律宾、马来西亚、新加坡创建本地化内容和活动素材。', steps: ['Upload product photos', '上传产品照片', 'Agent identifies target countries and campaigns', 'Agent 识别目标国家和活动', 'Generates product cover image (1:1, optimized)', '生成商品封面（1:1 优化版）', 'Creates campaign banners for ongoing promotions', '创建活动横幅（适配进行中的促销）', 'Designs voucher posters and flash sale graphics', '设计优惠券海报和闪购图', 'Writes localized product descriptions in 6 languages', '写 6 种语言的本地化商品描述', 'Exports for Shopee Seller Center', '导出到 Shopee 卖家中心'], capabilities: ['Product Cover', '商品封面', 'Campaign Banner', '活动横幅', 'Voucher Poster', '优惠券海报', 'Flash Sale Assets', '闪购素材', 'Product Description', '商品描述', 'Multi-Language Content', '多语言内容', 'Live Stream Cover', '直播封面'] },

  tiktok: { name: 'TikTok Shop Agent', zh: 'TikTok Shop', color: '#000000', desc: 'Social commerce powerhouse. Creates viral-ready short videos, hooks, captions, and UGC scripts optimized for the TikTok algorithm.', zhDesc: '社交电商领导者。创建针对 TikTok 算法优化的爆款短视频、钩子、字幕和 UGC 脚本。', steps: ['Upload product or brief', '上传产品或简介', 'Agent analyzes trending formats and hooks', 'Agent 分析热门格式和钩子', 'Generates viral video script with hook structure', '生成带有钩子结构的爆款视频脚本', 'Creates product video (9:16 vertical)', '创建产品视频（9:16 竖屏）', 'Writes captions and hashtags for discovery', '撰写字幕和发现标签', 'Generates UGC-style voiceover script', '生成 UGC 风格配音脚本', 'Exports for TikTok Shop Seller Center', '导出到 TikTok Shop 卖家中心'], capabilities: ['Viral Video', '爆款视频', 'Product Hooks', '产品钩子', 'Captions', '字幕', 'Hashtags', '标签优化', 'UGC Script', 'UGC 脚本', 'Live Cover', '直播封面', 'Ad Creative', '广告创意', 'Trend Analysis', '趋势分析'] },

  taobao: { name: 'Taobao Agent', zh: '淘宝', color: '#F97316', desc: 'China\'s largest e-commerce ecosystem. Complete suite for Taobao/Tmall content with Chinese marketplace-specific optimization.', zhDesc: '中国最大的电商生态。完整的淘宝/天猫内容生成工具链，针对中国电商平台优化。', steps: ['上传产品照片', '上传产品照片', 'Agent 分析商品属性和类目要求', 'Agent 分析商品属性和类目要求', '生成商品主图（800×800 白底）', '生成商品主图（800×800 白底）', '创建详情页（长图 + 模块化内容）', '创建详情页（长图 + 模块化内容）', '生成 SKU 图和颜色变体', '生成 SKU 图和颜色变体', '优化商品标题（搜索关键词策略）', '优化商品标题（搜索关键词策略）', '生成营销海报和促销素材', '生成营销海报和促销素材'], capabilities: ['商品主图', '商品主图', '详情页', '详情页', 'SKU 图片', 'SKU 图片', '短视频', '短视频', '标题优化', '标题优化', '搜索关键词', '搜索关键词', '营销海报', '营销海报'] },

  shopify: { name: 'Shopify Agent', zh: 'Shopify', color: '#96BF48', desc: 'The leading DTC platform. Generates theme-compatible product images, SEO metadata, and email marketing assets.', zhDesc: '领先的 DTC 平台。生成主题兼容的产品图片、SEO 元数据和邮件营销素材。', steps: ['Upload product images', '上传产品图片', 'Agent analyzes your Shopify theme', 'Agent 分析你的 Shopify 主题', 'Generates theme-optimized product images', '生成主题优化的产品图片', 'Creates collection banners and category images', '创建合集横幅和分类图片', 'Writes SEO meta titles and descriptions', '编写 SEO 元标题和描述', 'Generates email marketing visuals', '生成邮件营销视觉', 'Exports with proper alt text and naming', '导出带有正确 alt 文案和命名的文件'], capabilities: ['Product Images', '商品图片', 'SEO Meta', 'SEO 元数据', 'Collection Banner', '合集横幅', 'Email Assets', '邮件素材', 'Alt Text', 'Alt 文案', 'Theme Compatible', '主题兼容'] },

  temu: { name: 'Temu Agent', zh: 'Temu', color: '#F15A24', desc: 'Fast-growing cross-border platform. Auto-adapts to Temu\'s evolving rules, pricing requirements, and visual standards.', zhDesc: '快速增长的跨境平台。自动适配 Temu 不断更新的规则、价格要求和视觉标准。', steps: ['Upload product with pricing', '上传产品及价格信息', 'Agent checks Temu rule compliance', 'Agent 检查 Temu 规则合规性', 'Generates hero image (optimized for Temu)', '生成主图（Temu 优化版）', 'Creates gallery images with required specs', '创建符合规格的图集', 'Writes optimized title with competitive keywords', '撰写带有竞争性关键词的标题', 'Packages for bulk upload', '打包批量上传'], capabilities: ['Hero Image', '主图', 'Title Optimize', '标题优化', 'Price Track', '价格追踪', 'Rule Monitor', '规则监控', 'Gallery Images', '图集', 'Bulk Export', '批量导出'] },

  lazada: { name: 'Lazada Agent', zh: 'Lazada', color: '#0F146A', desc: 'Alibaba\'s Southeast Asia flagship. Multi-language content for 6 countries with campaign-ready assets.', zhDesc: '阿里巴巴东南亚旗舰。6 国多语言内容生成，活动就绪素材。', steps: ['Upload product', '上传产品', 'Agent identifies target countries', 'Agent 识别目标国家', 'Generates hero image for each country variant', '为每个国家变体生成主图', 'Creates gallery with required image count', '创建必需数量的图集', 'Writes descriptions in local languages', '编写本地语言描述', 'Optimizes keywords per country', '按国家优化关键词', 'Exports for Lazada Seller Center', '导出到 Lazada 卖家中心'], capabilities: ['Hero Image', '主图', 'Gallery', '图集', 'Description', '描述', 'Keywords', '关键词', 'Multi-Language', '多语言', 'Campaign Ready', '活动就绪'] },

  aliexpress: { name: 'AliExpress Agent', zh: 'AliExpress', color: '#E62E04', desc: 'Global B2C marketplace. Multi-language content (EN/RU/ES) with international shipping-ready assets.', zhDesc: '全球 B2C 平台。多语言内容（英文/俄文/西班牙文），国际物流就绪素材。', steps: ['Upload product', '上传产品', 'Agent identifies target regions', 'Agent 识别目标地区', 'Generates main image with region-specific requirements', '生成符合地区要求的主图', 'Creates detail images with size/color variants', '创建带有尺寸/颜色变体的详情图', 'Writes titles in EN, RU, ES', '编写英文、俄文、西班牙文标题', 'Optimizes keywords per region', '按地区优化关键词', 'Exports for AliExpress Seller Center', '导出到 AliExpress 卖家中心'], capabilities: ['Main Image', '主图', 'Detail Images', '详情图', 'Title EN/RU', '英文/俄文标题', 'Keywords', '关键词', 'Size Chart', '尺码表', 'Multi-Region', '多地区适配', 'Export', '导出'] },

  etsy: { name: 'Etsy Agent', zh: 'Etsy', color: '#F1641E', desc: 'The marketplace for handmade, vintage, and unique goods. Craft-optimized content with Etsy\'s unique aesthetic.', zhDesc: '手作、复古和独特商品的市场。针对 Etsy 独特美学的匠心内容。', steps: ['Upload product photos', '上传产品照片', 'Agent analyzes product style and category', 'Agent 分析产品风格和类目', 'Generates warm, craft-style listing photos', '生成温暖手作风格的 Listing 图片', 'Creates shop banner consistent with brand', '创建与品牌一致的店铺横幅', 'Writes descriptive, story-driven listings', '编写描述性、故事化的 Listing', 'Optimizes 13 tags for Etsy search', '优化 13 个 Etsy 搜索标签', 'Exports for Etsy Seller Dashboard', '导出到 Etsy 卖家面板'], capabilities: ['Listing Photos', 'Listing 图片', 'Tags', '标签', 'Description', '描述', 'Video', '视频', 'Shop Banner', '店铺横幅', 'SEO', 'SEO', 'Handmade Style', '手作风格'] },

  ebay: { name: 'eBay Agent', zh: 'eBay', color: '#0064D2', desc: 'Global auction and marketplace pioneer. Optimized for both fixed-price and auction-style listings.', zhDesc: '全球拍卖和电商先驱。针对一口价和拍卖两种模式优化。', steps: ['Upload product', '上传产品', 'Agent detects listing type (auction/fixed)', 'Agent 检测 Listing 类型（拍卖/一口价）', 'Generates gallery images with eBay specs', '生成符合 eBay 规格的图库', 'Creates optimized title with keywords', '创建带有关键词的优化标题', 'Writes detailed item description', '编写详细商品描述', 'Packages for eBay listing tool', '打包到 eBay Listing 工具'], capabilities: ['Gallery Images', '图库', 'Description', '描述', 'Title', '标题', 'Keywords', '关键词', 'Export', '导出', 'Auction Ready', '拍卖就绪', 'Fixed Price', '一口价'] },

  woocommerce: { name: 'WooCommerce Agent', zh: 'WooCommerce', color: '#96588A', desc: 'The open-source e-commerce platform. Generate product content compatible with any WooCommerce theme.', zhDesc: '开源电商平台。生成兼容任何 WooCommerce 主题的产品内容。', steps: ['Upload product images', '上传产品图片', 'Agent detects WooCommerce setup', 'Agent 检测 WooCommerce 配置', 'Generates product gallery images', '生成商品图集', 'Creates category and tag suggestions', '创建分类和标签建议', 'Writes product descriptions with alt text', '编写带 alt 文案的产品描述', 'Exports CSV ready for WooCommerce', '导出 WooCommerce 就绪的 CSV'], capabilities: ['Product Gallery', '商品图集', 'Alt Text', 'Alt 文案', 'Descriptions', '描述', 'Category Banner', '分类横幅', 'Export CSV', '导出 CSV', 'Theme Compatible', '主题兼容', 'SEO Ready', 'SEO 就绪'] },
};

const agentList = [
  { id: 'amazon', name: 'Amazon', color: '#EF9F27' },
  { id: 'shopee', name: 'Shopee', color: '#EF5320' },
  { id: 'tiktok', name: 'TikTok Shop', color: '#000000' },
  { id: 'taobao', name: 'Taobao', color: '#F97316' },
  { id: 'shopify', name: 'Shopify', color: '#96BF48' },
  { id: 'temu', name: 'Temu', color: '#F15A24' },
  { id: 'lazada', name: 'Lazada', color: '#0F146A' },
  { id: 'aliexpress', name: 'AliExpress', color: '#E62E04' },
  { id: 'etsy', name: 'Etsy', color: '#F1641E' },
  { id: 'ebay', name: 'eBay', color: '#0064D2' },
  { id: 'woocommerce', name: 'WooCommerce', color: '#96588A' },
];

export default function AgentPage({ params }: { params: { platform: string } }) {
  const agent = agents[params.platform];
  if (!agent) return <div className="pt-24 p-8 text-center"><Navbar />Agent not found</div>;

  const capPairs = agent.capabilities.reduce((acc: string[][], _: string, i: number, arr: string[]) => {
    if (i % 2 === 0) acc.push([arr[i], arr[i + 1]]);
    return acc;
  }, []);

  const stepPairs = agent.steps.reduce((acc: string[][], _: string, i: number, arr: string[]) => {
    if (i % 2 === 0) acc.push([arr[i], arr[i + 1]]);
    return acc;
  }, []);

  return (
    <>
      <Navbar />
      <div className="pt-24 pb-20">
        <div className="max-w-5xl mx-auto px-4">
          <Link href="/agents" className="inline-flex items-center gap-1.5 text-sm text-[#6B7280] hover:text-[#111827] mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4" /> All Agents
          </Link>

          {/* Hero */}
          <div className="flex items-center gap-5 mb-8">
            <PlatformLogo platform={params.platform} size={64} />
            <div>
              <h1 className="text-3xl font-extrabold text-[#111827]">{agent.zh || agent.name}</h1>
              <p className="text-[#6B7280] mt-1 max-w-lg">{agent.zhDesc || agent.desc}</p>
            </div>
          </div>

          {/* How It Works */}
          <section className="mb-12">
            <h2 className="text-lg font-bold text-[#111827] mb-6">How It Works / 工作流程</h2>
            <div className="space-y-2">
              {stepPairs.map((pair: string[], i: number) => (
                <div key={i} className="flex items-center gap-4 px-5 py-3 rounded-xl bg-white border border-[#E5E7EB]">
                  <span className="w-7 h-7 rounded-full bg-[#F5F3FF] text-[#7C3AED] flex items-center justify-center text-xs font-bold flex-shrink-0">{i + 1}</span>
                  <span className="text-sm text-[#374151] font-medium">{pair[1]}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Capabilities */}
          <section className="mb-12">
            <h2 className="text-lg font-bold text-[#111827] mb-6">Capabilities / 能力</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
              {capPairs.map((pair: string[], i: number) => (
                <div key={i} className="flex items-center gap-2 px-4 py-3 rounded-xl bg-white border border-[#E5E7EB] text-xs font-medium text-[#374151]">
                  <Check className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
                  {pair[1]}
                </div>
              ))}
            </div>
          </section>

          {/* CTA */}
          <div className="bg-gradient-to-r rounded-3xl p-10 text-center" style={{ background: `linear-gradient(135deg, ${agent.color}, ${agent.color}dd)` }}>
            <h2 className="text-2xl font-bold text-white mb-3">Open {agent.zh || agent.name} Agent</h2>
            <p className="text-white/70 mb-6">Start generating marketplace-optimized content with AI.</p>
            <Link href={`/workspace/${params.platform}`} className="inline-flex items-center gap-2 px-8 py-3.5 bg-white rounded-xl text-sm font-bold shadow-lg hover:shadow-xl transition-all" style={{ color: agent.color }}>
              Open Workspace <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Agent switcher */}
          <div className="mt-12 pt-8 border-t border-[#E5E7EB]">
            <h3 className="text-sm font-bold text-[#111827] mb-4">Other AI Agents / 其他 AI Agent</h3>
            <div className="flex flex-wrap gap-2">
              {agentList.filter(a => a.id !== params.platform).map(a => (
                <Link key={a.id} href={`/agents/${a.id}`} className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white border border-[#E5E7EB] text-xs font-medium text-[#374151] hover:border-[#D1D5DB] transition-all">
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: a.color }} />
                  {a.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
