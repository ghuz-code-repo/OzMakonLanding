import React, { useState, useEffect } from 'react';
import { useMediaPreloader } from '../MediaPreloader/MediaPreloader';
import '../MediaPreloader/MediaPreloader.css';

const CachedImage = ({ 
  src, 
  alt, 
  className, 
  style,
  fallbackSrc = null,
  onLoad = () => {},
  onError = () => {},
  ...props 
}) => {
  const { getCachedImage } = useMediaPreloader();
  const [imageSrc, setImageSrc] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const loadImage = () => {
      // Сначала пробуем получить из кеша
      const cachedImage = getCachedImage(src);
      
      if (cachedImage) {
        setImageSrc(src);
        setIsLoaded(true);
        onLoad();
        return;
      }

      // Если нет в кеше, загружаем обычным способом
      const img = new Image();
      img.onload = () => {
        setImageSrc(src);
        setIsLoaded(true);
        onLoad();
      };
      img.onerror = () => {
        setHasError(true);
        if (fallbackSrc) {
          setImageSrc(fallbackSrc);
        }
        onError();
      };
      img.src = src;
    };

    if (src) {
      loadImage();
    }
  }, [src, getCachedImage, fallbackSrc, onLoad, onError]);

  // Показываем placeholder пока изображение не загружено
  if (!isLoaded && !hasError) {
    return (
      <div
        className={`${className} media-shimmer`}
        style={{
          ...style,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#999',
          fontSize: '12px'
        }}
        {...props}
      >
        Загрузка...
      </div>
    );
  }

  // Показываем fallback если есть ошибка и нет fallback изображения
  if (hasError && !fallbackSrc) {
    return (
      <div
        className={className}
        style={{
          ...style,
          background: '#f5f5f5',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#999',
          fontSize: '12px'
        }}
        {...props}
      >
        Изображение недоступно
      </div>
    );
  }

  return (
    <img
      src={imageSrc}
      alt={alt}
      className={className}
      style={style}
      {...props}
    />
  );
};

export default CachedImage;
