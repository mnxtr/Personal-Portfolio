import { useLanguage } from './LanguageContext';
import en from '../translations/en.json';
import bn from '../translations/bn.json';
import ja from '../translations/ja.json';

const translations = {
  en,
  bn,
  ja
};

export const useTranslation = () => {
  const { language } = useLanguage();
  
  const t = (key, options = {}) => {
    // Split key by dots to navigate nested objects
    const keys = key.split('.');
    let value = translations[language];
    
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        // If key not found, try English as fallback
        value = en;
        for (const k2 of keys) {
          if (value && typeof value === 'object' && k2 in value) {
            value = value[k2];
          } else {
            return key; // Return original key if not found
          }
        }
        break;
      }
    }
    
    // Handle interpolation
    if (typeof value === 'string' && options) {
      Object.entries(options).forEach(([key, value]) => {
        const regex = new RegExp(`{${key}}`, 'g');
        value = value.replace(regex, value);
      });
    }
    
    return value;
  };
  
  return { t };
};