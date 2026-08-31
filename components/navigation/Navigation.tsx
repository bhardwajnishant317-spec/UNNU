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
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 9980,
        padding: '1.5rem 2.5rem',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        pointerEvents: 'none',
      }}
    >
      <button
        onClick={scrollTop}
        className="interactive magnetic"
        aria-label="Back to top"
        style={{
          pointerEvents: 'all', background: 'none', border: 'none',
          cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem',
        }}
      >
        <span
          className="font-inter"
          style={{
            fontSize: '0.6875rem', fontWeight: 400,
            letterSpacing: '0.22em', textTransform: 'uppercase',
            color: 'rgba(255,248,251,0.45)',
            transition: 'color 0.3s ease',
          }}
          onMouseEnter={e => (e.currentTarget.style.color = 'rgba(255,248,251,0.9)')}
          onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,248,251,0.45)')}
        >
          {PERSON.name} ♥
        </span>
      </button>
    </motion.nav>
  )
}
