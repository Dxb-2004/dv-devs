'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useUser } from '@auth0/nextjs-auth0/client';
import {
  Menu,
  X,
  User,
  LogOut,
  LogIn,
  LayoutDashboard,
  ShieldCheck,
  MessageCircle,
} from 'lucide-react';

export default function Navbar() {
  const { user, isLoading } = useUser();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#05070b]/85 backdrop-blur-md border-b border-bytefix-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative w-11 h-11 rounded-lg overflow-hidden border border-bytefix-border group-hover:border-bytefix-cyan transition-colors bg-bytefix-surface flex items-center justify-center">
            <Image
              src="/assets/logo.png"
              alt="Byte Fix Logo"
              width={40}
              height={40}
              className="object-contain filter drop-shadow-[0_0_8px_rgba(0,240,255,0.5)]"
              priority
            />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-bold tracking-tight text-white flex items-center gap-1">
              BYTE <span className="text-bytefix-cyan">FIX</span>
            </span>
            <span className="text-[10px] uppercase font-mono tracking-wider text-bytefix-emerald flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-bytefix-emerald animate-pulse" />
              Hardware &amp; Software Lab
            </span>
          </div>
        </Link>

        {/* Desktop Nav Links */}
        <nav className="hidden lg:flex items-center gap-5 xl:gap-7">
          <Link
            href="/#servicios"
            className="text-xs xl:text-sm font-medium text-bytefix-slate hover:text-bytefix-cyan transition-colors"
          >
            Servicios
          </Link>
          <Link
            href="/#benchmarks"
            className="text-xs xl:text-sm font-medium text-bytefix-slate hover:text-bytefix-cyan transition-colors"
          >
            Benchmarks
          </Link>
          <Link
            href="/#armados"
            className="text-xs xl:text-sm font-medium text-bytefix-slate hover:text-bytefix-cyan transition-colors"
          >
            Armados PC
          </Link>
          <Link
            href="/#software"
            className="text-xs xl:text-sm font-medium text-bytefix-amber hover:text-yellow-300 transition-colors flex items-center gap-1.5"
          >
            <span className="text-[10px] bg-bytefix-amber/20 text-bytefix-amber px-1.5 py-0.5 rounded font-mono border border-bytefix-amber/40">
              $30 USD
            </span>
            Software
          </Link>
          <Link
            href="/#precios"
            className="text-xs xl:text-sm font-medium text-bytefix-slate hover:text-bytefix-cyan transition-colors"
          >
            Precios
          </Link>
          <Link
            href="/#testimonios"
            className="text-xs xl:text-sm font-medium text-bytefix-slate hover:text-bytefix-cyan transition-colors"
          >
            Opiniones
          </Link>
          <Link
            href="/#faq"
            className="text-xs xl:text-sm font-medium text-bytefix-slate hover:text-bytefix-cyan transition-colors"
          >
            FAQ
          </Link>
          <Link
            href="/#contacto"
            className="text-xs xl:text-sm font-medium text-bytefix-slate hover:text-bytefix-cyan transition-colors"
          >
            Contacto
          </Link>
        </nav>

        {/* Auth State & Actions */}
        <div className="hidden lg:flex items-center gap-3">
          {isLoading ? (
            <div className="w-8 h-8 rounded-full border-2 border-bytefix-cyan/30 border-t-bytefix-cyan animate-spin" />
          ) : user ? (
            /* Logged-In Customer State */
            <div className="flex items-center gap-3">
              <Link
                href="/dashboard"
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-bytefix-surface border border-bytefix-border hover:border-bytefix-cyan text-xs font-mono text-white transition-all shadow-panel-3d group"
              >
                <LayoutDashboard className="w-4 h-4 text-bytefix-cyan group-hover:scale-110 transition-transform" />
                <span>Panel PC</span>
                <span className="w-2 h-2 rounded-full bg-bytefix-emerald" />
              </Link>

              <div className="flex items-center gap-2 pl-2 border-l border-white/10">
                {user.picture ? (
                  <Image
                    src={user.picture}
                    alt={user.name || 'Usuario'}
                    width={32}
                    height={32}
                    className="w-8 h-8 rounded-full border border-bytefix-cyan/40 object-cover"
                  />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-bytefix-elevated border border-bytefix-border flex items-center justify-center text-xs font-mono text-white">
                    {user.name ? user.name.slice(0, 2).toUpperCase() : <User className="w-4 h-4" />}
                  </div>
                )}
                <a
                  href="/auth/logout"
                  className="p-1.5 text-bytefix-slate hover:text-red-400 transition-colors"
                  title="Cerrar Sesión"
                >
                  <LogOut className="w-4 h-4" />
                </a>
              </div>
            </div>
          ) : (
            /* Guest / Logged-Out State */
            <div className="flex items-center gap-3">
              <Link
                href="/dashboard"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono text-bytefix-slate hover:text-white border border-transparent hover:border-white/10 transition-all"
              >
                <LogIn className="w-3.5 h-3.5 text-bytefix-cyan" />
                <span>Portal Clientes</span>
              </Link>

              <a
                href="https://wa.me/5492914380467?text=Hola%20Byte%20Fix,%20quiero%20consultar%20por%20un%20servicio"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-bytefix-emerald/15 hover:bg-bytefix-emerald/25 text-bytefix-emerald border border-bytefix-emerald/30 text-xs font-bold transition-all shadow-[0_0_15px_rgba(0,255,136,0.15)]"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>WhatsApp</span>
              </a>
            </div>
          )}
        </div>

        {/* Mobile menu button */}
        <div className="flex lg:hidden items-center gap-2">
          {user && (
            <Link
              href="/dashboard"
              className="p-2 rounded-lg bg-bytefix-surface border border-bytefix-border text-bytefix-cyan"
            >
              <LayoutDashboard className="w-4 h-4" />
            </Link>
          )}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-bytefix-slate hover:text-white"
            aria-label="Abrir Menú"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-bytefix-surface border-b border-bytefix-border px-6 py-6 space-y-3.5">
          <Link
            href="/#servicios"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-base font-medium text-bytefix-slate hover:text-bytefix-cyan"
          >
            Servicios
          </Link>
          <Link
            href="/#benchmarks"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-base font-medium text-bytefix-slate hover:text-bytefix-cyan"
          >
            Simulador de Benchmarks
          </Link>
          <Link
            href="/#armados"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-base font-medium text-bytefix-slate hover:text-bytefix-cyan"
          >
            Armados PC
          </Link>
          <Link
            href="/#software"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-base font-medium text-bytefix-amber flex items-center justify-between"
          >
            <span>Software Propio Optimizer</span>
            <span className="text-xs bg-bytefix-amber/20 text-bytefix-amber px-2 py-0.5 rounded font-mono border border-bytefix-amber/40">
              $30 USD
            </span>
          </Link>
          <Link
            href="/#precios"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-base font-medium text-bytefix-slate hover:text-bytefix-cyan"
          >
            Precios &amp; Planes (USD / ARS)
          </Link>
          <Link
            href="/#testimonios"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-base font-medium text-bytefix-slate hover:text-bytefix-cyan"
          >
            Opiniones de Clientes (5.0 ★)
          </Link>
          <Link
            href="/#faq"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-base font-medium text-bytefix-slate hover:text-bytefix-cyan"
          >
            Preguntas Frecuentes
          </Link>
          <Link
            href="/#contacto"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-base font-medium text-bytefix-slate hover:text-bytefix-cyan"
          >
            Contacto &amp; Cotizador
          </Link>

          <div className="pt-4 border-t border-white/10 space-y-3">
            {user ? (
              <>
                <Link
                  href="/dashboard"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2 w-full px-4 py-2.5 rounded-lg bg-bytefix-cyan/15 text-bytefix-cyan border border-bytefix-cyan/30 text-sm font-mono"
                >
                  <LayoutDashboard className="w-4 h-4" />
                  <span>Ver Mi Ficha Técnica / Dashboard</span>
                </Link>
                <a
                  href="/auth/logout"
                  className="flex items-center gap-2 w-full px-4 py-2 rounded-lg text-red-400 text-sm font-mono"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Cerrar Sesión ({user.name})</span>
                </a>
              </>
            ) : (
              <>
                <Link
                  href="/dashboard"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-lg bg-bytefix-elevated text-white border border-bytefix-border text-sm font-mono"
                >
                  <LogIn className="w-4 h-4 text-bytefix-cyan" />
                  <span>Ingresar a Mi Panel</span>
                </Link>
                <a
                  href="https://wa.me/5492914380467?text=Hola%20Byte%20Fix,%20quiero%20consultar%20por%20un%20servicio"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-lg bg-bytefix-emerald/20 text-bytefix-emerald border border-bytefix-emerald/30 text-sm font-bold"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Consultar por WhatsApp</span>
                </a>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
