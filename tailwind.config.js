/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ["class"],
    content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
  	screens: {
  		sm: '480px',
  		md: '768px',
  		lg: '976px',
  		xl: '1200px'
  	},
  	extend: {
  		animation: {
  			shake: 'shake 0.5s',
  			'vertical-shake': 'vertical-shake 0.5s'
  		},
  		keyframes: {
  			shake: {
  				'0%, 100%': {
  					transform: 'translateX(0)'
  				},
  				'25%, 75%': {
  					transform: 'translateX(-3px)'
  				},
  				'50%, 100%': {
  					transform: 'translateX(3px)'
  				}
  			},
  			'vertical-shake': {
  				'0%, 100%': {
  					transform: 'translateY(0)'
  				},
  				'25%, 75%': {
  					transform: 'translateY(-3px)'
  				},
  				'50%, 100%': {
  					transform: 'translateY(3px)'
  				}
  			}
  		},
  		colors: {
  			'primary-100': '#f0f5fb',
  			'primary-200': '#ced9ea',
  			'primary-300': '#8bafdc',
  			'primary-400': '#138bc4',
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			'primary-hover': '#6097D0',
  			'secondary-100': '#86be44',
  			'secondary-200': '#d7e6be',
  			'secondary-300': '#87be44',
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			'dark-50': '#f9fafb',
  			'dark-100': '#eaeae9',
  			'dark-200': '#c6c5c5',
  			'dark-300': '#77777a',
  			'dark-400': '#464747',
  			dark: '#414141',
  			'navbar-icon': '#c0cce1',
  			aquamarine: '#1CE6A1',
  			'light-input-text': '#7F90B0',
  			'gray-battleship': '#9999',
  			'gray-gunmetal': '#263238',
  			'black-eerie': '#202020',
  			onyx: '#404040',
  			'dark-blue': '#0c00b4',
  			mustard: '#FFDA57',
  			'yellow-mikado': '#FDC10E',
  			'yellow-jasmine': '#FEE28E',
  			'blue-true': '#406ca9',
  			'blue-ruddy': '#74a6ec',
  			'blue-ncs': '#048bca',
  			nyanza: '#E0EDD0',
  			'navbar-primary-title': '#557db4',
  			'navbar-gray': '#adbbd1',
  			'input-placeholder': '#a3b1d3',
  			'icons-gray': '#c6c6c5',
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		opacity: {
  			'15': '0.15'
  		},
  		borderRadius: {
  			'4xl': '50px',
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		fontFamily: {
  			'hero-bold': [
  				'Roboto-bold'
  			],
  			'hero-semibold': [
  				'Roboto-medium'
  			],
  			'hero-light': [
  				'Roboto-light'
  			],
  			'hero-thin': [
  				'Roboto-thin'
  			],
  			sans: [
  				'Arial'
  			]
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
}
