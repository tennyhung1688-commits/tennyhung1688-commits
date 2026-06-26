'use client';

import { Shield, Cpu, Globe, Zap, Cloud, Layers, Users, Puzzle, Sparkles } from 'lucide-react';
import { useLang } from '@/lib/i18n';

const advantages = [
  { icon: Cpu, label: '100+ AI Models', zh: '100+ AI 模型', desc: 'Auto-routed to the best model per task.', zhDesc: '自动选择最佳模型' },
  { icon: Globe, label: '20+ Marketplaces', zh: '20+ 电商平台', desc: 'One platform for every marketplace.', zhDesc: '一个平台覆盖所有渠道' },
  { icon: Zap, label: '1-Click Workflow', zh: '一键工作流', desc: 'From upload to publish, fully automated.', zhDesc: '从上传到发布，全自动完成' },
  { icon: Shield, label: 'Commercial License', zh: '商业授权', desc: 'Full commercial rights for all assets.', zhDesc: '全部素材拥有完整商业授权' },
  { icon: Cloud, label: 'Global CDN', zh: '全球 CDN', desc: 'Fast delivery in 100+ countries.', zhDesc: '100+ 国家极速分发' },
  { icon: Layers, label: 'Batch Workflow', zh: '批量处理', desc: 'Process thousands of products at once.', zhDesc: '数千商品同步处理' },
  { icon: Puzzle, label: 'API Integration', zh: 'API 集成', desc: 'Connect your existing tools and workflows.', zhDesc: '连接你现有的工具和工作流' },
  { icon: Users, label: 'Team Collaboration', zh: '团队协作', desc: 'Multi-user workspace with role management.', zhDesc: '多用户协作，角色权限管理' },
];

export function WhyUs() {
  const { t } = useLang();

  return (
    <section className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-14">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-[#E5E7EB] text-[#7C3AED] text-xs font-semibold mb-6">
            <Sparkles className="w-3.5 h-3.5" />
            {t('Why CommerceOS', '为什么选择 CommerceOS')}
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#111827] mb-4">
            {t('Built for Global Commerce', '为全球电商而建')}
          </h2>
          <p className="text-[#6B7280] text-lg max-w-xl mx-auto">
            {t('Not just another AI tool — a complete operating system for selling globally.', '不只是一个 AI 工具 — 一个完整的全球销售操作系统。')}
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {advantages.map((adv, i) => (
            <div key={i} className="flex flex-col items-center gap-3 p-5 rounded-2xl bg-white border border-[#E5E7EB] hover:border-[#D1D5DB] hover:shadow-sm hover:-translate-y-0.5 transition-all duration-200 text-center">
              <div className="w-10 h-10 rounded-xl bg-[#F5F3FF] flex items-center justify-center">
                <adv.icon className="w-5 h-5 text-[#7C3AED]" />
              </div>
              <div>
                <p className="text-xs font-bold text-[#111827]">{t(adv.label, adv.zh)}</p>
                <p className="text-[10px] text-[#9CA3AF] mt-0.5">{t(adv.desc, adv.zhDesc)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
