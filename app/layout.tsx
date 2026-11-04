import type { Metadata } from 'next';
import { Outfit, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { Auth0Provider } from '@auth0/nextjs-auth0/client';
import { auth0 } from '@/lib/auth0';
import Navbar from '@/components/Navbar';

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Byte Fix — Gaming & Tech Performance · Hardware & Software Lab',
  description:
    'Especialistas en software propio de optimización ($30 USD / $36.000 ARS), armados de computadoras gamer y optimizaciones 1 a 1 vía AnyDesk para +FPS y cero delay.',
  keywords: [
    'Byte Fix',
    'optimizacion pc gamer',
    'bajar input lag',
    'aumentar fps',
    'dpc latency',
    'software optimizador windows',
    'servicio tecnico gamer argentina',
  ],
  authors: [{ name: 'Byte Fix Lab' }],
  metadataBase: new URL('https://bytefixarg.vercel.app'),
  openGraph: {
    title: 'Byte Fix — Gaming & Tech Performance',
    description:
      'Potenciamos tu PC al nivel competitivo: Software Propio, Armados Gamer a medida y Optimizaciones AnyDesk con cero input lag.',
    url: 'https://bytefixarg.vercel.app',
    siteName: 'Byte Fix',
    images: [
      {
        url: '/assets/logo.png',
        width: 800,
        height: 800,
        alt: 'Byte Fix Mascot',
      },
    ],
    locale: 'es_AR',
    type: 'website',
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth0.getSession();

  return (
    <html lang="es" className={`${outfit.variable} ${jetbrainsMono.variable}`}>
      <body className="bg-bytefix-obsidian text-white antialiased selection:bg-bytefix-cyan selection:text-black">
        <Auth0Provider user={session?.user}>
          <Navbar />
          <main>{children}</main>
          <footer className="bg-[#030508] border-t border-bytefix-border py-12 text-center text-xs font-mono text-bytefix-slate">
            <div className="max-w-7xl mx-auto px-4 space-y-3">
              <p className="text-white font-bold">
                BYTE FIX · ESPORTS PERFORMANCE LAB &copy; {new Date().getFullYear()}
              </p>
              <p>
                Optimizaciones Remotas AnyDesk · Software Propio · Armados de Computadoras Gamer a Medida.
              </p>
              <p className="text-[11px] text-bytefix-slate/70">
                Bahía Blanca, Buenos Aires, Argentina · WhatsApp: +54 9 291 438-0467
              </p>
            </div>
          </footer>
        </Auth0Provider>
      </body>
    </html>
  );
}
