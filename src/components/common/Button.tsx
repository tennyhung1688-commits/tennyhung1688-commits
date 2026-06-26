'use client';

import { forwardRef } from 'react';
import Link from 'next/link';

type Variant = 'primary' | 'secondary' | 'ghost' | 'danger' | 'glass' | 'accent';
type Size = 'sm' | 'md' | 'lg';

const variants: Record<Variant, string> = {
  primary:
    'bg-gradient-to-br from-brand-600 to-brand-700 text-white shadow-md shadow-brand-500/25 hover:shadow-lg hover:shadow-brand-500/35 hover:-translate-y-0.5 active:translate-y-0 active:shadow-sm',
  secondary:
    'bg-white text-warm-700 border border-warm-200 hover:border-brand-300 hover:text-brand-700 hover:shadow-sm',
  ghost:
    'text-warm-500 hover:text-warm-800 hover:bg-warm-50',
  danger:
    'bg-red-50 text-red-600 hover:bg-red-100',
  glass:
    'bg-white/60 backdrop-blur-md border border-white/40 text-warm-700 hover:bg-white/80 hover:border-brand-200 hover:shadow-md',
  accent:
    'bg-gradient-to-br from-accent-400 to-accent-500 text-warm-900 shadow-md shadow-accent-500/25 hover:shadow-lg hover:shadow-accent-500/35 hover:-translate-y-0.5 active:translate-y-0',
};

const sizes: Record<Size, string> = {
  sm: 'px-3 py-1.5 text-xs rounded-lg',
  md: 'px-5 py-2.5 text-sm rounded-xl',
  lg: 'px-7 py-3.5 text-base rounded-xl',
};

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  loading?: boolean;
  href?: string;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', loading, href, className = '', children, ...props }, ref) => {
    const classes = `inline-flex items-center justify-center gap-2 font-semibold transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed disabled:transform-none ${variants[variant]} ${sizes[size]} ${className}`;

    if (href) {
      return (
        <Link href={href} className={classes}>
          {loading && <span className="w-3.5 h-3.5 border-2 border-current border-t-transparent rounded-full animate-spin" />}
          {children}
        </Link>
      );
    }

    return (
      <button ref={ref} className={classes} {...props}>
        {loading && <span className="w-3.5 h-3.5 border-2 border-current border-t-transparent rounded-full animate-spin" />}
        {children}
      </button>
    );
  }
);
Button.displayName = 'Button';
