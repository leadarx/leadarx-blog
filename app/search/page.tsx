'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { searchPosts, getPosts } from '@/lib/api';
import type { PostCard, PostList } from '@/lib/types';
import PostCard from '@/components/blog/PostCard';
import SearchBar from '@/components/blog/SearchBar';
import EnrollmentCTA from '@/components/blog/EnrollmentCTA';
import { SkeletonCard } from '@/components/ui/Skeleton';

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') ?? '';

  const [results, setResults]   = useState<PostCard[]>([]);
  const [popular, setPopular]   = useState<PostCard[]>([]);
  const [total, setTotal]       = useState<number | null>(null);
  const [loading, setLoading]   = useState(false);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      setTotal(null);
      return;
    }
    setLoading(true);
    searchPosts(query)
      .then((data) => { setResults(data.data); setTotal(data.meta.total); })
      .catch(() => { setResults([]); setTotal(0); })
      .finally(() => setLoading(false));
  }, [query]);

  useEffect(() => {
    getPosts({ sort: 'popular', per_page: 3 })
      .then((d) => setPopular(d.data))
      .catch(() => {});
  }, []);

  return (
    <>
      <section className="max-w-3xl mx-auto px-6 pt-12 pb-10">
        <h1 className="font-heading font-bold text-brand-light text-4xl mb-8">Search Articles</h1>
        <SearchBar defaultValue={query} autoFocus />
      </section>

      <section className="max-w-7xl mx-auto px-6 pb-16">
        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => <SkeletonCard key={i} />)}
          </div>
        )}

        {!loading && query && total !== null && (
          <>
            <p className="text-brand-grey mb-6">
              {total === 0 ? 'No results' : `${total} result${total !== 1 ? 's' : ''}`} for &ldquo;{query}&rdquo;
            </p>
            {results.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {results.map((post) => <PostCard key={post.uuid} post={post} />)}
              </div>
            ) : (
              <div className="py-12 text-center">
                <p className="text-brand-grey text-xl mb-6">No articles found. Try different keywords.</p>
                {popular.length > 0 && (
                  <>
                    <p className="text-brand-light font-semibold mb-6">Popular articles:</p>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-left">
                      {popular.map((p) => <PostCard key={p.uuid} post={p} />)}
                    </div>
                  </>
                )}
              </div>
            )}
          </>
        )}

        {!query && popular.length > 0 && (
          <>
            <p className="text-brand-light font-semibold mb-6">Popular articles to get you started:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {popular.map((p) => <PostCard key={p.uuid} post={p} />)}
            </div>
          </>
        )}
      </section>

      <EnrollmentCTA variant="banner" />
    </>
  );
}
