import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Terms of Service — CommerceOS',
  description: 'CommerceOS Terms of Service — Global AI E-commerce Operating System',
};

export default function TermsPage() {
  return (
    <article className="prose prose-slate max-w-none">
      <p className="text-xs text-[#9CA3AF] uppercase tracking-wider mb-2">Legal</p>
      <h1 className="text-3xl font-bold text-[#111827] mb-2 tracking-tight">Terms of Service</h1>
      <p className="text-sm text-[#9CA3AF] mb-12">Last updated: June 25, 2026</p>

      {/* ── English ── */}

      <h2 className="text-xl font-bold text-[#111827] mt-10 mb-4">1. Acceptance of Terms</h2>
      <p className="text-[#374151] leading-relaxed mb-4">
        By accessing or using CommerceOS (&quot;the Service&quot;), you agree to be bound by these Terms of Service (&quot;Terms&quot;).
        If you do not agree, do not use the Service.
      </p>

      <h2 className="text-xl font-bold text-[#111827] mt-10 mb-4">2. Description of Service</h2>
      <p className="text-[#374151] leading-relaxed mb-4">
        CommerceOS is a Global AI E-commerce Operating System that provides AI-powered tools for generating
        product images, videos, copywriting, SEO optimization, translations, and publishing to e-commerce
        platforms including Amazon, Shopify, TikTok Shop, Taobao, Douyin, Shopee, Lazada, and others.
      </p>
      <p className="text-[#374151] leading-relaxed mb-4">
        The Service is provided on a subscription basis with different tiers: Free, Starter, Pro, and Enterprise.
        Features and usage limits vary by plan.
      </p>

      <h2 className="text-xl font-bold text-[#111827] mt-10 mb-4">3. Account Registration</h2>
      <p className="text-[#374151] leading-relaxed mb-2">
        You must provide accurate and complete information when creating an account:
      </p>
      <ul className="list-disc pl-6 text-[#374151] leading-relaxed space-y-1 mb-4">
        <li>You must be at least 18 years old or have legal guardian consent.</li>
        <li>You are responsible for maintaining the confidentiality of your login credentials.</li>
        <li>You are responsible for all activities under your account.</li>
        <li>One person or entity may maintain only one free trial account.</li>
        <li>We reserve the right to suspend or terminate accounts that violate these Terms.</li>
      </ul>

      <h2 className="text-xl font-bold text-[#111827] mt-10 mb-4">4. Subscription and Payment</h2>
      <p className="text-[#374151] leading-relaxed mb-2">
        Paid subscriptions are billed monthly or annually:
      </p>
      <ul className="list-disc pl-6 text-[#374151] leading-relaxed space-y-1 mb-4">
        <li>Fees are charged in advance on a recurring basis.</li>
        <li>Annual subscriptions receive a 33% discount.</li>
        <li>You may cancel at any time; cancellation takes effect at the end of the current billing period.</li>
        <li>No refunds for partial usage of a billing period unless required by law.</li>
        <li>Usage quotas reset at the beginning of each billing period.</li>
      </ul>

      <h2 className="text-xl font-bold text-[#111827] mt-10 mb-4">5. Acceptable Use</h2>
      <p className="text-[#374151] leading-relaxed mb-2">
        You agree not to use the Service to:
      </p>
      <ul className="list-disc pl-6 text-[#374151] leading-relaxed space-y-1 mb-4">
        <li>Generate content that violates any applicable laws or regulations.</li>
        <li>Create counterfeit, fraudulent, or misleading product listings.</li>
        <li>Infringe upon intellectual property rights of others.</li>
        <li>Generate content that is defamatory, obscene, or harassing.</li>
        <li>Attempt to reverse engineer, decompile, or extract the AI models.</li>
        <li>Resell, sublicense, or redistribute the Service without authorization.</li>
      </ul>

      <h2 className="text-xl font-bold text-[#111827] mt-10 mb-4">6. Intellectual Property</h2>
      <p className="text-[#374151] leading-relaxed mb-4">
        <strong>Content You Generate:</strong> You retain all rights to the product images, videos, copywriting,
        and other content you generate using CommerceOS. We do not claim ownership of your generated content.
      </p>
      <p className="text-[#374151] leading-relaxed mb-4">
        <strong>Platform IP:</strong> CommerceOS, its branding, logo, software, AI models, Skill Engine,
        and underlying technology are owned by CommerceOS and protected by intellectual property laws.
        You may not copy, modify, or distribute them without permission.
      </p>
      <p className="text-[#374151] leading-relaxed mb-4">
        <strong>Third-Party Platforms:</strong> When you publish to platforms like Amazon, Shopify, or Taobao,
        you must also comply with those platforms&apos; respective terms of service.
      </p>

      <h2 className="text-xl font-bold text-[#111827] mt-10 mb-4">7. AI-Generated Content Disclaimer</h2>
      <p className="text-[#374151] leading-relaxed mb-4">
        CommerceOS uses artificial intelligence models to generate content. While we strive for high quality:
      </p>
      <ul className="list-disc pl-6 text-[#374151] leading-relaxed space-y-1 mb-4">
        <li>AI-generated content may contain inaccuracies, artifacts, or unexpected results.</li>
        <li>You are responsible for reviewing and verifying all AI-generated content before use.</li>
        <li>For product listings, ensure compliance with each platform&apos;s content guidelines.</li>
        <li>We do not guarantee that AI-generated copywriting is always factually accurate.</li>
      </ul>

      <h2 className="text-xl font-bold text-[#111827] mt-10 mb-4">8. Limitation of Liability</h2>
      <p className="text-[#374151] leading-relaxed mb-4">
        To the maximum extent permitted by law, CommerceOS shall not be liable for any indirect, incidental,
        special, consequential, or punitive damages, including loss of profits, revenue, data, or business
        opportunities arising from your use of the Service.
      </p>

      <h2 className="text-xl font-bold text-[#111827] mt-10 mb-4">9. Termination</h2>
      <p className="text-[#374151] leading-relaxed mb-4">
        We may terminate or suspend your account for violation of these Terms with or without prior notice.
        Upon termination, your right to use the Service will immediately cease. You may request a copy of
        your generated content within 30 days of termination.
      </p>

      <h2 className="text-xl font-bold text-[#111827] mt-10 mb-4">10. Changes to Terms</h2>
      <p className="text-[#374151] leading-relaxed mb-4">
        We reserve the right to modify these Terms at any time. We will notify users of material changes
        via email or through the Service. Continued use after changes constitutes acceptance.
      </p>

      <h2 className="text-xl font-bold text-[#111827] mt-10 mb-4">11. Contact</h2>
      <p className="text-[#374151] leading-relaxed mb-12">
        For questions about these Terms, contact us at{' '}
        <a href="mailto:legal@commerceos.ai" className="text-[#7C3AED] hover:underline">legal@commerceos.ai</a>.
      </p>

      {/* ── Divider ── */}
      <hr className="border-[#E5E7EB] my-12" />

      {/* ── 中文版 ── */}
      <h1 className="text-3xl font-bold text-[#111827] mb-2 tracking-tight">服务条款</h1>
      <p className="text-sm text-[#9CA3AF] mb-12">最后更新：2026年6月25日</p>

      <h2 className="text-xl font-bold text-[#111827] mt-10 mb-4">1. 条款接受</h2>
      <p className="text-[#374151] leading-relaxed mb-4">
        访问或使用 CommerceOS（以下简称"本服务"），即表示您同意受本服务条款（以下简称"条款"）的约束。
        如果您不同意，请勿使用本服务。
      </p>

      <h2 className="text-xl font-bold text-[#111827] mt-10 mb-4">2. 服务描述</h2>
      <p className="text-[#374151] leading-relaxed mb-4">
        CommerceOS 是一个全球 AI 电商操作系统，提供 AI 驱动的工具，用于生成商品图片、视频、
        文案、SEO 优化、翻译，并发布到包括 Amazon、Shopify、TikTok Shop、淘宝、抖音、
        Shopee、Lazada 等在内的电商平台。
      </p>
      <p className="text-[#374151] leading-relaxed mb-4">
        本服务以订阅制提供，分为免费版、入门版、专业版和企业版，功能和用量限制因套餐而异。
      </p>

      <h2 className="text-xl font-bold text-[#111827] mt-10 mb-4">3. 账号注册</h2>
      <p className="text-[#374151] leading-relaxed mb-2">创建账号时，您必须提供准确完整的信息：</p>
      <ul className="list-disc pl-6 text-[#374151] leading-relaxed space-y-1 mb-4">
        <li>您必须年满 18 周岁或已获得法定监护人同意。</li>
        <li>您有责任维护登录凭据的机密性。</li>
        <li>您对账号下的所有活动负责。</li>
        <li>每人或每个实体仅可持有一个免费试用账号。</li>
        <li>我们保留暂停或终止违反条款的账号的权利。</li>
      </ul>

      <h2 className="text-xl font-bold text-[#111827] mt-10 mb-4">4. 订阅与支付</h2>
      <p className="text-[#374151] leading-relaxed mb-2">付费订阅按月或按年计费：</p>
      <ul className="list-disc pl-6 text-[#374151] leading-relaxed space-y-1 mb-4">
        <li>费用按期预付，到期自动续费。</li>
        <li>年付享受 33% 折扣。</li>
        <li>您可随时取消，取消在当前计费周期结束后生效。</li>
        <li>除法律要求外，计费周期内部分使用不予退款。</li>
        <li>用量配额在每个计费周期开始时重置。</li>
      </ul>

      <h2 className="text-xl font-bold text-[#111827] mt-10 mb-4">5. 可接受使用</h2>
      <p className="text-[#374151] leading-relaxed mb-2">您同意不使用本服务进行以下行为：</p>
      <ul className="list-disc pl-6 text-[#374151] leading-relaxed space-y-1 mb-4">
        <li>生成违反适用法律法规的内容。</li>
        <li>创建假冒、欺诈或误导性商品列表。</li>
        <li>侵犯他人的知识产权。</li>
        <li>生成诽谤、淫秽或骚扰性内容。</li>
        <li>试图逆向工程、反编译或提取 AI 模型。</li>
        <li>未经授权转售、再许可或分发本服务。</li>
      </ul>

      <h2 className="text-xl font-bold text-[#111827] mt-10 mb-4">6. 知识产权</h2>
      <p className="text-[#374151] leading-relaxed mb-4">
        <strong>您生成的内容：</strong>您保留使用 CommerceOS 生成的商品图片、视频、文案及其他内容的所有权利。
        我们不主张对您生成的内容拥有所有权。
      </p>
      <p className="text-[#374151] leading-relaxed mb-4">
        <strong>平台知识产权：</strong>CommerceOS 的品牌、Logo、软件、AI 模型、Skill Engine 及底层技术
        归 CommerceOS 所有，受知识产权法律保护。未经许可，您不得复制、修改或分发这些内容。
      </p>
      <p className="text-[#374151] leading-relaxed mb-4">
        <strong>第三方平台：</strong>当您将内容发布到 Amazon、Shopify、淘宝等平台时，您也必须遵守
        这些平台各自的服务条款。
      </p>

      <h2 className="text-xl font-bold text-[#111827] mt-10 mb-4">7. AI 生成内容免责声明</h2>
      <p className="text-[#374151] leading-relaxed mb-4">
        CommerceOS 使用人工智能模型生成内容。尽管我们致力于高质量输出：
      </p>
      <ul className="list-disc pl-6 text-[#374151] leading-relaxed space-y-1 mb-4">
        <li>AI 生成的内容可能存在不准确、瑕疵或意外结果。</li>
        <li>您有责任在使用前审核和验证所有 AI 生成的内容。</li>
        <li>商品列表须确保符合各平台的内容指南。</li>
        <li>我们不保证 AI 生成的文案始终在事实层面完全准确。</li>
      </ul>

      <h2 className="text-xl font-bold text-[#111827] mt-10 mb-4">8. 责任限制</h2>
      <p className="text-[#374151] leading-relaxed mb-4">
        在法律允许的最大范围内，CommerceOS 不对因使用本服务而产生的任何间接、附带、特殊、
        结果性或惩罚性损害赔偿承担责任，包括利润损失、收入损失、数据丢失或商业机会丧失。
      </p>

      <h2 className="text-xl font-bold text-[#111827] mt-10 mb-4">9. 终止</h2>
      <p className="text-[#374151] leading-relaxed mb-4">
        我们可在有或没有事先通知的情况下终止或暂停违反条款的账号。终止后，您使用本服务的权利
        将立即停止。您可在终止后 30 天内申请获取您生成的内容的副本。
      </p>

      <h2 className="text-xl font-bold text-[#111827] mt-10 mb-4">10. 条款变更</h2>
      <p className="text-[#374151] leading-relaxed mb-4">
        我们保留随时修改本条款的权利。重大变更将通过邮件或服务内通知告知用户。
        变更后继续使用即表示接受。
      </p>

      <h2 className="text-xl font-bold text-[#111827] mt-10 mb-4">11. 联系方式</h2>
      <p className="text-[#374151] leading-relaxed mb-4">
        如有条款相关问题，请联系{' '}
        <a href="mailto:legal@commerceos.ai" className="text-[#7C3AED] hover:underline">legal@commerceos.ai</a>。
      </p>
    </article>
  );
}
