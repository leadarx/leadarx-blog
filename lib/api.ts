import type { Post, PostCard, PostList, Category, Tag, SitemapEntry, SortOption } from './types';

const API = process.env.NEXT_PUBLIC_API_URL ?? 'https://leadarx.com/api';

async function apiFetch<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      ...options?.headers,
    },
  });
  if (!res.ok) {
    throw new Error(`API error ${res.status}: ${endpoint}`);
  }
  return res.json() as Promise<T>;
}

// ── Posts ─────────────────────────────────────────────────────────────────────

export async function getPosts(params?: {
  page?: number;
  per_page?: number;
  category?: string;
  tag?: string;
  search?: string;
  sort?: SortOption;
}): Promise<PostList> {
  const qs = new URLSearchParams();
  if (params?.page)     qs.set('page', String(params.page));
  if (params?.per_page) qs.set('per_page', String(params.per_page));
  if (params?.category) qs.set('category', params.category);
  if (params?.tag)      qs.set('tag', params.tag);
  if (params?.search)   qs.set('search', params.search);
  if (params?.sort)     qs.set('sort', params.sort);

  return apiFetch<PostList>(
    `/blog/posts${qs.toString() ? '?' + qs.toString() : ''}`,
    { next: { revalidate: 300 } }
  );
}

export async function getPost(slug: string): Promise<Post> {
  const res = await apiFetch<{ data: Post }>(`/blog/posts/${slug}`, { cache: 'no-store' });
  return res.data;
}

export async function getFeaturedPosts(): Promise<PostCard[]> {
  const res = await apiFetch<{ data: PostCard[] }>('/blog/featured', { next: { revalidate: 300 } });
  return res.data ?? [];
}

export async function getRelatedPosts(slug: string): Promise<PostCard[]> {
  const res = await apiFetch<{ data: PostCard[] }>(`/blog/posts/${slug}/related`, { next: { revalidate: 600 } });
  return res.data ?? [];
}

export async function searchPosts(query: string, page = 1): Promise<PostList> {
  return apiFetch<PostList>(`/blog/search?q=${encodeURIComponent(query)}&page=${page}`, {
    cache: 'no-store',
  });
}

export async function getPostPreview(slug: string, token: string): Promise<Post> {
  const res = await apiFetch<{ data: Post }>(`/blog/preview/${slug}?preview_token=${token}`, { cache: 'no-store' });
  return res.data;
}

// ── Categories ────────────────────────────────────────────────────────────────

export async function getCategories(): Promise<Category[]> {
  const res = await apiFetch<{ data: Category[] }>('/blog/categories', { cache: 'no-store' });
  return res.data ?? [];
}

export async function getCategoryWithPosts(
  slug: string,
  page = 1
): Promise<{ category: Category; posts: PostCard[] }> {
  return apiFetch(`/blog/categories/${slug}?page=${page}`, { next: { revalidate: 300 } });
}

// ── Tags ──────────────────────────────────────────────────────────────────────

export async function getTags(): Promise<Tag[]> {
  const res = await apiFetch<{ data: Tag[] }>('/blog/tags', { next: { revalidate: 3600 } });
  return res.data ?? [];
}

export async function getTagPosts(slug: string, page = 1): Promise<PostList> {
  return apiFetch<PostList>(`/blog/tags/${slug}/posts?page=${page}`, { next: { revalidate: 300 } });
}

// ── SEO ───────────────────────────────────────────────────────────────────────

export async function getSitemapData(): Promise<SitemapEntry[]> {
  return apiFetch<SitemapEntry[]>('/blog/sitemap', { next: { revalidate: 3600 } });
}

export async function getRssPosts(): Promise<PostCard[]> {
  const res = await apiFetch<{ data: PostCard[] }>('/blog/rss', { next: { revalidate: 3600 } });
  return res.data ?? [];
}
