'use client';

import React, { useState } from 'react';
import { Gamepad2, ArrowRight, Gauge, Activity, Zap, Check } from 'lucide-react';

interface GameData {
  name: string;
  fpsBefore: number;
  fpsAfter: number;
  lowBefore: number;
  lowAfter: number;
  delayBefore: number;
  delayAfter: number;
}

const games: Record<string, GameData> = {
  cs2: {
    name: 'Counter-Strike 2 (CS2)',
    fpsBefore: 180,
    fpsAfter: 295,
    lowBefore: 75,
    lowAfter: 155,
    delayBefore: 16.4,
    delayAfter: 2.1,
  },
  valorant: {
    name: 'Valorant',
    fpsBefore: 210,
    fpsAfter: 340,
    lowBefore: 110,
    lowAfter: 215,
    delayBefore: 12.8,
    delayAfter: 1.8,
  },
  warzone: {
    name: 'Call of Duty: Warzone 3',
    fpsBefore: 95,
    fpsAfter: 160,
    lowBefore: 48,
    lowAfter: 105,
    delayBefore: 19.5,
    delayAfter: 3.4,
  },
  fortnite: {
    name: 'Fortnite (Modo Rendimiento)',
    fpsBefore: 140,
    fpsAfter: 240,
    lowBefore: 62,
    lowAfter: 135,
    delayBefore: 14.2,
    delayAfter: 2.3,
  },
  apex: {
    name: 'Apex Legends',
    fpsBefore: 120,
    fpsAfter: 190,
    lowBefore: 58,
    lowAfter: 120,
    delayBefore: 15.6,
    delayAfter: 2.8,
  },
  rust: {
    name: 'Rust',
    fpsBefore: 78,
    fpsAfter: 135,
    lowBefore: 35,
    lowAfter: 82,
    delayBefore: 21.0,
    delayAfter: 4.1,
  },
};

export default function BenchmarkSimulator() {
  const [selectedGameKey, setSelectedGameKey] = useState<string>('cs2');
  const game = games[selectedGameKey];

  const fpsPercent = Math.round(((game.fpsAfter - game.fpsBefore) / game.fpsBefore) * 100);
  const lowPercent = Math.round(((game.lowAfter - game.lowBefore) / game.lowBefore) * 100);
  const delayPercent = Math.round(((game.delayBefore - game.delayAfter) / game.delayBefore) * 100);

  return (
    <div className="bg-bytefix-surface border border-bytefix-border rounded-2xl p-6 sm:p-8 shadow-panel-3d">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2">
            <Gauge className="w-5 h-5 text-bytefix-cyan" />
            <h3 className="text-xl font-bold text-white font-mono uppercase tracking-wider">
              Simulador Interactivo de Rendimiento
            </h3>
          </div>
          <p className="text-xs text-bytefix-slate font-mono mt-1">
            Calcula la ganancia real de FPS y reducción de latencia según tu título preferido
          </p>
        </div>
        <span className="text-xs font-mono text-bytefix-emerald bg-bytefix-emerald/15 border border-bytefix-emerald/30 px-3 py-1 rounded-full flex items-center gap-1.5 w-fit">
          <Check className="w-3.5 h-3.5" />
          <span>Verificado en Laboratorio</span>
        </span>
      </div>

      {/* Game Selector Chips */}
      <div className="mt-6">
        <label className="text-xs font-mono text-bytefix-slate uppercase block mb-3 flex items-center gap-2">
          <Gamepad2 className="w-4 h-4 text-bytefix-cyan" />
          <span>Selecciona tu Juego:</span>
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
          {Object.entries(games).map(([key, data]) => (
            <button
              key={key}
              type="button"
              onClick={() => setSelectedGameKey(key)}
              className={`px-3 py-2.5 rounded-xl text-xs font-mono transition-all text-center border ${
                selectedGameKey === key
                  ? 'bg-bytefix-cyan/20 border-bytefix-cyan text-white shadow-neon-cyan font-bold scale-[1.02]'
                  : 'bg-bytefix-elevated/40 border-white/5 text-bytefix-slate hover:text-white hover:border-white/20'
              }`}
            >
              {data.name.split(' ')[0]}
            </button>
          ))}
        </div>
      </div>

      {/* Simulator Metrics Grid */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Metric 1: FPS Medios */}
        <div className="p-5 rounded-xl bg-bytefix-elevated/60 border border-bytefix-cyan/30 flex flex-col justify-between">
          <div className="flex justify-between items-center mb-3">
            <span className="text-xs font-mono text-bytefix-slate uppercase">FPS Medios</span>
            <span className="text-xs font-mono font-bold text-bytefix-cyan bg-bytefix-cyan/15 px-2 py-0.5 rounded">
              +{fpsPercent}%
            </span>
          </div>
          <div className="flex items-baseline justify-between font-mono">
            <div className="text-red-400">
              <span className="text-xs block text-bytefix-slate">Stock</span>
              <span className="text-2xl font-bold">{game.fpsBefore}</span> FPS
            </div>
            <ArrowRight className="w-4 h-4 text-bytefix-slate" />
            <div className="text-bytefix-cyan text-right">
              <span className="text-xs block text-bytefix-slate">Byte Fix</span>
              <span className="text-2xl font-bold text-white">{game.fpsAfter}</span> FPS
            </div>
          </div>
          <div className="w-full bg-black/50 h-2 rounded-full overflow-hidden mt-4">
            <div
              className="bg-bytefix-cyan h-full transition-all duration-500"
              style={{ width: `${Math.min(100, (game.fpsAfter / 350) * 100)}%` }}
            />
          </div>
        </div>

        {/* Metric 2: 1% Low FPS (Microtirones) */}
        <div className="p-5 rounded-xl bg-bytefix-elevated/60 border border-bytefix-emerald/30 flex flex-col justify-between">
          <div className="flex justify-between items-center mb-3">
            <span className="text-xs font-mono text-bytefix-slate uppercase">1% Low (Sin Tirones)</span>
            <span className="text-xs font-mono font-bold text-bytefix-emerald bg-bytefix-emerald/15 px-2 py-0.5 rounded">
              +{lowPercent}%
            </span>
          </div>
          <div className="flex items-baseline justify-between font-mono">
            <div className="text-red-400">
              <span className="text-xs block text-bytefix-slate">Stock</span>
              <span className="text-2xl font-bold">{game.lowBefore}</span> FPS
            </div>
            <ArrowRight className="w-4 h-4 text-bytefix-slate" />
            <div className="text-bytefix-emerald text-right">
              <span className="text-xs block text-bytefix-slate">Byte Fix</span>
              <span className="text-2xl font-bold text-white">{game.lowAfter}</span> FPS
            </div>
          </div>
          <div className="w-full bg-black/50 h-2 rounded-full overflow-hidden mt-4">
            <div
              className="bg-bytefix-emerald h-full transition-all duration-500"
              style={{ width: `${Math.min(100, (game.lowAfter / 250) * 100)}%` }}
            />
          </div>
        </div>

        {/* Metric 3: Input Delay */}
        <div className="p-5 rounded-xl bg-bytefix-elevated/60 border border-bytefix-amber/30 flex flex-col justify-between">
          <div className="flex justify-between items-center mb-3">
            <span className="text-xs font-mono text-bytefix-slate uppercase">Input Delay Periféricos</span>
            <span className="text-xs font-mono font-bold text-bytefix-amber bg-bytefix-amber/15 px-2 py-0.5 rounded">
              -{delayPercent}% Delay
            </span>
          </div>
          <div className="flex items-baseline justify-between font-mono">
            <div className="text-red-400">
              <span className="text-xs block text-bytefix-slate">Stock</span>
              <span className="text-2xl font-bold">{game.delayBefore}</span> ms
            </div>
            <ArrowRight className="w-4 h-4 text-bytefix-slate" />
            <div className="text-bytefix-amber text-right">
              <span className="text-xs block text-bytefix-slate">Byte Fix</span>
              <span className="text-2xl font-bold text-white">{game.delayAfter}</span> ms
            </div>
          </div>
          <div className="w-full bg-black/50 h-2 rounded-full overflow-hidden mt-4">
            <div
              className="bg-bytefix-amber h-full transition-all duration-500"
              style={{ width: `${Math.max(10, 100 - (game.delayAfter / 25) * 100)}%` }}
            />
          </div>
        </div>
      </div>

      <div className="mt-6 pt-4 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-bytefix-slate">
        <span>* Pruebas tomadas con monitores de 240Hz, Windows 11 con debloat y perfiles de baja latencia DPC.</span>
        <a
          href="https://wa.me/5492914380467?text=Hola%20Byte%20Fix,%20quiero%20optimizar%20mi%20PC%20para%20"
          target="_blank"
          rel="noopener noreferrer"
          className="text-bytefix-cyan hover:underline flex items-center gap-1 font-bold"
        >
          <span>Agendar optimización para este juego</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </a>
      </div>
    </div>
  );
}
