'use client'
import { useMemo, useRef } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Float } from '@react-three/drei'
import * as THREE from 'three'

function RealisticGlassHeart() {
  const meshRef = useRef<THREE.Mesh>(null)
  const { mouse } = useThree()

  // Generate an authentic parametric 3D Heart Geometry
  const geometry = useMemo(() => {
    const shape = new THREE.Shape()
    // True geometric heart curve
    shape.moveTo(0, 0.35)
    shape.bezierCurveTo(0, 0.65, 0.45, 0.95, 0.8, 0.65)
    shape.bezierCurveTo(1.15, 0.35, 1.05, -0.05, 0.7, -0.45)
    shape.bezierCurveTo(0.4, -0.8, 0, -1.15, 0, -1.25)
    shape.bezierCurveTo(0, -1.15, -0.4, -0.8, -0.7, -0.45)
    shape.bezierCurveTo(-1.05, -0.05, -1.15, 0.35, -0.8, 0.65)
    shape.bezierCurveTo(-0.45, 0.95, 0, 0.65, 0, 0.35)

    const extrudeSettings: THREE.ExtrudeGeometryOptions = {
      depth: 0.3,
      bevelEnabled: true,
      bevelSegments: 16,
      steps: 2,
      bevelSize: 0.18,
      bevelThickness: 0.18,
      curveSegments: 64,
    }

    const geo = new THREE.ExtrudeGeometry(shape, extrudeSettings)
    geo.center()
    // Scale to ideal proportion
    geo.scale(0.85, 0.85, 0.85)
    return geo
  }, [])

  useFrame((state) => {
    if (!meshRef.current) return
    const t = state.clock.getElapsedTime()

    // Smooth subtle continuous 3D rotation
    meshRef.current.rotation.y = Math.sin(t * 0.5) * 0.45
    meshRef.current.rotation.x = Math.cos(t * 0.4) * 0.15

    // Smooth mouse follow interaction
    meshRef.current.rotation.y += (mouse.x * 0.4 - meshRef.current.rotation.y) * 0.05
    meshRef.current.rotation.x += (-mouse.y * 0.3 - meshRef.current.rotation.x) * 0.05

    // Gentle romantic heartbeat pulse
    const pulse = 1 + Math.sin(t * 2.2) * 0.04 + Math.sin(t * 4.4) * 0.02
    meshRef.current.scale.set(pulse, pulse, pulse)
  })

  return (
    <mesh ref={meshRef} geometry={geometry}>
      <meshPhysicalMaterial
        color="#FF3366"
        emissive="#7A0026"
        emissiveIntensity={0.55}
        roughness={0.08}
        metalness={0.15}
        clearcoat={1.0}
        clearcoatRoughness={0.1}
        transmission={0.45}
        thickness={1.2}
        ior={1.52}
        reflectivity={0.9}
        transparent={true}
        opacity={0.95}
      />
    </mesh>
  )
}

export default function FloatingHeart3D() {
  return (
    <Canvas
      camera={{ position: [0, 0, 3.2], fov: 45 }}
      style={{ background: 'transparent', width: '100%', height: '100%' }}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      dpr={[1, 2]}
    >
      <ambientLight intensity={0.8} />
      {/* Dynamic colorful lights for jewel-like ruby highlights */}
      <pointLight position={[3, 3, 3]} intensity={2.5} color="#FFA3C2" />
      <pointLight position={[-3, -2, -1]} intensity={1.8} color="#990033" />
      <pointLight position={[0, 2, -2]} intensity={1.2} color="#FF6699" />
      <directionalLight position={[0, 4, 2]} intensity={1.5} color="#FFFFFF" />

      <Float speed={2} rotationIntensity={0.4} floatIntensity={0.6}>
        <RealisticGlassHeart />
      </Float>
    </Canvas>
  )
}
