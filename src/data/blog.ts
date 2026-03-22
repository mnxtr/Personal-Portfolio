export interface BlogPost {
  id: string
  title: string
  excerpt: string
  date: string
  readTime: string
  tags: string[]
  slug: string
}

export const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'Securing FastAPI Applications: Best Practices',
    excerpt: 'A comprehensive guide to hardening your FastAPI backend against common vulnerabilities including SQL injection, auth bypass, and rate limiting.',
    date: '2024-03-15',
    readTime: '8 min read',
    tags: ['FastAPI', 'Security', 'Python'],
    slug: 'secure-fastapi',
  },
  {
    id: '2',
    title: 'Deploying ML Models with FastAPI',
    excerpt: 'Step-by-step guide to building production-ready ML inference endpoints using FastAPI, Docker, and async processing.',
    date: '2024-02-20',
    readTime: '10 min read',
    tags: ['ML', 'FastAPI', 'Deployment'],
    slug: 'fastapi-ml-deployment',
  },
  {
    id: '3',
    title: 'PostgreSQL Performance Optimization',
    excerpt: 'Advanced techniques for optimizing PostgreSQL queries, indexing strategies, and connection pooling for high-throughput applications.',
    date: '2024-01-10',
    readTime: '12 min read',
    tags: ['PostgreSQL', 'Performance', 'Backend'],
    slug: 'postgres-optimization',
  },
]
