/* ===================================================================
   Twitter Card Image — reuses the OpenGraph image
   =================================================================== */

import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'CommerceOS — Global AI Commerce Operating System';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image() {
  const { default: ogImage } = await import('./opengraph-image');
  return ogImage();
}
