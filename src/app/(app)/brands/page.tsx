'use client';

import { useState } from 'react';
import {
  Plus, Search, Sparkles, ArrowRight, Palette, Type, Volume2,
  Image, Upload, Check, Globe, MoreHorizontal, ChevronRight
} from 'lucide-react';
import { useLang } from '@/lib/i18n';
import QuickGuide from '@/components/QuickGuide';

interface Brand {
  id: string;
  name: string;
  logo: string;
  colors: string[];
  font: string;
  tone: string;
  style: string;
  story: string;
  audience: string;
}

const mockBrands: Brand[] = [
  {
    id: '1', name: 'Nike', logo: '',
    colors: ['#FF6B00', '#000000', '#FFFFFF', '#F5F5F5'],
    font: 'Futura Bold', tone: 'Inspirational', style: 'Athletic / Performance',
    story: 'Just Do It — empowering every athlete',
    audience: '18-40, Sports & Fitness Enthusiasts'
  },
  {
    id: '2', name: 'Lancôme', logo: '',
    colors: ['#D4AF37', '#FFFFFF', '#2D2D2D', '#FDF8F0'],
    font: 'Playfair Display', tone: 'Luxurious', style: 'Elegant / French Beauty',
    story: 'French luxury beauty since 1935',
    audience: '25-55, Premium Beauty Buyers'
  },
  {
    id: '3', name: 'Sony', logo: '',
    colors: ['#000000', '#FFFFFF', '#0072CE', '#F5F5F5'],
    font: 'SST Pro', tone: 'Professional', style: 'Minimalist / Tech',
    story: 'Innovation through technology',
    audience: '20-50, Tech Enthusiasts & Professionals'
  },
  {
    id: '4', name: 'Levi\'s', logo: '',
    colors: ['#C41230', '#FFFFFF', '#1A1A2E', '#F5E6D3'],
    font: 'Trade Gothic', tone: 'Authentic', style: 'Classic American / Casual',
    story: 'The original blue jean since 1853',
    audience: '16-45, Fashion & Lifestyle'
  },
  {
    id: '5', name: 'Dyson', logo: '',
    colors: ['#6C6CE5', '#FFFFFF', '#1A1A2E', '#E8E8FF'],
    font: 'Helvetica Now', tone: 'Technical', style: 'Futuristic / Engineering',
    story: 'Solving problems others ignore',
    audience: '25-55, Home & Tech Enthusiasts'
  },
];

export default function BrandCenter() {
  const { t } = useLang();
  const [search, setSearch] = useState('');
  const [selectedBrand, setSelectedBrand] = useState<Brand | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);

  const filtered = mockBrands.filter(b =>
    b.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="px-8 py-8 max-w-7xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-[#111827] tracking-tight">
            {t('Brand Center', '品牌中心')}
          </h1>
          <p className="text-sm text-[#6B7280] mt-1">
            {t('Unified brand profiles for all AI-generated content.', '统一品牌档案，所有 AI 内容保持品牌一致性。')}
          </p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#7C3AED] text-white rounded-xl text-sm font-semibold shadow-sm hover:bg-[#6D28D9] transition-all"
        >
          <Plus className="w-4 h-4" />
          <Sparkles className="w-3.5 h-3.5" />
          {t('Add Brand', '添加品牌')}
        </button>
      </div>

      <QuickGuide title="How Brand Center Works" zh="品牌中心使用指南" steps={[
        { title: 'Add a brand', zh: '添加品牌', desc: 'Click "Add Brand" and enter the brand name. AI will extract brand identity — colors, fonts, tone, and style.', descZh: '点击"添加品牌"输入品牌名称，AI 会提取品牌识别要素：颜色、字体、语调和风格。' },
        { title: 'Review brand profile', zh: '查看品牌档案', desc: 'Click any brand card to see the full AI Brand Profile with color palette, font recommendations, and brand guidelines.', descZh: '点击任意品牌卡片查看完整 AI 品牌档案，包括色板、字体推荐和品牌指南。' },
        { title: 'Keep content on-brand', zh: '保持品牌一致性', desc: 'Once a brand profile is saved, all AI-generated content automatically follows the brand\'s colors, fonts, and tone of voice.', descZh: '品牌档案保存后，所有 AI 生成内容将自动统一品牌颜色、字体和语调。' },
      ]} />

      {/* Search */}
      <div className="relative max-w-sm mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9CA3AF]" />
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder={t('Search brands...', '搜索品牌...')}
          className="w-full pl-10 pr-4 py-2.5 border border-[#E5E7EB] rounded-xl text-sm bg-white focus:ring-2 focus:ring-[#7C3AED]/20 focus:border-[#7C3AED] outline-none transition-all"
        />
      </div>

      {/* Brand grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map(brand => (
          <button
            key={brand.id}
            onClick={() => setSelectedBrand(brand)}
            className="group text-left bg-white rounded-2xl border border-[#E5E7EB] p-5 hover:border-[#D1D5DB] hover:shadow-sm transition-all"
          >
            {/* Color palette preview */}
            <div className="flex gap-1 mb-4">
              {brand.colors.map((c, i) => (
                <div
                  key={i}
                  className="flex-1 h-10 first:rounded-l-xl last:rounded-r-xl border border-[#E5E7EB]"
                  style={{ backgroundColor: c }}
                />
              ))}
            </div>

            {/* Brand name & details */}
            <h3 className="text-sm font-bold text-[#111827] mb-2">{brand.name}</h3>
            <div className="space-y-1.5">
              <div className="flex items-center gap-2 text-xs">
                <Type className="w-3 h-3 text-[#9CA3AF]" />
                <span className="text-[#6B7280]">{brand.font}</span>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <Volume2 className="w-3 h-3 text-[#9CA3AF]" />
                <span className="text-[#6B7280]">{brand.tone}</span>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <Palette className="w-3 h-3 text-[#9CA3AF]" />
                <span className="text-[#6B7280]">{brand.style}</span>
              </div>
            </div>

            {/* Quick action */}
            <div className="flex items-center gap-2 mt-4 pt-3 border-t border-[#F5F5F5] opacity-0 group-hover:opacity-100 transition-opacity">
              <span className="text-[11px] text-[#7C3AED] font-medium flex items-center gap-1">
                <Sparkles className="w-3 h-3" />
                {t('Generate with Brand', '使用此品牌生成')}
              </span>
              <ChevronRight className="w-3 h-3 text-[#D1D5DB] ml-auto" />
            </div>
          </button>
        ))}
      </div>

      {/* Brand detail panel */}
      {selectedBrand && (
        <BrandDetail brand={selectedBrand} onClose={() => setSelectedBrand(null)} />
      )}

      {/* Add brand modal */}
      {showAddModal && (
        <AddBrandModal onClose={() => setShowAddModal(false)} />
      )}
    </div>
  );
}

/* ── Brand Detail Panel ── */
function BrandDetail({ brand, onClose }: { brand: Brand; onClose: () => void }) {
  const { t } = useLang();
  return (
    <div className="fixed inset-0 z-50 flex justify-end" onClick={onClose}>
      <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" />
      <div
        className="relative w-full max-w-lg bg-white shadow-2xl border-l border-[#E5E7EB] overflow-y-auto animate-fade-in-up"
        onClick={e => e.stopPropagation()}
      >
        <div className="sticky top-0 bg-white/80 backdrop-blur-xl border-b border-[#E5E7EB] px-6 py-4 flex items-center justify-between">
          <h2 className="text-base font-bold text-[#111827]">{brand.name}</h2>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-[#F5F5F5] text-[#6B7280]">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Color palette */}
          <div className="grid grid-cols-4 gap-2">
            {brand.colors.map((c, i) => (
              <div key={i} className="space-y-1.5">
                <div className="aspect-square rounded-xl border border-[#E5E7EB] shadow-sm" style={{ backgroundColor: c }} />
                <p className="text-[10px] text-[#6B7280] text-center font-mono">{c}</p>
              </div>
            ))}
          </div>

          {/* AI Brand Profile */}
          <div className="bg-[#EEEDFE] border border-[#CECBF6] rounded-2xl p-5">
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="w-4 h-4 text-[#7C3AED]" />
              <h3 className="text-sm font-bold text-[#3C3489]">
                {t('AI Brand Profile', 'AI 品牌档案')}
              </h3>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: 'Brand', zh: '品牌', value: brand.name, icon: Globe },
                { label: 'Font', zh: '字体', value: brand.font, icon: Type },
                { label: 'Tone of Voice', zh: '语调', value: brand.tone, icon: Volume2 },
                { label: 'Visual Style', zh: '视觉风格', value: brand.style, icon: Palette },
                { label: 'Target Audience', zh: '目标受众', value: brand.audience, icon: Globe },
                { label: 'Brand Story', zh: '品牌故事', value: brand.story, icon: Sparkles },
              ].map((item, i) => (
                <div key={i} className="bg-white/70 rounded-xl px-3 py-2">
                  <div className="flex items-center gap-1.5 mb-0.5">
                    <item.icon className="w-3 h-3 text-[#7F77DD]" />
                    <p className="text-[10px] text-[#7F77DD]">{t(item.label, item.zh)}</p>
                  </div>
                  <p className="text-xs font-medium text-[#111827] mt-0.5 leading-relaxed">{item.value}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Brand Guidelines */}
          <div className="bg-white border border-[#E5E7EB] rounded-2xl p-5">
            <h3 className="text-sm font-bold text-[#111827] mb-3">{t('Brand Guidelines', '品牌指南')}</h3>
            <div className="space-y-3">
              {[
                { title: 'Always use', zh: '始终使用', desc: `${brand.font} for all headings and marketing copy` },
                { title: 'Primary color', zh: '主色', desc: `${brand.colors[0]} — use for CTAs, accents, logos` },
                { title: 'Tone rule', zh: '语调规则', desc: `Keep language ${brand.tone.toLowerCase()} — never casual or generic` },
                { title: 'Image style', zh: '图片风格', desc: `${brand.style} — clean backgrounds, product-focused compositions` },
              ].map((rule, i) => (
                <div key={i} className="flex gap-3">
                  <Check className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-xs font-semibold text-[#111827]">{t(rule.title, rule.zh)}</p>
                    <p className="text-xs text-[#6B7280] mt-0.5">{rule.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Add Brand Modal ── */
function AddBrandModal({ onClose }: { onClose: () => void }) {
  const { t } = useLang();
  const [name, setName] = useState('');
  const [url, setUrl] = useState('');
  const [step, setStep] = useState(1);
  const [generated, setGenerated] = useState(false);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center" onClick={onClose}>
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" />
      <div
        className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl border border-[#E5E7EB] overflow-hidden animate-fade-in-up max-h-[90vh] overflow-y-auto"
        onClick={e => e.stopPropagation()}
      >
        <div className="px-6 py-4 border-b border-[#E5E7EB] flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-[#111827]">{t('Add Brand', '添加品牌')}</h2>
            <p className="text-xs text-[#9CA3AF] mt-0.5">
              {step === 1 ? t('Enter brand details', '输入品牌信息') : t('AI will extract brand identity', 'AI 将提取品牌识别要素')}
            </p>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-[#F5F5F5] text-[#6B7280]">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        </div>

        <div className="p-6 space-y-5">
          {step === 1 ? (
            <>
              <div>
                <label className="block text-sm font-medium text-[#374151] mb-1.5">{t('Brand Name', '品牌名称')}</label>
                <input
                  type="text"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder={t('e.g. Nike, Apple, UNIQLO', '例如 Nike、Apple、UNIQLO')}
                  className="w-full px-4 py-3 border border-[#E5E7EB] rounded-xl text-sm bg-white focus:ring-2 focus:ring-[#7C3AED]/20 focus:border-[#7C3AED] outline-none transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#374151] mb-1.5">{t('Brand Website (optional)', '品牌官网（可选）')}</label>
                <div className="relative">
                  <Globe className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9CA3AF]" />
                  <input
                    type="url"
                    value={url}
                    onChange={e => setUrl(e.target.value)}
                    placeholder="https://nike.com"
                    className="w-full pl-10 pr-4 py-3 border border-[#E5E7EB] rounded-xl text-sm bg-white focus:ring-2 focus:ring-[#7C3AED]/20 focus:border-[#7C3AED] outline-none transition-all"
                  />
                </div>
              </div>

              <button
                onClick={() => { setStep(2); setGenerated(true); }}
                disabled={!name}
                className="w-full py-3 rounded-xl bg-[#7C3AED] text-white text-sm font-semibold shadow-sm hover:bg-[#6D28D9] disabled:opacity-40 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                {t('AI Extract Brand Identity', 'AI 提取品牌识别')}
                <ArrowRight className="w-4 h-4" />
              </button>
            </>
          ) : (
            <>
              {/* AI extracted results */}
              <div className="bg-[#EEEDFE] border border-[#CECBF6] rounded-2xl p-5">
                <div className="flex items-center gap-2 mb-4">
                  <Sparkles className="w-4 h-4 text-[#7C3AED]" />
                  <p className="text-sm font-bold text-[#3C3489]">{t('AI Extracted Brand Profile', 'AI 提取的品牌档案')}</p>
                </div>

                {/* Colors */}
                <div className="mb-4">
                  <p className="text-[10px] font-semibold text-[#7F77DD] mb-2 uppercase">{t('Brand Colors', '品牌色')}</p>
                  <div className="flex gap-2">
                    {['#FF6B00', '#000000', '#FFFFFF', '#F5F5F5'].map((c, i) => (
                      <div key={i} className="flex-1">
                        <div className="aspect-square rounded-lg border border-[#E5E7EB]" style={{ backgroundColor: c }} />
                        <p className="text-[9px] text-[#6B7280] mt-1 text-center font-mono">{c}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  {[
                    { label: 'Font', zh: '字体', value: 'Futura Bold' },
                    { label: 'Tone', zh: '语调', value: 'Inspirational' },
                    { label: 'Style', zh: '风格', value: 'Athletic / Performance' },
                    { label: 'Audience', zh: '受众', value: '18-40, Sports' },
                  ].map((item, i) => (
                    <div key={i} className="bg-white/70 rounded-xl px-3 py-2">
                      <p className="text-[10px] text-[#7F77DD]">{t(item.label, item.zh)}</p>
                      <p className="text-xs font-medium text-[#111827] mt-0.5">{item.value}</p>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={onClose}
                className="w-full py-3 rounded-xl bg-[#7C3AED] text-white text-sm font-semibold shadow-sm hover:bg-[#6D28D9] transition-all flex items-center justify-center gap-2">
                <Sparkles className="w-4 h-4" />
                {t('Save Brand Profile', '保存品牌档案')}
                <ArrowRight className="w-4 h-4" />
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
