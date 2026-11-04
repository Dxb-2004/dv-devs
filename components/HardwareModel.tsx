'use client';

import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface HardwareModelProps {
  isMobile?: boolean;
}

export default function HardwareModel({ isMobile = false }: HardwareModelProps) {
  const groupRef = useRef<THREE.Group>(null);
  const fan1Ref = useRef<THREE.Group>(null);
  const fan2Ref = useRef<THREE.Group>(null);
  const rgbLightRef = useRef<THREE.PointLight>(null);

  // Animate fans rotation and RGB light breathing
  useFrame((state, delta) => {
    const speed = isMobile ? 6 : 10;
    if (fan1Ref.current) fan1Ref.current.rotation.z += delta * speed;
    if (fan2Ref.current) fan2Ref.current.rotation.z += delta * speed;

    // Subtle thermal oscillation on Y/X
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.6) * 0.15;
      groupRef.current.rotation.x = Math.cos(state.clock.elapsedTime * 0.5) * 0.08;
    }

    // Dynamic LED RGB breathing (Cyan to Emerald)
    if (rgbLightRef.current) {
      const t = (Math.sin(state.clock.elapsedTime * 2) + 1) / 2;
      rgbLightRef.current.color.setHSL(0.5 + t * 0.1, 1, 0.55);
      rgbLightRef.current.intensity = 2.5 + t * 1.5;
    }
  });

  return (
    <group ref={groupRef} scale={isMobile ? 0.85 : 1.15} position={[0, -0.2, 0]}>
      {/* Dynamic Thermal / Performance Point Light */}
      <pointLight ref={rgbLightRef} position={[0, 0, 1.2]} distance={4} intensity={3} color="#00f0ff" />

      {/* PCB Backplate (Obsidian Carbon Fiber finish) */}
      <mesh position={[0, 0, -0.2]}>
        <boxGeometry args={[4.2, 2.2, 0.08]} />
        <meshStandardMaterial
          color="#070b14"
          roughness={0.4}
          metalness={0.7}
        />
      </mesh>

      {/* Heatsink Aluminum Fin Stack */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[3.8, 1.8, 0.35]} />
        <meshStandardMaterial
          color="#1e293b"
          roughness={0.25}
          metalness={0.9}
        />
      </mesh>

      {/* Copper Heatpipes passing through the heatsink */}
      <mesh position={[0, 0.45, 0.22]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.06, 0.06, 3.9, 16]} />
        <meshStandardMaterial color="#d97706" roughness={0.15} metalness={0.95} />
      </mesh>
      <mesh position={[0, -0.45, 0.22]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.06, 0.06, 3.9, 16]} />
        <meshStandardMaterial color="#d97706" roughness={0.15} metalness={0.95} />
      </mesh>

      {/* Shroud Outer Bezel (Sleek Matte Obsidian with Chamfered Edges) */}
      <mesh position={[0, 0, 0.22]}>
        <boxGeometry args={[4.0, 2.0, 0.12]} />
        <meshStandardMaterial
          color="#0a0e1a"
          roughness={0.5}
          metalness={0.8}
        />
      </mesh>

      {/* Left Fan Shroud Opening */}
      <mesh position={[-1.05, 0, 0.3]}>
        <cylinderGeometry args={[0.82, 0.82, 0.06, 32]} />
        <meshStandardMaterial color="#05070b" roughness={0.8} />
      </mesh>

      {/* Right Fan Shroud Opening */}
      <mesh position={[1.05, 0, 0.3]}>
        <cylinderGeometry args={[0.82, 0.82, 0.06, 32]} />
        <meshStandardMaterial color="#05070b" roughness={0.8} />
      </mesh>

      {/* FAN 1 (Left Rotor & Blades) */}
      <group ref={fan1Ref} position={[-1.05, 0, 0.36]}>
        {/* Hub / Center Motor */}
        <mesh>
          <cylinderGeometry args={[0.26, 0.26, 0.08, 24]} />
          <meshStandardMaterial color="#00f0ff" roughness={0.2} metalness={0.9} />
        </mesh>
        {/* 9 Aerodynamic Fan Blades */}
        {Array.from({ length: 9 }).map((_, i) => {
          const angle = (i / 9) * Math.PI * 2;
          return (
            <mesh
              key={i}
              position={[Math.cos(angle) * 0.46, Math.sin(angle) * 0.46, 0]}
              rotation={[0.3, 0.2, angle]}
            >
              <boxGeometry args={[0.42, 0.16, 0.02]} />
              <meshStandardMaterial color="#0f172a" roughness={0.3} metalness={0.6} />
            </mesh>
          );
        })}
      </group>

      {/* FAN 2 (Right Rotor & Blades) */}
      <group ref={fan2Ref} position={[1.05, 0, 0.36]}>
        {/* Hub / Center Motor */}
        <mesh>
          <cylinderGeometry args={[0.26, 0.26, 0.08, 24]} />
          <meshStandardMaterial color="#00ff88" roughness={0.2} metalness={0.9} />
        </mesh>
        {/* 9 Fan Blades */}
        {Array.from({ length: 9 }).map((_, i) => {
          const angle = (i / 9) * Math.PI * 2;
          return (
            <mesh
              key={i}
              position={[Math.cos(angle) * 0.46, Math.sin(angle) * 0.46, 0]}
              rotation={[0.3, 0.2, angle]}
            >
              <boxGeometry args={[0.42, 0.16, 0.02]} />
              <meshStandardMaterial color="#0f172a" roughness={0.3} metalness={0.6} />
            </mesh>
          );
        })}
      </group>

      {/* Illuminated Edge / Byte Fix LED Lightbar */}
      <mesh position={[0, 0.95, 0.26]}>
        <boxGeometry args={[3.2, 0.06, 0.05]} />
        <meshStandardMaterial
          color="#00f0ff"
          emissive="#00f0ff"
          emissiveIntensity={2.5}
        />
      </mesh>

      {/* PCI-E Express Golden Connector Pins */}
      <mesh position={[-0.8, -1.06, -0.2]}>
        <boxGeometry args={[1.8, 0.12, 0.04]} />
        <meshStandardMaterial color="#eab308" roughness={0.1} metalness={0.95} />
      </mesh>
    </group>
  );
}
