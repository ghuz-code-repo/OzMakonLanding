import React, { useState, useRef, useEffect } from 'react';
import USPGridSlide1 from './USPGridSlide1';
import USPGridSlide2 from './USPGridSlide2';
import USPGridSlide3 from './USPGridSlide3';
import USPGridSlide4 from './USPGridSlide4';
import USPGridSlide5 from './USPGridSlide5';
import './UniqueSellingPropositionsGrid5.css';

const slides = [
  <USPGridSlide1 key="slide-0" />,
  <USPGridSlide2 key="slide-1" />,
  <USPGridSlide3 key="slide-2" />,
  <USPGridSlide4 key="slide-3" />,
  <USPGridSlide5 key="slide-4" />,
];

const SCROLL_DELAY = 1000;

const USPGridCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const containerRef = useRef(null);
  const isThrottled = useRef(false);
  const wasActive = useRef(false);
  const slideRef = useRef(currentSlide);
  slideRef.current = currentSlide;
  const lastSlideIndex = slides.length - 1;

  useEffect(() => {
    const handleWheel = (e) => {
      // ... (вся логика handleWheel остается без изменений) ...
      const { current: container } = containerRef;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const isNowActive = rect.top <= 0 && rect.bottom > window.innerHeight;

      if (!isNowActive) {
        wasActive.current = false;
        return;
      }
      
      const justActivated = !wasActive.current;
      wasActive.current = true;
      const direction = e.deltaY > 0 ? 'down' : 'up';
      
      if (isThrottled.current) {
        e.preventDefault();
        return;
      }
      
      if ((slideRef.current === 0 && direction === 'up') || (slideRef.current === lastSlideIndex && direction === 'down')) {
        return;
      }
      
      e.preventDefault();

      if (justActivated && direction === 'down') {
        isThrottled.current = true;
        setTimeout(() => { isThrottled.current = false; }, SCROLL_DELAY);
        return;
      }

      const nextSlide = slideRef.current + (direction === 'down' ? 1 : -1);
      
      isThrottled.current = true;
      setCurrentSlide(nextSlide);
      
      const targetScrollY = window.scrollY + rect.top + nextSlide * window.innerHeight;
      window.scrollTo({ top: targetScrollY, behavior: 'auto' });

      setTimeout(() => {
        isThrottled.current = false;
      }, SCROLL_DELAY);
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => window.removeEventListener('wheel', handleWheel);
  }, []);

  return (
    <div ref={containerRef} className="usp5-scroll-container">
      <div className="usp5-sticky-wrapper">
        {/*
          Ключевое изменение здесь!
          Мы оборачиваем слайд в div с уникальным 'key'.
          Когда 'key' меняется, React полностью пересоздает этот div,
          что заново запускает нашу CSS-анимацию.
        */}
        <div key={currentSlide} className="slide-container-animated">
          {slides[currentSlide]}
        </div>
      </div>
    </div>
  );
};

export default USPGridCarousel;