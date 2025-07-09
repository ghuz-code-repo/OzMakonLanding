import React from 'react';
import { useTranslation } from 'react-i18next';
import styles from './CallbackMini.module.css';
import icon1 from '../../assets/img/Conception/icon-1.svg';
import icon2 from '../../assets/img/Conception/icon-2.svg';
import icon3 from '../../assets/img/Conception/icon-3.svg';

const CallbackMini = () => {
  const { t } = useTranslation();
  return (
    <div className={styles["CallbackMini__overlay"]}>
      <div className={styles["CallbackMini__content"]}>
        <div className={styles["CallbackMini__left"]}>
          <h3 className={styles["CallbackMini__title"]}>{t('conception.helpTitle')}</h3>
        </div>
        <div className={styles["CallbackMini__right"]}>
          <p className={styles["CallbackMini__subtitle"]}>{t('conception.helpSubtitle')}</p>
          <form className={styles["CallbackMini__form"]}>
            <input
              type="text"
              className={styles["CallbackMini__input"]+' '+styles["urbanist"]}
              placeholder={t('conception.form.namePlaceholder')}
              name="name"
              autoComplete="off"
            />
            <input
              type="tel"
              className={styles["CallbackMini__input"]+' '+styles["urbanist"]}
              placeholder={t('conception.form.phonePlaceholder')}
              name="phone"
              autoComplete="off"
            />
            <button className={styles["CallbackMini__button"]} type="submit">
              {t('conception.form.button')}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CallbackMini;
