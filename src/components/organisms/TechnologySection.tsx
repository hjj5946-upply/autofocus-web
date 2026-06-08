import { useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SectionTag } from '../atoms/SectionTag'
import { Container } from '../atoms/Container'

gsap.registerPlugin(ScrollTrigger)

const TECH_ITEMS = [
  {
    key: 'ai',
    badge: 'AI / ML',
    badgeColor: '#3b82f6',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 2a7 7 0 0 1 7 7 7 7 0 0 1-7 7 7 7 0 0 1-7-7 7 7 0 0 1 7-7z" />
        <path d="M8 14s1.5 2 4 2 4-2 4-2" />
        <line x1="9" y1="9" x2="9.01" y2="9" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="15" y1="9" x2="15.01" y2="9" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M12 22v-3" />
        <path d="M4.93 19.07 6.34 17.66" />
        <path d="M19.07 19.07l-1.41-1.41" />
      </svg>
    ),
  },
  {
    key: 'predictive',
    badge: 'PREDICTIVE',
    badgeColor: '#8b5cf6',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
      </svg>
    ),
  },
  {
    key: 'integration',
    badge: 'INTEGRATION',
    badgeColor: '#06b6d4',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="12" r="3" />
        <path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83" />
      </svg>
    ),
  },
  {
    key: 'monitoring',
    badge: 'REAL-TIME',
    badgeColor: '#10b981',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <line x1="8" y1="21" x2="16" y2="21" />
        <line x1="12" y1="17" x2="12" y2="21" />
        <path d="M7 8l2 3 3-6 2 4 1-2" />
      </svg>
    ),
  },
]

export function TechnologySection() {
  const { t } = useTranslation()
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(() => {
    gsap.fromTo(
      '.tech-header',
      { opacity: 0, y: 24 },
      {
        opacity: 1, y: 0, duration: 0.6,
        scrollTrigger: { trigger: '.tech-header', start: 'top 85%', once: true },
      }
    )
    gsap.fromTo(
      '.tech-card',
      { opacity: 0, y: 30 },
      {
        opacity: 1, y: 0, duration: 0.5, stagger: 0.1,
        scrollTrigger: { trigger: '.tech-grid', start: 'top 80%', once: true },
      }
    )
  }, { scope: sectionRef })

  return (
    <section id="technology" ref={sectionRef} className="scroll-mt-16 py-16 sm:py-24">
      <Container>
        <div className="tech-header text-center mb-10 sm:mb-16">
          <SectionTag className="justify-center mb-5">
            {t('technology.tag')}
          </SectionTag>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
            {t('technology.title')}
          </h2>
          <p className="text-slate-500 dark:text-ide-muted max-w-xl mx-auto">
            {t('technology.subtitle')}
          </p>
        </div>

        <div className="tech-grid grid grid-cols-1 md:grid-cols-2 gap-6">
          {TECH_ITEMS.map(({ key, badge, badgeColor, icon }) => (
            <div
              key={key}
              className="tech-card group rounded-xl border border-slate-200 dark:border-white/6 bg-white dark:bg-ide-card p-8 hover:shadow-md transition-all duration-200 relative overflow-hidden"
            >
              {/* Background glow */}
              <div
                className="absolute -top-16 -right-16 w-48 h-48 rounded-full opacity-0 group-hover:opacity-5 transition-opacity duration-500"
                style={{ backgroundColor: badgeColor }}
              />

              <div className="relative">
                {/* Badge + icon row */}
                <div className="flex items-start justify-between mb-5">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: `${badgeColor}15`, color: badgeColor }}
                  >
                    {icon}
                  </div>
                  <span
                    className="text-xs font-mono font-bold tracking-widest px-2.5 py-1 rounded-full"
                    style={{ backgroundColor: `${badgeColor}15`, color: badgeColor }}
                  >
                    {badge}
                  </span>
                </div>

                <h3 className="text-lg font-semibold text-slate-900 dark:text-ide-text mb-3">
                  {t(`technology.${key}_title`)}
                </h3>
                <p className="text-slate-500 dark:text-ide-muted leading-relaxed text-sm">
                  {t(`technology.${key}_desc`)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}
