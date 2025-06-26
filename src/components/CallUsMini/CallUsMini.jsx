import React from 'react';
import { useTranslation } from 'react-i18next';
import './CallUsMini.css';
import icon1 from '../../assets/img/Conception/icon-1.svg';
import icon2 from '../../assets/img/Conception/icon-2.svg';
import icon3 from '../../assets/img/Conception/icon-3.svg';

const CallUsMini = () => {
  const { t } = useTranslation();
  return (
    <div className="callusmini__overlay">
      <div className="callusmini__content">
        <div className="callusmini__left">
          <h3 className="callusmini__title">{t('conception.helpTitle')}</h3>
        </div>
        <div className="callusmini__right">
          <p className="callusmini__subtitle">{t('conception.helpSubtitle')}</p>
          <form className="callusmini__form">
            <input
              type="text"
              className="callusmini__input urbanist"
              placeholder={t('conception.form.namePlaceholder')}
              name="name"
              autoComplete="off"
            />
            <input
              type="tel"
              className="callusmini__input urbanist"
              placeholder={t('conception.form.phonePlaceholder')}
              name="phone"
              autoComplete="off"
            />
            <button className="callusmini__button" type="submit">
              {t('conception.form.button')}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CallUsMini;
