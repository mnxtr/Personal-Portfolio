import { useEffect, type ReactNode } from 'react'
import { useUIStore } from '@/stores/uiStore'

export function ThemeProvider({ children }: { children: ReactNode }) {
  const { theme } = useUIStore()

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  return <>{children}</>
}
