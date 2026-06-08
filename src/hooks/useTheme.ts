import { useEffect } from 'react'
import { useThemeStore } from '../store/useThemeStore'
import type { Theme } from '../types'

export function useTheme() {
  const { theme, language, toggleTheme, setTheme, setLanguage } = useThemeStore()

  useEffect(() => {
    const root = document.documentElement
    root.classList.toggle('dark', theme === 'dark')
  }, [theme])

  const isDark = theme === 'dark'

  return { theme, isDark, language, toggleTheme, setTheme, setLanguage }
}

export type { Theme }
