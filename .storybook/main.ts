import type { StorybookConfig } from '@storybook/svelte-vite';

const config: StorybookConfig = {
  "stories": [
    "../src/**/*.mdx",
    "../src/**/*.stories.@(js|ts)"
  ],
  "addons": [
    "@chromatic-com/storybook",
    "@storybook/addon-vitest",
    "@storybook/addon-a11y",
    "@storybook/addon-docs"
  ],
  "framework": "@storybook/svelte-vite",
  async viteFinal(config) {
    const { svelte } = await import('@sveltejs/vite-plugin-svelte');

    // Add the Svelte Vite plugin since this Astro project has no vite.config.
    // Configure it to also compile @storybook/svelte .svelte files in node_modules.
    config.plugins = config.plugins || [];
    config.plugins.unshift(
      svelte({
        configFile: false,
        extensions: ['.svelte'],
      }),
    );

    // Exclude @storybook/svelte from dep optimization so its .svelte files
    // go through Vite's transform pipeline (where the svelte plugin runs)
    // instead of being pre-bundled by esbuild (which can't handle .svelte).
    config.optimizeDeps = config.optimizeDeps || {};
    config.optimizeDeps.exclude = [
      ...(config.optimizeDeps.exclude || []),
      '@storybook/svelte',
    ];

    return config;
  },
};
export default config;
