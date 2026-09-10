const LoginPage = require('../pages/LoginPage')

Cypress.Commands.add(
  'login',
  (
    username = 'standard_user',
    password = 'secret_sauce',
  ) => {
    const loginPage = new LoginPage()

    loginPage.visit()
    loginPage.enterUsername(username)
    loginPage.enterPassword(password)
    loginPage.clickLogin()

    cy.url().should('include', '/inventory.html')
  },
)