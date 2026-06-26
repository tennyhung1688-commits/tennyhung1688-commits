'use client';

import { memo } from 'react';

/**
 * Platform Logo — 25 个电商平台真实 Logo
 * 
 * 数据源：
 * - 12 个国际平台使用 simple-icons SVG path
 * - 13 个国内/特色平台使用手绘 SVG
 */

// ── Simple Icons SVG paths ──
import {
  siShopify, siShopee, siTiktok, siEbay, siEtsy, siFacebook,
  siInstagram, siPinterest, siRakuten, siAliexpress,
  siTaobao, siXiaohongshu,
} from 'simple-icons';

const SIMPLE_ICONS: Record<string, { path: string; color: string }> = {
  shopify:   { path: siShopify.path,    color: '#96BF48' },
  shopee:    { path: siShopee.path,     color: '#EE4D2D' },
  tiktok:    { path: siTiktok.path,     color: '#000000' },
  ebay:      { path: siEbay.path,       color: '#E53238' },
  etsy:      { path: siEtsy.path,       color: '#F16521' },
  facebook:  { path: siFacebook.path,   color: '#0866FF' },
  instagram: { path: siInstagram.path,  color: '#E4405F' },
  pinterest: { path: siPinterest.path,  color: '#BD081C' },
  rakuten:   { path: siRakuten.path,    color: '#BF0000' },
  aliexpress:{ path: siAliexpress.path, color: '#E74C28' },
  taobao:    { path: siTaobao.path,     color: '#FF5000' },
  xiaohongshu:{ path: siXiaohongshu.path, color: '#FF2442' },
};

// ── 手绘 SVG paths（simple-icons 未收录的平台）──
const CUSTOM_ICONS: Record<string, { paths: string[]; viewBox: string; color: string }> = {
  amazon: {
    viewBox: '0 0 24 24',
    color: '#FF9900',
    paths: [
      'M2 18.5c3-2 7-3 12-3s9 1 12 3l-1 1c-3-2-7-3-11-3s-8 1-11 3l-1-1z',
      'M12 2C9.5 2 7.5 4 7.5 6.5v3H5v3h2.5v4h3v-4h3v-3h-3v-3c0-1 .8-1.5 1.5-1.5h2V2h-2z',
    ],
  },
  walmart: {
    viewBox: '0 0 24 24',
    color: '#0071DC',
    paths: [
      'M12 2l2 4h4l-3 2 1 4-4-2-4 2 1-4-3-2h4l2-4z',
      'M7 14c-1 0-2 .5-3 1l-1 4h18l-1-4c-1-.5-2-1-3-1H7z',
    ],
  },
  temu: {
    viewBox: '0 0 24 24',
    color: '#FB5B02',
    paths: [
      'M6 4h12c1.5 0 2.5 1 2.5 2.5v11c0 1.5-1 2.5-2.5 2.5H6c-1.5 0-2.5-1-2.5-2.5v-11C3.5 5 4.5 4 6 4z',
      'M8.5 9.5L12 7l3.5 2.5L13.5 12 15 15l-3-2-3 2 1.5-3L8.5 9.5z',
    ],
  },
  lazada: {
    viewBox: '0 0 24 24',
    color: '#0F1470',
    paths: [
      'M12 2L4 8l2 10h12l2-10-8-6z',
      'M12 8l-3 4h2v4h2v-4h2l-3-4z',
    ],
  },
  douyin: {
    viewBox: '0 0 24 24',
    color: '#000000',
    paths: [
      'M19.5 6c-1 0-2 .5-3 1.5V4c0-1-1-2-2-2H14c-3 0-5.5 2-6 5v3c-1 0-2 .8-2 2v6c0 1.5 1 3 2.5 3h7c1.5 0 2.5-1.5 2.5-3v-6c0-1.2-.8-2-2-2v-3c.5 1 1.5 2 3 2h1V6h-1z',
      'M15.5 12v6c0 .8-.5 1.5-1 1.5h-7c-.5 0-1-.7-1-1.5v-6c0-.8.5-1.5 1-1.5h7c.5 0 1 .7 1 1.5z',
    ],
  },
  jd: {
    viewBox: '0 0 24 24',
    color: '#E2231A',
    paths: [
      'M3 5h18v3H5v2h14v3H5v2h14v3H3V5z',
      'M8 2l2 3-2 3-2-3 2-3z',
    ],
  },
  pinduoduo: {
    viewBox: '0 0 24 24',
    color: '#E02E24',
    paths: [
      'M12 2L6 7v5l6 4 6-4V7l-6-5z',
      'M9 10l3 2 3-2v3l-3 2-3-2v-3z',
    ],
  },
  alibaba: {
    viewBox: '0 0 24 24',
    color: '#FF6A00',
    paths: [
      'M2 8h4v4H2V8z',
      'M10 6h4v8h-4V6z',
      'M18 8h4v4h-4V8z',
      'M6 14h12v3H6v-3z',
    ],
  },
  mercadolibre: {
    viewBox: '0 0 24 24',
    color: '#FFE600',
    paths: [
      'M12 2L4 8h16L12 2z',
      'M4 8v10l8-4 8 4V8H4z',
      'M12 12l-4 2v4h8v-4l-4-2z',
    ],
  },
  ozon: {
    viewBox: '0 0 24 24',
    color: '#005BFF',
    paths: [
      'M12 2a10 10 0 100 20 10 10 0 000-20z',
      'M8 8h4v4l4-4h4l-4 4 4 4h-4l-4-4v4H8V8z',
    ],
  },
  coupang: {
    viewBox: '0 0 24 24',
    color: '#FF4D00',
    paths: [
      'M4 6h16l-3 6 3 6H4l3-6-3-6z',
      'M10 12l-2 4h8l-2-4H10z',
    ],
  },
  flipkart: {
    viewBox: '0 0 24 24',
    color: '#2874F0',
    paths: [
      'M12 2l8 5-3 12h-10L4 7l8-5z',
      'M12 8l-4 6h8l-4-6z',
    ],
  },
};

// All platform IDs that have logos
type PlatformId = string;

interface Props {
  id: PlatformId;
  size?: number;
  className?: string;
}

export const PlatformLogo = memo(function PlatformLogo({ id, size = 24, className = '' }: Props) {
  // Check simple-icons
  const simple = SIMPLE_ICONS[id];
  if (simple) {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill={simple.color}
        className={className}
        aria-label={id}
      >
        <path d={simple.path} />
      </svg>
    );
  }

  // Check custom SVGs
  const custom = CUSTOM_ICONS[id];
  if (custom) {
    return (
      <svg
        width={size}
        height={size}
        viewBox={custom.viewBox}
        fill={custom.color}
        className={className}
        aria-label={id}
      >
        {custom.paths.map((d, i) => (
          <path key={i} d={d} />
        ))}
      </svg>
    );
  }

  // Generic — show a colored circle with first letter
  return (
    <div
      className={`flex items-center justify-center rounded-full text-white text-xs font-bold ${className}`}
      style={{ width: size, height: size, background: '#7C3AED' }}
    >
      {id.charAt(0).toUpperCase()}
    </div>
  );
});

/** Get brand color for a platform */
export function getPlatformColor(id: string): string {
  const simple = SIMPLE_ICONS[id];
  if (simple) return simple.color;
  const custom = CUSTOM_ICONS[id];
  if (custom) return custom.color;
  return '#7C3AED';
}

/** Map platform ID aliases */
const ALIASES: Record<string, string> = {
  '1688': 'alibaba',
  'facebook-shop': 'facebook',
  'instagram-shop': 'instagram',
};

export function resolveLogoId(id: string): string {
  return ALIASES[id] || id;
}

/** All 25 platform IDs that have logos */
export const PLATFORM_LOGO_IDS = new Set([
  ...Object.keys(SIMPLE_ICONS),
  ...Object.keys(CUSTOM_ICONS),
  ...Object.keys(ALIASES),
]);
