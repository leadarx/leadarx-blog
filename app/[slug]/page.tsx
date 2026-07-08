import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getPost, getSitemapData } from '@/lib/api';
import PostBody from '@/components/blog/PostBody';
import CategoryBadge from '@/components/blog/CategoryBadge';
import TagList from '@/components/blog/TagList';
import RelatedPosts from '@/components/blog/RelatedPosts';
import EnrollmentCTA from '@/components/blog/EnrollmentCTA';
import TableOfContents from '@/components/blog/TableOfContents';
import ShareButtons from '@/components/blog/ShareButtons';
import ReadingProgress from '@/components/blog/ReadingProgress';
import { formatDateFull } from '@/lib/utils';

interface Props {
  params: Promise<{ slug: string }>;
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
    const { slug } = await params;
    const post = await getPost(slug);
    const SITE  = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://blog.leadarx.com';

    return {
      title: post.meta_title || post.title,
      description: post.meta_description || post.excerpt || '',
      keywords: post.meta_keywords || undefined,
      alternates: {
        canonical: post.canonical_url || `${SITE}/${post.slug}`,
      },
      robots: post.noindex ? 'noindex,nofollow' : 'index,follow,max-snippet:-1,max-image-preview:large',
      openGraph: {
        type: 'article',
        title: post.meta_title || post.title,
        description: post.meta_description || post.excerpt || '',
        url: `${SITE}/${post.slug}`,
        publishedTime: post.published_at ?? undefined,
        modifiedTime: post.updated_at,
        authors: post.show_author && post.author?.name ? [post.author.name] : ['LeadarX'],
        images: post.og_image
          ? [{ url: post.og_image, width: 1200, height: 630 }]
          : post.featured_image
          ? [{ url: post.featured_image, width: 1200, height: 630, alt: post.featured_image_alt ?? post.title }]
          : [{ url: `${SITE}/og-default.png`, width: 1200, height: 630, alt: 'LeadarX' }],
      },
      twitter: {
        card: 'summary_large_image',
        title: post.meta_title || post.title,
        description: post.meta_description || post.excerpt || '',
        images: [post.og_image || post.featured_image || `${SITE}/og-default.png`],
      },
    };
  } catch {
    return { title: 'Post not found' };
  }
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;

  const post = await getPost(slug).catch(() => null);
  if (!post) notFound();

  const SITE    = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://blog.leadarx.com';
  const postUrl = `${SITE}/${post.slug}`;

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
        author: post.show_author && post.author?.name
          ? { '@type': 'Person', name: post.author.name }
          : { '@type': 'Organization', name: 'LeadarX Academy' },
        publisher: {
          '@type': 'Organization',
          name: 'LeadarX Academy',
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
      <ReadingProgress />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-20">

        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-xs text-brand-grey pt-6 pb-1" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-brand-accent transition-colors duration-150">Blog</Link>
          {post.category && (
            <>
              <span className="opacity-40">/</span>
              <Link
                href={`/categories/${post.category.slug}`}
                className="hover:text-brand-accent transition-colors duration-150"
              >
                {post.category.name}
              </Link>
            </>
          )}
          <span className="opacity-40">/</span>
          <span className="text-brand-light/70 truncate max-w-[180px] sm:max-w-xs">{post.title}</span>
        </nav>

        {/* Two-column layout */}
        <div className="flex gap-12 xl:gap-16 pb-24">

          {/* Main column */}
          <article className="flex-1 min-w-0">

            {/* Post header */}
            <header className="pt-6 pb-10 max-w-[720px]">

              {/* Category */}
              <div className="mb-5">
                <CategoryBadge category={post.category} />
              </div>

              {/* Title */}
              <h1
                className="font-heading font-bold text-brand-light text-balance mb-7 leading-[1.15] tracking-[-0.02em]"
                style={{ fontSize: 'clamp(26px, 4vw, 46px)' }}
              >
                {post.title}
              </h1>

              {/* Author row */}
              <div className="flex items-center gap-3 mb-6">
                {/* Avatar stack */}
                <div className="flex items-center flex-shrink-0">
                  <div className="w-[38px] h-[38px] rounded-full bg-brand-accent/15 border-2 border-brand-dark flex items-center justify-center relative z-10">
                    <span className="text-brand-accent text-sm font-bold leading-none">L</span>
                  </div>
                  {post.show_author && post.author?.name && (
                    post.author.avatar ? (
                      <Image
                        src={post.author.avatar}
                        alt={post.author.name}
                        width={38}
                        height={38}
                        className="w-[38px] h-[38px] rounded-full object-cover border-2 border-brand-dark -ml-3"
                      />
                    ) : (
                      <div className="w-[38px] h-[38px] rounded-full bg-brand-border border-2 border-brand-dark flex items-center justify-center -ml-3">
                        <span className="text-brand-grey text-sm font-bold leading-none">
                          {post.author.name[0].toUpperCase()}
                        </span>
                      </div>
                    )
                  )}
                </div>

                <div>
                  <p className="text-brand-light text-sm font-semibold leading-tight">
                    {post.show_author && post.author?.name
                      ? `LeadarX, ${post.author.name}`
                      : 'LeadarX'}
                  </p>
                  {post.published_at && (
                    <p className="text-brand-grey text-xs mt-0.5">
                      {formatDateFull(post.published_at)}
                      {post.reading_time && (
                        <span className="tabular-nums"> · {post.reading_time}</span>
                      )}
                    </p>
                  )}
                </div>
              </div>

              {/* Tags + share */}
              <div className="flex items-center gap-3 mb-6">
                {post.tags?.length > 0 && <TagList tags={post.tags} className="flex-1" />}
                <ShareButtons
                  compact
                  url={postUrl}
                  title={post.title}
                  excerpt={post.excerpt ?? undefined}
                  image={post.og_image ?? post.featured_image ?? undefined}
                />
              </div>

              <div className="border-t border-brand-border" />
            </header>

            {/* Featured image — shown after tags */}
            {post.featured_image && (
              <div className="relative w-full max-w-[720px] h-[240px] sm:h-[360px] md:h-[440px] overflow-hidden rounded-xl bg-brand-card mb-10">
                <Image
                  src={post.featured_image}
                  alt={post.featured_image_alt ?? post.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 720px"
                  className="object-cover"
                  priority
                />
              </div>
            )}

            {/* Mobile TOC */}
            {post.body_html && (
              <div className="lg:hidden mb-8 max-w-[720px] border border-brand-border rounded-xl overflow-hidden">
                <details>
                  <summary className="px-5 py-4 text-sm font-semibold text-brand-light cursor-pointer select-none flex items-center justify-between list-none">
                    <span>Table of Contents</span>
                    <svg className="w-4 h-4 text-brand-grey flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </summary>
                  <div className="px-5 pb-5 border-t border-brand-border pt-4">
                    <TableOfContents html={post.body_html} />
                  </div>
                </details>
              </div>
            )}

            {/* Article body */}
            <div className="max-w-[720px]">
              {post.body_html ? (
                <PostBody html={post.body_html} categoryColor={post.category?.color ?? undefined} />
              ) : (
                <p className="text-brand-grey italic">No content available.</p>
              )}
            </div>

            {/* Author bio */}
            {post.show_author && post.author?.bio && (
              <div className="mt-14 pt-8 border-t border-brand-border max-w-[720px]">
                <p className="text-[11px] font-bold tracking-[0.12em] uppercase text-brand-grey mb-5">Written by</p>
                <div className="flex gap-4">
                  {post.author.avatar ? (
                    <Image
                      src={post.author.avatar}
                      alt={post.author.name}
                      width={60}
                      height={60}
                      className="rounded-full object-cover flex-shrink-0 self-start"
                    />
                  ) : (
                    <div className="w-[60px] h-[60px] rounded-full bg-brand-accent/15 flex items-center justify-center flex-shrink-0">
                      <span className="text-brand-accent text-xl font-bold">{post.author.name[0]}</span>
                    </div>
                  )}
                  <div>
                    <p className="text-brand-light font-heading font-bold text-base mb-1.5 leading-tight">
                      {post.author.name}
                    </p>
                    <p className="text-brand-grey text-sm leading-relaxed">{post.author.bio}</p>
                    {post.author.linkedin_url && (
                      <a
                        href={post.author.linkedin_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-3 inline-flex items-center gap-1.5 text-brand-accent text-sm font-medium hover:underline"
                      >
                        LinkedIn
                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Bottom tags */}
            <TagList tags={post.tags ?? []} className="mt-8 max-w-[720px]" />
          </article>

          {/* Sticky sidebar — desktop only */}
          <aside className="hidden lg:flex flex-col w-[260px] xl:w-[280px] flex-shrink-0 pt-[88px]">
            <div className="sticky top-24 flex flex-col gap-8">

              {/* TOC */}
              {post.body_html && (
                <TableOfContents html={post.body_html} />
              )}

              {/* Divider */}
              <div className="border-t border-brand-border" />

              {/* Enrollment CTA */}
              <EnrollmentCTA variant="sidebar" categoryColor={post.category?.color ?? undefined} />

              {/* Divider */}
              <div className="border-t border-brand-border" />

              {/* Share */}
              <ShareButtons
                url={postUrl}
                title={post.title}
                excerpt={post.excerpt ?? undefined}
                image={post.og_image ?? post.featured_image ?? undefined}
              />
            </div>
          </aside>
        </div>

        {/* Related posts */}
        {post.related_posts?.length > 0 && (
          <div className="pb-20">
            <RelatedPosts posts={post.related_posts} />
          </div>
        )}
      </div>

      {/* Bottom enrollment CTA */}
      <EnrollmentCTA variant="banner" heading="Enjoyed this article?" />

      {/* Sticky share bar — mobile only */}
      <ShareButtons
        url={postUrl}
        title={post.title}
        excerpt={post.excerpt ?? undefined}
        image={post.og_image ?? post.featured_image ?? undefined}
        sticky
      />
    </>
  );
}
