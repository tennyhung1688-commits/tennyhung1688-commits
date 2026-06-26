'use client';

import { useLang } from '@/lib/i18n';
import { Card } from '@/components/common/Card';
import { images } from '@/lib/images';

const examples = [
  { img: images.beforeAfter.shoes, label: 'Shoes', zh: '鞋靴' },
  { img: images.beforeAfter.headphones, label: 'Electronics', zh: '数码' },
  { img: images.beforeAfter.furniture, label: 'Furniture', zh: '家具' },
  { img: images.beforeAfter.jewelry, label: 'Jewelry', zh: '珠宝' },
  { img: images.beforeAfter.beauty, label: 'Beauty', zh: '美妆' },
  { img: images.beforeAfter.laptop, label: 'Gadgets', zh: '数码配件' },
];

export function Workflow() {
  const { t } = useLang();
  return (
    <section id="workflow" className="py-28 bg-white relative overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-50/40 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-50/20 rounded-full blur-3xl" />

      <div className="max-w-6xl mx-auto px-4 relative">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 backdrop-blur-md border border-purple-100 text-[#7C3AED] text-xs font-semibold mb-6">
            {t('How It Works', '工作流程')}
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#111827] mb-3 tracking-tight">
            {t('Upload → AI Does Everything → Publish', '上传 → AI 自动完成 → 一键发布')}
          </h2>
          <p className="text-[#6B7280] text-lg max-w-xl mx-auto">
            {t('Real results from real products. No studio, no photographer, no prompt needed.', '真实商品、真实效果。无需影棚、无需摄影师、无需学习 Prompt。')}
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-5">
          {examples.map((item, i) => (
            <Card key={i} hover className="overflow-hidden group">
              <div className="aspect-[4/3] relative bg-gray-50 overflow-hidden">
                <img
                  src={item.img}
                  alt={item.label}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  loading="lazy"
                />
                {/* Overlay labels */}
                <div className="absolute top-3 left-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="text-[10px] font-medium bg-white/80 backdrop-blur-md px-2.5 py-1 rounded-full text-[#6B7280] border border-white/40">
                    {t('Before', '原图')}
                  </span>
                  <span className="text-[10px] font-semibold bg-[#7C3AED]/90 text-white px-2.5 py-1 rounded-full backdrop-blur-md">
                    {t('After', 'AI生成')}
                  </span>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-[#111827]/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
              <div className="px-4 py-3 text-center">
                <span className="text-xs font-semibold text-[#6B7280]">{t(item.label, item.zh)}</span>
              </div>
            </Card>
          ))}
        </div>

        <p className="text-center text-sm text-[#6B7280] mt-10 font-medium">
          {t('And 30+ more product categories supported', '支持 30+ 商品品类')}
        </p>
      </div>
    </section>
  );
}
