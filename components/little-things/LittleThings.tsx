'use client'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { littleThingsData } from '@/lib/constants/content'

export default function LittleThings() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      id="remember"
      ref={ref}
      style={{
        background: 'var(--section-gradient-3)',
        padding: 'clamp(6rem, 12vw, 12rem) clamp(1.5rem, 6vw, 6rem)',
        textAlign: 'center',
      }}
    >
      <div style={{ maxWidth: '680px', margin: '0 auto' }}>
        <motion.p
          initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8 }}
          className="text-label" style={{ marginBottom: '1rem' }}
        >
          A gentle reminder
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.15, duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="font-display gradient-text-soft"
          style={{
            fontSize: 'clamp(2rem, 5vw, 4.5rem)', fontWeight: 300,
            lineHeight: 1.1, marginBottom: 'clamp(3rem, 6vw, 6rem)',
          }}
        >
          Things I Hope You
          <br />Always Remember
        </motion.h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
          {littleThingsData.map((line, i) => (
            <LittleThing key={i} text={line} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

function LittleThing({ text, index }: { text: string, index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-20px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -20 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ delay: index * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      style={{
        padding: '1.25rem 0',
        borderBottom: '1px solid rgba(255,111,159,0.05)',
        display: 'flex', alignItems: 'center', gap: '1rem',
      }}
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={inView ? { scale: 1 } : {}}
        transition={{ delay: index * 0.1 + 0.2, duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
        style={{
          width: '4px', height: '4px', borderRadius: '50%',
          background: 'var(--accent-rose)', flexShrink: 0,
        }}
      />
      <p className="font-display" style={{
        fontSize: 'clamp(1.125rem, 2.5vw, 1.75rem)',
        fontWeight: 300, fontStyle: 'italic',
        color: 'var(--text-secondary)', lineHeight: 1.4,
        textAlign: 'left',
      }}>
        {text}
      </p>
    </motion.div>
  )
}
