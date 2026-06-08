import { useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SectionTag } from '../atoms/SectionTag'
import { Container } from '../atoms/Container'

gsap.registerPlugin(ScrollTrigger)

const PROBLEMS = [
  {
    key: 'system',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="2" y="3" width="8" height="6" rx="1" />
        <rect x="14" y="3" width="8" height="6" rx="1" />
        <rect x="2" y="15" width="8" height="6" rx="1" />
        <rect x="14" y="15" width="8" height="6" rx="1" />
        <line x1="10" y1="6" x2="14" y2="6" strokeDasharray="2 2" />
        <line x1="10" y1="18" x2="14" y2="18" strokeDasharray="2 2" />
      </svg>
    ),
    number: '01',
  },
  {
    key: 'data',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <ellipse cx="12" cy="5" rx="9" ry="3" />
        <path d="M3 5v6c0 1.66 4.03 3 9 3s9-1.34 9-3V5" />
        <path d="M3 11v6c0 1.66 4.03 3 9 3s9-1.34 9-3v-6" strokeDasharray="3 2" />
      </svg>
    ),
    number: '02',
  },
  {
    key: 'ops',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
      </svg>
    ),
    number: '03',
  },
  {
    key: 'scale',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <polyline points="15 3 21 3 21 9" />
        <polyline points="9 21 3 21 3 15" />
        <line x1="21" y1="3" x2="14" y2="10" />
        <line x1="3" y1="21" x2="10" y2="14" />
        <line x1="14" y1="14" x2="10" y2="10" strokeDasharray="2 2" />
      </svg>
    ),
    number: '04',
  },
]

export function ProblemSection() {
  const { t } = useTranslation()
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(() => {
    gsap.fromTo(
      '.problem-header',
      { opacity: 0, y: 24 },
      {
        opacity: 1, y: 0, duration: 0.6,
        scrollTrigger: { trigger: '.problem-header', start: 'top 85%', once: true },
      }
    )
    gsap.fromTo(
      '.problem-card',
      { opacity: 0, y: 30 },
      {
        opacity: 1, y: 0, duration: 0.5, stagger: 0.1,
        scrollTrigger: { trigger: '.problem-grid', start: 'top 80%', once: true },
      }
    )
  }, { scope: sectionRef })

  return (
    <section id="problem" ref={sectionRef} className="scroll-mt-16 py-16 sm:py-24 bg-white/72 backdrop-blur-[2px] dark:bg-ide-bg/80 dark:backdrop-blur-[2px]">
      <Container>
        <div className="problem-header text-center mb-10 sm:mb-16">
          <SectionTag className="justify-center mb-5">
            {t('problem.tag')}
          </SectionTag>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
            {t('problem.title')}
          </h2>
          <p className="text-slate-500 dark:text-ide-muted max-w-xl mx-auto">
            {t('problem.subtitle')}
          </p>
        </div>

        <div className="problem-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {PROBLEMS.map(({ key, icon, number }) => (
            <div
              key={key}
              className="problem-card group relative p-6 rounded-lg border border-slate-200 dark:border-white/6 bg-white dark:bg-ide-card hover:border-slate-300 dark:hover:border-white/12 hover:shadow-md transition-all duration-300"
            >
              <div className="absolute top-4 right-4 text-xs font-mono text-slate-200 dark:text-white/10 group-hover:text-slate-300 dark:group-hover:text-white/20 transition-colors">
                {number}
              </div>
              <div className="text-slate-400 dark:text-ide-muted group-hover:text-brand-accent transition-colors mb-4">
                {icon}
              </div>
              <h3 className="text-slate-900 dark:text-ide-text font-semibold mb-2 text-sm tracking-wide">
                {t(`problem.${key}_title`)}
              </h3>
              <p className="text-slate-500 dark:text-ide-muted text-sm leading-relaxed">
                {t(`problem.${key}_desc`)}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}
