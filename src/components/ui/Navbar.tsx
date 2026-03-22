import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'
import { ThemeToggle } from './ThemeToggle'
import { LanguageSwitcher } from './LanguageSwitcher'

export function Navbar() {
  const { t } = useLanguage()
  const location = useLocation()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setIsMobileOpen(false)
  }, [location])

  const navLinks = [
    { to: '/', label: t.nav.home },
    { to: '/about', label: t.nav.about },
    { to: '/projects', label: t.nav.projects },
    { to: '/services', label: t.nav.services },
    { to: '/blog', label: t.nav.blog },
    { to: '/clients', label: t.nav.clients },
    { to: '/contact', label: t.nav.contact },
  ]

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[var(--bg)]/90 backdrop-blur-md border-b border-[var(--border)]'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link
            to="/"
            className="text-xl font-bold text-[var(--fg)] hover:text-[var(--accent)] transition-colors"
          >
            mnxtr<span className="text-[var(--accent)]">.</span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  location.pathname === to
                    ? 'text-[var(--accent)] bg-[var(--accent-glow)]'
                    : 'text-[var(--muted)] hover:text-[var(--fg)] hover:bg-[var(--surface)]'
                }`}
              >
                {label}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-2">
            <LanguageSwitcher />
            <ThemeToggle />
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-[var(--muted)] hover:text-[var(--fg)] p-2"
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            aria-label="Toggle menu"
          >
            {isMobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[var(--bg)]/95 backdrop-blur-md border-b border-[var(--border)]"
          >
            <div className="px-4 py-3 flex flex-col gap-1">
              {navLinks.map(({ to, label }) => (
                <Link
                  key={to}
                  to={to}
                  className={`px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                    location.pathname === to
                      ? 'text-[var(--accent)] bg-[var(--accent-glow)]'
                      : 'text-[var(--muted)] hover:text-[var(--fg)]'
                  }`}
                >
                  {label}
                </Link>
              ))}
              <div className="flex items-center gap-2 pt-2 border-t border-[var(--border)] mt-1">
                <LanguageSwitcher />
                <ThemeToggle />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
