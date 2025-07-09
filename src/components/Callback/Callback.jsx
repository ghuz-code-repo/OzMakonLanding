import React, { useState, useEffect, useRef } from 'react';
import styles from './Callback.module.css';
import { useTranslation } from 'react-i18next';
const imgPath = (name) => `/src/assets/img/Callback/${name}`;


const leftImages = [
  {
    'name': 'l-1.png',
    'width': '258px',
    'height': '328px',
    'posX': '0px',
    'posY': '0px',
    'size': '100%'
  },
  {
    'name': 'l-2.png',
    'width': '258px',
    'height': '272px',
    'posX': 'px',
    'posY': 'px',
    'size': '100%'
  },
  {
    'name': 'l-3.png',
    'width': '258px',
    'height': '211px',
    'posX': 'px',
    'posY': 'px',
    'size': '100%'
  },
  {
    'name': 'l-4.png',
    'width': '258px',
    'height': '149px',
    'posX': 'px',
    'posY': 'px',
    'size': '100%'
  }
];
const midImages = [
  {
    'name': 'm-1.png',
    'width': '259px',
    'height': '210px',
    'posX': 'px',
    'posY': 'px',
    'size': '100%'
  },
  {
    'name': 'm-2.png',
    'width': '259px',
    'height': '328px',
    'posX': 'px',
    'posY': 'px',
    'size': '100%'
  },
  {
    'name': 'm-3.png',
    'width': '259px',
    'height': '204px',
    'posX': 'px',
    'posY': 'px',
    'size': '100%'
  },
  {
    'name': 'm-4.png',
    'width': '218px',
    'height': '346px',
    'posX': 'px',
    'posY': 'px',
    'size': '100%'
  }
];
const rightImages = [
  {
    'name': 'r-1.png',
    'width': '258px',
    'height': '328px',
    'posX': 'px',
    'posY': 'px',
    'size': '100%'
  },
  {
    'name': 'r-2.png',
    'width': '258px',
    'height': '164px',
    'posX': 'px',
    'posY': 'px',
    'size': '100%'
  },
  {
    'name': 'r-3.png',
    'width': '258px',
    'height': '268px',
    'posX': 'px',
    'posY': 'px',
    'size': '100%'
  },
  {
    'name': 'r-4.png',
    'width': '201px',
    'height': '255px',
    'posX': 'px',
    'posY': 'px',
    'size': '100%'
  }
];

const Callback = () => {
  const { t } = useTranslation();
  const [consent, setConsent] = useState(false);

  // 1. Создаем ref'ы для элементов
  const sectionRef = useRef(null);
  const leftColRef = useRef(null);
  const midColRef = useRef(null);
  const rightColRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const section = sectionRef.current;
      const { top, height } = section.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // 1. ЗАДАЕМ РАЗНЫЕ ЗНАЧЕНИЯ СМЕЩЕНИЯ
      // Это и есть ваши "регуляторы скорости"
      const maxTranslateDefault = 300; // Скорость для левой и правой колонок
      const maxTranslateMiddle = 1300;  // Увеличенная скорость для средней колонки

      let progress = (windowHeight - top) / height;
      progress = Math.max(0, Math.min(1, progress));

      // 2. ИСПОЛЬЗУЕМ РАЗНЫЕ ПЕРЕМЕННЫЕ ПРИ РАСЧЕТЕ
      // Для движения вверх используем стандартное значение
      const translateUp = maxTranslateDefault * (1 - progress);
      // Для движения вниз (средняя колонка) используем увеличенное
      const translateDown = -maxTranslateMiddle * (1 - progress);

      if (leftColRef.current) {
        leftColRef.current.style.transform = `translateY(${translateUp}px)`;
      }
      if (midColRef.current) {
        midColRef.current.style.transform = `translateY(${translateDown}px)`;
      }
      if (rightColRef.current) {
        rightColRef.current.style.transform = `translateY(${translateUp}px)`;
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className={styles.CallbackWrapper}>
      <section className={styles.CallbackSection} ref={sectionRef}>
        <div className={styles.left}>
          <h2 className={styles.title}>{t('callback.title')}</h2>
          <h3 className={styles.subTitle}>{t('callback.subTitle')}</h3>
          <span className={styles.mainText}>
            {t('callback.mainText')}
          </span>
          <form className={styles.form}>
            <input className={styles.input} type="text" placeholder={t('callback.namePlaceholder')} />
            <input className={styles.input} type="text" placeholder={t("callback.phonePlaceholder")} />
            <label className={styles.checkboxLabel}>
              <input
                type="checkbox"
                checked={consent}
                onChange={e => setConsent(e.target.checked)}
                className={styles.checkbox}
              />
              <span className={styles.customCheckbox}></span>
              <span className={styles.consentText}>
                {t('callback.agreement')}
              </span>
            </label>
            <button className={styles.button} type="submit" disabled={!consent}>
              {t('callback.button')}
            </button>
          </form>
        </div>
        <div className={styles.right}>
          <div className={styles.grid}>
            <div className={styles.column} ref={leftColRef}>
              {leftImages.map((img, i) => (
                <div className={styles.gridItem} key={`left-1-${i}`}
                  style={{
                    backgroundImage: `url(${imgPath(img.name)})`,
                    minHeight: img.height,
                    minWidth: img.width,
                    backgroundPosition: img.posX + ' ' + img.posY,
                    backgroundSize: img.size
                  }}
                >
                </div>
              ))}
              {leftImages.map((img, i) => (
                <div className={styles.gridItem} key={`left-2-${i}`}
                  style={{
                    backgroundImage: `url(${imgPath(img.name)})`,
                    minHeight: img.height,
                    minWidth: img.width,
                    backgroundPosition: img.posX + ' ' + img.posY,
                    backgroundSize: img.size
                  }}
                >
                </div>
              ))}
            </div>
            <div className={styles.column} ref={midColRef}>
              {midImages.map((img, i) => (
                <div className={styles.gridItem} key={`mid-1-${i}`}
                  style={{
                    backgroundImage: `url(${imgPath(img.name)})`,
                    minHeight: img.height,
                    minWidth: img.width,
                    backgroundPosition: img.posX + ' ' + img.posY,
                    backgroundSize: img.size
                  }}
                >
                </div>
              ))}
              {midImages.map((img, i) => (
                <div className={styles.gridItem} key={`mid-2-${i}`}
                  style={{
                    backgroundImage: `url(${imgPath(img.name)})`,
                    minHeight: img.height,
                    minWidth: img.width,
                    backgroundPosition: img.posX + ' ' + img.posY,
                    backgroundSize: img.size
                  }}
                >
                </div>
              ))}
            </div>
            <div className={styles.column} ref={rightColRef}>
              {rightImages.map((img, i) => (
                <div className={styles.gridItem} key={`right-1-${i}`}
                  style={{
                    backgroundImage: `url(${imgPath(img.name)})`,
                    minHeight: img.height,
                    minWidth: img.width,
                    backgroundPosition: img.posX + ' ' + img.posY,
                    backgroundSize: img.size
                  }}
                >
                </div>
              ))}
              {rightImages.map((img, i) => (
                <div className={styles.gridItem} key={`right-2-${i}`}
                  style={{
                    backgroundImage: `url(${imgPath(img.name)})`,
                    minHeight: img.height,
                    minWidth: img.width,
                    backgroundPosition: img.posX + ' ' + img.posY,
                    backgroundSize: img.size
                  }}
                >
                </div>
              ))}
            </div>
          </div>
        </div>
      </section >
    </div>
  );
};

export default Callback;
