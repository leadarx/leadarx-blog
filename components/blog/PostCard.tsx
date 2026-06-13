import Image from 'next/image';
import Link from 'next/link';
import type { PostCard } from '@/lib/types';
import CategoryBadge from './CategoryBadge';

interface Props {
  post: PostCard;
}

export default function PostCard({ post }: Props) {
  return (
    <Link
      href={`/posts/${post.slug}`}
      className="group block bg-brand-card border border-brand-border rounded-xl overflow-hidden hover:border-brand-accent/40 hover:-translate-y-0.5 transition-all duration-200"
    >
      {/* Featured image */}
      <div className="aspect-video overflow-hidden bg-brand-border">
        {post.featured_image ? (
          <Image
            src={post.featured_image}
            alt={post.featured_image_alt ?? post.title}
            width={640}
            height={360}
            className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-brand-border">
            <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        <CategoryBadge category={post.category} className="mb-3" linked={false} />

        <h3 className="font-heading font-bold text-brand-light text-lg leading-snug line-clamp-2 mb-2 group-hover:text-brand-accent transition-colors">
          {post.title}
        </h3>

        {post.excerpt && (
          <p className="text-brand-grey text-sm leading-relaxed line-clamp-3 mb-4">{post.excerpt}</p>
        )}

        <div className="flex items-center gap-2 pt-4 border-t border-brand-border text-brand-grey text-xs">
          <span>{post.published_at_formatted}</span>
          <span>&middot;</span>
          <span>{post.reading_time}</span>
        </div>
      </div>
    </Link>
  );
}
