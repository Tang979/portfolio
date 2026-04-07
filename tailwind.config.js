/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './layouts/**/*.html',
    './content/**/*.{html,md}',
    './themes/**/*.html',
    './assets/**/*.js',
  ],
  theme: {
    extend: {
      colors: {
        seed: {
          bg: '#0a0a0a',
          forest: '#2d5a27',
          'forest-light': '#4a8c42',
          'forest-dark': '#1a3517',
          glass: 'rgba(255, 255, 255, 0.04)',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      },
      animation: {
        'seed-grow': 'seedGrow 9s ease-in-out infinite',
        'glow-float': 'glowFloat 7s ease-in-out infinite',
        'fade-in-up': 'fadeInUp 0.8s ease forwards',
        'scroll-bounce': 'scrollBounce 1.8s ease-in-out infinite',
      },
      keyframes: {
        seedGrow: {
          '0%, 100%': { transform: 'scale(1) rotate(0deg)' },
          '50%': { transform: 'scale(1.06) rotate(4deg)' },
        },
        glowFloat: {
          '0%, 100%': { transform: 'translateY(0px)', opacity: '0.5' },
          '50%': { transform: 'translateY(-18px)', opacity: '0.9' },
        },
        fadeInUp: {
          from: { opacity: '0', transform: 'translateY(28px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        scrollBounce: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(6px)' },
        },
      },
    },
  },
  plugins: [],
};
