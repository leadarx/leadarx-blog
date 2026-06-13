'use client';

import Link from 'next/link';
import type { Category } from '@/lib/types';

interface Props {
  categories: Category[];
  active?: string;
}

export default function CategoryFilter({ categories, active }: Props) {
  return (
    <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2">
      <Link
        href="/"
        className={`flex-shrink-0 px-5 py-2.5 rounded-full text-sm font-semibold transition-colors ${
          !active
            ? 'bg-brand-accent text-white'
            : 'border border-brand-border text-brand-grey hover:border-brand-accent hover:text-brand-accent'
        }`}
      >
        All
      </Link>
      {categories.map((cat) => {
        const isActive = active === cat.slug;
        return (
          <Link
            key={cat.slug}
            href={`/?category=${cat.slug}`}
            className={`flex-shrink-0 px-5 py-2.5 rounded-full text-sm font-semibold transition-colors ${
              isActive
                ? 'text-white'
                : 'border border-brand-border text-brand-grey hover:text-brand-light hover:border-brand-grey'
            }`}
            style={isActive && cat.color ? { backgroundColor: cat.color } : undefined}
          >
            {cat.name}
          </Link>
        );
      })}
    </div>
  );
}
