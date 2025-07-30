import React, { useState, useEffect, useRef } from 'react';
import { useMediaPreloader } from '../MediaPreloader/MediaPreloader';
import './NoTransitions.css';
// import '../MediaPreloader/MediaPreloader.css';

const CachedImage = ({ 
  src, 
  alt, 
  className, 
  style,
  fallbackSrc = null,
  onLoad = () => {},
  onError = () => {},
  priority = false, // больше не используется, всегда грузим сразу
  ...props 
}) => {
  const { getCachedImage } = useMediaPreloader();
  const [imageSrc, setImageSrc] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const imageRef = useRef(null);

  useEffect(() => {
    let isMounted = true;

    const loadImage = () => {

      const cachedImage = getCachedImage(src);
      
      if (cachedImage && isMounted) {
        setImageSrc(src);
        setIsLoaded(true);
        onLoad();
        return;
      }

      const img = new Image();
      img.loading = 'eager'; // Всегда используем eager loading
      img.decoding = 'sync'; // Всегда используем синхронное декодирование

      img.onload = () => {
        if (isMounted) {
          setImageSrc(src);
          setIsLoaded(true);
          onLoad();
        }
      };

      img.onerror = () => {
        if (isMounted) {
          setHasError(true);
          if (fallbackSrc) {
            setImageSrc(fallbackSrc);
          }
          onError();
        }
      };

      // Немедленно загружаем изображение
      img.src = src;
    };

    // Always load image immediately when src is available
    if (src) {
      loadImage();
    }

    return () => {
      isMounted = false;
    };
  }, [src, getCachedImage, fallbackSrc, onLoad, onError, priority]);

  // Всегда возвращаем изображение, даже во время загрузки
  if (!hasError) {
    return (
      <img
        ref={imageRef}
        src={src} // Используем оригинальный src для предварительной загрузки
        alt={alt}
        className={className}
        style={{
          ...style,
          visibility: 'visible',
          opacity: 1
        }}
        loading="eager"
        decoding="sync"
        {...props}
      />
    );
  }

  if (hasError && !fallbackSrc) {
    return (
      <div
        ref={imageRef}
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
      ref={imageRef}
      src={imageSrc || src}
      alt={alt}
      className={className}
      style={{
        ...style,
        visibility: 'visible',
        opacity: 1
      }}
      loading="eager"
      decoding="sync"
      {...props}
    />
  );
};

export default CachedImage;
