import loginData from '../fixtures/loginData.json'
import { cartPage } from '../pages/cartPage';
import { header } from "../pages/header";
import { loginPage } from "../pages/loginPage";
import { checkoutPage } from "../pages/checkoutPage";

describe('Order tests', () => {

  const phoneNumber = "064123456";
  const streetName = "Test Street 123";
  const cityName = "North Canton";
  const countryName = "Croatia";
  const phonePlaceholderText = 'Enter phone number';
  const cityPlaceholderText = 'London';
  const streetPlaceholderText = '5876 Little Streets';

  beforeEach(() => {
    loginPage.goToLoginPage();
    loginPage.loginUser(loginData.validEmail, loginData.validPassword);
  });

  it('Validate palceholders are displayed after clearing input fields', () => {
    cartPage.clickProceedToCheckoutButton();

    // check phone number field placeholder text
    checkoutPage.enterPhoneNumber(phoneNumber);
    checkoutPage.pageElementLocators.phoneInput().clear();
    checkoutPage.pageElementLocators.phoneInput().should('have.attr', 'placeholder', phonePlaceholderText);

    // check street field placeholder text
    checkoutPage.enterStreet(streetName);
    checkoutPage.pageElementLocators.streetInput().clear();
    checkoutPage.pageElementLocators.streetInput().should('have.attr', 'placeholder', streetPlaceholderText);

    // check city field placeholder text
    checkoutPage.enterCity(cityName);
    checkoutPage.pageElementLocators.cityInput().clear();
    checkoutPage.pageElementLocators.cityInput().should('have.attr', 'placeholder', cityPlaceholderText);
  });

  it('Validate order is complete with valid data and logout', () => {
    let successMessage = 'Congrats! Your order of  $905.99  has been registered and will be shipped to Test Street 123, North Canton - Croatia.';
    
    // add product to cart and continue to checkout
    cartPage.pageElementLocators.addToCartButton().first().click();
    cartPage.clickProceedToCheckoutButton();

    // enter valid data and submit order
    checkoutPage.enterPhoneNumber(phoneNumber);
    checkoutPage.enterCity(cityName);
    checkoutPage.enterStreet(streetName);
    checkoutPage.selectCountry(countryName);
    checkoutPage.clickSubmitOrder();

    // assert order message
    checkoutPage.pageElementLocators.orderMessage().should('have.text', successMessage);
    
    header.clickLogoutButton();
  });

  // here we check only the red color on country when its not selected but we should check mandatory fields
  // invalid inputs for each field if there are any validations
  it('Validate invalid input for shipping details', () => {
    cartPage.clickProceedToCheckoutButton();
    checkoutPage.clickSubmitOrder();
    checkoutPage.pageElementLocators.countriesDropDown().should('have.css', 'color', 'rgb(255, 0, 0)');
  });

})