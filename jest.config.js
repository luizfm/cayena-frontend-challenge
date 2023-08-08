module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  testPathIgnorePatterns: ['/dist/', '/node_modules/', '/public/'],
  collectCoverageFrom: [
    'src/components/**/*.ts(x)?',
    'src/contexts/**/*.ts(x)?',
    'src/hooks/**/*.ts(x)?',
    'src/pages/**/*.ts(x)?',
    'src/providers/**/*.ts(x)?',
    '!src/**/index.ts',
    '!src/main.tsx',
    '!src/contexts/*.tsx',
  ],
  modulePaths: ['<rootDir>/src/'],
  setupFiles: ['<rootDir>/.jest/envs.ts'],
  setupFilesAfterEnv: ['<rootDir>/.jest/setup.ts'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  moduleNameMapper: {
    '@/(.*)': '<rootDir>/src/$1',
    '\\.(css|scss)$': 'identity-obj-proxy',
  },
  coverageThreshold: {
    global: {
      statements: -10,
      branches: 85,
      functions: 85,
      lines: 85,
    },
  },
}
