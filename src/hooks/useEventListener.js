import { useEffect, useRef } from 'react';

/**
 * Хук для безопасного добавления event listeners с автоматической очисткой
 * @param {string} eventName - имя события
 * @param {Function} handler - обработчик события
 * @param {Object} element - элемент (по умолчанию window)
 * @param {Object} options - опции для addEventListener
 */
export const useEventListener = (eventName, handler, element = window, options = {}) => {
  const savedHandler = useRef();

  useEffect(() => {
    savedHandler.current = handler;
  }, [handler]);

  useEffect(() => {
    const isSupported = element && element.addEventListener;
    if (!isSupported) return;

    const eventListener = (event) => savedHandler.current(event);
    
    // Добавляем passive: true по умолчанию для лучшей производительности
    const defaultOptions = { passive: true, ...options };
    
    element.addEventListener(eventName, eventListener, defaultOptions);
    
    return () => {
      element.removeEventListener(eventName, eventListener, defaultOptions);
    };
  }, [eventName, element, options]);
};

/**
 * Хук для дебаунса функций
 * @param {Function} callback - функция для дебаунса
 * @param {number} delay - задержка в миллисекундах
 */
export const useDebounce = (callback, delay) => {
  const timeoutRef = useRef();

  const debouncedCallback = (...args) => {
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => callback(...args), delay);
  };

  useEffect(() => {
    return () => clearTimeout(timeoutRef.current);
  }, []);

  return debouncedCallback;
};

/**
 * Хук для оптимизированного скролла
 * @param {Function} callback - функция обработчик скролла
 * @param {number} throttleMs - интервал throttle (по умолчанию 16ms для 60fps)
 */
export const useOptimizedScroll = (callback, throttleMs = 16) => {
  const lastRun = useRef(Date.now());
  
  const throttledCallback = useDebounce((...args) => {
    if (Date.now() - lastRun.current >= throttleMs) {
      callback(...args);
      lastRun.current = Date.now();
    }
  }, throttleMs);

  useEventListener('scroll', throttledCallback, window, { passive: true });
};
