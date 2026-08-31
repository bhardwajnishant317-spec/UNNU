'use client'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { wishesData } from '@/lib/constants/content'

export default function BirthdayWishes() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      id="wishes"
      ref={ref}
      style={{
        background: 'var(--section-gradient-2)',
        padding: 'clamp(6rem, 12vw, 12rem) clamp(1.5rem, 6vw, 6rem)',
      }}
    >
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 'clamp(4rem, 8vw, 7rem)' }}>
          <motion.p
            initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8 }}
            className="text-label" style={{ marginBottom: '1rem' }}
          >
            From my heart
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.15, duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="font-display gradient-text-soft"
            style={{ fontSize: 'clamp(2.5rem, 6vw, 5.5rem)', fontWeight: 300, lineHeight: 1.05 }}
          >
            My Wishes For You
          </motion.h2>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
          {wishesData.map((item, i) => (
            <WishItem key={i} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

function WishItem({ item, index }: { item: typeof wishesData[0], index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -30 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ delay: index * 0.1, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      style={{
        display: 'flex', gap: '1.5rem', alignItems: 'flex-start',
        padding: 'clamp(1.25rem, 2.5vw, 2rem) 0',
        borderBottom: '1px solid rgba(255,111,159,0.06)',
      }}
    >
      <span style={{ color: 'var(--accent-rose)', opacity: 0.5, fontSize: '0.6rem', marginTop: '0.5rem', flexShrink: 0 }}>
        {item.icon}
      </span>
      <p className="font-display" style={{
        fontSize: 'clamp(1rem, 2vw, 1.375rem)', fontWeight: 300,
        fontStyle: 'italic', color: 'var(--text-secondary)', lineHeight: 1.7,
      }}>
        {item.wish}
      </p>
    </motion.div>
  )
}
