import { useEffect, useRef } from 'react';

/**
 * Хук для удержания изображений в памяти
 * @param {string[]} imagePaths - массив путей к изображениям
 */
export const useImageRetention = (imagePaths) => {
  const imagesRef = useRef([]);

  useEffect(() => {
    // Создаем и сохраняем ссылки на изображения
    const images = imagePaths.map(path => {
      const img = new Image();
      img.src = path;
      // Важно: устанавливаем crossOrigin для корректной работы с canvas
      img.crossOrigin = 'anonymous';
      return img;
    });

    // Сохраняем ссылки
    imagesRef.current = images;

    // Функция очистки при размонтировании
    return () => {
      // Очищаем ссылки
      imagesRef.current = [];
    };
  }, [imagePaths]);

  return imagesRef;
};
