module.exports = {
  jest: {
    preset: 'react-native',
    transform: {
      '^.+\\.js$': './node_modules/react-native/jest/preprocessor.js',
      '\\.(ts|tsx)$': 'ts-jest',
    },
    globals: {
      'ts-jest': {
        tsConfig: 'tsconfig.json',
      },
    },
    moduleFileExtensions: ['ts', 'tsx', 'js'],
    testRegex: '(/__tests__/.*|\\.(test|spec))\\.(ts|tsx|js)$',
  },
};
