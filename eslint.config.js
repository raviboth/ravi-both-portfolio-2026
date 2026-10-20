// @ts-check
import js from '@eslint/js';
import { defineConfig } from 'eslint/config';
import tseslint from 'typescript-eslint';
import svelte from 'eslint-plugin-svelte';
import astro from 'eslint-plugin-astro';
import prettier from 'eslint-config-prettier';
import globals from 'globals';

export default defineConfig(
  {
    ignores: ['dist/', '.astro/', '.cache/', 'storybook-static/', 'node_modules/'],
  },
  js.configs.recommended,
  tseslint.configs.recommended,
  svelte.configs.recommended,
  astro.configs.recommended,
  {
    languageOptions: {
      globals: { ...globals.browser, ...globals.node },
    },
  },
  {
    files: ['**/*.svelte', '**/*.svelte.ts'],
    languageOptions: {
      parserOptions: {
        parser: tseslint.parser,
        extraFileExtensions: ['.svelte'],
      },
    },
    rules: {
      // Core rule cannot see template usage, so it flags $props() bindings used only in markup.
      'no-useless-assignment': 'off',
    },
  },
  prettier,
  svelte.configs.prettier,
);
