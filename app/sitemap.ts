import type { MetadataRoute } from 'next';
import { getSitemapData, getCategories } from '@/lib/api';

const SITE = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://blog.leadarx.com';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  let posts: { slug: string; updated_at: string }[] = [];
  let categories: { slug: string }[] = [];

  try {
    [posts, categories] = await Promise.all([getSitemapData(), getCategories()]);
  } catch {}

  return [
    {
      url: SITE,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${SITE}/search`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.3,
    },
    ...posts.map((post) => ({
      url: `${SITE}/posts/${post.slug}`,
      lastModified: new Date(post.updated_at),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    })),
    ...categories.map((cat) => ({
      url: `${SITE}/categories/${cat.slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.6,
    })),
  ];
}
