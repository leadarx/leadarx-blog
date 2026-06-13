import type { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getPost, getSitemapData } from '@/lib/api';
import PostBody from '@/components/blog/PostBody';
import CategoryBadge from '@/components/blog/CategoryBadge';
import TagList from '@/components/blog/TagList';
import RelatedPosts from '@/components/blog/RelatedPosts';
import EnrollmentCTA from '@/components/blog/EnrollmentCTA';
import TableOfContents from '@/components/blog/TableOfContents';
import ShareButtons from '@/components/blog/ShareButtons';
import { formatDateFull } from '@/lib/utils';

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  try {
    const posts = await getSitemapData();
    return posts.map((p) => ({ slug: p.slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const post = await getPost(params.slug);
    const SITE = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://blog.leadarx.com';

    return {
      title: post.meta_title || post.title,
      description: post.meta_description || post.excerpt || '',
      keywords: post.meta_keywords || undefined,
      alternates: {
        canonical: post.canonical_url || `${SITE}/posts/${post.slug}`,
      },
      robots: post.noindex ? 'noindex,nofollow' : 'index,follow,max-snippet:-1,max-image-preview:large',
      openGraph: {
        type: 'article',
        title: post.meta_title || post.title,
        description: post.meta_description || post.excerpt || '',
        url: `${SITE}/posts/${post.slug}`,
        publishedTime: post.published_at ?? undefined,
        modifiedTime: post.updated_at,
        authors: [post.author?.name ?? 'Leadarx'],
        images: post.og_image
          ? [{ url: post.og_image, width: 1200, height: 630 }]
          : post.featured_image
          ? [{ url: post.featured_image, width: 1200, height: 630, alt: post.featured_image_alt ?? post.title }]
          : [],
      },
      twitter: {
        card: 'summary_large_image',
        title: post.meta_title || post.title,
        description: post.meta_description || post.excerpt || '',
        images: post.og_image ? [post.og_image] : post.featured_image ? [post.featured_image] : [],
      },
    };
  } catch {
    return { title: 'Post not found' };
  }
}

export default async function PostPage({ params }: Props) {
  let post;
  try {
    post = await getPost(params.slug);
  } catch {
    notFound();
  }

  const SITE = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://blog.leadarx.com';
  const postUrl = `${SITE}/posts/${post.slug}`;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Article',
        headline: post.title,
        description: post.excerpt,
        image: post.featured_image,
        datePublished: post.published_at,
        dateModified: post.updated_at,
        author: { '@type': 'Person', name: post.author?.name },
        publisher: {
          '@type': 'Organization',
          name: 'Leadarx Academy',
          logo: { '@type': 'ImageObject', url: 'https://leadarx.com/logo.png' },
        },
        mainEntityOfPage: { '@type': 'WebPage', '@id': postUrl },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Blog', item: SITE },
          post.category && { '@type': 'ListItem', position: 2, name: post.category.name, item: `${SITE}/categories/${post.category.slug}` },
          { '@type': 'ListItem', position: post.category ? 3 : 2, name: post.title, item: postUrl },
        ].filter(Boolean),
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Featured image */}
      {post.featured_image && (
        <div className="relative w-full h-[320px] md:h-[480px] overflow-hidden">
          <Image
            src={post.featured_image}
            alt={post.featured_image_alt ?? post.title}
            fill
            sizes="100vw"
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#1C1C1C]" />
        </div>
      )}

      <div className="max-w-7xl mx-auto px-6">
        {/* Post header */}
        <div className="max-w-3xl mx-auto pt-8 pb-10">
          <CategoryBadge category={post.category} className="mb-4" />

          <h1 className="font-heading font-bold text-brand-light text-3xl md:text-5xl leading-tight mb-6 text-balance">
            {post.title}
          </h1>

          <div className="flex items-center gap-4 mb-5">
            {post.author?.avatar ? (
              <Image src={post.author.avatar} alt={post.author.name} width={40} height={40} className="rounded-full object-cover flex-shrink-0" />
            ) : (
              <div className="w-10 h-10 rounded-full bg-brand-accent/20 flex items-center justify-center flex-shrink-0">
                <span className="text-brand-accent font-bold">{post.author?.name?.[0] ?? 'L'}</span>
              </div>
            )}
            <div className="text-sm text-brand-grey">
              <span className="text-brand-light font-medium">{post.author?.name}</span>
              {' '}&middot;{' '}
              {post.published_at && formatDateFull(post.published_at)}
              {' '}&middot;{' '}
              {post.reading_time}
              {post.view_count > 0 && <>{' '}&middot;{' '}{post.view_count.toLocaleString()} views</>}
            </div>
          </div>

          {post.tags?.length > 0 && <TagList tags={post.tags} className="mb-6" />}

          <div className="border-t border-brand-border" />
        </div>

        {/* Two-column layout */}
        <div className="flex gap-12 pb-16">
          {/* Main content */}
          <article className="flex-1 min-w-0 max-w-3xl">
            {/* Mobile TOC */}
            {post.body_html && (
              <details className="lg:hidden mb-8 bg-brand-card border border-brand-border rounded-xl p-5">
                <summary className="text-brand-light font-semibold text-sm cursor-pointer">Table of Contents</summary>
                <div className="mt-4">
                  <TableOfContents html={post.body_html} />
                </div>
              </details>
            )}

            {post.body_html ? (
              <PostBody html={post.body_html} categoryColor={post.category?.color ?? undefined} />
            ) : (
              <p className="text-brand-grey italic">No content available.</p>
            )}

            {/* Author bio */}
            {post.author?.bio && (
              <div className="mt-12 p-6 border border-brand-border rounded-xl flex gap-5">
                {post.author.avatar ? (
                  <Image src={post.author.avatar} alt={post.author.name} width={80} height={80} className="rounded-full object-cover flex-shrink-0 self-start" />
                ) : (
                  <div className="w-20 h-20 rounded-full bg-brand-accent/20 flex items-center justify-center flex-shrink-0">
                    <span className="text-brand-accent text-2xl font-bold">{post.author.name[0]}</span>
                  </div>
                )}
                <div>
                  <p className="text-brand-light font-heading font-bold text-lg mb-2">{post.author.name}</p>
                  <p className="text-brand-grey text-sm leading-relaxed">{post.author.bio}</p>
                  {post.author.linkedin_url && (
                    <a href={post.author.linkedin_url} target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex items-center gap-2 text-brand-accent text-sm hover:underline">
                      LinkedIn Profile
                    </a>
                  )}
                </div>
              </div>
            )}

            <TagList tags={post.tags ?? []} className="mt-8" />
          </article>

          {/* Sticky sidebar — desktop only */}
          <aside className="hidden lg:block w-72 flex-shrink-0">
            <div className="sticky top-24 space-y-8">
              {post.body_html && (
                <div className="bg-brand-card border border-brand-border rounded-xl p-6">
                  <TableOfContents html={post.body_html} />
                </div>
              )}

              <EnrollmentCTA variant="sidebar" categoryColor={post.category?.color ?? undefined} />

              <div className="bg-brand-card border border-brand-border rounded-xl p-6">
                <ShareButtons url={postUrl} title={post.title} />
              </div>
            </div>
          </aside>
        </div>

        {/* Related posts */}
        {post.related_posts?.length > 0 && (
          <div className="pb-16">
            <RelatedPosts posts={post.related_posts} />
          </div>
        )}
      </div>

      {/* Bottom enrollment CTA */}
      <EnrollmentCTA variant="banner" heading="Enjoyed this article?" />

      {/* Sticky share bar on mobile */}
      <ShareButtons url={postUrl} title={post.title} sticky />
    </>
  );
}
