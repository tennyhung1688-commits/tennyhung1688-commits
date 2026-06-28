import type { Metadata } from 'next';

const agents = ['amazon', 'shopee', 'tiktok', 'taobao', 'shopify', 'temu', 'lazada', 'aliexpress', 'etsy', 'ebay', 'woocommerce'];
const industries = ['fashion', 'beauty', 'electronics', 'furniture', 'jewelry', 'food', 'pet', 'sports'];

export function generateStaticParams() {
  return agents.map(id => ({ platform: id }));
}

export default function PlatformLayout({ children }: { children: React.ReactNode }) {
  return children;
}
