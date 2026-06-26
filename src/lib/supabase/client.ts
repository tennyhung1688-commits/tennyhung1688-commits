import { createBrowserClient } from '@supabase/ssr';

export function createClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  // Gracefully skip Supabase if not configured (demo/dev mode)
  if (!supabaseUrl || !supabaseKey ||
      supabaseUrl.includes('your-project') ||
      supabaseKey.includes('your-anon-key')) {
    return null;
  }

  return createBrowserClient(supabaseUrl, supabaseKey);
}
