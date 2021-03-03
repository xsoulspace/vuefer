module.exports = {
  preset: '@vue/cli-plugin-unit-jest/presets/typescript-and-babel',
  transform: {
    '^.+\\.vue$': 'vue-jest',
  },
  testMatch: [
    '<rootDir>/tests/unit/**/*.spec.(js|jsx|ts|tsx)',
    '<rootDir>/src/**/*.spec.(js|jsx|ts|tsx)',
  ],
}
