import { CheckCircle } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'
import { FadeIn } from '@/components/animations/FadeIn'
import { Card } from '@/components/ui/Card'

const highlights = [
  'Freelance backend and API projects',
  'Security audits and penetration testing',
  'AI/ML model development and deployment',
  'Technical consulting and code reviews',
  'Infrastructure setup and DevSecOps',
]

export default function Clients() {
  const { t } = useLanguage()

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <FadeIn>
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4" style={{ color: 'var(--fg)' }}>
            {t.clients.title}
          </h1>
          <p className="text-lg" style={{ color: 'var(--muted)' }}>
            {t.clients.subtitle}
          </p>
        </div>
      </FadeIn>

      <FadeIn delay={0.1}>
        <Card className="p-8 text-center mb-10">
          <div
            className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center"
            style={{ background: 'var(--accent-glow)' }}
          >
            <span className="text-2xl">✓</span>
          </div>
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-4"
            style={{ background: 'var(--accent-glow)', color: 'var(--accent)' }}
          >
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            {t.clients.available}
          </div>
          <p className="text-lg" style={{ color: 'var(--muted)' }}>
            {t.clients.available_desc}
          </p>
        </Card>
      </FadeIn>

      <FadeIn delay={0.2}>
        <h2 className="text-xl font-semibold mb-6" style={{ color: 'var(--fg)' }}>
          What I can help with
        </h2>
        <div className="space-y-3">
          {highlights.map((item) => (
            <div key={item} className="flex items-center gap-3">
              <CheckCircle size={18} style={{ color: 'var(--accent)', flexShrink: 0 }} />
              <span style={{ color: 'var(--muted)' }}>{item}</span>
            </div>
          ))}
        </div>
      </FadeIn>

      <FadeIn delay={0.3}>
        <div className="mt-12 text-center">
          <p className="text-sm" style={{ color: 'var(--muted)' }}>
            Ready to start a project? Reach out via{' '}
            <a
              href="mailto:mohammad.newaz1@northsouth.edu"
              style={{ color: 'var(--accent)' }}
            >
              email
            </a>{' '}
            or{' '}
            <a
              href="https://linkedin.com/in/mnxtr"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: 'var(--accent)' }}
            >
              LinkedIn
            </a>
            .
          </p>
        </div>
      </FadeIn>
    </div>
  )
}
