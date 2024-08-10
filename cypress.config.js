const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {},
    env: {
      hideXhr: true
    },
    baseUrl: 'https://angularjs.realworld.io/#/'
  },
});
