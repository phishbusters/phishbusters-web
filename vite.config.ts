import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';
import path from 'path';

export default defineConfig({
	plugins: [sveltekit()],
	build: {
		commonjsOptions: {
			include: ['tailwind.config.js', 'node_modules/**']
		}
	},
	optimizeDeps: {
		include: ['tailwind-config']
	},
	resolve: {
		alias: {
			'tailwind-config': path.resolve(__dirname, './tailwind.config.js')
		}
	},
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	}
});
