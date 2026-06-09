import { useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { DetailPageLayout } from '../components/organisms/DetailPageLayout'
import { Container } from '../components/atoms/Container'
import { SectionTag } from '../components/atoms/SectionTag'

const SOLUTIONS = [
  {
    slug: 'pdi',
    name: 'PDI',
    full: 'Pre-Delivery Inspection',
    color: '#3b82f6',
    desc: '차량 입고부터 고객 인도까지 전 검사 과정을 표준화하고 디지털화하는 시스템.',
    available: true,
  },
  {
    slug: 'dms',
    name: 'DMS',
    full: 'Dealer Management System',
    color: '#f59e0b',
    desc: '재고, 서비스, 금융, 리포팅을 하나의 시스템으로 통합하는 딜러 운영 관리 플랫폼.',
    available: true,
  },
  {
    slug: 'crm',
    name: 'SALES & CRM',
    full: 'Customer Relationship Management',
    color: '#06b6d4',
    desc: '고객 데이터를 중앙화하고 영업 워크플로우를 자동화하는 고객 관계 관리 시스템.',
    available: true,
  },
  {
    slug: 'warranty',
    name: 'WARRANTY',
    full: 'Warranty Management System',
    color: '#10b981',
    desc: 'OEM 보증 기준과 딜러 서비스 처리를 통합하는 워런티 관리 시스템.',
    available: true,
  },
  {
    slug: 'logistics',
    name: 'LOGISTICS',
    full: 'Vehicle Logistics Management',
    color: '#8b5cf6',
    desc: '공장에서 전시장까지 공급망 전체의 차량 이동을 추적하고 관리합니다.',
    available: false,
  },
  {
    slug: 'parts',
    name: 'PARTS',
    full: 'Parts Inventory & Distribution',
    color: '#ef4444',
    desc: '자동 보충 및 딜러 간 유통을 포함한 실시간 부품 재고 제어 시스템.',
    available: false,
  },
]

export function SolutionsPage() {
  const navigate = useNavigate()
  const pageRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    gsap.fromTo(
      '.sol-hero',
      { opacity: 0, y: 24 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }
    )
    gsap.fromTo(
      '.sol-card',
      { opacity: 0, y: 28 },
      { opacity: 1, y: 0, duration: 0.5, stagger: 0.08, ease: 'power2.out', delay: 0.25 }
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
            <span className="text-slate-600 dark:text-ide-text">Solutions</span>
          </nav>

          {/* Hero */}
          <div className="sol-hero mb-14 sm:mb-20 max-w-2xl">
            <SectionTag className="mb-5">SOLUTIONS</SectionTag>
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
              통합 플랫폼 솔루션
            </h1>
            <p className="text-slate-500 dark:text-ide-muted leading-relaxed text-base">
              각 솔루션 모듈은 독립적으로 운영되며, 완전한 오토포커스 생태계로 원활하게 통합됩니다.
              단일 모듈 도입부터 전체 플랫폼 배포까지 유연하게 구성할 수 있습니다.
            </p>
          </div>

          {/* Solutions grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {SOLUTIONS.map(({ slug, name, full, color, desc, available }) => {
              const cardContent = (
                <div
                  className={`sol-card group relative rounded-xl border border-slate-200 dark:border-white/6 bg-white dark:bg-ide-card p-6 transition-all duration-200 overflow-hidden ${
                    available
                      ? 'hover:shadow-lg hover:-translate-y-0.5 cursor-pointer'
                      : 'opacity-60 cursor-default'
                  }`}
                >
                  <div
                    className="absolute top-0 left-0 right-0 h-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{ backgroundColor: color }}
                  />

                  <div className="flex items-start justify-between mb-5">
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center text-xs font-mono font-black"
                      style={{ backgroundColor: `${color}18`, color }}
                    >
                      {name.slice(0, 3)}
                    </div>
                    {available ? (
                      <span className="text-xs font-mono text-emerald-500 dark:text-emerald-400 flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 dark:bg-emerald-400" />
                        운영 중
                      </span>
                    ) : (
                      <span className="text-xs font-mono text-slate-400 dark:text-ide-muted">
                        Coming Soon
                      </span>
                    )}
                  </div>

                  <div className="text-xs font-mono font-bold tracking-[0.15em] mb-1" style={{ color }}>
                    {name}
                  </div>
                  <h2 className="font-semibold text-slate-900 dark:text-white mb-3 text-base">
                    {full}
                  </h2>
                  <p className="text-sm text-slate-500 dark:text-ide-muted leading-relaxed mb-5">
                    {desc}
                  </p>

                  {available && (
                    <div
                      className="flex items-center gap-1.5 text-xs font-medium transition-colors"
                      style={{ color }}
                    >
                      자세히 보기
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <line x1="5" y1="12" x2="19" y2="12" />
                        <polyline points="12 5 19 12 12 19" />
                      </svg>
                    </div>
                  )}
                </div>
              )

              return available ? (
                <Link key={slug} to={`/solutions/${slug}`} className="block">
                  {cardContent}
                </Link>
              ) : (
                <div key={slug}>{cardContent}</div>
              )
            })}
          </div>

          {/* Contact CTA */}
          <div className="border-t border-slate-200 dark:border-white/8 pt-12 text-center">
            <p className="text-slate-500 dark:text-ide-muted mb-5 text-sm">
              솔루션 도입에 대해 논의하고 싶으신가요?
            </p>
            <button
              onClick={() => navigate('/contact')}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-slate-900 dark:bg-white/10 text-white text-sm font-medium hover:bg-slate-700 dark:hover:bg-white/15 transition-colors cursor-pointer"
            >
              문의하기
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
