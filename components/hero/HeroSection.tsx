'use client'
import { useRef, Suspense } from 'react'
import { motion } from 'framer-motion'
import dynamic from 'next/dynamic'
import { PERSON } from '@/lib/constants/content'

const FloatingHeart3D = dynamic(() => import('./FloatingHeart3D'), {
  ssr: false,
  loading: () => <HeartFallback />,
})

function HeartFallback() {
  return (
    <motion.div
      animate={{ y: [0, -18, 0], rotate: [0, 3, -3, 0] }}
      transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      style={{
        width: '180px', height: '180px', display: 'flex',
        alignItems: 'center', justifyContent: 'center',
      }}
    >
      <svg viewBox="0 0 100 90" width="140" height="140">
        <defs>
          <radialGradient id="hg" cx="50%" cy="30%" r="70%">
            <stop offset="0%" stopColor="#FF9FC0" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#C4425A" stopOpacity="0.4" />
          </radialGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>
        <path
          d="M50 85 C50 85 5 55 5 28 C5 14 16 5 30 5 C38 5 45 9 50 16 C55 9 62 5 70 5 C84 5 95 14 95 28 C95 55 50 85 50 85Z"
          fill="url(#hg)" filter="url(#glow)" opacity="0.7"
        />
      </svg>
    </motion.div>
  )
}

const particles = Array.from({ length: 20 }, (_, i) => ({
  id: i, x: Math.random() * 100, y: Math.random() * 100,
  size: Math.random() * 3 + 1, delay: Math.random() * 5, duration: Math.random() * 6 + 5,
}))

export default function HeroSection() {
  const easing = [0.16, 1, 0.3, 1] as const

  return (
    <section
      id="hero"
      style={{
        minHeight: '100vh', position: 'relative', overflow: 'hidden',
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        background: 'radial-gradient(ellipse 80% 80% at 50% 50%, #1A0A12 0%, #0B0509 50%, #050306 100%)',
      }}
    >
      {/* Floating particles */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        {particles.map(p => (
          <motion.div
            key={p.id}
            animate={{ opacity: [0, 0.5, 0], y: [0, -50] }}
            transition={{ delay: p.delay, duration: p.duration, repeat: Infinity, ease: 'easeOut' }}
            style={{
              position: 'absolute', left: `${p.x}%`, top: `${p.y}%`,
              width: `${p.size}px`, height: `${p.size}px`, borderRadius: '50%',
              background: p.id % 3 === 0 ? 'var(--accent-rose)' : 'var(--accent-blush)',
            }}
          />
        ))}
      </div>

      {/* Ambient glow blobs */}
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.15, 0.25, 0.15] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          position: 'absolute', width: '700px', height: '700px', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255,77,125,0.12) 0%, transparent 65%)',
          pointerEvents: 'none', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
        }}
      />

      <div style={{ position: 'relative', zIndex: 1, width: '100%', padding: '0 clamp(1.5rem, 6vw, 6rem)', textAlign: 'center' }}>

        {/* 3D Heart */}
        <motion.div
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 1.4, ease: [0.34, 1.56, 0.64, 1] }}
          style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'center' }}
        >
          <div style={{ width: '200px', height: '200px' }}>
            <Suspense fallback={<HeartFallback />}>
              <FloatingHeart3D />
            </Suspense>
          </div>
        </motion.div>

        {/* Happy Birthday */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 1, ease: easing }}
          className="text-label"
          style={{ marginBottom: '0.5rem', color: 'var(--accent-rose)', opacity: 0.7 }}
        >
          01 September
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 40, filter: 'blur(12px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ delay: 0.8, duration: 1.2, ease: easing }}
          className="font-display"
          style={{
            fontSize: 'clamp(3rem, 10vw, 9rem)', fontWeight: 300,
            letterSpacing: '-0.02em', lineHeight: 0.9,
            color: 'var(--text-primary)', marginBottom: '0.25rem',
          }}
        >
          Happy Birthday
        </motion.h1>

        <motion.h2
          initial={{ opacity: 0, y: 40, filter: 'blur(16px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ delay: 1.1, duration: 1.4, ease: easing }}
          className="font-display gradient-text"
          style={{
            fontSize: 'clamp(4rem, 18vw, 18rem)', fontWeight: 300,
            letterSpacing: '-0.03em', lineHeight: 0.85,
            marginBottom: '2.5rem',
          }}
        >
          {PERSON.name}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 1, ease: easing }}
          className="font-display"
          style={{
            fontSize: 'clamp(1rem, 2.5vw, 1.5rem)', fontWeight: 300,
            fontStyle: 'italic', color: 'var(--text-secondary)',
            maxWidth: '560px', margin: '0 auto 3.5rem', lineHeight: 1.6,
          }}
        >
          Today is not just another day.
          <br />
          It is the day the world got a little more beautiful.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.9, duration: 0.8, ease: easing }}
          style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}
        >
          <button
            onClick={() => document.getElementById('letter')?.scrollIntoView({ behavior: 'smooth' })}
            className="btn-primary magnetic interactive"
          >
            Open My Letter
          </button>
          <button
            onClick={() => document.getElementById('story')?.scrollIntoView({ behavior: 'smooth' })}
            className="btn-ghost magnetic interactive"
          >
            Our Story →
          </button>
        </motion.div>

        {/* Scroll hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5, duration: 1 }}
          style={{ position: 'absolute', bottom: '3rem', left: '50%', transform: 'translateX(-50%)' }}
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}
          >
            <div style={{ width: '1px', height: '40px', background: 'linear-gradient(to bottom, transparent, rgba(255,111,159,0.5))' }} />
            <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: 'var(--accent-rose)' }} />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
