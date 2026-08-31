'use client'
import { createContext, useContext, useEffect, useState } from 'react'

type Theme = 'system' | 'dark' | 'light'

interface ThemeContextType {
  theme: Theme
  resolvedTheme: 'dark' | 'light'
  setTheme: (t: Theme) => void
}

const ThemeContext = createContext<ThemeContextType>({
  theme: 'system',
  resolvedTheme: 'dark',
  setTheme: () => {},
})

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>('system')
  const [resolvedTheme, setResolvedTheme] = useState<'dark' | 'light'>('dark')

  useEffect(() => {
    const saved = localStorage.getItem('unnati-theme') as Theme | null
    if (saved && (saved === 'system' || saved === 'dark' || saved === 'light')) {
      setThemeState(saved)
    }

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    
    const applyTheme = (currentTheme: Theme) => {
      let isDark = mediaQuery.matches
      if (currentTheme === 'dark') isDark = true
      if (currentTheme === 'light') isDark = false

      const resolved = isDark ? 'dark' : 'light'
      setResolvedTheme(resolved)
      document.documentElement.setAttribute('data-theme', resolved)
    }

    applyTheme(saved || 'system')

    const handleChange = () => {
      const current = (localStorage.getItem('unnati-theme') as Theme) || 'system'
      if (current === 'system') {
        applyTheme('system')
      }
    }

    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme)
    localStorage.setItem('unnati-theme', newTheme)

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    let isDark = mediaQuery.matches
    if (newTheme === 'dark') isDark = true
    if (newTheme === 'light') isDark = false

    const resolved = isDark ? 'dark' : 'light'
    setResolvedTheme(resolved)
    document.documentElement.setAttribute('data-theme', resolved)
  }

  return (
    <ThemeContext.Provider value={{ theme, resolvedTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  return useContext(ThemeContext)
}
