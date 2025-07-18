import React from 'react';
import { useTranslation } from 'react-i18next';
import styles from './Hero.module.css';
import heroBg from '../../assets/img/Hero/background.webp';
import logo from '../../assets/img/Hero/logo.svg';
import CachedImage from '../CachedImage/CachedImage';
import CachedBackgroundImage from '../CachedImage/CachedBackgroundImage';

const Hero = () => {
  const { t } = useTranslation();
  return (
    <CachedBackgroundImage src={heroBg} className={styles["hero"]}>
      <div className={styles["hero__overlay"]}>
        <div className={styles["hero__content"]}>
          <div className={styles["hero__logo"]}>
            <CachedImage src={logo} alt="Logo" className={styles["hero__logo-img"]} />
          </div>
          <h1 className={styles["hero__title"]}>{t('hero.title')}</h1>
          <p className={styles["hero__subtitle"]}>{t('hero.subtitle')}</p>
        </div>
      </div>
    </CachedBackgroundImage>
  );
};

export default Hero;