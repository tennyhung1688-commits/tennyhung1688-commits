import { Check } from 'lucide-react';
import Link from 'next/link';

export default function CheckoutSuccessPage() {
  return (
    <div className="min-h-screen bg-[#FAFAFA] flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl border border-[#E5E7EB] p-10 max-w-md w-full text-center shadow-sm">
        <div className="w-16 h-16 rounded-2xl bg-emerald-100 flex items-center justify-center mx-auto mb-4">
          <Check className="w-8 h-8 text-emerald-500" />
        </div>
        <h1 className="text-xl font-bold text-[#111827] mb-2">Payment Successful!</h1>
        <p className="text-sm text-[#6B7280] mb-6">Your plan has been activated. Start generating now.</p>
        <Link href="/workspace" className="inline-flex items-center gap-2 px-6 py-3 bg-[#7C3AED] text-white rounded-xl text-sm font-bold shadow-lg shadow-[#7C3AED]/25 hover:bg-[#6D28D9] transition-all">
          Go to Workspace
        </Link>
      </div>
    </div>
  );
}
