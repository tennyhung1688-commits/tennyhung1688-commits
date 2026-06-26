'use client';

import Link from 'next/link';
import { ArrowRight, Sparkles, Shirt, SprayCan, Monitor, Sofa, Gem, Utensils, PawPrint, Dumbbell, Package } from 'lucide-react';
import { useLang } from '@/lib/i18n';
import Navbar from '@/components/Navbar';

const industries = [
  { id: 'fashion', name: 'Fashion & Apparel', zh: '时尚服饰', icon: Shirt, color: '#EC4899', desc: 'Model generation, size charts, color variants, lifestyle scenes.', zhDesc: '模特生成、尺码表、颜色变体、生活场景。' },
  { id: 'beauty', name: 'Beauty & Cosmetics', zh: '美妆护肤', icon: SprayCan, color: '#F59E0B', desc: 'Product texture, ingredient visuals, before/after, packaging design.', zhDesc: '产品质地、成分展示、前后对比、包装设计。' },
  { id: 'electronics', name: 'Electronics & Gadgets', zh: '数码电子', icon: Monitor, color: '#3B82F6', desc: 'Technical specs, feature highlights, comparison visuals, unboxing.', zhDesc: '技术规格、功能亮点、对比展示、开箱。' },
  { id: 'furniture', name: 'Home & Furniture', zh: '家居家具', icon: Sofa, color: '#14B8A6', desc: 'Room scenes, dimensions, material textures, assembly guides.', zhDesc: '空间场景、尺寸展示、材质细节、安装指南。' },
  { id: 'jewelry', name: 'Jewelry & Accessories', zh: '珠宝配饰', icon: Gem, color: '#8B5CF6', desc: 'Macro detail, reflection handling, luxury aesthetic, 360 views.', zhDesc: '微距细节、反射处理、奢品美学、360展示。' },
  { id: 'food', name: 'Food & Beverage', zh: '食品饮料', icon: Utensils, color: '#EF4444', desc: 'Ingredient visuals, nutritional info, packaging, lifestyle shots.', zhDesc: '食材展示、营养信息、包装设计、生活场景。' },
  { id: 'pet', name: 'Pet Products', zh: '宠物用品', icon: PawPrint, color: '#F97316', desc: 'Pet lifestyle photography, size guides, material details.', zhDesc: '宠物生活摄影、尺寸指南、材质细节。' },
  { id: 'sports', name: 'Sports & Outdoors', zh: '运动户外', icon: Dumbbell, color: '#22C55E', desc: 'Action scenes, technical features, durability, outdoor settings.', zhDesc: '运动场景、功能展示、耐用性、户外场景。' },
];

export default function SolutionsPage() {
  const { t } = useLang();

  return (
    <>
      <Navbar />
      <div className="pt-24 pb-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#F5F3FF] border border-[#EDE9FE] text-[#7C3AED] text-xs font-semibold mb-6">
              <Package className="w-3.5 h-3.5" />
              {t('Solutions', '行业方案')}
            </span>
            <h1 className="text-4xl font-extrabold text-[#111827] mb-4">
              {t('AI Solutions for Every Industry', '面向每个行业的 AI 方案')}
            </h1>
            <p className="text-[#6B7280] text-lg max-w-2xl mx-auto">
              {t('CommerceOS adapts to your product category. Each industry gets specialized AI models, workflows, and best practices.', 'CommerceOS 适配你的产品品类。每个行业都有专属的 AI 模型、工作流和最佳实践。')}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {industries.map(ind => (
              <Link
                key={ind.id}
                href={`/solutions/${ind.id}`}
                className="group bg-white rounded-2xl border border-[#E5E7EB] p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{ backgroundColor: ind.color + '15' }}>
                  <ind.icon className="w-6 h-6" style={{ color: ind.color }} />
                </div>
                <h3 className="text-sm font-bold text-[#111827] mb-2">{t(ind.name, ind.zh)}</h3>
                <p className="text-xs text-[#6B7280] leading-relaxed mb-4">{t(ind.desc, ind.zhDesc)}</p>
                <div className="flex items-center gap-1 text-xs font-semibold text-[#7C3AED] group-hover:gap-2 transition-all">
                  {t('View Solution', '查看方案')} <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
