import { useLanguage } from '@/contexts/LanguageContext'
import { FadeIn } from '@/components/animations/FadeIn'
import { StaggerContainer, StaggerItem } from '@/components/animations/StaggerContainer'
import { Badge } from '@/components/ui/Badge'

const skills = [
  'Python', 'FastAPI', 'PostgreSQL', 'Redis',
  'Docker', 'Linux', 'Network Security', 'OAuth2/JWT',
  'TensorFlow', 'PyTorch', 'Scikit-learn', 'OpenCV',
  'TypeScript', 'React', 'GitHub Actions', 'REST APIs',
]

const timeline = [
  {
    year: '2024',
    title: 'Backend Engineer & Security Specialist',
    desc: 'Building secure, scalable APIs and ML-powered systems.',
  },
  {
    year: '2023',
    title: 'AI/ML Projects',
    desc: 'Cardiovascular disease classification and traffic sign recognition with YOLO.',
  },
  {
    year: '2022',
    title: 'Full-Stack Development',
    desc: 'CRM system with FastAPI backend and responsive frontend.',
  },
  {
    year: '2021',
    title: 'Started Computer Science',
    desc: 'Began CS degree at North South University, Dhaka.',
  },
]

export default function About() {
  const { t } = useLanguage()

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <FadeIn>
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4" style={{ color: 'var(--fg)' }}>
            {t.about.title}
          </h1>
          <p className="text-lg" style={{ color: 'var(--muted)' }}>
            {t.about.subtitle}
          </p>
        </div>
      </FadeIn>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-20">
        <FadeIn direction="left" className="md:col-span-1 flex justify-center">
          <div className="relative">
            <div
              className="absolute inset-0 rounded-2xl blur-xl opacity-25"
              style={{ background: 'var(--accent)' }}
            />
            <img
              src="/img/avatar.jpg"
              alt="Mohammad Mansib Newaz"
              className="relative w-48 h-48 rounded-2xl object-cover border-2"
              style={{ borderColor: 'var(--border)' }}
            />
          </div>
        </FadeIn>

        <FadeIn direction="right" delay={0.1} className="md:col-span-2">
          <h2 className="text-2xl font-semibold mb-4" style={{ color: 'var(--fg)' }}>
            Mohammad Mansib Newaz
          </h2>
          <p className="text-base leading-relaxed mb-6" style={{ color: 'var(--muted)' }}>
            {t.about.bio}
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              href="mailto:mohammad.newaz1@northsouth.edu"
              className="text-sm transition-colors"
              style={{ color: 'var(--accent)' }}
            >
              ✉ mohammad.newaz1@northsouth.edu
            </a>
            <a
              href="https://linkedin.com/in/mnxtr"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm transition-colors"
              style={{ color: 'var(--accent)' }}
            >
              LinkedIn ↗
            </a>
            <a
              href="https://github.com/mnxtr"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm transition-colors"
              style={{ color: 'var(--accent)' }}
            >
              GitHub ↗
            </a>
          </div>
        </FadeIn>
      </div>

      {/* Skills */}
      <FadeIn>
        <h2 className="text-2xl font-semibold mb-6" style={{ color: 'var(--fg)' }}>
          {t.about.skills_title}
        </h2>
      </FadeIn>
      <StaggerContainer className="flex flex-wrap gap-2 mb-20">
        {skills.map((skill) => (
          <StaggerItem key={skill}>
            <Badge className="text-sm px-3 py-1">{skill}</Badge>
          </StaggerItem>
        ))}
      </StaggerContainer>

      {/* Timeline */}
      <FadeIn>
        <h2 className="text-2xl font-semibold mb-8" style={{ color: 'var(--fg)' }}>
          Journey
        </h2>
      </FadeIn>
      <div className="relative">
        <div
          className="absolute left-6 top-0 bottom-0 w-px"
          style={{ background: 'var(--border)' }}
        />
        <StaggerContainer className="space-y-8">
          {timeline.map((item) => (
            <StaggerItem key={item.year}>
              <div className="relative flex gap-6">
                <div
                  className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center text-xs font-bold border"
                  style={{
                    background: 'var(--surface)',
                    borderColor: 'var(--accent)',
                    color: 'var(--accent)',
                  }}
                >
                  {item.year}
                </div>
                <div className="pt-2">
                  <h3 className="font-semibold" style={{ color: 'var(--fg)' }}>
                    {item.title}
                  </h3>
                  <p className="text-sm mt-1" style={{ color: 'var(--muted)' }}>
                    {item.desc}
                  </p>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </div>
  )
}
