import React from 'react';
import { useTranslation } from 'react-i18next';
import styles from './Schools.module.css';

const Schools = () => {
  const { t } = useTranslation();

  return (
    <div className={styles.schools}>
      {/* Первая строка - главное изображение и текст */}
      <div className={styles.topRow}>
        <div className={styles.mainImage}>
          <img 
            src="/src/assets/webp/ЛЭНДИНГ/школы 1.webp" 
            alt="Школа рядом с комплексом"
            className={styles.heroImage}
          />
          <div className={styles.timeTag}>
            <span className={styles.timeIcon}>🕐</span>
            3 мин
          </div>
        </div>
        
        <div className={styles.textBlock}>
          <h2 className={styles.title}>{t('places.schoolsDetail.title')}</h2>
          <p className={styles.description}>
            {t('places.schoolsDetail.description')}
          </p>
        </div>
      </div>

      {/* Вторая строка - дополнительные изображения */}
      <div className={styles.bottomRow}>
        <div className={styles.smallImage}>
          <img 
            src="/src/assets/webp/ЛЭНДИНГ/школы 2.webp" 
            alt="Школьный класс"
            className={styles.image}
          />
        </div>
        <div className={styles.largeImage}>
          <img 
            src="/src/assets/webp/ЛЭНДИНГ/школы 3.webp" 
            alt="Школьный двор"
            className={styles.image}
          />
        </div>
      </div>
    </div>
  );
};

export default Schools;
