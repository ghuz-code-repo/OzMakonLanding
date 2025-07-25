import React, { useEffect, useRef } from 'react';
import USPGridSlide1 from '../USPGridSlide1/USPGridSlide1';
import USPGridSlide2 from '../USPGridSlide2/USPGridSlide2';
import USPGridSlide3 from '../USPGridSlide3/USPGridSlide3';
import USPGridSlide4 from '../USPGridSlide4/USPGridSlide4';
import USPGridSlide5 from '../USPGridSlide5/USPGridSlide5';
import styles from './USPGridCarousel.module.css';

const USPGridCarousel = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    // Точная оптимизация против дерганья в середине
    const eliminateJitter = () => {
      if (sectionRef.current) {
        console.log('🎯 Устраняем дерганье в середине карусели...');
        
        const section = sectionRef.current;
        
        // 1. Суперточная оптимизация секции
        section.style.willChange = 'transform';
        section.style.transform = 'translate3d(0, 0, 0)';
        section.style.backfaceVisibility = 'hidden';
        section.style.contain = 'layout style paint';
        section.style.isolation = 'isolate';
        // КРИТИЧНО для устранения дерганья
        section.style.position = 'relative';
        section.style.zIndex = '0';
        
        // 2. Оптимизируем контейнер с фиксацией позиции
        const container = section.querySelector('[id="advantages"]');
        if (container) {
          container.style.willChange = 'transform';
          container.style.transform = 'translate3d(0, 0, 0)';
          container.style.backfaceVisibility = 'hidden';
          container.style.contain = 'layout style paint';
          container.style.isolation = 'isolate';
          container.style.position = 'relative';
          container.style.zIndex = '1';
          // КРИТИЧНО: фиксируем высоту контейнера
          container.style.minHeight = 'auto';
          container.style.height = 'auto';
        }

        // 3. КРИТИЧНО: устраняем дерганье в каждом слайде
        const slides = section.querySelectorAll('[class*="usp5__container"]');
        slides.forEach((slide, index) => {
          slide.style.willChange = 'transform';
          slide.style.transform = 'translate3d(0, 0, 0)';
          slide.style.backfaceVisibility = 'hidden';
          slide.style.contain = 'layout style paint';
          slide.style.isolation = 'isolate';
          slide.style.position = 'relative';
          slide.style.zIndex = '2';
          
          // КРИТИЧНО: фиксируем размеры слайдов
          slide.style.width = '100%';
          slide.style.maxWidth = '1700px';
          slide.style.minHeight = 'auto';
          slide.style.height = 'auto';
          slide.style.overflow = 'visible';
          
          // 4. Оптимизируем все элементы внутри слайда
          const allElements = slide.querySelectorAll('*');
          allElements.forEach(element => {
            // Проверяем, есть ли у элемента изображения
            const hasBackground = window.getComputedStyle(element).backgroundImage !== 'none';
            const isImage = element.tagName === 'IMG';
            const hasImageClass = element.className && 
              (element.className.includes('img') || 
               element.className.includes('photo') ||
               element.className.includes('image'));
            
            if (hasBackground || isImage || hasImageClass) {
              element.style.willChange = 'transform';
              element.style.transform = 'translate3d(0, 0, 0)';
              element.style.backfaceVisibility = 'hidden';
              element.style.contain = 'layout style paint';
              element.style.imageRendering = '-webkit-optimize-contrast';
              
              // КРИТИЧНО: устраняем эффекты, вызывающие дерганье
              element.style.filter = 'none';
              element.style.transition = 'none';
              element.style.animation = 'none';
              
              if (isImage) {
                element.loading = 'eager';
                element.decoding = 'sync';
              }
            }
          });
          
          console.log(`🔧 Слайд ${index + 1}: дерганье устранено`);
        });

        // 5. Принудительный reflow для применения всех изменений
        section.offsetHeight;
        container?.offsetHeight;
        
        // 6. Дополнительная блокировка через CSS
        const antiJitterCSS = document.createElement('style');
        antiJitterCSS.textContent = `
          #advantages {
            transform: translate3d(0, 0, 0) !important;
            contain: layout style paint !important;
            isolation: isolate !important;
          }
          
          #advantages * {
            backface-visibility: hidden !important;
          }
          
          #advantages [class*="usp5__container"] {
            transform: translate3d(0, 0, 0) !important;
            contain: layout style paint !important;
            isolation: isolate !important;
          }
          
          #advantages [style*="background-image"],
          #advantages img,
          #advantages [class*="img"],
          #advantages [class*="photo"] {
            transform: translate3d(0, 0, 0) !important;
            backface-visibility: hidden !important;
            filter: none !important;
            transition: none !important;
            animation: none !important;
          }
        `;
        document.head.appendChild(antiJitterCSS);
        
        console.log('✅ Дерганье в середине карусели УСТРАНЕНО');
        
        // 7. Отключаем will-change через 8 секунд для экономии памяти
        setTimeout(() => {
          section.style.willChange = 'auto';
          if (container) container.style.willChange = 'auto';
          slides.forEach(slide => {
            slide.style.willChange = 'auto';
            const elements = slide.querySelectorAll('*');
            elements.forEach(el => {
              if (el.style.willChange === 'transform') {
                el.style.willChange = 'auto';
              }
            });
          });
          console.log('🔧 will-change отключен для экономии памяти');
        }, 8000);
      }
    };

    // Проверяем предзагрузку изображений карусели
    const checkImagePreloading = () => {
      console.log('🔍 Проверяем предзагрузку изображений карусели...');
      
      // Список всех изображений карусели
      const carouselImages = [
        '/src/assets/img/UniqueSellingPropositionsGrid5/slide1/sports.webp',
        '/src/assets/img/UniqueSellingPropositionsGrid5/slide1/kids_room.webp',
        '/src/assets/img/UniqueSellingPropositionsGrid5/slide1/eagle_view.webp',
        '/src/assets/img/UniqueSellingPropositionsGrid5/slide1/front_view.webp',
        '/src/assets/img/UniqueSellingPropositionsGrid5/slide1/bbq.webp',
        '/src/assets/img/UniqueSellingPropositionsGrid5/slide2/enter.webp',
        '/src/assets/img/UniqueSellingPropositionsGrid5/slide2/lift.webp',
        '/src/assets/img/UniqueSellingPropositionsGrid5/slide2/hall.webp',
        '/src/assets/img/UniqueSellingPropositionsGrid5/slide2/komnata.webp',
        '/src/assets/img/UniqueSellingPropositionsGrid5/slide2/coffe_table.webp',
        '/src/assets/img/UniqueSellingPropositionsGrid5/slide3/2b-garage.webp',
        '/src/assets/img/UniqueSellingPropositionsGrid5/slide3/electro_zaryad.webp',
        '/src/assets/img/UniqueSellingPropositionsGrid5/slide3/usiliteli.webp',
        '/src/assets/img/UniqueSellingPropositionsGrid5/slide3/parking_big.webp',
      ];

      // Проверяем кэш изображений
      let preloadedCount = 0;
      carouselImages.forEach(imagePath => {
        // Проверяем есть ли изображение в кэше браузера
        const img = new Image();
        img.onload = () => {
          preloadedCount++;
          if (preloadedCount === carouselImages.length) {
            console.log('✅ ВСЕ изображения карусели предзагружены!');
          }
        };
        img.onerror = () => {
          console.warn('❌ Изображение не предзагружено:', imagePath);
        };
        img.src = imagePath;
      });
    };

    // Применяем антидерганье немедленно и несколько раз
    eliminateJitter();
    const timer1 = setTimeout(eliminateJitter, 50);
    const timer2 = setTimeout(eliminateJitter, 200);
    const timer3 = setTimeout(eliminateJitter, 500);

    // Запускаем проверку через секунду после монтирования
    const checkTimer = setTimeout(checkImagePreloading, 1000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(checkTimer);
    };
  }, []);

  return (
    <section className={styles["usp5-section"]} ref={sectionRef}>
      <div className={styles["usp5-non-scroll-container"]} id='advantages'> 
        <USPGridSlide1/>
        <USPGridSlide2/>
        <USPGridSlide3/>
        <USPGridSlide4/>
        <USPGridSlide5/>
      </div>
    </section>
  );
};

export default USPGridCarousel;