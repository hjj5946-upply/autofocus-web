import { useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SectionTag } from '../atoms/SectionTag'
import { Container } from '../atoms/Container'

gsap.registerPlugin(ScrollTrigger)

function NodeBox({
  title,
  desc,
  color = '#3b82f6',
}: {
  title: string
  desc: string
  color?: string
}) {
  return (
    <div
      className="arch-node rounded-lg border bg-white dark:bg-ide-card p-4 text-center shadow-sm"
      style={{ borderColor: `${color}35` }}
    >
      <div className="text-xs font-mono font-bold tracking-wider mb-1" style={{ color }}>
        {title}
      </div>
      <div className="text-xs text-slate-400 dark:text-ide-muted leading-snug">{desc}</div>
    </div>
  )
}

function HorizArrow() {
  return (
    <div className="flex items-center justify-center flex-shrink-0 px-1">
      <svg width="40" height="10" viewBox="0 0 40 10">
        <defs>
          <marker id="ah-r" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
            <path d="M0,0 L6,3 L0,6 Z" fill="#cbd5e1" className="dark:fill-[#334155]" />
          </marker>
          <marker id="ah-l" markerWidth="6" markerHeight="6" refX="1" refY="3" orient="auto">
            <path d="M6,0 L0,3 L6,6 Z" fill="#cbd5e1" className="dark:fill-[#334155]" />
          </marker>
        </defs>
        <line x1="4" y1="5" x2="36" y2="5" stroke="#cbd5e1" strokeWidth="1.2" markerEnd="url(#ah-r)" markerStart="url(#ah-l)" />
      </svg>
    </div>
  )
}

function VertArrow() {
  return (
    <div className="flex justify-center my-1">
      <svg width="10" height="32" viewBox="0 0 10 32">
        <defs>
          <marker id="av2" markerWidth="8" markerHeight="8" refX="4" refY="7" orient="auto">
            <path d="M0,0 L4,8 L8,0 Z" fill="#cbd5e1" />
          </marker>
        </defs>
        <line x1="5" y1="2" x2="5" y2="28" stroke="#cbd5e1" strokeWidth="1.5" markerEnd="url(#av2)" />
      </svg>
    </div>
  )
}

function CenterPlatform({ t }: { t: (key: string) => string }) {
  return (
    <div className="rounded-xl border border-brand-accent/25 bg-white dark:bg-ide-card p-5 sm:p-6 text-center shadow-sm">
      <div className="mb-3 sm:mb-4">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-accent/8 border border-brand-accent/20 mb-3">
          <div className="w-1.5 h-1.5 rounded-full bg-brand-accent animate-pulse" />
          <span className="text-xs font-mono font-bold text-brand-accent tracking-wider">
            {t('architecture.platform')}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2 mb-4">
        {['PDI', 'LOG', 'CRM', 'DMS', 'PARTS', 'FIN'].map((mod) => (
          <div
            key={mod}
            className="py-1.5 rounded text-xs font-mono font-semibold text-slate-500 dark:text-ide-muted border border-slate-100 dark:border-white/8 bg-slate-50 dark:bg-ide-deep/60"
          >
            {mod}
          </div>
        ))}
      </div>

      <div className="border-t border-slate-100 dark:border-white/6 pt-3 mt-3">
        <div className="text-xs font-mono text-slate-400 dark:text-ide-muted mb-1">
          {t('architecture.data_layer')}
        </div>
        <div className="flex items-center justify-center gap-3 flex-wrap">
          <span className="text-xs text-slate-400 dark:text-ide-muted flex items-center gap-1">
            <span className="w-1 h-1 rounded-full bg-emerald-500" />
            {t('architecture.realtime')}
          </span>
          <span className="text-xs text-slate-400 dark:text-ide-muted flex items-center gap-1">
            <span className="w-1 h-1 rounded-full bg-brand-accent" />
            {t('architecture.bidirectional')}
          </span>
        </div>
      </div>
    </div>
  )
}

function AnalyticsBarComp({ t }: { t: (key: string) => string }) {
  return (
    <div className="rounded-xl border border-slate-200 dark:border-white/8 bg-white dark:bg-ide-card px-6 py-4 text-center shadow-sm">
      <div className="text-xs font-mono font-bold text-slate-700 dark:text-ide-text tracking-wider mb-1">
        {t('architecture.analytics')}
      </div>
      <div className="text-xs text-slate-400 dark:text-ide-muted">{t('architecture.analytics_desc')}</div>
    </div>
  )
}

export function ArchitectureSection() {
  const { t } = useTranslation()
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(() => {
    gsap.fromTo(
      '.arch-header',
      { opacity: 0, y: 24 },
      {
        opacity: 1, y: 0, duration: 0.6,
        scrollTrigger: { trigger: '.arch-header', start: 'top 85%', once: true },
      }
    )
    gsap.fromTo(
      '.arch-diagram',
      { opacity: 0, scale: 0.97 },
      {
        opacity: 1, scale: 1, duration: 0.7, ease: 'power2.out',
        scrollTrigger: { trigger: '.arch-diagram', start: 'top 80%', once: true },
      }
    )
  }, { scope: sectionRef })

  return (
    <section id="architecture" ref={sectionRef} className="scroll-mt-16 py-16 sm:py-24 bg-white/72 backdrop-blur-[2px] dark:bg-ide-bg/80 dark:backdrop-blur-[2px]">
      <Container>
        <div className="arch-header text-center mb-10 sm:mb-16">
          <SectionTag className="justify-center mb-5">
            {t('architecture.tag')}
          </SectionTag>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
            {t('architecture.title')}
          </h2>
          <p className="text-slate-500 dark:text-ide-muted max-w-xl mx-auto">
            {t('architecture.subtitle')}
          </p>
        </div>

        <div className="arch-diagram max-w-4xl mx-auto">

          {/* ── Mobile layout (< md): vertical stack ── */}
          <div className="flex flex-col gap-3 md:hidden">
            <div className="grid grid-cols-2 gap-3">
              <NodeBox title={t('architecture.oem')} desc={t('architecture.oem_desc')} color="#3b82f6" />
              <NodeBox title={t('architecture.parts')} desc={t('architecture.parts_desc')} color="#8b5cf6" />
            </div>
            <VertArrow />
            <CenterPlatform t={t} />
            <VertArrow />
            <div className="grid grid-cols-2 gap-3">
              <NodeBox title={t('architecture.dealers')} desc={t('architecture.dealers_desc')} color="#10b981" />
              <NodeBox title={t('architecture.service')} desc={t('architecture.service_desc')} color="#f59e0b" />
            </div>
            <VertArrow />
            <AnalyticsBarComp t={t} />
          </div>

          {/* ── Desktop layout (≥ md): horizontal ── */}
          <div className="hidden md:block">
            {/* Main row */}
            <div className="flex items-center justify-center gap-0">

              {/* Left column */}
              <div className="flex flex-col gap-4 w-44 flex-shrink-0">
                <NodeBox title={t('architecture.oem')} desc={t('architecture.oem_desc')} color="#3b82f6" />
                <NodeBox title={t('architecture.parts')} desc={t('architecture.parts_desc')} color="#8b5cf6" />
              </div>

              {/* Left arrows */}
              <div className="flex flex-col gap-4 w-16">
                <HorizArrow />
                <HorizArrow />
              </div>

              {/* Center — platform */}
              <div className="flex-1 mx-2">
                <CenterPlatform t={t} />
              </div>

              {/* Right arrows */}
              <div className="flex flex-col gap-4 w-16">
                <HorizArrow />
                <HorizArrow />
              </div>

              {/* Right column */}
              <div className="flex flex-col gap-4 w-44 flex-shrink-0">
                <NodeBox title={t('architecture.dealers')} desc={t('architecture.dealers_desc')} color="#10b981" />
                <NodeBox title={t('architecture.service')} desc={t('architecture.service_desc')} color="#f59e0b" />
              </div>
            </div>

            {/* Vertical connector */}
            <div className="flex justify-center my-2">
              <svg width="10" height="32" viewBox="0 0 10 32">
                <defs>
                  <marker id="av" markerWidth="8" markerHeight="8" refX="4" refY="7" orient="auto">
                    <path d="M0,0 L4,8 L8,0 Z" fill="#cbd5e1" />
                  </marker>
                </defs>
                <line x1="5" y1="2" x2="5" y2="28" stroke="#cbd5e1" strokeWidth="1.5" markerEnd="url(#av)" />
              </svg>
            </div>

            {/* Analytics bar */}
            <AnalyticsBarComp t={t} />
          </div>

        </div>
      </Container>
    </section>
  )
}
