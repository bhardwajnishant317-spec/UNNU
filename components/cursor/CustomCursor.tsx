'use client'
import { useEffect, useRef, useState } from 'react'

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const [isHovering, setIsHovering] = useState(false)
  const [isMagnetic, setIsMagnetic] = useState(false)
  const pos = useRef({ x: 0, y: 0 })
  const ring = useRef({ x: 0, y: 0 })
  const raf = useRef<number | undefined>(undefined)

  useEffect(() => {
    const isTouchDevice = window.matchMedia('(hover: none)').matches
    if (isTouchDevice) return

    const onMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY }
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`
      }
    }

    const onEnter = (e: MouseEvent) => {
      const t = e.target as HTMLElement
      const isInteractive = t.closest('button, a, [role="button"], input, .interactive')
      const isMag = t.closest('.magnetic, button, a')
      setIsHovering(!!isInteractive)
      setIsMagnetic(!!isMag)
    }

    const animate = () => {
      ring.current.x += (pos.current.x - ring.current.x) * 0.12
      ring.current.y += (pos.current.y - ring.current.y) * 0.12
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ring.current.x}px, ${ring.current.y}px) translate(-50%, -50%)`
      }
      raf.current = requestAnimationFrame(animate)
    }
    raf.current = requestAnimationFrame(animate)

    window.addEventListener('mousemove', onMove)
    document.addEventListener('mouseover', onEnter)

    return () => {
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseover', onEnter)
      if (raf.current) cancelAnimationFrame(raf.current)
    }
  }, [])

  return (
    <>
      {/* Dot */}
      <div
        ref={dotRef}
        aria-hidden="true"
        style={{
          position: 'fixed', top: 0, left: 0, zIndex: 99999,
          width: isHovering ? '8px' : '5px',
          height: isHovering ? '8px' : '5px',
          borderRadius: '50%',
          background: 'var(--accent-rose)',
          boxShadow: '0 0 8px var(--accent-rose)',
          pointerEvents: 'none',
          transition: 'width 0.2s ease, height 0.2s ease',
          willChange: 'transform',
        }}
      />
      {/* Ring */}
      <div
        ref={ringRef}
        aria-hidden="true"
        style={{
          position: 'fixed', top: 0, left: 0, zIndex: 99998,
          width: isHovering ? '44px' : '28px',
          height: isHovering ? '44px' : '28px',
          borderRadius: '50%',
          border: `1px solid rgba(255,111,159,${isHovering ? 0.6 : 0.3})`,
          pointerEvents: 'none',
          transition: 'width 0.3s ease, height 0.3s ease, border-color 0.3s ease',
          willChange: 'transform',
        }}
      />
    </>
  )
}
