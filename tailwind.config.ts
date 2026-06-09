import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    container: {
      center: true,
      padding: '1.5rem',
      screens: {
        '2xl': '1320px',
      },
    },
    extend: {
      colors: {
        // Brand palette (per design spec)
        brand: {
          cyan: '#00E5FF',
          blue: '#0066FF',
          accent: '#38BDF8',
        },
        background: {
          DEFAULT: '#020617',
          soft: '#0F172A',
          elevated: '#111c33',
        },
        // Semantic tokens driven by CSS variables (see index.css)
        surface: 'rgb(var(--surface) / <alpha-value>)',
        ink: 'rgb(var(--ink) / <alpha-value>)',
        muted: 'rgb(var(--muted) / <alpha-value>)',
        line: 'rgb(var(--line) / <alpha-value>)',
        primary: {
          DEFAULT: 'rgb(var(--primary) / <alpha-value>)',
          foreground: 'rgb(var(--primary-foreground) / <alpha-value>)',
        },
      },
      fontFamily: {
        sans: ['Inter', 'Be Vietnam Pro', 'system-ui', 'sans-serif'],
        display: ['Space Grotesk', 'Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        xl: '1rem',
        '2xl': '1.25rem',
        '3xl': '1.75rem',
      },
      boxShadow: {
        glow: '0 0 0 1px rgba(56,189,248,0.15), 0 0 40px -10px rgba(0,229,255,0.45)',
        'glow-lg': '0 0 0 1px rgba(56,189,248,0.2), 0 0 80px -10px rgba(0,229,255,0.55)',
        card: '0 20px 60px -25px rgba(2,6,23,0.85)',
      },
      backgroundImage: {
        'brand-gradient': 'linear-gradient(135deg, #00E5FF 0%, #0066FF 100%)',
        'aurora':
          'radial-gradient(60% 60% at 20% 10%, rgba(0,229,255,0.18) 0%, transparent 60%), radial-gradient(50% 50% at 85% 20%, rgba(0,102,255,0.22) 0%, transparent 55%), radial-gradient(60% 60% at 50% 100%, rgba(56,189,248,0.15) 0%, transparent 60%)',
        'tech-grid':
          'linear-gradient(rgba(56,189,248,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(56,189,248,0.07) 1px, transparent 1px)',
      },
      backgroundSize: {
        grid: '44px 44px',
      },
      keyframes: {
        'aurora-shift': {
          '0%,100%': { transform: 'translate3d(0,0,0) scale(1)' },
          '50%': { transform: 'translate3d(0,-20px,0) scale(1.08)' },
        },
        float: {
          '0%,100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        shimmer: {
          '100%': { transform: 'translateX(100%)' },
        },
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        aurora: 'aurora-shift 14s ease-in-out infinite',
        float: 'float 6s ease-in-out infinite',
        shimmer: 'shimmer 2s infinite',
        'fade-up': 'fade-up 0.6s ease-out both',
      },
    },
  },
  plugins: [],
};

export default config;
