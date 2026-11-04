'use client';

import React, { useState } from 'react';
import { Check, X, Zap, Laptop, MessageCircle, Star, Palette, Code, Camera } from 'lucide-react';

export default function PricingSection() {
  const [currency, setCurrency] = useState<'USD' | 'ARS'>('USD');

  const plans = [
    {
      id: 'reshades',
      name: 'Standar ReShades Gaming',
      tag: 'GRAPHIC PRESETS',
      icon: Palette,
      desc: 'Presets gráficos livianos sin pérdida de FPS ni sobrecarga de GPU.',
      usd: 10,
      ars: '12.000',
      period: 'pago único',
      featured: false,
      badge: null,
      color: 'border-bytefix-border',
      features: [
        'Presets de ReShade calibrados para máxima nitidez',
        'Mayor claridad, contraste y visibilidad de enemigos',
        'Cero caída de FPS (configuración competitiva)',
        'Archivos listos con guía paso a paso',
      ],
      disabledFeatures: ['Servicio de instalación remota'],
      ctaText: 'Pedir ReShades',
    },
    {
      id: 'tweaks',
      name: 'Pack Archivos Tweaks',
      tag: 'REGISTRY & SCRIPTS',
      icon: Code,
      desc: 'Todos los archivos y scripts que usamos para optimizar PCs.',
      usd: 15,
      ars: '18.000',
      period: 'pago único',
      featured: false,
      badge: null,
      color: 'border-bytefix-border',
      features: [
        'Acceso completo a nuestra biblioteca de scripts',
        'Tweaks de registro (.reg) seguros y testeados',
        'Comandos de limpieza de temporales y caché',
        'Perfiles de energía gamer para CPU',
      ],
      disabledFeatures: ['Servicio personalizado AnyDesk'],
      ctaText: 'Pedir Pack Archivos',
    },
    {
      id: 'photo',
      name: 'Photography PACK',
      tag: 'PHOTO FIDELITY',
      icon: Camera,
      desc: 'Pack fotográfico cinematográfico con instalación asistida.',
      usd: 20,
      ars: '24.000',
      period: 'pago único',
      featured: false,
      badge: null,
      color: 'border-bytefix-border',
      features: [
        'Presets gráficos de alta fidelidad visual',
        'Presets de post-procesado y ReShade fotográficos',
        'Instalación personalizada asistida por nosotros',
        'Calibración según tu monitor y tarjeta gráfica',
        'Ideal para streamers y creadores de contenido',
      ],
      disabledFeatures: [],
      ctaText: 'Adquirir Photo Pack',
    },
    {
      id: 'anydesk',
      name: 'Optimización Personalizada',
      tag: '1-ON-1 ANYDESK VIP',
      icon: Zap,
      desc: 'Servicio técnico en vivo realizado por nosotros vía AnyDesk.',
      usd: 40,
      ars: '48.000',
      period: 'sesión',
      featured: true,
      badge: '★ MÁS ELEGIDO 1 A 1',
      color: 'border-bytefix-cyan shadow-neon-cyan',
      features: [
        'Conexión en vivo y segura por AnyDesk (45-60 min)',
        'Diagnóstico de temperaturas y cuellos de botella',
        'Reducción drástica de Input Lag y DPC latency',
        'Calibración de Windows y drivers para juegos',
        'Explicación paso a paso durante el proceso',
        'Garantía de rendimiento o devolución',
      ],
      disabledFeatures: [],
      ctaText: 'Agendar por AnyDesk',
    },
    {
      id: 'software',
      name: 'Byte Fix Optimizer',
      tag: 'PROPRIETARY V2.4',
      icon: Laptop,
      desc: 'Nuestra herramienta de software exclusiva y automatizada.',
      usd: 30,
      ars: '36.000',
      period: 'licencia permanente',
      featured: true,
      badge: '★ SOFTWARE PROPIO',
      color: 'border-bytefix-amber shadow-neon-amber',
      features: [
        'Optimización total con 1 solo clic',
        'Licencia permanente para tu computadora',
        'Módulos de Debloat, Game Boost e Input Lag',
        'Punto de restauración automático seguro',
        'Actualizaciones y soporte continuo incluidos',
      ],
      disabledFeatures: [],
      ctaText: 'Comprar Software ($30 USD)',
    },
  ];

  return (
    <section id="precios" className="py-24 bg-[#070b14] relative border-t border-bytefix-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <span className="text-xs font-mono uppercase tracking-widest text-bytefix-cyan bg-bytefix-cyan/10 px-3 py-1 rounded-full border border-bytefix-cyan/20">
            Transparencia Total
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            Tarifas Claras &amp; <span className="text-bytefix-cyan">Servicios</span>
          </h2>
          <p className="text-sm text-bytefix-slate">
            Elige entre nuestras herramientas descargables, presets visuales o nuestra optimización remota 1 a 1.
          </p>

          {/* Currency Toggle */}
          <div className="pt-4 flex items-center justify-center gap-3">
            <span className="text-xs font-mono text-bytefix-slate">Moneda:</span>
            <div className="inline-flex rounded-xl bg-bytefix-surface p-1 border border-bytefix-border">
              <button
                type="button"
                onClick={() => setCurrency('USD')}
                className={`px-4 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
                  currency === 'USD'
                    ? 'bg-bytefix-cyan text-black shadow-md'
                    : 'text-bytefix-slate hover:text-white'
                }`}
              >
                USD ($)
              </button>
              <button
                type="button"
                onClick={() => setCurrency('ARS')}
                className={`px-4 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
                  currency === 'ARS'
                    ? 'bg-bytefix-emerald text-black shadow-md'
                    : 'text-bytefix-slate hover:text-white'
                }`}
              >
                ARS ($)
              </button>
            </div>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {plans.map((plan) => {
            const Icon = plan.icon;
            const price = currency === 'USD' ? `$${plan.usd} USD` : `$${plan.ars} ARS`;
            const subPrice = currency === 'USD' ? `Aprox: $${plan.ars} ARS` : `Aprox: $${plan.usd} USD`;
            const waMsg = encodeURIComponent(
              `Hola Byte Fix, quiero consultar por el servicio ${plan.name} (${price})`
            );

            return (
              <div
                key={plan.id}
                className={`bg-bytefix-surface border rounded-2xl p-6 flex flex-col justify-between shadow-panel-3d transition-all hover:scale-[1.02] relative ${plan.color}`}
              >
                {plan.badge && (
                  <span
                    className={`absolute -top-3 left-1/2 -translate-x-1/2 text-[10px] font-extrabold uppercase font-mono px-3 py-0.5 rounded-full shadow-md text-black whitespace-nowrap ${
                      plan.id === 'software' ? 'bg-bytefix-amber' : 'bg-bytefix-cyan'
                    }`}
                  >
                    {plan.badge}
                  </span>
                )}

                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-mono font-bold text-bytefix-slate uppercase tracking-wider">
                      {plan.tag}
                    </span>
                    <Icon className="w-4 h-4 text-bytefix-cyan" />
                  </div>

                  <h3 className="text-base font-bold text-white mb-1.5">{plan.name}</h3>
                  <p className="text-[11px] text-bytefix-slate mb-4 leading-relaxed">{plan.desc}</p>

                  <div className="py-3 border-y border-white/5 font-mono">
                    <div className="text-2xl font-extrabold text-white">
                      {currency === 'USD' ? `$${plan.usd}` : `$${plan.ars}`}
                      <span className="text-xs font-normal text-bytefix-slate ml-1">
                        {currency} / {plan.period}
                      </span>
                    </div>
                    <span className="text-[10px] text-bytefix-slate/70 block mt-0.5">{subPrice}</span>
                  </div>

                  <ul className="space-y-2 text-xs font-mono text-white/90 my-4">
                    {plan.features.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <Check className="w-3.5 h-3.5 text-bytefix-emerald shrink-0 mt-0.5" />
                        <span className="text-[11px]">{feat}</span>
                      </li>
                    ))}
                    {plan.disabledFeatures.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-2 opacity-40 line-through">
                        <X className="w-3.5 h-3.5 text-red-400 shrink-0 mt-0.5" />
                        <span className="text-[11px]">{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <a
                  href={`https://wa.me/5492914380467?text=${waMsg}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-full py-2.5 rounded-xl text-xs font-mono font-bold text-center flex items-center justify-center gap-1.5 transition-all ${
                    plan.featured
                      ? plan.id === 'software'
                        ? 'bg-bytefix-amber hover:bg-yellow-400 text-black shadow-neon-amber'
                        : 'bg-bytefix-cyan hover:bg-cyan-300 text-black shadow-neon-cyan'
                      : 'bg-bytefix-elevated hover:bg-white/10 text-white border border-bytefix-border'
                  }`}
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>{plan.ctaText}</span>
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
