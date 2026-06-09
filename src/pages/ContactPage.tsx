import { useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { AnimatedBackground } from '../components/background/AnimatedBackground'
import { Header } from '../components/organisms/Header'
import { Footer } from '../components/organisms/Footer'
import { Container } from '../components/atoms/Container'
import { Button } from '../components/atoms/Button'
import { SectionTag } from '../components/atoms/SectionTag'

export function ContactPage() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const contentRef = useRef<HTMLDivElement>(null)
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')
  const [form, setForm] = useState({ name: '', email: '', company: '', message: '' })

  useGSAP(() => {
    gsap.fromTo(
      '.contact-inner',
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }
    )
  }, { scope: contentRef })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('sending')
    setTimeout(() => setStatus('success'), 1500)
  }

  const fieldClass =
    'w-full px-4 py-3 rounded-lg border border-slate-200 dark:border-white/10 bg-white dark:bg-ide-card text-slate-900 dark:text-ide-text placeholder-slate-400 dark:placeholder-ide-muted focus:outline-none focus:ring-2 focus:ring-brand-accent/40 focus:border-brand-accent transition-colors text-sm'

  return (
    <>
      <AnimatedBackground />
      <Header />
      <div className="relative min-h-screen bg-white/78 backdrop-blur-[2px] dark:bg-ide-bg/82 dark:backdrop-blur-[2px]" style={{ zIndex: 1 }}>

      <main ref={contentRef} className="pt-24 pb-16 sm:pb-24">
        <Container>
          <div className="contact-inner max-w-2xl mx-auto">

            {/* Back */}
            <button
              onClick={() => navigate('/')}
              className="flex items-center gap-1.5 text-sm text-slate-400 dark:text-ide-muted hover:text-slate-700 dark:hover:text-ide-text mb-10 transition-colors cursor-pointer"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="19" y1="12" x2="5" y2="12" />
                <polyline points="12 19 5 12 12 5" />
              </svg>
              {t('common.back')}
            </button>

            <div className="mb-12">
              <SectionTag className="mb-5">
                {t('contact.tag')}
              </SectionTag>
              <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
                {t('contact.title')}
              </h1>
              <p className="text-slate-500 dark:text-ide-muted leading-relaxed">
                {t('contact.subtitle')}
              </p>
            </div>

            {status === 'success' ? (
              <div className="text-center py-16">
                <div className="w-16 h-16 rounded-full bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 flex items-center justify-center mx-auto mb-5">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <p className="text-emerald-600 dark:text-emerald-400 font-medium mb-6">
                  {t('contact.success')}
                </p>
                <button
                  onClick={() => navigate('/')}
                  className="text-sm text-slate-500 dark:text-ide-muted hover:text-slate-800 dark:hover:text-ide-text transition-colors cursor-pointer"
                >
                  ← {t('common.backToHome')}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    name="name"
                    type="text"
                    placeholder={t('contact.name')}
                    value={form.name}
                    onChange={handleChange}
                    required
                    className={fieldClass}
                  />
                  <input
                    name="email"
                    type="email"
                    placeholder={t('contact.email')}
                    value={form.email}
                    onChange={handleChange}
                    required
                    className={fieldClass}
                  />
                </div>
                <input
                  name="company"
                  type="text"
                  placeholder={t('contact.company')}
                  value={form.company}
                  onChange={handleChange}
                  className={fieldClass}
                />
                <textarea
                  name="message"
                  rows={6}
                  placeholder={t('contact.message')}
                  value={form.message}
                  onChange={handleChange}
                  required
                  className={`${fieldClass} resize-none`}
                />
                {status === 'error' && (
                  <p className="text-red-500 dark:text-red-400 text-sm">{t('contact.error')}</p>
                )}
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  disabled={status === 'sending'}
                  className="w-full justify-center"
                >
                  {status === 'sending' ? t('common.loading') : t('contact.send')}
                </Button>
              </form>
            )}
          </div>
        </Container>
      </main>

      <Footer />
    </div>
    </>
  )
}
