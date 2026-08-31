'use client'
import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import Image from 'next/image'
import { galleryData } from '@/lib/constants/content'
import Lightbox from './Lightbox'

export default function PhotoWall() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '60px' })
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  return (
    <section
      id="gallery"
      ref={ref}
      style={{
        background: 'var(--section-gradient-2)',
        padding: 'clamp(6rem, 12vw, 12rem) clamp(1.5rem, 6vw, 6rem)',
        position: 'relative',
      }}
    >
      <div style={{ maxWidth: '1320px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 'clamp(3.5rem, 7vw, 6rem)' }}>
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8 }}
            className="text-label"
            style={{ marginBottom: '1rem', color: 'var(--accent-rose)', letterSpacing: '0.25em' }}
          >
            Memories in Frame
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.15, duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="font-display gradient-text-soft"
            style={{ fontSize: 'clamp(2.5rem, 6vw, 5.5rem)', fontWeight: 300, lineHeight: 1.05 }}
          >
            A Wall of Memories
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="font-inter"
            style={{
              marginTop: '1rem',
              color: 'var(--text-muted)',
              fontSize: 'clamp(0.85rem, 1.5vw, 1rem)',
              fontWeight: 300,
            }}
          >
            Every snapshot holds a story worth keeping forever.
          </motion.p>
        </div>

        {/* Gallery Grid: Elegant responsive 3-column / 2-column layout */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 340px), 1fr))',
            gap: 'clamp(1.25rem, 2.5vw, 2rem)',
          }}
        >
          {galleryData.map((item, i) => (
            <GalleryCard
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

function GalleryCard({
  item,
  index,
  onClick,
}: {
  item: (typeof galleryData)[0]
  index: number
  onClick: () => void
}) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '40px' })
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 15 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: (index % 3) * 0.05, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onClick()}
      aria-label={`View photo: ${item.alt}`}
      style={{
        position: 'relative',
        borderRadius: '16px',
        overflow: 'hidden',
        aspectRatio: '3 / 4',
        cursor: 'pointer',
        background: '#120810',
        border: `1px solid ${hovered ? 'rgba(255, 111, 159, 0.4)' : 'rgba(255, 111, 159, 0.1)'}`,
        boxShadow: hovered
          ? '0 12px 36px -8px rgba(255, 77, 125, 0.25)'
          : '0 4px 20px -4px rgba(0, 0, 0, 0.6)',
        transition: 'border-color 0.4s ease, box-shadow 0.4s ease, transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        transform: hovered ? 'translateY(-6px)' : 'translateY(0)',
      }}
    >
      {/* Image with proper focal positioning */}
      <motion.div
        animate={{ scale: hovered ? 1.05 : 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        style={{ width: '100%', height: '100%', position: 'relative' }}
      >
        <Image
          src={item.src}
          alt={item.alt}
          fill
          priority={index < 3}
          style={{
            objectFit: 'cover',
            objectPosition: item.position || 'center top',
          }}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </motion.div>

      {/* Dark gradient overlay for text legibility */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to top, rgba(5, 3, 6, 0.88) 0%, rgba(5, 3, 6, 0.2) 50%, rgba(5, 3, 6, 0.3) 100%)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '1.25rem 1.5rem',
          pointerEvents: 'none',
        }}
      >
        {/* Top bar with index badge */}
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <span
            style={{
              fontSize: '0.625rem',
              letterSpacing: '0.15em',
              fontWeight: 500,
              padding: '0.25rem 0.625rem',
              borderRadius: '9999px',
              background: 'rgba(5, 3, 6, 0.65)',
              backdropFilter: 'blur(8px)',
              border: '1px solid rgba(255, 111, 159, 0.2)',
              color: 'var(--accent-blush)',
            }}
          >
            {String(index + 1).padStart(2, '0')}
          </span>
        </div>

        {/* Bottom caption */}
        <div>
          <p
            className="font-display"
            style={{
              fontSize: '1.125rem',
              fontStyle: 'italic',
              fontWeight: 400,
              color: 'var(--text-primary)',
              lineHeight: 1.3,
              marginBottom: '0.25rem',
              transform: hovered ? 'translateY(0)' : 'translateY(2px)',
              transition: 'transform 0.3s ease',
            }}
          >
            {item.caption}
          </p>
          <span
            style={{
              fontSize: '0.65rem',
              color: 'var(--accent-rose)',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              opacity: hovered ? 1 : 0.6,
              transition: 'opacity 0.3s ease',
            }}
          >
            Tap to expand ↗
          </span>
        </div>
      </div>
    </motion.div>
  )
}
