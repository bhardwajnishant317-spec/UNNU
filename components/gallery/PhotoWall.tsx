'use client'
import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import Image from 'next/image'
import { galleryData } from '@/lib/constants/content'
import Lightbox from './Lightbox'

export default function PhotoWall() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  return (
    <section
      id="gallery"
      ref={ref}
      style={{
        background: 'linear-gradient(to bottom, #0B0509, #050306)',
        padding: 'clamp(6rem, 12vw, 12rem) clamp(1.5rem, 6vw, 6rem)',
      }}
    >
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 'clamp(3rem, 6vw, 6rem)' }}>
          <motion.p
            initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8 }}
            className="text-label" style={{ marginBottom: '1rem' }}
          >
            Moments
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.15, duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="font-display gradient-text-soft"
            style={{ fontSize: 'clamp(2.5rem, 6vw, 5.5rem)', fontWeight: 300, lineHeight: 1.05 }}
          >
            A Wall of Memories
          </motion.h2>
        </div>

        {/* Gallery grid */}
        <div className="gallery-grid">
          {galleryData.map((item, i) => (
            <GalleryItem
              key={i}
              item={item}
              index={i}
              onClick={() => setLightboxIndex(i)}
            />
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <Lightbox
          images={galleryData}
          initialIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
        />
      )}
    </section>
  )
}

function GalleryItem({ item, index, onClick }: {
  item: typeof galleryData[0], index: number, onClick: () => void
}) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      ref={ref}
      className="gallery-item interactive"
      initial={{ opacity: 0, scale: 0.96 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ delay: index * 0.06, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: 'relative', overflow: 'hidden', cursor: 'pointer',
        background: '#0B0509',
      }}
    >
      <motion.div
        animate={{ scale: hovered ? 1.06 : 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        style={{ width: '100%', height: '100%', position: 'relative' }}
      >
        <Image
          src={item.src}
          alt={item.alt}
          fill
          className="img-cover"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </motion.div>

      {/* Overlay */}
      <motion.div
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to top, rgba(5,3,6,0.85) 0%, rgba(5,3,6,0.2) 60%, transparent 100%)',
          display: 'flex', alignItems: 'flex-end', padding: '1.5rem',
        }}
      >
        <p className="font-display" style={{
          fontSize: '0.9375rem', fontStyle: 'italic',
          color: 'var(--text-primary)', lineHeight: 1.4,
        }}>
          {item.caption}
        </p>
      </motion.div>

      {/* Index number */}
      <div style={{
        position: 'absolute', top: '1rem', right: '1rem',
        background: 'rgba(5,3,6,0.7)', backdropFilter: 'blur(8px)',
        padding: '0.25rem 0.625rem',
      }}>
        <span className="text-label" style={{ fontSize: '0.5rem', opacity: 0.5 }}>
          {String(index + 1).padStart(2, '0')}
        </span>
      </div>
    </motion.div>
  )
}
