import type { Metadata } from 'next';
import { Suspense } from 'react';
import { getPosts, getFeaturedPosts, getCategories } from '@/lib/api';
import PostCard from '@/components/blog/PostCard';
import PostCardFeatured from '@/components/blog/PostCardFeatured';
import EnrollmentCTA from '@/components/blog/EnrollmentCTA';
import CategoryFilter from './CategoryFilter';
import Pagination from './Pagination';
import { SkeletonCard } from '@/components/ui/Skeleton';

export const revalidate = 300;

export const metadata: Metadata = {
  title: 'Blog: Data Analysis, UI/UX and Digital Marketing Articles',
  description:
    "Nigeria's tech career and news hub. Practical guides, industry updates, and resources covering Data Analysis, UI/UX Design, Digital Marketing, and other tech-related career paths.",
};

interface Props {
  searchParams: Promise<{ page?: string; category?: string }>;
}

export default async function BlogHomePage({ searchParams }: Props) {
  const { page: pageParam, category } = await searchParams;
  const page = parseInt(pageParam ?? '1', 10);

  const emptyPostList = {
    data: [],
    links: { first: '', last: '', prev: null, next: null },
    meta: { current_page: 1, from: 0, last_page: 1, per_page: 9, to: 0, total: 0 },
  };

  const [featured, categories, posts] = await Promise.all([
    getFeaturedPosts().catch(() => []),
    getCategories().catch(() => []),
    getPosts({ page, category, per_page: 9 }).catch(() => emptyPostList),
  ]);

  const heroPost = featured[0] ?? posts.data[0] ?? null;

  return (
    <>
      {/* Hero */}
      <section className="border-b border-brand-border">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-20 pt-24 pb-14">

          <p className="text-[11px] font-bold tracking-[0.18em] uppercase text-brand-grey mb-5">
            Est. 2024 · Nigeria
          </p>

          <h1
            className="font-heading font-bold text-brand-light leading-[1.08] tracking-[-0.03em] text-balance mb-6"
            style={{ fontSize: 'clamp(44px, 8vw, 96px)' }}
          >
            LeadarX Blog
          </h1>

          <p className="text-brand-grey text-base sm:text-lg max-w-2xl leading-relaxed mb-8">
            Nigeria's tech career and news hub. Practical guides, industry updates, and resources covering Data Analysis, UI/UX Design, Digital Marketing, and other tech-related career paths.
          </p>

          {categories.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {categories.filter(cat => ['data-analysis','career-tips','industry-insights','tech-news'].includes(cat.slug)).map((cat) => (
                <a
                  key={cat.slug}
                  href={`/categories/${cat.slug}`}
                  className="px-4 py-1.5 rounded-full border border-brand-border text-brand-grey text-xs font-medium hover:border-brand-accent hover:text-brand-accent transition-colors duration-150"
                >
                  {cat.name}
                </a>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Featured post */}
      {heroPost && (
        <section className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-20 pt-12 pb-10">
          <PostCardFeatured post={heroPost} />
        </section>
      )}

      {/* Category filter */}
      <section className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-20 pb-8">
        <CategoryFilter categories={categories} active={category} />
      </section>

      {/* Post grid */}
      <section className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-20 pb-16">
        {posts.data.length === 0 ? (
          <div className="text-center py-20 text-brand-grey">
            <p className="text-xl">No articles found.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.data.map((post) => (
              <PostCard key={post.uuid} post={post} />
            ))}
          </div>
        )}

        {posts.meta.last_page > 1 && (
          <div className="mt-12">
            <Pagination meta={posts.meta} category={category} />
          </div>
        )}
      </section>

      {/* Enrollment CTA */}
      <EnrollmentCTA variant="banner" />
    </>
  );
}
