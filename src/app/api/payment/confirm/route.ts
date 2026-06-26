/* ===================================================================
   POST /api/payment/confirm
   For Stripe: confirmation happens client-side via stripe.confirmPayment().
   This endpoint is kept for backward compatibility / future payment gateways.
   =================================================================== */

import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  return NextResponse.json({
    success: true,
    message: 'Stripe payments are confirmed client-side. Use stripe.confirmPayment() in the frontend.',
  });
}
