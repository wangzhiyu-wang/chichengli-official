/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          red: '#E53935',
          gold: '#D4A574',
          dark: '#0A0A0A',
          card: 'rgba(26,26,26,0.6)',
          border: 'rgba(255,255,255,0.08)',
        }
      },
      fontFamily: {
        serif: ['"Noto Serif SC"', '"Songti SC"', 'serif'],
        sans: ['-apple-system', 'BlinkMacSystemFont', '"PingFang SC"', '"Microsoft YaHei"', 'sans-serif'],
      }
    },
  },
  plugins: [],
}