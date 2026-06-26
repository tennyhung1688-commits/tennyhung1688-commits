'use client';

import {
  BarChart3, TrendingUp, TrendingDown, Target, DollarSign,
  Eye, MousePointerClick, ShoppingCart, Sparkles, ArrowRight,
  RefreshCw, AlertCircle, Zap, Star, Image, Video, FileText
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useLang } from '@/lib/i18n';
import QuickGuide from '@/components/QuickGuide';

const metrics = [
  { label: 'CTR', zh: '点击率', value: '4.8%', change: '+0.6%', up: true, icon: MousePointerClick },
  { label: 'CVR', zh: '转化率', value: '3.2%', change: '+0.3%', up: true, icon: ShoppingCart },
  { label: 'ROI', zh: '投资回报', value: '320%', change: '+45%', up: true, icon: DollarSign },
  { label: 'Revenue', zh: '收入', value: '$12,480', change: '+18%', up: true, icon: TrendingUp },
  { label: 'Impressions', zh: '曝光', value: '24.5K', change: '+12%', up: true, icon: Eye },
  { label: 'Orders', zh: '订单', value: '156', change: '+23%', up: true, icon: Target },
];

const topPerformers = [
  { type: 'image', name: 'Lifestyle Scene', metric: 'CTR 5.2%', improvement: '+40% vs average', icon: Image },
  { type: 'video', name: 'TikTok UGC', metric: 'CVR 4.1%', improvement: '+28% vs average', icon: Video },
  { type: 'copy', name: 'Bullet Points V3', metric: 'CTR 4.8%', improvement: '+15% vs average', icon: FileText },
];

const aiInsights = [
  { text: 'Nike Air Max main image CTR dropped from 5.2% to 4.8%. Recommend A/B testing with lifestyle scene.', zh: 'Nike Air Max 主图 CTR 从 5.2% 降至 4.8%。建议用生活场景图 A/B 测试。', action: 'Run A/B Test', actionZh: '开始测试' },
  { text: 'TikTok UGC video outperforms studio video by 40%. Switch all products to UGC-first strategy.', zh: 'TikTok UGC 视频比棚拍视频转化高 40%。建议全部商品切换 UGC 策略。', action: 'Apply to all', actionZh: '全局应用' },
  { text: 'Christmas season predicted +65% traffic spike. Prepare holiday templates for top 10 products.', zh: '圣诞季预测流量增长 65%。建议为 Top 10 商品准备节日模板。', action: 'Prepare', actionZh: '准备' },
  { text: 'Amazon US listing ranks #12 for "running shoes". Optimize backend search terms to reach top 5.', zh: 'Amazon US "running shoes" 排第 12。优化后台搜索词可冲 top 5。', action: 'Optimize', actionZh: '优化' },
];

const abTests = [
  { name: 'Main Image A vs B', winner: 'B (Lifestyle)', uplift: '+32% CTR', status: 'Complete' },
  { name: 'Title: Short vs Long', winner: 'Long (120 chars)', uplift: '+18% CVR', status: 'Complete' },
  { name: 'Video: Studio vs UGC', status: 'Running (Day 3/7)' },
];

export default function CommerceIntelligence() {
  const { t } = useLang();
  const router = useRouter();

  const insightRoutes = ['/workflow/new', '/workflow/new', '/templates'];

  return (
    <div className="px-8 py-8 max-w-7xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-[#111827] tracking-tight">
            {t('Commerce Intelligence', 'Commerce 智能分析')}
          </h1>
          <p className="text-sm text-[#6B7280] mt-1">
            {t('AI-powered insights — measure, predict, and optimize.', 'AI 驱动的洞察 — 衡量、预测、持续优化。')}
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs text-[#9CA3AF]">
          <RefreshCw className="w-3.5 h-3.5" />
          {t('Updated 5 min ago', '5 分钟前更新')}
        </div>
      </div>

      <QuickGuide title="How Commerce Intelligence Works" zh="智能分析使用指南" steps={[
        { title: 'Monitor key metrics', zh: '监控关键指标', desc: 'Top cards show CTR, CVR, ROI, Revenue, Impressions, and Orders with trend indicators.', descZh: '顶部卡片显示点击率、转化率、ROI、收入、曝光和订单，带趋势箭头。' },
        { title: 'Review top performers', zh: '查看最佳表现', desc: 'The Top Performers section shows which images, videos, and copy drive the best results.', descZh: '最佳表现区域显示哪些图片、视频和文案带来最佳效果。' },
        { title: 'Act on AI insights', zh: '执行 AI 建议', desc: 'AI Insights panel shows optimization recommendations. Click to run A/B tests or apply changes.', descZh: 'AI 洞察面板显示优化建议，点击执行 A/B 测试或应用更改。' },
        { title: 'Use predictions', zh: '使用预测功能', desc: 'Bottom section shows demand forecasts, price recommendations, and risk alerts.', descZh: '底部区域显示需求预测、定价建议和风险预警。' },
      ]} />

      {/* Key metrics grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-6">
        {metrics.map((m, i) => (
          <div key={i} className="bg-white rounded-2xl border border-[#E5E7EB] p-4 hover:shadow-sm transition-shadow">
            <div className="flex items-center justify-between mb-2">
              <m.icon className="w-4 h-4 text-[#9CA3AF]" />
              <span className={`text-[10px] font-semibold flex items-center gap-0.5 ${m.up ? 'text-emerald-500' : 'text-red-500'}`}>
                {m.up ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                {m.change}
              </span>
            </div>
            <p className="text-xl font-bold text-[#111827] tracking-tight">{m.value}</p>
            <p className="text-[11px] text-[#6B7280] mt-0.5">{t(m.label, m.zh)}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Top performers */}
        <div className="bg-white rounded-2xl border border-[#E5E7EB] p-5">
          <div className="flex items-center gap-2 mb-4">
            <Star className="w-4 h-4 text-amber-500" />
            <h3 className="text-sm font-bold text-[#111827]">{t('Top Performers', '最佳表现')}</h3>
          </div>
          <div className="space-y-2">
            {topPerformers.map((item, i) => (
              <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-[#FAFAFA] border border-[#E5E7EB]">
                <div className="w-9 h-9 rounded-lg bg-white flex items-center justify-center">
                  <item.icon className="w-4 h-4 text-[#9CA3AF]" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-[#111827]">{item.name}</p>
                  <p className="text-[10px] text-[#6B7280]">{item.metric}</p>
                </div>
                <span className="text-[10px] font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">{item.improvement}</span>
              </div>
            ))}
          </div>
        </div>

        {/* A/B Tests */}
        <div className="bg-white rounded-2xl border border-[#E5E7EB] p-5">
          <div className="flex items-center gap-2 mb-4">
            <BarChart3 className="w-4 h-4 text-blue-500" />
            <h3 className="text-sm font-bold text-[#111827]">{t('A/B Testing', 'A/B 测试')}</h3>
          </div>
          <div className="space-y-2">
            {abTests.map((test, i) => (
              <div key={i} className="p-3 rounded-xl bg-[#FAFAFA] border border-[#E5E7EB]">
                <div className="flex items-center justify-between mb-1.5">
                  <p className="text-xs font-semibold text-[#111827]">{test.name}</p>
                  <span className={`text-[9px] font-medium px-1.5 py-0.5 rounded-full ${
                    test.status === 'Complete' ? 'bg-emerald-50 text-emerald-600' : 'bg-blue-50 text-blue-600'
                  }`}>
                    {test.status}
                  </span>
                </div>
                {test.winner && (
                  <p className="text-[10px] text-[#6B7280]">
                    Winner: <span className="font-semibold text-[#111827]">{test.winner}</span>
                    {' · '}<span className="text-emerald-600">{test.uplift}</span>
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* AI Insights */}
        <div className="bg-white rounded-2xl border border-[#E5E7EB] p-5">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="w-4 h-4 text-[#7C3AED]" />
            <h3 className="text-sm font-bold text-[#111827]">{t('AI Insights', 'AI 洞察')}</h3>
          </div>
          <div className="space-y-2">
            {aiInsights.map((insight, i) => (
              <div key={i} className="p-3 rounded-xl bg-[#EEEDFE]/50 border border-[#CECBF6]/50">
                <div className="flex items-start gap-2 mb-2">
                  <AlertCircle className="w-3 h-3 text-[#7C3AED] mt-0.5 flex-shrink-0" />
                  <p className="text-[11px] text-[#374151] leading-relaxed">{t(insight.text, insight.zh)}</p>
                </div>
                <button
                  onClick={() => router.push(insightRoutes[i])}
                  className="text-[10px] font-semibold text-[#7C3AED] hover:underline">
                  {t(insight.action, insight.actionZh)} →
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Prediction & Trend */}
      <div className="mt-6 bg-white rounded-2xl border border-[#E5E7EB] p-5">
        <div className="flex items-center gap-2 mb-4">
          <Zap className="w-4 h-4 text-[#7C3AED]" />
          <h3 className="text-sm font-bold text-[#111827]">{t('Prediction & Forecast', '预测与趋势')}</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            { label: 'Demand Forecast', zh: '需求预测', value: '+65%', detail: 'Next 30 days', detailZh: '未来 30 天', up: true },
            { label: 'Price Recommendation', zh: '定价建议', value: '$129.99', detail: 'Optimal for Q4', detailZh: 'Q4 最优定价', up: true },
            { label: 'Best Platform', zh: '最佳平台', value: 'Amazon US', detail: 'Highest ROI: 320%', detailZh: '最高 ROI: 320%' },
            { label: 'Risk Alert', zh: '风险预警', value: 'Low Stock', detail: 'Sony WH-1000XM6', detailZh: 'Sony WH-1000XM6', up: false },
          ].map((item, i) => (
            <div key={i} className="p-4 rounded-xl bg-[#FAFAFA] border border-[#E5E7EB]">
              <p className="text-[10px] text-[#9CA3AF] mb-1">{t(item.label, item.zh)}</p>
              <p className="text-lg font-bold text-[#111827]">{item.value}</p>
              <p className="text-[10px] text-[#6B7280] mt-0.5">{t(item.detail, item.detailZh)}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
