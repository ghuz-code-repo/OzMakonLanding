import React from 'react';
import { useTranslation } from 'react-i18next';
import './Hero.css';
import heroBg from '../../assets/img/Hero/background.jpg';
import logo from '../../assets/img/Hero/logo.svg';
const height = 1200-(1080-window.innerHeight)

const Hero = () => {
  const { t } = useTranslation();
  return (
    <section className="hero" style={{ backgroundImage: `url(${heroBg})`, minHeight: height}}>
      <div className="hero__overlay">
        <div className="hero__content">
          <div className="hero__logo">
            <img src={logo} alt="Logo" className="hero__logo-img" />
          </div>
          <h1 className="hero__title">{t('hero.title')}</h1>
          <p className="hero__subtitle">{t('hero.subtitle')}</p>
        </div>
      </div>
    </section>
  );
};

export default Hero;
