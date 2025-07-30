import React, { useState, useEffect, useRef } from 'react';
import { useMediaPreloader } from '../MediaPreloader/MediaPreloader';

const CachedBackgroundImage = ({ 
  src, 
  className = '', 
  style = {}, 
  children, 
  alt, 
  'aria-label': ariaLabel,
  priority = false,
  ...props 
}) => {
  const imageRef = useRef(null);
  const { imageCache } = useMediaPreloader();

  useEffect(() => {
    let isMounted = true;
    
    const loadImage = () => {
      if (!src) return;

      const cachedUrl = imageCache[src];
      if (cachedUrl) {
        if (isMounted && imageRef.current) {
          imageRef.current.style.backgroundImage = `url("${cachedUrl}")`;
        }
      } else {
        const img = new Image();
        img.loading = 'eager'; // Всегда используем eager loading
        img.decoding = 'sync'; // Всегда используем синхронное декодирование
      
        img.onload = () => {
          if (isMounted && imageRef.current) {
            imageRef.current.style.backgroundImage = `url("${src}")`;
          }
        };

        img.src = src;
      }
    };

    // Всегда загружаем изображение немедленно
    loadImage();

    return () => {
      isMounted = false;
    };
  }, [src, imageCache]);

  const containerStyle = {
    ...style,
    position: 'relative',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    opacity: 1, // Всегда показываем сразу
    transform: 'translateZ(0)',
    backfaceVisibility: 'hidden',
    willChange: 'transform',
    contain: 'paint layout'
  };

  return (
    <div
      ref={imageRef}
      className={className}
      style={containerStyle}
      aria-label={ariaLabel || alt}
      {...props}
    >
      {children}
    </div>
  );
};

export default CachedBackgroundImage;