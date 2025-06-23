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
