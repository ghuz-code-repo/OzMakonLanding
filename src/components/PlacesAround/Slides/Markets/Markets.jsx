import React from 'react';
import { useTranslation } from 'react-i18next';
import styles from './Markets.module.css';

const Markets = () => {
  const { t } = useTranslation();

  return (
    <div className={styles.markets}>
      {/* Первая строка - главное изображение и текст */}
      <div className={styles.topRow}>
        <div className={styles.mainImage}>
          <img 
            src="/src/assets/webp/рынки/рынки 1.webp" 
            alt="Рынок рядом с комплексом"
            className={styles.heroImage}
          />
          <div className={styles.timeTag}>
            <span className={styles.timeIcon}>🕐</span>
            7 мин
          </div>
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
          <img 
            src="/src/assets/webp/рынки/рынок 1.webp" 
            alt="Торговые ряды"
            className={styles.image}
          />
        </div>
        <div className={styles.largeImage}>
          <img 
            src="/src/assets/webp/рынки/chorsu3-0-0-0-0-1600945367.webp" 
            alt="Рынок Чорсу"
            className={styles.image}
          />
        </div>
      </div>
    </div>
  );
};

export default Markets;
