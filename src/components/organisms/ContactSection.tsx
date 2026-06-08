import { useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SectionTag } from '../atoms/SectionTag'
import { Button } from '../atoms/Button'
import { Container } from '../atoms/Container'

gsap.registerPlugin(ScrollTrigger)

export function ContactSection() {
  const { t } = useTranslation()
  const sectionRef = useRef<HTMLElement>(null)
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')
  const [form, setForm] = useState({ name: '', email: '', company: '', message: '' })

  useGSAP(() => {
    gsap.fromTo(
      '.contact-inner',
      { opacity: 0, y: 30 },
      {
        opacity: 1, y: 0, duration: 0.7,
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', once: true },
      }
    )
  }, { scope: sectionRef })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('sending')
    // EmailJS integration placeholder — configure with actual service/template IDs
    setTimeout(() => setStatus('success'), 1500)
  }

  const fieldClass =
    'w-full px-4 py-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/60 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-accent/50 focus:border-brand-accent transition-colors text-sm'

  return (
    <section id="contact" ref={sectionRef} className="scroll-mt-16 py-24 bg-slate-950">
      <Container>
        <div className="contact-inner max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <SectionTag variant="dark" className="justify-center mb-5">
              {t('contact.tag')}
            </SectionTag>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              {t('contact.title')}
            </h2>
            <p className="text-slate-400">
              {t('contact.subtitle')}
            </p>
          </div>

          {status === 'success' ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mx-auto mb-4">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <p className="text-emerald-400 font-medium">{t('contact.success')}</p>
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
                rows={5}
                placeholder={t('contact.message')}
                value={form.message}
                onChange={handleChange}
                required
                className={`${fieldClass} resize-none`}
              />
              {status === 'error' && (
                <p className="text-red-400 text-sm">{t('contact.error')}</p>
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
    </section>
  )
}
