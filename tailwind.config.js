import plugin from 'tailwindcss/plugin';
import colors from 'tailwindcss/colors';
import forms from '@tailwindcss/forms';

const parseColor = (value) => {
	if (value.charAt(0) === '#') {
		const r = parseInt(value.substr(1, 2), 16);
		const g = parseInt(value.substr(3, 2), 16);
		const b = parseInt(value.substr(5, 2), 16);
		return { r, g, b };
	}

	return { r: 0, g: 0, b: 0 };
};

const toRGB = (value) => {
	const colorObject = parseColor(value);
	return `${colorObject.r} ${colorObject.g} ${colorObject.b}`;
};

export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			colors: {
				primary: 'rgb(var(--color-primary) / <alpha-value>)',
				secondary: 'rgb(var(--color-secondary) / <alpha-value>)',
				success: 'rgb(var(--color-success) / <alpha-value>)',
				info: 'rgb(var(--color-info) / <alpha-value>)',
				warning: 'rgb(var(--color-warning) / <alpha-value>)',
				pending: 'rgb(var(--color-pending) / <alpha-value>)',
				danger: 'rgb(var(--color-danger) / <alpha-value>)',
				light: 'rgb(var(--color-light) / <alpha-value>)',
				dark: 'rgb(var(--color-dark) / <alpha-value>)',
				darkmode: {
					50: 'rgb(var(--color-darkmode-50) / <alpha-value>)',
					100: 'rgb(var(--color-darkmode-100) / <alpha-value>)',
					200: 'rgb(var(--color-darkmode-200) / <alpha-value>)',
					300: 'rgb(var(--color-darkmode-300) / <alpha-value>)',
					400: 'rgb(var(--color-darkmode-400) / <alpha-value>)',
					500: 'rgb(var(--color-darkmode-500) / <alpha-value>)',
					600: 'rgb(var(--color-darkmode-600) / <alpha-value>)',
					700: 'rgb(var(--color-darkmode-700) / <alpha-value>)',
					800: 'rgb(var(--color-darkmode-800) / <alpha-value>)',
					900: 'rgb(var(--color-darkmode-900) / <alpha-value>)'
				}
			},
			fontWeight: {
				normal: '500',
				medium: '600',
				semibold: '700'
			},
			fontFamily: {
				'public-sans': ['Public Sans']
			},
			container: {
				center: true
			},
			maxWidth: {
				'1/4': '25%',
				'1/2': '50%',
				'3/4': '75%'
			},
			strokeWidth: {
				0.5: 0.5,
				1.5: 1.5,
				2.5: 2.5
			},
			backgroundImage: {
				'bredcrumb-chevron-dark':
					"url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='1' stroke-linecap='round' stroke-linejoin='round' class='feather feather-chevron-right breadcrumb__icon'%3E%3Cpolyline points='9 18 15 12 9 6'%3E%3C/polyline%3E%3C/svg%3E\")",
				'bredcrumb-chevron-light':
					"url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%23e8eeff' stroke-width='1' stroke-linecap='round' stroke-linejoin='round' class='feather feather-chevron-right breadcrumb__icon'%3E%3Cpolyline points='9 18 15 12 9 6'%3E%3C/polyline%3E%3C/svg%3E\")",
				'bredcrumb-chevron-darkmode':
					"url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%23718096' stroke-width='1' stroke-linecap='round' stroke-linejoin='round' class='feather feather-chevron-right breadcrumb__icon'%3E%3Cpolyline points='9 18 15 12 9 6'%3E%3C/polyline%3E%3C/svg%3E\")"
			},
			keyframes: {
				// Side & simple menu
				'intro-divider': {
					'100%': {
						opacity: 1
					}
				},
				'intro-menu': {
					'100%': {
						opacity: 1,
						transform: 'translateX(0px)'
					}
				},

				// Top menu
				'intro-top-menu': {
					'100%': {
						opacity: 1,
						transform: 'translateY(0px)'
					}
				}
			}
		}
	},
	variants: {
		extend: {}
	},
	plugins: [
		forms(),
		plugin(function ({ addBase, matchUtilities }) {
			addBase({
				// Default colors
				':root': {
					'--color-primary': toRGB(colors.emerald['900']),
					'--color-secondary': toRGB(colors.slate['200']),
					'--color-success': toRGB(colors.emerald['600']),
					'--color-info': toRGB(colors.cyan['500']),
					'--color-warning': toRGB(colors.yellow['400']),
					'--color-pending': toRGB(colors.amber['500']),
					'--color-danger': toRGB(colors.rose['600']),
					'--color-light': toRGB(colors.slate['100']),
					'--color-dark': toRGB(colors.slate['800'])
				},
				// Theme 1 colors
				'.theme-1': {
					'--color-primary': toRGB(colors.blue['800']),
					'--color-secondary': toRGB(colors.slate['200']),
					'--color-success': toRGB(colors.lime['500']),
					'--color-info': toRGB(colors.cyan['500']),
					'--color-warning': toRGB(colors.yellow['400']),
					'--color-pending': toRGB(colors.orange['500']),
					'--color-danger': toRGB(colors.red['600']),
					'--color-light': toRGB(colors.slate['100']),
					'--color-dark': toRGB(colors.slate['800']),
					'&.dark': {
						'--color-primary': toRGB(colors.emerald['800'])
					}
				},
				// Theme 2 colors
				'.theme-2': {
					'--color-primary': toRGB(colors.blue['900']),
					'--color-secondary': toRGB(colors.slate['200']),
					'--color-success': toRGB(colors.teal['600']),
					'--color-info': toRGB(colors.cyan['500']),
					'--color-warning': toRGB(colors.amber['500']),
					'--color-pending': toRGB(colors.orange['500']),
					'--color-danger': toRGB(colors.red['700']),
					'--color-light': toRGB(colors.slate['100']),
					'--color-dark': toRGB(colors.slate['800']),
					'&.dark': {
						'--color-primary': toRGB(colors.blue['800'])
					}
				},
				// Theme 3 colors
				'.theme-3': {
					'--color-primary': toRGB(colors.cyan['900']),
					'--color-secondary': toRGB(colors.slate['200']),
					'--color-success': toRGB(colors.teal['600']),
					'--color-info': toRGB(colors.cyan['500']),
					'--color-warning': toRGB(colors.amber['500']),
					'--color-pending': toRGB(colors.amber['600']),
					'--color-danger': toRGB(colors.red['700']),
					'--color-light': toRGB(colors.slate['100']),
					'--color-dark': toRGB(colors.slate['800']),
					'&.dark': {
						'--color-primary': toRGB(colors.cyan['800'])
					}
				},
				// Theme 4 colors
				'.theme-4': {
					'--color-primary': toRGB(colors.indigo['900']),
					'--color-secondary': toRGB(colors.slate['200']),
					'--color-success': toRGB(colors.emerald['600']),
					'--color-info': toRGB(colors.cyan['500']),
					'--color-warning': toRGB(colors.yellow['500']),
					'--color-pending': toRGB(colors.orange['600']),
					'--color-danger': toRGB(colors.red['700']),
					'--color-light': toRGB(colors.slate['100']),
					'--color-dark': toRGB(colors.slate['800']),
					'&.dark': {
						'--color-primary': toRGB(colors.indigo['700'])
					}
				}
			});

			// Animation delay utilities
			matchUtilities(
				{
					'animate-delay': (value) => ({
						'animation-delay': value
					})
				},
				{
					values: (() => {
						const values = {};
						for (let i = 1; i <= 50; i++) {
							values[i * 10] = `${i * 0.1}s`;
						}
						return values;
					})()
				}
			);

			// Animation fill mode utilities
			matchUtilities(
				{
					'animate-fill-mode': (value) => ({
						'animation-fill-mode': value
					})
				},
				{
					values: {
						none: 'none',
						forwards: 'forwards',
						backwards: 'backwards',
						both: 'both'
					}
				}
			);
		})
	]
};
