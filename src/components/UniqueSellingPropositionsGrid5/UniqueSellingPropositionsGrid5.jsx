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
  const [animDirection, setAnimDirection] = useState(null); // 'anim-down' | 'anim-up' | null
  const [isLocked, setIsLocked] = useState(false); // блокировка скролла после смены слайда
  const blockRef = useRef();

  useEffect(() => {
    const block = blockRef.current;
    if (!block) return;
    let ticking = false;

    const onWheel = (e) => {
      if (isLocked) {
        e.preventDefault();
        return;
      }
      const rect = block.getBoundingClientRect();
      const directionScroll = e.deltaY > 0 ? 'down' : 'up';
      const atBottom = Math.abs(rect.bottom - window.innerHeight) <= 2;
      const atTop = Math.abs(rect.top) <= 2;
      const visibleHeight = Math.min(rect.bottom, window.innerHeight) - Math.max(rect.top, 0);
      const visibleRatio = visibleHeight / rect.height;

      if (
        visibleRatio >= 0.5 && !atTop && !atBottom &&
        !(
          (current === 0 && directionScroll === 'up') ||
          (current === slides.length - 1 && directionScroll === 'down')
        )
      ) {
        e.preventDefault();
        document.body.style.overflow = 'hidden';
        if (directionScroll === 'down') {
          const scrollDelta = rect.bottom - window.innerHeight;
          window.scrollBy({ top: scrollDelta, behavior: 'smooth' });
        } else {
          const scrollDelta = rect.top;
          window.scrollBy({ top: scrollDelta, behavior: 'smooth' });
        }
        return;
      }

      let hijack = false;
      if (directionScroll === 'down' && current < slides.length - 1 && atBottom) hijack = true;
      if (directionScroll === 'up' && current > 0 && atTop) hijack = true;

      if (hijack) {
        e.preventDefault();
        document.body.style.overflow = 'hidden';
        if (!ticking) {
          ticking = true;
          setAnimDirection(directionScroll === 'down' ? 'anim-down' : 'anim-up');
          setCurrent((c) => directionScroll === 'down' ? Math.min(c + 1, slides.length - 1) : Math.max(c - 1, 0));
          setIsLocked(true);
          setTimeout(() => {
            setIsLocked(false);
            setAnimDirection(null);
          }, 1000);
          ticking = false;
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
  }, [current, slides.length, isLocked]);

  useEffect(() => {
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  // Рендер только текущего слайда, анимация на колонках
  const slide = slides[current];

  const renderSlide = (slide, colClass, ref = null) => (
    <div className="usp5-wrapper" ref={ref}>
      <div className={`usp5-col usp5-col--left${colClass || ''}`}>
        <div className="usp5-animatable">
          <div className="usp5__left-top">
            <h2 className="usp5__title">
            {slide.title.split('\n').map((line, i) => (
            <React.Fragment key={i}>
              {line}
              <br />
            </React.Fragment>
          ))}</h2>
            <div className="usp5__left-top-text">
              <div className="usp5__list">
                {slide.left.list.map((item, i) => <div key={i}>{item}</div>)}
              </div>
              <div className="usp5__year">{slide.left.year}</div>
            </div>
          </div>
        </div>
        <div className="usp5__left-bottom">
          <div className="usp5__img-block usp5__img-block--bottom">
            <div className="usp5__line" />
            <div
              className="usp5__img usp5__img-zal  usp5-animatable"
              style={{ backgroundImage: `url(${imgPath(slide.left.img)})` }}
            />
          </div>
        </div>
      </div>
      <div className={`usp5-col usp5-col--center${colClass || ''}`}>
        <div className="usp5__img-block usp5__img-block--top usp5-animatable">
          <div
            className="usp5__img usp5__img-child"
            style={{ backgroundImage: `url(${imgPath(slide.center.img1)})` }}
          />
        </div>
        <div className="usp5__img-block usp5__img-block--middle usp5-animatable">
          <div
            className="usp5__img usp5__img-dvor"
            style={{ backgroundImage: `url(${imgPath(slide.center.img2)})` }}
          />
        </div>
      </div>
      <div className={`usp5-col usp5-col--right${colClass || ''}`}>
        <div className="usp5__img-block usp5__img-block--house usp5-animatable">
          <div
            className="usp5_img--frontview"
            style={{ backgroundImage: `url(${imgPath(slide.right.img1)})` }}
          />
        </div>
        <div className="usp5-animatable">
          <div className="usp5__textblock">
            {slide.right.text.split('\n').map((line, i) => (
              <React.Fragment key={i}>
                {line}
                <br />
              </React.Fragment>
            ))}
          </div>
        </div>
        <div className="usp5__img-block usp5__img-block--bbq usp5-animatable">
          <div
            className="usp5_img--bbq"
            style={{ backgroundImage: `url(${imgPath(slide.right.img2)})` }}
          />
        </div>
      </div>
    </div>
  );

  return (
    <section className={`usp5__container${animDirection ? ' ' + animDirection : ''}`} ref={blockRef}>
      {renderSlide(slide, '')}
    </section>
  );
};

export default UniqueSellingPropositionsGrid5;