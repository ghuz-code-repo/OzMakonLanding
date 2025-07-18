import React, { useState, useEffect } from 'react';
import { useMediaPreloader } from '../MediaPreloader/MediaPreloader';
import '../MediaPreloader/MediaPreloader.css';

const CachedBackgroundImage = ({ 
  src, 
  children, 
  className, 
  style = {},
  fallbackBackground = 'linear-gradient(90deg, #f0f0f0 25%, transparent 37%, #f0f0f0 63%)',
  ...props 
}) => {
  const { getCachedImage } = useMediaPreloader();
  const [backgroundImage, setBackgroundImage] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const loadBackgroundImage = () => {
      // Сначала пробуем получить из кеша
      const cachedImage = getCachedImage(src);
      
      if (cachedImage) {
        setBackgroundImage(`url(${src})`);
        setIsLoaded(true);
        return;
      }

      // Если нет в кеше, загружаем обычным способом
      const img = new Image();
      img.onload = () => {
        setBackgroundImage(`url(${src})`);
        setIsLoaded(true);
      };
      img.onerror = () => {
        setBackgroundImage(fallbackBackground);
        setIsLoaded(true);
      };
      img.src = src;
    };

    if (src) {
      loadBackgroundImage();
    }
  }, [src, getCachedImage, fallbackBackground]);

  const finalStyle = {
    ...style,
    backgroundImage: isLoaded 
      ? backgroundImage 
      : undefined
  };

  const finalClassName = isLoaded 
    ? className 
    : `${className} media-shimmer`;

  return (
    <section 
      className={finalClassName} 
      style={finalStyle} 
      {...props}
    >
      {children}
    </section>
  );
};

export default CachedBackgroundImage;
