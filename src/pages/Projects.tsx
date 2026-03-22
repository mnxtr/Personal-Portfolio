import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Github, ExternalLink } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'
import { FadeIn } from '@/components/animations/FadeIn'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { projects, type Project } from '@/data/projects'

type Filter = 'all' | 'ml' | 'backend' | 'web'

export default function Projects() {
  const { t } = useLanguage()
  const [filter, setFilter] = useState<Filter>('all')

  const filtered = filter === 'all' ? projects : projects.filter((p) => p.category === filter)

  const filters: { key: Filter; label: string }[] = [
    { key: 'all', label: t.projects.all },
    { key: 'ml', label: t.projects.ml },
    { key: 'backend', label: t.projects.backend },
    { key: 'web', label: t.projects.web },
  ]

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <FadeIn>
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4" style={{ color: 'var(--fg)' }}>
            {t.projects.title}
          </h1>
          <p className="text-lg" style={{ color: 'var(--muted)' }}>
            {t.projects.subtitle}
          </p>
        </div>
      </FadeIn>

      {/* Filter buttons */}
      <FadeIn delay={0.1}>
        <div className="flex items-center justify-center gap-2 mb-10 flex-wrap">
          {filters.map(({ key, label }) => (
            <Button
              key={key}
              variant={filter === key ? 'primary' : 'outline'}
              size="sm"
              onClick={() => setFilter(key)}
            >
              {label}
            </Button>
          ))}
        </div>
      </FadeIn>

      <AnimatePresence mode="popLayout">
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {filtered.map((project: Project) => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="flex flex-col h-full">
                <div className="aspect-video overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="font-semibold text-lg" style={{ color: 'var(--fg)' }}>
                      {project.title}
                    </h3>
                    <Badge className="capitalize flex-shrink-0">{project.category}</Badge>
                  </div>
                  <p className="text-sm flex-1 mb-4" style={{ color: 'var(--muted)' }}>
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {project.tags.map((tag) => (
                      <Badge key={tag}>{tag}</Badge>
                    ))}
                  </div>
                  <div className="flex gap-3 pt-2 border-t" style={{ borderColor: 'var(--border)' }}>
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 text-sm font-medium transition-colors"
                        style={{ color: 'var(--muted)' }}
                      >
                        <Github size={16} /> {t.projects.view_github}
                      </a>
                    )}
                    {project.demo && (
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 text-sm font-medium transition-colors"
                        style={{ color: 'var(--accent)' }}
                      >
                        <ExternalLink size={16} /> {t.projects.view_demo}
                      </a>
                    )}
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
