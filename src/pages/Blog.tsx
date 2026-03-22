import { Clock, Tag } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'
import { FadeIn } from '@/components/animations/FadeIn'
import { StaggerContainer, StaggerItem } from '@/components/animations/StaggerContainer'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { blogPosts } from '@/data/blog'

export default function Blog() {
  const { t } = useLanguage()

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <FadeIn>
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4" style={{ color: 'var(--fg)' }}>
            {t.blog.title}
          </h1>
          <p className="text-lg" style={{ color: 'var(--muted)' }}>
            {t.blog.subtitle}
          </p>
        </div>
      </FadeIn>

      <StaggerContainer className="space-y-6">
        {blogPosts.map((post) => (
          <StaggerItem key={post.id}>
            <Card className="p-7">
              <div className="flex items-center gap-3 mb-3 text-sm" style={{ color: 'var(--muted)' }}>
                <span className="flex items-center gap-1">
                  <Clock size={14} /> {post.readTime}
                </span>
                <span>•</span>
                <span>{post.date}</span>
              </div>
              <h2 className="text-xl font-semibold mb-3" style={{ color: 'var(--fg)' }}>
                {post.title}
              </h2>
              <p className="text-sm mb-4 leading-relaxed" style={{ color: 'var(--muted)' }}>
                {post.excerpt}
              </p>
              <div className="flex items-center gap-2 flex-wrap">
                <Tag size={14} style={{ color: 'var(--muted)' }} />
                {post.tags.map((tag) => (
                  <Badge key={tag}>{tag}</Badge>
                ))}
              </div>
            </Card>
          </StaggerItem>
        ))}
      </StaggerContainer>
    </div>
  )
}
