
export const MACRO_CONFIGS = {
  development: {
    API_URL: 'https://api.macrocrm.gh.uz/estate/request/',
    DOMAIN: 'ozmakon.gh.uz',
    APP_SECRET: 'n5MKnREzemzG39tW83Qb6MEwGq83qQ8ayx5f',
  },
  
  production: {
    API_URL: 'https://api.macrocrm.gh.uz/estate/request/',
    DOMAIN: 'ozmakon.gh.uz',
    APP_SECRET: 'n5MKnREzemzG39tW83Qb6MEwGq83qQ8ayx5f',
  }
};

// Определение текущего окружения
const isDevelopment = process.env.NODE_ENV === 'development';
export const CURRENT_CONFIG = isDevelopment ? MACRO_CONFIGS.development : MACRO_CONFIGS.production;
