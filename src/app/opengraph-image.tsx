/* ===================================================================
   OpenGraph Image — dynamically generated share card
   Used by: Facebook, Twitter, LinkedIn, WhatsApp, Telegram, etc.

   Next.js automatically serves this at /opengraph-image
   (and /twitter-image via the twitter-image.tsx file)
   =================================================================== */

import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'CommerceOS — Global AI Commerce Operating System';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #0F172A 0%, #1E1B4B 50%, #0F172A 100%)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Background glow */}
        <div
          style={{
            position: 'absolute',
            top: -200,
            right: -200,
            width: 600,
            height: 600,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(124,58,237,0.3) 0%, transparent 70%)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: -300,
            left: -200,
            width: 700,
            height: 700,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(139,92,246,0.2) 0%, transparent 70%)',
          }}
        />

        {/* Logo mark */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 120,
            height: 120,
            borderRadius: 28,
            background: 'linear-gradient(135deg, #7C3AED, #6D28D9)',
            boxShadow: '0 20px 60px rgba(124,58,237,0.4)',
            marginBottom: 32,
          }}
        >
          <span
            style={{
              fontSize: 32,
              fontWeight: 800,
              color: 'white',
              letterSpacing: '-1px',
            }}
          >
            COS
          </span>
        </div>

        {/* Title */}
        <div
          style={{
            display: 'flex',
            fontSize: 64,
            fontWeight: 800,
            color: 'white',
            letterSpacing: '-2px',
            marginBottom: 16,
          }}
        >
          CommerceOS
        </div>

        {/* Subtitle */}
        <div
          style={{
            fontSize: 28,
            color: '#A78BFA',
            fontWeight: 500,
            letterSpacing: '-0.5px',
          }}
        >
          Global AI Commerce Operating System
        </div>

        {/* Tagline */}
        <div
          style={{
            display: 'flex',
            marginTop: 40,
            padding: '14px 40px',
            borderRadius: 100,
            border: '1px solid rgba(139,92,246,0.3)',
            fontSize: 22,
            color: '#C4B5FD',
            fontWeight: 500,
          }}
        >
          One Platform. Every Marketplace. Powered by AI.
        </div>
      </div>
    ),
    { ...size }
  );
}
