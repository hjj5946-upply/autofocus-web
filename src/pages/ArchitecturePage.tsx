import { useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { DetailPageLayout } from '../components/organisms/DetailPageLayout'
import { Container } from '../components/atoms/Container'
import { SectionTag } from '../components/atoms/SectionTag'

const LAYERS = [
  {
    id: 'presentation',
    label: 'PRESENTATION LAYER',
    color: '#3b82f6',
    items: ['딜러 포털', '모바일 앱', '관리자 대시보드', 'OEM 인터페이스'],
    desc: '사용자와 시스템이 만나는 접점. 역할 기반 접근 제어와 반응형 UI로 모든 디바이스를 지원합니다.',
  },
  {
    id: 'business',
    label: 'BUSINESS LOGIC LAYER',
    color: '#f59e0b',
    items: ['PDI 엔진', 'DMS 코어', 'CRM 엔진', 'Warranty 프로세서', '물류 추적기', '부품 관리'],
    desc: '오토포커스 플랫폼의 핵심. 자동차 산업 도메인 지식이 집약된 비즈니스 로직이 운영됩니다.',
  },
  {
    id: 'integration',
    label: 'INTEGRATION LAYER',
    color: '#8b5cf6',
    items: ['OEM API 게이트웨이', '데이터 변환 엔진', '이벤트 버스', '외부 시스템 커넥터'],
    desc: '이기종 시스템 간 데이터 흐름을 조율합니다. 실시간 동기화와 충돌 해결을 자동으로 처리합니다.',
  },
  {
    id: 'data',
    label: 'DATA LAYER',
    color: '#10b981',
    items: ['운영 DB', '분석 데이터 웨어하우스', '파일 스토리지', '캐시 레이어'],
    desc: '고가용성 데이터 인프라. 실시간 OLTP와 분석용 OLAP를 분리하여 성능과 안정성을 동시에 확보합니다.',
  },
]

const PRINCIPLES = [
  {
    title: '단일 진실 공급원',
    desc: '모든 데이터는 단일 소스에서 관리됩니다. 중복 데이터와 불일치를 구조적으로 방지합니다.',
    color: '#3b82f6',
  },
  {
    title: '실시간 동기화',
    desc: 'OEM-딜러-서비스 네트워크 간 데이터가 실시간으로 동기화됩니다. 이벤트 드리븐 아키텍처 기반.',
    color: '#f59e0b',
  },
  {
    title: '모듈형 확장',
    desc: '각 솔루션 모듈은 독립적으로 배포되고 스케일됩니다. 필요한 모듈만 도입하고 점진적으로 확장합니다.',
    color: '#8b5cf6',
  },
  {
    title: '엔터프라이즈 보안',
    desc: '역할 기반 접근 제어, 데이터 암호화, 감사 로그를 기본으로 제공합니다.',
    color: '#10b981',
  },
]

export function ArchitecturePage() {
  const navigate = useNavigate()
  const pageRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    gsap.fromTo(
      '.arch-page-hero',
      { opacity: 0, y: 24 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }
    )
    gsap.fromTo(
      '.arch-page-section',
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
            <span className="text-slate-600 dark:text-ide-text">Architecture</span>
          </nav>

          {/* Hero */}
          <div className="arch-page-hero mb-14 sm:mb-20">
            <SectionTag className="mb-5">SYSTEM ARCHITECTURE</SectionTag>
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
              플랫폼이 생태계를 연결하는 방식
            </h1>
            <p className="text-slate-500 dark:text-ide-muted leading-relaxed text-base max-w-2xl">
              오토포커스는 OEM, 딜러, 서비스 네트워크를 단일 운영 레이어로 연결하는
              중앙 신경계 역할을 합니다. 4계층 아키텍처 설계로 확장성과 안정성을 동시에 확보합니다.
            </p>
          </div>

          {/* Architecture Layers */}
          <div className="arch-page-section mb-14 sm:mb-20">
            <div className="flex items-center gap-3 mb-6">
              <span className="w-5 h-px bg-brand-accent/50" />
              <span className="text-xs font-mono tracking-[0.2em] uppercase text-brand-accent">
                ARCHITECTURE LAYERS
              </span>
            </div>
            <div className="space-y-4">
              {LAYERS.map(({ id, label, color, items, desc }) => (
                <div
                  key={id}
                  className="rounded-xl border border-slate-200 dark:border-white/8 bg-white dark:bg-ide-card p-6"
                  style={{ borderLeftColor: color, borderLeftWidth: '2px' }}
                >
                  <div className="flex flex-col md:flex-row md:items-start gap-4">
                    <div className="md:w-48 flex-shrink-0">
                      <span className="text-xs font-mono font-bold tracking-widest" style={{ color }}>
                        {label}
                      </span>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-slate-500 dark:text-ide-muted leading-relaxed mb-4">
                        {desc}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {items.map((item) => (
                          <span
                            key={item}
                            className="px-2.5 py-1 rounded text-xs font-mono"
                            style={{ backgroundColor: `${color}10`, color }}
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Design Principles */}
          <div className="arch-page-section mb-14 sm:mb-20">
            <div className="flex items-center gap-3 mb-6">
              <span className="w-5 h-px bg-brand-accent/50" />
              <span className="text-xs font-mono tracking-[0.2em] uppercase text-brand-accent">
                DESIGN PRINCIPLES
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {PRINCIPLES.map(({ title, desc, color }) => (
                <div
                  key={title}
                  className="rounded-xl border border-slate-200 dark:border-white/6 bg-white dark:bg-ide-card p-6"
                >
                  <div
                    className="w-1.5 h-1.5 rounded-full mb-4"
                    style={{ backgroundColor: color }}
                  />
                  <h3 className="font-semibold text-slate-900 dark:text-ide-text mb-2">{title}</h3>
                  <p className="text-sm text-slate-500 dark:text-ide-muted leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Data Flow Overview */}
          <div className="arch-page-section mb-14 sm:mb-20">
            <div className="flex items-center gap-3 mb-6">
              <span className="w-5 h-px bg-brand-accent/50" />
              <span className="text-xs font-mono tracking-[0.2em] uppercase text-brand-accent">
                DATA FLOW
              </span>
            </div>
            <div className="rounded-xl border border-slate-200 dark:border-white/8 bg-white dark:bg-ide-card p-8">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-center">
                {['OEM 시스템', '통합 레이어', '오토포커스 코어', '딜러 네트워크'].map((node, i, arr) => (
                  <div key={node} className="flex items-center gap-4">
                    <div className="rounded-lg border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-ide-deep/60 px-4 py-3">
                      <div className="text-xs font-mono font-bold text-slate-500 dark:text-ide-muted">
                        {node}
                      </div>
                    </div>
                    {i < arr.length - 1 && (
                      <svg width="24" height="10" viewBox="0 0 24 10" className="flex-shrink-0 hidden sm:block">
                        <line x1="0" y1="5" x2="20" y2="5" stroke="#cbd5e1" strokeWidth="1.2" />
                        <polyline points="16,2 20,5 16,8" fill="none" stroke="#cbd5e1" strokeWidth="1.2" />
                      </svg>
                    )}
                  </div>
                ))}
              </div>
              <div className="mt-6 pt-6 border-t border-slate-100 dark:border-white/6">
                <p className="text-xs text-slate-400 dark:text-ide-muted text-center">
                  실시간 양방향 데이터 흐름 · 이벤트 드리븐 동기화 · 충돌 자동 해결
                </p>
              </div>
            </div>
          </div>

          {/* Contact CTA */}
          <div className="arch-page-section border-t border-slate-200 dark:border-white/8 pt-12 text-center">
            <p className="text-slate-500 dark:text-ide-muted mb-5 text-sm">
              아키텍처 상세 문서나 기술 검토가 필요하신가요?
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
