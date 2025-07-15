/**
 * Утилита для работы с MacroCRM API
 */
import CryptoJS from 'crypto-js';
import { CURRENT_CONFIG } from '../config/macroConfig';

// Используем конфигурацию из отдельного файла
const MACRO_CONFIG = {
  API_URL: CURRENT_CONFIG.API_URL,
  DOMAIN: CURRENT_CONFIG.DOMAIN,
  APP_SECRET: CURRENT_CONFIG.APP_SECRET,
};

/**
 * Генерирует токен аутентификации для MacroCRM
 * @param {string} domain - домен
 * @param {number} time - unix timestamp
 * @param {string} appSecret - секретный ключ приложения
 * @returns {string} MD5 токен
 */
function generateToken(domain, time, appSecret) {
  const tokenString = domain + time + appSecret;
  return CryptoJS.MD5(tokenString).toString();
}

/**
 * Получает UTM метки из URL
 * @returns {Object} объект с UTM метками
 */
function getUTMParams() {
  const urlParams = new URLSearchParams(window.location.search);
  const utm = {};
  
  // Стандартные UTM параметры
  const utmParams = [
    'utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content',
    'utm_keyword', 'utm_type', 'utm_block', 'utm_position', 
    'utm_campaign_id', 'utm_ad_id', 'utm_phrase_id'
  ];
  
  utmParams.forEach(param => {
    const value = urlParams.get(param);
    if (value) {
      utm[param] = value;
    }
  });
  
  // Добавляем IP клиента (будет определено на сервере)
  utm.ip = 'auto';
  
  return utm;
}

/**
 * Получает cookies пользователя в base64 формате
 * @returns {string} cookies в base64
 */
function getCookiesBase64() {
  try {
    const cookies = {};
    document.cookie.split(';').forEach(cookie => {
      const [name, value] = cookie.trim().split('=');
      if (name && value) {
        cookies[name] = decodeURIComponent(value);
      }
    });
    
    return btoa(JSON.stringify(cookies));
  } catch (error) {
    console.warn('Ошибка при получении cookies:', error);
    return '';
  }
}

/**
 * Валидирует номер телефона
 * @param {string} phone - номер телефона
 * @returns {boolean} true если номер валиден
 */

/**
 * Форматирует номер телефона для отправки
 * @param {string} phone - номер телефона
 * @returns {string} отформатированный номер
 */
/**
 * Отправляет заявку в MacroCRM
 * @param {Object} leadData - данные заявки
 * @param {string} leadData.name - имя клиента
 * @param {string} leadData.phone - телефон клиента
 * @param {string} leadData.email - email клиента (опционально)
 * @param {string} leadData.action - тип действия ('buy', 'sell', 'callback', 'question', etc.)
 * @param {string} leadData.message - комментарий к заявке (опционально)
 * @param {string} leadData.channelMedium - метка формы (опционально)
 * @returns {Promise<Object>} результат отправки
 */
export async function sendLeadToMacroCRM(leadData) {
  try {
    // Валидация обязательных полей
    if (!leadData.name || !leadData.name.trim()) {
      throw new Error('Имя клиента обязательно для заполнения');
    }
    
    if (!leadData.phone && !leadData.email) {
      throw new Error('Необходимо указать телефон или email');
    }
    
    // Форматируем и валидируем телефон
    if (leadData.phone) {
      leadData.phone = formatPhone(leadData.phone);
      
      const isPhoneValid = validatePhone(leadData.phone);
      if (!isPhoneValid) {
        throw new Error('Некорректный номер телефона');
      }
    }
    
    // Генерируем timestamp и токен
    const time = Math.floor(Date.now() / 1000);
    const token = generateToken(MACRO_CONFIG.DOMAIN, time, MACRO_CONFIG.APP_SECRET);
    
    // Формируем данные для отправки
    const formData = new FormData();
    
    // Обязательные параметры
    formData.append('domain', MACRO_CONFIG.DOMAIN);
    formData.append('time', time.toString());
    formData.append('token', token);
    formData.append('action', leadData.action || 'callback');
    formData.append('name', leadData.name.trim());
    
    // Опциональные параметры
    if (leadData.phone) {
      formData.append('phone', leadData.phone);
    }
    
    if (leadData.email) {
      formData.append('email', leadData.email);
    }
    
    if (leadData.message) {
      formData.append('message', leadData.message);
    }
    
    if (leadData.channelMedium) {
      formData.append('channel_medium', leadData.channelMedium);
    }
    
    // UTM метки
    const utmParams = getUTMParams();
    if (Object.keys(utmParams).length > 0) {
      formData.append('utm', JSON.stringify(utmParams));
    }
    
    // Cookies
    const cookiesBase64 = getCookiesBase64();
    if (cookiesBase64) {
      formData.append('cookie_base64', cookiesBase64);
    }
    
    // Отправляем запрос
    const response = await fetch(MACRO_CONFIG.API_URL, {
      method: 'POST',
      body: formData,
      headers: {
        // Не устанавливаем Content-Type для FormData - браузер сделает это автоматически
      },
    });
    
    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status} ${response.statusText}`);
    }
    
    const result = await response.json();
    
    // Проверяем результат
    if (result.error) {
      throw new Error(result.message || 'Неизвестная ошибка от сервера MacroCRM');
    }
    
    if (result.success) {
      return {
        success: true,
        estate_id: result.estate_id,
        message: 'Заявка успешно отправлена'
      };
    }
    
    throw new Error('Неожиданный формат ответа от сервера');
    
  } catch (error) {
    console.error('Ошибка отправки заявки в MacroCRM:', error);
    
    return {
      success: false,
      error: error.message,
      message: 'Ошибка при отправке заявки'
    };
  }
}

/**
 * Показывает flash уведомление
 * @param {string} message - текст сообщения
 * @param {string} type - тип сообщения ('success', 'error', 'warning', 'info')
 * @param {number} duration - время показа в миллисекундах (по умолчанию 5000)
 */
export function showFlashMessage(message, type = 'info', duration = 5000) {
  // Создаем контейнер для flash сообщений, если его нет
  let flashContainer = document.getElementById('flash-messages-container');
  if (!flashContainer) {
    flashContainer = document.createElement('div');
    flashContainer.id = 'flash-messages-container';
    flashContainer.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      z-index: 10000;
      display: flex;
      flex-direction: column;
      gap: 10px;
      pointer-events: none;
    `;
    document.body.appendChild(flashContainer);
  }
  
  // Создаем flash сообщение
  const flashMessage = document.createElement('div');
  flashMessage.style.cssText = `
    padding: 16px 20px;
    border-radius: 8px;
    color: white;
    font-family: 'Inter', Arial, sans-serif;
    font-size: 14px;
    font-weight: 500;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    max-width: 350px;
    opacity: 0;
    transform: translateX(100%);
    transition: all 0.3s ease-in-out;
    pointer-events: auto;
    cursor: pointer;
  `;
  
  // Устанавливаем цвет в зависимости от типа
  switch (type) {
    case 'success':
      flashMessage.style.backgroundColor = '#10B981';
      break;
    case 'error':
      flashMessage.style.backgroundColor = '#EF4444';
      break;
    case 'warning':
      flashMessage.style.backgroundColor = '#F59E0B';
      break;
    default:
      flashMessage.style.backgroundColor = '#3B82F6';
  }
  
  flashMessage.textContent = message;
  
  // Добавляем обработчик клика для закрытия
  flashMessage.addEventListener('click', () => {
    removeFlashMessage(flashMessage);
  });
  
  // Добавляем в контейнер
  flashContainer.appendChild(flashMessage);
  
  // Анимация появления
  setTimeout(() => {
    flashMessage.style.opacity = '1';
    flashMessage.style.transform = 'translateX(0)';
  }, 10);
  
  // Автоматическое удаление
  setTimeout(() => {
    removeFlashMessage(flashMessage);
  }, duration);
}

/**
 * Удаляет flash сообщение с анимацией
 * @param {HTMLElement} flashMessage - элемент сообщения
 */
function removeFlashMessage(flashMessage) {
  if (flashMessage && flashMessage.parentNode) {
    flashMessage.style.opacity = '0';
    flashMessage.style.transform = 'translateX(100%)';
    
    setTimeout(() => {
      if (flashMessage.parentNode) {
        flashMessage.parentNode.removeChild(flashMessage);
      }
    }, 300);
  }
}

/**
 * Функции валидации и форматирования
 */

/**
 * Форматирует номер телефона для отправки в API
 * @param {string} phone - номер телефона
 * @returns {string} отформатированный номер
 */
export function formatPhone(phone) {
  if (!phone) return '';
  
  // Удаляем все не цифры
  const digits = phone.replace(/\D/g, '');
  
  // Если начинается с 8, заменяем на 7
  if (digits.startsWith('8') && digits.length === 11) {
    return '+7' + digits.substring(1);
  }
  
  // Если начинается с 7, добавляем +
  if (digits.startsWith('7') && digits.length === 11) {
    return '+' + digits;
  }
  
  // Если номер без кода страны, добавляем +7
  if (digits.length === 10) {
    return '+7' + digits;
  }
  
  // Для международных номеров добавляем + если его нет
  if (digits.length > 7 && !phone.startsWith('+')) {
    return '+' + digits;
  }
  
  return phone;
}

/**
 * Валидирует номер телефона
 * @param {string} phone - номер телефона
 * @returns {boolean} true если номер корректный
 */
export function validatePhone(phone) {
  if (!phone) return false;
  
  // Удаляем все не цифры
  const digits = phone.replace(/\D/g, '');
  
  // Минимум 10 цифр
  if (digits.length < 10) return false;
  
  // Максимум 15 цифр (международный стандарт)
  if (digits.length > 15) return false;
  
  // Проверяем узбекские номера (+998)
  if (digits.length === 12 && digits.startsWith('998')) {
    // Проверяем код оператора (должен начинаться с 9)
    const operatorCode = digits.substring(3, 5);
    return ['90', '91', '93', '94', '95', '97', '98', '99'].includes(operatorCode);
  }
  
  // Проверяем российские номера
  if (digits.length === 11 && (digits.startsWith('7') || digits.startsWith('8'))) {
    // Проверяем код оператора (должен начинаться с 9)
    const operatorCode = digits.substring(1, 4);
    return operatorCode.startsWith('9') || 
           ['495', '499', '812', '383', '343', '391', '423', '473', '4722', '4742'].includes(operatorCode);
  }
  
  // Проверяем российские номера без кода страны
  if (digits.length === 10) {
    // Должен начинаться с 9 (мобильные) или быть городским
    return digits.startsWith('9') || 
           ['495', '499', '812', '383', '343', '391', '423', '473'].some(code => 
             digits.startsWith(code)
           );
  }
  
  // Для других международных номеров - базовая проверка
  return digits.length >= 10 && digits.length <= 15;
}

/**
 * Валидирует email адрес
 * @param {string} email - email адрес
 * @returns {boolean} true если email корректный
 */
export function validateEmail(email) {
  if (!email) return false;
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Экранирует HTML символы в строке
 * @param {string} str - строка для экранирования
 * @returns {string} экранированная строка
 */
export function escapeHtml(str) {
  if (!str) return '';
  
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}
