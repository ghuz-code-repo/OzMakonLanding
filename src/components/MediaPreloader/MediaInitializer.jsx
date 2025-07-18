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
        
        // 1. Загружаем только самые критические файлы
        console.log('🚀 Загружаем критические медиафайлы...');
        if (MEDIA_CONFIG.critical.urls.length > 0) {
          await loadImageGroup('Критические', MEDIA_CONFIG.critical.urls, true);
        }
        
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
        
        // 5. Запускаем фоновую загрузку остальных медиафайлов параллельно и быстро
        console.log('🔄 Запускаем фоновую загрузку...');
        
        // Карусель загружаем немедленно (пользователь может быстро прокрутить)
        setTimeout(() => {
          if (MEDIA_CONFIG.carousel.urls.length > 0) {
            console.log(`🎠 Загружаем карусель: ${MEDIA_CONFIG.carousel.urls.length} файлов`);
            loadImageGroup('Карусель', MEDIA_CONFIG.carousel.urls, false);
          }
        }, 10);
        
        // Планировки загружаем очень быстро
        setTimeout(() => {
          if (MEDIA_CONFIG.apartments.urls.length > 0) {
            console.log(`🏠 Загружаем планировки: ${MEDIA_CONFIG.apartments.urls.length} файлов`);
            loadImageGroup('Планировки', MEDIA_CONFIG.apartments.urls, false);
          }
        }, 50);
        
        // Места рядом - быстро
        setTimeout(() => {
          if (MEDIA_CONFIG.places.urls.length > 0) {
            console.log(`📍 Загружаем места рядом: ${MEDIA_CONFIG.places.urls.length} файлов`);
            loadImageGroup('Места рядом', MEDIA_CONFIG.places.urls, false);
          }
        }, 100);
        
        // Локация - чуть позже
        setTimeout(() => {
          if (MEDIA_CONFIG.location.urls.length > 0) {
            console.log(`🗺️ Загружаем локацию: ${MEDIA_CONFIG.location.urls.length} файлов`);
            loadImageGroup('Локация', MEDIA_CONFIG.location.urls, false);
          }
        }, 150);
        
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
          opacity: showContent ? 1 : 0,
          transition: 'opacity 0.3s ease-in'
        }}>
          {children}
        </div>
      )}
    </>
  );
};

export default MediaInitializer;
