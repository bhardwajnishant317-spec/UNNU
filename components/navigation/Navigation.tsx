'use client'
import { motion } from 'framer-motion'
import { PERSON } from '@/lib/constants/content'
import { useTheme } from '@/components/theme/ThemeProvider'
import { Sun, Moon, Laptop } from 'lucide-react'

export default function Navigation() {
  const { theme, resolvedTheme, setTheme } = useTheme()
  const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  const cycleTheme = () => {
    if (theme === 'system') setTheme('dark')
    else if (theme === 'dark') setTheme('light')
    else setTheme('system')
  }

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      aria-label="Main navigation"
      style={{
        position: 'fixed',
        top: '1.25rem',
        left: 0,
        right: 0,
        zIndex: 9980,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        pointerEvents: 'none',
        padding: '0 1rem',
      }}
    >
      <div
        style={{
          pointerEvents: 'all',
          background: 'var(--glass-bg)',
          border: '1px solid var(--glass-border)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          borderRadius: '9999px',
          padding: '0.4rem 0.6rem 0.4rem 1.25rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.85rem',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.25)',
          transition: 'all 0.4s ease',
        }}
      >
        {/* Title Button */}
        <button
          onClick={scrollTop}
          className="interactive magnetic"
          aria-label="Back to top"
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.4rem',
            padding: 0,
          }}
        >
          <span
            style={{
              fontSize: '0.7rem',
              fontWeight: 500,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'var(--text-primary)',
              transition: 'color 0.3s ease',
            }}
          >
            {PERSON.name}
          </span>
          <span style={{ color: 'var(--accent-rose)', fontSize: '0.75rem' }}>♥</span>
        </button>

        {/* Subtle separator */}
        <div style={{ width: '1px', height: '14px', background: 'var(--glass-border)' }} />

        {/* Theme Toggle Button */}
        <button
          onClick={cycleTheme}
          className="interactive magnetic"
          title={`Theme: ${theme} (Click to toggle)`}
          aria-label={`Current theme is ${theme}. Click to toggle.`}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '0.35rem',
            borderRadius: '9999px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--accent-rose)',
            transition: 'transform 0.2s ease, color 0.3s ease',
          }}
        >
          {theme === 'system' ? (
            <Laptop size={14} />
          ) : resolvedTheme === 'dark' ? (
            <Moon size={14} />
          ) : (
            <Sun size={14} />
          )}
        </button>
      </div>
    </motion.nav>
  )
}
