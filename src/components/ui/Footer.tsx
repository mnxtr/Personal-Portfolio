import { Link } from 'react-router-dom'
import { Github, Linkedin, Mail } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'

export function Footer() {
  const { t } = useLanguage()
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-[var(--border)] bg-[var(--surface)] mt-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div>
            <Link to="/" className="text-xl font-bold text-[var(--fg)]">
              mnxtr<span className="text-[var(--accent)]">.</span>
            </Link>
            <p className="text-[var(--muted)] text-sm mt-1">
              Backend Engineer & Security Specialist
            </p>
          </div>

          <div className="flex items-center gap-4">
            <a
              href="https://github.com/mnxtr"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--muted)] hover:text-[var(--accent)] transition-colors"
              aria-label="GitHub"
            >
              <Github size={20} />
            </a>
            <a
              href="https://linkedin.com/in/mnxtr"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--muted)] hover:text-[var(--accent)] transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin size={20} />
            </a>
            <a
              href="mailto:mohammad.newaz1@northsouth.edu"
              className="text-[var(--muted)] hover:text-[var(--accent)] transition-colors"
              aria-label="Email"
            >
              <Mail size={20} />
            </a>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-[var(--border)] flex flex-col sm:flex-row justify-between items-center gap-2 text-[var(--muted)] text-sm">
          <p>© {year} Mohammad Mansib Newaz. {t.footer.rights}</p>
          <p>{t.footer.built_with}</p>
        </div>
      </div>
    </footer>
  )
}
