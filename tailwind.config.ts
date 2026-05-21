import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'iris-blue': '#1F4E79',
        'iris-teal': '#00A693',
        'iris-blue-mid': '#2E6FA3',
        'dark-bg': '#0A0F1A',
        'dark-card': '#111827',
        'dark-border': '#1F2937',
        'gray-text': '#64748B',
        'gray-dark': '#1E293B',
      },
      fontFamily: {
        display: ['var(--font-display)', 'sans-serif'],
        body: ['var(--font-body)', 'sans-serif'],
      },
      animation: {
        'marquee': 'marquee 25s linear infinite',
        'float': 'float 3s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'spin-slow': 'spin 3s linear infinite',
        'pulse-dot': 'pulse-dot 2s ease-in-out infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        glow: {
          from: { boxShadow: '0 0 20px #00A69344' },
          to: { boxShadow: '0 0 40px #00A69388' },
        },
        'pulse-dot': {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.5', transform: 'scale(0.8)' },
        },
      },
      backgroundImage: {
        'gradient-mesh': 'radial-gradient(at 40% 20%, #1F4E7920 0px, transparent 50%), radial-gradient(at 80% 0%, #00A69310 0px, transparent 50%), radial-gradient(at 0% 50%, #2E6FA310 0px, transparent 50%)',
      },
    },
  },
  plugins: [],
}

export default config
