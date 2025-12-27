/** @type {import('tailwindcss').Config} */
export default {
  // Enable dark mode using class strategy
  darkMode: 'class',
  
  // Scan these files for Tailwind classes
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  
  theme: {
    extend: {
      // Custom green theme colors
      colors: {
        primary: {
          DEFAULT: '#00ff41',
          dark: '#00cc33',
          light: '#33ff66',
        },
        dark: {
          bg: '#0a0e27',
          card: '#1a1f3a',
          border: '#2a3f5f',
        },
        light: {
          bg: '#f8f9fa',
          card: '#ffffff',
          border: '#e0e0e0',
        },
      },
      
      // Custom animations
      animation: {
        'glow': 'glow 2s ease-in-out infinite',
        'float': 'float 3s ease-in-out infinite',
      },
      
      keyframes: {
        glow: {
          '0%, 100%': { 
            boxShadow: '0 0 5px #00ff41, 0 0 10px #00ff41' 
          },
          '50%':  { 
            boxShadow: '0 0 20px #00ff41, 0 0 30px #00ff41' 
          },
        },
        float: {
          '0%, 100%': { 
            transform: 'translateY(0px)' 
          },
          '50%': { 
            transform:  'translateY(-20px)' 
          },
        },
      },
    },
  },
  
  plugins: [],
}