export function Card({ children, className = '', hover = true, variant = 'default', onClick }: {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  variant?: 'default' | 'glass' | 'outline';
  onClick?: () => void;
}) {
  const base = 'rounded-2xl transition-all duration-300';
  
  const variants = {
    default: 'border border-warm-100 bg-white shadow-sm',
    glass: 'border border-white/30 bg-white/70 backdrop-blur-xl shadow-md',
    outline: 'border-2 border-warm-100 bg-transparent',
  };

  const hoverClasses = hover
    ? 'hover:border-brand-200 hover:shadow-lg hover:shadow-brand-100/50 hover:-translate-y-0.5'
    : '';

  return (
    <div
      onClick={onClick}
      className={`${base} ${variants[variant]} ${hoverClasses} ${onClick ? 'cursor-pointer' : ''} ${className}`}
    >
      {children}
    </div>
  );
}

export function Badge({ children, variant = 'default' }: { children: React.ReactNode; variant?: 'default' | 'success' | 'warning' | 'accent' }) {
  const colors = {
    default: 'bg-brand-50 text-brand-700',
    success: 'bg-emerald-50 text-emerald-700',
    warning: 'bg-accent-50 text-accent-600',
    accent: 'bg-accent-100 text-accent-600 font-semibold',
  };
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${colors[variant]}`}>
      {children}
    </span>
  );
}

export function Empty({ title, description, icon }: { title: string; description?: string; icon?: React.ReactNode }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="w-16 h-16 rounded-2xl bg-warm-50 flex items-center justify-center mb-4">
        {icon || (
          <svg className="w-8 h-8 text-warm-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
          </svg>
        )}
      </div>
      <h3 className="text-sm font-medium text-warm-600 mb-1">{title}</h3>
      {description && <p className="text-xs text-warm-400">{description}</p>}
    </div>
  );
}
