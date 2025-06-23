import Head from 'next/head';
import SEO from '../components/SEO/SEO';
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
      <SEO />

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
