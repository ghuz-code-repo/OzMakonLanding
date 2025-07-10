import React, { useState, useLayoutEffect, useRef } from 'react';
import styles from './Callback.module.css';
import { useTranslation } from 'react-i18next';
const imgPath = (name) => `/src/assets/img/Callback/${name}`;

// Все данные остаются с дублированием, как было в вашем рабочем варианте
const leftImages = [
  { 'name': 'l-1.png', 'width': '258px', 'height': '328px', 'posX': '0px', 'posY': '0px', 'size': '100%' },
  { 'name': 'l-2.png', 'width': '258px', 'height': '272px', 'posX': '0px', 'posY': '0px', 'size': '100%' },
  { 'name': 'l-3.png', 'width': '258px', 'height': '211px', 'posX': '0px', 'posY': '0px', 'size': '100%' },
  { 'name': 'l-4.png', 'width': '258px', 'height': '149px', 'posX': '0px', 'posY': '0px', 'size': '100%' }
];
const midImages = [
  { 'name': 'm-1.png', 'width': '259px', 'height': '210px', 'posX': '0px', 'posY': '0px', 'size': '100%' },
  { 'name': 'm-2.png', 'width': '259px', 'height': '328px', 'posX': '0px', 'posY': '0px', 'size': '100%' },
  { 'name': 'm-3.png', 'width': '259px', 'height': '204px', 'posX': '0px', 'posY': '0px', 'size': '100%' },
  { 'name': 'm-4.png', 'width': '218px', 'height': '346px', 'posX': '0px', 'posY': '0px', 'size': '100%' }
];
const rightImages = [
  { 'name': 'r-1.png', 'width': '258px', 'height': '328px', 'posX': '0px', 'posY': '0px', 'size': '100%' },
  { 'name': 'r-2.png', 'width': '258px', 'height': '164px', 'posX': '0px', 'posY': '0px', 'size': '100%' },
  { 'name': 'r-3.png', 'width': '258px', 'height': '268px', 'posX': '0px', 'posY': '0px', 'size': '100%' },
  { 'name': 'r-4.png', 'width': '201px', 'height': '255px', 'posX': '0px', 'posY': '0px', 'size': '100%' }
];

const Callback = () => {
  const { t } = useTranslation();
  const [consent, setConsent] = useState(false);

  // Ваши ref'ы, которые работают
  const sectionRef = useRef(null);
  const leftColRef = useRef(null);
  const midColRef = useRef(null);
  const rightColRef = useRef(null);

  // Ref для хранения финального смещения. ОН НАМ НУЖЕН.
  const finalTranslateRef = useRef({ left: 0, mid: 0, right: 0 });

  // Используем useLayoutEffect для точных измерений
  useLayoutEffect(() => {
    const calculateFinalPositions = () => {
      // Эта функция вычисляет, на сколько нужно сдвинуть каждую колонку в конце,
      // чтобы последняя картинка оказалась внизу.
      // Смещение = Высота видимой части колонки - Высота всего контента колонки
      if (leftColRef.current) {
        finalTranslateRef.current.left = leftColRef.current.offsetHeight - leftColRef.current.scrollHeight;
      }
      if (midColRef.current) {
        finalTranslateRef.current.mid = midColRef.current.offsetHeight - midColRef.current.scrollHeight;
      }
      if (rightColRef.current) {
        finalTranslateRef.current.right = rightColRef.current.offsetHeight - rightColRef.current.scrollHeight;
      }
    };

    // Выполняем расчёт после первой отрисовки
    calculateFinalPositions();

    const handleScroll = () => {
      if (!sectionRef.current) return;

      const { top, height } = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Ваша рабочая логика расчёта прогресса, мы её не трогаем
      let progress = (windowHeight - top) / height;
      progress = Math.max(0, Math.min(1, progress));

      // Начальные точки из вашей рабочей версии
      const upStart = 600;
      const downStart = -1300;

      // Конечные точки - наше новое, точно вычисленное смещение
      const leftEnd = finalTranslateRef.current.left;
      const midEnd = finalTranslateRef.current.mid;
      const rightEnd = finalTranslateRef.current.right;

      // Плавный переход от начальной точки к конечной
      const translateLeft = upStart + (leftEnd - upStart) * progress;
      const translateMid = downStart + (midEnd - downStart) * progress;
      const translateRight = upStart + (rightEnd - upStart) * progress;

      if (leftColRef.current) leftColRef.current.style.transform = `translateY(${translateLeft}px)`;
      if (midColRef.current) midColRef.current.style.transform = `translateY(${translateMid}px)`;
      if (rightColRef.current) rightColRef.current.style.transform = `translateY(${translateRight}px)`;
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', calculateFinalPositions); // Пересчёт на случай изменения размера окна

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', calculateFinalPositions);
    };
  }, []);

  return (
    // JSX ОСТАЁТСЯ ВАШ, С ДУБЛИРОВАНИЕМ
    <div className={styles.CallbackWrapper} id='contacts'>
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
                <div className={styles.gridItem} key={`left-1-${i}`} style={{ backgroundImage: `url(${imgPath(img.name)})`, minHeight: img.height, minWidth: img.width, backgroundPosition: `${img.posX} ${img.posY}`, backgroundSize: img.size }}></div>
              ))}
              {/* {leftImages.map((img, i) => (
                <div className={styles.gridItem} key={`left-2-${i}`} style={{ backgroundImage: `url(${imgPath(img.name)})`, minHeight: img.height, minWidth: img.width, backgroundPosition: `${img.posX} ${img.posY}`, backgroundSize: img.size }}></div>
              ))} */}
            </div>
            <div className={styles.column} ref={midColRef}>
              {midImages.map((img, i) => (
                <div className={styles.gridItem} key={`mid-1-${i}`} style={{ backgroundImage: `url(${imgPath(img.name)})`, minHeight: img.height, minWidth: img.width, backgroundPosition: `${img.posX} ${img.posY}`, backgroundSize: img.size }}></div>
              ))}
              {/* {midImages.map((img, i) => (
                <div className={styles.gridItem} key={`mid-2-${i}`} style={{ backgroundImage: `url(${imgPath(img.name)})`, minHeight: img.height, minWidth: img.width, backgroundPosition: `${img.posX} ${img.posY}`, backgroundSize: img.size }}></div>
              ))} */}
            </div>
            <div className={styles.column} ref={rightColRef}>
              {rightImages.map((img, i) => (
                <div className={styles.gridItem} key={`right-1-${i}`} style={{ backgroundImage: `url(${imgPath(img.name)})`, minHeight: img.height, minWidth: img.width, backgroundPosition: `${img.posX} ${img.posY}`, backgroundSize: img.size }}></div>
              ))}
              {/* {rightImages.map((img, i) => (
                <div className={styles.gridItem} key={`right-2-${i}`} style={{ backgroundImage: `url(${imgPath(img.name)})`, minHeight: img.height, minWidth: img.width, backgroundPosition: `${img.posX} ${img.posY}`, backgroundSize: img.size }}></div>
              ))} */}
            </div>
          </div>
        </div>
      </section >
    </div>
  );
};

export default Callback;