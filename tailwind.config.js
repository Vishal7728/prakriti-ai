export default {
  darkMode: 'class',
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        prakriti: {
          bg: '#050609',
          surface: '#08090D',
          card: '#0D0F12',
          'card-hover': '#13161B',
          pink: '#FF3B9D',
          'pink-light': '#FF4FA8',
          'pink-dim': '#8B2856',
          green: '#55E88A',
          'green-light': '#72FF9B',
          gold: '#E8B94A',
          'gold-light': '#FFD76A',
          white: '#F4F1F4',
          muted: '#8F8A92',
          'muted-dark': '#5A565E',
          border: 'rgba(255,255,255,0.16)',
          'border-active': 'rgba(255,59,157,0.4)',
          red: '#FF4757',
          'red-dim': '#8B2A30',
        }
      },
      fontFamily: {
        hindi: ['"Noto Sans Devanagari"', 'sans-serif'],
        sans: ['Inter', '"Noto Sans Devanagari"', 'sans-serif'],
      },
      animation: {
        'breathe': 'breathe 4s ease-in-out infinite',
        'glow-pulse': 'glow-pulse 3s ease-in-out infinite',
        'rotate-slow': 'rotate-slow 20s linear infinite',
        'wave': 'wave 1.2s ease-in-out infinite',
        'shimmer': 'shimmer 2.5s linear infinite',
        'float': 'float 6s ease-in-out infinite',
        'fade-in': 'fade-in 0.5s ease-out',
        'slide-up': 'slide-up 0.4s ease-out',
        'slide-in-left': 'slide-in-left 0.3s ease-out',
      },
      keyframes: {
        breathe: {
          '0%, 100%': { transform: 'scale(1)', opacity: '0.95' },
          '50%': { transform: 'scale(1.015)', opacity: '1' },
        },
        'glow-pulse': {
          '0%, 100%': { boxShadow: '0 0 20px rgba(255,59,157,0.3), 0 0 40px rgba(255,59,157,0.1)' },
          '50%': { boxShadow: '0 0 30px rgba(255,59,157,0.5), 0 0 60px rgba(255,59,157,0.2)' },
        },
        'rotate-slow': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        wave: {
          '0%, 100%': { transform: 'scaleY(0.3)' },
          '50%': { transform: 'scaleY(1)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'slide-up': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'slide-in-left': {
          '0%': { opacity: '0', transform: 'translateX(-100%)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
      },
      backgroundImage: {
        'prakriti-radial': 'radial-gradient(ellipse at center, rgba(255,59,157,0.08) 0%, transparent 70%)',
        'prakriti-gold-radial': 'radial-gradient(ellipse at top, rgba(232,185,74,0.06) 0%, transparent 60%)',
      },
    },
  },
  plugins: [],
}