describe('Sauce Demo Verification', () => {
  beforeEach(() => {
    cy.login()
  })

  it('Login to the SauceDemo website', () => {
    cy.get('[data-test="title"]')
      .should('be.visible')
      .and('have.text', 'Products')
  })

  it('Product Sorting', () => {
    // Select Price: Low to High
    cy.get('[data-test="product-sort-container"]').select('lohi')

    cy.get('[data-test="product-sort-container"]')
      .should('have.value', 'lohi')

    // Select Name: Z to A
    cy.get('[data-test="product-sort-container"]').select('za')

    cy.get('[data-test="product-sort-container"]')
      .should('have.value', 'za')
  })

  it('Product Details and Add to Cart', () => {
    cy.url().should('include', '/inventory.html')

    cy.get('[data-test="title"]')
      .should('be.visible')
      .and('have.text', 'Products')

    cy.contains(
      '[data-test="inventory-item-name"]',
      'Sauce Labs Bolt T-Shirt',
    ).click()

    cy.url().should('include', '/inventory-item.html')

    cy.get('[data-test="inventory-item-name"]')
      .should('be.visible')
      .and('have.text', 'Sauce Labs Bolt T-Shirt')

    cy.get('[data-test="inventory-item-price"]')
      .should('be.visible')
      .and('have.text', '$15.99')

    cy.get('[data-test="inventory-item-desc"]')
      .should('be.visible')
      .and(
        'have.text',
        'Get your testing superhero on with the Sauce Labs bolt T-shirt. From American Apparel, 100% ringspun combed cotton, heather gray with red bolt.',
      )

    cy.get('[data-test="add-to-cart"]').click()

    cy.get('[data-test="shopping-cart-badge"]')
      .should('be.visible')
      .and('have.text', '1')
  })

  it('Cart and Checkout Validation', () => {
    // Every test starts fresh, so add the product again
    cy.contains(
      '[data-test="inventory-item"]',
      'Sauce Labs Bolt T-Shirt',
    )
      .find('button')
      .click()

    cy.get('[data-test="shopping-cart-badge"]')
      .should('have.text', '1')

    cy.get('[data-test="shopping-cart-link"]').click()

    cy.url().should('include', '/cart.html')

    cy.get('[data-test="title"]')
      .should('have.text', 'Your Cart')

    cy.get('[data-test="inventory-item-name"]')
      .should('be.visible')
      .and('have.text', 'Sauce Labs Bolt T-Shirt')

    cy.get('[data-test="inventory-item-price"]')
      .should('be.visible')
      .and('have.text', '$15.99')

    cy.get('[data-test="checkout"]').click()

    cy.url().should('include', '/checkout-step-one.html')

    cy.get('[data-test="firstName"]')
      .should('have.value', '')

    cy.get('[data-test="lastName"]').type('Nair')
    cy.get('[data-test="postalCode"]').type('123456')

    cy.get('[data-test="continue"]').click()

    // Required by the PDF but missing from your test
    cy.get('[data-test="error"]')
      .should('be.visible')
      .and('contain.text', 'Error: First Name is required')
  })
})