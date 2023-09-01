import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';
import path from 'path';

export default defineConfig({
	plugins: [sveltekit()],
	build: {
		rollupOptions: {
			// external: ['svelte', '@sveltejs/kit']
			manualChunks(id) {
				if (id.includes('node_modules')) {
					return id.toString().split('node_modules/')[1].split('/')[0].toString();
				}
			}
		},
		commonjsOptions: {
			include: ['tailwind.config.js', 'node_modules/**']
		}
	},
	optimizeDeps: {
		include: ['tailwind-config']
	},
	resolve: {
		alias: {
			'tailwind-config': path.resolve(__dirname, './tailwind.config.cjs')
		}
	},
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	}
});
