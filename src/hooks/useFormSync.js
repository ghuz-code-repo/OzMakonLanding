import { useRef, useCallback } from 'react';

/**
 * Хук для синхронизации данных между формами
 */
export function useFormSync() {
  const syncDataRef = useRef({
    name: '',
    phone: ''
  });

  const updateSyncData = useCallback((field, value) => {
    syncDataRef.current = {
      ...syncDataRef.current,
      [field]: value
    };
  }, []);

  const getSyncData = useCallback(() => {
    return { ...syncDataRef.current };
  }, []);

  const clearSyncData = useCallback(() => {
    syncDataRef.current = {
      name: '',
      phone: ''
    };
  }, []);

  return {
    updateSyncData,
    getSyncData,
    clearSyncData
  };
}

// Глобальный экземпляр для синхронизации между компонентами
let globalSyncData = {
  name: '',
  phone: '',
  isPhoneValid: false // Добавляем синхронизацию валидности
};

let syncCallbacks = new Set();

export const formSync = {
  updateData: (field, value) => {
    globalSyncData = {
      ...globalSyncData,
      [field]: value
    };
    
    // Уведомляем все подписанные компоненты
    syncCallbacks.forEach(callback => {
      callback(globalSyncData);
    });
  },

  updateValidation: (field, isValid) => {
    if (field === 'phone') {
      globalSyncData = {
        ...globalSyncData,
        isPhoneValid: isValid
      };
      
      // Уведомляем все подписанные компоненты
      syncCallbacks.forEach(callback => {
        callback(globalSyncData);
      });
    }
  },

  getData: () => ({ ...globalSyncData }),

  clearData: () => {
    globalSyncData = {
      name: '',
      phone: '',
      isPhoneValid: false
    };
    
    // Уведомляем все подписанные компоненты
    syncCallbacks.forEach(callback => {
      callback(globalSyncData);
    });
  },

  subscribe: (callback) => {
    syncCallbacks.add(callback);
    
    // Возвращаем функцию отписки
    return () => {
      syncCallbacks.delete(callback);
    };
  }
};
