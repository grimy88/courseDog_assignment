/// <reference types="cypress" />

class CartPage {

    pageElementLocators = {
        totalPrice: () => cy.get('.cart-total-price'),
        item: () => cy.get('.shop-item'),
        addToCartButton: () => cy.get('.shop-item-button'),
        itemPrice: () => cy.get('.shop-item-price'),
        cartItemName: () => cy.get('.cart-item-title'),
        removeItemButton: () => cy.get('.btn-danger'),
        itemQuantityField: () => cy.get('.cart-quantity-input'),
        proceedButton: () => cy.get('.btn-purchase'),
        cartItemRow: () => cy.get('.cart-row'),
    }

    clickProceedToCheckoutButton() {
        this.pageElementLocators.proceedButton().click();
    }

}

export const cartPage = new CartPage()