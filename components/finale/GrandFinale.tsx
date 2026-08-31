'use client'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { PERSON } from '@/lib/constants/content'

export default function GrandFinale() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i, x: Math.random() * 100, y: Math.random() * 100,
    size: Math.random() * 2 + 0.5, delay: Math.random() * 5, dur: Math.random() * 8 + 6,
  }))

  return (
    <section
      id="finale"
      ref={ref}
      style={{
        minHeight: '100vh', position: 'relative', overflow: 'hidden',
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        background: 'var(--hero-gradient)',
        padding: 'clamp(4rem, 8vw, 8rem) clamp(1.5rem, 6vw, 6rem)',
        textAlign: 'center',
      }}
    >
      {/* Soft particles */}
      {particles.map(p => (
        <motion.div
          key={p.id}
          animate={{ opacity: [0, 0.4, 0], y: [0, -60] }}
          transition={{ delay: p.delay, duration: p.dur, repeat: Infinity, ease: 'easeOut' }}
          style={{
            position: 'absolute', left: `${p.x}%`, top: `${p.y}%`,
            width: `${p.size}px`, height: `${p.size}px`, borderRadius: '50%',
            background: 'var(--accent-rose)', pointerEvents: 'none',
          }}
        />
      ))}

      {/* Large ambient glow */}
      <motion.div
        animate={{ opacity: [0.08, 0.18, 0.08], scale: [1, 1.15, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(ellipse 60% 60% at 50% 50%, var(--spotlight-glow) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      <div style={{ position: 'relative', zIndex: 1 }}>
        <motion.p
          initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8 }}
          className="text-label" style={{ marginBottom: '2rem' }}
        >
          {PERSON.birthdayShort}
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 50, filter: 'blur(20px)' }}
          animate={inView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
          transition={{ delay: 0.2, duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
          className="font-display"
          style={{
            fontSize: 'clamp(3rem, 10vw, 10rem)', fontWeight: 300,
            letterSpacing: '-0.02em', lineHeight: 0.9,
            color: 'var(--text-primary)', marginBottom: '0.1em',
          }}
        >
          Happy Birthday
        </motion.h2>

        <motion.h1
          initial={{ opacity: 0, y: 60, filter: 'blur(24px)' }}
          animate={inView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
          transition={{ delay: 0.5, duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
          className="font-display gradient-text"
          style={{
            fontSize: 'clamp(4rem, 20vw, 20rem)', fontWeight: 300,
            letterSpacing: '-0.03em', lineHeight: 0.82,
            marginBottom: '3rem',
          }}
        >
          {PERSON.name}
        </motion.h1>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{ delay: 0.9, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          style={{
            height: '1px', marginBottom: '2.5rem',
            background: 'linear-gradient(90deg, transparent, var(--accent-rose), transparent)',
            transformOrigin: 'center',
          }}
        />

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.1, duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="font-display"
          style={{
            fontSize: 'clamp(1rem, 2.5vw, 1.625rem)', fontWeight: 300,
            fontStyle: 'italic', color: 'var(--text-secondary)',
            maxWidth: '620px', margin: '0 auto 4rem', lineHeight: 1.65,
          }}
        >
          "The world became a little more beautiful the day you were born."
        </motion.p>

        {/* Glowing heart */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 1.4, duration: 1, ease: [0.34, 1.56, 0.64, 1] }}
          style={{ marginBottom: '4rem' }}
        >
          <motion.div
            animate={{ scale: [1, 1.08, 1] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          >
            <svg viewBox="0 0 40 36" width="40" height="36" style={{ margin: '0 auto', display: 'block' }}>
              <defs>
                <radialGradient id="hf" cx="50%" cy="30%" r="70%">
                  <stop offset="0%" stopColor="#FF9FC0" />
                  <stop offset="100%" stopColor="#C4425A" />
                </radialGradient>
                <filter id="hglow">
                  <feGaussianBlur stdDeviation="2" result="blur" />
                  <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
                </filter>
              </defs>
              <path
                d="M20 34 C20 34 2 22 2 11 C2 5.5 6.5 2 12 2 C15.5 2 18 3.8 20 6.5 C22 3.8 24.5 2 28 2 C33.5 2 38 5.5 38 11 C38 22 20 34 20 34Z"
                fill="url(#hf)" filter="url(#hglow)"
              />
            </svg>
          </motion.div>
        </motion.div>

        {/* Footer */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 1.7, duration: 0.8 }}
          className="text-label"
          style={{ opacity: 0.3, fontSize: '0.6rem' }}
        >
          Made with love by Nishu, just for you.
        </motion.p>
      </div>
    </section>
  )
}
