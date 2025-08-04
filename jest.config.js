module.exports = {
  clearMocks: true,
  globalSetup: "./node_modules/@databases/pg-test/jest/globalSetup",
  globalTeardown: "./node_modules/@databases/pg-test/jest/globalTeardown",
  transform: {
    "^.+\\.jsx?$": "babel-jest",
  },
  testMatch: [
    "**/server/**/*.spec.js",
    "**/tests/**/*.spec.js",
    "**/models/*.spec.js",
  ],
  verbose: true,
};
