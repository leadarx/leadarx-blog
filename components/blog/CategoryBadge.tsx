import Link from 'next/link';
import type { Category } from '@/lib/types';

interface Props {
  category: Category | null;
  className?: string;
  linked?: boolean;
}

export default function CategoryBadge({ category, className = '', linked = true }: Props) {
  if (!category) return null;

  const style = category.color
    ? { backgroundColor: category.color + '22', color: category.color }
    : undefined;
  const defaultCls = category.color ? '' : 'bg-brand-accent/20 text-brand-accent';
  const cls = `inline-block px-3 py-1 rounded-full text-xs font-semibold tracking-wide ${defaultCls} ${className}`;

  if (!linked) {
    return (
      <span className={cls} style={style}>
        {category.name}
      </span>
    );
  }

  return (
    <Link
      href={`/categories/${category.slug}`}
      className={`${cls} hover:opacity-80 transition-opacity`}
      style={style}
    >
      {category.name}
    </Link>
  );
}
