'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Image, Video, FileText, TrendingUp, Clock, Zap,
  ArrowRight, MoreHorizontal, Play, Plus, Sparkles,
  Package, BarChart3, Bot, Globe
} from 'lucide-react';
import { useLang } from '@/lib/i18n';
import QuickGuide from '@/components/QuickGuide';

export default function WorkspaceDashboard() {
  const { t } = useLang();

  return (
    <div className="px-8 py-8 max-w-7xl">
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
            Free Plan · 5/5 images · 1/1 video
          </span>
        </div>
      </div>

      <QuickGuide title="How Workspace Works" zh="工作台使用指南" steps={[
        { title: 'View your daily stats', zh: '查看今日数据', desc: 'Top cards show today\'s image and video generation count, quota usage, and copywriting output.', descZh: '顶部卡片显示今日图片和视频生成数量、额度消耗和文案输出。' },
        { title: 'Check recent works', zh: '查看最近作品', desc: 'The Recent Works grid shows your latest generated images. Click any item to view details.', descZh: '最近作品网格展示最新生成的图片，点击查看详情。' },
        { title: 'Monitor products & workflows', zh: '监控商品和工作流', desc: 'Track active products and workflow executions. Click to jump to Product Center or Workflow.', descZh: '追踪活跃商品和工作流执行状态，点击跳转到商品中心或工作流。' },
        { title: 'Use AI recommendations', zh: '跟随 AI 建议', desc: 'The right sidebar shows AI-powered task recommendations. Click an action to execute it.', descZh: '右侧栏显示 AI 推荐任务和快捷操作，点击即可执行。' },
      ]} />

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard
          icon={Image}
          label={t('Images Today', '今日图片')}
          value="3"
          total="/5"
          color="text-purple-500"
          bg="bg-purple-50"
          trend="+2 vs yesterday"
          trendZh="较昨日 +2"
        />
        <StatCard
          icon={Video}
          label={t('Videos Today', '今日视频')}
          value="1"
          total="/1"
          color="text-amber-500"
          bg="bg-amber-50"
          trend="100% quota used"
          trendZh="配额已用完"
        />
        <StatCard
          icon={FileText}
          label={t('Copywriting', '文案生成')}
          value="8"
          total=""
          color="text-emerald-500"
          bg="bg-emerald-50"
          trend="Unlimited"
          trendZh="无限制"
        />
        <StatCard
          icon={BarChart3}
          label={t('Quota Used', '额度消耗')}
          value="60%"
          total=""
          color="text-blue-500"
          bg="bg-blue-50"
          trend="5 days until reset"
          trendZh="5天后重置"
        />
      </div>

      {/* Two-column layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Recent Works */}
          <Section title={t('Recent Works', '最近作品')} titleZh="最近作品" action={t('View All', '查看全部')} actionHref="/assets">
            <div className="grid grid-cols-3 gap-3">
              {[
                { src: 'bg-purple-100', label: 'Running Shoes A1', zh: '跑鞋主图', time: '2h ago', timeZh: '2小时前' },
                { src: 'bg-amber-100', label: 'Skincare Serum', zh: '精华液场景图', time: '5h ago', timeZh: '5小时前' },
                { src: 'bg-emerald-100', label: 'Wireless Earbuds', zh: '耳机白底图', time: 'Yesterday', timeZh: '昨天' },
              ].map((item, i) => (
                <Link
                  key={i}
                  href="/workspace/new"
                  className="group aspect-square rounded-xl bg-[#F5F5F5] border border-[#E5E7EB] overflow-hidden hover:border-[#D1D5DB] hover:shadow-sm transition-all relative"
                >
                  <div className={`w-full h-full ${item.src} flex items-center justify-center`}>
                    <Image className="w-8 h-8 text-[#9CA3AF]" />
                  </div>
                  <div className="absolute inset-x-0 bottom-0 p-2.5 bg-gradient-to-t from-black/50 via-black/20 to-transparent">
                    <p className="text-xs font-semibold text-white truncate">{t(item.label, item.zh)}</p>
                    <p className="text-[10px] text-white/70">{t(item.time, item.timeZh)}</p>
                  </div>
                </Link>
              ))}
            </div>
          </Section>

          {/* Recent Products */}
          <Section title={t('Recent Products', '最近商品')} titleZh="最近商品" action={t('Product Center', '商品中心')} actionHref="/products">
            <div className="space-y-2">
              {[
                { name: 'Nike Air Max 2026', zh: 'Nike Air Max 2026', sku: 'NK-AM-001', status: 'Active', statusZh: '活跃' },
                { name: 'Lancôme Serum', zh: '兰蔻精华液', sku: 'LC-SR-088', status: 'Draft', statusZh: '草稿' },
                { name: 'Sony WH-1000XM6', zh: '索尼降噪耳机', sku: 'SN-WH-006', status: 'Active', statusZh: '活跃' },
              ].map((prod, i) => (
                <Link
                  key={i}
                  href="/products"
                  className="flex items-center gap-4 p-3.5 rounded-xl bg-white border border-[#E5E7EB] hover:border-[#D1D5DB] hover:shadow-sm transition-all group"
                >
                  <div className="w-10 h-10 rounded-lg bg-[#F5F5F5] flex items-center justify-center">
                    <Package className="w-5 h-5 text-[#9CA3AF]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-[#111827]">{t(prod.name, prod.zh)}</p>
                    <p className="text-xs text-[#9CA3AF]">SKU: {prod.sku}</p>
                  </div>
                  <span className={`text-[11px] font-medium px-2.5 py-1 rounded-full ${
                    prod.status === 'Active'
                      ? 'bg-emerald-50 text-emerald-600'
                      : 'bg-[#F5F5F5] text-[#9CA3AF]'
                  }`}>
                    {t(prod.status, prod.statusZh)}
                  </span>
                </Link>
              ))}
            </div>
          </Section>

          {/* Recent Workflows */}
          <Section title={t('Recent Workflows', '最近工作流')} titleZh="最近工作流" action={t('View All', '查看全部')} actionHref="/workflow">
            <div className="space-y-2">
              {[
                { name: 'Amazon Fashion Listing', zh: 'Amazon 时尚列表', steps: '12 steps', stepsZh: '12 步', status: 'Completed', statusZh: '已完成', time: 'Today', timeZh: '今天' },
                { name: 'TikTok Shop Video', zh: 'TikTok 商品视频', steps: '8 steps', stepsZh: '8 步', status: 'Running', statusZh: '运行中', time: '2h ago', timeZh: '2小时前' },
                { name: 'Taobao Full Package', zh: '淘宝全套素材', steps: '15 steps', stepsZh: '15 步', status: 'Completed', statusZh: '已完成', time: 'Yesterday', timeZh: '昨天' },
              ].map((wf, i) => (
                <Link
                  key={i}
                  href="/workflow"
                  className="flex items-center gap-4 p-3.5 rounded-xl bg-white border border-[#E5E7EB] hover:border-[#D1D5DB] hover:shadow-sm transition-all group"
                >
                  <div className="w-10 h-10 rounded-lg bg-[#7C3AED]/5 flex items-center justify-center">
                    <GitBranchIcon className="w-5 h-5 text-[#7C3AED]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-[#111827]">{t(wf.name, wf.zh)}</p>
                    <p className="text-xs text-[#9CA3AF]">{wf.stepsZh}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`text-[11px] font-medium px-2.5 py-1 rounded-full ${
                      wf.status === 'Completed'
                        ? 'bg-emerald-50 text-emerald-600'
                        : 'bg-blue-50 text-blue-600'
                    }`}>
                      {t(wf.status, wf.statusZh)}
                    </span>
                    <span className="text-[11px] text-[#9CA3AF]">{t(wf.time, wf.timeZh)}</span>
                  </div>
                </Link>
              ))}
            </div>
          </Section>
        </div>

        {/* Side column */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <div className="bg-white rounded-2xl border border-[#E5E7EB] p-5">
            <h3 className="text-sm font-bold text-[#111827] mb-4">
              {t('Quick Actions', '快捷操作')}
            </h3>
            <div className="space-y-2">
              {[
                { icon: Plus, label: 'New Product', zh: '添加商品', href: '/products/new', color: 'text-purple-500', bg: 'bg-purple-50' },
                { icon: Play, label: 'Run Workflow', zh: '运行工作流', href: '/workflow/new', color: 'text-blue-500', bg: 'bg-blue-50' },
                { icon: Image, label: 'Generate Image', zh: '生成图片', href: '/workspace/new', color: 'text-emerald-500', bg: 'bg-emerald-50' },
                { icon: Globe, label: 'Publish to Platform', zh: '发布到平台', href: '/publish', color: 'text-amber-500', bg: 'bg-amber-50' },
              ].map((action, i) => (
                <Link
                  key={i}
                  href={action.href}
                  className="flex items-center gap-3 p-3 rounded-xl hover:bg-[#FAFAFA] transition-all group"
                >
                  <div className={`w-9 h-9 rounded-lg ${action.bg} flex items-center justify-center`}>
                    <action.icon className={`w-4 h-4 ${action.color}`} />
                  </div>
                  <span className="text-sm font-medium text-[#374151] group-hover:text-[#111827]">
                    {t(action.label, action.zh)}
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#D1D5DB] group-hover:text-[#9CA3AF] ml-auto" />
                </Link>
              ))}
            </div>
          </div>

          {/* AI Recommendations */}
          <div className="bg-white rounded-2xl border border-[#E5E7EB] p-5">
            <div className="flex items-center gap-2 mb-4">
              <Bot className="w-4 h-4 text-[#7C3AED]" />
              <h3 className="text-sm font-bold text-[#111827]">
                {t('AI Recommendations', 'AI 推荐')}
              </h3>
            </div>
            <div className="space-y-3">
              {[
                { text: 'Nike Air Max CTR is low. Try generating a new main image with lifestyle scene.', zh: 'Nike Air Max 点击率偏低，建议生成生活场景新主图。', action: 'Fix Now', actionZh: '立即优化', href: '/workspace/new' },
                { text: 'TikTok video for Lancôme Serum could boost engagement by 40% with UGC style.', zh: '兰蔻精华液 TikTok 视频可切换 UGC 风格，预估提升 40% 互动。', action: 'Generate', actionZh: '生成', href: '/workspace/new' },
                { text: 'Christmas season approaching. Prepare holiday templates for all products.', zh: '圣诞季即将到来，建议为全部商品准备节日模板。', action: 'Prepare', actionZh: '准备', href: '/products' },
              ].map((rec, i) => (
                <div key={i} className="p-3 rounded-xl bg-[#7C3AED]/5 border border-[#7C3AED]/10">
                  <p className="text-xs text-[#374151] leading-relaxed mb-2">
                    {t(rec.text, rec.zh)}
                  </p>
                  <Link href={rec.href} className="text-[11px] font-semibold text-[#7C3AED] hover:underline">
                    {t(rec.action, rec.actionZh)} →
                  </Link>
                </div>
              ))}
            </div>
          </div>

          {/* Platform Status */}
          <div className="bg-white rounded-2xl border border-[#E5E7EB] p-5">
            <h3 className="text-sm font-bold text-[#111827] mb-4">
              {t('Connected Platforms', '已连接平台')}
            </h3>
            <div className="space-y-2.5">
              {[
                { name: 'Amazon', connected: true },
                { name: 'TikTok Shop', connected: true },
                { name: 'Shopify', connected: false },
                { name: 'Taobao', connected: false },
              ].map((plat, i) => (
                <div key={i} className="flex items-center justify-between">
                  <span className="text-sm text-[#374151]">{plat.name}</span>
                  <span className={`w-2 h-2 rounded-full ${plat.connected ? 'bg-emerald-400' : 'bg-[#D1D5DB]'}`} />
                </div>
              ))}
            </div>
            <Link href="/settings" className="mt-4 inline-flex text-xs text-[#7C3AED] hover:underline font-medium">
              {t('Connect more →', '连接更多 →')}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Helper Components ── */

function StatCard({ icon: Icon, label, value, total, color, bg, trend, trendZh }: {
  icon: React.ElementType;
  label: string;
  value: string;
  total: string;
  color: string;
  bg: string;
  trend: string;
  trendZh: string;
}) {
  const { t } = useLang();
  return (
    <div className="bg-white rounded-2xl border border-[#E5E7EB] p-5 hover:shadow-sm transition-shadow">
      <div className="flex items-center justify-between mb-3">
        <div className={`w-10 h-10 rounded-xl ${bg} flex items-center justify-center`}>
          <Icon className={`w-5 h-5 ${color}`} />
        </div>
      </div>
      <p className="text-2xl font-bold text-[#111827] tracking-tight">
        {value}<span className="text-base font-normal text-[#9CA3AF]">{total}</span>
      </p>
      <p className="text-sm text-[#6B7280] mt-0.5">{label}</p>
      <p className="text-[11px] text-[#9CA3AF] mt-1.5">{t(trend, trendZh)}</p>
    </div>
  );
}

function Section({ title, titleZh, children, action, actionHref }: {
  title: string;
  titleZh: string;
  children: React.ReactNode;
  action?: string;
  actionHref?: string;
}) {
  const { t } = useLang();
  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-base font-bold text-[#111827]">{t(title, titleZh)}</h2>
        {action && actionHref && (
          <Link href={actionHref} className="text-xs text-[#7C3AED] hover:underline font-medium flex items-center gap-1">
            {action}
            <ArrowRight className="w-3 h-3" />
          </Link>
        )}
      </div>
      {children}
    </div>
  );
}

function GitBranchIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="6" y1="3" x2="6" y2="15"/>
      <circle cx="6" cy="18" r="3"/>
      <path d="M6 9a9 9 0 0 0 9 9"/>
      <line x1="18" y1="9" x2="18" y2="21"/>
      <circle cx="18" cy="6" r="3"/>
    </svg>
  );
}
