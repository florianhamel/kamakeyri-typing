/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'jest-preset-angular',
  setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
  globalSetup: 'jest-preset-angular/global-setup',
  transform: {
    '^.+\\.(ts|tsx)$': 'jest-preset-angular',
    '^.+\\.(html|svg)$': 'jest-transform-stub'
  },
  testPathIgnorePatterns: ['node_modules']
};
