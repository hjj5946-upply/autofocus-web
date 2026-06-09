import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { Container } from '../atoms/Container'
import { NAVIGATOR_SECTIONS } from '../../constants/navigation'
import type { SectionId } from '../../types'
import afMainLogo from '../../assets/af_mainLogo.png'

interface FooterProps {
  onScrollTo?: (id: SectionId) => void
}

export function Footer({ onScrollTo }: FooterProps) {
  const { t } = useTranslation()
  const navigate = useNavigate()

  const scrollTo = (id: SectionId) => {
    if (onScrollTo) {
      onScrollTo(id)
    } else {
      const el = document.getElementById(id)
      if (el) el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <footer className="bg-brand-primary dark:bg-ide-deep" style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
      <Container>
        <div className="py-12 flex flex-col md:flex-row items-start justify-between gap-10">

          {/* Brand */}
          <div>
            <button
              onClick={() => scrollTo('home')}
              className="flex items-center gap-2.5 mb-4 cursor-pointer"
            >
              <img
                src={afMainLogo}
                alt="AutoFocus"
                className="h-8 w-auto brightness-0 invert"
              />
            </button>
            <p className="text-xs font-mono text-white/30 tracking-[0.2em] uppercase mb-1.5">
              {t('footer.tagline')}
            </p>
            <p className="text-xs text-white/25">{t('footer.address')}</p>
          </div>

          {/* Nav links */}
          <div className="flex flex-col gap-y-2.5">
            {NAVIGATOR_SECTIONS.slice(1).map(({ id, labelKey }) => (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                className="text-sm text-white/40 hover:text-white/75 transition-colors text-left cursor-pointer"
              >
                {t(labelKey)}
              </button>
            ))}
          </div>

          {/* Contact */}
          <div>
            <button
              onClick={() => navigate('/contact')}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded border border-white/15 text-white/60 text-sm hover:text-white hover:border-white/30 transition-colors cursor-pointer"
            >
              {t('common.contactUs')}
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </button>
          </div>
        </div>

        <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }} className="py-6">
          <p className="text-xs text-white/20 text-center">{t('footer.copyright')}</p>
        </div>
      </Container>
    </footer>
  )
}
