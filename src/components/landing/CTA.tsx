'use client';

import Link from 'next/link';
import { ArrowRight, Globe } from 'lucide-react';
import { useLang } from '@/lib/i18n';

export function CTA() {
  const { t } = useLang();
  return (
    <section className="py-28 bg-[#111827] relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-dot-pattern opacity-[0.03]" />
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#7C3AED]/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#8B5CF6]/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3" />

      {/* Gradient line at top */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#7C3AED]/30 to-transparent" />

      <div className="max-w-3xl mx-auto px-4 text-center relative z-10">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-white/70 text-xs font-semibold mb-8">
          <Globe className="w-3.5 h-3.5 text-purple-300" />
          CommerceOS
        </div>

        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 tracking-tight leading-tight">
          {t(
            'One Platform. Every Marketplace. Powered by AI.',
            '一个平台，覆盖全球电商。AI 驱动整个工作流程。'
          )}
        </h2>
        <p className="text-[#9CA3AF] text-lg mb-10 max-w-xl mx-auto leading-relaxed">
          {t('Upload once. AI generates images, videos, copywriting, SEO, translations — then publishes to every marketplace. No prompt engineering needed.', '上传一次。AI 自动生成图片、视频、文案、SEO、翻译，一键发布到全球电商平台。零 Prompt 门槛。')}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link href="/auth/register">
            <span className="inline-flex items-center gap-2 px-8 py-4 bg-white text-[#111827] rounded-xl text-base font-bold shadow-xl shadow-[#7C3AED]/20 hover:shadow-2xl hover:shadow-[#7C3AED]/30 hover:-translate-y-0.5 transition-all duration-300">
              {t('Get Started Free', '免费开始')}
              <ArrowRight className="w-4 h-4 text-[#7C3AED]" />
            </span>
          </Link>
          <Link href="/skills">
            <span className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 backdrop-blur-md border border-white/10 text-white rounded-xl text-base font-semibold hover:bg-white/15 transition-all duration-300">
              {t('Explore Skills', '探索 Skills')}
            </span>
          </Link>
        </div>

        {/* Trust indicators */}
        <div className="flex items-center justify-center gap-8 mt-12 text-sm text-[#6B7280]">
          <span>✓ {t('No credit card', '无需信用卡')}</span>
          <span>✓ {t('Free tier available', '免费套餐')}</span>
          <span>✓ {t('Cancel anytime', '随时取消')}</span>
        </div>
      </div>
    </section>
  );
}
