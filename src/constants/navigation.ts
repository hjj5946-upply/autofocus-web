import type { SectionId } from '../types'

export interface NavigatorSection {
  id: SectionId
  labelKey: string
}

export const SECTION_IDS: SectionId[] = [
  'home',
  'problem',
  'platform',
  'architecture',
  'technology',
  'case-studies',
  'company',
]

export const NAVIGATOR_SECTIONS: NavigatorSection[] = [
  { id: 'home',         labelKey: 'nav.home' },
  { id: 'problem',      labelKey: 'nav.problem' },
  { id: 'platform',     labelKey: 'nav.platform' },
  { id: 'architecture', labelKey: 'nav.architecture' },
  { id: 'technology',   labelKey: 'nav.technology' },
  { id: 'case-studies', labelKey: 'nav.caseStudies' },
  { id: 'company',      labelKey: 'nav.company' },
]
