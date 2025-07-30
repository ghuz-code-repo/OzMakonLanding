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
        
        // 1. Разделяем все медиафайлы на приоритетные группы
        console.log('🚀 Инициализация умной загрузки медиафайлов...');
        
        // Группа 1: Критически важные файлы (логотип, фон хедера)
        const criticalFiles = MEDIA_CONFIG.critical.urls;
        
        // Группа 2: Файлы первого экрана
        const firstScreenUrls = [
          ...MEDIA_CONFIG.carousel.urls.filter(url => 
            url.includes('UniqueSellingPropositionsGrid5/slide1/') || 
            url.includes('USPGridSlide1/')
          ),
          ...MEDIA_CONFIG.hero.urls || []
        ];
        
        // Группа 3: Файлы, видимые при первом скролле
        const firstScrollUrls = [
          ...MEDIA_CONFIG.location.urls || [],
          ...MEDIA_CONFIG.places.urls.slice(0, 3) || [] // Только первые 3 изображения
        ];
        
        // Остальные файлы
        const otherUrls = MEDIA_CONFIG.carousel.urls.filter(url => 
          !url.includes('UniqueSellingPropositionsGrid5/slide1/') && 
          !url.includes('USPGridSlide1/')
        );

        // Умная последовательная загрузка
        // 1. Сначала загружаем только критические файлы
        await loadImageGroup('Критические файлы', criticalFiles, true);
        
        // Показываем сайт сразу после загрузки критических файлов
        setIsLoading(false);
        setShowContent(true);
        
        // 2. Загружаем файлы первого экрана
        await loadImageGroup('Первый экран', firstScreenUrls, true);
        
        // 3. Параллельно загружаем файлы первого скролла и остальные
        await Promise.all([
          loadImageGroup('Первый скролл', firstScrollUrls, true),
          loadImageGroup('Остальные файлы', otherUrls, false)
        ]);

        // Обновляем конфигурацию карусели
        MEDIA_CONFIG.carousel.urls = otherUrls;
        
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
        <div className={"mediaInitializerContent"} >
          {children}
        </div>
      )}
    </>
  );
};

export default MediaInitializer;
