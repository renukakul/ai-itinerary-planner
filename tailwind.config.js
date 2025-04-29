/** @type {import('tailwindcss').Config} */
export default {
	darkMode: ["class"],
	content: [
	  "./src/**/*.{js,jsx,ts,tsx}",
	  "./public/index.html",
	  "./src/**/*.{html,js}",
	  "./src/**/*.{html,js,ts,jsx,tsx}",
	],
	theme: {
	  extend: {
		borderRadius: {
		  lg: 'var(--radius)',
		  md: 'calc(var(--radius) - 2px)',
		  sm: 'calc(var(--radius) - 4px)'
		},
		colors: {
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
		  primary: {
			DEFAULT: 'hsl(var(--primary))',
			foreground: 'hsl(var(--primary-foreground))'
		  },
		  secondary: {
			DEFAULT: 'hsl(var(--secondary))',
			foreground: 'hsl(var(--secondary-foreground))'
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
		animation: {
			'fade-in-up': 'fadeInUp 1s ease-out forwards',
			'float': 'float 8s ease-in-out infinite',
			'float-slow': 'float 12s ease-in-out infinite',
			'float-delay': 'float 10s ease-in-out 2s infinite',
			'pulse-slow': 'pulse 8s cubic-bezier(0.4, 0, 0.6, 1) infinite',
		  },
		  keyframes: {
			fadeInUp: {
			  '0%': { opacity: '0', transform: 'translateY(30px) scale(0.95)' },
			  '100%': { opacity: '1', transform: 'translateY(0) scale(1)' },
			},
			float: {
			  '0%, 100%': { transform: 'translateY(0) rotate(0deg)' },
			  '50%': { transform: 'translateY(-30px) rotate(2deg)' },
			},
			pulse: {
			  '0%, 100%': { opacity: '0.5' },
			  '50%': { opacity: '0.2' },
		  }
		}
	  },
	},
	plugins: [require("tailwindcss-animate")]
  }