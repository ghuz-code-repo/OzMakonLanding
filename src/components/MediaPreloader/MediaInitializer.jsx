import React, { useEffect, useState, useRef } from 'react';
import { useMediaPreloader } from './MediaPreloader';
import { generateMediaConfig } from '../../utils/mediaConfigGenerator';
import { getAllImagePaths } from '../../utils/completeMediaScanner';
import './MediaPreloader.css';


const MediaInitializer = ({ children }) => {
  const { loadImageGroup, setIsInitialLoadComplete } = useMediaPreloader();
  const [isLoading, setIsLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);
  const initializationStarted = useRef(false);

  // Функция для преобразования путей в объекты с path и url
  const convertPathsToObjects = (paths) => {
    const allImages = getAllImagePaths();
    const imageMap = Object.fromEntries(allImages.map(img => [img.path, img]));
    
    return paths.map(path => {
      const imageObj = imageMap[path];
      if (imageObj) {
        return imageObj;
      } else {
        console.warn(`Image not found in preloader cache: ${path}`);
        return { path, url: path }; // fallback
      }
    });
  };

  useEffect(() => {
    // Предотвращаем повторную инициализацию
    if (initializationStarted.current) {
      console.log('⚠️ Инициализация уже запущена, пропускаем...');
      return;
    }
    
    initializationStarted.current = true;

    const initializeMediaLoading = async () => {
      try {
        // Получаем конфигурацию медиафайлов
        const MEDIA_CONFIG = generateMediaConfig();
        console.log('📋 Конфигурация медиафайлов:', MEDIA_CONFIG);
        console.log('📊 Статистика загрузки:');
        console.log(`   - Критические: ${MEDIA_CONFIG.critical.urls.length} файлов`);
        console.log(`   - Карусель: ${MEDIA_CONFIG.carousel.urls.length} файлов`);
        console.log(`   - Планировки: ${MEDIA_CONFIG.apartments.urls.length} файлов`);
        console.log(`   - Места рядом: ${MEDIA_CONFIG.places.urls.length} файлов`);
        console.log(`   - Локация: ${MEDIA_CONFIG.location.urls.length} файлов`);
        console.log(`   - ВСЕГО: ${MEDIA_CONFIG.critical.urls.length + MEDIA_CONFIG.carousel.urls.length + MEDIA_CONFIG.apartments.urls.length + MEDIA_CONFIG.places.urls.length + MEDIA_CONFIG.location.urls.length} файлов`);
        
        // 1. Загружаем критические файлы и первый слайд ОДНОВРЕМЕННО
        console.log('🚀 Загружаем критические медиафайлы и первый слайд...');
        
        // Разделяем карусель на первый слайд и остальные
        const firstSlideUrls = MEDIA_CONFIG.carousel.urls.filter(url => 
          url.includes('UniqueSellingPropositionsGrid5/slide1/') || 
          url.includes('USPGridSlide1/')
        );
        const otherSlideUrls = MEDIA_CONFIG.carousel.urls.filter(url => 
          !url.includes('UniqueSellingPropositionsGrid5/slide1/') && 
          !url.includes('USPGridSlide1/')
        );

        // Преобразуем пути в объекты для загрузки
        const criticalObjects = convertPathsToObjects(MEDIA_CONFIG.critical.urls);
        const firstSlideObjects = convertPathsToObjects(firstSlideUrls);

        // Загружаем критические файлы и первый слайд параллельно
        await Promise.all([
          loadImageGroup('Критические', criticalObjects, true),
          loadImageGroup('Первый слайд', firstSlideObjects, true)
        ]);

        // Теперь обновляем конфигурацию карусели
        MEDIA_CONFIG.carousel.urls = otherSlideUrls;
        
        // 2. Убираем HTML-лоадер
        const htmlPreloader = document.getElementById('instant-preloader');
        if (htmlPreloader) {
          htmlPreloader.classList.add('fade-out');
          setTimeout(() => {
            htmlPreloader.style.display = 'none';
          }, 500);
        }
        
        // 3. Показываем React-контент
        setIsLoading(false);
        console.log('✅ Убираем лоадер, показываем сайт');
        
        // 4. Небольшая задержка перед показом контента для плавности
        setTimeout(() => {
          setShowContent(true);
          setIsInitialLoadComplete(true);
          console.log('✅ Сайт полностью готов к использованию');
        }, 200);
        
        // 5. Загружаем все остальные медиафайлы ОДНОВРЕМЕННО и максимально быстро
        console.log('🔄 Запускаем параллельную загрузку всех оставшихся файлов...');
        
        // Преобразуем оставшиеся пути в объекты
        const carouselObjects = convertPathsToObjects(otherSlideUrls);
        const apartmentsObjects = convertPathsToObjects(MEDIA_CONFIG.apartments.urls);
        const placesObjects = convertPathsToObjects(MEDIA_CONFIG.places.urls);
        const locationObjects = convertPathsToObjects(MEDIA_CONFIG.location.urls);
        
        // Загружаем все остальные группы одновременно
        Promise.all([
          // Загружаем оставшиеся слайды карусели
          carouselObjects.length > 0 && 
            loadImageGroup('Карусель', carouselObjects, true),
          
          // Загружаем планировки
          apartmentsObjects.length > 0 && 
            loadImageGroup('Планировки', apartmentsObjects, true),
          
          // Загружаем места рядом
          placesObjects.length > 0 && 
            loadImageGroup('Места рядом', placesObjects, true),
          
          // Загружаем локацию
          locationObjects.length > 0 && 
            loadImageGroup('Локация', locationObjects, true)
        ].filter(Boolean));
        
      } catch (error) {
        console.error('❌ Ошибка при загрузке критических медиафайлов:', error);
        // Убираем HTML-лоадер даже при ошибке
        const htmlPreloader = document.getElementById('instant-preloader');
        if (htmlPreloader) {
          htmlPreloader.classList.add('fade-out');
          setTimeout(() => {
            htmlPreloader.style.display = 'none';
          }, 500);
        }
        
        // Показываем сайт даже при ошибке, чтобы не блокировать пользователя
        setIsLoading(false);
        setTimeout(() => {
          setShowContent(true);
          setIsInitialLoadComplete(true);
        }, 200);
      }
    };

    initializeMediaLoading();
  }, []); // Пустые зависимости - запускается только один раз

  return (
    <>
      {/* Основной контент - показываем после завершения загрузки критических файлов */}
      {showContent && (
        <div className={"mediaInitializerContent"} >
          {children}
        </div>
      )}
    </>
  );
};

export default MediaInitializer;
