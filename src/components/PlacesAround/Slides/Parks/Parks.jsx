import React from 'react';
import { useTranslation } from 'react-i18next';
import styles from './Parks.module.css';

const imgPath = (name) => `/src/assets/img/PlacesAround/Parks/${name}`;


const Parks = () => {
  const { t } = useTranslation();

  return (
    <div className={styles.parks}>
      {/* Первая строка - главное изображение и текст */}
      <div className={styles.topRow}>
        <div className={styles.mainImage}>
          <img
            src={imgPath('pink.png')}
            alt="Парк рядом с комплексом"
            className={styles.heroImage}
          />
        </div>

        <div className={styles.textBlock}>
          <p className={styles.description}>
            {t('places.parksDetail')}
          </p>
          {/* <div className={styles.timeTag}>
            <img src='/src/assets/img/PlacesAround/car.svg' />
            <span>10 мин</span>
          </div> */}
        </div>
      </div>

      {/* Вторая строка - дополнительные изображения */}
      <div className={styles.bottomRow}>
        <div className={styles.smallImage}>
          <img
            src={imgPath('Парки 1.webp')}
            alt="Зеленая зона парка"
            className={styles.image}
          />
        </div>
        <div className={styles.largeImage}>
          <img
            src={imgPath('парки 2.webp')}
            alt="Парковая аллея"
            className={styles.image}
          />
        </div>
      </div>
    </div>
  );
};

export default Parks;
