import Link from 'next/link';
import { ArrowLeft, ArrowRight, Check, Sparkles, Image, Video, FileText, Search, Globe, Zap, X } from 'lucide-react';
import Navbar from '@/components/Navbar';

const industries: Record<string, any> = {
  fashion: { name: 'Fashion & Apparel', zh: '时尚服饰', color: '#EC4899', hero: 'AI-powered fashion content for global marketplaces.', zhHero: '面向全球电商平台的 AI 时尚内容生成。', challenges: [{ en: 'Model photography costs ¥2,000+ per product', zh: '模特摄影每件成本 ¥2,000+' }, { en: 'Color variants need separate shoots', zh: '每个颜色需要单独拍摄' }, { en: 'Lifestyle scenes expensive to produce', zh: '生活场景拍摄成本高' }], solution: 'CommerceOS generates model-worn images, color variants, size charts and lifestyle scenes — all from a single product photo.', zhSolution: 'CommerceOS 从一张产品照片即可生成模特展示、颜色变体、尺码表和生活场景。', tools: ['Product Studio', 'Image Studio', 'Video Studio', 'Listing Studio', 'Translation Studio'], agents: ['Amazon Agent', 'Shopify Agent', 'TikTok Shop Agent', 'Taobao Agent'] },
  beauty: { name: 'Beauty & Cosmetics', zh: '美妆护肤', color: '#F59E0B', hero: 'Showcase texture, ingredients, and results with AI.', zhHero: '用 AI 展示质地、成分和效果。', challenges: [{ en: 'Product texture hard to photograph', zh: '产品质地难以拍摄' }, { en: 'Ingredient claims need visual proof', zh: '成分宣称需要视觉证明' }, { en: 'Before/after requires professional retouching', zh: '前后对比需要专业修图' }], solution: 'AI-generated product photography with texture detail, ingredient visuals, and before/after comparisons.', zhSolution: 'AI 生成的产品摄影，包含质地细节、成分展示和前后对比。', tools: ['Product Studio', 'Image Studio', 'Marketing Studio', 'Brand Studio'], agents: ['Amazon Agent', 'TikTok Shop Agent', 'Shopee Agent', 'Shopify Agent'] },
  electronics: { name: 'Electronics & Gadgets', zh: '数码电子', color: '#3B82F6', hero: 'Technical perfection. AI-generated product visuals for gadgets.', zhHero: '技术完美。AI 生成的数码产品视觉。', challenges: [{ en: 'Reflections and glare ruin product shots', zh: '反光和眩光破坏产品图片' }, { en: 'Feature callouts need graphic design', zh: '功能标注需要平面设计' }, { en: 'Multiple angles required per product', zh: '每个产品需要多角度拍摄' }], solution: 'Auto-generated clean product images with feature highlights, 360 views, and spec comparison tables.', zhSolution: '自动生成干净的产品图片，附带功能亮点、360 度展示和规格对比表。', tools: ['Product Studio', 'Image Studio', 'Video Studio', 'Listing Studio'], agents: ['Amazon Agent', 'eBay Agent', 'AliExpress Agent', 'Shopify Agent'] },
  furniture: { name: 'Home & Furniture', zh: '家居家具', color: '#14B8A6', hero: 'Room scenes without the studio. AI staging for furniture.', zhHero: '无需影棚的房间场景。家具 AI 摆场。', challenges: [{ en: 'Room staging costs ¥5,000+ per set', zh: '房间摆场每套 ¥5,000+' }, { en: 'Multiple room styles needed', zh: '需要多种房间风格' }, { en: 'Assembly instructions hard to create', zh: '组装说明难以制作' }], solution: 'Generate furniture in realistic room scenes with multiple decor styles, plus assembly visuals.', zhSolution: '在真实房间场景中生成家具，支持多种装饰风格，外加组装示意图。', tools: ['Product Studio', 'Image Studio', 'Video Studio', 'Marketing Studio'], agents: ['Amazon Agent', 'Shopify Agent', 'WooCommerce Agent', 'Lazada Agent'] },
  jewelry: { name: 'Jewelry & Accessories', zh: '珠宝配饰', color: '#8B5CF6', hero: 'Luxury photography at scale. AI for fine jewelry.', zhHero: '规模化奢品摄影。珠宝 AI 解决方案。', challenges: [{ en: 'Macro photography requires specialist gear', zh: '微距摄影需要专业设备' }, { en: 'Reflections on metals and gems', zh: '金属和宝石的反光处理' }, { en: '360 product views expensive to produce', zh: '360 产品展示制作昂贵' }], solution: 'AI-generated macro shots with perfect lighting, reflection control, and 360-degree product views.', zhSolution: 'AI 生成的微距拍摄，完美的光影控制、反射处理和 360 度产品展示。', tools: ['Product Studio', 'Image Studio', 'Video Studio', 'Brand Studio'], agents: ['Amazon Agent', 'Etsy Agent', 'Shopify Agent', 'eBay Agent'] },
  food: { name: 'Food & Beverage', zh: '食品饮料', color: '#EF4444', hero: 'Mouth-watering food photography without the shoot.', zhHero: '诱人的美食摄影，无需实际拍摄。', challenges: [{ en: 'Food styling is expensive and time-consuming', zh: '食品造型昂贵且耗时' }, { en: 'Perishable products have short shoot windows', zh: '易腐产品拍摄窗口短' }, { en: 'Nutritional labels need design work', zh: '营养标签需要设计'}], solution: 'AI food photography with perfect lighting, ingredient showcases, and nutritional infographics.', zhSolution: 'AI 美食摄影，完美的灯光、食材展示和营养信息图表。', tools: ['Product Studio', 'Image Studio', 'Marketing Studio', 'Listing Studio'], agents: ['Amazon Agent', 'Shopee Agent', 'Shopify Agent', 'Temu Agent'] },
  pet: { name: 'Pet Products', zh: '宠物用品', color: '#F97316', hero: 'Pet lifestyle content without the chaos. AI for pet brands.', zhHero: '无需混乱的宠物生活内容。宠物品牌 AI。', challenges: [{ en: 'Pet models unpredictable during shoots', zh: '宠物模特拍摄不可控' }, { en: 'Size comparisons difficult without models', zh: '无模特时尺寸对比较难' }, { en: 'Multiple breed representation needed', zh: '需要多种品种展示' }], solution: 'AI pet product photography with realistic pet models, size guides, and breed-specific content.', zhSolution: 'AI 宠物产品摄影，逼真的宠物模型、尺寸指南和品种专属内容。', tools: ['Product Studio', 'Image Studio', 'Video Studio', 'Marketing Studio'], agents: ['Amazon Agent', 'Shopify Agent', 'Shopee Agent', 'TikTok Shop Agent'] },
  sports: { name: 'Sports & Outdoors', zh: '运动户外', color: '#22C55E', hero: 'Action-ready product content. AI for sports brands.', zhHero: '随时准备行动的产品内容。运动品牌 AI。', challenges: [{ en: 'Action photography expensive and weather-dependent', zh: '动作摄影昂贵且受天气影响' }, { en: 'Technical features hard to visualize', zh: '技术功能难以可视化' }, { en: 'Durability claims need demonstration', zh: '耐用性宣称需要演示' }], solution: 'AI action scenes, technical feature callouts, durability demonstrations, and outdoor environment generation.', zhSolution: 'AI 动作场景、技术功能标注、耐用性演示和户外环境生成。', tools: ['Product Studio', 'Image Studio', 'Video Studio', 'Listing Studio'], agents: ['Amazon Agent', 'eBay Agent', 'Shopify Agent', 'AliExpress Agent'] },
};

export default function SolutionPage({ params }: { params: { industry: string } }) {
  const industry = industries[params.industry];
  if (!industry) return <div className="pt-24 p-8 text-center">Solution not found</div>;

  return (
    <>
      <Navbar />
      <div className="pt-24 pb-20">
        <div className="max-w-5xl mx-auto px-4">
          <Link href="/solutions" className="inline-flex items-center gap-1.5 text-sm text-[#6B7280] hover:text-[#111827] mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4" /> All Solutions
          </Link>

          {/* Hero */}
          <div className="mb-16">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: industry.color + '20' }}>
                <Sparkles className="w-4 h-4" style={{ color: industry.color }} />
              </div>
              <span className="text-sm font-bold" style={{ color: industry.color }}>{industry.name}</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-[#111827] mb-4">{industry.zhHero || industry.hero}</h1>
          </div>

          {/* Challenges → Solution */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <div className="bg-white rounded-2xl border border-[#E5E7EB] p-6">
              <h2 className="text-sm font-bold text-[#111827] mb-4">Industry Challenges / 行业挑战</h2>
              <div className="space-y-3">
                {industry.challenges.map((c: any, i: number) => (
                  <div key={i} className="flex items-start gap-2 text-xs text-[#6B7280]">
                    <span className="text-red-400 mt-0.5"><X className="w-3.5 h-3.5" /></span>
                    <span>{c.zh}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-[#F5F3FF] rounded-2xl border border-[#EDE9FE] p-6">
              <h2 className="text-sm font-bold text-[#7C3AED] mb-4">CommerceOS Solution</h2>
              <p className="text-sm text-[#6B7280] leading-relaxed">{industry.zhSolution || industry.solution}</p>
            </div>
          </div>

          {/* Tools + Agents */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
            <div className="bg-white rounded-2xl border border-[#E5E7EB] p-6">
              <h2 className="text-sm font-bold text-[#111827] mb-4">Recommended Tools / 推荐工具</h2>
              <div className="space-y-2">
                {industry.tools.map((t: string) => (
                  <div key={t} className="flex items-center gap-2 text-xs text-[#374151]">
                    <Check className="w-3.5 h-3.5 text-emerald-500" /> {t}
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white rounded-2xl border border-[#E5E7EB] p-6">
              <h2 className="text-sm font-bold text-[#111827] mb-4">Relevant AI Agents / 相关 AI Agent</h2>
              <div className="space-y-2">
                {industry.agents.map((a: string) => (
                  <Link key={a} href={`/agents/${a.toLowerCase().replace(' agent', '').replace(' shop', '')}`} className="flex items-center gap-2 text-xs text-[#7C3AED] hover:underline font-medium">
                    {a} →
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="bg-gradient-to-r from-[#7C3AED] to-[#6D28D9] rounded-3xl p-10 text-center">
            <h2 className="text-2xl font-bold text-white mb-3">Start for {industry.name}</h2>
            <p className="text-[#C4B5FD] mb-6">Generate your first AI-powered {industry.name.toLowerCase()} content in minutes.</p>
            <Link href="/workspace/new" className="inline-flex items-center gap-2 px-8 py-3.5 bg-white text-[#7C3AED] rounded-xl text-sm font-bold hover:bg-[#F5F5F5] transition-all">
              Get Started <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
