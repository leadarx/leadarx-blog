import type { Metadata } from 'next';
import Link from 'next/link';
import EnrollmentCTA from '@/components/blog/EnrollmentCTA';

const MAIN_URL = process.env.NEXT_PUBLIC_MAIN_SITE_URL ?? 'https://leadarx.com';

export const metadata: Metadata = {
  title: 'About LeadarX Blog',
  description:
    'LeadarX Blog is Nigeria\'s dedicated tech career resource — practical guides, industry insights, and real stories covering Data Analysis, UI/UX Design, Digital Marketing, and more.',
  openGraph: {
    title: 'About LeadarX Blog — Nigeria\'s Tech Career Resource',
    description:
      'Learn who we are, what we cover, and why LeadarX Blog exists to help Nigerians build real, in-demand tech skills.',
    url: '/about',
  },
  alternates: { canonical: '/about' },
};

const TOPICS = [
  {
    label: 'Data Analysis',
    slug: 'data-analysis',
    desc: 'Excel, SQL, Power BI, and everything in between. From beginner fundamentals to advanced dashboards that actually get you hired.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
  },
  {
    label: 'UI/UX Design',
    slug: 'ui-ux-design',
    desc: 'Figma, design systems, user research, and portfolio building. Everything you need to go from zero to a job-ready product designer.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
      </svg>
    ),
  },
  {
    label: 'Digital Marketing',
    slug: 'digital-marketing',
    desc: 'SEO, paid advertising, content strategy, and analytics. The practical skills brands and agencies across Nigeria are actively hiring for.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
      </svg>
    ),
  },
  {
    label: 'Career Tips',
    slug: 'career-tips',
    desc: 'CVs, interviews, salary negotiation, and LinkedIn strategy. Real advice from people who have navigated the Nigerian tech job market.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    label: 'Industry Insights',
    slug: 'industry-insights',
    desc: 'Salary reports, sector deep-dives, and the honest numbers behind tech careers in Nigeria — so you can make informed decisions.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
      </svg>
    ),
  },
  {
    label: 'Tech News',
    slug: 'tech-news',
    desc: "What is happening in Nigeria's tech sector right now — funding, hiring trends, new tools, and the stories that matter to professionals on the ground.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
      </svg>
    ),
  },
];

const VALUES = [
  {
    title: 'Practical over theoretical',
    body: 'Every article on this blog exists to help you do something — land a job, ship a project, negotiate a better salary, or pick the right tool. We are not interested in knowledge for its own sake.',
  },
  {
    title: 'No gatekeeping',
    body: 'Tech in Nigeria is still building its knowledge-sharing culture. We write clearly, explain jargon, and make sure a fresh graduate from Kano or a career changer in Port Harcourt can follow along just as easily as someone who has been in the industry for years.',
  },
];

export default function AboutPage() {
  return (
    <>
      {/* ── Hero ───────────────────────────────────────────────────────── */}
      <section className="border-b border-brand-border">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-20 pt-24 pb-16">
          <p className="text-[11px] font-bold tracking-[0.18em] uppercase text-brand-grey mb-5">
            Est. 2024 · Nigeria
          </p>
          <h1
            className="font-heading font-bold text-brand-light leading-[1.08] tracking-[-0.03em] text-balance mb-6"
            style={{ fontSize: 'clamp(38px, 6vw, 72px)' }}
          >
            About LeadarX Blog
          </h1>
          <p className="text-brand-grey text-base sm:text-lg max-w-2xl leading-relaxed">
            Nigeria's dedicated resource for tech career growth. We write for the analyst building their first dashboard,
            the designer putting together their portfolio, and the professional who wants to understand where the industry
            is actually heading.
          </p>
        </div>
      </section>

      {/* ── Mission ────────────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-20 py-20 border-b border-brand-border">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          <div>
            <p className="text-[11px] font-bold tracking-[0.18em] uppercase text-brand-accent mb-4">Our Mission</p>
            <h2 className="font-heading font-bold text-brand-light text-3xl sm:text-4xl leading-tight tracking-tight mb-6 text-balance">
              Closing the gap between Nigerian talent and global opportunity
            </h2>
          </div>
          <div className="space-y-5 text-brand-grey leading-relaxed">
            <p>
              Nigeria produces more than 700,000 developers and tech workers a year. The problem has never been the
              people. It has been access — to quality learning resources, to honest career information, and to the kind
              of community knowledge that usually only travels through personal networks.
            </p>
            <p>
              LeadarX Blog exists to fix that. We publish guides that are direct and actionable, industry data that
              reflects Nigerian market reality, and stories from real professionals who have made the leap. Everything
              here is free and written to be genuinely useful, not to fill a content calendar.
            </p>
            <p>
              Behind the blog is{' '}
              <a
                href={MAIN_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-accent hover:underline font-medium"
              >
                LeadarX Academy
              </a>
              , a Nigerian tech training institution offering structured, instructor-led programs in Data Analysis,
              UI/UX Design, and Digital Marketing. The blog is the free resource. The academy is where you go when
              you are ready to go all in.
            </p>
          </div>
        </div>
      </section>

      {/* ── What We Cover ──────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-20 py-20 border-b border-brand-border">
        <div className="mb-12">
          <p className="text-[11px] font-bold tracking-[0.18em] uppercase text-brand-accent mb-4">What We Cover</p>
          <h2 className="font-heading font-bold text-brand-light text-3xl sm:text-4xl leading-tight tracking-tight text-balance">
            Six categories. One goal: your career.
          </h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {TOPICS.map((topic) => (
            <Link
              key={topic.slug}
              href={`/categories/${topic.slug}`}
              className="group p-6 rounded-2xl border border-brand-border hover:border-brand-accent/50 transition-colors duration-200"
            >
              <div className="w-10 h-10 rounded-lg bg-brand-accent/10 flex items-center justify-center text-brand-accent mb-4 group-hover:bg-brand-accent/20 transition-colors">
                {topic.icon}
              </div>
              <h3 className="font-heading font-bold text-brand-light text-base mb-2 group-hover:text-brand-accent transition-colors">
                {topic.label}
              </h3>
              <p className="text-brand-grey text-sm leading-relaxed">{topic.desc}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* ── Who It's For ───────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-20 py-20 border-b border-brand-border">
        <div className="mb-12">
          <p className="text-[11px] font-bold tracking-[0.18em] uppercase text-brand-accent mb-4">Who This Is For</p>
          <h2 className="font-heading font-bold text-brand-light text-3xl sm:text-4xl leading-tight tracking-tight text-balance">
            You do not need experience to start here
          </h2>
        </div>
        <div className="grid sm:grid-cols-3 gap-8">
          {[
            {
              who: 'Students & fresh graduates',
              detail:
                'You have a degree but the market is not responding. We help you understand what skills are actually in demand, build a portfolio that proves you have them, and navigate your first tech job search.',
            },
            {
              who: 'Career changers',
              detail:
                'You are in accounting, banking, law, or teaching and you want out. We have covered that transition in detail — the timeline, the costs, the realistic outcomes, and the stories of people who have done it.',
            },
            {
              who: 'Working professionals',
              detail:
                'You are already in tech but want to earn more, move into a new specialisation, or finally go freelance. We write for where you are, not just for beginners.',
            },
          ].map(({ who, detail }) => (
            <div key={who} className="space-y-3">
              <div className="w-8 h-[3px] bg-brand-accent rounded-full" />
              <h3 className="font-heading font-bold text-brand-light text-lg">{who}</h3>
              <p className="text-brand-grey text-sm leading-relaxed">{detail}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Values ─────────────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-20 py-20 border-b border-brand-border">
        <div className="mb-12">
          <p className="text-[11px] font-bold tracking-[0.18em] uppercase text-brand-accent mb-4">How We Write</p>
          <h2 className="font-heading font-bold text-brand-light text-3xl sm:text-4xl leading-tight tracking-tight text-balance">
            Two things we never compromise on
          </h2>
        </div>
        <div className="space-y-0 divide-y divide-brand-border">
          {VALUES.map((v, i) => (
            <div key={v.title} className="grid sm:grid-cols-[auto_1fr] gap-6 sm:gap-16 py-10 items-start">
              <span className="font-heading font-bold text-5xl text-brand-border select-none leading-none">
                {String(i + 1).padStart(2, '0')}
              </span>
              <div>
                <h3 className="font-heading font-bold text-brand-light text-xl mb-3">{v.title}</h3>
                <p className="text-brand-grey leading-relaxed">{v.body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── About the Academy ──────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-20 py-20 border-b border-brand-border">
        <div className="max-w-3xl">
          <p className="text-[11px] font-bold tracking-[0.18em] uppercase text-brand-accent mb-4">LeadarX Academy</p>
          <h2 className="font-heading font-bold text-brand-light text-3xl sm:text-4xl leading-tight tracking-tight mb-8 text-balance">
            The blog is free. The academy is where careers are built.
          </h2>
          <div className="space-y-5 text-brand-grey leading-relaxed mb-10">
            <p>
              LeadarX Academy was founded in Nigeria in 2024 with a single belief: that access to quality tech training
              should not depend on where you went to university or who you know. We run structured, cohort-based programs
              in Data Analysis, UI/UX Design, and Digital Marketing — all taught live by working professionals with real
              industry experience.
            </p>
            <p>
              Our programs run for 10 weeks. Classes are online and instructor-led, which means you get the rigour of a
              structured curriculum with the flexibility of remote learning. Every cohort ends with a portfolio-ready
              capstone project, a recognised certificate, and access to our graduate hiring network.
            </p>
            <p>
              Since 2024 we have trained graduates who have gone on to work at fintechs, consumer brands, agencies, and
              international remote roles. The blog is how we share that knowledge openly. The academy is how we go
              deeper with those who are ready to commit.
            </p>
          </div>
          <div className="flex flex-wrap gap-4">
            <a
              href={MAIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-brand-accent text-white font-bold px-6 py-3 rounded-xl hover:opacity-90 transition-opacity text-sm"
            >
              View Programs
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
            <Link
              href="/"
              className="inline-flex items-center gap-2 border border-brand-border text-brand-grey font-semibold px-6 py-3 rounded-xl hover:border-brand-accent hover:text-brand-accent transition-colors text-sm"
            >
              Read the Blog
            </Link>
          </div>
        </div>
      </section>

      {/* ── Enrollment CTA ─────────────────────────────────────────────── */}
      <EnrollmentCTA
        variant="banner"
        heading="Ready to go beyond the articles?"
      />
    </>
  );
}
