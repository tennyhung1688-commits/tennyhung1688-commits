'use client';

import Link from 'next/link';
import { Globe, ChevronDown } from 'lucide-react';
import { useLang } from '@/lib/i18n';

export default function Navbar() {
  const { lang, setLang, t } = useLang();

  return (
    <nav className="fixed top-0 inset-x-0 z-50 bg-white/70 backdrop-blur-xl border-b border-warm-100/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-15 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-lg bg-[#7C3AED] flex items-center justify-center shadow-sm group-hover:shadow-md transition-all duration-300">
            <span className="text-white text-[10px] font-bold tracking-tight">COS</span>
          </div>
          <span className="font-bold text-lg text-warm-800 tracking-tight">
            CommerceOS
          </span>
          <span className="text-[10px] text-warm-400 font-medium hidden lg:block -ml-1 mt-0.5">
            Global AI Commerce Operating System
          </span>
        </Link>

        {/* Nav Links */}
        <div className="hidden md:flex items-center gap-0.5">
          <Link href="/marketplaces" className="px-3 py-2 text-sm font-medium text-warm-500 hover:text-warm-800 rounded-lg hover:bg-warm-50 transition-all">
            {t('Marketplaces', '平台')}
          </Link>
          <Link href="/solutions" className="px-3 py-2 text-sm font-medium text-warm-500 hover:text-warm-800 rounded-lg hover:bg-warm-50 transition-all">
            {t('Solutions', '方案')}
          </Link>
          <Link href="/agents" className="px-3 py-2 text-sm font-medium text-warm-500 hover:text-warm-800 rounded-lg hover:bg-warm-50 transition-all">
            {t('Agents', 'Agents')}
          </Link>
          <Link href="/pricing" className="px-3 py-2 text-sm font-medium text-warm-500 hover:text-warm-800 rounded-lg hover:bg-warm-50 transition-all">
            {t('Pricing', '定价')}
          </Link>
          <Link href="/developers" className="px-3 py-2 text-sm font-medium text-warm-500 hover:text-warm-800 rounded-lg hover:bg-warm-50 transition-all">
            {t('Developers', '开发者')}
          </Link>
          <Link href="/docs" className="px-3 py-2 text-sm font-medium text-warm-500 hover:text-warm-800 rounded-lg hover:bg-warm-50 transition-all">
            {t('Docs', '文档')}
          </Link>
          <Link href="/blog" className="px-3 py-2 text-sm font-medium text-warm-500 hover:text-warm-800 rounded-lg hover:bg-warm-50 transition-all">
            {t('Blog', '博客')}
          </Link>

          <div className="w-px h-5 bg-warm-200 mx-2" />

          <Link
            href="/auth/login"
            className="px-3 py-2 text-sm font-medium text-warm-500 hover:text-warm-800 rounded-lg hover:bg-warm-50 transition-all"
          >
            {t('Sign In', '登录')}
          </Link>
          <Link
            href="/auth/register"
            className="px-4 py-2 bg-[#7C3AED] text-white rounded-lg text-sm font-semibold shadow-sm hover:bg-[#6D28D9] hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300"
          >
            {t('Dashboard', '控制台')}
          </Link>

          <button
            onClick={() => setLang(lang === 'en' ? 'zh' : 'en')}
            className="ml-2 p-2 text-warm-400 hover:text-warm-600 rounded-lg hover:bg-warm-50 transition-all"
          >
            <Globe className="w-4 h-4" />
          </button>
        </div>

        {/* Mobile: compact */}
        <div className="flex md:hidden items-center gap-2">
          <Link
            href="/auth/login"
            className="px-3 py-1.5 text-xs font-medium text-warm-500 hover:text-warm-800 rounded-lg hover:bg-warm-50 transition-colors"
          >
            {t('Sign In', '登录')}
          </Link>
          <Link
            href="/auth/register"
            className="px-3.5 py-1.5 bg-[#7C3AED] text-white rounded-lg text-xs font-semibold hover:bg-[#6D28D9] transition-colors"
          >
            {t('Dashboard', '控制台')}
          </Link>
          <button
            onClick={() => setLang(lang === 'en' ? 'zh' : 'en')}
            className="p-2 text-warm-400 hover:text-warm-600 rounded-lg hover:bg-warm-50 transition-all"
          >
            <Globe className="w-4 h-4" />
          </button>
        </div>
      </div>
    </nav>
  );
}
