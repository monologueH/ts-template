module.exports = {
  root: true,
  env: {
    es6: true,
    node: true
  },
  extends: ['airbnb-base', 'plugin:@typescript-eslint/recommended'],
  plugins: ['@typescript-eslint'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    useJSXTextNode: true,
    project: './tsconfig.json',
    tsconfigRootDir: './',
    extraFileExtensions: ['.vue','.js']
  },
  rules: {
    'no-console':"off",
    'comma-dangle': ['error', 'always-multiline'],
    'no-undef': 0,
    'no-param-reassign': ['error', { props: false }],
    'max-classes-per-file': 0,
    'max-len': [
      'error',
      {
        code: 120,
        ignoreComments: true,
        ignoreTrailingComments: true,
        ignoreStrings: true,
        ignoreRegExpLiterals: true,
        ignoreTemplateLiterals: true,
      },
    ],
    'no-mixed-operators': 0,
    'class-methods-use-this': 0,
    'function-paren-newline': ['error', 'consistent'],
    'function-call-argument-newline': ['error', 'consistent'],
    'no-plusplus': ['error', { allowForLoopAfterthoughts: true }],
    'no-underscore-dangle': ['error', { allowAfterThis: true }],
    'import/no-unresolved': 0,
    'import/prefer-default-export': 0,
    'import/extensions': 0,
    'import/no-extraneous-dependencies': [
      'error', { devDependencies: true},
    ],
    '@typescript-eslint/no-empty-function': ['error', { allow: ['arrowFunctions'] }],
    '@typescript-eslint/no-non-null-assertion': 0,
    'linebreak-style': [0, 'error', 'windows']
  }
};
