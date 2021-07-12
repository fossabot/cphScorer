/*
 * For a detailed explanation regarding each configuration property and type check, visit:
 * https://jestjs.io/docs/en/configuration.html
 */

export default {
  testEnvironment: 'node',
  transform: {
    '^.+\\.ts$': 'ts-jest'
  },
  clearMocks: true,
  reporters: [
    "default",
  ],
  collectCoverage: true,
  collectCoverageFrom: [
    "src/**/*.ts",
    "!src/providers/**",
    "!src/index.ts",
  ],
  coverageReporters: ['text-summary', 'text', 'html']  
}
