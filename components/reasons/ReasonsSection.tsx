'use client'
import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { reasonsData } from '@/lib/constants/content'

export default function ReasonsSection() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '60px' })

  return (
    <section
      id="reasons"
      ref={ref}
      style={{
        background: 'var(--section-gradient-3)',
        padding: 'clamp(5rem, 10vw, 10rem) clamp(1rem, 4vw, 4rem)',
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 'clamp(3rem, 6vw, 5rem)' }}>
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5 }}
            className="text-label" style={{ marginBottom: '0.8rem' }}
          >
            15 Reasons
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="font-display gradient-text-soft"
            style={{ fontSize: 'clamp(2.5rem, 6vw, 5.5rem)', fontWeight: 500, lineHeight: 1.05 }}
          >
            I Love You
          </motion.h2>
        </div>

        {/* Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 320px), 1fr))',
          gap: '12px',
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
  const inView = useInView(ref, { once: true, margin: '40px' })
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
      initial={{ opacity: 0, y: 15 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: (index % 4) * 0.04, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); setTilt({ x: 0, y: 0 }) }}
      onMouseMove={handleMouseMove}
      style={{
        padding: 'clamp(1.5rem, 3vw, 2.5rem)',
        background: 'var(--card-bg)',
        border: '1px solid',
        borderColor: hovered ? 'var(--card-border-hover)' : 'var(--card-border)',
        borderRadius: '16px',
        boxShadow: hovered ? '0 12px 30px rgba(0, 0, 0, 0.15)' : '0 4px 15px rgba(0, 0, 0, 0.05)',
        transform: `perspective(800px) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg)`,
        transition: 'background 0.3s ease, border-color 0.3s ease, transform 0.15s ease, box-shadow 0.3s ease',
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
        fontSize: '2.5rem', fontWeight: 600,
        color: 'var(--accent-rose)',
        opacity: hovered ? 0.45 : 0.25,
        lineHeight: 1, display: 'block', marginBottom: '0.75rem',
        transition: 'all 0.3s ease',
      }}>
        {item.number}
      </span>

      <h3 className="font-editorial" style={{
        fontSize: 'clamp(1.15rem, 2vw, 1.4rem)',
        fontWeight: 600, color: 'var(--text-primary)',
        marginBottom: '0.625rem', lineHeight: 1.3,
        transition: 'color 0.3s ease',
      }}>
        {item.reason}
      </h3>

      <p className="font-inter" style={{
        fontSize: '0.925rem', fontWeight: 400, lineHeight: 1.75,
        color: 'var(--text-primary)',
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
