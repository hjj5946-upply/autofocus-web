import { useRef, useEffect } from 'react'
import { useTheme } from '../../hooks/useTheme'

const WAVE_COUNT = 24
const SPEED = 0.00075   // very slow — full cycle ~45 seconds

export function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { isDark } = useTheme()
  const isDarkRef = useRef(isDark)

  useEffect(() => {
    isDarkRef.current = isDark
  }, [isDark])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')!
    let rafId: number
    const startTime = performance.now()

    const resize = () => {
      canvas.width  = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    // Precompute per-wave constants so they're stable across frames
    const waves = Array.from({ length: WAVE_COUNT }, (_, i) => {
      const p = i / (WAVE_COUNT - 1)           // 0 → 1
      const midBulge = Math.sin(Math.PI * p)   // 0 at edges, 1 at center
      return {
        progress: p,
        midBulge,
        freq1:  0.0055 + i * 0.00035,
        freq2:  0.0090 + i * 0.00055,
        phase1: i * 0.95,
        phase2: i * 1.40 + 1.1,
        // amplitude: largest in the vertical center
        amp: 14 + midBulge * 44,
        // opacity: center waves slightly more visible
        opacityBase: 0.05,
        opacityMid:  midBulge * 0.07,
      }
    })

    const draw = () => {
      const t  = (performance.now() - startTime) * SPEED
      const w  = canvas.width
      const h  = canvas.height
      const dark = isDarkRef.current

      ctx.clearRect(0, 0, w, h)

      // ─ Background ────────────────────────────────────────────────────
      const grad = ctx.createLinearGradient(0, 0, w, h)
      if (dark) {
        grad.addColorStop(0,    '#111213')
        grad.addColorStop(0.5,  '#17181a')
        grad.addColorStop(1,    '#111213')
      } else {
        grad.addColorStop(0,    '#e2e4e7')
        grad.addColorStop(0.45, '#eaecef')
        grad.addColorStop(1,    '#e0e3e6')
      }
      ctx.fillStyle = grad
      ctx.fillRect(0, 0, w, h)

      // ─ Wave lines ────────────────────────────────────────────────────
      ctx.lineWidth = 1

      for (const wv of waves) {
        const yBase  = wv.progress * h
        const opacity = wv.opacityBase + wv.opacityMid

        ctx.strokeStyle = dark
          ? `rgba(148, 163, 184, ${opacity})`   // slate-400
          : `rgba(71,  85, 105,  ${opacity})`   // slate-600

        ctx.beginPath()
        const STEP = 4
        for (let x = 0; x <= w; x += STEP) {
          const dy =
            wv.amp * 0.62 * Math.sin(wv.freq1 * x + t          + wv.phase1) +
            wv.amp * 0.38 * Math.sin(wv.freq2 * x + t * 1.35   + wv.phase2)
          const y = yBase + dy
          x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y)
        }
        ctx.stroke()
      }

      // ─ Vignette ──────────────────────────────────────────────────────
      const vg = ctx.createRadialGradient(w / 2, h / 2, h * 0.15, w / 2, h / 2, h * 0.85)
      if (dark) {
        vg.addColorStop(0,   'rgba(0,0,0,0)')
        vg.addColorStop(1,   'rgba(0,0,0,0.35)')
      } else {
        vg.addColorStop(0,   'rgba(255,255,255,0)')
        vg.addColorStop(1,   'rgba(200,205,215,0.30)')
      }
      ctx.fillStyle = vg
      ctx.fillRect(0, 0, w, h)

      rafId = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none"
      style={{ position: 'fixed', inset: 0, zIndex: 0, display: 'block' }}
      aria-hidden="true"
    />
  )
}
