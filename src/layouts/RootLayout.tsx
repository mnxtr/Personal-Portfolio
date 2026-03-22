import { Outlet, ScrollRestoration } from 'react-router-dom'
import { Navbar } from '@/components/ui/Navbar'
import { Footer } from '@/components/ui/Footer'

export function RootLayout() {
  return (
    <div className="min-h-screen flex flex-col" style={{ background: 'var(--bg)', color: 'var(--fg)' }}>
      <Navbar />
      <main className="flex-1 pt-16">
        <Outlet />
      </main>
      <Footer />
      <ScrollRestoration />
    </div>
  )
}
