import React, { useEffect, useRef } from 'react';

const PerformanceOptimizer = ({ children }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Применяем оптимизации производительности
    const applyPerformanceOptimizations = (element) => {
      // Оптимизации без влияния на размеры
      element.style.transform = 'translate3d(0,0,0)';
      element.style.backfaceVisibility = 'hidden';
      element.style.transformStyle = 'preserve-3d';
      element.style.willChange = 'transform';
      element.style.contain = 'paint style';
    };

    // Применяем оптимизации к контейнеру
    applyPerformanceOptimizations(containerRef.current);

    // Находим все изображения внутри
    const images = containerRef.current.querySelectorAll('img, [style*="background-image"]');
    images.forEach(img => {
      img.style.imageRendering = 'auto';
      img.loading = 'eager';
      img.decoding = 'async';
      
      // Добавляем плавное появление
      img.style.opacity = '0';
      img.style.transition = 'opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
      
      if (img.complete) {
        img.style.opacity = '1';
      } else {
        img.onload = () => {
          requestAnimationFrame(() => {
            img.style.opacity = '1';
          });
        };
      }
    });

    // Отключаем heavy-weight эффекты на мобильных
    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    if (isMobile) {
      containerRef.current.style.willChange = 'auto';
      images.forEach(img => {
        img.style.transition = 'none';
      });
    }
  }, []);

  return (
    <div ref={containerRef} style={{
      transform: 'translate3d(0,0,0)',
      backfaceVisibility: 'hidden',
      perspective: '1000'
    }}>
      {children}
    </div>
  );
};

export default PerformanceOptimizer;
