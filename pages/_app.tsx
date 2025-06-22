import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { appWithTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import type { GetStaticPropsContext } from 'next';

// nextapp find the finder

function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export const getStaticProps = async ({ locale }: GetStaticPropsContext) => ({
  props: { ...(await serverSideTranslations(locale!, ['tr', 'home'])) },
});

export default appWithTranslation(App);
