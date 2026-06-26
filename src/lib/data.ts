import toolsData from '@/data/tools.json';
import categoriesData from '@/data/categories.json';

export interface Tool {
  slug: string;
  name: string;
  nameZh: string;
  tagline: string;
  taglineZh: string;
  description: string;
  descriptionZh: string;
  url: string;
  category: string;
  pricing: 'free' | 'freemium' | 'paid' | 'contact';
  tags: string[];
  features: string[];
  featuresZh: string[];
  pros: string[];
  prosZh: string[];
  cons: string[];
  consZh: string[];
  rating: number;
  verified: boolean;
  featured: boolean;
}

export interface Category {
  slug: string;
  name: string;
  nameZh: string;
  description: string;
  descriptionZh: string;
  icon: string;
}

const tools: Tool[] = toolsData as Tool[];
const categories: Category[] = categoriesData as Category[];

export function getAllTools(): Tool[] {
  return tools;
}

export function getFeaturedTools(): Tool[] {
  return tools.filter((t) => t.featured);
}

export function getToolBySlug(slug: string): Tool | undefined {
  return tools.find((t) => t.slug === slug);
}

export function getToolsByCategory(category: string): Tool[] {
  return tools.filter((t) => t.category === category);
}

export function searchTools(query: string): Tool[] {
  const q = query.toLowerCase();
  return tools.filter(
    (t) =>
      t.name.toLowerCase().includes(q) ||
      t.nameZh.includes(q) ||
      t.tagline.toLowerCase().includes(q) ||
      t.taglineZh.includes(q) ||
      t.description.toLowerCase().includes(q) ||
      t.descriptionZh.includes(q) ||
      t.tags.some((tag) => tag.toLowerCase().includes(q))
  );
}

export function getRelatedTools(slug: string, limit = 5): Tool[] {
  const tool = getToolBySlug(slug);
  if (!tool) return [];
  return tools
    .filter((t) => t.slug !== slug && t.category === tool.category)
    .sort((a, b) => b.rating - a.rating)
    .slice(0, limit);
}

export function getAllCategories(): Category[] {
  return categories;
}

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}

export function getCategoryWithCount(): (Category & { count: number })[] {
  return categories.map((cat) => ({
    ...cat,
    count: tools.filter((t) => t.category === cat.slug).length,
  }));
}

export function getAllSlugs(): string[] {
  return tools.map((t) => t.slug);
}

export function getPricingLabel(pricing: string, lang: 'en' | 'zh'): string {
  const labels: Record<string, Record<string, string>> = {
    free: { en: 'Free', zh: '免费' },
    freemium: { en: 'Freemium', zh: '免费增值' },
    paid: { en: 'Paid', zh: '付费' },
    contact: { en: 'Contact', zh: '询价' },
  };
  return labels[pricing]?.[lang] || pricing;
}

export function getCategoryIcon(slug: string): string {
  const icons: Record<string, string> = {
    writing: '✏️',
    image: '🎨',
    video: '🎬',
    code: '💻',
    productivity: '⚡',
    marketing: '📈',
    ecommerce: '🛒',
    education: '📚',
  };
  return icons[slug] || '🔧';
}
