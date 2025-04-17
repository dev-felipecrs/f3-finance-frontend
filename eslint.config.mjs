import react from 'eslint-plugin-react';
import typescriptEslint from '@typescript-eslint/eslint-plugin';
import globals from 'globals';
import tsParser from '@typescript-eslint/parser';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import js from '@eslint/js';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all
});

export default [
  {
    ignores: [
      '**/node_modules/*',
      '**/dist/*',
      '**/.next/*',
      'src/styles/globals.css'
    ]
  },
  ...compat.extends(
    'next/core-web-vitals',
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'prettier',
    '@rocketseat/eslint-config/next',
  ),
  {
    plugins: {
      react,
      '@typescript-eslint': typescriptEslint,
    },
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node
      },
      parser: tsParser,
      ecmaVersion: 11,
      sourceType: 'module',
      parserOptions: {
        ecmaFeatures: {
          jsx: true
        }
      }
    },
    settings: {
      react: {
        version: 'detect'
      }
    },
    rules: {
      "camelcase": "off",
      "no-useless-constructor": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-namespace": "off",
      "@typescript-eslint/no-non-null-assertion": "off",
      "no-use-before-define": "off",
      "sort-imports": [
        "error",
        { "ignoreCase": true, "ignoreDeclarationSort": true }
      ],
      "import/order": [
        "error",
        {
          "groups": [["external", "builtin"], "internal", ["sibling"]],
          "pathGroups": [
            {
              "pattern": "react",
              "group": "external",
              "position": "before"
            },
            {
              "pattern": "@/**",
              "group": "internal"
            }
          ],
          "pathGroupsExcludedImportTypes": ["internal", "react"],
          "newlines-between": "always",
          "alphabetize": {
            "order": "desc",
            "caseInsensitive": true
          }
        }
      ]
    }
  }
];