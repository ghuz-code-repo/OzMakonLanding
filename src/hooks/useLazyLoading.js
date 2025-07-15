import { useEffect, useRef, useState } from 'react';

/**
 * Хук для ленивой загрузки изображений
 * @param {Object} options - опции для IntersectionObserver
 * @returns {Array} [ref, isIntersecting] - ref для элемента и состояние видимости
 */
export const useLazyLoading = (options = {}) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const targetRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsIntersecting(true);
        observer.unobserve(entry.target);
      }
    }, {
      threshold: 0.1,
      rootMargin: '50px',
      ...options
    });

    if (targetRef.current) {
      observer.observe(targetRef.current);
    }

    return () => {
      if (targetRef.current) {
        observer.unobserve(targetRef.current);
      }
    };
  }, []);

  return [targetRef, isIntersecting];
};
