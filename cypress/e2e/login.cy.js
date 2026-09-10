const LoginPage = require('../pages/LoginPage')
const ProductPage = require('../pages/ProductPage')
const CartPage = require('../pages/CartPage')

const loginPage = new LoginPage()
const productPage = new ProductPage()
const cartPage = new CartPage()

describe('Sauce Demo Verification', () => {
  beforeEach(() => {
    // Load checkout data from the fixture
    cy.fixture('checkout').as('checkoutData')

    // Login using the custom Cypress command
    cy.login()
  })

  // Scenario 1
  it('Login and Verify Inventory Page', () => {
    productPage.verifyProductsPage()
  })

  // Scenario 2
  it('Product Sorting', () => {
    // Sort by Price: Low to High
    productPage.selectSortingOption('lohi')
    productPage.verifyPricesLowToHigh()

    // Sort by Name: Z to A
    productPage.selectSortingOption('za')
    productPage.verifyNamesZToA()
  })

  // Scenario 3
  it('Product Details and Add to Cart', () => {
    const productName = 'Sauce Labs Bolt T-Shirt'
    const productPrice = '$15.99'

    const productDescription =
      'Get your testing superhero on with the Sauce Labs bolt T-shirt. From American Apparel, 100% ringspun combed cotton, heather gray with red bolt.'

    productPage.verifyProductsPage()

    productPage.openProduct(productName)

    productPage.verifyProductDetails(
      productName,
      productPrice,
      productDescription,
    )

    productPage.addProductFromDetailsPage()

    productPage.verifyCartCount(1)
  })

  // Scenario 4
  it('Cart and Checkout Validation', () => {
    const productName = 'Sauce Labs Bolt T-Shirt'
    const productPrice = '$15.99'

    // Add product
    productPage.addProduct(productName)
    productPage.verifyCartCount(1)

    // Open and verify cart
    cartPage.openCart()
    cartPage.verifyCartPage()

    cartPage.verifyProduct(
      productName,
      productPrice,
    )

    // Open checkout form
    cartPage.clickCheckout()
    cartPage.verifyCheckoutInformationPage()

    // First Name should initially be empty
    cartPage.verifyFirstNameIsEmpty()

    // Leave First Name empty intentionally
    cy.get('@checkoutData').then((data) => {
      cartPage.enterCheckoutDetails(
        '',
        data.lastName,
        data.postalCode,
      )
    })

    cartPage.clickContinue()

    // Verify required-field validation
    cartPage.verifyValidationMessage(
      'Error: First Name is required',
    )
  })

  // Scenario 5
  it('Complete Checkout Using Fixture Data', () => {
    const productName = 'Sauce Labs Bolt T-Shirt'
    const productPrice = '$15.99'

    // Add product
    productPage.addProduct(productName)
    productPage.verifyCartCount(1)

    // Open cart and checkout
    cartPage.openCart()
    cartPage.verifyCartPage()

    cartPage.clickCheckout()
    cartPage.verifyCheckoutInformationPage()

    // Enter all details using fixture data
    cy.get('@checkoutData').then((data) => {
      cartPage.enterCheckoutDetails(
        data.firstName,
        data.lastName,
        data.postalCode,
      )
    })

    // Continue to Checkout Overview
    cartPage.clickContinue()
    cartPage.verifyOverviewPage()

    // Verify product and total
    cartPage.verifyProduct(
      productName,
      productPrice,
    )

    cartPage.verifyTotalAmount()
  })

  // Scenario 6
  it('Add Multiple Products and Remove Product', () => {
    const firstProductName = 'Sauce Labs Backpack'
    const firstProductPrice = '$29.99'

    const secondProductName = 'Sauce Labs Bike Light'
    const secondProductPrice = '$9.99'

    // Add two products
    productPage.addProduct(firstProductName)
    productPage.addProduct(secondProductName)

    // Verify badge shows 2
    productPage.verifyCartCount(2)

    // Open and verify cart
    cartPage.openCart()
    cartPage.verifyCartPage()

    cartPage.verifyProduct(
      firstProductName,
      firstProductPrice,
    )

    cartPage.verifyProduct(
      secondProductName,
      secondProductPrice,
    )

    // Remove the second product
    cartPage.removeProduct(secondProductName)

    // Verify badge changes to 1
    productPage.verifyCartCount(1)

    // Verify removed product is absent
    cartPage.verifyProductRemoved(
      secondProductName,
    )

    // Verify first product remains
    cartPage.verifyProduct(
      firstProductName,
      firstProductPrice,
    )
  })

  // Scenario 7
  it('Complete Order', () => {
    const productName = 'Sauce Labs Bolt T-Shirt'
    const productPrice = '$15.99'

    // Add product
    productPage.addProduct(productName)
    productPage.verifyCartCount(1)

    // Open and verify cart
    cartPage.openCart()
    cartPage.verifyCartPage()

    cartPage.verifyProduct(
      productName,
      productPrice,
    )

    // Open checkout
    cartPage.clickCheckout()
    cartPage.verifyCheckoutInformationPage()

    // Enter fixture data
    cy.get('@checkoutData').then((data) => {
      cartPage.enterCheckoutDetails(
        data.firstName,
        data.lastName,
        data.postalCode,
      )
    })

    // Continue to overview
    cartPage.clickContinue()
    cartPage.verifyOverviewPage()

    // Verify product and total
    cartPage.verifyProduct(
      productName,
      productPrice,
    )

    cartPage.verifyTotalAmount()

    // Complete order
    cartPage.clickFinish()

    // Verify order confirmation
    cartPage.verifyOrderConfirmation(
      'Thank you for your order!',
    )
  })

  // Scenario 8
  it('Logout', () => {
    // Open menu and log out
    productPage.logout()

    // Verify user returned to Login page
    loginPage.verifyLoginPage()
  })
})