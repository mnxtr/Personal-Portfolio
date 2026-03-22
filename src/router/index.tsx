import { createBrowserRouter } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import { RootLayout } from '@/layouts/RootLayout'

const Home = lazy(() => import('@/pages/Home'))
const About = lazy(() => import('@/pages/About'))
const Projects = lazy(() => import('@/pages/Projects'))
const Services = lazy(() => import('@/pages/Services'))
const Blog = lazy(() => import('@/pages/Blog'))
const Clients = lazy(() => import('@/pages/Clients'))
const Contact = lazy(() => import('@/pages/Contact'))

function PageLoader() {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="w-8 h-8 border-2 border-[var(--accent)] border-t-transparent rounded-full animate-spin" />
    </div>
  )
}

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<PageLoader />}>
            <Home />
          </Suspense>
        ),
      },
      {
        path: 'about',
        element: (
          <Suspense fallback={<PageLoader />}>
            <About />
          </Suspense>
        ),
      },
      {
        path: 'projects',
        element: (
          <Suspense fallback={<PageLoader />}>
            <Projects />
          </Suspense>
        ),
      },
      {
        path: 'services',
        element: (
          <Suspense fallback={<PageLoader />}>
            <Services />
          </Suspense>
        ),
      },
      {
        path: 'blog',
        element: (
          <Suspense fallback={<PageLoader />}>
            <Blog />
          </Suspense>
        ),
      },
      {
        path: 'clients',
        element: (
          <Suspense fallback={<PageLoader />}>
            <Clients />
          </Suspense>
        ),
      },
      {
        path: 'contact',
        element: (
          <Suspense fallback={<PageLoader />}>
            <Contact />
          </Suspense>
        ),
      },
    ],
  },
])
