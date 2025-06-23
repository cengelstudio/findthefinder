import Head from 'next/head';
import styles from '../../styles/App.module.css';
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';
import useTranslation from 'next-translate/useTranslation';
import { useEffect, useState } from 'react';
import * as EmailValidator from 'email-validator';
import axios from 'axios';
import { useRouter } from 'next/router';
import { getCookie, removeCookies, setCookie } from 'cookies-next';

function Content() {
  const router = useRouter();
  const { key } = router.query as any;

  const { t, lang } = useTranslation('found');

  const [code, setCode] = useState<string>(key);
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');

  const sendForm = async () => {
    if (EmailValidator.validate(email)) {
      if (code.length !== 0) {
        try {
          const response = await axios.post('/api/found', {
            code,
            email,
            phone,
          });

          if (response.data.status) {
            alert(t('thanks'));
            setTimeout(() => router.push('/'), 500);
          } else {
            alert(t('anError'));
          }
        } catch (e) {
          alert(t('anError'));
        }
      } else {
        alert(t('missingLabel'));
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
        <Header title={t('uppercaseTitle')} />

        <section className={styles.section}>
          <div className={styles.content}>
            <div className={styles.sectionTitle}>
              <h3>
                <b>{t('title')}</b>
              </h3>
            </div>
            <div className={styles.longText}>
              <span>{t('description')}</span>
            </div>
            <br />
            <br />
            <div className={styles.formContainer}>
              <div className={styles.formInputContainer}>
                <input
                  value={code}
                  onChange={(e: any) => setCode(e.target.value)}
                  type="text"
                  className={styles.formInput}
                  placeholder={t('code')}
                />
              </div>

              <div className={styles.formInputContainer}>
                <input
                  value={email}
                  onChange={(e: any) => setEmail(e.target.value)}
                  type="text"
                  className={styles.formInput}
                  placeholder={t('email')}
                />
              </div>

              <div className={styles.formInputContainer}>
                <input
                  value={phone}
                  onChange={(e: any) => setPhone(e.target.value)}
                  type="text"
                  className={styles.formInput}
                  placeholder={t('phone')}
                />
              </div>

              <div onClick={sendForm} className={styles.formInputContainer}>
                <input
                  type="submit"
                  className={styles.formSubmit}
                  value={t('send')}
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

export default function Found() {
  const router = useRouter();
  const { key } = router.query as any;

  let token = getCookie('ftftok');

  const [showContent, setContent] = useState<boolean>(false);

  useEffect(() => {
    try {
      (async () => {
        const response = await axios.post('/api/label_control', {
          get: key,
        });

        if (!response.data?.have) {
          if (token) {
            router.push('/update?code=' + key);
          } else {
            router.push('/signUp?code=' + key);
          }

          // router.push("/signUp?code=" + key)
        } else {
          setContent(true);
        }
      })();
    } catch (e) {
      console.log(e);
    }
  }, [key, router, token]);

  return (
    <>
      {!showContent && 'Loading...'}
      {showContent && <Content />}
    </>
  );
}
