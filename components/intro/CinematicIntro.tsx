'use client'
import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { PERSON } from '@/lib/constants/content'

const lines = [
  { text: 'Some dates are just dates.', delay: 0.5 },
  { text: 'Some dates become memories.', delay: 2.2 },
  { text: 'Some people make a date unforgettable.', delay: 4.2 },
]

export default function CinematicIntro({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = useState<'lines' | 'date' | 'name' | 'wish' | 'done'>('lines')
  const [lineIndex, setLineIndex] = useState(0)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    // Sequence timers
    const t1 = setTimeout(() => setLineIndex(1), 2200)
    const t2 = setTimeout(() => setLineIndex(2), 4200)
    const t3 = setTimeout(() => setPhase('date'), 6800)
    const t4 = setTimeout(() => setPhase('name'), 8600)
    const t5 = setTimeout(() => setPhase('wish'), 10200)
    const t6 = setTimeout(() => {
      setVisible(false)
      setTimeout(onComplete, 900)
    }, 12500)
    return () => [t1,t2,t3,t4,t5,t6].forEach(clearTimeout)
  }, [onComplete])

  const easing = [0.16, 1, 0.3, 1] as const

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.9, ease: easing }}
          style={{
            position: 'fixed', inset: 0, zIndex: 9900,
            background: 'radial-gradient(ellipse 60% 70% at 50% 50%, var(--bg-wine) 0%, var(--bg-base) 100%)',
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center',
            overflow: 'hidden',
          }}
        >
          {/* Particle dots */}
          <ParticleField />

          {/* Ambient glow center */}
          <motion.div
            animate={{ opacity: [0.03, 0.08, 0.03], scale: [1, 1.15, 1] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            style={{
              position: 'absolute',
              width: '500px', height: '500px', borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(255,77,125,0.12) 0%, transparent 70%)',
              pointerEvents: 'none',
            }}
          />

          <div style={{ position: 'relative', textAlign: 'center', padding: '0 2rem', maxWidth: '640px' }}>

            {/* Phase: Lines */}
            <AnimatePresence mode="wait">
              {phase === 'lines' && (
                <motion.div key="lines" exit={{ opacity: 0, filter: 'blur(8px)' }} transition={{ duration: 0.6 }}>
                  {lines.slice(0, lineIndex + 1).map((line, i) => (
                    <motion.p
                      key={i}
                      initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
                      animate={{ opacity: i === lineIndex ? 1 : 0.35, y: 0, filter: 'blur(0px)' }}
                      transition={{ duration: 1, ease: easing }}
                      className="font-display"
                      style={{
                        fontSize: 'clamp(1.125rem, 3vw, 1.625rem)',
                        fontWeight: 300, fontStyle: 'italic',
                        color: 'var(--text-secondary)',
                        lineHeight: 1.5,
                        marginBottom: i < lineIndex ? '0.5rem' : 0,
                      }}
                    >
                      {line.text}
                    </motion.p>
                  ))}
                </motion.div>
              )}

              {/* Phase: Date */}
              {phase === 'date' && (
                <motion.div
                  key="date"
                  initial={{ opacity: 0, scale: 0.92, filter: 'blur(20px)' }}
                  animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, scale: 1.05 }}
                  transition={{ duration: 1.2, ease: easing }}
                >
                  <p className="text-label" style={{ marginBottom: '0.75rem', opacity: 0.4 }}>The date</p>
                  <h2 className="font-display gradient-text-soft"
                    style={{ fontSize: 'clamp(3rem, 10vw, 8rem)', fontWeight: 300, letterSpacing: '-0.02em', lineHeight: 1 }}>
                    01
                  </h2>
                  <h2 className="font-display"
                    style={{ fontSize: 'clamp(1rem, 3vw, 2rem)', fontWeight: 300, color: 'var(--text-muted)', letterSpacing: '0.3em' }}>
                    SEPTEMBER
                  </h2>
                </motion.div>
              )}

              {/* Phase: Name */}
              {phase === 'name' && (
                <motion.div
                  key="name"
                  initial={{ opacity: 0, y: 30, filter: 'blur(12px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1, ease: easing }}
                >
                  <h1
                    className="font-display gradient-text"
                    style={{
                      fontSize: 'clamp(4rem, 15vw, 14rem)',
                      fontWeight: 300, letterSpacing: '-0.02em', lineHeight: 0.9,
                    }}
                  >
                    {PERSON.name}
                  </h1>
                </motion.div>
              )}

              {/* Phase: Wish */}
              {phase === 'wish' && (
                <motion.div
                  key="wish"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.9, ease: easing }}
                >
                  <h2
                    className="font-display"
                    style={{
                      fontSize: 'clamp(1.5rem, 4vw, 3rem)',
                      fontWeight: 300, fontStyle: 'italic',
                      color: 'var(--text-primary)', letterSpacing: '0.01em',
                    }}
                  >
                    Happy Birthday, My Love.
                  </h2>
                  <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 0.4, duration: 0.8, ease: easing }}
                    style={{
                      height: '1px', marginTop: '1.5rem',
                      background: 'linear-gradient(90deg, transparent, var(--accent-rose), transparent)',
                    }}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function ParticleField() {
  const particles = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 2 + 0.5,
    delay: Math.random() * 4,
    duration: Math.random() * 4 + 4,
  }))

  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
      {particles.map(p => (
        <motion.div
          key={p.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.6, 0], y: [0, -40] }}
          transition={{ delay: p.delay, duration: p.duration, repeat: Infinity, ease: 'easeOut' }}
          style={{
            position: 'absolute',
            left: `${p.x}%`, top: `${p.y}%`,
            width: `${p.size}px`, height: `${p.size}px`,
            borderRadius: '50%',
            background: 'var(--accent-rose)',
          }}
        />
      ))}
    </div>
  )
}
