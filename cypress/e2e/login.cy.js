import './commands'

describe('Sauce demo Verification',() =>{

    beforeEach(() =>{
        cy.login();
    })
    
    it('Login to the sauce demo website',()=>{  
        
        //Verify the page title. 
        cy.get('[data-test="title"]').should('be.visible').and('have.text','Products')
    })
})

it('Product Sorting',()=>{
    
    // Select Price: Low to High from the sorting dropdown.
    cy.get('[data-test="product-sort-container"]').select('lohi'); 
    // Verify the displayed product prices. 
     cy.get('[data-test="product-sort-container"]').should('have.text','Price (low to high)')
    // Select Name: Z to A from the sorting dropdown. 
    cy.get('[data-test="product-sort-container"]').select('za');

    //Verify the text
    cy.get('[data-test="product-sort-container"]').should('have.text','Name (Z to A)')

})

it('Product Details and Add to Cart ',()=>{

//Navigate to the Products page. Products should be displayed. 
cy.url().should('include','/inventory.html');
cy.get('[data-test="title"]').should('be.visible').and('have.text','Products')

//Select any one product.
cy.get('[data-test="inventory-item-name"]').contains('Sauce Labs Bolt T-Shirt').click()

//Verify the product name. 
cy.url().should('include','/inventory-item.html');
cy.get('[data-test="inventory-item-name"]').should('be.visible').and('have.text','Sauce Labs Bolt T-Shirt');

//Verify the product price.
cy.get('[data-test="inventory-item-price"]').should('be.visible').and('have.text','15.99');

//Verify the product description. 
cy.get('[data-test="inventory-item-desc"]').should('be.visible').and('have.text','Get your testing superhero on with the Sauce Labs bolt T-shirt. From American Apparel, 100% ringspun combed cotton, heather gray with red bolt.');

//Add the product to the cart.
cy.get('[data-test="add-to-cart"]').click();

//Verify the cart badge. 
cy.get('[data-test="shopping-cart-badge"]').should('be.visible').and('have.text','1')
})

it('Cart and Checkout Validation ',()=>{
//Open the cart.
cy.get('[data-test="shopping-cart-link"]').click();
//Verify the selected product name. 
cy.url().should('include','/cart.html');
cy.get('[data-test="inventory-item-name"]').should('be.visible').and('have.text','Sauce Labs Bolt T-Shirt');

//Verify the selected product price. 
cy.get('[data-test="inventory-item-price"]').should('be.visible').and('have.text','15.99');


//Click Checkout. 
cy.get('[data-test="checkout"]').click()

//Leave First Name empty. 
cy.get('[data-test="firstName"]').should('have.value','');
//Enter Last Name and Postal Code. 
cy.get('[data-test="lastName"]').type('Nair')
cy.get('[data-test="postalCode"]').type('123456')

//Click Continue. 
cy.get('[data-test="continue"]').click()
})



