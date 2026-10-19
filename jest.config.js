module.exports = {
  testEnvironment: 'node',
  testMatch: ['**/tests/unit/**/*.spec.js'],
  collectCoverageFrom: [
    'src/**/*.js',
    '!src/boot/**',
    '!src/statics/**'
  ],
  moduleFileExtensions: ['js', 'json']
};
