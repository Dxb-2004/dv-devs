import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        bytefix: {
          dark: '#0a0a0c',
          obsidian: '#05070b',
          surface: '#0b1120',
          elevated: '#0f172a',
          cyan: '#00f0ff',
          'cyan-glow': 'rgba(0, 240, 255, 0.35)',
          emerald: '#00ff88',
          'emerald-glow': 'rgba(0, 255, 136, 0.3)',
          amber: '#f59e0b',
          'amber-glow': 'rgba(245, 158, 11, 0.3)',
          violet: '#8584bd',
          slate: '#94a3b8',
          border: 'rgba(0, 240, 255, 0.16)',
          'border-active': 'rgba(0, 240, 255, 0.55)',
        },
      },
      fontFamily: {
        sans: ['var(--font-outfit)', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['var(--font-mono)', 'JetBrains Mono', 'monospace'],
      },
      boxShadow: {
        'panel-3d': '0 20px 45px rgba(0, 0, 0, 0.8), inset 0 1px 0 rgba(255, 255, 255, 0.12), inset 0 0 20px rgba(0, 240, 255, 0.04)',
        'panel-hover': '0 25px 60px rgba(0, 0, 0, 0.9), inset 0 1px 0 rgba(255, 255, 255, 0.2), 0 0 35px rgba(0, 240, 255, 0.25)',
        'neon-cyan': '0 0 20px rgba(0, 240, 255, 0.45)',
        'neon-emerald': '0 0 20px rgba(0, 255, 136, 0.45)',
        'neon-amber': '0 0 20px rgba(245, 158, 11, 0.45)',
      },
      backgroundImage: {
        'grid-pattern': 'linear-gradient(to right, rgba(255, 255, 255, 0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 255, 255, 0.03) 1px, transparent 1px)',
        'circuit-radial': 'radial-gradient(circle at 50% 50%, rgba(0, 240, 255, 0.08) 0%, transparent 60%)',
      },
      animation: {
        'pulse-subtle': 'pulseSubtle 3s ease-in-out infinite',
        'spin-slow': 'spin 18s linear infinite',
        'spin-reverse': 'spinReverse 24s linear infinite',
        marquee: 'marquee 30s linear infinite',
      },
      keyframes: {
        pulseSubtle: {
          '0%, 100%': { opacity: '0.9', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.02)' },
        },
        spinReverse: {
          from: { transform: 'rotate(360deg)' },
          to: { transform: 'rotate(0deg)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
