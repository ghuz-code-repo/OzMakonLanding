import React from 'react';
import { useTranslation } from 'react-i18next';
import styles from './ShoppingCenters.module.css';

const ShoppingCenters = () => {
  const { t } = useTranslation();

  return (
    <div className={styles.shoppingCenters}>
      {/* Первая строка - главное изображение и текст */}
      <div className={styles.topRow}>
        <div className={styles.mainImage}>
          <img 
            src="/src/assets/webp/ЛЭНДИНГ/ТРЦ 1.webp" 
            alt="Торговый центр Alfraganus Mall"
            className={styles.heroImage}
          />
          <div className={styles.timeTag}>
            <span className={styles.timeIcon}>🕐</span>
            10 мин
          </div>
        </div>
        
        <div className={styles.textBlock}>
          <h2 className={styles.title}>{t('places.shoppingCenters.title')}</h2>
          <p className={styles.description}>
            {t('places.shoppingCenters.description')}
          </p>
        </div>
      </div>

      {/* Вторая строка - дополнительные изображения */}
      <div className={styles.bottomRow}>
        <div className={styles.smallImage}>
          <img 
            src="/src/assets/webp/ЛЭНДИНГ/ТРЦ 2.webp" 
            alt="Интерьер торгового центра"
            className={styles.image}
          />
        </div>
        <div className={styles.largeImage}>
          <img 
            src="/src/assets/webp/ЛЭНДИНГ/ТРЦ 3.webp" 
            alt="Торговый центр снаружи"
            className={styles.image}
          />
        </div>
      </div>
    </div>
  );
};

export default ShoppingCenters;
