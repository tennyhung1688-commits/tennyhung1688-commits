'use client';

import Link from 'next/link';
import { Check, Activity, Server, Clock } from 'lucide-react';
import { useLang } from '@/lib/i18n';
import Navbar from '@/components/Navbar';

const services = [
  { name: 'Website', url: 'commerceos.site', status: 'operational' },
  { name: 'API', url: 'api.commerceos.site', status: 'operational' },
  { name: 'AI Generation', path: '/api/generate', status: 'operational' },
  { name: 'Image Generation', path: '/api/generate/image', status: 'operational' },
  { name: 'Video Generation', path: '/api/generate/video', status: 'operational' },
  { name: 'Copywriting', path: '/api/generate/copy', status: 'operational' },
  { name: 'Payments', path: '/api/payment', status: 'operational' },
  { name: 'Webhooks', path: '/api/payment/notify', status: 'operational' },
  { name: 'Documentation', url: 'docs.commerceos.site', status: 'operational' },
];

const incidents = [
  { date: '2026-06-26', title: 'Deployment — Phase 2 & 3 Pages', status: 'resolved', duration: '2 min' },
  { date: '2026-06-25', title: 'DNS Configuration — commerceos.site', status: 'resolved', duration: '5 min' },
  { date: '2026-06-24', title: 'Initial Deployment', status: 'resolved', duration: '1 min' },
];

export default function StatusPage() {
  const { t } = useLang();

  return (
    <>
      <Navbar />
      <div className="pt-24 pb-20">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-600 text-xs font-semibold mb-6">
              <Check className="w-3.5 h-3.5" />
              {t('All Systems Operational', '所有系统正常运行')}
            </span>
            <h1 className="text-4xl font-extrabold text-[#111827] mb-4">
              {t('System Status', '系统状态')}
            </h1>
            <p className="text-[#6B7280] text-lg max-w-md mx-auto">
              {t('Current status of all CommerceOS services.', 'CommerceOS 所有服务的当前状态。')}
            </p>
          </div>

          {/* Services */}
          <div className="bg-white rounded-2xl border border-[#E5E7EB] overflow-hidden mb-8">
            <div className="px-6 py-4 border-b border-[#E5E7EB] bg-[#FAFAFA]">
              <h2 className="text-sm font-bold text-[#111827] flex items-center gap-2">
                <Server className="w-4 h-4" />
                {t('Services', '服务')}
              </h2>
            </div>
            {services.map((svc, i) => (
              <div key={i} className="flex items-center justify-between px-6 py-4 border-b border-[#E5E7EB] last:border-0 hover:bg-[#FAFAFA] transition-colors">
                <div>
                  <p className="text-sm font-medium text-[#111827]">{svc.name}</p>
                  <p className="text-xs text-[#9CA3AF] font-mono">{svc.url || svc.path}</p>
                </div>
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-600">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  {t('Operational', '正常')}
                </span>
              </div>
            ))}
          </div>

          {/* Incidents */}
          <div className="bg-white rounded-2xl border border-[#E5E7EB] overflow-hidden">
            <div className="px-6 py-4 border-b border-[#E5E7EB] bg-[#FAFAFA]">
              <h2 className="text-sm font-bold text-[#111827] flex items-center gap-2">
                <Activity className="w-4 h-4" />
                {t('Recent Incidents', '近期事件')}
              </h2>
            </div>
            {incidents.map((inc, i) => (
              <div key={i} className="flex items-center justify-between px-6 py-4 border-b border-[#E5E7EB] last:border-0">
                <div>
                  <p className="text-sm text-[#111827]">{inc.title}</p>
                  <p className="text-xs text-[#9CA3AF]">{inc.date}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-[#9CA3AF] flex items-center gap-1"><Clock className="w-3 h-3" />{inc.duration}</span>
                  <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">{t('Resolved', '已解决')}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
