import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Github, Linkedin, Mail } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'
import { FadeIn } from '@/components/animations/FadeIn'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { useContact } from '@/hooks/useContact'
import { contactSchema, type ContactFormData } from '@/schemas/contact.schema'

export default function Contact() {
  const { t } = useLanguage()
  const { status, submit } = useContact()
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  })

  const onSubmit = async (data: ContactFormData) => {
    await submit(data)
    reset()
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <FadeIn>
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4" style={{ color: 'var(--fg)' }}>
            {t.contact.title}
          </h1>
          <p className="text-lg" style={{ color: 'var(--muted)' }}>
            {t.contact.subtitle}
          </p>
        </div>
      </FadeIn>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-10">
        {/* Contact info */}
        <FadeIn direction="left" className="md:col-span-2">
          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-semibold mb-4" style={{ color: 'var(--fg)' }}>
                Connect with me
              </h2>
              <div className="space-y-3">
                <a
                  href="mailto:mohammad.newaz1@northsouth.edu"
                  className="flex items-center gap-3 text-sm transition-colors group"
                  style={{ color: 'var(--muted)' }}
                >
                  <Mail size={16} style={{ color: 'var(--accent)' }} />
                  <span className="group-hover:text-[var(--fg)] transition-colors">
                    mohammad.newaz1@northsouth.edu
                  </span>
                </a>
                <a
                  href="https://linkedin.com/in/mnxtr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-sm transition-colors group"
                  style={{ color: 'var(--muted)' }}
                >
                  <Linkedin size={16} style={{ color: 'var(--accent)' }} />
                  <span className="group-hover:text-[var(--fg)] transition-colors">
                    linkedin.com/in/mnxtr
                  </span>
                </a>
                <a
                  href="https://github.com/mnxtr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-sm transition-colors group"
                  style={{ color: 'var(--muted)' }}
                >
                  <Github size={16} style={{ color: 'var(--accent)' }} />
                  <span className="group-hover:text-[var(--fg)] transition-colors">
                    github.com/mnxtr
                  </span>
                </a>
              </div>
            </div>

            <Card className="p-5">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span className="text-sm font-medium" style={{ color: 'var(--fg)' }}>
                  Available
                </span>
              </div>
              <p className="text-xs" style={{ color: 'var(--muted)' }}>
                Open to freelance, consulting, and full-time roles.
              </p>
            </Card>
          </div>
        </FadeIn>

        {/* Contact form */}
        <FadeIn direction="right" delay={0.1} className="md:col-span-3">
          <Card className="p-6">
            {status === 'success' ? (
              <div className="text-center py-8">
                <div className="text-4xl mb-4">✓</div>
                <p className="font-medium" style={{ color: 'var(--fg)' }}>
                  {t.contact.success}
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                  <label
                    className="block text-sm font-medium mb-1.5"
                    style={{ color: 'var(--fg)' }}
                  >
                    {t.contact.name}
                  </label>
                  <input
                    {...register('name')}
                    className="w-full px-4 py-2.5 rounded-lg border text-sm outline-none transition-all"
                    style={{
                      background: 'var(--surface-2)',
                      borderColor: errors.name ? '#ef4444' : 'var(--border)',
                      color: 'var(--fg)',
                    }}
                    placeholder="John Doe"
                  />
                  {errors.name && (
                    <p className="text-red-400 text-xs mt-1">{errors.name.message}</p>
                  )}
                </div>

                <div>
                  <label
                    className="block text-sm font-medium mb-1.5"
                    style={{ color: 'var(--fg)' }}
                  >
                    {t.contact.email}
                  </label>
                  <input
                    {...register('email')}
                    type="email"
                    className="w-full px-4 py-2.5 rounded-lg border text-sm outline-none transition-all"
                    style={{
                      background: 'var(--surface-2)',
                      borderColor: errors.email ? '#ef4444' : 'var(--border)',
                      color: 'var(--fg)',
                    }}
                    placeholder="john@example.com"
                  />
                  {errors.email && (
                    <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>
                  )}
                </div>

                <div>
                  <label
                    className="block text-sm font-medium mb-1.5"
                    style={{ color: 'var(--fg)' }}
                  >
                    {t.contact.message}
                  </label>
                  <textarea
                    {...register('message')}
                    rows={5}
                    className="w-full px-4 py-2.5 rounded-lg border text-sm outline-none transition-all resize-none"
                    style={{
                      background: 'var(--surface-2)',
                      borderColor: errors.message ? '#ef4444' : 'var(--border)',
                      color: 'var(--fg)',
                    }}
                    placeholder="Tell me about your project..."
                  />
                  {errors.message && (
                    <p className="text-red-400 text-xs mt-1">{errors.message.message}</p>
                  )}
                </div>

                {status === 'error' && (
                  <p className="text-red-400 text-sm">{t.contact.error}</p>
                )}

                <Button
                  type="submit"
                  size="lg"
                  className="w-full"
                  disabled={status === 'sending'}
                >
                  {status === 'sending' ? t.contact.sending : t.contact.send}
                </Button>
              </form>
            )}
          </Card>
        </FadeIn>
      </div>
    </div>
  )
}
