import { getAllSlugs } from '@/lib/data';

const BASE_URL = 'https://commerceos.ai';

export default function sitemap() {
  const toolSlugs = getAllSlugs();

  const tools = toolSlugs.map((slug) => ({
    url: `${BASE_URL}/tools/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1,
    },
    ...tools,
    {
      url: `${BASE_URL}/tools/generator`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
  ];
}
