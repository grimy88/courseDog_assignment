/// <reference types="cypress" />

class CheckoutPage {

    pageElementLocators = {
        phoneInput: () => cy.get('#phone'),
        streetInput: () => cy.get('input[name="street"]'),
        cityInput: () => cy.get('input[name="city"]'),
        countriesDropDown: () => cy.get('#countries_dropdown_menu'),
        submitOrderButton: () => cy.get('#submitOrderBtn'),
        orderMessage: () => cy.get('#message'),
    }

    enterPhoneNumber(phoneNumber) {
        this.pageElementLocators.phoneInput().type(phoneNumber);
    }

    enterStreet(street) {
        this.pageElementLocators.streetInput().type(street);
    }

    enterCity(city) {
        this.pageElementLocators.cityInput().type(city);
    }

    selectCountry(country) {
        this.pageElementLocators.countriesDropDown().select(country);
    }

    clickSubmitOrder() {
        this.pageElementLocators.submitOrderButton().click();
    }

}

export const checkoutPage = new CheckoutPage()