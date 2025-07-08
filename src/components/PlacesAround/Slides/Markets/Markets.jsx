import React from 'react';
import { useTranslation } from 'react-i18next';
import styles from './Markets.module.css';

const imgPath = (name) => `/src/assets/img/PlacesAround/Markets/${name}`;


const Markets = () => {
  const { t } = useTranslation();

  return (
    <div className={styles.markets}>
      {/* Первая строка - главное изображение и текст */}
      <div className={styles.topRow}>
        <div className={styles.mainImage}>
          <div style={{backgroundImage: `url(${imgPath('nuts.webp')})`}} 
            className={styles.heroImage}
          />
        </div>
        
        <div className={styles.textBlock}>
          <h2 className={styles.title}>{t('places.marketsDetail.title')}</h2>
          <p className={styles.description}>
            {t('places.marketsDetail.description')}
          </p>
        </div>
      </div>

      {/* Вторая строка - дополнительные изображения */}
      <div className={styles.bottomRow}>
        <div className={styles.smallImage}>
          <div style={{backgroundImage: `url(${imgPath('man.webp')})`}} 
            className={styles.leftImage}
          />
        </div>
        <div className={styles.largeImage}>
          <div style={{backgroundImage: `url(${imgPath('fruits.webp')})`}} 
            className={styles.rightImage}
          />
        </div>
      </div>
    </div>
  );
};

export default Markets;
