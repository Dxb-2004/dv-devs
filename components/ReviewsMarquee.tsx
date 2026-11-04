'use client';

import React from 'react';
import { Star } from 'lucide-react';

export default function ReviewsMarquee() {
  const reviews = [
    {
      author: 'Agustín R.',
      tag: 'CS2 COMPETITIVO · FACEIT LV 9',
      avatar: 'AR',
      text: 'Tenía caídas horribles en CS2 en los humos, me bajaba a 90 FPS. Después del AnyDesk me quedó clavado en +240 FPS estables y el mouse se siente en el aire, cero delay.',
      stars: 5,
    },
    {
      author: 'Facundo M.',
      tag: 'STREAMER AFILIADO TWITCH',
      avatar: 'FM',
      text: 'Compré el Optimizer para mi notebook gamer con GTX 1650. Literalmente me revivió la máquina, Warzone ahora es súper jugable sin microtirones y con temperaturas más frescas.',
      stars: 5,
    },
    {
      author: 'Gonzalo B.',
      tag: 'VALORANT INMORTAL',
      avatar: 'GB',
      text: 'Pensé que el mouse delay era problema de mi sensor, pero era pura latencia DPC de Windows. Me dejaron el sistema en 38µs. La respuesta del disparo en Valorant es inmediata.',
      stars: 5,
    },
    {
      author: 'Lucas D.',
      tag: 'SETUP GAMER COMPETITIVO',
      avatar: 'LD',
      text: 'Me armaron la PC gamer desde cero respetando mi presupuesto al centavo. Cable management de otro planeta, cero ruido y rinde como una bestia en 1440p.',
      stars: 5,
    },
    {
      author: 'Martín S.',
      tag: 'BYTE FIX OPTIMIZER V2.4',
      avatar: 'MS',
      text: 'Excelente atención por WhatsApp. Me pasaron el link del software con la clave en menos de 5 minutos y me guiaron en cada paso. 100% recomendados.',
      stars: 5,
    },
    {
      author: 'Valentín T.',
      tag: 'WARZONE 3 COMPETITIVO',
      avatar: 'VT',
      text: 'Probé los presets de ReShade y el pack de tweaks. La claridad visual para ver enemigos a distancia en Warzone cambió por completo sin perder ni 1 solo frame.',
      stars: 5,
    },
  ];

  return (
    <section id="testimonios" className="py-24 bg-bytefix-obsidian relative border-t border-bytefix-border overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-3">
          <span className="text-xs font-mono uppercase tracking-widest text-bytefix-cyan bg-bytefix-cyan/10 px-3 py-1 rounded-full border border-bytefix-cyan/20">
            Comunidad &amp; Social Proof
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            Opiniones de <span className="text-bytefix-cyan">Jugadores</span>
          </h2>
          <p className="text-sm text-bytefix-slate">
            Lo que dicen gamers competitivos, streamers y clientes que ya probaron Byte Fix.
          </p>
        </div>

        {/* Giant 5.0 Rating Summary Block */}
        <div className="bg-bytefix-surface border border-bytefix-cyan/30 rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-panel-3d max-w-4xl mx-auto">
          <div className="flex items-center gap-6">
            <div className="text-5xl sm:text-6xl font-extrabold text-white font-mono tracking-tight text-bytefix-cyan">
              5.0
            </div>
            <div>
              <div className="flex text-amber-400 gap-1 mb-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <span className="text-xs font-mono font-bold text-bytefix-slate uppercase tracking-wider">
                100% Opiniones Positivas
              </span>
            </div>
          </div>
          <p className="text-xs sm:text-sm text-bytefix-slate max-w-md text-center sm:text-left font-mono">
            Más de <strong className="text-white">+150 computadoras gamer optimizadas</strong> en Argentina y Latinoamérica. Reducción real de latencia DPC y cero stuttering comprobado.
          </p>
        </div>
      </div>

      {/* Infinite Scrolling Track */}
      <div className="w-full overflow-hidden flex gap-6 select-none">
        <div className="flex gap-6 animate-marquee shrink-0">
          {[...reviews, ...reviews].map((rev, idx) => (
            <div
              key={idx}
              className="w-[320px] sm:w-[360px] bg-bytefix-surface/80 border border-bytefix-border/80 rounded-2xl p-6 shadow-panel-3d flex flex-col justify-between shrink-0"
            >
              <div>
                <div className="flex text-amber-400 gap-0.5 mb-3">
                  {Array.from({ length: rev.stars }).map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-xs text-bytefix-slate leading-relaxed mb-4 italic">
                  &laquo;{rev.text}&raquo;
                </p>
              </div>

              <div className="flex items-center gap-3 pt-3 border-t border-white/5 font-mono">
                <div className="w-8 h-8 rounded-full bg-bytefix-cyan/20 border border-bytefix-cyan/40 text-bytefix-cyan flex items-center justify-center text-xs font-bold">
                  {rev.avatar}
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">{rev.author}</h4>
                  <span className="text-[10px] text-bytefix-amber tracking-wider block">
                    {rev.tag}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
