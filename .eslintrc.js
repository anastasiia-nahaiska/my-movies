// https://docs.expo.dev/guides/using-eslint/
module.exports = {
  extends: ['expo', 'prettier'],
  plugins: ['prettier'],
  settings: {
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true,
        project: './tsconfig.json',
      },
    },
  },
  rules: {
    'prettier/prettier': 'error',
    'no-magic-numbers': ['error', { ignore: [0, 1] }],
    'no-var': 'error',
    'react-hooks/exhaustive-deps': 0,
    'no-void': ['error', { allowAsStatement: true }],
    'no-console': 'error',
    'default-case': 'error',
    'default-case-last': 'error',
    'no-nested-ternary': 'error',

    'no-empty-function': 'off',
    '@typescript-eslint/no-empty-function': ['error'],

    'no-unused-expressions': 'off',
    '@typescript-eslint/no-unused-expressions': 'error',

    'no-duplicate-imports': 'error',
    '@typescript-eslint/no-empty-interface': ['error', { allowSingleExtends: true }],
  },
  ignorePatterns: ['/dist/*'],
};
