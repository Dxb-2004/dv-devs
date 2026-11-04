'use client';

import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: '¿Cómo se realiza la optimización remota y es seguro?',
      a: 'Es 100% seguro. Utilizamos programas oficiales como AnyDesk o TeamViewer. Tú tienes el control total: ves todo lo que hacemos en tu pantalla en tiempo real y puedes cancelar la conexión en cualquier segundo con un solo clic. No instalamos programas raros ni tocamos archivos personales.',
    },
    {
      q: '¿Cuántos FPS voy a ganar en mis juegos?',
      a: 'La ganancia promedio suele rondar entre +30 a +90 FPS dependiendo de tus componentes actuales. Pero la mejora más notoria no es solo el número de FPS máximos, sino la estabilidad: eliminamos los tirones bruscos (stuttering) y el 1% low FPS sube drásticamente, haciendo que el juego se sienta como seda.',
    },
    {
      q: '¿Cómo recibo el Software, los Presets de ReShade o el Pack de Archivos?',
      a: 'Una vez confirmado el pago por WhatsApp, te enviamos el link de descarga directa junto a tu clave de activación y un instructivo en video paso a paso en menos de 5 minutos.',
    },
    {
      q: '¿Qué medios de pago aceptan?',
      a: 'Aceptamos transferencias bancarias (CBU/CVU), Mercado Pago, PayPal, Binance / USDT / Criptomonedas y efectivo en caso de servicios presenciales.',
    },
    {
      q: '¿Qué garantía tengo si no noto mejoras?',
      a: 'Nuestra garantía es simple y transparente: Si tras la optimización 1 a 1 no notas una mejora real en la fluidez de tu PC y en la estabilidad de tus juegos, no pagas el servicio.',
    },
  ];

  return (
    <section id="faq" className="py-24 bg-[#070b14] relative border-t border-bytefix-border">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-mono uppercase tracking-widest text-bytefix-cyan bg-bytefix-cyan/10 px-3 py-1 rounded-full border border-bytefix-cyan/20">
            Respuestas Inmediatas
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            Preguntas <span className="text-bytefix-cyan">Frecuentes</span>
          </h2>
          <p className="text-sm text-bytefix-slate">
            Todo lo que necesitas saber antes de contratar nuestros servicios.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="bg-bytefix-surface border border-bytefix-border rounded-xl overflow-hidden transition-all shadow-panel-3d"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 text-sm sm:text-base font-bold text-white hover:text-bytefix-cyan transition-colors"
                >
                  <span className="font-mono">{faq.q}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-bytefix-cyan shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-bytefix-slate leading-relaxed border-t border-white/5 font-mono">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
