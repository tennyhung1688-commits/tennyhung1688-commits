'use client';

/* Inline SVG logos for all supported marketplaces */

const logos: Record<string, (size: number) => React.ReactNode> = {
  /* Amazon — smile + arrow */
  amazon: (size) => (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <rect width="48" height="48" rx="12" fill="#1A1A1A"/>
      <path d="M10 28c2-1 6-2 10-1.5s7 3 12 2c3-1 5-3 6-1s-2 4-5 5-10 2-14 0-7-3-9-4.5z" fill="#EF9F27"/>
      <path d="M14 14c0 6 2 12 5 14l-1-12-4-2z" fill="#EF9F27"/>
      <path d="M18 14l4 12c2-1 5-3 6-5l-3-8-7 1z" fill="#EF9F27"/>
      <path d="M28 12c2 2 4 5 3 9l-2-5-1-4z" fill="#EF9F27"/>
    </svg>
  ),

  /* Shopee — orange S + cart */
  shopee: (size) => (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <rect width="48" height="48" rx="12" fill="#EF5320"/>
      <path d="M14 18l2 16c0 1 1 2 2 2h12c1 0 2-1 2-2l2-16h-20z" fill="white"/>
      <circle cx="17" cy="24" r="2" fill="#EF5320"/>
      <circle cx="31" cy="24" r="2" fill="#EF5320"/>
      <path d="M18 12c2 0 3 3 3 6h6c0-3 1-6 3-6" stroke="white" strokeWidth="3" strokeLinecap="round" fill="none"/>
    </svg>
  ),

  /* TikTok Shop — music note */
  tiktok: (size) => (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <rect width="48" height="48" rx="12" fill="#000"/>
      <path d="M30 12v14c0 3-2.5 5.5-5.5 5.5S19 29 19 26s2.5-5.5 5.5-5.5c.5 0 1 .1 1.5.2V15l-3 1v-3l7-1z" fill="#00F2EA"/>
      <path d="M23 26.5c0-1 1-2 2-2s2 1 2 2-1 2-2 2-2-1-2-2z" fill="#FF004F"/>
    </svg>
  ),

  /* Taobao — 淘 icon */
  taobao: (size) => (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <rect width="48" height="48" rx="12" fill="#F97316"/>
      <text x="10" y="34" fontSize="28" fontWeight="800" fill="white" fontFamily="sans-serif">淘</text>
      <circle cx="35" cy="16" r="5" fill="#FFD600"/>
    </svg>
  ),

  /* Lazada — blue heart L */
  lazada: (size) => (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <rect width="48" height="48" rx="12" fill="#0F146A"/>
      <path d="M24 36c-2-3-8-7-12-12 4-5 8-8 12-8s8 3 12 8c-4 5-10 9-12 12z" fill="#F15A24"/>
      <path d="M24 14c-3 0-7 2-10 7 1 3 4 7 10 10 6-3 9-7 10-10-3-5-7-7-10-7z" fill="white"/>
      <text x="20" y="27" fontSize="14" fontWeight="900" fill="#0F146A" fontFamily="sans-serif">L</text>
    </svg>
  ),

  /* Temu — orange icon */
  temu: (size) => (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <rect width="48" height="48" rx="12" fill="#F15A24"/>
      <text x="8" y="35" fontSize="30" fontWeight="900" fill="white" fontFamily="sans-serif" letterSpacing="-2">TEMU</text>
    </svg>
  ),

  /* AliExpress — red cart */
  aliexpress: (size) => (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <rect width="48" height="48" rx="12" fill="#E62E04"/>
      <path d="M10 20l2 14c0 1 1 2 2 2h20c1 0 2-1 2-2l2-14h-28z" fill="white"/>
      <path d="M14 16c3-4 8-5 10-5s7 1 10 5" stroke="white" strokeWidth="3" strokeLinecap="round" fill="none"/>
      <line x1="14" y1="20" x2="34" y2="20" stroke="#E62E04" strokeWidth="2"/>
      <text x="16" y="33" fontSize="8" fontWeight="700" fill="#E62E04" fontFamily="sans-serif">Ali</text>
    </svg>
  ),

  /* Etsy — orange E */
  etsy: (size) => (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <rect width="48" height="48" rx="12" fill="#F1641E"/>
      <text x="11" y="35" fontSize="32" fontWeight="900" fill="white" fontFamily="serif">E</text>
    </svg>
  ),

  /* eBay — colorful */
  ebay: (size) => (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <rect width="48" height="48" rx="12" fill="white" stroke="#E5E7EB" strokeWidth="1"/>
      <text x="4" y="34" fontSize="24" fontWeight="900" fill="#E43137" fontFamily="sans-serif">e</text>
      <text x="14" y="34" fontSize="24" fontWeight="900" fill="#0064D2" fontFamily="sans-serif">B</text>
      <text x="27" y="34" fontSize="24" fontWeight="900" fill="#F5AF02" fontFamily="sans-serif">a</text>
      <text x="36" y="34" fontSize="24" fontWeight="900" fill="#86B817" fontFamily="sans-serif">Y</text>
    </svg>
  ),

  /* Shopify — green bag */
  shopify: (size) => (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <rect width="48" height="48" rx="12" fill="#96BF48"/>
      <path d="M14 20l2 16c0 1 1 2 2 2h12c1 0 2-1 2-2l2-16h-20z" fill="white"/>
      <path d="M18 16l1 4h10l1-4c-3-4-9-4-12 0z" fill="#0B3520"/>
      <circle cx="24" cy="10" r="4" fill="white"/>
    </svg>
  ),

  /* WooCommerce — purple W */
  woocommerce: (size) => (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <rect width="48" height="48" rx="12" fill="#96588A"/>
      <path d="M12 16v16l12-8 12 8V16l-12 8-12-8z" fill="white"/>
    </svg>
  ),

  /* 1688 — orange */
  '1688': (size) => (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <rect width="48" height="48" rx="12" fill="#FF6A00"/>
      <text x="6" y="34" fontSize="24" fontWeight="900" fill="white" fontFamily="sans-serif">1688</text>
    </svg>
  ),
};

export function PlatformLogo({ platform, size = 40 }: { platform: string; size?: number }) {
  const logo = logos[platform];
  if (!logo) {
    // Fallback: colored box with initials
    const colors: Record<string, string> = {
      amazon: '#EF9F27', shopee: '#EF5320', tiktok: '#000', taobao: '#F97316',
      lazada: '#0F146A', temu: '#F15A24', aliexpress: '#E62E04', etsy: '#F1641E',
      ebay: '#0064D2', shopify: '#96BF48', woocommerce: '#96588A', '1688': '#FF6A00',
    };
    const color = colors[platform] || '#7C3AED';
    const label = platform.slice(0, 2).toUpperCase().replace(/[^A-Z0-9]/g, '');
    return (
      <div className="flex items-center justify-center text-white font-bold" style={{ width: size, height: size, borderRadius: 10, backgroundColor: color, fontSize: size * 0.35 }}>
        {label}
      </div>
    );
  }
  return <>{logo(size)}</>;
}
