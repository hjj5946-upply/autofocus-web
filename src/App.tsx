import { useEffect, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { Routes, Route } from 'react-router-dom'
import { ScrollToTop } from './components/ScrollToTop'
import { useTheme } from './hooks/useTheme'
import './i18n'

import { AnimatedBackground } from './components/background/AnimatedBackground'
import { Header } from './components/organisms/Header'
import { HeroSection } from './components/organisms/HeroSection'
import { ProblemSection } from './components/organisms/ProblemSection'
import { PlatformSection } from './components/organisms/PlatformSection'
import { ArchitectureSection } from './components/organisms/ArchitectureSection'
import { TechnologySection } from './components/organisms/TechnologySection'
import { ReferencesSection } from './components/organisms/ReferencesSection'
import { CaseStudiesSection } from './components/organisms/CaseStudiesSection'
import { CompanySection } from './components/organisms/CompanySection'
import { SectionNavigator } from './components/organisms/SectionNavigator'
import { Footer } from './components/organisms/Footer'
import { ContactPage } from './pages/ContactPage'
import { SolutionsPage } from './pages/SolutionsPage'
import { SolutionDetailPage } from './pages/SolutionDetailPage'
import { ArchitecturePage } from './pages/ArchitecturePage'
import { TechnologyPage } from './pages/TechnologyPage'
import { CasesPage } from './pages/CasesPage'
import { CaseDetailPage } from './pages/CaseDetailPage'
import { CompanyPage } from './pages/CompanyPage'

import type { SectionId } from './types'

function MainPage() {
  const scrollTo = useCallback((sectionId: SectionId) => {
    const el = document.getElementById(sectionId)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }, [])

  return (
    <>
      {/* Layer 1: fixed animated background */}
      <AnimatedBackground />

      {/* Layer 2: content — DOM order (after canvas) keeps it above the fixed canvas */}
      <div className="relative min-h-screen">
        <Header />
        <SectionNavigator />
        <main>
          <HeroSection onScrollTo={scrollTo} />
          <ProblemSection />
          <PlatformSection />
          <ArchitectureSection />
          <TechnologySection />
          <ReferencesSection />
          <CaseStudiesSection />
          <CompanySection />
        </main>
        <Footer onScrollTo={scrollTo} />
      </div>
    </>
  )
}

function App() {
  const { language } = useTheme()
  const { i18n } = useTranslation()

  useEffect(() => {
    i18n.changeLanguage(language)
  }, [language, i18n])

  return (
    <>
      <ScrollToTop />
      <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/solutions" element={<SolutionsPage />} />
      <Route path="/solutions/:slug" element={<SolutionDetailPage />} />
      <Route path="/architecture" element={<ArchitecturePage />} />
      <Route path="/technology" element={<TechnologyPage />} />
      <Route path="/cases" element={<CasesPage />} />
      <Route path="/cases/:slug" element={<CaseDetailPage />} />
      <Route path="/company" element={<CompanyPage />} />
    </Routes>
    </>
  )
}

export default App
