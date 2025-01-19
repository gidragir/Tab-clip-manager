import globals from 'globals'
import tseslint from 'typescript-eslint'
import pluginReact from 'eslint-plugin-react'

/** @type {import('eslint').Linter.Config[]} */
export default [
  { files: ['**/*.{ts,tsx}'] },
  { settings: { react: { version: 'detect' } } },
  { languageOptions: { globals: globals.browser } },
  ...tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
  {
    ignores: [
      'node_modules/',
      '.git/',
      'dist/',
      'apps/backend/',
      'apps/docs/',
      'pnpm-lock.yaml',
      '*.lock',
      '.turbo/',
      '.eslintcache',
      '.gitignore',
      '.github',
      '.eslintignore',
      '.nvmrc',
      '.prettierignore',
      'LICENSE',
      'public/',
      'static/',
      '**/*.png',
      '**/*.jpg',
      '**/*.jpeg',
      '**/*.gif',
      '**/*.svg',
      '**/*.ico',
    ],
  },
  {
    rules: {
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
      '@typescript-eslint/no-empty-object-type': 'off',
      semi: ['error', 'never'],
    },
  },
]
