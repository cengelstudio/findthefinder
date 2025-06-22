import Head from 'next/head';
import styles from '../styles/App.module.css';
import Footer from '../components/Footer/Footer';
import Header from '../components/Header/Header';
import useTranslation from 'next-translate/useTranslation';
import { useState } from 'react';
import * as EmailValidator from 'email-validator';
import axios from 'axios';
import { useRouter } from 'next/router';
import { setCookie } from 'cookies-next';

export default function ForgotPassword() {
  const router = useRouter();
  const { t, lang } = useTranslation('forgotPassword');

  const [email, setMail] = useState<string>('');

  const sendForm = async () => {
    if (EmailValidator.validate(email)) {
      try {
        const response = await axios.post('/api/users/forgot_password', {
          email,
          lang,
        });

        if (response.data.status) {
          alert(t('passwordChanged'));
        } else {
          alert(t('notFound'));
        }
      } catch (e) {
        alert(t('anError'));
      }
    } else {
      alert(t('invalidEmail'));
    }
  };

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
        <Header title={t('title')} />

        <section className={styles.section}>
          <div className={styles.content}>
            <div className={styles.sectionTitle}>
              <h3>
                <b>{t('title')}</b>
              </h3>
            </div>
            <div className={styles.formContainer}>
              <div className={styles.formInputContainer}>
                <input
                  value={email}
                  onChange={(e: any) => setMail(e.target.value)}
                  type="text"
                  className={styles.formInput}
                  placeholder={t('email')}
                />
              </div>

              <div className={styles.formInputContainer}>
                <input
                  onClick={sendForm}
                  type="submit"
                  className={styles.formSubmit}
                  value={t('reset')}
                />
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
}
