/* In-memory demo store — fallback when Supabase is not configured */

interface StoreUser {
  email: string;
  password_hash: string;
  plan: string;
  credits_images: number;
  credits_videos: number;
  created_at: string;
}

interface DemoStore {
  users: Map<string, StoreUser>;
  sessions: Map<string, string>;
  generation_logs: Map<string, Array<{ type: string; status: string; result_url?: string; created_at: string }>>;
}

// Singleton — survives hot reloads in dev, but resets on full restart
declare global {
  var __demo_store: DemoStore | undefined;
}

export function getDemoStore(): DemoStore {
  if (!globalThis.__demo_store) {
    globalThis.__demo_store = {
      users: new Map(),
      sessions: new Map(),
      generation_logs: new Map(),
    };
  }
  return globalThis.__demo_store;
}
