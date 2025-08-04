const { defineConfig } = require("cypress");

module.exports = defineConfig({
  video: false,
  env: {
    NODE_ENV: "test",
  },
  e2e: {
    baseUrl: "http://localhost:3000",
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
