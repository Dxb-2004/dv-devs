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
          camera={{ position: [0, 0, 5.2], fov: 45 }}
          dpr={isMobile ? [1, 1.5] : [1, 2]}
          gl={{
            antialias: !isMobile,
            alpha: true,
            powerPreference: 'high-performance',
          }}
          className="w-full h-full"
        >
          {/* Ambient & Rim Key Lights */}
          <ambientLight intensity={0.8} />
          <directionalLight position={[5, 6, 4]} intensity={2.2} color="#ffffff" />
          <directionalLight position={[-5, -4, -3]} intensity={1.5} color="#00f0ff" />
          <directionalLight position={[0, -5, 3]} intensity={1.2} color="#00ff88" />

          {/* Interactive Tilt and Float */}
          <PresentationControls
            global
            snap
            speed={1.5}
            zoom={1}
            rotation={[0, -0.2, 0]}
            polar={[-Math.PI / 8, Math.PI / 8]}
            azimuth={[-Math.PI / 4, Math.PI / 4]}
          >
            <Float
              speed={1.8}
              rotationIntensity={isMobile ? 0.2 : 0.5}
              floatIntensity={isMobile ? 0.3 : 0.7}
            >
              <HardwareModel isMobile={isMobile} />
            </Float>
          </PresentationControls>

          {/* Subtle Ground Ambient Shadow */}
          <ContactShadows
            position={[0, -1.8, 0]}
            opacity={0.65}
            scale={6}
            blur={2.4}
            far={4}
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
        Optimizando buffers GPU
      </span>
    </div>
  );
}
