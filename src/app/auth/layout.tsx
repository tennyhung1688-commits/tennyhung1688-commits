'use client';

import Link from 'next/link';
import { Globe } from 'lucide-react';
import { useLang } from '@/lib/i18n';
import { AuthProvider } from '@/lib/auth';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  const { lang, setLang, t } = useLang();

  return (
    <AuthProvider>
    <div className="min-h-screen bg-[#FAFAFA] flex flex-col">
      {/* Minimal header */}
      <header className="h-15 flex items-center justify-between px-6 border-b border-[#E5E7EB] bg-white/80 backdrop-blur-xl sticky top-0 z-50">
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-7 h-7 rounded-lg bg-[#7C3AED] flex items-center justify-center shadow-sm group-hover:shadow-md transition-all duration-300">
            <span className="text-white text-[9px] font-bold tracking-tight">COS</span>
          </div>
          <span className="font-bold text-base text-[#111827] tracking-tight">CommerceOS</span>
        </Link>

        <div className="flex items-center gap-4">
          <button
            onClick={() => setLang(lang === 'en' ? 'zh' : 'en')}
            className="inline-flex items-center gap-1.5 text-xs text-[#6B7280] hover:text-[#111827] transition-colors px-3 py-1.5 rounded-lg hover:bg-white border border-transparent hover:border-[#E5E7EB]"
          >
            <Globe className="w-3.5 h-3.5" />
            {lang === 'en' ? '中文' : 'EN'}
          </button>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 flex items-center justify-center px-4 py-12">
        {children}
      </main>

      {/* Minimal footer */}
      <footer className="py-6 text-center text-xs text-[#9CA3AF]">
        &copy; 2026 CommerceOS. Global AI Commerce Operating System.
      </footer>
    </div>
    </AuthProvider>
  );
}
