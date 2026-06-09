import { useRef } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { DetailPageLayout } from '../components/organisms/DetailPageLayout'
import { Container } from '../components/atoms/Container'
import { SectionTag } from '../components/atoms/SectionTag'
import { CASE_LIST } from './CasesPage'

interface CaseDetail {
  tag: string
  client: string
  industry: string
  color: string
  challenge: string
  solution: string
  result: string
  metrics: { label: string; value: string }[]
  modules: string[]
  timeline: string
}

const CASE_DETAILS: Record<string, CaseDetail> = {
  'case-1': {
    tag: 'DMS · CRM · PARTS',
    client: '멀티브랜드 딜러 그룹',
    industry: '수입차 딜러십',
    color: '#3b82f6',
    challenge:
      '8개 딜러십이 각각 독립적인 시스템으로 운영되어 그룹 단위의 재고 파악, 성과 분석, 고객 이력 추적이 불가능했습니다. 부서 간 데이터 공유는 수동 보고서에 의존했으며, 이로 인한 정보 지연과 의사결정 오류가 반복되었습니다.',
    solution:
      'DMS, CRM, PARTS 모듈을 중앙 분석 대시보드와 함께 전체 딜러십 그룹에 통합 배포했습니다. 각 딜러십의 기존 운영 방식을 최대한 유지하면서 데이터 레이어만 통합하는 단계적 접근을 택했습니다.',
    result:
      '그룹 전체의 재고를 실시간으로 파악하고 교차 딜러 판매가 가능해졌습니다. 주간 보고서 작성에 소요되던 시간이 90% 단축되었으며, 그룹 단위 KPI 모니터링 체계가 구축되었습니다.',
    metrics: [
      { label: '관리 오버헤드', value: '-40%' },
      { label: '보고서 작성 시간', value: '-90%' },
      { label: '재고 가시성', value: '실시간' },
      { label: '교차 딜러 판매', value: '가능' },
    ],
    modules: ['DMS', 'SALES & CRM', 'PARTS'],
    timeline: '구현 기간: 약 4개월',
  },
  'case-2': {
    tag: 'PDI · LOGISTICS',
    client: '럭셔리 수입 유통사',
    industry: '럭셔리 자동차 유통',
    color: '#8b5cf6',
    challenge:
      '수입 차량의 PDI 과정이 종이 문서 기반으로 운영되어 검사 항목 누락, 결함 재발, 인도 지연이 빈번했습니다. OEM 표준 검사 항목이 실제 검사 현장에 정확히 전달되지 않아 품질 불일치 문제가 지속되었습니다.',
    solution:
      'OEM 표준을 그대로 내재화한 디지털 PDI 시스템을 구축했습니다. 모바일 기기로 현장에서 검사하고 결과를 즉시 기록하며, 결함 발견 시 자동으로 수정 작업 지시서가 생성됩니다. 물류 추적 시스템과 연동하여 차량 위치를 실시간 파악합니다.',
    result:
      '검사 항목 누락 건수가 0으로 감소했으며, 인도 프로세스 전체 소요 시간이 60% 단축되었습니다. 각 차량의 완전한 검사 이력이 디지털로 보존되어 OEM 감사 대응 시간이 대폭 단축되었습니다.',
    metrics: [
      { label: '인도 프로세스', value: '-60%' },
      { label: '검사 누락', value: '0건' },
      { label: '결함 재발', value: '-85%' },
      { label: '감사 대응 시간', value: '-70%' },
    ],
    modules: ['PDI', 'LOGISTICS'],
    timeline: '구현 기간: 약 2개월',
  },
  'case-3': {
    tag: 'PARTS · FINANCE',
    client: '지역 서비스 네트워크',
    industry: '자동차 서비스 센터',
    color: '#10b981',
    challenge:
      '자주 사용되는 부품의 재고 부족으로 수리 완료까지 2-3일을 대기해야 하는 경우가 빈번했습니다. 부품 발주는 담당자의 경험에 의존했으며, 네트워크 내 다른 센터의 재고를 활용하는 체계가 없었습니다.',
    solution:
      '네트워크 전체 재고를 통합 관리하는 실시간 부품 재고 시스템을 구축했습니다. 예측 보충 알고리즘이 수요를 예측하여 자동 발주하며, 인근 센터 간 재고 공유 기능을 통해 즉각 대응이 가능해졌습니다.',
    result:
      '부품 재고 부족으로 인한 수리 지연이 35% 감소했으며, 서비스 베이 활용도가 25% 향상되었습니다. 안전 재고 수준 최적화로 재고 비용도 절감되었습니다.',
    metrics: [
      { label: '재고 부족', value: '-35%' },
      { label: '서비스 베이 활용도', value: '+25%' },
      { label: '수리 대기 시간', value: '-50%' },
      { label: '재고 비용', value: '-18%' },
    ],
    modules: ['PARTS', 'DMS'],
    timeline: '구현 기간: 약 3개월',
  },
}

export function CaseDetailPage() {
  const { slug } = useParams<{ slug: string }>()
  const navigate = useNavigate()
  const pageRef = useRef<HTMLDivElement>(null)

  const caseData = slug ? CASE_DETAILS[slug] : undefined
  const otherCases = CASE_LIST.filter((c) => c.slug !== slug)

  useGSAP(() => {
    gsap.fromTo(
      '.case-detail-hero',
      { opacity: 0, y: 24 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }
    )
    gsap.fromTo(
      '.case-detail-section',
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.5, stagger: 0.12, ease: 'power2.out', delay: 0.3 }
    )
  }, { scope: pageRef })

  if (!caseData) {
    return (
      <DetailPageLayout>
        <Container>
          <div className="text-center py-24">
            <p className="text-slate-500 dark:text-ide-muted mb-6">케이스를 찾을 수 없습니다.</p>
            <Link to="/cases" className="text-brand-accent hover:underline text-sm">
              ← 케이스 목록으로
            </Link>
          </div>
        </Container>
      </DetailPageLayout>
    )
  }

  const { tag, client, industry, color, challenge, solution, result, metrics, modules, timeline } = caseData

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
            <Link to="/cases" className="hover:text-brand-accent transition-colors">
              Cases
            </Link>
            <span>/</span>
            <span className="text-slate-600 dark:text-ide-text">{client}</span>
          </nav>

          {/* Hero */}
          <div className="case-detail-hero mb-14 sm:mb-20">
            <SectionTag className="mb-5">CASE STUDY</SectionTag>
            <div className="flex items-center gap-3 mb-3">
              <span className="text-xs font-mono font-bold tracking-wider" style={{ color }}>
                {tag}
              </span>
              <span className="text-xs text-slate-400 dark:text-ide-muted">{industry}</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-6">
              {client}
            </h1>
            <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-ide-muted">
              <span className="font-mono text-xs">{timeline}</span>
              <span>·</span>
              <div className="flex gap-1.5">
                {modules.map((mod) => (
                  <span
                    key={mod}
                    className="px-2 py-0.5 rounded text-xs font-mono"
                    style={{ backgroundColor: `${color}12`, color }}
                  >
                    {mod}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Metrics */}
          <div className="case-detail-section mb-14 sm:mb-20">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {metrics.map(({ label, value }) => (
                <div
                  key={label}
                  className="rounded-xl border border-slate-200 dark:border-white/8 bg-white dark:bg-ide-card p-5 text-center"
                >
                  <div className="text-2xl font-bold font-mono mb-1" style={{ color }}>
                    {value}
                  </div>
                  <div className="text-xs text-slate-500 dark:text-ide-muted">{label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Challenge → Solution → Result */}
          <div className="case-detail-section mb-14 sm:mb-20 space-y-5">
            {[
              { label: 'CHALLENGE', icon: '#ef4444', text: challenge },
              { label: 'SOLUTION', icon: '#3b82f6', text: solution },
              { label: 'RESULT', icon: '#10b981', text: result },
            ].map(({ label, icon, text }) => (
              <div
                key={label}
                className="rounded-xl border border-slate-200 dark:border-white/8 bg-white dark:bg-ide-card p-6"
              >
                <div className="flex items-start gap-4">
                  <div
                    className="flex-shrink-0 w-6 h-6 rounded flex items-center justify-center mt-0.5"
                    style={{ backgroundColor: `${icon}18`, color: icon }}
                  >
                    <span className="text-xs font-mono font-bold">
                      {label.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <div
                      className="text-xs font-mono font-bold tracking-widest mb-2"
                      style={{ color: icon }}
                    >
                      {label}
                    </div>
                    <p className="text-sm text-slate-600 dark:text-ide-text leading-relaxed">
                      {text}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Other Cases */}
          <div className="case-detail-section mb-14 sm:mb-20">
            <div className="flex items-center gap-3 mb-6">
              <span className="w-5 h-px bg-brand-accent/50" />
              <span className="text-xs font-mono tracking-[0.2em] uppercase text-brand-accent">
                OTHER CASES
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {otherCases.map(({ slug: otherSlug, tag: otherTag, client: otherClient, color: otherColor, summary }) => (
                <Link key={otherSlug} to={`/cases/${otherSlug}`} className="block">
                  <div className="group rounded-xl border border-slate-200 dark:border-white/6 bg-white dark:bg-ide-card p-5 hover:shadow-md transition-all duration-200">
                    <div className="text-xs font-mono font-bold tracking-wider mb-2" style={{ color: otherColor }}>
                      {otherTag}
                    </div>
                    <div className="font-medium text-slate-900 dark:text-ide-text mb-2 text-sm">
                      {otherClient}
                    </div>
                    <p className="text-xs text-slate-500 dark:text-ide-muted leading-relaxed">
                      {summary}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Contact CTA */}
          <div className="case-detail-section border-t border-slate-200 dark:border-white/8 pt-12 text-center">
            <p className="text-slate-500 dark:text-ide-muted mb-5 text-sm">
              유사한 과제를 안고 계신가요?
            </p>
            <button
              onClick={() => navigate('/contact')}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-slate-900 dark:bg-white/10 text-white text-sm font-medium hover:bg-slate-700 dark:hover:bg-white/15 transition-colors cursor-pointer"
            >
              사례 논의하기
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
