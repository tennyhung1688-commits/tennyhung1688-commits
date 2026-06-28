import type { Metadata } from 'next';

const industries = ['fashion', 'beauty', 'electronics', 'furniture', 'jewelry', 'food', 'pet', 'sports'];

export function generateStaticParams() {
  return industries.map(id => ({ industry: id }));
}

export default function IndustryLayout({ children }: { children: React.ReactNode }) {
  return children;
}
