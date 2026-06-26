'use client';

import { useState } from 'react';
import { Bot, Globe, TrendingUp, MessageSquare, Target, Zap, Sparkles, ArrowRight, Play, Settings } from 'lucide-react';
import { useLang } from '@/lib/i18n';
import { AgentConfigModal } from '@/components/AgentConfigModal';
import { AgentLogModal } from '@/components/AgentLogModal';

const agents = [
  {
    id: 'amazon', name: 'Amazon Agent', zh: 'Amazon 代理', icon: 'A', color: '#EF9F27',
    tasks: ['Competitor analysis', 'Review mining', 'Keyword optimization', 'Listing A/B testing'],
    tasksZh: ['竞品分析', '评论挖掘', '关键词优化', '列表 A/B 测试'],
    status: 'active',
  },
  {
    id: 'tiktok', name: 'TikTok Agent', zh: 'TikTok 代理', icon: 'T', color: '#000000',
    tasks: ['Trending video analysis', 'Script generation', 'Posting schedule', 'Hashtag optimization'],
    tasksZh: ['热门视频分析', '脚本生成', '发布排期', '标签优化'],
    status: 'active',
  },
  {
    id: 'shopee', name: 'Shopee Agent', zh: 'Shopee 代理', icon: 'Sh', color: '#EF5320',
    tasks: ['SEA market analysis', 'Price recommendation', 'Tag optimization', 'Image localization'],
    tasksZh: ['东南亚市场分析', '价格推荐', '标签优化', '图片本地化'],
    status: 'idle',
  },
  {
    id: 'temu', name: 'Temu Agent', zh: 'Temu 代理', icon: 'Te', color: '#F15A24',
    tasks: ['Platform rules monitor', 'Image auto-adjust', 'Title optimization', 'Price tracking'],
    tasksZh: ['平台规则监控', '图片自动调整', '标题优化', '价格追踪'],
    status: 'idle',
  },
  {
    id: 'taobao', name: 'Taobao Agent', zh: '淘宝代理', icon: '淘', color: '#F97316',
    tasks: ['Keyword ranking', 'Competitor tracking', 'Live stream script', 'Promotion planning'],
    tasksZh: ['关键词排名', '竞品追踪', '直播脚本', '促销规划'],
    status: 'off',
  },
  {
    id: 'general', name: 'General Agent', zh: '通用代理', icon: 'G', color: '#7C3AED',
    tasks: ['Cross-platform sync', 'Performance dashboard', 'AI optimization', 'Alert notifications'],
    tasksZh: ['跨平台同步', '性能仪表盘', 'AI 优化', '预警通知'],
    status: 'active',
  },
];

export default function AIAgentsPage() {
  const { t } = useLang();
  const [selectedAgent, setSelectedAgent] = useState<typeof agents[0] | null>(null);
  const [logAgent, setLogAgent] = useState<typeof agents[0] | null>(null);

  return (
    <div className="px-8 py-8 max-w-7xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-[#111827] tracking-tight">
            {t('AI Agents', 'AI 代理')}
          </h1>
          <p className="text-sm text-[#6B7280] mt-1">
            {t('Autonomous agents for market analysis, content optimization, and business growth.', '自主代理 — 市场分析、内容优化、业务增长。')}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {agents.map(agent => (
          <div key={agent.id} className="bg-white rounded-2xl border border-[#E5E7EB] p-5 hover:shadow-sm transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xs font-bold text-white" style={{ backgroundColor: agent.color }}>
                  {agent.icon}
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[#111827]">{t(agent.name, agent.zh)}</h3>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className={`w-1.5 h-1.5 rounded-full ${
                      agent.status === 'active' ? 'bg-emerald-400' :
                      agent.status === 'idle' ? 'bg-amber-400' : 'bg-[#D1D5DB]'
                    }`} />
                    <span className="text-[10px] text-[#9CA3AF] capitalize">{agent.status}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-1 mb-4">
              {agent.tasksZh.map((task, i) => (
                <div key={i} className="flex items-center gap-2 text-[11px] text-[#6B7280]">
                  <Zap className="w-3 h-3 text-[#9CA3AF] flex-shrink-0" />
                  {t(agent.tasks[i], task)}
                </div>
              ))}
            </div>

            <div className="flex items-center gap-2">
              {agent.status === 'off' ? (
                <button
                  onClick={() => setSelectedAgent(agent)}
                  className="flex-1 py-2 rounded-xl bg-[#7C3AED] text-white text-xs font-semibold hover:bg-[#6D28D9] transition-all flex items-center justify-center gap-1.5">
                  <Play className="w-3 h-3" />
                  {t('Activate', '激活')}
                </button>
              ) : (
                <button
                  onClick={() => setSelectedAgent(agent)}
                  className="flex-1 py-2 rounded-xl bg-white border border-[#E5E7EB] text-[#374151] text-xs font-semibold hover:bg-[#FAFAFA] transition-all flex items-center justify-center gap-1.5">
                  <Settings className="w-3 h-3" />
                  {t('Configure', '配置')}
                </button>
              )}
              <button
                onClick={() => setLogAgent(agent)}
                className="py-2 px-3 rounded-xl bg-[#FAFAFA] border border-[#E5E7EB] text-[#6B7280] text-xs hover:bg-white transition-all">
                {t('View Log', '查看日志')}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Agent Config Modal */}
      {selectedAgent && (
        <AgentConfigModal
          agent={selectedAgent}
          open={!!selectedAgent}
          onClose={() => setSelectedAgent(null)}
        />
      )}

      {/* Activity Log Modal */}
      {logAgent && (
        <AgentLogModal
          agent={logAgent}
          open={!!logAgent}
          onClose={() => setLogAgent(null)}
        />
      )}
    </div>
  );
}
