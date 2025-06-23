import { NextApiRequest, NextApiResponse } from 'next';

const BASE_URL = 'https://www.findthefinder.com';

// All available locales
const locales = ['tr', 'en', 'de', 'fr', 'es', 'it', 'ru', 'gr'];

// All available pages (without dynamic routes for now)
const pages = [
  '',
  '/lost_found',
  '/sign_in',
  '/sign_up',
  '/account',
  '/faq',
  '/forgot_password',
  '/warning'
];

function generateSiteMap() {
  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">`;

  // Generate URLs for each page in each locale
  pages.forEach((page) => {
    locales.forEach((locale, index) => {
      const url = locale === 'tr' ? `${BASE_URL}${page}` : `${BASE_URL}/${locale}${page}`;

      sitemap += `
  <url>
    <loc>${url}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${page === '' ? '1.0' : '0.8'}</priority>`;

      // Add hreflang alternates for this page
      locales.forEach((altLocale) => {
        const altUrl = altLocale === 'tr' ? `${BASE_URL}${page}` : `${BASE_URL}/${altLocale}${page}`;
        sitemap += `
    <xhtml:link rel="alternate" hreflang="${altLocale}" href="${altUrl}" />`;
      });

      sitemap += `
  </url>`;
    });
  });

  sitemap += `
</urlset>`;

  return sitemap;
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  // Set cache headers
  res.setHeader('Cache-Control', 'public, s-maxage=86400, stale-while-revalidate');
  res.setHeader('Content-Type', 'text/xml');

  const sitemap = generateSiteMap();
  res.status(200).send(sitemap);
}
