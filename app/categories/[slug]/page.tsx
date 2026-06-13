import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getCategoryWithPosts, getCategories } from '@/lib/api';
import PostCard from '@/components/blog/PostCard';
import EnrollmentCTA from '@/components/blog/EnrollmentCTA';
import Pagination from '@/app/Pagination';

export const revalidate = 300;

interface Props {
  params: { slug: string };
  searchParams: { page?: string };
}

export async function generateStaticParams() {
  try {
    const cats = await getCategories();
    return cats.map((c) => ({ slug: c.slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const { category } = await getCategoryWithPosts(params.slug);
    return {
      title: `${category.name} Articles`,
      description:
        category.meta_description ||
        `Browse all ${category.name} articles on the Leadarx Blog.`,
    };
  } catch {
    return { title: 'Category not found' };
  }
}

export default async function CategoryPage({ params, searchParams }: Props) {
  const page = parseInt(searchParams.page ?? '1', 10);

  let data;
  try {
    data = await getCategoryWithPosts(params.slug, page);
  } catch {
    notFound();
  }

  const { category, posts } = data;

  return (
    <>
      <section className="max-w-7xl mx-auto px-6 pt-12 pb-10">
        <div className="max-w-2xl">
          <span
            className="inline-block px-3 py-1 rounded-full text-xs font-bold tracking-widest uppercase mb-4"
            style={
              category.color
                ? { backgroundColor: category.color + '22', color: category.color }
                : { backgroundColor: '#D96C4A22', color: '#D96C4A' }
            }
          >
            Category
          </span>
          <h1 className="font-heading font-bold text-brand-light text-4xl md:text-5xl mb-4">{category.name}</h1>
          {category.description && (
            <p className="text-brand-grey text-lg leading-relaxed">{category.description}</p>
          )}
          <p className="text-brand-grey text-sm mt-3">{category.post_count ?? posts.meta.total} articles</p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 pb-16">
        {posts.data.length === 0 ? (
          <p className="text-brand-grey py-20 text-center">No articles in this category yet.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.data.map((post) => (
              <PostCard key={post.uuid} post={post} />
            ))}
          </div>
        )}

        {posts.meta.last_page > 1 && (
          <div className="mt-12">
            <Pagination meta={posts.meta} basePath={`/categories/${params.slug}`} />
          </div>
        )}
      </section>

      <EnrollmentCTA variant="banner" />
    </>
  );
}
