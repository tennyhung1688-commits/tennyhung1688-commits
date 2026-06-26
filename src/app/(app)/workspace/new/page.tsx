'use client';

import { useState, useCallback } from 'react';
import Link from 'next/link';
import {
  Upload, ChevronRight, ChevronLeft, Check, Sparkles,
  Image, Video, FileText, Download, Package, Globe,
  Zap, RefreshCw, ArrowRight, Play, LayoutDashboard
} from 'lucide-react';
import { useLang } from '@/lib/i18n';

// Platform list with icons
const platforms = [
  { id: 'amazon',    label: 'Amazon',    icon: '🇺🇸', color: '#EF9F27' },
  { id: 'shopify',   label: 'Shopify',   icon: '🛒', color: '#96BF48' },
  { id: 'tiktok',    label: 'TikTok',    icon: '🎵', color: '#000' },
  { id: 'taobao',    label: 'Taobao',    icon: '🍑', color: '#F97316' },
  { id: 'douyin',    label: 'Douyin',    icon: '🎬', color: '#000' },
  { id: 'shopee',    label: 'Shopee',    icon: '🛍️', color: '#EF5320' },
  { id: 'lazada',    label: 'Lazada',    icon: '🦁', color: '#0F1470' },
  { id: 'temu',      label: 'Temu',      icon: '📦', color: '#F15A24' },
  { id: 'ebay',      label: 'eBay',      icon: '🔵', color: '#E53238' },
  { id: 'walmart',   label: 'Walmart',   icon: '⭐', color: '#0071CE' },
  { id: 'jd',        label: 'JD.com',    icon: '🐶', color: '#E3393C' },
  { id: 'xiaohongshu', label: 'XHS',     icon: '📕', color: '#FE2C55' },
];

type Step = 'upload' | 'select' | 'generating' | 'review';

interface GeneratedAsset {
  id: string;
  type: 'image' | 'video' | 'text';
  name: string;
  status: 'pending' | 'running' | 'done';
  url?: string;
  content?: string;
}

export default function NewProjectPage() {
  const { t } = useLang();
  const [step, setStep] = useState<Step>('upload');
  const [uploaded, setUploaded] = useState(false);
  const [productName, setProductName] = useState('');
  const [selectedPlatforms, setSelectedPlatforms] = useState<Set<string>>(new Set(['amazon']));
  const [assets, setAssets] = useState<GeneratedAsset[]>([
    { id: 'hero', type: 'image', name: 'Main Image', status: 'pending' },
    { id: 'lifestyle-1', type: 'image', name: 'Lifestyle Scene 1', status: 'pending' },
    { id: 'lifestyle-2', type: 'image', name: 'Lifestyle Scene 2', status: 'pending' },
    { id: 'infographic', type: 'image', name: 'Infographic', status: 'pending' },
    { id: 'video-ugc', type: 'video', name: 'UGC Video', status: 'pending' },
    { id: 'title', type: 'text', name: 'Product Title', status: 'pending' },
    { id: 'bullets', type: 'text', name: 'Bullet Points (x5)', status: 'pending' },
    { id: 'description', type: 'text', name: 'Product Description', status: 'pending' },
    { id: 'seo', type: 'text', name: 'SEO Keywords', status: 'pending' },
  ]);

  const togglePlatform = (id: string) => {
    const next = new Set(selectedPlatforms);
    if (next.has(id)) {
      if (next.size > 1) next.delete(id);
    } else {
      next.add(id);
    }
    setSelectedPlatforms(next);
  };

  const startGeneration = useCallback(() => {
    setStep('generating');

    // Simulate sequential asset generation with delays
    const generateStep = (index: number) => {
      if (index >= assets.length) {
        setTimeout(() => setStep('review'), 500);
        return;
      }
      setAssets(prev => prev.map((a, i) => i === index ? { ...a, status: 'running' } : a));
      const delay = assets[index].type === 'video' ? 2500 : assets[index].type === 'text' ? 400 : 1000;
      setTimeout(() => {
        setAssets(prev => prev.map((a, i) => i === index ? { ...a, status: 'done' } : a));
        generateStep(index + 1);
      }, delay);
    };
    generateStep(0);
  }, [assets]);

  const allDone = assets.every(a => a.status === 'done');

  return (
    <div className="px-8 py-8 max-w-4xl mx-auto">
      {/* Progress steps */}
      <div className="flex items-center justify-center gap-2 mb-10">
        {[
          { key: 'upload', label: 'Upload', zh: '上传' },
          { key: 'select', label: 'Select', zh: '选择' },
          { key: 'generating', label: 'Generate', zh: '生成' },
          { key: 'review', label: 'Review', zh: '下载' },
        ].map((s, i) => (
          <div key={s.key} className="flex items-center gap-2">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
              (s.key === step) ? 'bg-[#7C3AED] text-white' :
              (['review'].includes(step) || (step === 'generating' && ['upload','select'].includes(s.key)))
                ? 'bg-emerald-500 text-white'
                : 'bg-[#F5F5F5] text-[#9CA3AF]'
            }`}>
              {(['review'].includes(step) && ['upload','select','generating'].includes(s.key)) || step === 'generating' && ['upload','select'].includes(s.key) ? (
                <Check className="w-4 h-4" />
              ) : (
                i + 1
              )}
            </div>
            <span className={`text-xs font-medium ${
              s.key === step ? 'text-[#7C3AED]' : 'text-[#9CA3AF]'
            }`}>{t(s.label, s.zh)}</span>
            {i < 3 && <div className="w-8 h-px bg-[#E5E7EB]" />}
          </div>
        ))}
      </div>

      {/* Step 1: Upload */}
      {step === 'upload' && (
        <div className="bg-white rounded-2xl border border-[#E5E7EB] p-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-2xl bg-[#EEEDFE] flex items-center justify-center mx-auto mb-4">
              <Upload className="w-8 h-8 text-[#7C3AED]" />
            </div>
            <h2 className="text-xl font-bold text-[#111827] mb-2">
              {t('Upload Your Product', '上传你的商品')}
            </h2>
            <p className="text-sm text-[#6B7280] max-w-md mx-auto">
              {t('AI will analyze your product and auto-detect its attributes, category, and selling points.', 'AI 将分析你的商品，自动识别属性、分类和卖点。')}
            </p>
          </div>

          {/* Upload zone */}
          <div
            onClick={() => setUploaded(true)}
            className={`mx-auto max-w-lg aspect-[4/3] rounded-2xl border-2 border-dashed flex flex-col items-center justify-center gap-4 cursor-pointer transition-all ${
              uploaded
                ? 'border-emerald-300 bg-emerald-50'
                : 'border-[#D1D5DB] bg-[#FAFAFA] hover:border-[#7C3AED] hover:bg-[#EEEDFE]/30'
            }`}
          >
            {uploaded ? (
              <>
                <div className="w-16 h-16 rounded-2xl bg-emerald-100 flex items-center justify-center">
                  <Check className="w-8 h-8 text-emerald-500" />
                </div>
                <div className="text-center">
                  <p className="text-sm font-semibold text-emerald-700">{t('Product Uploaded', '商品已上传')}</p>
                  <p className="text-xs text-emerald-500 mt-1">{t('AI analyzing...', 'AI 正在分析...')}</p>
                </div>
              </>
            ) : (
              <>
                <div className="w-14 h-14 rounded-2xl bg-[#7C3AED]/5 flex items-center justify-center">
                  <Package className="w-7 h-7 text-[#7C3AED]" />
                </div>
                <div className="text-center">
                  <p className="text-sm font-semibold text-[#111827]">{t('Click or drag to upload', '点击或拖拽上传')}</p>
                  <p className="text-xs text-[#9CA3AF] mt-1">{t('JPG, PNG, WebP — Max 20MB', 'JPG、PNG、WebP — 最大 20MB')}</p>
                </div>
              </>
            )}
          </div>

          <div className="max-w-lg mx-auto mt-6">
            <label className="block text-sm font-medium text-[#374151] mb-1.5">{t('Product Name (optional)', '商品名称（可选）')}</label>
            <input
              type="text"
              value={productName}
              onChange={e => setProductName(e.target.value)}
              placeholder={t('e.g. Nike Air Max 2026', '例如 Nike Air Max 2026')}
              className="w-full px-4 py-3 border border-[#E5E7EB] rounded-xl text-sm bg-white focus:ring-2 focus:ring-[#7C3AED]/20 focus:border-[#7C3AED] outline-none"
            />
          </div>

          <div className="text-center mt-8">
            <button
              onClick={() => setStep('select')}
              disabled={!uploaded}
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#7C3AED] text-white rounded-2xl text-sm font-semibold shadow-sm hover:bg-[#6D28D9] disabled:opacity-40 disabled:cursor-not-allowed transition-all"
            >
              {t('Next: Select Platform', '下一步：选择平台')}
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Step 2: Select Platform */}
      {step === 'select' && (
        <div className="bg-white rounded-2xl border border-[#E5E7EB] p-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-2xl bg-[#EEEDFE] flex items-center justify-center mx-auto mb-4">
              <Globe className="w-7 h-7 text-[#7C3AED]" />
            </div>
            <h2 className="text-xl font-bold text-[#111827] mb-2">
              {t('Choose Your Platform', '选择目标平台')}
            </h2>
            <p className="text-sm text-[#6B7280]">
              {t('AI will auto-adapt content for each platform\'s rules and format.', 'AI 会根据平台规则和格式自动适配内容。')}
            </p>
          </div>

          <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 max-w-2xl mx-auto mb-8">
            {platforms.map(plat => (
              <button
                key={plat.id}
                onClick={() => togglePlatform(plat.id)}
                className={`p-4 rounded-xl border text-center transition-all ${
                  selectedPlatforms.has(plat.id)
                    ? 'border-[#7C3AED] bg-[#7C3AED]/5 ring-1 ring-[#7C3AED]/10'
                    : 'border-[#E5E7EB] hover:border-[#D1D5DB]'
                }`}
              >
                <span className="text-2xl block mb-1">{plat.icon}</span>
                <span className="text-xs font-semibold text-[#111827]">{plat.label}</span>
                {selectedPlatforms.has(plat.id) && (
                  <div className="mt-2 w-5 h-5 rounded-full bg-[#7C3AED] mx-auto flex items-center justify-center">
                    <Check className="w-3 h-3 text-white" />
                  </div>
                )}
              </button>
            ))}
          </div>

          {/* Selected platforms summary */}
          <div className="bg-[#FAFAFA] rounded-2xl border border-[#E5E7EB] p-5 max-w-lg mx-auto mb-8">
            <h3 className="text-sm font-bold text-[#111827] mb-3">{t('Generation Plan', '生成计划')}</h3>
            <div className="space-y-2">
              {Array.from(selectedPlatforms).map(pid => {
                const plat = platforms.find(p => p.id === pid)!;
                return (
                  <div key={pid} className="flex items-center gap-3 text-xs text-[#6B7280]">
                    <span>{plat.icon}</span>
                    <span className="font-medium text-[#111827]">{plat.label}</span>
                    <span className="text-[#9CA3AF]">→</span>
                    <span>9 assets (4 images + 1 video + 4 copy)</span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="flex items-center justify-center gap-3">
            <button
              onClick={() => setStep('upload')}
              className="px-6 py-3 bg-white border border-[#E5E7EB] text-[#6B7280] rounded-2xl text-sm font-semibold hover:bg-[#FAFAFA] transition-all"
            >
              <ChevronLeft className="w-4 h-4 inline mr-1" />
              {t('Back', '返回')}
            </button>
            <button
              onClick={startGeneration}
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#7C3AED] text-white rounded-2xl text-sm font-semibold shadow-sm hover:bg-[#6D28D9] transition-all"
            >
              <Sparkles className="w-4 h-4" />
              {t('Start AI Generation', '开始 AI 生成')}
              {selectedPlatforms.size > 1 && <span className="text-[#CECBF6]">({selectedPlatforms.size} platforms)</span>}
            </button>
          </div>
        </div>
      )}

      {/* Step 3: Generating */}
      {step === 'generating' && (
        <div className="bg-white rounded-2xl border border-[#E5E7EB] p-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-2xl bg-[#EEEDFE] flex items-center justify-center mx-auto mb-4">
              <RefreshCw className="w-7 h-7 text-[#7C3AED] animate-spin" />
            </div>
            <h2 className="text-xl font-bold text-[#111827] mb-2">
              {t('AI Is Generating...', 'AI 正在生成...')}
            </h2>
            <p className="text-sm text-[#6B7280]">
              {t(`${assets.filter(a => a.status === 'done').length}/${assets.length} assets completed`, `${assets.filter(a => a.status === 'done').length}/${assets.length} 个素材已完成`)}
            </p>
          </div>

          {/* Progress bar */}
          <div className="max-w-md mx-auto mb-8">
            <div className="h-2 bg-[#F5F5F5] rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#7C3AED] to-[#6D28D9] rounded-full transition-all duration-700"
                style={{ width: `${(assets.filter(a => a.status === 'done').length / assets.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Asset status grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-2xl mx-auto">
            {assets.map(asset => (
              <div
                key={asset.id}
                className={`flex items-center gap-3 p-3 rounded-xl border transition-all ${
                  asset.status === 'done' ? 'border-emerald-200 bg-emerald-50' :
                  asset.status === 'running' ? 'border-[#CECBF6] bg-[#EEEDFE]' :
                  'border-[#E5E7EB]'
                }`}
              >
                <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${
                  asset.status === 'done' ? 'bg-emerald-100' :
                  asset.status === 'running' ? 'bg-[#7C3AED]' :
                  'bg-[#F5F5F5]'
                }`}>
                  {asset.type === 'image' && <Image className={`w-4 h-4 ${asset.status === 'running' ? 'text-white' : asset.status === 'done' ? 'text-emerald-600' : 'text-[#9CA3AF]'}`} />}
                  {asset.type === 'video' && <Video className={`w-4 h-4 ${asset.status === 'running' ? 'text-white' : asset.status === 'done' ? 'text-emerald-600' : 'text-[#9CA3AF]'}`} />}
                  {asset.type === 'text' && <FileText className={`w-4 h-4 ${asset.status === 'running' ? 'text-white' : asset.status === 'done' ? 'text-emerald-600' : 'text-[#9CA3AF]'}`} />}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-[#111827] truncate">{asset.name}</p>
                  <p className="text-[10px] text-[#9CA3AF]">
                    {asset.status === 'done' ? '✓ Done' : asset.status === 'running' ? 'Generating...' : 'Waiting'}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {allDone && (
            <div className="text-center mt-6">
              <button
                onClick={() => setStep('review')}
                className="inline-flex items-center gap-2 px-6 py-2.5 bg-emerald-500 text-white rounded-2xl text-sm font-semibold hover:bg-emerald-600 transition-all"
              >
                <Check className="w-4 h-4" />
                {t('View Results', '查看结果')}
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      )}

      {/* Step 4: Review & Download */}
      {step === 'review' && (
        <div className="space-y-6">
          {/* Success header */}
          <div className="bg-white rounded-2xl border border-emerald-200 p-6 text-center">
            <div className="w-16 h-16 rounded-2xl bg-emerald-100 flex items-center justify-center mx-auto mb-3">
              <Check className="w-8 h-8 text-emerald-500" />
            </div>
            <h2 className="text-xl font-bold text-[#111827] mb-1">
              {t('All Assets Generated!', '所有素材已生成！')}
            </h2>
            <p className="text-sm text-[#6B7280]">
              {t(`9 assets ready for ${Array.from(selectedPlatforms).length} platform(s)`, `${selectedPlatforms.size} 个平台共 9 个素材已生成`)}
            </p>
          </div>

          {/* Image gallery */}
          <div className="bg-white rounded-2xl border border-[#E5E7EB] p-6">
            <h3 className="text-sm font-bold text-[#111827] mb-4 flex items-center gap-2">
              <Image className="w-4 h-4 text-[#7C3AED]" />
              {t('Images', '图片')} (4)
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {assets.filter(a => a.type === 'image').map(asset => (
                <div key={asset.id} className="group relative aspect-square rounded-xl bg-[#F5F5F5] border border-[#E5E7EB] flex flex-col items-center justify-center hover:border-[#D1D5DB] transition-all">
                  <Image className="w-8 h-8 text-[#D1D5DB] mb-2" />
                  <span className="text-[10px] text-[#9CA3AF]">{asset.name}</span>
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 rounded-xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all">
                    <Download className="w-5 h-5 text-[#7C3AED]" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Video */}
          <div className="bg-white rounded-2xl border border-[#E5E7EB] p-6">
            <h3 className="text-sm font-bold text-[#111827] mb-4 flex items-center gap-2">
              <Video className="w-4 h-4 text-[#7C3AED]" />
              {t('Video', '视频')} (1)
            </h3>
            <div className="aspect-video rounded-xl bg-[#F5F5F5] border border-[#E5E7EB] flex items-center justify-center max-w-lg">
              <div className="text-center">
                <Play className="w-10 h-10 text-[#D1D5DB] mx-auto mb-2" />
                <p className="text-xs text-[#9CA3AF]">UGC Product Video</p>
              </div>
            </div>
          </div>

          {/* Copy */}
          <div className="bg-white rounded-2xl border border-[#E5E7EB] p-6">
            <h3 className="text-sm font-bold text-[#111827] mb-4 flex items-center gap-2">
              <FileText className="w-4 h-4 text-[#7C3AED]" />
              {t('Copywriting', '文案')} (4)
            </h3>
            <div className="space-y-3 max-w-2xl">
              {[
                { label: 'Title', zh: '标题', value: productName || 'Premium Product - Professional Grade Quality for Everyday Excellence' },
                { label: 'Bullet Points', zh: '卖点', value: '• Premium quality materials\n• Professional grade performance\n• Ergonomic design\n• Easy to use and maintain\n• 100% satisfaction guarantee' },
                { label: 'Description', zh: '描述', value: 'Experience unmatched quality with our premium product. Designed for professionals who demand the best. Features advanced technology that delivers exceptional results every time.' },
                { label: 'SEO Keywords', zh: '搜索词', value: 'premium product, professional grade, high quality, best in class, top rated, durable, reliable, affordable' },
              ].map((item, i) => (
                <div key={i} className="p-3 rounded-xl bg-[#FAFAFA] border border-[#E5E7EB]">
                  <p className="text-[10px] text-[#9CA3AF] mb-1">{t(item.label, item.zh)}</p>
                  <p className="text-xs text-[#374151] leading-relaxed whitespace-pre-line">{item.value}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-center gap-3 pb-8">
            <button
              onClick={() => { setStep('upload'); setUploaded(false); setAssets(prev => prev.map(a => ({ ...a, status: 'pending' }))); }}
              className="px-6 py-3 bg-white border border-[#E5E7EB] text-[#6B7280] rounded-2xl text-sm font-semibold hover:bg-[#FAFAFA] transition-all"
            >
              <RefreshCw className="w-4 h-4 inline mr-1" />
              {t('Start New', '新建项目')}
            </button>
            <button
              onClick={() => alert(t('Download starting...', '开始下载...'))}
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#085041] text-white rounded-2xl text-sm font-semibold shadow-lg shadow-emerald-500/20 hover:bg-[#0A634F] transition-all">
              <Download className="w-4 h-4" />
              {t('Download All (ZIP)', '下载全部 (ZIP)')}
            </button>
            <Link
              href="/assets"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white border border-[#E5E7EB] text-[#374151] rounded-2xl text-sm font-semibold hover:bg-[#FAFAFA] transition-all"
            >
              {t('Save to Content Hub', '保存到素材中心')}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
