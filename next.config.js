/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    // Build renders category/post pages in parallel and each hits the Laravel API;
    // the default of 8 at once trips the shared host's MySQL connection limit.
    staticGenerationMaxConcurrency: 2,
  },
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'leadarx.com' },
      { protocol: 'https', hostname: '*.leadarx.com' },
      { protocol: 'https', hostname: 's3.us-east-005.backblazeb2.com' },
    ],
  },
  async headers() {
    return [
      {
        source: '/feed.xml',
        headers: [{ key: 'Content-Type', value: 'application/rss+xml; charset=utf-8' }],
      },
    ];
  },
};

module.exports = nextConfig;
