import React, { useEffect, useRef, useMemo } from 'react';
import { useMediaPreloader } from '../../MediaPreloader/MediaPreloader';
import { useImageRetention } from '../../../hooks/useImageRetention';
import PerformanceOptimizer from '../../../components/PerformanceOptimizer/PerformanceOptimizer';
import styles from './USPGridCarousel.module.css';
import USPGridSlide1 from '../USPGridSlide1/USPGridSlide1';
import USPGridSlide2 from '../USPGridSlide2/USPGridSlide2';
import USPGridSlide3 from '../USPGridSlide3/USPGridSlide3';
import USPGridSlide4 from '../USPGridSlide4/USPGridSlide4';
import USPGridSlide5 from '../USPGridSlide5/USPGridSlide5';

const USPGridCarousel = () => {
  const sectionRef = useRef(null);
  const containerRef = useRef(null);
  const { isLoading, imageCache } = useMediaPreloader();
  
  // Применяем базовые стили для контейнеров при монтировании
  useEffect(() => {
    if (sectionRef.current) {
      sectionRef.current.style.cssText = `
        max-width: 100vw;
        overflow: hidden;
        display: flex;
        align-items: center;
        justify-content: center;
        transform: translate3d(0,0,0);
        backface-visibility: hidden;
        transform-style: preserve-3d;
        will-change: transform;
      `;
    }
    if (containerRef.current) {
      containerRef.current.style.cssText = `
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        transform: translate3d(0,0,0);
        backface-visibility: hidden;
        transform-style: preserve-3d;
        will-change: transform;
      `;
    }
  }, []);

  // Собираем все пути к изображениям карусели
  const carouselImages = useMemo(() => {
    return Object.keys(imageCache).filter(path => 
      path.includes('UniqueSellingPropositionsGrid5') || 
      path.includes('USPGrid')
    );
  }, [imageCache]);

  // Используем хук для удержания изображений в памяти
  const imagesRef = useImageRetention(carouselImages);

  useEffect(() => {
    if (!isLoading && sectionRef.current) {
      const section = sectionRef.current;
      const container = containerRef.current;
      
      // Применяем GPU-ускорение и оптимизации производительности
      const applyOptimizations = (element) => {
        element.style.transform = 'translate3d(0,0,0)';
        element.style.backfaceVisibility = 'hidden';
        element.style.perspective = '1000';
        element.style.willChange = 'transform';
        element.style.contain = 'content';
        element.style.isolation = 'isolate';
      };

      // Оптимизируем основной контейнер
      applyOptimizations(section);

      // Применяем оптимизации к контейнеру
      if (container) {
        container.style.transform = 'translateZ(0)';
        container.style.backfaceVisibility = 'hidden';
        container.style.willChange = 'transform';
        container.style.contain = 'paint layout';
      }
      
      // Оптимизируем все слайды
      const slides = section.querySelectorAll('[class*="usp5__container"]');
      slides.forEach(slide => {
        slide.style.transform = 'translateZ(0)';
        slide.style.backfaceVisibility = 'hidden';
        slide.style.willChange = 'transform';
        slide.style.contain = 'paint layout';
      });

      // Предзагружаем все изображения в слайдах
      const images = section.querySelectorAll('img');
      images.forEach(img => {
        img.loading = 'eager';
        img.decoding = 'sync';
        img.style.contain = 'paint layout';
      });
    }

    // Cleanup function
    return () => {
      if (sectionRef.current) {
        const section = sectionRef.current;
        section.style.transform = '';
        section.style.backfaceVisibility = '';
        section.style.willChange = '';
        section.style.contain = '';
      }
    };
  }, [isLoading]);

  if (isLoading) {
    return null; // Или показать прелоадер
  }

  return (
    <section className={styles["usp5-section"]} ref={sectionRef}>
      <div className={styles["usp5-non-scroll-container"]} ref={containerRef} id='advantages'>
        <PerformanceOptimizer>
          <USPGridSlide1 />
        </PerformanceOptimizer>
        <PerformanceOptimizer>
          <USPGridSlide2 />
        </PerformanceOptimizer>
        <PerformanceOptimizer>
          <USPGridSlide3 />
        </PerformanceOptimizer>
        <PerformanceOptimizer>
          <USPGridSlide4 />
        </PerformanceOptimizer>
        <PerformanceOptimizer>
          <USPGridSlide5 />
        </PerformanceOptimizer>
      </div>
    </section>
  );
};

export default USPGridCarousel;