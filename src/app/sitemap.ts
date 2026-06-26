const BASE_URL = 'https://commerceos.site';

const staticPages = [
  { url: '/', priority: 1, changeFreq: 'daily' as const },
  { url: '/marketplaces', priority: 0.9, changeFreq: 'weekly' as const },
  { url: '/solutions', priority: 0.9, changeFreq: 'weekly' as const },
  { url: '/agents', priority: 0.9, changeFreq: 'weekly' as const },
  { url: '/pricing', priority: 0.9, changeFreq: 'weekly' as const },
  { url: '/developers', priority: 0.8, changeFreq: 'monthly' as const },
  { url: '/docs', priority: 0.8, changeFreq: 'monthly' as const },
  { url: '/blog', priority: 0.8, changeFreq: 'weekly' as const },
  { url: '/templates', priority: 0.7, changeFreq: 'monthly' as const },
];

const solutions = ['fashion', 'beauty', 'electronics', 'furniture', 'jewelry', 'food', 'pet', 'sports'];
const agents = ['amazon', 'shopee', 'tiktok', 'taobao', 'shopify', 'temu', 'lazada', 'aliexpress', 'etsy', 'ebay', 'woocommerce'];
const marketplaces = ['amazon', 'shopee', 'tiktok', 'taobao', 'temu', 'lazada', 'aliexpress', 'etsy', 'ebay', 'shopify', 'woocommerce'];

export default function sitemap() {
  const pages = staticPages.map(p => ({
    url: p.url === '/' ? BASE_URL : `${BASE_URL}${p.url}`,
    lastModified: new Date(),
    changeFrequency: p.changeFreq,
    priority: p.priority,
  }));

  const solutionPages = solutions.map(s => ({
    url: `${BASE_URL}/solutions/${s}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  const agentPages = agents.map(a => ({
    url: `${BASE_URL}/agents/${a}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  const marketplacePages = marketplaces.map(m => ({
    url: `${BASE_URL}/workspace/${m}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [
    ...pages,
    ...solutionPages,
    ...agentPages,
    ...marketplacePages,
    { url: `${BASE_URL}/legal/privacy`, lastModified: new Date(), changeFrequency: 'yearly' as const, priority: 0.3 },
    { url: `${BASE_URL}/legal/terms`, lastModified: new Date(), changeFrequency: 'yearly' as const, priority: 0.3 },
  ];
}
