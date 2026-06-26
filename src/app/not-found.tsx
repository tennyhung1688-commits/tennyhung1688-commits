import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = { title: '404 — CommerceOS' };

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FAFAFA] px-4">
      <div className="text-center max-w-md">
        <div className="w-20 h-20 rounded-2xl bg-[#EEEDFE] flex items-center justify-center mx-auto mb-6">
          <span className="text-3xl font-bold text-[#7C3AED]">404</span>
        </div>
        <h1 className="text-2xl font-bold text-[#111827] mb-2 tracking-tight">
          Page not found
        </h1>
        <p className="text-sm text-[#6B7280] mb-8 leading-relaxed">
          This page doesn&apos;t exist or has been moved. Let AI help you find what you need.
        </p>
        <div className="flex items-center justify-center gap-3">
          <Link
            href="/workspace"
            className="px-6 py-3 bg-[#7C3AED] text-white rounded-xl text-sm font-semibold shadow-sm hover:bg-[#6D28D9] transition-all"
          >
            Go to Workspace
          </Link>
          <Link
            href="/"
            className="px-6 py-3 bg-white border border-[#E5E7EB] text-[#374151] rounded-xl text-sm font-semibold hover:bg-[#FAFAFA] transition-all"
          >
            Home
          </Link>
        </div>
      </div>
    </div>
  );
}
