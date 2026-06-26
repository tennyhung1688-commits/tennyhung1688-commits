import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

export async function updateSession(request: NextRequest) {
  // TODO: 配置真实 Supabase 凭证后恢复认证保护
  // 暂时绕过认证以便预览页面效果
  const supabaseResponse = NextResponse.next({ request });

  // 仅在 Supabase 凭证有效时才启用认证
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (
    supabaseUrl &&
    supabaseKey &&
    !supabaseUrl.includes('your-project') &&
    !supabaseKey.includes('your-anon-key')
  ) {
    const supabase = createServerClient(supabaseUrl, supabaseKey, {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    });

    // 刷新 session
    const {
      data: { user },
    } = await supabase.auth.getUser();

    // 保护 /tools/generator 页面（需要登录）
    if (!user && request.nextUrl.pathname.startsWith('/tools/generator')) {
      const url = request.nextUrl.clone();
      url.pathname = '/auth/login';
      url.searchParams.set('redirect', request.nextUrl.pathname);
      return NextResponse.redirect(url);
    }
  }

  return supabaseResponse;
}
