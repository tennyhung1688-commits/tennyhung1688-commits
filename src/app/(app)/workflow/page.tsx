'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Play, Image, Video, FileText, Search, Languages, Upload,
  CheckCircle, Circle, Clock, ArrowRight, Sparkles, Plus,
  RefreshCw, ChevronDown, Package, Palette, Zap
} from 'lucide-react';
import { useLang } from '@/lib/i18n';
import QuickGuide from '@/components/QuickGuide';

interface WorkflowStep {
  id: string;
  icon: React.ElementType;
  label: string;
  labelZh: string;
  status: 'pending' | 'running' | 'completed' | 'error';
  duration: string;
}

interface WorkflowTemplate {
  name: string;
  zh: string;
  steps: number;
  desc: string;
  descZh: string;
  color: string;
}

const templates: WorkflowTemplate[] = [
  { name: 'Amazon Full Listing', zh: 'Amazon 全套列表', steps: 12, desc: 'Images + Video + Copy + A+ Content + SEO', descZh: '图片+视频+文案+A+内容+SEO', color: '#EF9F27' },
  { name: 'TikTok Shop Video', zh: 'TikTok 商品视频', steps: 8, desc: 'UGC Video + Caption + Hashtags + Schedule', descZh: '短视频+标题+标签+排期发布', color: '#EF4444' },
  { name: 'Taobao Complete', zh: '淘宝全套', steps: 15, desc: 'Main image + Detail + Video + Live script', descZh: '主图+详情+视频+直播脚本', color: '#F97316' },
  { name: 'Shopee Multi-lang', zh: 'Shopee 多语言', steps: 10, desc: 'Images + EN/ZH/TH/VI + Category SEO', descZh: '图片+英/中/泰/越+品类SEO', color: '#EF6820' },
  { name: 'Quick Product Shoot', zh: '快速商品拍摄', steps: 4, desc: 'White bg + Lifestyle + Size chart', descZh: '白底图+场景图+尺码表', color: '#3B82F6' },
];

const defaultSteps: WorkflowStep[] = [
  { id: 'image', icon: Image, label: 'Image Generation', labelZh: '图片生成', status: 'pending', duration: '~30s' },
  { id: 'video', icon: Video, label: 'Video Generation', labelZh: '视频生成', status: 'pending', duration: '~120s' },
  { id: 'copy', icon: FileText, label: 'Copywriting', labelZh: '文案生成', status: 'pending', duration: '~10s' },
  { id: 'seo', icon: Search, label: 'SEO Optimization', labelZh: 'SEO 优化', status: 'pending', duration: '~5s' },
  { id: 'translate', icon: Languages, label: 'Translation', labelZh: '多语言翻译', status: 'pending', duration: '~8s' },
  { id: 'publish', icon: Upload, label: 'Publishing', labelZh: '发布到平台', status: 'pending', duration: '~15s' },
];

export default function WorkflowOrchestrator() {
  const { t } = useLang();
  const [steps, setSteps] = useState<WorkflowStep[]>(defaultSteps);
  const [running, setRunning] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [showTemplatePicker, setShowTemplatePicker] = useState(false);

  const allDone = steps.every(s => s.status === 'completed');
  const hasRun = steps.some(s => s.status !== 'pending');

  const runWorkflow = () => {
    if (running) return;
    setRunning(true);
    setSteps(prev => prev.map(s => ({ ...s, status: 'pending' })));

    // Simulate sequential execution
    const runStep = (index: number) => {
      if (index >= steps.length) {
        setRunning(false);
        return;
      }
      setSteps(prev => prev.map((s, i) => i === index ? { ...s, status: 'running' } : s));
      setTimeout(() => {
        setSteps(prev => prev.map((s, i) => i === index ? { ...s, status: 'completed' } : s));
        runStep(index + 1);
      }, 800 + Math.random() * 600);
    };
    runStep(0);
  };

  return (
    <div className="px-8 py-8 max-w-7xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-[#111827] tracking-tight">
            {t('Workflow Orchestrator', '工作流编排器')}
          </h1>
          <p className="text-sm text-[#6B7280] mt-1">
            {t('One-click AI pipeline — from product photo to global publishing.', '一键 AI 管线 — 从商品照片到全球发布。')}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowTemplatePicker(true)}
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-white border border-[#E5E7EB] text-[#374151] rounded-xl text-sm font-semibold hover:bg-[#FAFAFA] hover:border-[#D1D5DB] transition-all"
          >
            <Plus className="w-4 h-4" />
            {t('New Workflow', '新建工作流')}
          </button>
        </div>
      </div>

      <QuickGuide title="How Workflow Orchestrator Works" zh="工作流使用指南" steps={[
        { title: 'Select product & platform', zh: '选择商品和平台', desc: 'The context bar shows the current product and brand. Click "Change" to switch to a different product.', descZh: '顶部上下文栏显示当前商品和品牌，点击"更换"切换商品。' },
        { title: 'Run the workflow', zh: '运行工作流', desc: 'Click the big green "Run Workflow" button. AI executes 6 steps sequentially: Image → Video → Copy → SEO → Translate → Publish.', descZh: '点击绿色"运行工作流"按钮，AI 按顺序执行 6 步：图片→视频→文案→SEO→翻译→发布。' },
        { title: 'Monitor progress', zh: '监控进度', desc: 'Each step shows status: pending, running, or completed. The progress bar shows overall completion.', descZh: '每一步显示状态：等待中、运行中、已完成。进度条显示总体完成度。' },
        { title: 'View & publish results', zh: '查看并发布', desc: 'After completion, review generated images, video, and copy. Click "Publish Now" to send to platforms.', descZh: '完成后查看生成的图片、视频和文案，点击"立即发布"发送到平台。' },
      ]} />

      {/* Context bar — shows selected product & brand */}
      <div className="flex items-center gap-4 mb-8 p-4 bg-white rounded-2xl border border-[#E5E7EB]">
        <div className="flex items-center gap-3 flex-1">
          <div className="w-10 h-10 rounded-xl bg-[#F5F5F5] flex items-center justify-center">
            <Package className="w-5 h-5 text-[#9CA3AF]" />
          </div>
          <div>
            <p className="text-sm font-semibold text-[#111827]">
              {t('Nike Air Max 2026', 'Nike Air Max 2026')}
            </p>
            <p className="text-xs text-[#9CA3AF]">SKU: NK-AM-001 · Shoes</p>
          </div>
        </div>
        <div className="hidden sm:flex items-center gap-1 text-xs text-[#9CA3AF]">
          <Palette className="w-3 h-3" />
          Nike Brand Profile
        </div>
        <div className="w-px h-8 bg-[#E5E7EB] hidden sm:block" />
        <div className="hidden sm:flex items-center gap-1 text-xs text-[#9CA3AF]">
          <GlobeIcon className="w-3 h-3" />
          Amazon · US Marketplace
        </div>
        <Link href="/products" className="text-xs text-[#7C3AED] font-medium hover:underline">
          {t('Change', '更换')}
        </Link>
      </div>

      {/* Workflow Pipeline */}
      <div className="bg-white rounded-2xl border border-[#E5E7EB] p-6 mb-6">
        <h3 className="text-sm font-bold text-[#111827] mb-5">
          {t('Pipeline', '执行管线')}
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {steps.map((step, i) => {
            const StatusIcon = step.status === 'completed' ? CheckCircle :
                               step.status === 'running' ? RefreshCw :
                               Circle;
            const statusClass = step.status === 'completed' ? 'text-emerald-500' :
                                step.status === 'running' ? 'text-[#7C3AED] animate-spin' :
                                'text-[#D1D5DB]';
            const bgClass = step.status === 'completed' ? 'bg-emerald-50 border-emerald-200' :
                            step.status === 'running' ? 'bg-[#EEEDFE] border-[#CECBF6]' :
                            'bg-white border-[#E5E7EB]';

            return (
              <div key={step.id} className={`flex items-center gap-3 p-3.5 rounded-xl border transition-all ${bgClass}`}>
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                  step.status === 'completed' ? 'bg-emerald-100' :
                  step.status === 'running' ? 'bg-[#7C3AED] text-white' :
                  'bg-[#F5F5F5]'
                }`}>
                  <step.icon className={`w-5 h-5 ${
                    step.status === 'completed' ? 'text-emerald-600' :
                    step.status === 'running' ? 'text-white' :
                    'text-[#9CA3AF]'
                  }`} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-[#111827]">{t(step.label, step.labelZh)}</p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <StatusIcon className={`w-3.5 h-3.5 ${statusClass}`} />
                    <span className="text-[11px] text-[#9CA3AF]">
                      {step.status === 'completed' ? t('Done', '已完成') :
                       step.status === 'running' ? t('Running...', '运行中...') :
                       step.duration}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Progress bar */}
        {hasRun && (
          <div className="mt-5">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-[#6B7280]">
                {t('Progress', '进度')}
              </span>
              <span className="text-xs font-semibold text-[#111827]">
                {steps.filter(s => s.status === 'completed').length} / {steps.length}
              </span>
            </div>
            <div className="h-2 bg-[#F5F5F5] rounded-full overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-[#7C3AED] to-[#6D28D9] transition-all duration-700"
                style={{ width: `${(steps.filter(s => s.status === 'completed').length / steps.length) * 100}%` }}
              />
            </div>
          </div>
        )}
      </div>

      {/* Run Button */}
      <div className="text-center mb-8">
        {!hasRun ? (
          <button
            onClick={runWorkflow}
            disabled={running}
            className="inline-flex items-center gap-3 px-10 py-4 rounded-2xl bg-[#085041] text-white text-base font-semibold shadow-lg shadow-emerald-500/20 hover:bg-[#0A634F] hover:shadow-xl hover:shadow-emerald-500/30 hover:-translate-y-0.5 disabled:opacity-60 transition-all"
          >
            <Play className="w-5 h-5" />
            {t('Run Workflow', '运行工作流')}
          </button>
        ) : allDone ? (
          <div className="flex items-center justify-center gap-4">
            <button
              onClick={runWorkflow}
              disabled={running}
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl bg-white border border-[#E5E7EB] text-[#374151] text-sm font-semibold hover:bg-[#FAFAFA] transition-all"
            >
              <RefreshCw className="w-4 h-4" />
              {t('Run Again', '再次运行')}
            </button>
            <Link
              href="/publish"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl bg-[#085041] text-white text-sm font-semibold shadow-lg shadow-emerald-500/20 hover:bg-[#0A634F] transition-all"
            >
              <Upload className="w-4 h-4" />
              {t('Publish Now', '立即发布')}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          <button
            disabled
            className="inline-flex items-center gap-3 px-10 py-4 rounded-2xl bg-[#085041]/50 text-white/50 text-base font-semibold cursor-not-allowed"
          >
            <RefreshCw className="w-5 h-5 animate-spin" />
            {t('Running...', '运行中...')}
          </button>
        )}
      </div>

      {/* Results Preview (after completion) */}
      {allDone && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-2xl border border-[#E5E7EB] p-5">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg bg-purple-100 flex items-center justify-center">
                <Image className="w-4 h-4 text-purple-600" />
              </div>
              <h4 className="text-sm font-bold text-[#111827]">{t('5 Images Generated', '已生成 5 张图片')}</h4>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {[0,1,2].map(i => (
                <div key={i} className="aspect-square rounded-lg bg-[#F5F5F5] border border-[#E5E7EB] flex items-center justify-center">
                  <Image className="w-5 h-5 text-[#D1D5DB]" />
                </div>
              ))}
            </div>
            <Link href="/assets" className="inline-flex text-[11px] text-[#7C3AED] font-medium mt-2 hover:underline">
              {t('View all images →', '查看全部图片 →')}
            </Link>
          </div>

          <div className="bg-white rounded-2xl border border-[#E5E7EB] p-5">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center">
                <Video className="w-4 h-4 text-amber-600" />
              </div>
              <h4 className="text-sm font-bold text-[#111827]">{t('1 Video Generated', '已生成 1 条视频')}</h4>
            </div>
            <div className="aspect-video rounded-lg bg-[#F5F5F5] border border-[#E5E7EB] flex items-center justify-center">
              <Play className="w-8 h-8 text-[#D1D5DB]" />
            </div>
            <Link href="/assets" className="inline-flex text-[11px] text-[#7C3AED] font-medium mt-2 hover:underline">
              {t('Watch video →', '观看视频 →')}
            </Link>
          </div>

          <div className="bg-white rounded-2xl border border-[#E5E7EB] p-5">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center">
                <FileText className="w-4 h-4 text-emerald-600" />
              </div>
              <h4 className="text-sm font-bold text-[#111827]">{t('Copywriting Ready', '文案已生成')}</h4>
            </div>
            <div className="space-y-2">
              <div className="p-2.5 rounded-lg bg-[#FAFAFA] border border-[#F5F5F5]">
                <p className="text-[10px] text-[#9CA3AF]">{t('Title', '标题')}</p>
                <p className="text-xs text-[#374151] mt-0.5">Nike Air Max 2026 — Next-Level Cushioning for Every Run</p>
              </div>
              <div className="p-2.5 rounded-lg bg-[#FAFAFA] border border-[#F5F5F5]">
                <p className="text-[10px] text-[#9CA3AF]">{t('SEO Terms', '搜索关键词')}</p>
                <p className="text-xs text-[#374151] mt-0.5">running shoes, air max, nike sneakers, athletic footwear</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Template picker modal */}
      {showTemplatePicker && (
        <div className="fixed inset-0 z-50 flex items-center justify-center" onClick={() => setShowTemplatePicker(false)}>
          <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" />
          <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-[#E5E7EB] p-6 animate-fade-in-up" onClick={e => e.stopPropagation()}>
            <h3 className="text-base font-bold text-[#111827] mb-4">
              {t('Choose a Workflow Template', '选择工作流模板')}
            </h3>
            <div className="space-y-2">
              {templates.map(tpl => (
                <button
                  key={tpl.name}
                  onClick={() => { setSelectedTemplate(tpl.name); setShowTemplatePicker(false); }}
                  className="w-full text-left p-4 rounded-xl border border-[#E5E7EB] hover:border-[#D1D5DB] hover:shadow-sm transition-all group"
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-semibold text-[#111827]">{t(tpl.name, tpl.zh)}</span>
                    <span className="text-[10px] text-[#9CA3AF]">{tpl.steps} steps</span>
                  </div>
                  <p className="text-xs text-[#6B7280]">{t(tpl.desc, tpl.descZh)}</p>
                </button>
              ))}
            </div>
            <button
              onClick={() => setShowTemplatePicker(false)}
              className="w-full mt-4 py-2.5 rounded-xl bg-[#F5F5F5] text-[#6B7280] text-sm font-semibold hover:bg-[#E5E7EB] transition-all"
            >
              {t('Start from Scratch', '从空白开始')}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function GlobeIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/>
      <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/>
      <path d="M2 12h20"/>
    </svg>
  );
}
