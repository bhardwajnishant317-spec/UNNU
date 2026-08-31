'use client'
import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Play, Pause, Compass } from 'lucide-react'

const RESUME_DELAY_MS = 2800 // Resume after 2.8s of no interaction
const SCROLL_SPEED_PX_PER_SEC = 38 // Gentle, luxury reading speed

export default function AutoScrollStory({
  active = true,
  giftOpened,
}: {
  active?: boolean
  giftOpened: boolean
}) {
  const [enabled, setEnabled] = useState(true)
  const [isHolding, setIsHolding] = useState(false)
  const [countdown, setCountdown] = useState<number | null>(null)
  const [visible, setVisible] = useState(false)

  const holdTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const countdownIntervalRef = useRef<NodeJS.Timeout | null>(null)
  const rafIdRef = useRef<number | null>(null)
  const lastTimeRef = useRef<number | null>(null)
  const subPixelAccumulator = useRef<number>(0)

  // Show the pill after active
  useEffect(() => {
    if (!active) {
      setVisible(false)
      return
    }
    const timer = setTimeout(() => setVisible(true), 1200)
    return () => clearTimeout(timer)
  }, [active])

  // Interaction Handler: pauses auto-scroll on touch/scroll and schedules resume
  const handleUserInteraction = useCallback(() => {
    if (!enabled) return

    setIsHolding(true)
    setCountdown(3)

    // Clear previous timers
    if (holdTimeoutRef.current) clearTimeout(holdTimeoutRef.current)
    if (countdownIntervalRef.current) clearInterval(countdownIntervalRef.current)

    // Countdown updates
    let remaining = 3
    countdownIntervalRef.current = setInterval(() => {
      remaining -= 1
      if (remaining <= 0) {
        if (countdownIntervalRef.current) clearInterval(countdownIntervalRef.current)
        setCountdown(null)
      } else {
        setCountdown(remaining)
      }
    }, 900)

    // Resume after delay
    holdTimeoutRef.current = setTimeout(() => {
      setIsHolding(false)
      setCountdown(null)
      lastTimeRef.current = performance.now()
    }, RESUME_DELAY_MS)
  }, [enabled])

  // Attach global interaction listeners
  useEffect(() => {
    const events = ['touchstart', 'touchmove', 'wheel', 'keydown', 'pointerdown']
    events.forEach((evt) => {
      window.addEventListener(evt, handleUserInteraction, { passive: true })
    })

    return () => {
      events.forEach((evt) => {
        window.removeEventListener(evt, handleUserInteraction)
      })
      if (holdTimeoutRef.current) clearTimeout(holdTimeoutRef.current)
      if (countdownIntervalRef.current) clearInterval(countdownIntervalRef.current)
    }
  }, [handleUserInteraction])

  // Continuous smooth auto-scrolling loop
  useEffect(() => {
    if (!active || !enabled || isHolding) {
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current)
      lastTimeRef.current = null
      return
    }

    const scrollLoop = (time: number) => {
      if (lastTimeRef.current === null) {
        lastTimeRef.current = time
      }
      const deltaTime = (time - lastTimeRef.current) / 1000
      lastTimeRef.current = time

      // Check if near bottom of page
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight
      const currentScroll = window.scrollY || window.pageYOffset

      // Check if paused at unopened gift box
      const surpriseEl = document.getElementById('surprise')
      if (surpriseEl && !giftOpened) {
        const rect = surpriseEl.getBoundingClientRect()
        // If surprise section is in view center and not opened, hold
        if (rect.top <= window.innerHeight * 0.35 && rect.bottom >= window.innerHeight * 0.65) {
          rafIdRef.current = requestAnimationFrame(scrollLoop)
          return
        }
      }

      if (currentScroll < maxScroll - 5) {
        const moveAmount = SCROLL_SPEED_PX_PER_SEC * Math.min(deltaTime, 0.1)
        subPixelAccumulator.current += moveAmount

        if (subPixelAccumulator.current >= 1) {
          const pixelsToScroll = Math.floor(subPixelAccumulator.current)
          window.scrollBy(0, pixelsToScroll)
          subPixelAccumulator.current -= pixelsToScroll
        }
      }

      rafIdRef.current = requestAnimationFrame(scrollLoop)
    }

    rafIdRef.current = requestAnimationFrame(scrollLoop)

    return () => {
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current)
    }
  }, [enabled, isHolding, giftOpened])

  const toggleAutoScroll = () => {
    setEnabled((prev) => !prev)
    setIsHolding(false)
    setCountdown(null)
    lastTimeRef.current = performance.now()
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          style={{
            position: 'fixed',
            bottom: 'clamp(1rem, 3vh, 2rem)',
            left: 'clamp(1rem, 3vw, 2rem)',
            zIndex: 9990,
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
          }}
        >
          <motion.button
            onClick={toggleAutoScroll}
            className="interactive"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            title={enabled ? 'Pause Auto-Story' : 'Start Auto-Story'}
            aria-label={enabled ? 'Pause Auto-Story' : 'Start Auto-Story'}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.55rem',
              padding: '0.55rem 1rem',
              background: 'var(--glass-bg)',
              border: `1px solid ${
                enabled
                  ? isHolding
                    ? 'rgba(255, 180, 200, 0.3)'
                    : 'var(--accent-rose)'
                  : 'var(--glass-border)'
              }`,
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
              borderRadius: '9999px',
              cursor: 'pointer',
              boxShadow:
                enabled && !isHolding
                  ? '0 8px 30px rgba(255, 77, 130, 0.25)'
                  : '0 8px 24px rgba(0, 0, 0, 0.2)',
              transition: 'all 0.3s ease',
            }}
          >
            <motion.div
              animate={enabled && !isHolding ? { rotate: [0, 360] } : { rotate: 0 }}
              transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
            >
              <Compass size={13} color="var(--accent-rose)" />
            </motion.div>

            <span
              className="text-label"
              style={{
                color: 'var(--text-primary)',
                fontSize: '0.625rem',
                letterSpacing: '0.12em',
                fontWeight: 600,
              }}
            >
              {!enabled
                ? 'Auto-Story Off'
                : isHolding
                ? `Held (${countdown || 3}s)`
                : 'Auto-Story On'}
            </span>

            {enabled && !isHolding ? (
              <Pause size={10} color="var(--accent-rose)" />
            ) : (
              <Play size={10} color="var(--accent-rose)" />
            )}
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
