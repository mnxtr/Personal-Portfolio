import { useLanguage } from '../context/LanguageContext';
import { useTranslation } from '../hooks/useTranslation';

export const LanguageToggle = () => {
  const { language, changeLanguage } = useLanguage();
  const { t } = useTranslation();

  const languages = [
    { code: 'en', name: t('language.en') },
    { code: 'bn', name: t('language.bn') },
    { code: 'ja', name: t('language.ja') }
  ];

  return (
    <div className="relative">
      <button
        className="p-2 rounded-full hover:bg-gray-700 transition-colors duration-300 flex items-center"
        aria-label="Change language"
      >
        <span className="text-sm font-medium mr-2">{t(`language.${language}`)}</span>
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      
      <div className="absolute right-0 mt-2 w-48 bg-darkBg border border-gray-700 rounded-lg shadow-lg z-10 hidden group-hover:block">
        <ul className="py-1">
          {languages.map((lang) => (
            <li key={lang.code}>
              <button
                onClick={() => changeLanguage(lang.code)}
                className={`w-full text-left px-4 py-2 text-sm hover:bg-primary hover:text-white transition-colors duration-300 ${
                  language === lang.code ? 'bg-primary text-white' : 'text-gray-300'
                }`}
              >
                {lang.name}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};