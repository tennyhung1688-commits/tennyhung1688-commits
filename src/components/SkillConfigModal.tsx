'use client';

import { useState } from 'react';
import {
  X, Play, Clock, Globe, Cpu, FileText, ArrowRight,
  Check, Settings2, Layers, Variable, Code, Tag,
  ChevronDown, ChevronUp, Zap, Copy
} from 'lucide-react';
import { useLang } from '@/lib/i18n';
import type { Skill, SkillCategory, SupportedPlatform, SupportedModel } from '@/skills-v2/types';

/* ── Category display config ── */
const categoryMeta: Record<SkillCategory, { label: string; zh: string; color: string }> = {
  image:       { label: 'Image', zh: '图片', color: '#7C3AED' },
  video:       { label: 'Video', zh: '视频', color: '#EF4444' },
  copywriting: { label: 'Copywriting', zh: '文案', color: '#F59E0B' },
  seo:         { label: 'SEO', zh: 'SEO', color: '#3B82F6' },
  translation: { label: 'Translation', zh: '翻译', color: '#10B981' },
  publishing:  { label: 'Publishing', zh: '发布', color: '#8B5CF6' },
  analytics:   { label: 'Analytics', zh: '分析', color: '#EC4899' },
  automation:  { label: 'Automation', zh: '自动化', color: '#14B8A6' },
  platform:    { label: 'Platform', zh: '平台', color: '#6366F1' },
};

/* ── Model display ── */
const modelNames: Record<string, string> = {
  flux:       'FLUX 1.1 Pro',
  'gpt-image': 'GPT Image',
  imagen:     'Imagen 3',
  seedream:   'Seedream 4',
  recraft:    'Recraft V3',
  ideogram:   'Ideogram 3',
  veo:        'Veo 3',
  kling:      'Kling 2',
  runway:     'Runway Gen-4',
  pixverse:   'PixVerse 3',
  pika:       'Pika 2',
  luma:       'Luma Ray 2',
  'gpt-4':    'GPT-4',
  claude:     'Claude 3.5',
  gemini:     'Gemini',
  deepseek:   'DeepSeek',
};

interface Props {
  skill: Skill;
  open: boolean;
  onClose: () => void;
}

export function SkillConfigModal({ skill, open, onClose }: Props) {
  const { t } = useLang();
  const [activeTab, setActiveTab] = useState<'overview'|'workflow'|'prompt'|'schema'>('overview');
  const [expandedSteps, setExpandedSteps] = useState<Set<string>>(new Set());

  if (!open) return null;

  const catMeta = categoryMeta[skill.category] || categoryMeta.image;

  const tabs = [
    { id: 'overview' as const, label: 'Overview', zh: '概览' },
    { id: 'workflow' as const, label: 'Workflow', zh: '工作流' },
    { id: 'prompt' as const, label: 'Prompt', zh: '提示词' },
    { id: 'schema' as const, label: 'Schema', zh: 'Schema' },
  ];

  const toggleStep = (id: string) => {
    const next = new Set(expandedSteps);
    if (next.has(id)) next.delete(id); else next.add(id);
    setExpandedSteps(next);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-[8vh]">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[85vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#E5E7EB] flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ backgroundColor: catMeta.color + '18' }}>
              <Settings2 className="w-5 h-5" style={{ color: catMeta.color }} />
            </div>
            <div>
              <h2 className="text-base font-bold text-[#111827]">{skill.name}</h2>
              <p className="text-[10px] text-[#9CA3AF]">{skill.id}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-[#7C3AED] text-white rounded-xl text-xs font-semibold hover:bg-[#6D28D9] transition-all">
              <Play className="w-3.5 h-3.5" />
              {t('Run Test', '测试运行')}
            </button>
            <button onClick={onClose} className="p-2 rounded-lg hover:bg-[#F3F4F6] text-[#6B7280] transition-all">
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-1 px-6 py-2 border-b border-[#E5E7EB] flex-shrink-0">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeTab === tab.id
                  ? 'bg-[#7C3AED]/10 text-[#7C3AED]'
                  : 'text-[#6B7280] hover:text-[#111827] hover:bg-[#F5F5F5]'
              }`}
            >
              {t(tab.label, tab.zh)}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-5">
          {/* ── Overview Tab ── */}
          {activeTab === 'overview' && (
            <>
              {/* Category + Meta */}
              <div className="flex items-center gap-3 flex-wrap">
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[10px] font-semibold text-white" style={{ backgroundColor: catMeta.color }}>
                  {t(catMeta.label, catMeta.zh)}
                </span>
                <span className="inline-flex items-center gap-1 text-[10px] text-[#6B7280]">
                  <Clock className="w-3 h-3" />
                  {skill.estimatedTime}
                </span>
                {skill.requiresConnection && (
                  <span className="inline-flex items-center gap-1 text-[10px] text-amber-600 bg-amber-50 px-2 py-1 rounded-lg font-medium">
                    <Globe className="w-3 h-3" />
                    {t('Requires Connection', '需要连接')}
                  </span>
                )}
                {skill.tags.map(tag => (
                  <span key={tag} className="inline-flex items-center gap-1 text-[10px] text-[#7C3AED] bg-[#EEEDFE] px-2 py-1 rounded-lg font-medium">
                    <Tag className="w-3 h-3" />
                    {tag}
                  </span>
                ))}
              </div>

              {/* Description */}
              <div>
                <h3 className="text-sm font-bold text-[#111827] mb-2">{t('Description', '描述')}</h3>
                <p className="text-sm text-[#6B7280] leading-relaxed">{skill.description}</p>
              </div>

              {/* Supported Platforms */}
              {skill.supportedPlatforms.length > 0 && (
                <div>
                  <h3 className="text-sm font-bold text-[#111827] mb-2 flex items-center gap-1.5">
                    <Globe className="w-3.5 h-3.5 text-[#6B7280]" />
                    {t('Supported Platforms', '支持的平台')}
                  </h3>
                  <div className="flex flex-wrap gap-1.5">
                    {skill.supportedPlatforms.map((p: SupportedPlatform) => (
                      <span key={p} className="text-[10px] font-medium text-[#374151] bg-[#F5F5F5] px-2.5 py-1 rounded-lg border border-[#E5E7EB]">{p}</span>
                    ))}
                  </div>
                </div>
              )}

              {/* Supported Models */}
              {skill.supportedModels.length > 0 && (
                <div>
                  <h3 className="text-sm font-bold text-[#111827] mb-2 flex items-center gap-1.5">
                    <Cpu className="w-3.5 h-3.5 text-[#6B7280]" />
                    {t('Supported Models', '支持的模型')}
                  </h3>
                  <div className="flex flex-wrap gap-1.5">
                    {skill.supportedModels.map((m: SupportedModel) => (
                      <span key={m} className="inline-flex items-center gap-1 text-[10px] font-medium text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-100">
                        <Zap className="w-3 h-3" />
                        {modelNames[m] || m}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}

          {/* ── Workflow Tab ── */}
          {activeTab === 'workflow' && (
            <div className="space-y-2">
              <p className="text-xs text-[#9CA3AF] mb-2">{skill.workflow.length} steps · ~{skill.estimatedTime}</p>
              {skill.workflow.map((step, i) => (
                <div key={step.id} className="rounded-xl border border-[#E5E7EB] overflow-hidden">
                  <button
                    onClick={() => toggleStep(step.id)}
                    className="w-full flex items-center gap-3 p-3.5 text-left hover:bg-[#FAFAFA] transition-colors"
                  >
                    <div className="w-7 h-7 rounded-lg bg-[#F5F5F5] flex items-center justify-center text-xs font-bold text-[#6B7280] flex-shrink-0">
                      {i + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold text-[#111827]">{step.name}</span>
                        <span className="text-[10px] text-[#9CA3AF]">{step.estimatedTime}</span>
                      </div>
                      {expandedSteps.has(step.id) && (
                        <p className="text-xs text-[#6B7280] mt-1.5 leading-relaxed">{step.description}</p>
                      )}
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      {step.dependencies && step.dependencies.length > 0 && (
                        <span className="text-[9px] text-[#9CA3AF] bg-[#F5F5F5] px-1.5 py-0.5 rounded-md">
                          {step.dependencies.length} dep
                        </span>
                      )}
                      {expandedSteps.has(step.id)
                        ? <ChevronUp className="w-4 h-4 text-[#9CA3AF]" />
                        : <ChevronDown className="w-4 h-4 text-[#9CA3AF]" />
                      }
                    </div>
                  </button>
                  {expandedSteps.has(step.id) && step.dependencies && step.dependencies.length > 0 && (
                    <div className="px-11 pb-3">
                      <p className="text-[10px] text-[#9CA3AF]">
                        {t('Dependencies', '依赖')}: {step.dependencies.join(', ')}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* ── Prompt Tab ── */}
          {activeTab === 'prompt' && (
            <div className="space-y-4">
              {/* System Prompt */}
              <div>
                <h3 className="text-sm font-bold text-[#111827] mb-2 flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5 text-[#6B7280]" />
                  {t('System Prompt', '系统提示词')}
                </h3>
                <pre className="text-xs text-[#374151] bg-[#FAFAFA] border border-[#E5E7EB] rounded-xl p-4 whitespace-pre-wrap leading-relaxed font-mono max-h-48 overflow-y-auto">
                  {skill.promptTemplate.systemPrompt}
                </pre>
              </div>

              {/* User Prompt Template */}
              <div>
                <h3 className="text-sm font-bold text-[#111827] mb-2 flex items-center gap-1.5">
                  <Code className="w-3.5 h-3.5 text-[#6B7280]" />
                  {t('User Prompt Template', '用户提示词模板')}
                </h3>
                <pre className="text-xs text-[#374151] bg-[#FAFAFA] border border-[#E5E7EB] rounded-xl p-4 whitespace-pre-wrap leading-relaxed font-mono max-h-48 overflow-y-auto">
                  {skill.promptTemplate.userPromptTemplate}
                </pre>
              </div>

              {/* Variables */}
              {skill.promptTemplate.variables.length > 0 && (
                <div>
                  <h3 className="text-sm font-bold text-[#111827] mb-2 flex items-center gap-1.5">
                    <Variable className="w-3.5 h-3.5 text-[#6B7280]" />
                    {t('Variables', '变量')}
                  </h3>
                  <div className="flex flex-wrap gap-1.5">
                    {skill.promptTemplate.variables.map(v => (
                      <span key={v} className="text-[10px] font-mono font-medium text-[#7C3AED] bg-[#EEEDFE] px-2.5 py-1 rounded-lg border border-[#CECBF6]">
                        {`{{${v}}}`}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Examples */}
              {skill.promptTemplate.examples && skill.promptTemplate.examples.length > 0 && (
                <div>
                  <h3 className="text-sm font-bold text-[#111827] mb-2">{t('Examples', '示例')}</h3>
                  {skill.promptTemplate.examples.map((ex, i) => (
                    <div key={i} className="rounded-xl border border-[#E5E7EB] overflow-hidden mb-2">
                      <div className="px-3.5 py-2 bg-[#FAFAFA] border-b border-[#E5E7EB] text-[10px] font-semibold text-[#6B7280]">
                        {t('Input', '输入')}
                      </div>
                      <pre className="px-3.5 py-2 text-xs text-[#374151] font-mono whitespace-pre-wrap">{ex.input}</pre>
                      <div className="px-3.5 py-2 bg-[#FAFAFA] border-y border-[#E5E7EB] text-[10px] font-semibold text-[#6B7280]">
                        {t('Expected Output', '预期输出')}
                      </div>
                      <pre className="px-3.5 py-2 text-xs text-[#374151] font-mono whitespace-pre-wrap">{ex.output}</pre>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ── Schema Tab ── */}
          {activeTab === 'schema' && (
            <div className="space-y-5">
              {/* Input Schema */}
              <div>
                <h3 className="text-sm font-bold text-[#111827] mb-2 flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-[#6B7280]" />
                  {t('Input Schema', '输入 Schema')}
                </h3>
                <div className="rounded-xl border border-[#E5E7EB] overflow-hidden">
                  {Object.entries(skill.inputSchema.properties).map(([key, prop]) => (
                    <div key={key} className="flex items-center gap-3 px-3.5 py-2.5 border-b border-[#E5E7EB] last:border-0">
                      <span className="text-xs font-mono font-semibold text-[#111827] min-w-[100px]">{key}</span>
                      <span className="text-[10px] text-[#7C3AED] bg-[#EEEDFE] px-1.5 py-0.5 rounded font-medium">{prop.type}</span>
                      {skill.inputSchema.required.includes(key) && (
                        <span className="text-[10px] text-red-600 bg-red-50 px-1.5 py-0.5 rounded font-medium">{t('required', '必填')}</span>
                      )}
                      <span className="text-[10px] text-[#9CA3AF]">{prop.description}</span>
                      {prop.enum && (
                        <span className="text-[10px] text-[#6B7280]">enum: {prop.enum.join(', ')}</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Output Schema */}
              <div>
                <h3 className="text-sm font-bold text-[#111827] mb-2 flex items-center gap-1.5">
                  <Copy className="w-3.5 h-3.5 text-[#6B7280]" />
                  {t('Output Schema', '输出 Schema')}
                </h3>
                <div className="rounded-xl border border-[#E5E7EB] p-4 space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] text-[#7C3AED] bg-[#EEEDFE] px-1.5 py-0.5 rounded font-medium">{skill.outputSchema.type}</span>
                    <span className="text-xs text-[#6B7280]">{skill.outputSchema.description}</span>
                  </div>
                  {skill.outputSchema.format && (
                    <p className="text-[10px] text-[#9CA3AF]">Format: {skill.outputSchema.format}</p>
                  )}
                  {skill.outputSchema.example && (
                    <div>
                      <p className="text-[10px] font-semibold text-[#6B7280] mb-1">{t('Example', '示例')}</p>
                      <pre className="text-xs text-[#374151] bg-[#FAFAFA] border border-[#E5E7EB] rounded-lg p-3 font-mono whitespace-pre-wrap">
                        {skill.outputSchema.example}
                      </pre>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-6 py-3 border-t border-[#E5E7EB] flex-shrink-0 bg-[#FAFAFA]">
          <span className="text-[10px] text-[#9CA3AF]">
            {t('Skill ID', 'Skill ID')}: {skill.id}
          </span>
          <div className="flex items-center gap-2">
            <button onClick={onClose} className="px-4 py-2 border border-[#E5E7EB] text-[#6B7280] rounded-xl text-xs font-semibold hover:bg-white transition-all">
              {t('Close', '关闭')}
            </button>
            <button className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#7C3AED] text-white rounded-xl text-xs font-semibold hover:bg-[#6D28D9] transition-all">
              <Play className="w-3.5 h-3.5" />
              {t('Run This Skill', '运行此 Skill')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
