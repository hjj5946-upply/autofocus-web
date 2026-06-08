import { useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SectionTag } from '../atoms/SectionTag'
import { Container } from '../atoms/Container'

gsap.registerPlugin(ScrollTrigger)

const OEM_BRANDS = [
  'BMW', 'Mercedes-Benz', 'Audi', 'Volkswagen',
  'Volvo', 'Land Rover', 'Jaguar', 'Porsche',
  'Bentley', 'MINI', 'Peugeot', 'Citroën',
]

const STATS = [
  { key: 'stat1' },
  { key: 'stat2' },
  { key: 'stat3' },
  { key: 'stat4' },
]

export function ReferencesSection() {
  const { t } = useTranslation()
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(() => {
    gsap.fromTo(
      '.ref-header',
      { opacity: 0, y: 24 },
      {
        opacity: 1, y: 0, duration: 0.6,
        scrollTrigger: { trigger: '.ref-header', start: 'top 85%', once: true },
      }
    )
    gsap.fromTo(
      '.stat-item',
      { opacity: 0, y: 20 },
      {
        opacity: 1, y: 0, duration: 0.4, stagger: 0.08,
        scrollTrigger: { trigger: '.stats-row', start: 'top 80%', once: true },
      }
    )
    gsap.fromTo(
      '.brand-chip',
      { opacity: 0 },
      {
        opacity: 1, duration: 0.3, stagger: 0.04,
        scrollTrigger: { trigger: '.brands-grid', start: 'top 80%', once: true },
      }
    )
  }, { scope: sectionRef })

  return (
    <section ref={sectionRef} className="py-24 bg-white/72 backdrop-blur-[2px] dark:bg-ide-bg/80 dark:backdrop-blur-[2px]">
      <Container>
        <div className="ref-header text-center mb-16">
          <SectionTag className="justify-center mb-5">
            {t('references.tag')}
          </SectionTag>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
            {t('references.title')}
          </h2>
          <p className="text-slate-500 dark:text-ide-muted max-w-xl mx-auto">
            {t('references.subtitle')}
          </p>
        </div>

        {/* Stats */}
        <div className="stats-row grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {STATS.map(({ key }) => (
            <div key={key} className="stat-item text-center p-6 rounded-xl border border-slate-200 dark:border-white/6 bg-white dark:bg-ide-card">
              <div className="text-4xl font-black text-slate-900 dark:text-white mb-2 tracking-tight">
                {t(`references.${key}_value`)}
              </div>
              <div className="text-sm font-mono text-slate-400 dark:text-ide-muted tracking-wider uppercase">
                {t(`references.${key}_label`)}
              </div>
            </div>
          ))}
        </div>

        {/* OEM brands */}
        <div className="text-center mb-6">
          <p className="text-xs font-mono text-slate-400 dark:text-ide-muted tracking-widest uppercase">
            {t('references.brands_label')}
          </p>
        </div>
        <div className="brands-grid flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
          {OEM_BRANDS.map((brand) => (
            <span
              key={brand}
              className="brand-chip text-sm font-medium text-slate-400 dark:text-ide-muted hover:text-slate-700 dark:hover:text-ide-text transition-colors"
            >
              {brand}
            </span>
          ))}
        </div>
      </Container>
    </section>
  )
}
