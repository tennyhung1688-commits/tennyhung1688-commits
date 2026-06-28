import { Suspense } from 'react';

export default function NewProjectLayout({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={<div className="px-8 py-8 max-w-4xl mx-auto text-center text-[#9CA3AF]">Loading...</div>}>
      {children}
    </Suspense>
  );
}
