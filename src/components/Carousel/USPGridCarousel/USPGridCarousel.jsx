import React, { useState, useRef, useEffect } from 'react';
import USPGridSlide1 from '../USPGridSlide1/USPGridSlide1';
import USPGridSlide2 from '../USPGridSlide2/USPGridSlide2';
import USPGridSlide3 from '../USPGridSlide3/USPGridSlide3';
import USPGridSlide4 from '../USPGridSlide4/USPGridSlide4';
import USPGridSlide5 from '../USPGridSlide5/USPGridSlide5';
import styles from './USPGridCarousel.module.css';

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

  // Touch events для свайпов
  const touchStartY = useRef(null);
  const touchStartTime = useRef(null);

  console.log(`%c[Render] Слайд: ${currentSlide}`, 'color: orange;');

  // Функция для проверки активности слайдера
  const isCarouselActive = () => {
    const { current: container } = containerRef;
    if (!container) return false;

    const rect = container.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    return rect.top <= 1 && rect.bottom >= viewportHeight - 1;
  };

  // Функция для смены слайда (общая для wheel и touch)
  const changeSlide = (direction) => {
    if (isThrottled.current) {
      console.log('%c[Navigation] Смена слайда заблокирована (throttle).', 'color: red;');
      return false;
    }

    if (slideRef.current === 0 && direction === 'up') {
      console.log('[Check] Попытка выхода ВВЕРХ.');
      window.scrollBy({ top: -50, behavior: 'smooth' });
      return false;
    }

    if (slideRef.current === lastSlideIndex && direction === 'down') {
      console.log('[Check] Попытка выхода ВНИЗ.');
      window.scrollBy({ top: 50, behavior: 'smooth' });
      return false;
    }
    
    let nextSlide = slideRef.current + (direction === 'down' ? 1 : -1);
    
    console.log(`%c[Navigation] Переход на слайд ${nextSlide}`, 'font-weight: bold;');
    isThrottled.current = true;
    setCurrentSlide(nextSlide);
    
    const rect = containerRef.current.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    const targetScrollY = window.scrollY + rect.top + nextSlide * viewportHeight;
    window.scrollTo({ top: targetScrollY, behavior: 'auto' });

    console.log(`%c[ACTION] Перемотка на позицию слайда ${nextSlide}. Блокировка на 1с.`, 'color: green;');

    setTimeout(() => {
      isThrottled.current = false;
      console.log('%c[ACTION] Блокировка снята.', 'color: blue;');
    }, SCROLL_DELAY);

    return true;
  };

  // Обработчики touch событий
  const handleTouchStart = (e) => {
    if (!isCarouselActive()) return;
    
    touchStartY.current = e.touches[0].clientY;
    touchStartTime.current = Date.now();
    console.log('[Touch] Начало касания:', touchStartY.current);
  };

  const handleTouchEnd = (e) => {
    if (!isCarouselActive() || touchStartY.current === null) return;
    
    const touchEndY = e.changedTouches[0].clientY;
    const touchEndTime = Date.now();
    const deltaY = touchStartY.current - touchEndY;
    const deltaTime = touchEndTime - touchStartTime.current;
    
    console.log('[Touch] Конец касания. DeltaY:', deltaY, 'DeltaTime:', deltaTime);
    
    // Минимальное расстояние для свайпа (в пикселях)
    const minSwipeDistance = 50;
    // Максимальное время для свайпа (в миллисекундах)
    const maxSwipeTime = 500;
    
    if (Math.abs(deltaY) >= minSwipeDistance && deltaTime <= maxSwipeTime) {
      e.preventDefault();
      const direction = deltaY > 0 ? 'down' : 'up';
      console.log(`%c[Touch] Обнаружен свайп ${direction}`, 'color: purple; font-weight: bold;');
      changeSlide(direction);
    }
    
    // Сброс значений
    touchStartY.current = null;
    touchStartTime.current = null;
  };

  const handleTouchMove = (e) => {
    if (!isCarouselActive() || touchStartY.current === null) return;
    
    // Предотвращаем стандартное поведение скролла во время свайпа
    const touchCurrentY = e.touches[0].clientY;
    const deltaY = Math.abs(touchStartY.current - touchCurrentY);
    
    if (deltaY > 10) { // Если движение больше 10px, блокируем скролл
      e.preventDefault();
    }
  };

  useEffect(() => {
    const handleWheel = (e) => {
      const { current: container } = containerRef;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
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
      changeSlide(direction);
    };

    window.addEventListener('wheel', handleWheel, { passive: false });

    // Добавляем обработчики touch событий
    if (containerRef.current) {
      containerRef.current.addEventListener('touchstart', handleTouchStart, { passive: false });
      containerRef.current.addEventListener('touchend', handleTouchEnd, { passive: false });
      containerRef.current.addEventListener('touchmove', handleTouchMove, { passive: false });
    }

    // --- НОВАЯ ЛОГИКА СИНХРОНИЗАЦИИ ---
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Не вмешиваемся, если идет обычная смена слайдов
        if (isThrottled.current) return;

        // Если блок виден на экране
        if (entry.isIntersecting) {
          const rect = entry.boundingClientRect;
          const viewportHeight = window.innerHeight;

          // Если мы видим ВЕРХНЮЮ часть блока (значит, мы над ним или в его начале)
          if (rect.top >= 0) {
            if (slideRef.current !== 0) {
              console.log(`%c[Observer] Обнаружен прыжок ВЫШЕ слайдера. Сбрасываем на слайд 0.`, 'color: purple; font-weight: bold;');
              setCurrentSlide(0);
              // Важно: также сбрасываем скролл, чтобы не застрять
              window.scrollTo({ top: window.scrollY + rect.top, behavior: 'auto' });
            }
          } 
          // Если мы видим НИЖНЮЮ часть блока (значит, мы под ним)
          else if (rect.bottom <= viewportHeight) {
            if (slideRef.current !== lastSlideIndex) {
              console.log(`%c[Observer] Обнаружен прыжок НИЖЕ слайдера. Устанавливаем последний слайд.`, 'color: purple; font-weight: bold;');
              setCurrentSlide(lastSlideIndex);
              // Синхронизируем скролл с последним слайдом
              const targetScrollY = window.scrollY + rect.top + lastSlideIndex * viewportHeight;
              window.scrollTo({ top: targetScrollY, behavior: 'auto' });
            }
          }
        }
      },
      { threshold: 0.1 } // Срабатывает, когда хотя бы 10% блока видно
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      window.removeEventListener('wheel', handleWheel);
      
      // Удаляем обработчики touch событий
      if (containerRef.current) {
        containerRef.current.removeEventListener('touchstart', handleTouchStart);
        containerRef.current.removeEventListener('touchend', handleTouchEnd);
        containerRef.current.removeEventListener('touchmove', handleTouchMove);
        observer.unobserve(containerRef.current);
      }
    };
  }, [lastSlideIndex]); // Добавили зависимость

  return (
    <div ref={containerRef} className={styles["usp5-scroll-container"]} id='advantages'>
      <div className={styles["usp5-sticky-wrapper"]}>
        <div key={currentSlide} className={styles["slide-container-animated"]}>
          {slides[currentSlide]}
        </div>
      </div>
    </div>
  );
};

export default USPGridCarousel;