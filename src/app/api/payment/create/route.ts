/* ===================================================================
   POST /api/payment/create
   Create Stripe PaymentIntent. Returns client_secret for frontend.
   =================================================================== */

import { NextRequest, NextResponse } from 'next/server';
import { paymentService } from '@/lib/payment';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { plan, cycle, channel, userId } = body;

    if (!plan || !channel) {
      return NextResponse.json({ error: 'plan and channel required' }, { status: 400 });
    }

    const validPlans = ['starter', 'pro', 'enterprise'];
    if (!validPlans.includes(plan)) {
      return NextResponse.json({ error: 'Invalid plan' }, { status: 400 });
    }

    const result = await paymentService.createCharge({
      userId: userId || 'demo-user',
      plan,
      cycle: cycle || 'monthly',
      channel: channel || 'card',
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error('Payment creation failed:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Payment creation failed' },
      { status: 500 }
    );
  }
}
