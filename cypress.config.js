const { defineConfig } = require("cypress");

module.exports = defineConfig({
  allowCypressEnv: false,
  screenshotsFolder: 'cypress/e2e/screenshots',
  screenshotOnRunFailure: true,
  reporter: 'cypress-mochawesome-reporter',
  reporterOptions: {
    reportDir: 'cypress/results/cypress-test-report',
  },

  e2e: {
    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on);
    },
    baseUrl: 'https://qa-practice.netlify.app/',
    experimentalRunAllSpecs: true,
    specPattern: [
      '**/CartTest.cy.js',
      '**/FileUploadTest.cy.js',
      '**/LoginTest.cy.js',
      '**/OrderTest.cy.js'
    ]
  },
  
});
