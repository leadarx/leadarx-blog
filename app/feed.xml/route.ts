export const dynamic = 'force-dynamic';

import { getRssPosts } from '@/lib/api';
import type { PostCard } from '@/lib/types';

const SITE  = process.env.NEXT_PUBLIC_SITE_URL  ?? 'https://blog.leadarx.com';
const MAIN  = process.env.NEXT_PUBLIC_MAIN_SITE_URL ?? 'https://leadarx.com';

export async function GET(): Promise<Response> {
  let posts: PostCard[] = [];
  try {
    posts = await getRssPosts();
  } catch {
    // silently fall through with empty posts
  }

  const items = posts
    .map((post) => {
      const url = `${SITE}/posts/${post.slug}`;
      const date = post.published_at ? new Date(post.published_at).toUTCString() : new Date().toUTCString();
      return `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <description><![CDATA[${post.excerpt ?? ''}]]></description>
      <pubDate>${date}</pubDate>
      ${post.author?.name ? `<dc:creator><![CDATA[${post.author.name}]]></dc:creator>` : ''}
      ${post.category?.name ? `<category><![CDATA[${post.category.name}]]></category>` : ''}
      ${post.featured_image ? `<enclosure url="${post.featured_image}" type="image/jpeg"/>` : ''}
    </item>`;
    })
    .join('');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0"
  xmlns:dc="http://purl.org/dc/elements/1.1/"
  xmlns:content="http://purl.org/rss/1.0/modules/content/"
  xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Leadarx Blog</title>
    <link>${SITE}</link>
    <description>Data Analysis, UI/UX Design and Digital Marketing insights for Nigerians.</description>
    <language>en-ng</language>
    <managingEditor>support@leadarx.com (Leadarx Academy)</managingEditor>
    <webMaster>support@leadarx.com (Leadarx Academy)</webMaster>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${SITE}/feed.xml" rel="self" type="application/rss+xml"/>
    <image>
      <url>${MAIN}/logo.png</url>
      <title>Leadarx Blog</title>
      <link>${SITE}</link>
    </image>
    ${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 's-maxage=3600, stale-while-revalidate=86400',
    },
  });
}
