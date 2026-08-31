'use client'
import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { PERSON } from '@/lib/constants/content'

const GATE_KEY = 'unnati-visited'
const GATE_EXPIRY_MS = 60 * 60 * 1000 // 1 hour

export default function WelcomeGate({ onEnter }: { onEnter: () => void }) {
  const [visible, setVisible] = useState(false)
  const [leaving, setLeaving] = useState(false)

  useEffect(() => {
    const raw = localStorage.getItem(GATE_KEY)
    const shouldShow = !raw || Date.now() - parseInt(raw, 10) > GATE_EXPIRY_MS
    if (shouldShow) setVisible(true)
  }, [])

  const handleEnter = () => {
    setLeaving(true)
    localStorage.setItem(GATE_KEY, Date.now().toString())
    setTimeout(() => {
      setVisible(false)
      onEnter()
    }, 900)
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          style={{
            position: 'fixed', inset: 0, zIndex: 99990,
            background: 'radial-gradient(ellipse at center, var(--bg-wine) 0%, var(--bg-base) 70%)',
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center',
            padding: '2rem',
          }}
        >
          {/* Ambient glow */}
          <div style={{
            position: 'absolute', width: '600px', height: '600px',
            borderRadius: '50%', background: 'rgba(255,77,125,0.04)',
            filter: 'blur(120px)', pointerEvents: 'none',
          }} />

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            style={{ textAlign: 'center', position: 'relative' }}
          >
            {/* Rose ornament */}
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 1, ease: [0.34, 1.56, 0.64, 1] }}
              style={{ marginBottom: '2rem' }}
            >
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none" style={{ margin: '0 auto' }}>
                <circle cx="20" cy="20" r="1.5" fill="var(--accent-rose)" />
                <circle cx="20" cy="20" r="8" stroke="rgba(255,111,159,0.25)" strokeWidth="0.5" />
                <circle cx="20" cy="20" r="16" stroke="rgba(255,111,159,0.12)" strokeWidth="0.5" />
                <line x1="20" y1="0" x2="20" y2="40" stroke="rgba(255,111,159,0.15)" strokeWidth="0.5" />
                <line x1="0" y1="20" x2="40" y2="20" stroke="rgba(255,111,159,0.15)" strokeWidth="0.5" />
              </svg>
            </motion.div>

            <p className="text-label" style={{ marginBottom: '1.5rem', opacity: 0.5 }}>
              A personal experience
            </p>

            <h1
              className="font-display gradient-text-soft"
              style={{ fontSize: 'clamp(1.5rem, 4vw, 2.25rem)', fontWeight: 300, lineHeight: 1.4, marginBottom: '0.75rem' }}
            >
              This little universe was made for one person.
            </h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9, duration: 1 }}
              className="font-display"
              style={{
                fontSize: 'clamp(1.25rem, 3vw, 1.75rem)', fontWeight: 300,
                fontStyle: 'italic', color: 'var(--accent-blush)',
                marginBottom: '3.5rem',
              }}
            >
              And that person is you, {PERSON.name}.
            </motion.p>

            <motion.button
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4, duration: 0.8 }}
              onClick={handleEnter}
              className="btn-primary magnetic"
              style={{ fontSize: '0.75rem', letterSpacing: '0.2em' }}
            >
              Enter
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
