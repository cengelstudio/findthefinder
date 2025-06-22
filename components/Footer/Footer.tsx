import styles1 from '../../styles/App.module.css';
import styles from '../../styles/Footer.module.css';
import Image from 'next/image';
import useTranslation from 'next-translate/useTranslation';

export default function Footer() {
  const { t, lang } = useTranslation('footer');

  return (
    <>
      {/*
        <section className={styles1.section}>
            <div className={styles1.content}>
                <div style={{
                    color: "#221d8b",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    gridGap: "40px",
                    flexWrap: "wrap"
                }}>
                    <a href={"https://instagram.com/bebekresortassos"}>
                        <img src={"/br-t.png"} alt={""} style={{
                            height: 100,
                            // marginTop: 30,
                        }} />
                    </a>
                </div>
            </div>
        </section>
        */}
      <footer className={styles.footer}>
        <div className={styles.footerLogo}>
          <Image
            src={'/images/custom/footerLogo.png'}
            alt={'Logo'}
            width="174"
            height="55"
          />
        </div>
        <div className={styles.footerText}>
          <span>
            &copy; 2025 FindTheFinder, {t('allRightsReserved')} |{' '}
            <a
              href={'/' + lang + '_legalNotice.pdf'}
              target="_blank"
              rel="noreferrer"
            >
              {t('legacy')}
            </a>{' '}
            |{' '}
            <a href={'/aydinlatma.pdf'} target="_blank" rel="noreferrer">
              K.V.K.K. Aydınlatma Metni
            </a>
          </span>
        </div>
      </footer>
    </>
  );
}
