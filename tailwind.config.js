/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#6366f1', // Indigo
          foreground: '#ffffff',
        },
        secondary: {
          DEFAULT: '#06b6d4', // Cyan
          foreground: '#ffffff',
        },
        dark: {
          bg: '#0f172a',
          card: 'rgba(255,255,255,0.05)',
        },
        light: {
          bg: '#f8fafc',
          card: '#ffffff',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
