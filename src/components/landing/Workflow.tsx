'use client';

import { useState } from 'react';
import {
  Upload, Globe, Sparkles, Image, Video, FileText,
  Search, Languages, Send, BarChart3, ArrowRight, Play
} from 'lucide-react';
import { useLang } from '@/lib/i18n';

const steps = [
  { icon: Upload, label: 'Upload Product', zh: '上传商品', desc: 'Upload product photos and basic info.', zhDesc: '上传商品照片和基本信息' },
  { icon: Globe, label: 'Choose Marketplace', zh: '选择平台', desc: 'Select your target selling platforms.', zhDesc: '选择目标销售平台' },
  { icon: Sparkles, label: 'AI Analysis', zh: 'AI 分析', desc: 'AI analyzes product attributes and platform requirements.', zhDesc: 'AI 分析商品属性和平台要求' },
  { icon: Image, label: 'Generate Images', zh: '生成图片', desc: 'Auto-generate all required image formats.', zhDesc: '自动生成所有必需图片格式' },
  { icon: Video, label: 'Generate Video', zh: '生成视频', desc: 'Create product videos optimized for each platform.', zhDesc: '创建针对每个平台优化的商品视频' },
  { icon: FileText, label: 'Optimize Listing', zh: '优化 Listing', desc: 'Generate titles, descriptions, and bullet points.', zhDesc: '生成标题、描述和要点' },
  { icon: Languages, label: 'Translate', zh: '多语言翻译', desc: 'Auto-translate to all required languages.', zhDesc: '自动翻译到所有需要的语言' },
  { icon: Send, label: 'Publish', zh: '发布', desc: 'Publish directly to marketplaces or export.', zhDesc: '直接发布到平台或导出' },
  { icon: BarChart3, label: 'Track Performance', zh: '追踪效果', desc: 'Monitor performance and optimize continuously.', zhDesc: '持续监控和优化效果' },
];

export function Workflow() {
  const { t } = useLang();
  const [started, setStarted] = useState(false);
  const [activeStep, setActiveStep] = useState(-1);

  const handleStart = () => {
    setStarted(true);
    setActiveStep(0);
    const interval = setInterval(() => {
      setActiveStep(prev => {
        if (prev >= steps.length) { clearInterval(interval); return prev; }
        return prev + 1;
      });
    }, 600);
  };

  return (
    <section className="py-24 bg-[#FAFAFA]">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-[#E5E7EB] text-[#7C3AED] text-xs font-semibold mb-6">
            {t('Commerce Workflow', 'Commerce 工作流')}
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#111827] mb-4">
            {t('From Upload to Global Sales', '从上传到全球销售')}
          </h2>
          <p className="text-[#6B7280] text-lg max-w-xl mx-auto">
            {t('A complete commerce workflow — not just AI generation. Every step automated.', '完整电商工作流 — 不仅仅是 AI 生成。每一步都自动化。')}
          </p>
        </div>

        {/* Workflow visualization */}
        <div className="bg-white rounded-2xl border border-[#E5E7EB] p-8 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
            {steps.map((step, i) => {
              const isActive = activeStep === i;
              const isDone = activeStep > i;
              return (
                <div
                  key={i}
                  className={`flex items-center gap-3 p-3 rounded-xl transition-all duration-300 ${
                    isActive ? 'bg-[#F5F3FF] border border-[#CECBF6] scale-[1.02]' :
                    isDone ? 'bg-emerald-50/30 border border-emerald-100' :
                    'border border-transparent'
                  }`}
                >
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 transition-all ${
                    isActive ? 'bg-[#7C3AED] text-white' :
                    isDone ? 'bg-emerald-100 text-emerald-600' :
                    'bg-[#F5F5F5] text-[#9CA3AF]'
                  }`}>
                    {isDone ? <ArrowRight className="w-4 h-4" /> :
                     isActive ? <Sparkles className="w-3.5 h-3.5" /> :
                     <step.icon className="w-4 h-4" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={`text-xs font-semibold ${isActive ? 'text-[#7C3AED]' : isDone ? 'text-emerald-600' : 'text-[#9CA3AF]'}`}>
                      {t(step.label, step.zh)}
                    </p>
                    <p className="text-[10px] text-[#9CA3AF] hidden sm:block">{t(step.desc, step.zhDesc)}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Start button */}
        <div className="text-center">
          {!started ? (
            <button
              onClick={handleStart}
              className="inline-flex items-center gap-2 px-10 py-4 bg-[#7C3AED] text-white rounded-2xl text-base font-bold shadow-lg shadow-[#7C3AED]/25 hover:bg-[#6D28D9] hover:shadow-xl hover:-translate-y-0.5 transition-all"
            >
              <Play className="w-5 h-5" />
              {t('See Commerce Workflow in Action', '查看 Commerce 工作流演示')}
            </button>
          ) : (
            activeStep >= steps.length ? (
              <div className="text-center">
                <p className="text-lg font-bold text-emerald-600 mb-2">{t('Workflow Complete!', '工作流完成！')}</p>
                <p className="text-sm text-[#6B7280] mb-4">{t('Your product is ready for global markets.', '你的商品已准备好进入全球市场。')}</p>
                <button onClick={handleStart} className="text-sm text-[#7C3AED] hover:underline font-semibold">
                  {t('Run Again', '再演示一次')} →
                </button>
              </div>
            ) : (
              <p className="text-sm text-[#7C3AED] font-medium">
                {t(`Step ${activeStep + 1} of ${steps.length}...`, `步骤 ${activeStep + 1}/${steps.length}...`)}
              </p>
            )
          )}
        </div>
      </div>
    </section>
  );
}
