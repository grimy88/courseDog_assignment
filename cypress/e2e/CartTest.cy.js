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

  it('Verify that clicking on remove item from cart product is removed', () => {
    // add product to cart 
    cartPage.pageElementLocators.addToCartButton().first().click();

    // remove product from cart
    cartPage.pageElementLocators.removeItemButton().first().click();

    // validate total price is reset to zero and no items are present in cart
    cartPage.pageElementLocators.totalPrice().should('have.text', zeroTotalPrice);
    cartPage.pageElementLocators.cartItemRow().should('have.length', 1);
  });

})