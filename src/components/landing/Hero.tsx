'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Play, Zap, Globe } from 'lucide-react';
import { useLang } from '@/lib/i18n';
import { Button } from '@/components/common/Button';
import { images } from '@/lib/images';

const heroImages = images.showcase.slice(0, 4);

export function Hero() {
  const { t } = useLang();
  const [activeImg, setActiveImg] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout>(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => setActiveImg(i => (i + 1) % heroImages.length), 4000);
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, []);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Premium gradient background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-white" />
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-purple-100/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-purple-50/30 rounded-full blur-3xl translate-y-1/3 -translate-x-1/4" />
        <div className="absolute top-1/2 left-1/2 w-[500px] h-[500px] bg-purple-50/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      </div>

      {/* Dot grid pattern */}
      <div className="absolute inset-0 bg-dot-pattern opacity-40" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full pt-32 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left — Typography */}
          <div className="lg:pr-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 backdrop-blur-md border border-purple-100 text-[#7C3AED] text-xs font-semibold mb-8 shadow-sm">
              <Globe className="w-3.5 h-3.5" />
              {t('Global AI E-commerce OS', '全球 AI 电商操作系统')}
            </div>

            {/* Headline */}
            <h1 className="text-[3.25rem] sm:text-[3.75rem] lg:text-[4.5rem] font-bold text-[#111827] leading-[0.98] mb-4 tracking-tight">
              CommerceOS
            </h1>
            <p className="text-xl sm:text-2xl text-[#6B7280] font-medium mb-8 tracking-tight">
              {t(
                'The AI Operating System for Modern Commerce',
                '面向现代电商的 AI 操作系统'
              )}
            </p>

            {/* Slogan */}
            <p className="text-3xl sm:text-4xl font-bold text-[#111827] max-w-xl mb-4 leading-tight tracking-tight">
              {t(
                'One Product.\nEndless Commerce.',
                '一个商品。\n无限商机。'
              )}
            </p>

            {/* Description */}
            <p className="text-lg text-[#6B7280] max-w-lg mb-10 leading-relaxed">
              {t(
                'Upload once. AI understands your product, generates images, videos, copywriting, SEO, translations — then publishes to every marketplace. No prompt engineering needed.',
                '上传一次。AI 理解你的商品，自动生成图片、视频、文案、SEO、翻译，一键发布到全球电商平台。无需学习 Prompt。'
              )}
            </p>

            {/* Stats */}
            <div className="flex items-center gap-8 mb-10 text-sm">
              <div>
                <p className="text-2xl font-bold text-[#111827]">25</p>
                <p className="text-[#6B7280] text-xs mt-0.5">{t('Platforms', '平台支持')}</p>
              </div>
              <div className="w-px h-8 bg-[#E5E7EB]" />
              <div>
                <p className="text-2xl font-bold text-[#111827]">70+</p>
                <p className="text-[#6B7280] text-xs mt-0.5">{t('Skills', 'Skills')}</p>
              </div>
              <div className="w-px h-8 bg-[#E5E7EB]" />
              <div>
                <p className="text-2xl font-bold text-[#111827]">100%</p>
                <p className="text-[#6B7280] text-xs mt-0.5">{t('Automated', '全自动')}</p>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Link href="/auth/register">
                <Button size="lg">
                  {t('Get Started', '立即开始')}
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link href="#workflow">
                <Button variant="glass" size="lg">
                  <Play className="w-4 h-4" />
                  {t('Watch Demo', '观看演示')}
                </Button>
              </Link>
            </div>
          </div>

          {/* Right — Visual Showcase */}
          <div className="hidden lg:block relative">
            {/* Main glass card with image */}
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden bg-white/70 backdrop-blur-md border border-[#E5E7EB] shadow-lg p-2">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={heroImages[activeImg]}
                alt="AI Generated Product"
                className="w-full h-full object-cover rounded-2xl transition-all duration-700"
              />
              {/* Label */}
              <div className="absolute bottom-6 left-6 z-10">
                <span className="inline-flex items-center gap-1.5 text-xs text-white/90 bg-[#111827]/50 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/10">
                  <Zap className="w-3 h-3" />
                  {t('AI Generated', 'AI 生成')}
                </span>
              </div>
            </div>

            {/* Floating workflow card */}
            <div className="absolute -bottom-6 -left-8 bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg shadow-purple-100/30 border border-white/50 p-5 max-w-[240px] animate-float">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 rounded-full bg-emerald-400" />
                <p className="text-[11px] font-semibold text-[#6B7280] uppercase tracking-wider">{t('Workflow', '工作流')}</p>
              </div>
              <p className="text-sm font-bold text-[#111827] leading-snug">
                {t('Upload → Generate → Publish', '上传 → 生成 → 发布')}
              </p>
              <p className="text-xs text-[#6B7280] mt-1">{t('Fully automated e-commerce pipeline', '全自动电商工作管线')}</p>
            </div>

            {/* Floating model badge */}
            <div className="absolute -top-6 -right-4 bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg shadow-purple-100/30 border border-white/50 px-4 py-3 animate-float-delayed">
              <p className="text-[10px] font-semibold text-[#6B7280] uppercase tracking-wider">{t('AI Models', 'AI 模型')}</p>
              <p className="text-sm font-bold text-[#7C3AED] mt-0.5">FLUX · Veo · GPT</p>
            </div>

            {/* Dot indicators */}
            <div className="absolute -bottom-14 left-1/2 -translate-x-1/2 flex gap-2">
              {heroImages.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImg(i)}
                  className={`h-2 rounded-full transition-all duration-500 ${
                    i === activeImg
                      ? 'bg-[#7C3AED] w-8 shadow-sm shadow-purple-500/30'
                      : 'bg-[#E5E7EB] w-2 hover:bg-[#D1D5DB]'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
