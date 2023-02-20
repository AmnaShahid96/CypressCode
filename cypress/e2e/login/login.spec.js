describe('Login', () => {
    it('Login with valid phone number', () => {
      cy.visit('https://staging.circlepay.ai/')
      cy.get('.mat-input-element').type(Cypress.env('merchantNumber'))
      cy.contains('Get Started').click()
      cy.url().should('include', '/auth')
      cy.get('.password-field').type(Cypress.env('password'))
      cy.contains('Get Started').click()
    })
  })