import React from 'react';
import { useTranslation } from 'react-i18next';
import styles from './Entertainment.module.css';

const imgPath = (name) => `/src/assets/img/PlacesAround/Entertainment/${name}`;


const Entertainment = () => {
  const { t } = useTranslation();

  return (
    <div className={styles.entertainment}>
      {/* Первая строка - главное изображение и текст */}
      <div className={styles.topRow}>
        <div className={styles.mainImage}>
          <img
            src={imgPath('досуг 2.webp')}
            alt="Развлечения рядом с комплексом"
            className={styles.heroImage}
          />
        </div>

        <div className={styles.textBlock}>
          <p className={styles.description}>
            {t('places.entertainmentDetail')}
          </p>
          <div className={styles.timeTag}>
            <img src='/src/assets/img/PlacesAround/car.svg' />
            <span>10 мин</span>
          </div>
        </div>
      </div>

      {/* Вторая строка - дополнительные изображения */}
      <div className={styles.bottomRow}>
        <div className={styles.smallImage}>
          <img
            src={imgPath('досуг 3.webp')}
            alt="Развлекательный центр"
            className={styles.image}
          />
        </div>
        <div className={styles.largeImage}>
          <img
            src={imgPath('досуг 4.webp')}
            alt="Досуг и отдых"
            className={styles.image}
          />
        </div>
      </div>
    </div>
  );
};

export default Entertainment;
