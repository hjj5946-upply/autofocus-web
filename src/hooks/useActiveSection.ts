import { useState, useEffect } from 'react'
import type { SectionId } from '../types'

export function useActiveSection(sectionIds: SectionId[]): SectionId {
  const [active, setActive] = useState<SectionId>(sectionIds[0])

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.innerHeight * 0.35

      for (const id of [...sectionIds].reverse()) {
        const el = document.getElementById(id)
        if (el && el.getBoundingClientRect().top <= offset) {
          setActive(id)
          return
        }
      }

      setActive(sectionIds[0])
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [sectionIds])

  return active
}
