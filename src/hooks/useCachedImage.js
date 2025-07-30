import { useMediaPreloader } from '../components/MediaPreloader/MediaPreloader';

/**
 * Хук для работы с кешированными изображениями
 * @param {string} imagePath - путь к изображению
 * @returns {object} - объект с информацией о состоянии изображения
 */
export const useCachedImage = (imagePath) => {
  const { getCachedImage, imageCache } = useMediaPreloader();
  
  const isImageCached = () => {
    return !!imageCache[imagePath];
  };

  const getImageSrc = () => {
    return imageCache[imagePath] || null;
  };

  return {
    isImageCached: isImageCached(),
    imageSrc: getImageSrc(),
    originalPath: imagePath
  };
};

/**
 * Хук для получения статистики загрузки медиафайлов
 * @returns {object} - статистика загрузки
 */
export const useMediaLoadingStats = () => {
  const { state, imageCache } = useMediaPreloader();
  
  const getOverallProgress = () => {
    if (!state || typeof state !== 'object') return 0;
    
    const groups = Object.keys(state);
    if (groups.length === 0) return 0;
    
    let totalImages = 0;
    let loadedImages = 0;
    
    groups.forEach(group => {
      const groupState = state[group];
      if (groupState && typeof groupState === 'object') {
        totalImages += groupState.total || 0;
        loadedImages += groupState.loaded || 0;
      }
    });
    
    return totalImages > 0 ? Math.round((loadedImages / totalImages) * 100) : 0;
  };

  const getGroupProgress = (groupName) => {
    const groupState = state[groupName];
    if (!groupState || groupState.total === 0) return 0;
    
    return Math.round((groupState.loaded / groupState.total) * 100);
  };

  const isGroupCompleted = (groupName) => {
    const groupState = state[groupName];
    return groupState && groupState.status === 'completed';
  };

  const getAllGroupsCompleted = () => {
    const groups = Object.keys(state);
    return groups.every(group => isGroupCompleted(group));
  };

  const isFirstSlideLoaded = () => {
    // Проверяем загрузку всех изображений первого слайда
    const firstSlideImages = Object.keys(imageCache).filter(path => 
      path.includes('UniqueSellingPropositionsGrid5/slide1/') ||
      path.includes('USPGridSlide1/')
    );

    // Также проверяем основные медиафайлы сайта (логотип, фон и т.д.)
    const criticalImages = Object.keys(imageCache).filter(path => 
      path.includes('Header/') ||
      path.includes('Hero/')
    );

    const allCriticalImages = [...firstSlideImages, ...criticalImages];
    return allCriticalImages.length > 0 && allCriticalImages.every(path => imageCache[path]);
  };

  return {
    overallProgress: getOverallProgress(),
    getGroupProgress,
    isGroupCompleted,
    allGroupsCompleted: getAllGroupsCompleted(),
    groupsInfo: state,
    isFirstSlideLoaded: isFirstSlideLoaded()
  };
};

export default useCachedImage;
