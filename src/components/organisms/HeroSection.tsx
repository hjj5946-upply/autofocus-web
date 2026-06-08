import { useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { Button } from '../atoms/Button'
import type { SectionId } from '../../types'

interface HeroSectionProps {
  onScrollTo?: (id: SectionId) => void
}

export function HeroSection({ onScrollTo }: HeroSectionProps) {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const containerRef = useRef<HTMLElement>(null)

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power2.out' } })
    tl.fromTo('.hero-tag',   { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.5 })
      .fromTo('.hero-title', { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.6 }, '-=0.2')
      .fromTo('.hero-sub',   { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.5 }, '-=0.3')
      .fromTo('.hero-ctas',  { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.4 }, '-=0.2')
      .fromTo('.hero-scroll',{ opacity: 0 },         { opacity: 1, duration: 0.4 }, '-=0.1')
  }, { scope: containerRef })

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Subtle grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(16,12,64,0.035) 1px, transparent 1px),
            linear-gradient(90deg, rgba(16,12,64,0.035) 1px, transparent 1px)
          `,
          backgroundSize: '64px 64px',
        }}
      />
      <div
        className="dark:block hidden absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)
          `,
          backgroundSize: '64px 64px',
        }}
      />

      {/* Radial glow — very subtle */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 70% 55% at 50% 45%, rgba(59,130,246,0.05) 0%, transparent 70%)',
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-[1280px] mx-auto px-6 lg:px-12 text-center">

        {/* Tag line */}
        <div className="hero-tag flex items-center justify-center gap-3 mb-8">
          <span className="w-8 h-px bg-brand-primary/30 dark:bg-brand-accent/40" />
          <span className="text-xs font-mono tracking-[0.25em] text-brand-primary/60 dark:text-brand-accent/80 uppercase">
            {t('hero.tag')}
          </span>
          <span className="w-8 h-px bg-brand-primary/30 dark:bg-brand-accent/40" />
        </div>

        {/* Title */}
        <h1 className="hero-title text-5xl md:text-6xl lg:text-7xl font-black text-slate-900 dark:text-white leading-[1.05] tracking-tight mb-6">
          {t('hero.title_line1')}
          <br />
          <span
            className="text-transparent bg-clip-text"
            style={{ backgroundImage: 'linear-gradient(90deg, #1e293b, #3b82f6)' }}
          >
            {t('hero.title_line2')}
          </span>
        </h1>

        {/* Subtitle */}
        <p className="hero-sub text-lg md:text-xl text-slate-500 dark:text-ide-muted max-w-2xl mx-auto mb-10 leading-relaxed">
          {t('hero.subtitle')}
        </p>

        {/* CTAs */}
        <div className="hero-ctas flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button
            variant="primary"
            size="lg"
            onClick={() => onScrollTo?.('platform')}
          >
            {t('hero.cta_primary')}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </Button>
          <Button
            variant="outline-light"
            size="lg"
            onClick={() => navigate('/contact')}
          >
            {t('hero.cta_secondary')}
          </Button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="hero-scroll absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="text-xs font-mono text-slate-400 dark:text-white/25 tracking-widest uppercase">
          {t('hero.scroll_hint')}
        </span>
        <div className="w-px h-10 bg-gradient-to-b from-slate-300 dark:from-white/20 to-transparent" />
      </div>

      {/* Module strip */}
      <div className="absolute bottom-0 left-0 right-0 border-t border-slate-100 dark:border-white/5">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-12 py-3 flex items-center justify-center gap-6 flex-wrap">
          {['PDI', 'LOGISTICS', 'SALES & CRM', 'DMS', 'PARTS', 'FINANCE'].map((mod) => (
            <span key={mod} className="text-xs font-mono text-slate-300 dark:text-white/15 tracking-wider">
              {mod}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
