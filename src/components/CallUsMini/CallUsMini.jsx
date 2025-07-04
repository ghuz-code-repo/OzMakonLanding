import React from 'react';
import { useTranslation } from 'react-i18next';
import styles from './CallUsMini.module.css';
import icon1 from '../../assets/img/Conception/icon-1.svg';
import icon2 from '../../assets/img/Conception/icon-2.svg';
import icon3 from '../../assets/img/Conception/icon-3.svg';

const CallUsMini = () => {
  const { t } = useTranslation();
  return (
    <div className={styles["callusmini__overlay"]}>
      <div className={styles["callusmini__content"]}>
        <div className={styles["callusmini__left"]}>
          <h3 className={styles["callusmini__title"]}>{t('conception.helpTitle')}</h3>
        </div>
        <div className={styles["callusmini__right"]}>
          <p className={styles["callusmini__subtitle"]}>{t('conception.helpSubtitle')}</p>
          <form className={styles["callusmini__form"]}>
            <input
              type="text"
              className={styles["callusmini__input"]+' '+styles["urbanist"]}
              placeholder={t('conception.form.namePlaceholder')}
              name="name"
              autoComplete="off"
            />
            <input
              type="tel"
              className={styles["callusmini__input"]+' '+styles["urbanist"]}
              placeholder={t('conception.form.phonePlaceholder')}
              name="phone"
              autoComplete="off"
            />
            <button className={styles["callusmini__button"]} type="submit">
              {t('conception.form.button')}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CallUsMini;
