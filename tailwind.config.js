/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      opacity: {
        '15': '0.15',
      },
      borderRadius: {
        '4xl': '50px',
      },
      fontFamily: {
        'hero-bold': ['Roboto-bold'],
        'hero-light': ['Roboto-light'],
      }
    }
  },
  plugins: [],
}
