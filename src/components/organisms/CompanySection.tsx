import { useRef, Fragment } from 'react'
import { useTranslation } from 'react-i18next'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SectionTag } from '../atoms/SectionTag'
import { Container } from '../atoms/Container'

gsap.registerPlugin(ScrollTrigger)

// ── Full company history (newest → oldest = left → right in marquee) ──
interface HistEntry { m: string; txt: string }
interface HistYear { year: string; isPresent?: true; entries: HistEntry[] }

const HISTORY: HistYear[] = [
  { year: '2026', isPresent: true, entries: [
    { m: '06', txt: '신규 고객사 계약 및 사업 확장 진행 중' },
  ]},
  { year: '2025', entries: [
    { m: '10', txt: '벤츠트럭(스타트럭코리아) SALES&CRM 계약' },
    { m: '09', txt: '벤츠트럭(스타트럭코리아) DMS 개발' },
    { m: '07', txt: '만트럭 서비스앱(MyMAN) 개발' },
    { m: '06', txt: '페라리코리아 DMS' },
  ]},
  { year: '2024', entries: [
    { m: '08', txt: '멀츠에스테틱스코리아 홈페이지 개발' },
    { m: '06', txt: '만트럭버스코리아 서비스 앱 계약체결' },
    { m: '04', txt: '테슬라 대전 BP사 DMS 계약체결' },
    { m: '03', txt: '멀츠에스테틱스코리아 벨로테로 앱 개발' },
  ]},
  { year: '2023', entries: [
    { m: '09', txt: '영국 그레나디어 코리아(차봇) DMS 계약체결' },
    { m: '05', txt: '테슬라 서울·대구 BP사 DMS 계약체결' },
    { m: '04', txt: '포드코리아 UDB 시스템 구축' },
    { m: '01', txt: '만트럭코리아 DMS 계약체결' },
  ]},
  { year: '2022', entries: [
    { m: '09', txt: '포드코리아 E-Board 시스템 구축' },
    { m: '08', txt: '테슬라 광주 BP사 DMS 계약체결' },
    { m: '06', txt: '만트럭코리아 CRM 계약체결' },
    { m: '03', txt: '로얄앤필드코리아 통합 시스템 계약체결' },
    { m: '02', txt: '두카티 통합 시스템 계약체결' },
  ]},
  { year: '2021', entries: [
    { m: '08', txt: 'Pirelli·Metzeler tire 통합 시스템 계약체결' },
    { m: '06', txt: '포드코리아 딜러 통합 시스템 계약체결' },
    { m: '06', txt: '말레이시아 NAZA 그룹 페라리·마세라티 DMS 계약' },
    { m: '03', txt: 'Aston Martin DMS·Sales 태블릿 시스템 계약체결' },
    { m: '03', txt: 'McLaren DMS·Sales 태블릿 시스템 계약체결' },
  ]},
  { year: '2020', entries: [
    { m: '06', txt: 'BAT KOREA 내부 인트라넷 시스템 계약체결' },
    { m: '05', txt: '테슬라 사고차 정비 시스템(BP샵) 계약체결' },
    { m: '04', txt: '프리미어 모터스 통합 시스템 계약체결' },
    { m: '02', txt: 'FMK DMS 딜러통합 계약체결' },
    { m: '02', txt: 'FMK DMS 태블릿 시스템 계약체결' },
  ]},
  { year: '2019', entries: [
    { m: '11', txt: '페라리 베트남법인 통합시스템 계약체결' },
    { m: '10', txt: '베이징모터스코리아 통합시스템 계약체결' },
    { m: '04', txt: '애스턴마틴코리아 통합시스템 계약체결' },
    { m: '04', txt: '맥라렌코리아 통합시스템 계약체결' },
    { m: '01', txt: '아우디코리아 인증시스템 계약체결' },
  ]},
  { year: '2018', entries: [
    { m: '10', txt: '아우디코리아 PDI시스템 유지보수 계약체결' },
    { m: '09', txt: '마세라티 딜러 천일모터스 DMS 계약체결' },
    { m: '07', txt: '마세라티 모바일시스템 계약체결' },
    { m: '06', txt: '벤츠트럭PDI(서광산업) 시스템 계약체결' },
  ]},
  { year: '2017', entries: [
    { m: '11', txt: '포드코리아 딜러(5개 지점) DMS 계약체결' },
    { m: '10', txt: 'GM 코리아 딜러 CRM 시스템 구축' },
    { m: '01', txt: '페라리·마세라티 중고차사업부 시스템 구축' },
  ]},
  { year: '2016', entries: [
    { m: '09', txt: '도이치 파트 통합시스템 구축' },
    { m: '06', txt: '마세라티 코리아 일산 영업소 시스템 구축' },
    { m: '05', txt: '소나 VPC 코리아(벤츠·볼보) PDI 통합시스템 구축' },
  ]},
  { year: '2015', entries: [
    { m: '12', txt: 'GM Korea 홈페이지 구축' },
    { m: '10', txt: '월드오토파트 통합시스템 구축' },
    { m: '08', txt: '위본모터스(아우디·마세라티) SALES·CRM 공급' },
    { m: '05', txt: '마세라티 코리아 부산 영업소 시스템 구축' },
  ]},
  { year: '2014', entries: [
    { m: '10', txt: '벤츠코리아 A/S 도우미 어플 공급' },
    { m: '04', txt: '페라리 코리아(FMK) 통합 시스템 구축' },
    { m: '04', txt: '마세라티 코리아(FMK) 통합 시스템 구축' },
    { m: '03', txt: '아우디 딜러(원주) CRM 공급' },
  ]},
  { year: '2013', entries: [
    { m: '10', txt: '벤츠코리아 딜러 포탈 사이트 계약체결' },
    { m: '09', txt: '벤츠코리아 그룹웨어 포탈사이트 계약체결' },
    { m: '07', txt: 'GM캐딜락 PDI(STLS) 시스템 계약체결' },
    { m: '05', txt: '포드코리아 딜러 DMS 계약체결' },
    { m: '03', txt: '폭스바겐 딜러(마이스터) CRM 계약체결' },
  ]},
  { year: '2012', entries: [
    { m: '11', txt: '벤츠코리아 Local 부품관리 시스템 계약체결' },
    { m: '10', txt: '이베코트럭 통합시스템 구축 계약체결' },
    { m: '07', txt: '미쓰비시 한국 CXC모터스 CRM 계약체결' },
  ]},
  { year: '2011', entries: [
    { m: '11', txt: '시트로엥 공식딜러 한불모터스 통합시스템 계약체결' },
    { m: '06', txt: '한국 시보레 CRM·관리 계약체결' },
    { m: '03', txt: '푸조 아이패드 어플 계약체결' },
  ]},
  { year: '2010', entries: [
    { m: '11', txt: '벤츠코리아 Global SWT Interface 계약체결' },
    { m: '09', txt: 'CRM Version Ⅲ 출시' },
    { m: '06', txt: 'GM 홈페이지 모바일 버전 계약체결' },
    { m: '03', txt: 'GM대우 통합 CRM 구축 및 DW 계약체결' },
  ]},
  { year: '2009', entries: [
    { m: '12', txt: '푸조 공식딜러 한불모터스 통합시스템 계약체결' },
    { m: '06', txt: 'GM대우 전국 영업소 CRM 계약체결' },
    { m: '03', txt: 'GM Global Site 연계 계약체결' },
  ]},
  { year: '2008', entries: [
    { m: '07', txt: '푸조 CRM·Sales 시스템 공급 계약체결' },
    { m: '02', txt: '볼보 PDI 차량물류관리·위치관리 시스템 계약체결' },
    { m: '01', txt: 'ACDelco 자동차 부품 물류 시스템 계약체결' },
    { m: '01', txt: 'GM Korea International Homepage 연계 계약체결' },
  ]},
  { year: '2007', entries: [
    { m: '10', txt: 'GM Global Warranty System 계약체결' },
    { m: '08', txt: '푸조 차량 서비스 부품 재고 계약체결' },
    { m: '01', txt: 'Volkswagen 차량물류관리·위치관리 PDI 계약체결' },
    { m: '01', txt: 'Audi 차량물류관리·위치관리 PDI 계약체결' },
  ]},
  { year: '2006', entries: [
    { m: '04', txt: '다임러크라이슬러 코리아 PDI 시스템 공급' },
    { m: '02', txt: '메르세데스 벤츠 코리아 PDI 시스템 공급' },
  ]},
  { year: '2005', entries: [
    { m: '11', txt: '메르세데스벤츠코리아·다임러크라이슬러 자동차 물류 시스템 계약체결' },
    { m: '02', txt: '다임러 크라이슬러 코리아 딜러 AUTOeCRM 공급' },
  ]},
  { year: '2004', entries: [
    { m: '09', txt: 'GM Korea 콜센터 및 PDI시스템 계약체결' },
    { m: '06', txt: 'GM Korea 딜러 AUTOeCRM 공급' },
    { m: '04', txt: '렉서스(SAMYANG) AUTOeCRM 공급' },
  ]},
  { year: '2003', entries: [
    { m: '11', txt: 'AUTOeCRM 솔루션 출시' },
    { m: '09', txt: 'GM Korea DMS 시스템 계약체결' },
    { m: '05', txt: 'GM Korea PDC 시스템 계약체결' },
    { m: '05', txt: 'GM Korea Warranty 시스템 계약체결' },
    { m: '04', txt: 'GM Korea 회계시스템 계약체결' },
    { m: '04', txt: 'ACDelco 서비스센터 시스템 계약체결' },
  ]},
]

const ACCENT_LIVE = '#22c55e'
const ACCENT_DEFAULT = '#3b82f6'

export function CompanySection() {
  const { t } = useTranslation()
  const sectionRef = useRef<HTMLElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    // ── Section header ──
    gsap.fromTo(
      '.company-header',
      { opacity: 0, y: 24 },
      {
        opacity: 1, y: 0, duration: 0.7,
        scrollTrigger: { trigger: '.company-header', start: 'top 85%', once: true },
      }
    )

    // ── History label ──
    gsap.fromTo(
      '.history-label',
      { opacity: 0, x: -20 },
      {
        opacity: 1, x: 0, duration: 0.5,
        scrollTrigger: { trigger: '.company-timeline', start: 'top 85%', once: true },
      }
    )

    // ── Marquee + drag ──
    const track = trackRef.current
    if (!track) return

    const anim = gsap.to(track, {
      x: '-50%',
      duration: 90,
      ease: 'none',
      repeat: -1,
    })

    let dragging = false
    let startMouseX = 0
    let startTrackX = 0

    const getContentWidth = () => track.offsetWidth / 2

    const onPointerDown = (e: PointerEvent) => {
      if (e.button !== 0) return
      dragging = true
      anim.pause()
      startMouseX = e.clientX
      startTrackX = gsap.getProperty(track, 'x') as number
      track.setPointerCapture(e.pointerId)
      track.style.cursor = 'grabbing'
      document.body.style.cursor = 'grabbing'
      e.preventDefault()
    }

    const onPointerMove = (e: PointerEvent) => {
      if (!dragging) return
      const delta = e.clientX - startMouseX
      let newX = startTrackX + delta
      const cw = getContentWidth()
      while (newX > 0) newX -= cw
      while (newX < -cw) newX += cw
      gsap.set(track, { x: newX })
    }

    const onPointerUp = () => {
      if (!dragging) return
      dragging = false
      track.style.cursor = 'grab'
      document.body.style.cursor = ''

      const currentX = gsap.getProperty(track, 'x') as number
      const cw = getContentWidth()
      let nx = currentX
      while (nx > 0) nx -= cw
      while (nx < -cw) nx += cw
      const progress = Math.abs(nx) / cw
      anim.progress(progress).play()
    }

    track.addEventListener('pointerdown', onPointerDown)
    document.addEventListener('pointermove', onPointerMove)
    document.addEventListener('pointerup', onPointerUp)

    return () => {
      track.removeEventListener('pointerdown', onPointerDown)
      document.removeEventListener('pointermove', onPointerMove)
      document.removeEventListener('pointerup', onPointerUp)
    }
  }, { scope: sectionRef })

  return (
    <section id="company" ref={sectionRef} className="scroll-mt-16 py-16 sm:py-24 bg-white/20 dark:bg-ide-bg/40 overflow-hidden">
      <Container>

        {/* ── Header ── */}
        <div className="company-header text-center mb-12 sm:mb-20">
          <SectionTag className="justify-center mb-5">
            {t('company.tag')}
          </SectionTag>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4 leading-tight sm:whitespace-pre-line">
            {t('company.title')}
          </h2>
          <p className="text-slate-700 dark:text-slate-300 max-w-xl mx-auto leading-relaxed">
            {t('company.subtitle')}
          </p>
        </div>

        {/* ── History marquee ── */}
        <div className="company-timeline mb-12 sm:mb-24">

          {/* Label row */}
          <div className="history-label flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <span className="w-5 h-px bg-brand-accent/50" />
              <span className="text-xs font-mono tracking-[0.2em] uppercase text-brand-accent">
                {t('company.history_tag')}
              </span>
            </div>
            <span className="hidden sm:block text-[10px] font-mono text-slate-400/60 dark:text-white/20 tracking-widest">
              2003 — 2026 · DRAG TO NAVIGATE
            </span>
          </div>

          {/* Stage wrapper */}
          <div
            className="relative overflow-hidden rounded-2xl border border-slate-200/30 dark:border-white/5 bg-slate-50/50 dark:bg-slate-900/25"
            style={{ maskImage: 'linear-gradient(to right, transparent, black 5%, black 95%, transparent)' }}
          >
            {/* Subtle rail line */}
            <div className="absolute inset-x-0 top-1/2 h-px bg-gradient-to-r from-transparent via-brand-accent/8 to-transparent pointer-events-none" />

            {/* Track — 2 identical copies + separator for seamless loop */}
            <div
              ref={trackRef}
              className="flex gap-4 w-max py-6 px-4 select-none"
              style={{ cursor: 'grab' }}
            >
              {[0, 1].map(setIdx => (
                <Fragment key={setIdx}>
                  {HISTORY.map((h, hi) => {
                    const accent = h.isPresent ? ACCENT_LIVE : ACCENT_DEFAULT
                    return (
                      <div
                        key={`${setIdx}-${hi}`}
                        aria-hidden={setIdx === 1}
                        className="relative flex-shrink-0 w-[360px] rounded-xl overflow-hidden bg-white dark:bg-ide-card shadow-md shadow-slate-300/20 dark:shadow-black/25"
                        style={{
                          border: '1px solid rgba(148,163,184,0.18)',
                          borderLeft: `2px solid ${accent}`,
                        }}
                      >
                        {/* Top gradient stripe */}
                        <div
                          className="h-[2px] w-full flex-shrink-0"
                          style={{ background: `linear-gradient(90deg, ${accent}70 0%, transparent 65%)` }}
                        />

                        <div className="relative px-6 pt-5 pb-6">
                          {/* Year + badge row */}
                          <div className="flex items-start justify-between mb-3">
                            <div>
                              <span
                                className="text-[28px] font-black font-mono leading-none tracking-tight block"
                                style={{ color: accent }}
                              >
                                {h.year}
                              </span>
                              <span className="text-[11px] font-mono tracking-[0.15em] text-slate-400/70 dark:text-white/25 mt-0.5 block">
                                {h.isPresent ? '현재 진행 중' : `${h.entries.length} CONTRACTS`}
                              </span>
                            </div>

                            {h.isPresent ? (
                              <span
                                className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-mono tracking-[0.1em] mt-0.5"
                                style={{ background: `${accent}18`, color: accent, border: `1px solid ${accent}35` }}
                              >
                                <span className="relative flex h-1.5 w-1.5 flex-shrink-0">
                                  <span
                                    className="animate-ping absolute h-full w-full rounded-full"
                                    style={{ backgroundColor: accent, opacity: 0.65 }}
                                  />
                                  <span
                                    className="relative rounded-full h-1.5 w-1.5"
                                    style={{ backgroundColor: accent }}
                                  />
                                </span>
                                LIVE
                              </span>
                            ) : (
                              <span className="text-[14px] font-black font-mono text-slate-200/80 dark:text-white/[0.06] mt-1 leading-none">
                                {h.year.slice(2)}
                              </span>
                            )}
                          </div>

                          {/* Divider */}
                          <div
                            className="mb-3 h-px"
                            style={{ background: `linear-gradient(90deg, ${accent}30, transparent 60%)` }}
                          />

                          {/* Entry list */}
                          <div className="space-y-[9px]">
                            {h.entries.map((e, i) => (
                              <div key={i} className="flex gap-3">
                                <span
                                  className="flex-shrink-0 w-[20px] text-[11px] font-mono font-bold tabular-nums pt-[1px] text-right"
                                  style={{ color: `${accent}95` }}
                                >
                                  {e.m}
                                </span>
                                <span className="text-[13px] leading-snug text-slate-700 dark:text-slate-200">
                                  {e.txt}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Watermark year */}
                        <div
                          className="absolute -bottom-2 -right-3 text-8xl font-black leading-none pointer-events-none select-none"
                          style={{ color: accent, opacity: 0.07 }}
                        >
                          {h.year}
                        </div>
                      </div>
                    )
                  })}

                  {/* Chapter boundary separator: marks where 2003 ends and 2026 begins */}
                  <div
                    className="flex-shrink-0 flex items-center px-8 pointer-events-none"
                    aria-hidden="true"
                  >
                    <div className="flex flex-col items-center gap-3">
                      <div className="h-10 w-px bg-gradient-to-b from-transparent via-slate-300/50 dark:via-white/12 to-transparent" />
                      <div className="flex flex-col items-center gap-0.5 text-center">
                        <span className="text-[8px] font-mono tracking-[0.2em] text-slate-400/50 dark:text-white/20">2003</span>
                        <span className="text-xs text-slate-300/60 dark:text-white/15 leading-none">∞</span>
                        <span className="text-[8px] font-mono tracking-[0.2em]" style={{ color: `${ACCENT_LIVE}55` }}>2026</span>
                      </div>
                      <div className="h-10 w-px bg-gradient-to-b from-transparent via-slate-300/50 dark:via-white/12 to-transparent" />
                    </div>
                  </div>

                </Fragment>
              ))}
            </div>
          </div>
        </div>


      </Container>
    </section>
  )
}
