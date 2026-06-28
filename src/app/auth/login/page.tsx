'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Mail, Lock, AlertCircle, Eye, EyeOff, ArrowRight } from 'lucide-react';
import { useAuth } from '@/lib/auth';
import { useLang } from '@/lib/i18n';

export default function LoginPage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center py-20">
        <div className="animate-spin rounded-full h-8 w-8 border-2 border-[#7C3AED] border-t-transparent" />
      </div>
    }>
      <LoginForm />
    </Suspense>
  );
}

function LoginForm() {
  const { t } = useLang();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get('redirect') || '/workspace';
  const { user, loading, kicked, kickedMessage, signIn } = useAuth();

  useEffect(() => {
    if (!loading && user) {
      router.replace(redirect);
    }
  }, [user, loading, redirect, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);

    try {
      const { error: signInError } = await signIn(email, password);
      if (signInError) {
        setError(signInError);
        setSubmitting(false);
      } else {
        router.push(redirect);
      }
    } catch {
      setError('Login failed. Please try again.');
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
          {t('Welcome back', '欢迎回来')}
        </h1>
        <p className="text-sm text-[#6B7280] mt-2">
          {t('Sign in to your CommerceOS account', '登录你的 CommerceOS 账号')}
        </p>
      </div>

      {/* Card */}
      <div className="bg-white rounded-2xl shadow-sm border border-[#E5E7EB] p-8">
        {kicked && (
          <div className="flex items-center gap-2.5 text-sm text-amber-700 bg-amber-50 px-4 py-3 rounded-xl mb-5 border border-amber-200">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{kickedMessage}</span>
          </div>
        )}

        {error && (
          <div className="flex items-center gap-2.5 text-sm text-red-600 bg-red-50 px-4 py-3 rounded-xl mb-5">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

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
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-sm font-medium text-[#374151]">
                {t('Password', '密码')}
              </label>
              <button
                type="button"
                onClick={() => alert(t('Password reset link would be sent to your email.', '密码重置链接将发送到您的邮箱。'))}
                className="text-xs text-[#7C3AED] hover:underline font-medium">
                {t('Forgot password?', '忘记密码？')}
              </button>
            </div>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9CA3AF]" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full pl-10 pr-10 py-3 border border-[#E5E7EB] rounded-xl text-sm bg-white focus:ring-2 focus:ring-[#7C3AED]/20 focus:border-[#7C3AED] outline-none transition-all placeholder:text-[#D1D5DB]"
                placeholder="••••••••"
                autoComplete="current-password"
                required
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
          </div>

          {/* Remember me */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="remember"
              className="w-4 h-4 rounded border-[#D1D5DB] text-[#7C3AED] focus:ring-[#7C3AED]/20 cursor-pointer"
            />
            <label htmlFor="remember" className="text-xs text-[#6B7280] cursor-pointer select-none">
              {t('Remember me for 30 days', '30 天内记住我')}
            </label>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={submitting || !email || !password}
            className="w-full py-3 rounded-xl bg-[#7C3AED] text-white font-semibold text-sm
                       hover:bg-[#6D28D9] disabled:opacity-40 disabled:cursor-not-allowed
                       shadow-sm shadow-purple-500/25 hover:shadow-md hover:shadow-purple-500/30
                       transition-all duration-200 flex items-center justify-center gap-2"
          >
            {submitting ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-white/30 border-t-white" />
                {t('Signing in...', '登录中...')}
              </>
            ) : (
              <>
                {t('Sign In', '登录')}
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
                {t("Don't have an account?", '还没有账号？')}
              </span>
            </div>
          </div>

          {/* Register link */}
          <Link
            href="/auth/register"
            className="block w-full py-3 rounded-xl bg-white border border-[#E5E7EB] text-[#374151]
                       font-semibold text-sm text-center hover:border-[#D1D5DB] hover:bg-[#FAFAFA]
                       transition-all duration-200"
          >
            {t('Create Free Account', '免费注册')}
          </Link>
        </form>
      </div>
    </div>
  );
}
