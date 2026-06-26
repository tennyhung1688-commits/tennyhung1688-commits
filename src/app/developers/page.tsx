'use client';

import Link from 'next/link';
import { Code, Puzzle, Terminal, Webhook, Layers, Download, Book, ExternalLink } from 'lucide-react';
import { useLang } from '@/lib/i18n';
import Navbar from '@/components/Navbar';

const apiEndpoints = [
  { method: 'POST', path: '/api/generate/image', desc: 'Generate product images', zh: '生成商品图片' },
  { method: 'POST', path: '/api/generate/video', desc: 'Generate product videos', zh: '生成商品视频' },
  { method: 'POST', path: '/api/generate/copy', desc: 'Generate copywriting', zh: '生成文案' },
  { method: 'POST', path: '/api/generate/seo', desc: 'SEO optimization', zh: 'SEO 优化' },
  { method: 'POST', path: '/api/generate/translate', desc: 'Multi-language translation', zh: '多语言翻译' },
  { method: 'POST', path: '/api/payment/create', desc: 'Create payment charge', zh: '创建支付订单' },
  { method: 'POST', path: '/api/payment/notify', desc: 'Payment webhook', zh: '支付回调' },
];

const sdks = [
  { name: 'JavaScript / TypeScript', icon: '📦', status: 'Coming Soon', zh: '即将推出' },
  { name: 'Python', icon: '🐍', status: 'Coming Soon', zh: '即将推出' },
  { name: 'PHP', icon: '🐘', status: 'Coming Soon', zh: '即将推出' },
  { name: 'REST API', icon: '🔗', status: 'Available', zh: '已可用' },
];

export default function DevelopersPage() {
  const { t } = useLang();

  return (
    <>
      <Navbar />
      <div className="pt-24 pb-20">
        <div className="max-w-5xl mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-16">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#111827] border border-white/10 text-white text-xs font-semibold mb-6">
              <Terminal className="w-3.5 h-3.5" />
              {t('Developers', '开发者')}
            </span>
            <h1 className="text-4xl font-extrabold text-[#111827] mb-4">
              {t('Build on CommerceOS', '在 CommerceOS 上构建')}
            </h1>
            <p className="text-[#6B7280] text-lg max-w-2xl mx-auto">
              {t('Integrate CommerceOS into your existing tools, workflows, and platforms. REST API, Webhooks, and SDKs for every language.', '将 CommerceOS 集成到你的现有工具、工作流和平台中。REST API、Webhooks 和多种语言的 SDK。')}
            </p>
          </div>

          {/* API Reference */}
          <section className="mb-16">
            <h2 className="text-xl font-bold text-[#111827] mb-6 flex items-center gap-2">
              <Code className="w-5 h-5 text-[#7C3AED]" />
              {t('API Reference', 'API 参考')}
            </h2>
            <div className="bg-white rounded-2xl border border-[#E5E7EB] overflow-hidden">
              {apiEndpoints.map((ep, i) => (
                <div key={i} className="flex items-center gap-4 px-6 py-4 border-b border-[#E5E7EB] last:border-0 hover:bg-[#FAFAFA] transition-colors">
                  <span className={`w-16 text-center px-2 py-1 rounded-lg text-xs font-bold ${
                    ep.method === 'POST' ? 'bg-emerald-50 text-emerald-600' : 'bg-blue-50 text-blue-600'
                  }`}>{ep.method}</span>
                  <code className="text-sm font-mono text-[#111827] flex-1">{ep.path}</code>
                  <span className="text-xs text-[#6B7280] hidden sm:block">{t(ep.desc, ep.zh)}</span>
                  <Link href="/docs" className="text-xs text-[#7C3AED] hover:underline font-medium">{t('Docs', '文档')} →</Link>
                </div>
              ))}
            </div>
          </section>

          {/* Webhooks */}
          <section className="mb-16">
            <h2 className="text-xl font-bold text-[#111827] mb-6 flex items-center gap-2">
              <Webhook className="w-5 h-5 text-[#7C3AED]" />
              {t('Webhooks', 'Webhooks')}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { event: 'generation.completed', desc: 'Fires when AI generation completes', zh: 'AI 生成完成时触发' },
                { event: 'payment.succeeded', desc: 'Payment confirmed', zh: '支付确认' },
                { event: 'subscription.updated', desc: 'Plan changed or renewed', zh: '套餐变更或续费' },
              ].map((wh, i) => (
                <div key={i} className="bg-white rounded-xl border border-[#E5E7EB] p-5">
                  <code className="text-[11px] font-mono text-[#7C3AED] bg-[#F5F3FF] px-2 py-1 rounded-lg mb-3 inline-block">{wh.event}</code>
                  <p className="text-xs text-[#6B7280]">{t(wh.desc, wh.zh)}</p>
                </div>
              ))}
            </div>
          </section>

          {/* SDKs */}
          <section className="mb-16">
            <h2 className="text-xl font-bold text-[#111827] mb-6 flex items-center gap-2">
              <Puzzle className="w-5 h-5 text-[#7C3AED]" />
              {t('SDKs & Libraries', 'SDK 与库')}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {sdks.map(sdk => (
                <div key={sdk.name} className="bg-white rounded-xl border border-[#E5E7EB] p-5 text-center">
                  <span className="text-2xl mb-2 block">{sdk.icon}</span>
                  <p className="text-sm font-semibold text-[#111827] mb-1">{sdk.name}</p>
                  <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${
                    sdk.status === 'Available' ? 'bg-emerald-50 text-emerald-600' : 'bg-[#F5F5F5] text-[#9CA3AF]'
                  }`}>{t(sdk.status, sdk.zh)}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Get Started */}
          <section className="bg-gradient-to-br from-[#111827] to-[#1E1B4B] rounded-3xl p-10 text-center">
            <h2 className="text-2xl font-bold text-white mb-3">{t('Ready to Build?', '准备开始了吗？')}</h2>
            <p className="text-[#9CA3AF] mb-6 max-w-lg mx-auto">
              {t('Get your API key from the dashboard and start integrating CommerceOS into your workflow.', '从控制台获取 API Key，开始将 CommerceOS 集成到你的工作流中。')}
            </p>
            <div className="flex items-center justify-center gap-3">
              <Link href="/settings" className="inline-flex items-center gap-2 px-6 py-3 bg-white text-[#111827] rounded-xl text-sm font-bold hover:bg-[#F5F5F5] transition-all">
                {t('Get API Key', '获取 API Key')} →
              </Link>
              <Link href="/docs" className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 text-white border border-white/20 rounded-xl text-sm font-semibold hover:bg-white/15 transition-all">
                <Book className="w-4 h-4" />
                {t('Read Docs', '阅读文档')}
              </Link>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
