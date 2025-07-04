import styles from '../../styles/Header.module.css';
import mainStyles from '../../styles/App.module.css';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState, useRef } from 'react';
import useTranslation from 'next-translate/useTranslation';
import type { HeaderProps } from '../../types/components';
import { useRouter } from 'next/router';

export default function Header({ title, subtitle }: HeaderProps) {
  const router = useRouter();
  const [showNav, setNav] = useState<boolean>(true);
  const [showLang, setShowLang] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const langRef = useRef<HTMLDivElement>(null);

  const { t, lang } = useTranslation('header');
  const whyLang = useTranslation('why');

  const getCurrentLocale = () => router.locale || 'tr';

  const languages = [
    { code: 'tr', name: 'Türkçe', flag: '🇹🇷' },
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'es', name: 'Español', flag: '🇪🇸' },
    { code: 'it', name: 'Italiano', flag: '🇮🇹' },
    { code: 'ru', name: 'Русский', flag: '🇷🇺' },
    { code: 'gr', name: 'Ελληνικά', flag: '🇬🇷' }
  ];

  const currentLanguage = languages.find(lang => lang.code === getCurrentLocale());

  // Ekran boyutunu kontrol et ve mobil durumu ayarla
  useEffect(() => {
    const checkScreenSize = () => {
      const mobile = window.innerWidth <= 850;
      setIsMobile(mobile);
      // Masaüstünde navigation her zaman açık, mobilde kapalı
      setNav(!mobile);
    };

    checkScreenSize();

    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Dışarı tıklanınca ve ESC tuşuna basınca dil menüsünü kapat
  // Mobilde navigation için de aynı işlevsellik
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (langRef.current && !langRef.current.contains(event.target as Node)) {
        setShowLang(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        if (showLang) {
        setShowLang(false);
        }
        if (isMobile && showNav) {
          setNav(false);
        }
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [showLang, showNav, isMobile]);

  const changeLanguage = (locale: string) => {
    setShowLang(false);
    router.push(router.asPath, router.asPath, { locale });
  };

  const toggleLanguageMenu = () => {
    console.log('Toggle language menu:', !showLang);
    setShowLang(!showLang);
  };

  const toggleNavigation = () => {
    // Sadece mobilde navigation toggle işlemi yap
    if (isMobile) {
      console.log('Toggle navigation:', !showNav);
      setNav(!showNav);
    }
  };

  const closeNavigation = () => {
    // Mobilde menu item'a tıklandığında navigation'ı kapat
    if (isMobile) {
      setNav(false);
    }
  };

  const getMenuItems = () => {
    if (title === undefined) {
      return [
        { href: '/#faq', label: t('faq'), active: false, isSpecial: false },
        { href: '/#contact', label: t('contact'), active: false, isSpecial: false },
        { href: '/sign_in', label: t('signIn'), active: false, isSpecial: false },
        { href: '/sign_up', label: t('signUp'), active: false, isSpecial: false },
        { href: '/warning', label: t('warning'), active: false, isSpecial: false },
        { href: '/lost_found', label: t('nav.iFound'), active: false, isSpecial: true }
      ];
    } else {
      return [
        { href: '/#faq', label: t('faq'), active: false, isSpecial: false },
        { href: '/#contact', label: t('contact'), active: false, isSpecial: false },
        { href: '/sign_in', label: t('signIn'), active: false, isSpecial: false },
        { href: '/sign_up', label: t('signUp'), active: false, isSpecial: false },
        { href: '/warning', label: t('warning'), active: false, isSpecial: false },
        { href: '/lost_found', label: t('nav.iFound'), active: false, isSpecial: true }
      ];
    }
  };

  return (
    <header className={styles.bigHeader}>
      {/* Masaüstü ve mobil için dil seçici */}
      <div className={styles.languageDropdown} ref={langRef}>
        <button
          className={styles.languageButton}
          onClick={toggleLanguageMenu}
          onTouchStart={(e) => {
            e.preventDefault();
            toggleLanguageMenu();
          }}
          aria-expanded={showLang}
          aria-haspopup="true"
        >
          <span className={styles.flag}>{currentLanguage?.flag}</span>
          <span className={styles.langName}>{currentLanguage?.name}</span>
          <span className={styles.arrow}>▼</span>
        </button>
        {showLang && (
          <div className={styles.languageMenu}>
            {languages.map((language) => (
              <button
                key={language.code}
                onClick={() => changeLanguage(language.code)}
                className={`${styles.languageOption} ${getCurrentLocale() === language.code ? styles.active : ''}`}
                type="button"
              >
                <span className={styles.flag}>{language.flag}</span>
                <span>{language.name}</span>
              </button>
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

          <div
            className={styles.navButton}
            onClick={toggleNavigation}
            onTouchStart={(e) => {
              e.preventDefault();
              toggleNavigation();
            }}
          >
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

          <nav className={styles.navigation} data-hide={showNav ? 'false' : 'true'}>
            <ul>
              {getMenuItems().map((item) => (
                <li
                  key={item.href}
                  className={item.isSpecial ? styles.specialNavItem : ''}
                  style={item.active ? { background: 'var(--primary)' } : {}}
                >
                  <Link href={item.href} onClick={closeNavigation}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {title === undefined && (
          <div className={styles.welcomeScreen}>
            <div className={styles.welcomeScreenMotto}>
              <h1>
                {t('welcomeScreen.title').toUpperCase()}
              </h1>
              <h2>{t('welcomeScreen.subtitle')}</h2>
              <div style={{ display: 'flex', gap: 'var(--space-lg)', marginTop: 'var(--space-2xl)' }}>
                <Link href="/lost_found" className="btn-primary">
                  {t('nav.iFound')}
                </Link>
                <Link href="/#faq" className="btn-outline">
                  {t('learnMore')}
                </Link>
              </div>
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
            {subtitle && <h2>{subtitle}</h2>}
          </div>
        )}
      </div>
    </header>
  );
}
