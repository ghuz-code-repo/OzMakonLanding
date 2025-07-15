/**
 * Конфигурация для MacroCRM API
 * 
 * ВНИМАНИЕ: Перед использованием необходимо настроить параметры!
 */

// Пример конфигурации для разных окружений
export const MACRO_CONFIGS = {
  // Для тестирования (не рабочий пример)
  development: {
    API_URL: 'https://api.macrocrm.gh.uz/estate/request/',
    DOMAIN: 'test.gh.uz',
    APP_SECRET: 'xQc86qxm62EfprXDEsUmpYHTDlp32LAcCfEs',
  },
  
  // Для production (настройте реальные значения)
  production: {
    API_URL: 'https://api.macrocrm.gh.uz/estate/request/',
    DOMAIN: 'test.gh.uz', // ЗАМЕНИТЕ на ваш домен
    APP_SECRET: 'xQc86qxm62EfprXDEsUmpYHTDlp32LAcCfEs', // ЗАМЕНИТЕ на ваш секретный ключ
  }
};

// Определение текущего окружения
const isDevelopment = process.env.NODE_ENV === 'development';
export const CURRENT_CONFIG = isDevelopment ? MACRO_CONFIGS.development : MACRO_CONFIGS.production;
/**
 * ИНСТРУКЦИИ ПО НАСТРОЙКЕ:
 * 
 * 1. Получите секретный ключ APP_SECRET:
 *    - Войдите в админку MacroCRM
 *    - Перейдите в "Настройки" → "API" 
 *    - Скопируйте секретный ключ
 * 
 * 2. Зарегистрируйте домен:
 *    - В админке MacroCRM: "Настройки" → "Домены"
 *    - Добавьте ваш домен (ozmakon.ru)
 *    - Убедитесь что домен активен
 * 
 * 3. Обновите конфигурацию:
 *    - Замените 'ozmakon.ru' на ваш реальный домен
 *    - Замените 'YOUR_REAL_SECRET_KEY' на полученный ключ
 * 
 * 4. Выберите правильный API_URL:
 *    - Для macroserver.ru: https://api.macroserver.ru/estate/request/
 *    - Для sbercrm.com: https://api.macro.sbercrm.com/estate/request/
 */
