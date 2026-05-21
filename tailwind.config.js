/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./*.html",
    "./blog/**/*.html",
    "./website/**/*.{html,js}",
    "./js/**/*.js",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#00F5D4',
        secondary: '#7C3AED',
        accent: '#00D9FF',
        darkBg: '#080B14',
        darkSurface: '#0F1419',
        darkText: '#E0E7FF',
        darkMuted: '#64748B',
        lightBg: '#F8FAFC',
        lightText: '#1E293B',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out',
        'slide-up': 'slideUp 0.6s ease-out',
        float: 'float 3s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [],
}