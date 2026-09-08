interface Props {
  /**
   * The post's category slug. Where it names something LeadarX takes briefs
   * for, the promo deep-links to that service page instead of the hire
   * homepage: a link from a data-analysis article to the data-analysis service
   * carries topical relevance that a generic link does not.
   */
  categorySlug?: string | null;
  variant?: 'sidebar' | 'inline';
}

const HIRE_URL = process.env.NEXT_PUBLIC_HIRE_URL ?? 'https://hire.leadarx.com';

/**
 * Blog categories that are also services on hire.leadarx.com. Anything not
 * listed falls back to the hire homepage rather than guessing at a near match.
 */
const CATEGORY_TO_SERVICE: Record<string, string> = {
  'data-analysis':     'data-analysis',
  'digital-marketing': 'digital-marketing',
  'ui-ux-design':      'ui-ux-design',
  'ai-automation':     'ai-automation',
};

export default function HirePromo({ categorySlug, variant = 'sidebar' }: Props) {
  const service = categorySlug ? CATEGORY_TO_SERVICE[categorySlug] : undefined;
  const href    = service ? `${HIRE_URL}/services/${service}` : HIRE_URL;

  const label = service
    ? 'Need this work done for you?'
    : 'Need the work done for you?';

  if (variant === 'inline') {
    return (
      <aside className="my-10 rounded-xl border border-brand-border bg-brand-card p-7">
        <p className="text-brand-accent text-xs font-bold tracking-widest uppercase mb-2">
          Not learning it yourself?
        </p>
        <h3 className="font-heading font-bold text-brand-light text-xl leading-tight mb-3">
          {label}
        </h3>
        <p className="text-brand-grey text-sm leading-relaxed mb-5">
          LeadarX puts a supervised team of its own graduates on the work and
          delivers it for you. Brief us and we reply within one working day.
        </p>
        <a
          href={href}
          className="inline-flex items-center gap-2 bg-brand-accent text-white font-bold text-sm px-6 py-3 rounded-lg hover:opacity-90 transition-opacity"
        >
          Hire a team
          <span aria-hidden="true">&rarr;</span>
        </a>
      </aside>
    );
  }

  return (
    <div className="rounded-xl border border-brand-border bg-brand-card p-6">
      <p className="text-brand-accent text-xs font-bold tracking-widest uppercase mb-2">
        Not learning it yourself?
      </p>
      <h3 className="font-heading font-bold text-brand-light text-lg leading-tight mb-2">
        {label}
      </h3>
      <p className="text-brand-grey text-sm leading-relaxed mb-4">
        A supervised LeadarX team delivers it. Reply within one working day.
      </p>
      <a
        href={href}
        className="inline-flex items-center gap-2 text-brand-accent font-bold text-sm hover:opacity-80 transition-opacity"
      >
        Hire a team
        <span aria-hidden="true">&rarr;</span>
      </a>
    </div>
  );
}
