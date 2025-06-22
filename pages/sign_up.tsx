import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/App.module.css';
import Footer from '../components/Footer/Footer';
import Header from '../components/Header/Header';
import useTranslation from 'next-translate/useTranslation';
import { useState, useEffect } from 'react';
import * as EmailValidator from 'email-validator';
import axios from 'axios';
import { useRouter } from 'next/router';
import { GetStaticPropsContext } from 'next';

export default function Register() {
  const router = useRouter();
  const { t, lang } = useTranslation('register');

  const [code, setCode] = useState<string>('');
  const [codeDescription, setCodeDescription] = useState<string>('');
  const [email, setMail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [password2, setPassword2] = useState<string>('');
  const [secondMail, setSecondMail] = useState<string>('');
  const [acceptTerms, setAcceptTerms] = useState<boolean>(false);

  useEffect(() => {
    const key = router.asPath.replace('/signUp?code=', '');

    if (key.length !== 0 && !key.includes('/signUp')) {
      setCode(key);
    }
  }, []);

  const sendForm = async () => {
    if (acceptTerms) {
      if (code.length >= 3) {
        if (EmailValidator.validate(email)) {
          if (phone.length >= 3) {
            if (password === password2) {
              try {
                const response = await axios.post('/api/users/sign_up', {
                  code,
                  email,
                  phone,
                  password,
                  rePassword: password2,
                  secondMail,
                  codeDescription,
                  lang,
                });
                console.log(response);

                switch (response.data.status) {
                  case 'added':
                    alert(t('successRegister'));
                    router.push('/login');
                    break;
                  case 'email':
                    return alert(t('alreadyRegisterEmail'));
                  case 'code':
                    return alert(t('codeError'));
                  case 'password':
                    return alert(t('passwordMatch'));
                  case 'system':
                  default:
                    return alert(t('systemError'));
                }
              } catch (e) {
                alert(t('tryAgainLater'));
              }
            } else {
              alert(t('passwordMatch'));
            }
          } else {
            alert(t('phoneError'));
          }
        } else {
          alert(t('invalidEmail'));
        }
      } else {
        alert(t('invalidCode'));
      }
    } else {
      alert(t('needTerms'));
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
                  value={code}
                  onChange={(e: any) => setCode(e.target.value)}
                  type="text"
                  className={styles.formInput}
                  placeholder={t('code')}
                />
                <input
                  value={codeDescription}
                  onChange={(e: any) => setCodeDescription(e.target.value)}
                  type="text"
                  className={styles.formInput}
                  placeholder={t('codeDescription')}
                />
              </div>

              <div className={styles.formInputContainer} data-half={true}>
                <input
                  value={email}
                  onChange={(e: any) => setMail(e.target.value)}
                  type="text"
                  className={styles.formInput}
                  placeholder={t('email')}
                />
                <input
                  value={phone}
                  onChange={(e: any) => setPhone(e.target.value)}
                  type="text"
                  className={styles.formInput}
                  placeholder={t('phone')}
                />
              </div>

              <div className={styles.formInputContainer} data-half={true}>
                <input
                  value={password}
                  onChange={(e: any) => setPassword(e.target.value)}
                  type="password"
                  className={styles.formInput}
                  placeholder={t('password')}
                />
                <input
                  value={password2}
                  onChange={(e: any) => setPassword2(e.target.value)}
                  type="password"
                  className={styles.formInput}
                  placeholder={t('rePassword')}
                />
              </div>

              <div className={styles.formInputContainer}>
                <input
                  value={secondMail}
                  onChange={(e: any) => setSecondMail(e.target.value)}
                  type="text"
                  className={styles.formInput}
                  placeholder={t('secondMail')}
                />
              </div>

              <div className={styles.formInputContainer}>
                <input
                  onClick={sendForm}
                  type="submit"
                  className={styles.formSubmit}
                  value={t('send')}
                />
              </div>

              <div className={styles.formAccept}>
                <input
                  type="checkbox"
                  onClick={() => setAcceptTerms(!acceptTerms)}
                  defaultChecked={acceptTerms}
                />
                <a
                  href={'/terms_' + lang + '.txt'}
                  target="_blank"
                  rel="noreferrer"
                >
                  {t('acceptTerms')}
                </a>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
}
