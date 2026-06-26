'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import {
  Image, Video, Crown, Sparkles, ShoppingCart, Package, Percent, Music, Play,
  Globe, ShoppingBag, Store, Smartphone, Truck, ChevronDown, Download, Zap,
  X, Check, AlertCircle, CreditCard, LogOut, ArrowRight, Camera, Upload,
  Wand2, Palette, Lightbulb, Users, Cloud, History, Languages, Box, Shirt,
  Monitor, Gem, Layout, Heart, Star, Scissors, Film, Bot, Cpu, RefreshCw,
  MessageSquare, BrainCircuit, Rocket, ShieldCheck, Layers, PenTool, FileText,
  Type, Globe2, Repeat,
} from 'lucide-react';
import { useLang } from '@/lib/i18n';
import { useAuth } from '@/lib/auth';
import { type UsageData } from '@/lib/quota';
import platforms from '@/data/ecommerce-platforms.json';
import plans from '@/data/membership-plans.json';

interface Plan {
  name: string; nameEn: string;
  price: number; priceUnit?: string; priceUnitEn?: string;
  images: number; videos: number;
  features: string[]; featuresEn: string[];
  color: string; popular?: boolean;
}

const typedPlans = plans as Record<string, Plan>;

// ========================
// 静态内容数据
// ========================

const capabilities = [
  { icon: Camera, en: 'AI Product Images', zh: 'AI 商品图', color: 'purple' },
  { icon: Film, en: 'AI Product Videos', zh: 'AI 商品视频', color: 'pink' },
  { icon: Shirt, en: 'AI Model Try-On', zh: 'AI 模特换装', color: 'purple' },
  { icon: RefreshCw, en: 'AI Background Replace', zh: 'AI 背景替换', color: 'pink' },
  { icon: Layout, en: 'AI Posters', zh: 'AI 海报', color: 'purple' },
  { icon: Zap, en: 'AI Ad Creatives', zh: 'AI 广告素材', color: 'amber' },
  { icon: FileText, en: 'AI Product Descriptions', zh: 'AI 商品描述', color: 'blue' },
  { icon: Type, en: 'AI Title Optimization', zh: 'AI 标题优化', color: 'blue' },
  { icon: Languages, en: 'AI Multi-language Translation', zh: 'AI 多语言翻译', color: 'green' },
  { icon: Layers, en: 'AI Batch Processing', zh: 'AI 批量处理', color: 'amber' },
];

const imageCapabilities = [
  { icon: Wand2, en: 'Text to Image', zh: '文生图' },
  { icon: Upload, en: 'Image to Image', zh: '图生图' },
  { icon: RefreshCw, en: 'Background Replace', zh: '背景替换' },
  { icon: Camera, en: 'AI Product Photography', zh: 'AI商品摄影' },
  { icon: Shirt, en: 'AI Fashion Model', zh: 'AI模特生成' },
  { icon: Zap, en: 'HD Upscale', zh: '高清放大' },
  { icon: Scissors, en: 'Remove Background', zh: '去除背景' },
  { icon: Lightbulb, en: 'Lighting Enhancement', zh: '光影增强' },
];

const videoCapabilities = [
  { icon: Film, en: 'Image to Video', zh: '图生视频' },
  { icon: Box, en: 'Product Showcase', zh: '产品展示' },
  { icon: Play, en: 'AI Commercial Video', zh: 'AI广告视频' },
  { icon: Bot, en: 'Talking Avatar', zh: '数字人口播' },
  { icon: Users, en: 'UGC Ads', zh: 'UGC广告' },
  { icon: Sparkles, en: 'Product Animation', zh: '商品动画' },
  { icon: Star, en: 'Cinematic Video', zh: '影视级视频' },
  { icon: Smartphone, en: 'Social Media Video', zh: '社媒短视频' },
];

const hotTemplates = [
  { en: 'Amazon White Background', zh: '亚马逊白底图', icon: Box },
  { en: 'Fashion Photography', zh: '时尚服装', icon: Shirt },
  { en: 'Beauty Products', zh: '美妆护肤', icon: Heart },
  { en: 'Electronics', zh: '3C数码', icon: Monitor },
  { en: 'Furniture', zh: '家居家具', icon: Layout },
  { en: 'Food', zh: '食品饮料', icon: Star },
  { en: 'Jewelry', zh: '珠宝首饰', icon: Gem },
  { en: 'Cosmetics', zh: '彩妆美妆', icon: Palette },
  { en: 'Outdoor', zh: '户外运动', icon: Globe },
  { en: 'Pet Products', zh: '宠物用品', icon: Heart },
];

const whyUs = [
  { icon: Cpu, en: 'All major AI models in one platform', zh: '一个平台支持所有主流AI模型' },
  { icon: Wand2, en: 'No complex prompts needed', zh: '无需学习复杂 Prompt' },
  { icon: Zap, en: 'One-click professional content', zh: '一键生成专业电商素材' },
  { icon: ShieldCheck, en: 'Commercial use license', zh: '商业用途授权' },
  { icon: Download, en: 'High-definition output', zh: '高清输出' },
  { icon: Package, en: 'Batch generation', zh: '批量生成' },
  { icon: Rocket, en: 'Lightning-fast processing', zh: '极速处理' },
  { icon: Cloud, en: 'Cloud storage', zh: '云端存储' },
  { icon: History, en: 'History records', zh: '历史记录' },
  { icon: Globe, en: 'Multi-language support', zh: '多语言支持' },
];

const workflow = [
  { step: '01', en: 'Upload product images', zh: '上传商品图片', icon: Upload },
  { step: '02', en: 'Choose template or describe needs', zh: '选择模板或输入需求', icon: Layout },
  { step: '03', en: 'AI auto-generates', zh: 'AI自动生成', icon: Sparkles },
  { step: '04', en: 'Download HD images/videos', zh: '下载高清图片或视频', icon: Download },
  { step: '05', en: 'Upload to e-commerce platform & sell', zh: '上传到电商平台销售', icon: Rocket },
];

const faqItems = [
  { q: 'What AI models are supported?', qzh: '支持哪些AI模型？', a: 'Supports GPT, Claude, Gemini, FLUX, Imagen, Kling, Veo, Runway, PixVerse and other leading models.', azh: '支持 GPT、Claude、Gemini、FLUX、Imagen、Kling、Veo、Runway、PixVerse 等主流模型。' },
  { q: 'Do I need to learn prompts?', qzh: '需要学习 Prompt 吗？', a: 'No. Just choose a template to quickly generate professional content.', azh: '不需要。选择模板即可快速生成专业内容。' },
  { q: 'Is commercial use supported?', qzh: '支持商业用途吗？', a: 'Yes, subject to individual model licensing policies and platform terms.', azh: '支持，具体以各模型授权政策及平台服务条款为准。' },
  { q: 'How fast is generation?', qzh: '生成速度多久？', a: 'Usually tens of seconds to a few minutes, depending on model and task type.', azh: '通常几十秒至几分钟，具体取决于所选模型和任务类型。' },
  { q: 'What payment methods?', qzh: '支持哪些支付方式？', a: 'Credit cards, WeChat Pay, Alipay (varies by region).', azh: '支持信用卡、微信支付、支付宝等（根据上线地区开放）。' },
];

// ========================
// 页面主体
// ========================

export default function StudioPage() {
  return <StudioContent />;
}

function StudioContent() {
  const { t } = useLang();
  const router = useRouter();
  const { user, loading: authLoading, signOut } = useAuth();
  const [usage, setUsage] = useState<UsageData | null>(null);
  const [mounted, setMounted] = useState(false);
  const [showPricing, setShowPricing] = useState(false);
  const [faqOpen, setFaqOpen] = useState<number | null>(null);
  const [apiLoading, setApiLoading] = useState(false);

  const refreshUsage = useCallback(async () => {
    try {
      const res = await fetch('/api/generator/usage');
      if (res.ok) setUsage(await res.json());
    } catch {}
  }, []);

  useEffect(() => {
    if (!authLoading && !user) router.push('/auth/login?redirect=/tools/generator');
    if (user) { refreshUsage(); setMounted(true); }
  }, [user, authLoading, router, refreshUsage]);

  const activatePlan = async (plan: string) => {
    if (plan === 'enterprise') { window.location.href = 'mailto:hello@commerceos.ai'; return; }
    setApiLoading(true);
    try {
      const res = await fetch('/api/generator/membership', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ plan }) });
      if (res.ok) { await refreshUsage(); setShowPricing(false); }
    } catch {} finally { setApiLoading(false); }
  };

  if (authLoading) {
    return <div className="min-h-screen flex items-center justify-center bg-white"><div className="animate-spin rounded-full h-8 w-8 border-2 border-purple-500 border-t-transparent" /></div>;
  }

  // ======================== RENDER ========================
  return (
    <div className="bg-white">
      {/* Top Bar */}
      <div className="bg-white border-b border-slate-100 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2 font-bold text-lg">
            <Sparkles className="w-5 h-5 text-purple-500" />
            <span className="bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">CommerceOS</span>
            <span className="text-slate-300 mx-1">|</span>
            <span className="text-slate-800">{t('Global AI Commerce OS', '全球 AI 电商操作系统')}</span>
          </a>
          <div className="flex items-center gap-3">
            {user ? (
              <>
                {usage?.plan && <span className="text-xs text-purple-600 bg-purple-50 px-2 py-1 rounded-full border border-purple-200 flex items-center gap-1"><Crown className="w-3 h-3" />{typedPlans[usage.plan]?.name || usage.plan}</span>}
                <button onClick={() => setShowPricing(true)} className="px-3 py-1.5 text-xs font-medium rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600">{t('Upgrade', '升级')}</button>
                <button onClick={() => { signOut(); router.push('/'); }} className="text-xs text-slate-400 hover:text-red-500 transition-colors"><LogOut className="w-3.5 h-3.5" /></button>
              </>
            ) : (
              <button onClick={() => router.push('/auth/login')} className="px-4 py-1.5 text-sm rounded-lg bg-purple-500 text-white hover:bg-purple-600">{t('Sign In', '登录')}</button>
            )}
          </div>
        </div>
      </div>

      {/* ===== HERO ===== */}
      <section className="relative overflow-hidden bg-gradient-to-b from-purple-50 via-white to-white pt-20 pb-16">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-purple-100/50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-pink-100/30 rounded-full blur-3xl translate-y-1/2 -translate-x-1/4" />
        <div className="max-w-5xl mx-auto px-4 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-100 border border-purple-200 text-purple-700 text-sm mb-8">
            <Sparkles className="w-4 h-4" />
            {t('AI Commerce Studio', 'AI Commerce 平台')}
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 leading-tight mb-8">
            {t(
              'Global AI Commerce Operating System.',
              '输入商品，输出素材。'
            )}
          </h1>

          {/* Three Key Claims */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-4xl mx-auto mb-10">
            <div className="flex flex-col items-center p-5 rounded-2xl bg-white/80 backdrop-blur border border-purple-100 shadow-sm">
              <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center text-purple-600 mb-3">
                <Upload className="w-6 h-6" />
              </div>
              <div className="text-3xl font-extrabold text-purple-500 mb-1">1→10</div>
              <p className="text-sm font-semibold text-slate-800">{t('Input product → AI generates 10 types of content', '输入商品 → AI 自动生成10种素材')}</p>
            </div>
            <div className="flex flex-col items-center p-5 rounded-2xl bg-white/80 backdrop-blur border border-purple-100 shadow-sm">
              <div className="w-12 h-12 rounded-xl bg-pink-100 flex items-center justify-center text-pink-500 mb-3">
                <BrainCircuit className="w-6 h-6" />
              </div>
              <div className="text-3xl font-extrabold text-pink-500 mb-1">AI</div>
              <p className="text-sm font-semibold text-slate-800">{t('System auto-selects the best AI model', '系统自动选择最佳 AI 模型')}</p>
            </div>
            <div className="flex flex-col items-center p-5 rounded-2xl bg-white/80 backdrop-blur border border-purple-100 shadow-sm">
              <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center text-amber-500 mb-3">
                <Zap className="w-6 h-6" />
              </div>
              <div className="text-3xl font-extrabold text-amber-500 mb-1">
                {t('Minutes', '分钟')}
              </div>
              <p className="text-sm font-semibold text-slate-800">{t('Everything ready in minutes', '几分钟全部搞定')}</p>
            </div>
          </div>

          <p className="text-lg text-slate-400 max-w-2xl mx-auto mb-8">
            {t(
              'Everything you need to create e-commerce content with AI. Product images, videos, descriptions, translations — one platform.',
              '用AI创建电商内容所需的一切。商品图、视频、描述、翻译——一个平台全搞定。'
            )}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => {
                const el = document.getElementById('generator-demo');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-purple-600 to-pink-500 text-white font-semibold text-lg hover:from-purple-700 hover:to-pink-600 shadow-lg shadow-purple-500/25 transition-all flex items-center justify-center gap-2 group"
            >
              {t('Start Creating', '开始创作')}
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={() => document.getElementById('capabilities-section')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-3.5 rounded-xl border-2 border-slate-200 text-slate-700 font-semibold text-lg hover:border-purple-200 hover:text-purple-600 transition-all">
              {t('View Examples', '查看案例')}
            </button>
          </div>
        </div>
      </section>

      {/* ===== CAPABILITIES ===== */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-slate-900 mb-3">{t('Commerce Workspace', '一个平台，全部搞定')}</h2>
          <p className="text-slate-500 mb-12">{t('10 core capabilities for cross-border sellers', '面向跨境卖家的10大核心能力')}</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {capabilities.map((item, i) => {
              const colorClasses = {
                purple: 'bg-purple-50 text-purple-600 border-purple-100',
                pink: 'bg-pink-50 text-pink-500 border-pink-100',
                amber: 'bg-amber-50 text-amber-500 border-amber-100',
                blue: 'bg-blue-50 text-blue-500 border-blue-100',
                green: 'bg-green-50 text-green-500 border-green-100',
              };
              const cc = colorClasses[item.color as keyof typeof colorClasses] || colorClasses.purple;
              return (
                <div key={i}
                  onClick={() => router.push('/workspace/new')}
                  className="flex flex-col items-center gap-3 p-5 rounded-2xl border hover:shadow-md transition-all group cursor-pointer bg-white">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${cc.split(' ')[0]} ${cc.split(' ')[1]} border ${cc.split(' ')[2]} group-hover:scale-110 transition-transform`}>
                    <item.icon className="w-7 h-7" />
                  </div>
                  <span className="text-sm font-semibold text-slate-700">{t(item.en, item.zh)}</span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== 3. AI IMAGE GENERATION ===== */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center gap-3 mb-3 justify-center">
            <div className="w-8 h-8 rounded-lg bg-purple-100 flex items-center justify-center text-purple-600"><Image className="w-4 h-4" /></div>
            <h2 className="text-3xl font-bold text-slate-900">{t('AI Image Generation', 'AI图片生成')}</h2>
          </div>
          <p className="text-slate-500 text-center mb-12">{t('8 powerful image generation capabilities', '8大图片生成能力')}</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {imageCapabilities.map((item, i) => (
              <div key={i} className="flex flex-col items-center gap-3 p-5 rounded-xl bg-white border border-slate-200 hover:shadow-md hover:border-purple-200 transition-all group">
                <div className="w-12 h-12 rounded-xl bg-purple-50 flex items-center justify-center text-purple-500 group-hover:bg-purple-100 transition-colors"><item.icon className="w-6 h-6" /></div>
                <span className="text-sm font-medium text-slate-700 text-center">{t(item.en, item.zh)}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 4. AI VIDEO GENERATION ===== */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center gap-3 mb-3 justify-center">
            <div className="w-8 h-8 rounded-lg bg-pink-100 flex items-center justify-center text-pink-500"><Video className="w-4 h-4" /></div>
            <h2 className="text-3xl font-bold text-slate-900">{t('AI Video Generation', 'AI视频生成')}</h2>
          </div>
          <p className="text-slate-500 text-center mb-12">{t('8 powerful video generation capabilities', '8大视频生成能力')}</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {videoCapabilities.map((item, i) => (
              <div key={i} className="flex flex-col items-center gap-3 p-5 rounded-xl bg-slate-50 border border-slate-200 hover:shadow-md hover:border-pink-200 transition-all group">
                <div className="w-12 h-12 rounded-xl bg-pink-50 flex items-center justify-center text-pink-500 group-hover:bg-pink-100 transition-colors"><item.icon className="w-6 h-6" /></div>
                <span className="text-sm font-medium text-slate-700 text-center">{t(item.en, item.zh)}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 5. SUPPORTED PLATFORMS ===== */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-slate-900 mb-3">{t('Supported Platforms', '支持的平台')}</h2>
          <p className="text-slate-500 mb-12">{t('Optimized for all major e-commerce platforms', '适配所有主流电商平台')}</p>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7 gap-3">
            {platforms.map(p => (
              <div key={p.id} className="flex flex-col items-center gap-2 p-4 rounded-xl bg-white border border-slate-200 hover:border-purple-200 hover:shadow-sm transition-all">
                <div className="w-10 h-10 rounded-lg bg-purple-50 flex items-center justify-center text-purple-500">
                  <span className="text-lg font-bold">{typeof p.nameEn === 'string' ? p.nameEn.substring(0, 1) : '🛒'}</span>
                </div>
                <span className="text-xs font-medium text-slate-600">{t(p.nameEn, p.name)}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 6. HOT TEMPLATES ===== */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-slate-900 mb-3">{t('Popular Templates', '热门模板')}</h2>
          <p className="text-slate-500 mb-12">{t('Start with ready-made templates', '从现成模板开始')}</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {hotTemplates.map((tmpl, i) => (
              <div key={i}
                onClick={() => router.push('/workspace/new')}
                className="flex flex-col items-center gap-2 p-4 rounded-xl bg-white border border-slate-200 hover:border-purple-200 hover:shadow-sm transition-all cursor-pointer group">
                <div className="w-12 h-12 rounded-xl bg-purple-50 flex items-center justify-center text-purple-500 group-hover:scale-110 transition-transform"><tmpl.icon className="w-6 h-6" /></div>
                <span className="text-xs font-medium text-slate-600 text-center">{t(tmpl.en, tmpl.zh)}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 8. WHY US ===== */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-slate-900 mb-12">{t('Why Choose Us', '为什么选择我们')}</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {whyUs.map((item, i) => (
              <div key={i} className="flex flex-col items-center gap-3 p-4 group">
                <div className="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center text-green-600 group-hover:scale-110 transition-transform"><item.icon className="w-6 h-6" /></div>
                <span className="text-xs text-slate-500 text-center leading-relaxed">{t(item.en, item.zh)}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 9. WORKFLOW ===== */}
      <section className="py-20 bg-gradient-to-br from-purple-50 to-pink-50">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-slate-900 text-center mb-4">{t('How It Works', '使用流程')}</h2>
          <p className="text-slate-500 text-center mb-12">{t('5 steps to launch your product', '5步搞定商品素材')}</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {workflow.map((item, i) => (
              <div key={i} className="relative flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-2xl bg-white border-2 border-purple-200 flex items-center justify-center text-purple-600 shadow-sm mb-3 relative z-10">
                  <item.icon className="w-7 h-7" />
                </div>
                <div className="text-xs font-bold text-purple-500 mb-1">{item.step}</div>
                <p className="text-sm font-medium text-slate-700">{t(item.en, item.zh)}</p>
                {i < workflow.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-[60%] w-[80%] border-t-2 border-dashed border-purple-200" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 10. PRICING ===== */}
      <section id="pricing" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-slate-900 text-center mb-3">{t('Pricing Plans', '会员方案')}</h2>
          <p className="text-slate-500 text-center mb-12">{t('Choose the plan that fits your needs', '选择适合你的方案')}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {Object.entries(typedPlans).map(([key, plan]) => {
              const isCurrent = usage?.plan === key;
              return (
                <div key={key} className={`relative rounded-2xl border-2 p-6 flex flex-col ${plan.popular ? 'border-purple-300 bg-purple-50/30 shadow-lg' : 'border-slate-200'} transition-all hover:shadow-md`}>
                  {plan.popular && <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-bold rounded-full">{t('Most Popular', '最受欢迎')}</div>}
                  <h3 className="text-lg font-bold text-slate-800 mb-1" style={{ color: plan.color }}>{t(plan.nameEn, plan.name)}</h3>
                  <div className="mb-4">
                    {plan.price > 0 ? (
                      <><span className="text-3xl font-bold text-slate-900">¥{plan.price}</span><span className="text-slate-400 text-sm ml-1">{t(plan.priceUnitEn || '', plan.priceUnit || '')}</span></>
                    ) : plan.nameEn === 'Enterprise' ? (
                      <span className="text-3xl font-bold text-slate-900">{t('Custom', '定制')}</span>
                    ) : (
                      <span className="text-3xl font-bold text-slate-900">¥0</span>
                    )}
                  </div>
                  <div className="text-xs text-slate-500 mb-4">{plan.images} {t('images', '张图')} + {plan.videos} {t('videos', '条视频')}</div>
                  <ul className="space-y-2 mb-6 flex-1">
                    {plan.features.map((f: string, i: number) => (
                      <li key={i} className="text-sm text-slate-600 flex items-start gap-2"><Check className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />{t(plan.featuresEn[i], f)}</li>
                    ))}
                  </ul>
                  <button
                    onClick={() => activatePlan(key)}
                    disabled={isCurrent || apiLoading}
                    className={`w-full py-2.5 rounded-xl text-sm font-semibold transition-all ${isCurrent ? 'bg-green-100 text-green-700 cursor-default' : 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600'} disabled:opacity-60`}
                  >
                    {isCurrent ? t('Current Plan', '当前套餐') : plan.price === 0 && plan.nameEn === 'Enterprise' ? t('Contact Us', '联系我们') : plan.price === 0 ? t('Get Started Free', '免费开始') : apiLoading ? t('Processing...', '处理中...') : t('Subscribe', '立即订阅')}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== 11. FAQ ===== */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-slate-900 text-center mb-12">{t('FAQ', '常见问题')}</h2>
          <div className="space-y-3">
            {faqItems.map((item, i) => (
              <div key={i} className="bg-white rounded-xl border border-slate-200 overflow-hidden">
                <button
                  onClick={() => setFaqOpen(faqOpen === i ? null : i)}
                  className="w-full flex items-center justify-between p-5 text-left font-medium text-slate-800 hover:bg-slate-50 transition-colors"
                >
                  <span className="pr-4">{t(item.q, item.qzh)}</span>
                  <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform shrink-0 ${faqOpen === i ? 'rotate-180' : ''}`} />
                </button>
                {faqOpen === i && (
                  <div className="px-5 pb-5 text-sm text-slate-600 leading-relaxed">{t(item.a, item.azh)}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 12. FINAL POSITIONING ===== */}
      <section className="py-24 bg-gradient-to-br from-purple-600 via-purple-700 to-pink-600 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-white/5 rounded-full blur-3xl" />
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-white/90 text-sm mb-6">
            <Sparkles className="w-4 h-4" />
            AI E-commerce Studio
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            {t(
              'One AI Operating System for Global Commerce.',
              '用AI创建电商内容所需的一切。'
            )}
          </h2>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
            {t(
              'Product images, videos, descriptions, translations — all in one platform. Stop switching between 10 different AI tools.',
              '商品图、视频、描述、翻译——一个平台全搞定。不再需要在10个AI工具之间来回切换。'
            )}
          </p>
          <button
            onClick={() => {
              const el = document.getElementById('generator-demo');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="px-8 py-3.5 rounded-xl bg-white text-purple-600 font-semibold text-lg hover:bg-purple-50 transition-all shadow-xl inline-flex items-center gap-2 group"
          >
            {t('Start Creating Now', '立即开始创作')}
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </section>

      {/* ===== PRICING MODAL ===== */}
      {showPricing && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setShowPricing(false)}>
          <div className="bg-white rounded-2xl max-w-5xl w-full max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <div className="p-6 border-b border-slate-200 flex items-center justify-between sticky top-0 bg-white z-10">
              <h2 className="text-lg font-bold flex items-center gap-2"><Crown className="w-5 h-5 text-amber-500" />{t('Upgrade Your Plan', '升级套餐')}</h2>
              <button onClick={() => setShowPricing(false)} className="p-1 hover:bg-slate-100 rounded-lg"><X className="w-5 h-5" /></button>
            </div>
            <div className="p-6 grid grid-cols-1 md:grid-cols-4 gap-4">
              {Object.entries(typedPlans).map(([key, plan]) => {
                const isCurrent = usage?.plan === key;
                return (
                  <div key={key} className={`rounded-xl border-2 p-5 flex flex-col ${plan.popular ? 'border-purple-300 bg-purple-50/30' : 'border-slate-200'}`}>
                    {plan.popular && <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-bold rounded-full">{t('Popular', '热门')}</div>}
                    <h3 className="text-sm font-bold mb-1" style={{ color: plan.color }}>{t(plan.nameEn, plan.name)}</h3>
                    <div className="text-2xl font-bold text-slate-900 mb-1">{plan.price > 0 ? `¥${plan.price}` : plan.nameEn === 'Enterprise' ? t('Custom', '定制') : '¥0'}<span className="text-xs text-slate-400 ml-1">{plan.price > 0 ? t(plan.priceUnitEn!, plan.priceUnit!) : ''}</span></div>
                    <div className="text-xs text-slate-500 mb-3">{plan.images} {t('images', '图')} + {plan.videos} {t('videos', '视频')}</div>
                    <ul className="space-y-1.5 mb-4 flex-1">{plan.features.map((f: string, i: number) => <li key={i} className="text-xs text-slate-600 flex items-start gap-1.5"><Check className="w-3 h-3 text-green-500 mt-0.5 shrink-0" />{t(plan.featuresEn[i] || f, f)}</li>)}</ul>
                    <button onClick={() => activatePlan(key)} disabled={isCurrent || apiLoading} className={`w-full py-2 rounded-lg text-sm font-medium transition-all ${isCurrent ? 'bg-green-100 text-green-700' : 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600'} disabled:opacity-50`}>
                      {isCurrent ? t('Current', '当前') : plan.nameEn === 'Enterprise' ? t('Contact', '联系') : apiLoading ? t('...', '...') : t('Subscribe', '订阅')}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
