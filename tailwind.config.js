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
        'primary-100': '#f0f5fb',
        'primary-200': '#ced9ea',
        'primary-300': '#8bafdc',
        'primary': '#3e6daa',
        'secondary-100': '#86be44',
        'secondary-200': '#d7e6be',
        'secondary-300': '#87be44',
        'secondary': '#14ac53',
        'dark-100': '#eaeae9',
        'dark-200': '#c6c5c5',
        'dark-300': '#a4a4a4',
        'dark': '#414141',
        'aquamarine': '#1CE6A1',
        'gray-battleship': '#9999',
        'gray-gunmetal': '#263238',
        'black-eerie': '#202020',
        'dark-blue': '#0c00b4',
        'mustard': '#FFDA57',
        'yellow-mikado': '#FDC10E',
        'yellow-jasmine': '#FEE28E',
        'blue-true': '#406ca9',
        'blue-ruddy': '#74a6ec',
        'blue-ncs': '#048bca',
        'ivory': '#f0f6e8',
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
        'hero-thin': ['Roboto-thin'],
        sans: ['Arial'],
      },
    },
  },
  plugins: [],
}
