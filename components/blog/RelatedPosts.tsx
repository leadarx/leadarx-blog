import type { PostCard as PostCardType } from '@/lib/types';
import PostCard from './PostCard';

interface Props {
  posts: PostCardType[];
}

export default function RelatedPosts({ posts }: Props) {
  if (!posts.length) return null;

  return (
    <section className="mt-16">
      <h2 className="font-heading font-bold text-brand-light text-2xl mb-8">You might also like</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <PostCard key={post.uuid} post={post} />
        ))}
      </div>
    </section>
  );
}
