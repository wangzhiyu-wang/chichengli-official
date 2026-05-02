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
          orange: '#FF6B35',
          deep: '#E85A2D',
          cream: '#FFF8F0',
          warm: '#F5E6D3',
          dark: '#1A1A1A',
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