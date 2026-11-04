'use client';

import React, { useRef, useMemo } from 'react';
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
  const topLedMatRef = useRef<THREE.MeshStandardMaterial>(null);

  // Generate High-Definition Procedural Textures
  const { carbonTex, finsTex, pcbTex, fan1HubTex, fan2HubTex, topLogoTex } = useMemo(() => {
    if (typeof document === 'undefined') {
      return {
        carbonTex: null,
        finsTex: null,
        pcbTex: null,
        fan1HubTex: null,
        fan2HubTex: null,
        topLogoTex: null,
      };
    }

    // 1. Carbon Fiber Weave Texture (High-Tech Composite)
    const carbonCanvas = document.createElement('canvas');
    carbonCanvas.width = 128;
    carbonCanvas.height = 128;
    const cCtx = carbonCanvas.getContext('2d');
    if (cCtx) {
      cCtx.fillStyle = '#060a12';
      cCtx.fillRect(0, 0, 128, 128);

      const gradA = cCtx.createLinearGradient(0, 0, 64, 64);
      gradA.addColorStop(0, '#1c283d');
      gradA.addColorStop(0.5, '#0b111e');
      gradA.addColorStop(1, '#253550');

      const gradB = cCtx.createLinearGradient(64, 0, 128, 64);
      gradB.addColorStop(0, '#0a0f1b');
      gradB.addColorStop(0.5, '#1e2d46');
      gradB.addColorStop(1, '#0e1626');

      cCtx.fillStyle = gradA;
      cCtx.fillRect(0, 0, 64, 64);
      cCtx.fillRect(64, 64, 64, 64);

      cCtx.fillStyle = gradB;
      cCtx.fillRect(64, 0, 64, 64);
      cCtx.fillRect(0, 64, 64, 64);

      // Fine carbon micro-weave threads
      cCtx.strokeStyle = 'rgba(0, 240, 255, 0.08)';
      cCtx.lineWidth = 1;
      for (let i = 0; i < 128; i += 6) {
        cCtx.beginPath();
        cCtx.moveTo(0, i);
        cCtx.lineTo(128, i);
        cCtx.stroke();
      }
    }
    const cTex = new THREE.CanvasTexture(carbonCanvas);
    cTex.wrapS = THREE.RepeatWrapping;
    cTex.wrapT = THREE.RepeatWrapping;
    cTex.repeat.set(8, 4);

    // 2. Aluminum Cooling Fin Array Texture (Radiator Grill)
    const finCanvas = document.createElement('canvas');
    finCanvas.width = 128;
    finCanvas.height = 256;
    const fCtx = finCanvas.getContext('2d');
    if (fCtx) {
      fCtx.fillStyle = '#05070c';
      fCtx.fillRect(0, 0, 128, 256);

      for (let y = 0; y < 256; y += 4) {
        // Deep shadow gap between fins
        fCtx.fillStyle = '#020306';
        fCtx.fillRect(0, y, 128, 1.8);

        // Aluminum fin edge highlight
        const finGrad = fCtx.createLinearGradient(0, y + 1.8, 128, y + 4);
        finGrad.addColorStop(0, '#475569');
        finGrad.addColorStop(0.5, '#cbd5e1');
        finGrad.addColorStop(1, '#64748b');
        fCtx.fillStyle = finGrad;
        fCtx.fillRect(0, y + 1.8, 128, 2.2);
      }
    }
    const fTex = new THREE.CanvasTexture(finCanvas);
    fTex.wrapS = THREE.RepeatWrapping;
    fTex.wrapT = THREE.RepeatWrapping;
    fTex.repeat.set(5, 1);

    // 3. PCB Circuit Board Traces & Gold Vias
    const pcbCanvas = document.createElement('canvas');
    pcbCanvas.width = 512;
    pcbCanvas.height = 256;
    const pCtx = pcbCanvas.getContext('2d');
    if (pCtx) {
      // Dark matte solder mask
      pCtx.fillStyle = '#060b13';
      pCtx.fillRect(0, 0, 512, 256);

      // Solder traces in neon cyan & gold
      pCtx.lineWidth = 1.5;
      pCtx.strokeStyle = 'rgba(0, 240, 255, 0.45)';
      for (let x = 30; x < 500; x += 40) {
        pCtx.beginPath();
        pCtx.moveTo(x, 25);
        pCtx.lineTo(x + 20, 70);
        pCtx.lineTo(x + 80, 70);
        pCtx.lineTo(x + 120, 160);
        pCtx.lineTo(x + 60, 220);
        pCtx.stroke();

        // Golden solder via pads
        pCtx.fillStyle = '#f59e0b';
        pCtx.beginPath();
        pCtx.arc(x + 80, 70, 2.5, 0, Math.PI * 2);
        pCtx.fill();
        pCtx.beginPath();
        pCtx.arc(x + 120, 160, 2.5, 0, Math.PI * 2);
        pCtx.fill();
      }

      // Printed Silkscreen
      pCtx.fillStyle = 'rgba(255, 255, 255, 0.7)';
      pCtx.font = 'bold 11px monospace';
      pCtx.fillText('BYTE FIX // PERFORMANCE LAB · PCB REV 4.2', 36, 220);
      pCtx.fillText('ZERO DELAY TIMING ARCHITECTURE · GDDR6X', 36, 236);
    }
    const pTex = new THREE.CanvasTexture(pcbCanvas);

    // 4. Fan Center Metallic Badges
    const makeFanBadge = (accentColor: string, subText: string) => {
      const fbCanvas = document.createElement('canvas');
      fbCanvas.width = 256;
      fbCanvas.height = 256;
      const bCtx = fbCanvas.getContext('2d');
      if (!bCtx) return null;

      // Radial brushed dark metal
      const rad = bCtx.createRadialGradient(128, 128, 15, 128, 128, 128);
      rad.addColorStop(0, '#1e293b');
      rad.addColorStop(0.6, '#0b1120');
      rad.addColorStop(1, '#020617');
      bCtx.fillStyle = rad;
      bCtx.fillRect(0, 0, 256, 256);

      // Glowing Hexagon Logo
      bCtx.strokeStyle = accentColor;
      bCtx.lineWidth = 7;
      bCtx.shadowColor = accentColor;
      bCtx.shadowBlur = 14;
      bCtx.beginPath();
      const radius = 48;
      for (let i = 0; i < 6; i++) {
        const ang = (i * Math.PI) / 3;
        const x = 128 + radius * Math.cos(ang);
        const y = 128 + radius * Math.sin(ang);
        if (i === 0) bCtx.moveTo(x, y);
        else bCtx.lineTo(x, y);
      }
      bCtx.closePath();
      bCtx.stroke();

      // Inner glowing core
      bCtx.fillStyle = accentColor;
      bCtx.beginPath();
      bCtx.arc(128, 128, 10, 0, Math.PI * 2);
      bCtx.fill();

      // Outer bezel ring
      bCtx.shadowBlur = 0;
      bCtx.strokeStyle = 'rgba(255, 255, 255, 0.25)';
      bCtx.lineWidth = 3;
      bCtx.beginPath();
      bCtx.arc(128, 128, 115, 0, Math.PI * 2);
      bCtx.stroke();

      // Labeling
      bCtx.fillStyle = '#94a3b8';
      bCtx.font = 'bold 12px monospace';
      bCtx.textAlign = 'center';
      bCtx.fillText(subText, 128, 222);

      return new THREE.CanvasTexture(fbCanvas);
    };

    const f1Hub = makeFanBadge('#00f0ff', 'BYTE FIX // TURBO');
    const f2Hub = makeFanBadge('#00ff88', 'ZERO DELAY // PRO');

    // 5. Top RGB Lightbar Texture ("BYTE FIX // GEFORCE PRO")
    const topCanvas = document.createElement('canvas');
    topCanvas.width = 512;
    topCanvas.height = 64;
    const tCtx = topCanvas.getContext('2d');
    if (tCtx) {
      tCtx.fillStyle = '#060a12';
      tCtx.fillRect(0, 0, 512, 64);

      tCtx.font = 'bold 22px monospace';
      tCtx.textAlign = 'center';
      tCtx.textBaseline = 'middle';
      tCtx.shadowColor = '#00f0ff';
      tCtx.shadowBlur = 18;
      tCtx.fillStyle = '#ffffff';
      tCtx.fillText('BYTE FIX  //  RTX 4090 SUPER LAB', 256, 32);
    }
    const tTex = new THREE.CanvasTexture(topCanvas);

    return {
      carbonTex: cTex,
      finsTex: fTex,
      pcbTex: pTex,
      fan1HubTex: f1Hub,
      fan2HubTex: f2Hub,
      topLogoTex: tTex,
    };
  }, []);

  // Frame animation: fan rotation & RGB pulse
  useFrame((state, delta) => {
    const speed = isMobile ? 7 : 11;
    if (fan1Ref.current) fan1Ref.current.rotation.z += delta * speed;
    if (fan2Ref.current) fan2Ref.current.rotation.z += delta * speed;

    // Organic idle floating oscillation
    if (groupRef.current) {
      groupRef.current.position.y = -0.15 + Math.sin(state.clock.elapsedTime * 1.2) * 0.05;
      groupRef.current.rotation.y = -0.32 + Math.sin(state.clock.elapsedTime * 0.7) * 0.08;
      groupRef.current.rotation.x = 0.14 + Math.cos(state.clock.elapsedTime * 0.6) * 0.05;
    }

    // Dynamic LED RGB color breathing (Cyan <-> Emerald)
    if (rgbLightRef.current) {
      const t = (Math.sin(state.clock.elapsedTime * 2.2) + 1) / 2;
      const col = new THREE.Color().setHSL(0.5 + t * 0.1, 1, 0.55);
      rgbLightRef.current.color = col;
      rgbLightRef.current.intensity = 2.8 + t * 1.6;

      if (topLedMatRef.current) {
        topLedMatRef.current.emissive = col;
        topLedMatRef.current.emissiveIntensity = 2.0 + t * 1.5;
      }
    }
  });

  return (
    <group
      ref={groupRef}
      scale={isMobile ? 0.92 : 1.25}
      position={[0, -0.15, 0]}
      rotation={[0.14, -0.32, 0.02]}
    >
      {/* 1. Point Light from the Card Center to create specular highlights on fans and shroud */}
      <pointLight ref={rgbLightRef} position={[0, 0, 1.4]} distance={5} intensity={3.5} color="#00f0ff" />

      {/* 2. PCB BACKPLATE with Carbon Fiber & Printed Circuit Textures */}
      <mesh position={[0, 0, -0.22]}>
        <boxGeometry args={[4.4, 2.25, 0.08]} />
        <meshStandardMaterial
          color="#0a0f1d"
          map={carbonTex || undefined}
          bumpMap={carbonTex || undefined}
          bumpScale={0.04}
          roughness={0.4}
          metalness={0.7}
        />
      </mesh>

      {/* PCB Circuit Trace Underlayer (visible from top and bottom edges) */}
      <mesh position={[0, 0, -0.16]}>
        <boxGeometry args={[4.45, 2.3, 0.04]} />
        <meshStandardMaterial
          color="#070c16"
          map={pcbTex || undefined}
          roughness={0.3}
          metalness={0.8}
        />
      </mesh>

      {/* 3. HEATSINK ALUMINUM FIN STACK (Micro-Fin Array with Specular Texture) */}
      <mesh position={[0, 0, 0.02]}>
        <boxGeometry args={[4.1, 1.95, 0.36]} />
        <meshStandardMaterial
          color="#cbd5e1"
          map={finsTex || undefined}
          bumpMap={finsTex || undefined}
          bumpScale={0.08}
          roughness={0.2}
          metalness={0.92}
        />
      </mesh>

      {/* 4. HEAVY COPPER HEATPIPES (Curved loops protruding from fins) */}
      {/* Top Main Heatpipe */}
      <mesh position={[0, 0.52, 0.22]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.075, 0.075, 4.25, 24]} />
        <meshStandardMaterial
          color="#d97706"
          roughness={0.15}
          metalness={0.96}
        />
      </mesh>
      {/* Mid-Upper Heatpipe */}
      <mesh position={[0, 0.2, 0.22]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.065, 0.065, 4.15, 24]} />
        <meshStandardMaterial
          color="#ea580c"
          roughness={0.15}
          metalness={0.96}
        />
      </mesh>
      {/* Mid-Lower Heatpipe */}
      <mesh position={[0, -0.2, 0.22]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.065, 0.065, 4.15, 24]} />
        <meshStandardMaterial
          color="#ea580c"
          roughness={0.15}
          metalness={0.96}
        />
      </mesh>
      {/* Bottom Heatpipe */}
      <mesh position={[0, -0.52, 0.22]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.075, 0.075, 4.25, 24]} />
        <meshStandardMaterial
          color="#d97706"
          roughness={0.15}
          metalness={0.96}
        />
      </mesh>

      {/* Heatpipe Copper End-Caps / Return Loops */}
      <mesh position={[2.14, 0.52, 0.22]}>
        <sphereGeometry args={[0.075, 16, 16]} />
        <meshStandardMaterial color="#d97706" roughness={0.15} metalness={0.96} />
      </mesh>
      <mesh position={[2.14, -0.52, 0.22]}>
        <sphereGeometry args={[0.075, 16, 16]} />
        <meshStandardMaterial color="#d97706" roughness={0.15} metalness={0.96} />
      </mesh>

      {/* 5. MATTE OBSIDIAN & BRUSHED METAL CHASSIS SHROUD */}
      <mesh position={[0, 0, 0.24]}>
        <boxGeometry args={[4.25, 2.15, 0.14]} />
        <meshStandardMaterial
          color="#0b1120"
          map={carbonTex || undefined}
          bumpMap={carbonTex || undefined}
          bumpScale={0.02}
          roughness={0.45}
          metalness={0.8}
        />
      </mesh>

      {/* Geometric Chamfer Inset Plates (Anodized Slate) */}
      <mesh position={[0, 0.88, 0.32]}>
        <boxGeometry args={[3.8, 0.16, 0.04]} />
        <meshStandardMaterial color="#1e293b" roughness={0.3} metalness={0.9} />
      </mesh>
      <mesh position={[0, -0.88, 0.32]}>
        <boxGeometry args={[3.8, 0.16, 0.04]} />
        <meshStandardMaterial color="#1e293b" roughness={0.3} metalness={0.9} />
      </mesh>

      {/* 6. FAN SHROUD COWLINGS (Dual Large Fan Wells) */}
      {/* Left Fan Duct Ring */}
      <mesh position={[-1.12, 0, 0.32]}>
        <cylinderGeometry args={[0.92, 0.92, 0.08, 48]} />
        <meshStandardMaterial color="#030712" roughness={0.6} metalness={0.6} />
      </mesh>
      {/* Left Glowing Accent Ring */}
      <mesh position={[-1.12, 0, 0.37]}>
        <torusGeometry args={[0.9, 0.015, 16, 48]} />
        <meshStandardMaterial
          color="#00f0ff"
          emissive="#00f0ff"
          emissiveIntensity={2.5}
          roughness={0.1}
        />
      </mesh>

      {/* Right Fan Duct Ring */}
      <mesh position={[1.12, 0, 0.32]}>
        <cylinderGeometry args={[0.92, 0.92, 0.08, 48]} />
        <meshStandardMaterial color="#030712" roughness={0.6} metalness={0.6} />
      </mesh>
      {/* Right Glowing Accent Ring */}
      <mesh position={[1.12, 0, 0.37]}>
        <torusGeometry args={[0.9, 0.015, 16, 48]} />
        <meshStandardMaterial
          color="#00ff88"
          emissive="#00ff88"
          emissiveIntensity={2.5}
          roughness={0.1}
        />
      </mesh>

      {/* 7. HIGH-PERFORMANCE ROTOR FANS WITH AERODYNAMIC BLADES */}
      {/* FAN 1 (Left Turbo Rotor) */}
      <group ref={fan1Ref} position={[-1.12, 0, 0.39]}>
        {/* Hub / Center Motor with Byte Fix Holographic Badge */}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.34, 0.34, 0.06, 32]} />
          <meshStandardMaterial
            color="#ffffff"
            map={fan1HubTex || undefined}
            roughness={0.2}
            metalness={0.85}
          />
        </mesh>

        {/* 11 Swept Aerodynamic Blades with Grooved Surface */}
        {Array.from({ length: 11 }).map((_, i) => {
          const angle = (i / 11) * Math.PI * 2;
          return (
            <mesh
              key={i}
              position={[Math.cos(angle) * 0.56, Math.sin(angle) * 0.56, 0]}
              rotation={[0.35, 0.22, angle]}
            >
              <boxGeometry args={[0.52, 0.18, 0.025]} />
              <meshStandardMaterial
                color="#0f172a"
                roughness={0.25}
                metalness={0.7}
              />
            </mesh>
          );
        })}
      </group>

      {/* FAN 2 (Right Zero-Delay Rotor) */}
      <group ref={fan2Ref} position={[1.12, 0, 0.39]}>
        {/* Hub / Center Motor with Zero Delay Badge */}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.34, 0.34, 0.06, 32]} />
          <meshStandardMaterial
            color="#ffffff"
            map={fan2HubTex || undefined}
            roughness={0.2}
            metalness={0.85}
          />
        </mesh>

        {/* 11 Swept Blades */}
        {Array.from({ length: 11 }).map((_, i) => {
          const angle = (i / 11) * Math.PI * 2;
          return (
            <mesh
              key={i}
              position={[Math.cos(angle) * 0.56, Math.sin(angle) * 0.56, 0]}
              rotation={[0.35, 0.22, angle]}
            >
              <boxGeometry args={[0.52, 0.18, 0.025]} />
              <meshStandardMaterial
                color="#0f172a"
                roughness={0.25}
                metalness={0.7}
              />
            </mesh>
          );
        })}
      </group>

      {/* 8. TOP ILLUMINATED RGB ACRYLIC LIGHTBAR ("BYTE FIX // RTX 4090 SUPER LAB") */}
      <mesh position={[0, 1.08, 0.15]} rotation={[-0.3, 0, 0]}>
        <boxGeometry args={[3.6, 0.18, 0.06]} />
        <meshStandardMaterial
          ref={topLedMatRef}
          color="#00f0ff"
          emissive="#00f0ff"
          emissiveIntensity={2.8}
          map={topLogoTex || undefined}
          roughness={0.1}
          metalness={0.5}
        />
      </mesh>

      {/* Top Acrylic Diffuser Strip */}
      <mesh position={[0, 1.15, 0.12]}>
        <boxGeometry args={[3.8, 0.04, 0.05]} />
        <meshStandardMaterial
          color="#ffffff"
          emissive="#00f0ff"
          emissiveIntensity={1.8}
          roughness={0.1}
        />
      </mesh>

      {/* 9. PCI-E 4.0 GOLDEN CONNECTOR PINS WITH NOTCH */}
      <mesh position={[-0.9, -1.18, -0.16]}>
        <boxGeometry args={[1.5, 0.14, 0.04]} />
        <meshStandardMaterial
          color="#f59e0b"
          roughness={0.12}
          metalness={0.96}
        />
      </mesh>
      {/* PCIe Secondary Finger */}
      <mesh position={[0.5, -1.18, -0.16]}>
        <boxGeometry args={[0.8, 0.14, 0.04]} />
        <meshStandardMaterial
          color="#f59e0b"
          roughness={0.12}
          metalness={0.96}
        />
      </mesh>

      {/* 10. STAINLESS STEEL DUAL-SLOT I/O BRACKET (On Left Edge) */}
      <group position={[-2.22, 0, 0.04]}>
        {/* Metal Bracket Plate */}
        <mesh>
          <boxGeometry args={[0.06, 2.45, 0.6]} />
          <meshStandardMaterial
            color="#94a3b8"
            roughness={0.2}
            metalness={0.95}
          />
        </mesh>
        {/* Top Screw Retention Tab */}
        <mesh position={[0, 1.3, 0.12]}>
          <boxGeometry args={[0.06, 0.22, 0.32]} />
          <meshStandardMaterial color="#94a3b8" roughness={0.2} metalness={0.95} />
        </mesh>
        {/* DisplayPort Cutouts */}
        <mesh position={[-0.035, 0.35, 0]}>
          <boxGeometry args={[0.02, 0.16, 0.28]} />
          <meshStandardMaterial color="#020617" roughness={0.9} />
        </mesh>
        <mesh position={[-0.035, -0.15, 0]}>
          <boxGeometry args={[0.02, 0.16, 0.28]} />
          <meshStandardMaterial color="#020617" roughness={0.9} />
        </mesh>
        {/* HDMI Port Cutout with Golden Contact */}
        <mesh position={[-0.035, -0.65, 0]}>
          <boxGeometry args={[0.02, 0.14, 0.24]} />
          <meshStandardMaterial color="#d97706" roughness={0.2} metalness={0.9} />
        </mesh>
      </group>
    </group>
  );
}
