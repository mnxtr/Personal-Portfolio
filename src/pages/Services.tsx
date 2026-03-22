import { Server, Shield, Cpu, Cloud } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'
import { FadeIn } from '@/components/animations/FadeIn'
import { StaggerContainer, StaggerItem } from '@/components/animations/StaggerContainer'
import { Card } from '@/components/ui/Card'
import { services } from '@/data/clients'

const iconMap: Record<string, React.ComponentType<{ size?: number; style?: React.CSSProperties }>> = {
  server: Server,
  shield: Shield,
  cpu: Cpu,
  cloud: Cloud,
}

export default function Services() {
  const { t } = useLanguage()

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <FadeIn>
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4" style={{ color: 'var(--fg)' }}>
            {t.services.title}
          </h1>
          <p className="text-lg" style={{ color: 'var(--muted)' }}>
            {t.services.subtitle}
          </p>
        </div>
      </FadeIn>

      <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {services.map((service) => {
          const Icon = iconMap[service.icon]
          return (
            <StaggerItem key={service.id}>
              <Card className="p-7">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                  style={{ background: 'var(--accent-glow)' }}
                >
                  {Icon && <Icon size={24} style={{ color: 'var(--accent)' }} />}
                </div>
                <h3 className="text-lg font-semibold mb-2" style={{ color: 'var(--fg)' }}>
                  {service.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--muted)' }}>
                  {service.description}
                </p>
              </Card>
            </StaggerItem>
          )
        })}
      </StaggerContainer>

      {/* CTA */}
      <FadeIn delay={0.3}>
        <div
          className="mt-16 p-8 rounded-2xl text-center border"
          style={{ background: 'var(--surface)', borderColor: 'var(--accent)' }}
        >
          <h2 className="text-2xl font-bold mb-3" style={{ color: 'var(--fg)' }}>
            Interested in working together?
          </h2>
          <p className="mb-6" style={{ color: 'var(--muted)' }}>
            Let's discuss your project requirements and how I can help.
          </p>
          <a href="/contact">
            <button
              className="px-7 py-3 rounded-xl font-medium text-white transition-all"
              style={{ background: 'var(--accent)' }}
            >
              Get in Touch
            </button>
          </a>
        </div>
      </FadeIn>
    </div>
  )
}
