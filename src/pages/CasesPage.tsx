import { useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { DetailPageLayout } from '../components/organisms/DetailPageLayout'
import { Container } from '../components/atoms/Container'
import { SectionTag } from '../components/atoms/SectionTag'

export const CASE_LIST = [
  {
    slug: 'case-1',
    tag: 'DMS · CRM · PARTS',
    client: '멀티브랜드 딜러 그룹',
    industry: '수입차 딜러십',
    summary: '8개 딜러십에 걸쳐 통합 데이터 레이어 없이 운영되던 단절된 시스템을 완전 통합.',
    result: '관리 오버헤드 40% 절감',
    color: '#3b82f6',
  },
  {
    slug: 'case-2',
    tag: 'PDI · LOGISTICS',
    client: '럭셔리 수입 유통사',
    industry: '럭셔리 자동차 유통',
    summary: '수동 PDI 프로세스로 인한 인도 지연과 품질 불일치를 디지털 PDI 시스템으로 해결.',
    result: '인도 프로세스 60% 단축',
    color: '#8b5cf6',
  },
  {
    slug: 'case-3',
    tag: 'PARTS · FINANCE',
    client: '지역 서비스 네트워크',
    industry: '자동차 서비스 센터',
    summary: '부품 가용성 문제로 인한 수리 지연을 실시간 재고 관리 시스템으로 개선.',
    result: '재고 부족 35% 감소',
    color: '#10b981',
  },
]

export function CasesPage() {
  const navigate = useNavigate()
  const pageRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    gsap.fromTo(
      '.cases-page-hero',
      { opacity: 0, y: 24 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }
    )
    gsap.fromTo(
      '.case-page-card',
      { opacity: 0, y: 28 },
      { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: 'power2.out', delay: 0.25 }
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
            <span className="text-slate-600 dark:text-ide-text">Cases</span>
          </nav>

          {/* Hero */}
          <div className="cases-page-hero mb-14 sm:mb-20">
            <SectionTag className="mb-5">CASE STUDIES</SectionTag>
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
              플랫폼 실적
            </h1>
            <p className="text-slate-500 dark:text-ide-muted leading-relaxed text-base max-w-2xl">
              실제 배포. 측정 가능한 성과. 오토포커스가 자동차 산업 현장에서 만들어낸
              구체적인 변화를 확인하세요.
            </p>
          </div>

          {/* Case cards */}
          <div className="space-y-5 mb-16">
            {CASE_LIST.map(({ slug, tag, client, industry, summary, result, color }) => (
              <Link key={slug} to={`/cases/${slug}`} className="block">
                <div className="case-page-card group rounded-xl border border-slate-200 dark:border-white/6 bg-white dark:bg-ide-card p-6 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 overflow-hidden relative">
                  <div
                    className="absolute top-0 left-0 bottom-0 w-0.5"
                    style={{ backgroundColor: color }}
                  />
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <span
                          className="text-xs font-mono font-bold tracking-wider"
                          style={{ color }}
                        >
                          {tag}
                        </span>
                        <span className="text-xs text-slate-400 dark:text-ide-muted">
                          {industry}
                        </span>
                      </div>
                      <h2 className="font-semibold text-slate-900 dark:text-ide-text mb-2">
                        {client}
                      </h2>
                      <p className="text-sm text-slate-500 dark:text-ide-muted leading-relaxed max-w-xl">
                        {summary}
                      </p>
                    </div>
                    <div className="flex sm:flex-col items-center sm:items-end gap-4 sm:gap-2 flex-shrink-0">
                      <div
                        className="text-sm font-bold whitespace-nowrap"
                        style={{ color }}
                      >
                        {result}
                      </div>
                      <div className="flex items-center gap-1.5 text-xs text-slate-400 dark:text-ide-muted group-hover:text-brand-accent transition-colors">
                        View Case Study
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <line x1="5" y1="12" x2="19" y2="12" />
                          <polyline points="12 5 19 12 12 19" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Contact CTA */}
          <div className="border-t border-slate-200 dark:border-white/8 pt-12 text-center">
            <p className="text-slate-500 dark:text-ide-muted mb-5 text-sm">
              귀사의 운영 환경에 맞는 사례를 더 알고 싶으신가요?
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
