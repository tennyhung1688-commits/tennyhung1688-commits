'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Puzzle, GitBranch, Plug, Bot, Code, Layout, Star, Download,
  Search, Sparkles, ExternalLink, Plus, ArrowRight
} from 'lucide-react';
import { useLang } from '@/lib/i18n';

const ecItems = [
  { type: 'Skill', icon: Puzzle, name: 'Amazon Fashion Skill', author: 'Official', downloads: '12.4K', rating: 4.9, price: 'Free', desc: 'Complete Amazon Fashion listing workflow with A+ Content' },
  { type: 'Workflow', icon: GitBranch, name: 'TikTok UGC Pipeline', author: 'CommerceOS', downloads: '8.2K', rating: 4.8, price: 'Free', desc: 'Auto-generate UGC-style videos with trending sounds' },
  { type: 'Plugin', icon: Plug, name: 'Google Analytics Connect', author: 'Official', downloads: '5.1K', rating: 4.7, price: 'Free', desc: 'Sync CommerceOS analytics with Google Analytics' },
  { type: 'Agent', icon: Bot, name: 'AI Review Responder', author: 'Community', downloads: '3.8K', rating: 4.6, price: 'Free', desc: 'Auto-respond to product reviews with brand voice' },
  { type: 'Template', icon: Layout, name: 'Christmas Campaign Pack', author: 'CommerceOS', downloads: '6.5K', rating: 4.9, price: 'Free', desc: '15 holiday templates for images, videos & banners' },
  { type: 'API', icon: Code, name: 'Inventory Sync API', author: 'Official', downloads: '2.1K', rating: 4.5, price: 'Free', desc: 'Real-time inventory sync across all platforms' },
  { type: 'Skill', icon: Puzzle, name: 'Shopee Multi-Language', author: 'Official', downloads: '4.3K', rating: 4.8, price: 'Free', desc: 'Auto-translate + localize for SEA markets' },
  { type: 'Plugin', icon: Plug, name: 'Slack Notifications', author: 'Community', downloads: '1.9K', rating: 4.4, price: 'Free', desc: 'Get workflow status updates in Slack' },
  { type: 'Agent', icon: Bot, name: 'Price Optimizer Agent', author: 'CommerceOS', downloads: '2.7K', rating: 4.7, price: 'Pro', desc: 'AI-driven dynamic pricing across platforms' },
  { type: 'Workflow', icon: GitBranch, name: 'Taobao Full Package', author: 'Official', downloads: '7.1K', rating: 4.9, price: 'Free', desc: '15-step Taobao listing workflow with live script' },
];

const tabs = ['All', 'Skills', 'Workflows', 'Plugins', 'Agents', 'API', 'Templates'];

export default function EcosystemPage() {
  const { t } = useLang();
  const router = useRouter();
  const [tab, setTab] = useState('All');
  const [search, setSearch] = useState('');

  const filtered = ecItems.filter(item => {
    if (tab !== 'All' && tab !== 'API' && item.type !== tab.slice(0, -1) && item.type !== 'Template' && tab !== 'Templates' && item.type !== tab) return false;
    if (tab === 'API' && item.type !== 'API') return false;
    if (tab === 'Templates' && item.type !== 'Template') return false;
    if (search && !item.name.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="px-8 py-8 max-w-7xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-[#111827] tracking-tight">
            {t('Commerce Ecosystem', 'Commerce 生态')}
          </h1>
          <p className="text-sm text-[#6B7280] mt-1">
            {t('Skills · Workflows · Plugins · Agents · API · SDK · Partner Apps', 'Skills · Workflows · Plugins · Agents · API · SDK · Partner Apps')}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => router.push('/models')}
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-white border border-[#E5E7EB] rounded-xl text-sm font-semibold text-[#374151] hover:bg-[#FAFAFA] transition-all">
            <Code className="w-4 h-4" />
            {t('Developer SDK', '开发者 SDK')}
            <ExternalLink className="w-3 h-3 text-[#9CA3AF]" />
          </button>
          <button
            onClick={() => router.push('/skills')}
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#7C3AED] text-white rounded-xl text-sm font-semibold hover:bg-[#6D28D9] transition-all">
            <Plus className="w-4 h-4" />
            {t('Submit', '提交')}
          </button>
        </div>
      </div>

      {/* Search + tabs */}
      <div className="flex flex-wrap items-center gap-3 mb-6">
        <div className="flex-1 relative max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9CA3AF]" />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder={t('Search ecosystem...', '搜索生态...')}
            className="w-full pl-10 pr-4 py-2.5 border border-[#E5E7EB] rounded-xl text-sm bg-white focus:ring-2 focus:ring-[#7C3AED]/20 focus:border-[#7C3AED] outline-none"
          />
        </div>
        <div className="flex items-center gap-1 flex-wrap">
          {tabs.map(t => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                tab === t ? 'bg-[#7C3AED] text-white' : 'bg-white border border-[#E5E7EB] text-[#6B7280] hover:border-[#D1D5DB]'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((item, i) => (
          <div key={i} className="group bg-white rounded-2xl border border-[#E5E7EB] p-5 hover:border-[#D1D5DB] hover:shadow-sm transition-all">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#FAFAFA] border border-[#E5E7EB] flex items-center justify-center">
                  <item.icon className="w-5 h-5 text-[#7C3AED]" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[#111827]">{item.name}</h3>
                  <p className="text-[10px] text-[#9CA3AF]">{item.author}</p>
                </div>
              </div>
              <span className="text-[10px] font-medium text-[#6B7280] bg-[#F5F5F5] px-2 py-0.5 rounded-full">{item.type}</span>
            </div>

            <p className="text-xs text-[#6B7280] leading-relaxed mb-4">{item.desc}</p>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1 text-[10px] text-[#9CA3AF]">
                  <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                  {item.rating}
                </div>
                <div className="flex items-center gap-1 text-[10px] text-[#9CA3AF]">
                  <Download className="w-3 h-3" />
                  {item.downloads}
                </div>
              </div>
              <button
                onClick={() => alert(t(`Installing ${item.name}...`, `正在安装 ${item.name}...`))}
                className="text-[11px] font-semibold text-[#7C3AED] hover:underline">
                {item.price === 'Free' ? t('Install', '安装') : item.price}
                <ArrowRight className="w-3 h-3 inline ml-0.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
