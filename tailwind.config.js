/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      sm: "480px",
      md: "768px",
      lg: "976px",
      xl: "1200px",
    },
    extend: {
      colors: {
        'gunmetal': '#263238',
        'aquamarine': '#1CE6A1',
        'yellow-green': '#86bf44',
        'gray-battleship': '#9999',
        'gray-gunmetal': '#263238',
        'black-eerie': '#202020',
        'dark-blue': '#0c00b4',
        'mustard': '#FFDA57',
        'yellow-mikado': '#FDC10E',
      },
      opacity: {
        '15': '0.15',
      },
      borderRadius: {
        '4xl': '50px',
      },
      fontFamily: {
        'hero-bold': ['Roboto-bold'],
        'hero-light': ['Roboto-light'],
        sans: ['Arial'],
      },
    },
  },
  plugins: [],
}
