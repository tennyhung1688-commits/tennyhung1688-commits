'use client';

import { useState, Suspense, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { loadStripe, Stripe } from '@stripe/stripe-js';
import {
  ArrowLeft, Check, CreditCard, Building2, Smartphone, Shield,
  Sparkles, Zap, Crown, Receipt, Calendar
} from 'lucide-react';
import { pricingPlans, getPlan, yearlyPrice } from '@/data/pricing';
import { useLang } from '@/lib/i18n';

/* Checkout shortcut: compact feature display (subset of full feature list) */
const checkoutFeatures: Record<string, { features: string[]; featuresZh: string[] }> = {
  starter:    { features: ['5 images/mo', '1 video/mo', 'Unlimited copy', '130+ Skills', '1 platform'], featuresZh: ['5张图/月', '1条视频/月', '无限文案', '130+ Skills', '1个平台'] },
  creator:    { features: ['200 images/mo', '15 videos/mo', 'Unlimited copy+SEO', 'Workflow', '3 platforms', 'Brand Center', 'HD no watermark'], featuresZh: ['200张图/月', '15条视频/月', '无限文案+SEO', '工作流', '3个平台', '品牌中心', '高清无水印'] },
  business:   { features: ['500 images/mo', '60 videos/mo', 'AI Agents', 'Commerce Memory', '10 platforms', 'A/B Testing', 'Analytics', 'Priority render'], featuresZh: ['500张图/月', '60条视频/月', 'AI代理', 'Commerce Memory', '10个平台', 'A/B测试', '数据分析', '优先渲染'] },
  enterprise: { features: ['Unlimited', 'Custom models', 'API+SDK', 'White label', 'SLA', 'Dedicated support', 'SSO'], featuresZh: ['无限额度', '定制模型', 'API+SDK', '白标', 'SLA', '专属支持', 'SSO'] },
};

export default function CheckoutPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-8 w-8 border-2 border-[#7C3AED] border-t-transparent" /></div>}>
      <CheckoutForm />
    </Suspense>
  );
}

function CheckoutForm() {
  const { t } = useLang();
  const router = useRouter();
  const searchParams = useSearchParams();
  const planKey = searchParams.get('plan') || 'creator';
  const plan = getPlan(planKey) || getPlan('creator')!;
  const planFeatures = checkoutFeatures[planKey] || checkoutFeatures.creator;
  const [yearly, setYearly] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [stripe, setStripe] = useState<Stripe | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '').then(s => {
      if (s) setStripe(s);
    });
  }, []);

  const monthlyPrice = plan.price;
  const displayPrice = yearly ? yearlyPrice(monthlyPrice) : monthlyPrice;
  const annualTotal = displayPrice * 12;
  const tax = Math.round(annualTotal * 0.06);
  const total = annualTotal + tax;

  const handleSubmit = async () => {
    setSubmitting(true);
    setError('');

    try {
      const channelMap: Record<string, string> = { card: 'card', bank: 'bank', alipay: 'alipay', wechat: 'wechat' };
      const res = await fetch('/api/payment/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          plan: planKey,
          cycle: yearly ? 'yearly' : 'monthly',
          channel: channelMap[paymentMethod] || 'card',
          userId: 'demo-user',
        }),
      });
      const charge = await res.json();

      if (charge.error) {
        setError(charge.error);
        setSubmitting(false);
        return;
      }

      // Stripe payment — confirm with client_secret
      if (charge.clientSecret && stripe) {
        const { error: stripeError, paymentIntent } = await stripe.confirmPayment({
          clientSecret: charge.clientSecret,
          confirmParams: {
            return_url: `${window.location.origin}/checkout/success`,
            payment_method_data: paymentMethod === 'card' ? undefined : undefined,
          },
          redirect: 'if_required',
        });

        if (stripeError) {
          setError(stripeError.message || 'Payment failed');
          setSubmitting(false);
          return;
        }

        if (paymentIntent?.status === 'succeeded' || paymentIntent?.status === 'requires_capture') {
          setDone(true);
          setSubmitting(false);
          return;
        }
      }

      setDone(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Payment failed. Please try again.');
    }
    setSubmitting(false);
  };

  if (done) {
    return (
      <div className="min-h-screen bg-[#FAFAFA] flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center">
          <div className="w-16 h-16 rounded-2xl bg-emerald-100 flex items-center justify-center mx-auto mb-6">
            <Check className="w-8 h-8 text-emerald-600" />
          </div>
          <h1 className="text-2xl font-bold text-[#111827] mb-2">
            {t('Subscription Confirmed!', '订阅成功！')}
          </h1>
          <p className="text-sm text-[#6B7280] mb-8">
            {t(`You are now on the ${plan.name} plan. Start creating with AI.`, `你已升级到 ${plan.zh} 套餐。开始 AI 创作吧。`)}
          </p>
          <div className="flex flex-col gap-3">
            <Link href="/workspace" className="w-full py-3 bg-[#7C3AED] text-white rounded-xl text-sm font-semibold hover:bg-[#6D28D9] transition-all">
              {t('Go to Workspace', '进入工作台')}
            </Link>
            <Link href="/settings" className="w-full py-3 bg-white border border-[#E5E7EB] text-[#6B7280] rounded-xl text-sm font-semibold hover:bg-[#FAFAFA] transition-all">
              {t('Manage Subscription', '管理订阅')}
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      {/* Header */}
      <header className="h-15 flex items-center px-6 border-b border-[#E5E7EB] bg-white/80 backdrop-blur-xl sticky top-0 z-50">
        <button onClick={() => router.back()} className="inline-flex items-center gap-1.5 text-sm text-[#6B7280] hover:text-[#111827] transition-colors">
          <ArrowLeft className="w-4 h-4" />
          {t('Back', '返回')}
        </button>
        <div className="ml-auto flex items-center gap-3">
          <Shield className="w-4 h-4 text-emerald-500" />
          <span className="text-xs text-[#6B7280]">{t('Secure checkout · SSL encrypted', '安全支付 · SSL 加密')}</span>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-10">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-[#111827] tracking-tight">{t('Checkout', '确认订单')}</h1>
          <p className="text-sm text-[#6B7280] mt-1">{t('Review your plan and complete payment', '确认套餐信息并完成支付')}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main */}
          <div className="lg:col-span-2 space-y-5">
            {/* Plan selector */}
            <div className="bg-white rounded-2xl border border-[#E5E7EB] p-6">
              <h2 className="text-sm font-bold text-[#111827] mb-4">{t('Selected Plan', '已选套餐')}</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {pricingPlans.filter(p => p.key !== 'starter').map(p => (
                  <button
                    key={p.key}
                    onClick={() => router.push(`/checkout?plan=${p.key}`)}
                    className={`p-3 rounded-xl border-2 text-left transition-all ${
                      planKey === p.key
                        ? 'border-[#7C3AED] bg-[#F5F3FF]'
                        : 'border-[#E5E7EB] hover:border-[#D1D5DB]'
                    }`}
                  >
                    <p className="text-xs font-bold text-[#111827]">{t(p.name, p.zh)}</p>
                    <p className="text-lg font-bold text-[#111827] mt-1">¥{p.price}<span className="text-xs font-normal text-[#9CA3AF]">/月</span></p>
                    {p.key === planKey && <Check className="w-4 h-4 text-[#7C3AED] mt-1" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Billing cycle */}
            <div className="bg-white rounded-2xl border border-[#E5E7EB] p-6">
              <h2 className="text-sm font-bold text-[#111827] mb-4">{t('Billing Cycle', '计费周期')}</h2>
              <div className="flex gap-2">
                <button
                  onClick={() => setYearly(false)}
                  className={`flex-1 p-4 rounded-xl border-2 text-center transition-all ${
                    !yearly ? 'border-[#7C3AED] bg-[#F5F3FF]' : 'border-[#E5E7EB]'
                  }`}
                >
                  <p className="text-sm font-bold text-[#111827]">{t('Monthly', '月付')}</p>
                  <p className="text-lg font-bold text-[#111827]">¥{monthlyPrice}<span className="text-xs font-normal text-[#9CA3AF]">/月</span></p>
                </button>
                <button
                  onClick={() => setYearly(true)}
                  className={`flex-1 p-4 rounded-xl border-2 text-center transition-all ${
                    yearly ? 'border-[#7C3AED] bg-[#F5F3FF]' : 'border-[#E5E7EB]'
                  }`}
                >
                  <div className="flex items-center justify-center gap-1.5 mb-1">
                    <span className="text-sm font-bold text-[#111827]">{t('Yearly', '年付')}</span>
                    <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded-full">{t('Save 33%', '省33%')}</span>
                  </div>
                  <p className="text-lg font-bold text-[#111827]">¥{displayPrice}<span className="text-xs font-normal text-[#9CA3AF]">/月</span></p>
                  <p className="text-[10px] text-[#9CA3AF]">¥{annualTotal}/年</p>
                </button>
              </div>
            </div>

            {/* Payment method */}
            <div className="bg-white rounded-2xl border border-[#E5E7EB] p-6">
              <h2 className="text-sm font-bold text-[#111827] mb-4">{t('Payment Method', '支付方式')}</h2>
              <div className="space-y-2">
                  {[
                    { id: 'card', icon: CreditCard, label: 'Credit/Debit Card', zh: '信用卡/借记卡' },
                    { id: 'alipay', icon: Smartphone, label: 'Alipay', zh: '支付宝' },
                    { id: 'wechat', icon: Smartphone, label: 'WeChat Pay', zh: '微信支付' },
                    { id: 'bank', icon: Building2, label: 'Bank Transfer', zh: '银行转账' },
                  ].map(method => (
                  <button
                    key={method.id}
                    onClick={() => setPaymentMethod(method.id)}
                    className={`w-full flex items-center gap-3 p-3.5 rounded-xl border-2 transition-all ${
                      paymentMethod === method.id ? 'border-[#7C3AED] bg-[#F5F3FF]' : 'border-[#E5E7EB] hover:border-[#D1D5DB]'
                    }`}
                  >
                    <method.icon className={`w-5 h-5 ${paymentMethod === method.id ? 'text-[#7C3AED]' : 'text-[#9CA3AF]'}`} />
                    <span className={`text-sm font-medium ${paymentMethod === method.id ? 'text-[#7C3AED]' : 'text-[#374151]'}`}>
                      {t(method.label, method.zh)}
                    </span>
                    {paymentMethod === method.id && <Check className="w-4 h-4 text-[#7C3AED] ml-auto" />}
                  </button>
                ))}
              </div>

              {paymentMethod === 'card' && (
                <div className="mt-4 space-y-3">
                  <input type="text" placeholder={t('Card number', '卡号')} className="w-full px-4 py-2.5 border border-[#E5E7EB] rounded-xl text-sm bg-white focus:ring-2 focus:ring-[#7C3AED]/20 outline-none" />
                  <div className="grid grid-cols-2 gap-3">
                    <input type="text" placeholder="MM/YY" className="w-full px-4 py-2.5 border border-[#E5E7EB] rounded-xl text-sm bg-white focus:ring-2 focus:ring-[#7C3AED]/20 outline-none" />
                    <input type="text" placeholder="CVC" className="w-full px-4 py-2.5 border border-[#E5E7EB] rounded-xl text-sm bg-white focus:ring-2 focus:ring-[#7C3AED]/20 outline-none" />
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar — Order summary */}
          <div className="space-y-5">
            <div className="bg-white rounded-2xl border border-[#E5E7EB] p-6 sticky top-20">
              <h2 className="text-sm font-bold text-[#111827] mb-4 flex items-center gap-1.5">
                <Receipt className="w-4 h-4 text-[#6B7280]" />
                {t('Order Summary', '订单摘要')}
              </h2>

              {/* Plan info */}
              <div className="flex items-center gap-3 mb-4 p-3 rounded-xl bg-[#F5F3FF] border border-[#EDE9FE]">
                <div className="w-9 h-9 rounded-lg bg-[#7C3AED] flex items-center justify-center">
                  {planKey === "business" ? <Crown className="w-5 h-5 text-white" /> :
                   planKey === 'enterprise' ? <Building2 className="w-5 h-5 text-white" /> :
                   <Zap className="w-5 h-5 text-white" />}
                </div>
                <div>
                  <p className="text-sm font-bold text-[#111827]">{t(plan.name, plan.zh)} Plan</p>
                  <p className="text-[10px] text-[#6B7280]">{yearly ? t('Yearly billing', '年付') : t('Monthly billing', '月付')}</p>
                </div>
              </div>

              {/* Features */}
              <div className="space-y-1.5 mb-4">
                {planFeatures.featuresZh.map((f, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs text-[#6B7280]">
                    <Check className="w-3 h-3 text-emerald-500 flex-shrink-0" />
                    {t(planFeatures.features[i], f)}
                  </div>
                ))}
              </div>

              <div className="border-t border-[#E5E7EB] pt-4 space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-[#6B7280]">{t('Subtotal', '小计')}</span>
                  <span className="text-[#111827] font-semibold">¥{annualTotal.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-[#6B7280]">{t('Tax (6%)', '税费 (6%)')}</span>
                  <span className="text-[#111827]">¥{tax.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between text-sm pt-2 border-t border-[#E5E7EB]">
                  <span className="font-bold text-[#111827]">{t('Total', '合计')}</span>
                  <span className="text-lg font-bold text-[#111827]">¥{total.toLocaleString()}</span>
                </div>
                <p className="text-[10px] text-[#9CA3AF]">
                  {yearly ? t('Billed annually', '按年计费') : t('Billed monthly', '按月计费')} · {t('Cancel anytime', '随时可取消')}
                </p>
              </div>

              {error && (
                <div className="text-xs text-red-600 bg-red-50 border border-red-200 px-3 py-2 rounded-lg mb-3">{error}</div>
              )}

              <button
                onClick={handleSubmit}
                disabled={submitting || planKey === 'starter' || !stripe}
                className="w-full mt-5 py-3 bg-[#7C3AED] text-white rounded-xl text-sm font-semibold hover:bg-[#6D28D9] disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
              >
                {!stripe ? (
                  <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />{t('Loading...', '加载中...')}</>
                ) : submitting ? (
                  <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />{t('Processing...', '处理中...')}</>
                ) : planKey === 'starter' ? (
                  t('Already on Starter Plan', '已是入门套餐')
                ) : (
                  <>{t('Pay ¥', '支付 ¥')}{total.toLocaleString()}</>
                )}
              </button>

              <p className="text-[10px] text-[#9CA3AF] text-center mt-3">
                <Shield className="w-3 h-3 inline mr-1" />
                {t('Secure payment. Cancel anytime. No long-term contract.', '安全支付。随时取消。无长期合约。')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
