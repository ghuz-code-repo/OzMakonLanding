import React, { useEffect, useState, useRef } from 'react';
import { useMediaPreloader } from './MediaPreloader';
import { generateMediaConfig } from '../../utils/mediaConfigGenerator';
import './MediaPreloader.css';

const MediaInitializer = ({ children }) => {
  const { loadImageGroup, setIsInitialLoadComplete } = useMediaPreloader();
  const [isLoading, setIsLoading] = useState(true);
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
        
        // 1. Загружаем критические медиафайлы в приоритетном порядке
        console.log('🚀 Загружаем критические медиафайлы...');
        if (MEDIA_CONFIG.critical.urls.length > 0) {
          await loadImageGroup('Критические', MEDIA_CONFIG.critical.urls, true);
        }
        
        // 2. Показываем сайт пользователю
        setIsLoading(false);
        setIsInitialLoadComplete(true);
        console.log('✅ Сайт готов к показу пользователю');
        
        // 3. Запускаем фоновую загрузку остальных медиафайлов
        console.log('🔄 Запускаем фоновую загрузку...');
        
        // Небольшая задержка для улучшения пользовательского опыта
        setTimeout(() => {
          if (MEDIA_CONFIG.carousel.urls.length > 0) {
            console.log(`🎠 Загружаем карусель: ${MEDIA_CONFIG.carousel.urls.length} файлов`);
            loadImageGroup('Карусель', MEDIA_CONFIG.carousel.urls, false);
          }
        }, 100);
        
        setTimeout(() => {
          if (MEDIA_CONFIG.apartments.urls.length > 0) {
            console.log(`🏠 Загружаем планировки: ${MEDIA_CONFIG.apartments.urls.length} файлов`);
            loadImageGroup('Планировки', MEDIA_CONFIG.apartments.urls, false);
          }
        }, 500);
        
        setTimeout(() => {
          if (MEDIA_CONFIG.places.urls.length > 0) {
            console.log(`📍 Загружаем места рядом: ${MEDIA_CONFIG.places.urls.length} файлов`);
            loadImageGroup('Места рядом', MEDIA_CONFIG.places.urls, false);
          }
        }, 1000);
        
        setTimeout(() => {
          if (MEDIA_CONFIG.location.urls.length > 0) {
            console.log(`🗺️ Загружаем локацию: ${MEDIA_CONFIG.location.urls.length} файлов`);
            loadImageGroup('Локация', MEDIA_CONFIG.location.urls, false);
          }
        }, 1500);
        
      } catch (error) {
        console.error('❌ Ошибка при загрузке критических медиафайлов:', error);
        // Показываем сайт даже при ошибке, чтобы не блокировать пользователя
        setIsLoading(false);
        setIsInitialLoadComplete(true);
      }
    };

    initializeMediaLoading();
  }, []); // Пустые зависимости - запускается только один раз

  // Экран загрузки
  if (isLoading) {
    return (
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 10000,
        color: 'white'
      }}>
        <div 
          style={{
            width: '60px',
            height: '60px',
            border: '4px solid rgba(255, 255, 255, 0.3)',
            borderTop: '4px solid white',
            borderRadius: '50%',
            marginBottom: '20px',
            animation: 'spin 1s linear infinite'
          }} 
          className="media-spinner" 
        />
        <h2 style={{ margin: '0 0 10px 0', fontSize: '24px' }}>Загрузка...</h2>
        <p style={{ margin: 0, fontSize: '16px', opacity: 0.8 }}>
          Подготавливаем контент для вас
        </p>
      </div>
    );
  }

  return children;
};

export default MediaInitializer;
