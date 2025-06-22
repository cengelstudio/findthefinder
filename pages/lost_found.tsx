import Head from 'next/head';
import styles from '../styles/App.module.css';
import Footer from '../components/Footer/Footer';
import Header from '../components/Header/Header';
import useTranslation from 'next-translate/useTranslation';
import { useEffect, useState } from 'react';
import * as EmailValidator from 'email-validator';
import axios from 'axios';
import { useRouter } from 'next/router';

export default function Found() {
  const router = useRouter();
  const { t, lang } = useTranslation('found');

  const [code, setCode] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [address, setAddress] = useState<string>('');

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async position => {
          const { latitude, longitude } = position.coords;
          try {
            const response = await fetch(
              `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
            );
            const data = await response.json();
            if (data && data.display_name) {
              setAddress(data.display_name);
            }
          } catch (error) {
            console.error('Geolocation reverse error:', error);
          }
        },
        error => {
          console.error('Geolocation permission denied or error:', error);
        }
      );
    }
  }, []);

  const sendForm = async () => {
    if (EmailValidator.validate(email)) {
      if (code.length !== 0) {
        try {
          const response = await axios.post('/api/found', {
            code,
            email,
            phone,
            address,
            lang,
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
        {/* ...diğer meta etiketler... */}
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
                  onChange={e => setCode(e.target.value)}
                  type="text"
                  className={styles.formInput}
                  placeholder={t('code')}
                />
              </div>

              <div className={styles.formInputContainer}>
                <input
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  type="text"
                  className={styles.formInput}
                  placeholder={t('email')}
                />
              </div>

              <div className={styles.formInputContainer}>
                <input
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  type="text"
                  className={styles.formInput}
                  placeholder={t('phone')}
                />
              </div>

              <div className={styles.formInputContainer}>
                <input
                  value={address}
                  onChange={e => setAddress(e.target.value)}
                  type="text"
                  className={styles.formInput}
                  placeholder={'Adres'}
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
