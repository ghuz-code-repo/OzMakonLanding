import { useMediaPreloader } from '../components/MediaPreloader/MediaPreloader';

/**
 * Хук для работы с кешированными изображениями
 * @param {string} imagePath - путь к изображению
 * @returns {object} - объект с информацией о состоянии изображения
 */
export const useCachedImage = (imagePath) => {
  const { getCachedImage } = useMediaPreloader();
  
  const isImageCached = () => {
    return !!getCachedImage(imagePath);
  };

  const getImageSrc = () => {
    const cachedImage = getCachedImage(imagePath);
    return cachedImage ? imagePath : null;
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
  const { state } = useMediaPreloader();
  
  const getOverallProgress = () => {
    const groups = Object.keys(state);
    if (groups.length === 0) return 0;
    
    let totalImages = 0;
    let loadedImages = 0;
    
    groups.forEach(group => {
      const groupState = state[group];
      totalImages += groupState.total || 0;
      loadedImages += groupState.loaded || 0;
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

  return {
    overallProgress: getOverallProgress(),
    getGroupProgress,
    isGroupCompleted,
    allGroupsCompleted: getAllGroupsCompleted(),
    groupsInfo: state
  };
};

export default useCachedImage;
