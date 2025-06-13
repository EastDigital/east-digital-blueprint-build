import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./index.html",
		"./src/**/*.{js,ts,jsx,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: {
				DEFAULT: '1rem',
				sm: '2rem',
			},
			screens: {
				sm: '100%',
				md: '90%',
				lg: '90%',
				xl: '1140px',
				'2xl': '1320px',
			},
		},
		extend: {
			fontFamily: {
				poppins: ['Poppins', 'sans-serif'],
			},
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				eastdigital: {
					orange: '#FF6900',
					hover: '#FFE0CA',
					dark: '#0E0E0E',
					gray: '#363636',
					lightgray: '#999999',
				},
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' },
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' },
				},
        // --- START: NEW AURORA KEYFRAMES ---
        "aurora-1": {
          "0%, 100%": { transform: "translate(-20%, -20%)" },
          "50%": { transform: "translate(20%, 20%)" },
        },
        "aurora-2": {
          "0%, 100%": { transform: "translate(20%, 20%)" },
          "50%": { transform: "translate(-20%, -20%)" },
        },
        "aurora-3": {
          "0%, 100%": { transform: "translate(10%, -10%)" },
          "50%": { transform: "translate(-10%, 10%)" },
        },
        // --- END: NEW AURORA KEYFRAMES ---
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
        // --- START: NEW AURORA ANIMATIONS ---
        "aurora-1": "aurora-1 25s infinite alternate ease-in-out",
        "aurora-2": "aurora-2 30s infinite alternate ease-in-out",
        "aurora-3": "aurora-3 35s infinite alternate ease-in-out",
        // --- END: NEW AURORA ANIMATIONS ---
			},
		},
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
