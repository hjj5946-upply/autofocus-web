import { type ReactNode } from 'react'
import { AnimatedBackground } from '../background/AnimatedBackground'
import { Header } from './Header'
import { Footer } from './Footer'

export function DetailPageLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <AnimatedBackground />
      {/* Header is outside the backdrop-filter container so position:fixed
          is always relative to the viewport, not a transformed ancestor */}
      <Header />
      <div
        className="relative min-h-screen bg-white/78 backdrop-blur-[2px] dark:bg-ide-bg/82 dark:backdrop-blur-[2px]"
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
