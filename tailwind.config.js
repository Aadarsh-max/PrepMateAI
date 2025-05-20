/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'neon-green': '#39ff14',
        'neon-blue': '#00eaff',
        'neon-pink': '#ff00c8',
        'neon-yellow': '#ffe600',
      },
      dropShadow: {
        glow: '0 0 10px rgba(0,255,255,0.7), 0 0 20px rgba(0,255,255,0.5)',
      },
      animation: {
        blob1: 'blob 7s infinite',
        blob2: 'blob 6s infinite',
        blob3: 'blob 8s infinite',
        blob4: 'blob 10s infinite',
      },
      keyframes: {
        blob: {
          '0%, 100%': { transform: 'translate(0px, 0px) scale(1)' },
          '33%': { transform: 'translate(30px, -50px) scale(1.1)' },
          '66%': { transform: 'translate(-20px, 20px) scale(0.9)' },
        },
      },
    },
  },
  plugins: [],
}
