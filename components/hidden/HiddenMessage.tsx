'use client'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { hiddenMessageParagraphs, PERSON } from '@/lib/constants/content'

export default function HiddenMessage() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <motion.section
      id="hidden"
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      style={{
        background: 'var(--section-gradient-2)',
        padding: 'clamp(6rem, 12vw, 12rem) clamp(1.5rem, 6vw, 6rem)',
        textAlign: 'center',
      }}
    >
      <div style={{ maxWidth: '680px', margin: '0 auto' }}>
        <motion.p
          initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8 }}
          className="text-label" style={{ marginBottom: '2rem' }}
        >
          One Last Thing…
        </motion.p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem', marginBottom: '3rem' }}>
          {hiddenMessageParagraphs.map((line, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.18, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="font-display"
              style={{
                fontSize: 'clamp(1.0625rem, 2.5vw, 1.5rem)',
                fontWeight: 300, fontStyle: 'italic',
                color: i === hiddenMessageParagraphs.length - 1 ? 'var(--text-primary)' : 'var(--text-secondary)',
                lineHeight: 1.65,
              }}
            >
              {line}
            </motion.p>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: hiddenMessageParagraphs.length * 0.18 + 0.2, duration: 0.9, ease: [0.34, 1.56, 0.64, 1] }}
        >
          <p className="font-display gradient-text" style={{
            fontSize: 'clamp(1.5rem, 4vw, 3rem)', fontWeight: 400,
          }}>
            Happy Birthday, {PERSON.name}. — Nishu ❤️
          </p>
        </motion.div>
      </div>
    </motion.section>
  )
}
