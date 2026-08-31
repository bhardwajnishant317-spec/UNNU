'use client'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { PERSON, loveLetterParagraphs } from '@/lib/constants/content'

export default function LoveLetter() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section
      id="letter"
      ref={ref}
      style={{
        background: 'var(--section-gradient-1)',
        padding: 'clamp(6rem, 12vw, 12rem) clamp(1.5rem, 6vw, 6rem)',
        position: 'relative', overflow: 'hidden',
      }}
    >
      {/* Side glow */}
      <motion.div
        animate={{ opacity: [0.05, 0.12, 0.05] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          position: 'absolute', right: '-200px', top: '50%',
          width: '500px', height: '500px', borderRadius: '50%',
          background: 'radial-gradient(circle, var(--spotlight-glow) 0%, transparent 70%)',
          transform: 'translateY(-50%)', pointerEvents: 'none',
        }}
      />

      <div style={{ maxWidth: '760px', margin: '0 auto', position: 'relative' }}>

        {/* Label */}
        <motion.p
          initial={{ opacity: 0, x: -20 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-label"
          style={{ marginBottom: '1.5rem' }}
        >
          A letter
        </motion.p>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
          animate={inView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
          transition={{ delay: 0.15, duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="font-display gradient-text-soft"
          style={{
            fontSize: 'clamp(2.5rem, 6vw, 5.5rem)', fontWeight: 500,
            fontStyle: 'italic', lineHeight: 1.1, marginBottom: '3.5rem',
          }}
        >
          For You, {PERSON.name}.
        </motion.h2>

        {/* Divider line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{ delay: 0.3, duration: 1, ease: [0.16, 1, 0.3, 1] }}
          style={{
            height: '2px', transformOrigin: 'left',
            background: 'linear-gradient(90deg, var(--accent-rose), transparent)',
            marginBottom: '3.5rem',
          }}
        />

        {/* Letter paragraphs */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {loveLetterParagraphs.map((para, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4 + i * 0.15, duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="font-display"
              style={{
                fontSize: 'clamp(1.05rem, 2.2vw, 1.35rem)',
                fontWeight: i === 0 ? 600 : 400,
                fontStyle: i === 0 ? 'italic' : 'normal',
                color: 'var(--text-primary)',
                lineHeight: 1.95,
              }}
            >
              {para}
            </motion.p>
          ))}
        </div>

        {/* Signature */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.4, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          style={{ marginTop: '4rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}
        >
          <div className="divider-rose" />
          <p className="font-display" style={{ fontStyle: 'italic', color: 'var(--text-secondary)', marginTop: '1.25rem', fontSize: '1.05rem', fontWeight: 500 }}>
            With everything,
          </p>
          <p className="font-display gradient-text" style={{ fontSize: '1.75rem', fontWeight: 600, fontStyle: 'italic' }}>
            Nishant (Nishu) ♥
          </p>
        </motion.div>
      </div>
    </section>
  )
}
