import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        night: {
          bg: '#060606',
          card: '#0f0f0f',
          cardHover: '#161616',
          border: 'rgba(139,92,246,0.15)',
          borderHover: 'rgba(139,92,246,0.45)',
          accent: '#7c3aed',
          accentLight: '#8b5cf6',
          accentDim: 'rgba(124,58,237,0.18)',
        },
      },
      fontFamily: {
        display: ['var(--font-bebas)', 'sans-serif'],
        body: ['var(--font-inter)', 'sans-serif'],
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        glow: {
          '0%, 100%': { boxShadow: '0 0 8px rgba(124,58,237,0.3)' },
          '50%': { boxShadow: '0 0 20px rgba(124,58,237,0.6)' },
        },
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(16px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        shimmer: 'shimmer 1.8s infinite linear',
        glow: 'glow 2.4s ease-in-out infinite',
        fadeUp: 'fadeUp 0.4s ease forwards',
      },
    },
  },
  plugins: [],
};

export default config;
