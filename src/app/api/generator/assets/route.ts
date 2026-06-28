/* GET /api/generator/assets — Fetch user's generation history */
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

function getSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key || url.includes('your-project') || key.includes('your-anon')) return null;
  return createClient(url, key);
}

export async function GET(req: NextRequest) {
  const supabase = getSupabase();
  const userId = req.nextUrl.searchParams.get('userId');

  try {
    if (supabase && userId) {
      const { data: logs } = await supabase
        .from('generation_logs')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })
        .limit(50);

      const assets = (logs || []).map((log: any) => ({
        id: log.id,
        type: log.type as 'image' | 'video',
        name: `${log.type === 'image' ? '生成的图片' : '生成的视频'} — ${new Date(log.created_at).toLocaleDateString('zh-CN')}`,
        date: new Date(log.created_at).toLocaleString('zh-CN'),
        previewUrl: log.result_url || undefined,
        status: log.status,
        prompt: log.prompt,
      }));

      return NextResponse.json({ assets });
    }

    /* Demo mode — return mock assets */
    return NextResponse.json({
      assets: [
        { id: 'd1', type: 'image', name: '白底主图 — Demo', date: '刚刚', previewUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop' },
        { id: 'd2', type: 'image', name: '场景图 1 — Demo', date: '刚刚', previewUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop' },
        { id: 'd3', type: 'image', name: '场景图 2 — Demo', date: '刚刚', previewUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop' },
      ],
    });
  } catch (error) {
    console.error('[Assets API] Error:', error);
    return NextResponse.json({ assets: [], error: 'Failed to load' }, { status: 500 });
  }
}
