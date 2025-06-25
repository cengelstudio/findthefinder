/** @type {import('next').NextConfig} */
const nextTranslate = require('next-translate');

const isGithubActions = process.env.GITHUB_ACTIONS || false;

let assetPrefix = '';
let basePath = '';

if (isGithubActions) {
  // GitHub repository name - change this to your repository name
  const repo = process.env.GITHUB_REPOSITORY?.replace(/.*?\//, '') || '';
  if (repo) {
    assetPrefix = `/${repo}/`;
    basePath = `/${repo}`;
  }
}

const nextConfig = nextTranslate({
  reactStrictMode: true,
  images: {
    domains: ['www.findthefinder.com'],
    unoptimized: true, // Required for static export
  },
  ...(assetPrefix && { assetPrefix }),
  ...(basePath && { basePath }),
  output: 'export', // Enable static export
  trailingSlash: true, // Required for GitHub Pages
  skipTrailingSlashRedirect: true,
  async rewrites() {
    return [
      {
        source: '/sitemap.xml',
        destination: '/api/sitemap.xml'
      },
      {
        source: '/found/:code',
        destination: '/lost_found/:code'
      },
      {
        source: '/found',
        destination: '/lost_found'
      }
    ];
  },
});

module.exports = nextConfig;
