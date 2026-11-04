import React from 'react';
import Link from 'next/link';
import Hero3D from '@/components/Hero3D';
import BenchmarkSimulator from '@/components/BenchmarkSimulator';
import SoftwareShowcase from '@/components/SoftwareShowcase';
import PricingSection from '@/components/PricingSection';
import ReviewsMarquee from '@/components/ReviewsMarquee';
import FaqSection from '@/components/FaqSection';
import ContactQuoteBuilder from '@/components/ContactQuoteBuilder';
import {
  Zap,
  Cpu,
  Gauge,
  Check,
  ArrowRight,
  Activity,
  HardDrive,
  Fan,
  Laptop,
} from 'lucide-react';

export default function HomePage() {
  return (
    <>
      {/* 1. 3D Interactive WebGL Hero Section */}
      <Hero3D />

      {/* 2. Servicios & Pilares Técnicos (#servicios) */}
      <section id="servicios" className="py-24 bg-bytefix-obsidian relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-mono uppercase tracking-widest text-bytefix-cyan bg-bytefix-cyan/10 px-3 py-1 rounded-full border border-bytefix-cyan/20">
              Hardware &amp; Software Gaming
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
              Soluciones &amp; <span className="text-bytefix-cyan">Especialidades</span>
            </h2>
            <p className="text-sm sm:text-base text-bytefix-slate">
              Diseñamos cada optimización para eliminar los cuellos de botella del sistema operativo y llevar tu hardware al límite térmico seguro.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Service 1: Software Propio */}
            <div className="bg-bytefix-surface border border-bytefix-amber/40 hover:border-bytefix-amber rounded-2xl p-8 flex flex-col justify-between shadow-panel-3d hover:shadow-panel-hover transition-all group">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-bytefix-amber/15 border border-bytefix-amber/30 flex items-center justify-center text-bytefix-amber">
                  <Laptop className="w-6 h-6" />
                </div>
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold text-white group-hover:text-bytefix-amber transition-colors">
                    Byte Fix Optimizer
                  </h3>
                  <span className="text-xs font-mono font-bold text-black bg-bytefix-amber px-2 py-0.5 rounded-full">
                    $30 USD
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-bytefix-slate leading-relaxed">
                  Aplicación automatizada propia. Debloat profundo de Windows, limpieza de telemetría y Game Boost con 1 solo clic.
                </p>
                <ul className="space-y-2 text-xs font-mono text-white/90 pt-2 border-t border-white/5">
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-bytefix-amber shrink-0" />
                    <span>Licencia permanente para tu PC</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-bytefix-amber shrink-0" />
                    <span>Punto de restauración seguro automático</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-bytefix-amber shrink-0" />
                    <span>Timer resolution 0.50ms bloqueado</span>
                  </li>
                </ul>
              </div>
              <Link
                href="#software"
                className="mt-6 flex items-center justify-between text-xs font-mono text-bytefix-amber hover:underline pt-4 border-t border-white/10"
              >
                <span>Conocer especificaciones</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Service 2: Armados de PC */}
            <div className="bg-bytefix-surface border border-bytefix-cyan/40 hover:border-bytefix-cyan rounded-2xl p-8 flex flex-col justify-between shadow-panel-3d hover:shadow-panel-hover transition-all group">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-bytefix-cyan/15 border border-bytefix-cyan/30 flex items-center justify-center text-bytefix-cyan">
                  <Cpu className="w-6 h-6" />
                </div>
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold text-white group-hover:text-bytefix-cyan transition-colors">
                    Armados de PC Gamer
                  </h3>
                  <span className="text-xs font-mono text-bytefix-cyan bg-bytefix-cyan/15 px-2 py-0.5 rounded-full border border-bytefix-cyan/30">
                    A Medida
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-bytefix-slate leading-relaxed">
                  Selección milimétrica de componentes sin cuellos de botella. Cable management impecable, BIOS actualizada y perfiles XMP.
                </p>
                <ul className="space-y-2 text-xs font-mono text-white/90 pt-2 border-t border-white/5">
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-bytefix-cyan shrink-0" />
                    <span>Asesoramiento según tu presupuesto</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-bytefix-cyan shrink-0" />
                    <span>Test de estrés térmico 24h certificado</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-bytefix-cyan shrink-0" />
                    <span>Airflow positivo para cero polvo</span>
                  </li>
                </ul>
              </div>
              <Link
                href="#armados"
                className="mt-6 flex items-center justify-between text-xs font-mono text-bytefix-cyan hover:underline pt-4 border-t border-white/10"
              >
                <span>Ver setups recomendados</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Service 3: Optimización AnyDesk */}
            <div className="bg-bytefix-surface border border-bytefix-emerald/40 hover:border-bytefix-emerald rounded-2xl p-8 flex flex-col justify-between shadow-panel-3d hover:shadow-panel-hover transition-all group">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-bytefix-emerald/15 border border-bytefix-emerald/30 flex items-center justify-center text-bytefix-emerald">
                  <Gauge className="w-6 h-6" />
                </div>
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold text-white group-hover:text-bytefix-emerald transition-colors">
                    Optimización AnyDesk
                  </h3>
                  <span className="text-xs font-mono text-bytefix-emerald bg-bytefix-emerald/15 px-2 py-0.5 rounded-full border border-bytefix-emerald/30">
                    1 a 1 en Vivo
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-bytefix-slate leading-relaxed">
                  Conexión remota 100% segura mientras ves todo en tu monitor. Calibración fina de drivers, overclock seguro y mitigación de DPC.
                </p>
                <ul className="space-y-2 text-xs font-mono text-white/90 pt-2 border-t border-white/5">
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-bytefix-emerald shrink-0" />
                    <span>Sesión completa de 45 a 60 minutos</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-bytefix-emerald shrink-0" />
                    <span>Reducción de input delay de mouse/teclado</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-bytefix-emerald shrink-0" />
                    <span>Garantía de rendimiento comprobado</span>
                  </li>
                </ul>
              </div>
              <a
                href="https://wa.me/5492914380467?text=Hola%20Byte%20Fix,%20quiero%20agendar%20una%20optimizacion%20AnyDesk"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 flex items-center justify-between text-xs font-mono text-bytefix-emerald hover:underline pt-4 border-t border-white/10"
              >
                <span>Agendar por WhatsApp ($40 USD)</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Simulador Interactivo de Benchmarks (#benchmarks) */}
      <BenchmarkSimulator />

      {/* 4. Setups de PC Gamer (#armados) */}
      <section id="armados" className="py-24 bg-[#070b14] relative border-t border-bytefix-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-mono uppercase tracking-widest text-bytefix-cyan bg-bytefix-cyan/10 px-3 py-1 rounded-full border border-bytefix-cyan/20">
              Hardware Lab · Ensamble Certificado
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
              Setups Gamer &amp; <span className="text-bytefix-cyan">Workstation</span>
            </h2>
            <p className="text-sm sm:text-base text-bytefix-slate">
              Configuraciones equilibradas probadas para maximizar tus frames por peso invertido con gestión térmica y perfiles XMP optimizados.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
            {/* Setup 1: Entrada */}
            <div className="bg-bytefix-surface border border-bytefix-border hover:border-bytefix-cyan/50 rounded-2xl p-6 sm:p-8 flex flex-col justify-between shadow-panel-3d hover:shadow-panel-hover transition-all">
              <div className="space-y-4">
                <span className="text-xs font-mono text-bytefix-slate uppercase">Tier 1 · 1080p Esports</span>
                <h3 className="text-2xl font-bold text-white">Setup Entrada Gamer</h3>
                <p className="text-xs text-bytefix-slate">Ideal para CS2, Valorant, Fortnite y Warzone en 1080p con excelente fluidez.</p>
                <div className="space-y-2.5 text-xs font-mono text-white/90 pt-3 border-t border-white/10">
                  <div className="flex items-center gap-2.5">
                    <Cpu className="w-4 h-4 text-bytefix-cyan shrink-0" />
                    <span>Ryzen 5 5600 / Core i5 12400F</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Activity className="w-4 h-4 text-bytefix-cyan shrink-0" />
                    <span>16GB (2x8GB) DDR4 3200MHz</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Zap className="w-4 h-4 text-bytefix-cyan shrink-0" />
                    <span>Radeon RX 6600 8GB / RTX 3050</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <HardDrive className="w-4 h-4 text-bytefix-cyan shrink-0" />
                    <span>1TB NVMe M.2 Gen4</span>
                  </div>
                </div>
              </div>
              <a
                href="https://wa.me/5492914380467?text=Hola%20Byte%20Fix,%20quiero%20cotizar%20el%20Setup%20Entrada%20Gamer"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 w-full py-3 rounded-xl bg-bytefix-elevated hover:bg-white/10 border border-bytefix-border text-xs font-bold text-white text-center font-mono transition-all flex items-center justify-center gap-2"
              >
                <span>Cotizar Setup Entrada</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Setup 2: Competitivo Pro (Featured) */}
            <div className="bg-bytefix-surface border-2 border-bytefix-cyan rounded-2xl p-6 sm:p-8 flex flex-col justify-between shadow-neon-cyan relative transform lg:-translate-y-3 transition-all">
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-bytefix-cyan text-black text-[10px] font-extrabold uppercase font-mono px-3 py-1 rounded-full shadow-md whitespace-nowrap">
                ★ Más Elegido · Calidad / Precio
              </span>
              <div className="space-y-4">
                <span className="text-xs font-mono text-bytefix-cyan uppercase">Tier 2 · Competitivo 144Hz+</span>
                <h3 className="text-2xl font-bold text-white">Setup Competitivo Pro</h3>
                <p className="text-xs text-bytefix-slate">Máximo rendimiento en Ultra, streaming sin caída de frames y cero stuttering.</p>
                <div className="space-y-2.5 text-xs font-mono text-white/90 pt-3 border-t border-white/10">
                  <div className="flex items-center gap-2.5">
                    <Cpu className="w-4 h-4 text-bytefix-cyan shrink-0" />
                    <span>Ryzen 7 5700X3D / i5 13600K</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Activity className="w-4 h-4 text-bytefix-cyan shrink-0" />
                    <span>32GB (2x16GB) 3600MHz Dual Channel</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Zap className="w-4 h-4 text-bytefix-cyan shrink-0" />
                    <span>RTX 4060 Ti 8GB / RTX 4070 12GB</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Fan className="w-4 h-4 text-bytefix-cyan shrink-0" />
                    <span>Enfriamiento Líquido 240mm ARGB</span>
                  </div>
                </div>
              </div>
              <a
                href="https://wa.me/5492914380467?text=Hola%20Byte%20Fix,%20quiero%20cotizar%20el%20Setup%20Competitivo%20Pro"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 w-full py-3.5 rounded-xl bg-bytefix-cyan hover:bg-cyan-300 text-black text-xs font-extrabold text-center font-mono transition-all shadow-[0_0_20px_rgba(0,240,255,0.4)] flex items-center justify-center gap-2"
              >
                <span>Cotizar Setup Competitivo</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Setup 3: Bestia 4K */}
            <div className="bg-bytefix-surface border border-bytefix-border hover:border-bytefix-amber/50 rounded-2xl p-6 sm:p-8 flex flex-col justify-between shadow-panel-3d hover:shadow-panel-hover transition-all">
              <div className="space-y-4">
                <span className="text-xs font-mono text-bytefix-amber uppercase">Tier 3 · 4K Ultra &amp; Stream</span>
                <h3 className="text-2xl font-bold text-white">Setup Bestia 4K</h3>
                <p className="text-xs text-bytefix-slate">Potencia absoluta para jugar en 4K, editar video 4K/8K y renderizado pesado.</p>
                <div className="space-y-2.5 text-xs font-mono text-white/90 pt-3 border-t border-white/10">
                  <div className="flex items-center gap-2.5">
                    <Cpu className="w-4 h-4 text-bytefix-amber shrink-0" />
                    <span>Ryzen 7 7800X3D / i7 14700K</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Activity className="w-4 h-4 text-bytefix-amber shrink-0" />
                    <span>32GB o 64GB DDR5 6000MHz CL30</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Zap className="w-4 h-4 text-bytefix-amber shrink-0" />
                    <span>RTX 4070 Ti Super / RTX 4080 Super</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <HardDrive className="w-4 h-4 text-bytefix-amber shrink-0" />
                    <span>2TB Gen4 NVMe (7.000 MB/s)</span>
                  </div>
                </div>
              </div>
              <a
                href="https://wa.me/5492914380467?text=Hola%20Byte%20Fix,%20quiero%20cotizar%20el%20Setup%20Bestia%204K"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 w-full py-3 rounded-xl bg-bytefix-elevated hover:bg-white/10 border border-bytefix-border text-xs font-bold text-white text-center font-mono transition-all flex items-center justify-center gap-2"
              >
                <span>Cotizar Setup Bestia 4K</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Software Propio Section (#software) */}
      <SoftwareShowcase />

      {/* 6. Planes & Precios Oficiales (#precios) */}
      <PricingSection />

      {/* 7. Opiniones de Jugadores & Social Proof (#testimonios) */}
      <ReviewsMarquee />

      {/* 8. Preguntas Frecuentes (#faq) */}
      <FaqSection />

      {/* 9. Contacto & Cotizador Rápido (#contacto) */}
      <ContactQuoteBuilder />
    </>
  );
}
