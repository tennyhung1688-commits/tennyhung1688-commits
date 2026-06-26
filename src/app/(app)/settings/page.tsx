'use client';

import { useState } from 'react';
import {
  User, Building2, CreditCard, Key, Users, Link,
  Globe, Cpu, Bell, Save, Copy, Eye, EyeOff,
  Plus, Trash2, Check, X, ExternalLink, Zap, Crown
} from 'lucide-react';
import { useLang } from '@/lib/i18n';

const settingsSections = [
  { id: 'account', icon: User, label: 'Account', zh: '账号', desc: 'Email, password, profile', descZh: '邮箱、密码、个人资料' },
  { id: 'organization', icon: Building2, label: 'Organization', zh: '组织', desc: 'Workspaces, teams, departments', descZh: '工作区、团队、部门' },
  { id: 'billing', icon: CreditCard, label: 'Billing', zh: '计费', desc: 'Plan, invoices, payment methods', descZh: '套餐、发票、支付方式' },
  { id: 'api', icon: Key, label: 'API Keys', zh: 'API 密钥', desc: 'Manage API keys for integrations', descZh: '管理集成 API 密钥' },
  { id: 'team', icon: Users, label: 'Team', zh: '团队', desc: 'Members, roles, permissions', descZh: '成员、角色、权限' },
  { id: 'integrations', icon: Link, label: 'Integrations', zh: '集成', desc: 'Connected platforms and services', descZh: '已连接的平台和服务' },
  { id: 'language', icon: Globe, label: 'Language', zh: '语言', desc: 'Interface language and region', descZh: '界面语言和地区' },
  { id: 'models', icon: Cpu, label: 'Models', zh: '模型', desc: 'AI model preferences and routing', descZh: 'AI 模型偏好和路由' },
  { id: 'notifications', icon: Bell, label: 'Notifications', zh: '通知', desc: 'Email, in-app, and webhook alerts', descZh: '邮件、站内和 Webhook 通知' },
];

/* ── Mock data ── */
const teamMembers = [
  { name: 'Tenny', email: 'tenny@commerceos.ai', role: 'Admin', avatar: 'TN' },
  { name: 'Alex Chen', email: 'alex@commerceos.ai', role: 'Editor', avatar: 'AC' },
  { name: 'Lisa Wang', email: 'lisa@commerceos.ai', role: 'Viewer', avatar: 'LW' },
];

const platformIntegrations = [
  { name: 'Amazon', connected: true, icon: '📦' },
  { name: 'Shopify', connected: true, icon: '🛒' },
  { name: 'TikTok Shop', connected: false, icon: '🎵' },
  { name: 'Shopee', connected: true, icon: '🛍️' },
  { name: 'Lazada', connected: false, icon: '🏪' },
  { name: 'Temu', connected: true, icon: '📱' },
  { name: 'eBay', connected: false, icon: '🏷️' },
  { name: 'Taobao', connected: false, icon: '🔶' },
];

const availableModels = [
  { id: 'flux', name: 'FLUX 1.1 Pro', category: 'Image', provider: 'Black Forest Labs' },
  { id: 'gpt-image', name: 'GPT Image', category: 'Image', provider: 'OpenAI' },
  { id: 'imagen', name: 'Imagen 3', category: 'Image', provider: 'Google' },
  { id: 'kling', name: 'Kling 2', category: 'Video', provider: 'Kuaishou' },
  { id: 'veo', name: 'Veo 3', category: 'Video', provider: 'Google' },
  { id: 'gpt-4', name: 'GPT-4', category: 'Text', provider: 'OpenAI' },
  { id: 'claude', name: 'Claude 3.5', category: 'Text', provider: 'Anthropic' },
];

export default function SettingsPage() {
  const { t } = useLang();
  const [activeSection, setActiveSection] = useState('account');
  const [saved, setSaved] = useState(false);

  /* Account */
  const [email, setEmail] = useState('tenny@commerceos.ai');
  const [displayName, setDisplayName] = useState('Tenny');
  const [showPassword, setShowPassword] = useState(false);

  /* Organization */
  const [orgName, setOrgName] = useState('CommerceOS Labs');
  const [orgDesc, setOrgDesc] = useState('AI-powered global e-commerce operations');
  const [workspaceName, setWorkspaceName] = useState('Main Workspace');

  /* Billing */
  const [currentPlan] = useState('Pro');

  /* API */
  const [apiKeys, setApiKeys] = useState([
    { id: '1', name: 'Production', key: 'cos_live_●●●●●●●●●●●●●●ab12', created: '2026-06-01', lastUsed: '2026-06-25' },
  ]);
  const [showNewKey, setShowNewKey] = useState(false);
  const [newKeyName, setNewKeyName] = useState('');

  /* Team */
  const [members] = useState(teamMembers);

  /* Integrations */
  const [integrations] = useState(platformIntegrations);

  /* Language */
  const [lang, setLang] = useState('zh');

  /* Models */
  const [modelPrefs, setModelPrefs] = useState({
    image: 'flux',
    video: 'kling',
    copywriting: 'gpt-4',
    seo: 'gpt-4',
    translation: 'gpt-4',
  });

  /* Notifications */
  const [notifs, setNotifs] = useState({
    emailGeneration: true,
    emailBilling: true,
    emailMarketing: false,
    inAppGeneration: true,
    inAppTeam: true,
    webhookEnabled: false,
    webhookUrl: '',
  });

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const currentSection = settingsSections.find(s => s.id === activeSection)!;

  return (
    <div className="px-8 py-8 max-w-7xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-[#111827] tracking-tight">
            {t('Settings', '设置')}
          </h1>
          <p className="text-sm text-[#6B7280] mt-1">
            {t('Manage your account, organization, and preferences.', '管理账号、组织和偏好设置。')}
          </p>
        </div>
      </div>

      <div className="flex gap-6">
        {/* Left nav */}
        <div className="w-52 flex-shrink-0 space-y-0.5">
          {settingsSections.map(s => (
            <button
              key={s.id}
              onClick={() => setActiveSection(s.id)}
              className={`w-full text-left flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                activeSection === s.id
                  ? 'bg-[#7C3AED]/10 text-[#7C3AED]'
                  : 'text-[#6B7280] hover:text-[#111827] hover:bg-[#F5F5F5]'
              }`}
            >
              <s.icon className="w-4 h-4" />
              {t(s.label, s.zh)}
            </button>
          ))}
        </div>

        {/* Right content */}
        <div className="flex-1 min-w-0">
          <div className="bg-white rounded-2xl border border-[#E5E7EB] p-6">
            <h2 className="text-base font-bold text-[#111827] mb-1">
              {t(currentSection.label, currentSection.zh)}
            </h2>
            <p className="text-xs text-[#9CA3AF] mb-6">
              {t(currentSection.desc, currentSection.descZh)}
            </p>

            {/* ── Account ── */}
            {activeSection === 'account' && (
              <div className="space-y-5 max-w-md">
                <div>
                  <label className="block text-sm font-medium text-[#374151] mb-1.5">{t('Email', '邮箱')}</label>
                  <input type="email" value={email} onChange={e => setEmail(e.target.value)}
                    className="w-full px-4 py-2.5 border border-[#E5E7EB] rounded-xl text-sm bg-white focus:ring-2 focus:ring-[#7C3AED]/20 focus:border-[#7C3AED] outline-none transition-all" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#374151] mb-1.5">{t('Display Name', '显示名称')}</label>
                  <input type="text" value={displayName} onChange={e => setDisplayName(e.target.value)}
                    className="w-full px-4 py-2.5 border border-[#E5E7EB] rounded-xl text-sm bg-white focus:ring-2 focus:ring-[#7C3AED]/20 focus:border-[#7C3AED] outline-none transition-all" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#374151] mb-1.5">{t('Password', '密码')}</label>
                  <div className="relative">
                    <input type={showPassword ? 'text' : 'password'} defaultValue="●●●●●●●●"
                      className="w-full px-4 py-2.5 pr-10 border border-[#E5E7EB] rounded-xl text-sm bg-white focus:ring-2 focus:ring-[#7C3AED]/20 focus:border-[#7C3AED] outline-none transition-all" />
                    <button onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9CA3AF] hover:text-[#6B7280] transition-colors">
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
                <button
                  onClick={() => alert('Password reset email sent!')}
                  className="text-sm text-[#7C3AED] hover:text-[#6D28D9] font-medium transition-colors">
                  {t('Change Password', '修改密码')}
                </button>
              </div>
            )}

            {/* ── Organization ── */}
            {activeSection === 'organization' && (
              <div className="space-y-5 max-w-md">
                <div>
                  <label className="block text-sm font-medium text-[#374151] mb-1.5">{t('Organization Name', '组织名称')}</label>
                  <input type="text" value={orgName} onChange={e => setOrgName(e.target.value)}
                    className="w-full px-4 py-2.5 border border-[#E5E7EB] rounded-xl text-sm bg-white focus:ring-2 focus:ring-[#7C3AED]/20 focus:border-[#7C3AED] outline-none transition-all" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#374151] mb-1.5">{t('Description', '描述')}</label>
                  <textarea value={orgDesc} onChange={e => setOrgDesc(e.target.value)} rows={2}
                    className="w-full px-4 py-2.5 border border-[#E5E7EB] rounded-xl text-sm bg-white focus:ring-2 focus:ring-[#7C3AED]/20 focus:border-[#7C3AED] outline-none transition-all resize-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#374151] mb-1.5">{t('Default Workspace', '默认工作区')}</label>
                  <select value={workspaceName} onChange={e => setWorkspaceName(e.target.value)}
                    className="w-full px-4 py-2.5 border border-[#E5E7EB] rounded-xl text-sm bg-white focus:ring-2 focus:ring-[#7C3AED]/20 focus:border-[#7C3AED] outline-none transition-all">
                    <option>Main Workspace</option>
                    <option>Amazon Team</option>
                    <option>TikTok Team</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#374151] mb-1.5">{t('Organization Logo', '组织 Logo')}</label>
                  <div className="flex items-center gap-3">
                    <div className="w-14 h-14 rounded-xl bg-[#7C3AED] flex items-center justify-center text-white font-bold text-lg shadow-sm">COS</div>
                    <button
                      onClick={() => alert('File picker would open')}
                      className="px-4 py-2 border border-[#E5E7EB] rounded-xl text-sm text-[#6B7280] hover:bg-[#FAFAFA] transition-all">
                      {t('Upload Logo', '上传 Logo')}
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* ── Billing ── */}
            {activeSection === 'billing' && (
              <div className="space-y-5 max-w-lg">
                {/* Current plan */}
                <div className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-br from-[#7C3AED]/5 to-[#7C3AED]/10 border border-[#7C3AED]/20">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#7C3AED] flex items-center justify-center">
                      <Crown className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-[#111827]">{currentPlan} Plan</p>
                      <p className="text-xs text-[#6B7280]">¥199/月 · 200 图 · 60 视频 · 文案无限</p>
                    </div>
                  </div>
                  <button
                    onClick={() => window.location.href = '/pricing'}
                    className="px-4 py-2 bg-[#7C3AED] text-white rounded-xl text-sm font-semibold hover:bg-[#6D28D9] transition-all">
                    {t('Upgrade', '升级')}
                  </button>
                </div>

                {/* Usage */}
                <div>
                  <h3 className="text-sm font-bold text-[#111827] mb-3">{t('Current Usage', '当前用量')}</h3>
                  <div className="space-y-3">
                    {[
                      { label: '图片生成', enLabel: 'Images', used: 87, total: 200, color: '#7C3AED' },
                      { label: '视频生成', enLabel: 'Videos', used: 24, total: 60, color: '#8B5CF6' },
                      { label: '文案生成', enLabel: 'Copywriting', used: 156, total: Infinity, color: '#06B6D4' },
                    ].map((item, i) => (
                      <div key={i}>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs text-[#6B7280]">{t(item.enLabel, item.label)}</span>
                          <span className="text-xs font-semibold text-[#111827]">{item.used} / {item.total === Infinity ? '∞' : item.total}</span>
                        </div>
                        <div className="w-full h-2 bg-[#F3F4F6] rounded-full overflow-hidden">
                          <div className="h-full rounded-full transition-all duration-500" style={{
                            width: `${item.total === Infinity ? 15 : (item.used / item.total) * 100}%`,
                            backgroundColor: item.color
                          }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Billing history */}
                <div>
                  <h3 className="text-sm font-bold text-[#111827] mb-3">{t('Billing History', '账单历史')}</h3>
                  <div className="space-y-2">
                    {[
                      { date: '2026-06-01', amount: '¥199.00', status: 'Paid' },
                      { date: '2026-05-01', amount: '¥199.00', status: 'Paid' },
                      { date: '2026-04-01', amount: '¥199.00', status: 'Paid' },
                    ].map((inv, i) => (
                      <div key={i} className="flex items-center justify-between px-4 py-2.5 rounded-lg border border-[#E5E7EB]">
                        <span className="text-sm text-[#374151]">{inv.date}</span>
                        <div className="flex items-center gap-3">
                          <span className="text-sm font-semibold text-[#111827]">{inv.amount}</span>
                          <span className="text-xs px-2 py-0.5 bg-emerald-50 text-emerald-700 rounded-full font-medium">{inv.status}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* ── API Keys ── */}
            {activeSection === 'api' && (
              <div className="space-y-5 max-w-lg">
                <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-sm text-amber-800">
                  {t('API keys grant full access to your account. Keep them secret.', 'API 密钥拥有账户完整权限，请妥善保管。')}
                </div>

                {apiKeys.map(k => (
                  <div key={k.id} className="flex items-center justify-between p-4 rounded-xl border border-[#E5E7EB]">
                    <div>
                      <p className="text-sm font-semibold text-[#111827]">{k.name}</p>
                      <p className="text-xs text-[#9CA3AF] font-mono mt-0.5">{k.key}</p>
                      <p className="text-xs text-[#9CA3AF] mt-1">{t('Created', '创建')}: {k.created} · {t('Last used', '最近使用')}: {k.lastUsed}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => navigator.clipboard.writeText('cos_live_demo_key_12345').then(() => alert(t('Copied!', '已复制！')))}
                        className="p-2 rounded-lg hover:bg-[#F3F4F6] text-[#6B7280] hover:text-[#111827] transition-all" title={t('Copy', '复制')}>
                        <Copy className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => { if (confirm(t('Revoke this key?', '确认撤销此密钥？'))) { setApiKeys(apiKeys.filter(k2 => k2.id !== k.id)); } }}
                        className="p-2 rounded-lg hover:bg-red-50 text-[#6B7280] hover:text-red-600 transition-all" title={t('Revoke', '撤销')}>
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}

                {showNewKey ? (
                  <div className="flex items-center gap-2">
                    <input type="text" value={newKeyName} onChange={e => setNewKeyName(e.target.value)}
                      placeholder={t('Key name', '密钥名称')}
                      className="flex-1 px-4 py-2.5 border border-[#E5E7EB] rounded-xl text-sm bg-white focus:ring-2 focus:ring-[#7C3AED]/20 focus:border-[#7C3AED] outline-none transition-all" />
                    <button onClick={() => { if (newKeyName) { setApiKeys([...apiKeys, { id: String(apiKeys.length + 1), name: newKeyName, key: 'cos_live_●●●●●●●●●●●●●●xy89', created: new Date().toISOString().slice(0, 10), lastUsed: '-' }]); setNewKeyName(''); setShowNewKey(false); } }}
                      className="px-4 py-2.5 bg-[#7C3AED] text-white rounded-xl text-sm font-semibold hover:bg-[#6D28D9] transition-all">
                      {t('Create', '创建')}
                    </button>
                    <button onClick={() => setShowNewKey(false)}
                      className="px-4 py-2.5 border border-[#E5E7EB] text-[#6B7280] rounded-xl text-sm hover:bg-[#FAFAFA] transition-all">
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <button onClick={() => setShowNewKey(true)}
                    className="inline-flex items-center gap-2 px-4 py-2.5 border-2 border-dashed border-[#D1D5DB] rounded-xl text-sm text-[#6B7280] hover:border-[#7C3AED] hover:text-[#7C3AED] transition-all">
                    <Plus className="w-4 h-4" />
                    {t('Create API Key', '创建 API 密钥')}
                  </button>
                )}
              </div>
            )}

            {/* ── Team ── */}
            {activeSection === 'team' && (
              <div className="space-y-4 max-w-lg">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-[#6B7280]">{members.length} {t('members', '位成员')}</p>
                  <button
                    onClick={() => alert(t('Invite form would open', '邀请表单将在此打开'))}
                    className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#7C3AED] text-white rounded-xl text-sm font-semibold hover:bg-[#6D28D9] transition-all">
                    <Plus className="w-4 h-4" />
                    {t('Invite Member', '邀请成员')}
                  </button>
                </div>

                {members.map((m, i) => (
                  <div key={i} className="flex items-center justify-between p-3 rounded-xl border border-[#E5E7EB]">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-[#7C3AED]/10 flex items-center justify-center text-xs font-bold text-[#7C3AED]">
                        {m.avatar}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-[#111827]">{m.name}</p>
                        <p className="text-xs text-[#9CA3AF]">{m.email}</p>
                      </div>
                    </div>
                    <select defaultValue={m.role}
                      className="px-3 py-1.5 border border-[#E5E7EB] rounded-lg text-xs text-[#374151] bg-white outline-none">
                      <option>Admin</option>
                      <option>Editor</option>
                      <option>Viewer</option>
                    </select>
                  </div>
                ))}
              </div>
            )}

            {/* ── Integrations ── */}
            {activeSection === 'integrations' && (
              <div className="space-y-3 max-w-lg">
                {integrations.map((p, i) => (
                  <div key={i} className="flex items-center justify-between p-3 rounded-xl border border-[#E5E7EB] hover:border-[#D1D5DB] transition-all">
                    <div className="flex items-center gap-3">
                      <span className="text-xl">{p.icon}</span>
                      <div>
                        <p className="text-sm font-semibold text-[#111827]">{p.name}</p>
                        <p className="text-xs text-[#9CA3AF]">
                          {p.connected ? t('Connected', '已连接') : t('Not connected', '未连接')}
                        </p>
                      </div>
                    </div>
                    {p.connected ? (
                      <div className="flex items-center gap-2">
                        <span className="flex items-center gap-1 text-xs text-emerald-600 font-medium">
                          <Check className="w-3.5 h-3.5" /> {t('Active', '活跃')}
                        </span>
                        <button
                          onClick={() => alert(t(`Disconnected from ${p.name}`, `已断开 ${p.name}`))}
                          className="text-xs text-[#6B7280] hover:text-red-600 transition-colors">
                          {t('Disconnect', '断开')}
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => alert(t(`Connecting to ${p.name}...`, `正在连接 ${p.name}...`))}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-[#7C3AED] text-[#7C3AED] rounded-lg text-xs font-semibold hover:bg-[#7C3AED]/5 transition-all">
                        <Link className="w-3.5 h-3.5" />
                        {t('Connect', '连接')}
                      </button>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* ── Language ── */}
            {activeSection === 'language' && (
              <div className="space-y-5 max-w-md">
                <div>
                  <label className="block text-sm font-medium text-[#374151] mb-1.5">{t('Interface Language', '界面语言')}</label>
                  <select value={lang} onChange={e => setLang(e.target.value)}
                    className="w-full px-4 py-2.5 border border-[#E5E7EB] rounded-xl text-sm bg-white focus:ring-2 focus:ring-[#7C3AED]/20 focus:border-[#7C3AED] outline-none transition-all">
                    <option value="zh">中文</option>
                    <option value="en">English</option>
                    <option value="ja">日本語</option>
                    <option value="ko">한국어</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#374151] mb-1.5">{t('Region', '地区')}</label>
                  <select defaultValue="cn"
                    className="w-full px-4 py-2.5 border border-[#E5E7EB] rounded-xl text-sm bg-white focus:ring-2 focus:ring-[#7C3AED]/20 focus:border-[#7C3AED] outline-none transition-all">
                    <option value="cn">中国 (China)</option>
                    <option value="us">United States</option>
                    <option value="jp">日本 (Japan)</option>
                    <option value="kr">한국 (Korea)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#374151] mb-1.5">{t('Default Generation Language', '默认生成语言')}</label>
                  <select defaultValue="zh"
                    className="w-full px-4 py-2.5 border border-[#E5E7EB] rounded-xl text-sm bg-white focus:ring-2 focus:ring-[#7C3AED]/20 focus:border-[#7C3AED] outline-none transition-all">
                    <option value="zh">中文</option>
                    <option value="en">English</option>
                    <option value="ja">日本語</option>
                    <option value="ko">한국어</option>
                    <option value="th">ไทย</option>
                    <option value="vi">Tiếng Việt</option>
                  </select>
                </div>
              </div>
            )}

            {/* ── Models ── */}
            {activeSection === 'models' && (
              <div className="space-y-5 max-w-lg">
                <div className="p-3 rounded-xl bg-[#F5F3FF] border border-[#EDE9FE] text-sm text-[#6D28D9]">
                  <Zap className="w-4 h-4 inline mr-1.5 -mt-0.5" />
                  {t('Auto-routing selects the best model per task. You never need to choose manually.', '自动路由为每个任务选择最佳模型，无需手动选择。')}
                </div>

                <div>
                  <h3 className="text-sm font-bold text-[#111827] mb-3">{t('Default Models per Category', '各类别默认模型')}</h3>
                  <div className="space-y-3">
                    {[
                      { key: 'image', label: 'Image Generation', zh: '图片生成' },
                      { key: 'video', label: 'Video Generation', zh: '视频生成' },
                      { key: 'copywriting', label: 'Copywriting', zh: '文案生成' },
                      { key: 'seo', label: 'SEO', zh: 'SEO 优化' },
                      { key: 'translation', label: 'Translation', zh: '翻译' },
                    ].map((item) => (
                      <div key={item.key} className="flex items-center justify-between">
                        <span className="text-sm text-[#374151]">{t(item.label, item.zh)}</span>
                        <select
                          value={modelPrefs[item.key as keyof typeof modelPrefs]}
                          onChange={e => setModelPrefs({ ...modelPrefs, [item.key]: e.target.value })}
                          className="w-48 px-3 py-2 border border-[#E5E7EB] rounded-lg text-sm bg-white outline-none focus:ring-2 focus:ring-[#7C3AED]/20">
                          {availableModels
                            .filter(m => {
                              if (['image'].includes(item.key)) return m.category === 'Image';
                              if (['video'].includes(item.key)) return m.category === 'Video';
                              return m.category === 'Text';
                            })
                            .map(m => (
                              <option key={m.id} value={m.id}>{m.name} ({m.provider})</option>
                            ))
                          }
                        </select>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Available models list */}
                <div>
                  <h3 className="text-sm font-bold text-[#111827] mb-3">{t('Available Models', '可用模型')}</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {availableModels.map(m => (
                      <div key={m.id} className="flex items-center gap-2 px-3 py-2 rounded-lg border border-[#E5E7EB]">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                        <div>
                          <p className="text-xs font-semibold text-[#111827]">{m.name}</p>
                          <p className="text-[10px] text-[#9CA3AF]">{m.provider} · {m.category}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* ── Notifications ── */}
            {activeSection === 'notifications' && (
              <div className="space-y-5 max-w-lg">
                {/* Email */}
                <div>
                  <h3 className="text-sm font-bold text-[#111827] mb-3">{t('Email Notifications', '邮件通知')}</h3>
                  <div className="space-y-2">
                    {[
                      { key: 'emailGeneration', label: 'Generation Complete', zh: '生成完成', desc: 'When AI finishes generating assets', descZh: 'AI 生成完成时通知' },
                      { key: 'emailBilling', label: 'Billing & Invoices', zh: '计费和发票', desc: 'Payment receipts and invoice reminders', descZh: '付款收据和发票提醒' },
                      { key: 'emailMarketing', label: 'Product Updates', zh: '产品更新', desc: 'New features and platform updates', descZh: '新功能和平青更新' },
                    ].map(item => (
                      <div key={item.key} className="flex items-center justify-between p-3 rounded-xl border border-[#E5E7EB]">
                        <div>
                          <p className="text-sm font-medium text-[#111827]">{t(item.label, item.zh)}</p>
                          <p className="text-xs text-[#9CA3AF]">{t(item.desc, item.descZh)}</p>
                        </div>
                        <Toggle checked={notifs[item.key as keyof typeof notifs] as boolean}
                          onChange={v => setNotifs({ ...notifs, [item.key]: v })} />
                      </div>
                    ))}
                  </div>
                </div>

                {/* In-app */}
                <div>
                  <h3 className="text-sm font-bold text-[#111827] mb-3">{t('In-App Notifications', '站内通知')}</h3>
                  <div className="space-y-2">
                    {[
                      { key: 'inAppGeneration', label: 'Generation Status', zh: '生成状态', desc: 'Real-time progress updates', descZh: '实时进度更新' },
                      { key: 'inAppTeam', label: 'Team Activity', zh: '团队动态', desc: 'Member actions and comments', descZh: '成员操作和评论' },
                    ].map(item => (
                      <div key={item.key} className="flex items-center justify-between p-3 rounded-xl border border-[#E5E7EB]">
                        <div>
                          <p className="text-sm font-medium text-[#111827]">{t(item.label, item.zh)}</p>
                          <p className="text-xs text-[#9CA3AF]">{t(item.desc, item.descZh)}</p>
                        </div>
                        <Toggle checked={notifs[item.key as keyof typeof notifs] as boolean}
                          onChange={v => setNotifs({ ...notifs, [item.key]: v })} />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Webhook */}
                <div>
                  <h3 className="text-sm font-bold text-[#111827] mb-3">{t('Webhook', 'Webhook')}</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 rounded-xl border border-[#E5E7EB]">
                      <div>
                        <p className="text-sm font-medium text-[#111827]">{t('Enable Webhook', '启用 Webhook')}</p>
                        <p className="text-xs text-[#9CA3AF]">{t('Receive events via HTTP POST', '通过 HTTP POST 接收事件')}</p>
                      </div>
                      <Toggle checked={notifs.webhookEnabled}
                        onChange={v => setNotifs({ ...notifs, webhookEnabled: v })} />
                    </div>
                    {notifs.webhookEnabled && (
                      <div>
                        <label className="block text-sm font-medium text-[#374151] mb-1.5">{t('Webhook URL', 'Webhook 地址')}</label>
                        <input type="url" value={notifs.webhookUrl}
                          onChange={e => setNotifs({ ...notifs, webhookUrl: e.target.value })}
                          placeholder="https://your-server.com/webhook"
                          className="w-full px-4 py-2.5 border border-[#E5E7EB] rounded-xl text-sm bg-white focus:ring-2 focus:ring-[#7C3AED]/20 focus:border-[#7C3AED] outline-none transition-all" />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* ── Save / Cancel ── */}
            <div className="mt-6 pt-6 border-t border-[#E5E7EB] flex items-center gap-3">
              <button onClick={handleSave}
                className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#7C3AED] text-white rounded-xl text-sm font-semibold hover:bg-[#6D28D9] transition-all">
                <Save className="w-4 h-4" />
                {saved ? t('Saved!', '已保存！') : t('Save Changes', '保存更改')}
              </button>
              <button className="px-6 py-2.5 bg-white border border-[#E5E7EB] text-[#6B7280] rounded-xl text-sm font-semibold hover:bg-[#FAFAFA] transition-all"
                onClick={() => window.location.reload()}>
                {t('Cancel', '取消')}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Toggle component ── */
function Toggle({ checked, onChange }: { checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ${
        checked ? 'bg-[#7C3AED]' : 'bg-[#D1D5DB]'
      }`}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 shadow-sm ${
          checked ? 'translate-x-6' : 'translate-x-1'
        }`}
      />
    </button>
  );
}
