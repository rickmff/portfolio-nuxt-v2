/** @type {import('tailwindcss').Config} */

export default {
  content: [],
  theme: {
    fontFamily: {
      'hero': ['"Julius Sans One"', 'sans-serif'],
    },
    extend: {
      colors: {
        background: '#121213',
        primary: '#FF530A',
        secondary: '#5D5D5D',
      },
    },
    screens: {
      'xs': '480px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
    },
  },
  plugins: [],
}

