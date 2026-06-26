'use client';

import { useRouter } from 'next/navigation';
import { useLang } from '@/lib/i18n';
import { images } from '@/lib/images';

const templates = [
  { key: 'fashion' as const,     en: 'Fashion',     zh: '时尚' },
  { key: 'jewelry' as const,     en: 'Jewelry',     zh: '珠宝' },
  { key: 'electronics' as const, en: 'Electronics', zh: '数码' },
  { key: 'beauty' as const,      en: 'Beauty',      zh: '美妆' },
  { key: 'pet' as const,         en: 'Pet',         zh: '宠物' },
  { key: 'sports' as const,      en: 'Sports',      zh: '运动' },
  { key: 'baby' as const,        en: 'Baby',        zh: '母婴' },
  { key: 'outdoor' as const,     en: 'Outdoor',     zh: '户外' },
];

const tplImages = images.templates;

export default function TemplatesPage() {
  const { t } = useLang();
  const router = useRouter();
  return (
    <div className="min-h-screen bg-warm-white pt-24 pb-16">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-warm-800 text-center mb-2">{t('Templates', '模板')}</h1>
        <p className="text-warm-400 text-center mb-12">{t('Start with a template for your product category', '从品类模板开始创作')}</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5">
          {templates.map(tmpl => (
            <button
              key={tmpl.key}
              onClick={() => router.push('/workspace/new')}
              className="group relative flex flex-col items-center gap-0 text-center cursor-pointer
                         rounded-2xl overflow-hidden bg-white/70 backdrop-blur-md border border-warm-100
                         shadow-sm hover:shadow-xl hover:shadow-brand-100/40 hover:-translate-y-1
                         hover:border-brand-200 transition-all duration-300"
            >
              {/* Image */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={tplImages[tmpl.key]}
                alt={tmpl.en}
                className="w-full aspect-[4/5] object-cover transition-transform duration-500
                           group-hover:scale-105"
                loading="lazy"
              />
              {/* Gradient overlay at bottom */}
              <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-warm-800/60 via-warm-800/20 to-transparent
                              pointer-events-none" />
              {/* Label */}
              <span className="absolute bottom-0 left-0 right-0 pb-4 text-sm font-bold text-white/95
                               tracking-wide drop-shadow-md">
                {t(tmpl.en, tmpl.zh)}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
