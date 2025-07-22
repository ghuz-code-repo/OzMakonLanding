import React from 'react';
import styles from './Location.module.css';
import { useTranslation } from 'react-i18next';
const imgPath = (name) => `/src/assets/img/Location/${name}`;
const Location = () => {
  const { t } = useTranslation();

  const bullets =[
    {
      icon: imgPath('ladder.svg'),
      timeToPlace: t('location.card.TCM.timeToPlace'),
      place: t('location.card.TCM.place')
    },
    {
      icon: imgPath('metro.svg'),
      timeToPlace: t('location.card.METRO.timeToPlace'),
      place: t('location.card.METRO.place')
    }]
  return (
    <section className={styles["location-section"]} id='location'>
      {/* Location (map) content will go here */}
      <h2 className={styles.title}>{t('location.title')}</h2>
      <span className={styles.mainText}>
        {t('location.mainText').split('\n').map((line, i) => (
          <React.Fragment key={i}>
            {line}
            <br />
          </React.Fragment>
        ))}
      </span>
      <div className={styles.mapBlock}>
        <div className={styles.mapImage}>
          <div className={styles.card}>
            {bullets.map((bullet, i) => (
              <React.Fragment key={i}>
                <div className={styles.cardRow}>
                  <img src={bullet.icon}/>
                  <div className={styles.cardRowBulletTextBlock}>
                    <span className={styles.cardRowBulletTime}>
                      {t(`${bullet.timeToPlace}`)}
                    </span>
                    <span className={styles.cardRowBulletPlace}>
                      {t(`${bullet.place}`)}
                    </span>
                  </div>
                </div>
              </React.Fragment>
            ))}
          </div>
          {/* <div className={styles.marker}>
            <img src={`${imgPath('marker.svg')}`} />
          </div> */}
        </div>
      </div>
    </section>
  );
};

export default Location;
