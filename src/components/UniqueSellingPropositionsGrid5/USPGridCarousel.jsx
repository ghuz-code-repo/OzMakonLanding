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
  const wasActive = useRef(false); // Ref для отслеживания момента активации
  const slideRef = useRef(currentSlide);
  slideRef.current = currentSlide;
  const lastSlideIndex = slides.length - 1;

  console.log(`%c[Render] Слайд: ${currentSlide}`, 'color: orange;');

  useEffect(() => {
    const handleWheel = (e) => {
      const { current: container } = containerRef;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const isNowActive = rect.top <= 0 && rect.bottom > window.innerHeight;

      // Если мы не в активной зоне, сбрасываем флаг и выходим
      if (!isNowActive) {
        wasActive.current = false;
        return;
      }
      
      const justActivated = !wasActive.current;
      wasActive.current = true;
      const direction = e.deltaY > 0 ? 'down' : 'up';

      // 1. ПРОВЕРКА ЗАДЕРЖКИ (ТРОТТЛИНГ)
      // Теперь это первая проверка. Если активна задержка, блокируем скролл и выходим.
      // Это не дает "выйти" из блока сразу после смены слайда на 0 или 4.
      if (isThrottled.current) {
        e.preventDefault();
        console.log('%c[Wheel] Прокрутка заблокирована (throttle).', 'color: red;');
        return;
      }

      // 2. ПРОВЕРКА ВЫХОДА ЗА ГРАНИЦЫ
      if ((slideRef.current === 0 && direction === 'up') || (slideRef.current === lastSlideIndex && direction === 'down')) {
        console.log(`[Check] Выход за границу разрешен.`);
        return; // Позволяем браузеру скроллить
      }
      
      // Если мы здесь, мы внутри слайдера. Берем управление на себя.
      e.preventDefault();

      // 3. ИСПРАВЛЕНИЕ "БЫСТРОГО ВХОДА"
      // Если мы только что активировали слайдер скроллом вниз, мы не меняем слайд,
      // а просто "приземляемся" на слайд 0 и включаем задержку.
      if (justActivated && direction === 'down') {
        console.log('%c[ACTION] Вход в слайдер. Приземляемся на слайд 0. Блокировка на 1с.', 'color: green;');
        isThrottled.current = true;
        setTimeout(() => {
          isThrottled.current = false;
          console.log('%c[ACTION] Блокировка снята.', 'color: blue;');
        }, SCROLL_DELAY);
        return;
      }

      // 4. СТАНДАРТНАЯ СМЕНА СЛАЙДА
      let nextSlide = slideRef.current + (direction === 'down' ? 1 : -1);
      
      console.log(`%c[Wheel] Листаем на слайд ${nextSlide}`, 'font-weight: bold;');
      isThrottled.current = true;
      setCurrentSlide(nextSlide);
      
      const targetScrollY = window.scrollY + rect.top + nextSlide * window.innerHeight;
      window.scrollTo({ top: targetScrollY, behavior: 'auto' });

      console.log(`%c[ACTION] Перемотка на позицию слайда ${nextSlide}. Блокировка на 1с.`, 'color: green;');

      setTimeout(() => {
        isThrottled.current = false;
        console.log('%c[ACTION] Блокировка снята.', 'color: blue;');
      }, SCROLL_DELAY);
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => window.removeEventListener('wheel', handleWheel);
  }, []); // Пустой массив зависимостей для стабильного обработчика

  return (
    <div ref={containerRef} className="usp5-scroll-container">
      <div className="usp5-sticky-wrapper">
        {slides[currentSlide]}
      </div>
    </div>
  );
};

export default USPGridCarousel;