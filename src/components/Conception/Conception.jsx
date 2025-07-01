import React from 'react';
import { useTranslation } from 'react-i18next';
import './Conception.css';
import mainImage from '../../assets/img/Conception/main-image.png';
import circleImage from '../../assets/img/Conception/rectangle-37.png';
import CallUsMini from '../CallUsMini/CallUsMini';
import icon1 from '../../assets/img/Conception/icon-1.svg';
import icon2 from '../../assets/img/Conception/icon-2.svg';
import icon3 from '../../assets/img/Conception/icon-3.svg';
import cloud from '../../assets/img/Conception/telegram-cloud-document.jpg';


const Conception = () => {
  const { t } = useTranslation();

  return (
    <section className="conception">
      <CallUsMini/>
      <div className="conception__arrows">
      <img src={icon1} alt="vector" className="conception__arrow" />
      <img src={icon2} alt="vector" className="conception__arrow" />
      <img src={icon3} alt="vector" className="conception__arrow" />
      </div>
      <div className="conception__content">
        <div className="conception__left">
        <h2 className="conception__section-title baseline-border">
          {t('conception.sectionTitle').split('\n').map((line, i) => (
            <React.Fragment key={i}>
              {line}
              <br />
            </React.Fragment>
          ))}
        </h2>
          <img src={circleImage} alt="yellow line" className="conception__yellow-line" />
        </div>
        <div className="conception__right">
          <h3 className="conception__dutch-title baseline-border">{t('conception.dutchTitle')}</h3>
          <p className="conception__dutch-desc baseline-border">{t('conception.dutchDescription')}</p>
        </div>
      </div>
      <div className="conception__image-wrap">
        <img src={mainImage} alt="Conception main" className="conception__main-img" />
      </div>
      <div className="conception__desc-bottom__overlay">  
        <div className="conception__desc-bottom">
          <p className="conception__main-desc baseline-border">
          {t('conception.mainDescription').split('\n').map((line, i) => (
            <React.Fragment key={i}>
              {line}
              <br />
            </React.Fragment>
          ))}</p>
          <div className="conception__yellow-line conception__yellow-line--bottom" />
        </div>
        <div className="conception__circle-img-wrap">
          <img src={cloud} alt="Интерьер" className="conception__circle-img" />
        </div>
      </div>

    </section>
  );
};

export default Conception;
