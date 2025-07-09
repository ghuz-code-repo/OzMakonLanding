import React from 'react';
import { useTranslation } from 'react-i18next';
import styles from './Schools.module.css';

const imgPath = (name) => `/src/assets/img/PlacesAround/Schools/${name}`;


const Schools = () => {
  const { t } = useTranslation();

  return (
    <div className={styles.schools}>
      {/* Первая строка - главное изображение и текст */}
      <div className={styles.topRow}>
        <div className={styles.mainImage}>
          <img
            src={imgPath('школы 3.webp')}
            alt="Школа рядом с комплексом"
            className={styles.heroImage}
          />
        </div>

        <div className={styles.textBlock}>
          <p className={styles.description}>
            {t('places.schoolsDetail')}
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
            src={imgPath('школы 1.webp')}
            alt="Школьный класс"
            className={styles.image}
          />
        </div>
        <div className={styles.largeImage}>
          <img
            src={imgPath('школы 4.webp')}
            alt="Школьный двор"
            className={styles.image}
          />
        </div>
      </div>
    </div>
  );
};

export default Schools;
