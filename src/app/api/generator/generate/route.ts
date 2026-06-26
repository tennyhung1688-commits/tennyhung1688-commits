import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { QUOTAS } from '@/lib/quota';

// POST /api/generator/generate — 使用一次生成额度
export async function POST(req: NextRequest) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });

  const body = await req.json();
  const { type, platform, style, product } = body as {
    type: 'image' | 'video';
    platform?: string;
    style?: string;
    product?: string;
  };

  if (!type || !['image', 'video'].includes(type)) {
    return NextResponse.json({ error: 'Invalid type' }, { status: 400 });
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('trial_claimed, plan, images_used, videos_used, membership_expiry')
    .eq('id', user.id)
    .single();

  if (!profile) return NextResponse.json({ error: 'Profile not found' }, { status: 404 });

  // 判断额度
  const now = Date.now();
  const expiry = profile.membership_expiry ? new Date(profile.membership_expiry).getTime() : null;
  const planValid = profile.plan && expiry && now < expiry ? profile.plan : null;

  let quota = { images: 0, videos: 0 };

  if (planValid) {
    quota = QUOTAS[planValid as keyof typeof QUOTAS];
  } else if (!profile.trial_claimed) {
    // 自动领取免费试用
    await supabase
      .from('profiles')
      .update({ trial_claimed: true, images_used: 0, videos_used: 0 })
      .eq('id', user.id);
    quota = QUOTAS.trial;
    profile.images_used = 0;
    profile.videos_used = 0;
  } else {
    return NextResponse.json({ error: 'No credits available. Please upgrade.' }, { status: 403 });
  }

  const used = type === 'image' ? profile.images_used : profile.videos_used;
  const limit = type === 'image' ? quota.images : quota.videos;

  if (used >= limit) {
    return NextResponse.json({ error: `${type} quota exceeded` }, { status: 403 });
  }

  // 扣除额度
  const updateField = type === 'image' ? 'images_used' : 'videos_used';
  await supabase
    .from('profiles')
    .update({ [updateField]: used + 1 })
    .eq('id', user.id);

  // 记录生成日志
  await supabase
    .from('generation_logs')
    .insert({
      user_id: user.id,
      type,
      platform: platform || null,
      style: style || null,
      product_name: product || null,
    });

  return NextResponse.json({
    success: true,
    used: used + 1,
    limit,
    remaining: limit - (used + 1),
  });
}
