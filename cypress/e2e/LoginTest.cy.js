import { header } from "../pages/header";
import { loginPage } from "../pages/loginPage";
import { faker } from "@faker-js/faker";
import loginData from '../fixtures/loginData.json'

describe('Login Tests', () => {

  const errorMessage = "Bad credentials! Please try again! Make sure that you've registered.";
  const emailPlaceholderText = "Enter email - insert admin@admin.com";
  const passwordPlaceholderText = "Enter Password - insert admin123";

  beforeEach(() => {
    loginPage.goToLoginPage();
  });

  it('Successful login with valida data', () => {
    loginPage.enterEmail(loginData.validEmail);
    loginPage.enterPassword(loginData.validPassword);
    loginPage.clickSubmitButton();
    header.pageElementLocators.logoutButton().should('be.visible');
  });

  it('Validate error message for non-existing user', () => {
    // using faker library for generating random data
    loginPage.enterEmail(faker.internet.email());
    loginPage.enterPassword(faker.internet.password());
    loginPage.clickSubmitButton();
    loginPage.pageElementLocators.errorMesage().should('be.visible');
    loginPage.pageElementLocators.errorMesage().should('contain.text', errorMessage);
  });

  it('Validate error message for wrong password', () => {
    loginPage.enterEmail(loginData.validEmail);
    loginPage.enterPassword(faker.internet.password());
    loginPage.clickSubmitButton();
    loginPage.pageElementLocators.errorMesage().should('be.visible');
    loginPage.pageElementLocators.errorMesage().should('contain.text', errorMessage);
  });

  it('Validate error message for empty fields', () => {
    loginPage.clickSubmitButton();
    loginPage.pageElementLocators.errorMesage().should('be.visible');
    loginPage.pageElementLocators.errorMesage().should('contain.text', errorMessage);
  });

  it('Validate error message for invalid email address', () => {
    loginPage.enterEmail(faker.person.firstName());
    loginPage.enterPassword(faker.internet.password());
    loginPage.clickSubmitButton();
    loginPage.pageElementLocators.errorMesage().should('be.visible');
    loginPage.pageElementLocators.errorMesage().should('contain.text', errorMessage);
  });

  it('Validate placeholder text for input fields', () => {
    loginPage.pageElementLocators.email().should('have.attr', 'placeholder', emailPlaceholderText);
    loginPage.pageElementLocators.password().should('have.attr', 'placeholder', passwordPlaceholderText);
  });

  it('Verify placeholder text is displayed when input field is emptied', () => {
    loginPage.enterEmail(loginData.validEmail);
    loginPage.pageElementLocators.email().clear();
    loginPage.pageElementLocators.email().should('have.attr', 'placeholder', emailPlaceholderText);
    loginPage.enterPassword(loginData.validPassword);
    loginPage.pageElementLocators.password().clear();
    loginPage.pageElementLocators.password().should('have.attr', 'placeholder', passwordPlaceholderText);
  });

})