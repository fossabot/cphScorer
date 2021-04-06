/*
 * For a detailed explanation regarding each configuration property and type check, visit:
 * https://jestjs.io/docs/en/configuration.html
 */

export default {
  testEnvironment: 'node',
  transform: {
    '^.+\\.ts$': 'babel-jest'
  },
  clearMocks: true,
  reporters: [
    "default",
    "jest-html-reporters",
  ],
  collectCoverage: true,
  collectCoverageFrom: [
    "src/**/*.ts",
    "!src/migration/**",
    "!src/entity/**",
    "!src/index.ts",
  ],
  coverageReporters: ['text-summary','text', 'html']
}
