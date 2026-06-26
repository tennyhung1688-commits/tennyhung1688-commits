/* ===================================================================
   Favicon Icon — dynamically generated
   Replaces the default black-circle icon with CommerceOS purple logo
   =================================================================== */

import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const size = { width: 256, height: 256 };
export const contentType = 'image/png';

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #7C3AED, #6D28D9)',
          borderRadius: 56,
        }}
      >
        <span
          style={{
            fontSize: 80,
            fontWeight: 900,
            color: 'white',
            letterSpacing: '-2px',
          }}
        >
          COS
        </span>
      </div>
    ),
    { ...size }
  );
}
