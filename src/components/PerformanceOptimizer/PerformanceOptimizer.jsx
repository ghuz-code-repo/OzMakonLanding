import React, { useEffect, useRef } from 'react';

const PerformanceOptimizer = ({ children }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Применяем оптимизации производительности
    const applyPerformanceOptimizations = (element) => {
      // Оптимизации без влияния на размеры
      // element.style.transform = 'translate3d(0,0,0)'; // Отключено - вызывает translateZ
      element.style.backfaceVisibility = 'hidden';
      // element.style.transformStyle = 'preserve-3d';
      // element.style.willChange = 'transform'; // Отключено - вызывает translateZ
      element.style.contain = 'paint style';
    };

    // Применяем оптимизации к контейнеру
    applyPerformanceOptimizations(containerRef.current);

    // Находим все изображения и блоки каруселей внутри
    const images = containerRef.current.querySelectorAll('img, [style*="background-image"], div[class*="slide"], div[class*="carousel"], div[class*="usp"], div[class*="photo"]');
    images.forEach(img => {
      img.style.imageRendering = 'auto';
      if (img.tagName === 'IMG') {
        img.loading = 'eager';
        img.decoding = 'sync'; // Синхронная декодировка для мгновенного отображения
      }
      
      // Принудительно делаем все изображения видимыми БЕЗ анимаций
      img.style.opacity = '1';
      img.style.visibility = 'visible';
      img.style.display = 'block';
      
      // Убираем все возможные задержки
      img.style.animationDelay = '0s';
      img.style.transitionDelay = '0s';
      img.style.animation = 'none';
      img.style.transition = 'none';
    });

    // Дополнительно обрабатываем все элементы каруселей
    const carouselElements = containerRef.current.querySelectorAll('[class*="slide"], [class*="carousel"], [class*="usp"]');
    carouselElements.forEach(element => {
      element.style.opacity = '1';
      element.style.visibility = 'visible';
      element.style.display = 'block';
      element.style.animation = 'none';
      element.style.transition = 'none';
      element.style.animationDelay = '0s';
      element.style.transitionDelay = '0s';
    });

    // Отключаем heavy-weight эффекты на мобильных
    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    if (isMobile) {
      containerRef.current.style.willChange = 'auto';
      // На мобильных устройствах делаем все еще более агрессивно видимым
      const allElements = containerRef.current.querySelectorAll('*');
      allElements.forEach(element => {
        if (element.style.opacity !== undefined) {
          element.style.opacity = '1';
          element.style.visibility = 'visible';
          element.style.animation = 'none';
          element.style.transition = 'none';
        }
      });
    }
  }, []);

  return (
    <div ref={containerRef} style={{
      // transform: 'translate3d(0,0,0)', // Отключено - вызывает translateZ
      backfaceVisibility: 'hidden',
      // perspective: '1000'
    }}>
      {children}
    </div>
  );
};

export default PerformanceOptimizer;
