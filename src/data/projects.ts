export interface Project {
  id: string
  title: string
  description: string
  image: string
  tags: string[]
  category: 'ml' | 'backend' | 'web'
  github?: string
  demo?: string
}

export const projects: Project[] = [
  {
    id: 'ekg-ml',
    title: 'Ensemble ML for Cardiovascular Disease',
    description: 'Using multiple ML models to classify cardiovascular disorders by analyzing EKG waves with high accuracy.',
    image: '/img/EKG.jpg',
    tags: ['Python', 'Scikit-learn', 'TensorFlow', 'ML'],
    category: 'ml',
    github: 'https://github.com/mnxtr',
  },
  {
    id: 'traffic-signs',
    title: 'Traffic Symbol Recognition',
    description: 'Real-time traffic sign detection using YOLOv11n for autonomous driving applications.',
    image: '/img/traffic-signs.jpg',
    tags: ['Python', 'YOLOv11n', 'PyTorch', 'OpenCV'],
    category: 'ml',
    github: 'https://github.com/mnxtr/bd-traffic-signs',
    demo: 'https://mnxtr.github.io/website/',
  },
  {
    id: 'mdbms',
    title: 'Manufacturing Database Management System',
    description: 'Interactive and fully responsive front-end for a Manufacturing DBMS with rich data visualization.',
    image: '/img/manufactureDBMS.jpg',
    tags: ['HTML', 'CSS', 'JavaScript'],
    category: 'web',
    github: 'https://github.com/mnxtr/mdbms-html',
  },
  {
    id: 'crm',
    title: 'Customer Relationship Management System',
    description: 'Full-featured CRM system to streamline organization-customer interactions with secure API backend.',
    image: '/img/crm.jpg',
    tags: ['Python', 'FastAPI', 'PostgreSQL'],
    category: 'backend',
    github: 'https://github.com/mnxtr/Customer-Relationship-Management-System',
  },
]
