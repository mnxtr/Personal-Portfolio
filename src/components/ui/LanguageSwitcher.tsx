import { useLanguage } from '@/contexts/LanguageContext'

const languages = [
  { code: 'en', label: 'EN' },
  { code: 'ja', label: 'JA' },
  { code: 'bn', label: 'বং' },
] as const

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage()

  return (
    <div className="flex items-center gap-1 bg-[var(--surface)] rounded-lg p-1">
      {languages.map(({ code, label }) => (
        <button
          key={code}
          onClick={() => setLanguage(code)}
          className={`px-2 py-1 rounded text-xs font-medium transition-all duration-200 ${
            language === code
              ? 'bg-[var(--accent)] text-white'
              : 'text-[var(--muted)] hover:text-[var(--fg)]'
          }`}
          aria-label={`Switch to ${code}`}
        >
          {label}
        </button>
      ))}
    </div>
  )
}
