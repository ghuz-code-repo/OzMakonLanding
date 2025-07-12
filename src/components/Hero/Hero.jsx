import React from 'react';
import { useTranslation } from 'react-i18next';
import styles from './Hero.module.css';
import heroBg from '../../assets/img/Hero/background.webp';
import logo from '../../assets/img/Hero/logo.svg';

const Hero = () => {
  const { t } = useTranslation();
  return (
    <section className={styles["hero"]} style={{ backgroundImage: `url(${heroBg})` }}>
      <div className={styles["hero__overlay"]}>
        <div className={styles["hero__content"]}>
          <div className={styles["hero__logo"]}>
            <img src={logo} alt="Logo" className={styles["hero__logo-img"]} />
          </div>
          <h1 className={styles["hero__title"]}>{t('hero.title')}</h1>
          <p className={styles["hero__subtitle"]}>{t('hero.subtitle')}</p>
        </div>
      </div>
    </section>
  );
};

export default Hero;