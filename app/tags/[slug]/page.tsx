import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getTagPosts } from '@/lib/api';
import PostCard from '@/components/blog/PostCard';
import EnrollmentCTA from '@/components/blog/EnrollmentCTA';
import Pagination from '@/app/Pagination';

export const revalidate = 300;

interface Props {
  params: { slug: string };
  searchParams: { page?: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const tag = params.slug.replace(/-/g, ' ');
  return {
    title: `#${tag} Articles`,
    description: `Browse all articles tagged with ${tag} on the Leadarx Blog.`,
  };
}

export default async function TagPage({ params, searchParams }: Props) {
  const page = parseInt(searchParams.page ?? '1', 10);

  let posts;
  try {
    posts = await getTagPosts(params.slug, page);
  } catch {
    notFound();
  }

  const tagName = params.slug.replace(/-/g, ' ');

  return (
    <>
      <section className="max-w-7xl mx-auto px-6 pt-12 pb-10">
        <p className="text-brand-grey text-sm uppercase tracking-widest font-bold mb-2">Tag</p>
        <h1 className="font-heading font-bold text-brand-light text-4xl mb-2">#{tagName}</h1>
        <p className="text-brand-grey">{posts.meta.total} articles</p>
      </section>

      <section className="max-w-7xl mx-auto px-6 pb-16">
        {posts.data.length === 0 ? (
          <p className="text-brand-grey py-20 text-center">No articles with this tag.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.data.map((post) => (
              <PostCard key={post.uuid} post={post} />
            ))}
          </div>
        )}

        {posts.meta.last_page > 1 && (
          <div className="mt-12">
            <Pagination meta={posts.meta} basePath={`/tags/${params.slug}`} />
          </div>
        )}
      </section>

      <EnrollmentCTA variant="banner" />
    </>
  );
}
