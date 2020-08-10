module.exports = {
  extends: 'airbnb-base',
  env: {
    jest: true
  },
  rules: {
    'arrow-parens': ['error', 'as-needed'],
    'no-multi-assign': 'off',
    'no-plusplus': [0, { 'allowForLoopAfterthoughts': true }],
    'no-restricted-syntax': [0, 'ForOfStatement'],
    'no-underscore-dangle': 'off',
  }
};
