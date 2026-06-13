import Link from 'next/link';
import type { Category } from '@/lib/types';

interface Props {
  category: Category | null;
  className?: string;
}

export default function CategoryBadge({ category, className = '' }: Props) {
  if (!category) return null;

  const style = category.color
    ? { backgroundColor: category.color + '22', color: category.color }
    : undefined;
  const defaultCls = category.color ? '' : 'bg-brand-accent/20 text-brand-accent';

  return (
    <Link
      href={`/categories/${category.slug}`}
      className={`inline-block px-3 py-1 rounded-full text-xs font-semibold tracking-wide hover:opacity-80 transition-opacity ${defaultCls} ${className}`}
      style={style}
    >
      {category.name}
    </Link>
  );
}
