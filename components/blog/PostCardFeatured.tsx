import Image from 'next/image';
import Link from 'next/link';
import type { PostCard } from '@/lib/types';
import CategoryBadge from './CategoryBadge';

interface Props {
  post: PostCard;
}

export default function PostCardFeatured({ post }: Props) {
  return (
    <Link
      href={`/posts/${post.slug}`}
      className="group grid grid-cols-1 lg:grid-cols-5 gap-0 min-h-[420px] overflow-hidden rounded-2xl border border-brand-border hover:border-brand-accent/30 transition-colors"
    >
      {/* Left: Content */}
      <div className="lg:col-span-3 flex flex-col justify-center p-8 lg:p-12 bg-brand-surface">
        <CategoryBadge category={post.category} className="mb-4 self-start" linked={false} />

        <h2 className="font-heading font-bold text-brand-light text-3xl lg:text-4xl leading-tight mb-4 group-hover:text-brand-accent transition-colors text-balance">
          {post.title}
        </h2>

        {post.excerpt && (
          <p className="text-brand-grey text-base leading-relaxed mb-6 line-clamp-3">{post.excerpt}</p>
        )}

        <div className="flex items-center gap-2 mb-6 text-brand-grey text-xs">
          <span>{post.published_at_formatted}</span>
          <span>&middot;</span>
          <span>{post.reading_time}</span>
        </div>

        <span className="inline-flex items-center gap-2 text-brand-accent font-semibold text-sm">
          Read Article
          <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </span>
      </div>

      {/* Right: Image */}
      <div className="lg:col-span-2 relative min-h-[240px] lg:min-h-0 bg-brand-border overflow-hidden">
        {post.featured_image ? (
          <Image
            src={post.featured_image}
            alt={post.featured_image_alt ?? post.title}
            fill
            sizes="(max-width: 1024px) 100vw, 40vw"
            className="object-cover group-hover:scale-[1.02] transition-transform duration-500"
            priority
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-brand-accent/20 to-brand-green/20 flex items-center justify-center">
            <span className="font-heading font-black text-8xl text-brand-light/10">L</span>
          </div>
        )}
      </div>
    </Link>
  );
}
