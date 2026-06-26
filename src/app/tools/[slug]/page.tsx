import { getAllSlugs, getToolBySlug, getRelatedTools, getCategoryBySlug, getPricingLabel } from '@/lib/data';
import { Star, ExternalLink, ArrowLeft, CheckCircle, XCircle, Tag, Globe } from 'lucide-react';
import Link from 'next/link';
import type { Metadata } from 'next';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const tool = getToolBySlug(slug);
  if (!tool) return { title: 'Tool Not Found' };

  return {
    title: `${tool.name} - AI Tool Review & Details`,
    description: tool.description.slice(0, 160),
    keywords: [...tool.tags, tool.name, 'AI tool', `${tool.name} review`],
    openGraph: {
      title: `${tool.name} - AI Tool Review`,
      description: tool.tagline,
      url: `https://commerceos.ai/tools/${tool.slug}`,
    },
    twitter: {
      card: 'summary',
      title: `${tool.name} - CommerceOS`,
      description: tool.tagline,
    },
  };
}

export default async function ToolDetailPage({ params }: Props) {
  const { slug } = await params;
  const tool = getToolBySlug(slug);

  if (!tool) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <h1 className="text-4xl font-bold mb-4">Tool Not Found</h1>
        <Link href="/" className="text-violet-600 hover:underline">← Back to directory</Link>
      </div>
    );
  }

  const relatedTools = getRelatedTools(slug);
  const category = getCategoryBySlug(tool.category);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <div className="mb-8">
        <Link href="/" className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-violet-600 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Back to Directory
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Header */}
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center text-white font-bold text-xl">
                {tool.name.charAt(0)}
              </div>
              <div>
                <h1 className="text-3xl font-bold">{tool.name}</h1>
                <p className="text-sm text-gray-500">{tool.nameZh}</p>
              </div>
            </div>
            <p className="text-lg text-gray-600 dark:text-gray-400 mt-4">{tool.tagline}</p>
            <p className="text-sm text-gray-500 mt-1">{tool.taglineZh}</p>
          </div>

          {/* Rating & Badges */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-1 text-amber-500 bg-amber-50 dark:bg-amber-900/20 px-3 py-1.5 rounded-lg">
              <Star className="w-4 h-4 fill-current" />
              <span className="font-semibold">{tool.rating}</span>
              <span className="text-amber-600 dark:text-amber-400 text-sm">/ 5.0</span>
            </div>
            {tool.verified && (
              <span className="inline-flex items-center gap-1 text-xs px-3 py-1.5 rounded-lg bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 font-medium">
                <CheckCircle className="w-3.5 h-3.5" /> Verified
              </span>
            )}
            <span className="text-xs px-3 py-1.5 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 font-medium">
              {getPricingLabel(tool.pricing, 'en')}
            </span>
            {category && (
              <Link
                href={`/?category=${tool.category}`}
                className="text-xs px-3 py-1.5 rounded-lg bg-violet-100 dark:bg-violet-900/30 text-violet-700 dark:text-violet-300 font-medium"
              >
                {category.name}
              </Link>
            )}
          </div>

          {/* Description */}
          <section>
            <h2 className="text-xl font-semibold mb-4">About</h2>
            <div className="space-y-4">
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{tool.description}</p>
              <p className="text-gray-500 leading-relaxed">{tool.descriptionZh}</p>
            </div>
          </section>

          {/* Key Features */}
          <section>
            <h2 className="text-xl font-semibold mb-4">Key Features</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {tool.features.map((feature, i) => (
                <div key={i} className="flex items-start gap-2 p-3 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{feature}</p>
                    {tool.featuresZh[i] && (
                      <p className="text-xs text-gray-500 mt-0.5">{tool.featuresZh[i]}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Pros & Cons */}
          <section>
            <h2 className="text-xl font-semibold mb-4">Pros & Cons</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-5 rounded-2xl bg-green-50 dark:bg-green-900/10 border border-green-100 dark:border-green-900/20">
                <h3 className="font-semibold text-green-800 dark:text-green-300 mb-3 flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" /> Pros
                </h3>
                <ul className="space-y-2">
                  {tool.pros.map((pro, i) => (
                    <li key={i} className="text-sm text-green-700 dark:text-green-400">
                      <span className="block">{pro}</span>
                      {tool.prosZh[i] && (
                        <span className="block text-xs text-green-600/70 dark:text-green-500/70 mt-0.5">{tool.prosZh[i]}</span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="p-5 rounded-2xl bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-900/20">
                <h3 className="font-semibold text-red-800 dark:text-red-300 mb-3 flex items-center gap-2">
                  <XCircle className="w-4 h-4" /> Cons
                </h3>
                <ul className="space-y-2">
                  {tool.cons.map((con, i) => (
                    <li key={i} className="text-sm text-red-700 dark:text-red-400">
                      <span className="block">{con}</span>
                      {tool.consZh[i] && (
                        <span className="block text-xs text-red-600/70 dark:text-red-500/70 mt-0.5">{tool.consZh[i]}</span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Info */}
          <div className="p-6 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
            <h3 className="font-semibold mb-4">Quick Info</h3>
            <dl className="space-y-3">
              <div>
                <dt className="text-xs text-gray-500 uppercase tracking-wider">Pricing</dt>
                <dd className="text-sm font-medium mt-0.5">{getPricingLabel(tool.pricing, 'en')}</dd>
              </div>
              <div>
                <dt className="text-xs text-gray-500 uppercase tracking-wider">Category</dt>
                <dd className="text-sm font-medium mt-0.5">{category?.name || tool.category}</dd>
              </div>
            </dl>
            <a
              href={tool.url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-violet-600 text-white font-medium hover:bg-violet-700 transition-colors"
            >
              <Globe className="w-4 h-4" />
              Visit Website
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          {/* Tags */}
          <div className="p-6 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <Tag className="w-4 h-4" /> Tags
            </h3>
            <div className="flex flex-wrap gap-2">
              {tool.tags.map((tag) => (
                <span key={tag} className="text-xs px-2.5 py-1 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Related Tools */}
          {relatedTools.length > 0 && (
            <div className="p-6 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
              <h3 className="font-semibold mb-4">Related Tools</h3>
              <div className="space-y-3">
                {relatedTools.map((rt) => (
                  <Link
                    key={rt.slug}
                    href={`/tools/${rt.slug}`}
                    className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors group"
                  >
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center text-white font-bold text-xs shrink-0">
                      {rt.name.charAt(0)}
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-medium group-hover:text-violet-600 transition-colors truncate">{rt.name}</p>
                      <div className="flex items-center gap-1 text-amber-500">
                        <Star className="w-3 h-3 fill-current" />
                        <span className="text-xs">{rt.rating}</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'SoftwareApplication',
            name: tool.name,
            description: tool.description,
            applicationCategory: 'AIApplication',
            operatingSystem: 'Web',
            offers: {
              '@type': 'Offer',
              price: tool.pricing === 'free' ? '0' : undefined,
              priceCurrency: 'USD',
            },
            aggregateRating: {
              '@type': 'AggregateRating',
              ratingValue: tool.rating,
              bestRating: '5',
            },
          }),
        }}
      />
    </div>
  );
}
