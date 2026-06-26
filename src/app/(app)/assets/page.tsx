'use client';

import { useState } from 'react';
import {
  Search, Download, Trash2, Filter, Grid3X3, List,
  Image, Video, FileText, FolderOpen, Clock, MoreHorizontal,
  Sparkles, Star, Tag, CheckSquare, X
} from 'lucide-react';
import { useLang } from '@/lib/i18n';
import QuickGuide from '@/components/QuickGuide';

interface Asset {
  id: string;
  type: 'image' | 'video' | 'copy';
  name: string;
  project: string;
  date: string;
  size?: string;
  tags: string[];
}

const mockAssets: Asset[] = [
  { id: '1', type: 'image', name: 'Nike Air Max — Main Image A', project: 'Nike Air Max 2026', date: '2h ago', size: '2.4 MB', tags: ['main', 'amazon'] },
  { id: '2', type: 'image', name: 'Nike Air Max — White Background', project: 'Nike Air Max 2026', date: '2h ago', size: '1.8 MB', tags: ['white-bg'] },
  { id: '3', type: 'image', name: 'Nike Air Max — Lifestyle Scene', project: 'Nike Air Max 2026', date: '2h ago', size: '3.2 MB', tags: ['lifestyle'] },
  { id: '4', type: 'video', name: 'Nike Air Max — TikTok UGC', project: 'Nike Air Max 2026', date: '2h ago', size: '24 MB', tags: ['tiktok', 'ugc'] },
  { id: '5', type: 'copy', name: 'Amazon Listing Copy', project: 'Nike Air Max 2026', date: '2h ago', tags: ['copy', 'amazon'] },
  { id: '6', type: 'image', name: 'Lancôme Serum — Hero Shot', project: 'Lancôme Advanced Serum', date: 'Yesterday', size: '2.1 MB', tags: ['hero', 'beauty'] },
  { id: '7', type: 'image', name: 'Lancôme Serum — Flat Lay', project: 'Lancôme Advanced Serum', date: 'Yesterday', size: '2.8 MB', tags: ['flatlay', 'beauty'] },
  { id: '8', type: 'video', name: 'Lancôme — Product Demo', project: 'Lancôme Advanced Serum', date: 'Yesterday', size: '38 MB', tags: ['demo', 'beauty'] },
  { id: '9', type: 'image', name: 'Sony WH-1000XM6 — Studio', project: 'Sony WH-1000XM6', date: '5h ago', size: '1.9 MB', tags: ['studio', 'tech'] },
  { id: '10', type: 'copy', name: 'Sony Product Description', project: 'Sony WH-1000XM6', date: '5h ago', tags: ['copy', 'tech'] },
];

type TabFilter = 'all' | 'images' | 'videos' | 'copy';

export default function ContentHub() {
  const { t } = useLang();
  const [activeTab, setActiveTab] = useState<TabFilter>('all');
  const [search, setSearch] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selected, setSelected] = useState<Set<string>>(new Set());

  const tabs: { key: TabFilter; label: string; zh: string; count: number }[] = [
    { key: 'all', label: 'All', zh: '全部', count: mockAssets.length },
    { key: 'images', label: 'Images', zh: '图片', count: mockAssets.filter(a => a.type === 'image').length },
    { key: 'videos', label: 'Videos', zh: '视频', count: mockAssets.filter(a => a.type === 'video').length },
    { key: 'copy', label: 'Copywriting', zh: '文案', count: mockAssets.filter(a => a.type === 'copy').length },
  ];

  const filtered = mockAssets.filter(a => {
    if (activeTab !== 'all' && (activeTab === 'images' ? a.type !== 'image' : activeTab === 'videos' ? a.type !== 'video' : a.type !== 'copy')) return false;
    if (search && !a.name.toLowerCase().includes(search.toLowerCase()) && !a.project.toLowerCase().includes(search.toLowerCase())) return false;
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
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-[#111827] tracking-tight">
            {t('Content Hub', '内容中心')}
          </h1>
          <p className="text-sm text-[#6B7280] mt-1">
            {t('Images · Videos · Copywriting · Projects · Collections', '图片 · 视频 · 文案 · 项目 · 合集')}
          </p>
        </div>
        <div className="flex items-center gap-2">
          {selected.size > 0 && (
            <>
              <button
                onClick={() => { alert(t('Downloading selected assets...', '正在下载选中素材...')); }}
                className="inline-flex items-center gap-1.5 px-3 py-2 bg-white border border-[#E5E7EB] rounded-xl text-xs font-semibold text-[#6B7280] hover:bg-[#FAFAFA] transition-all">
                <Download className="w-3.5 h-3.5" />
                {t('Download', '下载')} ({selected.size})
              </button>
              <button
                onClick={() => { const count = selected.size; setSelected(new Set()); alert(t(`${count} items deleted`, `已删除 ${count} 个素材`)); }}
                className="inline-flex items-center gap-1.5 px-3 py-2 bg-white border border-red-200 rounded-xl text-xs font-semibold text-red-500 hover:bg-red-50 transition-all">
                <Trash2 className="w-3.5 h-3.5" />
                {t('Delete', '删除')}
              </button>
            </>
          )}
        </div>
      </div>

      <QuickGuide title="How Content Hub Works" zh="内容中心使用指南" steps={[
        { title: 'Browse your assets', zh: '浏览素材', desc: 'Use the tabs (All/Images/Videos/Copy) to filter by type. Switch between grid and list view.', descZh: '使用顶部标签（全部/图片/视频/文案）按类型筛选，切换网格或列表视图。' },
        { title: 'Search and filter', zh: '搜索和筛选', desc: 'Type in the search bar to find assets by name or project. Use tags to quickly identify content.', descZh: '在搜索栏输入名称或项目名查找素材，通过标签快速识别内容类型。' },
        { title: 'Batch operations', zh: '批量操作', desc: 'Select multiple assets using checkboxes, then download or delete them in batch.', descZh: '勾选多个素材后，使用顶部按钮批量下载或删除。' },
      ]} />

      {/* Toolbar */}
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
          <button
            onClick={() => setViewMode('grid')}
            className={`p-2 rounded-lg transition-all ${viewMode === 'grid' ? 'bg-white shadow-sm' : 'text-[#9CA3AF]'}`}
          >
            <Grid3X3 className="w-4 h-4" />
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`p-2 rounded-lg transition-all ${viewMode === 'list' ? 'bg-white shadow-sm' : 'text-[#9CA3AF]'}`}
          >
            <List className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Tabs */}
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

      {/* Asset grid */}
      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 bg-white rounded-2xl border border-[#E5E7EB]">
          <FolderOpen className="w-12 h-12 text-[#D1D5DB] mb-4" />
          <h3 className="text-sm font-semibold text-[#111827] mb-1">{t('No assets found', '未找到素材')}</h3>
          <p className="text-xs text-[#9CA3AF]">{t('Run a workflow to generate assets', '运行工作流即可生成素材')}</p>
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
                  <input
                    type="checkbox"
                    checked={selected.has(asset.id)}
                    onChange={() => toggleSelect(asset.id)}
                    className="w-4 h-4 rounded border-[#D1D5DB] text-[#7C3AED]"
                  />
                  <div className="w-9 h-9 rounded-lg bg-[#F5F5F5] flex items-center justify-center">
                    {typeIcon(asset.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-[#111827] truncate">{asset.name}</p>
                    <p className="text-[11px] text-[#9CA3AF]">{asset.project}</p>
                  </div>
                  {asset.size && <span className="text-[11px] text-[#9CA3AF]">{asset.size}</span>}
                  <span className="text-[11px] text-[#9CA3AF]">{asset.date}</span>
                  <button
                    onClick={() => toggleSelect(asset.id)}
                    className="p-1.5 rounded-lg hover:bg-[#F5F5F5] text-[#D1D5DB] opacity-0 group-hover:opacity-100">
                    <MoreHorizontal className="w-4 h-4" />
                  </button>
                </div>
              );
            }
            return (
              <button
                key={asset.id}
                onClick={() => toggleSelect(asset.id)}
                className={`group text-left bg-white rounded-xl border overflow-hidden transition-all ${
                  selected.has(asset.id) ? 'border-[#7C3AED] ring-2 ring-[#7C3AED]/10' : 'border-[#E5E7EB] hover:border-[#D1D5DB] hover:shadow-sm'
                }`}
              >
                {/* Preview */}
                <div className="aspect-square bg-[#F5F5F5] flex items-center justify-center relative">
                  {asset.type === 'image' && <Image className="w-10 h-10 text-[#D1D5DB]" />}
                  {asset.type === 'video' && <Video className="w-10 h-10 text-[#D1D5DB]" />}
                  {asset.type === 'copy' && <FileText className="w-10 h-10 text-[#D1D5DB]" />}
                  {selected.has(asset.id) && (
                    <div className="absolute top-2 right-2 w-5 h-5 rounded-md bg-[#7C3AED] flex items-center justify-center">
                      <CheckSquare className="w-3 h-3 text-white" />
                    </div>
                  )}
                  <span className="absolute top-2 left-2 text-[10px] font-medium px-1.5 py-0.5 rounded-md bg-white/80 backdrop-blur-sm text-[#6B7280] capitalize">
                    {asset.type}
                  </span>
                </div>
                {/* Info */}
                <div className="p-3">
                  <p className="text-xs font-semibold text-[#111827] truncate">{asset.name}</p>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-[10px] text-[#9CA3AF] truncate max-w-[60%]">{asset.project}</span>
                    {asset.size && <span className="text-[10px] text-[#9CA3AF]">{asset.size}</span>}
                  </div>
                  {/* Tags */}
                  <div className="flex items-center gap-1 mt-2 flex-wrap">
                    {asset.tags.slice(0, 2).map((tag, i) => (
                      <span key={i} className="text-[9px] bg-[#FAFAFA] border border-[#E5E7EB] px-1.5 py-0.5 rounded text-[#6B7280]">{tag}</span>
                    ))}
                    {asset.tags.length > 2 && (
                      <span className="text-[9px] text-[#9CA3AF]">+{asset.tags.length - 2}</span>
                    )}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
