/** @type {import('next').NextConfig} */
const nextTranslate = require('next-translate');

const nextConfig = nextTranslate({
  reactStrictMode: true,
  images: {
    domains: ['www.findthefinder.com'],
  },
  async rewrites() {
    return [
      {
        source: '/sitemap.xml',
        destination: '/api/sitemap.xml'
      },
      {
        source: '/found/:code',
        destination: '/lost_found/:code'
      }
    ];
  },
});

module.exports = nextConfig;
