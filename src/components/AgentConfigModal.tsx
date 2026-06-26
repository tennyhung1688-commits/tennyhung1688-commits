'use client';

import { useState } from 'react';
import {
  X, Play, Clock, Globe, Settings, Activity,
  MessageSquare, Zap, Bell, RotateCw, Save,
  ChevronRight, Pause, StopCircle
} from 'lucide-react';
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

export function AgentConfigModal({ agent, open, onClose }: Props) {
  const { t } = useLang();
  const [schedule, setSchedule] = useState('daily');
  const [frequency, setFrequency] = useState('medium');
  const [autoApprove, setAutoApprove] = useState(false);
  const [notifOnComplete, setNotifOnComplete] = useState(true);
  const [notifOnError, setNotifOnError] = useState(true);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-[8vh]">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />

      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[85vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#E5E7EB] flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center text-xs font-bold text-white" style={{ backgroundColor: agent.color }}>
              {agent.icon}
            </div>
            <div>
              <h2 className="text-base font-bold text-[#111827]">{t(agent.name, agent.zh)}</h2>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className={`w-1.5 h-1.5 rounded-full ${
                  agent.status === 'active' ? 'bg-emerald-400' :
                  agent.status === 'idle' ? 'bg-amber-400' : 'bg-[#D1D5DB]'
                }`} />
                <span className="text-[10px] text-[#9CA3AF] capitalize">{agent.status}</span>
              </div>
            </div>
          </div>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-[#F3F4F6] text-[#6B7280] transition-all">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-5">
          {/* Status control */}
          <div>
            <h3 className="text-sm font-bold text-[#111827] mb-3 flex items-center gap-1.5">
              <Activity className="w-3.5 h-3.5 text-[#6B7280]" />
              {t('Agent Status', '代理状态')}
            </h3>
            <div className="flex items-center gap-2">
              {['active', 'idle', 'off'].map(s => (
                <button key={s} className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                  (agent.status === s)
                    ? s === 'active' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                    : s === 'idle' ? 'bg-amber-50 text-amber-700 border border-amber-200'
                    : 'bg-[#F5F5F5] text-[#9CA3AF] border border-[#E5E7EB]'
                    : 'bg-[#F5F5F5] text-[#6B7280] border border-[#E5E7EB] hover:border-[#D1D5DB]'
                }`}>
                  {s === 'active' ? <Play className="w-3 h-3 inline mr-1" />
                   : s === 'idle' ? <Pause className="w-3 h-3 inline mr-1" />
                   : <StopCircle className="w-3 h-3 inline mr-1" />}
                  {s.charAt(0).toUpperCase() + s.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Tasks */}
          <div>
            <h3 className="text-sm font-bold text-[#111827] mb-3 flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-[#6B7280]" />
              {t('Tasks', '任务')}
            </h3>
            <div className="space-y-1.5">
              {agent.tasksZh.map((task, i) => (
                <label key={i} className="flex items-center gap-2.5 p-2.5 rounded-lg hover:bg-[#FAFAFA] cursor-pointer transition-colors">
                  <input type="checkbox" defaultChecked className="w-4 h-4 rounded border-[#D1D5DB] text-[#7C3AED] focus:ring-[#7C3AED]/30" />
                  <span className="text-xs text-[#374151]">{t(agent.tasks[i], task)}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Schedule */}
          <div>
            <h3 className="text-sm font-bold text-[#111827] mb-3 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-[#6B7280]" />
              {t('Schedule', '执行计划')}
            </h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs text-[#374151]">{t('Frequency', '频率')}</span>
                <select value={schedule} onChange={e => setSchedule(e.target.value)}
                  className="w-36 px-3 py-1.5 border border-[#E5E7EB] rounded-lg text-xs bg-white outline-none">
                  <option value="hourly">{t('Hourly', '每小时')}</option>
                  <option value="daily">{t('Daily', '每天')}</option>
                  <option value="weekly">{t('Weekly', '每周')}</option>
                  <option value="realtime">{t('Real-time', '实时')}</option>
                </select>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-[#374151]">{t('Processing Speed', '处理速度')}</span>
                <select value={frequency} onChange={e => setFrequency(e.target.value)}
                  className="w-36 px-3 py-1.5 border border-[#E5E7EB] rounded-lg text-xs bg-white outline-none">
                  <option value="low">{t('Low', '慢速')}</option>
                  <option value="medium">{t('Medium', '中速')}</option>
                  <option value="high">{t('High', '快速')}</option>
                </select>
              </div>
            </div>
          </div>

          {/* Auto-approve */}
          <div className="flex items-center justify-between p-3 rounded-xl border border-[#E5E7EB]">
            <div>
              <p className="text-xs font-medium text-[#111827]">{t('Auto-approve Output', '自动批准输出')}</p>
              <p className="text-[10px] text-[#9CA3AF]">{t('Publish generated content without review', '跳过审核直接发布生成内容')}</p>
            </div>
            <Toggle checked={autoApprove} onChange={setAutoApprove} />
          </div>

          {/* Notifications */}
          <div>
            <h3 className="text-sm font-bold text-[#111827] mb-3 flex items-center gap-1.5">
              <Bell className="w-3.5 h-3.5 text-[#6B7280]" />
              {t('Notifications', '通知')}
            </h3>
            <div className="space-y-2">
              <div className="flex items-center justify-between p-2.5 rounded-lg border border-[#E5E7EB]">
                <span className="text-xs text-[#374151]">{t('On task complete', '任务完成时')}</span>
                <Toggle checked={notifOnComplete} onChange={setNotifOnComplete} />
              </div>
              <div className="flex items-center justify-between p-2.5 rounded-lg border border-[#E5E7EB]">
                <span className="text-xs text-[#374151]">{t('On error', '出错时')}</span>
                <Toggle checked={notifOnError} onChange={setNotifOnError} />
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-6 py-3 border-t border-[#E5E7EB] flex-shrink-0 bg-[#FAFAFA]">
          <button className="text-xs text-[#6B7280] hover:text-[#111827] flex items-center gap-1 transition-colors">
            <RotateCw className="w-3.5 h-3.5" />
            {t('Reset', '重置')}
          </button>
          <div className="flex items-center gap-2">
            <button onClick={onClose} className="px-4 py-2 border border-[#E5E7EB] text-[#6B7280] rounded-xl text-xs font-semibold hover:bg-white transition-all">
              {t('Cancel', '取消')}
            </button>
            <button className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#7C3AED] text-white rounded-xl text-xs font-semibold hover:bg-[#6D28D9] transition-all">
              <Save className="w-3.5 h-3.5" />
              {t('Save Config', '保存配置')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Toggle({ checked, onChange }: { checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors duration-200 ${
        checked ? 'bg-[#7C3AED]' : 'bg-[#D1D5DB]'
      }`}
    >
      <span
        className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform duration-200 shadow-sm ${
          checked ? 'translate-x-[18px]' : 'translate-x-[3px]'
        }`}
      />
    </button>
  );
}
