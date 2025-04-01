import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess as preprocess } from '@sveltejs/vite-plugin-svelte'

/** @type {import('@sveltejs/kit').Config} */
const config = {
    preprocess: preprocess(),

    kit: {
        adapter: adapter()
    }
};

export default config;
