import { Sun, Moon } from 'lucide-react'
import { useUIStore } from '@/stores/uiStore'

export function ThemeToggle() {
  const { theme, toggleTheme } = useUIStore()

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-lg text-[var(--muted)] hover:text-[var(--fg)] hover:bg-[var(--surface)] transition-all duration-200"
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
    >
      {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  )
}
