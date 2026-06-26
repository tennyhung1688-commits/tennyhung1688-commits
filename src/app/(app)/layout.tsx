'use client';

import AppSidebar from '@/components/AppSidebar';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      <AppSidebar />
      {/* Main content offset by sidebar width */}
      <div className="pl-60">
        <main className="min-h-screen">
          {children}
        </main>
      </div>
    </div>
  );
}
