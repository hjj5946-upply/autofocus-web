import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useActiveSection } from '../../hooks/useActiveSection'
import { SECTION_IDS, NAVIGATOR_SECTIONS } from '../../constants/navigation'
import type { SectionId } from '../../types'

export function SectionNavigator() {
  const { t } = useTranslation()
  const activeSection = useActiveSection(SECTION_IDS)
  const [hoveredId, setHoveredId] = useState<SectionId | null>(null)

  const scrollTo = (id: SectionId) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
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
              {/* Active ring */}
              {isActive && (
                <span className="absolute inset-0 rounded-full border border-brand-accent/40 scale-100 animate-none" />
              )}
              {/* Dot */}
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
  )
}
