import Head from 'next/head';
import SEO from '../components/SEO/SEO';
import styles from '../styles/App.module.css';
import Footer from '../components/Footer/Footer';
import Header from '../components/Header/Header';
import useTranslation from 'next-translate/useTranslation';
import { useState } from 'react';
import * as EmailValidator from 'email-validator';
import axios from 'axios';
import { useRouter } from 'next/router';
import { setCookie } from 'cookies-next';
import Link from 'next/link';

export default function Login() {
  const router = useRouter();
  const { t } = useTranslation('login');

  const [email, setMail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const sendForm = async () => {
    if (EmailValidator.validate(email)) {
      try {
        const response = await axios.post('/api/users/login', {
          email,
          password,
        });

        if (response.data.auth) {
          setCookie('ftftok', response.data.token);
          setTimeout(() => router.push('/account'), 500);
        } else {
          alert(t('updateError'));
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
      <SEO />

      <main>
        <Header title={t('uppercaseTitle')} />

        <section className={styles.section}>
          <div className={styles.content}>
            <div className={styles.sectionTitle}>
              <h3>
                <b>{t('uppercaseTitle')}</b>
              </h3>
            </div>
            <div className={styles.formContainer}>
              <div className={styles.formInputContainer}>
                <input
                  value={email}
                  onChange={(e: any) => setMail(e.target.value)}
                  type="text"
                  className={styles.formInput}
                  placeholder={t('codeOrMail')}
                />
              </div>

              <div className={styles.formInputContainer}>
                <input
                  value={password}
                  onChange={(e: any) => setPassword(e.target.value)}
                  type="password"
                  className={styles.formInput}
                  placeholder={t('password')}
                />
              </div>

              <div className={styles.formInputContainer}>
                <input
                  onClick={sendForm}
                  type="submit"
                  className={styles.formSubmit}
                  value={t('title')}
                />
              </div>

              <div className={styles.formAccept}>
                <Link href={'/forgot_password'}>{t('forgotPassword')}</Link>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
}
