import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useTheme } from '../../hooks/useTheme'

gsap.registerPlugin(ScrollTrigger)

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  baseVx: number
  baseVy: number
  r: number
}

const N = 70
const MAX_D = 170
const SPEED = 0.25

function createParticles(w: number, h: number): Particle[] {
  return Array.from({ length: N }, () => {
    const vx = (Math.random() - 0.5) * SPEED
    const vy = (Math.random() - 0.5) * SPEED
    return {
      x: Math.random() * w,
      y: Math.random() * h,
      vx, vy,
      baseVx: vx,
      baseVy: vy,
      r: Math.random() * 1.8 + 0.8,
    }
  })
}

export function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { isDark } = useTheme()
  const isDarkRef = useRef(isDark)
  const scrollVelRef = useRef(0)

  // Keep isDarkRef in sync so animation loop always reads current theme
  useEffect(() => {
    isDarkRef.current = isDark
  }, [isDark])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')!

    let rafId: number
    let particles: Particle[] = []

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      particles = createParticles(canvas.width, canvas.height)
    }
    resize()
    window.addEventListener('resize', resize)

    // GSAP ScrollTrigger: capture scroll velocity to subtly shift drift direction
    const st = ScrollTrigger.create({
      start: 0,
      end: 'max',
      onUpdate: (self) => {
        scrollVelRef.current = self.getVelocity() / 5000
      },
    })

    const draw = () => {
      const w = canvas.width
      const h = canvas.height
      const dark = isDarkRef.current
      const sv = scrollVelRef.current

      ctx.clearRect(0, 0, w, h)

      // — Background gradient ———————————————————————————
      const grad = ctx.createLinearGradient(0, 0, w, h)
      if (dark) {
        grad.addColorStop(0,   '#07101f')
        grad.addColorStop(0.5, '#0f1a2e')
        grad.addColorStop(1,   '#09111f')
      } else {
        grad.addColorStop(0,   '#c8dff5')
        grad.addColorStop(0.5, '#d8ebf9')
        grad.addColorStop(1,   '#cce2f6')
      }
      ctx.fillStyle = grad
      ctx.fillRect(0, 0, w, h)

      // — Update particles ——————————————————————————————
      for (const p of particles) {
        // Smoothly blend toward base velocity + scroll influence
        const targetVx = p.baseVx + sv * 0.4
        const targetVy = p.baseVy
        p.vx += (targetVx - p.vx) * 0.04
        p.vy += (targetVy - p.vy) * 0.04

        p.x += p.vx
        p.y += p.vy

        if (p.x < 0 || p.x > w) { p.vx *= -1; p.baseVx *= -1 }
        if (p.y < 0 || p.y > h) { p.vy *= -1; p.baseVy *= -1 }
        p.x = Math.max(0, Math.min(w, p.x))
        p.y = Math.max(0, Math.min(h, p.y))
      }

      // — Draw connections ——————————————————————————————
      ctx.lineWidth = 0.5
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const d = Math.sqrt(dx * dx + dy * dy)
          if (d < MAX_D) {
            const t = (1 - d / MAX_D)
            ctx.beginPath()
            ctx.strokeStyle = dark
              ? `rgba(100, 149, 210, ${t * 0.24})`
              : `rgba(30, 80, 160, ${t * 0.14})`
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.stroke()
          }
        }
      }

      // — Draw particles ————————————————————————————————
      for (const p of particles) {
        ctx.beginPath()
        ctx.fillStyle = dark
          ? `rgba(100, 160, 230, 0.50)`
          : `rgba(30, 80, 180, 0.35)`
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fill()
      }

      rafId = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('resize', resize)
      st.kill()
    }
  }, []) // single mount — reads isDarkRef and scrollVelRef via refs

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none"
      style={{ position: 'fixed', inset: 0, zIndex: 0, display: 'block' }}
      aria-hidden="true"
    />
  )
}
