import i18n from 'i18next';
import { initReactI18next } from '@react-i18next/react-i18next';

const resources = {
  en: {
    translation: {
      satellite: {
        title: 'Dynamic Architect Satellite',
        description: 'Explore our AI-powered tools and agents',
      },
      // Add more translations here
    },
  },
  fr: {
    translation: {
      satellite: {
        title: 'Satellite Dynamic Architect',
        description: 'Explorez nos outils et agents IA',
      },
    },
  },
  // Add more languages
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    fallbackLng: 'en',
    interpolation: { escapeValue: false },
  });

export default i18n;
