import globals from 'globals'
import tseslint from 'typescript-eslint'

/** @type {import('eslint').Linter.Config[]} */
export default [
  { files: ['**/*.{ts}'] },
  { languageOptions: { globals: globals.browser } },
  ...tseslint.configs.recommended,
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
      '@typescript-eslint/no-empty-object-type': 'off',
      semi: ['error', 'never'],
    },
  },
]
