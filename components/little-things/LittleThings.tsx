'use client'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { littleThingsData } from '@/lib/constants/content'

export default function LittleThings() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '60px' })

  return (
    <section
      id="remember"
      ref={ref}
      style={{
        background: 'var(--section-gradient-3)',
        padding: 'clamp(5rem, 10vw, 10rem) clamp(1rem, 4vw, 4rem)',
        textAlign: 'center',
      }}
    >
      <div style={{ maxWidth: '680px', margin: '0 auto' }}>
        <motion.p
          initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5 }}
          className="text-label" style={{ marginBottom: '0.8rem' }}
        >
          Never Forget
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="font-display gradient-text-soft"
          style={{ fontSize: 'clamp(2.5rem, 6vw, 5.5rem)', fontWeight: 500, lineHeight: 1.05, marginBottom: 'clamp(3rem, 6vw, 5rem)' }}
        >
          The Little Things
        </motion.h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
          {littleThingsData.map((text, i) => (
            <LittleThing key={i} text={text} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

function LittleThing({ text, index }: { text: string, index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '40px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -15 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ delay: (index % 4) * 0.04, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      style={{
        padding: '1.25rem 0',
        borderBottom: '1px solid var(--card-border)',
        display: 'flex', alignItems: 'center', gap: '1.25rem',
      }}
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={inView ? { scale: 1 } : {}}
        transition={{ delay: index * 0.1 + 0.2, duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
        style={{
          width: '6px', height: '6px', borderRadius: '50%',
          background: 'var(--accent-rose)', flexShrink: 0,
        }}
      />
      <p className="font-display" style={{
        fontSize: 'clamp(1.25rem, 2.6vw, 1.85rem)',
        fontWeight: 500, fontStyle: 'italic',
        color: 'var(--text-primary)', lineHeight: 1.4,
        textAlign: 'left',
      }}>
        {text}
      </p>
    </motion.div>
  )
}
