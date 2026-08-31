'use client'
import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Music, Pause, Play } from 'lucide-react'

export default function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [playing, setPlaying] = useState(false)
  const [hasFile, setHasFile] = useState(true)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 3000)
    return () => clearTimeout(timer)
  }, [])

  const toggle = async () => {
    if (!audioRef.current) return
    if (playing) {
      audioRef.current.pause()
      setPlaying(false)
    } else {
      try {
        audioRef.current.volume = 0
        await audioRef.current.play()
        // Fade in
        let vol = 0
        const fade = setInterval(() => {
          vol = Math.min(vol + 0.05, 0.7)
          if (audioRef.current) audioRef.current.volume = vol
          if (vol >= 0.7) clearInterval(fade)
        }, 100)
        setPlaying(true)
      } catch {
        setHasFile(false)
      }
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

  return (
    <>
      <audio ref={audioRef} src="/music/song.mp3" loop preload="none" />
      <AnimatePresence>
        {visible && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: 'fixed', bottom: '2rem', right: '2rem', zIndex: 9990,
              display: 'flex', alignItems: 'center', gap: '0.75rem',
            }}
          >
            <motion.button
              onClick={playing ? handlePause : toggle}
              className="interactive magnetic"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              title={playing ? 'Pause music' : 'Play music'}
              aria-label={playing ? 'Pause music' : 'Play music'}
              style={{
                display: 'flex', alignItems: 'center', gap: '0.625rem',
                padding: '0.625rem 1.125rem',
                background: 'rgba(10, 5, 9, 0.8)',
                border: `1px solid rgba(255,111,159,${playing ? 0.5 : 0.2})`,
                backdropFilter: 'blur(20px)',
                cursor: 'pointer',
                transition: 'border-color 0.3s ease',
              }}
            >
              <motion.div
                animate={playing ? { rotate: [0, 360] } : { rotate: 0 }}
                transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
              >
                <Music size={12} color={playing ? 'var(--accent-rose)' : 'var(--text-muted)'} />
              </motion.div>
              <span className="text-label" style={{ color: playing ? 'var(--accent-blush)' : 'var(--text-muted)', fontSize: '0.6rem' }}>
                {playing ? 'Now Playing' : 'Our Song'}
              </span>
              {playing
                ? <Pause size={10} color="var(--accent-rose)" />
                : <Play size={10} color="var(--text-muted)" />
              }
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
