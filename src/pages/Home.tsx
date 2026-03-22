import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Github, Linkedin, Mail, ExternalLink } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'
import { FadeIn } from '@/components/animations/FadeIn'
import { StaggerContainer, StaggerItem } from '@/components/animations/StaggerContainer'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { projects } from '@/data/projects'
import { blogPosts } from '@/data/blog'

export default function Home() {
  const { t } = useLanguage()
  const featuredProjects = projects.slice(0, 3)
  const recentPosts = blogPosts.slice(0, 2)

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center">
        {/* Background gradient orbs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div
            className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl opacity-20"
            style={{ background: 'var(--accent)' }}
          />
          <div
            className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full blur-3xl opacity-15"
            style={{ background: 'var(--accent-2)' }}
          />
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full border text-sm mb-6"
                style={{ borderColor: 'var(--border)', color: 'var(--muted)' }}
              >
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                Available for opportunities
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-5xl sm:text-6xl font-bold leading-tight mb-4"
                style={{ color: 'var(--fg)' }}
              >
                {t.home.greeting}{' '}
                <span style={{ color: 'var(--accent)' }}>Mansib</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-xl font-medium mb-3"
                style={{ color: 'var(--muted)' }}
              >
                {t.home.title}
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-base mb-8 max-w-lg"
                style={{ color: 'var(--muted)' }}
              >
                {t.home.subtitle}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="flex flex-wrap gap-3 mb-10"
              >
                <Link to="/projects">
                  <Button size="lg">
                    {t.home.cta_primary}
                    <ArrowRight size={18} />
                  </Button>
                </Link>
                <Link to="/contact">
                  <Button variant="outline" size="lg">
                    {t.home.cta_secondary}
                  </Button>
                </Link>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="flex items-center gap-4"
              >
                <a
                  href="https://github.com/mnxtr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors"
                  style={{ color: 'var(--muted)' }}
                  aria-label="GitHub"
                >
                  <Github size={22} />
                </a>
                <a
                  href="https://linkedin.com/in/mnxtr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors"
                  style={{ color: 'var(--muted)' }}
                  aria-label="LinkedIn"
                >
                  <Linkedin size={22} />
                </a>
                <a
                  href="mailto:mohammad.newaz1@northsouth.edu"
                  className="transition-colors"
                  style={{ color: 'var(--muted)' }}
                  aria-label="Email"
                >
                  <Mail size={22} />
                </a>
              </motion.div>
            </div>

            {/* Avatar / Profile */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="hidden lg:flex justify-center"
            >
              <div className="relative">
                <div
                  className="absolute inset-0 rounded-full blur-2xl opacity-30 scale-110"
                  style={{ background: `radial-gradient(circle, var(--accent), transparent)` }}
                />
                <img
                  src="/img/avatar.jpg"
                  alt="Mohammad Mansib Newaz"
                  className="relative w-72 h-72 rounded-full object-cover border-4"
                  style={{ borderColor: 'var(--accent)' }}
                />
              </div>
            </motion.div>
          </div>

          {/* Stats */}
          <FadeIn delay={0.6}>
            <div className="grid grid-cols-3 gap-6 mt-16 pt-12 border-t" style={{ borderColor: 'var(--border)' }}>
              {[
                { value: t.home.stats.experience, label: t.home.stats.experience_label },
                { value: t.home.stats.projects, label: t.home.stats.projects_label },
                { value: t.home.stats.specialties, label: t.home.stats.specialties_label },
              ].map(({ value, label }) => (
                <div key={label} className="text-center">
                  <p className="text-3xl font-bold" style={{ color: 'var(--accent)' }}>{value}</p>
                  <p className="text-sm mt-1" style={{ color: 'var(--muted)' }}>{label}</p>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <FadeIn>
            <div className="flex items-center justify-between mb-10">
              <div>
                <h2 className="text-3xl font-bold" style={{ color: 'var(--fg)' }}>
                  Featured Projects
                </h2>
                <p className="mt-2" style={{ color: 'var(--muted)' }}>
                  A selection of my recent work
                </p>
              </div>
              <Link to="/projects">
                <Button variant="ghost" size="sm">
                  View all <ArrowRight size={16} />
                </Button>
              </Link>
            </div>
          </FadeIn>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredProjects.map((project) => (
              <StaggerItem key={project.id}>
                <Card className="flex flex-col h-full">
                  <div className="aspect-video overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                  </div>
                  <div className="p-5 flex flex-col flex-1">
                    <h3 className="font-semibold text-base mb-2" style={{ color: 'var(--fg)' }}>
                      {project.title}
                    </h3>
                    <p className="text-sm flex-1 mb-4" style={{ color: 'var(--muted)' }}>
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {project.tags.slice(0, 3).map((tag) => (
                        <Badge key={tag}>{tag}</Badge>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 text-xs transition-colors"
                          style={{ color: 'var(--muted)' }}
                        >
                          <Github size={14} /> GitHub
                        </a>
                      )}
                      {project.demo && (
                        <a
                          href={project.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 text-xs transition-colors"
                          style={{ color: 'var(--accent)' }}
                        >
                          <ExternalLink size={14} /> Demo
                        </a>
                      )}
                    </div>
                  </div>
                </Card>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Recent Blog Posts */}
      <section className="py-20 px-4 sm:px-6 lg:px-8" style={{ background: 'var(--surface)' }}>
        <div className="max-w-6xl mx-auto">
          <FadeIn>
            <div className="flex items-center justify-between mb-10">
              <div>
                <h2 className="text-3xl font-bold" style={{ color: 'var(--fg)' }}>
                  Latest Writings
                </h2>
                <p className="mt-2" style={{ color: 'var(--muted)' }}>
                  Thoughts on engineering and security
                </p>
              </div>
              <Link to="/blog">
                <Button variant="ghost" size="sm">
                  All posts <ArrowRight size={16} />
                </Button>
              </Link>
            </div>
          </FadeIn>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {recentPosts.map((post) => (
              <StaggerItem key={post.id}>
                <Card className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    {post.tags.map((tag) => (
                      <Badge key={tag}>{tag}</Badge>
                    ))}
                    <span className="ml-auto text-xs" style={{ color: 'var(--muted)' }}>
                      {post.readTime}
                    </span>
                  </div>
                  <h3 className="font-semibold mb-2" style={{ color: 'var(--fg)' }}>
                    {post.title}
                  </h3>
                  <p className="text-sm mb-4" style={{ color: 'var(--muted)' }}>
                    {post.excerpt}
                  </p>
                  <p className="text-xs" style={{ color: 'var(--muted)' }}>
                    {post.date}
                  </p>
                </Card>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-2xl mx-auto">
          <FadeIn>
            <h2 className="text-4xl font-bold mb-4" style={{ color: 'var(--fg)' }}>
              Let's build something together
            </h2>
            <p className="text-lg mb-8" style={{ color: 'var(--muted)' }}>
              Available for freelance projects, consulting, and full-time opportunities.
            </p>
            <Link to="/contact">
              <Button size="lg">
                Get in Touch <ArrowRight size={18} />
              </Button>
            </Link>
          </FadeIn>
        </div>
      </section>
    </div>
  )
}
