import React from 'react';
import { redirect } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { auth0, isAuth0Configured } from '@/lib/auth0';
import {
  CheckCircle2,
  Clock,
  Cpu,
  Gauge,
  Thermometer,
  ShieldAlert,
  ArrowUpRight,
  MessageCircle,
  FileText,
  User,
  Wrench,
  Sparkles,
  ChevronRight,
  Info,
} from 'lucide-react';
import { ClientServiceTicket, ServiceStep } from '@/types/client-pc';

export const metadata = {
  title: 'Portal de Clientes · Byte Fix Dashboard',
  description: 'Seguimiento de equipo y ficha técnica de optimización en tiempo real.',
};

export default async function DashboardPage() {
  const session = await auth0.getSession();

  if (!session && isAuth0Configured) {
    redirect('/auth/login?returnTo=/dashboard');
  }

  const user = session?.user || {
    name: 'Cliente Demo · Byte Fix',
    email: 'cliente.demo@bytefix.com',
    picture: '/assets/logo.png',
  };

  // Mocked telemetry ticket linked to the authenticated user's account
  const ticketData: ClientServiceTicket = {
    ticketId: 'BFX-8942-AR',
    clientName: user.name || 'Gamer VIP',
    clientEmail: user.email || 'cliente@bytefix.com',
    currentStep: 'stress-test',
    progressPercent: 80,
    technicianName: 'Facundo (Lead Tech Byte Fix)',
    technicianContact: '5492914380467',
    intakeDate: '02/11/2026 · 14:30 hs',
    estimatedCompletion: 'Hoy · 19:00 hs',
    specs: {
      cpu: 'AMD Ryzen 7 5700X3D (8C/16T)',
      gpu: 'NVIDIA GeForce RTX 3070 8GB OC',
      ram: '32GB DDR4 3600MHz CL16 Kingston Fury',
      storage: '1TB NVMe Kingston KC3000 PCIe 4.0',
      motherboard: 'ASUS TUF Gaming B550-PLUS',
      cooling: 'ID-Cooling FrostFlow 240mm ARGB',
    },
    metrics: [
      {
        label: '1% Low FPS (CS2 / Warzone)',
        before: '68 FPS',
        after: '144 FPS',
        unit: 'FPS',
        improvement: '+111% Estabilidad',
        isGood: true,
      },
      {
        label: 'Input Delay de Periféricos',
        before: '18.4 ms',
        after: '2.1 ms',
        unit: 'ms',
        improvement: '-88% Delay',
        isGood: true,
      },
      {
        label: 'Latencia DPC de Drivers',
        before: '1.840 µs',
        after: '38 µs',
        unit: 'µs',
        improvement: 'Cero Latencia',
        isGood: true,
      },
      {
        label: 'Kernel Timer Resolution',
        before: '1.00 ms',
        after: '0.50 ms',
        unit: 'ms',
        improvement: 'Locked 0.5ms',
        isGood: true,
      },
      {
        label: 'Temperatura Pico GPU (Stress)',
        before: '84°C',
        after: '68°C',
        unit: '°C',
        improvement: '-16°C Delta',
        isGood: true,
      },
    ],
    maintenance: {
      lastThermalPasteChange: '02/11/2026 (Servicio Actual)',
      pasteBrand: 'Thermal Grizzly Kryonaut Extreme',
      thermalPadsReplaced: true,
      fanHealthStatus: 'Optimo',
      nextRecommendedServiceDate: '02/05/2027 (en 6 meses)',
    },
    diagnosticsReport:
      'Se detectó thermal throttling severo en GPU por pads secos y alto DPC latency ocasionado por el driver de red Realtek desactualizado y servicios en segundo plano de Windows 11. Se realizó debloat profundo, undervolt de 950mV en RTX 3070 y perfiles de energía gamer.',
    futureRecommendations: [
      'Mantener deshabilitado el aislamiento del núcleo (VBS) para evitar penalización de frames en juegos competitivos.',
      'Verificar temperatura en verano; el flujo de aire del gabinete es positivo y adecuado.',
      'Próxima revisión de pasta térmica recomendada en Mayo 2027.',
    ],
  };

  const steps: ServiceStep[] = [
    {
      id: 'recibido',
      label: '1. Recibido',
      description: 'Ingreso al laboratorio y verificación de componentes',
      completed: true,
      active: false,
      timestamp: '14:30 hs',
    },
    {
      id: 'diagnostico',
      label: '2. Diagnóstico',
      description: 'Lectura de temperaturas, voltajes y cuellos de botella',
      completed: true,
      active: false,
      timestamp: '15:15 hs',
    },
    {
      id: 'optimizacion',
      label: '3. Optimización',
      description: 'Debloat, tweaks de registro, undervolt y latencia DPC',
      completed: true,
      active: false,
      timestamp: '16:45 hs',
    },
    {
      id: 'stress-test',
      label: '4. Test de Estrés',
      description: 'Loop continuo en FurMark & Cinebench R23 (estabilidad 100%)',
      completed: false,
      active: true,
      timestamp: 'En Curso',
    },
    {
      id: 'listo',
      label: '5. Listo para Entrega',
      description: 'Certificado de cero delay y entrega final',
      completed: false,
      active: false,
      timestamp: 'Pendiente',
    },
  ];

  return (
    <div className="min-h-screen bg-bytefix-obsidian text-white pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {!isAuth0Configured && (
          <div className="mb-6 p-4 rounded-xl bg-bytefix-surface border border-bytefix-cyan/40 flex items-start gap-3 shadow-panel-3d">
            <Info className="w-5 h-5 text-bytefix-cyan shrink-0 mt-0.5" />
            <div className="text-xs font-mono">
              <strong className="text-white">Portal de Clientes en Modo Demostración Activo.</strong>
              <p className="text-bytefix-slate mt-0.5">
                Estás visualizando la Ficha Técnica y Seguimiento en vivo simulado. Para conectar inicio de sesión con Google o Auth0, añade tus variables de entorno en Vercel (<code className="text-bytefix-cyan">AUTH0_DOMAIN</code>, <code className="text-bytefix-cyan">AUTH0_CLIENT_ID</code>, etc.).
              </p>
            </div>
          </div>
        )}
        
        {/* Top Breadcrumb & User Profile Banner */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-bytefix-border">
          <div className="flex items-center gap-4">
            {user.picture ? (
              <Image
                src={user.picture}
                alt={user.name || 'Cliente'}
                width={64}
                height={64}
                className="w-16 h-16 rounded-2xl border-2 border-bytefix-cyan/50 object-cover shadow-neon-cyan"
              />
            ) : (
              <div className="w-16 h-16 rounded-2xl bg-bytefix-surface border-2 border-bytefix-cyan/50 flex items-center justify-center text-bytefix-cyan text-xl font-bold">
                {user.name?.slice(0, 2).toUpperCase() || <User className="w-8 h-8" />}
              </div>
            )}
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono uppercase tracking-wider text-bytefix-cyan bg-bytefix-cyan/15 px-2.5 py-0.5 rounded-full border border-bytefix-cyan/30">
                  Cliente Autenticado · Auth0
                </span>
                <span className="text-xs font-mono text-bytefix-emerald bg-bytefix-emerald/15 px-2 py-0.5 rounded-full border border-bytefix-emerald/30">
                  PC En Laboratorio
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
                Ficha Técnica: {ticketData.clientName}
              </h1>
              <p className="text-xs font-mono text-bytefix-slate">
                Ticket: <strong className="text-white">{ticketData.ticketId}</strong> · Ingreso: {ticketData.intakeDate}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <a
              href={`https://wa.me/${ticketData.technicianContact}?text=Hola%20${encodeURIComponent(ticketData.technicianName)},%20te%20consulto%20por%20mi%20ticket%20${ticketData.ticketId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-bytefix-emerald/20 hover:bg-bytefix-emerald/30 text-bytefix-emerald border border-bytefix-emerald/40 text-xs font-bold font-mono transition-all"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Contactar a mi Técnico</span>
            </a>
            <a
              href="/auth/logout"
              className="px-3.5 py-2.5 rounded-xl bg-bytefix-surface hover:bg-bytefix-elevated text-bytefix-slate hover:text-white border border-bytefix-border text-xs font-mono transition-all"
            >
              Cerrar Sesión
            </a>
          </div>
        </div>

        {/* ==========================================================================
            1. SEGUIMIENTO DE EQUIPO EN TIEMPO REAL (STEP PIPELINE)
            ========================================================================== */}
        <div className="mt-8 bg-bytefix-surface border border-bytefix-border rounded-2xl p-6 sm:p-8 shadow-panel-3d">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-bytefix-cyan animate-pulse" />
                <h2 className="text-lg font-bold text-white uppercase tracking-wider font-mono">
                  Seguimiento de Equipo en Tiempo Real
                </h2>
              </div>
              <p className="text-xs text-bytefix-slate font-mono mt-0.5">
                Técnico Asignado: <strong className="text-white">{ticketData.technicianName}</strong> · Estimado: {ticketData.estimatedCompletion}
              </p>
            </div>
            <div className="text-right">
              <span className="text-xs font-mono text-bytefix-cyan">
                Progreso del Servicio: <strong className="text-white text-base">{ticketData.progressPercent}%</strong>
              </span>
            </div>
          </div>

          {/* Progress Bar Track */}
          <div className="w-full bg-bytefix-elevated h-2.5 rounded-full overflow-hidden mb-8 border border-white/5">
            <div
              className="bg-gradient-to-r from-bytefix-cyan via-bytefix-emerald to-bytefix-amber h-full transition-all duration-700"
              style={{ width: `${ticketData.progressPercent}%` }}
            />
          </div>

          {/* Steps Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {steps.map((step) => (
              <div
                key={step.id}
                className={`p-4 rounded-xl border transition-all ${
                  step.completed
                    ? 'bg-bytefix-emerald/10 border-bytefix-emerald/40 text-bytefix-emerald'
                    : step.active
                    ? 'bg-bytefix-cyan/15 border-bytefix-cyan text-white shadow-neon-cyan animate-pulse-subtle'
                    : 'bg-bytefix-elevated/40 border-white/5 text-bytefix-slate opacity-60'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold font-mono">{step.label}</span>
                  {step.completed ? (
                    <CheckCircle2 className="w-4 h-4 text-bytefix-emerald" />
                  ) : step.active ? (
                    <span className="w-2.5 h-2.5 rounded-full bg-bytefix-cyan animate-ping" />
                  ) : (
                    <div className="w-2.5 h-2.5 rounded-full bg-white/20" />
                  )}
                </div>
                <p className="text-[11px] leading-relaxed text-bytefix-slate">
                  {step.description}
                </p>
                <div className="text-[10px] font-mono mt-3 text-right opacity-80">
                  {step.timestamp}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ==========================================================================
            2. BENCHMARKS ANTES VS DESPUÉS & ESPECIFICACIONES DE HARDWARE
            ========================================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-8">
          
          {/* Hardware Specs Card (Col Span 4) */}
          <div className="lg:col-span-4 bg-bytefix-surface border border-bytefix-border rounded-2xl p-6 shadow-panel-3d space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b border-white/10">
              <Cpu className="w-5 h-5 text-bytefix-amber" />
              <h3 className="text-base font-bold text-white font-mono uppercase tracking-wider">
                Configuración del Equipo
              </h3>
            </div>

            <div className="space-y-3 text-xs font-mono">
              <div className="p-2.5 rounded-lg bg-bytefix-elevated/60 border border-white/5">
                <span className="text-bytefix-slate block text-[10px] uppercase">Procesador (CPU)</span>
                <span className="text-white font-semibold">{ticketData.specs.cpu}</span>
              </div>
              <div className="p-2.5 rounded-lg bg-bytefix-elevated/60 border border-white/5">
                <span className="text-bytefix-slate block text-[10px] uppercase">Tarjeta Gráfica (GPU)</span>
                <span className="text-bytefix-cyan font-semibold">{ticketData.specs.gpu}</span>
              </div>
              <div className="p-2.5 rounded-lg bg-bytefix-elevated/60 border border-white/5">
                <span className="text-bytefix-slate block text-[10px] uppercase">Memoria RAM</span>
                <span className="text-white font-semibold">{ticketData.specs.ram}</span>
              </div>
              <div className="p-2.5 rounded-lg bg-bytefix-elevated/60 border border-white/5">
                <span className="text-bytefix-slate block text-[10px] uppercase">Almacenamiento NVMe</span>
                <span className="text-white font-semibold">{ticketData.specs.storage}</span>
              </div>
              <div className="p-2.5 rounded-lg bg-bytefix-elevated/60 border border-white/5">
                <span className="text-bytefix-slate block text-[10px] uppercase">Motherboard</span>
                <span className="text-white font-semibold">{ticketData.specs.motherboard}</span>
              </div>
              <div className="p-2.5 rounded-lg bg-bytefix-elevated/60 border border-white/5">
                <span className="text-bytefix-slate block text-[10px] uppercase">Sistema de Refrigeración</span>
                <span className="text-white font-semibold">{ticketData.specs.cooling}</span>
              </div>
            </div>

            {/* Thermal Maintenance Section */}
            <div className="pt-4 border-t border-white/10">
              <div className="flex items-center gap-2 text-xs font-mono text-bytefix-cyan mb-2">
                <Thermometer className="w-4 h-4" />
                <span className="font-bold uppercase tracking-wider">Mantenimiento Térmico</span>
              </div>
              <div className="p-3 rounded-lg bg-bytefix-elevated/80 border border-bytefix-cyan/20 space-y-1.5 text-xs font-mono">
                <div className="flex justify-between">
                  <span className="text-bytefix-slate">Pasta Aplicada:</span>
                  <strong className="text-white">{ticketData.maintenance.pasteBrand}</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-bytefix-slate">Thermal Pads:</span>
                  <span className="text-bytefix-emerald font-bold">1.5mm Nuevos</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-bytefix-slate">Próximo Service:</span>
                  <span className="text-bytefix-amber">{ticketData.maintenance.nextRecommendedServiceDate}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Comparative Benchmarks (Col Span 8) */}
          <div className="lg:col-span-8 bg-bytefix-surface border border-bytefix-border rounded-2xl p-6 sm:p-8 shadow-panel-3d space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-white/10">
              <div className="flex items-center gap-2">
                <Gauge className="w-5 h-5 text-bytefix-cyan" />
                <h3 className="text-lg font-bold text-white font-mono uppercase tracking-wider">
                  Telemetría &amp; Benchmarks (Antes vs. Después)
                </h3>
              </div>
              <span className="text-xs font-mono text-bytefix-emerald bg-bytefix-emerald/10 border border-bytefix-emerald/30 px-3 py-1 rounded-full">
                100% Verificado con LatencyMon &amp; CapFrameX
              </span>
            </div>

            {/* Metrics List */}
            <div className="space-y-4">
              {ticketData.metrics.map((metric, i) => (
                <div
                  key={i}
                  className="p-4 rounded-xl bg-bytefix-elevated/50 border border-white/5 hover:border-bytefix-cyan/30 transition-colors"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                    <span className="text-sm font-semibold text-white font-mono">
                      {metric.label}
                    </span>
                    <span className="text-xs font-bold font-mono text-bytefix-emerald bg-bytefix-emerald/15 px-2.5 py-0.5 rounded-full border border-bytefix-emerald/30 w-fit">
                      {metric.improvement}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-4 pt-1 font-mono text-xs">
                    <div className="p-2 rounded bg-black/40 border border-red-500/20">
                      <span className="text-[10px] text-red-400 block uppercase">Antes (Fábrica / Stock)</span>
                      <strong className="text-sm text-red-200">{metric.before}</strong>
                    </div>
                    <div className="p-2 rounded bg-black/40 border border-bytefix-cyan/30">
                      <span className="text-[10px] text-bytefix-cyan block uppercase">Después (Byte Fix Tuned)</span>
                      <strong className="text-sm text-white">{metric.after}</strong>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Diagnostic Narrative & Recommendations */}
            <div className="p-4 rounded-xl bg-bytefix-elevated/80 border border-bytefix-amber/30 space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold font-mono text-bytefix-amber uppercase tracking-wider">
                <FileText className="w-4 h-4" />
                <span>Informe Técnico &amp; Diagnóstico</span>
              </div>
              <p className="text-xs text-bytefix-slate leading-relaxed">
                {ticketData.diagnosticsReport}
              </p>

              <div className="pt-2">
                <span className="text-[11px] font-mono text-white font-semibold block mb-1">
                  Recomendaciones para el Cliente:
                </span>
                <ul className="space-y-1 text-xs text-bytefix-slate">
                  {ticketData.futureRecommendations.map((rec, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <ChevronRight className="w-3.5 h-3.5 text-bytefix-cyan shrink-0 mt-0.5" />
                      <span>{rec}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
