const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: "3ew7si",
  e2e: {
    baseUrl: 'http://qamid.tmweb.ru/client/index.php',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
