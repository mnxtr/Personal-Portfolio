export interface Service {
  id: string
  title: string
  description: string
  icon: string
}

export const services: Service[] = [
  {
    id: 'backend',
    title: 'Backend & API Development',
    description: 'Building robust, secure REST/GraphQL APIs with FastAPI, PostgreSQL, and Redis. Emphasis on performance and security.',
    icon: 'server',
  },
  {
    id: 'security',
    title: 'API Security Hardening',
    description: 'Security audits, penetration testing, OAuth2/JWT implementation, rate limiting, and vulnerability remediation.',
    icon: 'shield',
  },
  {
    id: 'ml',
    title: 'AI/ML Prototyping',
    description: 'Rapid prototyping and deployment of ML models including computer vision, NLP, and predictive analytics systems.',
    icon: 'cpu',
  },
  {
    id: 'infra',
    title: 'Infrastructure & DevSecOps',
    description: 'Docker, CI/CD pipelines, GitHub Actions, cloud deployment, and infrastructure-as-code for secure delivery.',
    icon: 'cloud',
  },
]
