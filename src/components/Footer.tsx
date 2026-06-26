'use client';

import Link from 'next/link';
import { useLang } from '@/lib/i18n';

export default function Footer() {
  const { t } = useLang();
  return (
    <footer className="bg-white border-t border-[#E5E7EB]">
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Logo + Tagline */}
          <div className="flex flex-col items-center sm:items-start gap-1">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-[#7C3AED] flex items-center justify-center shadow-sm">
                <span className="text-white text-[9px] font-bold tracking-tight">COS</span>
              </div>
              <span className="text-base font-bold text-[#111827]">CommerceOS</span>
            </Link>
            <p className="text-xs text-[#6B7280] mt-0.5">
              {t('Global AI E-commerce Operating System', '全球 AI 电商操作系统')}
            </p>
          </div>

          {/* Links */}
          <div className="flex items-center gap-6 text-xs text-[#6B7280]">
            <Link href="/workspace" className="hover:text-[#111827] transition-colors">{t('Workspace', '工作台')}</Link>
            <Link href="/skills" className="hover:text-[#111827] transition-colors">{t('Skills', 'Skills')}</Link>
            <Link href="/pricing" className="hover:text-[#111827] transition-colors">{t('Pricing', '定价')}</Link>
            <Link href="/templates" className="hover:text-[#111827] transition-colors">{t('Templates', '模板')}</Link>
            <span className="text-[#D1D5DB]">|</span>
            <span>&copy; 2026 CommerceOS. All Rights Reserved.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
