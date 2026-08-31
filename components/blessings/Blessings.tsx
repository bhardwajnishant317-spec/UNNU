'use client'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { blessingsData } from '@/lib/constants/content'

export default function Blessings() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      id="blessings"
      ref={ref}
      style={{
        background: 'var(--section-gradient-3)',
        padding: 'clamp(6rem, 12vw, 12rem) clamp(1.5rem, 6vw, 6rem)',
        textAlign: 'center',
      }}
    >
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <motion.p
          initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8 }}
          className="text-label" style={{ marginBottom: '1rem' }}
        >
          With all my heart
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.15, duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="font-display"
          style={{
            fontSize: 'clamp(2rem, 5vw, 4.5rem)', fontWeight: 300,
            fontStyle: 'italic', color: 'var(--text-primary)',
            marginBottom: 'clamp(3rem, 6vw, 6rem)', lineHeight: 1.15,
          }}
        >
          May life always be good to you.
        </motion.h2>

        {/* Blessings as large flowing text */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
          {blessingsData.map((blessing, i) => (
            <BlessingLine key={i} text={blessing} index={i} />
          ))}
        </div>

        {/* Closing ornament */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 1.2, duration: 0.8, ease: [0.34, 1.56, 0.64, 1] }}
          style={{ marginTop: '4rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}
        >
          <div style={{
            width: '1px', height: '60px',
            background: 'linear-gradient(to bottom, transparent, rgba(255,111,159,0.4))',
          }} />
          <div style={{
            width: '6px', height: '6px', borderRadius: '50%',
            background: 'var(--accent-rose)', boxShadow: '0 0 20px var(--accent-rose)',
          }} />
        </motion.div>
      </div>
    </section>
  )
}

function BlessingLine({ text, index }: { text: string, index: number }) {
  const ref = useRef<HTMLParagraphElement>(null)
  const inView = useInView(ref, { once: true, margin: '-30px' })

  return (
    <motion.p
      ref={ref}
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.08, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
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
