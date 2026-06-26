'use client';

import { useState, useMemo } from 'react';
import {
  Image, Video, FileText, Search, Globe, BarChart3,
  Bot, Languages, Upload, Puzzle, Sparkles, ArrowRight,
  Clock, Tag, Zap, Play
} from 'lucide-react';
import { useLang } from '@/lib/i18n';
import { registry } from '@/skills-v2';
import type { Skill, SkillCategory } from '@/skills-v2/types';
import { SkillConfigModal } from '@/components/SkillConfigModal';

const categoryConfig: Record<SkillCategory, { icon: React.ElementType; label: string; zh: string; color: string }> = {
  image:       { icon: Image,        label: 'Image',       zh: '图片',    color: '#7C3AED' },
  video:       { icon: Video,        label: 'Video',       zh: '视频',    color: '#EF4444' },
  copywriting: { icon: FileText,     label: 'Copywriting', zh: '文案',    color: '#F59E0B' },
  seo:         { icon: Search,       label: 'SEO',         zh: 'SEO',     color: '#3B82F6' },
  translation: { icon: Languages,    label: 'Translation', zh: '翻译',    color: '#10B981' },
  publishing:  { icon: Upload,       label: 'Publishing',  zh: '发布',    color: '#8B5CF6' },
  analytics:   { icon: BarChart3,    label: 'Analytics',   zh: '分析',    color: '#EC4899' },
  automation:  { icon: Bot,          label: 'Automation',  zh: '自动化',  color: '#14B8A6' },
  platform:    { icon: Globe,        label: 'Platform',    zh: '平台',    color: '#6366F1' },
};

export default function SkillEnginePage() {
  const { t } = useLang();
  const [activeCategory, setActiveCategory] = useState<SkillCategory | 'all'>('all');
  const [search, setSearch] = useState('');
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);

  const skills = useMemo(() => {
    let list = activeCategory === 'all' ? registry.getAll() : registry.getByCategory(activeCategory);
    if (search) list = registry.search(search);
    return list;
  }, [activeCategory, search]);

  const categories = registry.getCategories();

  return (
    <div className="px-8 py-8 max-w-7xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-[#111827] tracking-tight">
            {t('Commerce Knowledge Engine', 'Commerce 知识引擎')}
          </h1>
          <p className="text-sm text-[#6B7280] mt-1">
            {t(`${registry.size} skills registered across ${categories.length} categories`, `${registry.size} 个 Skill，${categories.length} 个分类`)}
          </p>
        </div>
        <div className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#EEEDFE] border border-[#CECBF6] rounded-xl text-xs font-semibold text-[#7C3AED]">
          <Sparkles className="w-3.5 h-3.5" />
          {t('Skill-driven architecture', 'Skill 驱动架构')}
        </div>
      </div>

      {/* Search */}
      <div className="relative max-w-sm mb-5">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9CA3AF]" />
        <input
          type="text" value={search} onChange={e => setSearch(e.target.value)}
          placeholder={t('Search skills...', '搜索 Skill...')}
          className="w-full pl-10 pr-4 py-2.5 border border-[#E5E7EB] rounded-xl text-sm bg-white focus:ring-2 focus:ring-[#7C3AED]/20 focus:border-[#7C3AED] outline-none"
        />
      </div>

      {/* Category tabs */}
      <div className="flex flex-wrap items-center gap-1.5 mb-6">
        <button
          onClick={() => setActiveCategory('all')}
          className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
            activeCategory === 'all' ? 'bg-[#7C3AED] text-white' : 'bg-white border border-[#E5E7EB] text-[#6B7280] hover:border-[#D1D5DB]'
          }`}
        >
          {t('All', '全部')} ({registry.size})
        </button>
        {categories.map(cat => {
          const cfg = categoryConfig[cat];
          const count = registry.getByCategory(cat).length;
          return (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeCategory === cat ? 'text-white' : 'bg-white border border-[#E5E7EB] text-[#6B7280] hover:border-[#D1D5DB]'
              }`}
              style={activeCategory === cat ? { backgroundColor: cfg.color } : {}}
            >
              {t(cfg.label, cfg.zh)} ({count})
            </button>
          );
        })}
      </div>

      {/* Skill grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {skills.map(skill => {
          const cfg = categoryConfig[skill.category];
          return (
            <div key={skill.id} className="group bg-white rounded-2xl border border-[#E5E7EB] p-5 hover:border-[#D1D5DB] hover:shadow-sm transition-all">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: cfg.color + '15' }}>
                    <cfg.icon className="w-5 h-5" style={{ color: cfg.color }} />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-[#111827]">{skill.name}</h3>
                    <span className="text-[10px] text-[#9CA3AF]">{skill.id}</span>
                  </div>
                </div>
                <div className="flex items-center gap-1.5">
                  {skill.requiresConnection && <Globe className="w-3 h-3 text-[#9CA3AF]" />}
                  {skill.tags.map(tag => (
                    <span key={tag} className="text-[9px] font-medium text-[#6B7280] bg-[#F5F5F5] px-1.5 py-0.5 rounded-md">{tag}</span>
                  ))}
                </div>
              </div>

              <p className="text-xs text-[#6B7280] leading-relaxed mb-4">{skill.description}</p>

              {/* Workflow steps */}
              <div className="flex items-center gap-1 flex-wrap mb-3">
                {skill.workflow.slice(0, 4).map((step, i) => (
                  <span key={i} className="inline-flex items-center gap-1 text-[10px] text-[#9CA3AF]">
                    {step.name}
                    {i < Math.min(skill.workflow.length, 4) - 1 && <span className="text-[#D1D5DB]">→</span>}
                  </span>
                ))}
                {skill.workflow.length > 4 && <span className="text-[10px] text-[#9CA3AF]">+{skill.workflow.length - 4}</span>}
              </div>

              {/* Metadata row */}
              <div className="flex items-center justify-between pt-3 border-t border-[#F5F5F5]">
                <div className="flex items-center gap-3 text-[10px] text-[#9CA3AF]">
                  <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{skill.estimatedTime}</span>
                  <span className="flex items-center gap-1"><Puzzle className="w-3 h-3" />{skill.workflow.length} steps</span>
                </div>
                <button
                  onClick={() => setSelectedSkill(skill)}
                  className="text-[10px] font-semibold text-[#7C3AED] hover:underline flex items-center gap-0.5">
                  {t('Configure', '配置')}
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Skill Config Modal */}
      {selectedSkill && (
        <SkillConfigModal
          skill={selectedSkill}
          open={!!selectedSkill}
          onClose={() => setSelectedSkill(null)}
        />
      )}
    </div>
  );
}
