import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy — CommerceOS',
  description: 'CommerceOS Privacy Policy — How we handle your data',
};

export default function PrivacyPage() {
  return (
    <article className="prose prose-slate max-w-none">
      <p className="text-xs text-[#9CA3AF] uppercase tracking-wider mb-2">Legal</p>
      <h1 className="text-3xl font-bold text-[#111827] mb-2 tracking-tight">Privacy Policy</h1>
      <p className="text-sm text-[#9CA3AF] mb-12">Last updated: June 25, 2026</p>

      {/* ── English ── */}

      <h2 className="text-xl font-bold text-[#111827] mt-10 mb-4">1. Introduction</h2>
      <p className="text-[#374151] leading-relaxed mb-4">
        CommerceOS (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) is committed to protecting your privacy. This Privacy Policy
        explains how we collect, use, disclose, and safeguard your information when you use our Global AI
        E-commerce Operating System.
      </p>

      <h2 className="text-xl font-bold text-[#111827] mt-10 mb-4">2. Information We Collect</h2>

      <h3 className="text-lg font-semibold text-[#111827] mt-6 mb-2">2.1 Account Information</h3>
      <ul className="list-disc pl-6 text-[#374151] leading-relaxed space-y-1 mb-4">
        <li>Email address</li>
        <li>Password (hashed and salted — we never store plain-text passwords)</li>
        <li>Account preferences and language settings</li>
      </ul>

      <h3 className="text-lg font-semibold text-[#111827] mt-6 mb-2">2.2 Product Data You Upload</h3>
      <ul className="list-disc pl-6 text-[#374151] leading-relaxed space-y-1 mb-4">
        <li>Product photos you upload for AI generation</li>
        <li>Product descriptions, titles, and other text you provide</li>
        <li>Brand and category selections</li>
      </ul>

      <h3 className="text-lg font-semibold text-[#111827] mt-6 mb-2">2.3 Generated Content</h3>
      <ul className="list-disc pl-6 text-[#374151] leading-relaxed space-y-1 mb-4">
        <li>AI-generated product images, videos, and copywriting</li>
        <li>SEO metadata and translations</li>
        <li>Workflow history and project data</li>
      </ul>

      <h3 className="text-lg font-semibold text-[#111827] mt-6 mb-2">2.4 Usage Data</h3>
      <ul className="list-disc pl-6 text-[#374151] leading-relaxed space-y-1 mb-4">
        <li>Feature usage statistics (images generated, videos created, etc.)</li>
        <li>Subscription plan and billing history</li>
        <li>Technical logs for debugging and service improvement</li>
      </ul>

      <h3 className="text-lg font-semibold text-[#111827] mt-6 mb-2">2.5 Automatically Collected Information</h3>
      <ul className="list-disc pl-6 text-[#374151] leading-relaxed space-y-1 mb-4">
        <li>Browser type, device type, and operating system</li>
        <li>IP address and approximate location (country/city level)</li>
        <li>Pages visited and features used</li>
        <li>Cookies and similar technologies for session management and analytics</li>
      </ul>

      <h2 className="text-xl font-bold text-[#111827] mt-10 mb-4">3. How We Use Your Information</h2>
      <p className="text-[#374151] leading-relaxed mb-2">We use your information to:</p>
      <ul className="list-disc pl-6 text-[#374151] leading-relaxed space-y-1 mb-4">
        <li>Provide, maintain, and improve the CommerceOS Service.</li>
        <li>Process AI generation requests and deliver generated content.</li>
        <li>Manage your account, subscriptions, and billing.</li>
        <li>Track usage quotas and enforce plan limits.</li>
        <li>Send service-related communications (account updates, billing notices).</li>
        <li>Analyze usage patterns to improve AI model quality and user experience.</li>
        <li>Detect, prevent, and address technical issues, fraud, or abuse.</li>
        <li>Comply with legal obligations.</li>
      </ul>

      <h2 className="text-xl font-bold text-[#111827] mt-10 mb-4">4. Data Sharing and Disclosure</h2>
      <p className="text-[#374151] leading-relaxed mb-4">
        <strong>We do not sell your personal data.</strong> We may share information in the following circumstances:
      </p>
      <ul className="list-disc pl-6 text-[#374151] leading-relaxed space-y-1 mb-4">
        <li>
          <strong>AI Model Providers:</strong> Your product images and text prompts are transmitted to our
          AI model providers (e.g., FLUX for images, Kling/Veo for videos) solely for the purpose of
          generating your requested content. These providers do not use your data to train their models.
        </li>
        <li>
          <strong>E-commerce Platforms:</strong> When you choose to publish content to platforms like Amazon,
          Shopify, or Taobao, the generated content is transmitted to those platforms via their APIs.
        </li>
        <li>
          <strong>Service Providers:</strong> We use trusted third-party services for cloud infrastructure
          (Supabase), email delivery, and analytics. These providers are contractually bound to data
          protection obligations.
        </li>
        <li>
          <strong>Legal Requirements:</strong> We may disclose information if required by law, regulation,
          legal process, or governmental request.
        </li>
      </ul>

      <h2 className="text-xl font-bold text-[#111827] mt-10 mb-4">5. Data Storage and Security</h2>
      <ul className="list-disc pl-6 text-[#374151] leading-relaxed space-y-1 mb-4">
        <li>Data is stored on secure cloud infrastructure with encryption at rest and in transit.</li>
        <li>Passwords are hashed using industry-standard algorithms (bcrypt).</li>
        <li>We implement reasonable technical and organizational measures to protect your data.</li>
        <li>Generated content is retained for the duration of your account plus 30 days after termination.</li>
        <li>Uploaded product images are retained only as needed to provide the Service (typically 90 days after last use).</li>
      </ul>

      <h2 className="text-xl font-bold text-[#111827] mt-10 mb-4">6. Your Rights</h2>
      <p className="text-[#374151] leading-relaxed mb-2">Depending on your jurisdiction, you may have the right to:</p>
      <ul className="list-disc pl-6 text-[#374151] leading-relaxed space-y-1 mb-4">
        <li>Access the personal data we hold about you.</li>
        <li>Correct inaccurate or incomplete data.</li>
        <li>Delete your account and associated data.</li>
        <li>Export your generated content and upload history.</li>
        <li>Withdraw consent for non-essential data processing.</li>
        <li>Lodge a complaint with your local data protection authority.</li>
      </ul>
      <p className="text-[#374151] leading-relaxed mb-4">
        To exercise these rights, contact us at{' '}
        <a href="mailto:privacy@commerceos.ai" className="text-[#7C3AED] hover:underline">privacy@commerceos.ai</a>.
      </p>

      <h2 className="text-xl font-bold text-[#111827] mt-10 mb-4">7. Cookies</h2>
      <p className="text-[#374151] leading-relaxed mb-4">
        We use essential cookies for authentication and session management. We may use analytics cookies
        to understand how our Service is used. You can control cookie preferences through your browser
        settings. Disabling essential cookies may affect Service functionality.
      </p>

      <h2 className="text-xl font-bold text-[#111827] mt-10 mb-4">8. International Data Transfers</h2>
      <p className="text-[#374151] leading-relaxed mb-4">
        CommerceOS operates globally. Your data may be processed in countries other than your country of
        residence, including the United States, Singapore, and the European Union. We ensure appropriate
        safeguards are in place for cross-border data transfers.
      </p>

      <h2 className="text-xl font-bold text-[#111827] mt-10 mb-4">9. Children&apos;s Privacy</h2>
      <p className="text-[#374151] leading-relaxed mb-4">
        Our Service is not intended for individuals under the age of 18. We do not knowingly collect
        personal information from children. If we become aware that a child has provided us with personal data,
        we will delete it.
      </p>

      <h2 className="text-xl font-bold text-[#111827] mt-10 mb-4">10. Changes to This Policy</h2>
      <p className="text-[#374151] leading-relaxed mb-4">
        We may update this Privacy Policy from time to time. We will notify you of material changes via
        email or through the Service. Continued use after changes constitutes acceptance.
      </p>

      <h2 className="text-xl font-bold text-[#111827] mt-10 mb-4">11. Contact Us</h2>
      <p className="text-[#374151] leading-relaxed mb-4">
        For privacy-related inquiries, contact our Data Protection Officer at{' '}
        <a href="mailto:privacy@commerceos.ai" className="text-[#7C3AED] hover:underline">privacy@commerceos.ai</a>.
      </p>

      {/* ── Divider ── */}
      <hr className="border-[#E5E7EB] my-12" />

      {/* ── 中文版 ── */}
      <h1 className="text-3xl font-bold text-[#111827] mb-2 tracking-tight">隐私政策</h1>
      <p className="text-sm text-[#9CA3AF] mb-12">最后更新：2026年6月25日</p>

      <h2 className="text-xl font-bold text-[#111827] mt-10 mb-4">1. 引言</h2>
      <p className="text-[#374151] leading-relaxed mb-4">
        CommerceOS（以下简称"我们"）致力于保护您的隐私。本隐私政策说明了我们在您使用
        全球 AI 电商操作系统时如何收集、使用、披露和保护您的信息。
      </p>

      <h2 className="text-xl font-bold text-[#111827] mt-10 mb-4">2. 我们收集的信息</h2>

      <h3 className="text-lg font-semibold text-[#111827] mt-6 mb-2">2.1 账号信息</h3>
      <ul className="list-disc pl-6 text-[#374151] leading-relaxed space-y-1 mb-4">
        <li>电子邮箱地址</li>
        <li>密码（经过哈希加盐处理——我们绝不存储明文密码）</li>
        <li>账号偏好和语言设置</li>
      </ul>

      <h3 className="text-lg font-semibold text-[#111827] mt-6 mb-2">2.2 您上传的商品数据</h3>
      <ul className="list-disc pl-6 text-[#374151] leading-relaxed space-y-1 mb-4">
        <li>您上传的用于 AI 生成的商品照片</li>
        <li>您提供的商品描述、标题和其他文本</li>
        <li>品牌和品类选择</li>
      </ul>

      <h3 className="text-lg font-semibold text-[#111827] mt-6 mb-2">2.3 生成的内容</h3>
      <ul className="list-disc pl-6 text-[#374151] leading-relaxed space-y-1 mb-4">
        <li>AI 生成的商品图片、视频和文案</li>
        <li>SEO 元数据和翻译</li>
        <li>工作流历史和项目数据</li>
      </ul>

      <h3 className="text-lg font-semibold text-[#111827] mt-6 mb-2">2.4 使用数据</h3>
      <ul className="list-disc pl-6 text-[#374151] leading-relaxed space-y-1 mb-4">
        <li>功能使用统计（生成图片数、创建视频数等）</li>
        <li>订阅套餐和账单历史</li>
        <li>用于调试和服务改进的技术日志</li>
      </ul>

      <h3 className="text-lg font-semibold text-[#111827] mt-6 mb-2">2.5 自动收集的信息</h3>
      <ul className="list-disc pl-6 text-[#374151] leading-relaxed space-y-1 mb-4">
        <li>浏览器类型、设备类型和操作系统</li>
        <li>IP 地址和大致位置（国家/城市级别）</li>
        <li>访问页面和使用功能</li>
        <li>用于会话管理和分析的 Cookie 及同类技术</li>
      </ul>

      <h2 className="text-xl font-bold text-[#111827] mt-10 mb-4">3. 我们如何使用您的信息</h2>
      <p className="text-[#374151] leading-relaxed mb-2">我们将您的信息用于：</p>
      <ul className="list-disc pl-6 text-[#374151] leading-relaxed space-y-1 mb-4">
        <li>提供、维护和改进 CommerceOS 服务。</li>
        <li>处理 AI 生成请求并交付生成的内容。</li>
        <li>管理您的账号、订阅和计费。</li>
        <li>跟踪用量配额并执行套餐限制。</li>
        <li>发送与服务相关的通信（账号更新、账单通知）。</li>
        <li>分析使用模式以改进 AI 模型质量和用户体验。</li>
        <li>检测、预防和处理技术问题、欺诈或滥用。</li>
        <li>遵守法律义务。</li>
      </ul>

      <h2 className="text-xl font-bold text-[#111827] mt-10 mb-4">4. 数据共享与披露</h2>
      <p className="text-[#374151] leading-relaxed mb-4">
        <strong>我们不出售您的个人数据。</strong>在以下情况下我们可能共享信息：
      </p>
      <ul className="list-disc pl-6 text-[#374151] leading-relaxed space-y-1 mb-4">
        <li>
          <strong>AI 模型提供商：</strong>您的商品图片和文本提示会传输给我们的 AI 模型提供商
          （例如 FLUX 用于图片、Kling/Veo 用于视频），仅用于生成您请求的内容。
          这些提供商不会使用您的数据训练模型。
        </li>
        <li>
          <strong>电商平台：</strong>当您选择将内容发布到 Amazon、Shopify、淘宝等平台时，
          生成的内容会通过 API 传输到这些平台。
        </li>
        <li>
          <strong>服务提供商：</strong>我们使用可信的第三方服务提供云基础设施（Supabase）、
          邮件发送和分析服务。这些提供商在合同上受数据保护义务约束。
        </li>
        <li>
          <strong>法律要求：</strong>如果法律、法规、法律程序或政府要求需要，我们可能披露信息。
        </li>
      </ul>

      <h2 className="text-xl font-bold text-[#111827] mt-10 mb-4">5. 数据存储与安全</h2>
      <ul className="list-disc pl-6 text-[#374151] leading-relaxed space-y-1 mb-4">
        <li>数据存储在安全的云基础设施上，静态和传输中均加密。</li>
        <li>密码使用行业标准算法（bcrypt）进行哈希处理。</li>
        <li>我们实施合理的技术和组织措施来保护您的数据。</li>
        <li>生成的内容保留至账号存续期间，终止后保留 30 天。</li>
        <li>上传的商品图片仅在提供服务所需的时间内保留（通常为最后使用后 90 天）。</li>
      </ul>

      <h2 className="text-xl font-bold text-[#111827] mt-10 mb-4">6. 您的权利</h2>
      <p className="text-[#374151] leading-relaxed mb-2">根据您所在的司法管辖区，您可能有权：</p>
      <ul className="list-disc pl-6 text-[#374151] leading-relaxed space-y-1 mb-4">
        <li>访问我们持有的关于您的个人数据。</li>
        <li>更正不准确或不完整的数据。</li>
        <li>删除您的账号和相关数据。</li>
        <li>导出您生成的内容和上传历史。</li>
        <li>撤回对非必要数据处理的同意。</li>
        <li>向您当地的数据保护机构提出投诉。</li>
      </ul>
      <p className="text-[#374151] leading-relaxed mb-4">
        如需行使这些权利，请联系{' '}
        <a href="mailto:privacy@commerceos.ai" className="text-[#7C3AED] hover:underline">privacy@commerceos.ai</a>。
      </p>

      <h2 className="text-xl font-bold text-[#111827] mt-10 mb-4">7. Cookie</h2>
      <p className="text-[#374151] leading-relaxed mb-4">
        我们使用必要的 Cookie 进行身份验证和会话管理。我们可能使用分析 Cookie
        来了解服务的使用情况。您可以通过浏览器设置控制 Cookie 偏好。禁用必要的 Cookie
        可能影响服务功能。
      </p>

      <h2 className="text-xl font-bold text-[#111827] mt-10 mb-4">8. 国际数据传输</h2>
      <p className="text-[#374151] leading-relaxed mb-4">
        CommerceOS 全球运营。您的数据可能在您居住国以外的国家处理，
        包括美国、新加坡和欧盟。我们确保为跨境数据传输设置适当的保护措施。
      </p>

      <h2 className="text-xl font-bold text-[#111827] mt-10 mb-4">9. 儿童隐私</h2>
      <p className="text-[#374151] leading-relaxed mb-4">
        我们的服务不面向 18 岁以下个人。我们不会故意收集儿童的个人信息。如果我们
        发现儿童向我们提供了个人数据，我们将予以删除。
      </p>

      <h2 className="text-xl font-bold text-[#111827] mt-10 mb-4">10. 本政策变更</h2>
      <p className="text-[#374151] leading-relaxed mb-4">
        我们可能不时更新本隐私政策。重大变更将通过邮件或服务内通知告知。
        变更后继续使用即表示接受。
      </p>

      <h2 className="text-xl font-bold text-[#111827] mt-10 mb-4">11. 联系我们</h2>
      <p className="text-[#374151] leading-relaxed mb-4">
        如有隐私相关问题，请联系我们的数据保护官{' '}
        <a href="mailto:privacy@commerceos.ai" className="text-[#7C3AED] hover:underline">privacy@commerceos.ai</a>。
      </p>
    </article>
  );
}
