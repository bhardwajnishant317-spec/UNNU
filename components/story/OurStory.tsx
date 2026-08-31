'use client'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { storyData } from '@/lib/constants/content'

export default function OurStory() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '60px' })

  return (
    <section
      id="story"
      ref={ref}
      style={{
        background: 'var(--bg-base)',
        padding: 'clamp(5rem, 10vw, 10rem) clamp(1rem, 4vw, 4rem)',
        position: 'relative',
      }}
    >
      {/* Section header */}
      <div style={{ textAlign: 'center', marginBottom: 'clamp(3.5rem, 7vw, 6rem)' }}>
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8 }}
          className="text-label"
          style={{ marginBottom: '0.8rem', color: 'var(--accent-rose)', letterSpacing: '0.25em' }}
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

      {/* Timeline Container */}
      <div style={{ maxWidth: '960px', margin: '0 auto', position: 'relative' }}>
        {/* Animated Center Timeline (Desktop center / Mobile left) */}
        <div className="hidden md:block">
          <motion.div
            initial={{ scaleY: 0 }}
            animate={inView ? { scaleY: 1 } : {}}
            transition={{ delay: 0.4, duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: 'absolute',
              left: '50%',
              top: 0,
              bottom: 0,
              width: '1px',
              transformOrigin: 'top',
              background: 'linear-gradient(to bottom, transparent, var(--accent-rose) 10%, var(--accent-rose) 90%, transparent)',
              opacity: 0.3,
            }}
          />
        </div>

        {/* Mobile vertical line */}
        <div className="block md:hidden">
          <div
            style={{
              position: 'absolute',
              left: '1rem',
              top: 0,
              bottom: 0,
              width: '1px',
              background: 'linear-gradient(to bottom, transparent, var(--accent-rose) 10%, var(--accent-rose) 90%, transparent)',
              opacity: 0.3,
            }}
          />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(2.5rem, 5vw, 5rem)' }}>
          {storyData.map((item, i) => (
            <StoryItem key={item.number} item={item} index={i} isLeft={i % 2 === 0} />
          ))}
        </div>
      </div>
    </section>
  )
}

function StoryItem({
  item,
  index,
  isLeft,
}: {
  item: (typeof storyData)[0]
  index: number
  isLeft: boolean
}) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '40px' })

  return (
    <div
      ref={ref}
      className={`relative flex items-center w-full ${
        isLeft ? 'md:justify-start' : 'md:justify-end'
      } justify-end pl-8 md:pl-0`}
    >
      {/* Desktop Dot (centered on 50%) */}
      <div className="hidden md:block">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={inView ? { scale: 1, opacity: 1 } : {}}
          transition={{ delay: 0.2, duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
          style={{
            position: 'absolute',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
            width: '12px',
            height: '12px',
            borderRadius: '50%',
            background: 'var(--accent-rose)',
            boxShadow: '0 0 16px var(--accent-rose)',
            zIndex: 2,
          }}
        />
      </div>

      {/* Mobile Dot (at left 1rem) */}
      <div className="block md:hidden">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={inView ? { scale: 1, opacity: 1 } : {}}
          transition={{ delay: 0.2, duration: 0.6 }}
          style={{
            position: 'absolute',
            left: '1rem',
            top: '2rem',
            transform: 'translate(-50%, -50%)',
            width: '10px',
            height: '10px',
            borderRadius: '50%',
            background: 'var(--accent-rose)',
            boxShadow: '0 0 12px var(--accent-rose)',
            zIndex: 2,
          }}
        />
      </div>

      {/* Story Card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.15, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        style={{
          width: '100%',
          maxWidth: '430px',
          padding: 'clamp(1.5rem, 3vw, 2.25rem)',
          background: 'var(--card-bg)',
          border: '1px solid var(--card-border)',
          borderRadius: '16px',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12)',
          position: 'relative',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
        }}
      >
        {/* Large Decorative Number */}
        <p
          className="font-display"
          style={{
            fontSize: '3.5rem',
            fontWeight: 300,
            lineHeight: 1,
            color: 'var(--accent-rose)',
            opacity: 0.12,
            marginBottom: '0.25rem',
            position: 'absolute',
            top: '1rem',
            right: '1.25rem',
          }}
        >
          {item.number}
        </p>

        <p
          className="text-label"
          style={{
            marginBottom: '0.4rem',
            color: 'var(--accent-rose)',
            fontSize: '0.625rem',
            letterSpacing: '0.15em',
          }}
        >
          {item.date}
        </p>
        <h3
          className="font-editorial"
          style={{
            fontSize: 'clamp(1.2rem, 2.2vw, 1.5rem)',
            fontWeight: 600,
            color: 'var(--text-primary)',
            marginBottom: '0.875rem',
            lineHeight: 1.3,
          }}
        >
          {item.title}
        </h3>
        <p
          className="font-inter"
          style={{
            fontSize: '0.95rem',
            fontWeight: 400,
            lineHeight: 1.8,
            color: 'var(--text-primary)',
            marginBottom: '1rem',
          }}
        >
          {item.description}
        </p>
        <p
          className="font-display"
          style={{
            fontSize: '1.05rem',
            fontWeight: 500,
            fontStyle: 'italic',
            color: 'var(--accent-rose)',
          }}
        >
          "{item.quote}"
        </p>
      </motion.div>
    </div>
  )
}
