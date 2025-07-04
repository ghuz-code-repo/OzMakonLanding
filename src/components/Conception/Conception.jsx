import React from 'react';
import { useTranslation } from 'react-i18next';
import styles from './Conception.module.css';
import mainImage from '../../assets/img/Conception/main-image.webp';
import circleImage from '../../assets/img/Conception/rectangle-37.png';
import CallUsMini from '../CallUsMini/CallUsMini';
import icon1 from '../../assets/img/Conception/icon-1.svg';
import icon2 from '../../assets/img/Conception/icon-2.svg';
import icon3 from '../../assets/img/Conception/icon-3.svg';
import cloud from '../../assets/img/Conception/telegram-cloud-document.webp';


const Conception = () => {
  const { t } = useTranslation();

  return (
    <section className={styles["conception"]}>
      <CallUsMini/>
      <div className={styles["conception__arrows"]}>
      <img src={icon1} alt="vector" className={styles["conception__arrow"]} />
      <img src={icon2} alt="vector" className={styles["conception__arrow"]} />
      <img src={icon3} alt="vector" className={styles["conception__arrow"]} />
      </div>
      <div className={styles["conception__content"]}>
        <div className={styles["conception__left"]}>
        <h2 className={styles["conception__section-title"]+' '+styles["baseline-border"]}>
          {t('conception.sectionTitle').split('\n').map((line, i) => (
            <React.Fragment key={i}>
              {line}
              <br />
            </React.Fragment>
          ))}
        </h2>
          <img src={circleImage} alt="yellow line" className={styles["conception__yellow-line"]} />
        </div>
        <div className={styles["conception__right"]}>
          <h3 className={styles["conception__dutch-title"]+' '+styles["baseline-border"]}>{t('conception.dutchTitle')}</h3>
          <p className={styles["conception__dutch-desc"]+' '+styles["baseline-border"]}>{t('conception.dutchDescription')}</p>
        </div>
      </div>
      <div className={styles["conception__image-wrap"]}>
        <img src={mainImage} alt="Conception main" className={styles["conception__main-img"]} />
      </div>
      <div className={styles["conception__desc-bottom__overlay"]}>  
        <div className={styles["conception__desc-bottom"]}>
          <p className={styles["conception__main-desc"]+' '+styles["baseline-border"]}>
          {t('conception.mainDescription').split('\n').map((line, i) => (
            <React.Fragment key={i}>
              {line}
              <br />
            </React.Fragment>
          ))}</p>
          <div className={styles["conception__yellow-line"] +' '+styles["conception__yellow-line--bottom"]} />
        </div>
        <div className={styles["conception__circle-img-wrap"]}>
          <img src={cloud} alt="Интерьер" className={styles["conception__circle-img"]}/>
        </div>
      </div>

    </section>
  );
};

export default Conception;
