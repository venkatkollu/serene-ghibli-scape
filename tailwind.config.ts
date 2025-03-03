import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
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
				ghibli: {
					'grass': '#9ACD32',
					'sky': '#87CEEB',
					'sunbeam': '#FFD700',
					'earth': '#8B4513',
					'cloud': '#F5F5F5',
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				"accordion-down": {
					from: { height: "0", opacity: "0" },
					to: { height: "var(--radix-accordion-content-height)", opacity: "1" }
				},
				"accordion-up": {
					from: { height: "var(--radix-accordion-content-height)", opacity: "1" },
					to: { height: "0", opacity: "0" }
				},
				"fade-in": {
					"0%": {
						opacity: "0",
						transform: "translateY(10px)"
					},
					"100%": {
						opacity: "1",
						transform: "translateY(0)"
					}
				},
				"fade-out": {
					"0%": {
						opacity: "1",
						transform: "translateY(0)"
					},
					"100%": {
						opacity: "0",
						transform: "translateY(10px)"
					}
				},
				"float": {
					"0%, 100%": {
						transform: "translateY(0)"
					},
					"50%": {
						transform: "translateY(-10px)"
					}
				},
				"sway": {
					"0%, 100%": {
						transform: "rotate(0deg)"
					},
					"50%": {
						transform: "rotate(0deg)"
					}
				},
				"spin-slow": {
					"0%": {
						transform: "rotate(0deg)"
					},
					"100%": {
						transform: "rotate(360deg)"
					}
				},
				"breathe": {
					"0%, 100%": {
						transform: "scale(1)"
					},
					"50%": {
						transform: "scale(1.05)"
					}
				},
				"leaves-fall": {
					"0%": {
						transform: "translateY(-10px) rotate(0deg)",
						opacity: "0"
					},
					"10%": {
						opacity: "1"
					},
					"100%": {
						transform: "translateY(100vh) rotate(360deg)",
						opacity: "0"
					}
				},
				"cloud-drift": {
					"0%": {
						transform: "translateX(-5%)"
					},
					"50%": {
						transform: "translateX(5%)"
					},
					"100%": {
						transform: "translateX(-5%)"
					}
				}
			},
			animation: {
				"accordion-down": "accordion-down 0.2s ease-out",
				"accordion-up": "accordion-up 0.2s ease-out",
				"fade-in": "fade-in 0.5s ease-out",
				"fade-out": "fade-out 0.5s ease-out",
				"float": "float 6s ease-in-out infinite",
				"sway": "sway 8s ease-in-out infinite",
				"spin-slow": "spin-slow 12s linear infinite",
				"breathe": "breathe 4s ease-in-out infinite",
				"leaves-fall": "leaves-fall 10s linear forwards",
				"cloud-drift": "cloud-drift 30s ease-in-out infinite"
			},
			backgroundImage: {
				'ghibli-gradient': 'linear-gradient(to bottom, rgba(135, 206, 235, 0.8), rgba(154, 205, 50, 0.4))',
				'warm-gradient': 'linear-gradient(to right, rgba(255, 215, 0, 0.2), rgba(255, 215, 0, 0.05))'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
