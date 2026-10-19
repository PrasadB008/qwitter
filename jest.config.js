module.exports = {
  testEnvironment: 'node',
  testMatch: ['**/*.spec.js'],
  collectCoverageFrom: [
    'src/**/*.js',
    '!src/**/*.spec.js',
  ],
};
