'use client';

import { useState } from 'react';
import { BookOpen, ChevronDown, ChevronRight, X } from 'lucide-react';
import { useLang } from '@/lib/i18n';

interface Step {
  title: string;
  zh: string;
  desc: string;
  descZh: string;
}

export default function QuickGuide({ title, zh, steps, defaultOpen = false }: {
  title: string;
  zh: string;
  steps: Step[];
  defaultOpen?: boolean;
}) {
  const { t } = useLang();
  const [open, setOpen] = useState(defaultOpen);
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <div className="mb-6 bg-gradient-to-r from-[#EEEDFE] to-[#F5F3FF] border border-[#CECBF6] rounded-2xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center gap-3 px-5 py-4 text-left hover:bg-white/30 transition-colors"
      >
        <BookOpen className="w-5 h-5 text-[#7C3AED]" />
        <div className="flex-1">
          <h3 className="text-sm font-bold text-[#3C3489]">{t(title, zh)}</h3>
          <p className="text-[11px] text-[#7F77DD] mt-0.5">
            {t(`${steps.length} steps to get started`, `${steps.length} 步快速上手`)}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span
            onClick={e => { e.stopPropagation(); setDismissed(true); }}
            className="p-1 rounded-lg hover:bg-[#7C3AED]/10 text-[#7F77DD] transition-colors cursor-pointer"
            role="button"
            tabIndex={0}
            onKeyDown={e => { if (e.key === 'Enter') { e.stopPropagation(); setDismissed(true); } }}
          >
            <X className="w-4 h-4" />
          </span>
          {open ? <ChevronDown className="w-5 h-5 text-[#7C3AED]" /> : <ChevronRight className="w-5 h-5 text-[#7F77DD]" />}
        </div>
      </button>

      {open && (
        <div className="px-5 pb-5 space-y-3">
          {steps.map((step, i) => (
            <div key={i} className="flex gap-4 p-3 rounded-xl bg-white/60">
              <div className="w-6 h-6 rounded-full bg-[#7C3AED] flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-white text-[11px] font-bold">{i + 1}</span>
              </div>
              <div>
                <p className="text-xs font-semibold text-[#111827]">{t(step.title, step.zh)}</p>
                <p className="text-[11px] text-[#6B7280] mt-0.5 leading-relaxed">{t(step.desc, step.descZh)}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
