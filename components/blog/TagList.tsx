import Link from 'next/link';
import type { Tag } from '@/lib/types';

interface Props {
  tags: Tag[];
  className?: string;
}

export default function TagList({ tags, className = '' }: Props) {
  if (!tags.length) return null;

  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>
      <span className="text-brand-grey text-sm self-center">Tags:</span>
      {tags.map((tag) => (
        <Link
          key={tag.slug}
          href={`/tags/${tag.slug}`}
          className="text-xs font-medium px-3 py-1 rounded-full border border-brand-border text-brand-grey hover:border-brand-accent hover:text-brand-accent transition-colors"
        >
          {tag.name}
        </Link>
      ))}
    </div>
  );
}
