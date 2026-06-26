'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Play, Globe, Image, FileText, Video, Search, Languages, Upload, Sparkles, Check } from 'lucide-react';
import { useLang } from '@/lib/i18n';

const templates = [
  {
    id: 'amazon-listing',
    name: 'Amazon Listing', zh: 'Amazon 列表',
    platforms: ['amazon'],
    steps: ['Hero Image', 'Lifestyle', 'Infographic', 'Title', 'Bullets', 'Description', 'Search Terms'],
    stepsZh: ['主图', '场景图', '信息图', '标题', '要点', '描述', '搜索词'],
  },
  {
    id: 'tiktok-video',
    name: 'TikTok Short Video', zh: 'TikTok 短视频',
    platforms: ['tiktok'],
    steps: ['Hook Script', 'Product Demo', 'Text Overlay', 'Music Select', 'CTA Card'],
    stepsZh: ['钩子脚本', '产品展示', '文字覆盖', '音乐选择', '行动卡片'],
  },
  {
    id: 'shopee-full',
    name: 'Shopee Full Package', zh: 'Shopee 全套',
    platforms: ['shopee'],
    steps: ['Main Image', 'White BG', 'Detail Images', 'Title EN', 'Title CN', 'Keywords'],
    stepsZh: ['主图', '白底图', '详情图', '英文标题', '中文标题', '关键词'],
  },
  {
    id: 'taobao-full',
    name: 'Taobao Complete', zh: '淘宝完整套装',
    platforms: ['taobao'],
    steps: ['Main Image', 'White BG', 'Detail Page', 'SKU Chart', 'Promo Banner', 'Live Cover'],
    stepsZh: ['主图', '白底图', '详情页', 'SKU图', '促销横幅', '直播封面'],
  },
];

const platforms = [
  { id: 'amazon', name: 'Amazon', icon: '📦' },
  { id: 'shopify', name: 'Shopify', icon: '🛒' },
  { id: 'tiktok', name: 'TikTok Shop', icon: '🎵' },
  { id: 'shopee', name: 'Shopee', icon: '🛍️' },
  { id: 'taobao', name: 'Taobao', icon: '🔶' },
  { id: 'temu', name: 'Temu', icon: '📱' },
];

const contentTypes = [
  { id: 'image', icon: Image, label: 'Image', zh: '图片', color: '#7C3AED' },
  { id: 'video', icon: Video, label: 'Video', zh: '视频', color: '#EF4444' },
  { id: 'copywriting', icon: FileText, label: 'Copywriting', zh: '文案', color: '#F59E0B' },
  { id: 'seo', icon: Search, label: 'SEO', zh: 'SEO', color: '#3B82F6' },
  { id: 'translation', icon: Languages, label: 'Translation', zh: '翻译', color: '#10B981' },
];

export default function NewWorkflowPage() {
  const { t } = useLang();
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [selectedTemplate, setSelectedTemplate] = useState('');
  const [selectedPlatform, setSelectedPlatform] = useState('amazon');
  const [selectedTypes, setSelectedTypes] = useState<string[]>(['image', 'copywriting']);

  const toggleType = (id: string) => {
    setSelectedTypes(prev =>
      prev.includes(id) ? prev.filter(t => t !== id) : [...prev, id]
    );
  };

  const handleRun = () => {
    router.push('/workflow');
  };

  return (
    <div className="px-8 py-8 max-w-3xl">
      <button onClick={() => router.back()} className="inline-flex items-center gap-1.5 text-sm text-[#6B7280] hover:text-[#111827] mb-6 transition-colors">
        <ArrowLeft className="w-4 h-4" />
        {t('Back to Workflows', '返回工作流')}
      </button>

      <div className="mb-8">
        <h1 className="text-2xl font-bold text-[#111827] tracking-tight">
          {t('New Workflow', '新建工作流')}
        </h1>
        <p className="text-sm text-[#6B7280] mt-1">
          {t('Select a template, platform, and content types. AI will handle the rest.', '选择模板、平台和内容类型，AI 自动完成其余工作。')}
        </p>
      </div>

      {/* Step 1: Template */}
      {step === 1 && (
        <div className="space-y-4">
          <h2 className="text-sm font-bold text-[#111827]">{t('Choose a Template', '选择模板')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {templates.map(tmpl => (
              <button
                key={tmpl.id}
                onClick={() => { setSelectedTemplate(tmpl.id); setStep(2); }}
                className={`text-left p-4 rounded-xl border-2 transition-all ${
                  selectedTemplate === tmpl.id
                    ? 'border-[#7C3AED] bg-[#F5F3FF]'
                    : 'border-[#E5E7EB] bg-white hover:border-[#D1D5DB] hover:shadow-sm'
                }`}
              >
                <h3 className="text-sm font-bold text-[#111827] mb-2">{t(tmpl.name, tmpl.zh)}</h3>
                <div className="flex flex-wrap gap-1 mb-3">
                  {tmpl.platforms.map(p => (
                    <span key={p} className="text-[9px] font-medium text-[#6B7280] bg-[#F5F5F5] px-1.5 py-0.5 rounded-md">{p}</span>
                  ))}
                </div>
                <div className="flex items-center gap-1 flex-wrap">
                  {tmpl.stepsZh.map((s: string, i: number) => (
                    <span key={i} className="text-[10px] text-[#9CA3AF]">
                      {t(tmpl.steps[i], s)}{i < tmpl.steps.length - 1 ? ' →' : ''}
                    </span>
                  ))}
                </div>
              </button>
            ))}

            {/* Custom */}
            <button
              onClick={() => { setSelectedTemplate('custom'); setStep(2); }}
              className={`text-left p-4 rounded-xl border-2 transition-all ${
                selectedTemplate === 'custom'
                  ? 'border-[#7C3AED] bg-[#F5F3FF]'
                  : 'border-dashed border-[#D1D5DB] bg-white hover:border-[#7C3AED] hover:bg-[#FAFAFA]'
              }`}
            >
              <h3 className="text-sm font-bold text-[#111827] mb-2">{t('Custom Workflow', '自定义工作流')}</h3>
              <p className="text-xs text-[#9CA3AF]">{t('Build your own step-by-step pipeline', '构建你自己的步骤流水线')}</p>
            </button>
          </div>
        </div>
      )}

      {/* Step 2: Platform & Content */}
      {step === 2 && (
        <div className="space-y-6">
          {/* Platform */}
          <div>
            <h2 className="text-sm font-bold text-[#111827] mb-3 flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5 text-[#6B7280]" />
              {t('Target Platform', '目标平台')}
            </h2>
            <div className="flex flex-wrap gap-2">
              {platforms.map(p => (
                <button
                  key={p.id}
                  onClick={() => setSelectedPlatform(p.id)}
                  className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    selectedPlatform === p.id
                      ? 'bg-[#7C3AED] text-white shadow-sm'
                      : 'bg-white border border-[#E5E7EB] text-[#374151] hover:border-[#D1D5DB]'
                  }`}
                >
                  <span>{p.icon}</span>
                  {p.name}
                </button>
              ))}
            </div>
          </div>

          {/* Content Types */}
          <div>
            <h2 className="text-sm font-bold text-[#111827] mb-3 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#6B7280]" />
              {t('Content Types to Generate', '生成内容类型')}
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
              {contentTypes.map(ct => {
                const selected = selectedTypes.includes(ct.id);
                return (
                  <button
                    key={ct.id}
                    onClick={() => toggleType(ct.id)}
                    className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all ${
                      selected
                        ? 'border-[#7C3AED] bg-[#F5F3FF]'
                        : 'border-[#E5E7EB] bg-white hover:border-[#D1D5DB]'
                    }`}
                  >
                    <ct.icon className={`w-5 h-5 ${selected ? 'text-[#7C3AED]' : 'text-[#9CA3AF]'}`} />
                    <span className={`text-xs font-medium ${selected ? 'text-[#7C3AED]' : 'text-[#6B7280]'}`}>
                      {t(ct.label, ct.zh)}
                    </span>
                    {selected && <Check className="w-3.5 h-3.5 text-[#7C3AED]" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Summary */}
          <div className="p-4 rounded-xl bg-[#FAFAFA] border border-[#E5E7EB]">
            <h3 className="text-xs font-bold text-[#111827] mb-2">{t('Configuration Summary', '配置概要')}</h3>
            <div className="space-y-1 text-xs">
              <p className="text-[#6B7280]">
                {t('Template', '模板')}: <span className="text-[#111827] font-medium">{selectedTemplate === 'custom' ? t('Custom', '自定义') : templates.find(t => t.id === selectedTemplate)?.name || '—'}</span>
              </p>
              <p className="text-[#6B7280]">
                {t('Platform', '平台')}: <span className="text-[#111827] font-medium">{platforms.find(p => p.id === selectedPlatform)?.name}</span>
              </p>
              <p className="text-[#6B7280]">
                {t('Content Types', '内容类型')}: <span className="text-[#111827] font-medium">{selectedTypes.length} selected</span>
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <button onClick={() => setStep(1)} className="flex-1 py-3 bg-white border border-[#E5E7EB] text-[#6B7280] rounded-xl text-sm font-semibold hover:bg-[#FAFAFA] transition-all">
              {t('Back', '上一步')}
            </button>
            <button onClick={handleRun} className="flex-1 py-3 bg-[#7C3AED] text-white rounded-xl text-sm font-semibold hover:bg-[#6D28D9] transition-all flex items-center justify-center gap-2">
              <Play className="w-4 h-4" />
              {t('Run Workflow', '运行工作流')}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
