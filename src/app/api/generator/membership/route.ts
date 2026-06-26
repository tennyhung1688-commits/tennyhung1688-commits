import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

// POST /api/generator/membership — 激活会员
export async function POST(req: NextRequest) {
  const supabase = await createClient();
  if (!supabase) {
    return NextResponse.json({ error: 'Auth service not configured' }, { status: 503 });
  }
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });

  const body = await req.json();
  const { plan, days = 30 } = body as { plan: string; days?: number };

  if (!['basic', 'pro', 'enterprise'].includes(plan)) {
    return NextResponse.json({ error: 'Invalid plan' }, { status: 400 });
  }

  const membershipExpiry = new Date(Date.now() + days * 24 * 60 * 60 * 1000).toISOString();

  await supabase
    .from('profiles')
    .update({
      plan,
      membership_expiry: membershipExpiry,
      images_used: 0,
      videos_used: 0,
    })
    .eq('id', user.id);

  return NextResponse.json({
    success: true,
    plan,
    membershipExpiry,
  });
}
