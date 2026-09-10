class CartPage {
  cartLink = '[data-test="shopping-cart-link"]'
  title = '[data-test="title"]'
  inventoryItem = '[data-test="inventory-item"]'
  productName = '[data-test="inventory-item-name"]'
  productPrice = '[data-test="inventory-item-price"]'
  checkoutButton = '[data-test="checkout"]'
  firstNameInput = '[data-test="firstName"]'
  lastNameInput = '[data-test="lastName"]'
  postalCodeInput = '[data-test="postalCode"]'
  continueButton = '[data-test="continue"]'
  errorMessage = '[data-test="error"]'
  totalAmount = '[data-test="total-label"]'
  finishButton = '[data-test="finish"]'
  confirmationMessage = '[data-test="complete-header"]'

  openCart() {
    cy.get(this.cartLink).click()
  }

  verifyCartPage() {
    cy.url().should('include', '/cart.html')

    cy.get(this.title)
      .should('be.visible')
      .and('have.text', 'Your Cart')
  }

  verifyProduct(name, price) {
    cy.contains(this.inventoryItem, name).within(() => {
      cy.get(this.productName).should('have.text', name)
      cy.get(this.productPrice).should('have.text', price)
    })
  }

  verifyFirstNameIsEmpty() {
  cy.get(this.firstNameInput)
    .should('be.visible')
    .and('have.value', '')
}

  clickCheckout() {
    cy.get(this.checkoutButton).click()
  }

  verifyCheckoutInformationPage() {
    cy.url().should('include', '/checkout-step-one.html')

    cy.get(this.title)
      .should('have.text', 'Checkout: Your Information')
  }

  enterCheckoutDetails(firstName, lastName, postalCode) {
    if (firstName) {
      cy.get(this.firstNameInput).type(firstName)
    }

    if (lastName) {
      cy.get(this.lastNameInput).type(lastName)
    }

    if (postalCode) {
      cy.get(this.postalCodeInput).type(postalCode)
    }
  }

  clickContinue() {
    cy.get(this.continueButton).click()
  }

  verifyValidationMessage(message) {
    cy.get(this.errorMessage)
      .should('be.visible')
      .and('have.text', message)
  }

  verifyOverviewPage() {
    cy.url().should('include', '/checkout-step-two.html')

    cy.get(this.title)
      .should('have.text', 'Checkout: Overview')
  }

  verifyTotalAmount() {
    cy.get(this.totalAmount)
      .should('be.visible')
      .and('contain.text', 'Total: $')
  }

  removeProduct(name) {
    cy.contains(this.inventoryItem, name)
      .find('button')
      .click()
  }

  verifyProductRemoved(name) {
    cy.contains(this.productName, name)
      .should('not.exist')
  }

  clickFinish() {
    cy.get(this.finishButton).click()
  }

  verifyOrderConfirmation(message) {
    cy.url().should('include', '/checkout-complete.html')

    cy.get(this.confirmationMessage)
      .should('be.visible')
      .and('have.text', message)
  }
}

module.exports = CartPage