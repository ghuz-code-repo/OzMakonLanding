import React, { useEffect, useState, useRef } from 'react';
import { useMediaPreloader } from './MediaPreloader';
import { generateMediaConfig } from '../../utils/mediaConfigGenerator';
import './MediaPreloader.css';

const MediaInitializer = ({ children }) => {
  const { loadImageGroup, setIsInitialLoadComplete } = useMediaPreloader();
  const [isLoading, setIsLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);
  const initializationStarted = useRef(false);

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

        // Загружаем критические файлы и первый слайд параллельно
        await Promise.all([
          loadImageGroup('Критические', MEDIA_CONFIG.critical.urls, true),
          loadImageGroup('Первый слайд', firstSlideUrls, true)
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
        
        // Загружаем все остальные группы одновременно
        Promise.all([
          // Загружаем оставшиеся слайды карусели
          MEDIA_CONFIG.carousel.urls.length > 0 && 
            loadImageGroup('Карусель', MEDIA_CONFIG.carousel.urls, true),
          
          // Загружаем планировки
          MEDIA_CONFIG.apartments.urls.length > 0 && 
            loadImageGroup('Планировки', MEDIA_CONFIG.apartments.urls, true),
          
          // Загружаем места рядом
          MEDIA_CONFIG.places.urls.length > 0 && 
            loadImageGroup('Места рядом', MEDIA_CONFIG.places.urls, true),
          
          // Загружаем локацию
          MEDIA_CONFIG.location.urls.length > 0 && 
            loadImageGroup('Локация', MEDIA_CONFIG.location.urls, true)
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
        <div style={{ 
          opacity: 1, // Нет transition, сразу показываем
          contain: 'layout style paint',
          willChange: 'auto'
        }}>
          {children}
        </div>
      )}
    </>
  );
};

export default MediaInitializer;
