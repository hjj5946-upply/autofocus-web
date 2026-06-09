import { useRef } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { DetailPageLayout } from '../components/organisms/DetailPageLayout'
import { Container } from '../components/atoms/Container'
import { SectionTag } from '../components/atoms/SectionTag'

interface FeatureItem {
  title: string
  desc: string
}

interface SolutionData {
  name: string
  full: string
  tag: string
  color: string
  subtitle: string
  overview: string
  stats: { label: string; value: string }[]
  features: FeatureItem[]
  integrations: string[]
}

const SOLUTIONS: Record<string, SolutionData> = {
  dms: {
    name: 'DMS',
    full: 'Dealer Management System',
    tag: 'SOLUTION · DMS',
    color: '#f59e0b',
    subtitle: '딜러십 전 운영을 단일 플랫폼으로 통합하는 포괄적 딜러 운영 관리 시스템.',
    overview:
      'DMS는 재고 관리, 서비스 스케줄링, 금융 정산, 실시간 리포팅을 하나의 통합 인터페이스에서 제공합니다. 멀티브랜드, 멀티사이트 환경에서도 일관된 운영 표준을 유지하며, OEM 시스템과의 실시간 데이터 연동을 지원합니다.',
    stats: [
      { label: '운영 딜러십', value: '50+' },
      { label: '일일 트랜잭션', value: '10K+' },
      { label: '시스템 가동률', value: '99.9%' },
    ],
    features: [
      {
        title: '재고 관리',
        desc: '차량 입고부터 판매까지 전 단계 재고 현황을 실시간으로 추적하고 관리합니다.',
      },
      {
        title: '서비스 스케줄링',
        desc: '예약, 작업 지시서, 기술자 배정을 자동화하여 서비스 베이 활용도를 극대화합니다.',
      },
      {
        title: '금융 및 정산',
        desc: '딜러십 금융 거래, 리스 계약, 수수료 정산을 정밀하게 관리합니다.',
      },
      {
        title: '실시간 대시보드',
        desc: 'KPI 모니터링, 매출 분석, 운영 성과 리포트를 실시간으로 제공합니다.',
      },
    ],
    integrations: ['PDI', 'SALES & CRM', 'PARTS', 'WARRANTY', 'OEM 시스템'],
  },
  crm: {
    name: 'SALES & CRM',
    full: 'Customer Relationship Management',
    tag: 'SOLUTION · CRM',
    color: '#06b6d4',
    subtitle: '고객 생애 전체를 최적화하는 영업 및 고객 관계 관리 플랫폼.',
    overview:
      '고객 데이터를 중앙화하고 영업 파이프라인을 자동화합니다. 리드 관리부터 구매 후 서비스까지 고객 여정의 모든 단계를 추적하며, AI 기반 분석으로 최적의 영업 타이밍을 제안합니다.',
    stats: [
      { label: '고객 데이터', value: '100K+' },
      { label: '영업 전환율 향상', value: '23%' },
      { label: '팔로우업 자동화', value: '85%' },
    ],
    features: [
      {
        title: '리드 관리',
        desc: '유입된 잠재 고객을 자동 분류하고 최적의 영업 담당자에게 배정합니다.',
      },
      {
        title: '고객 이력 통합',
        desc: '구매, 서비스, 문의 이력을 단일 뷰에서 확인하여 개인화된 고객 경험을 제공합니다.',
      },
      {
        title: '영업 자동화',
        desc: '후속 연락, 계약 갱신 알림, 마케팅 캠페인을 자동화하여 영업 효율을 높입니다.',
      },
      {
        title: '성과 분석',
        desc: '영업 담당자별, 차종별, 지역별 성과를 실시간으로 분석하고 비교합니다.',
      },
    ],
    integrations: ['DMS', 'PDI', 'WARRANTY', 'OEM 마케팅 시스템'],
  },
  pdi: {
    name: 'PDI',
    full: 'Pre-Delivery Inspection',
    tag: 'SOLUTION · PDI',
    color: '#3b82f6',
    subtitle: '차량 입고부터 고객 인도까지 전 검사 과정을 표준화하고 디지털화합니다.',
    overview:
      'OEM 표준 검사 항목을 디지털 체크리스트로 변환하고, 검사 결과를 실시간으로 기록 및 공유합니다. 모바일 기기를 활용한 현장 검사, 사진 첨부, 서명 획득까지 완전한 페이퍼리스 PDI 프로세스를 구현합니다.',
    stats: [
      { label: '검사 시간 단축', value: '60%' },
      { label: '누락 항목', value: '0건' },
      { label: '디지털화율', value: '100%' },
    ],
    features: [
      {
        title: '디지털 체크리스트',
        desc: 'OEM별 표준 검사 항목을 디지털화하여 누락 없는 완전한 검사를 보장합니다.',
      },
      {
        title: '실시간 기록',
        desc: '검사 결과, 사진, 기술자 서명을 현장에서 즉시 기록하고 클라우드에 저장합니다.',
      },
      {
        title: '결함 추적',
        desc: '발견된 결함을 자동으로 분류하고 수정 완료까지 상태를 추적합니다.',
      },
      {
        title: '고객 인도 프로세스',
        desc: '검사 완료 후 고객 서명, 인도 확인, 디지털 문서 발급까지 자동화합니다.',
      },
    ],
    integrations: ['DMS', 'LOGISTICS', 'OEM 품질 시스템'],
  },
  warranty: {
    name: 'WARRANTY',
    full: 'Warranty Management System',
    tag: 'SOLUTION · WARRANTY',
    color: '#10b981',
    subtitle: 'OEM 보증 기준과 딜러 서비스 처리를 통합하는 워런티 관리 시스템.',
    overview:
      'OEM 보증 정책을 시스템에 내재화하여 보증 청구 처리를 자동화합니다. 보증 기간 추적, 부품 교환 이력, OEM 정산 처리를 통합 관리하며, 보증 관련 분쟁을 최소화합니다.',
    stats: [
      { label: '청구 처리 시간', value: '-45%' },
      { label: 'OEM 정산 정확도', value: '99.8%' },
      { label: '분쟁 건수 감소', value: '70%' },
    ],
    features: [
      {
        title: '보증 정책 관리',
        desc: 'OEM별 보증 조건, 기간, 커버리지를 시스템에 등록하고 자동으로 적용합니다.',
      },
      {
        title: '청구 자동화',
        desc: '서비스 완료 후 보증 청구서를 자동 생성하고 OEM에 전송합니다.',
      },
      {
        title: '이력 추적',
        desc: '차량별 보증 수리 이력, 부품 교환 기록, 비용 내역을 완전히 추적합니다.',
      },
      {
        title: 'OEM 연동',
        desc: 'OEM 보증 포털과 직접 연동하여 정산 처리를 자동화하고 오류를 최소화합니다.',
      },
    ],
    integrations: ['DMS', 'PARTS', 'SALES & CRM', 'OEM 보증 시스템'],
  },
}

export function SolutionDetailPage() {
  const { slug } = useParams<{ slug: string }>()
  const navigate = useNavigate()
  const pageRef = useRef<HTMLDivElement>(null)

  const solution = slug ? SOLUTIONS[slug] : undefined

  useGSAP(() => {
    gsap.fromTo(
      '.sol-detail-hero',
      { opacity: 0, y: 24 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }
    )
    gsap.fromTo(
      '.sol-detail-section',
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.5, stagger: 0.12, ease: 'power2.out', delay: 0.3 }
    )
  }, { scope: pageRef })

  if (!solution) {
    return (
      <DetailPageLayout>
        <Container>
          <div className="text-center py-24">
            <p className="text-slate-500 dark:text-ide-muted mb-6">솔루션을 찾을 수 없습니다.</p>
            <Link to="/solutions" className="text-brand-accent hover:underline text-sm">
              ← 솔루션 목록으로
            </Link>
          </div>
        </Container>
      </DetailPageLayout>
    )
  }

  const { name, full, tag, color, subtitle, overview, stats, features, integrations } = solution

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
            <Link to="/solutions" className="hover:text-brand-accent transition-colors">
              Solutions
            </Link>
            <span>/</span>
            <span className="text-slate-600 dark:text-ide-text">{name}</span>
          </nav>

          {/* Hero */}
          <div className="sol-detail-hero mb-14 sm:mb-20">
            <SectionTag className="mb-5">{tag}</SectionTag>
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
              {full}
            </h1>
            <p className="text-slate-500 dark:text-ide-muted leading-relaxed text-base max-w-2xl mb-10">
              {subtitle}
            </p>

            {/* Stats row */}
            <div className="grid grid-cols-3 gap-4 max-w-xl">
              {stats.map(({ label, value }) => (
                <div
                  key={label}
                  className="rounded-lg border border-slate-200 dark:border-white/8 bg-white dark:bg-ide-card p-4 text-center"
                >
                  <div className="text-2xl font-bold font-mono mb-1" style={{ color }}>
                    {value}
                  </div>
                  <div className="text-xs text-slate-500 dark:text-ide-muted">{label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Overview */}
          <div className="sol-detail-section mb-14 sm:mb-20">
            <div className="flex items-center gap-3 mb-6">
              <span className="w-5 h-px bg-brand-accent/50" />
              <span className="text-xs font-mono tracking-[0.2em] uppercase text-brand-accent">
                OVERVIEW
              </span>
            </div>
            <div className="max-w-3xl rounded-xl border border-slate-200 dark:border-white/8 bg-white dark:bg-ide-card p-8">
              <p className="text-slate-600 dark:text-ide-text leading-relaxed">{overview}</p>
            </div>
          </div>

          {/* Key Features */}
          <div className="sol-detail-section mb-14 sm:mb-20">
            <div className="flex items-center gap-3 mb-6">
              <span className="w-5 h-px bg-brand-accent/50" />
              <span className="text-xs font-mono tracking-[0.2em] uppercase text-brand-accent">
                KEY FEATURES
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {features.map(({ title, desc }, i) => (
                <div
                  key={i}
                  className="rounded-xl border border-slate-200 dark:border-white/6 bg-white dark:bg-ide-card p-6"
                >
                  <div
                    className="w-6 h-6 rounded flex items-center justify-center text-xs font-mono font-bold mb-4"
                    style={{ backgroundColor: `${color}18`, color }}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </div>
                  <h3 className="font-semibold text-slate-900 dark:text-ide-text mb-2">{title}</h3>
                  <p className="text-sm text-slate-500 dark:text-ide-muted leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Integration Points */}
          <div className="sol-detail-section mb-14 sm:mb-20">
            <div className="flex items-center gap-3 mb-6">
              <span className="w-5 h-px bg-brand-accent/50" />
              <span className="text-xs font-mono tracking-[0.2em] uppercase text-brand-accent">
                INTEGRATION POINTS
              </span>
            </div>
            <div className="rounded-xl border border-slate-200 dark:border-white/8 bg-white dark:bg-ide-card p-6 max-w-2xl">
              <p className="text-xs text-slate-400 dark:text-ide-muted mb-4">
                {name}와 연동되는 시스템
              </p>
              <div className="flex flex-wrap gap-2">
                {integrations.map((item) => (
                  <span
                    key={item}
                    className="px-3 py-1.5 rounded-full text-xs font-mono font-semibold"
                    style={{ backgroundColor: `${color}12`, color }}
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Related Solutions */}
          <div className="sol-detail-section mb-14 sm:mb-20">
            <div className="flex items-center gap-3 mb-6">
              <span className="w-5 h-px bg-brand-accent/50" />
              <span className="text-xs font-mono tracking-[0.2em] uppercase text-brand-accent">
                RELATED SOLUTIONS
              </span>
            </div>
            <div className="flex flex-wrap gap-3">
              {Object.entries(SOLUTIONS)
                .filter(([key]) => key !== slug)
                .map(([key, sol]) => (
                  <Link
                    key={key}
                    to={`/solutions/${key}`}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-slate-200 dark:border-white/8 bg-white dark:bg-ide-card text-sm text-slate-600 dark:text-ide-text hover:border-brand-accent/40 hover:text-brand-accent dark:hover:text-brand-accent transition-all"
                  >
                    <span
                      className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                      style={{ backgroundColor: sol.color }}
                    />
                    {sol.name}
                  </Link>
                ))}
            </div>
          </div>

          {/* Contact CTA */}
          <div className="sol-detail-section border-t border-slate-200 dark:border-white/8 pt-12">
            <div className="rounded-xl border border-slate-200 dark:border-white/8 bg-white dark:bg-ide-card p-8 text-center max-w-xl mx-auto">
              <div
                className="w-10 h-10 rounded-lg mx-auto mb-4 flex items-center justify-center text-xs font-mono font-black"
                style={{ backgroundColor: `${color}18`, color }}
              >
                {name.slice(0, 3)}
              </div>
              <h3 className="font-semibold text-slate-900 dark:text-white mb-3">
                {name} 도입을 검토하고 계신가요?
              </h3>
              <p className="text-sm text-slate-500 dark:text-ide-muted mb-6">
                현재 운영 환경에 맞는 구성 방안을 함께 논의해 드립니다.
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
          </div>

        </Container>
      </div>
    </DetailPageLayout>
  )
}
