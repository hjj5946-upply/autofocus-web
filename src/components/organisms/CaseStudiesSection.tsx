import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SectionTag } from '../atoms/SectionTag'
import { Container } from '../atoms/Container'

gsap.registerPlugin(ScrollTrigger)

const CASES = ['case1', 'case2', 'case3']
const CASE_SLUGS: Record<string, string> = {
  case1: 'case-1',
  case2: 'case-2',
  case3: 'case-3',
}

function CaseRow({
  icon,
  label,
  text,
  color,
}: {
  icon: React.ReactNode
  label: string
  text: string
  color: string
}) {
  return (
    <div className="flex gap-3">
      <div
        className="flex-shrink-0 w-6 h-6 rounded flex items-center justify-center mt-0.5"
        style={{ backgroundColor: `${color}20`, color }}
      >
        {icon}
      </div>
      <div>
        <div className="text-xs font-mono font-bold tracking-widest mb-1" style={{ color }}>
          {label}
        </div>
        <p className="text-sm text-slate-500 dark:text-ide-muted leading-relaxed">{text}</p>
      </div>
    </div>
  )
}

export function CaseStudiesSection() {
  const { t } = useTranslation()
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(() => {
    gsap.fromTo(
      '.case-header',
      { opacity: 0, y: 24 },
      {
        opacity: 1, y: 0, duration: 0.6,
        scrollTrigger: { trigger: '.case-header', start: 'top 85%', once: true },
      }
    )
    gsap.fromTo(
      '.case-card',
      { opacity: 0, y: 32 },
      {
        opacity: 1, y: 0, duration: 0.55, stagger: 0.12,
        scrollTrigger: { trigger: '.cases-grid', start: 'top 80%', once: true },
      }
    )
  }, { scope: sectionRef })

  return (
    <section id="case-studies" ref={sectionRef} className="scroll-mt-16 py-16 sm:py-24 bg-white dark:bg-ide-bg">
      <Container>
        <div className="case-header text-center mb-10 sm:mb-16">
          <SectionTag className="justify-center mb-5">
            {t('caseStudies.tag')}
          </SectionTag>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
            {t('caseStudies.title')}
          </h2>
          <p className="text-slate-500 dark:text-ide-muted max-w-md mx-auto">
            {t('caseStudies.subtitle')}
          </p>
        </div>

        <div className="cases-grid grid grid-cols-1 lg:grid-cols-3 gap-6">
          {CASES.map((caseKey) => (
            <div
              key={caseKey}
              className="case-card rounded-xl border border-slate-200 dark:border-white/6 bg-white dark:bg-ide-card overflow-hidden hover:shadow-lg transition-all duration-200 flex flex-col"
            >
              {/* Card header */}
              <div className="px-6 pt-6 pb-4 border-b border-slate-100 dark:border-white/6">
                <div className="text-xs font-mono font-bold text-brand-accent tracking-wider mb-1">
                  {t(`caseStudies.${caseKey}_tag`)}
                </div>
                <h3 className="font-semibold text-slate-900 dark:text-ide-text text-base">
                  {t(`caseStudies.${caseKey}_client`)}
                </h3>
              </div>

              {/* Card body */}
              <div className="p-6 space-y-5 flex-1">
                <CaseRow
                  label={t('caseStudies.problem_label')}
                  text={t(`caseStudies.${caseKey}_problem`)}
                  color="#ef4444"
                  icon={
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <circle cx="12" cy="12" r="10" />
                      <line x1="12" y1="8" x2="12" y2="12" />
                      <line x1="12" y1="16" x2="12.01" y2="16" />
                    </svg>
                  }
                />
                <CaseRow
                  label={t('caseStudies.solution_label')}
                  text={t(`caseStudies.${caseKey}_solution`)}
                  color="#3b82f6"
                  icon={
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <circle cx="12" cy="12" r="3" />
                      <path d="M19.07 4.93a10 10 0 0 1 0 14.14M4.93 4.93a10 10 0 0 0 0 14.14" />
                    </svg>
                  }
                />
                <CaseRow
                  label={t('caseStudies.result_label')}
                  text={t(`caseStudies.${caseKey}_result`)}
                  color="#10b981"
                  icon={
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  }
                />
              </div>

              {/* Card CTA */}
              <div className="px-6 pb-5">
                <Link
                  to={`/cases/${CASE_SLUGS[caseKey]}`}
                  className="flex items-center gap-1.5 text-xs font-medium text-slate-400 dark:text-ide-muted hover:text-brand-accent dark:hover:text-brand-accent transition-colors"
                >
                  {t('common.viewCaseStudy')}
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Section CTA */}
        <div className="text-center mt-10">
          <Link
            to="/cases"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-slate-300 dark:border-white/15 text-slate-600 dark:text-ide-text text-sm font-medium hover:border-brand-accent/60 hover:text-brand-accent dark:hover:text-brand-accent transition-all"
          >
            {t('common.viewAllCases')}
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
