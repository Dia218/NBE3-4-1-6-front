module.exports = {
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest', // TypeScript 파일을 ts-jest로 변환
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1', // Alias 설정
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'], // jest-dom 설정
  testPathIgnorePatterns: ['/node_modules/'], // node_modules는 테스트하지 않음
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/tsconfig.json', // TypeScript 설정 파일 지정
    },
  },
};