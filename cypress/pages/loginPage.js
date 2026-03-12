/// <reference types="cypress" />

class LoginPage {

    pageElementLocators = {
        email: () => cy.get('#email'),
        password: () => cy.get('#password'),
        errorMesage: () => cy.get('#message'),
        submitButton: () => cy.get('#submitLoginBtn'),
    }

    goToLoginPage() {
        cy.visit('/auth_ecommerce.html');
    }

    enterEmail(email) {
        this.pageElementLocators.email().type(email);
    }

    enterPassword(password) {
        this.pageElementLocators.password().type(password);
    }

    clickSubmitButton() {
        this.pageElementLocators.submitButton().click();
    }

    loginUser(email, password) {
        this.enterEmail(email);
        this.enterPassword(password);
        this.clickSubmitButton();
    }

}

export const loginPage = new LoginPage()