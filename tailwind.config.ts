import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: '#1A1A2E',
          deep: '#0a0a14',
        },
        violet: {
          DEFAULT: '#7C3AED',
          light: '#9d7eff',
          50: '#f5f3ff',
        },
        brand: {
          blue: '#5B4FE9',
          pink: '#EC4899',
        },
        offwhite: '#F8F8FB',
        mute: 'rgba(248, 248, 251, 0.65)',
        line: 'rgba(248, 248, 251, 0.12)',
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
        display: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      },
      letterSpacing: {
        tightest: '-0.025em',
        eyebrow: '0.22em',
      },
      animation: {
        'scroll-pulse': 'scroll-pulse 2.4s ease-in-out infinite',
        'fade-in': 'fade-in 600ms cubic-bezier(0.4, 0, 0.2, 1) forwards',
      },
      keyframes: {
        'scroll-pulse': {
          '0%, 100%': { opacity: '0.3', transform: 'scaleY(0.6)' },
          '50%': { opacity: '1', transform: 'scaleY(1)' },
        },
        'fade-in': {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
};

export default config;
