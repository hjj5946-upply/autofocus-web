import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SectionTag } from '../atoms/SectionTag'
import { Container } from '../atoms/Container'

gsap.registerPlugin(ScrollTrigger)

const MODULE_SLUGS: Record<string, string> = {
  pdi: '/solutions/pdi',
  crm: '/solutions/crm',
  dms: '/solutions/dms',
  logistics: '/solutions',
  parts: '/solutions',
  finance: '/solutions',
}

const MODULES = [
  {
    key: 'pdi',
    color: '#3b82f6',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M9 11l3 3L22 4" />
        <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
      </svg>
    ),
  },
  {
    key: 'logistics',
    color: '#8b5cf6',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="1" y="3" width="15" height="13" rx="1" />
        <path d="M16 8h4l3 3v5h-7V8z" />
        <circle cx="5.5" cy="18.5" r="2.5" />
        <circle cx="18.5" cy="18.5" r="2.5" />
      </svg>
    ),
  },
  {
    key: 'crm',
    color: '#06b6d4',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
  {
    key: 'dms',
    color: '#f59e0b',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="3" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="14" width="7" height="7" rx="1" />
        <rect x="3" y="14" width="7" height="7" rx="1" />
      </svg>
    ),
  },
  {
    key: 'parts',
    color: '#10b981',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <polygon points="12 2 2 7 12 12 22 7 12 2" />
        <polyline points="2 17 12 22 22 17" />
        <polyline points="2 12 12 17 22 12" />
      </svg>
    ),
  },
  {
    key: 'finance',
    color: '#ef4444',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <line x1="12" y1="1" x2="12" y2="23" />
        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      </svg>
    ),
  },
]

export function PlatformSection() {
  const { t } = useTranslation()
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(() => {
    gsap.fromTo(
      '.platform-header',
      { opacity: 0, y: 24 },
      {
        opacity: 1, y: 0, duration: 0.6,
        scrollTrigger: { trigger: '.platform-header', start: 'top 85%', once: true },
      }
    )
    gsap.fromTo(
      '.module-card',
      { opacity: 0, y: 32 },
      {
        opacity: 1, y: 0, duration: 0.5, stagger: 0.08,
        scrollTrigger: { trigger: '.module-grid', start: 'top 80%', once: true },
      }
    )
  }, { scope: sectionRef })

  return (
    <section id="platform" ref={sectionRef} className="scroll-mt-16 py-16 sm:py-24 bg-white dark:bg-ide-bg">
      <Container>
        <div className="platform-header text-center mb-10 sm:mb-16">
          <SectionTag className="justify-center mb-5">
            {t('platform.tag')}
          </SectionTag>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
            {t('platform.title')}
          </h2>
          <p className="text-slate-500 dark:text-ide-muted max-w-xl mx-auto">
            {t('platform.subtitle')}
          </p>
        </div>

        <div className="module-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {MODULES.map(({ key, color, icon }) => (
            <div
              key={key}
              className="module-card group relative rounded-xl border border-slate-200 dark:border-white/6 bg-white dark:bg-ide-card p-6 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 overflow-hidden"
            >
              {/* Top accent line */}
              <div className="absolute top-0 left-0 right-0 h-0.5 opacity-0 group-hover:opacity-100 transition-opacity" style={{ backgroundColor: color }} />

              {/* Header row */}
              <div className="flex items-start justify-between mb-5">
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center transition-colors"
                  style={{ backgroundColor: `${color}18`, color }}
                >
                  {icon}
                </div>
                <span className="text-xs font-mono text-emerald-500 dark:text-emerald-400 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 dark:bg-emerald-400" />
                  {t('platform.active')}
                </span>
              </div>

              {/* Module name */}
              <div
                className="text-xs font-mono font-bold tracking-[0.15em] mb-1"
                style={{ color }}
              >
                {t(`platform.${key}_name`)}
              </div>

              {/* Full name */}
              <h3 className="font-semibold text-slate-900 dark:text-white mb-3 text-base">
                {t(`platform.${key}_full`)}
              </h3>

              {/* Description */}
              <p className="text-sm text-slate-500 dark:text-ide-muted leading-relaxed mb-5">
                {t(`platform.${key}_desc`)}
              </p>

              {/* Explore link */}
              <Link
                to={MODULE_SLUGS[key]}
                className="flex items-center gap-1.5 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity"
                style={{ color }}
              >
                {t('common.learnMore')}
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </Link>
            </div>
          ))}
        </div>

        {/* Section CTA */}
        <div className="text-center mt-10">
          <Link
            to="/solutions"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-slate-300 dark:border-white/15 text-slate-600 dark:text-ide-text text-sm font-medium hover:border-brand-accent/60 hover:text-brand-accent dark:hover:text-brand-accent transition-all"
          >
            Explore All Solutions
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </Link>
        </div>
      </Container>
    </section>
  )
}
