'use client';

import React, { Suspense, useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { Float, PresentationControls, ContactShadows } from '@react-three/drei';
import HardwareModel from './HardwareModel';

export default function CanvasHardware3D() {
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  if (!mounted) {
    return <CanvasFallback />;
  }

  return (
    <div className="w-full h-full relative select-none">
      <Suspense fallback={<CanvasFallback />}>
        <Canvas
          camera={{ position: [0, 0, isMobile ? 5.6 : 5.0], fov: 45 }}
          dpr={isMobile ? [1, 1.5] : [1, 2]}
          gl={{
            antialias: true,
            alpha: true,
            powerPreference: 'high-performance',
          }}
          className="w-full h-full"
        >
          {/* Key and Fill Lights */}
          <ambientLight intensity={1.1} />
          <directionalLight position={[6, 7, 5]} intensity={2.8} color="#ffffff" />
          <directionalLight position={[-6, -3, -4]} intensity={2.0} color="#00f0ff" />
          <directionalLight position={[0, -5, 4]} intensity={1.5} color="#00ff88" />
          <pointLight position={[2, 3, 2]} intensity={2.2} color="#00f0ff" distance={7} />
          <pointLight position={[-3, -2, -1]} intensity={1.8} color="#f59e0b" distance={6} />

          {/* Interactive Tilt, Drag, and Inertial Float */}
          <PresentationControls
            global
            snap
            speed={1.6}
            zoom={1}
            rotation={[0.12, -0.34, 0.03]}
            polar={[-Math.PI / 5, Math.PI / 5]}
            azimuth={[-Math.PI / 3, Math.PI / 3]}
          >
            <Float
              speed={1.6}
              rotationIntensity={isMobile ? 0.15 : 0.35}
              floatIntensity={isMobile ? 0.25 : 0.55}
            >
              <HardwareModel isMobile={isMobile} />
            </Float>
          </PresentationControls>

          {/* Subtle Ground Ambient Shadow */}
          <ContactShadows
            position={[0, -1.85, 0]}
            opacity={0.75}
            scale={7.5}
            blur={2.2}
            far={4.5}
            color="#00f0ff"
          />
        </Canvas>
      </Suspense>
    </div>
  );
}

function CanvasFallback() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-bytefix-surface/50 border border-bytefix-border rounded-2xl animate-pulse p-6">
      <div className="w-16 h-16 rounded-full border-2 border-bytefix-cyan/40 border-t-bytefix-cyan animate-spin mb-4" />
      <span className="text-xs font-mono text-bytefix-cyan tracking-wider uppercase">
        Iniciando Hardware 3D WebGL...
      </span>
      <span className="text-[11px] text-bytefix-slate mt-1 font-mono">
        Cargando texturas de alto rendimiento
      </span>
    </div>
  );
}
