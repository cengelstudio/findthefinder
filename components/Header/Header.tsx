import styles from '../../styles/Header.module.css';
import mainStyles from '../../styles/App.module.css';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState, useRef } from 'react';
import useTranslation from 'next-translate/useTranslation';
import type { HeaderProps } from '../../types/components';

export default function Header({ title }: HeaderProps) {
  const [showNav, setNav] = useState<boolean>(true);
  const [showLang, setShowLang] = useState<boolean>(false);
  const langRef = useRef<HTMLDivElement>(null);

  const { t, lang } = useTranslation('header');
  const whyLang = useTranslation('why');

  // Dışarı tıklanınca dil menüsünü kapat
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (langRef.current && !langRef.current.contains(event.target as Node)) {
        setShowLang(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const languages = [
    { code: 'tr', name: 'Türkçe', flag: '🇹🇷' },
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'ru', name: 'Русский', flag: '🇷🇺' },
    { code: 'es', name: 'Español', flag: '🇪🇸' },
    { code: 'it', name: 'Italiano', flag: '🇮🇹' },
    { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
    { code: 'gr', name: 'Ελληνικά', flag: '🇬🇷' },
  ];

  const currentLang = languages.find(l => l.code === lang) || languages[0];

  return (
    <header className={styles.bigHeader}>
      {/* Masaüstü ve mobil için dil seçici */}
      <div className={styles.languageDropdown} ref={langRef}>
        <button
          className={styles.languageButton}
          onClick={() => setShowLang(!showLang)}
          aria-label="Dili değiştir"
        >
          <span className={styles.flag}>{currentLang.flag}</span>
          <span className={styles.langName}>{currentLang.name}</span>
          <svg
            className={styles.arrow}
            width="12"
            height="8"
            viewBox="0 0 12 8"
          >
            <path d="M1 1l5 5 5-5" stroke="#fff" strokeWidth="2" fill="none" />
          </svg>
        </button>
        {showLang && (
          <div className={styles.languageMenu}>
            {languages.map(l => (
              <a
                key={l.code}
                href={`/${l.code}`}
                className={
                  styles.languageOption +
                  (l.code === lang ? ' ' + styles.active : '')
                }
                onClick={() => setShowLang(false)}
              >
                <span className={styles.flag}>{l.flag}</span> {l.name}
              </a>
            ))}
          </div>
        )}
      </div>

      <div className={mainStyles.content}>
        <div className={styles.headerContent}>
          <Link href={'./'}>
            <Image
              src={'/PHOTO-2024-02-09-14-32-37-removebg-preview.png'}
              alt={'Logo'}
              width="100"
              height="100"
            />
          </Link>

          <div className={styles.navButton} onClick={() => setNav(!showNav)}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <g data-name="Layer 2">
                <g data-name="menu">
                  <rect
                    width="18"
                    height="2"
                    x="3"
                    y="11"
                    rx="0.95"
                    ry="0.95"
                  ></rect>
                  <rect
                    width="18"
                    height="2"
                    x="3"
                    y="16"
                    rx="0.95"
                    ry="0.95"
                  ></rect>
                  <rect
                    width="18"
                    height="2"
                    x="3"
                    y="6"
                    rx="0.95"
                    ry="0.95"
                  ></rect>
                </g>
              </g>
            </svg>
          </div>

          <nav className={styles.navigation} data-hide={showNav}>
            <ul>
              <li>
                <Link href={'/#faq'}>{t('nav.faq')}</Link>
              </li>
            </ul>
            <ul>
              <li>
                <Link href={'/#contact'}>{t('nav.contact')}</Link>
              </li>
            </ul>
            <ul>
              <li>
                <Link href={'/sign_in'}>{t('nav.login')}</Link>
              </li>
            </ul>
            <ul>
              <li>
                <Link href={'/sign_up'}>{t('nav.register')}</Link>
              </li>
            </ul>
            <ul>
              <li>
                <Link href={'/warning'}>{t('nav.warning')}</Link>
              </li>
            </ul>
            <ul>
              <li
                style={{
                  background: '#ff4646',
                }}
              >
                <Link
                  style={{
                    color: '#fff',
                  }}
                  href={'/lost_found'}
                >
                  {t('nav.iFound')}
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        {title === undefined && (
          <div className={styles.welcomeScreen}>
            <div className={styles.welcomeScreenMotto}>
              <h1>{t('welcomeScreen.title')}</h1>
              {/* <h2>{t("welcomeScreen.subtitle")}</h2> */}
            </div>
            <div className={styles.welcomeScreenImage}>
              <Image
                src={
                  '/header-img-' +
                  (lang !== 'ru' &&
                  lang !== 'es' &&
                  lang !== 'it' &&
                  lang !== 'de' &&
                  lang !== 'gr'
                    ? lang
                    : 'en') +
                  '.png'
                }
                alt={'Kutu'}
                width="297"
                height="526"
              />
            </div>
          </div>
        )}

        {title !== undefined && (
          <div className={styles.bigTitle}>
            <h1>{title}</h1>
          </div>
        )}
      </div>
    </header>
  );
}
