import React, { useEffect, useState } from 'react';
import { useMediaPreloader } from './MediaPreloader';
import { generateMediaConfig } from '../../utils/mediaConfigGenerator';
import './MediaPreloader.css';

const MediaInitializer = ({ children }) => {
  const { loadImageGroup, setIsInitialLoadComplete } = useMediaPreloader();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initializeMediaLoading = async () => {
      try {
        // Получаем конфигурацию медиафайлов
        const MEDIA_CONFIG = generateMediaConfig();
        
        // 1. Загружаем критические медиафайлы в приоритетном порядке
        console.log('Загружаем критические медиафайлы...');
        await loadImageGroup('Критические', MEDIA_CONFIG.critical.urls, true);
        
        // 2. Показываем сайт пользователю
        setIsLoading(false);
        setIsInitialLoadComplete(true);
        
        // 3. Запускаем фоновую загрузку остальных медиафайлов
        console.log('Запускаем фоновую загрузку...');
        
        // Небольшая задержка для улучшения пользовательского опыта
        setTimeout(() => {
          loadImageGroup('Карусель', MEDIA_CONFIG.carousel.urls, false);
        }, 100);
        
        setTimeout(() => {
          loadImageGroup('Планировки', MEDIA_CONFIG.apartments.urls, false);
        }, 500);
        
        setTimeout(() => {
          loadImageGroup('Места рядом', MEDIA_CONFIG.places.urls, false);
        }, 1000);
        
        setTimeout(() => {
          loadImageGroup('Локация', MEDIA_CONFIG.location.urls, false);
        }, 1500);
        
      } catch (error) {
        console.error('Ошибка при загрузке критических медиафайлов:', error);
        // Показываем сайт даже при ошибке, чтобы не блокировать пользователя
        setIsLoading(false);
        setIsInitialLoadComplete(true);
      }
    };

    initializeMediaLoading();
  }, [loadImageGroup, setIsInitialLoadComplete]);

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
        <div style={{
          width: '60px',
          height: '60px',
          border: '4px solid rgba(255, 255, 255, 0.3)',
          borderTop: '4px solid white',
          borderRadius: '50%',
          marginBottom: '20px'
        }} className="media-spinner" />
        <h2 style={{ margin: '0 0 10px 0', fontSize: '24px' }}>Загрузка...</h2>
        <p style={{ margin: 0, fontSize: '16px', opacity: 0.8 }}>
          Подготавливаем контент для вас
        </p>
        <style jsx>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  return children;
};

export default MediaInitializer;
