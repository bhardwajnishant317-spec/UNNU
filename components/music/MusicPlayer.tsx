'use client'
import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Music, Pause, Play } from 'lucide-react'

const START_TIME_SEC = 30

export default function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [playing, setPlaying] = useState(false)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 2000)

    // Listen for custom trigger (e.g. user entering welcome gate)
    const handleTrigger = () => {
      startPlayback()
    }
    window.addEventListener('unnati-play-music', handleTrigger)

    return () => {
      clearTimeout(timer)
      window.removeEventListener('unnati-play-music', handleTrigger)
    }
  }, [])

  const startPlayback = async () => {
    if (!audioRef.current) return
    try {
      if (audioRef.current.currentTime < START_TIME_SEC) {
        audioRef.current.currentTime = START_TIME_SEC
      }
      audioRef.current.volume = 0
      await audioRef.current.play()
      setPlaying(true)

      // Smooth volume fade-in
      let vol = 0
      const fade = setInterval(() => {
        vol = Math.min(vol + 0.05, 0.75)
        if (audioRef.current) audioRef.current.volume = vol
        if (vol >= 0.75) clearInterval(fade)
      }, 100)
    } catch {
      // Browser autoplay policy might need explicit user tap
    }
  }

  const toggle = async () => {
    if (!audioRef.current) return
    if (playing) {
      handlePause()
    } else {
      await startPlayback()
    }
  }

  const handlePause = () => {
    if (!audioRef.current) return
    let vol = audioRef.current.volume
    const fade = setInterval(() => {
      vol = Math.max(vol - 0.05, 0)
      if (audioRef.current) audioRef.current.volume = vol
      if (vol <= 0) {
        clearInterval(fade)
        audioRef.current?.pause()
        setPlaying(false)
      }
    }, 80)
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
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: 'fixed',
              bottom: 'clamp(1.25rem, 3vh, 2.25rem)',
              right: 'clamp(1.25rem, 3vw, 2.25rem)',
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
              title={playing ? 'Pause music' : 'Play song from 30s'}
              aria-label={playing ? 'Pause music' : 'Play song from 30s'}
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
                {playing ? 'Now Playing' : 'Our Song (0:30)'}
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
