class ProductPage {
  title = '[data-test="title"]'
  sortingDropdown = '[data-test="product-sort-container"]'
  inventoryItem = '[data-test="inventory-item"]'
  productName = '[data-test="inventory-item-name"]'
  productPrice = '[data-test="inventory-item-price"]'
  productDescription = '[data-test="inventory-item-desc"]'
  addToCartButton = '[data-test="add-to-cart"]'
  cartBadge = '[data-test="shopping-cart-badge"]'
  menuButton = '#react-burger-menu-btn'
  logoutLink = '[data-test="logout-sidebar-link"]'

  verifyProductsPage() {
    cy.url().should('include', '/inventory.html')

    cy.get(this.title)
      .should('be.visible')
      .and('have.text', 'Products')
  }

  selectSortingOption(option) {
  cy.get(this.sortingDropdown).select(option)

  // Get the newly rendered dropdown again
  cy.get(this.sortingDropdown)
    .should('have.value', option)
}

  verifyPricesLowToHigh() {
    cy.get(this.productPrice).then(($prices) => {
      const displayedPrices = [...$prices].map((price) =>
        Number(price.innerText.replace('$', '')),
      )

      const sortedPrices = [...displayedPrices].sort(
        (firstPrice, secondPrice) =>
          firstPrice - secondPrice,
      )

      expect(displayedPrices).to.deep.equal(sortedPrices)
    })
  }

  verifyNamesZToA() {
    cy.get(this.productName).then(($names) => {
      const displayedNames = [...$names].map(
        (name) => name.innerText,
      )

      const sortedNames = [...displayedNames].sort(
        (firstName, secondName) =>
          secondName.localeCompare(firstName),
      )

      expect(displayedNames).to.deep.equal(sortedNames)
    })
  }

  openProduct(name) {
    cy.contains(this.productName, name).click()
    cy.url().should('include', '/inventory-item.html')
  }

  verifyProductDetails(name, price, description) {
    cy.get(this.productName)
      .should('be.visible')
      .and('have.text', name)

    cy.get(this.productPrice)
      .should('be.visible')
      .and('have.text', price)

    cy.get(this.productDescription)
      .should('be.visible')
      .and('have.text', description)
  }

  addProduct(name) {
    cy.contains(this.inventoryItem, name)
      .find('button')
      .click()
  }

  addProductFromDetailsPage() {
    cy.get(this.addToCartButton).click()
  }

  verifyCartCount(count) {
    cy.get(this.cartBadge)
      .should('be.visible')
      .and('have.text', String(count))
  }

  logout() {
    cy.get(this.menuButton).click()

    cy.get(this.logoutLink)
      .should('be.visible')
      .click()
  }
}

module.exports = ProductPage