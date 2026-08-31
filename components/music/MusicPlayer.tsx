'use client'
import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Music, Pause, Play } from 'lucide-react'

export default function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [playing, setPlaying] = useState(false)
  const [userPaused, setUserPaused] = useState(false)
  const [visible, setVisible] = useState(false)

  // Direct play attempt
  const playAudio = () => {
    if (!audioRef.current || userPaused) return
    audioRef.current.volume = 0.85
    const playPromise = audioRef.current.play()
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          setPlaying(true)
        })
        .catch(() => {
          // If browser policy delays unmuted autoplay, retry on any first page event
        })
    }
  }

  useEffect(() => {
    // Show player pill quickly
    const timer = setTimeout(() => setVisible(true), 800)

    // Immediate autoplay execution as soon as component mounts
    playAudio()

    // Additional listeners to catch the earliest possible event (scroll, touch, click, mousemove, keydown)
    const triggerEvents = ['click', 'touchstart', 'touchend', 'scroll', 'keydown', 'mousemove']
    const handleImmediateGesture = () => {
      if (!userPaused) {
        playAudio()
      }
    }

    triggerEvents.forEach((evt) => {
      window.addEventListener(evt, handleImmediateGesture, { once: true, passive: true })
    })

    window.addEventListener('unnati-play-music', playAudio)

    return () => {
      clearTimeout(timer)
      triggerEvents.forEach((evt) => {
        window.removeEventListener(evt, handleImmediateGesture)
      })
      window.removeEventListener('unnati-play-music', playAudio)
    }
  }, [userPaused])

  const toggle = () => {
    if (!audioRef.current) return
    if (playing) {
      audioRef.current.pause()
      setPlaying(false)
      setUserPaused(true)
    } else {
      setUserPaused(false)
      audioRef.current.volume = 0.85
      audioRef.current.play().then(() => setPlaying(true)).catch(() => {})
    }
  }

  return (
    <>
      <audio
        ref={audioRef}
        autoPlay
        playsInline
        loop
        preload="auto"
        src="/music/song.webm"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onCanPlay={() => {
          if (!userPaused) {
            playAudio()
          }
        }}
      />

      <AnimatePresence>
        {visible && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: 'fixed',
              bottom: 'clamp(1rem, 3vh, 2rem)',
              right: 'clamp(1rem, 3vw, 2rem)',
              zIndex: 9990,
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
            }}
          >
            <motion.button
              onClick={toggle}
              className="interactive magnetic"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              title={playing ? 'Pause music' : 'Play music'}
              aria-label={playing ? 'Pause music' : 'Play music'}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.625rem',
                padding: '0.55rem 1.15rem',
                background: 'var(--glass-bg)',
                border: `1px solid ${playing ? 'var(--accent-rose)' : 'var(--glass-border)'}`,
                backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)',
                borderRadius: '9999px',
                cursor: 'pointer',
                boxShadow: playing
                  ? '0 8px 32px rgba(255, 77, 130, 0.35)'
                  : '0 8px 30px rgba(0, 0, 0, 0.25)',
                transition: 'all 0.3s ease',
              }}
            >
              <motion.div
                animate={playing ? { rotate: [0, 360] } : { rotate: 0 }}
                transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
              >
                <Music size={13} color="var(--accent-rose)" />
              </motion.div>
              <span
                className="text-label"
                style={{
                  color: 'var(--text-primary)',
                  fontSize: '0.65rem',
                  letterSpacing: '0.12em',
                  fontWeight: 600,
                }}
              >
                {playing ? 'Playing' : 'Paused'}
              </span>
              {playing ? (
                <Pause size={12} color="var(--accent-rose)" />
              ) : (
                <Play size={12} color="var(--accent-rose)" />
              )}
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
