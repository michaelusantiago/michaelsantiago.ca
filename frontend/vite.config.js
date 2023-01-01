import { sveltekit } from '@sveltejs/kit/vite';

/** @type {import('vite').UserConfig} */
const config = {
	plugins: [sveltekit()],
	server: {
		port: 3005
	},
	ssr: {
		noExternal: ['@fortawesome/free-solid-svg-icons', '@fortawesome/free-brands-svg-icons']
	},
	build: {
		target: 'esnext'
	},
};

export default config;