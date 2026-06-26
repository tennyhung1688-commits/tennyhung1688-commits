'use client'
import { PlatformLogo } from "@/components/PlatformLogo";

import { useState } from 'react';
import Link from 'next/link';
import {
  Image, Video, FileText, TrendingUp, Clock, Zap,
  ArrowRight, MoreHorizontal, Play, Plus, Sparkles,
  Package, BarChart3, Bot, Globe, Check, Globe2, Upload, X
} from 'lucide-react';
import { useLang } from '@/lib/i18n';

const quickMarkets = [
  { id: 'amazon', name: 'Amazon', color: '#EF9F27' },
  { id: 'shopee', name: 'Shopee', color: '#EF5320' },
  { id: 'tiktok', name: 'TikTok Shop', color: '#000000' },
  { id: 'taobao', name: 'Taobao', color: '#F97316' },
  { id: 'shopify', name: 'Shopify', color: '#96BF48' },
  { id: 'temu', name: 'Temu', color: '#F15A24' },
];

export default function WorkspaceDashboard() {
  const { t } = useLang();
  const [showOnboarding, setShowOnboarding] = useState(true);

  return (
    <div className="px-8 py-8 max-w-7xl">
      {/* Onboarding Wizard */}
      {showOnboarding && (
        <div className="mb-8 bg-gradient-to-br from-[#7C3AED] to-[#6D28D9] rounded-3xl p-6 sm:p-8 relative overflow-hidden">
          <button onClick={() => setShowOnboarding(false)} className="absolute top-4 right-4 p-1.5 rounded-lg bg-white/10 text-white/70 hover:bg-white/20 hover:text-white transition-all"><X className="w-4 h-4" /></button>
          <h2 className="text-xl font-bold text-white mb-2">{t('Welcome to CommerceOS', '欢迎来到 CommerceOS')}</h2>
          <p className="text-[#C4B5FD] text-sm mb-6">{t('Get started in 3 steps', '三步开始')}</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            {[
              { step: 1, title: 'Choose Marketplace', zh: '选择平台', desc: 'Select your target selling platform.', zhDesc: '选择你的目标销售平台', icon: Globe2 },
              { step: 2, title: 'Upload Product', zh: '上传产品', desc: 'Upload product photos to get started.', zhDesc: '上传产品照片开始创作', icon: Upload },
              { step: 3, title: 'Generate Content', zh: '生成内容', desc: 'AI auto-generates marketplace-ready content.', zhDesc: 'AI 自动生成平台就绪的内容', icon: Sparkles },
            ].map((item, i) => (
              <div key={i} className="bg-white/10 backdrop-blur-sm rounded-2xl p-5 border border-white/10">
                <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-white text-[#7C3AED] text-xs font-bold mb-3">{item.step}</span>
                <h3 className="text-sm font-bold text-white mb-1">{t(item.title, item.zh)}</h3>
                <p className="text-xs text-white/60">{t(item.desc, item.zhDesc)}</p>
              </div>
            ))}
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs text-white/50 mr-2">{t('Quick Start:', '快速开始：')}</span>
            {quickMarkets.map(m => (
              <Link key={m.id} href={`/workspace/${m.id}`} className="inline-flex items-center gap-1.5 px-4 py-2 bg-white rounded-xl text-xs font-bold text-[#374151] hover:shadow-md transition-all">
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: m.color }} />
                {m.name}
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-[#111827] tracking-tight">
            {t('Workspace', '工作台')}
          </h1>
          <p className="text-sm text-[#6B7280] mt-1">
            {t('Welcome back, Tenny', '欢迎回来，Tenny')}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#7C3AED]/8 text-[#7C3AED] text-xs font-semibold">
            <Sparkles className="w-3 h-3" />
            {t('Business Plan', 'Business 套餐')}
          </span>
          <Link href="/workspace/new" className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#7C3AED] text-white rounded-xl text-sm font-semibold shadow-md shadow-[#7C3AED]/25 hover:bg-[#6D28D9] transition-all">
            <Plus className="w-4 h-4" />
            {t('New Project', '新建项目')}
          </Link>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { icon: Image, label: 'Images Generated', zh: '图片生成', value: '1,247', change: '+12%' },
          { icon: Video, label: 'Videos Generated', zh: '视频生成', value: '89', change: '+5%' },
          { icon: FileText, label: 'Listings Created', zh: 'Listing 创建', value: '342', change: '+18%' },
          { icon: Globe, label: 'Active Markets', zh: '活跃平台', value: '4', change: '' },
        ].map((stat, i) => (
          <div key={i} className="bg-white rounded-2xl border border-[#E5E7EB] p-5 hover:shadow-sm transition-shadow">
            <div className="flex items-center gap-2 mb-3">
              <stat.icon className="w-4 h-4 text-[#6B7280]" />
              <span className="text-xs text-[#6B7280]">{t(stat.label, stat.zh)}</span>
            </div>
            <p className="text-2xl font-bold text-[#111827]">{stat.value}</p>
            {stat.change && <p className="text-[10px] text-emerald-600 mt-1">{stat.change} this month</p>}
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="mb-8">
        <h2 className="text-sm font-bold text-[#111827] mb-4">{t('Quick Actions', '快速操作')}</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
          {[
            { icon: Image, label: 'Product Image', zh: '商品图片', href: '/workspace/new' },
            { icon: Video, label: 'Product Video', zh: '商品视频', href: '/workspace/new' },
            { icon: FileText, label: 'Listing', zh: 'Listing', href: '/workspace/new' },
            { icon: Bot, label: 'AI Agent', zh: 'AI Agent', href: '/agents' },
            { icon: Package, label: 'Batch Process', zh: '批量处理', href: '/workspace/new' },
          ].map((action, i) => (
            <Link key={i} href={action.href} className="flex flex-col items-center gap-2 p-4 rounded-2xl bg-white border border-[#E5E7EB] hover:border-[#D1D5DB] hover:shadow-sm hover:-translate-y-0.5 transition-all text-center">
              <div className="w-10 h-10 rounded-xl bg-[#F5F3FF] flex items-center justify-center">
                <action.icon className="w-5 h-5 text-[#7C3AED]" />
              </div>
              <span className="text-xs font-semibold text-[#374151]">{t(action.label, action.zh)}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Recent + Agents grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl border border-[#E5E7EB] p-6">
          <h2 className="text-sm font-bold text-[#111827] mb-4">{t('Active Agents', '活跃 Agent')}</h2>
          <div className="space-y-3">
            {quickMarkets.slice(0, 4).map(m => (
              <Link key={m.id} href={`/workspace/${m.id}`} className="flex items-center gap-3 p-3 rounded-xl hover:bg-[#FAFAFA] transition-colors group">
                <PlatformLogo platform={m.id} size={32} />
                <span className="text-sm font-medium text-[#374151] flex-1">{m.name}</span>
                <ArrowRight className="w-4 h-4 text-[#D1D5DB] group-hover:text-[#7C3AED] group-hover:translate-x-0.5 transition-all" />
              </Link>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-[#E5E7EB] p-6">
          <h2 className="text-sm font-bold text-[#111827] mb-4">{t('Explore', '探索')}</h2>
          <div className="space-y-3">
            {[
              { label: 'Solutions for your industry', zh: '行业解决方案', href: '/solutions', icon: TrendingUp },
              { label: 'API & Developer Tools', zh: 'API 和开发工具', href: '/developers', icon: Zap },
              { label: 'Documentation & Guides', zh: '文档和指南', href: '/docs', icon: Sparkles },
              { label: 'Browse Marketplaces', zh: '浏览所有平台', href: '/marketplaces', icon: Globe2 },
            ].map((item, i) => (
              <Link key={i} href={item.href} className="flex items-center gap-3 p-3 rounded-xl hover:bg-[#FAFAFA] transition-colors group">
                <item.icon className="w-4 h-4 text-[#6B7280]" />
                <span className="text-sm text-[#374151] flex-1">{t(item.label, item.zh)}</span>
                <ArrowRight className="w-4 h-4 text-[#D1D5DB] group-hover:text-[#7C3AED] group-hover:translate-x-0.5 transition-all" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
