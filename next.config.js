/** @type {import('next').NextConfig} */
const nextTranslate = require('next-translate');

const nextConfig = nextTranslate({
  reactStrictMode: true,
  images: {
    domains: ['www.findthefinder.com'],
  },
});

module.exports = nextConfig;
