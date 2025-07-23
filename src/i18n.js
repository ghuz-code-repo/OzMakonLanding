import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import translationRU from './locales/ru/translation.json';
import translationUZ from './locales/uz/translation.json';
import translationEn from './locales/en/translation.json';

export const resources = {
  ru: { translation: translationRU },
  uz: { translation: translationUZ },
  en: { translation: translationEn }, // Assuming English uses the same translations as Russian for now
};

export const supportedLanguages = Object.keys(resources);

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'ru',
    fallbackLng: 'ru',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n; 