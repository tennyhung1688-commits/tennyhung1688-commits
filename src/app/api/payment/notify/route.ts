/* ===================================================================
   POST /api/payment/notify
   Stripe Webhook — called when payment succeeds/fails.

   Test locally: stripe listen --forward-to localhost:3456/api/payment/notify
   =================================================================== */

import { NextRequest, NextResponse } from 'next/server';
import { paymentService, PLAN_QUOTAS } from '@/lib/payment';

export async function POST(request: NextRequest) {
  const rawBody = await request.text();
  const signature = request.headers.get('stripe-signature') || '';

  // Verify webhook
  const event = paymentService.verifyWebhook(rawBody, signature);
  if (!event) {
    console.log('[Stripe Webhook] Signature verification failed or not configured. Raw body:', rawBody.slice(0, 200));
    return NextResponse.json({ status: 'received' }, { status: 200 });
  }

  console.log(`[Stripe Webhook] ${event.type}`);

  switch (event.type) {
    case 'payment_intent.succeeded': {
      const pi = event.data.object as any;
      const { order_no, plan, cycle, userId, workspaceId } = pi.metadata || {};

      const now = new Date();
      const expiresAt = new Date(now);
      if (cycle === 'yearly') expiresAt.setFullYear(expiresAt.getFullYear() + 1);
      else expiresAt.setMonth(expiresAt.getMonth() + 1);

      console.log(`[Payment] ✅ ${plan} (${cycle}) for ${userId}`);
      console.log(`[Payment] Order: ${order_no}, Amount: ¥${(pi.amount / 100).toFixed(2)}`);
      console.log(`[Payment] Expires: ${expiresAt.toISOString()}`);
      console.log(`[Payment] Quota: images=${PLAN_QUOTAS[plan]?.images}, videos=${PLAN_QUOTAS[plan]?.videos}`);

      // TODO: Update database
      // - Upsert Subscription: plan, status='active', expiresAt
      // - Reset Credits to PLAN_QUOTAS[plan]
      // - Create Payment record: orderNo, channel, amount, status='paid'
      break;
    }
    case 'payment_intent.payment_failed': {
      const pi = event.data.object as any;
      console.log(`[Payment] ❌ Failed: ${pi.metadata?.order_no}`);
      // TODO: Update Payment record status = 'failed'
      break;
    }
  }

  return NextResponse.json({ status: 'ok' });
}
