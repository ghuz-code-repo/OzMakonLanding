import React, { useRef } from 'react';
import { useMediaPreloader } from '../MediaPreloader/MediaPreloader';
import './ForceVisible.css';

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
  const { getCachedImage } = useMediaPreloader();

  // Получаем кешированный URL, если доступен
  const cachedImageUrl = getCachedImage(src);
  const finalSrc = cachedImageUrl || src;

  const containerStyle = {
    ...style,
    position: style.position || 'relative',
    backgroundImage: finalSrc ? `url("${finalSrc}")` : 'none',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    opacity: '1 !important',
    visibility: 'visible !important',
    display: 'block !important',

    backfaceVisibility: 'hidden',
    // willChange: 'transform', // Отключено - вызывает translateZ(0px)
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