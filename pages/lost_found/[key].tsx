import Head from 'next/head';
import styles from '../../styles/App.module.css';
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';
import SEO from '../../components/SEO/SEO';
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
  const [address, setAddress] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<{[key: string]: string}>({});

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

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};

    if (!code.trim()) {
      newErrors.code = t('missingLabel');
    }

    if (!email.trim()) {
      newErrors.email = t('emailRequired') || 'E-posta adresi gerekli';
    } else if (!EmailValidator.validate(email)) {
      newErrors.email = t('invalidEmail');
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const sendForm = async () => {
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
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
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <SEO />

      <main>
        <Header title={t('title')} subtitle={t('description')} />

        {/* Steps Section */}
        <section className={styles.section}>
          <div className={styles.content}>
            <div className={styles.sectionTitle}>
              <h3>
                <b>{t('howItWorks') || 'Nasıl Çalışır?'}</b>
              </h3>
            </div>

            <div className={styles.sectionPerks}>
              <div className={styles.sectionPerk}>
                <div className={styles.sectionPerkIcon}>
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M9.5 3A6.5 6.5 0 0 1 16 9.5c0 1.61-.59 3.09-1.56 4.23l.27.27h.79l5 5-1.5 1.5-5-5v-.79l-.27-.27A6.516 6.516 0 0 1 9.5 16 6.5 6.5 0 0 1 3 9.5 6.5 6.5 0 0 1 9.5 3m0 2C7 5 5 7 5 9.5S7 14 9.5 14 14 12 14 9.5 12 5 9.5 5Z"/>
                  </svg>
                </div>
                <div className={styles.sectionPerkTitle}>
                  {t('step1Title') || '1. Eşyayı Bulun'}
                </div>
                <div className={styles.sectionPerkDesc}>
                  {t('step1Desc') || 'Kayıp eşyayı bulduğunuzda, üzerindeki QR kodu veya etiketi kontrol edin.'}
                </div>
              </div>

              <div className={styles.sectionPerk}>
                <div className={styles.sectionPerkIcon}>
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M3,6H21V8H3V6M3,11H21V13H3V11M3,16H21V18H3V16Z"/>
                  </svg>
                </div>
                <div className={styles.sectionPerkTitle}>
                  {t('step2Title') || '2. Kodu Girin'}
                </div>
                <div className={styles.sectionPerkDesc}>
                  {t('step2Desc') || 'Eşya üzerindeki kodu aşağıdaki forma girin ve iletişim bilgilerinizi ekleyin.'}
                </div>
              </div>

              <div className={styles.sectionPerk}>
                <div className={styles.sectionPerkIcon}>
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20,8L12,13L4,8V6L12,11L20,6M20,4H4C2.89,4 2,4.89 2,6V18A2,2 0 0,0 4,20H20A2,2 0 0,0 22,18V6C22,4.89 21.1,4 20,4Z"/>
                  </svg>
                </div>
                <div className={styles.sectionPerkTitle}>
                  {t('step3Title') || '3. Bildirim Gönder'}
                </div>
                <div className={styles.sectionPerkDesc}>
                  {t('step3Desc') || 'Eşyanın sahibine otomatik olarak bildirim gönderilir ve iletişim kurulur.'}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Form Section */}
        <section className={styles.section}>
          <div className={styles.content}>
            <div className={styles.sectionTitle}>
              <h3>
                <b>{t('formTitle') || 'Bildirim Formu'}</b>
              </h3>
              <span>{t('formDesc') || 'Lütfen formu eksiksiz doldurun ki eşyanın sahibiyle iletişim kurabilelim.'}</span>
            </div>

            <div style={{
              maxWidth: '600px',
              margin: '0 auto',
              background: 'var(--bg-white)',
              padding: 'var(--space-3xl)',
              borderRadius: 'var(--radius-lg)',
              boxShadow: 'var(--shadow-lg)',
              border: '1px solid var(--border-light)'
            }}>
              <div style={{ marginBottom: 'var(--space-2xl)' }}>
                <label style={{
                  display: 'block',
                  marginBottom: '8px',
                  fontWeight: '600',
                  color: 'var(--text-primary)',
                  fontSize: '1rem'
                }}>
                  {t('code')} *
                </label>
                <input
                  value={code}
                  onChange={e => {
                    setCode(e.target.value);
                    if (errors.code) setErrors({...errors, code: ''});
                  }}
                  type="text"
                  style={{
                    width: '100%',
                    fontSize: '1rem',
                    padding: '16px 20px',
                    border: `2px solid ${errors.code ? '#ef4444' : 'var(--border-light)'}`,
                    borderRadius: 'var(--radius-md)',
                    outline: 'none',
                    transition: 'var(--transition)',
                    backgroundColor: 'var(--bg-white)'
                  }}
                  placeholder={t('codePlaceholder') || 'Örn: FTF123456'}
                />
                {errors.code && (
                  <div style={{
                    color: '#ef4444',
                    fontSize: '0.875rem',
                    marginTop: '4px'
                  }}>
                    {errors.code}
                  </div>
                )}
              </div>

              <div style={{ marginBottom: 'var(--space-2xl)' }}>
                <label style={{
                  display: 'block',
                  marginBottom: '8px',
                  fontWeight: '600',
                  color: 'var(--text-primary)',
                  fontSize: '1rem'
                }}>
                  {t('email')} *
                </label>
                <input
                  value={email}
                  onChange={e => {
                    setEmail(e.target.value);
                    if (errors.email) setErrors({...errors, email: ''});
                  }}
                  type="email"
                  style={{
                    width: '100%',
                    fontSize: '1rem',
                    padding: '16px 20px',
                    border: `2px solid ${errors.email ? '#ef4444' : 'var(--border-light)'}`,
                    borderRadius: 'var(--radius-md)',
                    outline: 'none',
                    transition: 'var(--transition)',
                    backgroundColor: 'var(--bg-white)'
                  }}
                  placeholder={t('emailPlaceholder') || 'ornek@email.com'}
                />
                {errors.email && (
                  <div style={{
                    color: '#ef4444',
                    fontSize: '0.875rem',
                    marginTop: '4px'
                  }}>
                    {errors.email}
                  </div>
                )}
              </div>

              <div style={{ marginBottom: 'var(--space-2xl)' }}>
                <label style={{
                  display: 'block',
                  marginBottom: '8px',
                  fontWeight: '600',
                  color: 'var(--text-primary)',
                  fontSize: '1rem'
                }}>
                  {t('phone')}
                </label>
                <input
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  type="tel"
                  style={{
                    width: '100%',
                    fontSize: '1rem',
                    padding: '16px 20px',
                    border: '2px solid var(--border-light)',
                    borderRadius: 'var(--radius-md)',
                    outline: 'none',
                    transition: 'var(--transition)',
                    backgroundColor: 'var(--bg-white)'
                  }}
                  placeholder={t('phonePlaceholder') || '+90 555 123 4567'}
                />
              </div>

              <div style={{ marginBottom: 'var(--space-2xl)' }}>
                <label style={{
                  display: 'block',
                  marginBottom: '8px',
                  fontWeight: '600',
                  color: 'var(--text-primary)',
                  fontSize: '1rem'
                }}>
                  {t('address') || 'Adres'}
                </label>
                <input
                  value={address}
                  onChange={e => setAddress(e.target.value)}
                  type="text"
                  style={{
                    width: '100%',
                    fontSize: '1rem',
                    padding: '16px 20px',
                    border: '2px solid var(--border-light)',
                    borderRadius: 'var(--radius-md)',
                    outline: 'none',
                    transition: 'var(--transition)',
                    backgroundColor: 'var(--bg-white)'
                  }}
                  placeholder={t('addressPlaceholder') || 'Bulduğunuz yerin adresi'}
                />
              </div>

              <button
                onClick={sendForm}
                disabled={isLoading}
                style={{
                  width: '100%',
                  fontSize: '1rem',
                  fontWeight: '600',
                  padding: '16px 20px',
                  backgroundColor: 'var(--primary)',
                  color: 'white',
                  border: 'none',
                  borderRadius: 'var(--radius-md)',
                  cursor: isLoading ? 'not-allowed' : 'pointer',
                  transition: 'var(--transition)',
                  opacity: isLoading ? 0.7 : 1
                }}
              >
                {isLoading ? (t('sending') || 'Gönderiliyor...') : (t('send') || 'Gönder')}
              </button>
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
            router.push('/sign_up?code=' + key);
          }
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
