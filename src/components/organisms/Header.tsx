import { useState, useEffect, useRef } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useTheme } from '../../hooks/useTheme'
import afMainLogo from '../../assets/af_mainLogo.png'

const LANGS = [
  { code: 'ko', label: 'KR' },
  { code: 'en', label: 'EN' },
  { code: 'ja', label: 'JP' },
] as const

export function Header() {
  const { isDark, toggleTheme, language, setLanguage } = useTheme()
  const navigate = useNavigate()
  const location = useLocation()
  const [scrolled, setScrolled] = useState(false)
  const [langOpen, setLangOpen] = useState(false)
  const langRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setLangOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const handleLogoClick = () => {
    if (location.pathname === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } else {
      navigate('/')
    }
  }
  const currentLabel = LANGS.find(l => l.code === language)?.label ?? 'KR'

  const iconColor = scrolled
    ? 'text-slate-500 dark:text-ide-muted'
    : 'text-slate-600 dark:text-white/60'

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
        ? 'bg-white/80 dark:bg-ide-bg/80 backdrop-blur-md'
        : 'bg-transparent'
        }`}
    >
      <div className="max-w-[1280px] mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <button
            onClick={handleLogoClick}
            className="flex items-center gap-2 cursor-pointer group"
          >
            <img
              src={afMainLogo}
              alt="AutoFocus"
              className="h-8 w-auto object-contain transition-all duration-200 dark:brightness-0 dark:invert"
            />
          </button>

          {/* Right controls */}
          <div className="flex items-center gap-5">

            {/* Language selector — text only, no globe */}
            <div ref={langRef} className="relative">
              <button
                onClick={() => setLangOpen(prev => !prev)}
                className={`flex items-center gap-1 text-sm font-bold tracking-[0.1em] transition-colors duration-200 hover:text-brand-accent cursor-pointer ${iconColor}`}
              >
                {currentLabel}
                <svg
                  width="9" height="9" viewBox="0 0 9 9" fill="none"
                  className={`transition-transform duration-150 ${langOpen ? 'rotate-180' : ''}`}
                >
                  <path d="M1.5 3L4.5 6L7.5 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>

              {/* Dropdown */}
              {langOpen && (
                <div
                  className="absolute top-full right-0 mt-2 rounded-xl overflow-hidden shadow-xl"
                  style={{
                    backgroundColor: isDark ? 'rgba(26,29,46,0.97)' : 'rgba(255,255,255,0.97)',
                    backdropFilter: 'blur(12px)',
                    minWidth: '64px',
                    zIndex: 100,
                  }}
                >
                  {LANGS.filter(l => l.code !== language).map(({ code, label }) => (
                    <button
                      key={code}
                      onClick={() => { setLanguage(code); setLangOpen(false) }}
                      className="w-full px-4 py-2.5 text-sm font-bold tracking-[0.1em] text-center text-slate-600 dark:text-ide-muted hover:text-brand-accent dark:hover:text-brand-accent transition-colors duration-150 cursor-pointer block"
                    >
                      {label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Theme toggle — icon only, hover = color change */}
            <button
              onClick={toggleTheme}
              className={`transition-colors duration-200 hover:text-brand-accent cursor-pointer ${iconColor}`}
              aria-label="Toggle theme"
            >
              {isDark ? (
                /* Sun */
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <circle cx="12" cy="12" r="5" />
                  <line x1="12" y1="1" x2="12" y2="3" />
                  <line x1="12" y1="21" x2="12" y2="23" />
                  <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                  <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                  <line x1="1" y1="12" x2="3" y2="12" />
                  <line x1="21" y1="12" x2="23" y2="12" />
                  <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                  <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                </svg>
              ) : (
                /* Moon */
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                </svg>
              )}
            </button>

          </div>
        </div>
      </div>
    </header>
  )
}
