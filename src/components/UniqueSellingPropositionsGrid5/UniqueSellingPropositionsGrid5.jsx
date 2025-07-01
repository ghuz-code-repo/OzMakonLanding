import React, { useRef, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import './UniqueSellingPropositionsGrid5.css';
import USPGridSlide from './USPGridSlide';
const height = 1200-(1080-window.innerHeight)

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
      year: '2025',
      img: 'enter.jpg',
    },
    center: {
      img1: 'lift.jpg',
      img2: 'Makon_render.jpg',
    },
    right: {
      img1: 'komnata.jpg',
      img2: 'coffe_table.jpg',
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

      // 1. Hijack scroll для смены слайдов (ПЕРЕД блокировкой скролла)
      let hijack = false;
      if (directionScroll === 'down' && current < slides.length - 1 && atBottom) hijack = true;
      if (directionScroll === 'up' && current > 0 && atTop) hijack = true;

      if (hijack) {
        e.preventDefault();
        setIsLocked(true);
        document.body.style.overflow = 'hidden';
        if (!ticking) {
          ticking = true;
          setAnimDirection(directionScroll === 'down' ? 'anim-down' : 'anim-up');
          setCurrent((c) => directionScroll === 'down' ? Math.min(c + 1, slides.length - 1) : Math.max(c - 1, 0));
          setTimeout(() => {
            setIsLocked(false);
            setAnimDirection(null);
          }, 1000);
          ticking = false;
        }
        return;
      }

      // 2. Доскролл только если блок почти полностью виден, но не до конца
      if (current === 0 && directionScroll === 'down') {
        if (visibleRatio >= 0.01 && rect.bottom > window.innerHeight + 1) {
          e.preventDefault();
          document.body.style.overflow = 'hidden';
          const scrollDelta = rect.bottom - window.innerHeight;
          window.scrollBy({ top: scrollDelta, behavior: 'smooth' });
          return;
        }
        // Если блок уже полностью виден — не даём скроллить дальше
        if (rect.bottom <= window.innerHeight + 1) {
          e.preventDefault();
          return;
        }
      }

      // Аналогичная логика для скролла вверх на последнем слайде
      if (current === slides.length - 1 && directionScroll === 'up') {
        if (visibleRatio >= 0.01 && rect.top < -1) {
          e.preventDefault();
          document.body.style.overflow = 'hidden';
          const scrollDelta = rect.top;
          window.scrollBy({ top: scrollDelta, behavior: 'smooth' });
          return;
        }
        // Если блок уже полностью виден сверху — не даём скроллить выше
        if (rect.top >= -1) {
          e.preventDefault();
          return;
        }
      }

      if (current < slides.length - 1 && directionScroll === 'down' && atBottom) {
        e.preventDefault();
        return;
      }

      if (current > 0 && directionScroll === 'up' && atTop) {
        e.preventDefault();
        return;
      }

      document.body.style.overflow = '';
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

  return (
    <section className={`usp5__container${animDirection ? ' ' + animDirection : ''}`} ref={blockRef}>
      <USPGridSlide slide={slides[current]} imgPath={imgPath} colClass="" height={height} />
    </section>
  );
};

export default UniqueSellingPropositionsGrid5;