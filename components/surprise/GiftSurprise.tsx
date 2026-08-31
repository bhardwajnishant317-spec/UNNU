'use client'
import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'framer-motion'

interface GiftSurpriseProps {
  onOpen: () => void
}

export default function GiftSurprise({ onOpen }: GiftSurpriseProps) {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [opened, setOpened] = useState(false)
  const [particles, setParticles] = useState<{ id: number; x: number; y: number; color: string; size: number }[]>([])

  const handleOpen = () => {
    if (opened) return
    setOpened(true)
    onOpen()

    // Burst particles
    const burst = Array.from({ length: 40 }, (_, i) => ({
      id: i,
      x: (Math.random() - 0.5) * 400,
      y: (Math.random() - 0.5) * 300 - 100,
      color: ['#FF6F9F', '#FF9FC0', '#FFD5E2', '#FFF8FB'][Math.floor(Math.random() * 4)],
      size: Math.random() * 6 + 3,
    }))
    setParticles(burst)
    setTimeout(() => setParticles([]), 2500)
  }

  return (
    <section
      id="surprise"
      ref={ref}
      style={{
        background: 'linear-gradient(to bottom, #0B0509, #140711)',
        padding: 'clamp(6rem, 12vw, 12rem) clamp(1.5rem, 6vw, 6rem)',
        textAlign: 'center', position: 'relative', overflow: 'hidden',
      }}
    >
      <div style={{ maxWidth: '600px', margin: '0 auto', position: 'relative' }}>
        <motion.p
          initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8 }}
          className="text-label" style={{ marginBottom: '1rem' }}
        >
          One more thing
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.15, duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="font-display gradient-text-soft"
          style={{
            fontSize: 'clamp(2rem, 5vw, 4rem)', fontWeight: 300,
            fontStyle: 'italic', lineHeight: 1.1, marginBottom: '3rem',
          }}
        >
          There is one more thing for you.
        </motion.h2>

        {/* Gift Box */}
        <motion.div
          initial={{ opacity: 0, scale: 0.7 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.4, duration: 1, ease: [0.34, 1.56, 0.64, 1] }}
          style={{ display: 'inline-block', position: 'relative', cursor: opened ? 'default' : 'pointer' }}
          onClick={handleOpen}
          role="button"
          tabIndex={0}
          onKeyDown={e => e.key === 'Enter' && handleOpen()}
          aria-label="Open your surprise gift"
        >
          {/* Glow behind gift */}
          <motion.div
            animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            style={{
              position: 'absolute', inset: '-30px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(255,77,125,0.2) 0%, transparent 70%)',
              pointerEvents: 'none',
            }}
          />

          <AnimatePresence mode="wait">
            {!opened ? (
              <motion.div key="gift" exit={{ scale: 1.3, opacity: 0 }} transition={{ duration: 0.5 }}>
                <GiftBoxSVG />
              </motion.div>
            ) : (
              <motion.div
                key="open"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
              >
                <div style={{
                  width: '120px', height: '120px', display: 'flex',
                  alignItems: 'center', justifyContent: 'center',
                }}>
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                    style={{ fontSize: '4rem', lineHeight: 1 }}
                  >
                    <svg viewBox="0 0 60 60" width="80" height="80">
                      <defs>
                        <radialGradient id="hg2" cx="50%" cy="30%" r="70%">
                          <stop offset="0%" stopColor="#FF9FC0" />
                          <stop offset="100%" stopColor="#C4425A" />
                        </radialGradient>
                      </defs>
                      <path
                        d="M30 52 C30 52 3 33 3 17 C3 9 9 3 18 3 C23 3 27 5.5 30 10 C33 5.5 37 3 42 3 C51 3 57 9 57 17 C57 33 30 52 30 52Z"
                        fill="url(#hg2)" opacity="0.9"
                      />
                    </svg>
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Particle burst */}
          {particles.map(p => (
            <motion.div
              key={p.id}
              initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
              animate={{ x: p.x, y: p.y, opacity: 0, scale: 0 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              style={{
                position: 'absolute', left: '50%', top: '50%',
                width: p.size, height: p.size, borderRadius: '50%',
                background: p.color, pointerEvents: 'none',
              }}
            />
          ))}
        </motion.div>

        {!opened && (
          <motion.p
            initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.9 }}
            className="font-inter"
            style={{ marginTop: '2rem', color: 'var(--text-muted)', fontSize: '0.8rem', letterSpacing: '0.08em' }}
          >
            Tap to open ↑
          </motion.p>
        )}
      </div>
    </section>
  )
}

function GiftBoxSVG() {
  return (
    <motion.div
      animate={{ y: [0, -12, 0], rotate: [0, 2, -2, 0] }}
      transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
    >
      <svg viewBox="0 0 120 130" width="120" height="130" fill="none">
        {/* Box body */}
        <rect x="10" y="55" width="100" height="65" rx="2" fill="#1A0A12" stroke="rgba(255,111,159,0.4)" strokeWidth="1" />
        {/* Box lid */}
        <rect x="5" y="42" width="110" height="18" rx="2" fill="#220B16" stroke="rgba(255,111,159,0.5)" strokeWidth="1" />
        {/* Ribbon vertical */}
        <rect x="54" y="42" width="12" height="78" fill="rgba(255,111,159,0.3)" />
        {/* Ribbon horizontal */}
        <rect x="5" y="47" width="110" height="8" fill="rgba(255,111,159,0.3)" />
        {/* Bow left */}
        <ellipse cx="40" cy="38" rx="18" ry="9" fill="rgba(255,111,159,0.6)" transform="rotate(-20 40 38)" />
        {/* Bow right */}
        <ellipse cx="80" cy="38" rx="18" ry="9" fill="rgba(255,111,159,0.6)" transform="rotate(20 80 38)" />
        {/* Bow center */}
        <circle cx="60" cy="42" r="8" fill="var(--accent-rose)" />
        {/* Glow on bow */}
        <circle cx="60" cy="42" r="12" fill="rgba(255,111,159,0.12)" />
        {/* Stars */}
        <circle cx="30" cy="90" r="1.5" fill="rgba(255,111,159,0.3)" />
        <circle cx="85" cy="75" r="1" fill="rgba(255,111,159,0.3)" />
        <circle cx="70" cy="100" r="1.5" fill="rgba(255,111,159,0.2)" />
      </svg>
    </motion.div>
  )
}
