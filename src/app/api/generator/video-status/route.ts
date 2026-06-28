/* GET /api/generator/video-status?videoId=xxx — Poll video generation status */

import { NextRequest, NextResponse } from 'next/server';

const AGNES_BASE = 'https://apihub.agnes-ai.com/v1';

export async function GET(req: NextRequest) {
  const agnesKey = process.env.AGNES_API_KEY;
  if (!agnesKey) return NextResponse.json({ error: 'Not configured' }, { status: 503 });

  const videoId = req.nextUrl.searchParams.get('videoId');
  if (!videoId) return NextResponse.json({ error: 'Missing videoId' }, { status: 400 });

  try {
    const res = await fetch(`${AGNES_BASE}/videos/${videoId}`, {
      headers: { 'Authorization': `Bearer ${agnesKey}` },
    });

    if (!res.ok) {
      return NextResponse.json({ error: 'Failed to get video status' }, { status: 502 });
    }

    const data = await res.json();
    return NextResponse.json({
      status: data.status,
      progress: data.progress,
      videoUrl: data.remixed_from_video_id || null,
      seconds: data.seconds,
      size: data.size,
      error: data.error,
    });
  } catch {
    return NextResponse.json({ error: 'Status check failed' }, { status: 500 });
  }
}
