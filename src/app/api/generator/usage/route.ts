import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { QUOTAS, type UsageData, type PlanType } from '@/lib/quota';

// GET /api/generator/usage — 获取当前用户用量
export async function GET() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });

  const { data: profile } = await supabase
    .from('profiles')
    .select('trial_claimed, plan, images_used, videos_used, membership_expiry')
    .eq('id', user.id)
    .single();

  if (!profile) return NextResponse.json({ error: 'Profile not found' }, { status: 404 });

  const now = Date.now();
  const expiry = profile.membership_expiry ? new Date(profile.membership_expiry).getTime() : null;
  const planValid = profile.plan && expiry && now < expiry ? profile.plan : null;

  let quota = { images: 0, videos: 0 };
  let planDisplay: UsageData['plan'] = null;

  if (planValid) {
    quota = QUOTAS[planValid as keyof typeof QUOTAS];
    planDisplay = planValid as PlanType;
  } else if (!profile.trial_claimed) {
    quota = QUOTAS.trial;
  }

  const data: UsageData = {
    trialClaimed: profile.trial_claimed,
    plan: planDisplay,
    imagesUsed: profile.images_used,
    videosUsed: profile.videos_used,
    imagesTotal: quota.images,
    videosTotal: quota.videos,
    membershipExpiry: profile.membership_expiry,
    freeTrialAvailable: !profile.trial_claimed,
    canGenerateImage: !profile.trial_claimed || (planValid ? profile.images_used < quota.images : profile.trial_claimed && profile.images_used < QUOTAS.trial.images),
    canGenerateVideo: !profile.trial_claimed || (planValid ? profile.videos_used < quota.videos : profile.trial_claimed && profile.videos_used < QUOTAS.trial.videos),
  };

  return NextResponse.json(data);
}

// POST /api/generator/usage — 领取免费试用
export async function POST() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });

  const { data: profile } = await supabase
    .from('profiles')
    .select('trial_claimed')
    .eq('id', user.id)
    .single();

  if (!profile) return NextResponse.json({ error: 'Profile not found' }, { status: 404 });

  if (profile.trial_claimed) {
    return NextResponse.json({ error: 'Trial already claimed' }, { status: 400 });
  }

  await supabase
    .from('profiles')
    .update({ trial_claimed: true, images_used: 0, videos_used: 0 })
    .eq('id', user.id);

  return NextResponse.json({ success: true, trialClaimed: true });
}
