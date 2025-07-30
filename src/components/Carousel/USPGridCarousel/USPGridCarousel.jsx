import React, { useEffect, useRef, useMemo } from 'react';
import { useMediaPreloader } from '../../MediaPreloader/MediaPreloader';
import { useImageRetention } from '../../../hooks/useImageRetention';
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
      // Принудительная оптимизация рендеринга
      const section = sectionRef.current;
      const container = containerRef.current;
      
      // Применяем GPU ускорение к секции
      section.style.transform = 'translateZ(0)';
      section.style.backfaceVisibility = 'hidden';
      section.style.willChange = 'transform';
      section.style.contain = 'paint layout';

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
      <div className={styles["usp5-non-scroll-container"]} id='advantages'>
        <USPGridSlide1 />
        <USPGridSlide2 />
        <USPGridSlide3 />
        <USPGridSlide4 />
        <USPGridSlide5 />
      </div>
    </section>
  );
};

export default USPGridCarousel;