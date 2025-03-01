// @ts-check
import eslint from '@eslint/js';
import globals from 'globals';

export default [
  {
    languageOptions: { globals: { ...globals.browser, ...globals.node } },
  },
  eslint.configs.recommended,
];
