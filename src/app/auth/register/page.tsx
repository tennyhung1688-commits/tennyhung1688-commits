'use client';

import { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Mail, Lock, AlertCircle, CheckCircle, Eye, EyeOff, ArrowRight, Shield } from 'lucide-react';
import { useAuth } from '@/lib/auth';
import { useLang } from '@/lib/i18n';

/* ── Password strength calculator ── */
function getPasswordStrength(pw: string): { score: 0 | 1 | 2 | 3 | 4; label: string; color: string; width: string } {
  if (!pw) return { score: 0, label: '', color: 'bg-[#E5E7EB]', width: 'w-0' };
  let score = 0;
  if (pw.length >= 6) score++;
  if (pw.length >= 10) score++;
  if (/[A-Z]/.test(pw)) score++;
  if (/[0-9]/.test(pw)) score++;
  if (/[^A-Za-z0-9]/.test(pw)) score++;

  const levels = [
    { score: 0 as const, label: '', color: 'bg-[#E5E7EB]', width: 'w-1/5' },
    { score: 1 as const, label: 'Weak', color: 'bg-red-400', width: 'w-1/5' },
    { score: 2 as const, label: 'Fair', color: 'bg-amber-400', width: 'w-2/5' },
    { score: 3 as const, label: 'Good', color: 'bg-emerald-400', width: 'w-3/5' },
    { score: 4 as const, label: 'Strong', color: 'bg-emerald-500', width: 'w-full' },
  ];
  return levels[Math.min(score, 4)];
}

export default function RegisterPage() {
  const { t } = useLang();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const router = useRouter();
  const { user, loading, signUp } = useAuth();

  const strength = useMemo(() => getPasswordStrength(password), [password]);

  const passwordsMatch = confirmPassword ? password === confirmPassword : true;
  const canSubmit = email && password.length >= 6 && passwordsMatch && agreed && !submitting;

  useEffect(() => {
    if (!loading && user) {
      router.replace('/workspace');
    }
  }, [user, loading, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (password.length < 6) {
      setError(t('Password must be at least 6 characters', '密码至少需要6个字符'));
      return;
    }

    if (password !== confirmPassword) {
      setError(t('Passwords do not match', '两次输入的密码不一致'));
      return;
    }

    if (!agreed) {
      setError(t('Please agree to the Terms of Service', '请同意服务条款'));
      return;
    }

    setSubmitting(true);

    const { error: signUpError } = await signUp(email, password);
    if (signUpError) {
      setError(signUpError);
      setSubmitting(false);
    } else {
      setSuccess(t(
        'Account created! Check your email to verify (also check spam folder).',
        '注册成功！请查收邮箱验证邮件（如未收到，请检查垃圾箱），验证后即可登录。'
      ));
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="animate-spin rounded-full h-8 w-8 border-2 border-[#7C3AED] border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="w-full max-w-md">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-[#111827] tracking-tight">
          {t('Create your account', '创建账号')}
        </h1>
        <p className="text-sm text-[#6B7280] mt-2">
          {t(
            'Start with 5 free images and 1 video. No credit card required.',
            '免费领取 5 张图片 + 1 条视频，无需信用卡。'
          )}
        </p>
      </div>

      {/* Card */}
      <div className="bg-white rounded-2xl shadow-sm border border-[#E5E7EB] p-8">
        {error && (
          <div className="flex items-center gap-2.5 text-sm text-red-600 bg-red-50 px-4 py-3 rounded-xl mb-5">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {success ? (
          /* Success state */
          <div className="text-center py-8">
            <div className="w-16 h-16 rounded-2xl bg-emerald-50 flex items-center justify-center mx-auto mb-5">
              <CheckCircle className="w-8 h-8 text-emerald-500" />
            </div>
            <h2 className="text-lg font-bold text-[#111827] mb-2">
              {t('Check your email', '请查收验证邮件')}
            </h2>
            <p className="text-sm text-[#6B7280] mb-8 leading-relaxed max-w-xs mx-auto">
              {success}
            </p>
            <Link
              href="/auth/login"
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#7C3AED] text-white rounded-xl text-sm font-semibold shadow-sm hover:bg-[#6D28D9] transition-all"
            >
              {t('Go to Login', '前往登录')}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          /* Form */
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-[#374151] mb-1.5">
                {t('Email', '邮箱')}
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9CA3AF]" />
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-[#E5E7EB] rounded-xl text-sm bg-white focus:ring-2 focus:ring-[#7C3AED]/20 focus:border-[#7C3AED] outline-none transition-all placeholder:text-[#D1D5DB]"
                  placeholder="you@example.com"
                  autoComplete="email"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-[#374151] mb-1.5">
                {t('Password', '密码')}
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9CA3AF]" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="w-full pl-10 pr-10 py-3 border border-[#E5E7EB] rounded-xl text-sm bg-white focus:ring-2 focus:ring-[#7C3AED]/20 focus:border-[#7C3AED] outline-none transition-all placeholder:text-[#D1D5DB]"
                  placeholder={t('At least 6 characters', '至少 6 位')}
                  autoComplete="new-password"
                  required
                  minLength={6}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#9CA3AF] hover:text-[#6B7280]"
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {/* Strength bar */}
              {password && (
                <div className="mt-2">
                  <div className="h-1.5 bg-[#F5F5F5] rounded-full overflow-hidden">
                    <div className={`h-full rounded-full transition-all duration-500 ${strength.color} ${strength.width}`} />
                  </div>
                  <p className={`text-[11px] mt-1 font-medium ${
                    strength.score <= 1 ? 'text-red-500' :
                    strength.score === 2 ? 'text-amber-500' :
                    'text-emerald-500'
                  }`}>
                    {strength.label && t(`Password strength: ${strength.label}`, `密码强度: ${strength.label}`)}
                  </p>
                </div>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-medium text-[#374151] mb-1.5">
                {t('Confirm Password', '确认密码')}
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9CA3AF]" />
                <input
                  type={showConfirm ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={e => setConfirmPassword(e.target.value)}
                  className="w-full pl-10 pr-10 py-3 border border-[#E5E7EB] rounded-xl text-sm bg-white focus:ring-2 focus:ring-[#7C3AED]/20 focus:border-[#7C3AED] outline-none transition-all placeholder:text-[#D1D5DB]"
                  placeholder={t('Re-enter password', '再次输入密码')}
                  autoComplete="new-password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#9CA3AF] hover:text-[#6B7280]"
                  tabIndex={-1}
                >
                  {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {confirmPassword && !passwordsMatch && (
                <p className="text-[11px] text-red-500 mt-1 font-medium">
                  {t('Passwords do not match', '两次输入的密码不一致')}
                </p>
              )}
            </div>

            {/* Terms checkbox */}
            <div className="flex items-start gap-3">
              <input
                type="checkbox"
                id="terms"
                checked={agreed}
                onChange={e => setAgreed(e.target.checked)}
                className="mt-1 w-4 h-4 rounded border-[#D1D5DB] text-[#7C3AED] focus:ring-[#7C3AED]/20 cursor-pointer"
              />
              <label htmlFor="terms" className="text-xs text-[#6B7280] leading-relaxed cursor-pointer">
                {t(
                  'I agree to the',
                  '我已阅读并同意'
                )}{' '}
                <Link href="/legal/terms" className="text-[#7C3AED] hover:underline font-medium" target="_blank">
                  {t('Terms of Service', '《服务条款》')}
                </Link>
                {' '}{t('and', '和')}{' '}
                <Link href="/legal/privacy" className="text-[#7C3AED] hover:underline font-medium" target="_blank">
                  {t('Privacy Policy', '《隐私政策》')}
                </Link>
              </label>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={!canSubmit}
              className="w-full py-3 rounded-xl bg-[#7C3AED] text-white font-semibold text-sm
                         hover:bg-[#6D28D9] disabled:opacity-40 disabled:cursor-not-allowed
                         shadow-sm shadow-purple-500/25 hover:shadow-md hover:shadow-purple-500/30
                         transition-all duration-200 flex items-center justify-center gap-2"
            >
              {submitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-white/30 border-t-white" />
                  {t('Creating account...', '注册中...')}
                </>
              ) : (
                <>
                  {t('Create Account', '创建账号')}
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-[#E5E7EB]" />
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="bg-white px-3 text-[#9CA3AF]">
                  {t('Already have an account?', '已有账号？')}
                </span>
              </div>
            </div>

            {/* Login link */}
            <Link
              href="/auth/login"
              className="block w-full py-3 rounded-xl bg-white border border-[#E5E7EB] text-[#374151]
                         font-semibold text-sm text-center hover:border-[#D1D5DB] hover:bg-[#FAFAFA]
                         transition-all duration-200"
            >
              {t('Sign In', '立即登录')}
            </Link>
          </form>
        )}
      </div>

      {/* Security note */}
      <p className="text-center text-xs text-[#9CA3AF] mt-6 flex items-center justify-center gap-1.5">
        <Shield className="w-3 h-3" />
        {t(
          'Protected by industry-standard encryption. We never share your data.',
          '采用行业标准加密保护，我们不会分享你的数据。'
        )}
      </p>
    </div>
  );
}
