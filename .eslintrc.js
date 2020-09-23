module.exports = {
  extends: 'airbnb-base',
  env: {
    jest: true
  },
  rules: {
    'arrow-parens': ['error', 'as-needed'],
    "no-bitwise": 'off',
    'no-multi-assign': 'off',
    'no-param-reassign': [2, { 'props': false }],
    'no-plusplus': [0, { 'allowForLoopAfterthoughts': true }],
    'no-restricted-syntax': [0, 'ForOfStatement'],
    'no-underscore-dangle': 'off',
  }
};
