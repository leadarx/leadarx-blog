import type { MetadataRoute } from 'next';

const SITE = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://blog.leadarx.com';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/admin/'],
      },
    ],
    sitemap: [
      `${SITE}/sitemap.xml`,
      'https://learn.leadarx.com/sitemap.xml',
      'https://leadarx.com/sitemap.xml',
    ],
    host: SITE,
  };
}
