/* ===================================================================
   CommerceOS Unified Payment Service
   Stripe as primary gateway (no company license needed).

   npx stripe listen --forward-to localhost:3456/api/payment/notify
   =================================================================== */

import Stripe from 'stripe';

/* ── Plan pricing (in cents 分) ── */
export const PLAN_PRICES: Record<string, number> = {
  starter: 0,
  creator: 5900,
  business: 19900,
  enterprise: 99900,
};

export const YEARLY_DISCOUNT = 0.67;

export interface CreateChargeParams {
  userId: string;
  workspaceId?: string;
  plan: string;
  cycle: 'monthly' | 'yearly';
  channel: 'card' | 'alipay' | 'wechat' | 'bank';
  clientIp?: string;
}

export interface ChargeResult {
  id: string;
  orderNo: string;
  amount: number;
  currency: string;
  channel: string;
  clientSecret?: string; // Stripe: PaymentIntent client_secret
  status: 'pending' | 'paid' | 'failed';
}

/* ── Plan Quota Mapping ── */
export interface PlanQuota {
  images: number;
  videos: number;
  platforms: number;
}

export const PLAN_QUOTAS: Record<string, PlanQuota> = {
  free:       { images: 5,    videos: 1,   platforms: 1 },
  creator:    { images: 200,  videos: 15,  platforms: 3 },
  business:   { images: 500,  videos: 60,  platforms: 10 },
  enterprise: { images: 9999, videos: 9999, platforms: 9999 },
};

/* ── Calculate price ── */
export function calculateAmount(plan: string, cycle: 'monthly' | 'yearly'): number {
  const base = PLAN_PRICES[plan] || 0;
  if (cycle === 'yearly') return Math.round(base * YEARLY_DISCOUNT);
  return base;
}

/* ── Payment Service ── */
class PaymentService {
  private stripe: Stripe | null = null;
  private isConfigured = false;

  constructor() {
    const secretKey = process.env.STRIPE_SECRET_KEY;
    if (secretKey) {
      this.stripe = new Stripe(secretKey, { apiVersion: '2025-06-16.basil' as any });
      this.isConfigured = true;
    }
  }

  isReady(): boolean {
    return this.isConfigured;
  }

  /** Create a Stripe PaymentIntent */
  async createCharge(params: CreateChargeParams): Promise<ChargeResult> {
    if (!this.stripe) {
      throw new Error('Stripe not configured. Set STRIPE_SECRET_KEY in .env.local');
    }

    const amount = calculateAmount(params.plan, params.cycle);
    const orderNo = `COS-${Date.now()}`;

    // Map payment method to Stripe payment_method_types
    const paymentMethodTypes: string[] = [];
    if (params.channel === 'card') paymentMethodTypes.push('card');
    if (params.channel === 'alipay') paymentMethodTypes.push('alipay');
    if (params.channel === 'wechat') paymentMethodTypes.push('wechat_pay');
    if (params.channel === 'bank') paymentMethodTypes.push('customer_balance');
    if (paymentMethodTypes.length === 0) paymentMethodTypes.push('card');

    const paymentIntent = await this.stripe.paymentIntents.create({
      amount,
      currency: 'cny',
      payment_method_types: paymentMethodTypes,
      metadata: {
        order_no: orderNo,
        plan: params.plan,
        cycle: params.cycle,
        userId: params.userId,
        workspaceId: params.workspaceId || '',
      },
      description: `CommerceOS ${params.plan} Plan (${params.cycle})`,
    });

    return {
      id: paymentIntent.id,
      orderNo,
      amount,
      currency: 'cny',
      channel: params.channel,
      clientSecret: paymentIntent.client_secret || undefined,
      status: 'pending',
    };
  }

  /** Verify Stripe webhook signature */
  verifyWebhook(rawBody: string, signature: string): Stripe.Event | null {
    if (!this.stripe || !process.env.STRIPE_WEBHOOK_SECRET) return null;
    try {
      return this.stripe.webhooks.constructEvent(
        rawBody, signature, process.env.STRIPE_WEBHOOK_SECRET
      );
    } catch {
      return null;
    }
  }
}

export const paymentService = new PaymentService();
