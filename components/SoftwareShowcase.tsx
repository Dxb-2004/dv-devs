'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Laptop,
  Check,
  Zap,
  Shield,
  Activity,
  Sliders,
  Play,
  RotateCcw,
  MessageCircle,
} from 'lucide-react';

export default function SoftwareShowcase() {
  const [activeTab, setActiveTab] = useState<'debloat' | 'boost' | 'delay'>('debloat');
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(100);

  const runSimulation = () => {
    setIsScanning(true);
    setScanProgress(0);
    const interval = setInterval(() => {
      setScanProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsScanning(false);
          return 100;
        }
        return prev + 25;
      });
    }, 250);
  };

  return (
    <section id="software" className="py-24 bg-bytefix-obsidian relative border-t border-bytefix-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Description & CTAs */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-bytefix-amber/15 border border-bytefix-amber/30 text-xs font-mono text-bytefix-amber">
              <span className="w-2 h-2 rounded-full bg-bytefix-amber animate-pulse" />
              <span>Herramienta Automatizada Exclusiva</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-extrabold text-white leading-tight">
              Byte Fix Optimizer <br />
              <span className="text-bytefix-amber">$30 USD / $36.000 ARS</span>
            </h2>

            <p className="text-sm sm:text-base text-bytefix-slate leading-relaxed">
              Desarrollamos nuestro propio software para que no dependas de programas de terceros dudosos. Con 1 solo clic, realiza un debloat exhaustivo de Windows 10 y 11, desactiva la telemetría invasiva y bloquea el temporizador del kernel a 0.50ms de forma 100% segura.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono text-white/90">
              <div className="p-3 rounded-xl bg-bytefix-surface border border-white/5 flex items-center gap-2">
                <Check className="w-4 h-4 text-bytefix-amber" />
                <span>Punto de restauración automático</span>
              </div>
              <div className="p-3 rounded-xl bg-bytefix-surface border border-white/5 flex items-center gap-2">
                <Check className="w-4 h-4 text-bytefix-amber" />
                <span>0.500ms Timer Resolution Locked</span>
              </div>
              <div className="p-3 rounded-xl bg-bytefix-surface border border-white/5 flex items-center gap-2">
                <Check className="w-4 h-4 text-bytefix-amber" />
                <span>Modo Gaming de Ultra-Baja Latencia</span>
              </div>
              <div className="p-3 rounded-xl bg-bytefix-surface border border-white/5 flex items-center gap-2">
                <Check className="w-4 h-4 text-bytefix-amber" />
                <span>Licencia permanente + soporte</span>
              </div>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row gap-4">
              <a
                href="https://wa.me/5492914380467?text=Hola%20Byte%20Fix,%20quiero%20comprar%20el%20Software%20Byte%20Fix%20Optimizer%20($30%20USD%20/%20$36.000%20ARS)"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-4 rounded-xl bg-bytefix-amber hover:bg-yellow-400 text-black font-extrabold text-sm flex items-center justify-center gap-2 font-mono transition-all shadow-[0_0_25px_rgba(245,158,11,0.35)]"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>Comprar Software ($30 USD / $36.000 ARS)</span>
              </a>

              <Link
                href="/dashboard"
                className="px-6 py-4 rounded-xl bg-bytefix-surface hover:bg-bytefix-elevated border border-bytefix-border text-white text-sm font-mono flex items-center justify-center gap-2 transition-all shadow-panel-3d"
              >
                <span>Ver Portal Clientes Demo</span>
              </Link>
            </div>
          </div>

          {/* Right Column: Interactive GUI Window */}
          <div className="lg:col-span-6 bg-[#080d1a] border border-bytefix-cyan/40 rounded-2xl overflow-hidden shadow-panel-3d">
            {/* Window Title Bar */}
            <div className="bg-[#0f172a] px-4 py-3 flex items-center justify-between border-b border-white/10">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                <span className="text-xs font-mono text-bytefix-slate ml-2 font-bold">
                  Byte Fix Optimizer v2.4 (Pro Edition)
                </span>
              </div>
              <span className="text-[10px] font-mono text-bytefix-emerald bg-bytefix-emerald/15 px-2 py-0.5 rounded-full border border-bytefix-emerald/30">
                PRO LICENSE: ACTIVE
              </span>
            </div>

            {/* Window Tabs Bar */}
            <div className="bg-[#0b1329] px-4 pt-2 border-b border-white/10 flex gap-2">
              <button
                type="button"
                onClick={() => setActiveTab('debloat')}
                className={`px-3 py-2 text-xs font-mono rounded-t-lg transition-colors border-t border-x ${
                  activeTab === 'debloat'
                    ? 'bg-[#080d1a] border-bytefix-cyan/50 text-bytefix-cyan font-bold'
                    : 'border-transparent text-bytefix-slate hover:text-white'
                }`}
              >
                Windows Debloat
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('boost')}
                className={`px-3 py-2 text-xs font-mono rounded-t-lg transition-colors border-t border-x ${
                  activeTab === 'boost'
                    ? 'bg-[#080d1a] border-bytefix-cyan/50 text-bytefix-cyan font-bold'
                    : 'border-transparent text-bytefix-slate hover:text-white'
                }`}
              >
                Game Boost
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('delay')}
                className={`px-3 py-2 text-xs font-mono rounded-t-lg transition-colors border-t border-x ${
                  activeTab === 'delay'
                    ? 'bg-[#080d1a] border-bytefix-cyan/50 text-bytefix-cyan font-bold'
                    : 'border-transparent text-bytefix-slate hover:text-white'
                }`}
              >
                Input Delay Fix
              </button>
            </div>

            {/* Window Content */}
            <div className="p-6 space-y-5 font-mono text-xs">
              {/* Telemetry Status Strip */}
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-lg bg-black/40 border border-white/5">
                  <span className="text-[10px] text-bytefix-slate block uppercase">LATENCIA DPC</span>
                  <span className="text-sm font-bold text-bytefix-emerald">38 µs (ÓPTIMO)</span>
                </div>
                <div className="p-3 rounded-lg bg-black/40 border border-white/5">
                  <span className="text-[10px] text-bytefix-slate block uppercase">KERNEL TIMER</span>
                  <span className="text-sm font-bold text-bytefix-cyan">0.500 ms LOCKED</span>
                </div>
              </div>

              {/* Tab specific items */}
              {activeTab === 'debloat' && (
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between p-3 rounded-lg bg-black/50 border border-white/5">
                    <div>
                      <div className="text-white font-bold">Desactivar Telemetría y Diagnósticos</div>
                      <div className="text-[10px] text-bytefix-slate">Bloquea envío continuo de datos a Microsoft</div>
                    </div>
                    <span className="text-bytefix-emerald font-bold">ACTIVO</span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-black/50 border border-white/5">
                    <div>
                      <div className="text-white font-bold">Eliminar Cortana y Apps Preinstaladas</div>
                      <div className="text-[10px] text-bytefix-slate">Libera 2.4 GB de memoria y ciclos de CPU</div>
                    </div>
                    <span className="text-bytefix-emerald font-bold">ACTIVO</span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-black/50 border border-white/5">
                    <div>
                      <div className="text-white font-bold">Limpieza de Cache y Temporales</div>
                      <div className="text-[10px] text-bytefix-slate">Optimiza espacio en disco NVMe</div>
                    </div>
                    <span className="text-bytefix-emerald font-bold">ACTIVO</span>
                  </div>
                </div>
              )}

              {activeTab === 'boost' && (
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between p-3 rounded-lg bg-black/50 border border-white/5">
                    <div>
                      <div className="text-white font-bold">Prioridad de Procesos en GPU</div>
                      <div className="text-[10px] text-bytefix-slate">Asigna recursos máximos al juego en primer plano</div>
                    </div>
                    <span className="text-bytefix-emerald font-bold">ACTIVO</span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-black/50 border border-white/5">
                    <div>
                      <div className="text-white font-bold">Plan de Energía Ultimate Gamer</div>
                      <div className="text-[10px] text-bytefix-slate">Desbloquea frecuencias Turbo continuas en CPU</div>
                    </div>
                    <span className="text-bytefix-emerald font-bold">ACTIVO</span>
                  </div>
                </div>
              )}

              {activeTab === 'delay' && (
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between p-3 rounded-lg bg-black/50 border border-white/5">
                    <div>
                      <div className="text-white font-bold">Aceleración de Mouse &amp; Polling Rate</div>
                      <div className="text-[10px] text-bytefix-slate">Buffer directo 1:1 sin suavizado de Windows</div>
                    </div>
                    <span className="text-bytefix-emerald font-bold">ACTIVO</span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-black/50 border border-white/5">
                    <div>
                      <div className="text-white font-bold">Desactivar Aislamiento de Núcleo (VBS)</div>
                      <div className="text-[10px] text-bytefix-slate">Elimina penalización de 15% en FPS mínimos</div>
                    </div>
                    <span className="text-bytefix-emerald font-bold">ACTIVO</span>
                  </div>
                </div>
              )}

              {/* Progress and Simulation Button */}
              <div className="pt-2 border-t border-white/5">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] text-bytefix-slate">
                    {isScanning ? 'Optimizando módulos del sistema...' : 'Sistema calibrado al 100%'}
                  </span>
                  <span className="text-[10px] text-bytefix-cyan font-bold">{scanProgress}%</span>
                </div>
                <div className="w-full bg-black/60 h-2 rounded-full overflow-hidden mb-4">
                  <div
                    className="bg-gradient-to-r from-bytefix-cyan to-bytefix-emerald h-full transition-all duration-300"
                    style={{ width: `${scanProgress}%` }}
                  />
                </div>

                <button
                  type="button"
                  onClick={runSimulation}
                  disabled={isScanning}
                  className="w-full py-2.5 rounded-lg bg-bytefix-elevated hover:bg-white/10 text-white border border-bytefix-cyan/40 text-xs font-mono font-bold flex items-center justify-center gap-2 transition-all"
                >
                  {isScanning ? (
                    <>
                      <RotateCcw className="w-3.5 h-3.5 animate-spin text-bytefix-cyan" />
                      <span>Ejecutando Boost...</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-3.5 h-3.5 text-bytefix-emerald fill-current" />
                      <span>Simular Optimización en Vivo (1-Click)</span>
                    </>
                  )}
                </button>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
