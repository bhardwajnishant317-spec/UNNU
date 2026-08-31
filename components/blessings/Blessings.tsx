'use client'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { blessingsData } from '@/lib/constants/content'

export default function Blessings() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '60px' })

  return (
    <section
      id="blessings"
      ref={ref}
      style={{
        background: 'var(--section-gradient-3)',
        padding: 'clamp(5rem, 10vw, 10rem) clamp(1rem, 4vw, 4rem)',
        textAlign: 'center',
      }}
    >
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <motion.p
          initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5 }}
          className="text-label" style={{ marginBottom: '1rem' }}
        >
          With all my heart
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="font-display gradient-text-soft"
          style={{ fontSize: 'clamp(2.5rem, 6vw, 5.5rem)', fontWeight: 500, lineHeight: 1.05, marginBottom: 'clamp(3rem, 6vw, 5rem)' }}
        >
          May Life Always Be Kind to You
        </motion.h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {blessingsData.map((text, i) => (
            <BlessingLine key={i} text={text} index={i} />
          ))}
        </div>

        {/* Ornament */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.6, duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
          style={{ marginTop: '3rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}
        >
          <div style={{
            width: '1px', height: '50px',
            background: 'linear-gradient(to bottom, transparent, var(--accent-rose))',
            opacity: 0.4,
          }} />
          <div style={{
            width: '6px', height: '6px', borderRadius: '50%',
            background: 'var(--accent-rose)', boxShadow: '0 0 16px var(--accent-rose)',
          }} />
        </motion.div>
      </div>
    </section>
  )
}

function BlessingLine({ text, index }: { text: string, index: number }) {
  const ref = useRef<HTMLParagraphElement>(null)
  const inView = useInView(ref, { once: true, margin: '40px' })

  return (
    <motion.p
      ref={ref}
      initial={{ opacity: 0, y: 12 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: (index % 5) * 0.04, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="font-display"
      style={{
        fontSize: 'clamp(1.15rem, 2.2vw, 1.5rem)',
        fontWeight: 500,
        color: 'var(--text-primary)',
        lineHeight: 1.8,
      }}
    >
      {text}
    </motion.p>
  )
}
