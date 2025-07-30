import React, { useRef, useEffect } from 'react';
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
  const { imageCache } = useMediaPreloader();

  useEffect(() => {
    let isMounted = true;

    if (!src) return;

    const setBackground = (url) => {
      if (isMounted && imageRef.current) {
        imageRef.current.style.backgroundImage = `url("${url}")`;
      }
    };

    // Проверяем кеш
    if (imageCache[src]) {
      setBackground(imageCache[src]);
      return;
    }

    // Загружаем если нет в кеше
    const img = new Image();
    img.onload = () => setBackground(src);
    img.src = src;

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
    width: '100%',
    height: '100%'
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
