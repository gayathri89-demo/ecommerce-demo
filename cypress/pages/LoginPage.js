class LoginPage {
  usernameInput = '[data-test="username"]'
  passwordInput = '[data-test="password"]'
  loginButton = '[data-test="login-button"]'
  loginLogo = '.login_logo'

  visit() {
    cy.visit('/')
  }

  enterUsername(username) {
    cy.get(this.usernameInput)
      .should('be.visible')
      .type(username)
  }

  enterPassword(password) {
    cy.get(this.passwordInput)
      .should('be.visible')
      .type(password, { log: false })
  }

  clickLogin() {
    cy.get(this.loginButton)
      .should('be.visible')
      .click()
  }

  verifyLoginPage() {
    cy.url().should('eq', `${Cypress.config('baseUrl')}/`)

    cy.get(this.loginLogo)
      .should('be.visible')
      .and('have.text', 'Swag Labs')

    cy.get(this.loginButton).should('be.visible')
  }
}

module.exports = LoginPage