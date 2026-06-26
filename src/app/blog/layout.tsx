import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog — CommerceOS',
  description: 'Insights, guides, and updates on AI-powered global commerce. Tips for Amazon, TikTok Shop, Shopee, Taobao and more.',
  openGraph: {
    title: 'CommerceOS Blog — AI Commerce Insights',
    description: 'Insights, guides, and updates on AI-powered global commerce.',
  },
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return children;
}
