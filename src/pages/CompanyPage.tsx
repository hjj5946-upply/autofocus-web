import { useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { DetailPageLayout } from '../components/organisms/DetailPageLayout'
import { Container } from '../components/atoms/Container'
import { SectionTag } from '../components/atoms/SectionTag'

const MILESTONES = [
  { year: '2003', title: '창업', desc: '자동차 IT 솔루션 전문 기업 설립. GM Korea DMS 1호 계약.' },
  { year: '2006', title: '벤츠 코리아 PDI', desc: '메르세데스 벤츠 코리아 PDI 시스템 공급. 럭셔리 차량 물류 시스템 진입.' },
  { year: '2009', title: '플랫폼 확장', desc: '푸조, GM대우 등 다수 브랜드로 솔루션 확장. CRM v3 출시.' },
  { year: '2013', title: '30개 딜러십 달성', desc: '포드코리아, 벤츠코리아 그룹웨어 등 전국 30개+ 딜러십 운영.' },
  { year: '2017', title: 'OEM 파트너십', desc: 'GM 코리아 CRM 구축. 맥라렌, 애스턴마틴 DMS 계약 체결.' },
  { year: '2021', title: '글로벌 레퍼런스', desc: '말레이시아 NAZA 그룹 페라리·마세라티 DMS. 해외 시장 진출.' },
  { year: '2024', title: '차세대 플랫폼', desc: '테슬라 BP사 DMS, 만트럭 서비스앱 개발. 50개+ 운영 딜러십.' },
  { year: '2026', title: '지속 성장', desc: '신규 고객사 계약 및 사업 확장 진행 중.' },
]

const STATS = [
  { label: '설립연도', value: '2003', unit: '' },
  { label: '운영 딜러십', value: '50+', unit: '' },
  { label: '파트너 브랜드', value: '15+', unit: '' },
  { label: '시스템 가동률', value: '99.9', unit: '%' },
]

const STRENGTHS = [
  {
    title: '수입차 전문성',
    desc: '20년간 수입차 딜러십만을 위한 솔루션을 개발했습니다. 일반 ERP가 해결하지 못하는 수입차 특유의 운영 요건을 이해합니다.',
    color: '#3b82f6',
  },
  {
    title: 'OEM 파트너십',
    desc: '메르세데스 벤츠, BMW, 포드, GM, 페라리 등 글로벌 OEM과의 직접 연동 경험이 있습니다.',
    color: '#f59e0b',
  },
  {
    title: '도메인 기반 개발',
    desc: '모든 시스템은 자동차 산업의 실제 워크플로우와 규제 요건을 반영하여 설계됩니다.',
    color: '#8b5cf6',
  },
  {
    title: '장기 파트너십',
    desc: '한번 도입한 고객은 평균 7년 이상 파트너십을 유지합니다. 신뢰는 결과로 증명합니다.',
    color: '#10b981',
  },
]

export function CompanyPage() {
  const navigate = useNavigate()
  const pageRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    gsap.fromTo(
      '.company-page-hero',
      { opacity: 0, y: 24 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }
    )
    gsap.fromTo(
      '.company-page-section',
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.5, stagger: 0.12, ease: 'power2.out', delay: 0.3 }
    )
  }, { scope: pageRef })

  return (
    <DetailPageLayout>
      <div ref={pageRef}>
        <Container>

          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-slate-400 dark:text-ide-muted mb-10">
            <button
              onClick={() => navigate('/')}
              className="hover:text-brand-accent transition-colors cursor-pointer"
            >
              Home
            </button>
            <span>/</span>
            <span className="text-slate-600 dark:text-ide-text">Company</span>
          </nav>

          {/* Hero */}
          <div className="company-page-hero mb-14 sm:mb-20">
            <SectionTag className="mb-5">COMPANY PROFILE</SectionTag>
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
              자동차 전문가가 만든,<br />자동차를 위한 플랫폼
            </h1>
            <p className="text-slate-500 dark:text-ide-muted leading-relaxed text-base max-w-2xl">
              오토포커스는 2003년부터 수입차 딜러십 소프트웨어 개발에만 집중해온 전문 기업입니다.
              우리가 구축하는 모든 시스템은 수입차 운영의 특정 현실에 맞게 설계됩니다.
            </p>
          </div>

          {/* Stats */}
          <div className="company-page-section mb-14 sm:mb-20">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {STATS.map(({ label, value, unit }) => (
                <div
                  key={label}
                  className="rounded-xl border border-slate-200 dark:border-white/8 bg-white dark:bg-ide-card p-5 text-center"
                >
                  <div className="text-2xl font-bold font-mono text-brand-accent mb-1">
                    {value}{unit}
                  </div>
                  <div className="text-xs text-slate-500 dark:text-ide-muted">{label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Overview */}
          <div className="company-page-section mb-14 sm:mb-20">
            <div className="flex items-center gap-3 mb-6">
              <span className="w-5 h-px bg-brand-accent/50" />
              <span className="text-xs font-mono tracking-[0.2em] uppercase text-brand-accent">
                WHO WE ARE
              </span>
            </div>
            <div className="rounded-xl border border-slate-200 dark:border-white/8 bg-white dark:bg-ide-card p-8 max-w-3xl">
              <p className="text-slate-600 dark:text-ide-text leading-relaxed mb-4">
                오토포커스는 일반 ERP 공급업체가 아닙니다. 우리가 구축하는 모든 시스템은
                수입차 딜러십의 특정 워크플로우, 규제 요건, 운영 현실에 맞게 설계됩니다.
              </p>
              <p className="text-slate-500 dark:text-ide-muted leading-relaxed text-sm">
                PDI, DMS, CRM, 물류, 부품 관리까지 — 수입차 딜러십 운영의 전 과정을
                단일 플랫폼으로 통합합니다. 2003년부터 쌓아온 도메인 지식이 모든 제품에 반영됩니다.
              </p>
            </div>
          </div>

          {/* Core Strengths */}
          <div className="company-page-section mb-14 sm:mb-20">
            <div className="flex items-center gap-3 mb-6">
              <span className="w-5 h-px bg-brand-accent/50" />
              <span className="text-xs font-mono tracking-[0.2em] uppercase text-brand-accent">
                CORE STRENGTHS
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {STRENGTHS.map(({ title, desc, color }) => (
                <div
                  key={title}
                  className="rounded-xl border border-slate-200 dark:border-white/6 bg-white dark:bg-ide-card p-6"
                >
                  <div className="w-1.5 h-1.5 rounded-full mb-4" style={{ backgroundColor: color }} />
                  <h3 className="font-semibold text-slate-900 dark:text-ide-text mb-2">{title}</h3>
                  <p className="text-sm text-slate-500 dark:text-ide-muted leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Milestones */}
          <div className="company-page-section mb-14 sm:mb-20">
            <div className="flex items-center gap-3 mb-6">
              <span className="w-5 h-px bg-brand-accent/50" />
              <span className="text-xs font-mono tracking-[0.2em] uppercase text-brand-accent">
                KEY MILESTONES
              </span>
            </div>
            <div className="relative pl-6">
              {/* Vertical line */}
              <div className="absolute left-0 top-2 bottom-2 w-px bg-slate-200 dark:bg-white/8" />

              <div className="space-y-8">
                {MILESTONES.map(({ year, title, desc }, i) => (
                  <div key={year} className="relative">
                    {/* Dot */}
                    <div
                      className={`absolute -left-6 w-3 h-3 rounded-full border-2 border-white dark:border-ide-bg top-0.5 translate-x-[-5px] ${
                        i === MILESTONES.length - 1
                          ? 'bg-emerald-500'
                          : 'bg-brand-accent'
                      }`}
                    />
                    <div className="flex items-start gap-4">
                      <span className="text-xs font-mono font-bold text-brand-accent flex-shrink-0 pt-0.5 w-10">
                        {year}
                      </span>
                      <div>
                        <div className="font-medium text-slate-900 dark:text-ide-text text-sm mb-1">
                          {title}
                        </div>
                        <p className="text-xs text-slate-500 dark:text-ide-muted leading-relaxed">
                          {desc}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Contact CTA */}
          <div className="company-page-section border-t border-slate-200 dark:border-white/8 pt-12 text-center">
            <p className="text-slate-500 dark:text-ide-muted mb-5 text-sm">
              오토포커스와 파트너십을 논의하고 싶으신가요?
            </p>
            <button
              onClick={() => navigate('/contact')}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-slate-900 dark:bg-white/10 text-white text-sm font-medium hover:bg-slate-700 dark:hover:bg-white/15 transition-colors cursor-pointer"
            >
              파트너십 문의하기
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </button>
          </div>

        </Container>
      </div>
    </DetailPageLayout>
  )
}
