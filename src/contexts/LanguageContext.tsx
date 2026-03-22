import { createContext, useContext, type ReactNode } from 'react'
import { useUIStore } from '@/stores/uiStore'
import { en } from '@/translations/en'
import { ja } from '@/translations/ja'
import { bn } from '@/translations/bn'

const translations = { en, ja, bn }

type Language = 'en' | 'ja' | 'bn'
type Translations = typeof en

interface LanguageContextType {
  language: Language
  t: Translations
  setLanguage: (lang: Language) => void
}

const LanguageContext = createContext<LanguageContextType | null>(null)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const { language, setLanguage } = useUIStore()
  const t = translations[language]

  return (
    <LanguageContext.Provider value={{ language, t, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider')
  return ctx
}
