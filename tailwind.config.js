/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50:  '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          500: '#3b82f6',
          600: '#1d6fe0',
          700: '#1554b8',
        },
        success: {
          50:  '#f0fdf4',
          100: '#dcfce7',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
        },
        danger: {
          50:  '#fff1f2',
          100: '#ffe4e6',
          500: '#ef4444',
          600: '#dc2626',
          700: '#b91c1c',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Menlo', 'monospace'],
      },
      boxShadow: {
        card:  '0 1px 3px rgba(0,0,0,0.06), 0 4px 16px rgba(0,0,0,0.06)',
        modal: '0 20px 60px rgba(0,0,0,0.15)',
      },
      keyframes: {
        fadeIn:   { from: { opacity: '0' },                                         to: { opacity: '1' } },
        slideUp:  { from: { opacity: '0', transform: 'translateY(12px)' },          to: { opacity: '1', transform: 'translateY(0)' } },
        scaleIn:  { from: { opacity: '0', transform: 'scale(0.93)' },               to: { opacity: '1', transform: 'scale(1)' } },
        modalIn:  { from: { opacity: '0', transform: 'scale(0.92) translateY(12px)' }, to: { opacity: '1', transform: 'scale(1) translateY(0)' } },
        shimmer:  { '0%,100%': { opacity: '0.4' }, '50%': { opacity: '0.85' } },
        rowIn:    { from: { opacity: '0', transform: 'translateX(-6px)' },          to: { opacity: '1', transform: 'translateX(0)' } },
        checkmark:{ from: { strokeDashoffset: '32' },                               to: { strokeDashoffset: '0' } },
        pulseRing:{ '0%': { transform: 'scale(0.9)', opacity: '0.5' }, '70%': { transform: 'scale(1.25)', opacity: '0' }, '100%': { opacity: '0' } },
      },
      animation: {
        'fade-in':   'fadeIn 0.25s ease both',
        'slide-up':  'slideUp 0.35s cubic-bezier(0.16,1,0.3,1) both',
        'scale-in':  'scaleIn 0.35s cubic-bezier(0.16,1,0.3,1) both',
        'modal-in':  'modalIn 0.35s cubic-bezier(0.16,1,0.3,1) both',
        'shimmer':   'shimmer 1.4s ease-in-out infinite',
        'row-in':    'rowIn 0.28s cubic-bezier(0.16,1,0.3,1) both',
        'checkmark': 'checkmark 0.45s cubic-bezier(0.16,1,0.3,1) 0.25s both',
        'pulse-ring':'pulseRing 1.6s ease-out infinite',
      },
    },
  },
  plugins: [],
};
