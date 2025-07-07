import React from 'react';
import { useTranslation } from 'react-i18next';
import styles from './Parks.module.css';

const Parks = () => {
  const { t } = useTranslation();

  return (
    <div className={styles.parks}>
      {/* Первая строка - главное изображение и текст */}
      <div className={styles.topRow}>
        <div className={styles.mainImage}>
          <img 
            src="/src/assets/webp/ЛЭНДИНГ/Парки 1.webp" 
            alt="Парк рядом с комплексом"
            className={styles.heroImage}
          />
          <div className={styles.timeTag}>
            <span className={styles.timeIcon}>🕐</span>
            5 мин
          </div>
        </div>
        
        <div className={styles.textBlock}>
          <h2 className={styles.title}>{t('places.parksDetail.title')}</h2>
          <p className={styles.description}>
            {t('places.parksDetail.description')}
          </p>
        </div>
      </div>

      {/* Вторая строка - дополнительные изображения */}
      <div className={styles.bottomRow}>
        <div className={styles.smallImage}>
          <img 
            src="/src/assets/webp/ЛЭНДИНГ/парки 2.webp" 
            alt="Зеленая зона парка"
            className={styles.image}
          />
        </div>
        <div className={styles.largeImage}>
          <img 
            src="/src/assets/webp/ЛЭНДИНГ/парки 3.webp" 
            alt="Парковая аллея"
            className={styles.image}
          />
        </div>
      </div>
    </div>
  );
};

export default Parks;
