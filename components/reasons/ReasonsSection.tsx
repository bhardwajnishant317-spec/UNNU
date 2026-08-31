'use client'
import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { reasonsData } from '@/lib/constants/content'

export default function ReasonsSection() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      id="reasons"
      ref={ref}
      style={{
        background: 'linear-gradient(to bottom, #050306, #0B0509)',
        padding: 'clamp(6rem, 12vw, 12rem) clamp(1.5rem, 6vw, 6rem)',
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 'clamp(4rem, 8vw, 7rem)' }}>
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8 }}
            className="text-label" style={{ marginBottom: '1rem' }}
          >
            15 Reasons
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.15, duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="font-display gradient-text-soft"
            style={{ fontSize: 'clamp(2.5rem, 6vw, 5.5rem)', fontWeight: 300, lineHeight: 1.05 }}
          >
            I Love You
          </motion.h2>
        </div>

        {/* Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 320px), 1fr))',
          gap: '1px',
          border: '1px solid rgba(255,111,159,0.06)',
        }}>
          {reasonsData.map((item, i) => (
            <ReasonCard key={item.number} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

function ReasonCard({ item, index }: { item: typeof reasonsData[0], index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const [hovered, setHovered] = useState(false)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 12
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -12
    setTilt({ x, y })
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.04, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); setTilt({ x: 0, y: 0 }) }}
      onMouseMove={handleMouseMove}
      style={{
        padding: 'clamp(1.5rem, 3vw, 2.5rem)',
        background: hovered ? 'rgba(26, 10, 18, 0.8)' : 'rgba(12, 5, 10, 0.5)',
        border: '1px solid transparent',
        borderColor: hovered ? 'rgba(255,111,159,0.15)' : 'rgba(255,111,159,0.04)',
        transform: `perspective(800px) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg)`,
        transition: 'background 0.3s ease, border-color 0.3s ease, transform 0.15s ease',
        cursor: 'default', position: 'relative', overflow: 'hidden',
      }}
    >
      {/* Hover spotlight */}
      {hovered && (
        <div style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(circle at 50% 50%, rgba(255,111,159,0.04) 0%, transparent 60%)',
          pointerEvents: 'none',
        }} />
      )}

      <span className="font-display" style={{
        fontSize: '2.5rem', fontWeight: 300,
        color: hovered ? 'rgba(255,111,159,0.2)' : 'rgba(255,111,159,0.08)',
        lineHeight: 1, display: 'block', marginBottom: '0.75rem',
        transition: 'color 0.3s ease',
      }}>
        {item.number}
      </span>

      <h3 className="font-editorial" style={{
        fontSize: 'clamp(1rem, 1.8vw, 1.25rem)',
        fontWeight: 500, color: 'var(--text-primary)',
        marginBottom: '0.625rem', lineHeight: 1.3,
        transition: 'color 0.3s ease',
      }}>
        {item.reason}
      </h3>

      <p className="font-inter" style={{
        fontSize: '0.8125rem', fontWeight: 300, lineHeight: 1.7,
        color: hovered ? 'var(--text-secondary)' : 'var(--text-dim)',
        transition: 'color 0.3s ease',
      }}>
        {item.detail}
      </p>

      {/* Bottom accent */}
      <motion.div
        animate={{ scaleX: hovered ? 1 : 0 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, height: '1px',
          background: 'linear-gradient(90deg, transparent, var(--accent-rose), transparent)',
          transformOrigin: 'center',
        }}
      />
    </motion.div>
  )
}
