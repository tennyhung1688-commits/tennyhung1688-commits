import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AI Agents — CommerceOS',
  description: 'Marketplace-specific AI Agents for Amazon, TikTok Shop, Shopee, Taobao, Shopify, Temu, Lazada, AliExpress, Etsy, eBay, WooCommerce.',
};

export default function AgentsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
