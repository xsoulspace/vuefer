module.exports = {
  projects: ['<rootDir>/packages/**/jest.config.js'],
  collectCoverageFrom: ['<rootDir>/packages/**/*.spec.{ts,tsx}'],
  moduleDirectories: ['node_modules'],
  preset: 'ts-jest',
  transform: {
    '^.+\\.jsx?$': ['babel-jest'],
  },
}
