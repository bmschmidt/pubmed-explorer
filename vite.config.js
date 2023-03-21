import { sveltekit } from '@sveltejs/kit/vite';

/** @type {import('vite').UserConfig} */
const config = {
	build: {
		minify: false
	},
	plugins: [sveltekit()],
	optimizeDeps: {
    exclude: ['pandoc-svelte-components'],
  },
};

export default config;
