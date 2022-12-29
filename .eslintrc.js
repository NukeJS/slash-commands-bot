module.exports = {
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 2022,
    project: ['./tsconfig.json'],
  },
  extends: [
    'airbnb-base',
    'airbnb-typescript/base',
    'plugin:prettier/recommended',
    'plugin:import/typescript',
  ],
  plugins: ['@typescript-eslint', 'prettier'],
  rules: {
    'no-console': 0,

    'import/no-extraneous-dependencies': 0,
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        ts: 'never',
      },
    ],

    '@typescript-eslint/lines-between-class-members': 0,
  },
};
