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
          <img
            src={imgPath('nuts.webp')}
            alt="Рынок рядом с комплексом"
            className={styles.heroImage} />
        </div>

        <div className={styles.textBlock}>
          <p className={styles.description}>
            {t('places.marketsDetail')}
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
            src={imgPath('man.webp')}
            className={styles.image}
          />
        </div>
        <div className={styles.largeImage}>
          <img
            src={imgPath('fruits.webp')}
            className={styles.image}
          />
        </div>
      </div>
    </div>
  );
};

export default Markets;
