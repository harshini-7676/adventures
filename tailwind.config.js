/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
        body: ['"Inter"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      colors: {
        void: {
          950: '#02030a',
          900: '#050714',
          800: '#0a0e22',
          700: '#111634',
        },
        nebula: {
          cyan: '#22d3ee',
          blue: '#3b82f6',
          teal: '#2dd4bf',
          rose: '#fb7185',
          amber: '#fbbf24',
          violet: '#a78bfa',
        },
        abyss: {
          cyan: '#06b6d4',
          teal: '#14b8a6',
          deep: '#0c4a6e',
          midnight: '#082f49',
          bio: '#34d399',
          glow: '#a7f3d0',
          coral: '#fb7185',
        },
      },
      boxShadow: {
        glow: '0 0 40px -10px rgba(34, 211, 238, 0.45)',
        'glow-lg': '0 0 80px -15px rgba(34, 211, 238, 0.6)',
        'glow-rose': '0 0 50px -10px rgba(251, 113, 133, 0.5)',
        'glow-bio': '0 0 50px -10px rgba(52, 211, 153, 0.5)',
        'glow-teal': '0 0 40px -10px rgba(20, 184, 166, 0.45)',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'pulse-slow': {
          '0%, 100%': { opacity: '0.6' },
          '50%': { opacity: '1' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        twinkle: {
          '0%, 100%': { opacity: '0.2' },
          '50%': { opacity: '1' },
        },
        drift: {
          '0%': { transform: 'translateX(-10px) translateY(0)' },
          '50%': { transform: 'translateX(10px) translateY(-8px)' },
          '100%': { transform: 'translateX(-10px) translateY(0)' },
        },
        sway: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
        'glow-pulse': {
          '0%, 100%': { opacity: '0.4', filter: 'brightness(1)' },
          '50%': { opacity: '0.9', filter: 'brightness(1.4)' },
        },
        'wave': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' },
        },
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse-slow 4s ease-in-out infinite',
        shimmer: 'shimmer 3s linear infinite',
        'fade-up': 'fade-up 0.8s ease-out forwards',
        twinkle: 'twinkle 3s ease-in-out infinite',
        drift: 'drift 8s ease-in-out infinite',
        sway: 'sway 5s ease-in-out infinite',
        'glow-pulse': 'glow-pulse 3s ease-in-out infinite',
        wave: 'wave 4s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
