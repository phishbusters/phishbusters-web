import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';

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
		}
	},
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	}
});
