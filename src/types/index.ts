export type Theme = 'light' | 'dark'
export type Language = 'ko' | 'en' | 'ja'

export type SectionId =
  | 'home'
  | 'problem'
  | 'platform'
  | 'architecture'
  | 'technology'
  | 'case-studies'
  | 'company'
  | 'contact'

export interface NavItem {
  key: string
  labelKey: string
  sectionId: SectionId
}

export interface NavSubItem {
  key: string
  labelKey: string
  href: string
  descriptionKey?: string
}
