import React from 'react';
import { useTranslation } from 'react-i18next';
import styles from './ShoppingCenters.module.css';

const imgPath = (name) => `/src/assets/img/PlacesAround/ShoppingCenters/${name}`;

const ShoppingCenters = () => {
  const { t } = useTranslation();

  return (
    <div className={styles.shoppingCenters}>
      {/* Первая строка - главное изображение и текст */}
      <div className={styles.topRow}>
        <div className={styles.mainImage}>
          <img
            src={imgPath('ТРЦ 4.webp')}
            alt="Торговый центр Alfraganus Mall"
            className={styles.heroImage}
          />
        </div>

        <div className={styles.textBlock}>
          <p className={styles.description}>
            {t('places.shoppingCenters')}
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
            src={imgPath('ТРЦ 2.webp')}
            alt="Интерьер торгового центра"
            className={styles.image}
          />
        </div>
        <div className={styles.largeImage}>
          <img
            src={imgPath('ТРЦ 3.webp')}
            alt="Торговый центр снаружи"
            className={styles.image}
          />
        </div>
      </div>
    </div>
  );
};

export default ShoppingCenters;
