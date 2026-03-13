import { loginPage } from "../pages/loginPage";
import loginData from '../fixtures/loginData.json'
import { cartPage } from "../pages/cartPage";

describe('Cart tests', () => {

  const firstItemName = 'Apple iPhone 12, 128GB, Black';
  const firstItemPrice = 905.99;
  const secondItemName = 'Huawei Mate 20 Lite, 64GB, Black';
  const secondItemPrice = 236.12;
  const zeroTotalPrice = '$0';

  beforeEach(() => {
    loginPage.goToLoginPage();
    loginPage.loginUser(loginData.validEmail, loginData.validPassword);
  });

  it('Verify cart is updated when adding a product', () => {
    // add product to cart
    cartPage.pageElementLocators.addToCartButton().first().click();

    // assert item is added to cart
    cartPage.pageElementLocators.cartItemRow().should('have.length', 2);
    cartPage.pageElementLocators.cartItemName().should('have.text', firstItemName);
    cartPage.pageElementLocators.totalPrice().should('contain.text', firstItemPrice);
  });

  it('Verify cart is updated when adding more different products', () => {
    let totalPrice = firstItemPrice + secondItemPrice;

    // add two different products to cart
    cartPage.pageElementLocators.addToCartButton().first().click();
    cartPage.pageElementLocators.addToCartButton().eq(1).click();

    // validate products are added to cart
    cartPage.pageElementLocators.cartItemRow().should('have.length', 3);
    cartPage.pageElementLocators.cartItemName().first().should('have.text', firstItemName);
    cartPage.pageElementLocators.cartItemName().eq(1).should('have.text', secondItemName);

    // validate total price is correctly calculated
    // rounded up total price to two decimal places
    cartPage.pageElementLocators.totalPrice().should('contain.text', totalPrice.toFixed(2));
  });

  it('Verify total price is properly calculated and displayed when increasing quantity for product in cart', () => {
    let totalPrice = firstItemPrice * 2;

    // add product to cart
    cartPage.pageElementLocators.addToCartButton().first().click();

    // increase quantity of product by using up arrow in input field
    cartPage.pageElementLocators.itemQuantityField().type('{upArrow}');

    // validate total price is calculated properly 
    cartPage.pageElementLocators.totalPrice().should('contain.text', totalPrice.toFixed(2));
  });

  it('Verify alert message is displayed when adding same product multiple times', () => {
    let alertMessage = 'This item is already added to the cart';
    cartPage.pageElementLocators.addToCartButton().first().click();
    cartPage.pageElementLocators.itemQuantityField().should('have.value', 1);
    cy.on('window:alert', (text) => {
      expect(text).to.contains(alertMessage);
    });
    cartPage.pageElementLocators.addToCartButton().first().click();
  });

  it('Verify that clicking on remove item from cart product is removed', () => {
    // add product to cart 
    cartPage.pageElementLocators.addToCartButton().first().click();

    // remove product from cart
    cartPage.pageElementLocators.removeItemButton().first().click();

    // validate total price is reset to zero and no items are present in cart
    cartPage.pageElementLocators.totalPrice().should('have.text', zeroTotalPrice);
    cartPage.pageElementLocators.cartItemRow().should('have.length', 1);
  });

  it('Verify quantity for a product cannot be 0 or negative', () => {
    cartPage.pageElementLocators.addToCartButton().first().click();

    // set quantity to 0
    cartPage.pageElementLocators.itemQuantityField().clear().type(0);
    // after inserting the value we have to click outside the input field so that validation
    // will check the input value for quantity
    cartPage.pageElementLocators.cartItemName().click();
    cartPage.pageElementLocators.itemQuantityField().should('have.value', 1);

    // set quantity to a negative number
    cartPage.pageElementLocators.itemQuantityField().clear().type(-1);
    cartPage.pageElementLocators.cartItemName().click();
    cartPage.pageElementLocators.itemQuantityField().should('have.value', 1);
  });

  it('Verify cart can be emptied by removing multiple items', () => {
    cartPage.pageElementLocators.addToCartButton().first().click();
    cartPage.pageElementLocators.addToCartButton().eq(1).click();
    cartPage.pageElementLocators.addToCartButton().eq(2).click();
    cartPage.pageElementLocators.addToCartButton().eq(3).click();

    // remove all items added into cart
    cartPage.pageElementLocators.removeItemButton().each(element => {
      cy.wrap(element).click();
    });
    cartPage.pageElementLocators.cartItemRow().should('have.length', 1);
  });

})