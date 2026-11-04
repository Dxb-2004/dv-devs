'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { MessageCircle, Send, ShieldCheck, Copy, Check } from 'lucide-react';

export default function ContactQuoteBuilder() {
  const [service, setService] = useState('Software Propio: Byte Fix Optimizer ($30 USD / $36.000 ARS)');
  const [name, setName] = useState('');
  const [specs, setSpecs] = useState('');
  const [details, setDetails] = useState('');
  const [discordCopied, setDiscordCopied] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = `Hola Byte Fix! Mi nombre es ${name || 'un cliente'}.
Me interesa: ${service}.
Mis componentes actuales: ${specs || 'A detallar'}.
Detalles / Consulta: ${details || 'Quiero más FPS y menor delay'}.`;

    const url = `https://wa.me/5492914380467?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  const copyDiscord = () => {
    navigator.clipboard.writeText('ByteFix#0001');
    setDiscordCopied(true);
    setTimeout(() => setDiscordCopied(false), 2000);
  };

  return (
    <section id="contacto" className="py-24 bg-bytefix-obsidian relative border-t border-bytefix-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Channels & Warranty */}
          <div className="lg:col-span-5 space-y-6 text-center lg:text-left">
            <span className="text-xs font-mono uppercase tracking-widest text-bytefix-amber bg-bytefix-amber/15 px-3 py-1 rounded-full border border-bytefix-amber/30">
              Atención Personalizada
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
              Hablemos de tu <span className="text-bytefix-amber">Setup</span>
            </h2>
            <p className="text-sm text-bytefix-slate leading-relaxed">
              Completa el generador rápido para enviarnos un mensaje directo a WhatsApp con los datos de tu computadora, o contáctanos por nuestros canales oficiales.
            </p>

            <div className="space-y-3 pt-2">
              <a
                href="https://wa.me/5492914380467?text=Hola%20Byte%20Fix,%20quiero%20consultar%20por%20un%20servicio"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-4 rounded-xl bg-bytefix-surface border border-bytefix-border hover:border-bytefix-emerald transition-all shadow-panel-3d group text-left"
              >
                <div className="w-10 h-10 rounded-lg bg-bytefix-emerald/15 flex items-center justify-center text-bytefix-emerald group-hover:scale-110 transition-transform">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-sm font-bold text-white font-mono">WhatsApp Oficial</div>
                  <div className="text-xs text-bytefix-slate font-mono">+54 9 291 438-0467 · Respuesta Inmediata</div>
                </div>
              </a>

              <div
                onClick={copyDiscord}
                className="flex items-center justify-between p-4 rounded-xl bg-bytefix-surface border border-bytefix-border hover:border-bytefix-cyan transition-all shadow-panel-3d cursor-pointer group text-left"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-bytefix-cyan/15 flex items-center justify-center text-bytefix-cyan group-hover:scale-110 transition-transform font-bold font-mono text-xs">
                    DC
                  </div>
                  <div>
                    <div className="text-sm font-bold text-white font-mono">Comunidad Discord</div>
                    <div className="text-xs text-bytefix-slate font-mono">ByteFix#0001 (Click para copiar)</div>
                  </div>
                </div>
                {discordCopied ? (
                  <Check className="w-4 h-4 text-bytefix-emerald" />
                ) : (
                  <Copy className="w-4 h-4 text-bytefix-slate group-hover:text-white" />
                )}
              </div>
            </div>

            {/* Warranty Badge */}
            <div className="p-4 rounded-xl bg-bytefix-surface/60 border border-bytefix-cyan/25 flex items-center gap-4 text-left">
              <Image
                src="/assets/logo.png"
                alt="Byte Fix"
                width={50}
                height={50}
                className="object-contain filter drop-shadow-[0_0_10px_rgba(0,240,255,0.4)]"
              />
              <div className="text-xs font-mono text-bytefix-slate">
                <strong className="text-white block font-bold">Garantía Byte Fix:</strong>
                Si tras la optimización no notas una mejora real en la fluidez de tus juegos, no pagas el servicio.
              </div>
            </div>
          </div>

          {/* Right Column: Interactive WhatsApp Generator Form */}
          <div className="lg:col-span-7 bg-bytefix-surface border border-bytefix-border rounded-2xl p-6 sm:p-8 shadow-panel-3d">
            <h3 className="text-xl font-bold text-white font-mono uppercase tracking-wider mb-1">
              Generador Rápido de Consulta
            </h3>
            <p className="text-xs text-bytefix-slate font-mono mb-6">
              Selecciona lo que necesitas y te armaremos un mensaje directo para WhatsApp sin demoras.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-mono text-bytefix-slate uppercase mb-1.5">
                  Servicio o Producto que te Interesa
                </label>
                <select
                  value={service}
                  onChange={(e) => setService(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-bytefix-elevated border border-bytefix-border text-white text-xs font-mono focus:outline-none focus:border-bytefix-cyan transition-colors"
                >
                  <option value="Software Propio: Byte Fix Optimizer ($30 USD / $36.000 ARS)">
                    ⭐ Software Propio: Byte Fix Optimizer ($30 USD / $36.000 ARS)
                  </option>
                  <option value="Optimización Personalizada 1 a 1 AnyDesk ($40 USD / $48.000 ARS)">
                    ⚡ Optimización Personalizada 1 a 1 AnyDesk ($40 USD / $48.000 ARS)
                  </option>
                  <option value="Photography PACK Gaming ($20 USD / $24.000 ARS)">
                    📸 Photography PACK Gaming ($20 USD / $24.000 ARS)
                  </option>
                  <option value="Pack Archivos de Optimización Tweaks ($15 USD / $18.000 ARS)">
                    📁 Pack Archivos de Optimización Tweaks ($15 USD / $18.000 ARS)
                  </option>
                  <option value="Standar ReShades Gaming ($10 USD / $12.000 ARS)">
                    🎨 Standar ReShades Gaming ($10 USD / $12.000 ARS)
                  </option>
                  <option value="Asesoría y Armado de PC Gamer a Medida">
                    🖥️ Asesoría y Armado de PC Gamer a Medida
                  </option>
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-bytefix-slate uppercase mb-1.5">
                    Tu Nombre o Nick
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Ej: Lucas o TuNick"
                    className="w-full px-4 py-3 rounded-xl bg-bytefix-elevated border border-bytefix-border text-white text-xs font-mono focus:outline-none focus:border-bytefix-cyan transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-bytefix-slate uppercase mb-1.5">
                    Tus Componentes (CPU / GPU)
                  </label>
                  <input
                    type="text"
                    value={specs}
                    onChange={(e) => setSpecs(e.target.value)}
                    placeholder="Ej: Ryzen 5 5600 + RTX 3060"
                    className="w-full px-4 py-3 rounded-xl bg-bytefix-elevated border border-bytefix-border text-white text-xs font-mono focus:outline-none focus:border-bytefix-cyan transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-bytefix-slate uppercase mb-1.5">
                  ¿Qué problema tienes o qué optimización buscas?
                </label>
                <textarea
                  rows={3}
                  value={details}
                  onChange={(e) => setDetails(e.target.value)}
                  placeholder="Ej: Tengo caídas de FPS en humos de CS2 y siento delay en el mouse. Quiero dejarla clavada a +240 FPS."
                  className="w-full px-4 py-3 rounded-xl bg-bytefix-elevated border border-bytefix-border text-white text-xs font-mono focus:outline-none focus:border-bytefix-cyan transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 rounded-xl bg-bytefix-emerald hover:bg-emerald-400 text-black font-extrabold text-sm flex items-center justify-center gap-2 font-mono transition-all shadow-[0_0_20px_rgba(0,255,136,0.35)]"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>Enviar Consulta a WhatsApp</span>
              </button>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
}
