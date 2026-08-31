'use client'
import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Music, Pause, Play } from 'lucide-react'

const START_TIME_SEC = 30

export default function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [playing, setPlaying] = useState(false)
  const [userPaused, setUserPaused] = useState(false)
  const [visible, setVisible] = useState(false)

  // Start playback function
  const startPlayback = async () => {
    if (!audioRef.current || userPaused) return
    try {
      if (audioRef.current.currentTime < START_TIME_SEC) {
        audioRef.current.currentTime = START_TIME_SEC
      }
      audioRef.current.volume = 0.75
      await audioRef.current.play()
      setPlaying(true)
    } catch {
      // Autoplay blocked by browser policy until user gesture
    }
  }

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 1500)

    // Attempt direct autoplay on load
    startPlayback()

    // Global first-gesture listener to bypass browser autoplay restrictions seamlessly
    const handleFirstInteraction = () => {
      if (!userPaused) {
        startPlayback()
      }
    }

    window.addEventListener('click', handleFirstInteraction, { once: true })
    window.addEventListener('touchstart', handleFirstInteraction, { once: true })
    window.addEventListener('unnati-play-music', startPlayback)

    return () => {
      clearTimeout(timer)
      window.removeEventListener('click', handleFirstInteraction)
      window.removeEventListener('touchstart', handleFirstInteraction)
      window.removeEventListener('unnati-play-music', startPlayback)
    }
  }, [userPaused])

  const toggle = async () => {
    if (!audioRef.current) return
    if (playing) {
      audioRef.current.pause()
      setPlaying(false)
      setUserPaused(true)
    } else {
      setUserPaused(false)
      if (audioRef.current.currentTime < START_TIME_SEC) {
        audioRef.current.currentTime = START_TIME_SEC
      }
      try {
        audioRef.current.volume = 0.75
        await audioRef.current.play()
        setPlaying(true)
      } catch {}
    }
  }

  const handleEnded = () => {
    if (!audioRef.current) return
    audioRef.current.currentTime = START_TIME_SEC
    audioRef.current.play().catch(() => {})
  }

  return (
    <>
      <audio
        ref={audioRef}
        loop
        preload="auto"
        onEnded={handleEnded}
        onLoadedMetadata={() => {
          if (audioRef.current && audioRef.current.currentTime < START_TIME_SEC) {
            audioRef.current.currentTime = START_TIME_SEC
          }
        }}
      >
        <source src="/music/song.webm" type="audio/webm" />
        <source src="/music/song.mp3" type="audio/mpeg" />
      </audio>

      <AnimatePresence>
        {visible && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
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
              title={playing ? 'Pause music' : 'Play song'}
              aria-label={playing ? 'Pause music' : 'Play song'}
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
                {playing ? 'Playing' : 'Paused (Tap to Play)'}
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
