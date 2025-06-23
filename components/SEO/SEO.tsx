import Head from 'next/head';
import { useRouter } from 'next/router';
import { getSEOData, generateCanonicalUrl, generateAlternateUrls } from '../../lib/seo';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  ogImage?: string;
  noIndex?: boolean;
  noFollow?: boolean;
}

export default function SEO({
  title,
  description,
  keywords,
  ogImage = '/images/custom/logo.png',
  noIndex = false,
  noFollow = false
}: SEOProps) {
  const router = useRouter();
  const { locale = 'tr', pathname } = router;

  // Get SEO data from config if not provided via props
  const seoData = getSEOData(locale, pathname);

  const finalTitle = title || seoData?.title || 'Find The Finder';
  const finalDescription = description || seoData?.description || 'Find The Finder - Kayıp eşyalarınızı bulun';
  const finalKeywords = keywords || seoData?.keywords || 'kayıp eşya, find the finder, qr kod';

  const canonicalUrl = generateCanonicalUrl(pathname, locale);
  const alternateUrls = generateAlternateUrls(pathname);

  // Robots meta content
  let robotsContent = '';
  if (noIndex && noFollow) {
    robotsContent = 'noindex, nofollow';
  } else if (noIndex) {
    robotsContent = 'noindex, follow';
  } else if (noFollow) {
    robotsContent = 'index, nofollow';
  } else {
    robotsContent = 'index, follow';
  }

  return (
    <Head>
      {/* Basic Meta Tags */}
      <title>{finalTitle}</title>
      <meta name="description" content={finalDescription} />
      <meta name="keywords" content={finalKeywords} />
      <meta name="author" content="Find The Finder" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />

      {/* Robots */}
      <meta name="robots" content={robotsContent} />
      <meta httpEquiv="X-Robots-Tag" content={robotsContent} />

      {/* Language and Locale */}
      <meta httpEquiv="content-language" content={locale} />
      <meta property="og:locale" content={locale} />

      {/* Canonical URL */}
      <link rel="canonical" href={canonicalUrl} />

      {/* Alternate URLs for different languages */}
      {alternateUrls.map(({ locale: altLocale, url }) => (
        <link
          key={altLocale}
          rel="alternate"
          hrefLang={altLocale}
          href={url}
        />
      ))}

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={seoData?.ogTitle || finalTitle} />
      <meta property="og:description" content={seoData?.ogDescription || finalDescription} />
      <meta property="og:image" content={`https://www.findthefinder.com${ogImage}`} />
      <meta property="og:site_name" content="Find The Finder" />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={canonicalUrl} />
      <meta property="twitter:title" content={seoData?.ogTitle || finalTitle} />
      <meta property="twitter:description" content={seoData?.ogDescription || finalDescription} />
      <meta property="twitter:image" content={`https://www.findthefinder.com${ogImage}`} />

      {/* Additional Meta Tags */}
      <meta name="theme-color" content="#ffffff" />
      <meta name="msapplication-TileColor" content="#ffffff" />

      {/* Sitemap Reference */}
      <link rel="sitemap" type="application/xml" href="/sitemap.xml" />

      {/* Favicon */}
      <link rel="icon" type="image/png" sizes="16x16" href="/images/favicon-16x16.png" />
      <link rel="apple-touch-icon" href="/images/favicon-16x16.png" />

      {/* DNS Prefetch for Performance */}
      <link rel="dns-prefetch" href="//www.findthefinder.com" />
      <link rel="preconnect" href="https://www.findthefinder.com" />
    </Head>
  );
}
