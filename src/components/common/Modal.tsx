'use client';

import { useEffect } from 'react';
import { X } from 'lucide-react';

export function Modal({ open, onClose, title, children }: {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}) {
  useEffect(() => {
    if (open) document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-warm-900/30 backdrop-blur-md animate-fade-in-up"
        onClick={onClose}
      />
      {/* Panel */}
      <div
        className="relative w-full max-w-lg max-h-[85vh] overflow-y-auto rounded-2xl bg-white shadow-2xl shadow-brand-900/10 border border-warm-100 animate-fade-in-up"
        style={{ animationDuration: '0.3s' }}
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between px-6 py-4 bg-white/80 backdrop-blur-xl border-b border-warm-100 rounded-t-2xl">
          <h2 className="text-lg font-semibold text-warm-800">{title}</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-xl hover:bg-warm-50 transition-colors"
          >
            <X className="w-4 h-4 text-warm-400" />
          </button>
        </div>
        {/* Content */}
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}
