import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useActiveSection } from '../../hooks/useActiveSection'
import { SECTION_IDS, NAVIGATOR_SECTIONS } from '../../constants/navigation'
import type { SectionId } from '../../types'

export function SectionNavigator() {
  const { t } = useTranslation()
  const activeSection = useActiveSection(SECTION_IDS)
  const [hoveredId, setHoveredId] = useState<SectionId | null>(null)
  const [showTop, setShowTop] = useState(false)

  useEffect(() => {
    const handler = () => setShowTop(window.scrollY >= 300)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  const scrollTo = (id: SectionId) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <>
      <nav
        className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col items-end gap-3"
        aria-label="Section navigator"
      >
        {NAVIGATOR_SECTIONS.map(({ id, labelKey }) => {
          const isActive = activeSection === id
          const isHovered = hoveredId === id

          return (
            <button
              key={id}
              onClick={() => scrollTo(id)}
              onMouseEnter={() => setHoveredId(id)}
              onMouseLeave={() => setHoveredId(null)}
              className="flex items-center gap-2.5 group cursor-pointer"
              aria-label={t(labelKey)}
            >
              {/* Label — appears on hover */}
              <span
                className={`text-xs font-mono tracking-wider transition-all duration-200 whitespace-nowrap ${
                  isHovered || isActive
                    ? 'opacity-100 translate-x-0'
                    : 'opacity-0 translate-x-2 pointer-events-none'
                } ${isActive ? 'text-brand-accent' : 'text-slate-500 dark:text-ide-muted'}`}
              >
                {t(labelKey)}
              </span>

              {/* Indicator */}
              <div className="relative flex items-center justify-center w-5 h-5">
                {isActive && (
                  <span className="absolute inset-0 rounded-full border border-brand-accent/40" />
                )}
                <span
                  className={`rounded-full transition-all duration-200 ${
                    isActive
                      ? 'w-2.5 h-2.5 bg-brand-accent'
                      : isHovered
                      ? 'w-2 h-2 bg-slate-400 dark:bg-ide-muted'
                      : 'w-1.5 h-1.5 bg-slate-300 dark:bg-white/20'
                  }`}
                />
              </div>
            </button>
          )
        })}
      </nav>

      {/* TOP button — icon only, no bg, no border */}
      <div
        className={`fixed right-6 bottom-8 z-50 hidden lg:block transition-opacity duration-300 ${
          showTop ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <button
          onClick={scrollToTop}
          className="flex items-center justify-center p-1 opacity-60 hover:opacity-100 transition-opacity duration-200 cursor-pointer text-slate-500 dark:text-white/50"
          aria-label="Scroll to top"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="18 15 12 9 6 15" />
          </svg>
        </button>
      </div>
    </>
  )
}
