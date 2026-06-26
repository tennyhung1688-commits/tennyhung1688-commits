'use client';

import Link from 'next/link';
import { useLang } from '@/lib/i18n';

export default function LegalLayout({ children }: { children: React.ReactNode }) {
  const { t } = useLang();
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="h-15 flex items-center px-6 border-b border-[#E5E7EB] bg-white sticky top-0 z-50">
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-7 h-7 rounded-lg bg-[#7C3AED] flex items-center justify-center shadow-sm">
            <span className="text-white text-[9px] font-bold tracking-tight">COS</span>
          </div>
          <span className="font-bold text-base text-[#111827] tracking-tight">CommerceOS</span>
        </Link>
      </header>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-6 py-12">
        {children}
      </div>

      {/* Footer */}
      <footer className="border-t border-[#E5E7EB] py-8 text-center text-xs text-[#9CA3AF]">
        <div className="flex items-center justify-center gap-4 mb-2">
          <Link href="/legal/terms" className="hover:text-[#6B7280] transition-colors">
            {t('Terms of Service', '服务条款')}
          </Link>
          <Link href="/legal/privacy" className="hover:text-[#6B7280] transition-colors">
            {t('Privacy Policy', '隐私政策')}
          </Link>
        </div>
        <p>&copy; 2026 CommerceOS. All Rights Reserved.</p>
      </footer>
    </div>
  );
}
