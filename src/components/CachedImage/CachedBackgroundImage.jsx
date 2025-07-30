import React, { useRef, useEffect, useState } from 'react';
import { useMediaPreloader } from '../MediaPreloader/MediaPreloader';

const CachedBackgroundImage = ({ 
  src, 
  className = '', 
  style = {}, 
  children, 
  alt, 
  'aria-label': ariaLabel,
  ...props 
}) => {
  const imageRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const { imageCache } = useMediaPreloader();

  useEffect(() => {
    let isMounted = true;

    if (!src) {
      console.warn('CachedBackgroundImage: src is empty');
      return;
    }

    console.log('Loading image:', src); // Добавляем лог

    const setBackground = (url) => {
      if (isMounted && imageRef.current) {
        console.log('Setting background for:', src, 'with url:', url); // Добавляем лог
        // Убеждаемся, что URL правильно обернут в url()
        const imageUrl = url.startsWith('data:') || url.startsWith('blob:') ? url : `url("${url}")`;
        imageRef.current.style.backgroundImage = imageUrl.startsWith('url') ? imageUrl : `url("${imageUrl}")`;
        setIsLoaded(true); // Помечаем, что изображение загружено
        console.log('Background set successfully for:', src); // Добавляем лог
      }
    };

    // Проверяем кеш
    if (imageCache[src]) {
      console.log('🖼️ Использую кешированное изображение:', src);
      setBackground(imageCache[src]);
      return;
    }

    console.log('🔄 Загружаю новое изображение:', src);
    // Загружаем если нет в кеше
    const img = new Image();
    img.onload = () => {
      console.log('✅ Изображение загружено:', src);
      setBackground(src);
    };
    img.onerror = (error) => {
      console.error('❌ Ошибка загрузки изображения:', src, error);
    };
    img.src = src;

    return () => {
      isMounted = false;
    };
  }, [src, imageCache]);

  const containerStyle = {
    ...style,
    position: 'absolute',
    inset: 0,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    opacity: isLoaded ? 1 : 0,
    transition: 'opacity 0.3s ease-in-out',
    transform: 'translateZ(0)',
    backfaceVisibility: 'hidden',
    willChange: 'transform',
    WebkitBackfaceVisibility: 'hidden',
    WebkitTransform: 'translateZ(0)',
  };

  return (
    <div className={className} style={{ position: 'relative', width: '100%', height: '100%', minHeight: style.height || '200px' }}>
      <div
        ref={imageRef}
        style={containerStyle}
        aria-label={ariaLabel || alt}
        {...props}
      >
        {children}
      </div>
    </div>
  );
};

export default CachedBackgroundImage;
