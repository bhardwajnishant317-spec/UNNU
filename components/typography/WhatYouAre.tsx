'use client'
import { useRef, useState, useEffect } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { whatYouAreData } from '@/lib/constants/content'

export default function WhatYouAre() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })
  const [activeIndex, setActiveIndex] = useState(0)
  const [started, setStarted] = useState(false)

  useEffect(() => {
    if (!inView) return
    setStarted(true)
    const interval = setInterval(() => {
      setActiveIndex(prev => {
        if (prev >= whatYouAreData.length - 1) {
          clearInterval(interval)
          return prev
        }
        return prev + 1
      })
    }, 2400)
    return () => clearInterval(interval)
  }, [inView])

  const isLast = activeIndex === whatYouAreData.length - 1

  return (
    <section
      ref={ref}
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(to bottom, #0B0509, #140711)',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        padding: 'clamp(4rem, 8vw, 8rem) clamp(1.5rem, 6vw, 6rem)',
        position: 'relative', overflow: 'hidden', textAlign: 'center',
      }}
    >
      {/* Background glow */}
      <motion.div
        animate={{ opacity: isLast ? 0.15 : 0.06, scale: isLast ? 1.2 : 1 }}
        transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(ellipse 60% 60% at 50% 50%, rgba(255,77,125,0.2) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      <motion.p
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8 }}
        className="text-label"
        style={{ marginBottom: '4rem' }}
      >
        What you are to me
      </motion.p>

      {/* Statement display */}
      <div style={{ position: 'relative', minHeight: 'clamp(80px, 15vw, 160px)', width: '100%', maxWidth: '900px' }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, y: 40, filter: 'blur(16px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -30, filter: 'blur(10px)' }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            style={{ position: 'absolute', width: '100%', left: 0 }}
          >
            <h2
              className={`font-display ${isLast ? 'gradient-text' : ''}`}
              style={{
                fontSize: isLast
                  ? 'clamp(2.5rem, 8vw, 7rem)'
                  : 'clamp(1.75rem, 5vw, 4.5rem)',
                fontWeight: isLast ? 400 : 300,
                fontStyle: isLast ? 'normal' : 'italic',
                color: isLast ? undefined : 'var(--text-primary)',
                lineHeight: 1.1, letterSpacing: '-0.01em',
                transition: 'font-size 0.6s ease',
              }}
            >
              {whatYouAreData[activeIndex]}
            </h2>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Progress dots */}
      {started && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          style={{ display: 'flex', gap: '0.5rem', marginTop: 'clamp(6rem, 12vw, 10rem)' }}
        >
          {whatYouAreData.map((_, i) => (
            <div
              key={i}
              style={{
                width: i === activeIndex ? '24px' : '6px',
                height: '4px',
                borderRadius: '2px',
                background: i === activeIndex ? 'var(--accent-rose)' : 'rgba(255,111,159,0.2)',
                transition: 'width 0.4s ease, background 0.4s ease',
              }}
            />
          ))}
        </motion.div>
      )}
    </section>
  )
}
