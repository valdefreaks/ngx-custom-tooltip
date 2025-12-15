import { defineConfig, globalIgnores } from 'eslint/config';
import angularEslint from '@angular-eslint/eslint-plugin';
import typescriptEslint from '@typescript-eslint/eslint-plugin';
import prettier from 'eslint-plugin-prettier';
import _import from 'eslint-plugin-import';
import { fixupPluginRules } from '@eslint/compat';
import tsParser from '@typescript-eslint/parser';
import angularEslintTemplate from '@angular-eslint/eslint-plugin-template';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import js from '@eslint/js';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

export default defineConfig([
  globalIgnores([
    '.angular/**/*',
    '.idea/**/*',
    '.husky/**/*',
    '.github/**/*',
    'node_modules/**/*',
    'dist/**/*',
    '**/src/index.html',
  ]),
  {
    files: ['**/*.ts'],

    extends: compat.extends(
      'eslint:recommended',
      'plugin:@angular-eslint/recommended',
      'plugin:@angular-eslint/template/process-inline-templates',
      'plugin:@typescript-eslint/recommended',
      'plugin:prettier/recommended',
    ),
    plugins: {
      '@angular-eslint': angularEslint,
      '@typescript-eslint': typescriptEslint,
      prettier,
      import: fixupPluginRules(_import),
    },
    languageOptions: {
      parser: tsParser,
      ecmaVersion: 2022,
      sourceType: 'module',

      parserOptions: {
        project: ['tsconfig.json'],
        createDefaultProgram: false,
      },
    },
    rules: {
      'prettier/prettier': 'warn',
      '@angular-eslint/directive-selector': [
        'error',
        {
          type: 'attribute',
          prefix: ['app', 'lib'],
          style: 'camelCase',
        },
      ],
      '@angular-eslint/component-selector': [
        'error',
        {
          type: 'element',
          prefix: ['app', 'lib', 'ngx'],
          style: 'kebab-case',
        },
      ],
      '@angular-eslint/prefer-standalone': 'warn',
      eqeqeq: 'error',
      'no-var': 'error',
      'prefer-const': 'error',
      'require-await': 'error',
      complexity: [
        'warn',
        {
          max: 10,
        },
      ],
      'max-lines-per-function': [
        'warn',
        {
          max: 200,
          skipBlankLines: true,
          skipComments: true,
        },
      ],
      'max-nested-callbacks': [
        'warn',
        {
          max: 3,
        },
      ],
      'import/order': [
        'warn',
        {
          groups: [
            'builtin',
            'external',
            'internal',
            'parent',
            'sibling',
            'index',
          ],
          'newlines-between': 'always',

          alphabetize: {
            order: 'asc',
            caseInsensitive: true,
          },
        },
      ],
    },
  },
  {
    files: ['**/*.component.html'],
    extends: compat.extends(
      'plugin:@angular-eslint/template/recommended',
      'plugin:prettier/recommended',
    ),
    plugins: {
      '@angular-eslint/template': angularEslintTemplate,
      prettier,
    },
    rules: {},
  },
]);
