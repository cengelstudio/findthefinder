import Head from 'next/head';
import Image from 'next/image';
import { GetStaticPropsContext } from 'next';
import styles from '@/styles/App.module.css';
import Footer from '@/components/Footer/Footer';
import Header from '@/components/Header/Header';
import useTranslation from 'next-translate/useTranslation';

export default function Why() {
  const { t, lang } = useTranslation('why');

  return (
    <>
      <Head>
        <title>Find The Finder</title>

        <meta name="title" content="Find The Finder" />
        <meta property="og:title" content="Find The Finder" />
        <meta property="og:site_name" content="Find The Finder" />

        <meta
          name="description"
          content="Find The Finder; Kaza, tehlike, doğal afet ve kişisel dalgınlık sonucu oluşan mal veya can kaybına karşı en hızlı şekilde ulaşmayı sağlayan bir araçtır."
        />
        <meta
          name="og:description"
          content="Find The Finder; Kaza, tehlike, doğal afet ve kişisel dalgınlık sonucu oluşan mal veya can kaybına karşı en hızlı şekilde ulaşmayı sağlayan bir araçtır."
        />
        <meta
          name="twitter:description"
          content="Find The Finder; Kaza, tehlike, doğal afet ve kişisel dalgınlık sonucu oluşan mal veya can kaybına karşı en hızlı şekilde ulaşmayı sağlayan bir araçtır."
        />

        <meta name="author" content="Find The Finder" />
        <link rel="icon" href="./images/custom/logo.png" />

        <meta property="og:type" content="website" />
        <meta name="keywords" content="find,the,finder,lost,belongings" />
        <meta name="robots" content="index, follow" />
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <main>
        <Header title={t('title').replace('i', 'İ')} />

        <section className={styles.section}>
          <div className={styles.content}>
            <div className={styles.sectionTitle}>
              <h3>
                <b>{t('howToUse.title')}</b>
              </h3>
            </div>
            <div className={styles.longText}>
              <span>
                {t('howToUse.description1')}
                <br />
                <br />
                {t('howToUse.description2')}
                <br />
                <br />
                {t('howToUse.description3')}
                <br />
                <br />
                {t('howToUse.description4')}
                <br />
                <br />
                {t('howToUse.description5')}
              </span>
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
}
