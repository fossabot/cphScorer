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
    "!src/app.module.ts",
    "!src/main.ts"
  ],
  coverageReporters: ['text-summary', 'text', 'html']  
}
