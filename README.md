# Cypress automation task for CourseDog

### Prerequisite for running the tests install node.js

For this task cypress and node.js were used.\
Node.js version: 20.15\
Cypress version: 15.11

### To run all tests just type in terminal:
``` 1) npm install ```

``` 2) npm run cypress:all ```

### To run specific tests use the script commands from package.json
For example just type the following in terminal:

``` npm run cypress:cart-tests ```\
``` npm run cypress:upload-tests ```\
``` npm run cypress:login-tests ```\
``` npm run cypress:order-tests ```

Tests can be run in headless mode also by typing the following in terminal:

``` npm run cypress:all-headless ```

### At the end of the run a report will be generated and placed inside 'results' folder.

# Testing structure overview:

``` cypress/e2e ``` - directory that contains all the tests for the tested application

``` cypress/fixtures ``` - directory that contains files for upload and test data used by tests

``` cypress/pages ``` - directory containing page files with all the elements, locators and actions for the given page

``` cypress/support ``` - directory containing custom commands that can be reused 

``` cypress/results ``` - directory that is created when tests are run and test report is saved in this location

``` cypress.config.js ``` - file that manages all the configurations for cypress