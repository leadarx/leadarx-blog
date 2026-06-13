/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'leadarx.com' },
      { protocol: 'https', hostname: '*.leadarx.com' },
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
