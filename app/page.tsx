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
    'Read practical articles on Data Analysis, UI/UX Design and Digital Marketing. Written for Nigerians building tech careers with Leadarx Academy.',
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
      {heroPost && (
        <section className="max-w-7xl mx-auto px-6 pt-10 pb-12">
          <PostCardFeatured post={heroPost} />
        </section>
      )}

      {/* Category filter */}
      <section className="max-w-7xl mx-auto px-6 pb-8">
        <CategoryFilter categories={categories} active={category} />
      </section>

      {/* Post grid */}
      <section className="max-w-7xl mx-auto px-6 pb-16">
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
