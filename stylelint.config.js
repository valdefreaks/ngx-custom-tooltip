/** @type {import('stylelint').Config} */
module.exports = {
  plugins: ['stylelint-order'],
  extends: ['stylelint-config-standard', 'stylelint-config-alphabetical-order'],
  rules: {},
  ignoreFiles: [
    'dist/**',
    'node_modules/**',
    '.husky/**',
    '.idea/**',
    '.angular/**',
  ],
};
