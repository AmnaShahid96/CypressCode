describe('Login', () => {
    it('SignUp with valid number', () => {
      cy.visit('https://staging.circlepay.ai/')
      cy.get('.mat-input-element').type(Cypress.env('merchantNumber'))
      cy.contains('Get Started').click()
      cy.url().should('include', '/auth/signup/')
    }) 
})