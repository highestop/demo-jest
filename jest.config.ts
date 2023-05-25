import type { RawCompilerOptions } from 'ts-jest';
import { pathsToModuleNameMapper } from 'ts-jest';
import tsconfig from './tsconfig.base.json';

export default {
  testEnvironment: 'node',
  preset: 'ts-jest',
  rootDir: '',
  setupFiles: [`<rootDir>/setup.ts`],
  setupFilesAfterEnv: [`<rootDir>/setup-after-env.ts`],
  testMatch: [`<rootDir>/src/**/*.(test|spec).(ts|tsx)`],
  transform: {
    '^.+\\.(ts|tsx)$': [
      'ts-jest',
      {
        isolatedModules: true,
        tsconfig: tsconfig.compilerOptions as RawCompilerOptions,
      },
    ],
    '^.+\\.(css|less|sass|scss|svg)$': 'jest-transform-stub',
  },
  // https://kulshekhar.github.io/ts-jest/docs/getting-started/paths-mapping/
  moduleNameMapper: {
    '\\.(css|less|sass|scss)$': '<rootDir>/node_modules/jest-css-modules',
    '\\.svg$': `<rootDir>/svgr-mock.ts`,
    '.*\\?worker': `<rootDir>/worker-mock.ts`,
    // https://huafu.github.io/ts-jest/user/config/
    ...pathsToModuleNameMapper(tsconfig.compilerOptions.paths),
  },
  testResultsProcessor: 'jest-junit',
  collectCoverageFrom: [
    `<rootDir>/src/**/*.(ts|tsx)`,
    '!**/__tests__/**',
    '!**/__spec__/**',
    '!**/*.(test|spec).(ts|tsx)',
  ],
  // https://gist.github.com/rishitells/3c4536131819cff4eba2c8ab5bbb4570
  coverageReporters: ['cobertura', 'text'],
  coverageDirectory: 'out/Test',
  // https://github.com/jest-community/jest-junit
  reporters: ['default', 'jest-junit'],
};
