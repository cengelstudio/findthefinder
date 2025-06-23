import Document, { Html, Head, Main, NextScript, DocumentContext, DocumentInitialProps } from 'next/document';

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext): Promise<DocumentInitialProps> {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    const { locale = 'tr' } = this.props.__NEXT_DATA__;

    return (
      <Html lang={locale}>
        <Head>
          {/* Basic charset and viewport are handled by Next.js automatically */}
          <meta charSet="utf-8" />

          {/* DNS prefetch for better performance */}
          <link rel="dns-prefetch" href="//fonts.googleapis.com" />
          <link rel="dns-prefetch" href="//www.google-analytics.com" />

          {/* Preload critical resources */}
          <link rel="preload" href="/fonts/Sedan-Regular.ttf" as="font" type="font/ttf" crossOrigin="" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
