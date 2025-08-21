import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { getAllImagePaths } from '../../utils/completeMediaScanner';

const MediaPreloaderContext = createContext({
  imageCache: {},
  isLoading: true,
  progress: 0,
  loadImageGroup: async () => {},
  setIsInitialLoadComplete: () => {},
  getOverallProgress: () => 0,
  isInitialLoadComplete: false,
  getCachedImage: () => null,
  state: { initial: { total: 0, loaded: 0 } }
});

export const useMediaPreloader = () => useContext(MediaPreloaderContext);

export const MediaPreloaderProvider = ({ children }) => {
  const [imageCache, setImageCache] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [isInitialLoadComplete, setIsInitialLoadComplete] = useState(false);
  const [state, setState] = useState({
    initial: { total: 0, loaded: 0 }
  });

  // Функция для загрузки одного изображения
  const loadImage = useCallback((path, url) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve({ path, url });
      img.onerror = () => {
        console.warn(`Failed to preload: ${path}`);
        reject(path);
      };
      img.src = url;
    });
  }, []);

  // Функция для загрузки группы изображений
  const loadImageGroup = useCallback(async (groupName, imageObjects, isCritical = false) => {
    if (!Array.isArray(imageObjects)) {
      console.error(`loadImageGroup: imageObjects is not an array for group "${groupName}":`, imageObjects);
      return false;
    }

    // Используем правильные URL из imageObjects
    const imageList = imageObjects.map(imageObj => ({
      path: imageObj.path,
      url: imageObj.url // Используем url, обработанный Vite
    }));

    // Инициализируем состояние группы
    updateGroupState(groupName, imageList.length, 0);

    const total = imageList.length;
    let loaded = 0;

    try {
      const loadPromises = imageList.map(({ path, url }) => {
        return loadImage(path, url).then(result => {
          loaded++;
          setProgress(Math.round((loaded / total) * 100));
          updateGroupState(groupName, total, loaded);
          return result;
        });
      });

      const results = await Promise.allSettled(loadPromises);
      
      // Обновляем кэш только для успешно загруженных изображений
      const successfulLoads = results
        .filter(result => result.status === 'fulfilled')
        .map(result => result.value);

      setImageCache(prev => {
        const newCache = { ...prev };
        successfulLoads.forEach(({ path, url }) => {
          newCache[path] = url;
        });
        return newCache;
      });

      return successfulLoads.length > 0;
    } catch (error) {
      console.error(`Preload error for group "${groupName}":`, error);
      return false;
    }
  }, [loadImage]);

  // Функция для получения общего прогресса
  const getOverallProgress = useCallback(() => {
    if (!imageCache) return 0;
    const allImages = getAllImagePaths();
    const totalImages = allImages.length;
    if (totalImages === 0) return 0;
    const loadedImages = Object.keys(imageCache).length;
    return Math.round((loadedImages / totalImages) * 100);
  }, [imageCache]);

  // Начальная загрузка изображений
  useEffect(() => {
    const initializeLoading = async () => {
      const allImages = getAllImagePaths();
      console.log('Found images to preload:', allImages.length);
      
      if (allImages.length > 0) {
        // Передаем массив объектов с path и url, а не только пути
        const success = await loadImageGroup('Initial', allImages, true);
        setIsLoading(!success);
        setIsInitialLoadComplete(true);
      } else {
        console.warn('No images found to preload');
        setIsLoading(false);
        setIsInitialLoadComplete(true);
      }
    };

    initializeLoading();
  }, [loadImageGroup]);

  // Функция для получения кешированного изображения
  const getCachedImage = useCallback((path) => {
    return imageCache[path] || null;
  }, [imageCache]);

  // Обновляем состояние группы при загрузке
  const updateGroupState = useCallback((groupName, total, loaded) => {
    setState(prev => ({
      ...prev,
      [groupName]: { total, loaded }
    }));
  }, []);

  return (
    <MediaPreloaderContext.Provider 
      value={{ 
        imageCache, 
        isLoading, 
        progress,
        loadImageGroup,
        setIsInitialLoadComplete,
        getOverallProgress,
        isInitialLoadComplete,
        getCachedImage,
        state
      }}
    >
      {children}
    </MediaPreloaderContext.Provider>
  );
};