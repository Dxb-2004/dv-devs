'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import {
  Gauge,
  Zap,
  ShieldCheck,
  Cpu,
  ArrowRight,
  MessageCircle,
  Activity,
  Star,
} from 'lucide-react';

// Lazy load the 3D Canvas with SSR disabled to guarantee smooth initial hydration
const CanvasHardware3D = dynamic(() => import('./CanvasHardware3D'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex flex-col items-center justify-center bg-bytefix-surface/40 border border-bytefix-border rounded-2xl p-6">
      <div className="w-12 h-12 rounded-full border-2 border-bytefix-cyan/40 border-t-bytefix-cyan animate-spin mb-3" />
      <span className="text-xs font-mono text-bytefix-cyan uppercase tracking-wider">
        Cargando Pipeline 3D...
      </span>
    </div>
  ),
});

export default function Hero3D() {
  return (
    <section className="relative min-h-[92vh] pt-28 pb-16 flex flex-col justify-center overflow-hidden bg-bytefix-obsidian">
      {/* Background Grids & Radial Circuit Glow */}
      <div className="absolute inset-0 bg-grid-pattern bg-[size:32px_32px] opacity-40 pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-bytefix-cyan/10 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-[450px] h-[450px] bg-bytefix-emerald/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Hero Content & CTAs (Figma Column Span 6) */}
          <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
            {/* Tag Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-bytefix-surface border border-bytefix-cyan/30 text-xs font-mono text-bytefix-cyan">
              <span className="w-2 h-2 rounded-full bg-bytefix-emerald animate-pulse" />
              <span>Esports Private Performance Club · Cero Latencia</span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.1]">
              Más que más FPS. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-bytefix-cyan via-white to-bytefix-emerald">
                Puesta a punto nivel Pro.
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-bytefix-slate max-w-xl mx-auto lg:mx-0 font-normal leading-relaxed">
              Optimizaciones 1 a 1 vía AnyDesk, mantenimiento térmico de alta gama y nuestro{' '}
              <strong className="text-bytefix-amber font-semibold">Software Propio Optimizer</strong>. 
              Eliminamos el stuttering, estabilizamos el 1% low y pulverizamos el input delay de tu PC.
            </p>

            {/* Social Proof Pill */}
            <div className="flex items-center justify-center lg:justify-start gap-3 pt-1">
              <div className="flex text-amber-400">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <span className="text-xs font-mono text-white tracking-wider">
                <strong>5.0</strong> · +150 PCs Optimizadas en Argentina
              </span>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-3">
              <Link
                href="/#software"
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-bytefix-amber hover:bg-yellow-400 text-black font-extrabold text-sm flex items-center justify-center gap-2.5 transition-all shadow-[0_0_25px_rgba(245,158,11,0.35)] hover:scale-[1.02]"
              >
                <Zap className="w-4 h-4 fill-current" />
                <span>Ver Software Propio ($30 USD)</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <a
                href="https://wa.me/5492914380467?text=Hola%20Byte%20Fix,%20quiero%20consultar%20por%20una%20optimizaci%C3%B3n"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-bytefix-surface hover:bg-bytefix-elevated text-white border border-bytefix-border hover:border-bytefix-cyan text-sm font-semibold flex items-center justify-center gap-2 transition-all shadow-panel-3d"
              >
                <MessageCircle className="w-4 h-4 text-bytefix-emerald" />
                <span>Hablar por WhatsApp</span>
              </a>
            </div>

            {/* Micro Feature Icons */}
            <div className="grid grid-cols-3 gap-3 pt-4 border-t border-white/5 text-xs font-mono text-bytefix-slate">
              <div className="flex items-center gap-2 justify-center lg:justify-start">
                <ShieldCheck className="w-4 h-4 text-bytefix-cyan" />
                <span>100% Seguro</span>
              </div>
              <div className="flex items-center gap-2 justify-center lg:justify-start">
                <Activity className="w-4 h-4 text-bytefix-emerald" />
                <span>Cero DPC Lag</span>
              </div>
              <div className="flex items-center gap-2 justify-center lg:justify-start">
                <Cpu className="w-4 h-4 text-bytefix-amber" />
                <span>AnyDesk o Presencial</span>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive 3D WebGL Viewport (Figma Column Span 6) */}
          <div className="lg:col-span-6 relative h-[420px] sm:h-[480px] lg:h-[540px] w-full flex items-center justify-center">
            {/* Circular Hologram Stage Rings */}
            <div className="absolute w-[340px] h-[340px] sm:w-[440px] sm:h-[440px] rounded-full border border-dashed border-bytefix-cyan/25 animate-spin-slow pointer-events-none" />
            <div className="absolute w-[380px] h-[380px] sm:w-[490px] sm:h-[490px] rounded-full border border-bytefix-amber/20 border-t-bytefix-cyan/60 animate-spin-reverse pointer-events-none" />

            {/* The 3D Canvas */}
            <CanvasHardware3D />

            {/* Floating Telemetry Badge 1: Top-Left FPS Gain (Desktop / Tablet) */}
            <div className="hidden sm:flex absolute top-2 sm:-top-2 left-0 sm:-left-4 bg-bytefix-surface/90 backdrop-blur-md border border-bytefix-cyan/40 rounded-xl p-3 shadow-panel-3d items-center gap-3 animate-pulse-subtle z-20 pointer-events-none">
              <div className="w-9 h-9 rounded-lg bg-bytefix-cyan/15 flex items-center justify-center text-bytefix-cyan shrink-0">
                <Gauge className="w-5 h-5" />
              </div>
              <div>
                <div className="text-[10px] font-mono text-bytefix-slate uppercase tracking-wider">
                  Ganancia de Frames
                </div>
                <div className="text-sm font-extrabold text-white font-mono text-bytefix-cyan">
                  +60 a 140 FPS
                </div>
              </div>
            </div>

            {/* Floating Telemetry Badge 2: Bottom-Right DPC Latency (Desktop / Tablet) */}
            <div className="hidden sm:flex absolute bottom-2 sm:-bottom-2 right-0 sm:-right-4 bg-bytefix-surface/90 backdrop-blur-md border border-bytefix-emerald/40 rounded-xl p-3 shadow-panel-3d items-center gap-3 z-20 pointer-events-none">
              <div className="w-9 h-9 rounded-lg bg-bytefix-emerald/15 flex items-center justify-center text-bytefix-emerald shrink-0">
                <Activity className="w-5 h-5" />
              </div>
              <div>
                <div className="text-[10px] font-mono text-bytefix-slate uppercase tracking-wider">
                  Latencia DPC de Sistema
                </div>
                <div className="text-sm font-extrabold text-bytefix-emerald font-mono">
                  &lt; 40µs ZERO DELAY
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Telemetry Metric Bar Ticker */}
        <div className="mt-16 pt-8 border-t border-bytefix-border grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="bg-bytefix-surface/60 border border-bytefix-border/60 rounded-xl p-4 text-center">
            <div className="text-2xl sm:text-3xl font-extrabold text-bytefix-cyan font-mono">
              +60 FPS
            </div>
            <div className="text-xs text-bytefix-slate font-mono uppercase tracking-wider mt-1">
              Ganancia Media en Juegos
            </div>
          </div>
          <div className="bg-bytefix-surface/60 border border-bytefix-border/60 rounded-xl p-4 text-center">
            <div className="text-2xl sm:text-3xl font-extrabold text-bytefix-emerald font-mono">
              -70%
            </div>
            <div className="text-xs text-bytefix-slate font-mono uppercase tracking-wider mt-1">
              Reducción de Input Lag
            </div>
          </div>
          <div className="bg-bytefix-surface/60 border border-bytefix-border/60 rounded-xl p-4 text-center">
            <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono">
              &lt; 4 ms
            </div>
            <div className="text-xs text-bytefix-slate font-mono uppercase tracking-wider mt-1">
              Kernel &amp; Driver Delay
            </div>
          </div>
          <div className="bg-bytefix-surface/60 border border-bytefix-border/60 rounded-xl p-4 text-center">
            <div className="text-2xl sm:text-3xl font-extrabold text-bytefix-amber font-mono">
              0%
            </div>
            <div className="text-xs text-bytefix-slate font-mono uppercase tracking-wider mt-1">
              Stuttering &amp; Tirones
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
