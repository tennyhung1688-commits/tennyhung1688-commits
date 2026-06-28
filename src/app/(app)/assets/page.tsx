'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Search, Download, Trash2, Filter, Grid3X3, List,
  Image, Video, FileText, FolderOpen, Clock, MoreHorizontal,
  Sparkles, Star, Tag, CheckSquare, X, Play
} from 'lucide-react';
import { useLang } from '@/lib/i18n';
import QuickGuide from '@/components/QuickGuide';

interface Asset {
  id: string;
  type: 'image' | 'video' | 'copy';
  name: string;
  project?: string;
  date: string;
  size?: string;
  tags?: string[];
  previewUrl?: string;
  content?: string;
}

type TabFilter = 'all' | 'images' | 'videos';

export default function ContentHub() {
  const { t } = useLang();
  const [assets, setAssets] = useState<Asset[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<TabFilter>('all');
  const [search, setSearch] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selected, setSelected] = useState<Set<string>>(new Set());

  useEffect(() => {
    fetch('/api/generator/assets')
      .then(r => r.json())
      .then(data => setAssets(data.assets || []))
      .catch(() => setAssets([]))
      .finally(() => setLoading(false));
  }, []);

  const tabs: { key: TabFilter; label: string; zh: string; count: number }[] = [
    { key: 'all', label: 'All', zh: '全部', count: assets.length },
    { key: 'images', label: 'Images', zh: '图片', count: assets.filter(a => a.type === 'image').length },
    { key: 'videos', label: 'Videos', zh: '视频', count: assets.filter(a => a.type === 'video').length },
  ];

  const filtered = assets.filter(a => {
    if (activeTab !== 'all' && a.type !== activeTab.slice(0, -1) as any) return false;
    if (search && !a.name.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const toggleSelect = (id: string) => {
    const next = new Set(selected);
    next.has(id) ? next.delete(id) : next.add(id);
    setSelected(next);
  };

  const typeIcon = (type: Asset['type']) => {
    switch (type) {
      case 'image': return <Image className="w-4 h-4 text-[#9CA3AF]" />;
      case 'video': return <Video className="w-4 h-4 text-[#9CA3AF]" />;
      case 'copy': return <FileText className="w-4 h-4 text-[#9CA3AF]" />;
    }
  };

  return (
    <div className="px-8 py-8 max-w-7xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-[#111827] tracking-tight">
            {t('Content Hub', '内容中心')}
          </h1>
          <p className="text-sm text-[#6B7280] mt-1">
            {t('Your generated assets — images and videos', '你生成的素材 — 图片和视频')}
          </p>
        </div>
      </div>

      <QuickGuide title="How Content Hub Works" zh="内容中心使用指南" steps={[
        { title: 'Browse your assets', zh: '浏览素材', desc: 'Use the tabs to filter by type. Switch between grid and list view.', descZh: '使用顶部标签按类型筛选，切换网格或列表视图。' },
        { title: 'Generate more', zh: '生成更多', desc: 'Go to any platform workspace to generate new product images and videos.', descZh: '进入任意平台工作区，生成新的商品图片和视频。' },
      ]} />

      <div className="flex flex-wrap items-center gap-3 mb-6">
        <div className="flex-1 relative max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9CA3AF]" />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder={t('Search assets...', '搜索素材...')}
            className="w-full pl-10 pr-4 py-2.5 border border-[#E5E7EB] rounded-xl text-sm bg-white focus:ring-2 focus:ring-[#7C3AED]/20 focus:border-[#7C3AED] outline-none"
          />
        </div>
        <div className="flex items-center bg-[#F5F5F5] rounded-xl p-1 gap-0.5">
          <button onClick={() => setViewMode('grid')} className={`p-2 rounded-lg transition-all ${viewMode === 'grid' ? 'bg-white shadow-sm' : 'text-[#9CA3AF]'}`}>
            <Grid3X3 className="w-4 h-4" />
          </button>
          <button onClick={() => setViewMode('list')} className={`p-2 rounded-lg transition-all ${viewMode === 'list' ? 'bg-white shadow-sm' : 'text-[#9CA3AF]'}`}>
            <List className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="flex items-center gap-1 mb-6 border-b border-[#E5E7EB]">
        {tabs.map(tab => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`px-4 py-2.5 text-sm font-medium transition-all border-b-2 -mb-px ${
              activeTab === tab.key
                ? 'text-[#7C3AED] border-[#7C3AED]'
                : 'text-[#6B7280] border-transparent hover:text-[#111827]'
            }`}
          >
            {t(tab.label, tab.zh)}
            <span className="ml-1.5 text-[11px] text-[#9CA3AF]">{tab.count}</span>
          </button>
        ))}
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="w-8 h-8 rounded-full border-2 border-[#7C3AED] border-t-transparent animate-spin" />
        </div>
      ) : filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 bg-white rounded-2xl border border-[#E5E7EB]">
          <FolderOpen className="w-12 h-12 text-[#D1D5DB] mb-4" />
          <h3 className="text-sm font-semibold text-[#111827] mb-1">{t('No assets yet', '还没有素材')}</h3>
          <p className="text-xs text-[#9CA3AF] mb-4">{t('Generate images and videos from the workspace', '从工作区生成图片和视频')}</p>
          <Link href="/workspace/new" className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#7C3AED] text-white rounded-xl text-sm font-semibold shadow-lg shadow-[#7C3AED]/25 hover:bg-[#6D28D9] transition-all">
            <Sparkles className="w-4 h-4" />
            {t('Start Generating', '开始生成')}
          </Link>
        </div>
      ) : (
        <div className={viewMode === 'grid'
          ? 'grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'
          : 'space-y-1'
        }>
          {filtered.map(asset => {
            if (viewMode === 'list') {
              return (
                <div key={asset.id} className="flex items-center gap-3 p-3 rounded-xl bg-white border border-[#E5E7EB] hover:border-[#D1D5DB] transition-all group">
                  <div className="w-9 h-9 rounded-lg bg-[#F5F5F5] flex items-center justify-center overflow-hidden">
                    {asset.type === 'image' && asset.previewUrl ? (
                      <img src={asset.previewUrl} alt="" className="w-full h-full object-cover" />
                    ) : typeIcon(asset.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-[#111827] truncate">{asset.name}</p>
                    <p className="text-[11px] text-[#9CA3AF]">{asset.date}</p>
                  </div>
                  <a href={asset.previewUrl} target="_blank" rel="noopener" className="p-1.5 rounded-lg hover:bg-[#F5F5F5] text-[#D1D5DB] opacity-0 group-hover:opacity-100">
                    <Download className="w-4 h-4" />
                  </a>
                </div>
              );
            }
            return (
              <a
                key={asset.id}
                href={asset.previewUrl || '#'}
                target={asset.previewUrl ? '_blank' : undefined}
                rel="noopener"
                className="group text-left bg-white rounded-xl border border-[#E5E7EB] overflow-hidden hover:border-[#D1D5DB] hover:shadow-sm transition-all"
              >
                <div className="aspect-square bg-[#F5F5F5] flex items-center justify-center relative overflow-hidden">
                  {asset.type === 'image' && asset.previewUrl ? (
                    <img src={asset.previewUrl} alt={asset.name} className="w-full h-full object-cover" loading="lazy" />
                  ) : asset.type === 'video' && asset.previewUrl ? (
                    <div className="w-full h-full bg-[#0F0F23] flex items-center justify-center">
                      <Play className="w-8 h-8 text-white/60" />
                    </div>
                  ) : (
                    <Image className="w-10 h-10 text-[#D1D5DB]" />
                  )}
                  <span className="absolute top-2 left-2 text-[10px] font-medium px-1.5 py-0.5 rounded-md bg-white/80 backdrop-blur-sm text-[#6B7280] capitalize">
                    {asset.type}
                  </span>
                </div>
                <div className="p-3">
                  <p className="text-xs font-semibold text-[#111827] truncate">{asset.name}</p>
                  <span className="text-[10px] text-[#9CA3AF]">{asset.date}</span>
                </div>
              </a>
            );
          })}
        </div>
      )}
    </div>
  );
}
