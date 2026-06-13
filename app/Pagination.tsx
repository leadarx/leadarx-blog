import Link from 'next/link';

interface Meta {
  current_page: number;
  last_page: number;
}

interface Props {
  meta: Meta;
  category?: string;
  basePath?: string;
}

function pageUrl(page: number, category?: string, basePath = '/'): string {
  const params = new URLSearchParams();
  if (page > 1) params.set('page', String(page));
  if (category) params.set('category', category);
  const qs = params.toString();
  return `${basePath}${qs ? '?' + qs : ''}`;
}

export default function Pagination({ meta, category, basePath }: Props) {
  const { current_page: cur, last_page: last } = meta;

  const pages: (number | '...')[] = [];
  if (last <= 7) {
    for (let i = 1; i <= last; i++) pages.push(i);
  } else {
    pages.push(1);
    if (cur > 3) pages.push('...');
    for (let i = Math.max(2, cur - 1); i <= Math.min(last - 1, cur + 1); i++) pages.push(i);
    if (cur < last - 2) pages.push('...');
    pages.push(last);
  }

  return (
    <div className="flex items-center justify-center gap-2 flex-wrap">
      {cur > 1 && (
        <Link href={pageUrl(cur - 1, category, basePath)}
          className="px-4 py-2 rounded-lg border border-brand-border text-brand-grey hover:border-brand-accent hover:text-brand-accent transition-colors text-sm">
          Previous
        </Link>
      )}
      {pages.map((p, i) =>
        p === '...' ? (
          <span key={`ellipsis-${i}`} className="px-3 py-2 text-brand-grey text-sm">...</span>
        ) : (
          <Link key={p} href={pageUrl(p, category, basePath)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              p === cur
                ? 'bg-brand-accent text-white'
                : 'border border-brand-border text-brand-grey hover:border-brand-accent hover:text-brand-accent'
            }`}>
            {p}
          </Link>
        )
      )}
      {cur < last && (
        <Link href={pageUrl(cur + 1, category, basePath)}
          className="px-4 py-2 rounded-lg border border-brand-border text-brand-grey hover:border-brand-accent hover:text-brand-accent transition-colors text-sm">
          Next
        </Link>
      )}
    </div>
  );
}
