module.exports = {
  rules: {
    '@typescript-eslint/no-explicit-any': { fixToUnknown: true, ignoreRestArgs: true }
  },
  root: true,
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-typescript',
    '@vue/eslint-config-prettier/skip-formatting'
  ],
  parserOptions: {
    ecmaVersion: 'latest'
  }
}
