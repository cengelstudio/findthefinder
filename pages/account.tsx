import Head from 'next/head';
import styles from '../styles/App.module.css';
import Footer from '../components/Footer/Footer';
import Header from '../components/Header/Header';
import useTranslation from 'next-translate/useTranslation';
import { useEffect, useState, ChangeEvent } from 'react';
import * as EmailValidator from 'email-validator';
import axios from 'axios';
import { useRouter } from 'next/router';
import { getCookie, removeCookies, setCookie } from 'cookies-next';
import type { Code } from '../types/components';
import type { SessionData } from '../types/api';

export default function Register() {
  const router = useRouter();

  const token = getCookie('ftftok');

  const { t, lang } = useTranslation('account');

  const [email, setEmail] = useState<string>('');
  const [secondMail, setSecondMail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [newCode, setNewCode] = useState<string>('');
  const [newCodeDesc, setNewCodeDesc] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [password2, setPassword2] = useState<string>('');
  const [codes, setCodes] = useState<Code[]>([]);
  const [show, setShow] = useState<boolean>(false);

  const sendForm = async () => {
    if (EmailValidator.validate(email)) {
      try {
        const response = await axios.post('/api/users/update', {
          get: token,
          email,
          newCode,
          newCodeDesc,
          secondMail,
          phone,
          password,
          rePassword: password2,
          lang,
        });

        if (response.data.status === 'updated') {
          // alert(t("updated"))
          setCookie('ftftok', response.data.token);
          setTimeout(() => router.reload(), 500);
        } else {
          alert(response.data.message || t('updateError'));
        }
      } catch (e) {
        alert(t('anError'));
      }
    } else {
      alert(t('invalidEmail'));
    }
  };

  const deleteAccount = async () => {
    if (confirm(t('deleteConfirm'))) {
      const response = await axios.post('/api/users/delete', {
        get: token,
        lang,
      });

      if (response.data.status === 'deleted') {
        alert(t('accountDeleted'));
        removeCookies('ftftok');
        setTimeout(() => router.push('/'), 500);
      } else {
        alert(t('anError'));
      }
    }
  };

  const logout = () => {
    removeCookies('ftftok');
    setTimeout(() => router.push('/login'), 500);
  };

  useEffect(() => {
    const key = router.asPath.replace('/update?code=', '');

    if (key.length !== 0 && !key.includes('/update')) {
      setNewCode(key);
      alert(
        key +
          ' kodu başarıyla içeriye aktarıldı, formdan gerekli yerleri doldurarak kodu güvenceye alabilirsiniz.'
      );
    }

    (async () => {
      if (!token) {
        alert(t('authError'));
        router.push('/login');
        return;
      }

      const response = await axios.post('/api/users/session', {
        get: token,
        lang,
      });

      if (response.data.auth) {
        const data = response.data.data as SessionData;
        setEmail(data.email || '');
        setSecondMail(data.secondMail || '');
        setPhone(data.number || '');
        setCodes(data.codes);
        setShow(true);
      } else {
        alert(t('authError'));
        router.push('/login');
      }
    })();
  }, [token, router, t, lang]);

  if (!show) return <span>{t('loading')}</span>;

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
              <div className={styles.formInputContainer} data-half={true}>
                <input
                  value={email}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setEmail(e.target.value)
                  }
                  type="text"
                  className={styles.formInput}
                  placeholder={t('email')}
                />
                <input
                  value={secondMail}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setSecondMail(e.target.value)
                  }
                  type="text"
                  className={styles.formInput}
                  placeholder={t('backupMail')}
                />
              </div>

              <div className={styles.formInputContainer} data-half={true}>
                <input
                  value={password}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setPassword(e.target.value)
                  }
                  type="password"
                  className={styles.formInput}
                  placeholder={t('definePassword')}
                />
                <input
                  value={password2}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setPassword2(e.target.value)
                  }
                  type="password"
                  className={styles.formInput}
                  placeholder={t('confirmPassword')}
                />
              </div>

              <div className={styles.formInputContainer}>
                <input
                  value={phone}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setPhone(e.target.value)
                  }
                  type="text"
                  className={styles.formInput}
                  placeholder={t('phone')}
                />
              </div>

              <div className={styles.formInputContainer} data-half={true}>
                <input
                  value={newCode}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setNewCode(e.target.value)
                  }
                  type="text"
                  className={styles.formInput}
                  placeholder={t('addNewCode')}
                />
                <input
                  value={newCodeDesc}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setNewCodeDesc(e.target.value)
                  }
                  type="text"
                  className={styles.formInput}
                  placeholder={t('codeDesc')}
                />
              </div>

              <div>
                <span>{t('activeCodes')}</span>
                <table>
                  <tbody>
                    <tr>
                      <th>{t('code')}</th>
                      <th>{t('description')}</th>
                    </tr>
                    {codes.map((code, index) => {
                      return (
                        <tr key={index}>
                          <td>{code.content}</td>
                          <td>{code.used_on}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              <div className={styles.formInputContainer}>
                <input
                  onClick={sendForm}
                  type="submit"
                  className={styles.formSubmit}
                  value={t('save')}
                />
              </div>

              <div className={styles.formAccept} onClick={deleteAccount}>
                <a>{t('deleteAccount')}</a>
              </div>

              <div className={styles.formAccept} onClick={logout}>
                <a>{t('logout')}</a>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
}
