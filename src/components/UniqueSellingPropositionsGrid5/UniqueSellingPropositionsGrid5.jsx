import React, { useRef, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import './UniqueSellingPropositionsGrid5.css';

const slideData = (t) => [
  {
    title : t('usp5.title'),
    left: {
      list: [t('usp5.list1'), t('usp5.list2'), t('usp5.list3')],
      year: '2025',
      img: 'sports.jpg',
    },
    center: {
      img1: 'kids_room.jpg',
      img2: 'eagle_view.jpg',
    },
    right: {
      img1: 'front_view.png',
      img2: 'bbq.png',
      text: t('usp5.textblock'),
    },
  },
  {
    title : t('usp5.titleb'),

    left: {
      list: [t('usp5.list1b'), t('usp5.list2b'), t('usp5.list3b')],
      year: '2026',
      img: 'kids_room.jpg',
    },
    center: {
      img1: 'eagle_view.jpg',
      img2: 'sports.jpg',
    },
    right: {
      img1: 'bbq.png',
      img2: 'front_view.png',
      text: t('usp5.textblock2') || 'Второй текстовый блок',
    },
  },
];

const imgPath = (name) => `/src/assets/img/UniqueSellingPropositionsGrid5/${name}`;

const UniqueSellingPropositionsGrid5 = () => {
  const { t } = useTranslation();
  const slides = slideData(t);
  const [current, setCurrent] = useState(0);
  const blockRef = useRef();
  const [locked, setLocked] = useState(false);

  useEffect(() => {
    const block = blockRef.current;
    if (!block) return;

    let ticking = false;

    const onWheel = (e) => {
      const rect = block.getBoundingClientRect();
      const direction = e.deltaY > 0 ? 'down' : 'up';
      const atBottom = Math.abs(rect.bottom - window.innerHeight) <= 2;
      const atTop = Math.abs(rect.top) <= 2;
      const visibleHeight = Math.min(rect.bottom, window.innerHeight) - Math.max(rect.top, 0);
      const visibleRatio = visibleHeight / rect.height;

      // Если видно >= 50% блока, но граница не совпадает с экраном — доскроллить
      if (
        visibleRatio >= 0.5 && !atTop && !atBottom &&
        !(
          (current === 0 && direction === 'up') ||
          (current === slides.length - 1 && direction === 'down')
        )
      ) {
        e.preventDefault();
        document.body.style.overflow = 'hidden';
        if (direction === 'down') {
          // Доскроллить так, чтобы низ блока совпал с низом экрана
          const scrollDelta = rect.bottom - window.innerHeight;
          window.scrollBy({ top: scrollDelta, behavior: 'smooth' });
        } else {
          // Доскроллить так, чтобы верх блока совпал с верхом экрана
          const scrollDelta = rect.top;
          window.scrollBy({ top: scrollDelta, behavior: 'smooth' });
        }
        return;
      }

      let hijack = false;
      // Скролл вниз: только если нижняя граница блока касается низа экрана
      if (direction === 'down' && current < slides.length - 1 && atBottom) hijack = true;
      // Скролл вверх: только если верхняя граница блока касается верха экрана
      if (direction === 'up' && current > 0 && atTop) hijack = true;

      if (hijack) {
        e.preventDefault();
        document.body.style.overflow = 'hidden';
        if (locked) return;
        if (!ticking) {
          ticking = true;
          window.requestAnimationFrame(() => {
            if (direction === 'down' && current < slides.length - 1) {
              setLocked(true);
              setCurrent((c) => Math.min(c + 1, slides.length - 1));
              setTimeout(() => setLocked(false), 400);
            } else if (direction === 'up' && current > 0) {
              setLocked(true);
              setCurrent((c) => Math.max(c - 1, 0));
              setTimeout(() => setLocked(false), 400);
            }
            ticking = false;
          });
        }
      } else {
        document.body.style.overflow = '';
      }
    };

    window.addEventListener('wheel', onWheel, { passive: false });
    return () => {
      window.removeEventListener('wheel', onWheel);
      document.body.style.overflow = '';
    };
    // eslint-disable-next-line
  }, [current, slides.length, locked]);

  useEffect(() => {
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  const slide = slides[current];

  return (
    <section className="usp5__container" ref={blockRef}>
      <div className="usp5-wrapper">
        {/* Левая колонка */}
        <div className="usp5-col usp5-col--left">
          <div className="usp5__left-top">
            <h2 className="usp5__title">{slide.title}</h2>
            <div className="usp5__left-top-text">
              <div className="usp5__list">
                {slide.left.list.map((item, i) => <div key={i}>{item}</div>)}
              </div>
              <div className="usp5__year">{slide.left.year}</div>
            </div>
          </div>
          <div className="usp5__left-bottom">
            <div className="usp5__img-block usp5__img-block--bottom">
              <div className="usp5__line" />
              <div
                className="usp5__img usp5__img-zal"
                style={{ backgroundImage: `url(${imgPath(slide.left.img)})` }}
              />
            </div>
          </div>
        </div>
        {/* Средняя колонка */}
        <div className="usp5-col usp5-col--center">
          <div className="usp5__img-block usp5__img-block--top">
            <div
              className="usp5__img usp5__img-child"
              style={{ backgroundImage: `url(${imgPath(slide.center.img1)})` }}
            />
          </div>
          <div className="usp5__img-block usp5__img-block--middle">
            <div
              className="usp5__img usp5__img-dvor"
              style={{ backgroundImage: `url(${imgPath(slide.center.img2)})` }}
            />
          </div>
        </div>
        {/* Правая колонка */}
        <div className="usp5-col usp5-col--right">
          <div className="usp5__img-block usp5__img-block--house">
            <div
              className="usp5_img--frontview"
              style={{ backgroundImage: `url(${imgPath(slide.right.img1)})` }}
            />
          </div>
          <div className="usp5__textblock">
            {slide.right.text.split('\n').map((line, i) => (
              <React.Fragment key={i}>
                {line}
                <br />
              </React.Fragment>
            ))}
          </div>
          <div className="usp5__img-block usp5__img-block--bbq">
            <div
              className="usp5_img--bbq"
              style={{ backgroundImage: `url(${imgPath(slide.right.img2)})` }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default UniqueSellingPropositionsGrid5;