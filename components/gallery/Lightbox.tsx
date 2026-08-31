'use client'
import { useEffect, useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import { galleryData } from '@/lib/constants/content'

interface LightboxProps {
  images: typeof galleryData
  initialIndex: number
  onClose: () => void
}

export default function Lightbox({ images, initialIndex, onClose }: LightboxProps) {
  const [index, setIndex] = useState(initialIndex)
  const [direction, setDirection] = useState(0)

  const prev = useCallback(() => {
    setDirection(-1)
    setIndex(i => (i - 1 + images.length) % images.length)
  }, [images.length])

  const next = useCallback(() => {
    setDirection(1)
    setIndex(i => (i + 1) % images.length)
  }, [images.length])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') prev()
      if (e.key === 'ArrowRight') next()
    }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose, prev, next])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="lightbox-backdrop"
      onClick={onClose}
    >
      {/* Image */}
      <div
        style={{ position: 'relative', maxWidth: '90vw', maxHeight: '90vh', width: '100%', height: '100%' }}
        onClick={e => e.stopPropagation()}
      >
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={index}
            custom={direction}
            initial={{ opacity: 0, x: direction * 60 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -direction * 60 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            style={{ width: '100%', height: '100%', position: 'relative', minHeight: '60vh' }}
          >
            <Image
              src={images[index].src}
              alt={images[index].alt}
              fill
              className="img-cover"
              style={{ objectFit: 'contain' }}
              sizes="90vw"
              priority
            />
          </motion.div>
        </AnimatePresence>

        {/* Caption */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            position: 'absolute', bottom: '-3rem', left: 0, right: 0, textAlign: 'center',
          }}
        >
          <p className="font-display" style={{ fontStyle: 'italic', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
            {images[index].caption}
          </p>
          <p className="text-label" style={{ marginTop: '0.25rem', opacity: 0.35, fontSize: '0.55rem' }}>
            {index + 1} / {images.length}
          </p>
        </motion.div>
      </div>

      {/* Controls */}
      <button
        onClick={e => { e.stopPropagation(); prev() }}
        aria-label="Previous image"
        className="interactive"
        style={{
          position: 'fixed', left: '1.5rem', top: '50%', transform: 'translateY(-50%)',
          background: 'rgba(5,3,6,0.7)', border: '1px solid rgba(255,111,159,0.2)',
          backdropFilter: 'blur(8px)', padding: '0.875rem', cursor: 'pointer',
          color: 'var(--text-primary)',
        }}
      >
        <ChevronLeft size={20} />
      </button>

      <button
        onClick={e => { e.stopPropagation(); next() }}
        aria-label="Next image"
        className="interactive"
        style={{
          position: 'fixed', right: '1.5rem', top: '50%', transform: 'translateY(-50%)',
          background: 'rgba(5,3,6,0.7)', border: '1px solid rgba(255,111,159,0.2)',
          backdropFilter: 'blur(8px)', padding: '0.875rem', cursor: 'pointer',
          color: 'var(--text-primary)',
        }}
      >
        <ChevronRight size={20} />
      </button>

      {/* Close */}
      <button
        onClick={onClose}
        aria-label="Close lightbox"
        className="interactive"
        style={{
          position: 'fixed', top: '1.5rem', right: '1.5rem',
          background: 'rgba(5,3,6,0.7)', border: '1px solid rgba(255,111,159,0.2)',
          backdropFilter: 'blur(8px)', padding: '0.75rem', cursor: 'pointer',
          color: 'var(--text-primary)',
        }}
      >
        <X size={18} />
      </button>
    </motion.div>
  )
}
