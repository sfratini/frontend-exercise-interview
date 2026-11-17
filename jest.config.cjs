/** @type {import('jest').Config} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  globals: {
    'ts-jest': {
      tsconfig: './tsconfig.test.json',
    },
  },
  moduleNameMapper: {
    '^~/(.*)$': '<rootDir>/src/$1',
    '\\.(css|scss|svg|png)$': '<rootDir>/src/__mocks__/fileMock.ts',
  },
  testMatch: ['**/*.test.ts', '**/*.test.tsx'],
};
