import Head from 'next/head';
import SEO from '../components/SEO/SEO';
import Image from 'next/image';
import { GetStaticPropsContext } from 'next';
import styles from '../styles/App.module.css';
import Footer from '../components/Footer/Footer';
import Header from '../components/Header/Header';
import useTranslation from 'next-translate/useTranslation';

export default function Warning() {
  const { t, lang } = useTranslation('warning');

  return (
    <>
      <SEO />

      <main>
        <Header title={t('title')} />

        <section className={styles.section}>
          <div className={styles.content}>
            <div className={styles.sectionTitle}>
              <h3>
                <b>{t('title')}</b>
              </h3>
            </div>
            <div className={styles.longText}>
              <span>{t('description1')}</span>
              <br />
              <br />
              <span>{t('description2')}</span>
              <br />
              <br />
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
}
