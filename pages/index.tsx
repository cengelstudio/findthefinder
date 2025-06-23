import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/App.module.css';
import Footer from '../components/Footer/Footer';
import Header from '../components/Header/Header';
import SEO from '../components/SEO/SEO';
import useTranslation from 'next-translate/useTranslation';
import { useState } from 'react';
import axios from 'axios';
import { GetStaticPropsContext } from 'next';

export default function Home() {
  const { t, lang } = useTranslation('home');

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');

  const sendForm = async () => {
    console.log('heyy');

    if (name.length !== 0 && message.length !== 0 && email.length !== 0) {
      const response = await axios.post('/api/send_message', {
        name,
        email,
        phone,
        message,
      });

      alert('Form başarıyla iletildi');
    } else {
      alert('Formda numara hariç boş alan bırakılamaz!');
    }
  };

  return (
    <>
      <SEO />

      <main>
        <Header />

        <section className={styles.section}>
          <div className={styles.content}>
            <div className={styles.sectionTitle}>
              <h3>
                <b>&quot;FIND THE FINDER&quot;</b>
              </h3>
              <span>{t('description1')}</span>
            </div>
            <div className={styles.sectionPerks}>
              <div className={styles.sectionPerk}>
                <div className={styles.sectionPerkIcon}>
                  <Image
                    src={'/images/custom/iconActive.png'}
                    alt={'Found'}
                    width={100}
                    height={100}
                  />
                </div>
                <div className={styles.sectionPerkTitle}>
                  <span>
                    <b>{t('buySticker.title')}</b>
                  </span>
                </div>
                <div className={styles.sectionPerkDesc}>
                  <span>{t('buySticker.description')}</span>
                </div>
              </div>
              <div className={styles.sectionPerk}>
                <div className={styles.sectionPerkIcon}>
                  <Image
                    src={'/images/custom/iconLogo.png'}
                    alt={'Found'}
                    width={100}
                    height={100}
                  />
                </div>
                <div className={styles.sectionPerkTitle}>
                  <span>
                    <b>{t('activeSticker.title')}</b>
                  </span>
                </div>
                <div className={styles.sectionPerkDesc}>
                  <span>{t('activeSticker.description')}</span>
                </div>
              </div>
              <div className={styles.sectionPerk}>
                <div className={styles.sectionPerkIcon}>
                  <Image
                    src={'/images/custom/iconFound.png'}
                    alt={'Found'}
                    width={100}
                    height={100}
                  />
                </div>
                <div className={styles.sectionPerkTitle}>
                  <span>
                    <b>{t('contactTheFinder.title')}</b>
                  </span>
                </div>
                <div className={styles.sectionPerkDesc}>
                  <span>{t('contactTheFinder.description')}</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.content}>
            <div className={styles.sectionBanner}>
              <Image src={'/images/bavuls.jpeg'} alt={'Suitcase'} width={800} height={600} />
            </div>
            {/* <br />
                        <div className={styles.sectionTitle}>
                            <h3><b>{t("bavulYazi")}</b></h3>
                        </div> */}
          </div>
        </section>

        <section className={`${styles.sectionPhone} ${styles.sectionPhoneLast}`}>
          <div className={styles.content}>
            <div className={styles.sectionPhoneContent}>
              <div className={styles.sectionPhoneTitle}>
                <h3>{t('yaziEtiketElektronik')}</h3>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.content}>
            <div className={styles.sectionBanner}>
              <Image src={'/images/custom/a56i49d.jpeg'} alt={'Example image'} width={800} height={600} />
            </div>
          </div>
        </section>

        <section className={`${styles.sectionPhone} ${styles.sectionPhoneLast}`}>
          <div className={styles.content}>
            <div className={styles.sectionPhoneContent}>
              <div className={styles.sectionPhoneTitle}>
                <h3>
                  {t('aniNot1')}
                  <br />
                  <br />
                  {t('aniNot2')}
                </h3>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.content}>
            <div className={styles.sectionBanner}>
              <Image src={'/images/odul.jpeg'} alt={'Award'} width={800} height={600} />
            </div>
            <br />
            <div className={styles.sectionTitle}>
              <h3>
                <b>{t('award.title')}</b>
              </h3>
            </div>
            <div className={styles.longText}>
              <span>{t('award.description')}</span>
            </div>
          </div>
        </section>

        {/* <section className={styles.sectionPhone}>
                    <div className={styles.content}>
                        <div className={styles.sectionPhoneContent}>
                            <div className={styles.sectionPhoneIcon}>
                                <Image
                                    src={"/images/custom/iphoneMsg.png"}
                                    alt={"Message"}
                                    width={481}
                                    height={604}
                                />
                            </div>
                            <div className={styles.sectionPhoneTitle}>
                                <h3>{t("youCanFindSafe.title")}</h3>
                                <span>{t("youCanFindSafe.description")}</span>
                            </div>
                        </div>
                    </div>
                </section> */}

        <section className={styles.section}>
          <div className={styles.content}>
            <div className={styles.sectionBanner}>
              <Image src={'/images/custom/aafbhaj.jpeg'} alt={'Example image'} width={800} height={600} />
            </div>
          </div>
        </section>

        <section className={styles.section} id={'faq'}>
          <div className={styles.content}>
            <div className={styles.sectionTitle}>
              <h3>
                <b>{t('faq.title')}</b>
              </h3>
            </div>
            <div className={styles.faqContainer}>
              {Array(10)
                .fill('')
                .map((item: { q: string; a: string }, index: number) => {
                  if (index + 1 === 2 || index + 1 === 3) return null;

                  return (
                    <div className={styles.faqContent} key={index}>
                      <h5>
                        <b>{t(`faq.q${index + 1}.q`)}</b>
                      </h5>
                      <h6>{t(`faq.q${index + 1}.a`)}</h6>
                    </div>
                  );
                })}
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.content}>
            <div className={styles.sectionBanner}>
              <Image src={'/images/custom/sclhryi.jpeg'} alt={'Example image'} width={800} height={600} />
            </div>
          </div>
        </section>

        <section className={styles.section} id={'contact'}>
          <div className={styles.content}>
            <div className={styles.sectionTitle}>
              <h3>
                <b>{t('contact.title')}</b>
              </h3>
            </div>
            <div className={styles.formContainer}>
              <div className={styles.formInputContainer}>
                <input
                  type="text"
                  className={styles.formInput}
                  placeholder={t('contact.name')}
                  value={name}
                  onChange={(e: any) => setName(e.target.value)}
                />
              </div>

              <div className={styles.formInputContainer} data-half={true}>
                <input
                  type="text"
                  className={styles.formInput}
                  placeholder={t('contact.email')}
                  value={email}
                  onChange={(e: any) => setEmail(e.target.value)}
                />
                <input
                  type="text"
                  className={styles.formInput}
                  placeholder={t('contact.phone')}
                  value={phone}
                  onChange={(e: any) => setPhone(e.target.value)}
                />
              </div>

              <div className={styles.formInputContainer}>
                <textarea
                  className={styles.formInput}
                  placeholder={t('contact.message')}
                  value={message}
                  onChange={(e: any) => setMessage(e.target.value)}
                />
              </div>

              <div className={styles.formInputContainer}>
                <input
                  type="submit"
                  className={styles.formSubmit}
                  value={t('contact.send')}
                  onClick={sendForm}
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
