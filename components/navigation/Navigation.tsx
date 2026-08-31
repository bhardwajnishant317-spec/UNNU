'use client'
import { motion } from 'framer-motion'
import { PERSON } from '@/lib/constants/content'

export default function Navigation() {
  const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

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
      }}
    >
      <button
        onClick={scrollTop}
        className="interactive magnetic"
        aria-label="Back to top"
        style={{
          pointerEvents: 'all',
          background: 'rgba(18, 8, 16, 0.75)',
          border: '1px solid rgba(255, 111, 159, 0.25)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          borderRadius: '9999px',
          padding: '0.5rem 1.25rem',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.5)',
          transition: 'border-color 0.3s ease, transform 0.3s ease, background 0.3s ease',
        }}
      >
        <span
          style={{
            fontSize: '0.6875rem',
            fontWeight: 500,
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: 'var(--accent-champagne)',
          }}
        >
          {PERSON.name}
        </span>
        <span style={{ color: 'var(--accent-rose)', fontSize: '0.75rem' }}>♥</span>
      </button>
    </motion.nav>
  )
}
