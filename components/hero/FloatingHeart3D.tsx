'use client'
import { useRef, useEffect } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { MeshDistortMaterial, Environment } from '@react-three/drei'
import * as THREE from 'three'

function GlassHeart() {
  const meshRef = useRef<THREE.Mesh>(null)
  const { mouse } = useThree()

  // Create heart-like shape using TorusKnot as artistic stand-in
  useFrame((state) => {
    if (!meshRef.current) return
    meshRef.current.rotation.y += 0.005
    meshRef.current.rotation.x += 0.002
    // Mouse follow
    meshRef.current.rotation.x += (mouse.y * 0.3 - meshRef.current.rotation.x) * 0.05
    meshRef.current.rotation.y += (mouse.x * 0.3 - meshRef.current.rotation.y) * 0.05
    // Breathing
    const t = state.clock.getElapsedTime()
    meshRef.current.scale.setScalar(1 + Math.sin(t * 0.8) * 0.03)
  })

  return (
    <mesh ref={meshRef}>
      <torusKnotGeometry args={[0.6, 0.2, 128, 32, 2, 3]} />
      <MeshDistortMaterial
        color="#FF6F9F"
        emissive="#C4425A"
        emissiveIntensity={0.4}
        metalness={0.1}
        roughness={0}
        transmission={0.8}
        transparent
        opacity={0.7}
        distort={0.15}
        speed={1.5}
        thickness={1.5}
        envMapIntensity={2}
      />
    </mesh>
  )
}

export default function FloatingHeart3D() {
  return (
    <Canvas
      camera={{ position: [0, 0, 3], fov: 50 }}
      style={{ background: 'transparent', width: '100%', height: '100%' }}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.5} />
      <pointLight position={[2, 2, 2]} intensity={2} color="#FF9FC0" />
      <pointLight position={[-2, -1, -2]} intensity={1} color="#C4425A" />
      <Environment preset="night" />
      <GlassHeart />
    </Canvas>
  )
}
