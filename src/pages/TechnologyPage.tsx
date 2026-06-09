import { useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { DetailPageLayout } from '../components/organisms/DetailPageLayout'
import { Container } from '../components/atoms/Container'
import { SectionTag } from '../components/atoms/SectionTag'

const TECH_AREAS = [
  {
    badge: 'AI / ML',
    color: '#3b82f6',
    title: 'AI 기반 진단 및 분석',
    overview: '차량 진단 데이터와 서비스 이력을 학습하여 잠재적 결함을 예측합니다.',
    details: [
      '결함 패턴 인식 모델 — 수백만 건의 PDI·서비스 데이터로 학습',
      '이상 감지 알고리즘 — 정상 범위에서 벗어나는 패턴 자동 플래그',
      '보증 비용 예측 — 히스토리컬 데이터 기반 보증 청구 가능성 분석',
      '재고 수요 예측 — 판매 패턴과 계절성을 반영한 부품 수요 예측',
    ],
  },
  {
    badge: 'PREDICTIVE',
    color: '#8b5cf6',
    title: '예측 정비 시스템',
    overview: '과거 데이터와 실시간 센서 정보를 결합하여 최적 정비 시점을 선제적으로 결정합니다.',
    details: [
      '주행 거리 및 사용 패턴 기반 정비 주기 최적화',
      '부품 수명 예측 모델로 예방 정비 스케줄 자동 생성',
      '고객 알림 자동화 — 정비 시점 도달 전 선제적 연락',
      '서비스 베이 활용도 극대화를 위한 스마트 예약 배분',
    ],
  },
  {
    badge: 'INTEGRATION',
    color: '#06b6d4',
    title: '데이터 통합 엔진',
    overview: '이기종 OEM 시스템과 딜러 데이터를 실시간으로 수집, 변환, 배포합니다.',
    details: [
      'REST / SOAP / EDI / 독점 프로토콜 멀티 커넥터 지원',
      '이벤트 스트리밍 — Apache Kafka 기반 실시간 데이터 파이프라인',
      '충돌 해결 로직 — 마스터 데이터 관리 원칙 적용',
      '데이터 품질 게이트 — 유입 데이터 자동 검증 및 클렌징',
    ],
  },
  {
    badge: 'REAL-TIME',
    color: '#10b981',
    title: '실시간 운영 모니터링',
    overview: '딜러십 전 운영을 실시간으로 가시화하고 이상 상황에 즉시 대응합니다.',
    details: [
      '커스텀 KPI 대시보드 — 역할별 필요 지표 구성',
      '알림 체계 — 임계값 초과 시 에스컬레이션 자동화',
      '감사 로그 — 모든 시스템 작업의 완전한 추적',
      'SLA 모니터링 — 서비스 수준 협약 준수 여부 실시간 측정',
    ],
  },
]

const STACK = [
  { layer: 'Frontend', items: ['React', 'TypeScript', 'Tailwind CSS', 'Mobile-responsive'], color: '#3b82f6' },
  { layer: 'Backend', items: ['Java Spring Boot', 'Node.js', 'RESTful API', 'GraphQL'], color: '#f59e0b' },
  { layer: 'Data', items: ['Oracle DB', 'MySQL', 'Redis Cache', 'Data Warehouse'], color: '#8b5cf6' },
  { layer: 'Infrastructure', items: ['Cloud Native', 'Container Orchestration', 'CI/CD Pipeline', 'Auto Scaling'], color: '#10b981' },
]

export function TechnologyPage() {
  const navigate = useNavigate()
  const pageRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    gsap.fromTo(
      '.tech-page-hero',
      { opacity: 0, y: 24 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }
    )
    gsap.fromTo(
      '.tech-page-section',
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
            <span className="text-slate-600 dark:text-ide-text">Technology</span>
          </nav>

          {/* Hero */}
          <div className="tech-page-hero mb-14 sm:mb-20">
            <SectionTag className="mb-5">TECHNOLOGY</SectionTag>
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
              자동차 산업의 미래를 위해 구축됨
            </h1>
            <p className="text-slate-500 dark:text-ide-muted leading-relaxed text-base max-w-2xl">
              AI 기반 진단, 예측 분석, 엔터프라이즈급 데이터 아키텍처로 구동됩니다.
              20년의 자동차 산업 경험이 기술 스택에 녹아있습니다.
            </p>
          </div>

          {/* Tech Areas */}
          <div className="tech-page-section mb-14 sm:mb-20">
            <div className="flex items-center gap-3 mb-6">
              <span className="w-5 h-px bg-brand-accent/50" />
              <span className="text-xs font-mono tracking-[0.2em] uppercase text-brand-accent">
                CORE CAPABILITIES
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {TECH_AREAS.map(({ badge, color, title, overview, details }) => (
                <div
                  key={badge}
                  className="rounded-xl border border-slate-200 dark:border-white/6 bg-white dark:bg-ide-card p-6"
                >
                  <div className="flex items-center justify-between mb-5">
                    <span
                      className="text-xs font-mono font-bold tracking-widest px-2.5 py-1 rounded-full"
                      style={{ backgroundColor: `${color}15`, color }}
                    >
                      {badge}
                    </span>
                  </div>
                  <h3 className="font-semibold text-slate-900 dark:text-ide-text mb-3">{title}</h3>
                  <p className="text-sm text-slate-500 dark:text-ide-muted leading-relaxed mb-5">
                    {overview}
                  </p>
                  <ul className="space-y-2">
                    {details.map((item, i) => (
                      <li key={i} className="flex gap-2.5 text-sm">
                        <span
                          className="flex-shrink-0 w-1 h-1 rounded-full mt-2"
                          style={{ backgroundColor: color }}
                        />
                        <span className="text-slate-500 dark:text-ide-muted leading-snug">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Tech Stack */}
          <div className="tech-page-section mb-14 sm:mb-20">
            <div className="flex items-center gap-3 mb-6">
              <span className="w-5 h-px bg-brand-accent/50" />
              <span className="text-xs font-mono tracking-[0.2em] uppercase text-brand-accent">
                TECHNOLOGY STACK
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {STACK.map(({ layer, items, color }) => (
                <div
                  key={layer}
                  className="rounded-xl border border-slate-200 dark:border-white/8 bg-white dark:bg-ide-card p-5"
                >
                  <div className="text-xs font-mono font-bold tracking-widest mb-3" style={{ color }}>
                    {layer.toUpperCase()}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {items.map((item) => (
                      <span
                        key={item}
                        className="px-2.5 py-1 rounded text-xs font-mono border"
                        style={{
                          borderColor: `${color}20`,
                          color: 'inherit',
                        }}
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Contact CTA */}
          <div className="tech-page-section border-t border-slate-200 dark:border-white/8 pt-12 text-center">
            <p className="text-slate-500 dark:text-ide-muted mb-5 text-sm">
              기술 아키텍처나 보안 요건에 대해 더 자세히 알고 싶으신가요?
            </p>
            <button
              onClick={() => navigate('/contact')}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-slate-900 dark:bg-white/10 text-white text-sm font-medium hover:bg-slate-700 dark:hover:bg-white/15 transition-colors cursor-pointer"
            >
              기술 문의하기
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
