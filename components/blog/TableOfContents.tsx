'use client';

import { useEffect, useState } from 'react';
import { extractHeadings } from '@/lib/utils';

interface Props {
  html: string;
}

export default function TableOfContents({ html }: Props) {
  const headings = extractHeadings(html);
  const [active, setActive] = useState<string>('');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: '-80px 0px -60% 0px' }
    );

    headings.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [headings]);

  if (headings.length < 2) return null;

  return (
    <nav aria-label="Table of contents">
      <p className="text-brand-light text-xs font-bold tracking-widest uppercase mb-4">Contents</p>
      <ol className="space-y-2">
        {headings.map(({ id, text, level }) => (
          <li key={id} className={level === 3 ? 'pl-4' : ''}>
            <a
              href={`#${id}`}
              className={`block text-sm leading-snug transition-colors hover:text-brand-accent ${
                active === id ? 'text-brand-accent font-medium' : 'text-brand-grey'
              }`}
              onClick={(e) => {
                e.preventDefault();
                document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              {text}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
