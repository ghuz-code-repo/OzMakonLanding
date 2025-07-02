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

  console.log(`%c[Render] Слайд: ${currentSlide}`, 'color: orange;');

  useEffect(() => {
    const handleWheel = (e) => {
      const { current: container } = containerRef;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      // --- ИСПРАВЛЕНИЕ ЗДЕСЬ ---
      // Добавляем допуск в 1 пиксель, чтобы избежать ошибок округления браузера.
      const isNowActive = rect.top <= 1 && rect.bottom >= viewportHeight - 1;

      if (!isNowActive) {
        if (wasActive.current) {
          console.log('[Check] Слайдер стал НЕ активен.');
          wasActive.current = false;
        }
        return;
      }

      if (!wasActive.current) {
        console.log('[Check] Слайдер стал АКТИВЕН.');
        wasActive.current = true;
      }
      
      e.preventDefault();
      
      const direction = e.deltaY > 0 ? 'down' : 'up';
      
      if (isThrottled.current) {
        console.log('%c[Wheel] Прокрутка заблокирована (throttle).', 'color: red;');
        return;
      }

      if (slideRef.current === 0 && direction === 'up') {
        console.log('[Check] Попытка выхода ВВЕРХ. Плавно скроллим страницу, чтобы отпустить блок.');
        window.scrollBy({ top: -50, behavior: 'smooth' });
        return;
      }

      if (slideRef.current === lastSlideIndex && direction === 'down') {
        console.log('[Check] Попытка выхода ВНИЗ. Плавно скроллим страницу, чтобы отпустить блок.');
        window.scrollBy({ top: 50, behavior: 'smooth' });
        return;
      }
      
      let nextSlide = slideRef.current + (direction === 'down' ? 1 : -1);
      
      console.log(`%c[Wheel] Листаем на слайд ${nextSlide}`, 'font-weight: bold;');
      isThrottled.current = true;
      setCurrentSlide(nextSlide);
      
      const targetScrollY = window.scrollY + rect.top + nextSlide * viewportHeight;
      window.scrollTo({ top: targetScrollY, behavior: 'auto' });

      console.log(`%c[ACTION] Перемотка на позицию слайда ${nextSlide}. Блокировка на 1с.`, 'color: green;');

      setTimeout(() => {
        isThrottled.current = false;
        console.log('%c[ACTION] Блокировка снята.', 'color: blue;');
      }, SCROLL_DELAY);
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => window.removeEventListener('wheel', handleWheel);
  }, []);

  return (
    <div ref={containerRef} className="usp5-scroll-container">
      <div className="usp5-sticky-wrapper">
        <div key={currentSlide} className="slide-container-animated">
          {slides[currentSlide]}
        </div>
      </div>
    </div>
  );
};

export default USPGridCarousel;