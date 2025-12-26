/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#00ff41',
        secondary: '#1a1a1a',
        dark: '#0a0a0a',
      },
      backgroundImage: {
        'cyber-grid': "linear-gradient(rgba(0, 255, 65, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 255, 65, 0.1) 1px, transparent 1px)",
      },
    },
  },
  plugins:  [],
}