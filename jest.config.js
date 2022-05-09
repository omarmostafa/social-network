const { defaults: tsjPreset } = require('ts-jest/presets');
module.exports = {
  preset: 'ts-jest',
  moduleNameMapper: {
    '^@core/(.*)$': '<rootDir>/src/core/$1',
    '^@modules/(.*)$': '<rootDir>/src/modules/$1',
    '^@express/(.*)$': '<rootDir>/src/express/$1',
    '^@src/(.*)$': '<rootDir>/src/$1',
    '^@env/(.*)$': '<rootDir>/env/$1',
    '^@__tests__/(.*)$': '<rootDir>/__tests__/$1',
  },
  setupFiles: [],
  testTimeout: 30000,
  testRegex: '/.*.(test|spec).ts$',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  collectCoverageFrom: ['**/*.(t|j)s'],
  coverageDirectory: '../coverage',
  transform: {
    ...tsjPreset.transform
  },
  testEnvironment: '<rootDir>/__tests__/custom-test-environment.ts',
  collectCoverage: false,
  coverageReporters: ['json', 'html'],
  modulePathIgnorePatterns: ['<rootDir>/prod_node_modules', '<rootDir>/dist/'],
  verbose: false,
  resetModules: false,
  setupFilesAfterEnv: ['<rootDir>/__tests__/cleanup.ts'],
  globalSetup: '<rootDir>/__tests__/global-setup.ts',
  globalTeardown: '<rootDir>/__tests__/global-teardown.ts',
};
