import { useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate, Link } from 'react-router-dom'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Container } from '../atoms/Container'

gsap.registerPlugin(ScrollTrigger)

const CEO = { labelKey: 'company.org_ceo', color: '#1e293b' as string }

const DEPARTMENTS = [
  {
    id: 'mgmt', labelKey: 'company.org_mgmt', color: '#f59e0b',
    teams: [
      { id: 'hr', labelKey: 'company.org_hr' },
      { id: 'finance', labelKey: 'company.org_finance' },
    ],
  },
  {
    id: 'tech', labelKey: 'company.org_tech', color: '#3b82f6',
    teams: [
      { id: 'rd', labelKey: 'company.org_rd' },
      { id: 'tech_support', labelKey: 'company.org_tech_support' },
    ],
  },
  {
    id: 'solution', labelKey: 'company.org_solution', color: '#10b981',
    teams: [
      { id: 'web', labelKey: 'company.org_web' },
      { id: 'sol_dev', labelKey: 'company.org_sol_dev' },
      { id: 'consulting', labelKey: 'company.org_consulting' },
    ],
  },
  {
    id: 'sales_mgmt', labelKey: 'company.org_sales_mgmt', color: '#8b5cf6',
    teams: [
      { id: 'marketing', labelKey: 'company.org_marketing' },
      { id: 'planning', labelKey: 'company.org_planning' },
    ],
  },
]

const LINE = 'bg-slate-200/60 dark:bg-white/10'

export function OrgChartSection() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(() => {
    gsap.set('.org-ceo, .org-connector, .org-dept, .org-team', { opacity: 0 })

    const orgTl = gsap.timeline({
      scrollTrigger: { trigger: '.company-org', start: 'top 78%', once: true },
    })
    orgTl
      .fromTo('.org-ceo',
        { opacity: 0, y: -16, scale: 0.92 },
        { opacity: 1, y: 0, scale: 1, duration: 0.25, ease: 'power2.out' }
      )
      .fromTo('.org-connector',
        { opacity: 0 },
        { opacity: 1, duration: 0.15 },
        '-=0.05'
      )
      .fromTo('.org-dept',
        { opacity: 0, y: 22 },
        { opacity: 1, y: 0, duration: 0.22, stagger: 0.06, ease: 'power2.out' },
        '-=0.05'
      )
      .fromTo('.org-team',
        { opacity: 0, scale: 0.82 },
        { opacity: 1, scale: 1, duration: 0.15, stagger: 0.03, ease: 'back.out(1.7)' },
        '-=0.1'
      )
  }, { scope: sectionRef })

  return (
    <section ref={sectionRef} className="scroll-mt-16 py-16 sm:py-24 bg-white dark:bg-ide-bg">
      <Container>

        {/* ── Org chart ── */}
        <div className="company-org">
          <div className="flex items-center gap-3 mb-10">
            <span className="w-5 h-px bg-brand-accent/50" />
            <span className="text-xs font-mono tracking-[0.2em] uppercase text-brand-accent">
              {t('company.org_tag')}
            </span>
          </div>

          <div className="flex flex-col items-center">

            {/* CEO */}
            <div className="flex flex-col items-center">
              <div className="org-ceo px-6 sm:px-10 py-4 rounded-xl text-center bg-slate-800 dark:bg-white/8 border border-slate-700/50 dark:border-white/12 shadow-lg shadow-slate-900/10">
                <div className="text-[9px] font-mono tracking-[0.25em] text-slate-400 dark:text-ide-muted mb-1.5 uppercase">
                  Executive
                </div>
                <div className="text-sm font-bold tracking-[0.1em] text-white dark:text-ide-text">
                  {t(CEO.labelKey)}
                </div>
              </div>
              <div className={`org-connector w-px h-7 ${LINE} hidden md:block`} />
            </div>

            {/* Mobile org: 2×2 grid */}
            <div className="md:hidden grid grid-cols-2 gap-3 mt-4">
              {DEPARTMENTS.map((dept) => (
                <div
                  key={dept.id}
                  className="org-dept rounded-xl overflow-hidden shadow-sm"
                  style={{ border: `1px solid ${dept.color}30` }}
                >
                  <div className="px-3 py-2.5 flex items-center gap-2" style={{ backgroundColor: `${dept.color}14` }}>
                    <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: dept.color }} />
                    <span className="text-xs font-bold tracking-[0.06em] leading-tight" style={{ color: dept.color }}>
                      {t(dept.labelKey)}
                    </span>
                  </div>
                  <div className="p-2 flex flex-col gap-1 bg-white/40 dark:bg-ide-bg/30">
                    {dept.teams.map((team) => (
                      <div
                        key={team.id}
                        className="org-team flex items-center gap-1.5 px-2 py-1.5 rounded"
                        style={{ backgroundColor: `${dept.color}08`, border: `1px solid ${dept.color}20` }}
                      >
                        <div className="w-1 h-1 rounded-full flex-shrink-0" style={{ backgroundColor: `${dept.color}80` }} />
                        <span className="text-[10px] font-mono leading-tight" style={{ color: dept.color }}>
                          {t(team.labelKey)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Desktop org: 4-col with connectors */}
            <div className="hidden md:block w-full overflow-x-auto">
              <div className="grid grid-cols-4 min-w-[640px]">
                {DEPARTMENTS.map((dept, idx) => (
                  <div key={dept.id} className="flex flex-col items-center px-2.5">
                    <div className="org-connector relative w-full h-7">
                      {idx > 0 && (
                        <div className={`absolute top-0 left-0 w-1/2 h-px ${LINE}`} />
                      )}
                      {idx < DEPARTMENTS.length - 1 && (
                        <div className={`absolute top-0 right-0 w-1/2 h-px ${LINE}`} />
                      )}
                      <div className={`absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-px ${LINE}`} />
                    </div>
                    <div
                      className="org-dept w-full rounded-xl overflow-hidden shadow-sm"
                      style={{ border: `1px solid ${dept.color}30` }}
                    >
                      <div className="px-4 py-3 flex items-center gap-2.5" style={{ backgroundColor: `${dept.color}14` }}>
                        <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: dept.color }} />
                        <span className="text-xs font-bold tracking-[0.06em] leading-tight" style={{ color: dept.color }}>
                          {t(dept.labelKey)}
                        </span>
                      </div>
                      <div className="p-3 flex flex-col gap-1.5 bg-white/40 dark:bg-ide-bg/30">
                        {dept.teams.map((team) => (
                          <div
                            key={team.id}
                            className="org-team flex items-center gap-2 px-3 py-1.5 rounded-lg"
                            style={{ backgroundColor: `${dept.color}08`, border: `1px solid ${dept.color}20` }}
                          >
                            <div className="w-1 h-1 rounded-full flex-shrink-0" style={{ backgroundColor: `${dept.color}80` }} />
                            <span className="text-[11px] font-mono leading-tight text-center w-full" style={{ color: dept.color }}>
                              {t(team.labelKey)}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-16">
          <Link
            to="/company"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-slate-900 dark:bg-white/10 text-white text-sm font-medium hover:bg-slate-700 dark:hover:bg-white/15 transition-colors"
          >
            Company Profile
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </Link>
          <button
            onClick={() => navigate('/contact')}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-brand-primary/30 dark:border-brand-accent/30 text-brand-primary dark:text-brand-accent text-sm font-medium hover:bg-brand-primary/5 dark:hover:bg-brand-accent/8 hover:border-brand-primary/60 dark:hover:border-brand-accent/60 transition-all cursor-pointer"
          >
            {t('company.cta')}
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </button>
        </div>

      </Container>
    </section>
  )
}
