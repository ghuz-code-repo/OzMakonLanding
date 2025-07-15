import { useCallback } from 'react';

// Конфигурация форматирования телефонов по странам
const COUNTRY_PHONE_CONFIG = {
  '7': {
    name: 'Россия/Казахстан',
    format: '+7 999 999 99 99', 
    maxLength: 12, // +7 + 10 цифр
    pattern: /^7\d{10}$/
  },
  '998': {
    name: 'Узбекистан',
    format: '+998 99 999 99 99',
    maxLength: 13, // +998 + 9 цифр  
    pattern: /^998\d{9}$/
  },
  '996': {
    name: 'Кыргызстан',
    format: '+996 999 99 99 99',
    maxLength: 13, // +996 + 9 цифр
    pattern: /^996\d{9}$/
  },
  '992': {
    name: 'Таджикистан',
    format: '+992 99 999 99 99',
    maxLength: 13, // +992 + 9 цифр
    pattern: /^992\d{9}$/
  },
  '993': {
    name: 'Туркменистан',
    format: '+993 99 99 99 99',
    maxLength: 12, // +993 + 8 цифр
    pattern: /^993\d{8}$/
  }
};

// Маппинг ISO кодов стран на телефонные коды
const COUNTRY_ISO_TO_PHONE_CODE = {
  'UZ': '998', // Узбекистан
  'RU': '7',   // Россия
  'KZ': '7',   // Казахстан  
  'KG': '996', // Кыргызстан
  'TJ': '992', // Таджикистан
  'TM': '993', // Туркменистан
  'UA': '380', // Украина
  'BY': '375', // Беларусь
  'DE': '49',  // Германия
  'US': '1',   // США
  'CN': '86',  // Китай
  'FR': '33',  // Франция
  'GB': '44',  // Великобритания
};

/**
 * Форматирует номер телефона (функция без хука)
 * @param {string} inputValue - введенное значение
 * @returns {string} отформатированный номер
 */
export function formatPhoneNumber(inputValue) {
  if (!inputValue) return '';
  
  // Удаляем все символы кроме цифр
  let cleanValue = inputValue.replace(/[^\d]/g, '');
  
  // Добавляем '+' в начало если его нет
  if (!inputValue.startsWith('+')) {
    cleanValue = cleanValue;
  }
  
  // Определяем страну
  const countryCode = detectCountryCodeStatic(cleanValue);
  if (!countryCode) {
    // Если код страны не определен, возвращаем с '+'
    return cleanValue ? `+${cleanValue}` : '';
  }
  
  const config = COUNTRY_PHONE_CONFIG[countryCode];
  if (!config) {
    return `+${cleanValue}`;
  }
  
  // Ограничиваем длину
  const maxDigits = config.maxLength - 1; // -1 для знака '+'
  const truncatedValue = cleanValue.substring(0, maxDigits);
  
  // Применяем форматирование
  let formatted = `+${truncatedValue}`;
  
  // Добавляем пробелы согласно формату
  if (countryCode === '7' && truncatedValue.length > 1) {
    const number = truncatedValue.substring(1);
    if (number.length <= 3) {
      formatted = `+7 ${number}`;
    } else if (number.length <= 6) {
      formatted = `+7 ${number.substring(0, 3)} ${number.substring(3)}`;
    } else if (number.length <= 8) {
      formatted = `+7 ${number.substring(0, 3)} ${number.substring(3, 6)} ${number.substring(6)}`;
    } else {
      formatted = `+7 ${number.substring(0, 3)} ${number.substring(3, 6)} ${number.substring(6, 8)} ${number.substring(8)}`;
    }
  } else if (countryCode === '998' && truncatedValue.length > 3) {
    const number = truncatedValue.substring(3);
    if (number.length <= 2) {
      formatted = `+998 ${number}`;
    } else if (number.length <= 5) {
      formatted = `+998 ${number.substring(0, 2)} ${number.substring(2)}`;
    } else if (number.length <= 7) {
      formatted = `+998 ${number.substring(0, 2)} ${number.substring(2, 5)} ${number.substring(5)}`;
    } else {
      formatted = `+998 ${number.substring(0, 2)} ${number.substring(2, 5)} ${number.substring(5, 7)} ${number.substring(7)}`;
    }
  } else if (['996', '992'].includes(countryCode) && truncatedValue.length > 3) {
    const number = truncatedValue.substring(3);
    if (number.length <= 3) {
      formatted = `+${countryCode} ${number}`;
    } else if (number.length <= 5) {
      formatted = `+${countryCode} ${number.substring(0, 3)} ${number.substring(3)}`;
    } else if (number.length <= 7) {
      formatted = `+${countryCode} ${number.substring(0, 3)} ${number.substring(3, 5)} ${number.substring(5)}`;
    } else {
      formatted = `+${countryCode} ${number.substring(0, 3)} ${number.substring(3, 5)} ${number.substring(5, 7)} ${number.substring(7)}`;
    }
  } else if (countryCode === '993' && truncatedValue.length > 3) {
    const number = truncatedValue.substring(3);
    if (number.length <= 2) {
      formatted = `+993 ${number}`;
    } else if (number.length <= 4) {
      formatted = `+993 ${number.substring(0, 2)} ${number.substring(2)}`;
    } else if (number.length <= 6) {
      formatted = `+993 ${number.substring(0, 2)} ${number.substring(2, 4)} ${number.substring(4)}`;
    } else {
      formatted = `+993 ${number.substring(0, 2)} ${number.substring(2, 4)} ${number.substring(4, 6)} ${number.substring(6)}`;
    }
  }
  
  return formatted;
}

/**
 * Определяет код страны из номера телефона (статическая функция)
 */
function detectCountryCodeStatic(phoneNumber) {
  if (!phoneNumber) return null;
  
  const cleanNumber = phoneNumber.replace(/[^\d]/g, '');
  
  // Проверяем коды стран в порядке убывания длины
  const codes = Object.keys(COUNTRY_PHONE_CONFIG).sort((a, b) => b.length - a.length);
  
  for (const code of codes) {
    if (cleanNumber.startsWith(code)) {
      return code;
    }
  }
  
  return null;
}

/**
 * Проверяет, разрешен ли код страны (статическая функция)
 */
export function isCountryCodeAllowed(phoneNumber, allowedCodes = ['998', '7', '996', '992', '993']) {
  const countryCode = detectCountryCodeStatic(phoneNumber);
  return countryCode ? allowedCodes.includes(countryCode) : false;
}

/**
 * Валидирует номер телефона (статическая функция)
 */
export function validatePhoneNumber(phoneNumber, allowedCodes = ['998', '7', '996', '992', '993']) {
  const formattedValue = formatPhoneNumber(phoneNumber);
  const detectedCode = detectCountryCodeStatic(formattedValue);
  const isValid = formattedValue ? isCountryCodeAllowed(formattedValue, allowedCodes) : false;
  const isComplete = formattedValue.length > (detectedCode?.length || 0) + 1;
  
  return {
    isValid,
    countryCode: detectedCode,
    value: formattedValue,
    isComplete
  };
}

/**
 * Хук с умной логикой для обработки номеров телефонов
 * 
 * @param {Object} config - конфигурация
 * @param {string[]} config.allowedCountryCodes - разрешенные коды стран для отправки
 * @param {string} config.defaultCountryCode - код страны по умолчанию  
 * @param {boolean} config.enableGeolocation - включить геолокацию
 * @param {boolean} config.showFullMaskPlaceholder - показывать полную маску в placeholder (по умолчанию false)
 * @returns {Object} методы для работы с телефонными номерами
 */
export function useSmartPhoneLogic(config = {}) {
  const {
    allowedCountryCodes = ['998'],
    defaultCountryCode = '998',
    enableGeolocation = true,
    showFullMaskPlaceholder = false
  } = config;

  /**
   * Определяет код страны из номера телефона
   * @param {string} phone - номер телефона
   * @returns {string|null} код страны или null
   */
  const detectCountryCode = useCallback((phone) => {
    if (!phone) return null;
    
    const numbers = phone.replace(/\D/g, '');
    if (numbers.length === 0) return null;
    
    // Проверяем коды по порядку убывания длины (чтобы 998 проверился раньше чем 9)
    const sortedCodes = Object.keys(COUNTRY_PHONE_CONFIG).sort((a, b) => b.length - a.length);
    
    for (const code of sortedCodes) {
      if (numbers.startsWith(code)) {
        return code;
      }
    }
    
    return null;
  }, []);

  /**
   * Проверяет, разрешен ли код страны для отправки
   * @param {string} phone - номер телефона
   * @returns {boolean} true если код страны разрешен
   */
  const isCountryCodeAllowed = useCallback((phone) => {
    const countryCode = detectCountryCode(phone);
    return countryCode ? allowedCountryCodes.includes(countryCode) : false;
  }, [detectCountryCode, allowedCountryCodes]);

  /**
   * Проверяет, содержит ли значение только код страны
   * @param {string} value - значение поля
   * @returns {boolean} true если только код страны
   */
  const isOnlyCountryCode = useCallback((value) => {
    if (!value || value.trim() === '') return false;
    
    const cleaned = value.replace(/\s/g, ''); // убираем пробелы
    const numbers = cleaned.replace(/[^\d+]/g, ''); // оставляем только + и цифры
    
    if (!numbers.startsWith('+')) return false;
    
    const digits = numbers.substring(1);
    
    // Проверяем, является ли это только кодом страны
    const detectedCode = detectCountryCode(numbers);
    
    if (detectedCode) {
      // Если код определен - проверяем точное совпадение длины
      return digits.length === detectedCode.length;
    } else {
      // Если код не определен нашей системой, считаем что это код страны
      // если цифр от 1 до 4 (стандартные коды стран 1-4 цифры)
      return digits.length >= 1 && digits.length <= 4;
    }
  }, [detectCountryCode]);

  /**
   * Форматирует номер телефона согласно маскам стран
   * @param {string} value - введенное значение
   * @returns {string} отформатированный номер
   */
  const formatPhoneNumber = useCallback((value) => {
    if (!value) return '';
    
    // Удаляем все символы кроме цифр и +
    let cleaned = value.replace(/[^\d+]/g, '');
    
    // Если пустая строка
    if (!cleaned) {
      return '';
    }
    
    // Если не начинается с +, добавляем
    if (!cleaned.startsWith('+')) {
      cleaned = '+' + cleaned;
    }
    
    // Определяем код страны
    const countryCode = detectCountryCode(cleaned);
    if (!countryCode) {
      return cleaned; // Возвращаем как есть, если код не определен
    }
    
    const config = COUNTRY_PHONE_CONFIG[countryCode];
    if (!config) {
      return cleaned;
    }
    
    // Извлекаем цифры после кода страны
    const digits = cleaned.substring(1); // убираем +
    const countryDigits = digits.substring(countryCode.length); // убираем код страны
    
    // Обрезаем по максимальной длине
    const maxDigits = config.maxLength - countryCode.length - 1; // -1 для +
    const truncatedDigits = countryDigits.substring(0, maxDigits);
    
    // Форматируем согласно маске
    switch (countryCode) {
      case '7': // +7 999 999 99 99
        return `+7${truncatedDigits.replace(/(\d{0,3})(\d{0,3})(\d{0,2})(\d{0,2})/, (match, g1, g2, g3, g4) => {
          let result = '';
          if (g1) result += ` ${g1}`;
          if (g2) result += ` ${g2}`;
          if (g3) result += ` ${g3}`;
          if (g4) result += ` ${g4}`;
          return result;
        })}`;
        
      case '998': // +998 99 999 99 99
        return `+998${truncatedDigits.replace(/(\d{0,2})(\d{0,3})(\d{0,2})(\d{0,2})/, (match, g1, g2, g3, g4) => {
          let result = '';
          if (g1) result += ` ${g1}`;
          if (g2) result += ` ${g2}`;
          if (g3) result += ` ${g3}`;
          if (g4) result += ` ${g4}`;
          return result;
        })}`;
        
      case '996': // +996 999 999 999
        return `+996${truncatedDigits.replace(/(\d{0,3})(\d{0,3})(\d{0,3})/, (match, g1, g2, g3) => {
          let result = '';
          if (g1) result += ` ${g1}`;
          if (g2) result += ` ${g2}`;
          if (g3) result += ` ${g3}`;
          return result;
        })}`;
        
      case '992': // +992 99 999 9999
        return `+992${truncatedDigits.replace(/(\d{0,2})(\d{0,3})(\d{0,4})/, (match, g1, g2, g3) => {
          let result = '';
          if (g1) result += ` ${g1}`;
          if (g2) result += ` ${g2}`;
          if (g3) result += ` ${g3}`;
          return result;
        })}`;
        
      case '993': // +993 99 999 999
        return `+993${truncatedDigits.replace(/(\d{0,2})(\d{0,3})(\d{0,3})/, (match, g1, g2, g3) => {
          let result = '';
          if (g1) result += ` ${g1}`;
          if (g2) result += ` ${g2}`;
          if (g3) result += ` ${g3}`;
          return result;
        })}`;
        
      default:
        return cleaned;
    }
  }, [detectCountryCode]);

  /**
   * Получает страну пользователя через геолокацию
   * @returns {Promise<string|null>} код страны или null
   */
  const getCountryByGeolocation = useCallback(async () => {
    if (!enableGeolocation) {
      return null;
    }

    // 1. Попытка получить страну через IP
    try {
      const response = await fetch('https://ipapi.co/json/');
      if (response.ok) {
        const data = await response.json();
        const phoneCode = COUNTRY_ISO_TO_PHONE_CODE[data.country_code];
        if (phoneCode) {
          return phoneCode;
        }
      }
    } catch (error) {
      console.warn('IP геолокация недоступна:', error);
    }

    // 2. Попытка получить координаты через браузер
    if (navigator.geolocation) {
      try {
        const position = await new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject, {
            timeout: 5000,
            enableHighAccuracy: false
          });
        });

        const { latitude, longitude } = position.coords;

        // 3. Обратное геокодирование через несколько сервисов
        const geocodeServices = [
          `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`,
          `https://geocode.xyz/${latitude},${longitude}?json=1`
        ];

        for (const serviceUrl of geocodeServices) {
          try {
            const response = await fetch(serviceUrl);
            if (response.ok) {
              const data = await response.json();
              const countryCode = data.countryCode || data.country;
              const phoneCode = COUNTRY_ISO_TO_PHONE_CODE[countryCode];
              if (phoneCode) {
                return phoneCode;
              }
            }
          } catch (error) {
            console.warn(`Ошибка геокодирования ${serviceUrl}:`, error);
          }
        }
      } catch (error) {
        console.warn('Геолокация браузера недоступна:', error);
      }
    }

    return null;
  }, [enableGeolocation]);

  /**
   * Получает оптимальный placeholder на основе геолокации
   * @param {Function|null} geolocationFn - функция геолокации
   * @param {string} fallbackCountryCode - код страны по умолчанию
   * @returns {Promise<string>} оптимальный placeholder
   */
  const getOptimalPlaceholder = useCallback(async (geolocationFn = null, fallbackCountryCode = '998') => {
    // Пытаемся определить страну через геолокацию
    if (geolocationFn) {
      try {
        const detectedCountryCode = await geolocationFn();
        if (detectedCountryCode && COUNTRY_PHONE_CONFIG[detectedCountryCode]) {
          return showFullMaskPlaceholder 
            ? COUNTRY_PHONE_CONFIG[detectedCountryCode].format
            : `+${detectedCountryCode}`;
        }
      } catch (error) {
        console.warn('Не удалось определить страну по геолокации:', error);
      }
    }
    
    // Используем страну по умолчанию
    return showFullMaskPlaceholder 
      ? (COUNTRY_PHONE_CONFIG[fallbackCountryCode]?.format || `+${fallbackCountryCode}`)
      : `+${fallbackCountryCode}`;
  }, [showFullMaskPlaceholder]);

  return {
    formatPhoneNumber,
    detectCountryCode,
    isCountryCodeAllowed,
    isOnlyCountryCode,
    getOptimalPlaceholder,
    getCountryByGeolocation,
    validatePhoneNumber, // Добавляем функцию валидации
    COUNTRY_PHONE_CONFIG,
    COUNTRY_ISO_TO_PHONE_CODE
  };

  /**
   * Валидирует номер телефона и возвращает результат
   * @param {string} phoneNumber - номер для валидации
   * @returns {Object} результат валидации
   */
  function validatePhoneNumber(phoneNumber) {
    const formattedValue = formatPhoneNumber(phoneNumber);
    const detectedCode = detectCountryCode(formattedValue);
    const isValid = formattedValue ? isCountryCodeAllowed(formattedValue) : false;
    const isComplete = formattedValue.length > (detectedCode?.length || 0) + 1;
    
    return {
      isValid,
      countryCode: detectedCode,
      value: formattedValue,
      isComplete
    };
  }
}
