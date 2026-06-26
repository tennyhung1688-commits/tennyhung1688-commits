'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  Plus, Upload, Package, Tag, Palette, Ruler, Target,
  Sparkles, ArrowRight, Search, Filter, MoreHorizontal,
  Box, ChevronRight, Image, Zap
} from 'lucide-react';
import { useLang } from '@/lib/i18n';
import QuickGuide from '@/components/QuickGuide';

interface Product {
  id: string;
  name: string;
  sku: string;
  category: string;
  image: string;
  status: 'active' | 'draft';
  attributes: string[];
}

const mockProducts: Product[] = [
  { id: '1', name: 'Nike Air Max 2026', sku: 'NK-AM-001', category: 'Shoes', image: '', status: 'active', attributes: ['Red', 'Mesh', 'Running', 'US 7-13'] },
  { id: '2', name: 'Lancôme Advanced Serum', sku: 'LC-SR-088', category: 'Beauty', image: '', status: 'active', attributes: ['30ml', 'Anti-aging', 'Hyaluronic Acid'] },
  { id: '3', name: 'Sony WH-1000XM6', sku: 'SN-WH-006', category: 'Electronics', image: '', status: 'draft', attributes: ['Black', 'Noise Cancelling', '30h Battery'] },
  { id: '4', name: 'Levi\'s 501 Original', sku: 'LV-501-042', category: 'Fashion', image: '', status: 'active', attributes: ['Blue', 'Denim', 'Regular Fit', 'W28-38'] },
  { id: '5', name: 'Dyson V15 Detect', sku: 'DY-V15-001', category: 'Home', image: '', status: 'draft', attributes: ['Cordless', 'Laser Detection', '60min Runtime'] },
];

const categories = ['All', 'Shoes', 'Fashion', 'Beauty', 'Electronics', 'Home', 'Jewelry', 'Sports', 'Pet'];

export default function ProductCenter() {
  const { t } = useLang();
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const filtered = mockProducts.filter(p =>
    (activeCategory === 'All' || p.category === activeCategory) &&
    (p.name.toLowerCase().includes(search.toLowerCase()) || p.sku.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="px-8 py-8 max-w-7xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-[#111827] tracking-tight">
            {t('Product Center', '商品中心')}
          </h1>
          <p className="text-sm text-[#6B7280] mt-1">
            {t('Manage products. AI auto-generates complete product profiles.', '管理商品。AI 自动生成完整商品档案。')}
          </p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#7C3AED] text-white rounded-xl text-sm font-semibold shadow-sm hover:bg-[#6D28D9] transition-all"
        >
          <Plus className="w-4 h-4" />
          <Sparkles className="w-3.5 h-3.5" />
          {t('Add Product', '添加商品')}
        </button>
      </div>

      <QuickGuide title="How Product Center Works" zh="商品中心使用指南" steps={[
        { title: 'Upload a product photo', zh: '上传商品照片', desc: 'Click "Add Product" and upload a product photo. AI will auto-detect its category, color, material, style, and target audience.', descZh: '点击"添加商品"上传商品照片，AI 会自动识别分类、颜色、材质、风格和目标用户。' },
        { title: 'Review AI product profile', zh: '查看 AI 商品档案', desc: 'Click any product to see the AI-generated Product Profile with 8 auto-detected attributes.', descZh: '点击任意商品查看 AI 生成的商品档案，包含 8 项自动识别属性。' },
        { title: 'Generate assets from product', zh: '基于商品生成素材', desc: 'Hover over a product card and click "Generate Assets" or use "Run Workflow" in the detail panel.', descZh: '鼠标悬停商品卡片点击"生成素材"，或在详情面板点击"运行工作流"。' },
      ]} />

      {/* Toolbar */}
      <div className="flex items-center gap-4 mb-6">
        <div className="flex-1 relative max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9CA3AF]" />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder={t('Search products or SKU...', '搜索商品或 SKU...')}
            className="w-full pl-10 pr-4 py-2.5 border border-[#E5E7EB] rounded-xl text-sm bg-white focus:ring-2 focus:ring-[#7C3AED]/20 focus:border-[#7C3AED] outline-none transition-all"
          />
        </div>
        <div className="flex items-center gap-1.5 flex-wrap">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeCategory === cat
                  ? 'bg-[#7C3AED] text-white'
                  : 'bg-white border border-[#E5E7EB] text-[#6B7280] hover:border-[#D1D5DB]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Product grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map(product => (
          <button
            key={product.id}
            onClick={() => setSelectedProduct(product)}
            className="group text-left bg-white rounded-2xl border border-[#E5E7EB] p-5 hover:border-[#D1D5DB] hover:shadow-sm transition-all"
          >
            {/* Product image placeholder */}
            <div className="w-full aspect-square rounded-xl bg-[#F5F5F5] border border-[#E5E7EB] flex items-center justify-center mb-4 overflow-hidden group-hover:border-[#D1D5DB] transition-all">
              <Package className="w-12 h-12 text-[#D1D5DB]" />
            </div>

            {/* Info */}
            <div className="flex items-start justify-between mb-2">
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-bold text-[#111827] truncate">{product.name}</h3>
                <p className="text-xs text-[#9CA3AF] mt-0.5">SKU: {product.sku}</p>
              </div>
              <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ml-2 ${
                product.status === 'active' ? 'bg-emerald-50 text-emerald-600' : 'bg-[#F5F5F5] text-[#9CA3AF]'
              }`}>
                {product.status === 'active' ? t('Active', '活跃') : t('Draft', '草稿')}
              </span>
            </div>

            {/* Attributes */}
            <div className="flex items-center gap-1.5 flex-wrap">
              {product.attributes.map((attr, i) => (
                <span key={i} className="text-[10px] text-[#6B7280] bg-[#FAFAFA] border border-[#E5E7EB] px-2 py-0.5 rounded-md">
                  {attr}
                </span>
              ))}
            </div>

            {/* Quick actions */}
            <div className="flex items-center gap-2 mt-3 pt-3 border-t border-[#F5F5F5] opacity-0 group-hover:opacity-100 transition-opacity">
              <span className="text-[11px] text-[#7C3AED] font-medium flex items-center gap-1">
                <Sparkles className="w-3 h-3" />
                {t('Generate Assets', '生成素材')}
              </span>
              <ChevronRight className="w-3 h-3 text-[#D1D5DB] ml-auto" />
            </div>
          </button>
        ))}
      </div>

      {/* Empty state */}
      {filtered.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 bg-white rounded-2xl border border-[#E5E7EB]">
          <Box className="w-12 h-12 text-[#D1D5DB] mb-4" />
          <h3 className="text-sm font-semibold text-[#111827] mb-1">
            {t('No products found', '未找到商品')}
          </h3>
          <p className="text-xs text-[#9CA3AF] mb-4">
            {t('Add your first product to get started', '添加第一个商品开始使用')}
          </p>
          <button
            onClick={() => setShowAddModal(true)}
            className="inline-flex items-center gap-2 px-4 py-2 bg-[#7C3AED] text-white rounded-xl text-sm font-semibold hover:bg-[#6D28D9] transition-all"
          >
            <Plus className="w-4 h-4" />
            {t('Add Product', '添加商品')}
          </button>
        </div>
      )}

      {/* Product detail panel (right slide-in) */}
      {selectedProduct && (
        <ProductDetail
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}

      {/* Add product modal */}
      {showAddModal && (
        <AddProductModal onClose={() => setShowAddModal(false)} />
      )}
    </div>
  );
}

/* ── Product Detail Panel ── */
function ProductDetail({ product, onClose }: { product: Product; onClose: () => void }) {
  const { t } = useLang();
  const router = useRouter();
  return (
    <div className="fixed inset-0 z-50 flex justify-end" onClick={onClose}>
      <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" />
      <div
        className="relative w-full max-w-lg bg-white shadow-2xl border-l border-[#E5E7EB] overflow-y-auto animate-fade-in-up"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 bg-white/80 backdrop-blur-xl border-b border-[#E5E7EB] px-6 py-4 flex items-center justify-between">
          <h2 className="text-base font-bold text-[#111827]">{product.name}</h2>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-[#F5F5F5] text-[#6B7280]">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Product Image */}
          <div className="aspect-square rounded-2xl bg-[#F5F5F5] border border-[#E5E7EB] flex items-center justify-center">
            <Package className="w-16 h-16 text-[#D1D5DB]" />
          </div>

          {/* AI Product Profile */}
          <div className="bg-[#EEEDFE] border border-[#CECBF6] rounded-2xl p-5">
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="w-4 h-4 text-[#7C3AED]" />
              <h3 className="text-sm font-bold text-[#3C3489]">
                {t('AI Product Profile', 'AI 商品档案')}
              </h3>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: 'Name', zh: '名称', value: product.name },
                { label: 'SKU', zh: 'SKU', value: product.sku },
                { label: 'Category', zh: '分类', value: product.category },
                { label: 'Status', zh: '状态', value: product.status },
                { label: 'Color', zh: '颜色', value: product.attributes[0] || '—' },
                { label: 'Material', zh: '材质', value: product.attributes[1] || '—' },
                { label: 'Style', zh: '风格', value: product.attributes[2] || '—' },
                { label: 'Size Range', zh: '尺寸范围', value: product.attributes[3] || '—' },
              ].map((item, i) => (
                <div key={i} className="bg-white/70 rounded-xl px-3 py-2">
                  <p className="text-[10px] text-[#7F77DD]">{t(item.label, item.zh)}</p>
                  <p className="text-xs font-medium text-[#111827] mt-0.5 capitalize">{item.value}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="space-y-2">
            <button
              onClick={() => router.push('/workflow/new')}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-[#7C3AED] text-white text-sm font-semibold shadow-sm hover:bg-[#6D28D9] transition-all">
              <Zap className="w-4 h-4" />
              {t('Run Workflow for This Product', '为此商品运行工作流')}
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => router.push('/workspace/new')}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-white border border-[#E5E7EB] text-[#374151] text-sm font-semibold hover:bg-[#FAFAFA] transition-all">
              <Image className="w-4 h-4" />
              {t('Generate Images', '生成图片')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Add Product Modal ── */
function AddProductModal({ onClose }: { onClose: () => void }) {
  const { t } = useLang();
  const [step, setStep] = useState(1);
  const [name, setName] = useState('');
  const [sku, setSku] = useState('');
  const [category, setCategory] = useState('');
  const [uploaded, setUploaded] = useState(false);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center" onClick={onClose}>
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" />
      <div
        className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl border border-[#E5E7EB] overflow-hidden animate-fade-in-up max-h-[90vh] overflow-y-auto"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-[#E5E7EB] flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-[#111827]">
              {t('Add Product', '添加商品')}
            </h2>
            <p className="text-xs text-[#9CA3AF] mt-0.5">
              {step === 1 ? t('Upload a photo to begin', '上传照片开始') : t('AI will auto-detect attributes', 'AI 将自动识别属性')}
            </p>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-[#F5F5F5] text-[#6B7280]">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        </div>

        <div className="p-6 space-y-5">
          {step === 1 ? (
            <>
              {/* Upload zone */}
              <div className="aspect-square rounded-2xl border-2 border-dashed border-[#D1D5DB] hover:border-[#7C3AED] bg-[#FAFAFA] flex flex-col items-center justify-center gap-3 cursor-pointer transition-all group"
                onClick={() => setUploaded(true)}
              >
                {uploaded ? (
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-16 h-16 rounded-2xl bg-emerald-50 flex items-center justify-center">
                      <Sparkles className="w-8 h-8 text-emerald-500" />
                    </div>
                    <p className="text-sm font-semibold text-[#111827]">{t('Photo uploaded', '照片已上传')}</p>
                    <p className="text-xs text-[#9CA3AF]">{t('AI analyzing product...', 'AI 正在分析商品...')}</p>
                  </div>
                ) : (
                  <>
                    <div className="w-14 h-14 rounded-2xl bg-[#7C3AED]/5 flex items-center justify-center group-hover:bg-[#7C3AED]/10 transition-all">
                      <Upload className="w-7 h-7 text-[#7C3AED]" />
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-semibold text-[#111827]">{t('Click to upload product photo', '点击上传商品照片')}</p>
                      <p className="text-xs text-[#9CA3AF] mt-1">{t('JPG, PNG, WebP up to 20MB', '支持 JPG、PNG、WebP，最大 20MB')}</p>
                    </div>
                  </>
                )}
              </div>

              <button
                onClick={() => setStep(2)}
                disabled={!uploaded}
                className="w-full py-3 rounded-xl bg-[#7C3AED] text-white text-sm font-semibold shadow-sm hover:bg-[#6D28D9] disabled:opacity-40 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
              >
                {t('Continue', '继续')}
                <ArrowRight className="w-4 h-4" />
              </button>
            </>
          ) : (
            <>
              {/* Step 2: Product info */}
              <div>
                <label className="block text-sm font-medium text-[#374151] mb-1.5">{t('Product Name', '商品名称')}</label>
                <input
                  type="text"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder={t('e.g. Nike Air Max 2026', '例如 Nike Air Max 2026')}
                  className="w-full px-4 py-3 border border-[#E5E7EB] rounded-xl text-sm bg-white focus:ring-2 focus:ring-[#7C3AED]/20 focus:border-[#7C3AED] outline-none transition-all"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[#374151] mb-1.5">SKU</label>
                  <input
                    type="text"
                    value={sku}
                    onChange={e => setSku(e.target.value)}
                    placeholder="NK-AM-001"
                    className="w-full px-4 py-3 border border-[#E5E7EB] rounded-xl text-sm bg-white focus:ring-2 focus:ring-[#7C3AED]/20 focus:border-[#7C3AED] outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#374151] mb-1.5">{t('Category', '分类')}</label>
                  <select
                    value={category}
                    onChange={e => setCategory(e.target.value)}
                    className="w-full px-4 py-3 border border-[#E5E7EB] rounded-xl text-sm bg-white focus:ring-2 focus:ring-[#7C3AED]/20 focus:border-[#7C3AED] outline-none transition-all"
                  >
                    <option value="">{t('Select...', '选择...')}</option>
                    <option value="shoes">Shoes</option>
                    <option value="fashion">Fashion</option>
                    <option value="beauty">Beauty</option>
                    <option value="electronics">Electronics</option>
                    <option value="home">Home</option>
                  </select>
                </div>
              </div>

              {/* AI detected attributes */}
              <div className="bg-[#EEEDFE] border border-[#CECBF6] rounded-2xl p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Sparkles className="w-3.5 h-3.5 text-[#7C3AED]" />
                  <p className="text-xs font-semibold text-[#3C3489]">{t('AI Detected', 'AI 自动识别')}</p>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { label: 'Color', zh: '颜色', value: 'Red / Black' },
                    { label: 'Material', zh: '材质', value: 'Mesh + Rubber' },
                    { label: 'Style', zh: '风格', value: 'Athletic / Running' },
                    { label: 'Target', zh: '目标用户', value: '18-35, Active' },
                  ].map((attr, i) => (
                    <div key={i} className="bg-white/70 rounded-xl px-3 py-2">
                      <p className="text-[10px] text-[#7F77DD]">{t(attr.label, attr.zh)}</p>
                      <p className="text-xs font-medium text-[#111827] mt-0.5">{attr.value}</p>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={onClose}
                className="w-full py-3 rounded-xl bg-[#7C3AED] text-white text-sm font-semibold shadow-sm hover:bg-[#6D28D9] transition-all flex items-center justify-center gap-2">
                <Sparkles className="w-4 h-4" />
                {t('Create Product Profile', '创建商品档案')}
                <ArrowRight className="w-4 h-4" />
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
