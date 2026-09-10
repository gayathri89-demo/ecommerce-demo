// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('login',()=>{
    
      cy.visit('https://www.saucedemo.com/');  
       //Enter valid username standard_user. 
        cy.get('[data-test="username"]').should('be.visible').type('standard_user');
        
        //Enter valid password secret_sauce.
        cy.get('[data-test="password"]').should('be.visible').type('secret_sauce');
        
        //Click the Login button. 
        cy.get('[data-test="login-button"]').should('be.visible').click();

        //Verify the Inventory/Products page URL. 
        cy.url().should('include','/inventory.html');
})