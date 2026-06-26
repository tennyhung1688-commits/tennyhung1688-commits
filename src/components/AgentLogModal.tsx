'use client';

import { X, Check, AlertTriangle, Info, Clock } from 'lucide-react';
import { useLang } from '@/lib/i18n';

interface Agent {
  id: string;
  name: string;
  zh: string;
  icon: string;
  color: string;
  tasks: string[];
  tasksZh: string[];
  status: string;
}

interface Props {
  agent: Agent;
  open: boolean;
  onClose: () => void;
}

const mockLogs = [
  { time: '2026-06-25 23:45', type: 'success', msg: 'Keyword optimization completed: +12% ranking', msgZh: '关键词优化完成：排名提升 12%' },
  { time: '2026-06-25 23:30', type: 'info', msg: 'Competitor analysis scan initiated', msgZh: '竞品分析扫描已启动' },
  { time: '2026-06-25 22:15', type: 'success', msg: 'Review mining extracted 47 new insights', msgZh: '评论挖掘提取了 47 条新洞察' },
  { time: '2026-06-25 20:00', type: 'warning', msg: 'Platform API rate limit approaching (85%)', msgZh: '平台 API 速率限制接近上限 (85%)' },
  { time: '2026-06-25 18:30', type: 'success', msg: 'Listing A/B test completed: Variant B +8% CTR', msgZh: '列表 A/B 测试完成：变体 B 点击率 +8%' },
  { time: '2026-06-25 14:00', type: 'info', msg: 'Scheduled daily analysis starting', msgZh: '每日定时分析启动' },
  { time: '2026-06-25 12:00', type: 'success', msg: 'Price recommendation updated for 23 SKUs', msgZh: '23 个 SKU 的价格推荐已更新' },
  { time: '2026-06-25 09:00', type: 'warning', msg: 'Image optimization queue backlog: 5 pending', msgZh: '图片优化队列积压：5 个待处理' },
];

export function AgentLogModal({ agent, open, onClose }: Props) {
  const { t } = useLang();

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-[8vh]">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />

      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[80vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#E5E7EB] flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center text-xs font-bold text-white" style={{ backgroundColor: agent.color }}>
              {agent.icon}
            </div>
            <div>
              <h2 className="text-base font-bold text-[#111827]">{t(agent.name, agent.zh)}</h2>
              <p className="text-[10px] text-[#9CA3AF]">{t('Activity Log', '活动日志')}</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-[#F3F4F6] text-[#6B7280] transition-all">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Log list */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-2">
          {mockLogs.map((log, i) => (
            <div key={i} className="flex items-start gap-3 p-3 rounded-xl border border-[#E5E7EB] hover:bg-[#FAFAFA] transition-colors">
              {log.type === 'success' && <Check className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />}
              {log.type === 'warning' && <AlertTriangle className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />}
              {log.type === 'info' && <Info className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />}
              <div className="flex-1 min-w-0">
                <p className="text-xs text-[#374151] leading-relaxed">{t(log.msg, log.msgZh)}</p>
                <p className="text-[10px] text-[#9CA3AF] mt-0.5 flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {log.time}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-[#E5E7EB] flex-shrink-0 bg-[#FAFAFA] flex items-center justify-between">
          <span className="text-[10px] text-[#9CA3AF]">{mockLogs.length} {t('entries', '条记录')}</span>
          <button onClick={onClose} className="px-4 py-2 border border-[#E5E7EB] text-[#6B7280] rounded-xl text-xs font-semibold hover:bg-white transition-all">
            {t('Close', '关闭')}
          </button>
        </div>
      </div>
    </div>
  );
}
