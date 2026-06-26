'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Upload, Globe, Check, Clock, ArrowRight, Sparkles,
  RefreshCw, ExternalLink, AlertCircle, Package
} from 'lucide-react';
import { useLang } from '@/lib/i18n';
import QuickGuide from '@/components/QuickGuide';

interface Platform {
  id: string;
  name: string;
  icon: string;
  color: string;
  connected: boolean;
  status: 'ready' | 'pending' | 'live';
}

const platforms: Platform[] = [
  { id: 'amazon', name: 'Amazon', icon: 'A', color: '#EF9F27', connected: true, status: 'ready' },
  { id: 'tiktok', name: 'TikTok Shop', icon: 'T', color: '#000000', connected: true, status: 'ready' },
  { id: 'shopify', name: 'Shopify', icon: 'S', color: '#96BF48', connected: false, status: 'pending' },
  { id: 'taobao', name: 'Taobao', icon: '淘', color: '#F97316', connected: false, status: 'pending' },
  { id: 'shopee', name: 'Shopee', icon: 'Sh', color: '#EF5320', connected: true, status: 'ready' },
  { id: 'lazada', name: 'Lazada', icon: 'L', color: '#0F1470', connected: false, status: 'pending' },
  { id: 'jd', name: 'JD', icon: '京', color: '#E3393C', connected: false, status: 'pending' },
  { id: 'temu', name: 'Temu', icon: 'Te', color: '#F15A24', connected: false, status: 'pending' },
  { id: 'etsy', name: 'Etsy', icon: 'E', color: '#F16522', connected: false, status: 'pending' },
  { id: 'aliexpress', name: 'AliExpress', icon: 'AE', color: '#E62E04', connected: false, status: 'pending' },
  { id: 'walmart', name: 'Walmart', icon: 'W', color: '#0071CE', connected: false, status: 'pending' },
  { id: 'pinduoduo', name: 'Pinduoduo', icon: '拼', color: '#E84546', connected: false, status: 'pending' },
];

interface PublishItem {
  platform: string;
  product: string;
  status: 'draft' | 'scheduled' | 'published';
  date: string;
  url?: string;
}

const publishQueue: PublishItem[] = [
  { platform: 'Amazon', product: 'Nike Air Max 2026', status: 'published', date: '2h ago', url: '#' },
  { platform: 'TikTok Shop', product: 'Nike Air Max 2026', status: 'scheduled', date: 'Tomorrow 9AM' },
  { platform: 'Shopee', product: 'Nike Air Max 2026', status: 'draft', date: '—' },
  { platform: 'Amazon', product: 'Lancôme Advanced Serum', status: 'draft', date: '—' },
];

export default function PublishCenter() {
  const { t } = useLang();
  const [publishing, setPublishing] = useState(false);
  const [selectedPlatforms, setSelectedPlatforms] = useState<Set<string>>(new Set(['amazon']));
  const [publishMode, setPublishMode] = useState(0);

  const togglePlatform = (id: string) => {
    const next = new Set(selectedPlatforms);
    next.has(id) ? next.delete(id) : next.add(id);
    setSelectedPlatforms(next);
  };

  const handlePublish = () => {
    setPublishing(true);
    setTimeout(() => setPublishing(false), 2000);
  };

  return (
    <div className="px-8 py-8 max-w-7xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-[#111827] tracking-tight">
            {t('Publish Center', '发布中心')}
          </h1>
          <p className="text-sm text-[#6B7280] mt-1">
            {t('Manual · Scheduled · Auto — Publish to 25+ global marketplaces.', '手动 · 排期 · 自动 — 发布到 25+ 全球电商平台。')}
          </p>
        </div>
      </div>

      <QuickGuide title="How Publish Center Works" zh="发布中心使用指南" steps={[
        { title: 'Select target platforms', zh: '选择目标平台', desc: 'Click platform cards to select where to publish. Only connected platforms are available.', descZh: '点击平台卡片选择发布目标，已连接平台显示彩色图标。' },
        { title: 'Choose publish mode', zh: '选择发布模式', desc: 'Manual: publish immediately. Scheduled: set a date and time. Auto: AI keeps platforms in sync.', descZh: '手动：立即发布。排期：设置日期时间。自动：AI 持续同步所有平台。' },
        { title: 'Review auto-filled content', zh: '检查自动填充', desc: 'AI auto-fills titles, SKU, categories, images, and descriptions. Review before publishing.', descZh: 'AI 自动填充标题、SKU、分类、图片和描述，发布前请检查。' },
        { title: 'Monitor publish queue', zh: '监控发布队列', desc: 'The right sidebar shows the publish queue with status: draft, scheduled, or published.', descZh: '右侧栏显示发布队列和状态：草稿、排期中、已发布。' },
      ]} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Platform Grid */}
        <div className="lg:col-span-2 space-y-6">
          {/* Product context */}
          <div className="flex items-center gap-3 p-4 bg-white rounded-2xl border border-[#E5E7EB]">
            <div className="w-10 h-10 rounded-xl bg-[#F5F5F5] flex items-center justify-center">
              <Package className="w-5 h-5 text-[#9CA3AF]" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-[#111827]">Nike Air Max 2026</p>
              <p className="text-xs text-[#9CA3AF]">5 images · 1 video · Copy ready · SEO optimized</p>
            </div>
            <Link href="/products" className="text-xs text-[#7C3AED] font-medium hover:underline">{t('Change', '更换')}</Link>
          </div>

          {/* Platform grid */}
          <div className="bg-white rounded-2xl border border-[#E5E7EB] p-5">
            <h3 className="text-sm font-bold text-[#111827] mb-4">
              {t('Select Platforms', '选择平台')} ({selectedPlatforms.size} selected)
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {platforms.map(plat => {
                const isSelected = selectedPlatforms.has(plat.id);
                return (
                  <button
                    key={plat.id}
                    onClick={() => plat.connected && togglePlatform(plat.id)}
                    disabled={!plat.connected}
                    className={`relative p-3 rounded-xl border text-left transition-all ${
                      isSelected
                        ? 'border-[#7C3AED] bg-[#7C3AED]/5 ring-1 ring-[#7C3AED]/10'
                        : plat.connected
                        ? 'border-[#E5E7EB] hover:border-[#D1D5DB] bg-white'
                        : 'border-[#E5E7EB] bg-[#FAFAFA] opacity-60 cursor-not-allowed'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1.5">
                      <div
                        className="w-7 h-7 rounded-lg flex items-center justify-center text-[10px] font-bold text-white"
                        style={{ backgroundColor: plat.color }}
                      >
                        {plat.icon}
                      </div>
                      <span className="text-xs font-semibold text-[#111827]">{plat.name}</span>
                    </div>
                    {!plat.connected && (
                      <span className="text-[9px] text-[#9CA3AF]">{t('Connect first', '需先连接')}</span>
                    )}
                    {isSelected && (
                      <div className="absolute top-2 right-2 w-4 h-4 rounded-full bg-[#7C3AED] flex items-center justify-center">
                        <Check className="w-2.5 h-2.5 text-white" />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Publish options */}
            <div className="mt-5 pt-5 border-t border-[#E5E7EB]">
              <div className="grid grid-cols-3 gap-3 mb-4">
                {[
                  { label: 'Manual', zh: '手动', desc: 'Publish now', descZh: '立即发布' },
                  { label: 'Scheduled', zh: '排期', desc: 'Set date & time', descZh: '设置时间' },
                  { label: 'Auto', zh: '自动', desc: 'Auto-sync regularly', descZh: '自动同步' },
                ].map((mode, i) => (
                  <button
                    key={i}
                    onClick={() => setPublishMode(i)}
                    className={`p-3 rounded-xl border text-center transition-all ${
                      publishMode === i ? 'border-[#7C3AED] bg-[#7C3AED]/5' : 'border-[#E5E7EB] hover:border-[#D1D5DB]'
                    }`}
                  >
                    <p className="text-xs font-bold text-[#111827]">{t(mode.label, mode.zh)}</p>
                    <p className="text-[10px] text-[#9CA3AF] mt-0.5">{t(mode.desc, mode.descZh)}</p>
                  </button>
                ))}
              </div>

              {/* Publish preview */}
              <div className="bg-[#FAFAFA] rounded-xl p-4 border border-[#E5E7EB] mb-4">
                <h4 className="text-xs font-bold text-[#111827] mb-3">{t('Auto-fill Preview', '自动填充预览')}</h4>
                <div className="space-y-2">
                  {[
                    { label: 'Title', zh: '标题', value: 'Nike Air Max 2026 — Next-Level Cushioning' },
                    { label: 'SKU', zh: 'SKU', value: 'NK-AM-001' },
                    { label: 'Category', zh: '分类', value: 'Shoes > Running' },
                    { label: 'Images', zh: '图片', value: '5 images (Main + White BG + Lifestyle...)' },
                    { label: 'Video', zh: '视频', value: '1 video (TikTok UGC style)' },
                    { label: 'Copy', zh: '文案', value: 'Bullet points · Description · SEO terms ✓' },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <Check className="w-3 h-3 text-emerald-500 flex-shrink-0" />
                      <span className="text-[10px] text-[#9CA3AF] w-14">{t(item.label, item.zh)}</span>
                      <span className="text-[11px] text-[#374151] truncate">{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={handlePublish}
                disabled={selectedPlatforms.size === 0 || publishing}
                className="w-full py-3.5 rounded-xl bg-[#085041] text-white text-sm font-semibold shadow-lg shadow-emerald-500/20 hover:bg-[#0A634F] disabled:opacity-40 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
              >
                {publishing ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    {t('Publishing...', '发布中...')}
                  </>
                ) : (
                  <>
                    <Upload className="w-4 h-4" />
                    {t('Publish to', '发布到')} {selectedPlatforms.size} {t('platforms', '个平台')}
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Right: Publish Queue */}
        <div className="space-y-6">
          {/* Queue */}
          <div className="bg-white rounded-2xl border border-[#E5E7EB] p-5">
            <h3 className="text-sm font-bold text-[#111827] mb-4">
              {t('Publish Queue', '发布队列')}
            </h3>
            <div className="space-y-2">
              {publishQueue.map((item, i) => (
                <div key={i} className="flex items-center gap-3 p-3 rounded-xl border border-[#E5E7EB] hover:border-[#D1D5DB] transition-all">
                  <div className={`w-2 h-2 rounded-full ${
                    item.status === 'published' ? 'bg-emerald-400' :
                    item.status === 'scheduled' ? 'bg-amber-400' : 'bg-[#D1D5DB]'
                  }`} />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-[#111827]">{item.platform}</p>
                    <p className="text-[10px] text-[#9CA3AF] truncate">{item.product}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-[#6B7280]">{item.date}</span>
                    {item.url && (
                      <a href={item.url} className="block text-[10px] text-[#7C3AED] mt-0.5 hover:underline">
                        {t('View listing', '查看列表')}
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Stats */}
          <div className="bg-white rounded-2xl border border-[#E5E7EB] p-5">
            <h3 className="text-sm font-bold text-[#111827] mb-4">{t('Publishing Stats', '发布统计')}</h3>
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-100">
                <p className="text-lg font-bold text-emerald-600">12</p>
                <p className="text-[10px] text-emerald-500">{t('Published', '已发布')}</p>
              </div>
              <div className="p-3 rounded-xl bg-amber-50 border border-amber-100">
                <p className="text-lg font-bold text-amber-600">3</p>
                <p className="text-[10px] text-amber-500">{t('Scheduled', '排期中')}</p>
              </div>
              <div className="p-3 rounded-xl bg-[#FAFAFA] border border-[#E5E7EB]">
                <p className="text-lg font-bold text-[#6B7280]">5</p>
                <p className="text-[10px] text-[#9CA3AF]">{t('Drafts', '草稿')}</p>
              </div>
              <div className="p-3 rounded-xl bg-[#FAFAFA] border border-[#E5E7EB]">
                <p className="text-lg font-bold text-[#6B7280]">3</p>
                <p className="text-[10px] text-[#9CA3AF]">{t('Platforms', '平台')}</p>
              </div>
            </div>
          </div>

          {/* Multi-platform sync */}
          <div className="bg-[#EEEDFE] border border-[#CECBF6] rounded-2xl p-5">
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="w-4 h-4 text-[#7C3AED]" />
              <h3 className="text-sm font-bold text-[#3C3489]">
                {t('Auto Sync', '自动同步')}
              </h3>
            </div>
            <p className="text-xs text-[#7F77DD] leading-relaxed mb-3">
              {t('Once published, AI keeps all platforms in sync — price changes, inventory updates, and listing optimizations applied everywhere.', '发布后 AI 自动保持所有平台同步 — 价格变动、库存更新、列表优化全平台生效。')}
            </p>
            <button
              onClick={() => setPublishMode(2)}
              className="text-xs text-[#7C3AED] hover:underline font-medium">
              {t('Enable auto-sync →', '启用自动同步 →')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
