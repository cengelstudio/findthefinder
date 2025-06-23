import Head from 'next/head';
import styles from '../styles/App.module.css';
import Footer from '../components/Footer/Footer';
import Header from '../components/Header/Header';
import SEO from '../components/SEO/SEO';
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
                  onFocus={e => e.target.style.borderColor = 'var(--primary)'}
                  onBlur={e => e.target.style.borderColor = errors.code ? '#ef4444' : 'var(--border-light)'}
                />
                {errors.code && (
                  <div style={{ color: '#ef4444', fontSize: '0.875rem', marginTop: '4px' }}>
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
                  onFocus={e => e.target.style.borderColor = 'var(--primary)'}
                  onBlur={e => e.target.style.borderColor = errors.email ? '#ef4444' : 'var(--border-light)'}
                />
                {errors.email && (
                  <div style={{ color: '#ef4444', fontSize: '0.875rem', marginTop: '4px' }}>
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
                  placeholder={t('phonePlaceholder') || '+90 555 123 45 67'}
                  onFocus={e => e.target.style.borderColor = 'var(--primary)'}
                  onBlur={e => e.target.style.borderColor = 'var(--border-light)'}
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
                <textarea
                  value={address}
                  onChange={e => setAddress(e.target.value)}
                  rows={3}
                  style={{
                    width: '100%',
                    fontSize: '1rem',
                    padding: '16px 20px',
                    border: '2px solid var(--border-light)',
                    borderRadius: 'var(--radius-md)',
                    outline: 'none',
                    transition: 'var(--transition)',
                    backgroundColor: 'var(--bg-white)',
                    resize: 'vertical',
                    fontFamily: 'inherit'
                  }}
                  placeholder={t('addressPlaceholder') || 'Bulduğunuz konum (opsiyonel)'}
                  onFocus={e => e.target.style.borderColor = 'var(--primary)'}
                  onBlur={e => e.target.style.borderColor = 'var(--border-light)'}
                />
              </div>

              <button
                onClick={sendForm}
                disabled={isLoading}
                style={{
                  width: '100%',
                  fontSize: '1.125rem',
                  fontWeight: '600',
                  padding: '18px 32px',
                  background: isLoading ? 'var(--text-secondary)' : 'linear-gradient(45deg, var(--primary), var(--primary-light))',
                  color: 'white',
                  border: 'none',
                  borderRadius: 'var(--radius-md)',
                  cursor: isLoading ? 'not-allowed' : 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '12px',
                  transition: 'var(--transition)',
                  boxShadow: isLoading ? 'none' : 'var(--shadow-primary)'
                }}
                onMouseEnter={e => {
                  if (!isLoading) {
                    (e.target as HTMLButtonElement).style.transform = 'translateY(-2px)';
                    (e.target as HTMLButtonElement).style.boxShadow = 'var(--shadow-lg)';
                  }
                }}
                onMouseLeave={e => {
                  if (!isLoading) {
                    (e.target as HTMLButtonElement).style.transform = 'translateY(0)';
                    (e.target as HTMLButtonElement).style.boxShadow = 'var(--shadow-primary)';
                  }
                }}
              >
                {isLoading && (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" style={{ animation: 'spin 1s linear infinite' }}>
                    <path d="M12,4a8,8,0,1,0,8,8A8,8,0,0,0,12,4Zm0,14a6,6,0,1,1,6-6A6,6,0,0,1,12,18Z" opacity="0.25"/>
                    <path d="M12,4a8,8,0,0,1,8,8" opacity="0.75"/>
                  </svg>
                )}
                {isLoading ? (t('sending') || 'Gönderiliyor...') : t('send')}
              </button>

              <div style={{ textAlign: 'center', marginTop: '16px', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                * {t('requiredFields') || 'Zorunlu alanlar'}
              </div>
            </div>
          </div>
        </section>

        {/* Why Help Section */}
        <section className={styles.section}>
          <div className={styles.content}>
            <div className={styles.sectionTitle}>
              <h3>
                <b>{t('whyHelpTitle') || 'Neden Yardım Etmelisiniz?'}</b>
              </h3>
            </div>

            <div className={styles.sectionPerks}>
              <div className={styles.sectionPerk}>
                <div className={styles.sectionPerkIcon}>
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12,21.35L10.55,20.03C5.4,15.36 2,12.27 2,8.5 2,5.41 4.42,3 7.5,3C9.24,3 10.91,3.81 12,5.08C13.09,3.81 14.76,3 16.5,3C19.58,3 22,5.41 22,8.5C22,12.27 18.6,15.36 13.45,20.03L12,21.35Z"/>
                  </svg>
                </div>
                <div className={styles.sectionPerkTitle}>
                  {t('helpReason1') || 'İyilik Yapın'}
                </div>
                <div className={styles.sectionPerkDesc}>
                  {t('helpReason1Desc') || 'Birinin değerli eşyasını geri kazanmasına yardım ederek günlerini güzelleştirin.'}
                </div>
              </div>

              <div className={styles.sectionPerk}>
                <div className={styles.sectionPerkIcon}>
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M16,12A2,2 0 0,1 18,10A2,2 0 0,1 20,12A2,2 0 0,1 18,14A2,2 0 0,1 16,12M10,12A2,2 0 0,1 12,10A2,2 0 0,1 14,12A2,2 0 0,1 12,14A2,2 0 0,1 10,12M4,12A2,2 0 0,1 6,10A2,2 0 0,1 8,12A2,2 0 0,1 6,14A2,2 0 0,1 4,12Z"/>
                  </svg>
                </div>
                <div className={styles.sectionPerkTitle}>
                  {t('helpReason2') || 'Toplumsal Fayda'}
                </div>
                <div className={styles.sectionPerkDesc}>
                  {t('helpReason2Desc') || 'Toplumumuzda güven ve yardımlaşma kültürünün gelişmesine katkıda bulunun.'}
                </div>
              </div>

              <div className={styles.sectionPerk}>
                <div className={styles.sectionPerkIcon}>
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12,2L13.09,8.26L22,9L13.09,9.74L12,16L10.91,9.74L2,9L10.91,8.26L12,2Z"/>
                  </svg>
                </div>
                <div className={styles.sectionPerkTitle}>
                  {t('helpReason3') || 'Karma Döngüsü'}
                </div>
                <div className={styles.sectionPerkDesc}>
                  {t('helpReason3Desc') || 'Bugün yaptığınız iyilik, yarın size geri dönebilir. İyilik bulaşıcıdır!'}
                </div>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </main>

      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </>
  );
}
