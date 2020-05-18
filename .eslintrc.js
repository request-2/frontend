module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: [
    'eslint:recommended',
    'airbnb',
    'plugin:react/recommended',
    'prettier/react',
    'plugin:prettier/recommended',
  ],
  parser: 'babel-eslint',
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 11,
    sourceType: 'module',
  },
  plugins: ['react', 'prettier'],
  rules: {
    'no-underscore-dangle': 0,
    'react/jsx-props-no-spreading': [1, { exceptions: ['input'] }],
    'react/prop-types': 0,
    'react/no-unescaped-entities': 0,
    'prettier/prettier': 'error',
  },
};