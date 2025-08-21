
import React, { useRef } from 'react';
import { useMediaPreloader } from '../MediaPreloader/MediaPreloader';
import './NoTransitions.css';
import './ForceVisible.css';

const CachedImage = ({ 
  src, 
  alt, 
  className, 
  style,
  fallbackSrc = null,
  onLoad = () => {},
  onError = () => {},
  priority = false,
  ...props 
}) => {
  const { getCachedImage } = useMediaPreloader();
  const imageRef = useRef(null);

  // Получаем кешированный URL, если доступен
  const cachedImageUrl = getCachedImage(src);
  const finalSrc = cachedImageUrl || src;

  // Всегда показываем изображение без условий
  return (
    <img
      ref={imageRef}
      src={finalSrc}
      alt={alt}
      className={className}
      style={{
        ...style,
        visibility: 'visible',
        opacity: 1,
        display: 'block'
      }}
      loading="eager"
      decoding="sync"
      onLoad={onLoad}
      onError={(e) => {
        if (fallbackSrc && e.target.src !== fallbackSrc) {
          e.target.src = fallbackSrc;
        }
        onError(e);
      }}
      {...props}
    />
  );
};

export default CachedImage;
