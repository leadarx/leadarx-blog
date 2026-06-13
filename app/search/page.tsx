import { Suspense } from 'react';
import SearchContent from './SearchContent';
import EnrollmentCTA from '@/components/blog/EnrollmentCTA';
import { SkeletonCard } from '@/components/ui/Skeleton';

export const metadata = {
  title: 'Search Articles',
  description: 'Search through all Leadarx Blog articles on Data Analysis, UI/UX Design and Digital Marketing.',
};

function SearchFallback() {
  return (
    <>
      <section className="max-w-3xl mx-auto px-6 pt-12 pb-10">
        <h1 className="font-heading font-bold text-brand-light text-4xl mb-8">Search Articles</h1>
        <div className="h-12 bg-brand-border rounded-xl animate-pulse" />
      </section>
      <section className="max-w-7xl mx-auto px-6 pb-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => <SkeletonCard key={i} />)}
        </div>
      </section>
    </>
  );
}

export default function SearchPage() {
  return (
    <>
      <Suspense fallback={<SearchFallback />}>
        <SearchContent />
      </Suspense>
      <EnrollmentCTA variant="banner" />
    </>
  );
}
