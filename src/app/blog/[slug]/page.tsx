import Link from 'next/link';
import { ArrowLeft, Clock, Calendar } from 'lucide-react';
import { posts } from '@/lib/blog-data';
import Navbar from '@/components/Navbar';

export function generateStaticParams() {
  return posts.map(p => ({ slug: p.slug }));
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = posts.find(p => p.slug === params.slug);
  if (!post) return <div className="pt-24 p-8 text-center text-[#6B7280]">Post not found</div>;

  return (
    <>
      <Navbar />
      <div className="pt-28 pb-20">
        <div className="max-w-3xl mx-auto px-4">
          <Link href="/blog" className="inline-flex items-center gap-1.5 text-sm text-[#6B7280] hover:text-[#111827] mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Blog
          </Link>

          <span className="text-xs font-semibold text-[#7C3AED] bg-[#F5F3FF] px-3 py-1 rounded-full mb-4 inline-block">{post.tag}</span>
          <h1 className="text-3xl font-bold text-[#111827] mb-4 leading-tight">{post.title}</h1>
          <div className="flex items-center gap-4 text-xs text-[#9CA3AF] mb-8">
            <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{post.date}</span>
            <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{post.readTime}</span>
          </div>

          <div className="prose prose-lg prose-slate max-w-none">
            {post.body.split('\n').map((line, i) => {
              if (line.startsWith('### ')) {
                return <h3 key={i} className="text-lg font-bold text-[#111827] mt-8 mb-3">{line.replace('### ', '')}</h3>;
              }
              if (line.match(/^\d\. /)) {
                return <p key={i} className="text-sm text-[#374151] leading-relaxed ml-4 mb-2"><strong>{line.match(/^\d\. (.+?):/)?.[0]}</strong>{line.replace(/^\d\. .+?:/, '')}</p>;
              }
              if (line.startsWith('- **')) {
                return <p key={i} className="text-sm text-[#374151] leading-relaxed ml-4 mb-1">{line.replace(/- \*\*(.+?)\*\*/, '• $1')}</p>;
              }
              if (line.startsWith('  - ')) {
                return <p key={i} className="text-sm text-[#6B7280] leading-relaxed ml-8 mb-1">{line}</p>;
              }
              if (line.trim()) {
                return <p key={i} className="text-sm text-[#374151] leading-relaxed mb-4">{line}</p>;
              }
              return null;
            })}
          </div>

          <div className="mt-12 pt-8 border-t border-[#E5E7EB]">
            <Link href="/blog" className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#F5F5F5] rounded-xl text-sm font-medium text-[#374151] hover:bg-[#E5E7EB] transition-colors">
              <ArrowLeft className="w-4 h-4" /> Back to all posts
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
