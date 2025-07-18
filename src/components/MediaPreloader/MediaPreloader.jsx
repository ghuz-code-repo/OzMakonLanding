import React, { createContext, useContext, useReducer, useEffect, useState } from 'react';

// Создаем контекст для управления состоянием медиафайлов
const MediaPreloaderContext = createContext();

// Редюсер для управления состоянием загрузки
const mediaReducer = (state, action) => {
  switch (action.type) {
    case 'START_LOADING':
      return {
        ...state,
        [action.group]: {
          ...state[action.group],
          status: 'loading',
          total: action.urls.length,
          loaded: 0,
          failed: 0
        }
      };
    case 'IMAGE_LOADED':
      return {
        ...state,
        [action.group]: {
          ...state[action.group],
          loaded: state[action.group].loaded + 1
        }
      };
    case 'IMAGE_FAILED':
      return {
        ...state,
        [action.group]: {
          ...state[action.group],
          failed: state[action.group].failed + 1
        }
      };
    case 'GROUP_COMPLETED':
      return {
        ...state,
        [action.group]: {
          ...state[action.group],
          status: 'completed'
        }
      };
    default:
      return state;
  }
};

// Кеш для загруженных изображений
const imageCache = new Map();

// Функция для предзагрузки изображения
const preloadImage = (url) => {
  return new Promise((resolve, reject) => {
    // Проверяем кеш
    if (imageCache.has(url)) {
      resolve(imageCache.get(url));
      return;
    }

    const img = new Image();
    img.onload = () => {
      imageCache.set(url, img);
      resolve(img);
    };
    img.onerror = () => {
      reject(new Error(`Failed to load image: ${url}`));
    };
    img.src = url;
  });
};

// Провайдер контекста
export const MediaPreloaderProvider = ({ children }) => {
  const [state, dispatch] = useReducer(mediaReducer, {});
  const [isInitialLoadComplete, setIsInitialLoadComplete] = useState(false);

  // Функция для загрузки группы изображений
  const loadImageGroup = async (groupName, urls, priority = false) => {
    dispatch({ type: 'START_LOADING', group: groupName, urls });

    const loadPromises = urls.map(async (url) => {
      try {
        await preloadImage(url);
        dispatch({ type: 'IMAGE_LOADED', group: groupName });
      } catch (error) {
        console.error(`Failed to load image ${url}:`, error);
        dispatch({ type: 'IMAGE_FAILED', group: groupName });
      }
    });

    if (priority) {
      // Для приоритетных групп ждем завершения всех загрузок
      await Promise.allSettled(loadPromises);
    } else {
      // Для обычных групп загружаем в фоне
      Promise.allSettled(loadPromises).then(() => {
        dispatch({ type: 'GROUP_COMPLETED', group: groupName });
      });
    }

    dispatch({ type: 'GROUP_COMPLETED', group: groupName });
  };

  // Функция для получения изображения из кеша
  const getCachedImage = (url) => {
    return imageCache.get(url);
  };

  const value = {
    state,
    loadImageGroup,
    getCachedImage,
    isInitialLoadComplete,
    setIsInitialLoadComplete
  };

  return (
    <MediaPreloaderContext.Provider value={value}>
      {children}
    </MediaPreloaderContext.Provider>
  );
};

// Хук для использования контекста
export const useMediaPreloader = () => {
  const context = useContext(MediaPreloaderContext);
  if (!context) {
    throw new Error('useMediaPreloader must be used within a MediaPreloaderProvider');
  }
  return context;
};

// Компонент для отображения прогресса загрузки
export const LoadingProgress = () => {
  const { state } = useMediaPreloader();

  const groups = Object.keys(state);
  if (groups.length === 0) return null;

  return (
    <div style={{
      position: 'fixed',
      top: '20px',
      right: '20px',
      background: 'rgba(0, 0, 0, 0.8)',
      color: 'white',
      padding: '15px',
      borderRadius: '8px',
      fontSize: '12px',
      zIndex: 9999,
      maxWidth: '300px'
    }}>
      <h4 style={{ margin: '0 0 10px 0' }}>Загрузка медиафайлов:</h4>
      {groups.map(group => {
        const groupState = state[group];
        const progress = groupState.total > 0 
          ? Math.round((groupState.loaded / groupState.total) * 100) 
          : 0;
        
        return (
          <div key={group} style={{ marginBottom: '8px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontWeight: 'bold' }}>{group}:</span>
              <span>{groupState.loaded}/{groupState.total}</span>
            </div>
            <div style={{
              width: '100%',
              height: '4px',
              background: '#333',
              borderRadius: '2px',
              overflow: 'hidden',
              marginTop: '4px'
            }}>
              <div style={{
                width: `${progress}%`,
                height: '100%',
                background: groupState.status === 'completed' ? '#4CAF50' : '#2196F3',
                transition: 'width 0.3s ease'
              }} />
            </div>
            {groupState.failed > 0 && (
              <div style={{ color: '#f44336', fontSize: '10px', marginTop: '2px' }}>
                Ошибок: {groupState.failed}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default MediaPreloaderProvider;
