import pluginJs from '@eslint/js';
import pluginReact from 'eslint-plugin-react';
import globals from 'globals';
/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    files: ['**/*.{js,mjs,cjs,jsx}'], // Se ajustaron los tipos de archivos permitidos
    languageOptions: {
      globals: globals.browser, // Configuración del entorno global para navegadores
    },
    rules: {
      ...pluginJs.configs.recommended.rules,
      ...pluginReact.configs.flat.recommended.rules, // Reglas para React
    },
  },
];
