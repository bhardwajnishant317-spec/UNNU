'use client'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { storyData } from '@/lib/constants/content'

export default function OurStory() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      id="story"
      ref={ref}
      style={{
        background: 'var(--bg-base)',
        padding: 'clamp(6rem, 12vw, 12rem) clamp(1.5rem, 6vw, 6rem)',
        position: 'relative',
      }}
    >
      {/* Section header */}
      <div style={{ textAlign: 'center', marginBottom: 'clamp(4rem, 8vw, 8rem)' }}>
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8 }}
          className="text-label"
          style={{ marginBottom: '1rem' }}
        >
          Chapter by Chapter
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.15, duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="font-display gradient-text-soft"
          style={{ fontSize: 'clamp(2.5rem, 6vw, 5.5rem)', fontWeight: 300, lineHeight: 1.05 }}
        >
          Our Story
        </motion.h2>
      </div>

      {/* Timeline */}
      <div style={{ maxWidth: '900px', margin: '0 auto', position: 'relative' }}>

        {/* Center line */}
        <motion.div
          initial={{ scaleY: 0 }}
          animate={inView ? { scaleY: 1 } : {}}
          transition={{ delay: 0.4, duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          style={{
            position: 'absolute', left: '50%', top: 0, bottom: 0,
            width: '1px', transformOrigin: 'top',
            background: 'linear-gradient(to bottom, transparent, rgba(255,111,159,0.25) 10%, rgba(255,111,159,0.25) 90%, transparent)',
          }}
          className="timeline-line"
        />

        <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(3rem, 6vw, 6rem)' }}>
          {storyData.map((item, i) => {
            const isLeft = i % 2 === 0
            return (
              <StoryItem key={item.number} item={item} index={i} isLeft={isLeft} />
            )
          })}
        </div>
      </div>
    </section>
  )
}

function StoryItem({ item, index, isLeft }: {
  item: typeof storyData[0], index: number, isLeft: boolean
}) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <div
      ref={ref}
      style={{
        display: 'flex',
        justifyContent: isLeft ? 'flex-start' : 'flex-end',
        alignItems: 'center',
        position: 'relative',
      }}
    >
      {/* Dot on line */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={inView ? { scale: 1, opacity: 1 } : {}}
        transition={{ delay: 0.2, duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
        style={{
          position: 'absolute', left: '50%', top: '50%',
          transform: 'translate(-50%, -50%)',
          width: '10px', height: '10px', borderRadius: '50%',
          background: 'var(--accent-rose)',
          boxShadow: '0 0 16px var(--accent-rose)',
          zIndex: 2,
        }}
      />

      {/* Card */}
      <motion.div
        initial={{ opacity: 0, x: isLeft ? -40 : 40, filter: 'blur(8px)' }}
        animate={inView ? { opacity: 1, x: 0, filter: 'blur(0px)' } : {}}
        transition={{ delay: 0.15, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        style={{
          width: '44%',
          padding: 'clamp(1.5rem, 3vw, 2.5rem)',
          background: 'var(--card-bg)',
          border: '1px solid var(--card-border)',
          borderRadius: '16px',
          boxShadow: '0 8px 30px rgba(0, 0, 0, 0.1)',
          position: 'relative',
        }}
      >
        {/* Number */}
        <p className="font-display" style={{
          fontSize: '4rem', fontWeight: 300, lineHeight: 1,
          color: 'rgba(255,111,159,0.12)', marginBottom: '0.25rem',
          position: 'absolute', top: '0.5rem', right: isLeft ? undefined : undefined,
          [isLeft ? 'right' : 'left']: '1.25rem',
        }}>
          {item.number}
        </p>

        <p className="text-label" style={{ marginBottom: '0.5rem', color: 'var(--accent-rose)', opacity: 0.6 }}>
          {item.date}
        </p>
        <h3 className="font-editorial" style={{
          fontSize: 'clamp(1.125rem, 2vw, 1.5rem)', fontWeight: 500,
          color: 'var(--text-primary)', marginBottom: '1rem', lineHeight: 1.3,
        }}>
          {item.title}
        </h3>
        <p className="font-inter" style={{
          fontSize: '0.9rem', fontWeight: 300, lineHeight: 1.8,
          color: 'var(--text-muted)', marginBottom: '1.25rem',
        }}>
          {item.description}
        </p>
        <p className="font-display" style={{
          fontSize: '0.875rem', fontStyle: 'italic',
          color: 'var(--accent-blush)', opacity: 0.7,
        }}>
          "{item.quote}"
        </p>
      </motion.div>
    </div>
  )
}
