import { useTranslation } from '../hooks/useTranslation';

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="p-6 text-center text-gray-400 bg-darkBg bg-opacity-80">
      <p className="mb-2">
        {t('footer.copyright')}
      </p>
      <p className="text-xs">
        {t('footer.description')}
      </p>
    </footer>
  );
}