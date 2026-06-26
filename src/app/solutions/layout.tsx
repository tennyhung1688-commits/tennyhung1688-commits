import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Solutions — CommerceOS',
  description: 'Industry-specific AI solutions for e-commerce. Fashion, Beauty, Electronics, Furniture, Jewelry, Food, Pet Products, Sports & Outdoors.',
};

export default function SolutionsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
