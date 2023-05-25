export default {
  testEnvironment: 'node',
  preset: 'ts-jest',
  rootDir: '',
  setupFiles: [`<rootDir>/setup.ts`],
  setupFilesAfterEnv: [`<rootDir>/setup-after-env.ts`],
};
