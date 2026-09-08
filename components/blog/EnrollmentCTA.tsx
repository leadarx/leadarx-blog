import { getActiveCourses } from '@/lib/api';

interface Props {
  variant?: 'sidebar' | 'banner' | 'inline';
  categoryColor?: string;
  heading?: string;
}

/**
 * The academy advert. Two rules it has to keep:
 *
 * 1. It advertises whatever courses are currently running, read from the admin
 *    API (which returns only is_active rows), never a hardcoded course. A course
 *    retired in the panel disappears from these adverts on the next revalidate.
 * 2. It quotes no prices. Fees are set per class in the panel and change; a
 *    figure transcribed into a blog advert goes stale silently and the blog is
 *    the last place anyone remembers to update.
 */
export default async function EnrollmentCTA({ variant = 'banner', categoryColor, heading }: Props) {
  const ENROLL_URL = process.env.NEXT_PUBLIC_MAIN_SITE_URL ?? 'https://leadarx.com';
  const MAIN_URL   = process.env.NEXT_PUBLIC_MAIN_SITE_URL ?? 'https://leadarx.com';

  const courses = await getActiveCourses();
  const names   = courses.map((c) => c.name);

  // "Data Analysis, AI Automation and Digital Marketing", or nothing at all if
  // the API is unreachable, in which case the copy still reads correctly.
  const courseList =
    names.length > 1
      ? `${names.slice(0, -1).join(', ')} and ${names[names.length - 1]}`
      : names[0] ?? '';

  if (variant === 'sidebar') {
    return (
      <div className="bg-brand-accent rounded-xl p-6 text-center">
        <p className="text-[#1C1C1C] text-xs font-bold tracking-widest uppercase mb-2">10-Week Program</p>
        <h3 className="text-[#1C1C1C] font-heading font-bold text-xl leading-tight mb-3">
          {heading ?? (courseList ? `Learn ${names[0]}` : 'Learn with LeadarX')}
        </h3>
        <p className="text-[rgba(28,28,28,0.75)] text-sm mb-4">
          {courseList
            ? `${courseList}. Live instructors. Certificate included.`
            : 'Live instructors. Real projects. Certificate included.'}
        </p>
        <a
          href={ENROLL_URL}
          className="block bg-white text-[#1C1C1C] font-bold py-3 rounded-lg text-sm hover:opacity-90 transition-opacity"
        >
          Enroll Now
        </a>
      </div>
    );
  }

  if (variant === 'inline') {
    const bg = categoryColor ?? '#D96C4A';
    return (
      <div className="my-10 p-8 rounded-xl text-center" style={{ backgroundColor: bg }}>
        <p className="text-[#1C1C1C] text-xs font-bold tracking-widest uppercase mb-2">Ready to go further?</p>
        <h3 className="text-[#1C1C1C] font-heading font-bold text-2xl leading-tight mb-3">
          {heading ?? 'Master these skills in 10 weeks'}
        </h3>
        <p className="text-[rgba(28,28,28,0.8)] text-sm mb-5">
          {courseList
            ? `Our certified programs in ${courseList} cover everything in this article and more. Live instructors. Real projects. Job support.`
            : 'Our certified programs cover everything in this article and more. Live instructors. Real projects. Job support.'}
        </p>
        <a
          href={ENROLL_URL}
          className="inline-block bg-white text-[#1C1C1C] font-bold px-8 py-3 rounded-lg hover:opacity-90 transition-opacity"
        >
          Enroll Now
        </a>
      </div>
    );
  }

  // Banner variant
  return (
    <section className="bg-brand-accent">
      <div className="max-w-4xl mx-auto px-6 py-16 text-center">
        <h2 className="font-heading font-bold text-[#1C1C1C] text-3xl lg:text-4xl mb-4 text-balance">
          {heading ?? 'Ready to get certified?'}
        </h2>
        <p className="text-[rgba(28,28,28,0.8)] text-lg mb-8">
          {courseList
            ? `Join our next cohort in ${courseList}. 10 weeks. Certificate included. Get hired after graduation.`
            : 'Join our next cohort. 10 weeks. Certificate included. Get hired after graduation.'}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href={ENROLL_URL}
            className="inline-flex items-center justify-center bg-white text-[#1C1C1C] font-bold px-8 py-4 rounded-xl hover:opacity-90 transition-opacity text-lg"
          >
            Enroll Now
          </a>
          <a
            href={MAIN_URL}
            className="inline-flex items-center justify-center border-2 border-[#1C1C1C] text-[#1C1C1C] font-bold px-8 py-4 rounded-xl hover:bg-[rgba(28,28,28,0.08)] transition-colors text-lg"
          >
            Learn More
          </a>
        </div>
      </div>
    </section>
  );
}
