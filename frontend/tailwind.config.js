/** @type {import('tailwindcss').Config} */

module.exports =  {
  darkMode: 'class', // This is important!
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'infinite-scroll-ltr': 'infinite-scroll-ltr 25s linear infinite',
        'infinite-scroll-rtl': 'infinite-scroll-rtl 25s linear infinite',
      },
      keyframes: {
        'infinite-scroll-ltr': {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-100%)' },
        },
        'infinite-scroll-rtl': {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(0)' },
        }
      }
    },
  },
  plugins: [],
};