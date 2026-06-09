import { type ReactNode } from 'react'
import { Header } from './Header'
import { Footer } from './Footer'

export function DetailPageLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      <div
        className="relative min-h-screen bg-white dark:bg-ide-bg"
        style={{ zIndex: 1 }}
      >
        <main className="pt-24 pb-16 sm:pb-24">
          {children}
        </main>
        <Footer />
      </div>
    </>
  )
}
