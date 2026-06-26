'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Upload, Package, Tag, FileText, Save, Sparkles, Camera } from 'lucide-react';
import { useLang } from '@/lib/i18n';

export default function NewProductPage() {
  const { t } = useLang();
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [product, setProduct] = useState({
    name: '',
    sku: '',
    category: '',
    description: '',
    price: '',
  });

  const categories = [
    { en: 'Fashion', zh: '时尚' },
    { en: 'Beauty', zh: '美妆' },
    { en: 'Electronics', zh: '数码' },
    { en: 'Home', zh: '家居' },
    { en: 'Sports', zh: '运动' },
    { en: 'Food', zh: '食品' },
    { en: 'Pet', zh: '宠物' },
    { en: 'Jewelry', zh: '珠宝' },
  ];

  const handleSave = () => {
    router.push('/products');
  };

  return (
    <div className="px-8 py-8 max-w-2xl">
      {/* Header */}
      <button onClick={() => router.back()} className="inline-flex items-center gap-1.5 text-sm text-[#6B7280] hover:text-[#111827] mb-6 transition-colors">
        <ArrowLeft className="w-4 h-4" />
        {t('Back to Products', '返回商品中心')}
      </button>

      <div className="mb-8">
        <h1 className="text-2xl font-bold text-[#111827] tracking-tight">
          {t('Add New Product', '添加商品')}
        </h1>
        <p className="text-sm text-[#6B7280] mt-1">
          {t('Upload product info and photos — AI will auto-generate everything else.', '上传商品信息和照片，AI 自动生成其余内容。')}
        </p>
      </div>

      {/* Step indicator */}
      <div className="flex items-center gap-2 mb-8">
        {[1, 2].map(s => (
          <div key={s} className="flex items-center gap-2">
            <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
              step >= s ? 'bg-[#7C3AED] text-white' : 'bg-[#F5F5F5] text-[#9CA3AF]'
            }`}>
              {step > s ? '✓' : s}
            </div>
            <span className={`text-xs font-medium ${step >= s ? 'text-[#111827]' : 'text-[#9CA3AF]'}`}>
              {s === 1 ? t('Basic Info', '基本信息') : t('Photos & AI', '照片与 AI')}
            </span>
            {s < 2 && <div className={`w-12 h-px ${step > s ? 'bg-[#7C3AED]' : 'bg-[#E5E7EB]'}`} />}
          </div>
        ))}
      </div>

      {/* Step 1: Basic Info */}
      {step === 1 && (
        <div className="bg-white rounded-2xl border border-[#E5E7EB] p-6 space-y-5">
          <div>
            <label className="block text-sm font-medium text-[#374151] mb-1.5">{t('Product Name', '商品名称')}</label>
            <input type="text" value={product.name} onChange={e => setProduct({ ...product, name: e.target.value })}
              placeholder={t('e.g. Nike Air Max 2026', '例如 Nike Air Max 2026')}
              className="w-full px-4 py-2.5 border border-[#E5E7EB] rounded-xl text-sm bg-white focus:ring-2 focus:ring-[#7C3AED]/20 focus:border-[#7C3AED] outline-none transition-all" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-[#374151] mb-1.5">{t('SKU', 'SKU')}</label>
              <input type="text" value={product.sku} onChange={e => setProduct({ ...product, sku: e.target.value })}
                placeholder="NK-AM-001"
                className="w-full px-4 py-2.5 border border-[#E5E7EB] rounded-xl text-sm bg-white focus:ring-2 focus:ring-[#7C3AED]/20 focus:border-[#7C3AED] outline-none transition-all" />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#374151] mb-1.5">{t('Price (¥)', '价格 (¥)')}</label>
              <input type="text" value={product.price} onChange={e => setProduct({ ...product, price: e.target.value })}
                placeholder="299.00"
                className="w-full px-4 py-2.5 border border-[#E5E7EB] rounded-xl text-sm bg-white focus:ring-2 focus:ring-[#7C3AED]/20 focus:border-[#7C3AED] outline-none transition-all" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-[#374151] mb-1.5">{t('Category', '分类')}</label>
            <select value={product.category} onChange={e => setProduct({ ...product, category: e.target.value })}
              className="w-full px-4 py-2.5 border border-[#E5E7EB] rounded-xl text-sm bg-white focus:ring-2 focus:ring-[#7C3AED]/20 focus:border-[#7C3AED] outline-none transition-all">
              <option value="">{t('Select category', '选择分类')}</option>
              {categories.map(c => (
                <option key={c.en} value={c.en}>{t(c.en, c.zh)}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-[#374151] mb-1.5">{t('Description', '描述')}</label>
            <textarea value={product.description} onChange={e => setProduct({ ...product, description: e.target.value })}
              rows={3} placeholder={t('Brief product description...', '简要商品描述...')}
              className="w-full px-4 py-2.5 border border-[#E5E7EB] rounded-xl text-sm bg-white focus:ring-2 focus:ring-[#7C3AED]/20 focus:border-[#7C3AED] outline-none transition-all resize-none" />
          </div>

          <button onClick={() => setStep(2)}
            className="w-full py-3 bg-[#7C3AED] text-white rounded-xl text-sm font-semibold hover:bg-[#6D28D9] transition-all">
            {t('Next: Upload Photos', '下一步：上传照片')}
          </button>
        </div>
      )}

      {/* Step 2: Photos & AI */}
      {step === 2 && (
        <div className="bg-white rounded-2xl border border-[#E5E7EB] p-6 space-y-5">
          {/* Upload area */}
          <div className="border-2 border-dashed border-[#D1D5DB] rounded-2xl p-12 text-center hover:border-[#7C3AED] hover:bg-[#7C3AED]/[0.02] transition-all cursor-pointer">
            <div className="w-14 h-14 rounded-2xl bg-[#F5F3FF] flex items-center justify-center mx-auto mb-4">
              <Camera className="w-7 h-7 text-[#7C3AED]" />
            </div>
            <p className="text-sm font-semibold text-[#111827] mb-1">
              {t('Upload Product Photos', '上传商品照片')}
            </p>
            <p className="text-xs text-[#9CA3AF] mb-4">
              {t('AI will auto-detect attributes and generate all assets', 'AI 自动识别属性并生成全部素材')}
            </p>
            <button className="inline-flex items-center gap-2 px-6 py-2.5 bg-white border border-[#E5E7EB] rounded-xl text-sm font-semibold text-[#374151] hover:bg-[#FAFAFA] transition-all">
              <Upload className="w-4 h-4" />
              {t('Select Files', '选择文件')}
            </button>
          </div>

          {/* AI preview hint */}
          <div className="flex items-center gap-3 p-4 rounded-xl bg-[#F5F3FF] border border-[#EDE9FE]">
            <Sparkles className="w-5 h-5 text-[#7C3AED] flex-shrink-0" />
            <div>
              <p className="text-xs font-semibold text-[#7C3AED]">{t('AI Auto-Fill Ready', 'AI 自动补全就绪')}</p>
              <p className="text-[10px] text-[#6D28D9]/70">{t('After upload, AI will detect: category, attributes, colors, materials, and generate product profile', '上传后 AI 自动识别品类、属性、颜色、材质并生成商品画像')}</p>
            </div>
          </div>

          {/* Product summary */}
          <div className="p-4 rounded-xl bg-[#FAFAFA] border border-[#E5E7EB] space-y-2">
            <h3 className="text-sm font-bold text-[#111827]">{t('Product Summary', '商品概要')}</h3>
            <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 text-xs">
              <span className="text-[#9CA3AF]">{t('Name', '名称')}:</span><span className="text-[#374151] font-medium">{product.name || '—'}</span>
              <span className="text-[#9CA3AF]">{t('SKU', 'SKU')}:</span><span className="text-[#374151] font-medium">{product.sku || '—'}</span>
              <span className="text-[#9CA3AF]">{t('Category', '分类')}:</span><span className="text-[#374151] font-medium">{product.category || '—'}</span>
              <span className="text-[#9CA3AF]">{t('Price', '价格')}:</span><span className="text-[#374151] font-medium">{product.price ? `¥${product.price}` : '—'}</span>
            </div>
          </div>

          <div className="flex gap-3">
            <button onClick={() => setStep(1)} className="flex-1 py-3 bg-white border border-[#E5E7EB] text-[#6B7280] rounded-xl text-sm font-semibold hover:bg-[#FAFAFA] transition-all">
              {t('Back', '上一步')}
            </button>
            <button onClick={handleSave} className="flex-1 py-3 bg-[#7C3AED] text-white rounded-xl text-sm font-semibold hover:bg-[#6D28D9] transition-all flex items-center justify-center gap-2">
              <Save className="w-4 h-4" />
              {t('Save Product', '保存商品')}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
